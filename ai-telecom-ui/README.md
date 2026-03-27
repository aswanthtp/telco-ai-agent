# AI-Powered Telecom Operations Dashboard

A modern, enterprise-grade React application built with Vite for managing telecom network operations with AI-powered ticket analysis and resolution workflows.

## 🚀 Features

### Dashboard Overview
- **Real-time Metrics**: Monitor key performance indicators including total tickets, critical incidents, AI approval rates, and average resolution times
- **Network Uptime Tracking**: Display current network uptime percentage and historical trends
- **AI Performance Metrics**: Track AI processing times and accuracy rates
- **Trend Visualization**: View ticket trends over time with visual representations

### Ticket Management
- **Intelligent Ticket List**: Browse and filter tickets by priority, search by keywords
- **Detailed Ticket View**: View comprehensive ticket information including priority, location, affected customers, assigned technician, and estimated resolution time
- **AI Analysis Panel**: Get AI-powered insights including root cause analysis, impact assessment, technical details, recommended actions, and similar past incidents

### Approval Workflow
- **AI Recommendations**: Review AI-generated solutions and recommendations
- **Approve/Reject Controls**: Make informed decisions on AI recommendations
- **Status Tracking**: Monitor ticket progression through various states (Pending AI Analysis, AI Approved, Pending Approval, etc.)

## 🛠️ Technology Stack

- **React 19.2.4**: Modern React with functional components and hooks
- **Vite 8.0.0**: Lightning-fast build tool and development server
- **Material-UI (MUI) 7.3.9**: Comprehensive component library for enterprise UI
- **Emotion**: CSS-in-JS styling solution

## 📁 Project Structure

```
ai-telecom-ui/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components (StatusChip, MetricCard, TicketCard)
│   │   ├── layout/           # Layout components (Header, Sidebar, MainLayout)
│   │   └── tickets/          # Ticket-specific components
│   ├── pages/                # Main page components (Dashboard, TicketsPage)
│   ├── data/                 # Mock data and constants
│   ├── utils/                # Helper functions
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── public/                   # Static assets
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd ai-telecom-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Or using Node directly:
   ```bash
   node node_modules/vite/bin/vite.js
   ```

4. **Open your browser** and navigate to the displayed URL (typically http://localhost:5173 or http://localhost:5174)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Mock Data

The application currently uses mock data located in `src/data/mockData.js` including:
- 8 sample tickets covering various telecom scenarios
- Comprehensive metrics and KPIs
- Detailed AI analysis for select tickets

## 🎨 Design Features

- **Clean Enterprise Look**: Modern design with subtle shadows and smooth transitions
- **Color-Coded Priorities**: Visual distinction for critical, high, medium, and low priority tickets
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Sidebar navigation with clear section labels

## 🔄 Future Enhancements

- Backend API integration for live data
- Real-time WebSocket connections for live updates
- Advanced analytics with charts and graphs
- User authentication and role-based access
- Export functionality for reports

---

**Built with ❤️ for modern telecom operations**
