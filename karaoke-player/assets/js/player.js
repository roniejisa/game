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

var playerDashboard = document.querySelector('.player-dashboard');

var player = playerDashboard.querySelector('.player')

// Xử lý process player
var process = player.querySelector('.process');
var mainProcess = player.querySelector('.process-main');
var iconProcess = player.querySelector('.process-icon');
var timerProcess = player.querySelector('.process-timer');
// Thêm sự kiện lấy phần trăm
var widthProcess = process.clientWidth;
var offsetCurrent = 0;
var percentCurrent = 0;
var clientXIconProcess = 0;
var widthMainProcess = 0;

process.addEventListener('mousedown', function (e) {
    isDrag = true;
    var targetEl = e.target;
    if (targetEl.classList.contains('process-icon')) {
        return false;
    }

    widthMainProcess = e.offsetX;
    percentCurrent = toPercent(widthMainProcess);

    changeProcess(percentCurrent);

    // Tính khoảng cách của icon so với client
    clientXIconProcess = e.clientX;
})

process.addEventListener('mousemove', function (e) {
    timerProcess.classList.add('show');
    var left = e.clientX;
    if (e.clientX < timerProcess.clientWidth) {
        left = timerProcess.clientWidth;
    } else if (window.innerWidth < timerProcess.clientWidth + e.clientX) {
        left = window.innerWidth - timerProcess.clientWidth;
    }
    timerProcess.style.left = left + 'px';

    if (e.target.classList.contains('process-icon')) {
        changeProcessTimer(percentCurrent);
    } else {
        changeProcessTimer(toPercent(e.offsetX));
    }
})

process.addEventListener('mouseleave', function (e) {
    timerProcess.classList.remove('show');
})

function toPercent(width) {
    var percent = checkPercent(width / widthProcess * 100);
    return percent;
}

function changeProcess(percent) {
    mainProcess.style.width = percent + '%';
}

function percentToWidth() {
    var width = percentCurrent / 100 * widthProcess;
    return width;
}
//Drag
var isDrag = false;

iconProcess.addEventListener('mousedown', function (e) {
    clientXIconProcess = e.clientX;
    widthMainProcess = mainProcess.clientWidth;
    isDrag = true;
})

document.addEventListener('mousemove', function (e) {
    if (isDrag) {
        dragClientX = e.clientX
        transform = Math.abs(dragClientX - clientXIconProcess);
        var widthMainProcessCurrent = widthMainProcess + transform;
        if (dragClientX < clientXIconProcess) {
            widthMainProcessCurrent = widthMainProcess - transform;
        }
        percentCurrent = toPercent(widthMainProcessCurrent);
        changeProcess(percentCurrent)
        changeTimeStart(percentCurrent);
    }
})

document.addEventListener('mouseup', function () {
    if (isDrag) {
        checkTimeLyric();
        percentProcessUpdate();
    }
    isDrag = false;
})


// Xử lý process volume
var rightEl = playerDashboard.querySelector('.right');
var volume = playerDashboard.querySelector('.volume');
var volumeBackground = volume.querySelector('.volume-background');
var volumeIcon = volume.querySelector('.icon');
var volumeProcess = volume.querySelector('.volume-process');
var volumeProcessMain = volume.querySelector('.process-main')
var iconVolumeProcess = volumeProcess.querySelector('.process-icon');
var percentVolumeProcess = volumeProcess.querySelector('.process-percent');

// Thêm sự kiện lấy phần trăm
var heightProcess = volumeProcess.clientHeight;
var offsetVolumeCurrent = 0;
var percentVolumeCurrent = 100;
var clientYIconProcess = 0;
var heightMainProcess = heightProcess;

var volumeHightIcon = '<i class="fa-solid fa-volume-high"></i>';
var volumeHightSmallIcon = '<i class="fa-solid fa-volume-low"></i>';
var volumeHightOffIcon = '<i class="fa-solid fa-volume-off"></i>';
var volumeHightXIcon = '<i class="fa-solid fa-volume-xmark"></i>';

volumeProcess.addEventListener('mousedown', function (e) {
    isDragVolume = true;
    var targetEl = e.target;
    if (targetEl.classList.contains('process-icon')) {
        return false;
    }
    if (targetEl.classList.contains('process-main')) {
        heightMainProcess = heightMainProcess - e.offsetY;
    } else {
        heightMainProcess = heightProcess - e.offsetY;
    }
    percentVolumeCurrent = toPercentHeight(heightMainProcess);

    changeHeightProcess(percentVolumeCurrent);

    // Lưu lại khoảng cách giữa top và điểm click 
    clientYIconProcess = e.clientY;
    changeIconVolume();
})

