import React from 'react';
import { Box, Typography, Button, Modal, IconButton, CircularProgress } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '13px',
    p: 4,
};

const ReleaseModal = ({ open, handleClose, dataDetail, reason, setReason, loading, handleRelease }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CancelIcon color="error" fontSize='large' />
                </IconButton>
                <Typography style={{ fontWeight: '600' }} id="modal-modal-title" variant="h5" component="h2">
                    Input Alasan Release
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="flex flex-col">
                        <div className="flex gap-5 mb-5">
                            <p>No.Container</p>
                            <input
                                type="text"
                                placeholder='No. Container'
                                disabled
                                value={dataDetail.containerNumber}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex gap-5">
                            <p>Keterangan</p>
                            <input
                                type="text"
                                onChange={(e) => setReason(e.target.value)}
                                placeholder='Keterangan'
                                className="shadow ms-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="flex ms-auto justify-end mt-5">
                        <Button variant='contained' size="small" onClick={handleRelease} disabled={loading}>
                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Release'}
                        </Button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
};

export default ReleaseModal;