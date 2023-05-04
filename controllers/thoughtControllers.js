const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
module.exports = {
  async getThoughts(req, res) {
    try {
      // getting all thoughts from the database
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .lean();
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,

      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set:req.body},
        {runValidators: true, new: true}
        );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.json({ message: "Thought updated successfully" });
    } catch (err) {
      res.ststus(500).json(err);
    }
  },
  async addReactions(req,res){
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push : {reactions: req.body}},
            {runValidators: true, new: true}
        )
        if (!thought){
            return res.status(404).json({message: "No thought found with this id"});
        }
        res.json({message: "Reaction added successfully"})

    }catch(err){
        res.status(500).json(err)

    }
  },

  async deleteReactions(req,res){
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull : {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true})

    
    if(!thought){
        return res.status(404).json({message: "No reaction found with this id"});
    } 
    res.json({message: "Reaction deleted successfully"});
}catch(err){
    res.status(500).json(err)

    }
  }

};
