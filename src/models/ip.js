const mongoose = require('../database');

const IpSchema = new mongoose.Schema({
    ip: {
      type: String,
      unique: true, //faz com que seja único
      required: true, //faz do campo obrigatório
    },
    city: {
      type: String,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    postal: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    countryAbbreviator: {
      type: String,
      required: true,
      uppercase: true, //força letras maiúsculas
    },
    stateCode: {
      type: String,
      required: true,
    },
    stateAbbreviator: {
      type: String,
      required: true,
      uppercase: true,
    },
    map: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now, //armazena a data que o endereço IP foi inserido no banco
    },
});

const Ip = mongoose.model('Ip', IpSchema);

module.exports = Ip;
