(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Circle = function (options) {
    this.radius = options.radius || 100;
    this.pos = {};
    this.pos.x = options.pos.x;
    this.pos.y = options.pos.y;
    this.dest = {};
    this.dest.x = options.dest.x;
    this.dest.y = options.dest.y;
    this.destFirst = {};
    this.destFirst.x = options.dest.x;
    this.destFirst.y = options.dest.y;
    this.offset = {x: 0, y: 0};
    this.img = new window.Image();
    this.img.src = options.img;
    this.vel = {x: 0, y: 0};
    this.ctx = options.ctx;
    this.color = options.color || '#fdcd00';
    this.slowdown = 0.99;
    this.circles = options.circles;
};

Circle.prototype.getDistance = function (pos) {
    return Math.sqrt((this.pos.x - pos.x) * (this.pos.x - pos.x) + 
        (this.pos.y - pos.y) * (this.pos.y - pos.y));
};

Circle.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.drawImage(this.img, this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 2, this.radius * 2);
    return this;
};
Circle.prototype.updPosition = function () {
    var _this = this;
    ['x', 'y'].forEach(function (aix) {
        var delta = _this.dest[aix] + _this.offset[aix] - _this.pos[aix];
        _this.pos[aix] += delta/10;
    });
    this.circles.forEach(function (el) {
        if (_this !== el) {
            var dist = _this.getDistance(el.pos),
                minDist = _this.radius * 2;
            if (dist < minDist) {
                ['x', 'y'].forEach(function (aix) {
                    var oldVel = _this.vel[aix];
                    _this.pos[aix]  = _this.pos[aix]  + ((_this.pos[aix] - el.pos[aix]) * (minDist - dist) / 2) / dist;
                    el.pos[aix] = el.pos[aix] + ((el.pos[aix] - _this.pos[aix]) * (minDist - dist) / 2) / dist;
                    _this.vel[aix] = el.vel[aix];
                    el.vel[aix] = oldVel;
                });
            }
        }
    });
    return this;
};
Circle.prototype.updScroll = function (top) {
    this.dest.y = this.destFirst.y + top;
    return this;
};
Circle.prototype.hover = function (pos) {
    var distToDest = Math.sqrt((this.dest.x - pos.x) * (this.dest.x - pos.x) + 
        (this.dest.y - pos.y) * (this.dest.y - pos.y));
    if (distToDest > this.radius * 2) {
        this.offset = {x: 0, y: 0};
    } else {
        this.offset.x = (this.pos.x - pos.x)/2;
        this.offset.y = (this.pos.y - pos.y)/2;
    }
    return this;
};
Circle.prototype.resize = function (dest, radius) {
    this.dest.x = dest.x;
    this.dest.x = dest.x;
    this.destFirst.y = dest.y;
    this.destFirst.y = dest.y;
    this.radius = radius;
    return this;
};
Circle.prototype.setVel = function (vel) {
    this.vel.x = vel.x;
    this.vel.y = vel.y;
    return this;
};
Circle.prototype.update = function () {
    this
        .updPosition()
        .draw();
    return this;
};

