import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/auth/login";
import Layout from "../layout/layout";
import Dashboard from "../views/admin/dashboard";
import Transaction from "../views/admin/transaction";
import ConfirmBcCa from "../views/admin/confirm-bc-ca";
import ReportExport from "../views/admin/report/export";
import ReportImport from "../views/admin/report/import";
import RFIDCargo from "../views/admin/report-cartos/rfid-cargo";
import VesselExport from "../views/admin/report-cartos/vessel-export";
import VesselImport from "../views/admin/report-cartos/vessel-import";
import TruckExport from "../views/admin/report-cartos/truck-export";
import TruckImport from "../views/admin/report-cartos/truck-import";
import YarnExport from "../views/admin/report-cartos/yarn-export";
import YarnImport from "../views/admin/report-cartos/yarn-import";
import ReportExportDKP from "../views/admin/exs-dkp/report-export-dkp";
import MonitoringYarnDKP from "../views/admin/exs-dkp/monitoring-yarn-dkp";
import MonthlyReport from "../views/admin/report-ams/monthly-report";
import DailyReport from "../views/admin/report-ams/daily-report";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/transaction" element={<Layout />}>
          <Route index element={<Transaction />} />
        </Route>
        <Route path="/confirm-update-bc-ca" element={<Layout />}>
          <Route index element={<ConfirmBcCa />} />
        </Route>
        <Route path="/report-export" element={<Layout />}>
          <Route index element={<ReportExport />} />
        </Route>
        <Route path="/report-import" element={<Layout />}>
          <Route index element={<ReportImport />} />
        </Route>
        <Route path="/monitoring-rfid-cargo" element={<Layout />}>
          <Route index element={<RFIDCargo />} />
        </Route>
        <Route path="/vessel-export" element={<Layout />}>
          <Route index element={<VesselExport />} />
        </Route>
        <Route path="/vessel-import" element={<Layout />}>
          <Route index element={<VesselImport />} />
        </Route>
        <Route path="/truck-export" element={<Layout />}>
          <Route index element={<TruckExport />} />
        </Route>
        <Route path="/truck-import" element={<Layout />}>
          <Route index element={<TruckImport />} />
        </Route>
        <Route path="/yarn-export" element={<Layout />}>
          <Route index element={<YarnExport />} />
        </Route>
        <Route path="/yarn-import" element={<Layout />}>
          <Route index element={<YarnImport />} />
        </Route>
        <Route path="/report-export-dkp" element={<Layout />}>
          <Route index element={<ReportExportDKP />} />
        </Route>
        <Route path="/monitoring-yarn-dkp" element={<Layout />}>
          <Route index element={<MonitoringYarnDKP />} />
        </Route>
        <Route path="/monthly-report" element={<Layout />}>
          <Route index element={<MonthlyReport />} />
        </Route>
        <Route path="/daily-report" element={<Layout />}>
          <Route index element={<DailyReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;































