const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var CryptoJS = require("crypto-js");
require('dotenv').config();

class UserController {

    static async login(req, res) {

        var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        const json = JSON.parse(decryptd);

        const { login, password } = json;

        if (!login)
            return res.status(422).json({ message: "O login é obrigatório." });

        if (!password)
            return res.status(422).json({ message: "A senha é obrigatória." });

        const user = await User.findOne({ login });

        var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        const decryptd2 = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptd2 != password)
            return res.status(422).send({ message: "Email ou senha não conferem." });

        console.log(user.adm)

        try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user._id,
                    adm: user.adm
                },
                secret,
                {
                    expiresIn: '2 days'
                },
            );

            return res.status(200).send({ token: token })
        } catch (error) {
            return res.status(500).send({ message: "Something failed", data: error.message })
        }
    }

    static async register(req, res) {

        var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        const json = JSON.parse(decryptd);

        const { name, email, password, confirmPassword } = json;

        if (!name)
            return res.status(400).json({ message: "O nome é obrigatório." });

        if (!email)
            return res.status(400).json({ message: "O e-mail é obrigatório." });

        if (!password)
            return res.status(400).json({ message: "A senha é obrigatória." });

        if (password != confirmPassword)
            return res.status(400).json({ message: "As senhas não conferem." });

        const userExists = await User.findOne({ email: email });

        if (userExists)
            return res.status(422).json({ message: "E-mail já cadastrado" });

        const passwordCrypt = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

        const user = new User({
            login: email,
            email,
            password: passwordCrypt,
            createdAt: Date.now(),
            updatdAt: Date.now(),
            removedAt: null,
        });
        try {
            await User.create(user);
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        }
        catch (error) {
            return res.status(500).send({ message: "Error : ", data: error.message })
        }
    }

    static async remove(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).send({ message: "No id provider" });

        try {
            await User.findByIdAndDelete(id);
            return res.status(200).send({ message: "User deleted successfully" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Something failled" })
        }
    }

    static async GetAll(req, res) {
        try {
            const users = await User.find();

            if (!users || users.length === 0) {
                return res.status(404).send({ message: "Nenhum usuário encontrado" });
            }

            return res.status(200).send({ users });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Algo deu errado ao buscar os usuários" });
        }
    }

}

module.exports = UserController;