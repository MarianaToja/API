const Cliente = require("../models/cliente");
const bcrypt = require("bcryptjs");

const clienteService = {
    create: async (cliente) => {
        try {
            const hashcliente = await bcrypt.hash(cliente.senha, 10);
            cliente.senha = hashCliente; 

            return await Cliente.create(cliente);
        } catch (error) {
            throw new Error('Ocorreu um erro ao criar Admin');
        }
    },
 
    update: async (id, adminToUpdate) => {
        try {
            const cliente = await Cliente.findByPk(id);
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
