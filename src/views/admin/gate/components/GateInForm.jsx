import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert 
} from '@mui/material';

const GateInForm = ({ onSubmit, transaction, loading, error }) => {
  const [trx, setTrx] = useState('');
  const [laneposisi, setLaneposisi] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({
        trx,
        posisi: 'IN',
        laneposisi
      });
    } catch (submitError) {
      console.error('Gate In submission error:', submitError);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Gate In Transaction
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {transaction && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Transaction Successful: {transaction.message}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Transaction Number / UID"
        value={trx}
        onChange={(e) => setTrx(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Lane Position (Optional)"
        value={laneposisi}
        onChange={(e) => setLaneposisi(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Gate In'}
      </Button>

      {transaction && transaction.rsInfo && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Transaction Details:</Typography>
          <pre>{JSON.stringify(transaction.rsInfo, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default GateInForm;