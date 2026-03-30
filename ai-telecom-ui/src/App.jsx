import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import TicketsPage from './pages/TicketsPage';
import './App.css';

const INITIAL_TICKETS = [
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
      actionTaken: 'Pending human review – SIM IMEI mismatch flagged.',
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
      actionTaken: 'Action failed – active contract lock prevents downgrade until 2026-06-01.',
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
      actionTaken: 'Reset scheduled – throttle removal pending network sync.',
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
      actionTaken: 'Awaiting agent approval – international add-on requires manual verification.',
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

// Create Material-UI theme with enterprise look
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
      light: '#9fa4f4',
      dark: '#5568d3',
    },
    secondary: {
      main: '#764ba2',
      light: '#9b6bc4',
      dark: '#5d3c81',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 8px 16px rgba(0,0,0,0.10)',
    '0px 12px 24px rgba(0,0,0,0.12)',
    '0px 16px 32px rgba(0,0,0,0.14)',
    ...Array(19).fill('0px 2px 4px rgba(0,0,0,0.05)'),
  ],
});

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAddTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onAddTicket={handleAddTicket} onNavigate={handleNavigate} ticketCount={tickets.length} />;
      case 'tickets':
        return <TicketsPage tickets={tickets} />;
      case 'analytics':
        return <Dashboard onAddTicket={handleAddTicket} onNavigate={handleNavigate} ticketCount={tickets.length} />;
      default:
        return <Dashboard onAddTicket={handleAddTicket} onNavigate={handleNavigate} ticketCount={tickets.length} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPage()}
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