// volumeProcess.addEventListener('mousemove', function (e) {
// percentVolumeProcess.classList.add('show');
// percentVolumeProcess.style.left = e.clientX - process.offsetLeft + 'px';
// })

// volumeProcess.addEventListener('mouseleave', function (e) {
// percentVolumeProcess.classList.remove('show');
// })

function toPercentHeight(height) {
    var percent = checkPercent(height / heightProcess * 100);
    return percent;
}

function changeHeightProcess(percent) {
    percent = checkPercent(percent);
    volumeProcessMain.style.height = percent + '%';
    percentVolumeProcess.innerText = percent.toFixed(0) + '%';
}

function checkPercent(percent) {
    if (percent > 100) {
        percent = 100;
    }
    if (percent < 0) {
        percent = 0;
    }
    return percent
}
function percentToHeight() {
    var width = percentVolumeCurrent / 100 * widthProcess;
    return width;
}
//Drag
var isDragVolume = false;

iconVolumeProcess.addEventListener('mousedown', function (e) {
    clientYIconProcess = e.clientY;
    heightMainProcess = volumeProcessMain.clientHeight;
    isDragVolume = true;
})

document.addEventListener('mousemove', function (e) {
    if (isDragVolume) {
        dragClientY = e.clientY;
        transform = Math.abs(dragClientY - clientYIconProcess);
        var heightMainProcessCurrent = heightMainProcess - transform;
        if (dragClientY < clientYIconProcess) {
            heightMainProcessCurrent = heightMainProcess + transform;
        }
        percentVolumeCurrent = toPercentHeight(heightMainProcessCurrent);
        changeHeightProcess(percentVolumeCurrent)
        percentVolumeUpdate();
        changeIconVolume()
        volumeBackground.classList.add('show')
    }
})

document.addEventListener('mouseup', function () {
    if (isDragVolume) {
        heightMainProcess = percentVolumeCurrent === 100 ? heightProcess : heightMainProcess;
        volumeBackground.classList.remove('show')
    }
    isDragVolume = false;
})

// Add Player 
var timeStart = player.querySelector('.time-start');
var timeEnd = player.querySelector('.time-end');
var actionEl = playerDashboard.querySelector('.actions');
// Action Buttons
var buttonPlayer = actionEl.querySelector('.play');
var buttonNext = actionEl.querySelector('.next');
var buttonPrev = actionEl.querySelector('.prev');
var buttonShuffle = actionEl.querySelector('.shuffle');
var buttonLoop = actionEl.querySelector('.loop');

var playerScreen = document.querySelector('.player-screen');

// Karaoke Selector
var karaokeScreenEl = playerScreen.querySelector('.karaoke-screen');
var karaokeContentEl = karaokeScreenEl.querySelector('.karaoke-content');
var lyricKaraoke = rightEl.querySelector('.lyric');
var lyricKaraokeIcon = lyricKaraoke.querySelector('button');
var buttonKaraoke = rightEl.querySelector('.karaoke');
var buttonKaraokeIcon = buttonKaraoke.querySelector('button');
var buttonGetLyric = playerScreen.querySelector('.get-link');
//disc UI
var disc = playerScreen.querySelector('.player-screen .disc');
var playLines = null;

//Playlist
var playlistEl = playerScreen.querySelector('.screen-right .playlist');

//Main Screen
var changeTitle = playerScreen.querySelector('.song-info h1');

//Song Current 
var songElCurrent = null;


//End
var audioEl = new Audio();
var audioKaraokeEl = new Audio();

