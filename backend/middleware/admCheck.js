module.exports = (req, res, next) => {
    const email = req.user.email;
  
    if (email && email.endsWith('@talkfyadm.ju')) {
      next();
    } else {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar este recurso.' });
    }
  };