

 function seek(){
        var seek = $("#hunt").val();
        console.log($("#hunt").val());
        gain(seek)
    }
gain();

// function san(){
//       $("#ul").on("click","#shan",function(){
//          $(this).parent().parent().remove();
//           })
//         gain(seek)
// }
    
    
    //每次点击下拉列表都会触发这个函数，改变当前页，然后触发ajax函数
    function tiaoye(){
        $(".dangqian").html($(".yema").find("option:selected").text()||1)
        gain()
    }
    //点击跳转起始页和末尾页
    function fipage(num){
        $(".dangqian").html(num||$(".yema option:last").val())
        gain()
    }
    //点击跳转上一页和下一页
    function endpage(num){
        if($(".dangqian").html()*1+num>$(".yema option:last").val()){
            alert("已经是最后一页")
        }else if($(".dangqian").html()*1+num==0){
            alert("已经是第一页")
        }else{
            $(".dangqian").html($(".dangqian").html()*1+num)
            gain()
        }
    }

    //ajax向后台发送数据，再返还想要的数据
    function gain(seek){
        $.ajax({
            url:"/huo",
            type:"get",
            data:{
                condition: seek||"",
                pagenum : $(".dangqian").html(),
                listnum : $(".listnum").val()
            },
            //返回的数据
            success:function(res){
                console.log(res)
                var ss = $(".listnum").val()

                var len = res.zong;                      //总数
                var res = res.data;                      //总商品信息
                // var sele=  
                var selelen = Number(Math.ceil(len/ss))  //有多少页
                var dq = $(".dangqian").html()
                console.log(dq)           //当前页面的值
                $(".zj").html(len)                       //总个数
                $(".ym").html(selelen)                    //页码值
                //每次ajax调取都清除一下下拉列表，再创建。
                $(".yema option").remove()
                for(j=0;j<selelen;j++){
                    var s= j+1;
                    var sele = 
                    `<option value="${s}">${s}</option>`
                    $(".yema").append(sele)
                    //默认选中的option，和当前页相关联
                    $(".yema option[value="+dq+"]").attr("selected",true);
                }
                //每次ajax调取都清除一下商品表格，再创建。
                $(".l-gain").remove()
                for(i=0;i<len;i++){
                           var str=`<ul class="l-gain">
                         <li>
               <input type="checkbox"/>
              <span>${Math.floor(Math.random()*1000)}</span>
           </li>
           <li>
               <span id="shangs_name">${res[i].shangs_name}</span>
           </li>
           <li>
               <span id="shangs_num">${res[i].shangs_num}</span>
           </li>
           <li>
               <span id="shangs_price">${res[i].shangs_price}</span>
           </li>
           <li>
               <span><img src="images/yes.gif"></span>
           </li>
           <li>
               <span><img src="images/no.gif"></span>
           </li>
           <li>
               <span><img src="images/yes.gif"></span>
           </li>
           <li>
               <span><img src="images/yes.gif"></span>
           </li>
           <li>
               <span>100</span>
           </li>
           <li>
               <span id="shangs_xn">1</span>
           </li>
           <li>
               <span>${res[i].shangs_xn}</span>
           </li>
           <li>
               <span><img src="images/icon_view.gif"></span>
               <span id="gai"><img src="images/icon_edit.gif"></span>
               <span><img src="images/icon_copy.gif"></span>
               <span id="shan" data-id="${res[i]._id}" ><img src="images/icon_trash.gif"></span>
           </li>
                    </ul>`
        
        $("#ul").prepend(str);
                }


            }
        })
        //  $("#ul").on("click","#shan",function(){
        //     $(this).parent().parent().remove();
        //  })
    }

//改

$("#ul").delegate("#gai","click",function(){
    var uname=$(this).parent().parent().find("li").eq(1).children("#shangs_name").html();

    $.ajax({
        url:"/api/updatedata",
        type:"post",
        data:{
            uname:uname
        },
        success:function(res){
            var ushopname=encodeURIComponent(res[0].shangs_name);
            var ushopnum=res[0].shangs_num;
            var ushopprice=res[0].shangs_price;
            window.location="/list?"+ushopname+"&"+ushopnum+"&"+ushopprice;
        }
    })

})

//删
// $("#ul").delegate("#shan","click",function(){
//       var id=res[i]._id;

//     $.ajax({
//         url:"/remove",
//         type:"post",
//         data:{
//             id:id
//         },
//         success:function(res){
//             $(this).parent().parent().remove();
//         }
//     })

// })










