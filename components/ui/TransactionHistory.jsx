'use client'

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Link,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Launch as LaunchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  SwapHoriz as TransferIcon,
  Add as RegisterIcon,
  VerifiedUser as VerifyIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const TransactionHistory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Mock transaction data
  const mockTransactions = [
    {
      id: 1,
      transactionHash: '0x1234567890abcdef1234567890abcdef12345678901234567890abcdef123456',
      type: 'Property Registration',
      propertyId: 'PROP001',
      propertyTitle: 'Residential Land - Colombo',
      from: '0x1234...5678',
      to: '0xabcd...efgh',
      amount: '0.05 ETH',
      timestamp: '2024-02-15T10:30:00Z',
      status: 'Confirmed',
      blockNumber: 18756432,
      gasUsed: 234567,
      gasPrice: '20 Gwei',
      confirmations: 125,
      owner: 'John Doe',
      ownerNIC: '199012345678V',
    },
    {
      id: 2,
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef123456789012',
      type: 'Property Transfer',
      propertyId: 'PROP002',
      propertyTitle: 'Commercial Property - Kandy',
      from: '0xabcd...efgh',
      to: '0x5678...9012',
      amount: '0.03 ETH',
      timestamp: '2024-02-14T15:45:00Z',
      status: 'Confirmed',
      blockNumber: 18756100,
      gasUsed: 187432,
      gasPrice: '18 Gwei',
      confirmations: 457,
      owner: 'Jane Smith',
      ownerNIC: '198509876543V',
    },
    {
      id: 3,
      transactionHash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
      type: 'Property Verification',
      propertyId: 'PROP003',
      propertyTitle: 'Agricultural Land - Galle',
      from: '0x5678...9012',
      to: '0x1234...5678',
      amount: '0.01 ETH',
      timestamp: '2024-02-13T09:20:00Z',
      status: 'Pending',
      blockNumber: 18755800,
      gasUsed: 98765,
      gasPrice: '22 Gwei',
      confirmations: 0,
      owner: 'Mike Johnson',
      ownerNIC: '197706543210V',
    },
    {
      id: 4,
      transactionHash: '0x890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      type: 'Document Upload',
      propertyId: 'PROP004',
      propertyTitle: 'Industrial Land - Anuradhapura',
      from: '0x9012...3456',
      to: '0xabcd...efgh',
      amount: '0.02 ETH',
      timestamp: '2024-02-12T14:15:00Z',
      status: 'Failed',
      blockNumber: 18755500,
      gasUsed: 0,
      gasPrice: '25 Gwei',
      confirmations: 0,
      owner: 'Sarah Wilson',
      ownerNIC: '199203456789V',
    },
    {
      id: 5,
      transactionHash: '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
      type: 'Property Registration',
      propertyId: 'PROP005',
      propertyTitle: 'Residential Land - Jaffna',
      from: '0x3456...7890',
      to: '0x5678...9012',
      amount: '0.04 ETH',
      timestamp: '2024-02-11T11:00:00Z',
      status: 'Confirmed',
      blockNumber: 18755200,
      gasUsed: 201234,
      gasPrice: '19 Gwei',
      confirmations: 756,
      owner: 'David Brown',
      ownerNIC: '199112345678V',
    },
  ];

  const transactionTypes = [
    'All Types',
    'Property Registration',
    'Property Transfer',
    'Property Verification',
    'Document Upload',
  ];

  const statusOptions = [
    'All Status',
    'Confirmed',
    'Pending',
    'Failed',
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = transactions;

    if (filterType && filterType !== 'All Types') {
      filtered = filtered.filter(tx => tx.type === filterType);
    }

    if (filterStatus && filterStatus !== 'All Status') {
      filtered = filtered.filter(tx => tx.status === filterStatus);
    }

    setFilteredTransactions(filtered);
    setPage(0); // Reset pagination when filters change
  }, [filterType, filterStatus, transactions]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Property Registration':
        return <RegisterIcon fontSize="small" />;
      case 'Property Transfer':
        return <TransferIcon fontSize="small" />;
      case 'Property Verification':
        return <VerifyIcon fontSize="small" />;
      case 'Document Upload':
        return <DownloadIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTransaction(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateHash = (hash) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  const handleViewOnBlockchain = (hash) => {
    // Mock blockchain explorer link
    const explorerUrl = `https://etherscan.io/tx/${hash}`;
    window.open(explorerUrl, '_blank');
    enqueueSnackbar('Opening blockchain explorer...', { variant: 'info' });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading transaction history...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transaction History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View all blockchain transactions related to property registrations and transfers
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                Confirmed
              </Typography>
              <Typography variant="h4">
                {filteredTransactions.filter(tx => tx.status === 'Confirmed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                Pending
              </Typography>
              <Typography variant="h4">
                {filteredTransactions.filter(tx => tx.status === 'Pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error.main">
                Failed
              </Typography>
              <Typography variant="h4">
                {filteredTransactions.filter(tx => tx.status === 'Failed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                Total
              </Typography>
              <Typography variant="h4">
                {filteredTransactions.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Transaction Type"
              >
                {transactionTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setFilterType('');
                setFilterStatus('');
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Transactions Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Transaction Hash</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getTypeIcon(transaction.type)}
                      <Typography variant="body2">
                        {transaction.type}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {transaction.propertyTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {transaction.propertyId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {truncateHash(transaction.transactionHash)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.status}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {transaction.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(transaction.timestamp)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleViewTransaction(transaction)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View on Blockchain">
                        <IconButton
                          size="small"
                          onClick={() => handleViewOnBlockchain(transaction.transactionHash)}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredTransactions.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>

      {/* Transaction Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        {selectedTransaction && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getTypeIcon(selectedTransaction.type)}
                Transaction Details
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Transaction Information
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Type:</strong> {selectedTransaction.type}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Hash:</strong> 
                    <Link 
                      component="button"
                      variant="body2"
                      onClick={() => handleViewOnBlockchain(selectedTransaction.transactionHash)}
                      sx={{ ml: 1, fontFamily: 'monospace' }}
                    >
                      {truncateHash(selectedTransaction.transactionHash)}
                    </Link>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Status:</strong> 
                    <Chip 
                      label={selectedTransaction.status}
                      color={getStatusColor(selectedTransaction.status)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Amount:</strong> {selectedTransaction.amount}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Date:</strong> {formatDate(selectedTransaction.timestamp)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Property Information
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Property:</strong> {selectedTransaction.propertyTitle}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Property ID:</strong> {selectedTransaction.propertyId}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Owner:</strong> {selectedTransaction.owner}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Owner NIC:</strong> {selectedTransaction.ownerNIC}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Blockchain Details
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Block Number:</strong> {selectedTransaction.blockNumber?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Gas Used:</strong> {selectedTransaction.gasUsed?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Gas Price:</strong> {selectedTransaction.gasPrice}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Confirmations:</strong> {selectedTransaction.confirmations}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ fontFamily: 'monospace' }}>
                    <strong>From:</strong> {selectedTransaction.from}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ fontFamily: 'monospace' }}>
                    <strong>To:</strong> {selectedTransaction.to}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button 
                variant="contained"
                startIcon={<LaunchIcon />}
                onClick={() => {
                  handleViewOnBlockchain(selectedTransaction.transactionHash);
                  handleCloseDialog();
                }}
              >
                View on Blockchain
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Empty State */}
      {filteredTransactions.length === 0 && !loading && (
        <Paper sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No transactions found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or check back later
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default TransactionHistory;
