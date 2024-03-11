var suggestions = document.querySelectorAll('[data-title]');
suggestions.forEach(item => {
    item.addEventListener('mouseenter', function (e) {
        var title = this.dataset.title;
        const divTitle = document.createElement('div');
        divTitle.innerText = title;
        divTitle.classList.add('title-show');
        this.prepend(divTitle);
    })

    item.addEventListener('mouseleave', function (e) {
        Array.from(this.children).forEach(item => {
            if (item.classList.contains('title-show')) {
                item.remove();
            }
        })
    })
})
//Header Tab
var tabEl = document.querySelector('header .tabs');
var tabContentEls = document.querySelectorAll('[data-tab-content]');
var buttonEls = tabEl.querySelectorAll('button');
var overlay = tabEl.querySelector('.overlay');
var main = document.querySelector('main');
var header = document.querySelector('header');
var footer = document.querySelector('footer');
main.style.height = `calc(100vh - ${header.clientHeight}px - ${footer.clientHeight}px)`;

buttonEls.forEach((buttonEl, index) => {
    buttonEl.addEventListener('mousedown', function (e) {
        const buttonSelected = tabEl.querySelector('.selected');
        var changeTab = false
        if (!buttonEl.classList.contains('selected') && buttonSelected.classList.contains('selected')) {
            changeTab = true;
        }

        if (changeTab) {
            var percent = -150 + (index * 100);
            overlay.style.transform = `translateX(${percent}%) translateY(-50%)`;
            buttonSelected.classList.remove('selected');
            buttonEl.classList.add('selected');
            var tabContentShow = document.querySelector('[data-tab-content].show');
            tabContentShow.classList.remove('show');
            tabContentShow.style.zIndex = 1;
            tabContentEls[index].style.zIndex = 2;
            tabContentEls[index].classList.add('show');
        }
    })
})


function activeTab() {

}