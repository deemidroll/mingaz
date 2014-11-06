(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var Bubble = function (options) {
    this.w = options.w;
    this.h = options.h;
    this.percent = options.percent;
    this.pos = {};
    if (Math.random() > 0.5) {
        this.pos.x = Math.random() * 0.25;
    } else {
        this.pos.x = 1 - Math.random() * 0.25;
    }
    this.pos.y = Math.random() * 0.5 + 0.5;
    this.dest = {};
    this.dest.x = this.pos.x;
    this.dest.y = 0;
    this.offset = {x: 0, y: 0};
    this.vel = {x: 0, y: -1/100};
    this.ctx = options.ctx;
    this.color = options.color || '#fdcd00';
    this.bubbles = options.bubbles;
};

Bubble.prototype.getDistance = function (pos) {
    return Math.sqrt((this.pos.x - pos.x) * (this.pos.x - pos.x) + 
        (this.pos.y - pos.y) * (this.pos.y - pos.y));
};

Bubble.prototype.draw = function () {
    var x = this.pos.x * this.w,
        y = (this.pos.y) * this.h,
        r = this.w * 0.025 + this.w * 0.025 * (1 - this.pos.y),
        lineWidth = Math.pow(this.pos.y, 5) * r * 2;
    
    if (lineWidth < 0.1) return this;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
    this.ctx.fillStyle = '#a32609';
    this.ctx.font = '24px \'aa_bebas_neueregular\'';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.percent + '%', x, y);
    return this;
};
Bubble.prototype.updPosition = function () {
    var _this = this;
    ['x', 'y'].forEach(function (aix) {
        // var delta = _this.dest[aix] + _this.offset[aix] - _this.pos[aix];
        _this.pos[aix] += _this.vel[aix];
    });
    return this;
};
Bubble.prototype.resize = function (w, h) {
    this.w = w;
    this.h = h;
    return this;
};
Bubble.prototype.setVel = function (vel) {
    this.vel.x = vel.x;
    this.vel.y = vel.y;
    return this;
};
Bubble.prototype.update = function () {
    this
        .updPosition()
        .draw();
    return this;
};
Bubble.prototype.destroy = function () {
    this.bubbles.remove(this.bubles.indexOf(this));
};

module.exports = Bubble;
},{}],2:[function(require,module,exports){
var Circle = function (options) {
    this.radius = options.radius || 100;
    this.radiusNext = options.radius || 100;
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
    this.ctx.drawImage(this.img, this.pos.x - this.radius / 2, this.pos.y - this.radius / 2, this.radius, this.radius);
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
    // this.radius += (this.radiusNext - this.radius)/10;
    return this;
};
Circle.prototype.updScroll = function (top) {
    this.dest.y = this.destFirst.y + top;
    return this;
};
Circle.prototype.hover = function (pos) {
    var distToDest = Math.sqrt((this.dest.x - pos.x) * (this.dest.x - pos.x) + 
        (this.dest.y - pos.y) * (this.dest.y - pos.y));
    if (distToDest > this.radius * 1.5) {
        this.offset = {x: 0, y: 0};
    } else {
        this.offset.x = (this.pos.x - pos.x)/2;
        this.offset.y = (this.pos.y - pos.y)/2;
    }
    return this;
};
Circle.prototype.resize = function (dest, radius) {
    this.dest.x = dest.x;
    this.dest.y = dest.y;
    this.destFirst.x = dest.x;
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
var $ = (window.$),
    Circle = require('./Circle.js');

var bg = {},
    w, h,
    circles = [],
    canvas = document.getElementById('bg-canvas'),
    $page = $('.page'),
    ctx = canvas.getContext('2d'),
    x, y, radius;

bg.init = function () {

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
                img: './img/bg-' + (i % 6) + '.png',
                circles: circles,
            })
        );
    }
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
bg.update = function () {
    ctx.clearRect(0, 0 , w , h);
    circles.forEach(function (el) {
        el.update();
    });
};

