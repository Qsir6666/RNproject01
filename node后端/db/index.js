const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://seven:seven123456@seven.92xoy.mongodb.net/data').then(()=>{
    console.log('连接成功');
}).catch(()=>{
    console.log('连接失败');
})
// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
// 登录用户表——(存储用户名密码，及对应的角色。数据详见数据库中users表)
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'role'
    },

    // 实名信息
    name: String,  // 姓名
    phone: String,  // 联系电话
})
const userModel = mongoose.model('user', UserSchema)

// 登录角色表 ——（作为用户表外键表示该用户是什么角色）
const roleSchema = new mongoose.Schema({
    name: String
})
const roleModel = mongoose.model('role', roleSchema)



// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
// 课程视频表
const movieSchema = new mongoose.Schema({
    name:String,  //课程名称
    totalprice:Number,  //课程总价格
    courseNum:Number,  //课时数
    cate:String,   //课程学科  英语？数学？
    goodID:String,   //讲师：绑定登录人外键
    mvsrc:String,  //视频路径
    state:{
        type:Boolean,
        default:false
    },  //状态 
    data:{
        type:Date,
        default:Date.now()
    }   //上架时间
})
const movieModel = mongoose.model('movie',movieSchema)




module.exports = {
    userModel,
    roleModel,
    movieModel
}

