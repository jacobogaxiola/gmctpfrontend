// src/PersonList.js
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const people = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

const PersonList = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Listado de Personas
      </Typography>
      <List>
        {people.map((person) => (
          <ListItem key={person.id}>
            <ListItemText primary={person.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PersonList;
