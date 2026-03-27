import { Chip } from '@mui/material';
import { getStatusBadge } from '../../utils/helpers';

const StatusChip = ({ status, size = 'small' }) => {
  const badge = getStatusBadge(status);
  
  return (
    <Chip
      label={badge.label}
      color={badge.color}
      size={size}
      icon={<span style={{ fontSize: '14px' }}>{badge.icon}</span>}
      sx={{ fontWeight: 500 }}
    />
  );
};

export default StatusChip;
