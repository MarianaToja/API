const Notificacoes = require("../models/notificacoes");
const  notificacoesService = require("../services//notificacao")


const notificacoesController = {
    // Cria uma nova notificação
    create: async (req, res) => {
        try {
            const { Mensagem, Data } = req.body;

            const novaNotificacao = await Notificacoes.create({ Mensagem, Data });

            res.status(201).json(novaNotificacao);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao criar notificação",
                details: error.message,
            });
        }
    },

    // Busca todas as notificações
    getAll: async (req, res) => {
        try {
            const notificacoes = await Notificacoes.findAll();

            res.status(200).json({
                msg: "Lista de notificações",
                notificacoes,
            });
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar notificações",
                details: error.message,
            });
        }
    },

    // Busca uma notificação por ID
    getOne: async (req, res) => {
        try {
            const { id } = req.params;

            const notificacao = await Notificacoes.findByPk(id);

            if (!notificacao) {
                return res.status(404).json({
                    msg: "Notificação não encontrada",
                });
            }

            res.status(200).json(notificacao);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar notificação",
                details: error.message,
            });
        }
    },

    // Atualiza uma notificação
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { Mensagem, Data } = req.body;

            const notificacao = await Notificacoes.findByPk(id);

            if (!notificacao) {
                return res.status(404).json({
                    msg: "Notificação não encontrada",
                });
            }

            await notificacao.update({ Mensagem, Data });

            res.status(200).json(notificacao);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao atualizar notificação",
                details: error.message,
            });
        }
    },

    // Exclui uma notificação
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const notificacao = await Notificacoes.findByPk(id);

            if (!notificacao) {
                return res.status(404).json({
                    msg: "Notificação não encontrada",
                });
            }

            await notificacao.destroy();

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: "Erro ao excluir notificação",
                details: error.message,
            });
        }
    },
};

module.exports = notificacoesController;
