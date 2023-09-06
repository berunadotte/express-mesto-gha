const router = require('express').Router();

const { getUsers, getUser, updateUser } = require('../controllers/users')

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('users', updateUser);

module.exports = router;