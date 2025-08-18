'use client'

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Description as DocumentIcon,
  Security as SecurityIcon,
  AccountBalance as BlockchainIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Send as SendIcon,
  QuestionAnswer as ChatIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const HelpSupport = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const faqs = [
    {
      category: 'Property Registration',
      questions: [
        {
          question: 'How do I register my property on the blockchain?',
          answer: 'To register your property, navigate to the "Register Property" page, fill out the required information including property details, owner information, and upload necessary documents. The system will guide you through a step-by-step process and submit your property to the blockchain for permanent recording.'
        },
        {
          question: 'What documents do I need to register a property?',
          answer: 'You need to upload: 1) Original Title Deed, 2) Survey Plan, 3) National Identity Card, 4) Previous ownership records (if applicable), and 5) Any other relevant legal documents. All documents should be clear, readable scans or photos.'
        },
        {
          question: 'How long does property registration take?',
          answer: 'The blockchain registration process is typically immediate, but verification by authorities can take 3-7 business days. You will receive notifications at each stage of the process.'
        },
        {
          question: 'What are the registration fees?',
          answer: 'Registration fees vary based on property type and value. The system will calculate and display the exact fees before you submit your registration. Blockchain transaction fees are additional and depend on network conditions.'
        }
      ]
    },
    {
      category: 'Property Verification',
      questions: [
        {
          question: 'How can I verify a property\'s authenticity?',
          answer: 'Use the Public Verification tool by entering either the Property ID or Transaction Hash. The system will display all verified information including ownership, documents, and blockchain confirmations.'
        },
        {
          question: 'What is a verification score?',
          answer: 'The verification score (0-100%) indicates how thoroughly a property has been verified. Scores above 90% indicate fully verified properties with all required documents and government approval.'
        },
        {
          question: 'Can anyone verify property information?',
          answer: 'Yes, our public verification system allows anyone to check property authenticity and ownership information. This transparency is a key feature of blockchain-based land registry.'
        }
      ]
    },
    {
      category: 'Property Transfer',
      questions: [
        {
          question: 'How do I transfer property ownership?',
          answer: 'Property transfers require both current owner and new owner consent. The current owner initiates the transfer, the new owner accepts, and government authorities verify the transaction before it\'s recorded on the blockchain.'
        },
        {
          question: 'What is required for property transfer?',
          answer: 'Both parties need valid identification, signed transfer agreements, proof of payment (if applicable), and any legal documents required by Sri Lankan law. The system guides you through each requirement.'
        },
        {
          question: 'How long do transfers take?',
          answer: 'Once both parties complete their requirements and authorities verify the transfer, the blockchain transaction is immediate. The entire process typically takes 5-10 business days.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'What browsers are supported?',
          answer: 'The system works best with modern browsers including Chrome, Firefox, Safari, and Edge. Make sure JavaScript is enabled and your browser is up to date.'
        },
        {
          question: 'Why is my transaction taking so long?',
          answer: 'Blockchain transactions depend on network congestion. During busy periods, transactions may take longer. You can track your transaction status using the provided transaction hash on the blockchain explorer.'
        },
        {
          question: 'I forgot my login credentials, what should I do?',
          answer: 'Use the password reset option on the login page. If you need further assistance, contact our support team with your registered email address and we\'ll help you recover access.'
        }
      ]
    },
    {
      category: 'Legal & Compliance',
      questions: [
        {
          question: 'Is this system legally recognized in Sri Lanka?',
          answer: 'Yes, this blockchain-based land registry system is officially recognized and operated by the Government of Sri Lanka. All registrations and transfers have full legal validity.'
        },
        {
          question: 'What happens to existing paper records?',
          answer: 'Existing paper records remain valid. The blockchain system works alongside traditional systems during the transition period. Gradually, all records will be digitized and moved to the blockchain.'
        },
        {
          question: 'Who can access my property information?',
          answer: 'Basic property information (address, type, registration status) is publicly verifiable for transparency. Personal details like owner contact information are only accessible to verified parties and authorities.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: <PhoneIcon />,
      title: 'Phone Support',
      details: '+94 11 123 4567',
      description: 'Available Monday to Friday, 9 AM - 5 PM'
    },
    {
      icon: <EmailIcon />,
      title: 'Email Support',
      details: 'support@landregistry.gov.lk',
      description: 'Response within 24 hours'
    },
    {
      icon: <LocationIcon />,
      title: 'Office Address',
      details: '123 Land Registry Building, Colombo 01',
      description: 'Visit us for in-person assistance'
    },
    {
      icon: <TimeIcon />,
      title: 'Office Hours',
      details: 'Monday - Friday: 9:00 AM - 5:00 PM',
      description: 'Saturday: 9:00 AM - 1:00 PM'
    }
  ];

  const resources = [
    {
      title: 'User Guide',
      description: 'Complete guide to using the land registry system',
      icon: <DocumentIcon />,
      link: '#'
    },
    {
      title: 'Legal Framework',
      description: 'Laws and regulations governing land registration',
      icon: <SecurityIcon />,
      link: '#'
    },
    {
      title: 'Blockchain Basics',
      description: 'Understanding blockchain technology in land registry',
      icon: <BlockchainIcon />,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      icon: <SearchIcon />,
      link: '#'
    }
  ];

  const handleFormChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitContact = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      enqueueSnackbar('Your message has been sent successfully! We\'ll respond within 24 hours.', { variant: 'success' });
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setContactDialogOpen(false);
    } catch (error) {
      enqueueSnackbar('Failed to send message. Please try again.', { variant: 'error' });
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Help & Support
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find answers to common questions and get support for the Land Registry System
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <ChatIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Contact Support
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Get personalized help from our support team
              </Typography>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => setContactDialogOpen(true)}
              >
                Send Message
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <SearchIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Search FAQs
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Find quick answers to frequently asked questions
              </Typography>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                href="#faqs"
              >
                Browse FAQs
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Information */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Contact Information
        </Typography>
        <Grid container spacing={3}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {method.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {method.title}
                </Typography>
                <Typography variant="body2" fontWeight="medium" gutterBottom>
                  {method.details}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {method.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Resources */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Helpful Resources
        </Typography>
        <Grid container spacing={3}>
          {resources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 4 } }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {resource.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {resource.description}
                  </Typography>
                  <Link href={resource.link} underline="hover">
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* FAQ Section */}
      <Paper elevation={2} sx={{ p: 4 }} id="faqs">
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>
        
        {faqs.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HelpIcon />
              {category.category}
            </Typography>
            
            {category.questions.map((faq, questionIndex) => (
              <Accordion key={questionIndex}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </Paper>

      {/* Important Notice */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="subtitle2" gutterBottom>
          Need Urgent Help?
        </Typography>
        <Typography variant="body2">
          For urgent matters related to property disputes or legal issues, please contact our emergency hotline at +94 11 123 4567 (available 24/7) or visit your nearest land registry office.
        </Typography>
      </Alert>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SendIcon />
            Contact Support
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={contactForm.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={contactForm.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                value={contactForm.subject}
                onChange={(e) => handleFormChange('subject', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={contactForm.message}
                onChange={(e) => handleFormChange('message', e.target.value)}
                required
                placeholder="Please describe your issue or question in detail..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitContact}
            disabled={submitting}
            startIcon={submitting ? null : <SendIcon />}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HelpSupport;
