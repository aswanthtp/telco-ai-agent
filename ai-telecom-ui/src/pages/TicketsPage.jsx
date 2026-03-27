import { useState } from 'react';
import {
  Box, Typography, Paper, Chip, TextField, InputAdornment,
  Select, MenuItem, FormControl, InputLabel, Stack, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Tooltip, LinearProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Divider, IconButton,
} from '@mui/material';
import {
  Search, SmartToy, CheckCircle, Cancel, HourglassEmpty,
  Autorenew, ErrorOutline, Close, Phone, Email, Home,
  CreditCard, Wifi, ConfirmationNumber, AccessTime,
  RestartAlt, SwapHoriz, SimCard,
} from '@mui/icons-material';

// â”€â”€â”€ Static Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TICKETS = [
  {
    id: 'TKT-2001',
    createdAt: '2026-03-25T08:15:00Z',
    status: 'completed',
    complaint: {
      type: 'Reset Data',
      summary: 'Customer requests a full data usage reset before billing cycle ends.',
    },
    ai: {
      detectedIntent: 'Data Reset Request',
      confidenceScore: 96,
      actionTaken: 'Data counter reset automatically via provisioning API.',
      processingTime: '3.2s',
      status: 'resolved',
    },
    customer: {
      id: 'CUST-10123',
      accountNumber: 'ACT-00123456',
      username: 'james.carter',
      fullName: 'James Carter',
      phone: '+1 (555) 204-8810',
      email: 'james.carter@email.com',
      address: { street: '142 Maple Avenue', city: 'Austin', state: 'TX', zip: '78701' },
      plan: { name: 'Fiber Pro 1Gbps', type: 'Fiber Broadband', speed: '1000 Mbps / 500 Mbps', billingCycle: 'Monthly', startDate: '2024-06-01' },
      payment: { method: 'Credit Card (Visa ****4521)', status: 'Up to date', nextDueDate: '2026-04-01', monthlyCharge: '$89.99' },
    },
  },
  {
    id: 'TKT-2002',
    createdAt: '2026-03-25T09:40:00Z',
    status: 'processing',
    complaint: {
      type: 'Change Plan',
      summary: 'Customer wants to upgrade from 500 Mbps to 1 Gbps fiber plan.',
    },
    ai: {
      detectedIntent: 'Plan Upgrade Request',
      confidenceScore: 91,
      actionTaken: 'Eligibility check in progress, awaiting billing cycle alignment.',
      processingTime: '1.8s',
      status: 'processing',
    },
    customer: {
      id: 'CUST-10234',
      accountNumber: 'ACT-00234567',
      username: 'priya.sharma',
      fullName: 'Priya Sharma',
      phone: '+1 (555) 317-9922',
      email: 'priya.sharma@email.com',
      address: { street: '88 Sunset Blvd, Apt 3B', city: 'San Jose', state: 'CA', zip: '95110' },
      plan: { name: 'Cable Plus 500Mbps', type: 'Cable Broadband', speed: '500 Mbps / 100 Mbps', billingCycle: 'Monthly', startDate: '2025-01-15' },
      payment: { method: 'Auto Debit (Bank ****7733)', status: 'Up to date', nextDueDate: '2026-04-10', monthlyCharge: '$64.99' },
    },
  },
  {
    id: 'TKT-2003',
    createdAt: '2026-03-24T14:20:00Z',
    status: 'pending',
    complaint: {
      type: 'Activate SIM',
      summary: 'New SIM card received but not yet activated. Customer unable to make calls.',
    },
    ai: {
      detectedIntent: 'SIM Activation Request',
      confidenceScore: 88,
      actionTaken: 'Pending human review â€” SIM IMEI mismatch flagged.',
      processingTime: '2.5s',
      status: 'pending',
    },
    customer: {
      id: 'CUST-10345',
      accountNumber: 'ACT-00345678',
      username: 'mike.nguyen',
      fullName: 'Michael Nguyen',
      phone: '+1 (555) 429-1134',
      email: 'mike.nguyen@gmail.com',
      address: { street: '320 Lakewood Drive', city: 'Chicago', state: 'IL', zip: '60601' },
      plan: { name: 'Standard 150Mbps', type: 'DSL Broadband', speed: '150 Mbps / 20 Mbps', billingCycle: 'Monthly', startDate: '2023-09-20' },
      payment: { method: 'PayPal', status: 'Overdue', nextDueDate: '2026-03-20', monthlyCharge: '$74.99' },
    },
  },
  {
    id: 'TKT-2004',
    createdAt: '2026-03-26T07:05:00Z',
    status: 'completed',
    complaint: {
      type: 'Activate SIM',
      summary: 'SIM replaced after device was lost. Customer needs immediate activation.',
    },
    ai: {
      detectedIntent: 'SIM Activation Request',
      confidenceScore: 99,
      actionTaken: 'SIM activated instantly via remote provisioning. Service restored.',
      processingTime: '1.1s',
      status: 'resolved',
    },
    customer: {
      id: 'CUST-10456',
      accountNumber: 'ACT-00456789',
      username: 'linda.okafor',
      fullName: 'Linda Okafor',
      phone: '+1 (555) 538-6670',
      email: 'linda.okafor@work.net',
      address: { street: '57 Rosewood Court', city: 'Houston', state: 'TX', zip: '77002' },
      plan: { name: 'Fiber Starter 300Mbps', type: 'Fiber Broadband', speed: '300 Mbps / 150 Mbps', billingCycle: 'Monthly', startDate: '2026-03-23' },
      payment: { method: 'Credit Card (Mastercard ****8820)', status: 'Up to date', nextDueDate: '2026-04-23', monthlyCharge: '$54.99' },
    },
  },
  {
    id: 'TKT-2005',
    createdAt: '2026-03-26T11:30:00Z',
    status: 'failed',
    complaint: {
      type: 'Change Plan',
      summary: 'Customer wants to downgrade to a basic plan due to budget constraints.',
    },
    ai: {
      detectedIntent: 'Plan Downgrade Request',
      confidenceScore: 74,
      actionTaken: 'Action failed â€” active contract lock prevents downgrade until 2026-06-01.',
      processingTime: '4.0s',
      status: 'failed',
    },
    customer: {
      id: 'CUST-10567',
      accountNumber: 'ACT-00567890',
      username: 'carlos.reyes',
      fullName: 'Carlos Reyes',
      phone: '+1 (555) 642-3350',
      email: 'c.reyes@personal.org',
      address: { street: '9 Harbor View Lane', city: 'Miami', state: 'FL', zip: '33101' },
      plan: { name: 'Home Basic 100Mbps', type: 'Cable Broadband', speed: '100 Mbps / 20 Mbps', billingCycle: 'Monthly', startDate: '2025-07-01' },
      payment: { method: 'Credit Card (Amex ****3390)', status: 'Up to date', nextDueDate: '2026-04-01', monthlyCharge: '$44.99' },
    },
  },
  {
    id: 'TKT-2006',
    createdAt: '2026-03-27T06:50:00Z',
    status: 'processing',
    complaint: {
      type: 'Reset Data',
      summary: 'Data exhausted mid-month. Customer requests emergency reset to restore service.',
    },
    ai: {
      detectedIntent: 'Data Reset Request',
      confidenceScore: 93,
      actionTaken: 'Reset scheduled â€” throttle removal pending network sync.',
      processingTime: '2.2s',
      status: 'processing',
    },
    customer: {
      id: 'CUST-10678',
      accountNumber: 'ACT-00678901',
      username: 'sara.kim',
      fullName: 'Sara Kim',
      phone: '+1 (555) 751-4480',
      email: 'sara.kim@techcorp.io',
      address: { street: '233 Pine Street, Suite 10', city: 'Seattle', state: 'WA', zip: '98101' },
      plan: { name: 'Business Fiber 2Gbps', type: 'Fiber Broadband', speed: '2000 Mbps / 1000 Mbps', billingCycle: 'Monthly', startDate: '2024-11-01' },
      payment: { method: 'Invoice (Net 30)', status: 'Up to date', nextDueDate: '2026-04-15', monthlyCharge: '$199.99' },
    },
  },
  {
    id: 'TKT-2007',
    createdAt: '2026-03-27T10:05:00Z',
    status: 'pending',
    complaint: {
      type: 'Change Plan',
      summary: 'Customer requests plan change to include unlimited international calls.',
    },
    ai: {
      detectedIntent: 'Plan Modification Request',
      confidenceScore: 85,
      actionTaken: 'Awaiting agent approval â€” international add-on requires manual verification.',
      processingTime: '3.7s',
      status: 'pending',
    },
    customer: {
      id: 'CUST-10789',
      accountNumber: 'ACT-00789012',
      username: 'david.osei',
      fullName: 'David Osei',
      phone: '+1 (555) 860-2240',
      email: 'david.osei@mailbox.com',
      address: { street: '14 Elmwood Terrace', city: 'Atlanta', state: 'GA', zip: '30301' },
      plan: { name: 'Broadband Plus 250Mbps', type: 'Cable Broadband', speed: '250 Mbps / 50 Mbps', billingCycle: 'Monthly', startDate: '2025-03-10' },
      payment: { method: 'Credit Card (Visa ****6612)', status: 'Up to date', nextDueDate: '2026-04-10', monthlyCharge: '$59.99' },
    },
  },
  {
    id: 'TKT-2008',
    createdAt: '2026-03-27T11:55:00Z',
    status: 'completed',
    complaint: {
      type: 'Reset Data',
      summary: 'Customer hit data cap due to a background app update. Requesting a one-time reset.',
    },
    ai: {
      detectedIntent: 'Data Reset Request',
      confidenceScore: 97,
      actionTaken: 'One-time data reset granted and applied. Customer notified via SMS.',
      processingTime: '0.9s',
      status: 'resolved',
    },
    customer: {
      id: 'CUST-10890',
      accountNumber: 'ACT-00890123',
      username: 'emily.walsh',
      fullName: 'Emily Walsh',
      phone: '+1 (555) 972-5530',
      email: 'emily.walsh@personal.net',
      address: { street: '76 Birchwood Lane', city: 'Denver', state: 'CO', zip: '80201' },
      plan: { name: 'Standard 200Mbps', type: 'Fiber Broadband', speed: '200 Mbps / 100 Mbps', billingCycle: 'Monthly', startDate: '2025-05-18' },
      payment: { method: 'Auto Debit (Bank ****4410)', status: 'Up to date', nextDueDate: '2026-04-18', monthlyCharge: '$49.99' },
    },
  },
];

