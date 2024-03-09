var putils = {
    generateAdsParam: function (type) {
        var paramStr = "";
        var date = new Date();
        var date2 = new Date(1970, 0, 1, 0, 0, 0, 0);
        var timeStamp = date - date2;
        var sceretKey = "34vcgj8,ggh@344567gfvntrt!@46";
        var token = "";

        timeStamp = Math.round(timeStamp / 1000);
        token = md5(type + timeStamp + sceretKey);
        paramStr += "type=" + type + "&time=" + timeStamp + "&token=" + token;
        return paramStr;
    },
    arrayRandom: "",
    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    replaceTwoObject: function (obj1, obj2) {
        var obj = {};
        return obj;
    },
    addZero: function (num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },
    getTypeVideo: function (link) {
        try {
            if (link.lastIndexOf("m3u8") == link.length - 4) {
                return "m3u8";
            }
            return "mp4";
        } catch (e) {
            console.log("checkTypeVideo" + e);
        }
    },
    formatTime: function (seconds) {
        if (!isNaN(seconds)) {
            seconds = Math.round(seconds);
            minutes = Math.floor(seconds / 60);
            minutes = minutes >= 10 ? minutes : "0" + minutes;
            seconds = Math.floor(seconds % 60);
            seconds = seconds >= 10 ? seconds : "0" + seconds;
            return minutes + ":" + seconds;
        } else {
            return "";
        }
    },
    formatNumber: function (number) {
        if (
            typeof number !== "undefined" &&
            number !== null &&
            number !== ""
        ) {
            var numString = number.toString();
            if (numString.length > 3) {
                var newNumber = "";
                var mod = numString.length % 3;
                for (var i = 0; i < numString.length; i++) {
                    newNumber += numString.charAt(i);
                    if ((i + 1) % 3 == mod && i !== numString.length - 1)
                        newNumber += ".";
                }
                return newNumber;
            }
            return number;
        } else {
            return 0;
        }
    },
    isiPhone: function () {
        return (
            navigator.userAgent.toLowerCase().indexOf("iphone") != -1 ||
            navigator.userAgent.toLowerCase().indexOf("ipod") != -1
        );
    },
    isBB10: function () {
        return (
            navigator.userAgent.toLowerCase().indexOf("blackberry") != -1 &&
            navigator.platform.toLowerCase().indexOf("10") != -1
        );
    },
    isiPad: function () {
        return navigator.userAgent.toLowerCase().indexOf("ipad") != -1;
    },
    isAndroid: function () {
        return (
            navigator.userAgent.toLowerCase().indexOf("android") != -1 ||
            navigator.platform.toLowerCase().indexOf("android") != -1
        );
    },
    isFirefox: function () {
        return navigator.userAgent.toLowerCase().indexOf("firefox") != -1;
    },
    isAndroid4: function () {
        var ua = navigator.userAgent;
        if (ua.toLowerCase().indexOf("android") >= 0) {
            var androidversion = parseFloat(
                ua.slice(ua.toLowerCase().indexOf("android") + 8)
            );
            if (androidversion >= 4) {
                return true;
            }
        }
        return false;
    },
    isWP8: function () {
        return (
            (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1 ||
                navigator.userAgent.toLowerCase().indexOf("windowsphone") != -1 ||
                navigator.platform.toLowerCase().indexOf("wp") != -1) &&
            navigator.userAgent.toLowerCase().indexOf("8") != -1
        );
    },
    isWP7: function () {
        return (
            (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1 ||
                navigator.userAgent.toLowerCase().indexOf("windowsphone") != -1 ||
                navigator.platform.toLowerCase().indexOf("wp") != -1) &&
            navigator.userAgent.toLowerCase().indexOf("7") != -1
        );
    },
    isSafari: function () {
        return (
            navigator.userAgent.toLowerCase().indexOf("applewebkit") != -1 &&
            navigator.userAgent.toLowerCase().indexOf("safari") == -1
        );
    },
    isMobileDevice: function () {
        var check = false;
        if (
            putils.isiPad() ||
            putils.isiPhone() ||
            putils.isAndroid() ||
            putils.isWP7() ||
            putils.isWP8() ||
            putils.isBB10()
        ) {
            check = true;
        }
        return check;
    },
    isSafariMacOS11: function () {
        var check =
            navigator.userAgent.toLowerCase().indexOf("mac os x") != -1 &&
            navigator.userAgent.toLowerCase().indexOf("version/11.0") != -1 &&
            navigator.userAgent.toLowerCase().indexOf("safari") != -1;
        if (check) {
            //console.log("IS MAC OS SAFARI 11", true);
        }
        return check;
    },
    support: {
        touch:
            (window.Modernizr && Modernizr.touch === true) ||
            (function () {
                return !!(
                    "ontouchstart" in window ||
                    (window.DocumentTouch && document instanceof DocumentTouch)
                );
            })(),
        transforms3d:
            (window.Modernizr && Modernizr.csstransforms3d === true) ||
            (function () {
                var div = document.createElement("div").style;
                return (
                    "webkitPerspective" in div ||
                    "MozPerspective" in div ||
                    "OPerspective" in div ||
                    "MsPerspective" in div ||
                    "perspective" in div
                );
            })(),
        transforms:
            (window.Modernizr && Modernizr.csstransforms === true) ||
            (function () {
                var div = document.createElement("div").style;
                return (
                    "transform" in div ||
                    "WebkitTransform" in div ||
                    "MozTransform" in div ||
                    "msTransform" in div ||
                    "MsTransform" in div ||
                    "OTransform" in div
                );
            })(),
        transitions:
            (window.Modernizr && Modernizr.csstransitions === true) ||
            (function () {
                var div = document.createElement("div").style;
                return (
                    "transition" in div ||
                    "WebkitTransition" in div ||
                    "MozTransition" in div ||
                    "msTransition" in div ||
                    "MsTransition" in div ||
                    "OTransition" in div
                );
            })(),
        tagVideo: function () {
            var test_video = document.createElement("video");
            var test = test_video.play ? true : false;
            if (
                window.navigator.platform.toLowerCase().indexOf("linux") != -1 &&
                putils.isFirefox()
            ) {
                test = false;
            }
            return test;
        },
        tagAudio: function () {
            var test_video = document.createElement("audio");
            var test = test_video.play ? true : false;
            if (test) {
                var a = document.createElement("audio");
                return !!(
                    a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, "")
                );
            } else {
                return false;
            }
            //            if (window.navigator.platform.toLowerCase().indexOf("linux") != -1 && putils.isFirefox()) {
            //                test = false;
            //            }
        },
    },
    browser: {
        ie8: (function () {
            var rv = -1; // Return value assumes failure.
            if (navigator.appName == "Microsoft Internet Explorer") {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
            }
            return rv != -1 && rv < 9;
        })(),
        ie10: window.navigator.msPointerEnabled,
        ie11: window.navigator.pointerEnabled,
        isIE: function () {
            return (
                navigator.userAgent.toLowerCase().indexOf("msie") != -1 ||
                navigator.userAgent.toLowerCase().indexOf(".net") != -1 ||
                putils.isWP8() ||
                putils.isWP7()
            );
        },
    },
    mouseStart: function () {
        if (this.browser.ie10) return "MSPointerDown";
        if (this.browser.ie11) return "pointerdown";
        return "mousedown";
    },
    touchStart: function () {
        var desktopEvents = ["MSPointerDown", "MSPointerMove", "MSPointerUp"];
        if (this.browser.ie11)
            desktopEvents = ["pointerdown", "pointermove", "pointerup"];
        return this.support.touch ? "touchstart" : desktopEvents[0];
    },
    touchEnd: function () {
        var desktopEvents = ["MSPointerDown", "MSPointerMove", "MSPointerUp"];
        if (this.browser.ie11)
            desktopEvents = ["pointerdown", "pointermove", "pointerup"];
        return this.support.touch ? "touchend" : desktopEvents[2];
    },
    touchMove: function () {
        var desktopEvents = ["MSPointerDown", "MSPointerMove", "MSPointerUp"];
        if (this.browser.ie11)
            desktopEvents = ["pointerdown", "pointermove", "pointerup"];
        return this.support.touch ? "touchmove" : desktopEvents[1];
    },
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    parseXml: function (xmlStr) {
        try {
            return new window.DOMParser().parseFromString(xmlStr, "text/xml");
        } catch (e) {
            console.log(e);
        }
        return "";
    },
    supportFlash: function () {
        var hasFlash = false;
        try {
            var fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (fo) {
                hasFlash = true;
            }
        } catch (e) {
            if (
                navigator.mimeTypes &&
                typeof navigator.mimeTypes["application/x-shockwave-flash"] !=
                "undefined" &&
                navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
            ) {
                hasFlash = true;
            }
        }
        return hasFlash;
    },
    handleErrorImage: function (elem) {
        if (
            (typeof elem.onerror === "function" && state === "fail") ||
            elem.width === 0
        ) {
            elem.src = "http://stc.id.nixcdn.com/v/images/img-video-full.png";
        }
    },
    rc4: function (key, str) {
        var s = [],
            j = 0,
            x,
            res = "";
        for (var i = 0; i < 256; i++) {
            s[i] = i;
        }
        for (i = 0; i < 256; i++) {
            j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
        }
        i = 0;
        j = 0;
        for (var y = 0; y < str.length; y++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
            res += String.fromCharCode(
                str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]
            );
        }
        return res;
    },
    hexFromString: function (str) {
        str += "nct";
        var arr = [];
        for (var i = 0, l = str.length; i < l; i++) {
            var hex = Number(str.charCodeAt(i)).toString(16);
            arr.push(hex);
        }
        return arr.join("");
    },
    hexToArray: function (str) {
        var result = [];
        while (str.length >= 2) {
            result.push(parseInt(str.toString().substring(0, 2), 16));
            str = str.toString().substring(2, str.length);
        }
        return result;
    },
    hexFromArray: function (array) {
        //console.log(array);
        var s = "";
        for (i = 0; i < array.length; i++) {
            try {
                if (i == 0) {
                    if (typeof utf8char[array[i]] != "undefined") {
                        s += utf8char[array[i] + ""];
                    }
                } else {
                    if (array[i] >= 224) {
                        if (
                            utf8char[
                            array[i] + " " + array[i + 1] + " " + array[i + 2]
                            ] != undefined
                        ) {
                            s +=
                                utf8char[
                                array[i] + " " + array[i + 1] + " " + array[i + 2]
                                ];
                        }
                    } else if (array[i] >= 128) {
                        if (utf8char[array[i] + " " + array[i + 1]] != undefined) {
                            s += utf8char[array[i] + " " + array[i + 1]];
                        }
                    } else {
                        if (
                            (i > 0 && array[i - 1] < 128) ||
                            (i > 1 && array[i - 2] < 200)
                        ) {
                            if (utf8char[array[i]] != undefined) {
                                s += utf8char[array[i] + ""];
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        var st = "";
        for (i = 0; i < s.length; i++) {
            if (i > 0 && s.charAt(i) == "[" && s.charAt(i - 1) != "]") {
                st += "\n" + s.charAt(i);
            } else {
                st += s.charAt(i);
            }
        }
        return st;
    },
    getQueryVariable: function (link, variable) {
        if (
            link.indexOf("?") > -1 &&
            typeof link.split("?")[1] != "undefined"
        ) {
            var query = link.split("?")[1];
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
        }
        return "";
        //console.log('Query variable %s not found', variable);
    },
};

var arc4 = function () {
    this.i = 0;
    this.j = 0;
    this.S = [];
    this.psize = 256;

    this.load = function (key) {
        this.S = [];
        if (key) {
            this.init(key);
        }
    };

    this.init = function (key) {
        var i = 0;
        var j = 0;
        var t = 0;
        for (i = 0; i < 256; ++i) {
            this.S[i] = i;
        }
        j = 0;
        for (i = 0; i < 256; ++i) {
            j = (j + this.S[i] + key[i % key.length]) & 255;
            t = this.S[i];
            this.S[i] = this.S[j];
            this.S[j] = t;
        }
        this.i = 0;
        this.j = 0;
    };
    this.next = function () {
        var t = 0;
        this.i = (this.i + 1) & 255;
        this.j = (this.j + this.S[this.i]) & 255;
        t = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t;
        return this.S[(t + this.S[this.i]) & 255];
    };

    this.getBlockSize = function () {
        return 1;
    };

    this.encrypt = function (block) {
        var i = 0;
        while (i < block.length) {
            block[i++] ^= this.next();
        }
        return block;
    };
    this.decrypt = function (block) {
        return this.encrypt(block); // the beauty of XOR.
    };
    this.dispose = function () {
        var i = 0;
        if (this.S != null) {
            for (i = 0; i < this.S.length; i++) {
                this.S[i] = Math.random() * 256;
            }
            this.S.length = 0;
            this.S = null;
        }
        this.i = 0;
        this.j = 0;
    };
};

var md5 = (function () {
    function e(e, t) {
        var o = e[0],
            u = e[1],
            a = e[2],
            f = e[3];
        o = n(o, u, a, f, t[0], 7, -680876936);
        f = n(f, o, u, a, t[1], 12, -389564586);
        a = n(a, f, o, u, t[2], 17, 606105819);
        u = n(u, a, f, o, t[3], 22, -1044525330);
        o = n(o, u, a, f, t[4], 7, -176418897);
        f = n(f, o, u, a, t[5], 12, 1200080426);
        a = n(a, f, o, u, t[6], 17, -1473231341);
        u = n(u, a, f, o, t[7], 22, -45705983);
        o = n(o, u, a, f, t[8], 7, 1770035416);
        f = n(f, o, u, a, t[9], 12, -1958414417);
        a = n(a, f, o, u, t[10], 17, -42063);
        u = n(u, a, f, o, t[11], 22, -1990404162);
        o = n(o, u, a, f, t[12], 7, 1804603682);
        f = n(f, o, u, a, t[13], 12, -40341101);
        a = n(a, f, o, u, t[14], 17, -1502002290);
        u = n(u, a, f, o, t[15], 22, 1236535329);
        o = r(o, u, a, f, t[1], 5, -165796510);
        f = r(f, o, u, a, t[6], 9, -1069501632);
        a = r(a, f, o, u, t[11], 14, 643717713);
        u = r(u, a, f, o, t[0], 20, -373897302);
        o = r(o, u, a, f, t[5], 5, -701558691);
        f = r(f, o, u, a, t[10], 9, 38016083);
        a = r(a, f, o, u, t[15], 14, -660478335);
        u = r(u, a, f, o, t[4], 20, -405537848);
        o = r(o, u, a, f, t[9], 5, 568446438);
        f = r(f, o, u, a, t[14], 9, -1019803690);
        a = r(a, f, o, u, t[3], 14, -187363961);
        u = r(u, a, f, o, t[8], 20, 1163531501);
        o = r(o, u, a, f, t[13], 5, -1444681467);
        f = r(f, o, u, a, t[2], 9, -51403784);
        a = r(a, f, o, u, t[7], 14, 1735328473);
        u = r(u, a, f, o, t[12], 20, -1926607734);
        o = i(o, u, a, f, t[5], 4, -378558);
        f = i(f, o, u, a, t[8], 11, -2022574463);
        a = i(a, f, o, u, t[11], 16, 1839030562);
        u = i(u, a, f, o, t[14], 23, -35309556);
        o = i(o, u, a, f, t[1], 4, -1530992060);
        f = i(f, o, u, a, t[4], 11, 1272893353);
        a = i(a, f, o, u, t[7], 16, -155497632);
        u = i(u, a, f, o, t[10], 23, -1094730640);
        o = i(o, u, a, f, t[13], 4, 681279174);
        f = i(f, o, u, a, t[0], 11, -358537222);
        a = i(a, f, o, u, t[3], 16, -722521979);
        u = i(u, a, f, o, t[6], 23, 76029189);
        o = i(o, u, a, f, t[9], 4, -640364487);
        f = i(f, o, u, a, t[12], 11, -421815835);
        a = i(a, f, o, u, t[15], 16, 530742520);
        u = i(u, a, f, o, t[2], 23, -995338651);
        o = s(o, u, a, f, t[0], 6, -198630844);
        f = s(f, o, u, a, t[7], 10, 1126891415);
        a = s(a, f, o, u, t[14], 15, -1416354905);
        u = s(u, a, f, o, t[5], 21, -57434055);
        o = s(o, u, a, f, t[12], 6, 1700485571);
        f = s(f, o, u, a, t[3], 10, -1894986606);
        a = s(a, f, o, u, t[10], 15, -1051523);
        u = s(u, a, f, o, t[1], 21, -2054922799);
        o = s(o, u, a, f, t[8], 6, 1873313359);
        f = s(f, o, u, a, t[15], 10, -30611744);
        a = s(a, f, o, u, t[6], 15, -1560198380);
        u = s(u, a, f, o, t[13], 21, 1309151649);
        o = s(o, u, a, f, t[4], 6, -145523070);
        f = s(f, o, u, a, t[11], 10, -1120210379);
        a = s(a, f, o, u, t[2], 15, 718787259);
        u = s(u, a, f, o, t[9], 21, -343485551);
        e[0] = m(o, e[0]);
        e[1] = m(u, e[1]);
        e[2] = m(a, e[2]);
        e[3] = m(f, e[3]);
    }
    function t(e, t, n, r, i, s) {
        t = m(m(t, e), m(r, s));
        return m((t << i) | (t >>> (32 - i)), n);
    }
    function n(e, n, r, i, s, o, u) {
        return t((n & r) | (~n & i), e, n, s, o, u);
    }
    function r(e, n, r, i, s, o, u) {
        return t((n & i) | (r & ~i), e, n, s, o, u);
    }
    function i(e, n, r, i, s, o, u) {
        return t(n ^ r ^ i, e, n, s, o, u);
    }
    function s(e, n, r, i, s, o, u) {
        return t(r ^ (n | ~i), e, n, s, o, u);
    }
    function o(t) {
        var n = t.length,
            r = [1732584193, -271733879, -1732584194, 271733878],
            i;
        for (i = 64; i <= t.length; i += 64) {
            e(r, u(t.substring(i - 64, i)));
        }
        t = t.substring(i - 64);
        var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < t.length; i++)
            s[i >> 2] |= t.charCodeAt(i) << (i % 4 << 3);
        s[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
            e(r, s);
            for (i = 0; i < 16; i++) s[i] = 0;
        }
        s[14] = n * 8;
        e(r, s);
        return r;
    }
    function u(e) {
        var t = [],
            n;
        for (n = 0; n < 64; n += 4) {
            t[n >> 2] =
                e.charCodeAt(n) +
                (e.charCodeAt(n + 1) << 8) +
                (e.charCodeAt(n + 2) << 16) +
                (e.charCodeAt(n + 3) << 24);
        }
        return t;
    }
    function c(e) {
        var t = "",
            n = 0;
        for (; n < 4; n++)
            t += a[(e >> (n * 8 + 4)) & 15] + a[(e >> (n * 8)) & 15];
        return t;
    }
    function h(e) {
        for (var t = 0; t < e.length; t++) e[t] = c(e[t]);
        return e.join("");
    }
    function d(e) {
        return h(o(unescape(encodeURIComponent(e))));
    }
    function m(e, t) {
        return (e + t) & 4294967295;
    }
    var a = "0123456789abcdef".split("");
    return d;
})();

var __language = {
    errorParseXml: "Không thể parse được file xml",
    errorLoadXml: "Không thể load được file xml",
    errorNetwork:
        "Có lỗi xảy ra với Internet. Vui lòng kiểm tra lại kết nối của bạn hoặc refresh lại trang.",
    fullScreen: "Toàn màn hình",
    listRecommend: "Playlist",
    update_browser:
        "Trình duyệt của bạn quá cũ không hỗ trợ định dạng Video này. Vui lòng nâng cấp trình duyệt.",
    loading: "Đang tải...",
    off: "Tắt",
    configReplay: "",
    repeatAll: "Lặp tất cả",
    noRepeat: "Không lặp",
    repeat: "Lặp",
    repeatOne: "Lặp một bài",
};

var KaraokeNCT = function () {
    this.pe = "";

    this.load = function (pe) {
        __debug.log("ParseSRT.load", pe);
        this.pe = pe;
        if (__data[pe].peConfig.lyricStatus) {
            __data[pe].peConfig.lyricStatus = false;
            $.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.overrideMimeType("text/text; charset=UTF-8");
                },
            });

            var listUrlLyric = __data[pe].curMp3Item.lyric;
            if (
                listUrlLyric != "" &&
                listUrlLyric.toString().indexOf("null") == -1
            ) {
                this.getLyric(listUrlLyric);
                //$("#" + pe).height("345px");
                //changesizeLyricLarge();
                __data[pe].peConfig.lyricTempStatus = true;
            } else {
                /*
                 * hard code roll
                 */
                //$("#" + pe).height("286px");
                //changesizeLyricSmall();
                //__data[pe].peConfig.lyricTempStatus = false;
                __data[pe].peConfig.lyricTempStatus = true;
            }
            __data[pe].peConfig.lyricStatus = true;
        }
    };

    this.getLyric = async function (urlLyric) {
        var self = this;
        dataLyric = [];
        var response = await fetch(urlLyric);
        try {
            var data = await response.text();
        } catch (err) {
            return false;
        }

        var a = putils.hexToArray(data);
        var b = putils.hexToArray(putils.hexFromString("Lyr1cjust4"));
        var c = new arc4();
        c.load(b);
        var d = c.decrypt(a);
        data = putils.hexFromArray(d);
        dataLyric = self.parseLrc(data);
        return toLyricSpotify(dataLyric);
    };

    this.parseLrc = function (data) {
        try {
            if (typeof data != "undefined" && data != "" && data != null) {
                var lrc = data.replace(/\r+/g, ""); // remove dos newlines
                lrc = lrc.replace(/\n+/g, "\n"); // remove empty lines
                lrc = lrc.replace(/^\s+|\s+$/g, ""); // trim white space start and end
                lrc = lrc.replace(/<[a-zA-Z\/][^>]*>/g, ""); // remove all html tags for security reasons
                // this last one also removes karaoke style time markup (ok for now)

                var arrSaveTemp = [];
                var content2 = "";
                var arrCheckLine = [];
                var arrLines = [];
                var arrTextLine = lrc.split("\n");

                // get lyrics lines
                for (p = 0; p < arrTextLine.length; p++) {
                    var index2 = 0;
                    //reset array
                    arrTempLineLyric = [];
                    do {
                        arrTempLineLyric.push(arrTextLine[p].substr(index2 + 1, 8));
                        index2 = arrTextLine[p].indexOf("[", index2 + 8);
                    } while (index2 != -1);

                    //create lyric lines
                    var minTimes1 = arrTempLineLyric.length; //Math.min(time1Arr.length, time2Arr.length);

                    for (s = 0; s < minTimes1; s++) {
                        var lyricLine4 = {};
                        lyricLine4.id = s;
                        lyricLine4.content = content2;
                        lyricLine4.duration = 0;

                        var totalS =
                            arrTempLineLyric[arrTempLineLyric.length - 1 - s].split(":");
                        totalS = parseFloat(totalS[0]) * 60 + parseFloat(totalS[1]);

                        lyricLine4.start = totalS;

                        arrCheckLine.push(lyricLine4.start);

                        if (lyricLine4.start >= 4) {
                            arrSaveTemp.push(p);
                        }
                    }
                }

                for (i = 0; i < arrTextLine.length; i++) {
                    var index2 = 0;
                    //reset array
                    var time2Arr = [];

                    if (isNaN(arrCheckLine[0])) {
                        do {
                            if (i < arrSaveTemp[1]) {
                                time2Arr.push("00:0" + parseInt(i + 1) + ":00");
                            } else {
                                time2Arr.push(arrTextLine[i].substr(index2 + 1, 8));
                            }

                            index2 = arrTextLine[i].indexOf("[", index2 + 8);

                            //ExternalInterface.call("console.log", "arrTextLine : " +  arrTextLine[i].substr(index2 + 1, 8));
                        } while (index2 != -1);

                        if (
                            arrTextLine[i].lastIndexOf("]") ==
                            arrTextLine[i].length - 1
                        ) {
                            content2 = " ";
                        } else {
                            if (i == 0) {
                                content2 = arrTextLine[0].substring(
                                    4,
                                    parseInt(arrTextLine[0].lastIndexOf("]"))
                                );
                            }
                            if (i == 1) {
                                content2 = arrTextLine[1].substring(
                                    4,
                                    parseInt(arrTextLine[1].lastIndexOf("]"))
                                );
                            }
                            if (i == 2) {
                                content2 = arrTextLine[2].substring(
                                    4,
                                    parseInt(arrTextLine[2].lastIndexOf("]"))
                                );
                            }
                            if (i == 3) {
                                content2 = "";
                            }
                            if (i >= 4) {
                                content2 = arrTextLine[i].substring(
                                    arrTextLine[i].lastIndexOf("]") + 1
                                );
                            }
                        }
                        //create lyric lines
                        var minTimes = time2Arr.length; //Math.min(time1Arr.length, time2Arr.length);

                        for (k = 0; k < minTimes; k++) {
                            var lyricLine = {};
                            lyricLine.id = k;
                            lyricLine.content = content2;
                            //lyricLine.duration = Utils.getTimeDifferent(time2Arr[time2Arr.length - 1 - k], time1Arr[time1Arr.length -1 - k]);
                            lyricLine.duration = 0;

                            var totalS = time2Arr[time2Arr.length - 1 - k].split(":");
                            totalS = parseFloat(totalS[0]) * 60 + parseFloat(totalS[1]);

                            lyricLine.start = totalS - 0.1;
                            arrLines.push(lyricLine);
                        }
                    } else {
                        do {
                            time2Arr.push(arrTextLine[i].substr(index2 + 1, 8));
                            index2 = arrTextLine[i].indexOf("[", index2 + 8);
                        } while (index2 != -1);

                        if (
                            arrTextLine[i].lastIndexOf("]") ==
                            arrTextLine[i].length - 1
                        ) {
                            content2 = " ";
                        } else {
                            content2 = arrTextLine[i].substring(
                                arrTextLine[i].lastIndexOf("]") + 1
                            );
                        }
                        //create lyric lines
                        var minTimes3 = time2Arr.length; //Math.min(time1Arr.length, time2Arr.length);
                        //
                        for (h = 0; h < minTimes3; h++) {
                            var lyricLine3 = {};
                            lyricLine3.id = h;
                            lyricLine3.content = content2;
                            //lyricLine.duration = Utils.getTimeDifferent(time2Arr[time2Arr.length - 1 - k], time1Arr[time1Arr.length -1 - k]);
                            lyricLine3.duration = 0;
                            var totalS = time2Arr[time2Arr.length - 1 - h].split(":");
                            totalS = parseFloat(totalS[0]) * 60 + parseFloat(totalS[1]);

                            lyricLine3.start = totalS - 0.1;

                            arrLines.push(lyricLine3);
                        }
                    }
                }

                //assending sort lyric array by time tag
                arrLines.sort(function (a, b) {
                    if (a.start > b.start) {
                        return 1;
                    } else if (a.start < b.start) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                for (l = 0; l < arrLines.length; l++) {
                    if (l < arrLines.length - 1) {
                        arrLines[l].duration =
                            arrLines[l + 1].start - arrLines[l].start;
                    }
                    /* set all lines in the right position
                     * Showing them is controlled by moving its mask
                     * */
                    if (l % 2 == 0) {
                        arrLines[l].pos = 1;
                    } else {
                        arrLines[l].pos = 2;
                    }
                }
            }
            //console.log(arrLines);
            return arrLines;
        } catch (e) {
            console.log("Lyric wrong style");
        }
    };
};

var utf8char = [];
utf8char["10"] = "";
utf8char["13"] = "\n";
utf8char["32"] = " ";
utf8char["33"] = "!";
utf8char["34"] = '"';
utf8char["35"] = "#";
utf8char["36"] = "$";
utf8char["37"] = "%";
utf8char["38"] = "&";
utf8char["39"] = "'";
utf8char["40"] = "(";
utf8char["41"] = ")";
utf8char["42"] = "*";
utf8char["43"] = "+";
utf8char["44"] = ",";
utf8char["45"] = "-";
utf8char["46"] = ".";
utf8char["47"] = "/";
utf8char["48"] = "0";
utf8char["49"] = "1";
utf8char["50"] = "2";
utf8char["51"] = "3";
utf8char["52"] = "4";
utf8char["53"] = "5";
utf8char["54"] = "6";
utf8char["55"] = "7";
utf8char["56"] = "8";
utf8char["57"] = "9";
utf8char["58"] = ":";
utf8char["59"] = ";";
utf8char["60"] = "<";
utf8char["61"] = "=";
utf8char["62"] = ">";
utf8char["63"] = "?";
utf8char["64"] = "@";
utf8char["65"] = "A";
utf8char["66"] = "B";
utf8char["67"] = "C";
utf8char["68"] = "D";
utf8char["69"] = "E";
utf8char["70"] = "F";
utf8char["71"] = "G";
utf8char["72"] = "H";
utf8char["73"] = "I";
utf8char["74"] = "J";
utf8char["75"] = "K";
utf8char["76"] = "L";
utf8char["77"] = "M";
utf8char["78"] = "N";
utf8char["79"] = "O";
utf8char["80"] = "P";
utf8char["81"] = "Q";
utf8char["82"] = "R";
utf8char["83"] = "S";
utf8char["84"] = "T";
utf8char["85"] = "U";
utf8char["86"] = "V";
utf8char["87"] = "W";
utf8char["88"] = "X";
utf8char["89"] = "Y";
utf8char["90"] = "Z";
utf8char["91"] = "[";
utf8char["92"] = "\\";
utf8char["93"] = "]";
utf8char["94"] = "^";
utf8char["95"] = "_";
utf8char["96"] = "`";
utf8char["97"] = "a";
utf8char["98"] = "b";
utf8char["99"] = "c";
utf8char["100"] = "d";
utf8char["101"] = "e";
utf8char["102"] = "f";
utf8char["103"] = "g";
utf8char["104"] = "h";
utf8char["105"] = "i";
utf8char["106"] = "j";
utf8char["107"] = "k";
utf8char["108"] = "l";
utf8char["109"] = "m";
utf8char["110"] = "n";
utf8char["111"] = "o";
utf8char["112"] = "p";
utf8char["113"] = "q";
utf8char["114"] = "r";
utf8char["115"] = "s";
utf8char["116"] = "t";
utf8char["117"] = "u";
utf8char["118"] = "v";
utf8char["119"] = "w";
utf8char["120"] = "x";
utf8char["121"] = "y";
utf8char["122"] = "z";
utf8char["123"] = "{";
utf8char["124"] = "|";
utf8char["125"] = "}";
utf8char["126"] = "~";
utf8char["127"] = "";
utf8char["194 161"] = "¡";
utf8char["194 162"] = "¢";
utf8char["194 163"] = "£";
utf8char["194 164"] = "¤";
utf8char["194 165"] = "¥";
utf8char["194 166"] = "¦";
utf8char["194 167"] = "§";
utf8char["194 168"] = "¨";
utf8char["194 169"] = "©";
utf8char["194 170"] = "ª";
utf8char["194 171"] = "«";
utf8char["194 172"] = "¬";
utf8char["194 173"] = "";
utf8char["194 174"] = "®";
utf8char["194 175"] = "¯";
utf8char["194 176"] = "°";
utf8char["194 177"] = "±";
utf8char["194 178"] = "²";
utf8char["194 179"] = "³";
utf8char["194 180"] = "´";
utf8char["194 181"] = "µ";
utf8char["194 182"] = "¶";
utf8char["194 183"] = "·";
utf8char["194 184"] = "¸";
utf8char["194 185"] = "¹";
utf8char["194 186"] = "º";
utf8char["194 187"] = "»";
utf8char["194 188"] = "¼";
utf8char["194 189"] = "½";
utf8char["194 190"] = "¾";
utf8char["194 191"] = "¿";
utf8char["195 128"] = "À";
utf8char["195 129"] = "Á";
utf8char["195 130"] = "Â";
utf8char["195 131"] = "Ã";
utf8char["195 132"] = "Ä";
utf8char["195 133"] = "Å";
utf8char["195 134"] = "Æ";
utf8char["195 135"] = "Ç";
utf8char["195 136"] = "È";
utf8char["195 137"] = "É";
utf8char["195 138"] = "Ê";
utf8char["195 139"] = "Ë";
utf8char["195 140"] = "Ì";
utf8char["195 141"] = "Í";
utf8char["195 142"] = "Î";
utf8char["195 143"] = "Ï";
utf8char["195 144"] = "Ð";
utf8char["195 145"] = "Ñ";
utf8char["195 146"] = "Ò";
utf8char["195 147"] = "Ó";
utf8char["195 148"] = "Ô";
utf8char["195 149"] = "Õ";
utf8char["195 150"] = "Ö";
utf8char["195 151"] = "×";
utf8char["195 152"] = "Ø";
utf8char["195 153"] = "Ù";
utf8char["195 154"] = "Ú";
utf8char["195 155"] = "Û";
utf8char["195 156"] = "Ü";
utf8char["195 157"] = "Ý";
utf8char["195 158"] = "Þ";
utf8char["195 159"] = "ß";
utf8char["195 160"] = "à";
utf8char["195 161"] = "á";
utf8char["195 162"] = "â";
utf8char["195 163"] = "ã";
utf8char["195 164"] = "ä";
utf8char["195 165"] = "å";
utf8char["195 166"] = "æ";
utf8char["195 167"] = "ç";
utf8char["195 168"] = "è";
utf8char["195 169"] = "é";
utf8char["195 170"] = "ê";
utf8char["195 171"] = "ë";
utf8char["195 172"] = "ì";
utf8char["195 173"] = "í";
utf8char["195 174"] = "î";
utf8char["195 175"] = "ï";
utf8char["195 176"] = "ð";
utf8char["195 177"] = "ñ";
utf8char["195 178"] = "ò";
utf8char["195 179"] = "ó";
utf8char["195 180"] = "ô";
utf8char["195 181"] = "õ";
utf8char["195 182"] = "ö";
utf8char["195 183"] = "÷";
utf8char["195 184"] = "ø";
utf8char["195 185"] = "ù";
utf8char["195 186"] = "ú";
utf8char["195 187"] = "û";
utf8char["195 188"] = "ü";
utf8char["195 189"] = "ý";
utf8char["195 190"] = "þ";
utf8char["195 191"] = "ÿ";
utf8char["196 128"] = "Ā";
utf8char["196 129"] = "ā";
utf8char["196 130"] = "Ă";
utf8char["196 131"] = "ă";
utf8char["196 132"] = "Ą";
utf8char["196 133"] = "ą";
utf8char["196 134"] = "Ć";
utf8char["196 135"] = "ć";
utf8char["196 136"] = "Ĉ";
utf8char["196 137"] = "ĉ";
utf8char["196 138"] = "Ċ";
utf8char["196 139"] = "ċ";
utf8char["196 140"] = "Č";
utf8char["196 141"] = "č";
utf8char["196 142"] = "Ď";
utf8char["196 143"] = "ď";
utf8char["196 144"] = "Đ";
utf8char["196 145"] = "đ";
utf8char["196 146"] = "Ē";
utf8char["196 147"] = "ē";
utf8char["196 148"] = "Ĕ";
utf8char["196 149"] = "ĕ";
utf8char["196 150"] = "Ė";
utf8char["196 151"] = "ė";
utf8char["196 152"] = "Ę";
utf8char["196 153"] = "ę";
utf8char["196 154"] = "Ě";
utf8char["196 155"] = "ě";
utf8char["196 156"] = "Ĝ";
utf8char["196 157"] = "ĝ";
utf8char["196 158"] = "Ğ";
utf8char["196 159"] = "ğ";
utf8char["196 160"] = "Ġ";
utf8char["196 161"] = "ġ";
utf8char["196 162"] = "Ģ";
utf8char["196 163"] = "ģ";
utf8char["196 164"] = "Ĥ";
utf8char["196 165"] = "ĥ";
utf8char["196 166"] = "Ħ";
utf8char["196 167"] = "ħ";
utf8char["196 168"] = "Ĩ";
utf8char["196 169"] = "ĩ";
utf8char["196 170"] = "Ī";
utf8char["196 171"] = "ī";
utf8char["196 172"] = "Ĭ";
utf8char["196 173"] = "ĭ";
utf8char["196 174"] = "Į";
utf8char["196 175"] = "į";
utf8char["196 176"] = "İ";
utf8char["196 177"] = "ı";
utf8char["196 178"] = "Ĳ";
utf8char["196 179"] = "ĳ";
utf8char["196 180"] = "Ĵ";
utf8char["196 181"] = "ĵ";
utf8char["196 182"] = "Ķ";
utf8char["196 183"] = "ķ";
utf8char["196 184"] = "ĸ";
utf8char["196 185"] = "Ĺ";
utf8char["196 186"] = "ĺ";
utf8char["196 187"] = "Ļ";
utf8char["196 188"] = "ļ";
utf8char["196 189"] = "Ľ";
utf8char["196 190"] = "ľ";
utf8char["196 191"] = "Ŀ";
utf8char["197 128"] = "ŀ";
utf8char["197 129"] = "Ł";
utf8char["197 130"] = "ł";
utf8char["197 131"] = "Ń";
utf8char["197 132"] = "ń";
utf8char["197 133"] = "Ņ";
utf8char["197 134"] = "ņ";
utf8char["197 135"] = "Ň";
utf8char["197 136"] = "ň";
utf8char["197 137"] = "ŉ";
utf8char["197 138"] = "Ŋ";
utf8char["197 139"] = "ŋ";
utf8char["197 140"] = "Ō";
utf8char["197 141"] = "ō";
utf8char["197 142"] = "Ŏ";
utf8char["197 143"] = "ŏ";
utf8char["197 144"] = "Ő";
utf8char["197 145"] = "ő";
utf8char["197 146"] = "Œ";
utf8char["197 147"] = "œ";
utf8char["197 148"] = "Ŕ";
utf8char["197 149"] = "ŕ";
utf8char["197 150"] = "Ŗ";
utf8char["197 151"] = "ŗ";
utf8char["197 152"] = "Ř";
utf8char["197 153"] = "ř";
utf8char["197 154"] = "Ś";
utf8char["197 155"] = "ś";
utf8char["197 156"] = "Ŝ";
utf8char["197 157"] = "ŝ";
utf8char["197 158"] = "Ş";
utf8char["197 159"] = "ş";
utf8char["197 160"] = "Š";
utf8char["197 161"] = "š";
utf8char["197 162"] = "Ţ";
utf8char["197 163"] = "ţ";
utf8char["197 164"] = "Ť";
utf8char["197 165"] = "ť";
utf8char["197 166"] = "Ŧ";
utf8char["197 167"] = "ŧ";
utf8char["197 168"] = "Ũ";
utf8char["197 169"] = "ũ";
utf8char["197 170"] = "Ū";
utf8char["197 171"] = "ū";
utf8char["197 172"] = "Ŭ";
utf8char["197 173"] = "ŭ";
utf8char["197 174"] = "Ů";
utf8char["197 175"] = "ů";
utf8char["197 176"] = "Ű";
utf8char["197 177"] = "ű";
utf8char["197 178"] = "Ų";
utf8char["197 179"] = "ų";
utf8char["197 180"] = "Ŵ";
utf8char["197 181"] = "ŵ";
utf8char["197 182"] = "Ŷ";
utf8char["197 183"] = "ŷ";
utf8char["197 184"] = "Ÿ";
utf8char["197 185"] = "Ź";
utf8char["197 186"] = "ź";
utf8char["197 187"] = "Ż";
utf8char["197 188"] = "ż";
utf8char["197 189"] = "Ž";
utf8char["197 190"] = "ž";
utf8char["197 191"] = "ſ";
utf8char["198 128"] = "ƀ";
utf8char["198 129"] = "Ɓ";
utf8char["198 130"] = "Ƃ";
utf8char["198 131"] = "ƃ";
utf8char["198 132"] = "Ƅ";
utf8char["198 133"] = "ƅ";
utf8char["198 134"] = "Ɔ";
utf8char["198 135"] = "Ƈ";
utf8char["198 136"] = "ƈ";
utf8char["198 137"] = "Ɖ";
utf8char["198 138"] = "Ɗ";
utf8char["198 139"] = "Ƌ";
utf8char["198 140"] = "ƌ";
utf8char["198 141"] = "ƍ";
utf8char["198 142"] = "Ǝ";
utf8char["198 143"] = "Ə";
utf8char["198 144"] = "Ɛ";
utf8char["198 145"] = "Ƒ";
utf8char["198 146"] = "ƒ";
utf8char["198 147"] = "Ɠ";
utf8char["198 148"] = "Ɣ";
utf8char["198 149"] = "ƕ";
utf8char["198 150"] = "Ɩ";
utf8char["198 151"] = "Ɨ";
utf8char["198 152"] = "Ƙ";
utf8char["198 153"] = "ƙ";
utf8char["198 154"] = "ƚ";
utf8char["198 155"] = "ƛ";
utf8char["198 156"] = "Ɯ";
utf8char["198 157"] = "Ɲ";
utf8char["198 158"] = "ƞ";
utf8char["198 159"] = "Ɵ";
utf8char["198 160"] = "Ơ";
utf8char["198 161"] = "ơ";
utf8char["198 162"] = "Ƣ";
utf8char["198 163"] = "ƣ";
utf8char["198 164"] = "Ƥ";
utf8char["198 165"] = "ƥ";
utf8char["198 166"] = "Ʀ";
utf8char["198 167"] = "Ƨ";
utf8char["198 168"] = "ƨ";
utf8char["198 169"] = "Ʃ";
utf8char["198 170"] = "ƪ";
utf8char["198 171"] = "ƫ";
utf8char["198 172"] = "Ƭ";
utf8char["198 173"] = "ƭ";
utf8char["198 174"] = "Ʈ";
utf8char["198 175"] = "Ư";
utf8char["198 176"] = "ư";
utf8char["198 177"] = "Ʊ";
utf8char["198 178"] = "Ʋ";
utf8char["198 179"] = "Ƴ";
utf8char["198 180"] = "ƴ";
utf8char["198 181"] = "Ƶ";
utf8char["198 182"] = "ƶ";
utf8char["198 183"] = "Ʒ";
utf8char["198 184"] = "Ƹ";
utf8char["198 185"] = "ƹ";
utf8char["198 186"] = "ƺ";
utf8char["198 187"] = "ƻ";
utf8char["198 188"] = "Ƽ";
utf8char["198 189"] = "ƽ";
utf8char["198 190"] = "ƾ";
utf8char["198 191"] = "ƿ";
utf8char["199 128"] = "ǀ";
utf8char["199 129"] = "ǁ";
utf8char["199 130"] = "ǂ";
utf8char["199 131"] = "ǃ";
utf8char["199 132"] = "Ǆ";
utf8char["199 133"] = "ǅ";
utf8char["199 134"] = "ǆ";
utf8char["199 135"] = "Ǉ";
utf8char["199 136"] = "ǈ";
utf8char["199 137"] = "ǉ";
utf8char["199 138"] = "Ǌ";
utf8char["199 139"] = "ǋ";
utf8char["199 140"] = "ǌ";
utf8char["199 141"] = "Ǎ";
utf8char["199 142"] = "ǎ";
utf8char["199 143"] = "Ǐ";
utf8char["199 144"] = "ǐ";
utf8char["199 145"] = "Ǒ";
utf8char["199 146"] = "ǒ";
utf8char["199 147"] = "Ǔ";
utf8char["199 148"] = "ǔ";
utf8char["199 149"] = "Ǖ";
utf8char["199 150"] = "ǖ";
utf8char["199 151"] = "Ǘ";
utf8char["199 152"] = "ǘ";
utf8char["199 153"] = "Ǚ";
utf8char["199 154"] = "ǚ";
utf8char["199 155"] = "Ǜ";
utf8char["199 156"] = "ǜ";
utf8char["199 157"] = "ǝ";
utf8char["199 158"] = "Ǟ";
utf8char["199 159"] = "ǟ";
utf8char["199 160"] = "Ǡ";
utf8char["199 161"] = "ǡ";
utf8char["199 162"] = "Ǣ";
utf8char["199 163"] = "ǣ";
utf8char["199 164"] = "Ǥ";
utf8char["199 165"] = "ǥ";
utf8char["199 166"] = "Ǧ";
utf8char["199 167"] = "ǧ";
utf8char["199 168"] = "Ǩ";
utf8char["199 169"] = "ǩ";
utf8char["199 170"] = "Ǫ";
utf8char["199 171"] = "ǫ";
utf8char["199 172"] = "Ǭ";
utf8char["199 173"] = "ǭ";
utf8char["199 174"] = "Ǯ";
utf8char["199 175"] = "ǯ";
utf8char["199 176"] = "ǰ";
utf8char["199 177"] = "Ǳ";
utf8char["199 178"] = "ǲ";
utf8char["199 179"] = "ǳ";
utf8char["199 180"] = "Ǵ";
utf8char["199 181"] = "ǵ";
utf8char["199 182"] = "Ƕ";
utf8char["199 183"] = "Ƿ";
utf8char["199 184"] = "Ǹ";
utf8char["199 185"] = "ǹ";
utf8char["199 186"] = "Ǻ";
utf8char["199 187"] = "ǻ";
utf8char["199 188"] = "Ǽ";
utf8char["199 189"] = "ǽ";
utf8char["199 190"] = "Ǿ";
utf8char["199 191"] = "ǿ";
utf8char["200 128"] = "Ȁ";
utf8char["200 129"] = "ȁ";
utf8char["200 130"] = "Ȃ";
utf8char["200 131"] = "ȃ";
utf8char["200 132"] = "Ȅ";
utf8char["200 133"] = "ȅ";
utf8char["200 134"] = "Ȇ";
utf8char["200 135"] = "ȇ";
utf8char["200 136"] = "Ȉ";
utf8char["200 137"] = "ȉ";
utf8char["200 138"] = "Ȋ";
utf8char["200 139"] = "ȋ";
utf8char["200 140"] = "Ȍ";
utf8char["200 141"] = "ȍ";
utf8char["200 142"] = "Ȏ";
utf8char["200 143"] = "ȏ";
utf8char["200 144"] = "Ȑ";
utf8char["200 145"] = "ȑ";
utf8char["200 146"] = "Ȓ";
utf8char["200 147"] = "ȓ";
utf8char["200 148"] = "Ȕ";
utf8char["200 149"] = "ȕ";
utf8char["200 150"] = "Ȗ";
utf8char["200 151"] = "ȗ";
utf8char["200 152"] = "Ș";
utf8char["200 153"] = "ș";
utf8char["200 154"] = "Ț";
utf8char["200 155"] = "ț";
utf8char["200 156"] = "Ȝ";
utf8char["200 157"] = "ȝ";
utf8char["200 158"] = "Ȟ";
utf8char["200 159"] = "ȟ";
utf8char["200 160"] = "Ƞ";
utf8char["200 161"] = "ȡ";
utf8char["200 162"] = "Ȣ";
utf8char["200 163"] = "ȣ";
utf8char["200 164"] = "Ȥ";
utf8char["200 165"] = "ȥ";
utf8char["200 166"] = "Ȧ";
utf8char["200 167"] = "ȧ";
utf8char["200 168"] = "Ȩ";
utf8char["200 169"] = "ȩ";
utf8char["200 170"] = "Ȫ";
utf8char["200 171"] = "ȫ";
utf8char["200 172"] = "Ȭ";
utf8char["200 173"] = "ȭ";
utf8char["200 174"] = "Ȯ";
utf8char["200 175"] = "ȯ";
utf8char["200 176"] = "Ȱ";
utf8char["200 177"] = "ȱ";
utf8char["200 178"] = "Ȳ";
utf8char["200 179"] = "ȳ";
utf8char["200 180"] = "ȴ";
utf8char["200 181"] = "ȵ";
utf8char["200 182"] = "ȶ";
utf8char["200 183"] = "ȷ";
utf8char["200 184"] = "ȸ";
utf8char["200 185"] = "ȹ";
utf8char["200 186"] = "Ⱥ";
utf8char["200 187"] = "Ȼ";
utf8char["200 188"] = "ȼ";
utf8char["200 189"] = "Ƚ";
utf8char["200 190"] = "Ⱦ";
utf8char["200 191"] = "ȿ";
utf8char["201 128"] = "ɀ";
utf8char["201 129"] = "Ɂ";
utf8char["201 130"] = "ɂ";
utf8char["201 131"] = "Ƀ";
utf8char["201 132"] = "Ʉ";
utf8char["201 133"] = "Ʌ";
utf8char["201 134"] = "Ɇ";
utf8char["201 135"] = "ɇ";
utf8char["201 136"] = "Ɉ";
utf8char["201 137"] = "ɉ";
utf8char["201 138"] = "Ɋ";
utf8char["201 139"] = "ɋ";
utf8char["201 140"] = "Ɍ";
utf8char["201 141"] = "ɍ";
utf8char["201 142"] = "Ɏ";
utf8char["201 143"] = "ɏ";
utf8char["201 144"] = "ɐ";
utf8char["201 145"] = "ɑ";
utf8char["201 146"] = "ɒ";
utf8char["201 147"] = "ɓ";
utf8char["201 148"] = "ɔ";
utf8char["201 149"] = "ɕ";
utf8char["201 150"] = "ɖ";
utf8char["201 151"] = "ɗ";
utf8char["201 152"] = "ɘ";
utf8char["201 153"] = "ə";
utf8char["201 154"] = "ɚ";
utf8char["201 155"] = "ɛ";
utf8char["201 156"] = "ɜ";
utf8char["201 157"] = "ɝ";
utf8char["201 158"] = "ɞ";
utf8char["201 159"] = "ɟ";
utf8char["201 160"] = "ɠ";
utf8char["201 161"] = "ɡ";
utf8char["201 162"] = "ɢ";
utf8char["201 163"] = "ɣ";
utf8char["201 164"] = "ɤ";
utf8char["201 165"] = "ɥ";
utf8char["201 166"] = "ɦ";
utf8char["201 167"] = "ɧ";
utf8char["201 168"] = "ɨ";
utf8char["201 169"] = "ɩ";
utf8char["201 170"] = "ɪ";
utf8char["201 171"] = "ɫ";
utf8char["201 172"] = "ɬ";
utf8char["201 173"] = "ɭ";
utf8char["201 174"] = "ɮ";
utf8char["201 175"] = "ɯ";
utf8char["201 176"] = "ɰ";
utf8char["201 177"] = "ɱ";
utf8char["201 178"] = "ɲ";
utf8char["201 179"] = "ɳ";
utf8char["201 180"] = "ɴ";
utf8char["201 181"] = "ɵ";
utf8char["201 182"] = "ɶ";
utf8char["201 183"] = "ɷ";
utf8char["201 184"] = "ɸ";
utf8char["201 185"] = "ɹ";
utf8char["201 186"] = "ɺ";
utf8char["201 187"] = "ɻ";
utf8char["201 188"] = "ɼ";
utf8char["201 189"] = "ɽ";
utf8char["201 190"] = "ɾ";
utf8char["201 191"] = "ɿ";
utf8char["202 128"] = "ʀ";
utf8char["202 129"] = "ʁ";
utf8char["202 130"] = "ʂ";
utf8char["202 131"] = "ʃ";
utf8char["202 132"] = "ʄ";
utf8char["202 133"] = "ʅ";
utf8char["202 134"] = "ʆ";
utf8char["202 135"] = "ʇ";
utf8char["202 136"] = "ʈ";
utf8char["202 137"] = "ʉ";
utf8char["202 138"] = "ʊ";
utf8char["202 139"] = "ʋ";
utf8char["202 140"] = "ʌ";
utf8char["202 141"] = "ʍ";
utf8char["202 142"] = "ʎ";
utf8char["202 143"] = "ʏ";
utf8char["202 144"] = "ʐ";
utf8char["202 145"] = "ʑ";
utf8char["202 146"] = "ʒ";
utf8char["202 147"] = "ʓ";
utf8char["202 148"] = "ʔ";
utf8char["202 149"] = "ʕ";
utf8char["202 150"] = "ʖ";
utf8char["202 151"] = "ʗ";
utf8char["202 152"] = "ʘ";
utf8char["202 153"] = "ʙ";
utf8char["202 154"] = "ʚ";
utf8char["202 155"] = "ʛ";
utf8char["202 156"] = "ʜ";
utf8char["202 157"] = "ʝ";
utf8char["202 158"] = "ʞ";
utf8char["202 159"] = "ʟ";
utf8char["202 160"] = "ʠ";
utf8char["202 161"] = "ʡ";
utf8char["202 162"] = "ʢ";
utf8char["202 163"] = "ʣ";
utf8char["202 164"] = "ʤ";
utf8char["202 165"] = "ʥ";
utf8char["202 166"] = "ʦ";
utf8char["202 167"] = "ʧ";
utf8char["202 168"] = "ʨ";
utf8char["202 169"] = "ʩ";
utf8char["202 170"] = "ʪ";
utf8char["202 171"] = "ʫ";
utf8char["202 172"] = "ʬ";
utf8char["202 173"] = "ʭ";
utf8char["202 174"] = "ʮ";
utf8char["202 175"] = "ʯ";
utf8char["202 176"] = "ʰ";
utf8char["202 177"] = "ʱ";
utf8char["202 178"] = "ʲ";
utf8char["202 179"] = "ʳ";
utf8char["202 180"] = "ʴ";
utf8char["202 181"] = "ʵ";
utf8char["202 182"] = "ʶ";
utf8char["202 183"] = "ʷ";
utf8char["202 184"] = "ʸ";
utf8char["202 185"] = "ʹ";
utf8char["202 186"] = "ʺ";
utf8char["202 187"] = "ʻ";
utf8char["202 188"] = "ʼ";
utf8char["202 189"] = "ʽ";
utf8char["202 190"] = "ʾ";
utf8char["202 191"] = "ʿ";
utf8char["203 128"] = "ˀ";
utf8char["203 129"] = "ˁ";
utf8char["203 130"] = "˂";
utf8char["203 131"] = "˃";
utf8char["203 132"] = "˄";
utf8char["203 133"] = "˅";
utf8char["203 134"] = "ˆ";
utf8char["203 135"] = "ˇ";
utf8char["225 184 128"] = "Ḁ";
utf8char["225 184 129"] = "ḁ";
utf8char["225 184 130"] = "Ḃ";
utf8char["225 184 131"] = "ḃ";
utf8char["225 184 132"] = "Ḅ";
utf8char["225 184 133"] = "ḅ";
utf8char["225 184 134"] = "Ḇ";
utf8char["225 184 135"] = "ḇ";
utf8char["225 184 136"] = "Ḉ";
utf8char["225 184 137"] = "ḉ";
utf8char["225 184 138"] = "Ḋ";
utf8char["225 184 139"] = "ḋ";
utf8char["225 184 140"] = "Ḍ";
utf8char["225 184 141"] = "ḍ";
utf8char["225 184 142"] = "Ḏ";
utf8char["225 184 143"] = "ḏ";
utf8char["225 184 144"] = "Ḑ";
utf8char["225 184 145"] = "ḑ";
utf8char["225 184 146"] = "Ḓ";
utf8char["225 184 147"] = "ḓ";
utf8char["225 184 148"] = "Ḕ";
utf8char["225 184 149"] = "ḕ";
utf8char["225 184 150"] = "Ḗ";
utf8char["225 184 151"] = "ḗ";
utf8char["225 184 152"] = "Ḙ";
utf8char["225 184 153"] = "ḙ";
utf8char["225 184 154"] = "Ḛ";
utf8char["225 184 155"] = "ḛ";
utf8char["225 184 156"] = "Ḝ";
utf8char["225 184 157"] = "ḝ";
utf8char["225 184 158"] = "Ḟ";
utf8char["225 184 159"] = "ḟ";
utf8char["225 184 160"] = "Ḡ";
utf8char["225 184 161"] = "ḡ";
utf8char["225 184 162"] = "Ḣ";
utf8char["225 184 163"] = "ḣ";
utf8char["225 184 164"] = "Ḥ";
utf8char["225 184 165"] = "ḥ";
utf8char["225 184 166"] = "Ḧ";
utf8char["225 184 167"] = "ḧ";
utf8char["225 184 168"] = "Ḩ";
utf8char["225 184 169"] = "ḩ";
utf8char["225 184 170"] = "Ḫ";
utf8char["225 184 171"] = "ḫ";
utf8char["225 184 172"] = "Ḭ";
utf8char["225 184 173"] = "ḭ";
utf8char["225 184 174"] = "Ḯ";
utf8char["225 184 175"] = "ḯ";
utf8char["225 184 176"] = "Ḱ";
utf8char["225 184 177"] = "ḱ";
utf8char["225 184 178"] = "Ḳ";
utf8char["225 184 179"] = "ḳ";
utf8char["225 184 180"] = "Ḵ";
utf8char["225 184 181"] = "ḵ";
utf8char["225 184 182"] = "Ḷ";
utf8char["225 184 183"] = "ḷ";
utf8char["225 184 184"] = "Ḹ";
utf8char["225 184 185"] = "ḹ";
utf8char["225 184 186"] = "Ḻ";
utf8char["225 184 187"] = "ḻ";
utf8char["225 184 188"] = "Ḽ";
utf8char["225 184 189"] = "ḽ";
utf8char["225 184 190"] = "Ḿ";
utf8char["225 184 191"] = "ḿ";
utf8char["225 185 128"] = "Ṁ";
utf8char["225 185 129"] = "ṁ";
utf8char["225 185 130"] = "Ṃ";
utf8char["225 185 131"] = "ṃ";
utf8char["225 185 132"] = "Ṅ";
utf8char["225 185 133"] = "ṅ";
utf8char["225 185 134"] = "Ṇ";
utf8char["225 185 135"] = "ṇ";
utf8char["225 185 136"] = "Ṉ";
utf8char["225 185 137"] = "ṉ";
utf8char["225 185 138"] = "Ṋ";
utf8char["225 185 139"] = "ṋ";
utf8char["225 185 140"] = "Ṍ";
utf8char["225 185 141"] = "ṍ";
utf8char["225 185 142"] = "Ṏ";
utf8char["225 185 143"] = "ṏ";
utf8char["225 185 144"] = "Ṑ";
utf8char["225 185 145"] = "ṑ";
utf8char["225 185 146"] = "Ṓ";
utf8char["225 185 147"] = "ṓ";
utf8char["225 185 148"] = "Ṕ";
utf8char["225 185 149"] = "ṕ";
utf8char["225 185 150"] = "Ṗ";
utf8char["225 185 151"] = "ṗ";
utf8char["225 185 152"] = "Ṙ";
utf8char["225 185 153"] = "ṙ";
utf8char["225 185 154"] = "Ṛ";
utf8char["225 185 155"] = "ṛ";
utf8char["225 185 156"] = "Ṝ";
utf8char["225 185 157"] = "ṝ";
utf8char["225 185 158"] = "Ṟ";
utf8char["225 185 159"] = "ṟ";
utf8char["225 185 160"] = "Ṡ";
utf8char["225 185 161"] = "ṡ";
utf8char["225 185 162"] = "Ṣ";
utf8char["225 185 163"] = "ṣ";
utf8char["225 185 164"] = "Ṥ";
utf8char["225 185 165"] = "ṥ";
utf8char["225 185 166"] = "Ṧ";
utf8char["225 185 167"] = "ṧ";
utf8char["225 185 168"] = "Ṩ";
utf8char["225 185 169"] = "ṩ";
utf8char["225 185 170"] = "Ṫ";
utf8char["225 185 171"] = "ṫ";
utf8char["225 185 172"] = "Ṭ";
utf8char["225 185 173"] = "ṭ";
utf8char["225 185 174"] = "Ṯ";
utf8char["225 185 175"] = "ṯ";
utf8char["225 185 176"] = "Ṱ";
utf8char["225 185 177"] = "ṱ";
utf8char["225 185 178"] = "Ṳ";
utf8char["225 185 179"] = "ṳ";
utf8char["225 185 180"] = "Ṵ";
utf8char["225 185 181"] = "ṵ";
utf8char["225 185 182"] = "Ṷ";
utf8char["225 185 183"] = "ṷ";
utf8char["225 185 184"] = "Ṹ";
utf8char["225 185 185"] = "ṹ";
utf8char["225 185 186"] = "Ṻ";
utf8char["225 185 187"] = "ṻ";
utf8char["225 185 188"] = "Ṽ";
utf8char["225 185 189"] = "ṽ";
utf8char["225 185 190"] = "Ṿ";
utf8char["225 185 191"] = "ṿ";
utf8char["225 186 128"] = "Ẁ";
utf8char["225 186 129"] = "ẁ";
utf8char["225 186 130"] = "Ẃ";
utf8char["225 186 131"] = "ẃ";
utf8char["225 186 132"] = "Ẅ";
utf8char["225 186 133"] = "ẅ";
utf8char["225 186 134"] = "Ẇ";
utf8char["225 186 135"] = "ẇ";
utf8char["225 186 136"] = "Ẉ";
utf8char["225 186 137"] = "ẉ";
utf8char["225 186 138"] = "Ẋ";
utf8char["225 186 139"] = "ẋ";
utf8char["225 186 140"] = "Ẍ";
utf8char["225 186 141"] = "ẍ";
utf8char["225 186 142"] = "Ẏ";
utf8char["225 186 143"] = "ẏ";
utf8char["225 186 144"] = "Ẑ";
utf8char["225 186 145"] = "ẑ";
utf8char["225 186 146"] = "Ẓ";
utf8char["225 186 147"] = "ẓ";
utf8char["225 186 148"] = "Ẕ";
utf8char["225 186 149"] = "ẕ";
utf8char["225 186 150"] = "ẖ";
utf8char["225 186 151"] = "ẗ";
utf8char["225 186 152"] = "ẘ";
utf8char["225 186 153"] = "ẙ";
utf8char["225 186 154"] = "ẚ";
utf8char["225 186 155"] = "ẛ";
utf8char["225 186 156"] = "ẜ";
utf8char["225 186 157"] = "ẝ";
utf8char["225 186 158"] = "ẞ";
utf8char["225 186 159"] = "ẟ";
utf8char["225 186 160"] = "Ạ";
utf8char["225 186 161"] = "ạ";
utf8char["225 186 162"] = "Ả";
utf8char["225 186 163"] = "ả";
utf8char["225 186 164"] = "Ấ";
utf8char["225 186 165"] = "ấ";
utf8char["225 186 166"] = "Ầ";
utf8char["225 186 167"] = "ầ";
utf8char["225 186 168"] = "Ẩ";
utf8char["225 186 169"] = "ẩ";
utf8char["225 186 170"] = "Ẫ";
utf8char["225 186 171"] = "ẫ";
utf8char["225 186 172"] = "Ậ";
utf8char["225 186 173"] = "ậ";
utf8char["225 186 174"] = "Ắ";
utf8char["225 186 175"] = "ắ";
utf8char["225 186 176"] = "Ằ";
utf8char["225 186 177"] = "ằ";
utf8char["225 186 178"] = "Ẳ";
utf8char["225 186 179"] = "ẳ";
utf8char["225 186 180"] = "Ẵ";
utf8char["225 186 181"] = "ẵ";
utf8char["225 186 182"] = "Ặ";
utf8char["225 186 183"] = "ặ";
utf8char["225 186 184"] = "Ẹ";
utf8char["225 186 185"] = "ẹ";
utf8char["225 186 186"] = "Ẻ";
utf8char["225 186 187"] = "ẻ";
utf8char["225 186 188"] = "Ẽ";
utf8char["225 186 189"] = "ẽ";
utf8char["225 186 190"] = "Ế";
utf8char["225 186 191"] = "ế";
utf8char["225 187 128"] = "Ề";
utf8char["225 187 129"] = "ề";
utf8char["225 187 130"] = "Ể";
utf8char["225 187 131"] = "ể";
utf8char["225 187 132"] = "Ễ";
utf8char["225 187 133"] = "ễ";
utf8char["225 187 134"] = "Ệ";
utf8char["225 187 135"] = "ệ";
utf8char["225 187 136"] = "Ỉ";
utf8char["225 187 137"] = "ỉ";
utf8char["225 187 138"] = "Ị";
utf8char["225 187 139"] = "ị";
utf8char["225 187 140"] = "Ọ";
utf8char["225 187 141"] = "ọ";
utf8char["225 187 142"] = "Ỏ";
utf8char["225 187 143"] = "ỏ";
utf8char["225 187 144"] = "Ố";
utf8char["225 187 145"] = "ố";
utf8char["225 187 146"] = "Ồ";
utf8char["225 187 147"] = "ồ";
utf8char["225 187 148"] = "Ổ";
utf8char["225 187 149"] = "ổ";
utf8char["225 187 150"] = "Ỗ";
utf8char["225 187 151"] = "ỗ";
utf8char["225 187 152"] = "Ộ";
utf8char["225 187 153"] = "ộ";
utf8char["225 187 154"] = "Ớ";
utf8char["225 187 155"] = "ớ";
utf8char["225 187 156"] = "Ờ";
utf8char["225 187 157"] = "ờ";
utf8char["225 187 158"] = "Ở";
utf8char["225 187 159"] = "ở";
utf8char["225 187 160"] = "Ỡ";
utf8char["225 187 161"] = "ỡ";
utf8char["225 187 162"] = "Ợ";
utf8char["225 187 163"] = "ợ";
utf8char["225 187 164"] = "Ụ";
utf8char["225 187 165"] = "ụ";
utf8char["225 187 166"] = "Ủ";
utf8char["225 187 167"] = "ủ";
utf8char["225 187 168"] = "Ứ";
utf8char["225 187 169"] = "ứ";
utf8char["225 187 170"] = "Ừ";
utf8char["225 187 171"] = "ừ";
utf8char["225 187 172"] = "Ử";
utf8char["225 187 173"] = "ử";
utf8char["225 187 174"] = "Ữ";
utf8char["225 187 175"] = "ữ";
utf8char["225 187 176"] = "Ự";
utf8char["225 187 177"] = "ự";
utf8char["225 187 178"] = "Ỳ";
utf8char["225 187 179"] = "ỳ";
utf8char["225 187 180"] = "Ỵ";
utf8char["225 187 181"] = "ỵ";
utf8char["225 187 182"] = "Ỷ";
utf8char["225 187 183"] = "ỷ";
utf8char["225 187 184"] = "Ỹ";
utf8char["225 187 185"] = "ỹ";
utf8char["225 187 186"] = "Ỻ";
utf8char["225 187 187"] = "ỻ";
utf8char["225 187 188"] = "Ỽ";
utf8char["225 187 189"] = "ỽ";
utf8char["225 187 190"] = "Ỿ";
utf8char["225 187 191"] = "ỿ";

var getLyricNCT = async function (linkLRC) {
    const karaoke = new KaraokeNCT();
    return await karaoke.getLyric(linkLRC);
};

function toLyricSpotify(arr) {
    return arr.map(function (item) {
        return {
            words: item.content,
            startTimeMs: item.start * 1000,
            endTimeMs: (item.start + item.duration) * 1000,
        };
    });
}
//Cách lấy nhạc 320kb trên nhạc của tui
// Vào request tìm link: https://www.nhaccuatui.com/flash/xml?html5=true

function getLyricOfSpotify(trackId, authToken = 'Bearer BQBs48bT8GYftcWF9JAXSIH0FHGBL3VOi86TpO-D5e2AOKqI__Dvitmryu9QSHw3BLIvTayfPEqXqHzBy0YN9ONKTPMsbBmzfp8Yd9iW4B0J9uF4A75ybe8QzlwOG1LptwNEcqHZrO6JW-2tg4KRKZRZ6hyc-VCx9wYMYQ0_27kQvY34lSlaZaorBci5Fjx-6oXiSVW3NeqJ0fBUiz7LjFTr9GpCfUEztU2NNB_kP9geNvBcywKltiiIGth7AFkl4TQeiu2lJr0f43myvV2AfuFKF_x3O7QUBsNEel1NrOoCtWC-QVQHPlnGXGRuAjMsHlrHpWpKw3jvtYzUpxsIvBxU') {
    return fetch(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${trackId}?format=json&vocalRemoval=false&market=from_token`, {
        method: "GET",
        headers: {
            "Accept": `application/json`,
            "Accept-Language": `vi`,
            "App-Platform": `WebPlayer`,
            "Authorization": `${authToken}`,
            "Client-Token": `AABhc22kF4thU1PAarVo21A0sQJEx+3ZHZQ5mnRfDvhjej+rnLrXIh0pNspwtU/Z6C6EBRFtbzxRaQWvNvS0PpfyKHbkZR9B5ApCGB2zeN+5gxYrC0ibXfnn/gUof9/OrTzTEXD9ZcMynUKHl+LWBQN0rgqHWNLHuiYO915u7M6x1gd8SI8MZSu/B0Sxx4730/TMleR/9yLqNwcwTGZ0q3DuTq9sAHGzXl84F1TFadFjfJKrMskC2X/2BUlxvjWQGaAPxUWCTJmsYRMC50PDZZXPVONZQyWw6S9FZQ==`,
            "Sec-Ch-Ua": `"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"`,
            "Sec-Ch-Ua-Mobile": `?0`,
            "Sec-Ch-Ua-Platform": "Windows",
            "Spotify-App-Version": `1.2.34.0-unknown`,
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36`,
        },
    }).then(res => {
        return res.json();
    }).then(res => {
        return res;
    });
}

// URL tìm track
/**
 * https://spclient.wg.spotify.com/metadata/4/track/
 */