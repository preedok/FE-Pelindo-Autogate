import React, { useState, useEffect } from "react";
import { Paper, TableContainer, TablePagination } from "@mui/material";
import CustomTable from '../../../../components/specialized/CustomTable';
import useDashboardStore from "../datas/store";

const LongStayCargo = () => {
  const { longStayCargo, fetchLongStayCargo } = useDashboardStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchLongStayCargo().finally(() => setLoading(false));
  }, [fetchLongStayCargo]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    { id: 'NO_VIN', label: 'No VIN', minWidth: 100 },
    { id: 'KD_OWNER', label: 'KD Owner', minWidth: 100 },
    { id: 'NM_OWNER', label: 'Nama Owner', minWidth: 100 },
    { id: 'NO_BL', label: 'No BL', minWidth: 100 },
    { id: 'YBLOK', label: 'Y Blok', minWidth: 100 },
    { id: 'YLINE', label: 'Y Line', minWidth: 100 },
    { id: 'YSLOT', label: 'Y Slot', minWidth: 100 },
    { id: 'NM_YBLOK', label: 'Nama Y Blok', minWidth: 100 },
    { id: 'TGL_GATE_IN', label: 'Tgl Gate In', minWidth: 100 },
    { id: 'LAMA_TIMBUN', label: 'Lama Timbun', minWidth: 100 },
    { id: 'TGL_ON_STORAGE', label: 'Tgl On Storage', minWidth: 100 },
  ];
  return (
    <TableContainer component={Paper}>
      <CustomTable
        columns={columns}
        loading={loading}
        rows={longStayCargo}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default LongStayCargo;