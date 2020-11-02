const express = require('express');
const Ip = require('../models/Ip');
const auth = require('../middlewares/auth');
const authAdm = require('../middlewares/authAdm');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.use(cors());
//router.use(auth);

//Realiza a busca de IPs
router.get('/:ip', async (req, res) => {
  const ip = req.params.ip;
  //console.log(ip_busca);
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
      const ip = await Ip.create(req.body);
      return res.send({ ip });
    }catch(error){
      return res.status(400).send({error: 'O cadastro do IP falhou. Tente novamente mais tarde.'});
    }
});

module.exports = app => app.use('/ip', router);
