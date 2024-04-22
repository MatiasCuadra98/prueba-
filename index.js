const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhookRoutes');
const sequelize = require('./config/sequelize');
const Message = require('./models/message')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/webhook', webhookRoutes);

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});

async function sincronizarModelos() {
  try {
    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados correctamente con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
}

// Llamar a la función para sincronizar los modelos
sincronizarModelos();
