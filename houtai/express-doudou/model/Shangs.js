var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Shangs = new Schema({
    shangs_name   : String,
    shangs_price  : Number,
    shangs_num   : String,
    shangs_xn   : Number,
    // imgPath      : String,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var ShangsModel = mongoose.model('shangs', Shangs);
// 公开对象，暴露接口
module.exports = ShangsModel;