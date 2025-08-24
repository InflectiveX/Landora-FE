import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  alpha,
  useTheme,
  Fade,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  VerifiedUser as VerifiedUserIcon,
  SwapHoriz as SwapHorizIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import OfficerLayout from "@/components/layouts/OfficerLayout";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import { createStaggerAnimation } from "@/lib/animations";

const faqData = [
  {
    category: "Property Verification",
    icon: <VerifiedUserIcon />,
    questions: [
      {
        question: "How do I verify a property registration?",
        answer:
          "To verify a property registration, navigate to 'Properties' > 'Verify a Property' from the sidebar. Search for the property you want to verify, review all submitted documents, and make your verification decision. You can approve or reject the registration with optional notes.",
      },
      {
        question: "What documents should I check during verification?",
        answer:
          "During verification, check the land deed, survey plan, tax certificates, ownership documents, and any additional supporting documents. Ensure all documents are authentic, properly signed, and contain accurate information.",
      },
      {
        question: "Can I reverse a verification decision?",
        answer:
          "Verification decisions are generally final. However, if you need to reverse a decision due to an error, please contact the system administrator or use the appeal process outlined in the system documentation.",
      },
      {
        question: "How long should verification take?",
        answer:
          "Property verification should typically be completed within 3-5 business days. For complex cases or missing documents, you may extend this timeline while requesting additional information from the applicant.",
      },
    ],
  },
  {
    category: "Transfer Processing",
    icon: <SwapHorizIcon />,
    questions: [
      {
        question: "How do I process property transfers?",
        answer:
          "Go to 'Verification Queue' > 'Property Transfers' to view pending transfer requests. Review the transfer documents, verify buyer and seller information, check payment proof, and approve or reject the transfer accordingly.",
      },
      {
        question: "What is required for transfer approval?",
        answer:
          "Transfer approval requires: valid transfer agreement, proof of payment, updated valuation report, seller's consent, buyer's identification, and any applicable tax clearances. All parties must be properly verified.",
      },
      {
        question: "How do I handle disputed transfers?",
        answer:
          "For disputed transfers, mark the case as 'Under Review', gather additional documentation from all parties, and if necessary, escalate to a senior officer or legal department for resolution.",
      },
    ],
  },
  {
    category: "System Usage",
    icon: <SettingsIcon />,
    questions: [
      {
        question: "How do I search for specific properties?",
        answer:
          "Use the search functionality in the Properties section. You can search by property name, ID, owner name, or location. Use filters to narrow down results by status, type, or date range.",
      },
      {
        question: "Can I bulk process applications?",
        answer:
          "Currently, applications must be processed individually to ensure proper review. However, you can use filters and sorting options to prioritize and organize your workflow efficiently.",
      },
      {
        question: "How do I generate reports?",
        answer:
          "Navigate to the 'Reports' section from the sidebar. You can generate various reports including verification statistics, processing times, and workload summaries. Reports can be exported in PDF or Excel format.",
      },
    ],
  },
  {
    category: "Account & Security",
    icon: <SecurityIcon />,
    questions: [
      {
        question: "How do I change my password?",
        answer:
          "Click on your profile avatar in the top right corner, select 'Profile', and then 'Change Password'. Follow the security requirements for creating a strong password.",
      },
      {
        question: "What if I suspect fraudulent activity?",
        answer:
          "If you suspect fraudulent documents or activities, immediately flag the case, document your concerns, and escalate to your supervisor. Do not approve suspicious applications.",
      },
      {
        question: "How do I access training materials?",
        answer:
          "Training materials and system documentation are available in the Help section. Contact your administrator for access to specialized training programs.",
      },
    ],
  },
];