var iconPlay = '<i class="fa-solid fa-play"></i>'
var iconPause = '<i class="fa-solid fa-pause"></i>'
var iconKaraoke = '<i class="fa-solid fa-microphone"></i>';
var iconNoKaraoke = '<i class="fa-solid fa-microphone-lines-slash"></i>';
var animationFrame;
var animationFrameForLyric;
var isKaraoke = false;
var isShowLyric = false;
var isPlay = false;
var isMute = false;
var volumeOld = percentVolumeCurrent;
var isShuffle = false;
var isLoop = false;
var volumeIfZero = 50;
var songIndexCurrent = 0;
var songIndexPrevious = 0;
// Karaoke variable 
var totalTimeLyricCurrent;
var currentIndexLyric;
var lyricsCurrent;
var wordsCurrent;
var wordsNext;
var elementLyric;
var elementLyricNext;
var elementLyricCurrent;
var animationLyric;
var songCurrentInfoEl;
var timeEndLyricCurrent;
var timeStartLyricNext;
// end
var playlists;
// Animation
var animationDisc;
var animationPlayLine = {};
function initAudio() {
    playLines = document.querySelectorAll('.play-line');

    audioEl.addEventListener('loadedmetadata', function (e) {
        updateTimer();
        if (isPlay && isShowLyric) {
            animationFrame = requestAnimationFrame(timeUpdateHandle)
        } else {
            cancelAnimationFrame(animationFrame);
        }
    })

    audioEl.addEventListener('play', function () {
        // Xử lý animation ở chỗ này!

        if (animationDisc) {
            animationDisc.play();
        } else {
            animationDisc = disc.animate([{
                transform: "rotate(0deg)",
                transform: "rotate(360deg)",
            }], {
                duration: 5000,
                easing: "linear",
                iterations: Infinity,
            })
        }
        animationLine(true)

        // CheckKaraoke
        if (audioKaraokeEl.webkitAudioDecodedByteCount) {
            audioKaraokeEl.play();
        }
        changeIconKaraoke();
    })

    audioEl.addEventListener('pause', function () {
        cancelAnimationFrame(animationFrame)
        cancelAnimationFrame(animationFrameForLyric)
        if (animationDisc) {
            animationDisc.pause();
        }
        animationLine(false)
        if (audioKaraokeEl.webkitAudioDecodedByteCount) {
            audioKaraokeEl.pause();
        }
    })


    // audioEl.addEventListener('ratechange', function () {
    // })

    audioEl.addEventListener('durationchange', function () {
        if (isPlay) {
            playLines = document.querySelectorAll('.play-line');
            audioEl.play();
            changeIconPlay();
        }
    })
    //Thời gian chạy theo bài ở đay
    audioEl.addEventListener('timeupdate', timeUpdateHandle)

    audioEl.addEventListener('ended', function () {
        checkLoopIfEnded();
    })

    buttonPlayer.addEventListener('click', function () {
        if (isPlay) {
            isPlay = false;
            audioEl.pause();
        } else {
            isPlay = true;
            audioEl.play();
        }
        changeIconPlay();
    });

    volumeIcon.addEventListener('click', function () {
        if (isMute) {
            if (volumeOld === 0) {
                volumeOld = volumeIfZero;
            }
            audioEl.volume = getSizeVolume(volumeOld)
            //Karaoke
            audioKaraokeEl.volume = getSizeVolume(volumeOld)
            isMute = false;
            percentVolumeCurrent = volumeOld;
        } else {
            audioEl.volume = 0;
            //Karaoke
            audioKaraokeEl.volume = 0;
            isMute = true;
            percentVolumeCurrent = 0;
        }
        changeHeightProcess(percentVolumeCurrent);
        changeIconVolume();
    })

    buttonShuffle.addEventListener('click', function () {
        isShuffle = !isShuffle;
        changeShuffle();
    })

    buttonLoop.addEventListener('click', function () {
        isLoop = !isLoop;
        changeLoop();
    })

    playlistEl.childNodes.forEach(function (song, index) {
        song.addEventListener('click', function (e) {
            if (songIndexCurrent === index) {
                // Nếu băng index hiện tại thì dừng;
                buttonPlayer.click();
                return false;
            }
            if (playlists[songIndexCurrent].lyrics) {
                addOrRemoveIconStartKaraoke();
            }
            songIndexCurrent = index;
            loadSongStart();
        })
    })

    buttonNext.addEventListener('click', function () {
        checkLoopIfEnded(true, true);
    })

    buttonPrev.addEventListener('click', function () {
        checkLoopIfEnded(false, true);
    })

    lyricKaraoke.addEventListener('click', function () {
        if (!isPlay) {
            buttonPlayer.click();
        }
        isShowLyric = !isShowLyric
        resetLyricVariable();
        if (isShowLyric) {
            lyricKaraoke.classList.add('active');
            addInfoKaraokeContent();
            karaokeScreenEl.classList.add('show');
        } else {
            lyricKaraoke.classList.remove('active');
            karaokeScreenEl.classList.remove('show');
            isKaraoke = false;
        }
        changeIconKaraoke();
    })

    buttonKaraoke.addEventListener('click', function () {
        isKaraoke = !isKaraoke;
        changeIconKaraoke();
        if (isShowLyric === false) {
            lyricKaraoke.click();
        }
    })

    buttonGetLyric.addEventListener('click', async function () {
        link = prompt('Nhập Link');
        if (getLyricNCT && typeof getLyricNCT === 'function' && link) {
            var data = await getLyricNCT(link);
            if (data) {
                playlists[songIndexCurrent]['lyrics'] = data;
                karaokeContentEl.querySelector('.no-lyrics') && karaokeContentEl.querySelector('.no-lyrics').remove();
            }
        }
    })
}


