request.setEndpoint('https://music-two-gules.vercel.app');
var suggestions = document.querySelectorAll('[data-title]');
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
    buttonEl.addEventListener('click', function (e) {
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
            if (buttonEl.dataset.tab !== 'screen-main') {
                if (isShowLyric) {
                    lyricKaraoke.click();
                }
            }
        }
    })
})

var formSearch = document.querySelector('.form-search');
var inputSearch = formSearch.querySelector('input');
var buttonSearch = formSearch.querySelector('button');
var loadingHome = document.querySelector('.screen-left .loading');
var loadingPlaylist = document.querySelector('.screen-right .loading');
var homeContainer = document.querySelector('.player-screen .home-container');
var searchContainer = document.querySelector('.player-screen .search-container');

var songEl = homeContainer.querySelector('.songs');
var searchEl = searchContainer.querySelector('.search');

var headingSong = homeContainer.querySelector('.heading');
var headingSearch = searchContainer.querySelector('.heading');

var searchTextEl = searchContainer.querySelector('blockquote');
var buttonSearchInSong = headingSong.querySelector('button');
var buttonHomeInSong = headingSearch.querySelector('button');

var KEY_PLAYLIST = 'PLAYLIST';
var KEY_HOME = 'HOME';
var playlistHome = [];
var playHomeCount = 0;
var playListSearch = [];

var keySearch = "";
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

buttonSearchInSong.addEventListener('click', function () {
    showOrHiddenElement(searchContainer, homeContainer, 'show');
})

buttonHomeInSong.addEventListener('click', function () {
    showOrHiddenElement(homeContainer, searchContainer, 'show');
})
// Tìm kiếm
formSearch.addEventListener('submit', async function (e) {
    e.preventDefault();
    var value = inputSearch.value.trim();
    if (value === "") {
        inputSearch.focus();
        return alert("Vui lòng nhập dữ liệu 🤣!");
    }
    onOffLoading(loadingHome, true)
    try {
        var [responseZing, responseNCT] = await Promise.all([request.get(`/zing/search/${value}`), request.get(`/nct/search/${value}`)]);
    } catch (err) {
        var responseZing = { status: "False" };
        var responseNCT = { status: "False" };
    }
    playListSearch = [];
    if (responseZing.status === 'OK' && responseZing.data.status === 200) {
        playListSearch = playListSearch.concat(responseZing.data.data);

    }

    if (responseNCT.status === "OK" && responseNCT.data.status === 200) {
        playListSearch = playListSearch.concat(responseNCT.data.data);
    }
    searchTextEl.innerText = value;
    buttonSearchInSong.removeAttribute('hidden');
    changeTab('screen-home');
    await renderSongSearch();
    onOffLoading(loadingHome, false);
    showOrHiddenElement(searchContainer, homeContainer, 'show');
    chooseSongSearch();
})

function showOrHiddenElement(elementShow, elementHidden, className) {
    elementShow.classList.add(className);
    elementHidden.classList.remove(className);
}


function chooseSongHome() {
    Array.from(songEl.children).forEach(songItem => {
        songItem.addEventListener('click', playSong);
    })
}

function chooseSongSearch() {
    Array.from(searchEl.children).forEach(songItem => {
        songItem.addEventListener('click', playSong);
    })
}

async function playSong() {
    var songItem = this;
    var { type, id } = songItem.dataset;
    // Kiểm tra nếu đã có trong playlist thì chạy không thì tải từ trên dữ liệu về
    var index = playlists.findIndex(function (song) {
        if (song.type && song.id) {
            return song.type == songItem.dataset.type && song.id === id
        }
        return false;
    })

    if (index !== -1) {
        if (songIndexCurrent === index) {
            // Nếu băng index hiện tại thì dừng;
            buttonPlayer.click();
            if (isPlay) {
                changeTab();
            }
            return false;
        }
        if (playlists[songIndexCurrent].lyrics) {
            addOrRemoveIconStartKaraoke();
        }
        songIndexCurrent = index;
    } else {
        var { data, status } = await request.get(`/${type}/song/${id}`);
        if (status === "OK" && data.data.url) {
            playlists.push({
                type,
                id,
                ...data.data
            })
            if (playlists[songIndexCurrent].lyrics) {
                addOrRemoveIconStartKaraoke();
            }
            addAllEventNewSong(playlists.length - 1);
            songIndexCurrent = playlists.length - 1;
        } else {
            return alert('Vui lòng đăng ký VIP 😂!');
        }
    }
    if (!isPlay) {
        buttonPlayer.click();
    }
    loadSongStart();
}

function changeTab(type = 'screen-main') {
    let indexButtonTab = Array.from(buttonEls).findIndex(button => button.dataset.tab === type);
    if (indexButtonTab !== -1) {
        buttonEls[indexButtonTab].click();
    }
}

function addAllEventNewSong(index) {
    playlistEl.insertAdjacentHTML('beforeend', renderSong(playlists[index]));
    playlistEl.children[index].addEventListener('click', function (e) {

        if (songIndexCurrent === index) {
            // Nếu băng index hiện tại thì dừng;
            buttonPlayer.click();
            if (isPlay) {
                changeTab();
            }
            return false;
        }
        if (playlists[songIndexCurrent].lyrics) {
            addOrRemoveIconStartKaraoke();
        }
        if (!isPlay) {
            buttonPlayer.click();
        }
        songIndexCurrent = index;
        loadSongStart();
    })

    setLocalStorage(KEY_PLAYLIST_MAIN, playlists);
    playLines = document.querySelectorAll('.play-line');
}
function renderSongHome() {
    return new Promise(resolve => {
        songEl.innerHTML = playlistHome.map(({ title, id, type, image, author }) => `<div class="song-item" title="${title} - ${author}" data-id="${id}" data-type="${type}">
            <div class="image" >
                <img src="${image}" alt="">
            </div>
            <div class="info">
                <h3 class="title">${title}</h3>
                <span class="author">${author}</span>
            </div>
        </div>`).join('')
        return resolve(songEl.children);
    });
}

function renderSongSearch() {
    return new Promise(resolve => {
        searchEl.innerHTML = playListSearch.map(({ title, id, type, image, author }) => `<div class="song-item" title="${title} - ${author}" data-id="${id}" data-type="${type}">
            <div class="image" >
                <img src="${image}" alt="">
            </div>
            <div class="info">
                <h3 class="title">${title}</h3>
                <span class="author">${author}</span>
            </div>
        </div>`).join('')
        return resolve(songEl.children);
    });
}
async function loadSongHomeStart() {
    const response = await request.get('/topSong');
    return response.data;
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
}

function getLocalStorage(key) {
    return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []);
}

function onOffLoading(element, isLoading) {
    if (isLoading) {
        element.classList.add('show');
    } else {
        element.classList.remove('show');
    }
}

window.addEventListener('DOMContentLoaded', async function () {
    playlistHome = getLocalStorage(KEY_HOME);
    while (!playlistHome.length) {
        const response = await loadSongHomeStart();
        if (response.status === 200) {
            setLocalStorage(KEY_HOME, response.data);
            playlistHome = response.data;
            break;
        }
        if (playHomeCount >= 5) {
            break;
        }
        playHomeCount++;
    }
    await renderSongHome();
    onOffLoading(loadingHome, false);
    chooseSongHome();
})