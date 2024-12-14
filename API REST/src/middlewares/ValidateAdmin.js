const validateAdmin = (req,res,next) =>{
    const {nome, email, senha } = req.body;

if (!nome || typeof nome !== 'string') {
return res.status(400).json ({msg: 'campos invalidos'}); 

}

if (!nome || typeof nome !== 'string') {
    return res.status(400).json ({msg: 'campos invalidos'});

}
    if (!(email.includes('@') && email.includes("."))) {
        return res.status(400).json ({msg: 'campos invalidos'});
    }

    if (!(senha.includes('#') && senha.includes("@"))) {
        return res.status(400).json ({msg: 'Senha fraca. Inclua caracteres # e @ para que senha seja segura e valida '});
    }
        next();
  }
        const validateAdminId = (req,res,next) =>{
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                return res.status(400).json ({msg: 'Parametro id invalidos'});

            }

            next();
  }

  const jwt = require('jsonwebtoken');


// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ msg: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
        if (err) {
            return res.status(403).json({ msg: 'Token inválido' });
        }
        req.admin = admin; 
        next();
    });
};


  module.exports =  {validateAdmin, validateAdminId, authenticateToken,}