function initAudioKaraoke() {
    audioKaraokeEl.addEventListener('loadeddata', function () {
        changeIconKaraoke();
    })

    audioKaraokeEl.onerror = function () {
        buttonKaraoke.setAttribute('hidden', '');
    };
}
// function animation 

function animationLine(checkPlay = true) {
    playLines.forEach(function (playLine, playLineIndex) {
        if (!animationPlayLine[playLineIndex]) {
            animationPlayLine[playLineIndex] = {};
        }
        Array.from(playLine.children).forEach(function (spanEl, index) {
            if (animationPlayLine[playLineIndex][index]) {
                if (checkPlay) {
                    animationPlayLine[playLineIndex][index].play();
                } else {
                    animationPlayLine[playLineIndex][index].pause();
                }
            } else {
                var { clientHeight } = spanEl.parentElement.parentElement.getRect();
                animationPlayLine[playLineIndex][index] = spanEl.animate([{
                    "height": "0px",
                    "max-height": "0px",
                }, {
                    "height": clientHeight - 12 + "px",
                    "max-height": clientHeight - 12 + "px",
                }], {
                    duration: 1000,
                    delay: (index * 150),
                    easing: "ease-in-out",
                    iterations: Infinity,
                    direction: "alternate"
                });
            }
        })
    })
}
// function after update process
function timeUpdateHandle() {
    if (!isDrag) {
        timeStart.innerText = toTime(audioEl.currentTime);
        changeProcess(secondTimeSongToPercent())
    }

    if (isPlay && isShowLyric) {
        animationFrame = requestAnimationFrame(timeUpdateHandle);
    }

    if (isShowLyric) {
        showLyricKaraoke();
    }
}

function percentProcessUpdate() {
    if (isShowLyric) {
        checkDataLyric();
    }
    var timeCurrent = getTimeSecondHasPercent(percentCurrent);
    audioEl.currentTime = timeCurrent;
    if (audioKaraokeEl.webkitAudioDecodedByteCount) {
        audioKaraokeEl.currentTime = timeCurrent;
    }
}

function changeTimeStart(percent) {
    timeStart.innerText = getTimeSong(percent)
}

function percentVolumeUpdate() {
    volumeOld = percentVolumeCurrent
    audioEl.volume = getSizeVolume(volumeOld);
    if (audioKaraokeEl) {
        audioKaraokeEl.volume = getSizeVolume(volumeOld);
    }
}

function changeProcessTimer(percent) {
    timerProcess.innerText = getTimeSong(percent);
}

function checkLoopIfEnded(isNext = true, checkLoop = false) {
    if (isShuffle && isNext) {
        songIndexPrevious = songIndexCurrent;
    }
    console.log(songIndexPrevious);
    if (songIndexPrevious && !isNext && isShuffle && songIndexCurrent !== songIndexPrevious) {
        songIndexCurrent = songIndexPrevious;
        loadSongStart();
        changeIconPlay();
        songIndexPrevious = null;
        return false;
    }

    if (playlists[songIndexCurrent].lyrics) {
        addOrRemoveIconStartKaraoke();
    }
    if (isLoop && !checkLoop) {
        isPlay = true;
    } else {
        audioEl.currentTime = 0;
        if (audioKaraokeEl.webkitAudioDecodedByteCount) {
            audioKaraokeEl.currentTime = 0;
        }
        changeProcess(secondTimeSongToPercent(audioEl.currentTime));
    }

    if (((!isLoop || checkLoop) && isShuffle && playlists.length > 2)) {
        var indexChange = songIndexCurrent;
        var count = 0;

        while (songIndexCurrent === indexChange) {
            indexChange = Math.floor(Math.random() * playlists.length);
            if (count === 30) {
                indexChange = playlists.findIndex(function (song, index) {
                    return index !== songIndexCurrent;
                });
                break;
            }
            count++;
        }
        songIndexCurrent = indexChange;
    } else if ((!isLoop || checkLoop) && !isShuffle && songIndexCurrent === playlists.length - 1 && isNext) {
        songIndexCurrent = 0;
        audioEl.currentTime = 0;
        if (audioKaraokeEl.webkitAudioDecodedByteCount) {
            audioKaraokeEl.currentTime = 0;
        }
    } else if ((!isLoop || checkLoop) && isNext) {
        songIndexCurrent++;
    } else if ((!isLoop || checkLoop) && !isNext) {
        songIndexCurrent--;
        if (songIndexCurrent < 0) {
            songIndexCurrent = playlists.length - 1;
        }
    }



    loadSongStart();
    changeIconPlay();
}
//Audio support
function changeIconPlay() {
    if (isPlay) {
        buttonPlayer.innerHTML = iconPause;
    } else {
        buttonPlayer.innerHTML = iconPlay;
    }
}

