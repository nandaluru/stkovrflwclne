import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    about: { type: String, },
    tags: { type: [String] },
    joinedOn: { type: Date, default: Date.now, },
    phoneNo: { type: Number }
})

export default mongoose.model('User', userSchema)