const express = require('express');
const Ip = require('../models/Ip');
const router = express.Router();

//Realiza a busca de IPs
router.get('/:ip', async (req, res) => {
  const ip_busca = req.params.id;
  Ip.findOne({ ip_busca }, function (error, result) {
        if(error){
            return res.status(400).send({ error: 'IP not found' });
        }
        else{
            res.send({ ip: result });
        }
    });
});

//Requer que esteja logado como admin para registrar um IP
//router.get('/ipregister', )

//Registro de um novo IP
router.post('/ipregister', async (req,res) => {
    try{
      const ip = await Ip.create(req.body);
      return res.send({ ip });
    }catch(error){
      return res.status(400).send({error: 'IP registration failed'});
    }
});

module.exports = app => app.use('/ip', router);
