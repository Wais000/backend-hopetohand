
import jtw from "jsonwebtoken";
import userModel from "../models/users.js";
import contactFormModel from "../models/contactFormModel.js";
import userAvatarModel from "../models/userAvatarModel.js";
import fs from "fs"
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));



export const saveContactForm = async (req, res) => {
 //const {name, email, phone_number, company_name} = req.body; 
const newContactForm=await contactFormModel.create(req.body);
 res.json(newContactForm)
} 

export const getUser = async (req, res) => {
  //code here
  try {
    console.log(req);
    const user = await signupModel.findById(req.body.user_id).populate("accomodation", "help" , "jobs", "status" );
    res.status(200).json({user});
    // const history = await HistoryModel.find();
    // res.status(200).json(history);
} catch (error) {
    res.status(500).send(error);
}

}

export const createUser = async (req, res) => {
  //code here
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(200).json({ message: user });
  } catch (error) {
    console.log(error.message);
  }
};



export const postUser = async (req, res) => {
  //code here
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  //code here
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateUser = async (req, res) => {
  //code here
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};


    
    export const loggedIn = async (req, res) => {
     
        try {
          const user = await signupModel.findById(req.user.id).select("-password");
          res.status(200).json(user);
          console.log(signupModel)
        } 
       
        catch (error) {
          res.json(error.message);
        }
      
      };

      export const uploadPicture = async (req, res) => {
        console.log(req.file);
const avatar = new userAvatarModel({
  filename:req.file.originalname,
  data: fs.readFileSync(path.resolve(__dirname,`../uploads/${req.file.originalname}`))
})
await avatar.save()
const user= await userModel.findById(req.user.id);
// user.avatar=`http://localhost:5000/uploads/${avatar.filename}`
user.avatar=`https://hopetohand-server.herokuapp.com/uploads/${avatar.filename}`
await user.save()
console.log(avatar);
res.send({user})
      }
