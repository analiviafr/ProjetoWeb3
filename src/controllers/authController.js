const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require ('cors')
const authConfig = require('../config/auth');

const User = require('../models/User');

const router = express.Router();

//teste
router.use(cors());

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async(req, red) => {
  const { email } = req.body;
  try{
    if(await User.findOne({ email }))
      return res.status(400).send({ error: 'Usuário já cadastrado' });

    const user =  await User.creat(req.body);

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err){
    return res.status(400).send({ error: 'Falha no cadastro'});
  }
});

router.post('/authenticate', async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if(!user)
    return res.status(400).send({ error: 'Usuário não encontrado'});

  if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Senha inválida' });

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id}), });
});

module.exports = app => app.use('/auth', router);
