import { Box } from '@mui/material';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = ({ children, currentPage, onNavigate }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: '',
          minWidth: 0,
          width: 'calc(100vw - 240px)',
          overflowX: 'hidden',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
