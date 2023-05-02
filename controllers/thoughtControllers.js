const { ObjectId } = require("mongoose").Types;
const {User, Thought} = require("../models");
module.exports = {
    async getThoughts(req,res) {
        try{
            const thoughts = await Thought.find();
            return res.json(thoughts);

        } 
        catch(err){
            return res.status(500).json(err)

        }
    },
    async getSingleThought(req,res) {
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .select("-__v")
            .lean();
            if (!thought) {
                return res.status(404).json({message: "No thought found with this id" });
            }
            res.json(thought);

        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async createThought(req,res) {
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);

        }
        catch(err){
            res.status(500).json(err);
        }
    },
    async deleteThought(req,res) {
        try{
            const thought = await Thought.findOneAndRemove({_id:req.params.thoughtId});
            if (!thought) {
                return res.status(404).json({ message: "No thought found with this id"});
            }
            res.status(404).json({message: "Thought deleted successfully"})

        }
        catch(err){
            res.status(500).json(err);

        }
    },
    async updateThought(req,res){
        try{
            const thought = await Thought. findOneAndUpdate(
                {_id: req.params.thoughtId}
            );
            if(!thought){
                return res.status(404).json({message: "No thought found with this id"});
                
            }
            res.status(404).json({message: "Thought updated successfully"})
        }
        catch(err){
            res.ststus(500).json(err);
    
        }
    }
}