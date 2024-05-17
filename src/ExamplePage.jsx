// src/ExamplePage.js
import React from 'react';
import { Typography } from '@mui/material';

const ExamplePage = ({ title }) => {
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography paragraph>
        Contenido de la página {title}.
      </Typography>
    </div>
  );
};

export default ExamplePage;