module.exports = Circle;
},{}],2:[function(require,module,exports){
function animate(nowMsec, callback) {
    var deltaMsec;
    nowMsec = nowMsec || Date.now();
    animate.lastTimeMsec = animate.lastTimeMsec || nowMsec - 1000 / 60;
    deltaMsec = Math.min(100, nowMsec - animate.lastTimeMsec);
    // keep looping
    animate.id = window.requestAnimationFrame(animate);
    // change last time
    animate.lastTimeMsec = nowMsec;
    // call each update function
    if (callback) animate.callback = callback;
    animate.callback(deltaMsec, nowMsec, animate.id);
}

module.exports = animate;
},{}],3:[function(require,module,exports){
var $ = (window.$),
    animate = require('./animate.js'),
    Circle = require('./Circle.js');

;(function () {
    window.requestAnimationFrame = function () {
        return (
            window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback){
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();
    window.cancelAnimationFrame = function () {
        return (
            window.cancelAnimationFrame       ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame    ||
            window.oCancelAnimationFrame      ||
            window.msCancelAnimationFrame     ||
            function(id){
                window.clearTimeout(id);
            }
        );
    }();
})();

var bg = {},
    w, h,
    circles = [],
    x, y, radius;

bg.init = function () {
    var canvas = document.getElementById('bg-canvas'),
        $page = $('.page'),
        ctx = canvas.getContext('2d');

    function resize() {
        w = parseInt($page.css('width'), 10);
        h = parseInt($page.css('height'), 10);
        canvas.width = w;
        canvas.height = h;
        radius = w / 10;
        circles.forEach(function (el, i) {
            if (i % 2 === 0) {
                x = 0 + 0 * radius;
                if (i % 4 === 0) x += 1.5 * radius;
                y = (i + 1) * radius * 0.8;
            } else {
                x = w - 1.5 * radius;
                if (i % 4 === 1) x += 1.5 * radius;
                y = i * radius * 0.8;
            }
            el.resize({x: x, y: y}, radius);
        });
    }
    resize();
    $(window).on('resize', resize);
    
    for (var i = 0; i < 26; i ++) {
        if (i % 2 === 0) {
            x = 0 + 0 * radius;
            if (i % 4 === 0) x += 1.5 * radius;
            y = (i + 1) * radius * 0.8;
        } else {
            x = w - 1.5 * radius;
            if (i % 4 === 1) x += 1.5 * radius;
            y = i * radius * 0.8;
        }
        circles.push(
            new Circle({
                radius: radius,
                pos: {x: x, y: y + 1000},
                dest: {x: x, y: y},
                ctx: ctx,
                img: './img/bg-svg-' + (i % 6) + '.svg',
                circles: circles,
            })
        );
    }
        
    function draw() {
        circles.forEach(function (el) {
            el.update();
        });
    }
    animate(0, function () {
        ctx.clearRect(0, 0 , w , h);
        draw();
    });
};

bg.updScroll = function (top) {
    circles.forEach(function (el) {
        el.updScroll(top/2);
    });
};
bg.hover = function (pos) {
    circles.forEach(function (el) {
        el.hover(pos);
    });
};

module.exports = bg;
},{"./Circle.js":1,"./animate.js":2}],4:[function(require,module,exports){
var $ = (window.$),
    sfx = require('./sfx.js')('./sfx/sfx-2.mp3', 'sfx'),
    share = require('./share.js'),
    bg = require('./bg.js');

$(window).on('touchmove', function (e) {
    e.preventDefault();
});
var $preloaderProgress = $('.preloader-progress'),
    $fridgeInner = $('.fridge-inner'),
    $window = $(window),
    doorsImg = [];
    
function Declinator(forms) {
    this.declinate = function (number) {
        var cases = [2, 0, 1, 1, 1, 2];
        return forms[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    };
}
var declinator = new Declinator(['очко', 'очка', 'очков']);

function initPage() {
$(function () {
    var $withDesc = $('.with-desc'),
        $footer = $('.footer'),
        $fridge = $('.fridge-door-wrap'),
        $page = $('.page'),
        $leftText = $('.left-text'),
        $radio = $('.radio-cont'),
        $radioMusicSong = $('.radio-music-song-hover'),
        $radioMusicSongText = $('.radio-music-song-text'),
        $doorOpener = $('.door-opener'),
        $gamePopupStart = $('.game-popup-start').show(),
        $gamePopupRestart = $('.game-popup-restart'),
        $gamePopupResume = $('.game-popup-resume'),
        $gamePopupNext= $('.game-popup-next'),
        $gamePopupWin = $('.game-popup-win'),
        $document = $(document);

    var height,
        fridgeInnerHeight,
        scrollStates,
        scrollTop = 0;
    
    function resize() {
        var radioHeight = $radio[0].clientWidth * 124/1080 + 20,
            percent = 0.54,
            gameTop = radioHeight + $fridgeInner[0].clientWidth * $fridgeInner.attr('height')/$fridgeInner.attr('width') * percent;
            
        fridgeInnerHeight = parseInt($fridgeInner.css('height'), 10) - 20;
        height = parseInt($footer.css('height'), 10);
        scrollStates = [0, radioHeight, Math.min(gameTop, fridgeInnerHeight - window.innerHeight)];
        $page.css('height', Math.min(gameTop + window.innerHeight, fridgeInnerHeight));
    }
    resize();
    $window.on('resize', resize);
    
    $window.on('mousemove', function (e) {
        bg.hover({x: e.clientX, y: e.clientY + scrollTop});
    });
    
    var paths = [
        'd="M893.5,93H96c0,0-36.652-0.26-65,28C3.917,148,3,182.5,3,182.5v1160c0,0,9,13,50.5,14.5s861,0,861,0s56.832,2.665,70.5-14.333v-1154.5C985,188.167,986,101.5,893.5,93z"/>',
        'd="M895.5,93H98c0,0-38.652-2.26-67,26C3.917,146,3,182.5,3,182.5v1164c0,0,4,11.5,52.5,13.5h861c0,0,55.833,0.152,69.5-14.333v-1157.5C986,188.167,988,101.5,895.5,93z"/>',
        'd="M895.5,93.043l-797.5-2c0,0-40.652-1.26-69,27c-27.083,27-27,64.5-27,64.5v1168c0,0,5,12.5,53.5,14.5l861-5c0,0,55.833,0.152,69.5-14.333V188.21C986,188.21,988,101.543,895.5,93.043z"/>',
        'd="M896.58,93.147l-802.5-4c0,0-37.652-0.26-66,28c-27.083,27-26,65.5-26,65.5v1176c0,0,13,10.5,61.5,12.5l854-11c0,0,55.833,0.152,69.5-14.332v-1157.5C987.08,188.314,989.08,101.647,896.58,93.147z"/>',
        'd="M898.506,92l-807.5-7c0,0-38.006,0-63,28c-25.467,28.53-26,57.5-26,57.5v1195c0,0,6.672,12.83,62.5,14.5s855-18,855-18s55.833,0.152,69.5-14.332V187.167C989.006,187.167,991.006,100.5,898.506,92z"/>',
        'd="M901.5,92.062l-807.5-12c0,0-38.006,2-63,30c-25.467,28.53-27,59.5-27,59.5l-1,1202c0,0,2.996,18.227,58.5,19.5c7.381,0.389,27.856,1.168,57.834,0.492c196.802-4.438,803.166-29.492,803.166-29.492s55.833,1.152,69.5-13.332V187.229C992,187.229,994,100.562,901.5,92.062z"/>',
        'd="M904.5,91L103,74c0,0-41.006,4-66,32c-25.467,28.529-26,64.5-26,64.5v1215c0,0,3.672,16.83,59.5,18.5s855-40,855-40s56.833,0.152,70.5-14.332V187.167C996,187.167,997,99.5,904.5,91z"/>',
        'd="M909.465,90.122l-782.5-22c0,0-43.035-1.378-74,31s-26,71.5-26,71.5l-1,1229c0,0,3.672,16.83,59.5,18.5s844-52,844-52s57.833-0.848,71.5-15.332V187.289C1000.965,187.289,1001.965,98.622,909.465,90.122z"/>',
        'd="M914.58,89.887l-772.5-29c0,0-42.006,5-67,33c-25.467,28.529-25,64.5-25,64.5v1255c0,0,0,18.281,79.585,22.281c55.783,2.804,803.915-67.781,803.915-67.781s58.833-1.848,72.5-16.332v-1165.5C1006.08,186.054,1007.08,98.387,914.58,89.887z"/>',
        'd="M921.08,89.976l-731.5-37c0,0-52.006,1-77,29c-25.467,28.529-29,58.5-29,58.5v1296c0,0,20.672,14.83,76.5,16.5s769-81,769-81s73.921-6.31,83.5-18.332V186.143C1012.58,186.143,1013.58,98.476,921.08,89.976z"/>',
        'd="M931.08,88.976l-665.5-42c0,0-76.58-8.642-106,24c-31.408,34.848-30,73.5-30,73.5l-1,1310c0,0,22.672,13.83,78.5,15.5s735-97,735-97s66.423-5.309,78.5-18.332V187.143C1020.58,187.143,1023.58,97.476,931.08,88.976z"/>',
        'd="M939.08,88.976l-575.5-45c0,0-113.58-17.642-143,15c-31.408,34.848-33,70.5-33,70.5v1345c0,0,21.672,10.83,77.5,12.5s685-111,685-111s66.423-7.309,78.5-20.332V188.143C1028.58,188.143,1031.58,97.476,939.08,88.976z"/>',
        'd="M946.08,87.976l-529.5-51c0,0-96.58-19.642-126,13c-31.408,34.848-33,71.5-33,71.5v1370c0,0,32.088,14.5,110.5,14.5c31.538,0,213.978-41.535,366.85-75.958c117.863-26.541,218.15-48.042,218.15-48.042s82.588-15.975,83.5-24.332l1-1170.501C1037.58,187.143,1038.58,96.476,946.08,87.976z"/>',
        'd="M955.08,88l-439.5-53c0,0-49.581-5.332-90.914-9.666c-25.92-2.718-43.445,8.822-55.086,17.666c-16.664,12.659-20.996,31.159-25.476,45.597c-8.486,27.357-5.524,48.903-5.524,48.903v1373c0,0,71.228,18.815,148.5,5.5c50.256-8.66,105.923-28.997,256.85-68.958c116.79-30.923,258.15-71.042,258.15-71.042s43.588-9.975,44.5-18.332V187.167C1046.58,187.167,1047.58,96.5,955.08,88z"/>',
        'd="M964.08,87.859l-412.5-64c0,0-70.567-15.163-94.58,10.141c-31,32.666-28,88.999-28,88.999l-0.5,1402.831c0,0,69.833,14.503,148.166,4.504c31.284-3.993,32.381-7.505,179.667-61.001c74.334-26.999,214.748-77.474,214.748-77.474s51.309-16.827,76.419-27.025c5.223-2.121,7.417-5.211,8.081-7.307c1.008-3.18,0-1170.501,0-1170.501S1056.58,96.359,964.08,87.859z"/>',
        'd="M975.5,86c0,0-324.502-67.001-348.5-70c-23.998-2.999-54.665-5.365-70.246,4.451C525.181,40.341,525,110.5,525,110.5v1429c0,0,69.573,13.889,147,1.5c37.5-6,43.193-13.992,184.999-80.669C957.665,1412.998,1001.5,1391,1001.5,1391s62.588-24.975,63.5-33.332V186.167C1065,186.167,1067,99,975.5,86z"/>',
        'd="M982.335,84c0,0-242.006-65.96-265.486-71.755C707.75,10,663.25,5.858,654.667,11.388C623.298,31.598,624,108.5,624,108.5v1443c0,0,66.289,12.864,143.666,0.166c22.332-3.665,46.866-23.247,178.667-108c71.699-46.105,117.333-75.666,117.333-75.666s9.755-5.31,10.667-13.667l-0.666-1176C1073.667,178.333,1073.835,97.001,982.335,84z"/>',
        'd="M1025.335,94.667c0,0-197.853-80.538-221.333-86.333C794.903,6.088,752.438,2.789,744.335,9C719.984,27.667,721,110.5,721,110.5v1450c0,0,87.492,8.796,143.666-4.834c34.335-8.331,54.668-40.331,141.667-121.332c37.287-34.717,57.042-54.959,57.042-54.959s19.125-15.5,18.958-23.042c0,0,0.171-1136.082-0.331-1145.333S1091.5,127.5,1025.335,94.667z"/>',
        'd="M1015.75,81c0,0-90-62.5-113.234-70.021c-4.648-1.505-11.223-4.027-18.538-5.344c-11.255-2.027-24.266-2.271-34.728-2.253C840.64,3.396,833.756,3.264,831,5.25c-17,12.25-16.333,101.983-16.333,101.983v1459c0,0,94.331,8.432,143.666-6.834c22.431-6.94,34.334-39.399,72.334-100.732c44.896-72.463,54.666-90.934,54.666-90.934s4.667-5.737,4.667-14.667l0.334-1176C1090.334,177.067,1093.25,122,1015.75,81z"/>',
        'd="M1065.595,102.438c-4.643-6.783-24.594-44.104-44.095-65.438c-16.25-17.777-30.116-24.139-40.5-27.5c-4.648-1.505-17.21-4.2-24.525-5.518c-11.255-2.027-27.763-1.999-38.225-1.981c-8.61,0.015-10.426-0.974-11.5,2.249c-6.582,19.75-6.083,99.603-6.083,99.603l-1,1468c0,0,82.498,6.663,131.833-8.603c8.188-2.533,18.485-4.423,21.95-14.262c6.15-17.463,11.024-46.262,20.55-88.488c18.757-83.154,22.5-101.75,22.5-101.75s0-31.07,0-40l-0.062-807.252l30.062-0.623v-34.959l-29.765-0.164L1096.5,231c0,0,0.767-48.219-1.399-69.774C1093.465,144.952,1069.982,108.848,1065.595,102.438z"/>',
        'd="M974.997,1.333V76c0,0-7.166,0.833-7.166,10.5s0,1380.003,0,1380.003s2.333,3.999,6.833,5.833l0.335,100.578c0,0,119.001,7.336,143.501-17.914c0,0,2.501-1.165,2.501-8.499c0-5.883-0.028-1037.562-0.028-1037.562l7.965-0.063l4.062,2.25l44.001-0.375v-34.375l-44.093-0.015l-4.283,2.765l-7.269,0.017l-0.355-46.307c0,0,2.999-72.335,2.999-105.835s0.333-103.667,0-114.667s-2.334-36.667-2.667-46s-1-56.667-1-56.667s-0.34-42.156-34.333-76C1053.25,1.061,1005.327,0,974.997,1.333z"/>',
        'd="M987.75,88.25l-3.5,54.75c0,0-2.5,6.5-2.625,18.375s0,1119.457,0,1119.457s0.042,10.499,1.375,14.333s1.16,9,1.16,9v33.5l51.34,235.835c0,0,74.81,1.934,97.75-3c23.25-5,33.375-6.875,42-18V1531l-0.098-1021.237l47.098,0.862V474.25l-47.297,1.74l0.297-359.74c0,0,0.75-47.699-34.25-82.25s-83.167-34.551-109.5-34L987.75,88.25z"/>'
    ];

    function loadDoorImages() {
        doorsImg.forEach(function (el, i) {
        //     var img = new window.Image();
        //     img.src = el;
            $fridge.append('<svg class="fridge-top-img door-' + i + 
                '" version="1.1" xmlns="http://www.w3.org/2000/svg"' +
                'xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
                ' width="100%" height="100%" viewBox="0 0 1225 1576" ' +
                'enable-background="new 0 0 1225 1576" xml:space="preserve">' +
                '<defs><path id="SVGID' + i + '" ' + paths[i] +' </defs>' +
                '<clipPath id="SVGID_' + i +'">' +
                '<use xlink:href="#SVGID' + i + '"' + ' overflow="visible"></use>' +
                '</clipPath>' +
                '<image clip-path="url(#SVGID_' + i + ')" overflow="visible" width="1225"' +
                'height="1576" xlink:href="' + el + '"></image>' +
                '</svg>');
        });
    }
    loadDoorImages();
    
    function prepareClassesToRemove(name, n) {
        var classesToRemove = '';
        n = n + 1;
        for (var i = 0; i < n; i++) {
            classesToRemove += name + i + ' ';
        }
        return classesToRemove.slice(0, -1);
    }
    var descClassesToRemove = prepareClassesToRemove('with-desc-', 6);
    var fridgeClassesToRemove = prepareClassesToRemove('open-', 23);
    
    $withDesc.each(function (i) {
        height = parseInt($footer.css('height'), 10);
        $(this).hover(function () {
            if (scrollTop < scrollStates[1]/21*18) return;
            $footer.css('height', height).addClass('with-desc-' + (i + 1));
            sfx.play();
        }, function () {
            $footer.css('height', 'auto').removeClass('with-desc-' + (i + 1));
            sfx.skipTo(0);
        });
        $(this).on('click', function () {
            if (scrollTop < scrollStates[1]/21*18) return;
            $footer.css('height', height).removeClass(descClassesToRemove).addClass('with-desc-' + (i + 1));
        });
    });

    $radioMusicSong.hover(function () {
        $radioMusicSongText.addClass('animate-scroll');
    }, function () {
        $radioMusicSongText.removeClass('animate-scroll');
    });
    
    function animateDoorState(scrollTop, h) {
        switch (true) {
            case (scrollTop <= h/21):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-0');
            break;
            case (scrollTop > h/21 && scrollTop < h/21*2):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-1');
            break;
            case (scrollTop > h/21*2 && scrollTop < h/21*3):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-2');
            break;
            case (scrollTop > h/21*3 && scrollTop < h/21*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-3');
            break;
            case (scrollTop > h/21*4 && scrollTop < h/21*5):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-4');
            break;
            case (scrollTop > h/21*5 && scrollTop < h/21*6):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-5');
            break;
            case (scrollTop > h/21*6 && scrollTop < h/21*7):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-6');
            break;
            case (scrollTop > h/21*7 && scrollTop < h/21*8):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-7');
            break;
            case (scrollTop > h/21*8 && scrollTop < h/21*9):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-8');
            break;
            case (scrollTop > h/21*9 && scrollTop < h/21*10):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-9');
            break;
            case (scrollTop > h/21*10 && scrollTop < h/21*11):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-10');
            break;
            case (scrollTop > h/21*11 && scrollTop < h/21*12):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-11');
            break;
            case (scrollTop > h/21*12 && scrollTop < h/21*13):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-12');
            break;
            case (scrollTop > h/21*13 && scrollTop < h/21*14):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-13');
            break;
            case (scrollTop > h/21*14 && scrollTop < h/21*15):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-14');
            break;
            case (scrollTop > h/21*15 && scrollTop < h/21*16):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-15');
            break;
            case (scrollTop > h/21*16 && scrollTop < h/21*17):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-16');
            break;
            case (scrollTop > h/21*17 && scrollTop < h/21*18):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-17');
            break;
            case (scrollTop > h/21*18 && scrollTop < h/21*19):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-18');
            break;
            case (scrollTop > h/21*19 && scrollTop < h/21*20):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-19');
            break;
            case (scrollTop > h/21*20 && scrollTop < h/21*21):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-20');
            break;
            case (scrollTop >= h/21*21):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-21');
            break;
        }
    }
    
    function scrollPage(scroll) {
        scrollTop = -scroll;
        height = parseInt($footer.css('height'), 10);
        $footer.css('height', 'auto').removeClass(descClassesToRemove);
        if (scrollTop < scrollStates[1]/12) {
            $footer.removeClass('footer-fixed').addClass('footer-hide');
            $leftText.removeClass('left-text-visible');
        } else {
            $footer.removeClass('footer-hide').addClass('footer-fixed');
            $leftText.addClass('left-text-visible');
        }
        if (scrollTop < scrollStates[1]/24*15) {
            $doorOpener.removeClass('behind');
        } else {
            $doorOpener.addClass('behind');
        }
        if (scrollStates[2] - scrollTop < fridgeInnerHeight * 0.05) {
            $('.game').fadeIn();
            $footer.removeClass(descClassesToRemove).addClass('with-game');
        } else {
            game.pause();
            $('.game').fadeOut();
            $footer.removeClass('with-game');
        }
        animateDoorState(scrollTop, scrollStates[1]);
    }
    
    var myScroll;
    function initMyScroll() {
        myScroll = new window.IScroll('#wrapper', {
            probeType: 3,
            mouseWheel: true,
            click: true,
            // scrollbars: true,
            // interactiveScrollbars: true,
            // fadeScrollbars: true,
            // shrinkScrollbars: true
        });
    
        function updatePosition () {
            scrollPage(myScroll.y);
            bg.updScroll(myScroll.y);
        }
    
        myScroll.on('scroll', updatePosition);
        myScroll.on('scrollEnd', updatePosition);
    }
    
    // window.loaded = function () {
    initMyScroll();
    bg.init();
    // };
    
    $document.on('touchmove', function (e) {
        e.preventDefault();
    });
    
    $('.nav-main').click(function () {
        myScroll.scrollTo(0, -scrollStates[0], 1000);
    });
    $('.nav-our').click(function () {
        myScroll.scrollTo(0, -scrollStates[1], 1000);
    });
    $('.nav-game').click(function () {
        myScroll.scrollTo(0, -scrollStates[2], 1000);
    });
    
    // game
    var game;
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    var images = [];
    function initGame() {
        var $gameFieldCell = $('.game-field-cell').remove(),
            $gameField = $('.game-field'),
            i;
            
        $('.game-popup-next .social-vk svg').clone().appendTo('.game-popup-win .social-vk');
        $('.game-popup-next .social-fb svg').clone().appendTo('.game-popup-win .social-fb');

        for (i = 0; i < 20; i++) {
            var $currGameFieldCell = $gameFieldCell.clone();
            if (i % 5 === 0) $currGameFieldCell.addClass('col-xs-offset-1');
            $currGameFieldCell.children('.game-tile').addClass('game-tile-' + i);
            $gameField.append($currGameFieldCell);
        }
        for (i = 0; i < 10; i++) {
            var img = new window.Image();
            img.src = './img/tile-' + i + '.png';
            images.push(img);
        }
        var Tile = function (options) {
            var _this = this;
            this.number = options.number;
            this.imgNumer = options.imgNumer;
            this.$div = $('.game-tile-' + options.number);
            this.img = images[options.imgNumer];
            this.isOpen = false;
            this.isLocked = false;
            this.isSolved = false;
            this.game = options.game;
            this.$div.append($(this.img).clone());
            this.$div.parent().click(function () {
                if (_this.isSolved || _this.isLocked || _this.isOpen || !_this.game.started) return;
                _this.open();
            });
            this.$div.parent().removeClass('locked');
        };
        Tile.prototype.open = function () {
            this.isOpen = true;
            this.$div.parent().addClass('active');
            this.game.openTale(this);
            return this;
        };
        Tile.prototype.close = function () {
            this.isOpen = false;
            this.$div.parent().removeClass('active');
            return this;
        };
        Tile.prototype.solve = function () {
            this.isSolved = true;
            return this;
        };
        Tile.prototype.lock = function () {
            this.isLocked = true;
            this.$div.parent().addClass('locked');
            return this;
        };
        Tile.prototype.unlock = function () {
            this.isLocked = false;
            this.$div.parent().removeClass('locked');
            return this;
        };

        var Game = function (options) {
            var _this = this;
            this.level = 0;
            this.talesToSolve = 0;
            this.solved = 0;
            this.scoreLevel = 0;
            this.scoreTotal = 0;
            this.tilesInChain = 0;
            this.timeScoreMax = 900;
            this.clickScoreMax = 900;
            this.clicks = 0;
            this.clicksTotal = 0;
            this.time = 0;
            this.timeMax = 0;
            this.startTime = 0;
            this.tiles = [];
            this.images = images;
            this.lockedImg = {};
            this.backImg = {};
            this.started = false;
            this.paused = false;
            this.$gameButtonStart = $('.start-game')
                .click(function () {
                    _this.start();
                    _this.$gameButtonStart.unbind('click');
                    $gamePopupStart.fadeOut();
            });
            this.$gameButtonRestart = $('.restart-game');
            this.$gameButtonResume = $('.resume-game');
            this.$gameButtonNext = $('.next-game');
            this.$infoDiv = options.$infoDiv;
            this.opened = [];
            this.numbers = [];
            this.showDelay = 3000;
            this.$game = $('.game');
            this.$gameTimer = $('.game-timer');
            this.$gameClicks = $('.game-clicks');
            this.$gameScore = $('.game-score');
            this.$gameScoreText = $('.game-score-text');
            this.$gameScoreTotal = $('.game-score-total');
            this.$gameLevel = $('.game-level');
            this.$gameTask = $('.game-task');
            $('.social-vk-level-game').click(function () {
                share.vk({
                    url: 'http://localhost:3002',
                    title: 'Министерство Газировки',
                    desc: 'Я набрал ' + _this.scoreTotal + ' ' + declinator.declinate(_this.scoreTotal)
                    // img: 'link'
                });
            });
            $('.social-fb-level-game').click(function () {
                share.fb({
                    url: 'http://localhost:3002',
                    title: 'Министерство Газировки',
                    desc: 'Я набрал ' + _this.scoreTotal + ' ' + declinator.declinate(_this.scoreTotal)
                    // img
                });
            });
            $('.social-vk-win-game').click(function () {
                share.vk({
                    url: 'http://localhost:3002',
                    title: 'Министерство Газировки',
                    desc: 'Я набрал ' + _this.scoreTotal + ' ' + declinator.declinate(_this.scoreTotal)
                    // img
                });
            });
            $('.social-fb-win-game').click(function () {
                share.fb({
                    url: 'http://localhost:3002',
                    title: 'Министерство Газировки',
                    desc: 'Я набрал ' + _this.scoreTotal + ' ' + declinator.declinate(_this.scoreTotal)
                    // img
                });
            });
        };
        Game.prototype.start = function () {
            if (this.started) return;
            this.nextLevel();
            this.started = true;
            this.startTime = Date.now();
            this.startCount();
            return this;
        };
        Game.prototype.startCount = function () {
            var _this = this;
            this.interval = setInterval(function () {
                _this.time = Math.round(_this.timeMax - (Date.now() - _this.startTime)/1000);
                _this.$gameTimer.text(_this.time);
                if (_this.time === 20) _this.$gameTimer.addClass('red-text');
                if (_this.time <= 0) {
                    clearInterval(_this.interval);
                    _this.failLevel();
                }
            }, 1000);
            return this;
        };
        Game.prototype.pause = function () {
            if (!this.started) return this;
            var _this = this;
            this.started = false;
            clearInterval(this.interval);
            $gamePopupResume.fadeIn();
            this.$gameButtonResume.click(function () {
                _this.resume();
                _this.$gameButtonResume.unbind('click');
                $gamePopupResume.fadeOut();
            });
            return this;
        };
        Game.prototype.resume = function () {
            this.started = true;
            this.startTime = Date.now() - (this.timeMax - this.time) * 1000;
            this.startCount();
            return this;
        };
        Game.prototype.over = function () {
            this.started = false;
            this.tiles.forEach(function (tile) {
                tile.hide();
            });
            return this;
        };
        Game.prototype.nextLevel = function () {
            this.initLevel(this.level + 1);
            return this;
        };
        Game.prototype.initLevel = function (level) {
            if (level > 5) return;
            var _this = this;
            this.level = level;
            this.clearLevel();
            this.opened.length = 0;
            this.$gameLevel.text('Уровень ' + level);
            this.$gameClicks.text(0);
            switch(level) {
                case 1:
                    this.talesToSolve = 14;
                    this.tilesInChain = 2;
                    this.timeMax = 301;
                    this.tileMap = [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 16, 17, 18, 19];
                break;
                case 2:
                    this.talesToSolve = 16;
                    this.tilesInChain = 2;
                    this.timeMax = 181;
                    this.tileMap = [0, 1, 2, 3, 4, 5, 7, 9, 10, 12, 14, 15, 16, 17, 18, 19];
                break;
                case 3:
                    this.talesToSolve = 20;
                    this.tilesInChain = 2;
                    this.timeMax = 121;
                    this.tileMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
                break;
                case 4:
                    this.talesToSolve = 18;
                    this.tilesInChain = 3;
                    this.timeMax = 121;
                    this.tileMap = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19];
                break;
                case 5:
                    this.talesToSolve = 20;
                    this.tilesInChain = 4;
                    this.timeMax = 91;
                    this.tileMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
                break;
            }
            this.time = this.timeMax - 1;
            this.$gameTimer.text(this.timeMax - 1);
            for (var i = 0; i < this.talesToSolve; i++) {
                this.numbers.push(i % (this.talesToSolve/this.tilesInChain));
            }
            this.numbers = shuffle(this.numbers);
            this.numbers.forEach(function (el, i) {
                _this.tiles.push(new Tile({
                    number: _this.tileMap[i],
                    imgNumer: el,
                    game: _this
                }));
            });
            this.$gameTask.text(this.tilesInChain + ' ');
            return this;
        };
        Game.prototype.click = function () {
            this.clicks += 1;
            this.clicksTotal += 1;
            this.$gameClicks.text(this.clicks);
            return this;
        };
        Game.prototype.clearLevel = function () {
            this.solved = 0;
            this.scoreLevel = 0;
            this.clicks = 0;
            this.numbers.length = 0;
            this.tiles.forEach(function (el) {
                el.$div.children().remove();
                el.$div.parent().removeClass('active').addClass('locked');
                el.$div.parent().unbind('click');
            });
            this.tiles.length = 0;
            this.opened.length = 0;
            this.$gameTimer.removeClass('red-text');
            return this;
        };
        Game.prototype.completeLevel = function () {
            var _this = this,
                score = (this.timeScoreMax * this.time/this.timeMax + this.clickScoreMax / this.clicks) * this.level;
            this.started = false;
            this.scoreLevel = Math.floor(score);
            this.scoreTotal += this.scoreLevel;
            this.$gameScore.text(this.scoreLevel);
            this.$gameScoreText.text(declinator.declinate(this.scoreLevel));
            this.$gameScoreTotal.text(this.scoreTotal);
            if (this.level < 5) {
                $gamePopupNext.fadeIn();
                this.$gameButtonNext.click(function () {
                    _this.start();
                    _this.$gameButtonNext.unbind('click');
                    $gamePopupNext.fadeOut();
                });
            } else {
                $gamePopupWin.fadeIn();
            }
            return this;
        };
        Game.prototype.failLevel = function () {
            var _this = this;
            this.started = false;
            this.level -= 1;
            this.clearLevel();
            $gamePopupRestart.fadeIn();
            this.$gameButtonRestart.click(function () {
                _this.start();
                _this.$gameButtonRestart.unbind('click');
                $gamePopupRestart.fadeOut();
            });
            return this;
        };
        Game.prototype.winLevel = function () {
            clearInterval(this.interval);
            this.completeLevel();
            return this;
        };
        Game.prototype.openTale = function (tile) {
            var _this = this;
            this.opened.push(tile);
            this.click();
            if (this.opened.length > 1) {
                var imgNumer = this.opened[0].imgNumer,
                    isBindedTales = this.opened.every(function (el) {
                    return el.imgNumer === imgNumer;
                });
                if (!isBindedTales) {
                    setTimeout(function () {
                        _this.opened.forEach(function (el) {
                            el.close();
                        });
                        _this.opened.length = 0;
                    }, 500);
                } else if (this.opened.length > this.tilesInChain - 1) {
                    this.opened.forEach(function (el) {
                        el.solve();
                        _this.solved += 1;
                    });
                    this.opened.length = 0;
                }
                if (this.talesToSolve === this.solved) this.winLevel();
            }
            return this;
        };
        game = new Game({
            $infoDiv: $('.desc-game div')
        });
    }
    initGame();
    $('.preload-img, .preloader-progress').fadeOut(500, function () {
        $('.preloader').animate({
            height: 0
        }, 1000, function () {
            $(this).fadeOut();
        });
    });
    // audio
    var TrackList = function () {
        this.tracks = [
            './music/Placebo - Because I Want You.mp3',
            './music/Placebo - Broken Promise.mp3',
            './music/Placebo - Drag.mp3',
            './music/Placebo - Meds.mp3',
            './music/Placebo - One Of A Kind.mp3'
        ];
        this.currentTrack = 0;
    };
    
    TrackList.prototype.next = function () {
        this.currentTrack += 1;
        if (this.currentTrack > this.tracks.length - 1) {
            this.currentTrack = 0;
        }
        return this.tracks[this.currentTrack];
    };
    
    TrackList.prototype.first = function () {
        return this.tracks[0];
    };
    
    var trackList = new TrackList();
    
    // Setup the player to autoplay the next track
    var audio;
    var aMusic = $('#music')[0];
    audio = window.audiojs.create(aMusic, {
        trackEnded: function() {
            audio.load(trackList.next());
            $radioMusicSongText.text(audio.mp3.slice(8, -4));
            audio.play();
        }
    });
    // Load in the first track
    audio.load(trackList.first());
    
    function showButton() {
        if (audio.playing) {
            $playPause.addClass('active');
        } else {
            $playPause.removeClass('active');
        }
    }
    var $playPause = $('.radio-music-btn-pause'),
        $playNext = $('.radio-music-btn-next');
    $('.radio-music-btn-next-hover').click(function () {
        $playNext.addClass('active');
        setTimeout(function () {
            $playNext.removeClass('active');
        }, 400);
    });
    $radioMusicSongText.text(audio.mp3.slice(8, -4));
    $playPause.click(function(e) {
        e.preventDefault();
        audio.playPause();
        showButton();
    });
    // Load in a track on click
    $('.radio-music-btn-next').click(function(e) {
        e.preventDefault();
        audio.load(trackList.next());
        $radioMusicSongText.text(audio.mp3.slice(8, -4));
        audio.play();
        showButton();
    });
});
}

var imagesToLoad;
function loadImage(src, number, list) {
    loadImage.counter = loadImage.counter || 0;
    loadImage.max = loadImage.max || list.length ;
    var img = new window.Image();
    img.src = src;
    img.onload = function () {
        loadImage.counter++;
        $preloaderProgress.css({'width': (100 * loadImage.counter/loadImage.max) + '%'});
        if (loadImage.counter === loadImage.max) {
            $fridgeInner.attr('src', imagesToLoad[0]);
            initPage();
        }
    };
    return img;
}

function preload() {
    var postfix = '',
        ext = '.png',
        i;

    if( /iP(ad|od|hone)|Android|Blackberry|Windows Phone/i.test(window.navigator.userAgent)) {
        // postfix = '_ipad2';
        postfix = '_tablet';
        ext = '.png';
    }
    if ($window.width() < 400) {
        postfix = '_mobile';
        ext = '.png';
    }
    imagesToLoad = [
        './img/fridge_with_radio' + postfix + '.png',
        './img/question.png',
        './img/blank.png',
        './img/screen.png',
        './img/next.png',
        './img/next_active.png',
        './img/play.png',
        './img/play_active.png'
    ];
    for (i = 0; i < 10; i++) {
        imagesToLoad.push('./img/tile-' + i + '.png');
    }
    for (i = 0; i < 22; i++) {
        var prefix = i < 10 ? '0' : '',
            path = './img/door-' + prefix + i + postfix + ext;
        imagesToLoad.push(path);
        doorsImg.push(path);
    }
    imagesToLoad.forEach(loadImage);
}
preload();
},{"./bg.js":3,"./sfx.js":5,"./share.js":6}],5:[function(require,module,exports){
var sfx = function(url, id) {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new window.AudioContext();
        var buffer, source, destination;
        
        var audio = new window.Audio(),
            canPlayMp3 = !!audio.canPlayType && audio.canPlayType('audio/mp3; codecs=\'vorbis\'') !== '',
            ext = canPlayMp3 ? 'mp3' : 'ogg';
        
        var loadSoundFile = function(url) {
            var xhr = new window.XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function() {
                context.decodeAudioData(this.response,
                    function(decodedArrayBuffer) {
                        buffer = decodedArrayBuffer;
                    }, function(e) {
                        console.log('Error decoding file', e);
                    });
                };
                xhr.send();
        };
        sfx.play = function () {
            source = context.createBufferSource();
            source.buffer = buffer;
            destination = context.destination;
            source.connect(destination);
            source.start(0);
        };
        sfx.skipTo = function () {};
        loadSoundFile(url.slice(0, -3) + ext);
    }
    catch(e) {
        var aSfx = document.getElementById(id);
        sfx = window.audiojs.create(aSfx, {});
        sfx.load(url);
    }
    return sfx;
};

module.exports = sfx;
},{}],6:[function(require,module,exports){
var $ = (window.$);
var share = {
    vk: function (options) {
        var address = 'http://vkontakte.ru/share.php?';
        address += 'url='          + encodeURIComponent(options.url);
        address += '&title='       + encodeURIComponent(options.title);
        address += '&description=' + encodeURIComponent(options.desc);
        if (options.img) address += '&image='       + encodeURIComponent(options.img);
        address += '&noparse=true';
        share.popup(address);
    },
    fb: function (options) {
        var address = 'https://www.facebook.com/dialog/share_open_graph';
        
        // address += 'app_id=145634995501895';
        // address += '&display=popup';
        // address += '&action_type=og.likes';
        // address += '&action_properties=%7B%22object%22%3A%22https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F%22%7D';
        // address += '&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer';
        // 
        $('#fb-meta-url').attr('content', options.url);
        $('#fb-meta-title').attr('content', options.title);
        $('#fb-meta-desc').attr('content', options.desc);
        if (options.img) $('#fb-meta-imag').attr('content', options.img);
        share.popup(address);
    },
    popup: function (address) {
        window.open(address,'','toolbar=0,status=0,width=626,height=436');
    }
};

module.exports = share;
},{}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9DaXJjbGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9hbmltYXRlLmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvYmcuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvc2Z4LmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvc2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQ2lyY2xlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGlzLnJhZGl1cyA9IG9wdGlvbnMucmFkaXVzIHx8IDEwMDtcbiAgICB0aGlzLnBvcyA9IHt9O1xuICAgIHRoaXMucG9zLnggPSBvcHRpb25zLnBvcy54O1xuICAgIHRoaXMucG9zLnkgPSBvcHRpb25zLnBvcy55O1xuICAgIHRoaXMuZGVzdCA9IHt9O1xuICAgIHRoaXMuZGVzdC54ID0gb3B0aW9ucy5kZXN0Lng7XG4gICAgdGhpcy5kZXN0LnkgPSBvcHRpb25zLmRlc3QueTtcbiAgICB0aGlzLmRlc3RGaXJzdCA9IHt9O1xuICAgIHRoaXMuZGVzdEZpcnN0LnggPSBvcHRpb25zLmRlc3QueDtcbiAgICB0aGlzLmRlc3RGaXJzdC55ID0gb3B0aW9ucy5kZXN0Lnk7XG4gICAgdGhpcy5vZmZzZXQgPSB7eDogMCwgeTogMH07XG4gICAgdGhpcy5pbWcgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgdGhpcy5pbWcuc3JjID0gb3B0aW9ucy5pbWc7XG4gICAgdGhpcy52ZWwgPSB7eDogMCwgeTogMH07XG4gICAgdGhpcy5jdHggPSBvcHRpb25zLmN0eDtcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvciB8fCAnI2ZkY2QwMCc7XG4gICAgdGhpcy5zbG93ZG93biA9IDAuOTk7XG4gICAgdGhpcy5jaXJjbGVzID0gb3B0aW9ucy5jaXJjbGVzO1xufTtcblxuQ2lyY2xlLnByb3RvdHlwZS5nZXREaXN0YW5jZSA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh0aGlzLnBvcy54IC0gcG9zLngpICogKHRoaXMucG9zLnggLSBwb3MueCkgKyBcbiAgICAgICAgKHRoaXMucG9zLnkgLSBwb3MueSkgKiAodGhpcy5wb3MueSAtIHBvcy55KSk7XG59O1xuXG5DaXJjbGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgdGhpcy5wb3MueCAtIHRoaXMucmFkaXVzLCB0aGlzLnBvcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzICogMiwgdGhpcy5yYWRpdXMgKiAyKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5DaXJjbGUucHJvdG90eXBlLnVwZFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgWyd4JywgJ3knXS5mb3JFYWNoKGZ1bmN0aW9uIChhaXgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gX3RoaXMuZGVzdFthaXhdICsgX3RoaXMub2Zmc2V0W2FpeF0gLSBfdGhpcy5wb3NbYWl4XTtcbiAgICAgICAgX3RoaXMucG9zW2FpeF0gKz0gZGVsdGEvMTA7XG4gICAgfSk7XG4gICAgdGhpcy5jaXJjbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmIChfdGhpcyAhPT0gZWwpIHtcbiAgICAgICAgICAgIHZhciBkaXN0ID0gX3RoaXMuZ2V0RGlzdGFuY2UoZWwucG9zKSxcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gX3RoaXMucmFkaXVzICogMjtcbiAgICAgICAgICAgIGlmIChkaXN0IDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgIFsneCcsICd5J10uZm9yRWFjaChmdW5jdGlvbiAoYWl4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRWZWwgPSBfdGhpcy52ZWxbYWl4XTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucG9zW2FpeF0gID0gX3RoaXMucG9zW2FpeF0gICsgKChfdGhpcy5wb3NbYWl4XSAtIGVsLnBvc1thaXhdKSAqIChtaW5EaXN0IC0gZGlzdCkgLyAyKSAvIGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgIGVsLnBvc1thaXhdID0gZWwucG9zW2FpeF0gKyAoKGVsLnBvc1thaXhdIC0gX3RoaXMucG9zW2FpeF0pICogKG1pbkRpc3QgLSBkaXN0KSAvIDIpIC8gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudmVsW2FpeF0gPSBlbC52ZWxbYWl4XTtcbiAgICAgICAgICAgICAgICAgICAgZWwudmVsW2FpeF0gPSBvbGRWZWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5DaXJjbGUucHJvdG90eXBlLnVwZFNjcm9sbCA9IGZ1bmN0aW9uICh0b3ApIHtcbiAgICB0aGlzLmRlc3QueSA9IHRoaXMuZGVzdEZpcnN0LnkgKyB0b3A7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2lyY2xlLnByb3RvdHlwZS5ob3ZlciA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICB2YXIgZGlzdFRvRGVzdCA9IE1hdGguc3FydCgodGhpcy5kZXN0LnggLSBwb3MueCkgKiAodGhpcy5kZXN0LnggLSBwb3MueCkgKyBcbiAgICAgICAgKHRoaXMuZGVzdC55IC0gcG9zLnkpICogKHRoaXMuZGVzdC55IC0gcG9zLnkpKTtcbiAgICBpZiAoZGlzdFRvRGVzdCA+IHRoaXMucmFkaXVzICogMikge1xuICAgICAgICB0aGlzLm9mZnNldCA9IHt4OiAwLCB5OiAwfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9mZnNldC54ID0gKHRoaXMucG9zLnggLSBwb3MueCkvMjtcbiAgICAgICAgdGhpcy5vZmZzZXQueSA9ICh0aGlzLnBvcy55IC0gcG9zLnkpLzI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkNpcmNsZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKGRlc3QsIHJhZGl1cykge1xuICAgIHRoaXMuZGVzdC54ID0gZGVzdC54O1xuICAgIHRoaXMuZGVzdC54ID0gZGVzdC54O1xuICAgIHRoaXMuZGVzdEZpcnN0LnkgPSBkZXN0Lnk7XG4gICAgdGhpcy5kZXN0Rmlyc3QueSA9IGRlc3QueTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICByZXR1cm4gdGhpcztcbn07XG5DaXJjbGUucHJvdG90eXBlLnNldFZlbCA9IGZ1bmN0aW9uICh2ZWwpIHtcbiAgICB0aGlzLnZlbC54ID0gdmVsLng7XG4gICAgdGhpcy52ZWwueSA9IHZlbC55O1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNpcmNsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXNcbiAgICAgICAgLnVwZFBvc2l0aW9uKClcbiAgICAgICAgLmRyYXcoKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2lyY2xlOyIsImZ1bmN0aW9uIGFuaW1hdGUobm93TXNlYywgY2FsbGJhY2spIHtcbiAgICB2YXIgZGVsdGFNc2VjO1xuICAgIG5vd01zZWMgPSBub3dNc2VjIHx8IERhdGUubm93KCk7XG4gICAgYW5pbWF0ZS5sYXN0VGltZU1zZWMgPSBhbmltYXRlLmxhc3RUaW1lTXNlYyB8fCBub3dNc2VjIC0gMTAwMCAvIDYwO1xuICAgIGRlbHRhTXNlYyA9IE1hdGgubWluKDEwMCwgbm93TXNlYyAtIGFuaW1hdGUubGFzdFRpbWVNc2VjKTtcbiAgICAvLyBrZWVwIGxvb3BpbmdcbiAgICBhbmltYXRlLmlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAvLyBjaGFuZ2UgbGFzdCB0aW1lXG4gICAgYW5pbWF0ZS5sYXN0VGltZU1zZWMgPSBub3dNc2VjO1xuICAgIC8vIGNhbGwgZWFjaCB1cGRhdGUgZnVuY3Rpb25cbiAgICBpZiAoY2FsbGJhY2spIGFuaW1hdGUuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICBhbmltYXRlLmNhbGxiYWNrKGRlbHRhTXNlYywgbm93TXNlYywgYW5pbWF0ZS5pZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYW5pbWF0ZTsiLCJ2YXIgJCA9ICh3aW5kb3cuJCksXG4gICAgYW5pbWF0ZSA9IHJlcXVpcmUoJy4vYW5pbWF0ZS5qcycpLFxuICAgIENpcmNsZSA9IHJlcXVpcmUoJy4vQ2lyY2xlLmpzJyk7XG5cbjsoZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgICAgICBmdW5jdGlvbigvKiBmdW5jdGlvbiAqLyBjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSgpO1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICAgICAgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgICAgICBmdW5jdGlvbihpZCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSgpO1xufSkoKTtcblxudmFyIGJnID0ge30sXG4gICAgdywgaCxcbiAgICBjaXJjbGVzID0gW10sXG4gICAgeCwgeSwgcmFkaXVzO1xuXG5iZy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmctY2FudmFzJyksXG4gICAgICAgICRwYWdlID0gJCgnLnBhZ2UnKSxcbiAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIHcgPSBwYXJzZUludCgkcGFnZS5jc3MoJ3dpZHRoJyksIDEwKTtcbiAgICAgICAgaCA9IHBhcnNlSW50KCRwYWdlLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdztcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGg7XG4gICAgICAgIHJhZGl1cyA9IHcgLyAxMDtcbiAgICAgICAgY2lyY2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAgICAgaWYgKGkgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgeCA9IDAgKyAwICogcmFkaXVzO1xuICAgICAgICAgICAgICAgIGlmIChpICUgNCA9PT0gMCkgeCArPSAxLjUgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgeSA9IChpICsgMSkgKiByYWRpdXMgKiAwLjg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHggPSB3IC0gMS41ICogcmFkaXVzO1xuICAgICAgICAgICAgICAgIGlmIChpICUgNCA9PT0gMSkgeCArPSAxLjUgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgeSA9IGkgKiByYWRpdXMgKiAwLjg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbC5yZXNpemUoe3g6IHgsIHk6IHl9LCByYWRpdXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzaXplKCk7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCByZXNpemUpO1xuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjY7IGkgKyspIHtcbiAgICAgICAgaWYgKGkgJSAyID09PSAwKSB7XG4gICAgICAgICAgICB4ID0gMCArIDAgKiByYWRpdXM7XG4gICAgICAgICAgICBpZiAoaSAlIDQgPT09IDApIHggKz0gMS41ICogcmFkaXVzO1xuICAgICAgICAgICAgeSA9IChpICsgMSkgKiByYWRpdXMgKiAwLjg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4ID0gdyAtIDEuNSAqIHJhZGl1cztcbiAgICAgICAgICAgIGlmIChpICUgNCA9PT0gMSkgeCArPSAxLjUgKiByYWRpdXM7XG4gICAgICAgICAgICB5ID0gaSAqIHJhZGl1cyAqIDAuODtcbiAgICAgICAgfVxuICAgICAgICBjaXJjbGVzLnB1c2goXG4gICAgICAgICAgICBuZXcgQ2lyY2xlKHtcbiAgICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICBwb3M6IHt4OiB4LCB5OiB5ICsgMTAwMH0sXG4gICAgICAgICAgICAgICAgZGVzdDoge3g6IHgsIHk6IHl9LFxuICAgICAgICAgICAgICAgIGN0eDogY3R4LFxuICAgICAgICAgICAgICAgIGltZzogJy4vaW1nL2JnLXN2Zy0nICsgKGkgJSA2KSArICcuc3ZnJyxcbiAgICAgICAgICAgICAgICBjaXJjbGVzOiBjaXJjbGVzLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgICAgIFxuICAgIGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgICAgIGNpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGVsLnVwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYW5pbWF0ZSgwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCAsIHcgLCBoKTtcbiAgICAgICAgZHJhdygpO1xuICAgIH0pO1xufTtcblxuYmcudXBkU2Nyb2xsID0gZnVuY3Rpb24gKHRvcCkge1xuICAgIGNpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgZWwudXBkU2Nyb2xsKHRvcC8yKTtcbiAgICB9KTtcbn07XG5iZy5ob3ZlciA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICBjaXJjbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsLmhvdmVyKHBvcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJnOyIsInZhciAkID0gKHdpbmRvdy4kKSxcbiAgICBzZnggPSByZXF1aXJlKCcuL3NmeC5qcycpKCcuL3NmeC9zZngtMi5tcDMnLCAnc2Z4JyksXG4gICAgc2hhcmUgPSByZXF1aXJlKCcuL3NoYXJlLmpzJyksXG4gICAgYmcgPSByZXF1aXJlKCcuL2JnLmpzJyk7XG5cbiQod2luZG93KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbnZhciAkcHJlbG9hZGVyUHJvZ3Jlc3MgPSAkKCcucHJlbG9hZGVyLXByb2dyZXNzJyksXG4gICAgJGZyaWRnZUlubmVyID0gJCgnLmZyaWRnZS1pbm5lcicpLFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgZG9vcnNJbWcgPSBbXTtcbiAgICBcbmZ1bmN0aW9uIERlY2xpbmF0b3IoZm9ybXMpIHtcbiAgICB0aGlzLmRlY2xpbmF0ZSA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdmFyIGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xuICAgICAgICByZXR1cm4gZm9ybXNbIChudW1iZXIlMTAwPjQgJiYgbnVtYmVyJTEwMDwyMCk/IDIgOiBjYXNlc1sobnVtYmVyJTEwPDUpP251bWJlciUxMDo1XSBdO1xuICAgIH07XG59XG52YXIgZGVjbGluYXRvciA9IG5ldyBEZWNsaW5hdG9yKFsn0L7Rh9C60L4nLCAn0L7Rh9C60LAnLCAn0L7Rh9C60L7QsiddKTtcblxuZnVuY3Rpb24gaW5pdFBhZ2UoKSB7XG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpdGhEZXNjID0gJCgnLndpdGgtZGVzYycpLFxuICAgICAgICAkZm9vdGVyID0gJCgnLmZvb3RlcicpLFxuICAgICAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS1kb29yLXdyYXAnKSxcbiAgICAgICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICAgICAkbGVmdFRleHQgPSAkKCcubGVmdC10ZXh0JyksXG4gICAgICAgICRyYWRpbyA9ICQoJy5yYWRpby1jb250JyksXG4gICAgICAgICRyYWRpb011c2ljU29uZyA9ICQoJy5yYWRpby1tdXNpYy1zb25nLWhvdmVyJyksXG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQgPSAkKCcucmFkaW8tbXVzaWMtc29uZy10ZXh0JyksXG4gICAgICAgICRkb29yT3BlbmVyID0gJCgnLmRvb3Itb3BlbmVyJyksXG4gICAgICAgICRnYW1lUG9wdXBTdGFydCA9ICQoJy5nYW1lLXBvcHVwLXN0YXJ0Jykuc2hvdygpLFxuICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydCA9ICQoJy5nYW1lLXBvcHVwLXJlc3RhcnQnKSxcbiAgICAgICAgJGdhbWVQb3B1cFJlc3VtZSA9ICQoJy5nYW1lLXBvcHVwLXJlc3VtZScpLFxuICAgICAgICAkZ2FtZVBvcHVwTmV4dD0gJCgnLmdhbWUtcG9wdXAtbmV4dCcpLFxuICAgICAgICAkZ2FtZVBvcHVwV2luID0gJCgnLmdhbWUtcG9wdXAtd2luJyksXG4gICAgICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gICAgdmFyIGhlaWdodCxcbiAgICAgICAgZnJpZGdlSW5uZXJIZWlnaHQsXG4gICAgICAgIHNjcm9sbFN0YXRlcyxcbiAgICAgICAgc2Nyb2xsVG9wID0gMDtcbiAgICBcbiAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIHZhciByYWRpb0hlaWdodCA9ICRyYWRpb1swXS5jbGllbnRXaWR0aCAqIDEyNC8xMDgwICsgMjAsXG4gICAgICAgICAgICBwZXJjZW50ID0gMC41NCxcbiAgICAgICAgICAgIGdhbWVUb3AgPSByYWRpb0hlaWdodCArICRmcmlkZ2VJbm5lclswXS5jbGllbnRXaWR0aCAqICRmcmlkZ2VJbm5lci5hdHRyKCdoZWlnaHQnKS8kZnJpZGdlSW5uZXIuYXR0cignd2lkdGgnKSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgZnJpZGdlSW5uZXJIZWlnaHQgPSBwYXJzZUludCgkZnJpZGdlSW5uZXIuY3NzKCdoZWlnaHQnKSwgMTApIC0gMjA7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICBzY3JvbGxTdGF0ZXMgPSBbMCwgcmFkaW9IZWlnaHQsIE1hdGgubWluKGdhbWVUb3AsIGZyaWRnZUlubmVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KV07XG4gICAgICAgICRwYWdlLmNzcygnaGVpZ2h0JywgTWF0aC5taW4oZ2FtZVRvcCArIHdpbmRvdy5pbm5lckhlaWdodCwgZnJpZGdlSW5uZXJIZWlnaHQpKTtcbiAgICB9XG4gICAgcmVzaXplKCk7XG4gICAgJHdpbmRvdy5vbigncmVzaXplJywgcmVzaXplKTtcbiAgICBcbiAgICAkd2luZG93Lm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBiZy5ob3Zlcih7eDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgKyBzY3JvbGxUb3B9KTtcbiAgICB9KTtcbiAgICBcbiAgICB2YXIgcGF0aHMgPSBbXG4gICAgICAgICdkPVwiTTg5My41LDkzSDk2YzAsMC0zNi42NTItMC4yNi02NSwyOEMzLjkxNywxNDgsMywxODIuNSwzLDE4Mi41djExNjBjMCwwLDksMTMsNTAuNSwxNC41czg2MSwwLDg2MSwwczU2LjgzMiwyLjY2NSw3MC41LTE0LjMzM3YtMTE1NC41Qzk4NSwxODguMTY3LDk4NiwxMDEuNSw4OTMuNSw5M3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNODk1LjUsOTNIOThjMCwwLTM4LjY1Mi0yLjI2LTY3LDI2QzMuOTE3LDE0NiwzLDE4Mi41LDMsMTgyLjV2MTE2NGMwLDAsNCwxMS41LDUyLjUsMTMuNWg4NjFjMCwwLDU1LjgzMywwLjE1Miw2OS41LTE0LjMzM3YtMTE1Ny41Qzk4NiwxODguMTY3LDk4OCwxMDEuNSw4OTUuNSw5M3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNODk1LjUsOTMuMDQzbC03OTcuNS0yYzAsMC00MC42NTItMS4yNi02OSwyN2MtMjcuMDgzLDI3LTI3LDY0LjUtMjcsNjQuNXYxMTY4YzAsMCw1LDEyLjUsNTMuNSwxNC41bDg2MS01YzAsMCw1NS44MzMsMC4xNTIsNjkuNS0xNC4zMzNWMTg4LjIxQzk4NiwxODguMjEsOTg4LDEwMS41NDMsODk1LjUsOTMuMDQzelwiLz4nLFxuICAgICAgICAnZD1cIk04OTYuNTgsOTMuMTQ3bC04MDIuNS00YzAsMC0zNy42NTItMC4yNi02NiwyOGMtMjcuMDgzLDI3LTI2LDY1LjUtMjYsNjUuNXYxMTc2YzAsMCwxMywxMC41LDYxLjUsMTIuNWw4NTQtMTFjMCwwLDU1LjgzMywwLjE1Miw2OS41LTE0LjMzMnYtMTE1Ny41Qzk4Ny4wOCwxODguMzE0LDk4OS4wOCwxMDEuNjQ3LDg5Ni41OCw5My4xNDd6XCIvPicsXG4gICAgICAgICdkPVwiTTg5OC41MDYsOTJsLTgwNy41LTdjMCwwLTM4LjAwNiwwLTYzLDI4Yy0yNS40NjcsMjguNTMtMjYsNTcuNS0yNiw1Ny41djExOTVjMCwwLDYuNjcyLDEyLjgzLDYyLjUsMTQuNXM4NTUtMTgsODU1LTE4czU1LjgzMywwLjE1Miw2OS41LTE0LjMzMlYxODcuMTY3Qzk4OS4wMDYsMTg3LjE2Nyw5OTEuMDA2LDEwMC41LDg5OC41MDYsOTJ6XCIvPicsXG4gICAgICAgICdkPVwiTTkwMS41LDkyLjA2MmwtODA3LjUtMTJjMCwwLTM4LjAwNiwyLTYzLDMwYy0yNS40NjcsMjguNTMtMjcsNTkuNS0yNyw1OS41bC0xLDEyMDJjMCwwLDIuOTk2LDE4LjIyNyw1OC41LDE5LjVjNy4zODEsMC4zODksMjcuODU2LDEuMTY4LDU3LjgzNCwwLjQ5MmMxOTYuODAyLTQuNDM4LDgwMy4xNjYtMjkuNDkyLDgwMy4xNjYtMjkuNDkyczU1LjgzMywxLjE1Miw2OS41LTEzLjMzMlYxODcuMjI5Qzk5MiwxODcuMjI5LDk5NCwxMDAuNTYyLDkwMS41LDkyLjA2MnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTA0LjUsOTFMMTAzLDc0YzAsMC00MS4wMDYsNC02NiwzMmMtMjUuNDY3LDI4LjUyOS0yNiw2NC41LTI2LDY0LjV2MTIxNWMwLDAsMy42NzIsMTYuODMsNTkuNSwxOC41czg1NS00MCw4NTUtNDBzNTYuODMzLDAuMTUyLDcwLjUtMTQuMzMyVjE4Ny4xNjdDOTk2LDE4Ny4xNjcsOTk3LDk5LjUsOTA0LjUsOTF6XCIvPicsXG4gICAgICAgICdkPVwiTTkwOS40NjUsOTAuMTIybC03ODIuNS0yMmMwLDAtNDMuMDM1LTEuMzc4LTc0LDMxcy0yNiw3MS41LTI2LDcxLjVsLTEsMTIyOWMwLDAsMy42NzIsMTYuODMsNTkuNSwxOC41czg0NC01Miw4NDQtNTJzNTcuODMzLTAuODQ4LDcxLjUtMTUuMzMyVjE4Ny4yODlDMTAwMC45NjUsMTg3LjI4OSwxMDAxLjk2NSw5OC42MjIsOTA5LjQ2NSw5MC4xMjJ6XCIvPicsXG4gICAgICAgICdkPVwiTTkxNC41OCw4OS44ODdsLTc3Mi41LTI5YzAsMC00Mi4wMDYsNS02NywzM2MtMjUuNDY3LDI4LjUyOS0yNSw2NC41LTI1LDY0LjV2MTI1NWMwLDAsMCwxOC4yODEsNzkuNTg1LDIyLjI4MWM1NS43ODMsMi44MDQsODAzLjkxNS02Ny43ODEsODAzLjkxNS02Ny43ODFzNTguODMzLTEuODQ4LDcyLjUtMTYuMzMydi0xMTY1LjVDMTAwNi4wOCwxODYuMDU0LDEwMDcuMDgsOTguMzg3LDkxNC41OCw4OS44ODd6XCIvPicsXG4gICAgICAgICdkPVwiTTkyMS4wOCw4OS45NzZsLTczMS41LTM3YzAsMC01Mi4wMDYsMS03NywyOWMtMjUuNDY3LDI4LjUyOS0yOSw1OC41LTI5LDU4LjV2MTI5NmMwLDAsMjAuNjcyLDE0LjgzLDc2LjUsMTYuNXM3NjktODEsNzY5LTgxczczLjkyMS02LjMxLDgzLjUtMTguMzMyVjE4Ni4xNDNDMTAxMi41OCwxODYuMTQzLDEwMTMuNTgsOTguNDc2LDkyMS4wOCw4OS45NzZ6XCIvPicsXG4gICAgICAgICdkPVwiTTkzMS4wOCw4OC45NzZsLTY2NS41LTQyYzAsMC03Ni41OC04LjY0Mi0xMDYsMjRjLTMxLjQwOCwzNC44NDgtMzAsNzMuNS0zMCw3My41bC0xLDEzMTBjMCwwLDIyLjY3MiwxMy44Myw3OC41LDE1LjVzNzM1LTk3LDczNS05N3M2Ni40MjMtNS4zMDksNzguNS0xOC4zMzJWMTg3LjE0M0MxMDIwLjU4LDE4Ny4xNDMsMTAyMy41OCw5Ny40NzYsOTMxLjA4LDg4Ljk3NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTM5LjA4LDg4Ljk3NmwtNTc1LjUtNDVjMCwwLTExMy41OC0xNy42NDItMTQzLDE1Yy0zMS40MDgsMzQuODQ4LTMzLDcwLjUtMzMsNzAuNXYxMzQ1YzAsMCwyMS42NzIsMTAuODMsNzcuNSwxMi41czY4NS0xMTEsNjg1LTExMXM2Ni40MjMtNy4zMDksNzguNS0yMC4zMzJWMTg4LjE0M0MxMDI4LjU4LDE4OC4xNDMsMTAzMS41OCw5Ny40NzYsOTM5LjA4LDg4Ljk3NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTQ2LjA4LDg3Ljk3NmwtNTI5LjUtNTFjMCwwLTk2LjU4LTE5LjY0Mi0xMjYsMTNjLTMxLjQwOCwzNC44NDgtMzMsNzEuNS0zMyw3MS41djEzNzBjMCwwLDMyLjA4OCwxNC41LDExMC41LDE0LjVjMzEuNTM4LDAsMjEzLjk3OC00MS41MzUsMzY2Ljg1LTc1Ljk1OGMxMTcuODYzLTI2LjU0MSwyMTguMTUtNDguMDQyLDIxOC4xNS00OC4wNDJzODIuNTg4LTE1Ljk3NSw4My41LTI0LjMzMmwxLTExNzAuNTAxQzEwMzcuNTgsMTg3LjE0MywxMDM4LjU4LDk2LjQ3Niw5NDYuMDgsODcuOTc2elwiLz4nLFxuICAgICAgICAnZD1cIk05NTUuMDgsODhsLTQzOS41LTUzYzAsMC00OS41ODEtNS4zMzItOTAuOTE0LTkuNjY2Yy0yNS45Mi0yLjcxOC00My40NDUsOC44MjItNTUuMDg2LDE3LjY2NmMtMTYuNjY0LDEyLjY1OS0yMC45OTYsMzEuMTU5LTI1LjQ3Niw0NS41OTdjLTguNDg2LDI3LjM1Ny01LjUyNCw0OC45MDMtNS41MjQsNDguOTAzdjEzNzNjMCwwLDcxLjIyOCwxOC44MTUsMTQ4LjUsNS41YzUwLjI1Ni04LjY2LDEwNS45MjMtMjguOTk3LDI1Ni44NS02OC45NThjMTE2Ljc5LTMwLjkyMywyNTguMTUtNzEuMDQyLDI1OC4xNS03MS4wNDJzNDMuNTg4LTkuOTc1LDQ0LjUtMTguMzMyVjE4Ny4xNjdDMTA0Ni41OCwxODcuMTY3LDEwNDcuNTgsOTYuNSw5NTUuMDgsODh6XCIvPicsXG4gICAgICAgICdkPVwiTTk2NC4wOCw4Ny44NTlsLTQxMi41LTY0YzAsMC03MC41NjctMTUuMTYzLTk0LjU4LDEwLjE0MWMtMzEsMzIuNjY2LTI4LDg4Ljk5OS0yOCw4OC45OTlsLTAuNSwxNDAyLjgzMWMwLDAsNjkuODMzLDE0LjUwMywxNDguMTY2LDQuNTA0YzMxLjI4NC0zLjk5MywzMi4zODEtNy41MDUsMTc5LjY2Ny02MS4wMDFjNzQuMzM0LTI2Ljk5OSwyMTQuNzQ4LTc3LjQ3NCwyMTQuNzQ4LTc3LjQ3NHM1MS4zMDktMTYuODI3LDc2LjQxOS0yNy4wMjVjNS4yMjMtMi4xMjEsNy40MTctNS4yMTEsOC4wODEtNy4zMDdjMS4wMDgtMy4xOCwwLTExNzAuNTAxLDAtMTE3MC41MDFTMTA1Ni41OCw5Ni4zNTksOTY0LjA4LDg3Ljg1OXpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTc1LjUsODZjMCwwLTMyNC41MDItNjcuMDAxLTM0OC41LTcwYy0yMy45OTgtMi45OTktNTQuNjY1LTUuMzY1LTcwLjI0Niw0LjQ1MUM1MjUuMTgxLDQwLjM0MSw1MjUsMTEwLjUsNTI1LDExMC41djE0MjljMCwwLDY5LjU3MywxMy44ODksMTQ3LDEuNWMzNy41LTYsNDMuMTkzLTEzLjk5MiwxODQuOTk5LTgwLjY2OUM5NTcuNjY1LDE0MTIuOTk4LDEwMDEuNSwxMzkxLDEwMDEuNSwxMzkxczYyLjU4OC0yNC45NzUsNjMuNS0zMy4zMzJWMTg2LjE2N0MxMDY1LDE4Ni4xNjcsMTA2Nyw5OSw5NzUuNSw4NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTgyLjMzNSw4NGMwLDAtMjQyLjAwNi02NS45Ni0yNjUuNDg2LTcxLjc1NUM3MDcuNzUsMTAsNjYzLjI1LDUuODU4LDY1NC42NjcsMTEuMzg4QzYyMy4yOTgsMzEuNTk4LDYyNCwxMDguNSw2MjQsMTA4LjV2MTQ0M2MwLDAsNjYuMjg5LDEyLjg2NCwxNDMuNjY2LDAuMTY2YzIyLjMzMi0zLjY2NSw0Ni44NjYtMjMuMjQ3LDE3OC42NjctMTA4YzcxLjY5OS00Ni4xMDUsMTE3LjMzMy03NS42NjYsMTE3LjMzMy03NS42NjZzOS43NTUtNS4zMSwxMC42NjctMTMuNjY3bC0wLjY2Ni0xMTc2QzEwNzMuNjY3LDE3OC4zMzMsMTA3My44MzUsOTcuMDAxLDk4Mi4zMzUsODR6XCIvPicsXG4gICAgICAgICdkPVwiTTEwMjUuMzM1LDk0LjY2N2MwLDAtMTk3Ljg1My04MC41MzgtMjIxLjMzMy04Ni4zMzNDNzk0LjkwMyw2LjA4OCw3NTIuNDM4LDIuNzg5LDc0NC4zMzUsOUM3MTkuOTg0LDI3LjY2Nyw3MjEsMTEwLjUsNzIxLDExMC41djE0NTBjMCwwLDg3LjQ5Miw4Ljc5NiwxNDMuNjY2LTQuODM0YzM0LjMzNS04LjMzMSw1NC42NjgtNDAuMzMxLDE0MS42NjctMTIxLjMzMmMzNy4yODctMzQuNzE3LDU3LjA0Mi01NC45NTksNTcuMDQyLTU0Ljk1OXMxOS4xMjUtMTUuNSwxOC45NTgtMjMuMDQyYzAsMCwwLjE3MS0xMTM2LjA4Mi0wLjMzMS0xMTQ1LjMzM1MxMDkxLjUsMTI3LjUsMTAyNS4zMzUsOTQuNjY3elwiLz4nLFxuICAgICAgICAnZD1cIk0xMDE1Ljc1LDgxYzAsMC05MC02Mi41LTExMy4yMzQtNzAuMDIxYy00LjY0OC0xLjUwNS0xMS4yMjMtNC4wMjctMTguNTM4LTUuMzQ0Yy0xMS4yNTUtMi4wMjctMjQuMjY2LTIuMjcxLTM0LjcyOC0yLjI1M0M4NDAuNjQsMy4zOTYsODMzLjc1NiwzLjI2NCw4MzEsNS4yNWMtMTcsMTIuMjUtMTYuMzMzLDEwMS45ODMtMTYuMzMzLDEwMS45ODN2MTQ1OWMwLDAsOTQuMzMxLDguNDMyLDE0My42NjYtNi44MzRjMjIuNDMxLTYuOTQsMzQuMzM0LTM5LjM5OSw3Mi4zMzQtMTAwLjczMmM0NC44OTYtNzIuNDYzLDU0LjY2Ni05MC45MzQsNTQuNjY2LTkwLjkzNHM0LjY2Ny01LjczNyw0LjY2Ny0xNC42NjdsMC4zMzQtMTE3NkMxMDkwLjMzNCwxNzcuMDY3LDEwOTMuMjUsMTIyLDEwMTUuNzUsODF6XCIvPicsXG4gICAgICAgICdkPVwiTTEwNjUuNTk1LDEwMi40MzhjLTQuNjQzLTYuNzgzLTI0LjU5NC00NC4xMDQtNDQuMDk1LTY1LjQzOGMtMTYuMjUtMTcuNzc3LTMwLjExNi0yNC4xMzktNDAuNS0yNy41Yy00LjY0OC0xLjUwNS0xNy4yMS00LjItMjQuNTI1LTUuNTE4Yy0xMS4yNTUtMi4wMjctMjcuNzYzLTEuOTk5LTM4LjIyNS0xLjk4MWMtOC42MSwwLjAxNS0xMC40MjYtMC45NzQtMTEuNSwyLjI0OWMtNi41ODIsMTkuNzUtNi4wODMsOTkuNjAzLTYuMDgzLDk5LjYwM2wtMSwxNDY4YzAsMCw4Mi40OTgsNi42NjMsMTMxLjgzMy04LjYwM2M4LjE4OC0yLjUzMywxOC40ODUtNC40MjMsMjEuOTUtMTQuMjYyYzYuMTUtMTcuNDYzLDExLjAyNC00Ni4yNjIsMjAuNTUtODguNDg4YzE4Ljc1Ny04My4xNTQsMjIuNS0xMDEuNzUsMjIuNS0xMDEuNzVzMC0zMS4wNywwLTQwbC0wLjA2Mi04MDcuMjUybDMwLjA2Mi0wLjYyM3YtMzQuOTU5bC0yOS43NjUtMC4xNjRMMTA5Ni41LDIzMWMwLDAsMC43NjctNDguMjE5LTEuMzk5LTY5Ljc3NEMxMDkzLjQ2NSwxNDQuOTUyLDEwNjkuOTgyLDEwOC44NDgsMTA2NS41OTUsMTAyLjQzOHpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTc0Ljk5NywxLjMzM1Y3NmMwLDAtNy4xNjYsMC44MzMtNy4xNjYsMTAuNXMwLDEzODAuMDAzLDAsMTM4MC4wMDNzMi4zMzMsMy45OTksNi44MzMsNS44MzNsMC4zMzUsMTAwLjU3OGMwLDAsMTE5LjAwMSw3LjMzNiwxNDMuNTAxLTE3LjkxNGMwLDAsMi41MDEtMS4xNjUsMi41MDEtOC40OTljMC01Ljg4My0wLjAyOC0xMDM3LjU2Mi0wLjAyOC0xMDM3LjU2Mmw3Ljk2NS0wLjA2M2w0LjA2MiwyLjI1bDQ0LjAwMS0wLjM3NXYtMzQuMzc1bC00NC4wOTMtMC4wMTVsLTQuMjgzLDIuNzY1bC03LjI2OSwwLjAxN2wtMC4zNTUtNDYuMzA3YzAsMCwyLjk5OS03Mi4zMzUsMi45OTktMTA1LjgzNXMwLjMzMy0xMDMuNjY3LDAtMTE0LjY2N3MtMi4zMzQtMzYuNjY3LTIuNjY3LTQ2cy0xLTU2LjY2Ny0xLTU2LjY2N3MtMC4zNC00Mi4xNTYtMzQuMzMzLTc2QzEwNTMuMjUsMS4wNjEsMTAwNS4zMjcsMCw5NzQuOTk3LDEuMzMzelwiLz4nLFxuICAgICAgICAnZD1cIk05ODcuNzUsODguMjVsLTMuNSw1NC43NWMwLDAtMi41LDYuNS0yLjYyNSwxOC4zNzVzMCwxMTE5LjQ1NywwLDExMTkuNDU3czAuMDQyLDEwLjQ5OSwxLjM3NSwxNC4zMzNzMS4xNiw5LDEuMTYsOXYzMy41bDUxLjM0LDIzNS44MzVjMCwwLDc0LjgxLDEuOTM0LDk3Ljc1LTNjMjMuMjUtNSwzMy4zNzUtNi44NzUsNDItMThWMTUzMWwtMC4wOTgtMTAyMS4yMzdsNDcuMDk4LDAuODYyVjQ3NC4yNWwtNDcuMjk3LDEuNzRsMC4yOTctMzU5Ljc0YzAsMCwwLjc1LTQ3LjY5OS0zNC4yNS04Mi4yNXMtODMuMTY3LTM0LjU1MS0xMDkuNS0zNEw5ODcuNzUsODguMjV6XCIvPidcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gbG9hZERvb3JJbWFnZXMoKSB7XG4gICAgICAgIGRvb3JzSW1nLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgIC8vICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAvLyAgICAgaW1nLnNyYyA9IGVsO1xuICAgICAgICAgICAgJGZyaWRnZS5hcHBlbmQoJzxzdmcgY2xhc3M9XCJmcmlkZ2UtdG9wLWltZyBkb29yLScgKyBpICsgXG4gICAgICAgICAgICAgICAgJ1wiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCInICtcbiAgICAgICAgICAgICAgICAneG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIicgK1xuICAgICAgICAgICAgICAgICcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTIyNSAxNTc2XCIgJyArXG4gICAgICAgICAgICAgICAgJ2VuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCAxMjI1IDE1NzZcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGVmcz48cGF0aCBpZD1cIlNWR0lEJyArIGkgKyAnXCIgJyArIHBhdGhzW2ldICsnIDwvZGVmcz4nICtcbiAgICAgICAgICAgICAgICAnPGNsaXBQYXRoIGlkPVwiU1ZHSURfJyArIGkgKydcIj4nICtcbiAgICAgICAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI1NWR0lEJyArIGkgKyAnXCInICsgJyBvdmVyZmxvdz1cInZpc2libGVcIj48L3VzZT4nICtcbiAgICAgICAgICAgICAgICAnPC9jbGlwUGF0aD4nICtcbiAgICAgICAgICAgICAgICAnPGltYWdlIGNsaXAtcGF0aD1cInVybCgjU1ZHSURfJyArIGkgKyAnKVwiIG92ZXJmbG93PVwidmlzaWJsZVwiIHdpZHRoPVwiMTIyNVwiJyArXG4gICAgICAgICAgICAgICAgJ2hlaWdodD1cIjE1NzZcIiB4bGluazpocmVmPVwiJyArIGVsICsgJ1wiPjwvaW1hZ2U+JyArXG4gICAgICAgICAgICAgICAgJzwvc3ZnPicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZERvb3JJbWFnZXMoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICAgICAgdmFyIGNsYXNzZXNUb1JlbW92ZSA9ICcnO1xuICAgICAgICBuID0gbiArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjbGFzc2VzVG9SZW1vdmUgKz0gbmFtZSArIGkgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXNzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHZhciBkZXNjQ2xhc3Nlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnd2l0aC1kZXNjLScsIDYpO1xuICAgIHZhciBmcmlkZ2VDbGFzc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKCdvcGVuLScsIDIzKTtcbiAgICBcbiAgICAkd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzIxKjE4KSByZXR1cm47XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KS5hZGRDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgICAgIHNmeC5wbGF5KCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICAgICAgc2Z4LnNraXBUbygwKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yMSoxOCkgcmV0dXJuO1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsIGhlaWdodCkucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJHJhZGlvTXVzaWNTb25nLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC5hZGRDbGFzcygnYW5pbWF0ZS1zY3JvbGwnKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSAmJiBzY3JvbGxUb3AgPCBoLzIxKjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMiAmJiBzY3JvbGxUb3AgPCBoLzIxKjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMyAmJiBzY3JvbGxUb3AgPCBoLzIxKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNCAmJiBzY3JvbGxUb3AgPCBoLzIxKjUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNSAmJiBzY3JvbGxUb3AgPCBoLzIxKjYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNiAmJiBzY3JvbGxUb3AgPCBoLzIxKjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNyAmJiBzY3JvbGxUb3AgPCBoLzIxKjgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOCAmJiBzY3JvbGxUb3AgPCBoLzIxKjkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOSAmJiBzY3JvbGxUb3AgPCBoLzIxKjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEwICYmIHNjcm9sbFRvcCA8IGgvMjEqMTEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjExICYmIHNjcm9sbFRvcCA8IGgvMjEqMTIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEyICYmIHNjcm9sbFRvcCA8IGgvMjEqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEzICYmIHNjcm9sbFRvcCA8IGgvMjEqMTQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE0ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE1ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE2ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE3ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE4ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE5ICYmIHNjcm9sbFRvcCA8IGgvMjEqMjApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjIwICYmIHNjcm9sbFRvcCA8IGgvMjEqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPj0gaC8yMSoyMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIxJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKHNjcm9sbCkge1xuICAgICAgICBzY3JvbGxUb3AgPSAtc2Nyb2xsO1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsICdhdXRvJykucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSk7XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMTIpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yNCoxNSkge1xuICAgICAgICAgICAgJGRvb3JPcGVuZXIucmVtb3ZlQ2xhc3MoJ2JlaGluZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGRvb3JPcGVuZXIuYWRkQ2xhc3MoJ2JlaGluZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxTdGF0ZXNbMl0gLSBzY3JvbGxUb3AgPCBmcmlkZ2VJbm5lckhlaWdodCAqIDAuMDUpIHtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKGRlc2NDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdhbWUucGF1c2UoKTtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIHNjcm9sbFN0YXRlc1sxXSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBteVNjcm9sbDtcbiAgICBmdW5jdGlvbiBpbml0TXlTY3JvbGwoKSB7XG4gICAgICAgIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHtcbiAgICAgICAgICAgIHByb2JlVHlwZTogMyxcbiAgICAgICAgICAgIG1vdXNlV2hlZWw6IHRydWUsXG4gICAgICAgICAgICBjbGljazogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBpbnRlcmFjdGl2ZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBmYWRlU2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHNocmlua1Njcm9sbGJhcnM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgICAgICAgIHNjcm9sbFBhZ2UobXlTY3JvbGwueSk7XG4gICAgICAgICAgICBiZy51cGRTY3JvbGwobXlTY3JvbGwueSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbEVuZCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gd2luZG93LmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpbml0TXlTY3JvbGwoKTtcbiAgICBiZy5pbml0KCk7XG4gICAgLy8gfTtcbiAgICBcbiAgICAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcubmF2LW1haW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtb3VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIGdhbWVcbiAgICB2YXIgZ2FtZTtcbiAgICBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleCA7XG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gICAgICAgIHZhciAkZ2FtZUZpZWxkQ2VsbCA9ICQoJy5nYW1lLWZpZWxkLWNlbGwnKS5yZW1vdmUoKSxcbiAgICAgICAgICAgICRnYW1lRmllbGQgPSAkKCcuZ2FtZS1maWVsZCcpLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIFxuICAgICAgICAkKCcuZ2FtZS1wb3B1cC1uZXh0IC5zb2NpYWwtdmsgc3ZnJykuY2xvbmUoKS5hcHBlbmRUbygnLmdhbWUtcG9wdXAtd2luIC5zb2NpYWwtdmsnKTtcbiAgICAgICAgJCgnLmdhbWUtcG9wdXAtbmV4dCAuc29jaWFsLWZiIHN2ZycpLmNsb25lKCkuYXBwZW5kVG8oJy5nYW1lLXBvcHVwLXdpbiAuc29jaWFsLWZiJyk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciAkY3VyckdhbWVGaWVsZENlbGwgPSAkZ2FtZUZpZWxkQ2VsbC5jbG9uZSgpO1xuICAgICAgICAgICAgaWYgKGkgJSA1ID09PSAwKSAkY3VyckdhbWVGaWVsZENlbGwuYWRkQ2xhc3MoJ2NvbC14cy1vZmZzZXQtMScpO1xuICAgICAgICAgICAgJGN1cnJHYW1lRmllbGRDZWxsLmNoaWxkcmVuKCcuZ2FtZS10aWxlJykuYWRkQ2xhc3MoJ2dhbWUtdGlsZS0nICsgaSk7XG4gICAgICAgICAgICAkZ2FtZUZpZWxkLmFwcGVuZCgkY3VyckdhbWVGaWVsZENlbGwpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2ltZy90aWxlLScgKyBpICsgJy5wbmcnO1xuICAgICAgICAgICAgaW1hZ2VzLnB1c2goaW1nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgVGlsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBvcHRpb25zLm51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuaW1nTnVtZXIgPSBvcHRpb25zLmltZ051bWVyO1xuICAgICAgICAgICAgdGhpcy4kZGl2ID0gJCgnLmdhbWUtdGlsZS0nICsgb3B0aW9ucy5udW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5pbWcgPSBpbWFnZXNbb3B0aW9ucy5pbWdOdW1lcl07XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lO1xuICAgICAgICAgICAgdGhpcy4kZGl2LmFwcGVuZCgkKHRoaXMuaW1nKS5jbG9uZSgpKTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzU29sdmVkIHx8IF90aGlzLmlzTG9ja2VkIHx8IF90aGlzLmlzT3BlbiB8fCAhX3RoaXMuZ2FtZS5zdGFydGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5vcGVuVGFsZSh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLnNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS51bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEdhbWUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAwO1xuICAgICAgICAgICAgdGhpcy5zb2x2ZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWVTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICAgICAgICAgIHRoaXMubG9ja2VkSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLmJhY2tJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25TdGFydCA9ICQoJy5zdGFydC1nYW1lJylcbiAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvblN0YXJ0LnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgJGdhbWVQb3B1cFN0YXJ0LmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3RhcnQgPSAkKCcucmVzdGFydC1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdW1lID0gJCgnLnJlc3VtZS1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uTmV4dCA9ICQoJy5uZXh0LWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGluZm9EaXYgPSBvcHRpb25zLiRpbmZvRGl2O1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zaG93RGVsYXkgPSAzMDAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZSA9ICQoJy5nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIgPSAkKCcuZ2FtZS10aW1lcicpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcyA9ICQoJy5nYW1lLWNsaWNrcycpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlID0gJCgnLmdhbWUtc2NvcmUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRleHQgPSAkKCcuZ2FtZS1zY29yZS10ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUb3RhbCA9ICQoJy5nYW1lLXNjb3JlLXRvdGFsJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lTGV2ZWwgPSAkKCcuZ2FtZS1sZXZlbCcpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRhc2sgPSAkKCcuZ2FtZS10YXNrJyk7XG4gICAgICAgICAgICAkKCcuc29jaWFsLXZrLWxldmVsLWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2hhcmUudmsoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDInLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Cc0LjQvdC40YHRgtC10YDRgdGC0LLQviDQk9Cw0LfQuNGA0L7QstC60LgnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiAn0K8g0L3QsNCx0YDQsNC7ICcgKyBfdGhpcy5zY29yZVRvdGFsICsgJyAnICsgZGVjbGluYXRvci5kZWNsaW5hdGUoX3RoaXMuc2NvcmVUb3RhbClcbiAgICAgICAgICAgICAgICAgICAgLy8gaW1nOiAnbGluaydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLnNvY2lhbC1mYi1sZXZlbC1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNoYXJlLmZiKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAyJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQnNC40L3QuNGB0YLQtdGA0YHRgtCy0L4g0JPQsNC30LjRgNC+0LLQutC4JyxcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogJ9CvINC90LDQsdGA0LDQuyAnICsgX3RoaXMuc2NvcmVUb3RhbCArICcgJyArIGRlY2xpbmF0b3IuZGVjbGluYXRlKF90aGlzLnNjb3JlVG90YWwpXG4gICAgICAgICAgICAgICAgICAgIC8vIGltZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKCcuc29jaWFsLXZrLXdpbi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNoYXJlLnZrKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAyJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQnNC40L3QuNGB0YLQtdGA0YHRgtCy0L4g0JPQsNC30LjRgNC+0LLQutC4JyxcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogJ9CvINC90LDQsdGA0LDQuyAnICsgX3RoaXMuc2NvcmVUb3RhbCArICcgJyArIGRlY2xpbmF0b3IuZGVjbGluYXRlKF90aGlzLnNjb3JlVG90YWwpXG4gICAgICAgICAgICAgICAgICAgIC8vIGltZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKCcuc29jaWFsLWZiLXdpbi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNoYXJlLmZiKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAyJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQnNC40L3QuNGB0YLQtdGA0YHRgtCy0L4g0JPQsNC30LjRgNC+0LLQutC4JyxcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogJ9CvINC90LDQsdGA0LDQuyAnICsgX3RoaXMuc2NvcmVUb3RhbCArICcgJyArIGRlY2xpbmF0b3IuZGVjbGluYXRlKF90aGlzLnNjb3JlVG90YWwpXG4gICAgICAgICAgICAgICAgICAgIC8vIGltZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5uZXh0TGV2ZWwoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q291bnQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5zdGFydENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGltZSA9IE1hdGgucm91bmQoX3RoaXMudGltZU1heCAtIChEYXRlLm5vdygpIC0gX3RoaXMuc3RhcnRUaW1lKS8xMDAwKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZVRpbWVyLnRleHQoX3RoaXMudGltZSk7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRpbWUgPT09IDIwKSBfdGhpcy4kZ2FtZVRpbWVyLmFkZENsYXNzKCdyZWQtdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZhaWxMZXZlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgICRnYW1lUG9wdXBSZXN1bWUuZmFkZUluKCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdW1lLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvblJlc3VtZS51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cFJlc3VtZS5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpIC0gKHRoaXMudGltZU1heCAtIHRoaXMudGltZSkgKiAxMDAwO1xuICAgICAgICAgICAgdGhpcy5zdGFydENvdW50KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICAgICAgdGlsZS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5uZXh0TGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRMZXZlbCh0aGlzLmxldmVsICsgMSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuaW5pdExldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiA1KSByZXR1cm47XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUxldmVsLnRleHQoJ9Cj0YDQvtCy0LXQvdGMICcgKyBsZXZlbCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzLnRleHQoMCk7XG4gICAgICAgICAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMzAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgOSwgMTAsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxODE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA3LCA5LCAxMCwgMTIsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxMjE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDEyMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDksIDEwLCAxMSwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSA0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSA5MTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZU1heCAtIDE7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIudGV4dCh0aGlzLnRpbWVNYXggLSAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWxlc1RvU29sdmU7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVycy5wdXNoKGkgJSAodGhpcy50YWxlc1RvU29sdmUvdGhpcy50aWxlc0luQ2hhaW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IHNodWZmbGUodGhpcy5udW1iZXJzKTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbGVzLnB1c2gobmV3IFRpbGUoe1xuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IF90aGlzLnRpbGVNYXBbaV0sXG4gICAgICAgICAgICAgICAgICAgIGltZ051bWVyOiBlbCxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogX3RoaXNcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrLnRleHQodGhpcy50aWxlc0luQ2hhaW4gKyAnICcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MudGV4dCh0aGlzLmNsaWNrcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xlYXJMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgICAgIGVsLiRkaXYucGFyZW50KCkudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRpbWVyLnJlbW92ZUNsYXNzKCdyZWQtdGV4dCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNvbXBsZXRlTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHNjb3JlID0gKHRoaXMudGltZVNjb3JlTWF4ICogdGhpcy50aW1lL3RoaXMudGltZU1heCArIHRoaXMuY2xpY2tTY29yZU1heCAvIHRoaXMuY2xpY2tzKSAqIHRoaXMubGV2ZWw7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IE1hdGguZmxvb3Ioc2NvcmUpO1xuICAgICAgICAgICAgdGhpcy5zY29yZVRvdGFsICs9IHRoaXMuc2NvcmVMZXZlbDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZS50ZXh0KHRoaXMuc2NvcmVMZXZlbCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUZXh0LnRleHQoZGVjbGluYXRvci5kZWNsaW5hdGUodGhpcy5zY29yZUxldmVsKSk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUb3RhbC50ZXh0KHRoaXMuc2NvcmVUb3RhbCk7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbCA8IDUpIHtcbiAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwTmV4dC5mYWRlSW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uTmV4dC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uTmV4dC51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICRnYW1lUG9wdXBOZXh0LmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cFdpbi5mYWRlSW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5mYWlsTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmxldmVsIC09IDE7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGV2ZWwoKTtcbiAgICAgICAgICAgICRnYW1lUG9wdXBSZXN0YXJ0LmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3RhcnQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b25SZXN0YXJ0LnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydC5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS53aW5MZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlTGV2ZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vcGVuVGFsZSA9IGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGltZ051bWVyID0gdGhpcy5vcGVuZWRbMF0uaW1nTnVtZXIsXG4gICAgICAgICAgICAgICAgICAgIGlzQmluZGVkVGFsZXMgPSB0aGlzLm9wZW5lZC5ldmVyeShmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLmltZ051bWVyID09PSBpbWdOdW1lcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQmluZGVkVGFsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3BlbmVkLmxlbmd0aCA+IHRoaXMudGlsZXNJbkNoYWluIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNvbHZlZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFsZXNUb1NvbHZlID09PSB0aGlzLnNvbHZlZCkgdGhpcy53aW5MZXZlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIGdhbWUgPSBuZXcgR2FtZSh7XG4gICAgICAgICAgICAkaW5mb0RpdjogJCgnLmRlc2MtZ2FtZSBkaXYnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW5pdEdhbWUoKTtcbiAgICAkKCcucHJlbG9hZC1pbWcsIC5wcmVsb2FkZXItcHJvZ3Jlc3MnKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcucHJlbG9hZGVyJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfSwgMTAwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIGF1ZGlvXG4gICAgdmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQmVjYXVzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQnJva2VuIFByb21pc2UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBEcmFnLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gTWVkcy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIE9uZSBPZiBBIEtpbmQubXAzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzWzBdO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyYWNrTGlzdCA9IG5ldyBUcmFja0xpc3QoKTtcbiAgICBcbiAgICAvLyBTZXR1cCB0aGUgcGxheWVyIHRvIGF1dG9wbGF5IHRoZSBuZXh0IHRyYWNrXG4gICAgdmFyIGF1ZGlvO1xuICAgIHZhciBhTXVzaWMgPSAkKCcjbXVzaWMnKVswXTtcbiAgICBhdWRpbyA9IHdpbmRvdy5hdWRpb2pzLmNyZWF0ZShhTXVzaWMsIHtcbiAgICAgICAgdHJhY2tFbmRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiB0aGUgZmlyc3QgdHJhY2tcbiAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5maXJzdCgpKTtcbiAgICBcbiAgICBmdW5jdGlvbiBzaG93QnV0dG9uKCkge1xuICAgICAgICBpZiAoYXVkaW8ucGxheWluZykge1xuICAgICAgICAgICAgJHBsYXlQYXVzZS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcGxheVBhdXNlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgJHBsYXlQYXVzZSA9ICQoJy5yYWRpby1tdXNpYy1idG4tcGF1c2UnKSxcbiAgICAgICAgJHBsYXlOZXh0ID0gJCgnLnJhZGlvLW11c2ljLWJ0bi1uZXh0Jyk7XG4gICAgJCgnLnJhZGlvLW11c2ljLWJ0bi1uZXh0LWhvdmVyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkcGxheU5leHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRwbGF5TmV4dC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0sIDQwMCk7XG4gICAgfSk7XG4gICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICRwbGF5UGF1c2UuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLnBsYXlQYXVzZSgpO1xuICAgICAgICBzaG93QnV0dG9uKCk7XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiBhIHRyYWNrIG9uIGNsaWNrXG4gICAgJCgnLnJhZGlvLW11c2ljLWJ0bi1uZXh0JykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICBzaG93QnV0dG9uKCk7XG4gICAgfSk7XG59KTtcbn1cblxudmFyIGltYWdlc1RvTG9hZDtcbmZ1bmN0aW9uIGxvYWRJbWFnZShzcmMsIG51bWJlciwgbGlzdCkge1xuICAgIGxvYWRJbWFnZS5jb3VudGVyID0gbG9hZEltYWdlLmNvdW50ZXIgfHwgMDtcbiAgICBsb2FkSW1hZ2UubWF4ID0gbG9hZEltYWdlLm1heCB8fCBsaXN0Lmxlbmd0aCA7XG4gICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvYWRJbWFnZS5jb3VudGVyKys7XG4gICAgICAgICRwcmVsb2FkZXJQcm9ncmVzcy5jc3Moeyd3aWR0aCc6ICgxMDAgKiBsb2FkSW1hZ2UuY291bnRlci9sb2FkSW1hZ2UubWF4KSArICclJ30pO1xuICAgICAgICBpZiAobG9hZEltYWdlLmNvdW50ZXIgPT09IGxvYWRJbWFnZS5tYXgpIHtcbiAgICAgICAgICAgICRmcmlkZ2VJbm5lci5hdHRyKCdzcmMnLCBpbWFnZXNUb0xvYWRbMF0pO1xuICAgICAgICAgICAgaW5pdFBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGltZztcbn1cblxuZnVuY3Rpb24gcHJlbG9hZCgpIHtcbiAgICB2YXIgcG9zdGZpeCA9ICcnLFxuICAgICAgICBleHQgPSAnLnBuZycsXG4gICAgICAgIGk7XG5cbiAgICBpZiggL2lQKGFkfG9kfGhvbmUpfEFuZHJvaWR8QmxhY2tiZXJyeXxXaW5kb3dzIFBob25lL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgLy8gcG9zdGZpeCA9ICdfaXBhZDInO1xuICAgICAgICBwb3N0Zml4ID0gJ190YWJsZXQnO1xuICAgICAgICBleHQgPSAnLnBuZyc7XG4gICAgfVxuICAgIGlmICgkd2luZG93LndpZHRoKCkgPCA0MDApIHtcbiAgICAgICAgcG9zdGZpeCA9ICdfbW9iaWxlJztcbiAgICAgICAgZXh0ID0gJy5wbmcnO1xuICAgIH1cbiAgICBpbWFnZXNUb0xvYWQgPSBbXG4gICAgICAgICcuL2ltZy9mcmlkZ2Vfd2l0aF9yYWRpbycgKyBwb3N0Zml4ICsgJy5wbmcnLFxuICAgICAgICAnLi9pbWcvcXVlc3Rpb24ucG5nJyxcbiAgICAgICAgJy4vaW1nL2JsYW5rLnBuZycsXG4gICAgICAgICcuL2ltZy9zY3JlZW4ucG5nJyxcbiAgICAgICAgJy4vaW1nL25leHQucG5nJyxcbiAgICAgICAgJy4vaW1nL25leHRfYWN0aXZlLnBuZycsXG4gICAgICAgICcuL2ltZy9wbGF5LnBuZycsXG4gICAgICAgICcuL2ltZy9wbGF5X2FjdGl2ZS5wbmcnXG4gICAgXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpbWFnZXNUb0xvYWQucHVzaCgnLi9pbWcvdGlsZS0nICsgaSArICcucG5nJyk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyMjsgaSsrKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBpIDwgMTAgPyAnMCcgOiAnJyxcbiAgICAgICAgICAgIHBhdGggPSAnLi9pbWcvZG9vci0nICsgcHJlZml4ICsgaSArIHBvc3RmaXggKyBleHQ7XG4gICAgICAgIGltYWdlc1RvTG9hZC5wdXNoKHBhdGgpO1xuICAgICAgICBkb29yc0ltZy5wdXNoKHBhdGgpO1xuICAgIH1cbiAgICBpbWFnZXNUb0xvYWQuZm9yRWFjaChsb2FkSW1hZ2UpO1xufVxucHJlbG9hZCgpOyIsInZhciBzZnggPSBmdW5jdGlvbih1cmwsIGlkKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgd2luZG93LkF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpO1xuICAgICAgICB2YXIgYnVmZmVyLCBzb3VyY2UsIGRlc3RpbmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgdmFyIGF1ZGlvID0gbmV3IHdpbmRvdy5BdWRpbygpLFxuICAgICAgICAgICAgY2FuUGxheU1wMyA9ICEhYXVkaW8uY2FuUGxheVR5cGUgJiYgYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL21wMzsgY29kZWNzPVxcJ3ZvcmJpc1xcJycpICE9PSAnJyxcbiAgICAgICAgICAgIGV4dCA9IGNhblBsYXlNcDMgPyAnbXAzJyA6ICdvZ2cnO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxvYWRTb3VuZEZpbGUgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHRoaXMucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGRlY29kZWRBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZGVjb2RlZEFycmF5QnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZGVjb2RpbmcgZmlsZScsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH07XG4gICAgICAgIHNmeC5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc291cmNlID0gY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGNvbnRleHQuZGVzdGluYXRpb247XG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICBzb3VyY2Uuc3RhcnQoMCk7XG4gICAgICAgIH07XG4gICAgICAgIHNmeC5za2lwVG8gPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgbG9hZFNvdW5kRmlsZSh1cmwuc2xpY2UoMCwgLTMpICsgZXh0KTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICB2YXIgYVNmeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgc2Z4ID0gd2luZG93LmF1ZGlvanMuY3JlYXRlKGFTZngsIHt9KTtcbiAgICAgICAgc2Z4LmxvYWQodXJsKTtcbiAgICB9XG4gICAgcmV0dXJuIHNmeDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2Z4OyIsInZhciAkID0gKHdpbmRvdy4kKTtcbnZhciBzaGFyZSA9IHtcbiAgICB2azogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSAnaHR0cDovL3Zrb250YWt0ZS5ydS9zaGFyZS5waHA/JztcbiAgICAgICAgYWRkcmVzcyArPSAndXJsPScgICAgICAgICAgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy51cmwpO1xuICAgICAgICBhZGRyZXNzICs9ICcmdGl0bGU9JyAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLnRpdGxlKTtcbiAgICAgICAgYWRkcmVzcyArPSAnJmRlc2NyaXB0aW9uPScgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5kZXNjKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuaW1nKSBhZGRyZXNzICs9ICcmaW1hZ2U9JyAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmltZyk7XG4gICAgICAgIGFkZHJlc3MgKz0gJyZub3BhcnNlPXRydWUnO1xuICAgICAgICBzaGFyZS5wb3B1cChhZGRyZXNzKTtcbiAgICB9LFxuICAgIGZiOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgYWRkcmVzcyA9ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vZGlhbG9nL3NoYXJlX29wZW5fZ3JhcGgnO1xuICAgICAgICBcbiAgICAgICAgLy8gYWRkcmVzcyArPSAnYXBwX2lkPTE0NTYzNDk5NTUwMTg5NSc7XG4gICAgICAgIC8vIGFkZHJlc3MgKz0gJyZkaXNwbGF5PXBvcHVwJztcbiAgICAgICAgLy8gYWRkcmVzcyArPSAnJmFjdGlvbl90eXBlPW9nLmxpa2VzJztcbiAgICAgICAgLy8gYWRkcmVzcyArPSAnJmFjdGlvbl9wcm9wZXJ0aWVzPSU3QiUyMm9iamVjdCUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGZGV2ZWxvcGVycy5mYWNlYm9vay5jb20lMkZkb2NzJTJGJTIyJTdEJztcbiAgICAgICAgLy8gYWRkcmVzcyArPSAnJnJlZGlyZWN0X3VyaT1odHRwcyUzQSUyRiUyRmRldmVsb3BlcnMuZmFjZWJvb2suY29tJTJGdG9vbHMlMkZleHBsb3Jlcic7XG4gICAgICAgIC8vIFxuICAgICAgICAkKCcjZmItbWV0YS11cmwnKS5hdHRyKCdjb250ZW50Jywgb3B0aW9ucy51cmwpO1xuICAgICAgICAkKCcjZmItbWV0YS10aXRsZScpLmF0dHIoJ2NvbnRlbnQnLCBvcHRpb25zLnRpdGxlKTtcbiAgICAgICAgJCgnI2ZiLW1ldGEtZGVzYycpLmF0dHIoJ2NvbnRlbnQnLCBvcHRpb25zLmRlc2MpO1xuICAgICAgICBpZiAob3B0aW9ucy5pbWcpICQoJyNmYi1tZXRhLWltYWcnKS5hdHRyKCdjb250ZW50Jywgb3B0aW9ucy5pbWcpO1xuICAgICAgICBzaGFyZS5wb3B1cChhZGRyZXNzKTtcbiAgICB9LFxuICAgIHBvcHVwOiBmdW5jdGlvbiAoYWRkcmVzcykge1xuICAgICAgICB3aW5kb3cub3BlbihhZGRyZXNzLCcnLCd0b29sYmFyPTAsc3RhdHVzPTAsd2lkdGg9NjI2LGhlaWdodD00MzYnKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlOyJdfQ==
