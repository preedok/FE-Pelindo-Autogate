import React from 'react';
import { Box, Typography, Modal, IconButton, Button, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '13px',
    p: 4,
};

const ModalAdd = ({ open, handleClose, handleAdd, loadingAdd, documentNumber, setdocumentNumber, documentType, setdocumentType, documentDate, setdocumentDate, isActive, setisActive, reason, setIsReason, containerNumber, setContainerNumber, exportImport, setExportImport, holdFile, setHoldFile }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style1}>
                <IconButton
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CancelIcon color="error" fontSize='large' />
                </IconButton>
                <Typography style={{ fontWeight: '600' }} id="modal-modal-title" variant="h5" component="h2">
                    Input Document Atensi P2
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="flex flex-col">
                        <div className="flex gap-5 mb-5">
                            <p>Hold File</p>
                            <input
                                type="file"
                                id="holdFile"
                                name="holdFile"
                                onChange={(e) => setHoldFile(e.target.files[0])}
                                className="shadow ms-auto appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex gap-5 mb-5">
                            <p>No.Document</p>
                            <input
                                type="text"
                                id="myInput"
                                name="myInput"
                                placeholder='No.Document'
                                value={documentNumber}
                                onChange={(e) => setdocumentNumber(e.target.value)}
                                className="shadow ms-auto appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex gap-5 mb-5">
                            <p>Jenis Document</p>
                            <input
                                type="text"
                                id="myInput"
                                name="myInput"
                                placeholder='Jenis Document'
                                value={documentType}
                                onChange={(e) => setdocumentType(e.target.value)}
                                className="shadow ms-auto appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex gap-5 mb-5">
                            <p>Tanggal Document</p>
                            <input
                                type="date"
                                id="myInput"
                                name="myInput"
                                value={documentDate.substring(0, 10)}
                                onChange={(e) => setdocumentDate(e.target.value)}
                                className="shadow ms-auto appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex gap-5 mb-5">
                            <p>Export/Import</p>
                            <div className="flex gap-4 m-auto">
                                <Button
                                    variant={exportImport === 'E' ? 'contained' : 'outlined'}
                                    onClick={() => setExportImport('E')}
                                >
                                    Export
                                </Button>
                                <Button
                                    variant={exportImport === 'I' ? 'contained' : 'outlined'}
                                    onClick={() => setExportImport('I')}
                                >
                                    Import
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-5 mb-5">
                            <p>No. Container</p>
                            <input
                                type="text"
                                id="myInput"
                                name="myInput"
                                placeholder='No. Container'
                                value={containerNumber}
                                onChange={(e) => setContainerNumber(e.target.value)}
                                className="shadow ms-auto appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex gap-5 mb-5">
                            <p>Alasan</p>
                            <textarea
                                type="text"
                                id="myInput"
                                name="myInput"
                                placeholder='Alasan'
                                value={reason}
                                onChange={(e) => setIsReason(e.target.value)}
                                className="shadow ms-auto appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="flex ms-auto justify-end mt-5">
                        <Button variant='contained' size="small" onClick={handleAdd} disabled={loadingAdd}>
                            {loadingAdd ? <CircularProgress size={20} color="inherit" /> : 'Add'}
                        </Button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalAdd;