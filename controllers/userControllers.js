const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
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
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.status(404).json({message: "User deleted successfully"})
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req,res){
    try{
        const user = await User. findOneAndUpdate(
            {_id: req.params.userId}
        );
        if(!user){
            return res.status(404).json({message: "No user found with this id"});
            
        }
        res.status(404).json({message: "User updated successfully"})
    }
    catch(err){
        res.ststus(500).json(err);

    }
  }
};
