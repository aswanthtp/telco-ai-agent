import { Box, Typography, Paper, Chip, Divider, Button } from '@mui/material';
import { Person, LocationOn, AccessTime, Group, Schedule } from '@mui/icons-material';
import { formatDate, formatNumber, getCategoryIcon } from '../../utils/helpers';
import { getPriorityColor } from '../../data/mockData';
import StatusChip from '../common/StatusChip';

const TicketDetails = ({ ticket }) => {
  if (!ticket) {
    return (
      <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">
          Select a ticket to view details
        </Typography>
      </Paper>
    );
  }

  const priorityColor = getPriorityColor(ticket.priority);
  const categoryIcon = getCategoryIcon(ticket.category);

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {categoryIcon} {ticket.id}
          </Typography>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {ticket.title}
          </Typography>
        </Box>
        <Chip
          label={ticket.priority.toUpperCase()}
          color={priorityColor}
          sx={{ fontWeight: 600 }}
        />
      </Box>

      <Box mb={3}>
        <StatusChip status={ticket.status} size="medium" />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" gutterBottom>
          Description
        </Typography>
        <Typography variant="body2" paragraph>
          {ticket.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <Person sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Assigned To
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {ticket.assignee}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <LocationOn sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {ticket.location}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <AccessTime sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Created At
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatDate(ticket.createdAt)}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Group sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Impacted Customers
            </Typography>
            <Typography variant="body2" fontWeight={600} color="error.main">
              {formatNumber(ticket.impactedCustomers)}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Schedule sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Estimated Resolution
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {ticket.estimatedResolutionTime}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'info.light', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'info.main',
          mb: 2,
        }}
      >
        <Typography variant="body2" fontWeight={600} color="info.dark" gutterBottom>
          Category: {ticket.category.toUpperCase()}
        </Typography>
        <Typography variant="caption" color="info.dark">
          Last Updated: {formatDate(ticket.updatedAt)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TicketDetails;
