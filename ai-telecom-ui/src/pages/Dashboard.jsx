import { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Paper, TextField, Button, MenuItem,
  Select, FormControl, InputLabel, Grid, Divider, Alert,
  Snackbar, Chip, Stack, InputAdornment, Avatar, CircularProgress,
  IconButton,
} from '@mui/material';
import {
  AddCircleOutline, ConfirmationNumber, Person,
  Home, CreditCard, Wifi, SmartToy, CheckCircle, Send,
  PersonOutline,
} from '@mui/icons-material';

// ─── Constants ───────────────────────────────────────────────────────────────

const COMPLAINT_TYPES = ['Reset Data', 'Change Plan', 'Activate SIM'];
const TICKET_STATUSES = ['pending', 'processing', 'completed', 'failed'];
const PAYMENT_STATUSES = ['Up to date', 'Overdue'];
const BILLING_CYCLES = ['Monthly', 'Quarterly', 'Yearly'];

const EMPTY_FORM = {
  // Ticket
  id: '',
  status: 'pending',
  complaintType: 'Reset Data',
  complaintSummary: '',
  // Customer
  customerId: '',
  accountNumber: '',
  username: '',
  fullName: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  // Plan
  planName: '',
  planType: '',
  speed: '',
  billingCycle: 'Monthly',
  startDate: '',
  // Payment
  paymentMethod: '',
  paymentStatus: 'Up to date',
  nextDueDate: '',
  monthlyCharge: '',
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({ icon, title }) => (
  <Box display="flex" alignItems="center" gap={1} mb={2} mt={1}>
    <Box sx={{ color: 'primary.main' }}>{icon}</Box>
    <Typography variant="subtitle1" fontWeight={700} color="primary.main">
      {title}
    </Typography>
  </Box>
);

// ─── AI Chatbot Panel ─────────────────────────────────────────────────────────

const ChatMessage = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <Box
      display="flex"
      flexDirection={isUser ? 'row-reverse' : 'row'}
      alignItems="flex-start"
      gap={1}
      mb={2}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          flexShrink: 0,
        }}
      >
        {isUser ? <PersonOutline sx={{ fontSize: 18 }} /> : <SmartToy sx={{ fontSize: 18 }} />}
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.2,
          maxWidth: '78%',
          borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
          bgcolor: isUser ? 'primary.main' : 'grey.100',
          color: isUser ? 'primary.contrastText' : 'text.primary',
          border: isUser ? 'none' : '1px solid',
          borderColor: isUser ? 'transparent' : 'divider',
        }}
      >
        {msg.error ? (
          <Typography variant="body2" color="error.main">
            {msg.text}
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {msg.text}
          </Typography>
        )}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            opacity: 0.6,
            textAlign: isUser ? 'right' : 'left',
            fontSize: 10,
          }}
        >
          {msg.time}
        </Typography>
      </Paper>
    </Box>
  );
};

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: 'Hello! I\'m your AI Telecom Assistant. Ask me anything about tickets, network issues, or customer queries.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      error: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text, time: now, error: false },
    ]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/ai/chat?question=${encodeURIComponent(text)}`
      );
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.text();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: data || 'No response received.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          error: false,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: `Error: ${err.message}. Please check that the AI service is running on localhost:8080.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 500,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          px: 2.5,
          py: 1.8,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexShrink: 0,
        }}
      >
        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.25)', width: 36, height: 36 }}>
          <SmartToy sx={{ fontSize: 20, color: 'white' }} />
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={700} color="white">
            AI Telecom Assistant
          </Typography>
          <Box display="flex" alignItems="center" gap={0.6}>
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: loading ? 'warning.light' : 'success.light',
              }}
            />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              {loading ? 'Thinking...' : 'Online'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
          bgcolor: 'background.default',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(0,0,0,0.15)',
            borderRadius: '3px',
          },
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}

        {loading && (
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', flexShrink: 0 }}>
              <SmartToy sx={{ fontSize: 18 }} />
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1.2,
                borderRadius: '4px 16px 16px 16px',
                bgcolor: 'grey.100',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <CircularProgress size={14} thickness={5} />
              <Typography variant="body2" color="text.secondary">
                Thinking...
              </Typography>
            </Paper>
          </Box>
        )}
        <div ref={bottomRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flexShrink: 0,
        }}
      >
        <Box display="flex" gap={1} alignItems="flex-end">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            size="small"
            placeholder="Type your question and press Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 3 },
            }}
          />
          <IconButton
            color="primary"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 2,
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' },
            }}
          >
            <Send sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
          Press Enter to send · Shift+Enter for new line
        </Typography>
      </Box>
    </Paper>
  );
};

