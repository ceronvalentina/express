const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

// Configurar AWS con las credenciales
AWS.config.update({
  region: 'tu-region', // Reemplazar con la región del DynamoDB
  accessKeyId: 'tu-access-key-id',
  secretAccessKey: 'tu-secret-access-key',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint para registrar el login de usuarios
app.post('/registro-login', (req, res) => {
  const { email, password } = req.body;

  const params = {
    TableName: 'NombreDelaTabla', // Reemplazar con el nombre de la tabla en DynamoDB
    Item: {
      email,
      password,
    },
  };

  dynamoDB.put(params, (error) => {
    if (error) {
      console.error('Error al registrar el login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ mensaje: 'Login registrado exitosamente' });
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
