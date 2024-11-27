import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Table from "@mui/material/Table";
import { CardHeader } from "@material-tailwind/react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from '@mui/material/Paper';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import notfound from "../../../assets/image-not-found.png";
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Oval } from "react-loader-spinner";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxWidth: 3700,
    height: '97%',
    maxHeight: 3900,
    bgcolor: "background.paper",
    overflow: "scroll",
    borderRadius: "10px",
    boxShadow: 24,
    px: 4,
};
const ModalGate = ({ open, handleClose, data }) => {
    // const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevClick = () => {
        setCurrentSlide((prev) => (prev === 0 ? data.pictures.length - 1 : prev - 1));
    };

    const handleNextClick = () => {
        setCurrentSlide((prev) => (prev === data.pictures.length - 1 ? 0 : prev + 1));
    };
    const renderImage = () => {
        console.log('Rendering images:', data?.pictures);
        return (
            <>
                <Carousel
                    selectedItem={currentSlide}
                    onChange={setCurrentSlide}
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                >
                    {data?.pictures?.length > 0 ? (
                        data.pictures.map((picture, index) => (
                            <div
                                style={{
                                    height: '210px',
                                    width: '100%',
                                    maxWidth: 450,
                                    justifyContent: 'center',
                                    backgroundImage: `url(/images/${picture.path})`, // Updated the URL
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    display: 'flex',
                                    margin: 'auto',
                                    border: '1px solid black'
                                }}
                                key={index}
                                onClick={() => window.open(`/images/${picture.path}`, '_blank')} // Updated the URL
                            >
                            </div>
                        ))
                    ) : (
                        <div
                            className="flex m-auto"
                            style={{
                                height: '210px',
                                width: '100%',
                                maxWidth: 450,
                                justifyContent: 'center',
                                backgroundImage: `url(${notfound})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                color: '#fff',
                                textAlign: 'center',
                                display: 'flex',
                                margin: 'auto',
                                border: '1px solid black'
                            }}
                        >
                        </div>
                    )}

                </Carousel>
            </>
        );
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            fullWidth={true}
            fullScreen={true}
            maxWidth="xl"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="w-full modal-container"
        >
            <Box sx={style}>
                <IconButton
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CancelIcon color="error" fontSize='large' />
                </IconButton>
                {data && (
                    <div className="mt-14">
                        <div>
                            {renderImage()}
                            {data && data.pictures && data.pictures.length > 0 ? (
                                <>
                                    <button
                                        onClick={handlePrevClick}
                                        style={{
                                            position: 'absolute',
                                            top: '18%',
                                            left: '10px',
                                            backgroundColor: '#0F2167',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            cursor: 'pointer',
                                            border: 'none',
                                            outline: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ArrowBackIosIcon style={{ color: '#ffffff', fontSize: '19px', fontWeight: '700' }} />
                                    </button>
                                    <button
                                        onClick={handleNextClick}
                                        style={{
                                            position: 'absolute',
                                            top: '18%',
                                            right: '10px',
                                            backgroundColor: '#0F2167',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            cursor: 'pointer',
                                            border: 'none',
                                            outline: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ArrowForwardIosIcon style={{ color: '#ffffff', fontSize: '19px', fontWeight: '700' }} />
                                    </button>
                                </>
                            ) : null}

                        </div>
                        <div className="flex flex-col ms-auto">
                            <div className='flex mt-[-20px] items-center bg-[#0F2167] w-full rounded-md'>
                                <p className='flex gap-3 text-center px-2 m-auto' style={{ color: 'white', textAlign: 'center' }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                    DETAIL INFORMATION
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-3 mt-3'>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableBody>
                                            {data && (
                                                <>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Container No.</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.containerNumber}
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Common Gate IN Time</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.gateInTime}
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Common Gate OUT Time</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.gateOutTime}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Brutto Weight</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.bruttoWeights}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Truck No</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.truckNumber}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Truck Company Name</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.truckCompanyName}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Truck Position</TableCell>
                                                        <TableCell style={{ textAlign: 'center', ffontSize: '11px', padding: '5px' }} >
                                                            {data?.truckPosition}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Vessel Name</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.vesselName}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Voyage</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.voyage}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>ATB (Actual Time Berthing)</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.ata}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>ATD (Actual Time Departure)</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.atd}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Port Of Discharge</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.portDischarge}
                                                        </TableCell>
                                                    </TableRow>
                                                    {/* <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Chacked by</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '12px', padding: '5px' }} >
                                                            {data?.checkedBy}
                                                        </TableCell>
                                                    </TableRow> */}
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Hold Remark</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.holdRemark}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Tag Number</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }} >
                                                            {data?.tagNumber}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Gate Number</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '5px' }}>
                                                            {data?.gateNumber}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Export/Import</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.exportImport}
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table" >
                                        <TableBody>
                                            {data && (
                                                <>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Hold Status</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.holdStatus}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Hold Type</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.holdType}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Document Type</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.documentType}
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Document No</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.documentNumber}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Document Date</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }}>
                                                            {data.documentDate}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Shippe/Consignee</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.consignee}
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>BL Number</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.blNumber}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>BC 1.1 Number</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.bcNumber}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>KPBC Code</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.kpbCode}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Transaction ID</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.transactionId}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Hold Time</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.holdTime}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Hold Note</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.holdNote}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Hold By</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.holdBy}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Release Time</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.releaseTime}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Release Note</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.releaseNote}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px', padding: '5px', fontWeight: '600' }}>Yard Location</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '11px', padding: '8px' }} >
                                                            {data?.yardLocation}
                                                        </TableCell>
                                                    </TableRow>
                                                    {/* <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px',   padding: '5px', fontWeight:'600' }}>Release by</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '12px', padding: '8px' }} >
                                                            {data?.releaseBy}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px',   padding: '5px', fontWeight:'600' }}>Seal</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '12px', padding: '8px' }} >
                                                            {data?.seal}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px',   padding: '5px', fontWeight:'600' }}>Seal Note</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '12px', padding: '8px' }} >
                                                            {data?.sealNote}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'left', fontSize: '11px',   padding: '5px', fontWeight:'600' }}>GATE OUT TIME</TableCell>
                                                        <TableCell style={{ textAlign: 'center', fontSize: '12px', padding: '8px' }} >
                                                            {data?.gateOutTime}
                                                        </TableCell>
                                                    </TableRow> */}
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                    </div>
                )}
            </Box>
        </Modal>
    )
}

export default ModalGate