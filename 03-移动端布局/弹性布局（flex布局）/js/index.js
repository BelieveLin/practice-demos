window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var w = focus.offsetWidth;
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        ul.style.transition = 'all .5s';
    }, 2000)
    // 每次过渡完成后
    ul.addEventListener('transitionend', function () {
        if (index >= ul.children.length - 2) {
            index = 0;
            // 去掉过渡效果
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + 0 + 'px)';
        } else if (index < 0) {
            index = ul.children.length - 3;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        ol.querySelector('li.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        flag = true;
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        // 拖动的时候不需要过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault(); // 取消滚动屏幕的默认行为
    })
    ul.addEventListener('touchend', function () {
        // 手指有移动时再进行判断
        if (flag) {
            flag = false;
            if (Math.abs(moveX) > 50) {
                // 右滑，上一张
                if (moveX > 0)
                    index--;

                // 左滑，下一张
                else
                    index++;
                ul.style.transition = 'all .5s';
            } else {
                ul.style.transition = 'all .2s';
            }
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            ul.style.transition = 'all .5s';
        }, 2000)
    })
    var goBack = document.querySelector('.goBack');
    var nav = this.document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop)
            goBack.style.display = 'block';
        else
            goBack.style.display = 'none';
    })
    goBack.addEventListener('touchstart', function () {
        window.scroll(0,0)
    })
})