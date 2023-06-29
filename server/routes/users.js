import  express  from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js";

 const router = express.Router();

 router.post("/register", async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log(email, password);
      const user = await UserModel.findOne({ email})
    
      if(user) {
        return res.json({message: "User already exist!"});
      }
       
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = new UserModel({email, password:hashedPassword});
      await newUser.save();
    
      res.json({message: "Please cotinue Register",userId:newUser._id})
  } catch (error) {
    res.json({message:"internal server error"})
  }
})



router.post("/register/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, phone, birthYear } = req.body;
    console.log(req.params);
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.phone = phone;
    user.birthYear = birthYear;

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.post('/login',async(req,res)=>{
  const {email, password} = req.body
  const user = await UserModel.findOne({email})

  if(!user){
    return res.json({message:'User not found!'})
  }
const isPasswordOk = await bcrypt.compare(password, user.password)
if(!isPasswordOk){
  return res.json({message:"Pass or Email is wrong"})
}
const token = jwt.sign({id:user._id},"secret")
res.json({token, userId:user._id})
})

///////update info

router.patch("/register/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {email,password, username, phone, birthYear } = req.body;
    console.log(req.params);
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.email = email
    user.password = password
    user.username = username;
    user.phone = phone;
    user.birthYear = birthYear;

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});





 export {router as userRouter};