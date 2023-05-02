const userControllers = require('../../controllers/userControllers');

const router = require('express').Router();
const{
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
}= require('../../controllers/userControllers');4

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).update(updateUser);