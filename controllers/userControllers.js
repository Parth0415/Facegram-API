const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
module.exports = {
  async getUsers(req, res) {
    try {
        // getting all users from the database
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
       // getting single user by Id from the database
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .lean();
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      // creating the new user in database
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      // deleting the user in databse using Id
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json({message: "User deleted successfully"})
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req,res){
    try{
       // updating the user in databse using Id
        const user = await User. findOneAndUpdate(
            {_id: req.params.userId},
            // setting the data as per the request body
            {$set: req.body},
            {runValidators:true, new: true}

        );
        if(!user){
            return res.status(404).json({message: "No user found with this id"});
            
        }
        res.json({message: "User updated successfully"})
    }
    catch(err){
        res.status(500).json(err);

    }
  },
async addFriend(req,res){
  try{
     // adding friend into the users 
    const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
       // pushing the user Id as friendId into the friend array
      {$push: {friends: req.params.friendId}},
      {new : true}
    )
    if (!user) {
      return res.status(404).json({ message: " No user found with this id"});
    }
    res.json({message: "Friend added successfully"})
}
  catch(err){
res.status(500).json(err);
  }
},
async deleteFriend(req,res){
  try{
    // deleting the friends from the user
    const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
       // pulling the friendId from the friend array
      {$pull: {friends: req.params.friendId}},
      {new: true}
    )
    if (!user) {
      return res.status(404).json({message: "No friend found with this id"});
    }
    res.json({ message: "Friend deleted successfully"});
  } catch(err){
    res.status(500).json(err);
  }
}




};
