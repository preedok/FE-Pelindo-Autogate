import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { differenceInDays } from "date-fns";

const LongStayCargo = ({ data }) => {
  const calculateDaysInStorage = (gateInDate) => {
    if (!gateInDate) return 0;
    const today = new Date();
    const inDate = new Date(gateInDate);
    return differenceInDays(today, inDate);
  };
  const getStorageStatus = (daysInStorage) => {
    if (daysInStorage <= 7) return { label: "Normal", color: "success" };
    if (daysInStorage <= 14) return { label: "Warning", color: "warning" };
    return { label: "Critical", color: "error" };
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>VIN</TableCell>
              <TableCell>Vehicle Details</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Gate In Date</TableCell>
              <TableCell>Days in Storage</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((cargo, index) => {
              const daysInStorage = calculateDaysInStorage(cargo.TGL_GATE_IN);
              const storageStatus = getStorageStatus(daysInStorage);

              return (
                <TableRow key={index}>
                  <TableCell>{cargo.NO_VIN}</TableCell>
                  <TableCell>
                    {cargo.MERK_CAR} {cargo.NM_UNIT}
                    <Typography variant="body2" color="text.secondary">
                      {cargo.JENIS_CAR}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {cargo.NM_OWNER}
                    <Typography variant="body2" color="text.secondary">
                      {cargo.KD_ONWER}
                    </Typography>
                  </TableCell>
                  <TableCell>{cargo.TGL_GATE_IN}</TableCell>
                  <TableCell>{daysInStorage} days</TableCell>
                  <TableCell>
                    <Chip
                      label={storageStatus.label}
                      color={storageStatus.color}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LongStayCargo;
