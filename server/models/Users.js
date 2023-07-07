import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  username: {type: String, require: true},
  phone: {type: String, require: true},
  year: {type: String, require: true},
  savedTodos: [{type: mongoose.Schema.Types.ObjectId, ref: "todos"}], //
})

export  const UserModel = mongoose.model('users', UserSchema)