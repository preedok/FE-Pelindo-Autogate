import React from 'react';
import { Button, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { id } from 'date-fns/locale';

const ArsipFilter = ({
    gateDevice,
    handleChangeDevice,
    selectedStartDate,
    selectedEndDate,
    handleDateChange,
    handleDateChange1,
    loading,
    handleSearch
}) => {
    return (
        <>
            <div className="flex item-center flex-col sm:flex-row w-full gap-5 mt-5">
                <h5 className="font-bold me-2">EXPORT/IMPORT</h5>
                <FormControl fullWidth sx={{ backgroundColor: 'white', width: '250px' }}>
                    <select
                        id="demo-simple-select-helper"
                        className="px-1 py-2 rounded-sm"
                        value={gateDevice}
                        onChange={handleChangeDevice}
                        size="small"
                        style={{ border: '1px solid #B6C4B6', borderRadius: '4px' }}
                    >
                        <option value="">ALL</option>
                        <option value="E">EXPORT</option>
                        <option value="I">IMPORT</option>
                    </select>
                </FormControl>
            </div>
            <div className="flex item-center gap-5 flex-col sm:flex-row w-full mt-5">
                <h5 className="font-bold me-24">DATE</h5>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
                    <DateTimePicker
                        label="Tanggal Mulai"
                        value={selectedStartDate}
                        onChange={handleDateChange}
                        slotProps={{
                            textField: { size: 'small' }
                        }}
                        format="dd-MM-yyyy HH:mm"
                        ampm={false}
                    />
                    <DateTimePicker
                        label="Tanggal Akhir"
                        value={selectedEndDate}
                        onChange={handleDateChange1}
                        slotProps={{
                            textField: { size: 'small' }
                        }}
                        format="dd-MM-yyyy HH:mm"
                        ampm={false}
                    />
                </LocalizationProvider>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleSearch}
                    sx={{ backgroundColor: "#0F2167", height: "38px" }}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin me-2"></div>
                        </div>
                    ) : (
                        <SearchIcon />
                    )}
                    Cari
                </Button>
            </div>
        </>
    );
};

export default ArsipFilter;