function changeIconKaraoke() {
    /**
     * mute karaoke khi karaoke = false hoặc lyric = false
     * mute audio khi karaoke = true
     * 
     */
    audioKaraokeEl.muted = (isKaraoke === false) || (isShowLyric === false);
    audioEl.muted = (isKaraoke === true);
    if (isKaraoke) {
        buttonKaraoke.classList.add('active')
    } else {
        buttonKaraoke.classList.remove('active')
    }

    buttonKaraokeIcon.innerHTML = isKaraoke ? iconKaraoke : iconNoKaraoke;
}

function changeIconVolume() {
    var iconVolumeCurrent;
    isMute = false;
    if (percentVolumeCurrent >= 66) {
        iconVolumeCurrent = volumeHightIcon
    } else if (percentVolumeCurrent >= 20) {
        iconVolumeCurrent = volumeHightSmallIcon
    } else if (percentVolumeCurrent >= 1) {
        iconVolumeCurrent = volumeHightOffIcon
    } else {
        iconVolumeCurrent = volumeHightXIcon;
        isMute = true;
    }
    volumeIcon.innerHTML = iconVolumeCurrent
}

function changeLoop() {
    if (isLoop) {
        buttonLoop.classList.add('active');
    } else {
        buttonLoop.classList.remove('active');
    }
}

function changeShuffle() {
    if (isShuffle) {
        buttonShuffle.classList.add('active');
    } else {
        buttonShuffle.classList.remove('active');
    }
}

//Utils 
function getSizeVolume(percent) {
    return (1 / 100 * percent).toFixed(4);
}
function secondTimeSongToPercent() {
    return audioEl.currentTime / audioEl.duration * 100;
}
function getTimeSong(percent) {
    return toTime(getTimeSecondHasPercent(percent));
}
function getTimeSecondHasPercent(percent) {
    return audioEl.duration / 100 * percent;
}
function updateTimer() {
    changeProcess(0);
    timeEnd.innerText = toTime(audioEl.duration);
}

function toTime(seconds) {
    var hours = Math.floor(seconds / 60 / 60);
    if (hours < 10) {
        hours = '0' + minutes;
    }
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    seconds = Math.floor(seconds - (minutes * 60));
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (+hours > 0) {
        return `${hours}:${minutes}:${seconds}`
    } else {
        return `${minutes}:${seconds}`
    }
}

var rootEl = document.querySelector(':root');
function getVariable(variable = '--primaryKey') {
    var allStyle = getComputedStyle(rootEl);
    allStyle.getPropertyValue(variable);
}
function setVariable(variable, value) {
    rootEl.style.setProperty(variable, value);
}


// Load trang
function loadSongInList() {
    playlistEl.innerHTML = playlists.map(function (song, index) {
        return renderSong(song);
    }).join('');
}

function renderSong(song) {
    return `<div class="song">
        <div class="image">
            <img src="${song.image}" alt="">
            <div class="play-line">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        
        <div class="info">
            <h3>${song.title}</h3>
        </div>
    </div>`
}

function loadSongStart() {
    // reset luôn
    resetLyricVariable();
    let indexActive = Array.from(playlistEl.children).findIndex(song => song.classList.contains('playing'));
    if (indexActive != -1) {
        Array.from(playlistEl.children)[indexActive].classList.remove('playing')
    }

    var indexElAddPlaying = Array.from(playlistEl.children).findIndex(function (song, index) {
        return index === songIndexCurrent;
    })
    if (indexElAddPlaying != -1) {
        songElCurrent = Array.from(playlistEl.children)[songIndexCurrent];
        Array.from(playlistEl.children)[songIndexCurrent].classList.add('playing');
        var { offsetTop: sot } = songElCurrent.getRect();
        var { offsetTop: pot } = playlistEl.getRect();
        var offsetTopCurrent = sot - pot;
        playlistEl.scrollTo({
            behavior: "smooth",
            top: offsetTopCurrent
        })

    }

    var songCurrent = playlists[songIndexCurrent];
    addInfoKaraokeContent();
    // Thêm luôn dữ liệu
    audioEl.src = songCurrent.url;
    if (songCurrent.urlKaraoke) {
        audioKaraokeEl.src = songCurrent.urlKaraoke;
        buttonKaraoke.removeAttribute('hidden');
        initAudioKaraoke();
    } else {
        buttonKaraoke.setAttribute('hidden', '');
        audioKaraokeEl.src = '';
        isKaraoke = false;
    }
    // Thay đổi dữ liệu cho lyrics đồng bộ
    if (songCurrent.lyrics) {
        if (!Array.isArray(songCurrent.lyrics[0].words)) {
            songCurrent.lyrics = songCurrent.lyrics.reduce(function (newArray, lyric, index) {
                var endTime = 0;
                if (!songCurrent.lyrics[index + 1] && lyric.words.trim() === '') {
                    endTime = +lyric.startTimeMs + 500;
                } else {
                    endTime = (lyric.endTimeMs != 0 && lyric.endTimeMs) ? lyric.endTimeMs : songCurrent.lyrics[index + 1].startTimeMs
                }
                var words = [
                    {
                        data: lyric.words,
                        startTime: lyric.startTimeMs,
                        endTime: endTime - (Math.floor(Math.random() * 1000 + 500))
                    }
                ];
                newArray.push({ words });
                return newArray;
            }, [])
        }
        addOrRemoveIconStartKaraoke(false)
    }
    changeTitle.innerText = songCurrent.title;

    document.body.style.setProperty('--url-image', `url('../${songCurrent.image.replace('./assets/', '')}')`);
}

