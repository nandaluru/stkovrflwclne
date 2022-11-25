import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../Models/userSchema.js';
import mongoose from 'mongoose';


export const signup = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exist = await User.findOne({ email })
        if (exist)
            return res.status(400).json({ message: "User Already Exist" })
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({ name, email, password: hashpassword })
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", { expiresIn: '1h' })
        return res.status(200).json({ user: newUser, token })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exist = await User.findOne({ email })
        if (!exist)
            return res.status(400).json({ message: "User doesn't Exist" })

        const isAuthenticate = await bcrypt.compare(password, exist.password);
        if (!isAuthenticate)
            return res.status(400).json({ message: "Password is incorrect." })

        const token = jwt.sign({ email: exist.email, id: exist._id }, "test", { expiresIn: '1h' })
        return res.status(200).json({ user: exist, token })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." })

    }
}

export const users = async (req, res) => {

    try {
        const userData = await User.find()
        const allUser = [];
        userData.forEach(user => {
            allUser.push(
                {
                    _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn
                })
        })
        return res.status(200).send(allUser);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Unavailable to fetch user" })
    }
}

export const updateuser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, tags, about } = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "User not found" });
        }

        const updateProfile = await User.findByIdAndUpdate(id, {
            $set: {
                'name': name, 'tags': tags, 'about': about,
            }
        }, { new: true })
        return res.status(200).json(updateProfile)
    } catch (error) {
        return res.status(405).json({ message: "Something went wrong" })

    }
}