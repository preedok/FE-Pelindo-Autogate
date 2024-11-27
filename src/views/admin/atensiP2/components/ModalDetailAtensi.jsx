import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import api from '../../../../service/api';
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[10],
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const FieldGroup = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  height: '100%',
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1rem',
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: 'none',
  fontWeight: 600,
}));
const ModalDetailAtensi = ({ open, handleClose, data, loading, activeTab }) => {
  const [downloadingHold, setDownloadingHold] = React.useState(false);
  const [downloadingRelease, setDownloadingRelease] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  if (!data) return null;

  const importantFields = [
    { label: 'Container Number', key: 'containerNumber' },
    { label: 'Document Number', key: 'documentNumber' },
    { label: 'Document Type', key: 'documentType' },
    { label: 'Document Date', key: 'documentDate', format: (value) => format(new Date(value), 'dd MMM yyyy') },
    { label: 'Hold Date', key: 'holdDate', format: (value) => format(new Date(value), 'dd MMM yyyy') },
    { label: 'Release Date', key: 'releaseDate', format: (value) => value ? format(new Date(value), 'dd MMM yyyy') : 'N/A' },
    { label: 'Export/Import', key: 'exportImport' },
    { label: 'Hold By', key: 'inputBy' },
    { label: 'Release By', key: 'releaseBy' },
    { label: 'Hold Reason', key: 'reason' },
    { label: 'Release Note', key: 'releaseNote' },
  ];

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
    <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth fullScreen={fullScreen}>
      <StyledDialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="span">Container Detail</Typography>
          <Tooltip title="This dialog shows detailed information about the container">
            <InfoOutlinedIcon fontSize="small" style={{ marginLeft: 8 }} />
          </Tooltip>
        </Box>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <ContentWrapper>
            <Grid container spacing={2}>
              {importantFields.map((field) => (
                <Grid item xs={12} sm={6} md={4} key={field.key}>
                  <FieldGroup>
                    <LabelTypography variant="subtitle2">{field.label}</LabelTypography>
                    <ValueTypography variant="body1">
                      {field.format ? field.format(data[field.key]) : (data[field.key] || 'N/A')}
                    </ValueTypography>
                  </FieldGroup>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={3}>
              {(activeTab === 0 || activeTab === 1) && (
                <DownloadButton
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={downloadingHold ? <CircularProgress size={16} /> : <FileDownloadIcon />}
                  onClick={downloadHoldFile}
                  disabled={downloadingHold}
                >
                  {downloadingHold ? 'Downloading...' : 'Download Hold File'}
                </DownloadButton>
              )}
              {activeTab === 1 && (
                <DownloadButton
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={downloadingRelease ? <CircularProgress size={16} /> : <FileDownloadIcon />}
                  onClick={downloadReleaseFile}
                  disabled={downloadingRelease}
                >
                  {downloadingRelease ? 'Downloading...' : 'Download Release File'}
                </DownloadButton>
              )}
            </Box>
          </ContentWrapper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined" size="small">
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ModalDetailAtensi;