import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
  Description as GuideIcon,
  VideoLibrary as VideoIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  QuestionAnswer as FaqIcon,
  Support as SupportIcon,
  Schedule as ScheduleIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  AccountBalance as BlockchainIcon,
  CloudUpload as UploadIcon,
  VerifiedUser as VerificationIcon,
  SwapHoriz as TransferIcon,
} from '@mui/icons-material';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactDialog, setContactDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });

  const faqCategories = [
    { id: 'all', label: 'All', icon: <HelpIcon /> },
    { id: 'registration', label: 'Property Registration', icon: <UploadIcon /> },
    { id: 'verification', label: 'Verification', icon: <VerificationIcon /> },
    { id: 'blockchain', label: 'Blockchain', icon: <BlockchainIcon /> },
    { id: 'transfer', label: 'Property Transfer', icon: <TransferIcon /> },
    { id: 'security', label: 'Security', icon: <SecurityIcon /> },
  ];

  const faqs = [
    {
      id: 1,
      category: 'registration',
      question: 'How do I register a new property?',
      answer: 'To register a new property, go to the Property Registration page and follow these steps: 1) Fill in property details, 2) Upload required documents (title deed, survey maps, etc.), 3) Submit for verification, 4) Wait for government approval, 5) Once approved, your property will be minted as an NFT on the blockchain.',
    },
    {
      id: 2,
      category: 'verification',
      question: 'How long does the verification process take?',
      answer: 'The verification process typically takes 3-5 business days. Government officers review your documents against existing records. You will receive email and SMS notifications about the status of your application.',
    },
    {
      id: 3,
      category: 'blockchain',
      question: 'What is blockchain and why do we use it?',
      answer: 'Blockchain is a secure, immutable digital ledger. We use it to ensure that property records cannot be tampered with, providing transparency and trust. Your property ownership is represented as an NFT (Non-Fungible Token) on the blockchain.',
    },
    {
      id: 4,
      category: 'blockchain',
      question: 'Do I need to pay gas fees?',
      answer: 'Yes, blockchain transactions require gas fees. These are small amounts (usually a few cents to a few dollars) paid to process transactions on the network. The system will show you the estimated cost before any transaction.',
    },
    {
      id: 5,
      category: 'transfer',
      question: 'How do I transfer property to someone else?',
      answer: 'Property transfer involves: 1) Initiating transfer from your dashboard, 2) Entering buyer\'s wallet address, 3) Uploading transfer documents, 4) Government approval of the transfer, 5) Blockchain execution of the transfer.',
    },
    {
      id: 6,
      category: 'verification',
      question: 'What documents do I need for property registration?',
      answer: 'Required documents include: Original title deed, Survey maps, Previous ownership records, NIC copies of all parties, and any relevant court orders or inheritance documents.',
    },
    {
      id: 7,
      category: 'security',
      question: 'How secure is my data?',
      answer: 'Your data is stored using advanced encryption. Documents are stored on IPFS (decentralized storage), and only hash references are stored on the blockchain. Your personal information is protected according to data protection regulations.',
    },
    {
      id: 8,
      category: 'blockchain',
      question: 'What is MetaMask and do I need it?',
      answer: 'MetaMask is a cryptocurrency wallet that allows you to interact with blockchain applications. You need it to sign transactions and manage your property NFTs. It\'s free to install and use.',
    },
    {
      id: 9,
      category: 'registration',
      question: 'Can I register multiple properties?',
      answer: 'Yes, you can register multiple properties. Each property will be a separate NFT with its own unique identifier and documentation.',
    },
    {
      id: 10,
      category: 'verification',
      question: 'What happens if my application is rejected?',
      answer: 'If rejected, you\'ll receive detailed feedback on the issues. You can correct the problems and resubmit your application. Common rejection reasons include incomplete documents or discrepancies in records.',
    },
  ];

  const guides = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: 'Complete guide for new users to set up their account and register their first property',
      icon: <GuideIcon />,
      type: 'PDF',
      downloadUrl: '/guides/getting-started.pdf',
    },
    {
      id: 2,
      title: 'MetaMask Setup Tutorial',
      description: 'Step-by-step instructions to install and configure MetaMask wallet',
      icon: <VideoIcon />,
      type: 'Video',
      downloadUrl: '/guides/metamask-setup.mp4',
    },
    {
      id: 3,
      title: 'Document Preparation Checklist',
      description: 'Comprehensive list of required documents and formatting guidelines',
      icon: <GuideIcon />,
      type: 'PDF',
      downloadUrl: '/guides/document-checklist.pdf',
    },
    {
      id: 4,
      title: 'Property Transfer Process',
      description: 'Detailed walkthrough of the property transfer procedure',
      icon: <VideoIcon />,
      type: 'Video',
      downloadUrl: '/guides/property-transfer.mp4',
    },
  ];

  const contactOptions = [
    {
      title: 'Technical Support',
      description: 'Get help with technical issues and system problems',
      icon: <SupportIcon />,
      contact: 'support@landregistry.gov.lk',
      phone: '+94 11 234 5678',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
    },
    {
      title: 'Document Verification',
      description: 'Questions about document requirements and verification process',
      icon: <VerificationIcon />,
      contact: 'verification@landregistry.gov.lk',
      phone: '+94 11 234 5679',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    },
    {
      title: 'General Inquiries',
      description: 'General questions about the land registry system',
      icon: <HelpIcon />,
      contact: 'info@landregistry.gov.lk',
      phone: '+94 11 234 5680',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    },
  ];

  const systemStatus = {
    operational: true,
    services: [
      { name: 'Web Portal', status: 'operational', uptime: '99.9%' },
      { name: 'Blockchain Network', status: 'operational', uptime: '99.8%' },
      { name: 'Document Storage', status: 'operational', uptime: '99.9%' },
      { name: 'Verification System', status: 'maintenance', uptime: '98.5%' },
    ],
    lastUpdated: '2024-08-16 10:30 AM',
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = () => {
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    setContactDialog(false);
    setContactForm({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Help & Support Center
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find answers, guides, and get support for the Land Registry System
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<FaqIcon />} label="FAQ" />
          <Tab icon={<GuideIcon />} label="User Guides" />
          <Tab icon={<SupportIcon />} label="Contact Support" />
          <Tab icon={<ScheduleIcon />} label="System Status" />
        </Tabs>
      </Paper>

      {/* FAQ Tab */}
      <TabPanel value={activeTab} index={0}>
        {/* Search and Filter */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {faqCategories.map((category) => (
                <Chip
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  onClick={() => setSelectedCategory(category.id)}
                  color={selectedCategory === category.id ? 'primary' : 'default'}
                  variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* FAQ List */}
        <Box>
          {filteredFaqs.length === 0 ? (
            <Alert severity="info">
              No FAQs found matching your search criteria.
            </Alert>
          ) : (
            filteredFaqs.map((faq) => (
              <Accordion key={faq.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </TabPanel>

      {/* User Guides Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          {guides.map((guide) => (
            <Grid item xs={12} md={6} key={guide.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {guide.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6">
                        {guide.title}
                      </Typography>
                      <Chip label={guide.type} size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {guide.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<DownloadIcon />}
                    onClick={() => window.open(guide.downloadUrl)}
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Contact Support Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          {contactOptions.map((option, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {option.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {option.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    {option.description}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary={option.contact} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText primary={option.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ScheduleIcon />
                      </ListItemIcon>
                      <ListItemText primary={option.hours} />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<ChatIcon />}
                    onClick={() => setContactDialog(true)}
                  >
                    Send Message
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Emergency Contact
          </Typography>
          <Typography variant="body1" paragraph>
            For urgent technical issues affecting property transfers or critical system problems:
          </Typography>
          <Typography variant="h6" color="error">
            Emergency Hotline: +94 11 234 5681
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available 24/7 for critical issues only
          </Typography>
        </Paper>
      </TabPanel>

      {/* System Status Tab */}
      <TabPanel value={activeTab} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert
              severity={systemStatus.operational ? 'success' : 'warning'}
              sx={{ mb: 3 }}
            >
              System Status: {systemStatus.operational ? 'All Systems Operational' : 'Some Services Under Maintenance'}
            </Alert>
          </Grid>
          
          {systemStatus.services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                      {service.name}
                    </Typography>
                    <Chip
                      label={service.status.toUpperCase()}
                      color={service.status === 'operational' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Uptime: {service.uptime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Last updated: {systemStatus.lastUpdated}
            </Typography>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Contact Dialog */}
      <Dialog open={contactDialog} onClose={() => setContactDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Contact Support</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialog(false)}>Cancel</Button>
          <Button onClick={handleContactSubmit} variant="contained">
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Help;