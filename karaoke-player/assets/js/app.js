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