(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);
var sfx = require('./sfx.js')('./sfx/sfx-2.mp3', 'sfx');

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
        scrollTop;
    
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
    
    var paths = [
        'd="M893.5,90H96c0,0-36.652-0.26-65,28C3.917,145,3,179.5,3,179.5v1163c0,0,9,13,50.5,14.5s861,0,861,0s56.832,2.665,70.5-14.333v-1157.5C985,185.167,986,98.5,893.5,90z"/>',
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
        }
    
        myScroll.on('scroll', updatePosition);
        myScroll.on('scrollEnd', updatePosition);
    }
    
    // window.loaded = function () {
    initMyScroll();
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
},{"./sfx.js":2}],2:[function(require,module,exports){
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
            console.log('play');
            source = context.createBufferSource();
            source.buffer = buffer;
            destination = context.destination;
            source.connect(destination);
            source.start(0);
        };
        sfx.skipTo = function () {};
        console.log(url.slice(0, -3) + ext);
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9oZWxpY29wdGVyL21pbmdhei9zcmMvanMvc2Z4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaHRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQgPSAod2luZG93LiQpO1xudmFyIHNmeCA9IHJlcXVpcmUoJy4vc2Z4LmpzJykoJy4vc2Z4L3NmeC0yLm1wMycsICdzZngnKTtcblxuJCh3aW5kb3cpLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xudmFyICRwcmVsb2FkZXJQcm9ncmVzcyA9ICQoJy5wcmVsb2FkZXItcHJvZ3Jlc3MnKSxcbiAgICAkZnJpZGdlSW5uZXIgPSAkKCcuZnJpZGdlLWlubmVyJyksXG4gICAgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICBkb29yc0ltZyA9IFtdO1xuICAgIFxuZnVuY3Rpb24gRGVjbGluYXRvcihmb3Jtcykge1xuICAgIHRoaXMuZGVjbGluYXRlID0gZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICB2YXIgY2FzZXMgPSBbMiwgMCwgMSwgMSwgMSwgMl07XG4gICAgICAgIHJldHVybiBmb3Jtc1sgKG51bWJlciUxMDA+NCAmJiBudW1iZXIlMTAwPDIwKT8gMiA6IGNhc2VzWyhudW1iZXIlMTA8NSk/bnVtYmVyJTEwOjVdIF07XG4gICAgfTtcbn1cbnZhciBkZWNsaW5hdG9yID0gbmV3IERlY2xpbmF0b3IoWyfQvtGH0LrQvicsICfQvtGH0LrQsCcsICfQvtGH0LrQvtCyJ10pO1xuXG5mdW5jdGlvbiBpbml0UGFnZSgpIHtcbiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd2l0aERlc2MgPSAkKCcud2l0aC1kZXNjJyksXG4gICAgICAgICRmb290ZXIgPSAkKCcuZm9vdGVyJyksXG4gICAgICAgICRmcmlkZ2UgPSAkKCcuZnJpZGdlLWRvb3Itd3JhcCcpLFxuICAgICAgICAkcGFnZSA9ICQoJy5wYWdlJyksXG4gICAgICAgICRsZWZ0VGV4dCA9ICQoJy5sZWZ0LXRleHQnKSxcbiAgICAgICAgJHJhZGlvID0gJCgnLnJhZGlvLWNvbnQnKSxcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nID0gJCgnLnJhZGlvLW11c2ljLXNvbmctaG92ZXInKSxcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dCA9ICQoJy5yYWRpby1tdXNpYy1zb25nLXRleHQnKSxcbiAgICAgICAgJGRvb3JPcGVuZXIgPSAkKCcuZG9vci1vcGVuZXInKSxcbiAgICAgICAgJGdhbWVQb3B1cFN0YXJ0ID0gJCgnLmdhbWUtcG9wdXAtc3RhcnQnKS5zaG93KCksXG4gICAgICAgICRnYW1lUG9wdXBSZXN0YXJ0ID0gJCgnLmdhbWUtcG9wdXAtcmVzdGFydCcpLFxuICAgICAgICAkZ2FtZVBvcHVwUmVzdW1lID0gJCgnLmdhbWUtcG9wdXAtcmVzdW1lJyksXG4gICAgICAgICRnYW1lUG9wdXBOZXh0PSAkKCcuZ2FtZS1wb3B1cC1uZXh0JyksXG4gICAgICAgICRnYW1lUG9wdXBXaW4gPSAkKCcuZ2FtZS1wb3B1cC13aW4nKSxcbiAgICAgICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiAgICB2YXIgaGVpZ2h0LFxuICAgICAgICBmcmlkZ2VJbm5lckhlaWdodCxcbiAgICAgICAgc2Nyb2xsU3RhdGVzLFxuICAgICAgICBzY3JvbGxUb3A7XG4gICAgXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICB2YXIgcmFkaW9IZWlnaHQgPSAkcmFkaW9bMF0uY2xpZW50V2lkdGggKiAxMjQvMTA4MCArIDIwLFxuICAgICAgICAgICAgcGVyY2VudCA9IDAuNTQsXG4gICAgICAgICAgICBnYW1lVG9wID0gcmFkaW9IZWlnaHQgKyAkZnJpZGdlSW5uZXJbMF0uY2xpZW50V2lkdGggKiAkZnJpZGdlSW5uZXIuYXR0cignaGVpZ2h0JykvJGZyaWRnZUlubmVyLmF0dHIoJ3dpZHRoJykgKiBwZXJjZW50O1xuICAgICAgICAgICAgXG4gICAgICAgIGZyaWRnZUlubmVySGVpZ2h0ID0gcGFyc2VJbnQoJGZyaWRnZUlubmVyLmNzcygnaGVpZ2h0JyksIDEwKSAtIDIwO1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgc2Nyb2xsU3RhdGVzID0gWzAsIHJhZGlvSGVpZ2h0LCBNYXRoLm1pbihnYW1lVG9wLCBmcmlkZ2VJbm5lckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCldO1xuICAgICAgICAkcGFnZS5jc3MoJ2hlaWdodCcsIE1hdGgubWluKGdhbWVUb3AgKyB3aW5kb3cuaW5uZXJIZWlnaHQsIGZyaWRnZUlubmVySGVpZ2h0KSk7XG4gICAgfVxuICAgIHJlc2l6ZSgpO1xuICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gICAgXG4gICAgdmFyIHBhdGhzID0gW1xuICAgICAgICAnZD1cIk04OTMuNSw5MEg5NmMwLDAtMzYuNjUyLTAuMjYtNjUsMjhDMy45MTcsMTQ1LDMsMTc5LjUsMywxNzkuNXYxMTYzYzAsMCw5LDEzLDUwLjUsMTQuNXM4NjEsMCw4NjEsMHM1Ni44MzIsMi42NjUsNzAuNS0xNC4zMzN2LTExNTcuNUM5ODUsMTg1LjE2Nyw5ODYsOTguNSw4OTMuNSw5MHpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNODk1LjUsOTNIOThjMCwwLTM4LjY1Mi0yLjI2LTY3LDI2QzMuOTE3LDE0NiwzLDE4Mi41LDMsMTgyLjV2MTE2NGMwLDAsNCwxMS41LDUyLjUsMTMuNWg4NjFjMCwwLDU1LjgzMywwLjE1Miw2OS41LTE0LjMzM3YtMTE1Ny41Qzk4NiwxODguMTY3LDk4OCwxMDEuNSw4OTUuNSw5M3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNODk1LjUsOTMuMDQzbC03OTcuNS0yYzAsMC00MC42NTItMS4yNi02OSwyN2MtMjcuMDgzLDI3LTI3LDY0LjUtMjcsNjQuNXYxMTY4YzAsMCw1LDEyLjUsNTMuNSwxNC41bDg2MS01YzAsMCw1NS44MzMsMC4xNTIsNjkuNS0xNC4zMzNWMTg4LjIxQzk4NiwxODguMjEsOTg4LDEwMS41NDMsODk1LjUsOTMuMDQzelwiLz4nLFxuICAgICAgICAnZD1cIk04OTYuNTgsOTMuMTQ3bC04MDIuNS00YzAsMC0zNy42NTItMC4yNi02NiwyOGMtMjcuMDgzLDI3LTI2LDY1LjUtMjYsNjUuNXYxMTc2YzAsMCwxMywxMC41LDYxLjUsMTIuNWw4NTQtMTFjMCwwLDU1LjgzMywwLjE1Miw2OS41LTE0LjMzMnYtMTE1Ny41Qzk4Ny4wOCwxODguMzE0LDk4OS4wOCwxMDEuNjQ3LDg5Ni41OCw5My4xNDd6XCIvPicsXG4gICAgICAgICdkPVwiTTg5OC41MDYsOTJsLTgwNy41LTdjMCwwLTM4LjAwNiwwLTYzLDI4Yy0yNS40NjcsMjguNTMtMjYsNTcuNS0yNiw1Ny41djExOTVjMCwwLDYuNjcyLDEyLjgzLDYyLjUsMTQuNXM4NTUtMTgsODU1LTE4czU1LjgzMywwLjE1Miw2OS41LTE0LjMzMlYxODcuMTY3Qzk4OS4wMDYsMTg3LjE2Nyw5OTEuMDA2LDEwMC41LDg5OC41MDYsOTJ6XCIvPicsXG4gICAgICAgICdkPVwiTTkwMS41LDkyLjA2MmwtODA3LjUtMTJjMCwwLTM4LjAwNiwyLTYzLDMwYy0yNS40NjcsMjguNTMtMjcsNTkuNS0yNyw1OS41bC0xLDEyMDJjMCwwLDIuOTk2LDE4LjIyNyw1OC41LDE5LjVjNy4zODEsMC4zODksMjcuODU2LDEuMTY4LDU3LjgzNCwwLjQ5MmMxOTYuODAyLTQuNDM4LDgwMy4xNjYtMjkuNDkyLDgwMy4xNjYtMjkuNDkyczU1LjgzMywxLjE1Miw2OS41LTEzLjMzMlYxODcuMjI5Qzk5MiwxODcuMjI5LDk5NCwxMDAuNTYyLDkwMS41LDkyLjA2MnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTA0LjUsOTFMMTAzLDc0YzAsMC00MS4wMDYsNC02NiwzMmMtMjUuNDY3LDI4LjUyOS0yNiw2NC41LTI2LDY0LjV2MTIxNWMwLDAsMy42NzIsMTYuODMsNTkuNSwxOC41czg1NS00MCw4NTUtNDBzNTYuODMzLDAuMTUyLDcwLjUtMTQuMzMyVjE4Ny4xNjdDOTk2LDE4Ny4xNjcsOTk3LDk5LjUsOTA0LjUsOTF6XCIvPicsXG4gICAgICAgICdkPVwiTTkwOS40NjUsOTAuMTIybC03ODIuNS0yMmMwLDAtNDMuMDM1LTEuMzc4LTc0LDMxcy0yNiw3MS41LTI2LDcxLjVsLTEsMTIyOWMwLDAsMy42NzIsMTYuODMsNTkuNSwxOC41czg0NC01Miw4NDQtNTJzNTcuODMzLTAuODQ4LDcxLjUtMTUuMzMyVjE4Ny4yODlDMTAwMC45NjUsMTg3LjI4OSwxMDAxLjk2NSw5OC42MjIsOTA5LjQ2NSw5MC4xMjJ6XCIvPicsXG4gICAgICAgICdkPVwiTTkxNC41OCw4OS44ODdsLTc3Mi41LTI5YzAsMC00Mi4wMDYsNS02NywzM2MtMjUuNDY3LDI4LjUyOS0yNSw2NC41LTI1LDY0LjV2MTI1NWMwLDAsMCwxOC4yODEsNzkuNTg1LDIyLjI4MWM1NS43ODMsMi44MDQsODAzLjkxNS02Ny43ODEsODAzLjkxNS02Ny43ODFzNTguODMzLTEuODQ4LDcyLjUtMTYuMzMydi0xMTY1LjVDMTAwNi4wOCwxODYuMDU0LDEwMDcuMDgsOTguMzg3LDkxNC41OCw4OS44ODd6XCIvPicsXG4gICAgICAgICdkPVwiTTkyMS4wOCw4OS45NzZsLTczMS41LTM3YzAsMC01Mi4wMDYsMS03NywyOWMtMjUuNDY3LDI4LjUyOS0yOSw1OC41LTI5LDU4LjV2MTI5NmMwLDAsMjAuNjcyLDE0LjgzLDc2LjUsMTYuNXM3NjktODEsNzY5LTgxczczLjkyMS02LjMxLDgzLjUtMTguMzMyVjE4Ni4xNDNDMTAxMi41OCwxODYuMTQzLDEwMTMuNTgsOTguNDc2LDkyMS4wOCw4OS45NzZ6XCIvPicsXG4gICAgICAgICdkPVwiTTkzMS4wOCw4OC45NzZsLTY2NS41LTQyYzAsMC03Ni41OC04LjY0Mi0xMDYsMjRjLTMxLjQwOCwzNC44NDgtMzAsNzMuNS0zMCw3My41bC0xLDEzMTBjMCwwLDIyLjY3MiwxMy44Myw3OC41LDE1LjVzNzM1LTk3LDczNS05N3M2Ni40MjMtNS4zMDksNzguNS0xOC4zMzJWMTg3LjE0M0MxMDIwLjU4LDE4Ny4xNDMsMTAyMy41OCw5Ny40NzYsOTMxLjA4LDg4Ljk3NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTM5LjA4LDg4Ljk3NmwtNTc1LjUtNDVjMCwwLTExMy41OC0xNy42NDItMTQzLDE1Yy0zMS40MDgsMzQuODQ4LTMzLDcwLjUtMzMsNzAuNXYxMzQ1YzAsMCwyMS42NzIsMTAuODMsNzcuNSwxMi41czY4NS0xMTEsNjg1LTExMXM2Ni40MjMtNy4zMDksNzguNS0yMC4zMzJWMTg4LjE0M0MxMDI4LjU4LDE4OC4xNDMsMTAzMS41OCw5Ny40NzYsOTM5LjA4LDg4Ljk3NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTQ2LjA4LDg3Ljk3NmwtNTI5LjUtNTFjMCwwLTk2LjU4LTE5LjY0Mi0xMjYsMTNjLTMxLjQwOCwzNC44NDgtMzMsNzEuNS0zMyw3MS41djEzNzBjMCwwLDMyLjA4OCwxNC41LDExMC41LDE0LjVjMzEuNTM4LDAsMjEzLjk3OC00MS41MzUsMzY2Ljg1LTc1Ljk1OGMxMTcuODYzLTI2LjU0MSwyMTguMTUtNDguMDQyLDIxOC4xNS00OC4wNDJzODIuNTg4LTE1Ljk3NSw4My41LTI0LjMzMmwxLTExNzAuNTAxQzEwMzcuNTgsMTg3LjE0MywxMDM4LjU4LDk2LjQ3Niw5NDYuMDgsODcuOTc2elwiLz4nLFxuICAgICAgICAnZD1cIk05NTUuMDgsODhsLTQzOS41LTUzYzAsMC00OS41ODEtNS4zMzItOTAuOTE0LTkuNjY2Yy0yNS45Mi0yLjcxOC00My40NDUsOC44MjItNTUuMDg2LDE3LjY2NmMtMTYuNjY0LDEyLjY1OS0yMC45OTYsMzEuMTU5LTI1LjQ3Niw0NS41OTdjLTguNDg2LDI3LjM1Ny01LjUyNCw0OC45MDMtNS41MjQsNDguOTAzdjEzNzNjMCwwLDcxLjIyOCwxOC44MTUsMTQ4LjUsNS41YzUwLjI1Ni04LjY2LDEwNS45MjMtMjguOTk3LDI1Ni44NS02OC45NThjMTE2Ljc5LTMwLjkyMywyNTguMTUtNzEuMDQyLDI1OC4xNS03MS4wNDJzNDMuNTg4LTkuOTc1LDQ0LjUtMTguMzMyVjE4Ny4xNjdDMTA0Ni41OCwxODcuMTY3LDEwNDcuNTgsOTYuNSw5NTUuMDgsODh6XCIvPicsXG4gICAgICAgICdkPVwiTTk2NC4wOCw4Ny44NTlsLTQxMi41LTY0YzAsMC03MC41NjctMTUuMTYzLTk0LjU4LDEwLjE0MWMtMzEsMzIuNjY2LTI4LDg4Ljk5OS0yOCw4OC45OTlsLTAuNSwxNDAyLjgzMWMwLDAsNjkuODMzLDE0LjUwMywxNDguMTY2LDQuNTA0YzMxLjI4NC0zLjk5MywzMi4zODEtNy41MDUsMTc5LjY2Ny02MS4wMDFjNzQuMzM0LTI2Ljk5OSwyMTQuNzQ4LTc3LjQ3NCwyMTQuNzQ4LTc3LjQ3NHM1MS4zMDktMTYuODI3LDc2LjQxOS0yNy4wMjVjNS4yMjMtMi4xMjEsNy40MTctNS4yMTEsOC4wODEtNy4zMDdjMS4wMDgtMy4xOCwwLTExNzAuNTAxLDAtMTE3MC41MDFTMTA1Ni41OCw5Ni4zNTksOTY0LjA4LDg3Ljg1OXpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTc1LjUsODZjMCwwLTMyNC41MDItNjcuMDAxLTM0OC41LTcwYy0yMy45OTgtMi45OTktNTQuNjY1LTUuMzY1LTcwLjI0Niw0LjQ1MUM1MjUuMTgxLDQwLjM0MSw1MjUsMTEwLjUsNTI1LDExMC41djE0MjljMCwwLDY5LjU3MywxMy44ODksMTQ3LDEuNWMzNy41LTYsNDMuMTkzLTEzLjk5MiwxODQuOTk5LTgwLjY2OUM5NTcuNjY1LDE0MTIuOTk4LDEwMDEuNSwxMzkxLDEwMDEuNSwxMzkxczYyLjU4OC0yNC45NzUsNjMuNS0zMy4zMzJWMTg2LjE2N0MxMDY1LDE4Ni4xNjcsMTA2Nyw5OSw5NzUuNSw4NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTgyLjMzNSw4NGMwLDAtMjQyLjAwNi02NS45Ni0yNjUuNDg2LTcxLjc1NUM3MDcuNzUsMTAsNjYzLjI1LDUuODU4LDY1NC42NjcsMTEuMzg4QzYyMy4yOTgsMzEuNTk4LDYyNCwxMDguNSw2MjQsMTA4LjV2MTQ0M2MwLDAsNjYuMjg5LDEyLjg2NCwxNDMuNjY2LDAuMTY2YzIyLjMzMi0zLjY2NSw0Ni44NjYtMjMuMjQ3LDE3OC42NjctMTA4YzcxLjY5OS00Ni4xMDUsMTE3LjMzMy03NS42NjYsMTE3LjMzMy03NS42NjZzOS43NTUtNS4zMSwxMC42NjctMTMuNjY3bC0wLjY2Ni0xMTc2QzEwNzMuNjY3LDE3OC4zMzMsMTA3My44MzUsOTcuMDAxLDk4Mi4zMzUsODR6XCIvPicsXG4gICAgICAgICdkPVwiTTEwMjUuMzM1LDk0LjY2N2MwLDAtMTk3Ljg1My04MC41MzgtMjIxLjMzMy04Ni4zMzNDNzk0LjkwMyw2LjA4OCw3NTIuNDM4LDIuNzg5LDc0NC4zMzUsOUM3MTkuOTg0LDI3LjY2Nyw3MjEsMTEwLjUsNzIxLDExMC41djE0NTBjMCwwLDg3LjQ5Miw4Ljc5NiwxNDMuNjY2LTQuODM0YzM0LjMzNS04LjMzMSw1NC42NjgtNDAuMzMxLDE0MS42NjctMTIxLjMzMmMzNy4yODctMzQuNzE3LDU3LjA0Mi01NC45NTksNTcuMDQyLTU0Ljk1OXMxOS4xMjUtMTUuNSwxOC45NTgtMjMuMDQyYzAsMCwwLjE3MS0xMTM2LjA4Mi0wLjMzMS0xMTQ1LjMzM1MxMDkxLjUsMTI3LjUsMTAyNS4zMzUsOTQuNjY3elwiLz4nLFxuICAgICAgICAnZD1cIk0xMDE1Ljc1LDgxYzAsMC05MC02Mi41LTExMy4yMzQtNzAuMDIxYy00LjY0OC0xLjUwNS0xMS4yMjMtNC4wMjctMTguNTM4LTUuMzQ0Yy0xMS4yNTUtMi4wMjctMjQuMjY2LTIuMjcxLTM0LjcyOC0yLjI1M0M4NDAuNjQsMy4zOTYsODMzLjc1NiwzLjI2NCw4MzEsNS4yNWMtMTcsMTIuMjUtMTYuMzMzLDEwMS45ODMtMTYuMzMzLDEwMS45ODN2MTQ1OWMwLDAsOTQuMzMxLDguNDMyLDE0My42NjYtNi44MzRjMjIuNDMxLTYuOTQsMzQuMzM0LTM5LjM5OSw3Mi4zMzQtMTAwLjczMmM0NC44OTYtNzIuNDYzLDU0LjY2Ni05MC45MzQsNTQuNjY2LTkwLjkzNHM0LjY2Ny01LjczNyw0LjY2Ny0xNC42NjdsMC4zMzQtMTE3NkMxMDkwLjMzNCwxNzcuMDY3LDEwOTMuMjUsMTIyLDEwMTUuNzUsODF6XCIvPicsXG4gICAgICAgICdkPVwiTTEwNjUuNTk1LDEwMi40MzhjLTQuNjQzLTYuNzgzLTI0LjU5NC00NC4xMDQtNDQuMDk1LTY1LjQzOGMtMTYuMjUtMTcuNzc3LTMwLjExNi0yNC4xMzktNDAuNS0yNy41Yy00LjY0OC0xLjUwNS0xNy4yMS00LjItMjQuNTI1LTUuNTE4Yy0xMS4yNTUtMi4wMjctMjcuNzYzLTEuOTk5LTM4LjIyNS0xLjk4MWMtOC42MSwwLjAxNS0xMC40MjYtMC45NzQtMTEuNSwyLjI0OWMtNi41ODIsMTkuNzUtNi4wODMsOTkuNjAzLTYuMDgzLDk5LjYwM2wtMSwxNDY4YzAsMCw4Mi40OTgsNi42NjMsMTMxLjgzMy04LjYwM2M4LjE4OC0yLjUzMywxOC40ODUtNC40MjMsMjEuOTUtMTQuMjYyYzYuMTUtMTcuNDYzLDExLjAyNC00Ni4yNjIsMjAuNTUtODguNDg4YzE4Ljc1Ny04My4xNTQsMjIuNS0xMDEuNzUsMjIuNS0xMDEuNzVzMC0zMS4wNywwLTQwbC0wLjA2Mi04MDcuMjUybDMwLjA2Mi0wLjYyM3YtMzQuOTU5bC0yOS43NjUtMC4xNjRMMTA5Ni41LDIzMWMwLDAsMC43NjctNDguMjE5LTEuMzk5LTY5Ljc3NEMxMDkzLjQ2NSwxNDQuOTUyLDEwNjkuOTgyLDEwOC44NDgsMTA2NS41OTUsMTAyLjQzOHpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTc0Ljk5NywxLjMzM1Y3NmMwLDAtNy4xNjYsMC44MzMtNy4xNjYsMTAuNXMwLDEzODAuMDAzLDAsMTM4MC4wMDNzMi4zMzMsMy45OTksNi44MzMsNS44MzNsMC4zMzUsMTAwLjU3OGMwLDAsMTE5LjAwMSw3LjMzNiwxNDMuNTAxLTE3LjkxNGMwLDAsMi41MDEtMS4xNjUsMi41MDEtOC40OTljMC01Ljg4My0wLjAyOC0xMDM3LjU2Mi0wLjAyOC0xMDM3LjU2Mmw3Ljk2NS0wLjA2M2w0LjA2MiwyLjI1bDQ0LjAwMS0wLjM3NXYtMzQuMzc1bC00NC4wOTMtMC4wMTVsLTQuMjgzLDIuNzY1bC03LjI2OSwwLjAxN2wtMC4zNTUtNDYuMzA3YzAsMCwyLjk5OS03Mi4zMzUsMi45OTktMTA1LjgzNXMwLjMzMy0xMDMuNjY3LDAtMTE0LjY2N3MtMi4zMzQtMzYuNjY3LTIuNjY3LTQ2cy0xLTU2LjY2Ny0xLTU2LjY2N3MtMC4zNC00Mi4xNTYtMzQuMzMzLTc2QzEwNTMuMjUsMS4wNjEsMTAwNS4zMjcsMCw5NzQuOTk3LDEuMzMzelwiLz4nLFxuICAgICAgICAnZD1cIk05ODcuNzUsODguMjVsLTMuNSw1NC43NWMwLDAtMi41LDYuNS0yLjYyNSwxOC4zNzVzMCwxMTE5LjQ1NywwLDExMTkuNDU3czAuMDQyLDEwLjQ5OSwxLjM3NSwxNC4zMzNzMS4xNiw5LDEuMTYsOXYzMy41bDUxLjM0LDIzNS44MzVjMCwwLDc0LjgxLDEuOTM0LDk3Ljc1LTNjMjMuMjUtNSwzMy4zNzUtNi44NzUsNDItMThWMTUzMWwtMC4wOTgtMTAyMS4yMzdsNDcuMDk4LDAuODYyVjQ3NC4yNWwtNDcuMjk3LDEuNzRsMC4yOTctMzU5Ljc0YzAsMCwwLjc1LTQ3LjY5OS0zNC4yNS04Mi4yNXMtODMuMTY3LTM0LjU1MS0xMDkuNS0zNEw5ODcuNzUsODguMjV6XCIvPidcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gbG9hZERvb3JJbWFnZXMoKSB7XG4gICAgICAgIGRvb3JzSW1nLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgIC8vICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAvLyAgICAgaW1nLnNyYyA9IGVsO1xuICAgICAgICAgICAgJGZyaWRnZS5hcHBlbmQoJzxzdmcgY2xhc3M9XCJmcmlkZ2UtdG9wLWltZyBkb29yLScgKyBpICsgXG4gICAgICAgICAgICAgICAgJ1wiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCInICtcbiAgICAgICAgICAgICAgICAneG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIicgK1xuICAgICAgICAgICAgICAgICcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTIyNSAxNTc2XCIgJyArXG4gICAgICAgICAgICAgICAgJ2VuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCAxMjI1IDE1NzZcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGVmcz48cGF0aCBpZD1cIlNWR0lEJyArIGkgKyAnXCIgJyArIHBhdGhzW2ldICsnIDwvZGVmcz4nICtcbiAgICAgICAgICAgICAgICAnPGNsaXBQYXRoIGlkPVwiU1ZHSURfJyArIGkgKydcIj4nICtcbiAgICAgICAgICAgICAgICAnPHVzZSB4bGluazpocmVmPVwiI1NWR0lEJyArIGkgKyAnXCInICsgJyBvdmVyZmxvdz1cInZpc2libGVcIj48L3VzZT4nICtcbiAgICAgICAgICAgICAgICAnPC9jbGlwUGF0aD4nICtcbiAgICAgICAgICAgICAgICAnPGltYWdlIGNsaXAtcGF0aD1cInVybCgjU1ZHSURfJyArIGkgKyAnKVwiIG92ZXJmbG93PVwidmlzaWJsZVwiIHdpZHRoPVwiMTIyNVwiJyArXG4gICAgICAgICAgICAgICAgJ2hlaWdodD1cIjE1NzZcIiB4bGluazpocmVmPVwiJyArIGVsICsgJ1wiPjwvaW1hZ2U+JyArXG4gICAgICAgICAgICAgICAgJzwvc3ZnPicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZERvb3JJbWFnZXMoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICAgICAgdmFyIGNsYXNzZXNUb1JlbW92ZSA9ICcnO1xuICAgICAgICBuID0gbiArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjbGFzc2VzVG9SZW1vdmUgKz0gbmFtZSArIGkgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXNzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHZhciBkZXNjQ2xhc3Nlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnd2l0aC1kZXNjLScsIDYpO1xuICAgIHZhciBmcmlkZ2VDbGFzc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKCdvcGVuLScsIDIzKTtcbiAgICBcbiAgICAkd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzIxKjE4KSByZXR1cm47XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KS5hZGRDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgICAgIHNmeC5wbGF5KCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICAgICAgc2Z4LnNraXBUbygwKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yMSoxOCkgcmV0dXJuO1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsIGhlaWdodCkucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJHJhZGlvTXVzaWNTb25nLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC5hZGRDbGFzcygnYW5pbWF0ZS1zY3JvbGwnKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSAmJiBzY3JvbGxUb3AgPCBoLzIxKjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMiAmJiBzY3JvbGxUb3AgPCBoLzIxKjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMyAmJiBzY3JvbGxUb3AgPCBoLzIxKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNCAmJiBzY3JvbGxUb3AgPCBoLzIxKjUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNSAmJiBzY3JvbGxUb3AgPCBoLzIxKjYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNiAmJiBzY3JvbGxUb3AgPCBoLzIxKjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNyAmJiBzY3JvbGxUb3AgPCBoLzIxKjgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOCAmJiBzY3JvbGxUb3AgPCBoLzIxKjkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOSAmJiBzY3JvbGxUb3AgPCBoLzIxKjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEwICYmIHNjcm9sbFRvcCA8IGgvMjEqMTEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjExICYmIHNjcm9sbFRvcCA8IGgvMjEqMTIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEyICYmIHNjcm9sbFRvcCA8IGgvMjEqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEzICYmIHNjcm9sbFRvcCA8IGgvMjEqMTQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE0ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE1ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE2ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE3ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE4ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE5ICYmIHNjcm9sbFRvcCA8IGgvMjEqMjApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjIwICYmIHNjcm9sbFRvcCA8IGgvMjEqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPj0gaC8yMSoyMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIxJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKHNjcm9sbCkge1xuICAgICAgICBzY3JvbGxUb3AgPSAtc2Nyb2xsO1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsICdhdXRvJykucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSk7XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMTIpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yNCoxNSkge1xuICAgICAgICAgICAgJGRvb3JPcGVuZXIucmVtb3ZlQ2xhc3MoJ2JlaGluZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGRvb3JPcGVuZXIuYWRkQ2xhc3MoJ2JlaGluZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxTdGF0ZXNbMl0gLSBzY3JvbGxUb3AgPCBmcmlkZ2VJbm5lckhlaWdodCAqIDAuMDUpIHtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKGRlc2NDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdhbWUucGF1c2UoKTtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIHNjcm9sbFN0YXRlc1sxXSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBteVNjcm9sbDtcbiAgICBmdW5jdGlvbiBpbml0TXlTY3JvbGwoKSB7XG4gICAgICAgIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHtcbiAgICAgICAgICAgIHByb2JlVHlwZTogMyxcbiAgICAgICAgICAgIG1vdXNlV2hlZWw6IHRydWUsXG4gICAgICAgICAgICBjbGljazogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBpbnRlcmFjdGl2ZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBmYWRlU2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHNocmlua1Njcm9sbGJhcnM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgICAgICAgIHNjcm9sbFBhZ2UobXlTY3JvbGwueSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbEVuZCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gd2luZG93LmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpbml0TXlTY3JvbGwoKTtcbiAgICAvLyB9O1xuICAgIFxuICAgICRkb2N1bWVudC5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5uYXYtbWFpbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1swXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1vdXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMV0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtZ2FtZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1syXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gZ2FtZVxuICAgIHZhciBnYW1lO1xuICAgIGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4IDtcbiAgICAgICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICAgICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAgICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIHZhciBpbWFnZXMgPSBbXTtcbiAgICBmdW5jdGlvbiBpbml0R2FtZSgpIHtcbiAgICAgICAgdmFyICRnYW1lRmllbGRDZWxsID0gJCgnLmdhbWUtZmllbGQtY2VsbCcpLnJlbW92ZSgpLFxuICAgICAgICAgICAgJGdhbWVGaWVsZCA9ICQoJy5nYW1lLWZpZWxkJyksXG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgXG4gICAgICAgICQoJy5nYW1lLXBvcHVwLW5leHQgLnNvY2lhbC12ayBzdmcnKS5jbG9uZSgpLmFwcGVuZFRvKCcuZ2FtZS1wb3B1cC13aW4gLnNvY2lhbC12aycpO1xuICAgICAgICAkKCcuZ2FtZS1wb3B1cC1uZXh0IC5zb2NpYWwtZmIgc3ZnJykuY2xvbmUoKS5hcHBlbmRUbygnLmdhbWUtcG9wdXAtd2luIC5zb2NpYWwtZmInKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgdmFyICRjdXJyR2FtZUZpZWxkQ2VsbCA9ICRnYW1lRmllbGRDZWxsLmNsb25lKCk7XG4gICAgICAgICAgICBpZiAoaSAlIDUgPT09IDApICRjdXJyR2FtZUZpZWxkQ2VsbC5hZGRDbGFzcygnY29sLXhzLW9mZnNldC0xJyk7XG4gICAgICAgICAgICAkY3VyckdhbWVGaWVsZENlbGwuY2hpbGRyZW4oJy5nYW1lLXRpbGUnKS5hZGRDbGFzcygnZ2FtZS10aWxlLScgKyBpKTtcbiAgICAgICAgICAgICRnYW1lRmllbGQuYXBwZW5kKCRjdXJyR2FtZUZpZWxkQ2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vaW1nL3RpbGUtJyArIGkgKyAnLnBuZyc7XG4gICAgICAgICAgICBpbWFnZXMucHVzaChpbWcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBUaWxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm51bWJlciA9IG9wdGlvbnMubnVtYmVyO1xuICAgICAgICAgICAgdGhpcy5pbWdOdW1lciA9IG9wdGlvbnMuaW1nTnVtZXI7XG4gICAgICAgICAgICB0aGlzLiRkaXYgPSAkKCcuZ2FtZS10aWxlLScgKyBvcHRpb25zLm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLmltZyA9IGltYWdlc1tvcHRpb25zLmltZ051bWVyXTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzU29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYuYXBwZW5kKCQodGhpcy5pbWcpLmNsb25lKCkpO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNTb2x2ZWQgfHwgX3RoaXMuaXNMb2NrZWQgfHwgX3RoaXMuaXNPcGVuIHx8ICFfdGhpcy5nYW1lLnN0YXJ0ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9ja2VkJyk7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5nYW1lLm9wZW5UYWxlKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUuc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzU29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkuYWRkQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLnVubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9ja2VkJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgR2FtZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNvbHZlZCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZVRvdGFsID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZVNjb3JlTWF4ID0gOTAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja1Njb3JlTWF4ID0gOTAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3NUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICAgICAgdGhpcy5sb2NrZWRJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuYmFja0ltZyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblN0YXJ0ID0gJCgnLnN0YXJ0LWdhbWUnKVxuICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uU3RhcnQudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwU3RhcnQuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdGFydCA9ICQoJy5yZXN0YXJ0LWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25SZXN1bWUgPSAkKCcucmVzdW1lLWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25OZXh0ID0gJCgnLm5leHQtZ2FtZScpO1xuICAgICAgICAgICAgdGhpcy4kaW5mb0RpdiA9IG9wdGlvbnMuJGluZm9EaXY7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLnNob3dEZWxheSA9IDMwMDA7XG4gICAgICAgICAgICB0aGlzLiRnYW1lID0gJCgnLmdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lciA9ICQoJy5nYW1lLXRpbWVyJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzID0gJCgnLmdhbWUtY2xpY2tzJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUgPSAkKCcuZ2FtZS1zY29yZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVGV4dCA9ICQoJy5nYW1lLXNjb3JlLXRleHQnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRvdGFsID0gJCgnLmdhbWUtc2NvcmUtdG90YWwnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbCA9ICQoJy5nYW1lLWxldmVsJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGFzayA9ICQoJy5nYW1lLXRhc2snKTtcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydGVkKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm5leHRMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb3VudCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnN0YXJ0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50aW1lID0gTWF0aC5yb3VuZChfdGhpcy50aW1lTWF4IC0gKERhdGUubm93KCkgLSBfdGhpcy5zdGFydFRpbWUpLzEwMDApO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lVGltZXIudGV4dChfdGhpcy50aW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGltZSA9PT0gMjApIF90aGlzLiRnYW1lVGltZXIuYWRkQ2xhc3MoJ3JlZC10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRpbWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKF90aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmFpbExldmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgJGdhbWVQb3B1cFJlc3VtZS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25SZXN1bWUuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlc3VtZSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uUmVzdW1lLnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdW1lLmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCkgLSAodGhpcy50aW1lTWF4IC0gdGhpcy50aW1lKSAqIDEwMDA7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q291bnQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICAgICAgICB0aWxlLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm5leHRMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdExldmVsKHRoaXMubGV2ZWwgKyAxKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5pbml0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDUpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGV2ZWwoKTtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLiRnYW1lTGV2ZWwudGV4dCgn0KPRgNC+0LLQtdC90YwgJyArIGxldmVsKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MudGV4dCgwKTtcbiAgICAgICAgICAgIHN3aXRjaChsZXZlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAzMDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA5LCAxMCwgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE2O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDE4MTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDcsIDksIDEwLCAxMiwgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDIwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDEyMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTIxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgOCwgOSwgMTAsIDExLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDIwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDkxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lTWF4IC0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lci50ZXh0KHRoaXMudGltZU1heCAtIDEpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRhbGVzVG9Tb2x2ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJzLnB1c2goaSAlICh0aGlzLnRhbGVzVG9Tb2x2ZS90aGlzLnRpbGVzSW5DaGFpbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5udW1iZXJzID0gc2h1ZmZsZSh0aGlzLm51bWJlcnMpO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGlsZXMucHVzaChuZXcgVGlsZSh7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogX3RoaXMudGlsZU1hcFtpXSxcbiAgICAgICAgICAgICAgICAgICAgaW1nTnVtZXI6IGVsLFxuICAgICAgICAgICAgICAgICAgICBnYW1lOiBfdGhpc1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRhc2sudGV4dCh0aGlzLnRpbGVzSW5DaGFpbiArICcgJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyArPSAxO1xuICAgICAgICAgICAgdGhpcy5jbGlja3NUb3RhbCArPSAxO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcy50ZXh0KHRoaXMuY2xpY2tzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jbGVhckxldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zb2x2ZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIGVsLiRkaXYuY2hpbGRyZW4oKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnbG9ja2VkJyk7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5wYXJlbnQoKS51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIucmVtb3ZlQ2xhc3MoJ3JlZC10ZXh0Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY29tcGxldGVMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgc2NvcmUgPSAodGhpcy50aW1lU2NvcmVNYXggKiB0aGlzLnRpbWUvdGhpcy50aW1lTWF4ICsgdGhpcy5jbGlja1Njb3JlTWF4IC8gdGhpcy5jbGlja3MpICogdGhpcy5sZXZlbDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gTWF0aC5mbG9vcihzY29yZSk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlVG90YWwgKz0gdGhpcy5zY29yZUxldmVsO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlLnRleHQodGhpcy5zY29yZUxldmVsKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRleHQudGV4dChkZWNsaW5hdG9yLmRlY2xpbmF0ZSh0aGlzLnNjb3JlTGV2ZWwpKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRvdGFsLnRleHQodGhpcy5zY29yZVRvdGFsKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsIDwgNSkge1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBOZXh0LmZhZGVJbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25OZXh0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b25OZXh0LnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgJGdhbWVQb3B1cE5leHQuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwV2luLmZhZGVJbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmZhaWxMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgLT0gMTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJMZXZlbCgpO1xuICAgICAgICAgICAgJGdhbWVQb3B1cFJlc3RhcnQuZmFkZUluKCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdGFydC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvblJlc3RhcnQudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBSZXN0YXJ0LmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLndpbkxldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVMZXZlbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm9wZW5UYWxlID0gZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3BlbmVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW1nTnVtZXIgPSB0aGlzLm9wZW5lZFswXS5pbWdOdW1lcixcbiAgICAgICAgICAgICAgICAgICAgaXNCaW5kZWRUYWxlcyA9IHRoaXMub3BlbmVkLmV2ZXJ5KGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuaW1nTnVtZXIgPT09IGltZ051bWVyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghaXNCaW5kZWRUYWxlcykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW5lZC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW5lZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVuZWQubGVuZ3RoID4gdGhpcy50aWxlc0luQ2hhaW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc29sdmVkICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWxlc1RvU29sdmUgPT09IHRoaXMuc29sdmVkKSB0aGlzLndpbkxldmVsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgZ2FtZSA9IG5ldyBHYW1lKHtcbiAgICAgICAgICAgICRpbmZvRGl2OiAkKCcuZGVzYy1nYW1lIGRpdicpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbml0R2FtZSgpO1xuICAgICQoJy5wcmVsb2FkLWltZywgLnByZWxvYWRlci1wcm9ncmVzcycpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5wcmVsb2FkZXInKS5hbmltYXRlKHtcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9LCAxMDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZhZGVPdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gYXVkaW9cbiAgICB2YXIgVHJhY2tMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRyYWNrcyA9IFtcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBCZWNhdXNlIEkgV2FudCBZb3UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBCcm9rZW4gUHJvbWlzZS5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIERyYWcubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBNZWRzLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gT25lIE9mIEEgS2luZC5tcDMnXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNrID4gdGhpcy50cmFja3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1t0aGlzLmN1cnJlbnRUcmFja107XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbMF07XG4gICAgfTtcbiAgICBcbiAgICB2YXIgdHJhY2tMaXN0ID0gbmV3IFRyYWNrTGlzdCgpO1xuICAgIFxuICAgIC8vIFNldHVwIHRoZSBwbGF5ZXIgdG8gYXV0b3BsYXkgdGhlIG5leHQgdHJhY2tcbiAgICB2YXIgYXVkaW87XG4gICAgdmFyIGFNdXNpYyA9ICQoJyNtdXNpYycpWzBdO1xuICAgIGF1ZGlvID0gd2luZG93LmF1ZGlvanMuY3JlYXRlKGFNdXNpYywge1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgIFxuICAgIGZ1bmN0aW9uIHNob3dCdXR0b24oKSB7XG4gICAgICAgIGlmIChhdWRpby5wbGF5aW5nKSB7XG4gICAgICAgICAgICAkcGxheVBhdXNlLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciAkcGxheVBhdXNlID0gJCgnLnJhZGlvLW11c2ljLWJ0bi1wYXVzZScpLFxuICAgICAgICAkcGxheU5leHQgPSAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQtaG92ZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRwbGF5TmV4dC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHBsYXlOZXh0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSwgNDAwKTtcbiAgICB9KTtcbiAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgJHBsYXlQYXVzZS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIGEgdHJhY2sgb24gY2xpY2tcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbn0pO1xufVxuXG52YXIgaW1hZ2VzVG9Mb2FkO1xuZnVuY3Rpb24gbG9hZEltYWdlKHNyYywgbnVtYmVyLCBsaXN0KSB7XG4gICAgbG9hZEltYWdlLmNvdW50ZXIgPSBsb2FkSW1hZ2UuY291bnRlciB8fCAwO1xuICAgIGxvYWRJbWFnZS5tYXggPSBsb2FkSW1hZ2UubWF4IHx8IGxpc3QubGVuZ3RoIDtcbiAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9hZEltYWdlLmNvdW50ZXIrKztcbiAgICAgICAgJHByZWxvYWRlclByb2dyZXNzLmNzcyh7J3dpZHRoJzogKDEwMCAqIGxvYWRJbWFnZS5jb3VudGVyL2xvYWRJbWFnZS5tYXgpICsgJyUnfSk7XG4gICAgICAgIGlmIChsb2FkSW1hZ2UuY291bnRlciA9PT0gbG9hZEltYWdlLm1heCkge1xuICAgICAgICAgICAgJGZyaWRnZUlubmVyLmF0dHIoJ3NyYycsIGltYWdlc1RvTG9hZFswXSk7XG4gICAgICAgICAgICBpbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gaW1nO1xufVxuXG5mdW5jdGlvbiBwcmVsb2FkKCkge1xuICAgIHZhciBwb3N0Zml4ID0gJycsXG4gICAgICAgIGV4dCA9ICcucG5nJyxcbiAgICAgICAgaTtcblxuICAgIGlmKCAvaVAoYWR8b2R8aG9uZSl8QW5kcm9pZHxCbGFja2JlcnJ5fFdpbmRvd3MgUGhvbmUvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAvLyBwb3N0Zml4ID0gJ19pcGFkMic7XG4gICAgICAgIHBvc3RmaXggPSAnX3RhYmxldCc7XG4gICAgICAgIGV4dCA9ICcucG5nJztcbiAgICB9XG4gICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8IDQwMCkge1xuICAgICAgICBwb3N0Zml4ID0gJ19tb2JpbGUnO1xuICAgICAgICBleHQgPSAnLnBuZyc7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZCA9IFtcbiAgICAgICAgJy4vaW1nL2ZyaWRnZV93aXRoX3JhZGlvJyArIHBvc3RmaXggKyAnLnBuZycsXG4gICAgICAgICcuL2ltZy9xdWVzdGlvbi5wbmcnLFxuICAgICAgICAnLi9pbWcvYmxhbmsucG5nJyxcbiAgICAgICAgJy4vaW1nL3NjcmVlbi5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dC5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dF9hY3RpdmUucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXkucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXlfYWN0aXZlLnBuZydcbiAgICBdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGltYWdlc1RvTG9hZC5wdXNoKCcuL2ltZy90aWxlLScgKyBpICsgJy5wbmcnKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IDIyOyBpKyspIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IGkgPCAxMCA/ICcwJyA6ICcnLFxuICAgICAgICAgICAgcGF0aCA9ICcuL2ltZy9kb29yLScgKyBwcmVmaXggKyBpICsgcG9zdGZpeCArIGV4dDtcbiAgICAgICAgaW1hZ2VzVG9Mb2FkLnB1c2gocGF0aCk7XG4gICAgICAgIGRvb3JzSW1nLnB1c2gocGF0aCk7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZC5mb3JFYWNoKGxvYWRJbWFnZSk7XG59XG5wcmVsb2FkKCk7IiwidmFyIHNmeCA9IGZ1bmN0aW9uKHVybCwgaWQpIHtcbiAgICB0cnkge1xuICAgICAgICB3aW5kb3cuQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICB2YXIgY29udGV4dCA9IG5ldyB3aW5kb3cuQXVkaW9Db250ZXh0KCk7XG4gICAgICAgIHZhciBidWZmZXIsIHNvdXJjZSwgZGVzdGluYXRpb247XG4gICAgICAgIFxuICAgICAgICB2YXIgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKCksXG4gICAgICAgICAgICBjYW5QbGF5TXAzID0gISFhdWRpby5jYW5QbGF5VHlwZSAmJiBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8vbXAzOyBjb2RlY3M9XFwndm9yYmlzXFwnJykgIT09ICcnLFxuICAgICAgICAgICAgZXh0ID0gY2FuUGxheU1wMyA/ICdtcDMnIDogJ29nZyc7XG4gICAgICAgIFxuICAgICAgICB2YXIgbG9hZFNvdW5kRmlsZSA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgdmFyIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kZWNvZGVBdWRpb0RhdGEodGhpcy5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZGVjb2RlZEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBkZWNvZGVkQXJyYXlCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBkZWNvZGluZyBmaWxlJywgZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2Z4LnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGxheScpO1xuICAgICAgICAgICAgc291cmNlID0gY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGNvbnRleHQuZGVzdGluYXRpb247XG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICBzb3VyY2Uuc3RhcnQoMCk7XG4gICAgICAgIH07XG4gICAgICAgIHNmeC5za2lwVG8gPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgY29uc29sZS5sb2codXJsLnNsaWNlKDAsIC0zKSArIGV4dCk7XG4gICAgICAgIGxvYWRTb3VuZEZpbGUodXJsLnNsaWNlKDAsIC0zKSArIGV4dCk7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgdmFyIGFTZnggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIHNmeCA9IHdpbmRvdy5hdWRpb2pzLmNyZWF0ZShhU2Z4LCB7fSk7XG4gICAgICAgIHNmeC5sb2FkKHVybCk7XG4gICAgfVxuICAgIHJldHVybiBzZng7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNmeDsiXX0=
