const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

const adminService = {
    create: async (admin) => {
        try {
            const hashSenha = await bcrypt.hash(admin.senha, 10);
            admin.senha = hashSenha; 

            return await Admin.create(admin);
        } catch (error) {
            throw new Error('Ocorreu um erro ao criar Admin');
        }
    },
 
    update: async (id, adminToUpdate) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return null;
            }
           
            if (adminToUpdate.senha) {
                adminToUpdate.senha = await bcrypt.hash(adminToUpdate.senha, 10);
            }
            await admin.update(adminToUpdate);
            await admin.save();
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao atualizar Admin');
        }
    },
    getById: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return null;
            }
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar um único admin');
        }
    },
    getAll: async () => {
        try {
            return await Admin.findAll();
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar os admins');
        }
    },
    delete: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return null;
            }
            await admin.destroy();
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o admin');
        }
    }
}

module.exports = adminService;
