(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);

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
        }, function () {
            $footer.css('height', 'auto').removeClass('with-desc-' + (i + 1));
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
    var a = window.audiojs.createAll({
        trackEnded: function() {
            audio.load(trackList.next());
            $radioMusicSongText.text(audio.mp3.slice(8, -4));
            audio.play();
        }
    });
    // Load in the first track
    var audio = a[0];
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh3aW5kb3cuJCk7XG5cbiQod2luZG93KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbnZhciAkcHJlbG9hZGVyUHJvZ3Jlc3MgPSAkKCcucHJlbG9hZGVyLXByb2dyZXNzJyksXG4gICAgJGZyaWRnZUlubmVyID0gJCgnLmZyaWRnZS1pbm5lcicpLFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgZG9vcnNJbWcgPSBbXTtcbiAgICBcbmZ1bmN0aW9uIERlY2xpbmF0b3IoZm9ybXMpIHtcbiAgICB0aGlzLmRlY2xpbmF0ZSA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdmFyIGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xuICAgICAgICByZXR1cm4gZm9ybXNbIChudW1iZXIlMTAwPjQgJiYgbnVtYmVyJTEwMDwyMCk/IDIgOiBjYXNlc1sobnVtYmVyJTEwPDUpP251bWJlciUxMDo1XSBdO1xuICAgIH07XG59XG52YXIgZGVjbGluYXRvciA9IG5ldyBEZWNsaW5hdG9yKFsn0L7Rh9C60L4nLCAn0L7Rh9C60LAnLCAn0L7Rh9C60L7QsiddKTtcblxuZnVuY3Rpb24gaW5pdFBhZ2UoKSB7XG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpdGhEZXNjID0gJCgnLndpdGgtZGVzYycpLFxuICAgICAgICAkZm9vdGVyID0gJCgnLmZvb3RlcicpLFxuICAgICAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS1kb29yLXdyYXAnKSxcbiAgICAgICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICAgICAkbGVmdFRleHQgPSAkKCcubGVmdC10ZXh0JyksXG4gICAgICAgICRyYWRpbyA9ICQoJy5yYWRpby1jb250JyksXG4gICAgICAgICRyYWRpb011c2ljU29uZyA9ICQoJy5yYWRpby1tdXNpYy1zb25nLWhvdmVyJyksXG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQgPSAkKCcucmFkaW8tbXVzaWMtc29uZy10ZXh0JyksXG4gICAgICAgICRkb29yT3BlbmVyID0gJCgnLmRvb3Itb3BlbmVyJyksXG4gICAgICAgICRnYW1lUG9wdXBTdGFydCA9ICQoJy5nYW1lLXBvcHVwLXN0YXJ0Jykuc2hvdygpLFxuICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydCA9ICQoJy5nYW1lLXBvcHVwLXJlc3RhcnQnKSxcbiAgICAgICAgJGdhbWVQb3B1cFJlc3VtZSA9ICQoJy5nYW1lLXBvcHVwLXJlc3VtZScpLFxuICAgICAgICAkZ2FtZVBvcHVwTmV4dD0gJCgnLmdhbWUtcG9wdXAtbmV4dCcpLFxuICAgICAgICAkZ2FtZVBvcHVwV2luID0gJCgnLmdhbWUtcG9wdXAtd2luJyksXG4gICAgICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gICAgdmFyIGhlaWdodCxcbiAgICAgICAgZnJpZGdlSW5uZXJIZWlnaHQsXG4gICAgICAgIHNjcm9sbFN0YXRlcyxcbiAgICAgICAgc2Nyb2xsVG9wO1xuICAgIFxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgdmFyIHJhZGlvSGVpZ2h0ID0gJHJhZGlvWzBdLmNsaWVudFdpZHRoICogMTI0LzEwODAgKyAyMCxcbiAgICAgICAgICAgIHBlcmNlbnQgPSAwLjU0LFxuICAgICAgICAgICAgZ2FtZVRvcCA9IHJhZGlvSGVpZ2h0ICsgJGZyaWRnZUlubmVyWzBdLmNsaWVudFdpZHRoICogJGZyaWRnZUlubmVyLmF0dHIoJ2hlaWdodCcpLyRmcmlkZ2VJbm5lci5hdHRyKCd3aWR0aCcpICogcGVyY2VudDtcbiAgICAgICAgICAgIFxuICAgICAgICBmcmlkZ2VJbm5lckhlaWdodCA9IHBhcnNlSW50KCRmcmlkZ2VJbm5lci5jc3MoJ2hlaWdodCcpLCAxMCkgLSAyMDtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoJGZvb3Rlci5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgIHNjcm9sbFN0YXRlcyA9IFswLCByYWRpb0hlaWdodCwgTWF0aC5taW4oZ2FtZVRvcCwgZnJpZGdlSW5uZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpXTtcbiAgICAgICAgJHBhZ2UuY3NzKCdoZWlnaHQnLCBNYXRoLm1pbihnYW1lVG9wICsgd2luZG93LmlubmVySGVpZ2h0LCBmcmlkZ2VJbm5lckhlaWdodCkpO1xuICAgIH1cbiAgICByZXNpemUoKTtcbiAgICAkd2luZG93Lm9uKCdyZXNpemUnLCByZXNpemUpO1xuICAgIFxuICAgIHZhciBwYXRocyA9IFtcbiAgICAgICAgJ2Q9XCJNODkzLjUsOTBIOTZjMCwwLTM2LjY1Mi0wLjI2LTY1LDI4QzMuOTE3LDE0NSwzLDE3OS41LDMsMTc5LjV2MTE2M2MwLDAsOSwxMyw1MC41LDE0LjVzODYxLDAsODYxLDBzNTYuODMyLDIuNjY1LDcwLjUtMTQuMzMzdi0xMTU3LjVDOTg1LDE4NS4xNjcsOTg2LDk4LjUsODkzLjUsOTB6XCIvPicsXG4gICAgICAgICdkPVwiTTg5NS41LDkzSDk4YzAsMC0zOC42NTItMi4yNi02NywyNkMzLjkxNywxNDYsMywxODIuNSwzLDE4Mi41djExNjRjMCwwLDQsMTEuNSw1Mi41LDEzLjVoODYxYzAsMCw1NS44MzMsMC4xNTIsNjkuNS0xNC4zMzN2LTExNTcuNUM5ODYsMTg4LjE2Nyw5ODgsMTAxLjUsODk1LjUsOTN6XCIvPicsXG4gICAgICAgICdkPVwiTTg5NS41LDkzLjA0M2wtNzk3LjUtMmMwLDAtNDAuNjUyLTEuMjYtNjksMjdjLTI3LjA4MywyNy0yNyw2NC41LTI3LDY0LjV2MTE2OGMwLDAsNSwxMi41LDUzLjUsMTQuNWw4NjEtNWMwLDAsNTUuODMzLDAuMTUyLDY5LjUtMTQuMzMzVjE4OC4yMUM5ODYsMTg4LjIxLDk4OCwxMDEuNTQzLDg5NS41LDkzLjA0M3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNODk2LjU4LDkzLjE0N2wtODAyLjUtNGMwLDAtMzcuNjUyLTAuMjYtNjYsMjhjLTI3LjA4MywyNy0yNiw2NS41LTI2LDY1LjV2MTE3NmMwLDAsMTMsMTAuNSw2MS41LDEyLjVsODU0LTExYzAsMCw1NS44MzMsMC4xNTIsNjkuNS0xNC4zMzJ2LTExNTcuNUM5ODcuMDgsMTg4LjMxNCw5ODkuMDgsMTAxLjY0Nyw4OTYuNTgsOTMuMTQ3elwiLz4nLFxuICAgICAgICAnZD1cIk04OTguNTA2LDkybC04MDcuNS03YzAsMC0zOC4wMDYsMC02MywyOGMtMjUuNDY3LDI4LjUzLTI2LDU3LjUtMjYsNTcuNXYxMTk1YzAsMCw2LjY3MiwxMi44Myw2Mi41LDE0LjVzODU1LTE4LDg1NS0xOHM1NS44MzMsMC4xNTIsNjkuNS0xNC4zMzJWMTg3LjE2N0M5ODkuMDA2LDE4Ny4xNjcsOTkxLjAwNiwxMDAuNSw4OTguNTA2LDkyelwiLz4nLFxuICAgICAgICAnZD1cIk05MDEuNSw5Mi4wNjJsLTgwNy41LTEyYzAsMC0zOC4wMDYsMi02MywzMGMtMjUuNDY3LDI4LjUzLTI3LDU5LjUtMjcsNTkuNWwtMSwxMjAyYzAsMCwyLjk5NiwxOC4yMjcsNTguNSwxOS41YzcuMzgxLDAuMzg5LDI3Ljg1NiwxLjE2OCw1Ny44MzQsMC40OTJjMTk2LjgwMi00LjQzOCw4MDMuMTY2LTI5LjQ5Miw4MDMuMTY2LTI5LjQ5MnM1NS44MzMsMS4xNTIsNjkuNS0xMy4zMzJWMTg3LjIyOUM5OTIsMTg3LjIyOSw5OTQsMTAwLjU2Miw5MDEuNSw5Mi4wNjJ6XCIvPicsXG4gICAgICAgICdkPVwiTTkwNC41LDkxTDEwMyw3NGMwLDAtNDEuMDA2LDQtNjYsMzJjLTI1LjQ2NywyOC41MjktMjYsNjQuNS0yNiw2NC41djEyMTVjMCwwLDMuNjcyLDE2LjgzLDU5LjUsMTguNXM4NTUtNDAsODU1LTQwczU2LjgzMywwLjE1Miw3MC41LTE0LjMzMlYxODcuMTY3Qzk5NiwxODcuMTY3LDk5Nyw5OS41LDkwNC41LDkxelwiLz4nLFxuICAgICAgICAnZD1cIk05MDkuNDY1LDkwLjEyMmwtNzgyLjUtMjJjMCwwLTQzLjAzNS0xLjM3OC03NCwzMXMtMjYsNzEuNS0yNiw3MS41bC0xLDEyMjljMCwwLDMuNjcyLDE2LjgzLDU5LjUsMTguNXM4NDQtNTIsODQ0LTUyczU3LjgzMy0wLjg0OCw3MS41LTE1LjMzMlYxODcuMjg5QzEwMDAuOTY1LDE4Ny4yODksMTAwMS45NjUsOTguNjIyLDkwOS40NjUsOTAuMTIyelwiLz4nLFxuICAgICAgICAnZD1cIk05MTQuNTgsODkuODg3bC03NzIuNS0yOWMwLDAtNDIuMDA2LDUtNjcsMzNjLTI1LjQ2NywyOC41MjktMjUsNjQuNS0yNSw2NC41djEyNTVjMCwwLDAsMTguMjgxLDc5LjU4NSwyMi4yODFjNTUuNzgzLDIuODA0LDgwMy45MTUtNjcuNzgxLDgwMy45MTUtNjcuNzgxczU4LjgzMy0xLjg0OCw3Mi41LTE2LjMzMnYtMTE2NS41QzEwMDYuMDgsMTg2LjA1NCwxMDA3LjA4LDk4LjM4Nyw5MTQuNTgsODkuODg3elwiLz4nLFxuICAgICAgICAnZD1cIk05MjEuMDgsODkuOTc2bC03MzEuNS0zN2MwLDAtNTIuMDA2LDEtNzcsMjljLTI1LjQ2NywyOC41MjktMjksNTguNS0yOSw1OC41djEyOTZjMCwwLDIwLjY3MiwxNC44Myw3Ni41LDE2LjVzNzY5LTgxLDc2OS04MXM3My45MjEtNi4zMSw4My41LTE4LjMzMlYxODYuMTQzQzEwMTIuNTgsMTg2LjE0MywxMDEzLjU4LDk4LjQ3Niw5MjEuMDgsODkuOTc2elwiLz4nLFxuICAgICAgICAnZD1cIk05MzEuMDgsODguOTc2bC02NjUuNS00MmMwLDAtNzYuNTgtOC42NDItMTA2LDI0Yy0zMS40MDgsMzQuODQ4LTMwLDczLjUtMzAsNzMuNWwtMSwxMzEwYzAsMCwyMi42NzIsMTMuODMsNzguNSwxNS41czczNS05Nyw3MzUtOTdzNjYuNDIzLTUuMzA5LDc4LjUtMTguMzMyVjE4Ny4xNDNDMTAyMC41OCwxODcuMTQzLDEwMjMuNTgsOTcuNDc2LDkzMS4wOCw4OC45NzZ6XCIvPicsXG4gICAgICAgICdkPVwiTTkzOS4wOCw4OC45NzZsLTU3NS41LTQ1YzAsMC0xMTMuNTgtMTcuNjQyLTE0MywxNWMtMzEuNDA4LDM0Ljg0OC0zMyw3MC41LTMzLDcwLjV2MTM0NWMwLDAsMjEuNjcyLDEwLjgzLDc3LjUsMTIuNXM2ODUtMTExLDY4NS0xMTFzNjYuNDIzLTcuMzA5LDc4LjUtMjAuMzMyVjE4OC4xNDNDMTAyOC41OCwxODguMTQzLDEwMzEuNTgsOTcuNDc2LDkzOS4wOCw4OC45NzZ6XCIvPicsXG4gICAgICAgICdkPVwiTTk0Ni4wOCw4Ny45NzZsLTUyOS41LTUxYzAsMC05Ni41OC0xOS42NDItMTI2LDEzYy0zMS40MDgsMzQuODQ4LTMzLDcxLjUtMzMsNzEuNXYxMzcwYzAsMCwzMi4wODgsMTQuNSwxMTAuNSwxNC41YzMxLjUzOCwwLDIxMy45NzgtNDEuNTM1LDM2Ni44NS03NS45NThjMTE3Ljg2My0yNi41NDEsMjE4LjE1LTQ4LjA0MiwyMTguMTUtNDguMDQyczgyLjU4OC0xNS45NzUsODMuNS0yNC4zMzJsMS0xMTcwLjUwMUMxMDM3LjU4LDE4Ny4xNDMsMTAzOC41OCw5Ni40NzYsOTQ2LjA4LDg3Ljk3NnpcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTU1LjA4LDg4bC00MzkuNS01M2MwLDAtNDkuNTgxLTUuMzMyLTkwLjkxNC05LjY2NmMtMjUuOTItMi43MTgtNDMuNDQ1LDguODIyLTU1LjA4NiwxNy42NjZjLTE2LjY2NCwxMi42NTktMjAuOTk2LDMxLjE1OS0yNS40NzYsNDUuNTk3Yy04LjQ4NiwyNy4zNTctNS41MjQsNDguOTAzLTUuNTI0LDQ4LjkwM3YxMzczYzAsMCw3MS4yMjgsMTguODE1LDE0OC41LDUuNWM1MC4yNTYtOC42NiwxMDUuOTIzLTI4Ljk5NywyNTYuODUtNjguOTU4YzExNi43OS0zMC45MjMsMjU4LjE1LTcxLjA0MiwyNTguMTUtNzEuMDQyczQzLjU4OC05Ljk3NSw0NC41LTE4LjMzMlYxODcuMTY3QzEwNDYuNTgsMTg3LjE2NywxMDQ3LjU4LDk2LjUsOTU1LjA4LDg4elwiLz4nLFxuICAgICAgICAnZD1cIk05NjQuMDgsODcuODU5bC00MTIuNS02NGMwLDAtNzAuNTY3LTE1LjE2My05NC41OCwxMC4xNDFjLTMxLDMyLjY2Ni0yOCw4OC45OTktMjgsODguOTk5bC0wLjUsMTQwMi44MzFjMCwwLDY5LjgzMywxNC41MDMsMTQ4LjE2Niw0LjUwNGMzMS4yODQtMy45OTMsMzIuMzgxLTcuNTA1LDE3OS42NjctNjEuMDAxYzc0LjMzNC0yNi45OTksMjE0Ljc0OC03Ny40NzQsMjE0Ljc0OC03Ny40NzRzNTEuMzA5LTE2LjgyNyw3Ni40MTktMjcuMDI1YzUuMjIzLTIuMTIxLDcuNDE3LTUuMjExLDguMDgxLTcuMzA3YzEuMDA4LTMuMTgsMC0xMTcwLjUwMSwwLTExNzAuNTAxUzEwNTYuNTgsOTYuMzU5LDk2NC4wOCw4Ny44NTl6XCIvPicsXG4gICAgICAgICdkPVwiTTk3NS41LDg2YzAsMC0zMjQuNTAyLTY3LjAwMS0zNDguNS03MGMtMjMuOTk4LTIuOTk5LTU0LjY2NS01LjM2NS03MC4yNDYsNC40NTFDNTI1LjE4MSw0MC4zNDEsNTI1LDExMC41LDUyNSwxMTAuNXYxNDI5YzAsMCw2OS41NzMsMTMuODg5LDE0NywxLjVjMzcuNS02LDQzLjE5My0xMy45OTIsMTg0Ljk5OS04MC42NjlDOTU3LjY2NSwxNDEyLjk5OCwxMDAxLjUsMTM5MSwxMDAxLjUsMTM5MXM2Mi41ODgtMjQuOTc1LDYzLjUtMzMuMzMyVjE4Ni4xNjdDMTA2NSwxODYuMTY3LDEwNjcsOTksOTc1LjUsODZ6XCIvPicsXG4gICAgICAgICdkPVwiTTk4Mi4zMzUsODRjMCwwLTI0Mi4wMDYtNjUuOTYtMjY1LjQ4Ni03MS43NTVDNzA3Ljc1LDEwLDY2My4yNSw1Ljg1OCw2NTQuNjY3LDExLjM4OEM2MjMuMjk4LDMxLjU5OCw2MjQsMTA4LjUsNjI0LDEwOC41djE0NDNjMCwwLDY2LjI4OSwxMi44NjQsMTQzLjY2NiwwLjE2NmMyMi4zMzItMy42NjUsNDYuODY2LTIzLjI0NywxNzguNjY3LTEwOGM3MS42OTktNDYuMTA1LDExNy4zMzMtNzUuNjY2LDExNy4zMzMtNzUuNjY2czkuNzU1LTUuMzEsMTAuNjY3LTEzLjY2N2wtMC42NjYtMTE3NkMxMDczLjY2NywxNzguMzMzLDEwNzMuODM1LDk3LjAwMSw5ODIuMzM1LDg0elwiLz4nLFxuICAgICAgICAnZD1cIk0xMDI1LjMzNSw5NC42NjdjMCwwLTE5Ny44NTMtODAuNTM4LTIyMS4zMzMtODYuMzMzQzc5NC45MDMsNi4wODgsNzUyLjQzOCwyLjc4OSw3NDQuMzM1LDlDNzE5Ljk4NCwyNy42NjcsNzIxLDExMC41LDcyMSwxMTAuNXYxNDUwYzAsMCw4Ny40OTIsOC43OTYsMTQzLjY2Ni00LjgzNGMzNC4zMzUtOC4zMzEsNTQuNjY4LTQwLjMzMSwxNDEuNjY3LTEyMS4zMzJjMzcuMjg3LTM0LjcxNyw1Ny4wNDItNTQuOTU5LDU3LjA0Mi01NC45NTlzMTkuMTI1LTE1LjUsMTguOTU4LTIzLjA0MmMwLDAsMC4xNzEtMTEzNi4wODItMC4zMzEtMTE0NS4zMzNTMTA5MS41LDEyNy41LDEwMjUuMzM1LDk0LjY2N3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNMTAxNS43NSw4MWMwLDAtOTAtNjIuNS0xMTMuMjM0LTcwLjAyMWMtNC42NDgtMS41MDUtMTEuMjIzLTQuMDI3LTE4LjUzOC01LjM0NGMtMTEuMjU1LTIuMDI3LTI0LjI2Ni0yLjI3MS0zNC43MjgtMi4yNTNDODQwLjY0LDMuMzk2LDgzMy43NTYsMy4yNjQsODMxLDUuMjVjLTE3LDEyLjI1LTE2LjMzMywxMDEuOTgzLTE2LjMzMywxMDEuOTgzdjE0NTljMCwwLDk0LjMzMSw4LjQzMiwxNDMuNjY2LTYuODM0YzIyLjQzMS02Ljk0LDM0LjMzNC0zOS4zOTksNzIuMzM0LTEwMC43MzJjNDQuODk2LTcyLjQ2Myw1NC42NjYtOTAuOTM0LDU0LjY2Ni05MC45MzRzNC42NjctNS43MzcsNC42NjctMTQuNjY3bDAuMzM0LTExNzZDMTA5MC4zMzQsMTc3LjA2NywxMDkzLjI1LDEyMiwxMDE1Ljc1LDgxelwiLz4nLFxuICAgICAgICAnZD1cIk0xMDY1LjU5NSwxMDIuNDM4Yy00LjY0My02Ljc4My0yNC41OTQtNDQuMTA0LTQ0LjA5NS02NS40MzhjLTE2LjI1LTE3Ljc3Ny0zMC4xMTYtMjQuMTM5LTQwLjUtMjcuNWMtNC42NDgtMS41MDUtMTcuMjEtNC4yLTI0LjUyNS01LjUxOGMtMTEuMjU1LTIuMDI3LTI3Ljc2My0xLjk5OS0zOC4yMjUtMS45ODFjLTguNjEsMC4wMTUtMTAuNDI2LTAuOTc0LTExLjUsMi4yNDljLTYuNTgyLDE5Ljc1LTYuMDgzLDk5LjYwMy02LjA4Myw5OS42MDNsLTEsMTQ2OGMwLDAsODIuNDk4LDYuNjYzLDEzMS44MzMtOC42MDNjOC4xODgtMi41MzMsMTguNDg1LTQuNDIzLDIxLjk1LTE0LjI2MmM2LjE1LTE3LjQ2MywxMS4wMjQtNDYuMjYyLDIwLjU1LTg4LjQ4OGMxOC43NTctODMuMTU0LDIyLjUtMTAxLjc1LDIyLjUtMTAxLjc1czAtMzEuMDcsMC00MGwtMC4wNjItODA3LjI1MmwzMC4wNjItMC42MjN2LTM0Ljk1OWwtMjkuNzY1LTAuMTY0TDEwOTYuNSwyMzFjMCwwLDAuNzY3LTQ4LjIxOS0xLjM5OS02OS43NzRDMTA5My40NjUsMTQ0Ljk1MiwxMDY5Ljk4MiwxMDguODQ4LDEwNjUuNTk1LDEwMi40Mzh6XCIvPicsXG4gICAgICAgICdkPVwiTTk3NC45OTcsMS4zMzNWNzZjMCwwLTcuMTY2LDAuODMzLTcuMTY2LDEwLjVzMCwxMzgwLjAwMywwLDEzODAuMDAzczIuMzMzLDMuOTk5LDYuODMzLDUuODMzbDAuMzM1LDEwMC41NzhjMCwwLDExOS4wMDEsNy4zMzYsMTQzLjUwMS0xNy45MTRjMCwwLDIuNTAxLTEuMTY1LDIuNTAxLTguNDk5YzAtNS44ODMtMC4wMjgtMTAzNy41NjItMC4wMjgtMTAzNy41NjJsNy45NjUtMC4wNjNsNC4wNjIsMi4yNWw0NC4wMDEtMC4zNzV2LTM0LjM3NWwtNDQuMDkzLTAuMDE1bC00LjI4MywyLjc2NWwtNy4yNjksMC4wMTdsLTAuMzU1LTQ2LjMwN2MwLDAsMi45OTktNzIuMzM1LDIuOTk5LTEwNS44MzVzMC4zMzMtMTAzLjY2NywwLTExNC42NjdzLTIuMzM0LTM2LjY2Ny0yLjY2Ny00NnMtMS01Ni42NjctMS01Ni42NjdzLTAuMzQtNDIuMTU2LTM0LjMzMy03NkMxMDUzLjI1LDEuMDYxLDEwMDUuMzI3LDAsOTc0Ljk5NywxLjMzM3pcIi8+JyxcbiAgICAgICAgJ2Q9XCJNOTg3Ljc1LDg4LjI1bC0zLjUsNTQuNzVjMCwwLTIuNSw2LjUtMi42MjUsMTguMzc1czAsMTExOS40NTcsMCwxMTE5LjQ1N3MwLjA0MiwxMC40OTksMS4zNzUsMTQuMzMzczEuMTYsOSwxLjE2LDl2MzMuNWw1MS4zNCwyMzUuODM1YzAsMCw3NC44MSwxLjkzNCw5Ny43NS0zYzIzLjI1LTUsMzMuMzc1LTYuODc1LDQyLTE4VjE1MzFsLTAuMDk4LTEwMjEuMjM3bDQ3LjA5OCwwLjg2MlY0NzQuMjVsLTQ3LjI5NywxLjc0bDAuMjk3LTM1OS43NGMwLDAsMC43NS00Ny42OTktMzQuMjUtODIuMjVzLTgzLjE2Ny0zNC41NTEtMTA5LjUtMzRMOTg3Ljc1LDg4LjI1elwiLz4nXG4gICAgXTtcblxuICAgIGZ1bmN0aW9uIGxvYWREb29ySW1hZ2VzKCkge1xuICAgICAgICBkb29yc0ltZy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAvLyAgICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgICAgLy8gICAgIGltZy5zcmMgPSBlbDtcbiAgICAgICAgICAgICRmcmlkZ2UuYXBwZW5kKCc8c3ZnIGNsYXNzPVwiZnJpZGdlLXRvcC1pbWcgZG9vci0nICsgaSArIFxuICAgICAgICAgICAgICAgICdcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiJyArXG4gICAgICAgICAgICAgICAgJ3htbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCInICtcbiAgICAgICAgICAgICAgICAnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDEyMjUgMTU3NlwiICcgK1xuICAgICAgICAgICAgICAgICdlbmFibGUtYmFja2dyb3VuZD1cIm5ldyAwIDAgMTIyNSAxNTc2XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRlZnM+PHBhdGggaWQ9XCJTVkdJRCcgKyBpICsgJ1wiICcgKyBwYXRoc1tpXSArJyA8L2RlZnM+JyArXG4gICAgICAgICAgICAgICAgJzxjbGlwUGF0aCBpZD1cIlNWR0lEXycgKyBpICsnXCI+JyArXG4gICAgICAgICAgICAgICAgJzx1c2UgeGxpbms6aHJlZj1cIiNTVkdJRCcgKyBpICsgJ1wiJyArICcgb3ZlcmZsb3c9XCJ2aXNpYmxlXCI+PC91c2U+JyArXG4gICAgICAgICAgICAgICAgJzwvY2xpcFBhdGg+JyArXG4gICAgICAgICAgICAgICAgJzxpbWFnZSBjbGlwLXBhdGg9XCJ1cmwoI1NWR0lEXycgKyBpICsgJylcIiBvdmVyZmxvdz1cInZpc2libGVcIiB3aWR0aD1cIjEyMjVcIicgK1xuICAgICAgICAgICAgICAgICdoZWlnaHQ9XCIxNTc2XCIgeGxpbms6aHJlZj1cIicgKyBlbCArICdcIj48L2ltYWdlPicgK1xuICAgICAgICAgICAgICAgICc8L3N2Zz4nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWREb29ySW1hZ2VzKCk7XG4gICAgXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZShuYW1lLCBuKSB7XG4gICAgICAgIHZhciBjbGFzc2VzVG9SZW1vdmUgPSAnJztcbiAgICAgICAgbiA9IG4gKyAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY2xhc3Nlc1RvUmVtb3ZlICs9IG5hbWUgKyBpICsgJyAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFzc2VzVG9SZW1vdmUuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICB2YXIgZGVzY0NsYXNzZXNUb1JlbW92ZSA9IHByZXBhcmVDbGFzc2VzVG9SZW1vdmUoJ3dpdGgtZGVzYy0nLCA2KTtcbiAgICB2YXIgZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnb3Blbi0nLCAyMyk7XG4gICAgXG4gICAgJHdpdGhEZXNjLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoJGZvb3Rlci5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgICQodGhpcykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yMSoxOCkgcmV0dXJuO1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsIGhlaWdodCkuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzIxKjE4KSByZXR1cm47XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KS5yZW1vdmVDbGFzcyhkZXNjQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkcmFkaW9NdXNpY1NvbmcuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LmFkZENsYXNzKCdhbmltYXRlLXNjcm9sbCcpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC5yZW1vdmVDbGFzcygnYW5pbWF0ZS1zY3JvbGwnKTtcbiAgICB9KTtcbiAgICBcbiAgICBmdW5jdGlvbiBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgaCkge1xuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA8PSBoLzIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxICYmIHNjcm9sbFRvcCA8IGgvMjEqMik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoyICYmIHNjcm9sbFRvcCA8IGgvMjEqMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSozICYmIHNjcm9sbFRvcCA8IGgvMjEqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSo0ICYmIHNjcm9sbFRvcCA8IGgvMjEqNSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSo1ICYmIHNjcm9sbFRvcCA8IGgvMjEqNik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSo2ICYmIHNjcm9sbFRvcCA8IGgvMjEqNyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSo3ICYmIHNjcm9sbFRvcCA8IGgvMjEqOCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSo4ICYmIHNjcm9sbFRvcCA8IGgvMjEqOSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSo5ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi05Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTAgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTEgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxMik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTExJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTIgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTMgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTQgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxNSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTUgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxNik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE1Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTYgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxNyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTcgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxOCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE3Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTggJiYgc2Nyb2xsVG9wIDwgaC8yMSoxOSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMTkgJiYgc2Nyb2xsVG9wIDwgaC8yMSoyMCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMjAgJiYgc2Nyb2xsVG9wIDwgaC8yMSoyMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+PSBoLzIxKjIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2Nyb2xsKSB7XG4gICAgICAgIHNjcm9sbFRvcCA9IC1zY3JvbGw7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgJ2F1dG8nKS5yZW1vdmVDbGFzcyhkZXNjQ2xhc3Nlc1RvUmVtb3ZlKTtcbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8xMikge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWZpeGVkJykuYWRkQ2xhc3MoJ2Zvb3Rlci1oaWRlJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQucmVtb3ZlQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItaGlkZScpLmFkZENsYXNzKCdmb290ZXItZml4ZWQnKTtcbiAgICAgICAgICAgICRsZWZ0VGV4dC5hZGRDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzI0KjE1KSB7XG4gICAgICAgICAgICAkZG9vck9wZW5lci5yZW1vdmVDbGFzcygnYmVoaW5kJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZG9vck9wZW5lci5hZGRDbGFzcygnYmVoaW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFN0YXRlc1syXSAtIHNjcm9sbFRvcCA8IGZyaWRnZUlubmVySGVpZ2h0ICogMC4wNSkge1xuICAgICAgICAgICAgJCgnLmdhbWUnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ3dpdGgtZ2FtZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZS5wYXVzZSgpO1xuICAgICAgICAgICAgJCgnLmdhbWUnKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgc2Nyb2xsU3RhdGVzWzFdKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG15U2Nyb2xsO1xuICAgIGZ1bmN0aW9uIGluaXRNeVNjcm9sbCgpIHtcbiAgICAgICAgbXlTY3JvbGwgPSBuZXcgd2luZG93LklTY3JvbGwoJyN3cmFwcGVyJywge1xuICAgICAgICAgICAgcHJvYmVUeXBlOiAzLFxuICAgICAgICAgICAgbW91c2VXaGVlbDogdHJ1ZSxcbiAgICAgICAgICAgIGNsaWNrOiB0cnVlLFxuICAgICAgICAgICAgLy8gc2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGludGVyYWN0aXZlU2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGZhZGVTY3JvbGxiYXJzOiB0cnVlLFxuICAgICAgICAgICAgLy8gc2hyaW5rU2Nyb2xsYmFyczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgICAgICAgc2Nyb2xsUGFnZShteVNjcm9sbC55KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsJywgdXBkYXRlUG9zaXRpb24pO1xuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsRW5kJywgdXBkYXRlUG9zaXRpb24pO1xuICAgIH1cbiAgICBcbiAgICAvLyB3aW5kb3cubG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgIGluaXRNeVNjcm9sbCgpO1xuICAgIC8vIH07XG4gICAgXG4gICAgJGRvY3VtZW50Lm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLm5hdi1tYWluJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzBdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LW91cicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1sxXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzJdLCAxMDAwKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBnYW1lXG4gICAgdmFyIGdhbWU7XG4gICAgZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXggO1xuICAgICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgICAgICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuICAgICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG4gICAgdmFyIGltYWdlcyA9IFtdO1xuICAgIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xuICAgICAgICB2YXIgJGdhbWVGaWVsZENlbGwgPSAkKCcuZ2FtZS1maWVsZC1jZWxsJykucmVtb3ZlKCksXG4gICAgICAgICAgICAkZ2FtZUZpZWxkID0gJCgnLmdhbWUtZmllbGQnKSxcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBcbiAgICAgICAgJCgnLmdhbWUtcG9wdXAtbmV4dCAuc29jaWFsLXZrIHN2ZycpLmNsb25lKCkuYXBwZW5kVG8oJy5nYW1lLXBvcHVwLXdpbiAuc29jaWFsLXZrJyk7XG4gICAgICAgICQoJy5nYW1lLXBvcHVwLW5leHQgLnNvY2lhbC1mYiBzdmcnKS5jbG9uZSgpLmFwcGVuZFRvKCcuZ2FtZS1wb3B1cC13aW4gLnNvY2lhbC1mYicpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgJGN1cnJHYW1lRmllbGRDZWxsID0gJGdhbWVGaWVsZENlbGwuY2xvbmUoKTtcbiAgICAgICAgICAgIGlmIChpICUgNSA9PT0gMCkgJGN1cnJHYW1lRmllbGRDZWxsLmFkZENsYXNzKCdjb2wteHMtb2Zmc2V0LTEnKTtcbiAgICAgICAgICAgICRjdXJyR2FtZUZpZWxkQ2VsbC5jaGlsZHJlbignLmdhbWUtdGlsZScpLmFkZENsYXNzKCdnYW1lLXRpbGUtJyArIGkpO1xuICAgICAgICAgICAgJGdhbWVGaWVsZC5hcHBlbmQoJGN1cnJHYW1lRmllbGRDZWxsKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSAnLi9pbWcvdGlsZS0nICsgaSArICcucG5nJztcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKGltZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIFRpbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubnVtYmVyID0gb3B0aW9ucy5udW1iZXI7XG4gICAgICAgICAgICB0aGlzLmltZ051bWVyID0gb3B0aW9ucy5pbWdOdW1lcjtcbiAgICAgICAgICAgIHRoaXMuJGRpdiA9ICQoJy5nYW1lLXRpbGUtJyArIG9wdGlvbnMubnVtYmVyKTtcbiAgICAgICAgICAgIHRoaXMuaW1nID0gaW1hZ2VzW29wdGlvbnMuaW1nTnVtZXJdO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5hcHBlbmQoJCh0aGlzLmltZykuY2xvbmUoKSk7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1NvbHZlZCB8fCBfdGhpcy5pc0xvY2tlZCB8fCBfdGhpcy5pc09wZW4gfHwgIV90aGlzLmdhbWUuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIF90aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmdhbWUub3BlblRhbGUodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5zb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5hZGRDbGFzcygnbG9ja2VkJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUudW5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBHYW1lID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMDtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlVG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lU2NvcmVNYXggPSA5MDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrU2NvcmVNYXggPSA5MDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrc1RvdGFsID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAwO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XG4gICAgICAgICAgICB0aGlzLmxvY2tlZEltZyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5iYWNrSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uU3RhcnQgPSAkKCcuc3RhcnQtZ2FtZScpXG4gICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b25TdGFydC51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICRnYW1lUG9wdXBTdGFydC5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25SZXN0YXJ0ID0gJCgnLnJlc3RhcnQtZ2FtZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3VtZSA9ICQoJy5yZXN1bWUtZ2FtZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbk5leHQgPSAkKCcubmV4dC1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRpbmZvRGl2ID0gb3B0aW9ucy4kaW5mb0RpdjtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0RlbGF5ID0gMzAwMDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWUgPSAkKCcuZ2FtZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRpbWVyID0gJCgnLmdhbWUtdGltZXInKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MgPSAkKCcuZ2FtZS1jbGlja3MnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZSA9ICQoJy5nYW1lLXNjb3JlJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUZXh0ID0gJCgnLmdhbWUtc2NvcmUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwgPSAkKCcuZ2FtZS1zY29yZS10b3RhbCcpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUxldmVsID0gJCgnLmdhbWUtbGV2ZWwnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrID0gJCgnLmdhbWUtdGFzaycpO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubmV4dExldmVsKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydENvdW50KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuc3RhcnRDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbWUgPSBNYXRoLnJvdW5kKF90aGlzLnRpbWVNYXggLSAoRGF0ZS5ub3coKSAtIF90aGlzLnN0YXJ0VGltZSkvMTAwMCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVUaW1lci50ZXh0KF90aGlzLnRpbWUpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lID09PSAyMCkgX3RoaXMuJGdhbWVUaW1lci5hZGRDbGFzcygncmVkLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGltZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWlsTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydGVkKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdW1lLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3VtZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b25SZXN1bWUudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBSZXN1bWUuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKSAtICh0aGlzLnRpbWVNYXggLSB0aGlzLnRpbWUpICogMTAwMDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb3VudCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgICAgIHRpbGUuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUubmV4dExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pbml0TGV2ZWwodGhpcy5sZXZlbCArIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmluaXRMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID4gNSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbC50ZXh0KCfQo9GA0L7QstC10L3RjCAnICsgbGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcy50ZXh0KDApO1xuICAgICAgICAgICAgc3dpdGNoKGxldmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDMwMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDksIDEwLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTgxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNywgOSwgMTAsIDEyLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTIxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxODtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxMjE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA4LCA5LCAxMCwgMTEsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gOTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWVNYXggLSAxO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRpbWVyLnRleHQodGhpcy50aW1lTWF4IC0gMSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFsZXNUb1NvbHZlOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlcnMucHVzaChpICUgKHRoaXMudGFsZXNUb1NvbHZlL3RoaXMudGlsZXNJbkNoYWluKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBzaHVmZmxlKHRoaXMubnVtYmVycyk7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50aWxlcy5wdXNoKG5ldyBUaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBfdGhpcy50aWxlTWFwW2ldLFxuICAgICAgICAgICAgICAgICAgICBpbWdOdW1lcjogZWwsXG4gICAgICAgICAgICAgICAgICAgIGdhbWU6IF90aGlzXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGFzay50ZXh0KHRoaXMudGlsZXNJbkNoYWluICsgJyAnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzICs9IDE7XG4gICAgICAgICAgICB0aGlzLmNsaWNrc1RvdGFsICs9IDE7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzLnRleHQodGhpcy5jbGlja3MpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsZWFyTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNvbHZlZCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGVsLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LnBhcmVudCgpLnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lci5yZW1vdmVDbGFzcygncmVkLXRleHQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jb21wbGV0ZUxldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBzY29yZSA9ICh0aGlzLnRpbWVTY29yZU1heCAqIHRoaXMudGltZS90aGlzLnRpbWVNYXggKyB0aGlzLmNsaWNrU2NvcmVNYXggLyB0aGlzLmNsaWNrcykgKiB0aGlzLmxldmVsO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSBNYXRoLmZsb29yKHNjb3JlKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCArPSB0aGlzLnNjb3JlTGV2ZWw7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUudGV4dCh0aGlzLnNjb3JlTGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVGV4dC50ZXh0KGRlY2xpbmF0b3IuZGVjbGluYXRlKHRoaXMuc2NvcmVMZXZlbCkpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwudGV4dCh0aGlzLnNjb3JlVG90YWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgPCA1KSB7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cE5leHQuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbk5leHQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvbk5leHQudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwTmV4dC5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBXaW4uZmFkZUluKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuZmFpbExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCAtPSAxO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydC5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25SZXN0YXJ0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uUmVzdGFydC51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cFJlc3RhcnQuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUud2luTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUxldmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3BlblRhbGUgPSBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLnB1c2godGlsZSk7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW1lciA9IHRoaXMub3BlbmVkWzBdLmltZ051bWVyLFxuICAgICAgICAgICAgICAgICAgICBpc0JpbmRlZFRhbGVzID0gdGhpcy5vcGVuZWQuZXZlcnkoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5pbWdOdW1lciA9PT0gaW1nTnVtZXI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JpbmRlZFRhbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiB0aGlzLnRpbGVzSW5DaGFpbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb2x2ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhbGVzVG9Tb2x2ZSA9PT0gdGhpcy5zb2x2ZWQpIHRoaXMud2luTGV2ZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBnYW1lID0gbmV3IEdhbWUoe1xuICAgICAgICAgICAgJGluZm9EaXY6ICQoJy5kZXNjLWdhbWUgZGl2JylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGluaXRHYW1lKCk7XG4gICAgJCgnLnByZWxvYWQtaW1nLCAucHJlbG9hZGVyLXByb2dyZXNzJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLnByZWxvYWRlcicpLmFuaW1hdGUoe1xuICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuZmFkZU91dCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBhdWRpb1xuICAgIHZhciBUcmFja0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHJhY2tzID0gW1xuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIEJlY2F1c2UgSSBXYW50IFlvdS5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIEJyb2tlbiBQcm9taXNlLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gRHJhZy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIE1lZHMubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBPbmUgT2YgQSBLaW5kLm1wMydcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayArPSAxO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2sgPiB0aGlzLnRyYWNrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzW3RoaXMuY3VycmVudFRyYWNrXTtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1swXTtcbiAgICB9O1xuICAgIFxuICAgIHZhciB0cmFja0xpc3QgPSBuZXcgVHJhY2tMaXN0KCk7XG4gICAgXG4gICAgLy8gU2V0dXAgdGhlIHBsYXllciB0byBhdXRvcGxheSB0aGUgbmV4dCB0cmFja1xuICAgIHZhciBhID0gd2luZG93LmF1ZGlvanMuY3JlYXRlQWxsKHtcbiAgICAgICAgdHJhY2tFbmRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiB0aGUgZmlyc3QgdHJhY2tcbiAgICB2YXIgYXVkaW8gPSBhWzBdO1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgIGZ1bmN0aW9uIHNob3dCdXR0b24oKSB7XG4gICAgICAgIGlmIChhdWRpby5wbGF5aW5nKSB7XG4gICAgICAgICAgICAkcGxheVBhdXNlLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciAkcGxheVBhdXNlID0gJCgnLnJhZGlvLW11c2ljLWJ0bi1wYXVzZScpLFxuICAgICAgICAkcGxheU5leHQgPSAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQtaG92ZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRwbGF5TmV4dC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHBsYXlOZXh0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSwgNDAwKTtcbiAgICB9KTtcbiAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgJHBsYXlQYXVzZS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIGEgdHJhY2sgb24gY2xpY2tcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbn0pO1xufVxuXG52YXIgaW1hZ2VzVG9Mb2FkO1xuZnVuY3Rpb24gbG9hZEltYWdlKHNyYywgbnVtYmVyLCBsaXN0KSB7XG4gICAgbG9hZEltYWdlLmNvdW50ZXIgPSBsb2FkSW1hZ2UuY291bnRlciB8fCAwO1xuICAgIGxvYWRJbWFnZS5tYXggPSBsb2FkSW1hZ2UubWF4IHx8IGxpc3QubGVuZ3RoIDtcbiAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9hZEltYWdlLmNvdW50ZXIrKztcbiAgICAgICAgJHByZWxvYWRlclByb2dyZXNzLmNzcyh7J3dpZHRoJzogKDEwMCAqIGxvYWRJbWFnZS5jb3VudGVyL2xvYWRJbWFnZS5tYXgpICsgJyUnfSk7XG4gICAgICAgIGlmIChsb2FkSW1hZ2UuY291bnRlciA9PT0gbG9hZEltYWdlLm1heCkge1xuICAgICAgICAgICAgJGZyaWRnZUlubmVyLmF0dHIoJ3NyYycsIGltYWdlc1RvTG9hZFswXSk7XG4gICAgICAgICAgICBpbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gaW1nO1xufVxuXG5mdW5jdGlvbiBwcmVsb2FkKCkge1xuICAgIHZhciBwb3N0Zml4ID0gJycsXG4gICAgICAgIGV4dCA9ICcucG5nJyxcbiAgICAgICAgaTtcblxuICAgIGlmKCAvaVAoYWR8b2R8aG9uZSl8QW5kcm9pZHxCbGFja2JlcnJ5fFdpbmRvd3MgUGhvbmUvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAvLyBwb3N0Zml4ID0gJ19pcGFkMic7XG4gICAgICAgIHBvc3RmaXggPSAnX3RhYmxldCc7XG4gICAgICAgIGV4dCA9ICcucG5nJztcbiAgICB9XG4gICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8IDQwMCkge1xuICAgICAgICBwb3N0Zml4ID0gJ19tb2JpbGUnO1xuICAgICAgICBleHQgPSAnLnBuZyc7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZCA9IFtcbiAgICAgICAgJy4vaW1nL2ZyaWRnZV93aXRoX3JhZGlvJyArIHBvc3RmaXggKyAnLnBuZycsXG4gICAgICAgICcuL2ltZy9xdWVzdGlvbi5wbmcnLFxuICAgICAgICAnLi9pbWcvYmxhbmsucG5nJyxcbiAgICAgICAgJy4vaW1nL3NjcmVlbi5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dC5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dF9hY3RpdmUucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXkucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXlfYWN0aXZlLnBuZydcbiAgICBdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGltYWdlc1RvTG9hZC5wdXNoKCcuL2ltZy90aWxlLScgKyBpICsgJy5wbmcnKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IDIyOyBpKyspIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IGkgPCAxMCA/ICcwJyA6ICcnLFxuICAgICAgICAgICAgcGF0aCA9ICcuL2ltZy9kb29yLScgKyBwcmVmaXggKyBpICsgcG9zdGZpeCArIGV4dDtcbiAgICAgICAgaW1hZ2VzVG9Mb2FkLnB1c2gocGF0aCk7XG4gICAgICAgIGRvb3JzSW1nLnB1c2gocGF0aCk7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZC5mb3JFYWNoKGxvYWRJbWFnZSk7XG59XG5wcmVsb2FkKCk7Il19
