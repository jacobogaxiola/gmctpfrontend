// src/Layout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon, Category as CategoryIcon, Build as BuildIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useState } from 'react';
import { logout } from '../security/authService';

const drawerWidth = 240;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dashboard/catalogos">
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Catálogos" />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem button sx={{ pl: 4 }} component={Link} to="/dashboard/catalogos/personas">
            <ListItemText primary="Listado de Personas" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }} component={Link} to="/dashboard/catalogos/tareas">
            <ListItemText primary="Listado de Tareas" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }} component={Link} to="/dashboard/catalogos/roles">
            <ListItemText primary="Listado de Roles" />
          </ListItem>
        </List>
        <ListItem button component={Link} to="/dashboard/procesos">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Procesos" />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem button sx={{ pl: 4 }} component={Link} to="/dashboard/procesos/ejemplo1">
            <ListItemText primary="Ejemplo 1" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }} component={Link} to="/dashboard/procesos/ejemplo2">
            <ListItemText primary="Ejemplo 2" />
          </ListItem>
        </List>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon color="primary" />
          </IconButton>
          <Typography color="primary" variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            GM Transport CTPAT
          </Typography>
          <Button color="primary" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
