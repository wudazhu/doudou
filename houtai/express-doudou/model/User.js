var mongoose=require("mongoose")
var Schema = mongoose.Schema;
var User = new Schema({
	    username   : String,
	    psw        : String,
	    create_date: { type: Date, default: Date.now }
	});
//将Schema转化为model对象
	var UserModel = mongoose.model('user', User);

//暴露接口
module.exports=UserModel;