function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长是整数，正数向上取整、负数向下取整
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback)
            //     callback();
            callback && callback();
        }
        else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15)
}