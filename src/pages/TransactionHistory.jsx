import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Receipt as ReceiptIcon,
  SwapHoriz as TransferIcon,
  Add as AddIcon,
  Verified as VerifiedIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  AccountBalanceWallet as WalletIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';

const TransactionHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMenu, setFilterMenu] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);

  const transactions = [
    {
      id: 'TXN001',
      type: 'registration',
      property: 'Land Plot #LP001',
      amount: '0.002 ETH',
      status: 'completed',
      date: '2024-08-15',
      time: '14:30:25',
      hash: '0x742d35Cc6543C11532435FD5645454445354323d',
      gasUsed: '21000',
      gasPrice: '20 Gwei',
      blockNumber: '18345678',
      confirmations: 150,
      from: '0x742d35Cc6543C11532435FD5645454445354323d',
      to: '0x1234567890123456789012345678901234567890',
      description: 'Property registration for Land Plot #LP001',
    },
    {
      id: 'TXN002',
      type: 'transfer',
      property: 'Land Plot #LP002',
      amount: '0.001 ETH',
      status: 'pending',
      date: '2024-08-14',
      time: '10:15:42',
      hash: '0x8a2d35Cc6543C11532435FD5645454445354323e',
      gasUsed: '18500',
      gasPrice: '18 Gwei',
      blockNumber: '18345650',
      confirmations: 12,
      from: '0x742d35Cc6543C11532435FD5645454445354323d',
      to: '0x9876543210987654321098765432109876543210',
      description: 'Property transfer to new owner',
    },
    {
      id: 'TXN003',
      type: 'verification',
      property: 'Land Plot #LP003',
      amount: '0.0005 ETH',
      status: 'failed',
      date: '2024-08-13',
      time: '16:45:12',
      hash: '0x9b3e46Dd7654D22643546GE6546565456565434f',
      gasUsed: '15200',
      gasPrice: '22 Gwei',
      blockNumber: '18345620',
      confirmations: 0,
      from: '0x742d35Cc6543C11532435FD5645454445354323d',
      to: '0x5555666677778888999900001111222233334444',
      description: 'Document verification failed - insufficient gas',
    },
    {
      id: 'TXN004',
      type: 'registration',
      property: 'Land Plot #LP004',
      amount: '0.0025 ETH',
      status: 'completed',
      date: '2024-08-12',
      time: '09:20:33',
      hash: '0xac4f57Ee8765E33754657HF7657676567676545g',
      gasUsed: '22100',
      gasPrice: '19 Gwei',
      blockNumber: '18345580',
      confirmations: 280,
      from: '0x742d35Cc6543C11532435FD5645454445354323d',
      to: '0x7777888899990000111122223333444455556666',
      description: 'Property registration completed successfully',
    },
    {
      id: 'TXN005',
      type: 'update',
      property: 'Land Plot #LP001',
      amount: '0.0008 ETH',
      status: 'completed',
      date: '2024-08-11',
      time: '13:55:18',
      hash: '0xbd5g68Ff9876F44865768IG8768787678787656h',
      gasUsed: '16800',
      gasPrice: '21 Gwei',
      blockNumber: '18345520',
      confirmations: 420,
      from: '0x742d35Cc6543C11532435FD5645454445354323d',
      to: '0x8888999900001111222233334444555566667777',
      description: 'Property metadata update',
    },
  ];

  const summaryStats = {
    totalTransactions: transactions.length,
    completedTransactions: transactions.filter(t => t.status === 'completed').length,
    pendingTransactions: transactions.filter(t => t.status === 'pending').length,
    totalGasUsed: transactions.reduce((sum, t) => sum + parseInt(t.gasUsed), 0),
    totalAmountSpent: transactions.reduce((sum, t) => sum + parseFloat(t.amount.split(' ')[0]), 0).toFixed(4),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <VerifiedIcon />;
      case 'pending': return <ScheduleIcon />;
      case 'failed': return <ErrorIcon />;
      default: return <ReceiptIcon />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'registration': return <AddIcon />;
      case 'transfer': return <TransferIcon />;
      case 'verification': return <VerifiedIcon />;
      case 'update': return <ReceiptIcon />;
      default: return <ReceiptIcon />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'registration': return 'primary';
      case 'transfer': return 'secondary';
      case 'verification': return 'info';
      case 'update': return 'warning';
      default: return 'default';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.hash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || transaction.status === selectedFilter || transaction.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setDetailsDialog(true);
  };

  const handleExport = () => {
    // Export logic - would generate CSV/PDF
    console.log('Exporting transactions...');
  };

  const viewOnBlockchain = (hash) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Transaction History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View all your blockchain transactions and property activities
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {summaryStats.totalTransactions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {summaryStats.completedTransactions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                {summaryStats.pendingTransactions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">
                {summaryStats.totalAmountSpent} ETH
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Spent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by property, transaction ID, or hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                endAdornment: searchTerm && (
                  <IconButton onClick={() => setSearchTerm('')} size="small">
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={(e) => setFilterMenu(e.currentTarget)}
            >
              Filter: {selectedFilter === 'all' ? 'All' : selectedFilter}
            </Button>
            <Menu
              anchorEl={filterMenu}
              open={Boolean(filterMenu)}
              onClose={() => setFilterMenu(null)}
            >
              <MenuItem onClick={() => { setSelectedFilter('all'); setFilterMenu(null); }}>
                All Transactions
              </MenuItem>
              <MenuItem onClick={() => { setSelectedFilter('completed'); setFilterMenu(null); }}>
                Completed
              </MenuItem>
              <MenuItem onClick={() => { setSelectedFilter('pending'); setFilterMenu(null); }}>
                Pending
              </MenuItem>
              <MenuItem onClick={() => { setSelectedFilter('failed'); setFilterMenu(null); }}>
                Failed
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { setSelectedFilter('registration'); setFilterMenu(null); }}>
                Registration
              </MenuItem>
              <MenuItem onClick={() => { setSelectedFilter('transfer'); setFilterMenu(null); }}>
                Transfer
              </MenuItem>
              <MenuItem onClick={() => { setSelectedFilter('verification'); setFilterMenu(null); }}>
                Verification
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
            >
              Export Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Transactions Table */}
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow key={transaction.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {transaction.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getTypeIcon(transaction.type)}
                        label={transaction.type.toUpperCase()}
                        color={getTypeColor(transaction.type)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{transaction.property}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WalletIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                        {transaction.amount}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(transaction.status)}
                        label={transaction.status.toUpperCase()}
                        color={getStatusColor(transaction.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {transaction.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.time}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(transaction)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View on Blockchain">
                          <IconButton
                            size="small"
                            onClick={() => viewOnBlockchain(transaction.hash)}
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Transaction Details Dialog */}
      <Dialog
        open={detailsDialog}
        onClose={() => setDetailsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Transaction Details: {selectedTransaction?.id}
        </DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Transaction ID" secondary={selectedTransaction.id} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Property" secondary={selectedTransaction.property} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Type" secondary={selectedTransaction.type} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Status" secondary={selectedTransaction.status} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Description" secondary={selectedTransaction.description} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Blockchain Details
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Hash" secondary={selectedTransaction.hash} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Block Number" secondary={selectedTransaction.blockNumber} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Gas Used" secondary={selectedTransaction.gasUsed} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Gas Price" secondary={selectedTransaction.gasPrice} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Confirmations" secondary={selectedTransaction.confirmations} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Addresses
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="From" secondary={selectedTransaction.from} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="To" secondary={selectedTransaction.to} />
                  </ListItem>
                </List>
              </Grid>
              {selectedTransaction.status === 'failed' && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    Transaction failed. Please check gas settings and try again.
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog(false)}>Close</Button>
          <Button
            variant="contained"
            startIcon={<LaunchIcon />}
            onClick={() => viewOnBlockchain(selectedTransaction?.hash)}
          >
            View on Etherscan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TransactionHistory;