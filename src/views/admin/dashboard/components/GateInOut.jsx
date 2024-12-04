import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Card,
  Button,
  Grid,
  Switch,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/material/styles';

const carouselItems = [
  { id: 1, image: 'https://via.placeholder.com/400x200?text=Image+1' },
  { id: 2, image: 'https://via.placeholder.com/400x200?text=Image+2' },
  { id: 3, image: 'https://via.placeholder.com/400x200?text=Image+3' },
];

const LiveStreamImages = ({ onSwitch }) => (
  <Grid container spacing={2}>
    {Array.from({ length: 4 }, (_, index) => (
      <Grid item xs={6} key={index} className="relative">
        <img
          src={`https://via.placeholder.com/150?text=Image+${index + 1}`}
          alt={`Live Stream ${index + 1}`}
          className="w-full h-32 object-cover rounded-lg"
        />
        <Switch
          onChange={() => onSwitch(index + 1)}
          className="absolute bottom-2 right-2"
        />
      </Grid>
    ))}
  </Grid>
);

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const GateInOut = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLiveCapture, setIsLiveCapture] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openPortalModal, setOpenPortalModal] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState(0);
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setIsLiveCapture(true); // Reset to Live Capture when changing tabs
  };

  const handleToggleLiveMode = () => {
    setIsLiveCapture((prev) => !prev);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const handleOpenPortalModal = () => {
    setOpenPortalModal(true);
  };

  const handleClosePortalModal = () => {
    setOpenPortalModal(false);
    setReason('');
    setSelectedReason('');
  };

  const handleDetailTabChange = (event, newValue) => {
    setActiveDetailTab(newValue);
  };

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleReasonTextChange = (event) => {
    setReason(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Gate In" />
          <Tab label="Gate Out" />
        </Tabs>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Tool 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Tool 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Tool 3</MenuItem>
        </Menu>
      </div>

      <div className='flex gap-2 w-full'>
        <StyledCard className="mt-4 w-full">
          <div className='flex justify-between items-center mb-4'>
            <StyledButton
              variant="contained"
              color={isLiveCapture ? 'primary' : 'secondary'}
              onClick={handleToggleLiveMode}
            >
              {isLiveCapture ? 'Live Capture' : 'Live Stream'}
            </StyledButton>
            <Typography variant="h5">
              12-10-2024
            </Typography>
            <Typography variant="h5">
              {activeTab === 0 ? 'Gate In' : 'Gate Out'}
            </Typography>
          </div>
          {isLiveCapture ? (
            <Carousel>
              {carouselItems.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt={`Carousel ${item.id}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <LiveStreamImages onSwitch={(item) => console.log(`Switching to Image ${item}`)} />
          )}

          <div className="mt-4">
            <Typography variant="body1"><strong>Visit ID:</strong> TRK3988917038722376</Typography>
            <Typography variant="body1"><strong>Nomor TID:</strong> N01623</Typography>
            <Typography variant="body1"><strong>Jumlah VIN:</strong> 6</Typography>
            <Typography variant="body1"><strong>Tipe Dokumen:</strong> -</Typography>
            <Typography variant="body1"><strong>Keterangan:</strong> GIN</Typography>
            <Typography variant="body1"><strong>No. Polisi Truk:</strong> B9003KEI</Typography>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex space-x-4">
              <StyledButton variant="outlined" onClick={handleOpenDetailModal}>Detail</StyledButton>
              <StyledButton variant="outlined" color="success" onClick={handleOpenPortalModal}>Open Portal</StyledButton>
            </div>
          </div>
        </StyledCard>
        <StyledCard className="mt-4 w-full">
          <div className='flex justify-between items-center mb-4'>
            <StyledButton
              variant="contained"
              color={isLiveCapture ? 'primary' : 'secondary'}
              onClick={handleToggleLiveMode}
            >
              {isLiveCapture ? 'Live Capture' : 'Live Stream'}
            </StyledButton>
            <Typography variant="h5">
              12-10-2024
            </Typography>
            <Typography variant="h5">
              {activeTab === 0 ? 'Gate In' : 'Gate Out'}
            </Typography>
          </div>
          {isLiveCapture ? (
            <Carousel>
              {carouselItems.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt={`Carousel ${item.id}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <LiveStreamImages onSwitch={(item) => console.log(`Switching to Image ${item}`)} />
          )}

          <div className="mt-4">
            <Typography variant="body1"><strong>Visit ID:</strong> TRK3988917038722376</Typography>
            <Typography variant="body1"><strong>Nomor TID:</strong> N01623</Typography>
            <Typography variant="body1"><strong>Jumlah VIN:</strong> 6</Typography>
            <Typography variant="body1"><strong>Tipe Dokumen:</strong> -</Typography>
            <Typography variant="body1"><strong>Keterangan:</strong> GIN</Typography>
            <Typography variant="body1"><strong>No. Polisi Truk:</strong> B9003KEI</Typography>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex space-x-4">
              <StyledButton variant="outlined" onClick={handleOpenDetailModal}>Detail</StyledButton>
              <StyledButton variant="outlined" color="success" onClick={handleOpenPortalModal}>Open Portal</StyledButton>
            </div>
          </div>
        </StyledCard>
      </div>
      {/* Detail Modal */}
      <Dialog open={openDetailModal} onClose={handleCloseDetailModal} maxWidth="lg" fullWidth>
        <DialogTitle>Detail Information</DialogTitle>
        <DialogContent>
          <Carousel>
            {carouselItems.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt={`Carousel ${item.id}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>
          <Tabs value={activeDetailTab} onChange={handleDetailTabChange}>
            <Tab label="Transaksi" />
            <Tab label="Daftar VIN" />
          </Tabs>
          {activeDetailTab === 0 && (
            <div>
              <Typography variant="body1"><strong>Visit ID:</strong> TRK3988917038722376</Typography>
              <Typography variant="body1"><strong>Jumlah VIN:</strong> 6</Typography>
              <Typography variant="body1"><strong>Keterangan:</strong> GIN</Typography>
              <Typography variant="body1"><strong>Tipe Dokumen:</strong> -</Typography>
              <Typography variant="body1"><strong>No. Polisi Truk:</strong> B9003KEI</Typography>
            </div>
          )}
          {activeDetailTab === 1 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>VIN</TableCell>
                    <TableCell>Type Cargo</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>CAR MAKER</TableCell>
                    <TableCell>BL Number</TableCell>
                    <TableCell>BL Date</TableCell>
                    <TableCell>BC Number IN</TableCell>
                    <TableCell>BC Date IN</TableCell>
                    <TableCell>BC Number OUT</TableCell>
                    <TableCell>BC Date OUT</TableCell>
                    <TableCell>Load Port</TableCell>
                    <TableCell>Transit Port</TableCell>
                    <TableCell>Discharge Port</TableCell>
                    <TableCell>Next Port</TableCell>
                    <TableCell>Document Date</TableCell>
                    <TableCell>Document Type</TableCell>
                    <TableCell>Document Number</TableCell>
                    <TableCell>Hold Status</TableCell>
                    <TableCell>Auto Hold</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>VIN123456</TableCell>
                    <TableCell>Type A</TableCell>
                    <TableCell>Model X</TableCell>
                    <TableCell>Maker Y</TableCell>
                    <TableCell>BL123</TableCell>
                    <TableCell>2024-10-12</TableCell>
                    <TableCell>BC123</TableCell>
                    <TableCell>2024-10-12</TableCell>
                    <TableCell>BC456</TableCell>
                    <TableCell>2024-10-13</TableCell>
                    <TableCell>Port A</TableCell>
                    <TableCell>Port B</TableCell>
                    <TableCell>Port C</TableCell>
                    <TableCell>Port D</TableCell>
                    <TableCell>2024-10-14</TableCell>
                    <TableCell>Type 1</TableCell>
                    <TableCell>Doc123</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Open Portal Modal */}
      <Dialog open={openPortalModal} onClose={handleClosePortalModal} maxWidth="sm" fullWidth>
        <DialogTitle>Open Portal Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure to open manual portal for Truck with Plate (B9003KEI) and VisitID (TRK3988917038722376)?</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Reason Open Portal</InputLabel>
            <Select value={selectedReason} onChange={handleReasonChange}>
              <SelectMenuItem value="Reason 1">Reason 1</SelectMenuItem>
              <SelectMenuItem value="Reason 2">Reason 2</SelectMenuItem>
              <SelectMenuItem value="Reason 3">Reason 3</SelectMenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Additional Reason"
            multiline
            rows={4}
            value={reason}
            onChange={handleReasonTextChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePortalModal}>Cancel</Button>
          <Button onClick={() => { /* Handle open portal logic */ handleClosePortalModal(); }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GateInOut;