const contactInfo = [
  {
    icon: <EmailIcon />,
    title: "Email Support",
    details: "support@landora.gov.lk",
    description: "For technical issues and general inquiries",
  },
  {
    icon: <PhoneIcon />,
    title: "Phone Support",
    details: "+94 11 234 5678",
    description: "Available Mon-Fri, 8:00 AM - 5:00 PM",
  },
  {
    icon: <LocationIcon />,
    title: "Office Location",
    details: "Land Registry Department, Colombo 01",
    description: "Visit us for in-person support",
  },
  {
    icon: <ScheduleIcon />,
    title: "Working Hours",
    details: "Mon-Fri: 8:00 AM - 5:00 PM",
    description: "Closed on weekends and public holidays",
  },
];

const quickGuides = [
  {
    icon: <AssignmentIcon />,
    title: "Property Registration Guide",
    description: "Step-by-step guide for processing property registrations",
    link: "#registration-guide",
  },
  {
    icon: <SwapHorizIcon />,
    title: "Transfer Processing Guide",
    description: "Complete guide for handling property transfers",
    link: "#transfer-guide",
  },
  {
    icon: <VerifiedUserIcon />,
    title: "Verification Best Practices",
    description: "Best practices for accurate property verification",
    link: "#verification-practices",
  },
  {
    icon: <SpeedIcon />,
    title: "System Navigation Tips",
    description: "Tips and shortcuts for efficient system use",
    link: "#navigation-tips",
  },
];

export default function HelpSupportPage() {
  const theme = useTheme();
  const router = useRouter();
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const handleSubmitSupport = () => {
    // Here you would handle the support request submission
    console.log("Support message:", supportMessage);
    setSupportMessage("");
    // Show success message
  };

  return (
    <OfficerLayout>
      <Box>
        {/* Header */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Help & Support
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ opacity: 0.8 }}
            >
              Get help with the Landora system and find answers to common
              questions
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {/* Quick Guides */}
          <Grid item xs={12} lg={8}>
            <ModernCard variant="glass" sx={{ mb: 3 }}>
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Quick Guides
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <Grid container spacing={2}>
                  {quickGuides.map((guide, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: `0 8px 25px ${alpha(
                              theme.palette.primary.main,
                              0.15
                            )}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                              ),
                              color: theme.palette.primary.main,
                            }}
                          >
                            {guide.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                              gutterBottom
                            >
                              {guide.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {guide.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </ModernCardContent>
            </ModernCard>

            {/* FAQ Section */}
            <ModernCard variant="glass">
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Frequently Asked Questions
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                {faqData.map((category, categoryIndex) => (
                  <Box key={categoryIndex} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          color: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={600}>
                        {category.category}
                      </Typography>
                    </Box>

                    {category.questions.map((faq, faqIndex) => (
                      <Accordion
                        key={faqIndex}
                        expanded={
                          expandedPanel === `${categoryIndex}-${faqIndex}`
                        }
                        onChange={handlePanelChange(
                          `${categoryIndex}-${faqIndex}`
                        )}
                        sx={{
                          mb: 1,
                          borderRadius: theme.shape.borderRadius,
                          "&:before": { display: "none" },
                          boxShadow: "none",
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.1
                          )}`,
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            borderRadius: theme.shape.borderRadius,
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.04
                              ),
                            },
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight={500}>
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

                    {categoryIndex < faqData.length - 1 && (
                      <Divider sx={{ mt: 3, mb: 2 }} />
                    )}
                  </Box>
                ))}
              </ModernCardContent>
            </ModernCard>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <ModernCard variant="glass" sx={{ mb: 3 }}>
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Contact Information
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <List disablePadding>
                  {contactInfo.map((contact, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            ),
                            color: theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {contact.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={contact.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {contact.details}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {contact.description}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </ModernCardContent>
            </ModernCard>

            {/* Support Request */}
            <ModernCard variant="glass">
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Submit Support Request
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Can't find what you're looking for? Send us a message and
                  we'll get back to you.
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Describe your issue or question..."
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <ModernButton
                  variant="gradient"
                  fullWidth
                  onClick={handleSubmitSupport}
                  disabled={!supportMessage.trim()}
                >
                  Submit Request
                </ModernButton>
              </ModernCardContent>
            </ModernCard>
          </Grid>
        </Grid>
      </Box>
    </OfficerLayout>
  );
}
