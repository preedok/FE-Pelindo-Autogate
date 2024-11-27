import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, Grid,
    Divider, Box, Typography, Modal, IconButton, Button, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import api from '../../../../service/api';
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
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

const DownloadButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'none',
    fontWeight: 600,
}));
const ModalDetail = ({ open, handleClose, data, title, onSubmit, loading, reason, setReason }) => {
    const [downloadingHold, setDownloadingHold] = React.useState(false);
    const [downloadingRelease, setDownloadingRelease] = React.useState(false);
    const downloadFile = async (endpoint, fileType) => {
        const setDownloading = fileType === 'hold' ? setDownloadingHold : setDownloadingRelease;
        setDownloading(true);
        const token = localStorage.getItem('token')
        try {
            const response = await api.get(endpoint, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const contentDisposition = response.headers['content-disposition'];
            let filename = `${fileType}_file.pdf`;
            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
            handleClose();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `The ${fileType} file has been downloaded successfully!`,
            });
        } catch (error) {
            console.error('Download failed:', error);
            handleClose();
            Swal.fire({
                icon: 'error',
                title: 'Download Failed',
                text: error.message,
            });
        } finally {
            setDownloading(false);
        }
    };

    const downloadHoldFile = () => {
        downloadFile(`/AtensiP2/${data.id}/hold-file`, 'hold');
    };

    const downloadReleaseFile = () => {
        downloadFile(`/AtensiP2/${data.id}/release-file`, 'release');
    };
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
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="flex flex-col">
                        <div className="flex gap-5 mb-5">
                            <p>No.Container</p>
                            <input
                                type="text"
                                id="myInput"
                                name="myInput"
                                placeholder='No. Container'
                                disabled
                                value={data.containerNumber}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex gap-5">
                            <p>Keterangan</p>
                            <input
                                type="text"
                                id="myInput"
                                name="myInput"
                                onChange={(e) => setReason(e.target.value)}
                                placeholder='Keterangan'
                                className="shadow ms-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <Box mt={2}>
                        <DownloadButton
                            variant="contained"
                            color="primary"
                            startIcon={downloadingHold ? <CircularProgress size={20} /> : <FileDownloadIcon />}
                            onClick={downloadHoldFile}
                            disabled={downloadingHold}
                        >
                            {downloadingHold ? 'Downloading...' : 'Download Hold File'}
                        </DownloadButton>
                        
                    </Box>
                    <div className="flex ms-auto justify-end mt-5">
                        <Button variant='contained' size="small" onClick={onSubmit} disabled={loading}>
                            {loading ? <CircularProgress size={20} color="inherit" /> : title}
                        </Button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalDetail;