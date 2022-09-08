const { application } = require('express');
const userdb = require("../userModel/userModel")
const router = require('express').Router();
const userController = require('../userController/userController.js')



router.post('/Signup', userController.Signup)
router.post('/Login', userController.login)
router.get('/', userController.home)
router.delete('/:id', userController.delete);
router.put('/update/:id', userController.update)

module.exports = router;