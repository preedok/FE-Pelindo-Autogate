import React from 'react';
import { FormControl, Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SearchIcon from "@mui/icons-material/Search";

const HistoryFilter = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleSearch,
    loading,
    filterUser,
    handleUserFilterChange,
    users
}) => {
    const handleStartDateChange = (date) => {
        setStartDate(date ? format(date, "dd-MM-yyyy HH:mm") : '');
    };

    const handleEndDateChange = (date) => {
        setEndDate(date ? format(date, "dd-MM-yyyy HH:mm") : '');
    };

    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [datePart, timePart] = dateString.split(' ');
        if (!datePart || !timePart) return null;
        const [day, month, year] = datePart.split('-');
        const [hours, minutes] = timePart.split(':');
        return new Date(year, month - 1, day, hours, minutes);
    };

    return (
        <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex items-center">
                <label className="w-32 font-bold">Username</label>
                <FormControl fullWidth sx={{ maxWidth: '250px' }}>
                    <Select
                        value={filterUser}
                        onChange={handleUserFilterChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        size="small"
                    >
                        <MenuItem value="">SEMUA</MenuItem>
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.email}>{user.email}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="flex items-center">
                <label className="w-32 font-bold">TANGGAL</label>
                <div className="flex space-x-2 items-center">
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
                        <DateTimePicker
                            label="Tanggal Mulai"
                            value={parseDate(startDate)}
                            onChange={handleStartDateChange}
                            slotProps={{
                                textField: { size: 'small' }
                            }}
                            format="dd-MM-yyyy HH:mm"
                            ampm={false}
                        />
                        <DateTimePicker
                            label="Tanggal Akhir"
                            value={parseDate(endDate)}
                            onChange={handleEndDateChange}
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
            </div>
        </div>
    );
};

export default HistoryFilter;