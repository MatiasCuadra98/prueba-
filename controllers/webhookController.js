const twilio = require('twilio');
const Message = require('../models/message');

const handleIncomingMessage = async (req, res) => {
  const twilioSignature = req.headers['x-twilio-signature'];
  const authToken = '671b674fd38e942f383a77d20b12163c'; // Reemplaza con tu Auth Token de Twilio
  const client = new twilio();

  if (client.validateRequest(authToken, twilioSignature, req.originalUrl, req.body)) {
    const message = req.body.Body;
    const sender = req.body.From;
    
    try {
      await Message.create({
        sender: sender,
        content: message,
      });
      console.log('Mensaje almacenado en la base de datos.');
    } catch (error) {
      console.error('Error al almacenar el mensaje:', error);
    }

    res.status(200).end();
  } else {
    res.status(403).send('Forbidden');
  }
};

module.exports = { handleIncomingMessage };
