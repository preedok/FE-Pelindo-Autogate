import React, { useState } from "react";
import { TextField, FormControl, Button, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContentCard from "../../../components/common/Card/CardContent";
import { Helmet } from "react-helmet";
import Breadcrombs from '../../../components/common/Breadcrombs/Breadcrombss';
import useHistoryData from './hooks/useHistoryData';
import HistoryTable from './components/HistoryTable';
import HistoryFilter from './components/HistoryFilter';

const HistoryPage = () => {
    const {
        loading,
        startDate,
        endDate,
        inputValue,
        users,
        setStartDate,
        setEndDate,
        setInputValue,
        fetchData,
        error
    } = useHistoryData();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tabValue, setTabValue] = useState(0);
    const [filterUser, setFilterUser] = useState('');
    const [data, setData] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleSearch = async () => {
        try {
            const result = await fetchData();
            setData(result);
        } catch (e) {
            setData([]);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleUserFilterChange = (event) => {
        setFilterUser(event.target.value);
    };

    const getFilteredDataForTab = () => {
        if (error) {
            return []; // Handle error case as needed
        }

        return data.filter(item => {
            const isUserMatch = filterUser ? item.username === filterUser : true;
            const isActionMatch = (tabValue === 0) ||
                                  (tabValue === 1 && item.holdStatus === 'R') ||
                                  (tabValue === 2 && item.holdStatus === 'H');
            return isUserMatch && isActionMatch;
        });
    };

    const filteredData = getFilteredDataForTab();

    return (
        <>
            <Helmet>
                <title>TPK AUTOGATE Monitoring | User History</title>
            </Helmet>
            <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
                <Breadcrombs
                    menu={'User History'}
                    submenu={'History'}
                />
                <div className='mt-5'>
                    <ContentCard>
                        <HistoryFilter
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            handleSearch={handleSearch}
                            loading={loading}
                            filterUser={filterUser}
                            handleUserFilterChange={handleUserFilterChange}
                            users={users}
                        />

                        <div className="flex justify-between items-center mb-4">
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="history tabs">
                                <Tab label="All Activities" />
                                <Tab label="Release Activities" />
                                <Tab label="Hold Activities" />
                            </Tabs>
                            {/* <TextField
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Pencarian..."
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                style={{ width: '300px' }}
                            /> */}
                        </div>

                        <HistoryTable
                            filteredData={filteredData}
                            loading={loading}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            hideUsernameColumn={!!filterUser}
                            filterUser={filterUser}
                        />
                    </ContentCard>
                </div>
            </section>
        </>
    );
};

export default HistoryPage;
