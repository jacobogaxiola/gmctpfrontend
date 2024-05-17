// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/security/Login';
import Layout from './components/layout/Layout';
import PersonList from './PersonList';
import TaskList from './TaskList';
import RolesList from './components/roles/RolesList';
import ExamplePage from './ExamplePage';
import PrivateRoute from './components/security/PrivateRoute';
import theme from './components/layout/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route path="catalogos/personas" element={<PersonList />} />
            <Route path="catalogos/tareas" element={<TaskList />} />
            <Route path="catalogos/roles" element={<RolesList />} />
            <Route path="procesos/ejemplo1" element={<ExamplePage title="Procesos - Ejemplo 1" />} />
            <Route path="procesos/ejemplo2" element={<ExamplePage title="Procesos - Ejemplo 2" />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
