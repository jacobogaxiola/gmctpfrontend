// src/RolesList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, IconButton, Typography, Modal, Button, TextField, Box, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import { getToken } from '../security/authService';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const API_URL = 'http://localhost:4000/api/roles';

const RolesList = () => {
  const theme = useTheme();
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nombre');
  const [totalElements, setTotalElements] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [rol, setRol] = useState({ nombre: '', descripcion: '', tipo: 'A' });
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', or 'delete'

  useEffect(() => {
    fetchRoles();
  }, [page, rowsPerPage, order, orderBy]);

  const fetchRoles = async () => {
    try {
      const token = getToken(); // Obtener el token JWT almacenado
      const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        params: {
          page: page,
          size: rowsPerPage,
          sortBy: orderBy,
          sortDir: order,
        },
      });
      setRoles(response.data.content);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddRole = () => {
    setRol({ nombre: '', descripcion: '', tipo: 'A' });
    setModalMode('add');
    setOpenModal(true);
  };

  const handleEditRole = (role) => {
    setRol(role);
    setModalMode('edit');
    setOpenModal(true);
  };

  const handleDeleteRole = (role) => {
    setRol(role);
    setModalMode('delete');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchRoles();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (modalMode=='edit') {
        await axios.put(`${API_URL}/${rol.id}`, rol, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if(modalMode=='add'){
        await axios.post(API_URL, rol, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      else {
        await axios.delete(`${API_URL}/${rol.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setOpenModal(false);
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleInputChange = (e) => {
    setRol({ ...rol, [e.target.name]: e.target.value });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
       <Typography variant="h6" component="div" sx={{ margin: '16px 0' }}>
        <IconButton color="primary" onClick={handleAddRole}>
          <AddIcon />
        </IconButton>
        Roles de Usuario
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'nombre' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'nombre'}
                  direction={orderBy === 'nombre' ? order : 'asc'}
                  onClick={() => handleRequestSort('nombre')}
                >
                  Nombre
                </TableSortLabel>
              </TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell sortDirection={orderBy === 'tipo' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'tipo'}
                  direction={orderBy === 'tipo' ? order : 'asc'}
                  onClick={() => handleRequestSort('tipo')}
                >
                  Tipo
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditRole(role)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleDeleteRole(role)}>
                    <DeleteIcon />
                  </IconButton>
                  {role.nombre}
                </TableCell>
                <TableCell>{role.descripcion}</TableCell>
                <TableCell>{role.tipo === 'A' ? 'Administrador' : 'Inspector'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Elementos por página"
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: theme.palette.background.paper,
              boxShadow: 24,
              p: 4,
            }}
        >
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            {modalMode=='add' ? 'Agregar Nuevo Rol' : (modalMode=='edit'?'Editar Rol':'Eliminar Rol')}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField label="Nombre" name="nombre" value={rol.nombre} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
            <TextField label="Descripción" name="descripcion" value={rol.descripcion} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
            <FormControl fullWidth sx={{ mb: 2 }} margin="normal">
              <InputLabel>Tipo</InputLabel>
              <Select
                name="tipo"
                value={rol.tipo}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="A">Administrador</MenuItem>
                <MenuItem value="I">Inspector</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              {modalMode=='add' || modalMode=='edit'? 'Guardar' : 'Eliminar'}
            </Button>
            <Button onClick={handleCloseModal} variant="contained" color="secondary">
              Cancelar
            </Button>
          </form>
        </Box>
      </Modal>
    </Paper>
  );
};

export default RolesList;
