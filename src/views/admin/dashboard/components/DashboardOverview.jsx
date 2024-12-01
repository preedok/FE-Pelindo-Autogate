import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  LocalShipping as TruckIcon,
  LocationOn as GateIcon,
  Storage as StorageIcon
} from '@mui/icons-material';

const OverviewCard = ({ 
  icon, 
  title, 
  value, 
  percentage, 
  color = 'primary' 
}) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 2, 
      display: 'flex', 
      alignItems: 'center', 
      height: '100%' 
    }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar 
          sx={{ 
            bgcolor: `${color}.light`, 
            color: `${color}.main` 
          }}
        >
          {icon}
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6">{value}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={percentage} 
              color={color} 
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
            >
              {percentage}%
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Paper>
);
const DashboardOverview = ({ 
  totalTransactions = 0, 
  gateInTransactions = 0, 
  gateOutTransactions = 0,
  longStayCargo = 0 
}) => {
  const gateInPercentage = Math.round(
    (gateInTransactions / totalTransactions) * 100
  ) || 0;
  const gateOutPercentage = Math.round(
    (gateOutTransactions / totalTransactions) * 100
  ) || 0;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <OverviewCard 
          icon={<TruckIcon />}
          title="Total Transactions"
          value={totalTransactions}
          percentage={100}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <OverviewCard 
          icon={<GateIcon />}
          title="Gate In"
          value={gateInTransactions}
          percentage={gateInPercentage}
          color="success"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <OverviewCard 
          icon={<GateIcon />}
          title="Gate Out"
          value={gateOutTransactions}
          percentage={gateOutPercentage}
          color="info"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <OverviewCard 
          icon={<StorageIcon />}
          title="Long Stay Cargo"
          value={longStayCargo}
          percentage={longStayCargo > 10 ? 75 : 25}
          color="warning"
        />
      </Grid>
    </Grid>
  );
};

export default DashboardOverview;