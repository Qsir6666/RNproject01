var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
let kouling = '123456'
const { userModel,roleModel } = require('../db/index')

// 登录接口
router.post('/getlogin', async function (req, res, next) {
    let user = req.body
    let rsp = await userModel.findOne(user)
    if (rsp) {
        let roleId = rsp.roleId
        let roles = await roleModel.findById(roleId)
        let token = jwt.sign(user, kouling)
        res.send({
            code: 200,
            msg: "登陆成功！",
            data: {
                name:rsp.name,       //姓名
                userId: rsp._id,     //id
                username: user.username,  //用户名
                // roleId: roleId,     //角色id
                rolename: roles.name,   //角色名称
                token: 'Bearer ' + token 
            }
        })
    } else {
        res.send({
            code: 400,
            msg: "登陆失败!请检查用户名/密码"
        })
    }
})




module.exports = router;
