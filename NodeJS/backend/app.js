const express = require('express');

const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const MotorcyclesRoutes = require('./routes/Motorcycles');

app.use(MotorcyclesRoutes);

// Démarrer le serveur
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
