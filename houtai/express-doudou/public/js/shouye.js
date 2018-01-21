// 多行菜单
 $(".yi #l1").click(function(e){
             e.stopPropagation();

        if( $(this).children(".er").is(":hidden") ){ //is方法 表示判断某个元素是否是隐藏的

			$(this).css("background-image","url(images/menu1_1.png)");	
		}else{
			$(this).css("background-image","url(images/menu_1.png)");			
		};

               $(this).children(".er").toggle(0);
     })

//手风琴
$("#la").click(function(e){
     e.stopPropagation();
      if( $("#zuo").is(":hidden") ){ //is方法 表示判断某个元素是否是隐藏的
              $("#zuo").css("display","block").siblings("#zuotu").css("display","none");
              $(this).css("background-image","url(images/arrow_left.gif)");
              $("#content").css("width","1149px");

               $(".o .bian ul li:nth-of-type(2)").css("width","91px");
              $(".o .bian ul li:nth-of-type(3)").css("width","91px");
               $(".o .fen").css("width","1135px");

		}else{
		      $("#zuo").css("display","none").siblings("#zuotu").css("display","block");
               	 $(this).css("background-image","url(images/arrow_right.gif)");
                $("#content").css("width","1275px");

                 $(".o .bian ul li:nth-of-type(2)").css("width","110px");
               $(".o .bian ul li:nth-of-type(3)").css("width","198");
                $(".o .fen").css("width","1260px");
		};
})