module.exports = bg;
},{"./Circle.js":2}],5:[function(require,module,exports){
var $ = (window.$),
    sfx = require('./sfx.js'),
    share = require('./share.js'),
    animate = require('./animate.js'),
    bg = require('./bg.js'),
    preloader = require('./preloader.js');
    
var sfxs = [
    sfx('./sfx/sfx-0.mp3', 'sfx-0'),
    sfx('./sfx/sfx-1.mp3', 'sfx-1'),
    sfx('./sfx/sfx-2.mp3', 'sfx-2'),
    sfx('./sfx/sfx-3.mp3', 'sfx-3')
];

$(window).on('touchmove', function (e) {
    e.preventDefault();
});
var $fridgeInner = $('.fridge-inner'),
    $window = $(window),
    doorsImg = [];
    
function Declinator(forms) {
    this.declinate = function (number) {
        var cases = [2, 0, 1, 1, 1, 2];
        return forms[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    };
}
var declinator = new Declinator(['балл', 'балла', 'баллов']);

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
        
    function prepareClassesToRemove(name, n) {
        var classesToRemove = '';
        n = n + 1;
        for (var i = 0; i < n; i++) {
            classesToRemove += name + i + ' ';
        }
        return classesToRemove.slice(0, -1);
    }
    var descClassesToRemove = prepareClassesToRemove('with-desc-', 6),
        fridgeClassesToRemove = prepareClassesToRemove('open-', 23);

    var height,
        fridgeInnerHeight,
        scrollStates,
        scrollTop = 0;
    
    function fitHeight($el) {
        var currHeight = parseInt($el.css('height'), 10),
            autoHeight = parseInt($el.css('height', 'auto').css('height'), 10);
        $el.stop().css('height', currHeight).stop().animate({'height': autoHeight}, 400);
    }
    
    function resize() {
        var radioHeight = $radio[0].clientWidth * 124/1080 + 20,
            percent = 0.56,
            gameTop = radioHeight + $fridgeInner[0].clientWidth * $fridgeInner.attr('height')/$fridgeInner.attr('width') * percent;
            
        fridgeInnerHeight = parseInt($fridgeInner.css('height'), 10) - 20;
        height = parseInt($footer.removeClass(descClassesToRemove).removeClass('with-game').css('height', 'auto').css('height'), 10);
        $footer.css('height', height);
        scrollStates = [0, radioHeight, Math.min(gameTop, fridgeInnerHeight - window.innerHeight)];
        $page.css('height', Math.min(gameTop + window.innerHeight, fridgeInnerHeight));
        if (scrollStates[2] - scrollTop < fridgeInnerHeight * 0.05) {
            $footer.addClass('with-game');
            fitHeight($footer);
        }
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
    
    $withDesc.each(function (i) {
        $(this).hover(function () {
            if (scrollTop < scrollStates[1]/21*18) return;
            $footer.addClass('with-desc-' + (i + 1));
            fitHeight($footer);
            sfxs[i%4].play();
        }, function () {
            $footer.removeClass('with-desc-' + (i + 1));
            fitHeight($footer);
            sfxs[i%4].skipTo(0);
        });
        $(this).on('click', function () {
            if (scrollTop < scrollStates[1]/21*18) return;
            $footer.removeClass(descClassesToRemove).addClass('with-desc-' + (i + 1));
            fitHeight($footer);
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
        $footer.removeClass(descClassesToRemove);
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
            fitHeight($footer);
        } else {
            game.pause();
            $('.game').fadeOut();
            $footer.removeClass('with-game');
            fitHeight($footer);
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
    function animateJSTranslate(selection, i, n, numb) {
        var dur, durRep, nRep;

        if (numb === 0) {
            selection.eq(i).css({'display': 'none'});
        } else {
            selection.eq(i).css({'display': 'inline-block'});
        }
        dur = 4000;
        nRep = numb > 10 ? i : 0;
        durRep = dur/(1+nRep);
        
        var setTranslate = function (now) {
            $(this).css({
                '-webkit-transform': 'translate(0,' + now +'px)',
                '-moz-transform': 'translate(0,' + now +'px)',
                '-ms-transform': 'translate(0,' + now +'px)',
                '-o-transform': 'translate(0,' + now +'px)',
                'transform': 'translate(0,' + now +'px)'
            });
        };
        var resetCount = function () {
            selection.eq(i).css({'bottom': '0'});
        };
        for (var j = 0; j < nRep; j++) {
            // selection.eq(i).css({"bottom": "0"});
            selection.eq(i).stop().animate({'bottom': '-360px'}, {
                step: setTranslate,
                easing: 'linear',
                duration: durRep,
                complete: resetCount
            });
        }
        // selection.eq(i).css({'bottom': '0'});
        selection.eq(i).stop().animate({'bottom': (-36 * (n%10)) + 'px'}, {
            step: function (now) {
                $(this).css({
                    '-webkit-transform': 'translate(0,' + now +'px)',
                    '-moz-transform': 'translate(0,' + now +'px)',
                    '-ms-transform': 'translate(0,' + now +'px)',
                    '-o-transform': 'translate(0,' + now +'px)',
                    'transform': 'translate(0,' + now +'px)'
                });
            },
            easing: 'linear',
            duration: durRep,
            complete: function () {
                selection.removeClass('rotary-digit-moving');
            }
        });
    }
    function toggleJSCounter(selection, limit) {
        selection.addClass('rotary-digit-moving');
        var limitNumb = 0, dials = [];
        limitNumb = parseInt(limit, 10);
        dials = limitNumb.toString().split('');
        while(dials.length < 4) {
            dials.unshift('0');
        }
        dials.forEach(function (el, i, arr) {
            animateJSTranslate(selection, i, +arr[i], i ? +arr[i] + arr[i - 1] * 10 : +arr[i]);
        });
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
            img.src = './img/tile-' + i + '-black.png';
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
            this.$gameScoreRotary = $('.game-score-rotary');
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
            //rotary
            var $rotaryDigit = $('.rotary-digit');
            for (var i = 0; i < 11; i++) {
                $rotaryDigit.append('<li>' + (i % 10) + '</li>');
            }
            this.$gameScoreRotary.append();
            this.$rotaryDigit0 = $('.rotary-digit-0');
            this.$rotaryDigit1 = $('.rotary-digit-1');
            this.$rotaryDigit2 = $('.rotary-digit-2');
            this.$rotaryDigit3 = $('.rotary-digit-3');
            this.$rotaryDigit4 = $('.rotary-digit-4');
            this.$rotaryDigit = $('.rotary-digit');
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
            this.$gameScore.text(this.scoreTotal);
            this.$gameScoreText.text(declinator.declinate(this.scoreTotal));
            toggleJSCounter(this.$rotaryDigit, this.scoreTotal);
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

preloader.init();
animate(0, function () {
    if (!preloader.destroyed) {
        preloader.update();
    } else {
        setTimeout(function () {
            $('.preloader').remove();
            // TODO
            // delete preloader;
        }, 1000);
        animate(0, function () {
            bg.update();
        });
    }
});

var imagesToLoad;
function loadImage(src, number, list) {
    loadImage.counter = loadImage.counter || 0;
    loadImage.max = loadImage.max || list.length ;
    var img = new window.Image();
    img.src = src;
    img.onload = function () {
        loadImage.counter++;
        var currentPercent = Math.floor(100 * loadImage.counter/loadImage.max);
        preloader.showPercent(currentPercent);
        if (loadImage.counter === loadImage.max) {
            $fridgeInner.attr('src', imagesToLoad[0]);
            preloader.destroy();
            $('.preload-img').fadeOut(500, function () {
                $('.preloader').animate({
                    height: 0
                }, 1000, function () {
                    $(this).hide();
                });
            });
            initPage();
        }
    };
    return img;
}

(function () {
    var postfix = '',
        ext = '.png',
        i;

    if( /iP(ad|od|hone)|Android|Blackberry|Windows Phone/i.test(window.navigator.userAgent)) {
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
        imagesToLoad.push('./img/tile-' + i + '-black.png');
    }
    for (i = 0; i < 22; i++) {
        var prefix = i < 10 ? '0' : '',
            path = './img/door-' + prefix + i + postfix + ext;
        imagesToLoad.push(path);
        doorsImg.push(path);
    }
    imagesToLoad.forEach(loadImage);
})();
},{"./animate.js":3,"./bg.js":4,"./preloader.js":6,"./sfx.js":7,"./share.js":8}],6:[function(require,module,exports){
var $ = (window.$),
    Bubble = require('./Bubble.js');

var preloader = {};
var bubbles = [],
    w, h,
    canvas,
    ctx;

preloader.destroyed = false;

preloader.init = function () {
    canvas = document.getElementById('preloader-canvas');
    ctx = canvas.getContext('2d');

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        bubbles.forEach(function (el) {
            el.resize(w, h);
        });
    }
    resize();
    $(window).on('resize', resize);
};
preloader.showPercent = function (percent) {
    bubbles.push(new Bubble({
        w: w,
        h: h,
        ctx: ctx,
        percent: percent,
        bubbles: bubbles
    }));
};
preloader.destroy = function () {
    setTimeout(function () {
        preloader.destroyed = true;
        bubbles.length = 0;
    }, 1000);
};
preloader.update = function () {
    ctx.clearRect(0, 0 , w , h);
    if (bubbles.length > 8) {
        bubbles = bubbles.splice(-8);
    }
    bubbles.forEach(function (el) {
        el.update();
    });
};

module.exports = preloader;
},{"./Bubble.js":1}],7:[function(require,module,exports){
var sfx = function(url, id) {
    var sound = {};
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
        sound.play = function () {
            source = context.createBufferSource();
            source.buffer = buffer;
            destination = context.destination;
            source.connect(destination);
            source.start(0);
        };
        sound.skipTo = function () {};
        loadSoundFile(url.slice(0, -3) + ext);
    }
    catch(e) {
        var aSfx = document.getElementById(id);
        sound = window.audiojs.create(aSfx, {});
        sound.load(url);
    }
    return sound;
};

module.exports = sfx;
},{}],8:[function(require,module,exports){
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
},{}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9CdWJibGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9DaXJjbGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9hbmltYXRlLmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvYmcuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvcHJlbG9hZGVyLmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvc2Z4LmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvc2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxMkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gQXJyYXkgUmVtb3ZlIC0gQnkgSm9obiBSZXNpZyAoTUlUIExpY2Vuc2VkKVxuQXJyYXkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIHZhciByZXN0ID0gdGhpcy5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IHRoaXMubGVuZ3RoKTtcbiAgdGhpcy5sZW5ndGggPSBmcm9tIDwgMCA/IHRoaXMubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gIHJldHVybiB0aGlzLnB1c2guYXBwbHkodGhpcywgcmVzdCk7XG59O1xuXG52YXIgQnViYmxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGlzLncgPSBvcHRpb25zLnc7XG4gICAgdGhpcy5oID0gb3B0aW9ucy5oO1xuICAgIHRoaXMucGVyY2VudCA9IG9wdGlvbnMucGVyY2VudDtcbiAgICB0aGlzLnBvcyA9IHt9O1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgIHRoaXMucG9zLnggPSBNYXRoLnJhbmRvbSgpICogMC4yNTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvcy54ID0gMSAtIE1hdGgucmFuZG9tKCkgKiAwLjI1O1xuICAgIH1cbiAgICB0aGlzLnBvcy55ID0gTWF0aC5yYW5kb20oKSAqIDAuNSArIDAuNTtcbiAgICB0aGlzLmRlc3QgPSB7fTtcbiAgICB0aGlzLmRlc3QueCA9IHRoaXMucG9zLng7XG4gICAgdGhpcy5kZXN0LnkgPSAwO1xuICAgIHRoaXMub2Zmc2V0ID0ge3g6IDAsIHk6IDB9O1xuICAgIHRoaXMudmVsID0ge3g6IDAsIHk6IC0xLzEwMH07XG4gICAgdGhpcy5jdHggPSBvcHRpb25zLmN0eDtcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvciB8fCAnI2ZkY2QwMCc7XG4gICAgdGhpcy5idWJibGVzID0gb3B0aW9ucy5idWJibGVzO1xufTtcblxuQnViYmxlLnByb3RvdHlwZS5nZXREaXN0YW5jZSA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh0aGlzLnBvcy54IC0gcG9zLngpICogKHRoaXMucG9zLnggLSBwb3MueCkgKyBcbiAgICAgICAgKHRoaXMucG9zLnkgLSBwb3MueSkgKiAodGhpcy5wb3MueSAtIHBvcy55KSk7XG59O1xuXG5CdWJibGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHggPSB0aGlzLnBvcy54ICogdGhpcy53LFxuICAgICAgICB5ID0gKHRoaXMucG9zLnkpICogdGhpcy5oLFxuICAgICAgICByID0gdGhpcy53ICogMC4wMjUgKyB0aGlzLncgKiAwLjAyNSAqICgxIC0gdGhpcy5wb3MueSksXG4gICAgICAgIGxpbmVXaWR0aCA9IE1hdGgucG93KHRoaXMucG9zLnksIDUpICogciAqIDI7XG4gICAgXG4gICAgaWYgKGxpbmVXaWR0aCA8IDAuMSkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKHgsIHksIHIsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2EzMjYwOSc7XG4gICAgdGhpcy5jdHguZm9udCA9ICcyNHB4IFxcJ2FhX2JlYmFzX25ldWVyZWd1bGFyXFwnJztcbiAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLnBlcmNlbnQgKyAnJScsIHgsIHkpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkJ1YmJsZS5wcm90b3R5cGUudXBkUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBbJ3gnLCAneSddLmZvckVhY2goZnVuY3Rpb24gKGFpeCkge1xuICAgICAgICAvLyB2YXIgZGVsdGEgPSBfdGhpcy5kZXN0W2FpeF0gKyBfdGhpcy5vZmZzZXRbYWl4XSAtIF90aGlzLnBvc1thaXhdO1xuICAgICAgICBfdGhpcy5wb3NbYWl4XSArPSBfdGhpcy52ZWxbYWl4XTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5CdWJibGUucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3LCBoKSB7XG4gICAgdGhpcy53ID0gdztcbiAgICB0aGlzLmggPSBoO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkJ1YmJsZS5wcm90b3R5cGUuc2V0VmVsID0gZnVuY3Rpb24gKHZlbCkge1xuICAgIHRoaXMudmVsLnggPSB2ZWwueDtcbiAgICB0aGlzLnZlbC55ID0gdmVsLnk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQnViYmxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpc1xuICAgICAgICAudXBkUG9zaXRpb24oKVxuICAgICAgICAuZHJhdygpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkJ1YmJsZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmJ1YmJsZXMucmVtb3ZlKHRoaXMuYnVibGVzLmluZGV4T2YodGhpcykpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdWJibGU7IiwidmFyIENpcmNsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cyB8fCAxMDA7XG4gICAgdGhpcy5yYWRpdXNOZXh0ID0gb3B0aW9ucy5yYWRpdXMgfHwgMTAwO1xuICAgIHRoaXMucG9zID0ge307XG4gICAgdGhpcy5wb3MueCA9IG9wdGlvbnMucG9zLng7XG4gICAgdGhpcy5wb3MueSA9IG9wdGlvbnMucG9zLnk7XG4gICAgdGhpcy5kZXN0ID0ge307XG4gICAgdGhpcy5kZXN0LnggPSBvcHRpb25zLmRlc3QueDtcbiAgICB0aGlzLmRlc3QueSA9IG9wdGlvbnMuZGVzdC55O1xuICAgIHRoaXMuZGVzdEZpcnN0ID0ge307XG4gICAgdGhpcy5kZXN0Rmlyc3QueCA9IG9wdGlvbnMuZGVzdC54O1xuICAgIHRoaXMuZGVzdEZpcnN0LnkgPSBvcHRpb25zLmRlc3QueTtcbiAgICB0aGlzLm9mZnNldCA9IHt4OiAwLCB5OiAwfTtcbiAgICB0aGlzLmltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICB0aGlzLmltZy5zcmMgPSBvcHRpb25zLmltZztcbiAgICB0aGlzLnZlbCA9IHt4OiAwLCB5OiAwfTtcbiAgICB0aGlzLmN0eCA9IG9wdGlvbnMuY3R4O1xuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yIHx8ICcjZmRjZDAwJztcbiAgICB0aGlzLnNsb3dkb3duID0gMC45OTtcbiAgICB0aGlzLmNpcmNsZXMgPSBvcHRpb25zLmNpcmNsZXM7XG59O1xuXG5DaXJjbGUucHJvdG90eXBlLmdldERpc3RhbmNlID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHJldHVybiBNYXRoLnNxcnQoKHRoaXMucG9zLnggLSBwb3MueCkgKiAodGhpcy5wb3MueCAtIHBvcy54KSArIFxuICAgICAgICAodGhpcy5wb3MueSAtIHBvcy55KSAqICh0aGlzLnBvcy55IC0gcG9zLnkpKTtcbn07XG5cbkNpcmNsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmModGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLnBvcy54IC0gdGhpcy5yYWRpdXMgLyAyLCB0aGlzLnBvcy55IC0gdGhpcy5yYWRpdXMgLyAyLCB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNpcmNsZS5wcm90b3R5cGUudXBkUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBbJ3gnLCAneSddLmZvckVhY2goZnVuY3Rpb24gKGFpeCkge1xuICAgICAgICB2YXIgZGVsdGEgPSBfdGhpcy5kZXN0W2FpeF0gKyBfdGhpcy5vZmZzZXRbYWl4XSAtIF90aGlzLnBvc1thaXhdO1xuICAgICAgICBfdGhpcy5wb3NbYWl4XSArPSBkZWx0YS8xMDtcbiAgICB9KTtcbiAgICB0aGlzLmNpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKF90aGlzICE9PSBlbCkge1xuICAgICAgICAgICAgdmFyIGRpc3QgPSBfdGhpcy5nZXREaXN0YW5jZShlbC5wb3MpLFxuICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBfdGhpcy5yYWRpdXMgKiAyO1xuICAgICAgICAgICAgaWYgKGRpc3QgPCBtaW5EaXN0KSB7XG4gICAgICAgICAgICAgICAgWyd4JywgJ3knXS5mb3JFYWNoKGZ1bmN0aW9uIChhaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZFZlbCA9IF90aGlzLnZlbFthaXhdO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wb3NbYWl4XSAgPSBfdGhpcy5wb3NbYWl4XSAgKyAoKF90aGlzLnBvc1thaXhdIC0gZWwucG9zW2FpeF0pICogKG1pbkRpc3QgLSBkaXN0KSAvIDIpIC8gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgZWwucG9zW2FpeF0gPSBlbC5wb3NbYWl4XSArICgoZWwucG9zW2FpeF0gLSBfdGhpcy5wb3NbYWl4XSkgKiAobWluRGlzdCAtIGRpc3QpIC8gMikgLyBkaXN0O1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy52ZWxbYWl4XSA9IGVsLnZlbFthaXhdO1xuICAgICAgICAgICAgICAgICAgICBlbC52ZWxbYWl4XSA9IG9sZFZlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHRoaXMucmFkaXVzICs9ICh0aGlzLnJhZGl1c05leHQgLSB0aGlzLnJhZGl1cykvMTA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2lyY2xlLnByb3RvdHlwZS51cGRTY3JvbGwgPSBmdW5jdGlvbiAodG9wKSB7XG4gICAgdGhpcy5kZXN0LnkgPSB0aGlzLmRlc3RGaXJzdC55ICsgdG9wO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNpcmNsZS5wcm90b3R5cGUuaG92ZXIgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgdmFyIGRpc3RUb0Rlc3QgPSBNYXRoLnNxcnQoKHRoaXMuZGVzdC54IC0gcG9zLngpICogKHRoaXMuZGVzdC54IC0gcG9zLngpICsgXG4gICAgICAgICh0aGlzLmRlc3QueSAtIHBvcy55KSAqICh0aGlzLmRlc3QueSAtIHBvcy55KSk7XG4gICAgaWYgKGRpc3RUb0Rlc3QgPiB0aGlzLnJhZGl1cyAqIDEuNSkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IHt4OiAwLCB5OiAwfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9mZnNldC54ID0gKHRoaXMucG9zLnggLSBwb3MueCkvMjtcbiAgICAgICAgdGhpcy5vZmZzZXQueSA9ICh0aGlzLnBvcy55IC0gcG9zLnkpLzI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkNpcmNsZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKGRlc3QsIHJhZGl1cykge1xuICAgIHRoaXMuZGVzdC54ID0gZGVzdC54O1xuICAgIHRoaXMuZGVzdC55ID0gZGVzdC55O1xuICAgIHRoaXMuZGVzdEZpcnN0LnggPSBkZXN0Lng7XG4gICAgdGhpcy5kZXN0Rmlyc3QueSA9IGRlc3QueTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICByZXR1cm4gdGhpcztcbn07XG5DaXJjbGUucHJvdG90eXBlLnNldFZlbCA9IGZ1bmN0aW9uICh2ZWwpIHtcbiAgICB0aGlzLnZlbC54ID0gdmVsLng7XG4gICAgdGhpcy52ZWwueSA9IHZlbC55O1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNpcmNsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXNcbiAgICAgICAgLnVwZFBvc2l0aW9uKClcbiAgICAgICAgLmRyYXcoKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2lyY2xlOyIsIndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKC8qIGZ1bmN0aW9uICovIGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9XG4gICAgKTtcbn0oKTtcbndpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgfHxcbiAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbiAgICAgICAgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKGlkKXtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICB9XG4gICAgKTtcbn0oKTtcblxuZnVuY3Rpb24gYW5pbWF0ZShub3dNc2VjLCBjYWxsYmFjaykge1xuICAgIHZhciBkZWx0YU1zZWM7XG4gICAgbm93TXNlYyA9IG5vd01zZWMgfHwgRGF0ZS5ub3coKTtcbiAgICBhbmltYXRlLmxhc3RUaW1lTXNlYyA9IGFuaW1hdGUubGFzdFRpbWVNc2VjIHx8IG5vd01zZWMgLSAxMDAwIC8gNjA7XG4gICAgZGVsdGFNc2VjID0gTWF0aC5taW4oMTAwLCBub3dNc2VjIC0gYW5pbWF0ZS5sYXN0VGltZU1zZWMpO1xuICAgIC8vIGtlZXAgbG9vcGluZ1xuICAgIGFuaW1hdGUuaWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIC8vIGNoYW5nZSBsYXN0IHRpbWVcbiAgICBhbmltYXRlLmxhc3RUaW1lTXNlYyA9IG5vd01zZWM7XG4gICAgLy8gY2FsbCBlYWNoIHVwZGF0ZSBmdW5jdGlvblxuICAgIGlmIChjYWxsYmFjaykgYW5pbWF0ZS5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIGFuaW1hdGUuY2FsbGJhY2soZGVsdGFNc2VjLCBub3dNc2VjLCBhbmltYXRlLmlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhbmltYXRlOyIsInZhciAkID0gKHdpbmRvdy4kKSxcbiAgICBDaXJjbGUgPSByZXF1aXJlKCcuL0NpcmNsZS5qcycpO1xuXG52YXIgYmcgPSB7fSxcbiAgICB3LCBoLFxuICAgIGNpcmNsZXMgPSBbXSxcbiAgICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmctY2FudmFzJyksXG4gICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuICAgIHgsIHksIHJhZGl1cztcblxuYmcuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgdyA9IHBhcnNlSW50KCRwYWdlLmNzcygnd2lkdGgnKSwgMTApO1xuICAgICAgICBoID0gcGFyc2VJbnQoJHBhZ2UuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3O1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaDtcbiAgICAgICAgcmFkaXVzID0gdyAvIDEwO1xuICAgICAgICBjaXJjbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgICAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICB4ID0gMCArIDAgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgaWYgKGkgJSA0ID09PSAwKSB4ICs9IDEuNSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICB5ID0gKGkgKyAxKSAqIHJhZGl1cyAqIDAuODtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IHcgLSAxLjUgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgaWYgKGkgJSA0ID09PSAxKSB4ICs9IDEuNSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICB5ID0gaSAqIHJhZGl1cyAqIDAuODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsLnJlc2l6ZSh7eDogeCwgeTogeX0sIHJhZGl1cyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNpemUoKTtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNjsgaSArKykge1xuICAgICAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIHggPSAwICsgMCAqIHJhZGl1cztcbiAgICAgICAgICAgIGlmIChpICUgNCA9PT0gMCkgeCArPSAxLjUgKiByYWRpdXM7XG4gICAgICAgICAgICB5ID0gKGkgKyAxKSAqIHJhZGl1cyAqIDAuODtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHggPSB3IC0gMS41ICogcmFkaXVzO1xuICAgICAgICAgICAgaWYgKGkgJSA0ID09PSAxKSB4ICs9IDEuNSAqIHJhZGl1cztcbiAgICAgICAgICAgIHkgPSBpICogcmFkaXVzICogMC44O1xuICAgICAgICB9XG4gICAgICAgIGNpcmNsZXMucHVzaChcbiAgICAgICAgICAgIG5ldyBDaXJjbGUoe1xuICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHBvczoge3g6IHgsIHk6IHkgKyAxMDAwfSxcbiAgICAgICAgICAgICAgICBkZXN0OiB7eDogeCwgeTogeX0sXG4gICAgICAgICAgICAgICAgY3R4OiBjdHgsXG4gICAgICAgICAgICAgICAgaW1nOiAnLi9pbWcvYmctJyArIChpICUgNikgKyAnLnBuZycsXG4gICAgICAgICAgICAgICAgY2lyY2xlczogY2lyY2xlcyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxufTtcblxuYmcudXBkU2Nyb2xsID0gZnVuY3Rpb24gKHRvcCkge1xuICAgIGNpcmNsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgZWwudXBkU2Nyb2xsKHRvcC8yKTtcbiAgICB9KTtcbn07XG5iZy5ob3ZlciA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICBjaXJjbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsLmhvdmVyKHBvcyk7XG4gICAgfSk7XG59O1xuYmcudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCAsIHcgLCBoKTtcbiAgICBjaXJjbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsLnVwZGF0ZSgpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZzsiLCJ2YXIgJCA9ICh3aW5kb3cuJCksXG4gICAgc2Z4ID0gcmVxdWlyZSgnLi9zZnguanMnKSxcbiAgICBzaGFyZSA9IHJlcXVpcmUoJy4vc2hhcmUuanMnKSxcbiAgICBhbmltYXRlID0gcmVxdWlyZSgnLi9hbmltYXRlLmpzJyksXG4gICAgYmcgPSByZXF1aXJlKCcuL2JnLmpzJyksXG4gICAgcHJlbG9hZGVyID0gcmVxdWlyZSgnLi9wcmVsb2FkZXIuanMnKTtcbiAgICBcbnZhciBzZnhzID0gW1xuICAgIHNmeCgnLi9zZngvc2Z4LTAubXAzJywgJ3NmeC0wJyksXG4gICAgc2Z4KCcuL3NmeC9zZngtMS5tcDMnLCAnc2Z4LTEnKSxcbiAgICBzZngoJy4vc2Z4L3NmeC0yLm1wMycsICdzZngtMicpLFxuICAgIHNmeCgnLi9zZngvc2Z4LTMubXAzJywgJ3NmeC0zJylcbl07XG5cbiQod2luZG93KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbnZhciAkZnJpZGdlSW5uZXIgPSAkKCcuZnJpZGdlLWlubmVyJyksXG4gICAgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICBkb29yc0ltZyA9IFtdO1xuICAgIFxuZnVuY3Rpb24gRGVjbGluYXRvcihmb3Jtcykge1xuICAgIHRoaXMuZGVjbGluYXRlID0gZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICB2YXIgY2FzZXMgPSBbMiwgMCwgMSwgMSwgMSwgMl07XG4gICAgICAgIHJldHVybiBmb3Jtc1sgKG51bWJlciUxMDA+NCAmJiBudW1iZXIlMTAwPDIwKT8gMiA6IGNhc2VzWyhudW1iZXIlMTA8NSk/bnVtYmVyJTEwOjVdIF07XG4gICAgfTtcbn1cbnZhciBkZWNsaW5hdG9yID0gbmV3IERlY2xpbmF0b3IoWyfQsdCw0LvQuycsICfQsdCw0LvQu9CwJywgJ9Cx0LDQu9C70L7QsiddKTtcblxuZnVuY3Rpb24gaW5pdFBhZ2UoKSB7XG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpdGhEZXNjID0gJCgnLndpdGgtZGVzYycpLFxuICAgICAgICAkZm9vdGVyID0gJCgnLmZvb3RlcicpLFxuICAgICAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS1kb29yLXdyYXAnKSxcbiAgICAgICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICAgICAkbGVmdFRleHQgPSAkKCcubGVmdC10ZXh0JyksXG4gICAgICAgICRyYWRpbyA9ICQoJy5yYWRpby1jb250JyksXG4gICAgICAgICRyYWRpb011c2ljU29uZyA9ICQoJy5yYWRpby1tdXNpYy1zb25nLWhvdmVyJyksXG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQgPSAkKCcucmFkaW8tbXVzaWMtc29uZy10ZXh0JyksXG4gICAgICAgICRkb29yT3BlbmVyID0gJCgnLmRvb3Itb3BlbmVyJyksXG4gICAgICAgICRnYW1lUG9wdXBTdGFydCA9ICQoJy5nYW1lLXBvcHVwLXN0YXJ0Jykuc2hvdygpLFxuICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydCA9ICQoJy5nYW1lLXBvcHVwLXJlc3RhcnQnKSxcbiAgICAgICAgJGdhbWVQb3B1cFJlc3VtZSA9ICQoJy5nYW1lLXBvcHVwLXJlc3VtZScpLFxuICAgICAgICAkZ2FtZVBvcHVwTmV4dD0gJCgnLmdhbWUtcG9wdXAtbmV4dCcpLFxuICAgICAgICAkZ2FtZVBvcHVwV2luID0gJCgnLmdhbWUtcG9wdXAtd2luJyksXG4gICAgICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICAgICAgICBcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICAgICAgdmFyIGNsYXNzZXNUb1JlbW92ZSA9ICcnO1xuICAgICAgICBuID0gbiArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjbGFzc2VzVG9SZW1vdmUgKz0gbmFtZSArIGkgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXNzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHZhciBkZXNjQ2xhc3Nlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnd2l0aC1kZXNjLScsIDYpLFxuICAgICAgICBmcmlkZ2VDbGFzc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKCdvcGVuLScsIDIzKTtcblxuICAgIHZhciBoZWlnaHQsXG4gICAgICAgIGZyaWRnZUlubmVySGVpZ2h0LFxuICAgICAgICBzY3JvbGxTdGF0ZXMsXG4gICAgICAgIHNjcm9sbFRvcCA9IDA7XG4gICAgXG4gICAgZnVuY3Rpb24gZml0SGVpZ2h0KCRlbCkge1xuICAgICAgICB2YXIgY3VyckhlaWdodCA9IHBhcnNlSW50KCRlbC5jc3MoJ2hlaWdodCcpLCAxMCksXG4gICAgICAgICAgICBhdXRvSGVpZ2h0ID0gcGFyc2VJbnQoJGVsLmNzcygnaGVpZ2h0JywgJ2F1dG8nKS5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgICRlbC5zdG9wKCkuY3NzKCdoZWlnaHQnLCBjdXJySGVpZ2h0KS5zdG9wKCkuYW5pbWF0ZSh7J2hlaWdodCc6IGF1dG9IZWlnaHR9LCA0MDApO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIHZhciByYWRpb0hlaWdodCA9ICRyYWRpb1swXS5jbGllbnRXaWR0aCAqIDEyNC8xMDgwICsgMjAsXG4gICAgICAgICAgICBwZXJjZW50ID0gMC41NixcbiAgICAgICAgICAgIGdhbWVUb3AgPSByYWRpb0hlaWdodCArICRmcmlkZ2VJbm5lclswXS5jbGllbnRXaWR0aCAqICRmcmlkZ2VJbm5lci5hdHRyKCdoZWlnaHQnKS8kZnJpZGdlSW5uZXIuYXR0cignd2lkdGgnKSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgZnJpZGdlSW5uZXJIZWlnaHQgPSBwYXJzZUludCgkZnJpZGdlSW5uZXIuY3NzKCdoZWlnaHQnKSwgMTApIC0gMjA7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSkucmVtb3ZlQ2xhc3MoJ3dpdGgtZ2FtZScpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKS5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgICBzY3JvbGxTdGF0ZXMgPSBbMCwgcmFkaW9IZWlnaHQsIE1hdGgubWluKGdhbWVUb3AsIGZyaWRnZUlubmVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KV07XG4gICAgICAgICRwYWdlLmNzcygnaGVpZ2h0JywgTWF0aC5taW4oZ2FtZVRvcCArIHdpbmRvdy5pbm5lckhlaWdodCwgZnJpZGdlSW5uZXJIZWlnaHQpKTtcbiAgICAgICAgaWYgKHNjcm9sbFN0YXRlc1syXSAtIHNjcm9sbFRvcCA8IGZyaWRnZUlubmVySGVpZ2h0ICogMC4wNSkge1xuICAgICAgICAgICAgJGZvb3Rlci5hZGRDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgICAgICBmaXRIZWlnaHQoJGZvb3Rlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzaXplKCk7XG4gICAgXG4gICAgJHdpbmRvdy5vbigncmVzaXplJywgcmVzaXplKTtcbiAgICBcbiAgICAkd2luZG93Lm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBiZy5ob3Zlcih7eDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgKyBzY3JvbGxUb3B9KTtcbiAgICB9KTtcbiAgICBcbiAgICB2YXIgcGF0aHMgPSBbXG4gICAgICAgICdkPVwiTTg5My41LDkzSDk2YzAsMC0zNi42NTItMC4yNi02NSwyOEMzLjkxNywxNDgsMywxODIuNSwzLDE4Mi41djExNjBjMCwwLDksMTMsNTAuNSwxNC41czg2MSwwLDg2MSwwczU2LjgzMiwyLjY2NSw3MC41LTE0LjMzM3YtMTE1NC41Qzk4NSwxODguMTY3LDk4NiwxMDEuNSw4OTMuNSw5M3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNODk1LjUsOTNIOThjMCwwLTM4LjY1Mi0yLjI2LTY3LDI2QzMuOTE3LDE0NiwzLDE4Mi41LDMsMTgyLjV2MTE2NGMwLDAsNCwxMS41LDUyLjUsMTMuNWg4NjFjMCwwLDU1LjgzMywwLjE1Miw2OS41LTE0LjMzM3YtMTE1Ny41Qzk4NiwxODguMTY3LDk4OCwxMDEuNSw4OTUuNSw5M3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNODk1LjUsOTMuMDQzbC03OTcuNS0yYzAsMC00MC42NTItMS4yNi02OSwyN2MtMjcuMDgzLDI3LTI3LDY0LjUtMjcsNjQuNXYxMTY4YzAsMCw1LDEyLjUsNTMuNSwxNC41bDg2MS01YzAsMCw1NS44MzMsMC4xNTIsNjkuNS0xNC4zMzNWMTg4LjIxQzk4NiwxODguMjEsOTg4LDEwMS41NDMsODk1LjUsOTMuMDQzelwiLz4nLFxuICAgICAgICAnZD1cIk04OTYuNTgsOTMuMTQ3bC04MDIuNS00YzAsMC0zNy42NTItMC4yNi02NiwyOGMtMjcuMDgzLDI3LTI2LDY1LjUtMjYsNjUuNXYxMTc2YzAsMCwxMywxMC41LDYxLjUsMTIuNWw4NTQtMTFjMCwwLDU1LjgzMywwLjE1Miw2OS41LTE0LjMzMnYtMTE1Ny41Qzk4Ny4wOCwxODguMzE0LDk4OS4wOCwxMDEuNjQ3LDg5Ni41OCw5My4xNDd6XCIvPicsXG4gICAgICAgICdkPVwiTTg5OC41MDYsOTJsLTgwNy41LTdjMCwwLTM4LjAwNiwwLTYzLDI4Yy0yNS40NjcsMjguNTMtMjYsNTcuNS0yNiw1Ny41djExOTVjMCwwLDYuNjcyLDEyLjgzLDYyLjUsMTQuNXM4NTUtMTgsODU1LTE4czU1LjgzMywwLjE1Miw2OS41LTE0LjMzMlYxODcuMTY3Qzk4OS4wMDYsMTg3LjE2Nyw5OTEuMDA2LDEwMC41LDg5OC41MDYsOTJ6XCIvPicsXG4gICAgICAgICdkPVwiTTkwMS41LDkyLjA2MmwtODA3LjUtMTJjMCwwLTM4LjAwNiwyLTYzLDMwYy0yNS40NjcsMjguNTMtMjcsNTkuNS0yNyw1OS41bC0xLDEyMDJjMCwwLDIuOTk2LDE4LjIyNyw1OC41LDE5LjVjNy4zODEsMC4zODksMjcuODU2LDEuMTY4LDU3LjgzNCwwLjQ5MmMxOTYuODAyLTQuNDM4LDgwMy4xNjYtMjkuNDkyLDgwMy4xNjYtMjkuNDkyczU1LjgzMywxLjE1Miw2OS41LTEzLjMzMlYxODcuMjI5Qzk5MiwxODcuMjI5LDk5NCwxMDAuNTYyLDkwMS41LDkyLjA2MnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTA0LjUsOTFMMTAzLDc0YzAsMC00MS4wMDYsNC02NiwzMmMtMjUuNDY3LDI4LjUyOS0yNiw2NC41LTI2LDY0LjV2MTIxNWMwLDAsMy42NzIsMTYuODMsNTkuNSwxOC41czg1NS00MCw4NTUtNDBzNTYuODMzLDAuMTUyLDcwLjUtMTQuMzMyVjE4Ny4xNjdDOTk2LDE4Ny4xNjcsOTk3LDk5LjUsOTA0LjUsOTF6XCIvPicsXG4gICAgICAgICdkPVwiTTkwOS40NjUsOTAuMTIybC03ODIuNS0yMmMwLDAtNDMuMDM1LTEuMzc4LTc0LDMxcy0yNiw3MS41LTI2LDcxLjVsLTEsMTIyOWMwLDAsMy42NzIsMTYuODMsNTkuNSwxOC41czg0NC01Miw4NDQtNTJzNTcuODMzLTAuODQ4LDcxLjUtMTUuMzMyVjE4Ny4yODlDMTAwMC45NjUsMTg3LjI4OSwxMDAxLjk2NSw5OC42MjIsOTA5LjQ2NSw5MC4xMjJ6XCIvPicsXG4gICAgICAgICdkPVwiTTkxNC41OCw4OS44ODdsLTc3Mi41LTI5YzAsMC00Mi4wMDYsNS02NywzM2MtMjUuNDY3LDI4LjUyOS0yNSw2NC41LTI1LDY0LjV2MTI1NWMwLDAsMCwxOC4yODEsNzkuNTg1LDIyLjI4MWM1NS43ODMsMi44MDQsODAzLjkxNS02Ny43ODEsODAzLjkxNS02Ny43ODFzNTguODMzLTEuODQ4LDcyLjUtMTYuMzMydi0xMTY1LjVDMTAwNi4wOCwxODYuMDU0LDEwMDcuMDgsOTguMzg3LDkxNC41OCw4OS44ODd6XCIvPicsXG4gICAgICAgICdkPVwiTTkyMS4wOCw4OS45NzZsLTczMS41LTM3YzAsMC01Mi4wMDYsMS03NywyOWMtMjUuNDY3LDI4LjUyOS0yOSw1OC41LTI5LDU4LjV2MTI5NmMwLDAsMjAuNjcyLDE0LjgzLDc2LjUsMTYuNXM3NjktODEsNzY5LTgxczczLjkyMS02LjMxLDgzLjUtMTguMzMyVjE4Ni4xNDNDMTAxMi41OCwxODYuMTQzLDEwMTMuNTgsOTguNDc2LDkyMS4wOCw4OS45NzZ6XCIvPicsXG4gICAgICAgICdkPVwiTTkzMS4wOCw4OC45NzZsLTY2NS41LTQyYzAsMC03Ni41OC04LjY0Mi0xMDYsMjRjLTMxLjQwOCwzNC44NDgtMzAsNzMuNS0zMCw3My41bC0xLDEzMTBjMCwwLDIyLjY3MiwxMy44Myw3OC41LDE1LjVzNzM1LTk3LDczNS05N3M2Ni40MjMtNS4zMDksNzguNS0xOC4zMzJWMTg3LjE0M0MxMDIwLjU4LDE4Ny4xNDMsMTAyMy41OCw5Ny40NzYsOTMxLjA4LDg4Ljk3NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTM5LjA4LDg4Ljk3NmwtNTc1LjUtNDVjMCwwLTExMy41OC0xNy42NDItMTQzLDE1Yy0zMS40MDgsMzQuODQ4LTMzLDcwLjUtMzMsNzAuNXYxMzQ1YzAsMCwyMS42NzIsMTAuODMsNzcuNSwxMi41czY4NS0xMTEsNjg1LTExMXM2Ni40MjMtNy4zMDksNzguNS0yMC4zMzJWMTg4LjE0M0MxMDI4LjU4LDE4OC4xNDMsMTAzMS41OCw5Ny40NzYsOTM5LjA4LDg4Ljk3NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTQ2LjA4LDg3Ljk3NmwtNTI5LjUtNTFjMCwwLTk2LjU4LTE5LjY0Mi0xMjYsMTNjLTMxLjQwOCwzNC44NDgtMzMsNzEuNS0zMyw3MS41djEzNzBjMCwwLDMyLjA4OCwxNC41LDExMC41LDE0LjVjMzEuNTM4LDAsMjEzLjk3OC00MS41MzUsMzY2Ljg1LTc1Ljk1OGMxMTcuODYzLTI2LjU0MSwyMTguMTUtNDguMDQyLDIxOC4xNS00OC4wNDJzODIuNTg4LTE1Ljk3NSw4My41LTI0LjMzMmwxLTExNzAuNTAxQzEwMzcuNTgsMTg3LjE0MywxMDM4LjU4LDk2LjQ3Niw5NDYuMDgsODcuOTc2elwiLz4nLFxuICAgICAgICAnZD1cIk05NTUuMDgsODhsLTQzOS41LTUzYzAsMC00OS41ODEtNS4zMzItOTAuOTE0LTkuNjY2Yy0yNS45Mi0yLjcxOC00My40NDUsOC44MjItNTUuMDg2LDE3LjY2NmMtMTYuNjY0LDEyLjY1OS0yMC45OTYsMzEuMTU5LTI1LjQ3Niw0NS41OTdjLTguNDg2LDI3LjM1Ny01LjUyNCw0OC45MDMtNS41MjQsNDguOTAzdjEzNzNjMCwwLDcxLjIyOCwxOC44MTUsMTQ4LjUsNS41YzUwLjI1Ni04LjY2LDEwNS45MjMtMjguOTk3LDI1Ni44NS02OC45NThjMTE2Ljc5LTMwLjkyMywyNTguMTUtNzEuMDQyLDI1OC4xNS03MS4wNDJzNDMuNTg4LTkuOTc1LDQ0LjUtMTguMzMyVjE4Ny4xNjdDMTA0Ni41OCwxODcuMTY3LDEwNDcuNTgsOTYuNSw5NTUuMDgsODh6XCIvPicsXG4gICAgICAgICdkPVwiTTk2NC4wOCw4Ny44NTlsLTQxMi41LTY0YzAsMC03MC41NjctMTUuMTYzLTk0LjU4LDEwLjE0MWMtMzEsMzIuNjY2LTI4LDg4Ljk5OS0yOCw4OC45OTlsLTAuNSwxNDAyLjgzMWMwLDAsNjkuODMzLDE0LjUwMywxNDguMTY2LDQuNTA0YzMxLjI4NC0zLjk5MywzMi4zODEtNy41MDUsMTc5LjY2Ny02MS4wMDFjNzQuMzM0LTI2Ljk5OSwyMTQuNzQ4LTc3LjQ3NCwyMTQuNzQ4LTc3LjQ3NHM1MS4zMDktMTYuODI3LDc2LjQxOS0yNy4wMjVjNS4yMjMtMi4xMjEsNy40MTctNS4yMTEsOC4wODEtNy4zMDdjMS4wMDgtMy4xOCwwLTExNzAuNTAxLDAtMTE3MC41MDFTMTA1Ni41OCw5Ni4zNTksOTY0LjA4LDg3Ljg1OXpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTc1LjUsODZjMCwwLTMyNC41MDItNjcuMDAxLTM0OC41LTcwYy0yMy45OTgtMi45OTktNTQuNjY1LTUuMzY1LTcwLjI0Niw0LjQ1MUM1MjUuMTgxLDQwLjM0MSw1MjUsMTEwLjUsNTI1LDExMC41djE0MjljMCwwLDY5LjU3MywxMy44ODksMTQ3LDEuNWMzNy41LTYsNDMuMTkzLTEzLjk5MiwxODQuOTk5LTgwLjY2OUM5NTcuNjY1LDE0MTIuOTk4LDEwMDEuNSwxMzkxLDEwMDEuNSwxMzkxczYyLjU4OC0yNC45NzUsNjMuNS0zMy4zMzJWMTg2LjE2N0MxMDY1LDE4Ni4xNjcsMTA2Nyw5OSw5NzUuNSw4NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTgyLjMzNSw4NGMwLDAtMjQyLjAwNi02NS45Ni0yNjUuNDg2LTcxLjc1NUM3MDcuNzUsMTAsNjYzLjI1LDUuODU4LDY1NC42NjcsMTEuMzg4QzYyMy4yOTgsMzEuNTk4LDYyNCwxMDguNSw2MjQsMTA4LjV2MTQ0M2MwLDAsNjYuMjg5LDEyLjg2NCwxNDMuNjY2LDAuMTY2YzIyLjMzMi0zLjY2NSw0Ni44NjYtMjMuMjQ3LDE3OC42NjctMTA4YzcxLjY5OS00Ni4xMDUsMTE3LjMzMy03NS42NjYsMTE3LjMzMy03NS42NjZzOS43NTUtNS4zMSwxMC42NjctMTMuNjY3bC0wLjY2Ni0xMTc2QzEwNzMuNjY3LDE3OC4zMzMsMTA3My44MzUsOTcuMDAxLDk4Mi4zMzUsODR6XCIvPicsXG4gICAgICAgICdkPVwiTTEwMjUuMzM1LDk0LjY2N2MwLDAtMTk3Ljg1My04MC41MzgtMjIxLjMzMy04Ni4zMzNDNzk0LjkwMyw2LjA4OCw3NTIuNDM4LDIuNzg5LDc0NC4zMzUsOUM3MTkuOTg0LDI3LjY2Nyw3MjEsMTEwLjUsNzIxLDExMC41djE0NTBjMCwwLDg3LjQ5Miw4Ljc5NiwxNDMuNjY2LTQuODM0YzM0LjMzNS04LjMzMSw1NC42NjgtNDAuMzMxLDE0MS42NjctMTIxLjMzMmMzNy4yODctMzQuNzE3LDU3LjA0Mi01NC45NTksNTcuMDQyLTU0Ljk1OXMxOS4xMjUtMTUuNSwxOC45NTgtMjMuMDQyYzAsMCwwLjE3MS0xMTM2LjA4Mi0wLjMzMS0xMTQ1LjMzM1MxMDkxLjUsMTI3LjUsMTAyNS4zMzUsOTQuNjY3elwiLz4nLFxuICAgICAgICAnZD1cIk0xMDE1Ljc1LDgxYzAsMC05MC02Mi41LTExMy4yMzQtNzAuMDIxYy00LjY0OC0xLjUwNS0xMS4yMjMtNC4wMjctMTguNTM4LTUuMzQ0Yy0xMS4yNTUtMi4wMjctMjQuMjY2LTIuMjcxLTM0LjcyOC0yLjI1M0M4NDAuNjQsMy4zOTYsODMzLjc1NiwzLjI2NCw4MzEsNS4yNWMtMTcsMTIuMjUtMTYuMzMzLDEwMS45ODMtMTYuMzMzLDEwMS45ODN2MTQ1OWMwLDAsOTQuMzMxLDguNDMyLDE0My42NjYtNi44MzRjMjIuNDMxLTYuOTQsMzQuMzM0LTM5LjM5OSw3Mi4zMzQtMTAwLjczMmM0NC44OTYtNzIuNDYzLDU0LjY2Ni05MC45MzQsNTQuNjY2LTkwLjkzNHM0LjY2Ny01LjczNyw0LjY2Ny0xNC42NjdsMC4zMzQtMTE3NkMxMDkwLjMzNCwxNzcuMDY3LDEwOTMuMjUsMTIyLDEwMTUuNzUsODF6XCIvPicsXG4gICAgICAgICdkPVwiTTEwNjUuNTk1LDEwMi40MzhjLTQuNjQzLTYuNzgzLTI0LjU5NC00NC4xMDQtNDQuMDk1LTY1LjQzOGMtMTYuMjUtMTcuNzc3LTMwLjExNi0yNC4xMzktNDAuNS0yNy41Yy00LjY0OC0xLjUwNS0xNy4yMS00LjItMjQuNTI1LTUuNTE4Yy0xMS4yNTUtMi4wMjctMjcuNzYzLTEuOTk5LTM4LjIyNS0xLjk4MWMtOC42MSwwLjAxNS0xMC40MjYtMC45NzQtMTEuNSwyLjI0OWMtNi41ODIsMTkuNzUtNi4wODMsOTkuNjAzLTYuMDgzLDk5LjYwM2wtMSwxNDY4YzAsMCw4Mi40OTgsNi42NjMsMTMxLjgzMy04LjYwM2M4LjE4OC0yLjUzMywxOC40ODUtNC40MjMsMjEuOTUtMTQuMjYyYzYuMTUtMTcuNDYzLDExLjAyNC00Ni4yNjIsMjAuNTUtODguNDg4YzE4Ljc1Ny04My4xNTQsMjIuNS0xMDEuNzUsMjIuNS0xMDEuNzVzMC0zMS4wNywwLTQwbC0wLjA2Mi04MDcuMjUybDMwLjA2Mi0wLjYyM3YtMzQuOTU5bC0yOS43NjUtMC4xNjRMMTA5Ni41LDIzMWMwLDAsMC43NjctNDguMjE5LTEuMzk5LTY5Ljc3NEMxMDkzLjQ2NSwxNDQuOTUyLDEwNjkuOTgyLDEwOC44NDgsMTA2NS41OTUsMTAyLjQzOHpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTc0Ljk5NywxLjMzM1Y3NmMwLDAtNy4xNjYsMC44MzMtNy4xNjYsMTAuNXMwLDEzODAuMDAzLDAsMTM4MC4wMDNzMi4zMzMsMy45OTksNi44MzMsNS44MzNsMC4zMzUsMTAwLjU3OGMwLDAsMTE5LjAwMSw3LjMzNiwxNDMuNTAxLTE3LjkxNGMwLDAsMi41MDEtMS4xNjUsMi41MDEtOC40OTljMC01Ljg4My0wLjAyOC0xMDM3LjU2Mi0wLjAyOC0xMDM3LjU2Mmw3Ljk2NS0wLjA2M2w0LjA2MiwyLjI1bDQ0LjAwMS0wLjM3NXYtMzQuMzc1bC00NC4wOTMtMC4wMTVsLTQuMjgzLDIuNzY1bC03LjI2OSwwLjAxN2wtMC4zNTUtNDYuMzA3YzAsMCwyLjk5OS03Mi4zMzUsMi45OTktMTA1LjgzNXMwLjMzMy0xMDMuNjY3LDAtMTE0LjY2N3MtMi4zMzQtMzYuNjY3LTIuNjY3LTQ2cy0xLTU2LjY2Ny0xLTU2LjY2N3MtMC4zNC00Mi4xNTYtMzQuMzMzLTc2QzEwNTMuMjUsMS4wNjEsMTAwNS4zMjcsMCw5NzQuOTk3LDEuMzMzelwiLz4nLFxuICAgICAgICAnZD1cIk05ODcuNzUsODguMjVsLTMuNSw1NC43NWMwLDAtMi41LDYuNS0yLjYyNSwxOC4zNzVzMCwxMTE5LjQ1NywwLDExMTkuNDU3czAuMDQyLDEwLjQ5OSwxLjM3NSwxNC4zMzNzMS4xNiw5LDEuMTYsOXYzMy41bDUxLjM0LDIzNS44MzVjMCwwLDc0LjgxLDEuOTM0LDk3Ljc1LTNjMjMuMjUtNSwzMy4zNzUtNi44NzUsNDItMThWMTUzMWwtMC4wOTgtMTAyMS4yMzdsNDcuMDk4LDAuODYyVjQ3NC4yNWwtNDcuMjk3LDEuNzRsMC4yOTctMzU5Ljc0YzAsMCwwLjc1LTQ3LjY5OS0zNC4yNS04Mi4yNXMtODMuMTY3LTM0LjU1MS0xMDkuNS0zNEw5ODcuNzUsODguMjV6XCIvPidcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gbG9hZERvb3JJbWFnZXMoKSB7XG4gICAgICAgIGRvb3JzSW1nLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgICAgICAkZnJpZGdlLmFwcGVuZCgnPHN2ZyBjbGFzcz1cImZyaWRnZS10b3AtaW1nIGRvb3ItJyArIGkgKyBcbiAgICAgICAgICAgICAgICAnXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIicgK1xuICAgICAgICAgICAgICAgICd4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiJyArXG4gICAgICAgICAgICAgICAgJyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMjI1IDE1NzZcIiAnICtcbiAgICAgICAgICAgICAgICAnZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDEyMjUgMTU3NlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkZWZzPjxwYXRoIGlkPVwiU1ZHSUQnICsgaSArICdcIiAnICsgcGF0aHNbaV0gKycgPC9kZWZzPicgK1xuICAgICAgICAgICAgICAgICc8Y2xpcFBhdGggaWQ9XCJTVkdJRF8nICsgaSArJ1wiPicgK1xuICAgICAgICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjU1ZHSUQnICsgaSArICdcIicgKyAnIG92ZXJmbG93PVwidmlzaWJsZVwiPjwvdXNlPicgK1xuICAgICAgICAgICAgICAgICc8L2NsaXBQYXRoPicgK1xuICAgICAgICAgICAgICAgICc8aW1hZ2UgY2xpcC1wYXRoPVwidXJsKCNTVkdJRF8nICsgaSArICcpXCIgb3ZlcmZsb3c9XCJ2aXNpYmxlXCIgd2lkdGg9XCIxMjI1XCInICtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0PVwiMTU3NlwiIHhsaW5rOmhyZWY9XCInICsgZWwgKyAnXCI+PC9pbWFnZT4nICtcbiAgICAgICAgICAgICAgICAnPC9zdmc+Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkRG9vckltYWdlcygpO1xuICAgIFxuICAgICR3aXRoRGVzYy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICQodGhpcykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yMSoxOCkgcmV0dXJuO1xuICAgICAgICAgICAgJGZvb3Rlci5hZGRDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgICAgIGZpdEhlaWdodCgkZm9vdGVyKTtcbiAgICAgICAgICAgIHNmeHNbaSU0XS5wbGF5KCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgICAgICBmaXRIZWlnaHQoJGZvb3Rlcik7XG4gICAgICAgICAgICBzZnhzW2klNF0uc2tpcFRvKDApO1xuICAgICAgICB9KTtcbiAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzIxKjE4KSByZXR1cm47XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKGRlc2NDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICAgICAgZml0SGVpZ2h0KCRmb290ZXIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICRyYWRpb011c2ljU29uZy5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQuYWRkQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnJlbW92ZUNsYXNzKCdhbmltYXRlLXNjcm9sbCcpO1xuICAgIH0pO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBoKSB7XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wIDw9IGgvMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0wJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEgJiYgc2Nyb2xsVG9wIDwgaC8yMSoyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjIgJiYgc2Nyb2xsVG9wIDwgaC8yMSozKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjMgJiYgc2Nyb2xsVG9wIDwgaC8yMSo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjQgJiYgc2Nyb2xsVG9wIDwgaC8yMSo1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjUgJiYgc2Nyb2xsVG9wIDwgaC8yMSo2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjYgJiYgc2Nyb2xsVG9wIDwgaC8yMSo3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjcgJiYgc2Nyb2xsVG9wIDwgaC8yMSo4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjggJiYgc2Nyb2xsVG9wIDwgaC8yMSo5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjkgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxMCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMCAmJiBzY3JvbGxUb3AgPCBoLzIxKjExKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMSAmJiBzY3JvbGxUb3AgPCBoLzIxKjEyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMiAmJiBzY3JvbGxUb3AgPCBoLzIxKjEzKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMyAmJiBzY3JvbGxUb3AgPCBoLzIxKjE0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNCAmJiBzY3JvbGxUb3AgPCBoLzIxKjE1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNSAmJiBzY3JvbGxUb3AgPCBoLzIxKjE2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNiAmJiBzY3JvbGxUb3AgPCBoLzIxKjE3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNyAmJiBzY3JvbGxUb3AgPCBoLzIxKjE4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxOCAmJiBzY3JvbGxUb3AgPCBoLzIxKjE5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxOSAmJiBzY3JvbGxUb3AgPCBoLzIxKjIwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoyMCAmJiBzY3JvbGxUb3AgPCBoLzIxKjIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID49IGgvMjEqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gc2Nyb2xsUGFnZShzY3JvbGwpIHtcbiAgICAgICAgc2Nyb2xsVG9wID0gLXNjcm9sbDtcbiAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcyhkZXNjQ2xhc3Nlc1RvUmVtb3ZlKTtcbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8xMikge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWZpeGVkJykuYWRkQ2xhc3MoJ2Zvb3Rlci1oaWRlJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQucmVtb3ZlQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItaGlkZScpLmFkZENsYXNzKCdmb290ZXItZml4ZWQnKTtcbiAgICAgICAgICAgICRsZWZ0VGV4dC5hZGRDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzI0KjE1KSB7XG4gICAgICAgICAgICAkZG9vck9wZW5lci5yZW1vdmVDbGFzcygnYmVoaW5kJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZG9vck9wZW5lci5hZGRDbGFzcygnYmVoaW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFN0YXRlc1syXSAtIHNjcm9sbFRvcCA8IGZyaWRnZUlubmVySGVpZ2h0ICogMC4wNSkge1xuICAgICAgICAgICAgJCgnLmdhbWUnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ3dpdGgtZ2FtZScpO1xuICAgICAgICAgICAgZml0SGVpZ2h0KCRmb290ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZS5wYXVzZSgpO1xuICAgICAgICAgICAgJCgnLmdhbWUnKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgICAgIGZpdEhlaWdodCgkZm9vdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgc2Nyb2xsU3RhdGVzWzFdKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG15U2Nyb2xsO1xuICAgIGZ1bmN0aW9uIGluaXRNeVNjcm9sbCgpIHtcbiAgICAgICAgbXlTY3JvbGwgPSBuZXcgd2luZG93LklTY3JvbGwoJyN3cmFwcGVyJywge1xuICAgICAgICAgICAgcHJvYmVUeXBlOiAzLFxuICAgICAgICAgICAgbW91c2VXaGVlbDogdHJ1ZSxcbiAgICAgICAgICAgIGNsaWNrOiB0cnVlLFxuICAgICAgICAgICAgLy8gc2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGludGVyYWN0aXZlU2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGZhZGVTY3JvbGxiYXJzOiB0cnVlLFxuICAgICAgICAgICAgLy8gc2hyaW5rU2Nyb2xsYmFyczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgICAgICAgc2Nyb2xsUGFnZShteVNjcm9sbC55KTtcbiAgICAgICAgICAgIGJnLnVwZFNjcm9sbChteVNjcm9sbC55KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsJywgdXBkYXRlUG9zaXRpb24pO1xuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsRW5kJywgdXBkYXRlUG9zaXRpb24pO1xuICAgIH1cbiAgICBcbiAgICAvLyB3aW5kb3cubG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgIGluaXRNeVNjcm9sbCgpO1xuICAgIGJnLmluaXQoKTtcbiAgICAvLyB9O1xuICAgIFxuICAgICRkb2N1bWVudC5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5uYXYtbWFpbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1swXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1vdXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMV0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtZ2FtZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1syXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gZ2FtZVxuICAgIHZhciBnYW1lO1xuICAgIGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4IDtcbiAgICAgICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICAgICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAgICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFuaW1hdGVKU1RyYW5zbGF0ZShzZWxlY3Rpb24sIGksIG4sIG51bWIpIHtcbiAgICAgICAgdmFyIGR1ciwgZHVyUmVwLCBuUmVwO1xuXG4gICAgICAgIGlmIChudW1iID09PSAwKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24uZXEoaSkuY3NzKHsnZGlzcGxheSc6ICdub25lJ30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0aW9uLmVxKGkpLmNzcyh7J2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJ30pO1xuICAgICAgICB9XG4gICAgICAgIGR1ciA9IDQwMDA7XG4gICAgICAgIG5SZXAgPSBudW1iID4gMTAgPyBpIDogMDtcbiAgICAgICAgZHVyUmVwID0gZHVyLygxK25SZXApO1xuICAgICAgICBcbiAgICAgICAgdmFyIHNldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChub3cpIHtcbiAgICAgICAgICAgICQodGhpcykuY3NzKHtcbiAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAndHJhbnNsYXRlKDAsJyArIG5vdyArJ3B4KScsXG4gICAgICAgICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZSgwLCcgKyBub3cgKydweCknLFxuICAgICAgICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZSgwLCcgKyBub3cgKydweCknLFxuICAgICAgICAgICAgICAgICctby10cmFuc2Zvcm0nOiAndHJhbnNsYXRlKDAsJyArIG5vdyArJ3B4KScsXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUoMCwnICsgbm93ICsncHgpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXNldENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLmVxKGkpLmNzcyh7J2JvdHRvbSc6ICcwJ30pO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5SZXA7IGorKykge1xuICAgICAgICAgICAgLy8gc2VsZWN0aW9uLmVxKGkpLmNzcyh7XCJib3R0b21cIjogXCIwXCJ9KTtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5lcShpKS5zdG9wKCkuYW5pbWF0ZSh7J2JvdHRvbSc6ICctMzYwcHgnfSwge1xuICAgICAgICAgICAgICAgIHN0ZXA6IHNldFRyYW5zbGF0ZSxcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJSZXAsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IHJlc2V0Q291bnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNlbGVjdGlvbi5lcShpKS5jc3Moeydib3R0b20nOiAnMCd9KTtcbiAgICAgICAgc2VsZWN0aW9uLmVxKGkpLnN0b3AoKS5hbmltYXRlKHsnYm90dG9tJzogKC0zNiAqIChuJTEwKSkgKyAncHgnfSwge1xuICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24gKG5vdykge1xuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZSgwLCcgKyBub3cgKydweCknLFxuICAgICAgICAgICAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiAndHJhbnNsYXRlKDAsJyArIG5vdyArJ3B4KScsXG4gICAgICAgICAgICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZSgwLCcgKyBub3cgKydweCknLFxuICAgICAgICAgICAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZSgwLCcgKyBub3cgKydweCknLFxuICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZSgwLCcgKyBub3cgKydweCknXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJSZXAsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5yZW1vdmVDbGFzcygncm90YXJ5LWRpZ2l0LW1vdmluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9nZ2xlSlNDb3VudGVyKHNlbGVjdGlvbiwgbGltaXQpIHtcbiAgICAgICAgc2VsZWN0aW9uLmFkZENsYXNzKCdyb3RhcnktZGlnaXQtbW92aW5nJyk7XG4gICAgICAgIHZhciBsaW1pdE51bWIgPSAwLCBkaWFscyA9IFtdO1xuICAgICAgICBsaW1pdE51bWIgPSBwYXJzZUludChsaW1pdCwgMTApO1xuICAgICAgICBkaWFscyA9IGxpbWl0TnVtYi50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgd2hpbGUoZGlhbHMubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgZGlhbHMudW5zaGlmdCgnMCcpO1xuICAgICAgICB9XG4gICAgICAgIGRpYWxzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpLCBhcnIpIHtcbiAgICAgICAgICAgIGFuaW1hdGVKU1RyYW5zbGF0ZShzZWxlY3Rpb24sIGksICthcnJbaV0sIGkgPyArYXJyW2ldICsgYXJyW2kgLSAxXSAqIDEwIDogK2FycltpXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gICAgICAgIHZhciAkZ2FtZUZpZWxkQ2VsbCA9ICQoJy5nYW1lLWZpZWxkLWNlbGwnKS5yZW1vdmUoKSxcbiAgICAgICAgICAgICRnYW1lRmllbGQgPSAkKCcuZ2FtZS1maWVsZCcpLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIFxuICAgICAgICAkKCcuZ2FtZS1wb3B1cC1uZXh0IC5zb2NpYWwtdmsgc3ZnJykuY2xvbmUoKS5hcHBlbmRUbygnLmdhbWUtcG9wdXAtd2luIC5zb2NpYWwtdmsnKTtcbiAgICAgICAgJCgnLmdhbWUtcG9wdXAtbmV4dCAuc29jaWFsLWZiIHN2ZycpLmNsb25lKCkuYXBwZW5kVG8oJy5nYW1lLXBvcHVwLXdpbiAuc29jaWFsLWZiJyk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciAkY3VyckdhbWVGaWVsZENlbGwgPSAkZ2FtZUZpZWxkQ2VsbC5jbG9uZSgpO1xuICAgICAgICAgICAgaWYgKGkgJSA1ID09PSAwKSAkY3VyckdhbWVGaWVsZENlbGwuYWRkQ2xhc3MoJ2NvbC14cy1vZmZzZXQtMScpO1xuICAgICAgICAgICAgJGN1cnJHYW1lRmllbGRDZWxsLmNoaWxkcmVuKCcuZ2FtZS10aWxlJykuYWRkQ2xhc3MoJ2dhbWUtdGlsZS0nICsgaSk7XG4gICAgICAgICAgICAkZ2FtZUZpZWxkLmFwcGVuZCgkY3VyckdhbWVGaWVsZENlbGwpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2ltZy90aWxlLScgKyBpICsgJy1ibGFjay5wbmcnO1xuICAgICAgICAgICAgaW1hZ2VzLnB1c2goaW1nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgVGlsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBvcHRpb25zLm51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuaW1nTnVtZXIgPSBvcHRpb25zLmltZ051bWVyO1xuICAgICAgICAgICAgdGhpcy4kZGl2ID0gJCgnLmdhbWUtdGlsZS0nICsgb3B0aW9ucy5udW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5pbWcgPSBpbWFnZXNbb3B0aW9ucy5pbWdOdW1lcl07XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lO1xuICAgICAgICAgICAgdGhpcy4kZGl2LmFwcGVuZCgkKHRoaXMuaW1nKS5jbG9uZSgpKTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzU29sdmVkIHx8IF90aGlzLmlzTG9ja2VkIHx8IF90aGlzLmlzT3BlbiB8fCAhX3RoaXMuZ2FtZS5zdGFydGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5vcGVuVGFsZSh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLnNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS51bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEdhbWUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAwO1xuICAgICAgICAgICAgdGhpcy5zb2x2ZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWVTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICAgICAgICAgIHRoaXMubG9ja2VkSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLmJhY2tJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25TdGFydCA9ICQoJy5zdGFydC1nYW1lJylcbiAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvblN0YXJ0LnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgJGdhbWVQb3B1cFN0YXJ0LmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3RhcnQgPSAkKCcucmVzdGFydC1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdW1lID0gJCgnLnJlc3VtZS1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uTmV4dCA9ICQoJy5uZXh0LWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGluZm9EaXYgPSBvcHRpb25zLiRpbmZvRGl2O1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zaG93RGVsYXkgPSAzMDAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZSA9ICQoJy5nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIgPSAkKCcuZ2FtZS10aW1lcicpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcyA9ICQoJy5nYW1lLWNsaWNrcycpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlID0gJCgnLmdhbWUtc2NvcmUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVJvdGFyeSA9ICQoJy5nYW1lLXNjb3JlLXJvdGFyeScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVGV4dCA9ICQoJy5nYW1lLXNjb3JlLXRleHQnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRvdGFsID0gJCgnLmdhbWUtc2NvcmUtdG90YWwnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbCA9ICQoJy5nYW1lLWxldmVsJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGFzayA9ICQoJy5nYW1lLXRhc2snKTtcbiAgICAgICAgICAgICQoJy5zb2NpYWwtdmstbGV2ZWwtZ2FtZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzaGFyZS52ayh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMicsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0JzQuNC90LjRgdGC0LXRgNGB0YLQstC+INCT0LDQt9C40YDQvtCy0LrQuCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6ICfQryDQvdCw0LHRgNCw0LsgJyArIF90aGlzLnNjb3JlVG90YWwgKyAnICcgKyBkZWNsaW5hdG9yLmRlY2xpbmF0ZShfdGhpcy5zY29yZVRvdGFsKVxuICAgICAgICAgICAgICAgICAgICAvLyBpbWc6ICdsaW5rJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKCcuc29jaWFsLWZiLWxldmVsLWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2hhcmUuZmIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDInLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Cc0LjQvdC40YHRgtC10YDRgdGC0LLQviDQk9Cw0LfQuNGA0L7QstC60LgnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiAn0K8g0L3QsNCx0YDQsNC7ICcgKyBfdGhpcy5zY29yZVRvdGFsICsgJyAnICsgZGVjbGluYXRvci5kZWNsaW5hdGUoX3RoaXMuc2NvcmVUb3RhbClcbiAgICAgICAgICAgICAgICAgICAgLy8gaW1nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5zb2NpYWwtdmstd2luLWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2hhcmUudmsoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDInLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Cc0LjQvdC40YHRgtC10YDRgdGC0LLQviDQk9Cw0LfQuNGA0L7QstC60LgnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiAn0K8g0L3QsNCx0YDQsNC7ICcgKyBfdGhpcy5zY29yZVRvdGFsICsgJyAnICsgZGVjbGluYXRvci5kZWNsaW5hdGUoX3RoaXMuc2NvcmVUb3RhbClcbiAgICAgICAgICAgICAgICAgICAgLy8gaW1nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5zb2NpYWwtZmItd2luLWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2hhcmUuZmIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDInLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Cc0LjQvdC40YHRgtC10YDRgdGC0LLQviDQk9Cw0LfQuNGA0L7QstC60LgnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjOiAn0K8g0L3QsNCx0YDQsNC7ICcgKyBfdGhpcy5zY29yZVRvdGFsICsgJyAnICsgZGVjbGluYXRvci5kZWNsaW5hdGUoX3RoaXMuc2NvcmVUb3RhbClcbiAgICAgICAgICAgICAgICAgICAgLy8gaW1nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vcm90YXJ5XG4gICAgICAgICAgICB2YXIgJHJvdGFyeURpZ2l0ID0gJCgnLnJvdGFyeS1kaWdpdCcpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgJHJvdGFyeURpZ2l0LmFwcGVuZCgnPGxpPicgKyAoaSAlIDEwKSArICc8L2xpPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlUm90YXJ5LmFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy4kcm90YXJ5RGlnaXQwID0gJCgnLnJvdGFyeS1kaWdpdC0wJyk7XG4gICAgICAgICAgICB0aGlzLiRyb3RhcnlEaWdpdDEgPSAkKCcucm90YXJ5LWRpZ2l0LTEnKTtcbiAgICAgICAgICAgIHRoaXMuJHJvdGFyeURpZ2l0MiA9ICQoJy5yb3RhcnktZGlnaXQtMicpO1xuICAgICAgICAgICAgdGhpcy4kcm90YXJ5RGlnaXQzID0gJCgnLnJvdGFyeS1kaWdpdC0zJyk7XG4gICAgICAgICAgICB0aGlzLiRyb3RhcnlEaWdpdDQgPSAkKCcucm90YXJ5LWRpZ2l0LTQnKTtcbiAgICAgICAgICAgIHRoaXMuJHJvdGFyeURpZ2l0ID0gJCgnLnJvdGFyeS1kaWdpdCcpO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubmV4dExldmVsKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydENvdW50KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuc3RhcnRDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbWUgPSBNYXRoLnJvdW5kKF90aGlzLnRpbWVNYXggLSAoRGF0ZS5ub3coKSAtIF90aGlzLnN0YXJ0VGltZSkvMTAwMCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVUaW1lci50ZXh0KF90aGlzLnRpbWUpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lID09PSAyMCkgX3RoaXMuJGdhbWVUaW1lci5hZGRDbGFzcygncmVkLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGltZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWlsTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydGVkKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdW1lLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3VtZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b25SZXN1bWUudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBSZXN1bWUuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKSAtICh0aGlzLnRpbWVNYXggLSB0aGlzLnRpbWUpICogMTAwMDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb3VudCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgICAgIHRpbGUuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUubmV4dExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pbml0TGV2ZWwodGhpcy5sZXZlbCArIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmluaXRMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID4gNSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbC50ZXh0KCfQo9GA0L7QstC10L3RjCAnICsgbGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcy50ZXh0KDApO1xuICAgICAgICAgICAgc3dpdGNoKGxldmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDMwMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDksIDEwLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTgxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNywgOSwgMTAsIDEyLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTIxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxODtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxMjE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA4LCA5LCAxMCwgMTEsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gOTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWVNYXggLSAxO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRpbWVyLnRleHQodGhpcy50aW1lTWF4IC0gMSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFsZXNUb1NvbHZlOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlcnMucHVzaChpICUgKHRoaXMudGFsZXNUb1NvbHZlL3RoaXMudGlsZXNJbkNoYWluKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBzaHVmZmxlKHRoaXMubnVtYmVycyk7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50aWxlcy5wdXNoKG5ldyBUaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBfdGhpcy50aWxlTWFwW2ldLFxuICAgICAgICAgICAgICAgICAgICBpbWdOdW1lcjogZWwsXG4gICAgICAgICAgICAgICAgICAgIGdhbWU6IF90aGlzXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGFzay50ZXh0KHRoaXMudGlsZXNJbkNoYWluICsgJyAnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzICs9IDE7XG4gICAgICAgICAgICB0aGlzLmNsaWNrc1RvdGFsICs9IDE7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzLnRleHQodGhpcy5jbGlja3MpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsZWFyTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNvbHZlZCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGVsLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LnBhcmVudCgpLnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lci5yZW1vdmVDbGFzcygncmVkLXRleHQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jb21wbGV0ZUxldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBzY29yZSA9ICh0aGlzLnRpbWVTY29yZU1heCAqIHRoaXMudGltZS90aGlzLnRpbWVNYXggKyB0aGlzLmNsaWNrU2NvcmVNYXggLyB0aGlzLmNsaWNrcykgKiB0aGlzLmxldmVsO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSBNYXRoLmZsb29yKHNjb3JlKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCArPSB0aGlzLnNjb3JlTGV2ZWw7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUudGV4dCh0aGlzLnNjb3JlVG90YWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVGV4dC50ZXh0KGRlY2xpbmF0b3IuZGVjbGluYXRlKHRoaXMuc2NvcmVUb3RhbCkpO1xuICAgICAgICAgICAgdG9nZ2xlSlNDb3VudGVyKHRoaXMuJHJvdGFyeURpZ2l0LCB0aGlzLnNjb3JlVG90YWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwudGV4dCh0aGlzLnNjb3JlVG90YWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgPCA1KSB7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cE5leHQuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbk5leHQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvbk5leHQudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwTmV4dC5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBXaW4uZmFkZUluKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuZmFpbExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCAtPSAxO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydC5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25SZXN0YXJ0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uUmVzdGFydC51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cFJlc3RhcnQuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUud2luTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUxldmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3BlblRhbGUgPSBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLnB1c2godGlsZSk7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW1lciA9IHRoaXMub3BlbmVkWzBdLmltZ051bWVyLFxuICAgICAgICAgICAgICAgICAgICBpc0JpbmRlZFRhbGVzID0gdGhpcy5vcGVuZWQuZXZlcnkoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5pbWdOdW1lciA9PT0gaW1nTnVtZXI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JpbmRlZFRhbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiB0aGlzLnRpbGVzSW5DaGFpbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb2x2ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhbGVzVG9Tb2x2ZSA9PT0gdGhpcy5zb2x2ZWQpIHRoaXMud2luTGV2ZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBnYW1lID0gbmV3IEdhbWUoe1xuICAgICAgICAgICAgJGluZm9EaXY6ICQoJy5kZXNjLWdhbWUgZGl2JylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGluaXRHYW1lKCk7XG4gICAgLy8gYXVkaW9cbiAgICB2YXIgVHJhY2tMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRyYWNrcyA9IFtcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBCZWNhdXNlIEkgV2FudCBZb3UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBCcm9rZW4gUHJvbWlzZS5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIERyYWcubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBNZWRzLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gT25lIE9mIEEgS2luZC5tcDMnXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNrID4gdGhpcy50cmFja3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1t0aGlzLmN1cnJlbnRUcmFja107XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbMF07XG4gICAgfTtcbiAgICBcbiAgICB2YXIgdHJhY2tMaXN0ID0gbmV3IFRyYWNrTGlzdCgpO1xuICAgIFxuICAgIC8vIFNldHVwIHRoZSBwbGF5ZXIgdG8gYXV0b3BsYXkgdGhlIG5leHQgdHJhY2tcbiAgICB2YXIgYXVkaW87XG4gICAgdmFyIGFNdXNpYyA9ICQoJyNtdXNpYycpWzBdO1xuICAgIGF1ZGlvID0gd2luZG93LmF1ZGlvanMuY3JlYXRlKGFNdXNpYywge1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgIFxuICAgIGZ1bmN0aW9uIHNob3dCdXR0b24oKSB7XG4gICAgICAgIGlmIChhdWRpby5wbGF5aW5nKSB7XG4gICAgICAgICAgICAkcGxheVBhdXNlLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciAkcGxheVBhdXNlID0gJCgnLnJhZGlvLW11c2ljLWJ0bi1wYXVzZScpLFxuICAgICAgICAkcGxheU5leHQgPSAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQtaG92ZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRwbGF5TmV4dC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHBsYXlOZXh0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSwgNDAwKTtcbiAgICB9KTtcbiAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgJHBsYXlQYXVzZS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIGEgdHJhY2sgb24gY2xpY2tcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbn0pO1xufVxuXG5wcmVsb2FkZXIuaW5pdCgpO1xuYW5pbWF0ZSgwLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFwcmVsb2FkZXIuZGVzdHJveWVkKSB7XG4gICAgICAgIHByZWxvYWRlci51cGRhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBwcmVsb2FkZXI7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICBhbmltYXRlKDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJnLnVwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxudmFyIGltYWdlc1RvTG9hZDtcbmZ1bmN0aW9uIGxvYWRJbWFnZShzcmMsIG51bWJlciwgbGlzdCkge1xuICAgIGxvYWRJbWFnZS5jb3VudGVyID0gbG9hZEltYWdlLmNvdW50ZXIgfHwgMDtcbiAgICBsb2FkSW1hZ2UubWF4ID0gbG9hZEltYWdlLm1heCB8fCBsaXN0Lmxlbmd0aCA7XG4gICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvYWRJbWFnZS5jb3VudGVyKys7XG4gICAgICAgIHZhciBjdXJyZW50UGVyY2VudCA9IE1hdGguZmxvb3IoMTAwICogbG9hZEltYWdlLmNvdW50ZXIvbG9hZEltYWdlLm1heCk7XG4gICAgICAgIHByZWxvYWRlci5zaG93UGVyY2VudChjdXJyZW50UGVyY2VudCk7XG4gICAgICAgIGlmIChsb2FkSW1hZ2UuY291bnRlciA9PT0gbG9hZEltYWdlLm1heCkge1xuICAgICAgICAgICAgJGZyaWRnZUlubmVyLmF0dHIoJ3NyYycsIGltYWdlc1RvTG9hZFswXSk7XG4gICAgICAgICAgICBwcmVsb2FkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgJCgnLnByZWxvYWQtaW1nJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICAgICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBpbWc7XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBvc3RmaXggPSAnJyxcbiAgICAgICAgZXh0ID0gJy5wbmcnLFxuICAgICAgICBpO1xuXG4gICAgaWYoIC9pUChhZHxvZHxob25lKXxBbmRyb2lkfEJsYWNrYmVycnl8V2luZG93cyBQaG9uZS9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIHBvc3RmaXggPSAnX3RhYmxldCc7XG4gICAgICAgIGV4dCA9ICcucG5nJztcbiAgICB9XG4gICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8IDQwMCkge1xuICAgICAgICBwb3N0Zml4ID0gJ19tb2JpbGUnO1xuICAgICAgICBleHQgPSAnLnBuZyc7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZCA9IFtcbiAgICAgICAgJy4vaW1nL2ZyaWRnZV93aXRoX3JhZGlvJyArIHBvc3RmaXggKyAnLnBuZycsXG4gICAgICAgICcuL2ltZy9xdWVzdGlvbi5wbmcnLFxuICAgICAgICAnLi9pbWcvYmxhbmsucG5nJyxcbiAgICAgICAgJy4vaW1nL3NjcmVlbi5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dC5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dF9hY3RpdmUucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXkucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXlfYWN0aXZlLnBuZydcbiAgICBdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGltYWdlc1RvTG9hZC5wdXNoKCcuL2ltZy90aWxlLScgKyBpICsgJy1ibGFjay5wbmcnKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IDIyOyBpKyspIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IGkgPCAxMCA/ICcwJyA6ICcnLFxuICAgICAgICAgICAgcGF0aCA9ICcuL2ltZy9kb29yLScgKyBwcmVmaXggKyBpICsgcG9zdGZpeCArIGV4dDtcbiAgICAgICAgaW1hZ2VzVG9Mb2FkLnB1c2gocGF0aCk7XG4gICAgICAgIGRvb3JzSW1nLnB1c2gocGF0aCk7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZC5mb3JFYWNoKGxvYWRJbWFnZSk7XG59KSgpOyIsInZhciAkID0gKHdpbmRvdy4kKSxcbiAgICBCdWJibGUgPSByZXF1aXJlKCcuL0J1YmJsZS5qcycpO1xuXG52YXIgcHJlbG9hZGVyID0ge307XG52YXIgYnViYmxlcyA9IFtdLFxuICAgIHcsIGgsXG4gICAgY2FudmFzLFxuICAgIGN0eDtcblxucHJlbG9hZGVyLmRlc3Ryb3llZCA9IGZhbHNlO1xuXG5wcmVsb2FkZXIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlbG9hZGVyLWNhbnZhcycpO1xuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHc7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoO1xuICAgICAgICBidWJibGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBlbC5yZXNpemUodywgaCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNpemUoKTtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG59O1xucHJlbG9hZGVyLnNob3dQZXJjZW50ID0gZnVuY3Rpb24gKHBlcmNlbnQpIHtcbiAgICBidWJibGVzLnB1c2gobmV3IEJ1YmJsZSh7XG4gICAgICAgIHc6IHcsXG4gICAgICAgIGg6IGgsXG4gICAgICAgIGN0eDogY3R4LFxuICAgICAgICBwZXJjZW50OiBwZXJjZW50LFxuICAgICAgICBidWJibGVzOiBidWJibGVzXG4gICAgfSkpO1xufTtcbnByZWxvYWRlci5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwcmVsb2FkZXIuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgYnViYmxlcy5sZW5ndGggPSAwO1xuICAgIH0sIDEwMDApO1xufTtcbnByZWxvYWRlci51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwICwgdyAsIGgpO1xuICAgIGlmIChidWJibGVzLmxlbmd0aCA+IDgpIHtcbiAgICAgICAgYnViYmxlcyA9IGJ1YmJsZXMuc3BsaWNlKC04KTtcbiAgICB9XG4gICAgYnViYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBlbC51cGRhdGUoKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcHJlbG9hZGVyOyIsInZhciBzZnggPSBmdW5jdGlvbih1cmwsIGlkKSB7XG4gICAgdmFyIHNvdW5kID0ge307XG4gICAgdHJ5IHtcbiAgICAgICAgd2luZG93LkF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpO1xuICAgICAgICB2YXIgYnVmZmVyLCBzb3VyY2UsIGRlc3RpbmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgdmFyIGF1ZGlvID0gbmV3IHdpbmRvdy5BdWRpbygpLFxuICAgICAgICAgICAgY2FuUGxheU1wMyA9ICEhYXVkaW8uY2FuUGxheVR5cGUgJiYgYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL21wMzsgY29kZWNzPVxcJ3ZvcmJpc1xcJycpICE9PSAnJyxcbiAgICAgICAgICAgIGV4dCA9IGNhblBsYXlNcDMgPyAnbXAzJyA6ICdvZ2cnO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxvYWRTb3VuZEZpbGUgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHRoaXMucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGRlY29kZWRBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZGVjb2RlZEFycmF5QnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZGVjb2RpbmcgZmlsZScsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH07XG4gICAgICAgIHNvdW5kLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICAgICAgc291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gY29udGV4dC5kZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KGRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgIHNvdXJjZS5zdGFydCgwKTtcbiAgICAgICAgfTtcbiAgICAgICAgc291bmQuc2tpcFRvID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgIGxvYWRTb3VuZEZpbGUodXJsLnNsaWNlKDAsIC0zKSArIGV4dCk7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgdmFyIGFTZnggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHNvdW5kID0gd2luZG93LmF1ZGlvanMuY3JlYXRlKGFTZngsIHt9KTtcbiAgICAgICAgc291bmQubG9hZCh1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gc291bmQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNmeDsiLCJ2YXIgJCA9ICh3aW5kb3cuJCk7XG52YXIgc2hhcmUgPSB7XG4gICAgdms6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBhZGRyZXNzID0gJ2h0dHA6Ly92a29udGFrdGUucnUvc2hhcmUucGhwPyc7XG4gICAgICAgIGFkZHJlc3MgKz0gJ3VybD0nICAgICAgICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMudXJsKTtcbiAgICAgICAgYWRkcmVzcyArPSAnJnRpdGxlPScgICAgICAgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy50aXRsZSk7XG4gICAgICAgIGFkZHJlc3MgKz0gJyZkZXNjcmlwdGlvbj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGVzYyk7XG4gICAgICAgIGlmIChvcHRpb25zLmltZykgYWRkcmVzcyArPSAnJmltYWdlPScgICAgICAgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5pbWcpO1xuICAgICAgICBhZGRyZXNzICs9ICcmbm9wYXJzZT10cnVlJztcbiAgICAgICAgc2hhcmUucG9wdXAoYWRkcmVzcyk7XG4gICAgfSxcbiAgICBmYjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9zaGFyZV9vcGVuX2dyYXBoJztcbiAgICAgICAgXG4gICAgICAgIC8vIGFkZHJlc3MgKz0gJ2FwcF9pZD0xNDU2MzQ5OTU1MDE4OTUnO1xuICAgICAgICAvLyBhZGRyZXNzICs9ICcmZGlzcGxheT1wb3B1cCc7XG4gICAgICAgIC8vIGFkZHJlc3MgKz0gJyZhY3Rpb25fdHlwZT1vZy5saWtlcyc7XG4gICAgICAgIC8vIGFkZHJlc3MgKz0gJyZhY3Rpb25fcHJvcGVydGllcz0lN0IlMjJvYmplY3QlMjIlM0ElMjJodHRwcyUzQSUyRiUyRmRldmVsb3BlcnMuZmFjZWJvb2suY29tJTJGZG9jcyUyRiUyMiU3RCc7XG4gICAgICAgIC8vIGFkZHJlc3MgKz0gJyZyZWRpcmVjdF91cmk9aHR0cHMlM0ElMkYlMkZkZXZlbG9wZXJzLmZhY2Vib29rLmNvbSUyRnRvb2xzJTJGZXhwbG9yZXInO1xuICAgICAgICAvLyBcbiAgICAgICAgJCgnI2ZiLW1ldGEtdXJsJykuYXR0cignY29udGVudCcsIG9wdGlvbnMudXJsKTtcbiAgICAgICAgJCgnI2ZiLW1ldGEtdGl0bGUnKS5hdHRyKCdjb250ZW50Jywgb3B0aW9ucy50aXRsZSk7XG4gICAgICAgICQoJyNmYi1tZXRhLWRlc2MnKS5hdHRyKCdjb250ZW50Jywgb3B0aW9ucy5kZXNjKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuaW1nKSAkKCcjZmItbWV0YS1pbWFnJykuYXR0cignY29udGVudCcsIG9wdGlvbnMuaW1nKTtcbiAgICAgICAgc2hhcmUucG9wdXAoYWRkcmVzcyk7XG4gICAgfSxcbiAgICBwb3B1cDogZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICAgICAgd2luZG93Lm9wZW4oYWRkcmVzcywnJywndG9vbGJhcj0wLHN0YXR1cz0wLHdpZHRoPTYyNixoZWlnaHQ9NDM2Jyk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaGFyZTsiXX0=
