var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


HTMLDivElement.prototype.getRect = function () {
    var { clientHeight, clientLeft, clientTop, clientWidth, offsetHeight, offsetLeft, offsetTop, offsetWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth, } = this
    return { clientHeight, clientLeft, clientTop, clientWidth, offsetHeight, offsetLeft, offsetTop, offsetWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth };
}

function getRectEvent(event) {
    var { clientX, clientY, layerX, layerY, movementX, movementY, offsetX, offsetY, pageX, pageY, screenX, screenY, x, y, } = event;
    return { clientX, clientY, layerX, layerY, movementX, movementY, offsetX, offsetY, pageX, pageY, screenX, screenY, x, y, };
}

var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;