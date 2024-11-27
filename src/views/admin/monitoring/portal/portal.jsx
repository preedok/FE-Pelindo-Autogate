import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import ContentCard from '../../../../components/common/Card/CardContent';
import Breadcrombs from '../../../../components/common/Breadcrombs/Breadcrombss';
import CustomTable from "../../../../components/specialized/DataTable/CustomTable";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Button from "@mui/material/Button";
import FlashOnIcon from '@mui/icons-material/FlashOn';
const Portal = () => {
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
        { id: 'lane', label: 'Lane', align: 'center', minWidth: 170 },
        { id: 'type', label: 'Type', align: 'center', minWidth: 100 },
        {
            id: 'ip',
            label: 'Adam IP',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'port',
            label: 'Adam Port',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'channel',
            label: 'Adam Channel',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'action',
            label: '',
            minWidth: 170,
            align: 'center',
        }
    ]
    function createData( lane, type, ip, port, channel, action) {
        return { lane, type, ip, port, channel, action };
    }
    const rows = [
        createData('1', 'GIN06', '10.111.198.121', '502', 'DO',
            <Button variant='contained' style={{ fontSize: '8px', fontWeight: '700', backgroundColor:'#65B741' }}>
                <FlashOnIcon />
                Open
            </Button>
        ),
    ];
    return (
        <>
            <Helmet>
                <title>TPK AUTOGATE Monitoring | Manual Portal</title>
            </Helmet>
            <section className="p-8 mx-5 rounded-lg w-full">
                <Breadcrombs
                    menu={'Monitoring'}
                    submenu={'Manual Portal'}
                />
                <div className='mt-5'>
                    <ContentCard>
                        <form
                            className="flex items-center max-w-md ml-auto my-5"
                        >
                            <input
                                type="text"
                                id="myInput"
                                name="myInput"
                                placeholder='Pencarian...'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </form>
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

export default Portal
