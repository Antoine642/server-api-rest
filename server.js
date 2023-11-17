require('dotenv').config();
const mongoose = require('./src/utils/mongoose'); // Ajout de cette ligne pour importer mongoose

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connexion réussie à MongoDB !');


  const express = require("express");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const http = require("http");
  const app = express();
  const server = http.createServer(app);
  const router = express.Router();
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api", router);

  const apiRoutes = require('./src/routes/apiRoutes');
  app.use('/api', apiRoutes);

  const port = process.env.APP_PORT || 3000;

  app.use((error, req, res, next) => {
    console.log(error.status)
    if (error?.status) {
      res.status(error?.status).send({
        code: error?.code,
        message: error?.message
      })
    } else {
      res.status(500).send({
        code: "SERVER_ERRROR",
        message: "Internal Server Error"
      })
    }
  })


  app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
  });
});
