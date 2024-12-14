const validateConta = (req, res, next) => {
    const { saldo } = req.body;

   
    if (saldo === undefined) {
        return res.status(400).json({
            error: "O campo 'saldo' é obrigatório."
        });
    }

    if (typeof saldo !== "number" || saldo < 0) {
        return res.status(400).json({
            error: "O campo 'saldo' deve ser um número válido e não pode ser negativo."
        });
    }

  
    next();
};

export default validateConta;
