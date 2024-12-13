import React, { useEffect, useState } from "react";
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
import useDashboardStore from "../datas/store"; // Import the store

const carouselItems = [
  { id: 1, image: "https://via.placeholder.com/400x200?text=Image+1" },
  { id: 2, image: "https://via.placeholder.com/400x200?text=Image+2" },
  { id: 3, image: "https://via.placeholder.com/400x200?text=Image+3" },
];

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

  // Access the store
  const { fetchDashboardTransaction, dashboardTransaction } = useDashboardStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardTransaction("IKTIN01");
    fetchDashboardTransaction("IKTIN02");
  }, [fetchDashboardTransaction]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
          <Tab label="Gate In" />
          <Tab label="Gate Out" />
        </Tabs>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>Tool 1</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Tool 2</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Tool 3</MenuItem>
        </Menu>
      </div>

      <div className="flex gap-2 w-full">
        {dashboardTransaction.map((transaction, index) => (
          <StyledCard key={index} className="mt-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <StyledButton variant="contained" color={isLiveCapture ? "primary" : "secondary"} onClick={() => setIsLiveCapture(!isLiveCapture)}>
                {isLiveCapture ? "Live Capture" : "Live Stream"}
              </StyledButton>
              <Typography variant="h5">{transaction.TGL_GATE_IN}</Typography>
              <Typography variant="h5">{activeTab === 0 ? "Gate In" : "Gate Out"}</Typography>
            </div>

            {isLiveCapture ? (
              <Carousel>
                {carouselItems.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt={`Carousel ${item.id}`} className="w-full h-28 object-cover rounded-lg" />
                  </div>
                ))}
              </Carousel>
            ) : (
              <LiveStreamImages onSwitch={(item) => console.log(`Switching to Image ${item}`)} />
            )}

            <div className="mt-4 flex gap-2">
              <div>
                <Typography variant="body1"><strong>Visit ID</strong></Typography>
                <Typography variant="body1"><strong>Nomor TID</strong></Typography>
                <Typography variant="body1"><strong>Jumlah VIN</strong></Typography>
                <Typography variant="body1"><strong>Tipe Dokumen</strong></Typography>
                <Typography variant="body1"><strong>Keterangan</strong></Typography>
                <Typography variant="body1"><strong>No. Polisi Truk</strong></Typography>
              </div>
              <div>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
              </div>
              <div>
                <Typography variant="body1"><strong>{transaction.NO_TIKET}</strong></Typography>
                <Typography variant="body1"><strong>{transaction.NO_UID}</strong></Typography>
                <Typography variant="body1"><strong>{transaction.JUMLAH_VIN}</strong></Typography>
                <Typography variant="body1"><strong>{transaction.NAMA_DOC_BC || '-'}</strong></Typography>
                <Typography variant="body1"><strong>GIN</strong></Typography>
                <Typography variant="body1"><strong>{transaction.NOPOL}</strong></Typography>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <div className="flex space-x-4">
                <StyledButton variant="contained" onClick={() => setOpenDetailModal(true)}>Detail</StyledButton>
                <StyledButton variant="contained" color="success" onClick={() => setOpenPortalModal(true)}>Open Portal</StyledButton>
              </div>
            </div>
          </StyledCard>
        ))}
        {dashboardTransaction.map((transaction, index) => (
          <StyledCard key={index} className="mt-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <StyledButton variant="contained" color={isLiveCapture ? "primary" : "secondary"} onClick={() => setIsLiveCapture(!isLiveCapture)}>
                {isLiveCapture ? "Live Capture" : "Live Stream"}
              </StyledButton>
              <Typography variant="h5">{transaction.TGL_GATE_IN}</Typography>
              <Typography variant="h5">{activeTab === 0 ? "Gate In" : "Gate Out"}</Typography>
            </div>

            {isLiveCapture ? (
              <Carousel>
                {carouselItems.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt={`Carousel ${item.id}`} className="w-full h-28 object-cover rounded-lg" />
                  </div>
                ))}
              </Carousel>
            ) : (
              <LiveStreamImages onSwitch={(item) => console.log(`Switching to Image ${item}`)} />
            )}

            <div className="mt-4 flex gap-2">
              <div>
                <Typography variant="body1"><strong>Visit ID</strong></Typography>
                <Typography variant="body1"><strong>Nomor TID</strong></Typography>
                <Typography variant="body1"><strong>Jumlah VIN</strong></Typography>
                <Typography variant="body1"><strong>Tipe Dokumen</strong></Typography>
                <Typography variant="body1"><strong>Keterangan</strong></Typography>
                <Typography variant="body1"><strong>No. Polisi Truk</strong></Typography>
              </div>
              <div>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
                <Typography variant="body1"><strong>:</strong></Typography>
              </div>
              <div>
                <Typography variant="body1"><strong>{transaction.NO_TIKET}</strong></Typography>
                <Typography variant="body1"><strong>{transaction.NO_UID}</strong></Typography>
                <Typography variant="body1"><strong>{transaction.JUMLAH_VIN}</strong></Typography>
                <Typography variant="body1"><strong>{transaction.NAMA_DOC_BC || '-'}</strong></Typography>
                <Typography variant="body1"><strong>GIN</strong></Typography>
                <Typography variant="body1"><strong>{transaction.NOPOL}</strong></Typography>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <div className="flex space-x-4">
                <StyledButton variant="contained" onClick={() => setOpenDetailModal(true)}>Detail</StyledButton>
                <StyledButton variant="contained" color="success" onClick={() => setOpenPortalModal(true)}>Open Portal</StyledButton>
              </div>
            </div>
          </StyledCard>
        ))}
      </div>

      <Dialog open={openDetailModal} onClose={() => setOpenDetailModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>Detail Information</span>
            <IconButton onClick={() => setOpenDetailModal(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Carousel>
            {carouselItems.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={`Carousel ${item.id}`} className="w-full h-48 object-cover rounded-lg" />
              </div>
            ))}
          </Carousel>
          <Tabs value={activeDetailTab} onChange={(e, newValue) => setActiveDetailTab(newValue)}>
            <Tab label="Transaksi" />
            <Tab label="Daftar VIN" />
          </Tabs>
          {activeDetailTab === 0 && (
            <div className="mt-5">
              <Typography variant="body1"><strong>Visit ID:</strong> TRK3988917038722376</Typography>
              <Typography variant="body1"><strong>Jumlah VIN:</strong> 6</Typography>
              <Typography variant="body1"><strong>Keterangan:</strong> GIN</Typography>
              <Typography variant="body1"><strong>Tipe Dokumen:</strong> -</Typography>
              <Typography variant="body1"><strong>No. Polisi Truk:</strong> B9003KEI</Typography>
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

      <Dialog open={openPortalModal} onClose={() => setOpenPortalModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>Open Portal Confirmation</span>
            <IconButton onClick={() => setOpenPortalModal(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure to open manual portal for Truck with Plate ({dashboardTransaction[0]?.NOPOL}) and VisitID ({dashboardTransaction[0]?.NO_TIKET})?
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Reason Open Portal</InputLabel>
            <Select value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
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
            onChange={(e) => setReason(e.target.value)}
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