// ─── Dashboard (Ticket Input Form) ───────────────────────────────────────────

const Dashboard = ({ onAddTicket, onNavigate, ticketCount }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const required = {
      id: 'Ticket ID',
      complaintSummary: 'Complaint Summary',
      customerId: 'Customer ID',
      accountNumber: 'Account Number',
      username: 'Username',
      fullName: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'ZIP',
      planName: 'Plan Name',
      planType: 'Plan Type',
      speed: 'Speed',
      startDate: 'Plan Start Date',
      paymentMethod: 'Payment Method',
      nextDueDate: 'Next Due Date',
      monthlyCharge: 'Monthly Charge',
    };
    const newErrors = {};
    Object.entries(required).forEach(([key, label]) => {
      if (!form[key].trim()) newErrors[key] = `${label} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
      return;
    }

    const newTicket = {
      id: form.id.trim(),
      createdAt: new Date().toISOString(),
      status: form.status,
      complaint: {
        type: form.complaintType,
        summary: form.complaintSummary.trim(),
      },
      ai: {},
      customer: {
        id: form.customerId.trim(),
        accountNumber: form.accountNumber.trim(),
        username: form.username.trim(),
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: {
          street: form.street.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          zip: form.zip.trim(),
        },
        plan: {
          name: form.planName.trim(),
          type: form.planType.trim(),
          speed: form.speed.trim(),
          billingCycle: form.billingCycle,
          startDate: form.startDate,
        },
        payment: {
          method: form.paymentMethod.trim(),
          status: form.paymentStatus,
          nextDueDate: form.nextDueDate,
          monthlyCharge: form.monthlyCharge.trim(),
        },
      },
    };

    onAddTicket(newTicket);
    setForm(EMPTY_FORM);
    setErrors({});
    setSnackbar({ open: true, message: `Ticket ${newTicket.id} added successfully!`, severity: 'success' });
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const field = (label, fieldKey, props = {}) => (
    <TextField
      label={label}
      value={form[fieldKey]}
      onChange={set(fieldKey)}
      error={!!errors[fieldKey]}
      helperText={errors[fieldKey] || ''}
      size="small"
      fullWidth
      {...props}
    />
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Page Header */}
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            New Ticket Entry
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details below to create a new customer support ticket
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            icon={<ConfirmationNumber sx={{ fontSize: 15 }} />}
            label={`${ticketCount} Tickets`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => onNavigate('tickets')}
            startIcon={<CheckCircle sx={{ fontSize: 16 }} />}
          >
            View Tickets
          </Button>
        </Stack>
      </Box>

      {/* Two-column layout */}
      <Box display="flex" flexDirection="column" gap={3}>

        {/* ── TOP: Ticket Form ─────────────────────────────────── */}
        <Box sx={{ width: '100%' }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>

        {/* ── Ticket Info ──────────────────────────────────────────── */}
        <SectionHeader icon={<ConfirmationNumber />} title="Ticket Information" />
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            {field('Ticket ID *', 'id', { placeholder: 'e.g. TKT-2009' })}
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Status *</InputLabel>
              <Select value={form.status} label="Status *" onChange={set('status')}>
                {TICKET_STATUSES.map((s) => (
                  <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Complaint Type *</InputLabel>
              <Select value={form.complaintType} label="Complaint Type *" onChange={set('complaintType')}>
                {COMPLAINT_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {field('Complaint Summary *', 'complaintSummary', {
              placeholder: 'Describe the customer complaint...',
              multiline: true,
              rows: 2,
            })}
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ── AI Info ──────────────────────────────────────────────── */}
        <SectionHeader icon={<SmartToy />} title="AI Agent Output" />
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: 'grey.50', borderStyle: 'dashed' }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            The AI fields (detected intent, confidence score, action taken, processing time) will be
            populated automatically once the AI agent processes this ticket.
          </Typography>
        </Paper>

        <Divider sx={{ my: 2 }} />

        {/* ── Customer Info ─────────────────────────────────────────── */}
        <SectionHeader icon={<Person />} title="Customer Details" />
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            {field('Customer ID *', 'customerId', { placeholder: 'e.g. CUST-10900' })}
          </Grid>
          <Grid item xs={12} sm={4}>
            {field('Account Number *', 'accountNumber', { placeholder: 'e.g. ACT-00900123' })}
          </Grid>
          <Grid item xs={12} sm={4}>
            {field('Username *', 'username', { placeholder: 'e.g. john.doe' })}
          </Grid>
          <Grid item xs={12} sm={6}>
            {field('Full Name *', 'fullName', { placeholder: 'e.g. John Doe' })}
          </Grid>
          <Grid item xs={12} sm={3}>
            {field('Phone *', 'phone', { placeholder: '+1 (555) 000-0000' })}
          </Grid>
          <Grid item xs={12} sm={3}>
            {field('Email *', 'email', { placeholder: 'john.doe@email.com', type: 'email' })}
          </Grid>
        </Grid>

        {/* ── Address ──────────────────────────────────────────────── */}
        <SectionHeader icon={<Home />} title="Address" />
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6}>
            {field('Street *', 'street', { placeholder: '123 Main Street' })}
          </Grid>
          <Grid item xs={12} sm={3}>
            {field('City *', 'city', { placeholder: 'e.g. Austin' })}
          </Grid>
          <Grid item xs={6} sm={2}>
            {field('State *', 'state', { placeholder: 'e.g. TX' })}
          </Grid>
          <Grid item xs={6} sm={1}>
            {field('ZIP *', 'zip', { placeholder: '78701' })}
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ── Plan ─────────────────────────────────────────────────── */}
        <SectionHeader icon={<Wifi />} title="Plan Details" />
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            {field('Plan Name *', 'planName', { placeholder: 'e.g. Fiber Pro 1Gbps' })}
          </Grid>
          <Grid item xs={12} sm={4}>
            {field('Plan Type *', 'planType', { placeholder: 'e.g. Fiber Broadband' })}
          </Grid>
          <Grid item xs={12} sm={4}>
            {field('Speed *', 'speed', { placeholder: 'e.g. 1000 Mbps / 500 Mbps' })}
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Billing Cycle *</InputLabel>
              <Select value={form.billingCycle} label="Billing Cycle *" onChange={set('billingCycle')}>
                {BILLING_CYCLES.map((b) => (
                  <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {field('Plan Start Date *', 'startDate', { type: 'date', InputLabelProps: { shrink: true } })}
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ── Payment ──────────────────────────────────────────────── */}
        <SectionHeader icon={<CreditCard />} title="Payment Details" />
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            {field('Payment Method *', 'paymentMethod', { placeholder: 'e.g. Credit Card (Visa ****1234)' })}
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Payment Status *</InputLabel>
              <Select value={form.paymentStatus} label="Payment Status *" onChange={set('paymentStatus')}>
                {PAYMENT_STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            {field('Next Due Date *', 'nextDueDate', { type: 'date', InputLabelProps: { shrink: true } })}
          </Grid>
          <Grid item xs={12} sm={3}>
            {field('Monthly Charge *', 'monthlyCharge', {
              placeholder: 'e.g. 89.99',
              InputProps: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              },
            })}
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ── Actions ──────────────────────────────────────────────── */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="outlined" color="inherit" onClick={handleReset}>
            Reset Form
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleSubmit}
            sx={{ px: 4, fontWeight: 700 }}
          >
            Add Ticket
          </Button>
        </Box>
      </Paper>
        </Box>{/* end TOP: form */}

        {/* ── BOTTOM: AI Chatbot ────────────────────────────────── */}
        <Box sx={{ width: '100%' }}>
          <AIChatbot />
        </Box>

      </Box>{/* end stacked layout */}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          sx={{ fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
