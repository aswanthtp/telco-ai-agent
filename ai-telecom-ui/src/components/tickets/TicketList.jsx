import { Box, Typography, TextField, InputAdornment, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { Search } from '@mui/icons-material';
import TicketCard from '../common/TicketCard';

const TicketList = ({ tickets, selectedTicket, onSelectTicket, searchTerm, onSearchChange, filterPriority, onFilterChange }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Tickets ({tickets.length})
      </Typography>

      <Box mb={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth size="small">
          <InputLabel>Filter by Priority</InputLabel>
          <Select
            value={filterPriority}
            label="Filter by Priority"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box 
        sx={{ 
          maxHeight: 'calc(100vh - 300px)', 
          overflowY: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
          },
        }}
      >
        {tickets.length === 0 ? (
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            height="200px"
          >
            <Typography color="text.secondary">
              No tickets found
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                selected={selectedTicket?.id === ticket.id}
                onClick={() => onSelectTicket(ticket)}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TicketList;
