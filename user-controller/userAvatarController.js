import usersModel from "../models/users.js";
import userAvatarModel from "../models/userAvatarModel.js";
import { request } from "express";

export const postAvatar = async (req, res) => {

const {lastName,image} = req.body;
try {
    const user = await usersModel.findById(req.user.id);
    if (!user){
        return res.status(404).json({msg:"user not found"});
    }

const avatar = new userAvatarModel({
    lastName, image
})

await avatar.save();
user.avatar.push (avatar._id);
await user.save();
req.status(200).json({msg:"Avatar added"});
} catch (error) {
    request.status(500).send("Error")
}
};

export const getUserAvatar = async (req, res) => {

try {
    const img = []
    const user = await usersModel.findById(req.user.id);
     user.avatar.forEach(picture => {
        img.push(picture.toHexString())
    
})

const profilePicture = await userAvatarModel.find({'_id': {$in: img.img}})
request.json(profilePicture)
} catch (error) {
    request.send(error)
}
}