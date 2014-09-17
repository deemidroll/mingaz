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
        $fridge = $('.fridge-door'),
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

    function loadDoorImages() {
        doorsImg.forEach(function (el, i) {
            var img = new window.Image();
            img.src = el;
            $fridge.append($(img).addClass('fridge-top-img door-' + i));
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
        ext = '.svg',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh3aW5kb3cuJCk7XG5cbiQod2luZG93KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbnZhciAkcHJlbG9hZGVyUHJvZ3Jlc3MgPSAkKCcucHJlbG9hZGVyLXByb2dyZXNzJyksXG4gICAgJGZyaWRnZUlubmVyID0gJCgnLmZyaWRnZS1pbm5lcicpLFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgZG9vcnNJbWcgPSBbXTtcbiAgICBcbmZ1bmN0aW9uIERlY2xpbmF0b3IoZm9ybXMpIHtcbiAgICB0aGlzLmRlY2xpbmF0ZSA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdmFyIGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xuICAgICAgICByZXR1cm4gZm9ybXNbIChudW1iZXIlMTAwPjQgJiYgbnVtYmVyJTEwMDwyMCk/IDIgOiBjYXNlc1sobnVtYmVyJTEwPDUpP251bWJlciUxMDo1XSBdO1xuICAgIH07XG59XG52YXIgZGVjbGluYXRvciA9IG5ldyBEZWNsaW5hdG9yKFsn0L7Rh9C60L4nLCAn0L7Rh9C60LAnLCAn0L7Rh9C60L7QsiddKTtcblxuZnVuY3Rpb24gaW5pdFBhZ2UoKSB7XG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpdGhEZXNjID0gJCgnLndpdGgtZGVzYycpLFxuICAgICAgICAkZm9vdGVyID0gJCgnLmZvb3RlcicpLFxuICAgICAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS1kb29yJyksXG4gICAgICAgICRwYWdlID0gJCgnLnBhZ2UnKSxcbiAgICAgICAgJGxlZnRUZXh0ID0gJCgnLmxlZnQtdGV4dCcpLFxuICAgICAgICAkcmFkaW8gPSAkKCcucmFkaW8tY29udCcpLFxuICAgICAgICAkcmFkaW9NdXNpY1NvbmcgPSAkKCcucmFkaW8tbXVzaWMtc29uZy1ob3ZlcicpLFxuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0ID0gJCgnLnJhZGlvLW11c2ljLXNvbmctdGV4dCcpLFxuICAgICAgICAkZG9vck9wZW5lciA9ICQoJy5kb29yLW9wZW5lcicpLFxuICAgICAgICAkZ2FtZVBvcHVwU3RhcnQgPSAkKCcuZ2FtZS1wb3B1cC1zdGFydCcpLnNob3coKSxcbiAgICAgICAgJGdhbWVQb3B1cFJlc3RhcnQgPSAkKCcuZ2FtZS1wb3B1cC1yZXN0YXJ0JyksXG4gICAgICAgICRnYW1lUG9wdXBSZXN1bWUgPSAkKCcuZ2FtZS1wb3B1cC1yZXN1bWUnKSxcbiAgICAgICAgJGdhbWVQb3B1cE5leHQ9ICQoJy5nYW1lLXBvcHVwLW5leHQnKSxcbiAgICAgICAgJGdhbWVQb3B1cFdpbiA9ICQoJy5nYW1lLXBvcHVwLXdpbicpLFxuICAgICAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICAgIHZhciBoZWlnaHQsXG4gICAgICAgIGZyaWRnZUlubmVySGVpZ2h0LFxuICAgICAgICBzY3JvbGxTdGF0ZXMsXG4gICAgICAgIHNjcm9sbFRvcDtcbiAgICBcbiAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIHZhciByYWRpb0hlaWdodCA9ICRyYWRpb1swXS5jbGllbnRXaWR0aCAqIDEyNC8xMDgwICsgMjAsXG4gICAgICAgICAgICBwZXJjZW50ID0gMC41NCxcbiAgICAgICAgICAgIGdhbWVUb3AgPSByYWRpb0hlaWdodCArICRmcmlkZ2VJbm5lclswXS5jbGllbnRXaWR0aCAqICRmcmlkZ2VJbm5lci5hdHRyKCdoZWlnaHQnKS8kZnJpZGdlSW5uZXIuYXR0cignd2lkdGgnKSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgZnJpZGdlSW5uZXJIZWlnaHQgPSBwYXJzZUludCgkZnJpZGdlSW5uZXIuY3NzKCdoZWlnaHQnKSwgMTApIC0gMjA7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICBzY3JvbGxTdGF0ZXMgPSBbMCwgcmFkaW9IZWlnaHQsIE1hdGgubWluKGdhbWVUb3AsIGZyaWRnZUlubmVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KV07XG4gICAgICAgICRwYWdlLmNzcygnaGVpZ2h0JywgTWF0aC5taW4oZ2FtZVRvcCArIHdpbmRvdy5pbm5lckhlaWdodCwgZnJpZGdlSW5uZXJIZWlnaHQpKTtcbiAgICB9XG4gICAgcmVzaXplKCk7XG4gICAgJHdpbmRvdy5vbigncmVzaXplJywgcmVzaXplKTtcblxuICAgIGZ1bmN0aW9uIGxvYWREb29ySW1hZ2VzKCkge1xuICAgICAgICBkb29yc0ltZy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBlbDtcbiAgICAgICAgICAgICRmcmlkZ2UuYXBwZW5kKCQoaW1nKS5hZGRDbGFzcygnZnJpZGdlLXRvcC1pbWcgZG9vci0nICsgaSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZERvb3JJbWFnZXMoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICAgICAgdmFyIGNsYXNzZXNUb1JlbW92ZSA9ICcnO1xuICAgICAgICBuID0gbiArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjbGFzc2VzVG9SZW1vdmUgKz0gbmFtZSArIGkgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXNzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHZhciBkZXNjQ2xhc3Nlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnd2l0aC1kZXNjLScsIDYpO1xuICAgIHZhciBmcmlkZ2VDbGFzc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKCdvcGVuLScsIDIzKTtcbiAgICBcbiAgICAkd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzIxKjE4KSByZXR1cm47XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KS5hZGRDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsICdhdXRvJykucmVtb3ZlQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMjEqMTgpIHJldHVybjtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQpLnJlbW92ZUNsYXNzKGRlc2NDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICRyYWRpb011c2ljU29uZy5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQuYWRkQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnJlbW92ZUNsYXNzKCdhbmltYXRlLXNjcm9sbCcpO1xuICAgIH0pO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBoKSB7XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wIDw9IGgvMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0wJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEgJiYgc2Nyb2xsVG9wIDwgaC8yMSoyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjIgJiYgc2Nyb2xsVG9wIDwgaC8yMSozKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjMgJiYgc2Nyb2xsVG9wIDwgaC8yMSo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjQgJiYgc2Nyb2xsVG9wIDwgaC8yMSo1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjUgJiYgc2Nyb2xsVG9wIDwgaC8yMSo2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjYgJiYgc2Nyb2xsVG9wIDwgaC8yMSo3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjcgJiYgc2Nyb2xsVG9wIDwgaC8yMSo4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjggJiYgc2Nyb2xsVG9wIDwgaC8yMSo5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjkgJiYgc2Nyb2xsVG9wIDwgaC8yMSoxMCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMCAmJiBzY3JvbGxUb3AgPCBoLzIxKjExKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMSAmJiBzY3JvbGxUb3AgPCBoLzIxKjEyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMiAmJiBzY3JvbGxUb3AgPCBoLzIxKjEzKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxMyAmJiBzY3JvbGxUb3AgPCBoLzIxKjE0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNCAmJiBzY3JvbGxUb3AgPCBoLzIxKjE1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNSAmJiBzY3JvbGxUb3AgPCBoLzIxKjE2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNiAmJiBzY3JvbGxUb3AgPCBoLzIxKjE3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxNyAmJiBzY3JvbGxUb3AgPCBoLzIxKjE4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxOCAmJiBzY3JvbGxUb3AgPCBoLzIxKjE5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoxOSAmJiBzY3JvbGxUb3AgPCBoLzIxKjIwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSoyMCAmJiBzY3JvbGxUb3AgPCBoLzIxKjIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID49IGgvMjEqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gc2Nyb2xsUGFnZShzY3JvbGwpIHtcbiAgICAgICAgc2Nyb2xsVG9wID0gLXNjcm9sbDtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoJGZvb3Rlci5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpLnJlbW92ZUNsYXNzKGRlc2NDbGFzc2VzVG9SZW1vdmUpO1xuICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzEyKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItZml4ZWQnKS5hZGRDbGFzcygnZm9vdGVyLWhpZGUnKTtcbiAgICAgICAgICAgICRsZWZ0VGV4dC5yZW1vdmVDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1oaWRlJykuYWRkQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LmFkZENsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMjQqMTUpIHtcbiAgICAgICAgICAgICRkb29yT3BlbmVyLnJlbW92ZUNsYXNzKCdiZWhpbmQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRkb29yT3BlbmVyLmFkZENsYXNzKCdiZWhpbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nyb2xsU3RhdGVzWzJdIC0gc2Nyb2xsVG9wIDwgZnJpZGdlSW5uZXJIZWlnaHQgKiAwLjA1KSB7XG4gICAgICAgICAgICAkKCcuZ2FtZScpLmZhZGVJbigpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcyhkZXNjQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lLnBhdXNlKCk7XG4gICAgICAgICAgICAkKCcuZ2FtZScpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ3dpdGgtZ2FtZScpO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBzY3JvbGxTdGF0ZXNbMV0pO1xuICAgIH1cbiAgICBcbiAgICB2YXIgbXlTY3JvbGw7XG4gICAgZnVuY3Rpb24gaW5pdE15U2Nyb2xsKCkge1xuICAgICAgICBteVNjcm9sbCA9IG5ldyB3aW5kb3cuSVNjcm9sbCgnI3dyYXBwZXInLCB7XG4gICAgICAgICAgICBwcm9iZVR5cGU6IDMsXG4gICAgICAgICAgICBtb3VzZVdoZWVsOiB0cnVlLFxuICAgICAgICAgICAgY2xpY2s6IHRydWUsXG4gICAgICAgICAgICAvLyBzY3JvbGxiYXJzOiB0cnVlLFxuICAgICAgICAgICAgLy8gaW50ZXJhY3RpdmVTY3JvbGxiYXJzOiB0cnVlLFxuICAgICAgICAgICAgLy8gZmFkZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBzaHJpbmtTY3JvbGxiYXJzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICAgICAgICBzY3JvbGxQYWdlKG15U2Nyb2xsLnkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGwnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGxFbmQnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgfVxuICAgIFxuICAgIC8vIHdpbmRvdy5sb2FkZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW5pdE15U2Nyb2xsKCk7XG4gICAgLy8gfTtcbiAgICBcbiAgICAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcubmF2LW1haW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtb3VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIGdhbWVcbiAgICB2YXIgZ2FtZTtcbiAgICBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleCA7XG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gICAgICAgIHZhciAkZ2FtZUZpZWxkQ2VsbCA9ICQoJy5nYW1lLWZpZWxkLWNlbGwnKS5yZW1vdmUoKSxcbiAgICAgICAgICAgICRnYW1lRmllbGQgPSAkKCcuZ2FtZS1maWVsZCcpLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIFxuICAgICAgICAkKCcuZ2FtZS1wb3B1cC1uZXh0IC5zb2NpYWwtdmsgc3ZnJykuY2xvbmUoKS5hcHBlbmRUbygnLmdhbWUtcG9wdXAtd2luIC5zb2NpYWwtdmsnKTtcbiAgICAgICAgJCgnLmdhbWUtcG9wdXAtbmV4dCAuc29jaWFsLWZiIHN2ZycpLmNsb25lKCkuYXBwZW5kVG8oJy5nYW1lLXBvcHVwLXdpbiAuc29jaWFsLWZiJyk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciAkY3VyckdhbWVGaWVsZENlbGwgPSAkZ2FtZUZpZWxkQ2VsbC5jbG9uZSgpO1xuICAgICAgICAgICAgaWYgKGkgJSA1ID09PSAwKSAkY3VyckdhbWVGaWVsZENlbGwuYWRkQ2xhc3MoJ2NvbC14cy1vZmZzZXQtMScpO1xuICAgICAgICAgICAgJGN1cnJHYW1lRmllbGRDZWxsLmNoaWxkcmVuKCcuZ2FtZS10aWxlJykuYWRkQ2xhc3MoJ2dhbWUtdGlsZS0nICsgaSk7XG4gICAgICAgICAgICAkZ2FtZUZpZWxkLmFwcGVuZCgkY3VyckdhbWVGaWVsZENlbGwpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2ltZy90aWxlLScgKyBpICsgJy5wbmcnO1xuICAgICAgICAgICAgaW1hZ2VzLnB1c2goaW1nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgVGlsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBvcHRpb25zLm51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuaW1nTnVtZXIgPSBvcHRpb25zLmltZ051bWVyO1xuICAgICAgICAgICAgdGhpcy4kZGl2ID0gJCgnLmdhbWUtdGlsZS0nICsgb3B0aW9ucy5udW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5pbWcgPSBpbWFnZXNbb3B0aW9ucy5pbWdOdW1lcl07XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lO1xuICAgICAgICAgICAgdGhpcy4kZGl2LmFwcGVuZCgkKHRoaXMuaW1nKS5jbG9uZSgpKTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzU29sdmVkIHx8IF90aGlzLmlzTG9ja2VkIHx8IF90aGlzLmlzT3BlbiB8fCAhX3RoaXMuZ2FtZS5zdGFydGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5vcGVuVGFsZSh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLnNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS51bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEdhbWUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAwO1xuICAgICAgICAgICAgdGhpcy5zb2x2ZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWVTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICAgICAgICAgIHRoaXMubG9ja2VkSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLmJhY2tJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25TdGFydCA9ICQoJy5zdGFydC1nYW1lJylcbiAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvblN0YXJ0LnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgJGdhbWVQb3B1cFN0YXJ0LmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3RhcnQgPSAkKCcucmVzdGFydC1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdW1lID0gJCgnLnJlc3VtZS1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uTmV4dCA9ICQoJy5uZXh0LWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGluZm9EaXYgPSBvcHRpb25zLiRpbmZvRGl2O1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zaG93RGVsYXkgPSAzMDAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZSA9ICQoJy5nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIgPSAkKCcuZ2FtZS10aW1lcicpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcyA9ICQoJy5nYW1lLWNsaWNrcycpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlID0gJCgnLmdhbWUtc2NvcmUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRleHQgPSAkKCcuZ2FtZS1zY29yZS10ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUb3RhbCA9ICQoJy5nYW1lLXNjb3JlLXRvdGFsJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lTGV2ZWwgPSAkKCcuZ2FtZS1sZXZlbCcpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRhc2sgPSAkKCcuZ2FtZS10YXNrJyk7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5uZXh0TGV2ZWwoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q291bnQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5zdGFydENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGltZSA9IE1hdGgucm91bmQoX3RoaXMudGltZU1heCAtIChEYXRlLm5vdygpIC0gX3RoaXMuc3RhcnRUaW1lKS8xMDAwKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZVRpbWVyLnRleHQoX3RoaXMudGltZSk7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRpbWUgPT09IDIwKSBfdGhpcy4kZ2FtZVRpbWVyLmFkZENsYXNzKCdyZWQtdGV4dCcpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZhaWxMZXZlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgICRnYW1lUG9wdXBSZXN1bWUuZmFkZUluKCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdW1lLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvblJlc3VtZS51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cFJlc3VtZS5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpIC0gKHRoaXMudGltZU1heCAtIHRoaXMudGltZSkgKiAxMDAwO1xuICAgICAgICAgICAgdGhpcy5zdGFydENvdW50KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICAgICAgdGlsZS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5uZXh0TGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRMZXZlbCh0aGlzLmxldmVsICsgMSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuaW5pdExldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiA1KSByZXR1cm47XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUxldmVsLnRleHQoJ9Cj0YDQvtCy0LXQvdGMICcgKyBsZXZlbCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzLnRleHQoMCk7XG4gICAgICAgICAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMzAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgOSwgMTAsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxODE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA3LCA5LCAxMCwgMTIsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxMjE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDEyMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDksIDEwLCAxMSwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSA0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSA5MTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZU1heCAtIDE7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIudGV4dCh0aGlzLnRpbWVNYXggLSAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWxlc1RvU29sdmU7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVycy5wdXNoKGkgJSAodGhpcy50YWxlc1RvU29sdmUvdGhpcy50aWxlc0luQ2hhaW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IHNodWZmbGUodGhpcy5udW1iZXJzKTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbGVzLnB1c2gobmV3IFRpbGUoe1xuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IF90aGlzLnRpbGVNYXBbaV0sXG4gICAgICAgICAgICAgICAgICAgIGltZ051bWVyOiBlbCxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogX3RoaXNcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrLnRleHQodGhpcy50aWxlc0luQ2hhaW4gKyAnICcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MudGV4dCh0aGlzLmNsaWNrcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xlYXJMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgICAgIGVsLiRkaXYucGFyZW50KCkudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRpbWVyLnJlbW92ZUNsYXNzKCdyZWQtdGV4dCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNvbXBsZXRlTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHNjb3JlID0gKHRoaXMudGltZVNjb3JlTWF4ICogdGhpcy50aW1lL3RoaXMudGltZU1heCArIHRoaXMuY2xpY2tTY29yZU1heCAvIHRoaXMuY2xpY2tzKSAqIHRoaXMubGV2ZWw7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IE1hdGguZmxvb3Ioc2NvcmUpO1xuICAgICAgICAgICAgdGhpcy5zY29yZVRvdGFsICs9IHRoaXMuc2NvcmVMZXZlbDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZS50ZXh0KHRoaXMuc2NvcmVMZXZlbCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUZXh0LnRleHQoZGVjbGluYXRvci5kZWNsaW5hdGUodGhpcy5zY29yZUxldmVsKSk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUb3RhbC50ZXh0KHRoaXMuc2NvcmVUb3RhbCk7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbCA8IDUpIHtcbiAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwTmV4dC5mYWRlSW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uTmV4dC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uTmV4dC51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICRnYW1lUG9wdXBOZXh0LmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cFdpbi5mYWRlSW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5mYWlsTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmxldmVsIC09IDE7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGV2ZWwoKTtcbiAgICAgICAgICAgICRnYW1lUG9wdXBSZXN0YXJ0LmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3RhcnQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b25SZXN0YXJ0LnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydC5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS53aW5MZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlTGV2ZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vcGVuVGFsZSA9IGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGltZ051bWVyID0gdGhpcy5vcGVuZWRbMF0uaW1nTnVtZXIsXG4gICAgICAgICAgICAgICAgICAgIGlzQmluZGVkVGFsZXMgPSB0aGlzLm9wZW5lZC5ldmVyeShmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLmltZ051bWVyID09PSBpbWdOdW1lcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQmluZGVkVGFsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3BlbmVkLmxlbmd0aCA+IHRoaXMudGlsZXNJbkNoYWluIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNvbHZlZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFsZXNUb1NvbHZlID09PSB0aGlzLnNvbHZlZCkgdGhpcy53aW5MZXZlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIGdhbWUgPSBuZXcgR2FtZSh7XG4gICAgICAgICAgICAkaW5mb0RpdjogJCgnLmRlc2MtZ2FtZSBkaXYnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW5pdEdhbWUoKTtcbiAgICAkKCcucHJlbG9hZC1pbWcsIC5wcmVsb2FkZXItcHJvZ3Jlc3MnKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcucHJlbG9hZGVyJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfSwgMTAwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIGF1ZGlvXG4gICAgdmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQmVjYXVzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQnJva2VuIFByb21pc2UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBEcmFnLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gTWVkcy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIE9uZSBPZiBBIEtpbmQubXAzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzWzBdO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyYWNrTGlzdCA9IG5ldyBUcmFja0xpc3QoKTtcbiAgICBcbiAgICAvLyBTZXR1cCB0aGUgcGxheWVyIHRvIGF1dG9wbGF5IHRoZSBuZXh0IHRyYWNrXG4gICAgdmFyIGEgPSB3aW5kb3cuYXVkaW9qcy5jcmVhdGVBbGwoe1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIHZhciBhdWRpbyA9IGFbMF07XG4gICAgYXVkaW8ubG9hZCh0cmFja0xpc3QuZmlyc3QoKSk7XG4gICAgZnVuY3Rpb24gc2hvd0J1dHRvbigpIHtcbiAgICAgICAgaWYgKGF1ZGlvLnBsYXlpbmcpIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHBsYXlQYXVzZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyICRwbGF5UGF1c2UgPSAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJyksXG4gICAgICAgICRwbGF5TmV4dCA9ICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpO1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dC1ob3ZlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHBsYXlOZXh0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkcGxheU5leHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9LCA0MDApO1xuICAgIH0pO1xuICAgICRyYWRpb011c2ljU29uZ1RleHQudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAkcGxheVBhdXNlLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5wbGF5UGF1c2UoKTtcbiAgICAgICAgc2hvd0J1dHRvbigpO1xuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgc2hvd0J1dHRvbigpO1xuICAgIH0pO1xufSk7XG59XG5cbnZhciBpbWFnZXNUb0xvYWQ7XG5mdW5jdGlvbiBsb2FkSW1hZ2Uoc3JjLCBudW1iZXIsIGxpc3QpIHtcbiAgICBsb2FkSW1hZ2UuY291bnRlciA9IGxvYWRJbWFnZS5jb3VudGVyIHx8IDA7XG4gICAgbG9hZEltYWdlLm1heCA9IGxvYWRJbWFnZS5tYXggfHwgbGlzdC5sZW5ndGggO1xuICAgIHZhciBpbWcgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHNyYztcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2FkSW1hZ2UuY291bnRlcisrO1xuICAgICAgICAkcHJlbG9hZGVyUHJvZ3Jlc3MuY3NzKHsnd2lkdGgnOiAoMTAwICogbG9hZEltYWdlLmNvdW50ZXIvbG9hZEltYWdlLm1heCkgKyAnJSd9KTtcbiAgICAgICAgaWYgKGxvYWRJbWFnZS5jb3VudGVyID09PSBsb2FkSW1hZ2UubWF4KSB7XG4gICAgICAgICAgICAkZnJpZGdlSW5uZXIuYXR0cignc3JjJywgaW1hZ2VzVG9Mb2FkWzBdKTtcbiAgICAgICAgICAgIGluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBpbWc7XG59XG5cbmZ1bmN0aW9uIHByZWxvYWQoKSB7XG4gICAgdmFyIHBvc3RmaXggPSAnJyxcbiAgICAgICAgZXh0ID0gJy5zdmcnLFxuICAgICAgICBpO1xuXG4gICAgaWYoIC9pUChhZHxvZHxob25lKXxBbmRyb2lkfEJsYWNrYmVycnl8V2luZG93cyBQaG9uZS9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIC8vIHBvc3RmaXggPSAnX2lwYWQyJztcbiAgICAgICAgcG9zdGZpeCA9ICdfdGFibGV0JztcbiAgICAgICAgZXh0ID0gJy5wbmcnO1xuICAgIH1cbiAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDwgNDAwKSB7XG4gICAgICAgIHBvc3RmaXggPSAnX21vYmlsZSc7XG4gICAgICAgIGV4dCA9ICcucG5nJztcbiAgICB9XG4gICAgaW1hZ2VzVG9Mb2FkID0gW1xuICAgICAgICAnLi9pbWcvZnJpZGdlX3dpdGhfcmFkaW8nICsgcG9zdGZpeCArICcucG5nJyxcbiAgICAgICAgJy4vaW1nL3F1ZXN0aW9uLnBuZycsXG4gICAgICAgICcuL2ltZy9ibGFuay5wbmcnLFxuICAgICAgICAnLi9pbWcvc2NyZWVuLnBuZycsXG4gICAgICAgICcuL2ltZy9uZXh0LnBuZycsXG4gICAgICAgICcuL2ltZy9uZXh0X2FjdGl2ZS5wbmcnLFxuICAgICAgICAnLi9pbWcvcGxheS5wbmcnLFxuICAgICAgICAnLi9pbWcvcGxheV9hY3RpdmUucG5nJ1xuICAgIF07XG4gICAgZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaW1hZ2VzVG9Mb2FkLnB1c2goJy4vaW1nL3RpbGUtJyArIGkgKyAnLnBuZycpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgMjI7IGkrKykge1xuICAgICAgICB2YXIgcHJlZml4ID0gaSA8IDEwID8gJzAnIDogJycsXG4gICAgICAgICAgICBwYXRoID0gJy4vaW1nL2Rvb3ItJyArIHByZWZpeCArIGkgKyBwb3N0Zml4ICsgZXh0O1xuICAgICAgICBpbWFnZXNUb0xvYWQucHVzaChwYXRoKTtcbiAgICAgICAgZG9vcnNJbWcucHVzaChwYXRoKTtcbiAgICB9XG4gICAgaW1hZ2VzVG9Mb2FkLmZvckVhY2gobG9hZEltYWdlKTtcbn1cbnByZWxvYWQoKTsiXX0=
