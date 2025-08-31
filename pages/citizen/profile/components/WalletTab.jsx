import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Paper,
  Alert,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  AccountBalanceWallet as WalletIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ContentCopy as CopyIcon,
  Launch as LaunchIcon,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

export default function WalletTab({
  userInfo,
  walletConnected,
  setWalletConnected,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [connecting, setConnecting] = useState(false);
  const [walletBalance] = useState("0.0"); // Mock balance
  const [transactions] = useState([
    {
      id: 1,
      type: "Property Registration",
      hash: "0x1a2b3c4d5e6f...",
      amount: "0.005 ETH",
      date: "2024-08-30",
      status: "completed",
    },
    {
      id: 2,
      type: "Document Verification",
      hash: "0x9f8e7d6c5b4a...",
      amount: "0.002 ETH",
      date: "2024-08-28",
      status: "completed",
    },
  ]);

  const connectWallet = async () => {
    setConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setWalletConnected(true);
      setConnecting(false);
      enqueueSnackbar("Wallet connected successfully!", { variant: "success" });
    }, 2000);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    enqueueSnackbar("Wallet disconnected", { variant: "info" });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar("Address copied to clipboard!", { variant: "success" });
  };

  const InfoCard = ({ icon, title, children, color = "primary" }) => (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        height: "100%",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 3,
          borderColor: `${color}.main`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          {icon}
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Professional Wallet Overview */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <WalletIcon sx={{ fontSize: 48, color: "primary.main" }} />
          </Grid>
          <Grid item xs>
            <Typography
              variant="h5"
              fontWeight={600}
              color="text.primary"
              gutterBottom
            >
              Blockchain Wallet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Connect your MetaMask wallet to interact with blockchain features
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label={walletConnected ? "Connected" : "Not Connected"}
              color={walletConnected ? "success" : "error"}
              sx={{ fontWeight: 600 }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Wallet Connection Status */}
        <Grid item xs={12} md={8}>
          <InfoCard
            icon={<SecurityIcon color="primary" />}
            title="Wallet Connection"
          >
            {walletConnected ? (
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={600}>
                  Wallet Connected Successfully
                </Typography>
                <Typography variant="caption">
                  You can now perform blockchain transactions
                </Typography>
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={600}>
                  No Wallet Connected
                </Typography>
                <Typography variant="caption">
                  Connect your MetaMask wallet to access blockchain features
                </Typography>
              </Alert>
            )}

            {walletConnected ? (
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Wallet Address"
                  value={userInfo.walletAddress}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Copy Address">
                          <IconButton
                            onClick={() =>
                              copyToClipboard(userInfo.walletAddress)
                            }
                            edge="end"
                          >
                            <CopyIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View on Etherscan">
                          <IconButton edge="end">
                            <LaunchIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={disconnectWallet}
                  >
                    Disconnect Wallet
                  </Button>
                  <Button variant="outlined" startIcon={<RefreshIcon />}>
                    Refresh Balance
                  </Button>
                </Box>
              </Stack>
            ) : (
              <Button
                variant="contained"
                size="large"
                startIcon={<WalletIcon />}
                onClick={connectWallet}
                disabled={connecting}
                fullWidth
              >
                {connecting ? "Connecting..." : "Connect MetaMask Wallet"}
              </Button>
            )}
          </InfoCard>
        </Grid>

        {/* Wallet Balance */}
        <Grid item xs={12} md={4}>
          <InfoCard
            icon={<WalletIcon color="secondary" />}
            title="Wallet Balance"
            color="secondary"
          >
            <Stack spacing={2} alignItems="center">
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {walletConnected ? `${walletBalance} ETH` : "---"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Available for transactions
              </Typography>
              {walletConnected && (
                <Button variant="outlined" size="small" fullWidth>
                  Add Funds
                </Button>
              )}
            </Stack>
          </InfoCard>
        </Grid>

        {/* Transaction History */}
        {walletConnected && (
          <Grid item xs={12}>
            <InfoCard
              icon={<InfoIcon color="info" />}
              title="Recent Transactions"
              color="info"
            >
              {transactions.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {transactions.map((tx, index) => (
                    <ListItem key={tx.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="subtitle1" fontWeight={600}>
                              {tx.type}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary.main"
                              fontWeight={600}
                            >
                              {tx.amount}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {tx.hash}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {tx.date}
                            </Typography>
                          </Box>
                        }
                      />
                      <IconButton size="small">
                        <LaunchIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{ py: 3 }}
                >
                  No transactions yet
                </Typography>
              )}
            </InfoCard>
          </Grid>
        )}

        {/* Wallet Features */}
        <Grid item xs={12}>
          <InfoCard
            icon={<SecurityIcon color="warning" />}
            title="Blockchain Features"
            color="warning"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    textAlign: "center",
                    opacity: walletConnected ? 1 : 0.5,
                  }}
                >
                  <CheckCircleIcon color="success" sx={{ mb: 1 }} />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Property Registration
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Register properties on blockchain
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    textAlign: "center",
                    opacity: walletConnected ? 1 : 0.5,
                  }}
                >
                  <SecurityIcon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Document Verification
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Verify document authenticity
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    textAlign: "center",
                    opacity: walletConnected ? 1 : 0.5,
                  }}
                >
                  <WalletIcon color="info" sx={{ mb: 1 }} />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Secure Transfers
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Transfer property ownership
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    textAlign: "center",
                    opacity: walletConnected ? 1 : 0.5,
                  }}
                >
                  <InfoIcon color="warning" sx={{ mb: 1 }} />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Smart Contracts
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Automated land agreements
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
}
