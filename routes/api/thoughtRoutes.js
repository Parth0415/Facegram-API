const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReactions,
    deleteReactions
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);
router.route("/:thoughtId/reactions").post(addReactions).delete(deleteReactions)

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReactions)
module.exports = router;