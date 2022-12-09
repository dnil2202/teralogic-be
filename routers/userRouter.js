const express = require('express');
const { readToken } = require('../config/encript');
const { readTokenR } = require('../config/encript');
const route = express.Router();
const { userControllers} = require('../controllers')

route.get('/',userControllers.getDataUser)
route.post('/login',userControllers.loginUser);
route.get('/keep',readToken, userControllers.keepLogin)
route.get('/refresh',readTokenR, userControllers.refresh)

module.exports=route;