// â”€â”€â”€ Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const COMPLAINT_TYPE_CONFIG = {
  'Reset Data':   { color: 'info',    icon: <RestartAlt sx={{ fontSize: 14 }} /> },
  'Change Plan':  { color: 'warning', icon: <SwapHoriz sx={{ fontSize: 14 }} /> },
  'Activate SIM': { color: 'secondary', icon: <SimCard sx={{ fontSize: 14 }} /> },
};

const STATUS_CONFIG = {
  pending:    { color: 'default', label: 'Pending',    icon: <HourglassEmpty sx={{ fontSize: 13 }} /> },
  processing: { color: 'warning', label: 'Processing', icon: <Autorenew sx={{ fontSize: 13 }} /> },
  completed:  { color: 'success', label: 'Completed',  icon: <CheckCircle sx={{ fontSize: 13 }} /> },
  failed:     { color: 'error',   label: 'Failed',     icon: <ErrorOutline sx={{ fontSize: 13 }} /> },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase();

const getConfidenceColor = (score) => {
  if (score >= 90) return 'success.main';
  if (score >= 75) return 'warning.main';
  return 'error.main';
};

// â”€â”€â”€ Badges â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? { color: 'default', label: status, icon: null };
  return (
    <Chip
      icon={cfg.icon}
      label={cfg.label}
      color={cfg.color}
      size="small"
      variant="outlined"
      sx={{ fontWeight: 600, fontSize: 11 }}
    />
  );
};

