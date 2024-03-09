var slider = document.querySelector('.slider');
var nextBtn = slider.querySelector('.next');
var prevBtn = slider.querySelector('.prev');
var listItem = slider.querySelector('.list-item');
var items = getItems(items);
var dot = slider.querySelector('.dot');
var clientWidth = window.innerWidth;
var dotItems;
var indexCurrent = 1;
var sliderAuto;
var clicked = false;
var isAutoPlay = true;
var toRight = true;

function changeSlider(isNext = true) {
    addTransition();
    if (typeof isNext !== 'boolean') {
        transformSlider();
        return false;
    }

    if (isNext) {
        indexCurrent++;
    } else {
        indexCurrent--;
    }
    changeIndex();
    transformSlider();
}

function transformSlider() {
    changeDot();
    listItem.style.transform = `translateX(${(getTransformX())}px)`;
}

function getTransformX() {
    return -(indexCurrent * clientWidth);
}

function changeDot() {
    dotItems.forEach(function (dot, index) {
        if (index === indexCurrent) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    })
}

function nextSlide() {
    if (!clicked) {
        changeSlider(true);
    }
    toRight = true
    removeAutoPlay();
    clicked = true;
}

function prevSlide() {
    if (!clicked) {
        changeSlider(false)
    }
    toRight = false;
    removeAutoPlay();
    clicked = true;
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function addEventForDot() {
    dotItems.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            indexCurrent = index;
            transformSlider()
        })
    })
}

//Drag

var isNext = null;
var threshold = clientWidth / 4;
var clientX;

function handleDrag(e) {
    isNext = null;
    removeTransition();
    let dragClientX = e.clientX;
    var transform = Math.abs(dragClientX - clientX);
    var currentTransform = -indexCurrent * clientWidth;
    if (dragClientX > clientX) {
        toRight = false;
        currentTransform += transform;
        if (threshold < transform) {
            isNext = false;
        }
    } else {
        toRight = true;
        currentTransform -= transform;
        if (threshold < transform) {
            isNext = true;
        }
        // Kéo ngược lại
    }
    document.body.style.cursor = "move";
    listItem.style.transition = "none";
    listItem.style.transform = `translateX(${currentTransform}px)`
}

listItem.addEventListener('mousedown', function (e) {
    clientX = e.clientX;
    removeTransition();
    document.addEventListener('mousemove', handleDrag);
    removeAutoPlay();
})


document.addEventListener('mouseup', function () {
    document.body.style.cursor = "initial";
    changeSlider(isNext);
    isNext = null;
    document.removeEventListener('mousemove', handleDrag);
    addAutoPlay(toRight);
})

function addTransition() {
    listItem.style.transition = "transform .3s ease-in-out";
}

function removeTransition() {
    listItem.style.transition = "none";
}

function getItems() {
    return slider.querySelectorAll('.list-item .item');
}

function init() {
    var cloneFirst = items[0].cloneNode(true);
    var cloneLast = items[items.length - 1].cloneNode(true);
    cloneFirst.classList.add('last');
    cloneLast.classList.add('first');
    listItem.prepend(cloneLast);
    listItem.append(cloneFirst);

    items = getItems();

    dot.innerHTML = Array.from(new Array(items.length)).map(function (item, index) {
        return `<span class="${index === indexCurrent ? 'active' : ''}" style="${index === 0 || index === items.length - 1 ? 'display:none' : ''}"></span>`
    }).join('');

    // Di chuyển translate về vị trí số 1
    var widthFull = items.length * clientWidth;
    listItem.style.width = widthFull + 'px';
    listItem.style.transform = `translateX(${getTransformX()}px)`;
    dotItems = dot.querySelectorAll('span');
    addEventForDot();
}

listItem.addEventListener('transitionend', function () {
    changeIndex(true);
    clicked = false;
    addAutoPlay(toRight);
})

function changeIndex(isTransitionEnd = false) {
    if (indexCurrent > items.length - 1) {
        indexCurrent = 0;
    }

    if (indexCurrent < 0) {
        indexCurrent = items.length - 1;
    }

    if (!isTransitionEnd) {
        return true;
    }
    var isfirstOrLast = false;

    if (items[indexCurrent].classList.contains('first')) {
        indexCurrent = items.length - 2;
        isfirstOrLast = true;
    }
    if (items[indexCurrent].classList.contains('last')) {
        indexCurrent = 1;
        isfirstOrLast = true;
    }
    if (isfirstOrLast) {
        removeTransition();
        changeDot();
        listItem.style.transform = `translateX(${getTransformX()}px)`;
    }

}

function autoPlay(time, isRight = true) {
    sliderAuto = setInterval(function () {
        changeSlider(isRight);
    }, time);
}

function removeAutoPlay() {
    if (sliderAuto && isAutoPlay) {
        clearInterval(sliderAuto);
        isAutoPlay = false;
    }
}

function addAutoPlay(isRight = false) {
    if (!isAutoPlay) {
        autoPlay(5000, isRight)
        isAutoPlay = true;
    }
}

window.addEventListener('DOMContentLoaded', function () {
    init();
    autoPlay(5000);
})