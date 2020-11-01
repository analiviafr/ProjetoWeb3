const express = require('express');
const Ip = require('../models/Ip');
const authAdm = require('../middlewares/authAdm');
const router = express.Router();
const cors = require('cors');

router.use(cors());

//Realiza a busca de IPs
router.get('/:ip', async (req, res) => {
  const ip_busca = req.query.ip;
  //console.log(ip_busca);
  Ip.findOne({ ip_busca }, function (error, result) {
        if(error){
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
    try{
      const ip = await Ip.create(req.body);
      return res.send({ ip });
    }catch(error){
      return res.status(400).send({error: 'O cadastro do IP falhou. Tente novamente mais tarde.'});
    }
});

module.exports = app => app.use('/ip', router);