const ComplaintTypeBadge = ({ type }) => {
  const cfg = COMPLAINT_TYPE_CONFIG[type] ?? { color: 'default', icon: null };
  return (
    <Chip
      icon={cfg.icon}
      label={type}
      color={cfg.color}
      size="small"
      sx={{ fontWeight: 600, fontSize: 11 }}
    />
  );
};

// â”€â”€â”€ Info Row (used in detail dialog) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const InfoRow = ({ icon, label, value }) => (
  <Box display="flex" alignItems="flex-start" gap={1.5}>
    <Box sx={{ color: 'text.secondary', mt: 0.3, flexShrink: 0 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  </Box>
);

// â”€â”€â”€ Ticket Detail Dialog â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TicketDetailDialog = ({ ticket, open, onClose }) => {
  if (!ticket) return null;
  const { customer: c, complaint, ai } = ticket;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">{ticket.id}</Typography>
            <Typography variant="h6" fontWeight={700}>{complaint.type}</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Request Summary */}
        <Typography variant="overline" color="text.secondary" fontWeight={700}>
          Request Summary
        </Typography>
        <Paper variant="outlined" sx={{ p: 1.5, mb: 2, mt: 0.5, borderRadius: 2, bgcolor: 'grey.50' }}>
          <Typography variant="body2">{complaint.summary}</Typography>
        </Paper>

        {/* AI Analysis */}
        <Typography variant="overline" color="text.secondary" fontWeight={700}>
          AI Agent Analysis
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2, mb: 2, mt: 0.5, borderRadius: 2,
            bgcolor: ai.status === 'resolved' ? 'success.50' : ai.status === 'failed' ? 'error.50' : 'grey.50',
            borderColor: ai.status === 'resolved' ? 'success.light' : ai.status === 'failed' ? 'error.light' : 'divider',
          }}
        >
          <Stack spacing={1.2}>
            <InfoRow icon={<SmartToy fontSize="small" />} label="Detected Intent" value={ai.detectedIntent} />
            <InfoRow
              icon={<CheckCircle fontSize="small" />}
              label="Confidence Score"
              value={
                <Typography variant="body2" fontWeight={700} color={getConfidenceColor(ai.confidenceScore)}>
                  {ai.confidenceScore}%
                  {ai.status === 'processing' && (
                    <LinearProgress
                      variant="indeterminate"
                      sx={{ mt: 0.5, borderRadius: 4, height: 5 }}
                    />
                  )}
                </Typography>
              }
            />
            <InfoRow icon={<AccessTime fontSize="small" />} label="Processing Time" value={ai.processingTime} />
            <InfoRow icon={<Autorenew fontSize="small" />} label="Action Taken" value={ai.actionTaken} />
          </Stack>
        </Paper>

        <Divider sx={{ my: 2 }} />

        {/* Customer Info */}
        <Box display="flex" alignItems="center" gap={1.5} mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, fontWeight: 700, fontSize: 15 }}>
            {getInitials(c.fullName)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>{c.fullName}</Typography>
            <Typography variant="caption" color="text.secondary">
              @{c.username} Â· {c.id}
            </Typography>
          </Box>
        </Box>

        <Typography variant="overline" color="text.secondary" fontWeight={700}>
          Customer Details
        </Typography>
        <Stack spacing={1.2} mt={0.5} mb={2}>
          <InfoRow icon={<ConfirmationNumber fontSize="small" />} label="Account Number" value={c.accountNumber} />
          <InfoRow icon={<Phone fontSize="small" />} label="Phone" value={c.phone} />
          <InfoRow icon={<Email fontSize="small" />} label="Email" value={c.email} />
          <InfoRow
            icon={<Home fontSize="small" />}
            label="Address"
            value={`${c.address.street}, ${c.address.city}, ${c.address.state} ${c.address.zip}`}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="overline" color="text.secondary" fontWeight={700}>
          Plan & Payment
        </Typography>
        <Stack spacing={1.2} mt={0.5}>
          <InfoRow icon={<Wifi fontSize="small" />} label="Plan" value={`${c.plan.name} â€” ${c.plan.speed}`} />
          <InfoRow icon={<AccessTime fontSize="small" />} label="Active Since" value={c.plan.startDate} />
          <InfoRow icon={<CreditCard fontSize="small" />} label="Payment Method" value={c.payment.method} />
          <InfoRow
            icon={<CreditCard fontSize="small" />}
            label="Payment Status"
            value={
              <Chip
                label={c.payment.status}
                color={c.payment.status === 'Up to date' ? 'success' : 'error'}
                size="small"
                sx={{ fontWeight: 600, height: 20, fontSize: 11 }}
              />
            }
          />
          <InfoRow icon={<CreditCard fontSize="small" />} label="Monthly Charge" value={c.payment.monthlyCharge} />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" size="small">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TicketsPage = () => {
  const [tickets] = useState(TICKETS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const displayed = tickets.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.id.toLowerCase().includes(q) ||
      t.customer.id.toLowerCase().includes(q) ||
      t.customer.fullName.toLowerCase().includes(q) ||
      t.complaint.type.toLowerCase().includes(q) ||
      t.ai.detectedIntent.toLowerCase().includes(q);
    const matchType   = filterType   === 'all' || t.complaint.type === filterType;
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const counts = {
    total:      tickets.length,
    pending:    tickets.filter((t) => t.status === 'pending').length,
    processing: tickets.filter((t) => t.status === 'processing').length,
    completed:  tickets.filter((t) => t.status === 'completed').length,
    failed:     tickets.filter((t) => t.status === 'failed').length,
  };

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  const TABLE_COLUMNS = [
    'Ticket ID', 'Customer ID', 'Request Summary',
    'AI Detected Intent', 'Status', 'Confidence Score',
    'Action Taken', 'Processing Time',
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Page Header */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          AI Ticket Processing
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Customer complaint tickets queued for AI agent analysis and resolution
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        {[
          { label: 'Total',      value: counts.total,      color: 'text.primary' },
          { label: 'Pending',    value: counts.pending,    color: 'text.secondary' },
          { label: 'Processing', value: counts.processing, color: 'warning.main' },
          { label: 'Completed',  value: counts.completed,  color: 'success.main' },
          { label: 'Failed',     value: counts.failed,     color: 'error.main' },
        ].map((s) => (
          <Paper
            key={s.label}
            variant="outlined"
            sx={{ px: 3, py: 1.5, borderRadius: 2, textAlign: 'center', minWidth: 100 }}
          >
            <Typography variant="h4" fontWeight={800} color={s.color}>
              {s.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              {s.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Filters */}
      <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2, width: '100%' }}>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="center">
          <TextField
            size="small"
            placeholder="Search ticket ID, customer, intent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 280 }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Complaint Type</InputLabel>
            <Select value={filterType} label="Complaint Type" onChange={(e) => setFilterType(e.target.value)}>
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="Reset Data">Reset Data</MenuItem>
              <MenuItem value="Change Plan">Change Plan</MenuItem>
              <MenuItem value="Activate SIM">Activate SIM</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value)}>
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" color="text.secondary" alignSelf="center" ml="auto">
            Showing {displayed.length} of {tickets.length} tickets
          </Typography>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', width: '100%' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 340px)', overflowX: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {TABLE_COLUMNS.map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      color: 'text.secondary',
                      bgcolor: 'grey.50',
                      whiteSpace: 'nowrap',
                      py: 1.5,
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No tickets found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((t) => (
                  <TableRow
                    key={t.id}
                    hover
                    onClick={() => handleRowClick(t)}
                    sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    {/* Ticket ID */}
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Typography variant="body2" fontWeight={700} color="primary.main">
                        {t.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(t.createdAt)}
                      </Typography>
                    </TableCell>

                    {/* Customer ID */}
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: 'primary.main', fontWeight: 700 }}>
                          {getInitials(t.customer.fullName)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {t.customer.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t.customer.fullName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Request Summary */}
                    <TableCell sx={{ maxWidth: 220 }}>
                      <Box mb={0.5}>
                        <ComplaintTypeBadge type={t.complaint.type} />
                      </Box>
                      <Tooltip title={t.complaint.summary} arrow placement="top">
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {t.complaint.summary}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    {/* AI Detected Intent */}
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Box display="flex" alignItems="center" gap={0.8}>
                        <SmartToy sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="body2" fontWeight={500}>
                          {t.ai.detectedIntent}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={t.status} />
                    </TableCell>

                    {/* Confidence Score */}
                    <TableCell sx={{ minWidth: 120 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color={getConfidenceColor(t.ai.confidenceScore)}
                          sx={{ minWidth: 36 }}
                        >
                          {t.ai.confidenceScore}%
                        </Typography>
                        <Box sx={{ flex: 1, minWidth: 60 }}>
                          <LinearProgress
                            variant="determinate"
                            value={t.ai.confidenceScore}
                            color={
                              t.ai.confidenceScore >= 90
                                ? 'success'
                                : t.ai.confidenceScore >= 75
                                ? 'warning'
                                : 'error'
                            }
                            sx={{ borderRadius: 4, height: 6 }}
                          />
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Action Taken */}
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Tooltip title={t.ai.actionTaken} arrow placement="top">
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {t.ai.actionTaken}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    {/* Processing Time */}
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Box display="flex" alignItems="center" gap={0.6}>
                        <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2" fontWeight={600}>
                          {t.ai.processingTime}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Detail Dialog */}
      <TicketDetailDialog
        ticket={selectedTicket}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  );
};

export default TicketsPage;

