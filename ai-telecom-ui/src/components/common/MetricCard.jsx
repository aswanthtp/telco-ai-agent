import { Card, CardContent, Typography, Box } from '@mui/material';
import { formatNumber } from '../../utils/helpers';

const MetricCard = ({ title, value, subtitle, icon, color = 'primary', trend }) => {
  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          {icon && (
            <Box 
              sx={{ 
                backgroundColor: `${color}.light`,
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
        
        <Typography variant="h4" fontWeight={700} color={`${color}.main`} gutterBottom>
          {typeof value === 'number' ? formatNumber(value) : value}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        
        {trend && (
          <Box mt={1} display="flex" alignItems="center" gap={0.5}>
            <Typography 
              variant="caption" 
              color={trend.positive ? 'success.main' : 'error.main'}
              fontWeight={600}
            >
              {trend.positive ? '↑' : '↓'} {trend.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              vs last week
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
