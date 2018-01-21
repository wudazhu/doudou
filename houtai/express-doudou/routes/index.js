var express = require('express');
var router = express.Router();
var md5=require("md5")
var multiparty=require("multiparty");
var ShangsModel = require("../model/Shangs");
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});

router.get('/shouye',function(req,res,next){
  //判断用户是否登录，如果没有跳转到login页面
  console.log(req.session);
  // if(req.session==null||req.session.username==null){
  //   res.redirect("/login");
  //   return;
  // }
    res.render('shouye',{});
});

router.post('/loginAction', function(req, res, next) {
  var username=req.body.username;
  var psw=req.body.psw;
  
   var result={
      code:1,
      message:"登录成功"
    };
    if(req.body.username=="admin" && req.body.psw=="h5h5h5h5"){
      req.session.username=username;
      console.log(req.session);
    }else{
      result.code=-120;
      result.message="登录失败";
    }
    res.json(result);

 });

//商品
 router.get('/shop', function(req, res, next) {
  res.render('shop', { title: '' });
});





//查询
router.get('/huo', function(req, res, next) {
  var condition = req.query.condition          //模糊查询的商品名
  var pagenum = parseInt(req.query.pagenum)    //当前页码数
  var listnum = parseInt(req.query.listnum)    //一页显示多少商品
  //count 查询的一共有多少个商品，数量
  ShangsModel.count({shangs_name:{$regex:condition}},function(err,count){
    // console.log(count)
    //数据库中模糊查找到的商品，   skip以后是分页显示 
    var query = ShangsModel.find({shangs_name:{$regex:condition}}).skip((pagenum-1)*listnum).limit(listnum)
    //拿到值向前端发送
    query.exec(function(err,doce){
      console.log(doce.length)
      //状态码和发送的内容
      var result={
        code:1,
        zong:count,
        data:doce,
        pagenum:pagenum,
      }  
      //判断是否有数据  
      if(doce.length>0){
        res.json(result)
        return
      }else{
        result.code=0;
        res.json(result)
        res.end()
      }
    })
  })
})



//添加商品
 router.get('/list', function(req, res, next) {
  res.render('list', { title: '' });
});

router.post('/api/shangs_upload', function(req, res, next) {
	var form = new multiparty.Form({
		uploadDir: "public/images"
	});
	var result = {
		code: 1,
		message: "商品信息保存成功"
	};

	form.parse(req, function(err, body, files){
		if(err) {
			console.log(err);
		}
		console.log(body);

		var shangs_name = body.shangs_name[0];
		var shangs_price = body.shangs_price;
    var shangs_num = body.shangs_num[0];
		var shangs_xn = body.shangs_xn;
    // var imgPath = files["img"][0].path.replace("public\\", "");

		var gm = new ShangsModel();
		gm.shangs_name = shangs_name;
		gm.shangs_price = shangs_price;
    gm.shangs_num = shangs_num;
		gm.shangs_xn = shangs_xn;
    // gm.imgPath = imgPath;

	gm.save(function(err){
			if(err) {
				result.code = -99;
				result.message = "商品保存失败";
			}
			res.json(result);
		})
	})
});



//改
router.post('/api/updatedata', function(req, res, next) {
  var uname=req.body.uname;
  ShangsModel.update({shangs_name:uname},function(err,docs){
    res.send(docs);
  })
})

//删
// router.post('/remove',function(req,res,next){
//   var id = req.body.id;
//   ShangsModel.remove({_id:id},function(err,docs){
//     res.send(docs);
//   })
// })




module.exports = router;
