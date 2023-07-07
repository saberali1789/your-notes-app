import express from 'express';
import mongoose from 'mongoose';
import { TodoModel } from '../models/Todo.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get('/', async (req, res) => {
    
try {
    const response = await TodoModel.find({});
    res.json({response});
} catch (err) {
    res.json(err)
}
})
router.post('/', async (req, res) => {
    const todo = new TodoModel(req.body);
    console.log(todo);
    // const user = await UserModel.findById(req.body.userOwner)
    // user.complete.push(todo);
try {
    
    const response = await todo.save();
} catch (err) {
    res.json(err)
}
})

// router.put('/', async (req, res) => {
//     try {
//     const todo = await TodoModel.findById(req.body.todoId);
//     const user = await UserModel.findById(req.body.userId);
//     user.savedTodos.push(todo);
//     await user.save();
//     res.json({savedTodos: user.savedTodos});
    
// } catch (err) {
//     res.json(err)
// }
// })

router.get('/completed/ids/:userId', async(req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId) 
        res.json({savedTodos:user?.savedTodos})

    }catch (err) {
        res.json({message:err})
    }

})
router.get('/completed', async(req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId) 
        const savedTodos = await TodoModel.find({
            _id:{$in: user.savedTodos}
        })

        res.json({savedTodos})
    }catch (err) {
        res.json({message:err})
    }

})


export {router as todosRouter}