(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);
$(window).on('touchmove', function (e) {
    e.preventDefault();
});
var $preloaderProgress = $('.preloader-progress');

var doorsImg = [];

function initPage() {
$(function () {
    var $withDesc = $('.with-desc'),
        $footer = $('.footer'),
        $fridge = $('.fridge-door'),
        $fridgeInner = $('.fridge-inner'),
        $page = $('.page'),
        $leftText = $('.left-text'),
        $radio = $('.radio-cont'),
        $radioMusicSong = $('.radio-music-song-hover'),
        $radioMusicSongText = $('.radio-music-song-text'),
        $doorOpener = $('.door-opener'),
        $window = $(window),
        $document = $(document);

    var height,
        scrollStates,
        scrollTop;
    
    function resize() {
        var radioHeight = $radio[0].clientWidth * 124/1080 + 20,
            percent = 0.54,
            gameTop = radioHeight + $fridgeInner[0].clientWidth * $fridgeInner.attr('height')/$fridgeInner.attr('width') * percent,
            fridgeInnerHeight = parseInt($fridgeInner.css('height'), 10) - 20;

        height = parseInt($footer.css('height'), 10);
        scrollStates = [0, radioHeight, Math.min(gameTop, fridgeInnerHeight - window.innerHeight)];
        $page.css('height', Math.min(gameTop + window.innerHeight, fridgeInnerHeight));
    }
    resize();
    $window.on('resize', resize);

    function loadDoorImages() {
        doorsImg.forEach(function (el, i) {
            var img = new window.Image();
            img.src = el;
            $fridge.append($(img).addClass('fridge-top-img door-' + i));
        });
    }
    loadDoorImages();
    
    $withDesc.each(function (i) {
        height = parseInt($footer.css('height'), 10);
        $(this).hover(function () {
            if (scrollTop < scrollStates[1]/24*15) return;
            $footer.css('height', height).addClass('with-desc-' + (i + 1));
        }, function () {
            $footer.css('height', 'auto').removeClass('with-desc-' + (i + 1));
        });
    });

    $radioMusicSong.hover(function () {
        $radioMusicSongText.addClass('animate-scroll');
    }, function () {
        $radioMusicSongText.removeClass('animate-scroll');
    });
    
    function prepareClassesToRemove(name, n) {
        var classesToRemove = '';
        n = n + 1;
        for (var i = 0; i < n; i++) {
            classesToRemove += name + i + ' ';
        }
        return classesToRemove.slice(0, -1);
    }
    var descClasseToRemove = prepareClassesToRemove('with-desc-', 6);
    var fridgeClassesToRemove = prepareClassesToRemove('open-', 23);
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
            case (scrollTop > h/21*21):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-21');
            break;
        }
    }
    
    function scrollPage(scroll) {
        scrollTop = -scroll;
        height = parseInt($footer.css('height'), 10);
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
        if (scrollStates[2] - scrollTop < 30) {
            // $('.game').fadeIn();
            $footer.removeClass(descClasseToRemove).css('height', height).addClass('with-game');
        } else {
            // $('.game').fadeOut();
            $footer.css('height', 'auto').removeClass('with-game');
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
        for (var i = 0; i < 10; i++) {
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
            this.$gameButton = $('.start-game');
            this.$infoDiv = options.$infoDiv;
            this.opened = [];
            this.numbers = [];
            this.$gameButton.click(function () {
                _this.start();
                _this.$gameButton.fadeOut();
            });
            this.showDelay = 3000;
            this.$game = $('.game');
            this.$gameTimer = $('.game-timer');
            this.$gameClicks = $('.game-clicks');
            this.$gameScore = $('.game-score');
            this.$gameScoreTotal = $('.game-score-total');
            this.$gameLevel = $('.game-level');
            this.$gameTask = $('.game-task');
        };
        Game.prototype.start = function () {
            if (this.started) return;
            this.nextLevel();
            var _this = this;
            this.$game.fadeIn();
            this.started = true;
            this.startTime = Date.now();
            this.interval = setInterval(function () {
                _this.time = Math.floor(_this.timeMax - (Date.now() - _this.startTime)/1000);
                _this.$gameTimer.text(_this.time);
                if (_this.time === 0 || _this.time < 0) {
                    clearInterval(_this.interval);
                    _this.failLevel();
                }
            }, 1000);
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
                    this.tileMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
                break;
                case 4:
                    this.talesToSolve = 18;
                    this.tilesInChain = 3;
                    this.tileMap = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19];
                break;
                case 5:
                    this.talesToSolve = 20;
                    this.tilesInChain = 4;
                    this.tileMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
                break;
            }
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
            this.numbers = [];
            this.tiles.forEach(function (el) {
                el.$div.children().remove();
                el.$div.parent().removeClass('active').addClass('locked');
                el.$div.unbind('click');
            });
            this.tiles = [];
            this.opened = [];
            return this;
        };
        Game.prototype.completeLevel = function () {
            this.started = false;
            var score = (this.timeScoreMax * this.time/this.timeMax + this.clickScoreMax / this.clicks) * this.level;
            this.scoreLevel = Math.floor(score);
            this.scoreTotal += this.scoreLevel;
            this.$gameScore.text(this.scoreLevel).fadeIn();
            this.$gameScoreTotal.text(this.scoreTotal).fadeIn();
            if (this.level < 5) this.$gameButton.text('Следующий уровень').fadeIn();
            return this;
        };
        Game.prototype.failLevel = function () {
            this.started = false;
            this.level -= 1;
            this.$gameButton.text('Начать уровень заново').fadeIn();
            this.clearLevel();
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
            console.log(this.opened);
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
        new Game({
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

function loadImage(src, number, list) {
    loadImage.counter = loadImage.counter || 0;
    loadImage.max = loadImage.max || list.length ;
    var img = new window.Image();
    img.src = src;
    img.onload = function () {
        loadImage.counter++;
        $preloaderProgress.css({'width': (100 * loadImage.counter/loadImage.max) + '%'});
        if (loadImage.counter === loadImage.max) {
            initPage();
        }
    };
    return img;
}

var imagesToLoad;
function preload() {
    var postfix = '',
        i;

    if( /iP(ad|od|hone)|Android|Blackberry|Windows Phone/i.test(window.navigator.userAgent)) {
        // postfix = '_ipad2';
        postfix = '';
    }
    imagesToLoad = [
        './img/fridge_with_radio.png',
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
            path = './img/door-' + prefix + i + postfix + '.png';
        imagesToLoad.push(path);
        doorsImg.push(path);
    }
    imagesToLoad.forEach(loadImage);
}
preload();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gKHdpbmRvdy4kKTtcbiQod2luZG93KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbnZhciAkcHJlbG9hZGVyUHJvZ3Jlc3MgPSAkKCcucHJlbG9hZGVyLXByb2dyZXNzJyk7XG5cbnZhciBkb29yc0ltZyA9IFtdO1xuXG5mdW5jdGlvbiBpbml0UGFnZSgpIHtcbiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd2l0aERlc2MgPSAkKCcud2l0aC1kZXNjJyksXG4gICAgICAgICRmb290ZXIgPSAkKCcuZm9vdGVyJyksXG4gICAgICAgICRmcmlkZ2UgPSAkKCcuZnJpZGdlLWRvb3InKSxcbiAgICAgICAgJGZyaWRnZUlubmVyID0gJCgnLmZyaWRnZS1pbm5lcicpLFxuICAgICAgICAkcGFnZSA9ICQoJy5wYWdlJyksXG4gICAgICAgICRsZWZ0VGV4dCA9ICQoJy5sZWZ0LXRleHQnKSxcbiAgICAgICAgJHJhZGlvID0gJCgnLnJhZGlvLWNvbnQnKSxcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nID0gJCgnLnJhZGlvLW11c2ljLXNvbmctaG92ZXInKSxcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dCA9ICQoJy5yYWRpby1tdXNpYy1zb25nLXRleHQnKSxcbiAgICAgICAgJGRvb3JPcGVuZXIgPSAkKCcuZG9vci1vcGVuZXInKSxcbiAgICAgICAgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICAgICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiAgICB2YXIgaGVpZ2h0LFxuICAgICAgICBzY3JvbGxTdGF0ZXMsXG4gICAgICAgIHNjcm9sbFRvcDtcbiAgICBcbiAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIHZhciByYWRpb0hlaWdodCA9ICRyYWRpb1swXS5jbGllbnRXaWR0aCAqIDEyNC8xMDgwICsgMjAsXG4gICAgICAgICAgICBwZXJjZW50ID0gMC41NCxcbiAgICAgICAgICAgIGdhbWVUb3AgPSByYWRpb0hlaWdodCArICRmcmlkZ2VJbm5lclswXS5jbGllbnRXaWR0aCAqICRmcmlkZ2VJbm5lci5hdHRyKCdoZWlnaHQnKS8kZnJpZGdlSW5uZXIuYXR0cignd2lkdGgnKSAqIHBlcmNlbnQsXG4gICAgICAgICAgICBmcmlkZ2VJbm5lckhlaWdodCA9IHBhcnNlSW50KCRmcmlkZ2VJbm5lci5jc3MoJ2hlaWdodCcpLCAxMCkgLSAyMDtcblxuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgc2Nyb2xsU3RhdGVzID0gWzAsIHJhZGlvSGVpZ2h0LCBNYXRoLm1pbihnYW1lVG9wLCBmcmlkZ2VJbm5lckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCldO1xuICAgICAgICAkcGFnZS5jc3MoJ2hlaWdodCcsIE1hdGgubWluKGdhbWVUb3AgKyB3aW5kb3cuaW5uZXJIZWlnaHQsIGZyaWRnZUlubmVySGVpZ2h0KSk7XG4gICAgfVxuICAgIHJlc2l6ZSgpO1xuICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG5cbiAgICBmdW5jdGlvbiBsb2FkRG9vckltYWdlcygpIHtcbiAgICAgICAgZG9vcnNJbWcuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICAgICAgICBpbWcuc3JjID0gZWw7XG4gICAgICAgICAgICAkZnJpZGdlLmFwcGVuZCgkKGltZykuYWRkQ2xhc3MoJ2ZyaWRnZS10b3AtaW1nIGRvb3ItJyArIGkpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWREb29ySW1hZ2VzKCk7XG4gICAgXG4gICAgJHdpdGhEZXNjLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoJGZvb3Rlci5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgICQodGhpcykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yNCoxNSkgcmV0dXJuO1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsIGhlaWdodCkuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICRyYWRpb011c2ljU29uZy5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQuYWRkQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnJlbW92ZUNsYXNzKCdhbmltYXRlLXNjcm9sbCcpO1xuICAgIH0pO1xuICAgIFxuICAgIGZ1bmN0aW9uIHByZXBhcmVDbGFzc2VzVG9SZW1vdmUobmFtZSwgbikge1xuICAgICAgICB2YXIgY2xhc3Nlc1RvUmVtb3ZlID0gJyc7XG4gICAgICAgIG4gPSBuICsgMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNsYXNzZXNUb1JlbW92ZSArPSBuYW1lICsgaSArICcgJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xhc3Nlc1RvUmVtb3ZlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgdmFyIGRlc2NDbGFzc2VUb1JlbW92ZSA9IHByZXBhcmVDbGFzc2VzVG9SZW1vdmUoJ3dpdGgtZGVzYy0nLCA2KTtcbiAgICB2YXIgZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnb3Blbi0nLCAyMyk7XG4gICAgZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSAmJiBzY3JvbGxUb3AgPCBoLzIxKjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMiAmJiBzY3JvbGxUb3AgPCBoLzIxKjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMyAmJiBzY3JvbGxUb3AgPCBoLzIxKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNCAmJiBzY3JvbGxUb3AgPCBoLzIxKjUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNSAmJiBzY3JvbGxUb3AgPCBoLzIxKjYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNiAmJiBzY3JvbGxUb3AgPCBoLzIxKjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNyAmJiBzY3JvbGxUb3AgPCBoLzIxKjgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOCAmJiBzY3JvbGxUb3AgPCBoLzIxKjkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOSAmJiBzY3JvbGxUb3AgPCBoLzIxKjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEwICYmIHNjcm9sbFRvcCA8IGgvMjEqMTEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjExICYmIHNjcm9sbFRvcCA8IGgvMjEqMTIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEyICYmIHNjcm9sbFRvcCA8IGgvMjEqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEzICYmIHNjcm9sbFRvcCA8IGgvMjEqMTQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE0ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE1ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE2ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE3ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE4ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE5ICYmIHNjcm9sbFRvcCA8IGgvMjEqMjApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjIwICYmIHNjcm9sbFRvcCA8IGgvMjEqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2Nyb2xsKSB7XG4gICAgICAgIHNjcm9sbFRvcCA9IC1zY3JvbGw7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzEyKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItZml4ZWQnKS5hZGRDbGFzcygnZm9vdGVyLWhpZGUnKTtcbiAgICAgICAgICAgICRsZWZ0VGV4dC5yZW1vdmVDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1oaWRlJykuYWRkQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LmFkZENsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMjQqMTUpIHtcbiAgICAgICAgICAgICRkb29yT3BlbmVyLnJlbW92ZUNsYXNzKCdiZWhpbmQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRkb29yT3BlbmVyLmFkZENsYXNzKCdiZWhpbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nyb2xsU3RhdGVzWzJdIC0gc2Nyb2xsVG9wIDwgMzApIHtcbiAgICAgICAgICAgIC8vICQoJy5nYW1lJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKGRlc2NDbGFzc2VUb1JlbW92ZSkuY3NzKCdoZWlnaHQnLCBoZWlnaHQpLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICQoJy5nYW1lJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsICdhdXRvJykucmVtb3ZlQ2xhc3MoJ3dpdGgtZ2FtZScpO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBzY3JvbGxTdGF0ZXNbMV0pO1xuICAgIH1cbiAgICBcbiAgICB2YXIgbXlTY3JvbGw7XG4gICAgZnVuY3Rpb24gaW5pdE15U2Nyb2xsKCkge1xuICAgICAgICBteVNjcm9sbCA9IG5ldyB3aW5kb3cuSVNjcm9sbCgnI3dyYXBwZXInLCB7XG4gICAgICAgICAgICBwcm9iZVR5cGU6IDMsXG4gICAgICAgICAgICBtb3VzZVdoZWVsOiB0cnVlLFxuICAgICAgICAgICAgY2xpY2s6IHRydWUsXG4gICAgICAgICAgICAvLyBzY3JvbGxiYXJzOiB0cnVlLFxuICAgICAgICAgICAgLy8gaW50ZXJhY3RpdmVTY3JvbGxiYXJzOiB0cnVlLFxuICAgICAgICAgICAgLy8gZmFkZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBzaHJpbmtTY3JvbGxiYXJzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICAgICAgICBzY3JvbGxQYWdlKG15U2Nyb2xsLnkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGwnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGxFbmQnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgfVxuICAgIFxuICAgIC8vIHdpbmRvdy5sb2FkZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW5pdE15U2Nyb2xsKCk7XG4gICAgLy8gfTtcbiAgICBcbiAgICAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcubmF2LW1haW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtb3VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIGdhbWVcbiAgICBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleCA7XG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSAnLi9pbWcvdGlsZS0nICsgaSArICcucG5nJztcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKGltZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIFRpbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubnVtYmVyID0gb3B0aW9ucy5udW1iZXI7XG4gICAgICAgICAgICB0aGlzLmltZ051bWVyID0gb3B0aW9ucy5pbWdOdW1lcjtcbiAgICAgICAgICAgIHRoaXMuJGRpdiA9ICQoJy5nYW1lLXRpbGUtJyArIG9wdGlvbnMubnVtYmVyKTtcbiAgICAgICAgICAgIHRoaXMuaW1nID0gaW1hZ2VzW29wdGlvbnMuaW1nTnVtZXJdO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5hcHBlbmQoJCh0aGlzLmltZykuY2xvbmUoKSk7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1NvbHZlZCB8fCBfdGhpcy5pc0xvY2tlZCB8fCBfdGhpcy5pc09wZW4gfHwgIV90aGlzLmdhbWUuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIF90aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmdhbWUub3BlblRhbGUodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5zb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5hZGRDbGFzcygnbG9ja2VkJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUudW5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBHYW1lID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMDtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlVG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lU2NvcmVNYXggPSA5MDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrU2NvcmVNYXggPSA5MDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrc1RvdGFsID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAwO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XG4gICAgICAgICAgICB0aGlzLmxvY2tlZEltZyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5iYWNrSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b24gPSAkKCcuc3RhcnQtZ2FtZScpO1xuICAgICAgICAgICAgdGhpcy4kaW5mb0RpdiA9IG9wdGlvbnMuJGluZm9EaXY7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uLmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zaG93RGVsYXkgPSAzMDAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZSA9ICQoJy5nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIgPSAkKCcuZ2FtZS10aW1lcicpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcyA9ICQoJy5nYW1lLWNsaWNrcycpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlID0gJCgnLmdhbWUtc2NvcmUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRvdGFsID0gJCgnLmdhbWUtc2NvcmUtdG90YWwnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbCA9ICQoJy5nYW1lLWxldmVsJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGFzayA9ICQoJy5nYW1lLXRhc2snKTtcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydGVkKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm5leHRMZXZlbCgpO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuJGdhbWUuZmFkZUluKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50aW1lID0gTWF0aC5mbG9vcihfdGhpcy50aW1lTWF4IC0gKERhdGUubm93KCkgLSBfdGhpcy5zdGFydFRpbWUpLzEwMDApO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lVGltZXIudGV4dChfdGhpcy50aW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGltZSA9PT0gMCB8fCBfdGhpcy50aW1lIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKF90aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmFpbExldmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICAgICAgdGlsZS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5uZXh0TGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRMZXZlbCh0aGlzLmxldmVsICsgMSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuaW5pdExldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiA1KSByZXR1cm47XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUxldmVsLnRleHQoJ9Cj0YDQvtCy0LXQvdGMICcgKyBsZXZlbCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzLnRleHQoMCk7XG4gICAgICAgICAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMzAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgOSwgMTAsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxODE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA3LCA5LCAxMCwgMTIsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxODtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgOCwgOSwgMTAsIDExLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDIwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIudGV4dCh0aGlzLnRpbWVNYXggLSAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWxlc1RvU29sdmU7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVycy5wdXNoKGkgJSAodGhpcy50YWxlc1RvU29sdmUvdGhpcy50aWxlc0luQ2hhaW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IHNodWZmbGUodGhpcy5udW1iZXJzKTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbGVzLnB1c2gobmV3IFRpbGUoe1xuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IF90aGlzLnRpbGVNYXBbaV0sXG4gICAgICAgICAgICAgICAgICAgIGltZ051bWVyOiBlbCxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogX3RoaXNcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrLnRleHQodGhpcy50aWxlc0luQ2hhaW4gKyAnICcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MudGV4dCh0aGlzLmNsaWNrcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xlYXJMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgICAgIGVsLiRkaXYudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLm9wZW5lZCA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNvbXBsZXRlTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzY29yZSA9ICh0aGlzLnRpbWVTY29yZU1heCAqIHRoaXMudGltZS90aGlzLnRpbWVNYXggKyB0aGlzLmNsaWNrU2NvcmVNYXggLyB0aGlzLmNsaWNrcykgKiB0aGlzLmxldmVsO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gTWF0aC5mbG9vcihzY29yZSk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlVG90YWwgKz0gdGhpcy5zY29yZUxldmVsO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlLnRleHQodGhpcy5zY29yZUxldmVsKS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRvdGFsLnRleHQodGhpcy5zY29yZVRvdGFsKS5mYWRlSW4oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsIDwgNSkgdGhpcy4kZ2FtZUJ1dHRvbi50ZXh0KCfQodC70LXQtNGD0Y7RidC40Lkg0YPRgNC+0LLQtdC90YwnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5mYWlsTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgLT0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b24udGV4dCgn0J3QsNGH0LDRgtGMINGD0YDQvtCy0LXQvdGMINC30LDQvdC+0LLQvicpLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUud2luTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUxldmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3BlblRhbGUgPSBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLnB1c2godGlsZSk7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wZW5lZCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW1lciA9IHRoaXMub3BlbmVkWzBdLmltZ051bWVyLFxuICAgICAgICAgICAgICAgICAgICBpc0JpbmRlZFRhbGVzID0gdGhpcy5vcGVuZWQuZXZlcnkoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5pbWdOdW1lciA9PT0gaW1nTnVtZXI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JpbmRlZFRhbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiB0aGlzLnRpbGVzSW5DaGFpbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb2x2ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhbGVzVG9Tb2x2ZSA9PT0gdGhpcy5zb2x2ZWQpIHRoaXMud2luTGV2ZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBuZXcgR2FtZSh7XG4gICAgICAgICAgICAkaW5mb0RpdjogJCgnLmRlc2MtZ2FtZSBkaXYnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW5pdEdhbWUoKTtcbiAgICAkKCcucHJlbG9hZC1pbWcsIC5wcmVsb2FkZXItcHJvZ3Jlc3MnKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcucHJlbG9hZGVyJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfSwgMTAwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIGF1ZGlvXG4gICAgdmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQmVjYXVzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQnJva2VuIFByb21pc2UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBEcmFnLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gTWVkcy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIE9uZSBPZiBBIEtpbmQubXAzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzWzBdO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyYWNrTGlzdCA9IG5ldyBUcmFja0xpc3QoKTtcbiAgICBcbiAgICAvLyBTZXR1cCB0aGUgcGxheWVyIHRvIGF1dG9wbGF5IHRoZSBuZXh0IHRyYWNrXG4gICAgdmFyIGEgPSB3aW5kb3cuYXVkaW9qcy5jcmVhdGVBbGwoe1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIHZhciBhdWRpbyA9IGFbMF07XG4gICAgYXVkaW8ubG9hZCh0cmFja0xpc3QuZmlyc3QoKSk7XG4gICAgZnVuY3Rpb24gc2hvd0J1dHRvbigpIHtcbiAgICAgICAgaWYgKGF1ZGlvLnBsYXlpbmcpIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHBsYXlQYXVzZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyICRwbGF5UGF1c2UgPSAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJyksXG4gICAgICAgICRwbGF5TmV4dCA9ICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpO1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dC1ob3ZlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHBsYXlOZXh0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkcGxheU5leHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9LCA0MDApO1xuICAgIH0pO1xuICAgICRyYWRpb011c2ljU29uZ1RleHQudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAkcGxheVBhdXNlLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5wbGF5UGF1c2UoKTtcbiAgICAgICAgc2hvd0J1dHRvbigpO1xuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgc2hvd0J1dHRvbigpO1xuICAgIH0pO1xufSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRJbWFnZShzcmMsIG51bWJlciwgbGlzdCkge1xuICAgIGxvYWRJbWFnZS5jb3VudGVyID0gbG9hZEltYWdlLmNvdW50ZXIgfHwgMDtcbiAgICBsb2FkSW1hZ2UubWF4ID0gbG9hZEltYWdlLm1heCB8fCBsaXN0Lmxlbmd0aCA7XG4gICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvYWRJbWFnZS5jb3VudGVyKys7XG4gICAgICAgICRwcmVsb2FkZXJQcm9ncmVzcy5jc3Moeyd3aWR0aCc6ICgxMDAgKiBsb2FkSW1hZ2UuY291bnRlci9sb2FkSW1hZ2UubWF4KSArICclJ30pO1xuICAgICAgICBpZiAobG9hZEltYWdlLmNvdW50ZXIgPT09IGxvYWRJbWFnZS5tYXgpIHtcbiAgICAgICAgICAgIGluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBpbWc7XG59XG5cbnZhciBpbWFnZXNUb0xvYWQ7XG5mdW5jdGlvbiBwcmVsb2FkKCkge1xuICAgIHZhciBwb3N0Zml4ID0gJycsXG4gICAgICAgIGk7XG5cbiAgICBpZiggL2lQKGFkfG9kfGhvbmUpfEFuZHJvaWR8QmxhY2tiZXJyeXxXaW5kb3dzIFBob25lL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgLy8gcG9zdGZpeCA9ICdfaXBhZDInO1xuICAgICAgICBwb3N0Zml4ID0gJyc7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZCA9IFtcbiAgICAgICAgJy4vaW1nL2ZyaWRnZV93aXRoX3JhZGlvLnBuZycsXG4gICAgICAgICcuL2ltZy9xdWVzdGlvbi5wbmcnLFxuICAgICAgICAnLi9pbWcvYmxhbmsucG5nJyxcbiAgICAgICAgJy4vaW1nL3NjcmVlbi5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dC5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dF9hY3RpdmUucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXkucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXlfYWN0aXZlLnBuZydcbiAgICBdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGltYWdlc1RvTG9hZC5wdXNoKCcuL2ltZy90aWxlLScgKyBpICsgJy5wbmcnKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IDIyOyBpKyspIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IGkgPCAxMCA/ICcwJyA6ICcnLFxuICAgICAgICAgICAgcGF0aCA9ICcuL2ltZy9kb29yLScgKyBwcmVmaXggKyBpICsgcG9zdGZpeCArICcucG5nJztcbiAgICAgICAgaW1hZ2VzVG9Mb2FkLnB1c2gocGF0aCk7XG4gICAgICAgIGRvb3JzSW1nLnB1c2gocGF0aCk7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZC5mb3JFYWNoKGxvYWRJbWFnZSk7XG59XG5wcmVsb2FkKCk7Il19
