const express = require('express');
const Ip = require('../models/Ip');
const auth = require('../middlewares/auth');
const authAdm = require('../middlewares/authAdm');
const router = express.Router();
const cors = require('cors');
const fileUpload = require('express-fileupload');

router.use(cors());
router.use(auth);
router.use(fileUpload());

//Realiza a busca de IPs
router.get('/:ip', async (req, res) => {
  const ip = req.params.ip;
  Ip.findOne({ ip }, function (error, result) {
        if(!result){
            return res.status(400).send({ error: 'IP não econtrado.' });
        }
        else{
            res.send({ ip: result });
        }
    });
});

//Registro de um novo IP
//Requer que esteja logado como admin para registrar um IP
router.post('/ipregister', authAdm, async (req,res) => {
    let sampleFile;
    if(!req.files || Object.keys(req.files).length === 0){
      res.status(400).send('O mapa não foi recebido.');
      return;
    }
    sampleFile = req.files.map;
    sampleFile.mv(`${__dirname}/uploads/${sampleFile.name}`, function(err){
      if(err){
        return res.status(400).send({err: 'O arquivo não pode ser salvo.'});
      }
    });
    try{
      const ip = await Ip.create({
        ip: req.body.ip,
        city: req.body.city,
        continent: req.body.continent,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        timezone: req.body.timezone,
        radius: req.body.radius,
        postal: req.body.postal,
        countryCode: req.body.countryCode,
        countryAbbreviator: req.body.countryAbbreviator,
        stateCode: req.body.stateCode,
        stateAbbreviator: req.body.stateAbbreviator,
        map: sampleFile.name,
        note: req.body.note
      });
      return res.send({ ip });
    }catch(error){
      //Valida se o IP já se encontra no sistema para exibir um erro específico
      const ip_verification = req.params.ip;
      if(!Ip.findOne({ ip_verification })){
        return res.status(400).send({error: 'O cadastro do IP falhou. Tente novamente mais tarde.'});
      }
      else{
        return res.status(400).send({error: 'Erro: O endereço IP já se encontra cadastrado no sistema.'});
      }
    }
});

module.exports = app => app.use('/ip', router);
