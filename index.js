const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3030;
 
app.use(express.json());
app.use(cors({
    origin: '*'
}));


// Configuración del servidor de correo electrónico
let transporter = nodemailer.createTransport({
  service : "hotmail",
  auth: {
    user: "musicratios@outlook.com",
    pass: "proyectoad1234"
  }
});

app.post("/send-email", function(req, res) {
  let recipient = req.body.email;
  let message = req.body.message;

  // Configuración del correo electrónico
  let mailOptions = {
    from: '"Welcome Music Ratios" <musicratios@outlook.com>' ,
    to: recipient,
    subject: "Ahora eres música",
    text: message
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo electrónico");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Correo electrónico enviado");
    }
  });
});

app.listen(PORT, function() {
  console.log("Servidor de correo electrónico escuchando en el puerto " + PORT);
});
