const express = require('express');
const Ip = require('../models/Ip');
const auth = require('../middlewares/auth');
const authAdm = require('../middlewares/authAdm');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');

router.use(cors());
//router.use(auth);

const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, "uploads/");
  },
  filename: function (req, file, callback){
    callback(null, file.originalname);
  }
});

const upload = multer({storage});

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
router.post('/ipregister', upload.single('image'), async (req,res) => {
    try{
      console.log(req.body);
      const file = req.file;
      console.log(file);
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
        countryCode: req.boby.countryCode,
        countryAbbreviator: req.body.countryAbbreviator,
        stateCode: req.body.stateCode,
        stateAbbreviator: req.body.stateAbbreviator,
        map: file.filename,
        note: req.body.note
      });
      console.log(ip);
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