function addInfoKaraokeContent() {
    console.log(playlists[songIndexCurrent].lyrics);
    karaokeContentEl.insertAdjacentHTML('afterbegin', setDataDefaultKaraoke(playlists[songIndexCurrent].lyrics ?? false));
    songCurrentInfoEl = karaokeContentEl.querySelector('.song-current');
}

function setDataDefaultKaraoke(hasLyrics = true) {
    return `<div class="song-current">
                <div class="name">${playlists[songIndexCurrent].title ?? 'Đang cập nhật'}</div>
                <div class="author">${playlists[songIndexCurrent]?.author ?? 'Đang cập nhật'}</div>
            </div>${hasLyrics ? '' : '<div class="no-lyrics">Xin lỗi lời bài hát này chưa được cập nhật</div>'}`
}

function addOrRemoveIconStartKaraoke(isRemove = true) {
    if (!playlists[songIndexCurrent].lyrics) {
        return false;
    }
    var lyricFirst = playlists[songIndexCurrent].lyrics[0].words;
    var wordFirst = lyricFirst[0];
    var step = 1000;
    var initialValue = 8000
    if (wordFirst.startTime < 1000) {
        initialValue = wordFirst.startTime
        step = 100;
    }

    if (isRemove) {
        playlists[songIndexCurrent].lyrics[0].words = playlists[songIndexCurrent].lyrics[0].words.slice(3);
        return false;
    }


    playlists[songIndexCurrent].lyrics[0].words.unshift({
        data: `<i class="fa-solid fa-microphone"></i>`,
        startTime: wordFirst.startTime - (initialValue - step),
        endTime: wordFirst.startTime - (initialValue - step * 2)
    }, {
        data: `<i class="fa-solid fa-microphone"></i>`,
        startTime: wordFirst.startTime - (initialValue - step * 3),
        endTime: wordFirst.startTime - (initialValue - step * 4)
    }, {
        data: `<i class="fa-solid fa-microphone"></i>`,
        startTime: wordFirst.startTime - (initialValue - step * 5),
        endTime: wordFirst.startTime - 500,
    })
}


/// Karaoke 
//Search
function showLyricKaraoke() {
    if (!playlists[songIndexCurrent].lyrics) {
        buttonGetLyric.style.display = "block"
        return false
    } else if (buttonGetLyric.style.display !== 'none') {
        buttonGetLyric.style.display = "none"
    };

    /**
     * Kiểm tra kiểu lyrics 
     * convert hết về kiểu của zing là xọng
     * 
     */
    var lyrics = playlists[songIndexCurrent].lyrics;
    var milliseconds = audioEl.currentTime * 1000;
    var lyricIndex = (milliseconds <= 1000 || !currentIndexLyric || !timeStartLyricNext || milliseconds >= timeEndLyricCurrent) ? indexLyricZingMP3(lyrics) : currentIndexLyric;

    if (lyricIndex !== -1) {
        /**
         * 2 Dòng
         * Dòng 1: 
         * Dòng 2: Chạy sau khi dòng 1 xong 
         * Dòng 1 chạy xong thay đổi index của dòng 1 thành dòng 2 
         * index đầu = 0; 
         * Chẵn trước 
         * Lẻ sau
         */
        songCurrentInfoEl && songCurrentInfoEl.setAttribute('hidden', 'hidden');
        zingMP3Lyric(lyricIndex);
    } else if (lyrics.length - 1 === currentIndexLyric || !elementLyricCurrent || (milliseconds < timeStartLyricNext && milliseconds > timeEndLyricCurrent && timeStartLyricNext - milliseconds > 10000)) {
        songCurrentInfoEl.removeAttribute('hidden');
        if (!karaokeContentEl.hasAttribute('hidden')) {
            checkDataLyric()
        }
    }
}

