import { Card, CardContent, Typography, Box, Chip, LinearProgress } from '@mui/material';
import { Person, AccessTime, LocationOn } from '@mui/icons-material';
import { formatRelativeTime, formatNumber, getCategoryIcon } from '../../utils/helpers';
import { getPriorityColor } from '../../data/mockData';
import StatusChip from './StatusChip';

const TicketCard = ({ ticket, onClick, selected }) => {
  const priorityColor = getPriorityColor(ticket.priority);
  const categoryIcon = getCategoryIcon(ticket.category);

  return (
    <Card
      elevation={selected ? 4 : 1}
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderLeft: `4px solid`,
        borderLeftColor: `${priorityColor}.main`,
        backgroundColor: selected ? 'action.selected' : 'background.paper',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateX(4px)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              {categoryIcon} {ticket.id}
            </Typography>
          </Box>
          <Chip
            label={ticket.priority.toUpperCase()}
            color={priorityColor}
            size="small"
            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
          />
        </Box>

        <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
          {ticket.title}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {ticket.description}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {ticket.location}
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={0.5}>
            <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {ticket.assignee}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {formatRelativeTime(ticket.createdAt)}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StatusChip status={ticket.status} />
          <Typography variant="caption" fontWeight={600} color="error.main">
            {formatNumber(ticket.impactedCustomers)} affected
          </Typography>
        </Box>

        {ticket.aiStatus === 'processing' && (
          <Box mt={2}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              AI Processing...
            </Typography>
            <LinearProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
