import mongoose from "mongoose";

const userAvatarSchema = new mongoose.Schema({
  filename:{type: String},
  data:{type: Buffer},
})


const userAvatarModel = mongoose.model("Avatar",userAvatarSchema)
export default userAvatarModel