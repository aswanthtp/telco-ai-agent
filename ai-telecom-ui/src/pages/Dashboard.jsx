import { Box, Grid, Typography, Paper } from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Timer,
  People,
  Speed,
  Psychology,
  SignalCellularAlt,
} from '@mui/icons-material';
import MetricCard from '../components/common/MetricCard';
import { metrics } from '../data/mockData';

const Dashboard = () => {
  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time monitoring of network operations and AI-powered ticket analysis
        </Typography>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Tickets"
            value={metrics.totalTickets}
            subtitle="Active incidents"
            icon={<TrendingUp color="primary" />}
            color="primary"
            trend={{ positive: false, value: '8%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Critical Tickets"
            value={metrics.criticalTickets}
            subtitle="Requires immediate attention"
            icon={<Warning color="error" />}
            color="error"
            trend={{ positive: false, value: '12%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="AI Approval Rate"
            value={`${metrics.aiApprovalRate}%`}
            subtitle="Successfully processed"
            icon={<CheckCircle color="success" />}
            color="success"
            trend={{ positive: true, value: '5%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg Resolution Time"
            value={metrics.averageResolutionTime}
            subtitle="End-to-end processing"
            icon={<Timer color="info" />}
            color="info"
            trend={{ positive: true, value: '15%' }}
          />
        </Grid>
      </Grid>

      {/* Additional Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Pending AI Analysis"
            value={metrics.pendingAIAnalysis}
            subtitle="In processing queue"
            icon={<Psychology sx={{ color: 'warning.main' }} />}
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Incidents"
            value={metrics.activeIncidents}
            subtitle="Currently ongoing"
            icon={<SignalCellularAlt sx={{ color: 'error.main' }} />}
            color="error"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Customer Impact"
            value={metrics.customerImpact}
            subtitle="Total affected users"
            icon={<People sx={{ color: 'info.main' }} />}
            color="info"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Network Uptime"
            value={`${metrics.networkUptime}%`}
            subtitle="Last 30 days"
            icon={<Speed sx={{ color: 'success.main' }} />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Trends Chart Placeholder */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Ticket Trends (Last 7 Days)
            </Typography>
            <Box 
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TrendingUp sx={{ fontSize: 80, color: 'primary.main', opacity: 0.3 }} />
              <Typography color="text.secondary" align="center">
                Chart visualization would display ticket trends over time
              </Typography>
              <Box display="flex" gap={4} mt={2}>
                {metrics.trendsData.slice(-3).map((data) => (
                  <Box key={data.date} textAlign="center">
                    <Typography variant="caption" color="text.secondary">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Typography>
                    <Typography variant="h6" fontWeight={600} color="primary">
                      {data.tickets}
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      {data.resolved} resolved
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper elevation={2} sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              AI Performance
            </Typography>
            <Box mt={3}>
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Processing Time
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {metrics.aiProcessingTime}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    bgcolor: 'action.hover',
                    overflow: 'hidden',
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: '75%', 
                      bgcolor: 'success.main',
                      borderRadius: 4,
                    }} 
                  />
                </Box>
              </Box>

              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Accuracy Rate
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {metrics.aiApprovalRate}%
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    bgcolor: 'action.hover',
                    overflow: 'hidden',
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${metrics.aiApprovalRate}%`, 
                      bgcolor: 'primary.main',
                      borderRadius: 4,
                    }} 
                  />
                </Box>
              </Box>

              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Network Uptime
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {metrics.networkUptime}%
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    bgcolor: 'action.hover',
                    overflow: 'hidden',
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${metrics.networkUptime}%`, 
                      bgcolor: 'success.main',
                      borderRadius: 4,
                    }} 
                  />
                </Box>
              </Box>

              <Box 
                mt={4} 
                p={2} 
                sx={{ 
                  bgcolor: 'success.light', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
              >
                <Typography variant="body2" fontWeight={600} color="success.dark" gutterBottom>
                  ✓ System Status: Operational
                </Typography>
                <Typography variant="caption" color="success.dark">
                  All AI services running normally
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
