import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ContentCard from '../../../components/common/Card/CardContent';
import Breadcrombs from '../../../components/common/Breadcrombs/Breadcrombss';
import CustomTable from "../../../components/specialized/DataTable/CustomTable";
import { Helmet } from "react-helmet";
import GateAllCard from './widgets/GateAll';
import api from '../../../service/api';
import CloseIcon from '@mui/icons-material/Close';
import "aos/dist/aos.css";
import "../style.css";


const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

const fetchLongStayContainerData = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.get('/Statistics/long-stay', {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching long stay container data:", error);
    return [];
  }
};

const fetchStatistikContainerData = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.get('/Statistics/container-statistics', {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistik container data:", error);
    return {};
  }
};

const fetchDetailData = async (category, value) => {
  const token = localStorage.getItem('token');
  const endpointMap = {
    documentType: '/Statistics/detail/documenttype/',
    exportImport: '/Statistics/detail/exportimport/',
    yorExport: '/Statistics/detail/yorExport/',
    yorImport: '/Statistics/detail/yorImport/'
  };

  const categoryMap = {
    "Document Type": "documentType",
    "Export - Import": "exportImport",
    "YOR Export (8678 Slot)": "yorExport",
    "YOR Import (1847 Slot)": "yorImport"
  };

  const mappedCategory = categoryMap[category] || category; 
  const endpoint = endpointMap[mappedCategory];

  if (!endpoint) {
    console.error(`No endpoint found for category: ${category}`);
    return [];
  }

  const url = `${endpoint}${encodeURIComponent(value)}`;
  console.log(`Fetching data from URL: ${url}`);

  try {
    const response = await api.get(url, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching detailed data:", error);
    return [];
  }
};


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('statistics');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState(null);
  const [dialogData, setDialogData] = useState([]);
  const [longStayContainerData, setLongStayContainerData] = useState([]);
  const [statistikContainerData, setStatistikContainerData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [containerData, chartData] = await Promise.all([
          fetchLongStayContainerData(),
          fetchStatistikContainerData()
        ]);

        console.log("Long Stay Container Data:", containerData);
        console.log("Statistik Container Data:", chartData);

        setLongStayContainerData(Array.isArray(containerData) ? containerData : []);
        setStatistikContainerData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChartClick = async (data, index, chartTitle) => {
    setSelectedCategory(chartTitle);
    setSelectedChartType(data.name);

    // Fetch detailed data based on the category and value
    const detailData = await fetchDetailData(chartTitle, data.name);
    setDialogData(detailData);
    setDialogOpen(true);
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12" fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>TPK AUTOGATE Monitoring | Dashboard</title>
      </Helmet>
      <section className="p-6 mx-5 mt-16 rounded-lg w-full">
        <ContentCard>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="dashboard tabs">
                  <Tab label="STATISTICS" value="statistics" />
                  <Tab label="GATE IN" value="viewIn" />
                  <Tab label="GATE OUT" value="viewOut" />
                  <Tab label="IMPORT" value="import" />
                  <Tab label="EXPORT" value="export" />
                </TabList>
              </Box>
              <TabPanel value="statistics">
                {/* Long Stay Containers section */}
                <Card sx={{ mb: 4 }}>
                  <CardHeader title="Long Stay Containers" titleTypographyProps={{ variant: 'h6' }} />
                  <CardContent>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="long stay container table">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{
                              backgroundColor: '#F9FAFC',
                              color: 'black',
                              fontWeight: '600',
                            }}>Container Number</TableCell>
                            <TableCell style={{
                              backgroundColor: '#F9FAFC',
                              color: 'black',
                              fontWeight: '600',
                            }}>Document Type</TableCell>
                            <TableCell style={{
                              backgroundColor: '#F9FAFC',
                              color: 'black',
                              fontWeight: '600',
                            }}>Days in Yard</TableCell>
                            <TableCell style={{
                              backgroundColor: '#F9FAFC',
                              color: 'black',
                              fontWeight: '600',
                            }}>Block Yard</TableCell>
                            <TableCell style={{
                              backgroundColor: '#F9FAFC',
                              color: 'black',
                              fontWeight: '600',
                            }}>BL Number</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {longStayContainerData.map((row, index) => (
                            <TableRow key={index} style={{
                              backgroundColor: index % 2 === 0 ? '#EEF5FF' : 'white',
                            }}>
                              <TableCell>{row.containerNumber}</TableCell>
                              <TableCell>{row.docType}</TableCell>
                              <TableCell>{row.daysInYard}</TableCell>
                              <TableCell>{row.blockYard}</TableCell>
                              <TableCell>{row.blNumber}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>

                {/* Statistics section */}
                <Card className="mb-8">
                  <CardHeader title="Container Statistics" titleTypographyProps={{ variant: 'h6' }} />
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(statistikContainerData).map(([chartKey, chart], index) => (
                        <div key={index} className="flex flex-col items-center">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">{chart.title}</h3>
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={chart.data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                onClick={(data, index) => handleChartClick(data, index, chart.title)}
                              >
                                {chart.data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="flex flex-wrap justify-center mt-2">
                            {chart.data.map((item, i) => (
                              <div key={i} className="flex items-center mr-4 mb-1">
                                <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                <span className="text-xs text-gray-600">{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              </TabPanel>
              <TabPanel value="viewIn">
                <div className="flex flex-col justify-center md:flex-row md:flex-wrap gap-4 ">
                  <GateAllCard view='viewIn' />
                </div>
              </TabPanel>
              <TabPanel value="viewOut">
                <div className="flex flex-col justify-center md:flex-row md:flex-wrap gap-4 ">
                  <GateAllCard view='viewOut' />
                </div>
              </TabPanel>
              <TabPanel value="export">
                <GateAllCard view='export' />
              </TabPanel>
              <TabPanel value="import">
                <GateAllCard view='import' />
              </TabPanel>
            </TabContext>
          </Box>
        </ContentCard>
      </section>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{`${selectedChartType}: ${selectedCategory}`}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Details for {selectedCategory}:
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="chart data">
                <TableHead>
                  <TableRow>
                    {dialogData[0] && Object.keys(dialogData[0]).map((key) => (
                      <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dialogData.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((value, cellIndex) => (
                        <TableCell key={cellIndex}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          Details for {selectedChartType}
          <IconButton
            edge="end"
            color="error"
            onClick={() => setDialogOpen(false)}
            aria-label="close"
            style={{ position: 'absolute', right: 19, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {dialogData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="details table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Container Number</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Document Type</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Export/Import</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Gate In Time</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Hold Status</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Vessel Name</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Voyage</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>BL Number</TableCell>
                    <TableCell style={{
                      backgroundColor: '#F9FAFC',
                      color: 'black',
                      fontWeight: '600',
                    }}>Yard Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dialogData.map((row, index) => (
                    <TableRow key={index} style={{
                      backgroundColor: index % 2 === 0 ? '#EEF5FF' : 'white',
                    }}>
                      <TableCell>{row.containerNumber}</TableCell>
                      <TableCell>{row.documentType}</TableCell>
                      <TableCell>{row.exportImport}</TableCell>
                      <TableCell>{new Date(row.gateInTime).toLocaleString()}</TableCell>
                      <TableCell>{row.holdStatus}</TableCell>
                      <TableCell>{row.vesselName}</TableCell>
                      <TableCell>{row.voyage}</TableCell>
                      <TableCell>{row.blNumber}</TableCell>
                      <TableCell>{row.yardLocation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No data available</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;