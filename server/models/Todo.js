import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
  text: {type: String, require: true},
 complete: {type: Boolean, default: false},
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users",require: true},
})


export  const TodoModel = mongoose.model('todo', TaskSchema)
