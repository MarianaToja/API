const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const adminService = require("../services/adminService");
const crypto = require('crypto');

const adminController = {
    create: async (req, res) => {
        try {
            const admin = await adminService.create(req.body);
            return res.status(201).json({
                msg: 'Admin criado com sucesso',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao tentar criar Admin'
            });
        }
    },
    
    update: async (req, res) => {
        try {
            const admin = await adminService.update(req.params.id, req.body);
            if (!admin) {
                return res.status(400).json({
                    msg: 'Admin não encontrado'
                });
            }
            return res.status(200).json({
                msg: 'Admin atualizado com sucesso',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao atualizar Admin'
            });
        }      
    },
    
    getAll: async (req, res) => {
        try {
            const admin = await adminService.getAll();
            return req.status(200).json({
                msg: 'Todos os Admin',
                admin    
            });
        } catch(error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });      
        }
    },
    
    getOne: async (req, res) => {
        try {
            const admin = await adminService.getById(req.params.id);
            if (!admin) {
                return res.status(404).json({
                    msg: 'Admin não encontrado',
                });
            }
            return res.status(200).json({
                msg: 'Admin encontrado',
                admin
            });
        } catch(error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },
    
    delete: async (req, res) => {
        try {
            const admin = await adminService.delete(req.params.id);
            if (!admin) {
                return res.status(400).json({
                    msg: 'Admin não encontrado',
                });
            }
            return res.status(200).json({
                msg: 'Admin deletado com sucesso!',
            });
        } catch(error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await adminService.getByEmail(email); 

            if (!admin) {
                return res.status(401).json({
                    msg: 'Email ou senha inválidos'
                });
            }

            const isMatch = await bcrypt.compare(password, admin.password); 
            if (!isMatch) {
                return res.status(401).json({
                    msg: 'Email ou senha inválidos'
                });
            }

            const token = jwt.sign({ id: admin.id }, 'sua-senha', { expiresIn: '1h' }); 
            return res.status(200).json({
                msg: 'Login bem-sucedido',
                token
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao tentar fazer login'
            });
        }
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;
        try {
            const admin = await adminService.getByEmail(email);
            if (!admin) {
                return res.status(404).json({
                    msg: 'Admin não encontrado'
                });
            }

          
            const token = crypto.randomBytes(20).toString('hex');

            await adminService.savePasswordResetToken(admin.id, token);

            return res.status(200).json({
                msg: 'Token de redefinição de senha gerado com sucesso',
                token 
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao tentar gerar token de redefinição de senha'
            });
        }
    },

    resetPassword: async (req, res) => {
        const { token, newPassword } = req.body;
        try {
            const admin = await adminService.getByResetToken(token);
            if (!admin) {
                return res.status(400).json({
                    msg: 'Token inválido ou expirado'
                });
            }
            
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await adminService.updatePassword(admin.id, hashedPassword);

            return res.status(200).json({
                msg: 'Senha redefinida com sucesso'
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao redefinir a senha'
            });
        }
    }
};

module.exports = adminController;
