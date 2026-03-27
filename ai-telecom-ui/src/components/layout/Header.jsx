import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar } from '@mui/material';
import { Notifications, AccountCircle, Settings } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: 'white',
              fontSize: '1.2rem',
            }}
          >
            AI
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="primary">
              Telecom Operations Dashboard
            </Typography>
            <Typography variant="caption" color="text.secondary">
              AI-Powered Network Management
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
