window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var num = 0;
    var circle = 0;
    focus.addEventListener('mouseenter', function() {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
        prev.style.display = 'none';
        next.style.display = 'none';
        var timer = setInterval(function() {
            next.click();
        }, 2000)
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var focusWidth = focus.offsetWidth;
    // 动态生成小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        // 生成小圆圈的同时，绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++)
                ol.children[i].className = '';
            this.className = 'selected';
            var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'selected';
    // 在生成小圆圈后进行深度拷贝
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 右按钮
    var flag = true; // 节流阀
    next.addEventListener('click', function() {
            if (flag) {
                flag = false;
                // 恢复 -> 跳跃，++在后，到length - 1
                // 每一个照顾到，++在前，到length
                // num = 0 先恢复到第一张图片，num++ 再跳到第二张图片
                if (num == ul.children.length - 1) {
                    ul.style.left = 0; // 快速复原，不需要动画效果
                    num = 0;
                }
                num++;
                // circle不能快速跳到第二个
                circle++;
                if (circle == ol.children.length) {
                    circle = 0;
                }
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                circleChange();
            }
        })
        // 左按钮
    prev.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px'; // 快速复原，不需要动画效果
            }
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            num--;
            console.log(num);
            // -num改变的是位置，如从左移3份变为左移2份
            // 本质上都是在左侧上的移动
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++)
            ol.children[i].className = '';
        ol.children[circle].className = 'selected';
    }
    var timer = setInterval(function() {
        next.click();
    }, 2000)
})
$(function() {
    var recomTop = $(".recom").offset().top;
    var flag = true; // 互斥锁
    toggleTool();
    $(window).scroll(function() {
        if (flag) {
            toggleTool();
            $(".floor>div").each(function(i, ele) {
                if ($(window).scrollTop() >= $(ele).offset().top)
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
            })
        }
    })
    $(".fixedtool li").click(function() {
        flag = false;
        var index = $(this).index();
        var top = $(".floor>div").eq(index).offset().top;
        $("body, html").stop().animate({
            scrollTop: top
        }, function() {
            flag = true;
        })
        $(this).addClass("current").siblings().removeClass("current");
    })

    function toggleTool() {
        if ($(document).scrollTop() >= recomTop)
            $(".fixedtool").fadeIn();
        else
            $(".fixedtool").fadeOut();
    }
})