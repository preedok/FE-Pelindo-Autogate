import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import ContentCard from '../../../../components/common/Card/CardContent';
import Breadcrombs from '../../../../components/common/Breadcrombs/Breadcrombss';
import CustomTable from "../../../../components/specialized/DataTable/CustomTable";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Button from "@mui/material/Button";
const Devices = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };
    const columns = [
        { id: 'no', label: 'No', align: 'center', minWidth: 30 },
        { id: 'lane', label: 'Lane', align: 'center', minWidth: 170 },
        { id: 'name', label: 'Name', align: 'center', minWidth: 100 },
        {
            id: 'ip',
            label: 'IP',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 170,
            align: 'center',
        }
    ]
    function createData(no, lane, name, ip, status) {
        return { no, lane, name, ip, status };
    }
    const rows = [
        createData(<p style={{ textAlign: 'left' }}>1</p>, <p style={{ textAlign: 'left' }}>GIN06</p>,
            <div style={{textAlign:'left'}}>
                <p className="mb-2">IPV</p>
                <p className="mb-2">Adam</p>
                <p className="mb-2">Camera 1</p>
                <p className="mb-2">Adam</p>
                <p className="mb-2">Camera 1</p>
                <p className="mb-2">Adam</p>
                <p className="mb-2">Camera 1</p>
            </div>, '11.2334.32.12',
            <span style={{ textAlign: 'right' }} className="text-[#fb3838]">Not Connected</span>
        ),
        createData(<p style={{ textAlign: 'left' }}>1</p>, <p style={{ textAlign: 'left' }}>GIN07</p>,
            <div style={{ textAlign: 'left' }}>
                <p className="mb-2">IPV</p>
                <p className="mb-2">Adam</p>
                <p className="mb-2">Camera 1</p>
            </div>, '11.2334.32.12',
            <span style={{ textAlign: 'right' }} className="text-[#34c832]">Connected</span>
        )
    ];
    return (
        <>
            <Helmet>
                <title>TPK AUTOGATE Monitoring | Device</title>
            </Helmet>
            <section className="p-8 mx-5 rounded-lg w-full">
                <Breadcrombs
                    menu={'Monitoring'}
                    submenu={'Device'}
                />
                <div className='mt-5'>
                    <ContentCard>
                        <CustomTable
                            columns={columns}
                            loading={loading}
                            rows={rows}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </ContentCard>
                </div>
            </section>
        </>
    )
}

export default Devices
