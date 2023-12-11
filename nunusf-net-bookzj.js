// /// <reference path="./jquery-1.8.2.min.js" />
$bookJs = {
	bookId:$("#bookDetails").attr("data-bookid"),
    pageIndex: -1,//页数（从-1开始）
    pageCount: 0,//总页数
    pageReverse:false,//是否是逆序
    pageNext: function () { //下一页
        this.pageIndex++;
        this.jsonp1($bookJs.bookId);
    },
    pagePrevious: function () {//上一页
        this.pageIndex--;
        this.jsonp1($bookJs.bookId);
    },
    pageJump: function (_this) {
        this.pageIndex = parseInt($(".sel select").attr("value"));
        this.jsonp1($bookJs.bookId);
    },pageSort: function() {//排序方式
        if ($bookJs.pageReverse) {
            $bookJs.pageReverse = false;
            $(".listType").html("逆序");
        } else {
            $bookJs.pageReverse = true;
            $(".listType").html("正序");
        }

        this.jsonp1($bookJs.bookId);
    },
    show: function () {//显示或隐藏"正在加载"
        $(".load").css("display", "block");
    },
    hide: function () {
        if (this.pageIndex >= 1) {
            $(".prev").removeClass("off");
        } else {
            $(".prev").addClass("off");
        }
        if ((this.pageIndex+1) < this.pageCount) {
            $(".next").removeClass("off");
        } else {
            $(".next").addClass("off");
        }
        $(".load").css("display", "none");
    }, jsonp1: function (id) {//调用json数据
        var fanye = this.pageCount;
        if(fanye!==0) {
            this.show();
        }
        var dz=($bookJs.pageReverse?"desc":"asc");
        $.ajax({
            // https://www.nunusf.net/yanqing/shunvgonglue/e/extend/bookpage/pages.php?id=16930&pageNum=1&dz=asc&pageCount=10
            url: "/e/extend/bookpage/pages.php?id=" + id + "&pageNum=" + this.pageIndex + "&dz=" + dz + "&pageCount="+this.pageCount+"",
            dataType: 'json',
            success: function (json) {
                $bookJs.success(json);
            }, error: function () {
                //this.hide();
            }
        });
    }, success: function (json) {
        if (this.pageCount != parseInt(json.totalPage)) {//更新页数
            var fanye = this.pageCount;
            this.pageCount = parseInt(json.totalPage);
            for (var i = 0; i < this.pageCount; i++) {
                $(".sel select").append('<option value="' + i + '">第' + (i + 1) + '页</option>');
            }
        }
        $(".curTip").html(this.pageIndex + 1);//当前第几页
        $(".total").html(this.pageCount);//总页数

        if(fanye!==0) {//默认首页不加载动态list
            $(".list").html("");
            $.each(json.list, function () {
                $(".list").append('<li><a href="' + this.pic + '" data-bid="' + this.id + '" >' + this.title + '</a></li>');
            })
            this.hide();
        }
    }
}

$(function () {
    $bookJs.pageNext();
    $(".prev").attr("onclick", "$bookJs.pagePrevious();");
    $(".next").attr("onclick", "$bookJs.pageNext();");
    $(".listType").attr("onclick", "$bookJs.pageSort()");
    $(".sel select").attr("onchange", "$bookJs.pageJump()");
});
$(function () {
  var $nav = $("#menu");
  $nav.on("click", function () {
      $(".site-search").hide();
      $("#search").removeClass("icon_delete");
      $(this).toggleClass ("icon_delete");
      $(".hide-nav").slideToggle();
  });
$('body').append('<section id="pageJumpBtn" class="cm_ani_out" style="display: none; "><a id="goPageTop" class="fl_top " href="javascript:void(0)"><span class="icon_top"></span></a><a id="goPageHome" class="fl_messges" href="/"><span class="icon_home"></span></a></section>');
var scroller = $('#pageJumpBtn')
    $(window).scroll(function() {
        var h = document.documentElement.scrollTop + document.body.scrollTop
        h > 200 ? scroller.fadeIn() : scroller.fadeOut();
    })
    $('#goPageTop').on("click", function(){
        $('html,body').animate({
            scrollTop: 0
        }, 300)
})
$("#search").click(function() {
    $(".hide-nav").hide();
    $("#menu").removeClass("icon_delete");
    $(this).toggleClass ("icon_delete");
    $(".site-search").slideToggle();
    $('.site-search').find('input').focus()
});
$(".cover-book-desc").height() > 25 && $(".extend-button").show(),
$(".cover-book-desc").on("click", function() {
      $(".cover-book-desc").toggleClass("opened");
});
});
function fav(clid,aid){
        $.post(
            "/e/extend/ly/sc.php",
            {ene:"shoucang",classid:clid,id:aid},
            function(data)
            {
                if(data==1)
                {
                    alert("加入书架成功");
                }
                if(data==11)
                {
                    alert("该小说您已加入书架");
                    window.location.href="/e/member/fava/"; 
                }
                if(data==0)
                {
                    alert("请先登陆或注册会员");
                    window.location.href="/e/member/login/"; 
                }
            },
            "html"
        );
}
function tj(){
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?8efa9009eb77d4cd63b8cf4733abecca";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}