function indexLyricZingMP3(lyrics) {
    var milliseconds = audioEl.currentTime * 1000;
    return lyrics.findIndex(function (current) {
        var words = current.words;
        if (milliseconds <= 1000 && words[0].startTime < 1000) {
            return true;
        }
        if (milliseconds >= words[0].startTime && milliseconds <= words[words.length - 1].endTime) {
            return true;
        }
    })
}

function zingMP3Lyric(lyricIndex) {
    if (currentIndexLyric !== lyricIndex) {
        wordsCurrent = getLyricIndex(lyricIndex);
        wordsNext = getLyricIndex(lyricIndex + 1);
        if (!elementLyric) {
            elementLyric = createElementKaraokeZingMP3(lyricIndex % 2 === 0 ? wordsCurrent : wordsNext);
            karaokeContentEl.append(elementLyric.html);
        }
        if (!elementLyricNext) {
            elementLyricNext = createElementKaraokeZingMP3(lyricIndex % 2 === 0 ? wordsNext : wordsCurrent);
            karaokeContentEl.append(elementLyricNext.html);
        }
        if (wordsCurrent && wordsCurrent.words) {
            timeEndLyricCurrent = wordsCurrent.words[wordsCurrent.words.length - 1].endTime;
        }
        if (wordsNext && wordsNext.words) {
            timeStartLyricNext = wordsNext.words[wordsNext.words.length - 1].startTime;
        }

        if (lyricIndex % 2 === 0 && elementLyricNext && elementLyricNext.html) {
            elementLyricNext = getLyricDataZingMP3(wordsNext, {
                elements: [],
                html: elementLyricNext.html
            });
            elementLyricCurrent = elementLyric;
            animationLyric = elementLyricNext.html.animate([{
                opacity: 0
            }], {
                duration: 400,
                fill: "forwards"
            });

            animationLyric.finished.then(function (res) {
                appendNewDataZingMP3(elementLyricNext);
                return true;
            }).then(function (res) {
                if (elementLyricNext && elementLyricNext.html) {
                    elementLyricNext.html.animate([{
                        opacity: 1
                    }], {
                        duration: 400,
                        fill: "forwards"
                    });
                }
            })

        } else if (elementLyric && elementLyric.html) {
            elementLyric = getLyricDataZingMP3(wordsNext, {
                elements: [],
                html: elementLyric.html
            });
            elementLyricCurrent = elementLyricNext;
            animationLyric = elementLyric.html.animate([{
                opacity: 0
            }], {
                duration: 200,
                fill: "forwards"
            })

            animationLyric.finished.then(function (res) {
                appendNewDataZingMP3(elementLyric);
                return true;
            }).then(function (res) {
                if (elementLyric && elementLyric.html) {
                    elementLyric.html.animate([{
                        opacity: 1
                    }], {
                        duration: 200,
                        fill: "forwards"
                    })
                }
            })
        }
    }

    if (elementLyricCurrent) {
        changeWidthLyricCurrent();
    }
    currentIndexLyric = lyricIndex;
}

function changeWidthLyricCurrent() {
    if (!elementLyricCurrent) {
        return false;
    }
    const milliseconds = audioEl.currentTime * 1000;
    var indexElement = elementLyricCurrent.elements.findIndex(function (element) {
        if (milliseconds >= element.startTime && milliseconds <= element.endTime) {
            return true;
        }
    })
    if (indexElement !== -1) {
        const element = elementLyricCurrent.elements[indexElement]
        var totalTime = element.endTime - element.startTime;
        var percent = (milliseconds - element.startTime) / totalTime * 100;
        if (percent > 100) {
            percent = 100;
        }
        element.main.style.width = `${percent}%`;
    }
    elementLyricCurrent.elements = elementLyricCurrent.elements.filter(function (element) {
        if (milliseconds >= element.endTime) {
            element.main.style.width = `100%`;
            element.main.style.animation = `width 150ms linear`;
            return false;
        }
        return true;
    })
}

