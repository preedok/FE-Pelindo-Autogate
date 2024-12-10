import React, { useState } from "react";
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
  Box
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import CustomTable from "../../../../components/specialized/CustomTable";
import CloseIcon from "@mui/icons-material/Close";
const carouselItems = [
  { id: 1, image: "https://via.placeholder.com/400x200?text=Image+1" },
  { id: 2, image: "https://via.placeholder.com/400x200?text=Image+2" },
  { id: 3, image: "https://via.placeholder.com/400x200?text=Image+3" },
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
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
}));
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "5px",
  "&:hover": {
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
  const [reason, setReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const vinColumns = [
    { id: "no", label: "No", minWidth: 50, align: "center" },
    { id: "vin", label: "VIN", minWidth: 100 },
    { id: "typeCargo", label: "Type Cargo", minWidth: 100 },
    { id: "model", label: "Model", minWidth: 100 },
    { id: "carMaker", label: "CAR MAKER", minWidth: 100 },
    { id: "blNumber", label: "BL Number", minWidth: 100 },
    { id: "blDate", label: "BL Date", minWidth: 100 },
    { id: "bcNumberIn", label: "BC Number IN", minWidth: 100 },
    { id: "bcDateIn", label: "BC Date IN", minWidth: 100 },
    { id: "bcNumberOut", label: "BC Number OUT", minWidth: 100 },
    { id: "bcDateOut", label: "BC Date OUT", minWidth: 100 },
    { id: "loadPort", label: "Load Port", minWidth: 100 },
    { id: "transitPort", label: "Transit Port", minWidth: 100 },
    { id: "dischargePort", label: "Discharge Port", minWidth: 100 },
    { id: "nextPort", label: "Next Port", minWidth: 100 },
    { id: "documentDate", label: "Document Date", minWidth: 100 },
    { id: "documentType", label: "Document Type", minWidth: 100 },
    { id: "documentNumber", label: "Document Number", minWidth: 100 },
    { id: "holdStatus", label: "Hold Status", minWidth: 100 },
    { id: "autoHold", label: "Auto Hold", minWidth: 100 },
  ];
  const vinRows = [
    {
      no: 1,
      vin: "VIN123456",
      typeCargo: "Type A",
      model: "Model X",
      carMaker: "Maker Y",
      blNumber: "BL123",
      blDate: "2024-10-12",
      bcNumberIn: "BC123",
      bcDateIn: "2024-10-12",
      bcNumberOut: "BC456",
      bcDateOut: "2024-10-13",
      loadPort: "Port A",
      transitPort: "Port B",
      dischargePort: "Port C",
      nextPort: "Port D",
      documentDate: "2024-10-14",
      documentType: "Type 1",
      documentNumber: "Doc123",
      holdStatus: "Active",
      autoHold: "No",
    },
  ];
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setIsLiveCapture(true);
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
    setReason("");
    setSelectedReason("");
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <div className="flex gap-2 w-full">
        <StyledCard className="mt-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <StyledButton
              variant="contained"
              color={isLiveCapture ? "primary" : "secondary"}
              onClick={handleToggleLiveMode}
            >
              {isLiveCapture ? "Live Capture" : "Live Stream"}
            </StyledButton>
            <Typography variant="h5">12-10-2024</Typography>
            <Typography variant="h5">
              {activeTab === 0 ? "Gate In" : "Gate Out"}
            </Typography>
          </div>
          {isLiveCapture ? (
            <Carousel>
              {carouselItems.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt={`Carousel ${item.id}`}
                    className="w-full h-58 object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <LiveStreamImages
              onSwitch={(item) => console.log(`Switching to Image ${item}`)}
            />
          )}

          <div className="mt-4 flex gap-2">
            <div>
              <Typography variant="body1">
                <strong>Visit ID</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Nomor TID</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Jumlah VIN</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Tipe Dokumen</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Keterangan</strong>
              </Typography>
              <Typography variant="body1">
                <strong>No. Polisi Truk</strong>
              </Typography>

            </div>
            <div>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>

            </div>
            <div>
              <Typography variant="body1">
                <strong>TRK3988917038722376</strong>
              </Typography>
              <Typography variant="body1">
                <strong>N01623</strong>
              </Typography>
              <Typography variant="body1">
                <strong>6</strong>
              </Typography>
              <Typography variant="body1">
                <strong>-</strong>
              </Typography>
              <Typography variant="body1">
                <strong>GIN</strong>
              </Typography>
              <Typography variant="body1">
                <strong>B9003KEI</strong>
              </Typography>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex space-x-4">
              <StyledButton variant="contained" onClick={handleOpenDetailModal}>
                Detail
              </StyledButton>
              <StyledButton
                variant="contained"
                color="success"
                onClick={handleOpenPortalModal}
              >
                Open Portal
              </StyledButton>
            </div>
          </div>
        </StyledCard>
        <StyledCard className="mt-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <StyledButton
              variant="contained"
              color={isLiveCapture ? "primary" : "secondary"}
              onClick={handleToggleLiveMode}
            >
              {isLiveCapture ? "Live Capture" : "Live Stream"}
            </StyledButton>
            <Typography variant="h5">12-10-2024</Typography>
            <Typography variant="h5">
              {activeTab === 0 ? "Gate In" : "Gate Out"}
            </Typography>
          </div>
          {isLiveCapture ? (
            <Carousel>
              {carouselItems.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt={`Carousel ${item.id}`}
                    className="w-full h-58 object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <LiveStreamImages
              onSwitch={(item) => console.log(`Switching to Image ${item}`)}
            />
          )}

          <div className="mt-4 flex gap-2">
            <div>
              <Typography variant="body1">
                <strong>Visit ID</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Nomor TID</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Jumlah VIN</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Tipe Dokumen</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Keterangan</strong>
              </Typography>
              <Typography variant="body1">
                <strong>No. Polisi Truk</strong>
              </Typography>

          </div>
            <div>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>:</strong>
              </Typography>

            </div>
            <div>
              <Typography variant="body1">
                <strong>TRK3988917038722376</strong>
              </Typography>
              <Typography variant="body1">
                <strong>N01623</strong>
              </Typography>
              <Typography variant="body1">
                <strong>6</strong>
              </Typography>
              <Typography variant="body1">
                <strong>-</strong>
              </Typography>
              <Typography variant="body1">
                <strong>GIN</strong>
              </Typography>
              <Typography variant="body1">
                <strong>B9003KEI</strong>
              </Typography>
           </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex space-x-4">
              <StyledButton variant="contained" onClick={handleOpenDetailModal}>
                Detail
              </StyledButton>
              <StyledButton
                variant="contained"
                color="success"
                onClick={handleOpenPortalModal}
              >
                Open Portal
              </StyledButton>
            </div>
          </div>
        </StyledCard>
      </div>
      <Dialog
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>Detail Information</span>
            <IconButton onClick={handleCloseDetailModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
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
            <div className="mt-5">
              <Typography variant="body1">
                <strong>Visit ID:</strong> TRK3988917038722376
              </Typography>
              <Typography variant="body1">
                <strong>Jumlah VIN:</strong> 6
              </Typography>
              <Typography variant="body1">
                <strong>Keterangan:</strong> GIN
              </Typography>
              <Typography variant="body1">
                <strong>Tipe Dokumen:</strong> -
              </Typography>
              <Typography variant="body1">
                <strong>No. Polisi Truk:</strong> B9003KEI
              </Typography>
            </div>
          )}
          {activeDetailTab === 1 && (
            <CustomTable
              columns={vinColumns}
              rows={vinRows}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              loading={false}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openPortalModal}
        onClose={handleClosePortalModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>Open Portal Confirmation</span>
            <IconButton onClick={handleClosePortalModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure to open manual portal for Truck with Plate (B9003KEI)
            and VisitID (TRK3988917038722376)?
          </Typography>
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
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              handleClosePortalModal();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GateInOut;
