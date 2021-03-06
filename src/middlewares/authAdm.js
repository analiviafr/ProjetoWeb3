const User = require('../models/user');

module.exports = async (req, res, next) => {
    let user;

    await User.findById(req.userId, function (err, docs) {
        if (err){
            return res.status(400).send({ err });
        }

        else{
            user = docs;
        }
    });

    if(user.role !== 'admin') {
        return res.status(401).send({ error: 'Usuário sem permissão' });
    }

    next()
};