function getLyricDataZingMP3(lyrics, dataLyric) {
    if (lyrics) {
        lyrics.words.forEach(function (word) {
            var spanWord = document.createElement('span');
            spanWord.classList.add('word');
            var spanWordMain = document.createElement('span');
            spanWord.innerHTML = word.data;
            spanWordMain.innerHTML = word.data;
            spanWord.append(spanWordMain);
            dataLyric.elements.push({
                element: spanWord,
                main: spanWordMain,
                startTime: word.startTime,
                endTime: word.endTime,
            });
        })
    }
    return dataLyric;
}
function appendNewDataZingMP3(dataLyric) {
    if (dataLyric) {
        dataLyric.html.innerHTML = '';
        dataLyric.elements.forEach(function (data) {
            dataLyric.html.append(data.element);
        })
    }
    return dataLyric;
}

function setDataLyricZingMP3(element) {
    element.html.remove();
}

function checkDataLyric() {
    if (elementLyric) {
        setDataLyricZingMP3(elementLyric);
        elementLyric = null;
    }
    if (elementLyricNext) {
        setDataLyricZingMP3(elementLyricNext);
        elementLyricNext = null;
    }
    if (elementLyricCurrent) {
        setDataLyricZingMP3(elementLyricCurrent)
        elementLyricCurrent = null;
    }

}

function checkTimeLyric() {
    timeEndLyricCurrent = null;
    timeStartLyricNext = null;
}

function createElementKaraokeZingMP3(lyrics) {
    var dataLyric = {
        elements: [],
        html: ""
    };
    var divWords = document.createElement('div');
    divWords.classList.add('words');
    dataLyric.html = divWords;
    dataLyric = getLyricDataZingMP3(lyrics, dataLyric);
    return appendNewDataZingMP3(dataLyric);
}

function getLyricIndex(index) {
    return playlists[songIndexCurrent].lyrics[index];
}



function resetLyricVariable() {
    totalTimeLyricCurrent = null;
    currentIndexLyric = null;
    lyricsCurrent = null;
    wordsCurrent = null;
    wordsNext = null;
    elementLyric = null;
    elementLyricNext = null;
    elementLyricCurrent = null;
    songCurrentInfoEl = null;
    timeStartLyricNext = null;
    timeEndLyricCurrent = null;
    karaokeContentEl.innerHTML = '';
}
// animationFrame = requestAnimationFrame(timeUpdateHandle)

/**
 * 
 * 
 * Thêm tính năng kiểm tra thoát trang
 */
// Fix lỗi khi kéo && cấm mở develop tool
// document.addEventListener('mousemove', function (e) {
//     e.preventDefault();
// })

// document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
// })

document.addEventListener('keydown', function (e) {
    // if (e.which === 123 || (e.ctrlKey && e.shiftKey && e.which === 73)) {
    //     while (true) {
    //         debugger;
    //     }
    // }
    // e.preventDefault();
    if (e.which === 37) {
        audioEl.currentTime -= 1;
    }
    if (e.which === 39) {
        audioEl.currentTime += 1;
    };

    if (e.which === 38) {
        percentVolumeCurrent += 10;
    }

    if (e.which === 40) {
        percentVolumeCurrent -= 10;
    }

    if (e.which === 40 || e.which === 38) {
        percentVolumeCurrent = checkPercent(percentVolumeCurrent);
        changeHeightProcess(percentVolumeCurrent);
        percentVolumeUpdate();
        changeIconVolume()
    }

    if (e.which === 32) {
        e.preventDefault();
        buttonPlayer.click();
    }

    if (e.which === 75) {
        lyricKaraoke.click();
    }

    if (e.which === 78) {
        buttonNext.click();
    }
    if (e.which === 66 || e.which === 80) {
        buttonPrev.click();
    }

    if (e.which === 173) {
        volumeIcon.click();
    }

    if (e.which === 82 || e.which === 83) {
        buttonShuffle.click();
    }

    if (e.which === 76 || e.which === 79) {
        buttonLoop.click();
    }
})

// window.onbeforeunload = function (event) {
//     if (isPlay) {
//         return confirm("Confirm refresh");
//     }
// };

//Chỉ nên dùng cho video
// document.addEventListener("visibilitychange", () => {
//     if (document.visibilityState === "visible") {
//         if (isPlay) {
//             audioEl.play();
//         }
//     } else {
//         audioEl.pause();
//     }
// });

/**
 * 
 * Cần xử lý khi mở karaoke thì đổi thành link khác
 * 
 */
window.addEventListener('DOMContentLoaded', function () {
    fetch('./assets/data/songs.json').then(function (res) {
        return res.json();
    }).then(function (res) {
        playlists = res;
        //Load list
        loadSongInList();
        //Add Url One
        loadSongStart();
        initAudio();


        changeIconPlay();
        changeIconVolume()
        changeHeightProcess(percentVolumeCurrent);
    })
})