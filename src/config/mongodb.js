require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if(!err){
        console.log("Conectado a la base de datos..");
    } else {
        console.log("No se pudo conectar a la base de datos")
    }
  }
  );
};

module.exports = dbConnect;
