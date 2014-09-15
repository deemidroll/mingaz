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
        i;

    if( /iP(ad|od|hone)|Android|Blackberry|Windows Phone/i.test(window.navigator.userAgent)) {
        // postfix = '_ipad2';
        postfix = '_tablet';
    }
    if ($window.width() < 400) {
        postfix = '_mobile';
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
            path = './img/door-' + prefix + i + postfix + '.png';
        imagesToLoad.push(path);
        doorsImg.push(path);
    }
    imagesToLoad.forEach(loadImage);
}
preload();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gKHdpbmRvdy4kKTtcblxuJCh3aW5kb3cpLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xudmFyICRwcmVsb2FkZXJQcm9ncmVzcyA9ICQoJy5wcmVsb2FkZXItcHJvZ3Jlc3MnKSxcbiAgICAkZnJpZGdlSW5uZXIgPSAkKCcuZnJpZGdlLWlubmVyJyksXG4gICAgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICBkb29yc0ltZyA9IFtdO1xuICAgIFxuZnVuY3Rpb24gRGVjbGluYXRvcihmb3Jtcykge1xuICAgIHRoaXMuZGVjbGluYXRlID0gZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICB2YXIgY2FzZXMgPSBbMiwgMCwgMSwgMSwgMSwgMl07XG4gICAgICAgIHJldHVybiBmb3Jtc1sgKG51bWJlciUxMDA+NCAmJiBudW1iZXIlMTAwPDIwKT8gMiA6IGNhc2VzWyhudW1iZXIlMTA8NSk/bnVtYmVyJTEwOjVdIF07XG4gICAgfTtcbn1cbnZhciBkZWNsaW5hdG9yID0gbmV3IERlY2xpbmF0b3IoWyfQvtGH0LrQvicsICfQvtGH0LrQsCcsICfQvtGH0LrQvtCyJ10pO1xuXG5mdW5jdGlvbiBpbml0UGFnZSgpIHtcbiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd2l0aERlc2MgPSAkKCcud2l0aC1kZXNjJyksXG4gICAgICAgICRmb290ZXIgPSAkKCcuZm9vdGVyJyksXG4gICAgICAgICRmcmlkZ2UgPSAkKCcuZnJpZGdlLWRvb3InKSxcbiAgICAgICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICAgICAkbGVmdFRleHQgPSAkKCcubGVmdC10ZXh0JyksXG4gICAgICAgICRyYWRpbyA9ICQoJy5yYWRpby1jb250JyksXG4gICAgICAgICRyYWRpb011c2ljU29uZyA9ICQoJy5yYWRpby1tdXNpYy1zb25nLWhvdmVyJyksXG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQgPSAkKCcucmFkaW8tbXVzaWMtc29uZy10ZXh0JyksXG4gICAgICAgICRkb29yT3BlbmVyID0gJCgnLmRvb3Itb3BlbmVyJyksXG4gICAgICAgICRnYW1lUG9wdXBTdGFydCA9ICQoJy5nYW1lLXBvcHVwLXN0YXJ0Jykuc2hvdygpLFxuICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydCA9ICQoJy5nYW1lLXBvcHVwLXJlc3RhcnQnKSxcbiAgICAgICAgJGdhbWVQb3B1cFJlc3VtZSA9ICQoJy5nYW1lLXBvcHVwLXJlc3VtZScpLFxuICAgICAgICAkZ2FtZVBvcHVwTmV4dD0gJCgnLmdhbWUtcG9wdXAtbmV4dCcpLFxuICAgICAgICAkZ2FtZVBvcHVwV2luID0gJCgnLmdhbWUtcG9wdXAtd2luJyksXG4gICAgICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gICAgdmFyIGhlaWdodCxcbiAgICAgICAgZnJpZGdlSW5uZXJIZWlnaHQsXG4gICAgICAgIHNjcm9sbFN0YXRlcyxcbiAgICAgICAgc2Nyb2xsVG9wO1xuICAgIFxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgdmFyIHJhZGlvSGVpZ2h0ID0gJHJhZGlvWzBdLmNsaWVudFdpZHRoICogMTI0LzEwODAgKyAyMCxcbiAgICAgICAgICAgIHBlcmNlbnQgPSAwLjU0LFxuICAgICAgICAgICAgZ2FtZVRvcCA9IHJhZGlvSGVpZ2h0ICsgJGZyaWRnZUlubmVyWzBdLmNsaWVudFdpZHRoICogJGZyaWRnZUlubmVyLmF0dHIoJ2hlaWdodCcpLyRmcmlkZ2VJbm5lci5hdHRyKCd3aWR0aCcpICogcGVyY2VudDtcbiAgICAgICAgICAgIFxuICAgICAgICBmcmlkZ2VJbm5lckhlaWdodCA9IHBhcnNlSW50KCRmcmlkZ2VJbm5lci5jc3MoJ2hlaWdodCcpLCAxMCkgLSAyMDtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoJGZvb3Rlci5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgIHNjcm9sbFN0YXRlcyA9IFswLCByYWRpb0hlaWdodCwgTWF0aC5taW4oZ2FtZVRvcCwgZnJpZGdlSW5uZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpXTtcbiAgICAgICAgJHBhZ2UuY3NzKCdoZWlnaHQnLCBNYXRoLm1pbihnYW1lVG9wICsgd2luZG93LmlubmVySGVpZ2h0LCBmcmlkZ2VJbm5lckhlaWdodCkpO1xuICAgIH1cbiAgICByZXNpemUoKTtcbiAgICAkd2luZG93Lm9uKCdyZXNpemUnLCByZXNpemUpO1xuXG4gICAgZnVuY3Rpb24gbG9hZERvb3JJbWFnZXMoKSB7XG4gICAgICAgIGRvb3JzSW1nLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IGVsO1xuICAgICAgICAgICAgJGZyaWRnZS5hcHBlbmQoJChpbWcpLmFkZENsYXNzKCdmcmlkZ2UtdG9wLWltZyBkb29yLScgKyBpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkRG9vckltYWdlcygpO1xuICAgIFxuICAgIGZ1bmN0aW9uIHByZXBhcmVDbGFzc2VzVG9SZW1vdmUobmFtZSwgbikge1xuICAgICAgICB2YXIgY2xhc3Nlc1RvUmVtb3ZlID0gJyc7XG4gICAgICAgIG4gPSBuICsgMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNsYXNzZXNUb1JlbW92ZSArPSBuYW1lICsgaSArICcgJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xhc3Nlc1RvUmVtb3ZlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgdmFyIGRlc2NDbGFzc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKCd3aXRoLWRlc2MtJywgNik7XG4gICAgdmFyIGZyaWRnZUNsYXNzZXNUb1JlbW92ZSA9IHByZXBhcmVDbGFzc2VzVG9SZW1vdmUoJ29wZW4tJywgMjMpO1xuICAgIFxuICAgICR3aXRoRGVzYy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICAkKHRoaXMpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMjEqMTgpIHJldHVybjtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQpLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgJ2F1dG8nKS5yZW1vdmVDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yMSoxOCkgcmV0dXJuO1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsIGhlaWdodCkucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJHJhZGlvTXVzaWNTb25nLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC5hZGRDbGFzcygnYW5pbWF0ZS1zY3JvbGwnKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yMSAmJiBzY3JvbGxUb3AgPCBoLzIxKjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMiAmJiBzY3JvbGxUb3AgPCBoLzIxKjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqMyAmJiBzY3JvbGxUb3AgPCBoLzIxKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNCAmJiBzY3JvbGxUb3AgPCBoLzIxKjUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNSAmJiBzY3JvbGxUb3AgPCBoLzIxKjYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNiAmJiBzY3JvbGxUb3AgPCBoLzIxKjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqNyAmJiBzY3JvbGxUb3AgPCBoLzIxKjgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOCAmJiBzY3JvbGxUb3AgPCBoLzIxKjkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjEqOSAmJiBzY3JvbGxUb3AgPCBoLzIxKjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEwICYmIHNjcm9sbFRvcCA8IGgvMjEqMTEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjExICYmIHNjcm9sbFRvcCA8IGgvMjEqMTIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEyICYmIHNjcm9sbFRvcCA8IGgvMjEqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjEzICYmIHNjcm9sbFRvcCA8IGgvMjEqMTQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE0ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE1ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE2ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE3ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE4ICYmIHNjcm9sbFRvcCA8IGgvMjEqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjE5ICYmIHNjcm9sbFRvcCA8IGgvMjEqMjApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzIxKjIwICYmIHNjcm9sbFRvcCA8IGgvMjEqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPj0gaC8yMSoyMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIxJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKHNjcm9sbCkge1xuICAgICAgICBzY3JvbGxUb3AgPSAtc2Nyb2xsO1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsICdhdXRvJykucmVtb3ZlQ2xhc3MoZGVzY0NsYXNzZXNUb1JlbW92ZSk7XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMTIpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8IHNjcm9sbFN0YXRlc1sxXS8yNCoxNSkge1xuICAgICAgICAgICAgJGRvb3JPcGVuZXIucmVtb3ZlQ2xhc3MoJ2JlaGluZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGRvb3JPcGVuZXIuYWRkQ2xhc3MoJ2JlaGluZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxTdGF0ZXNbMl0gLSBzY3JvbGxUb3AgPCBmcmlkZ2VJbm5lckhlaWdodCAqIDAuMDUpIHtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKGRlc2NDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdhbWUucGF1c2UoKTtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIHNjcm9sbFN0YXRlc1sxXSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBteVNjcm9sbDtcbiAgICBmdW5jdGlvbiBpbml0TXlTY3JvbGwoKSB7XG4gICAgICAgIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHtcbiAgICAgICAgICAgIHByb2JlVHlwZTogMyxcbiAgICAgICAgICAgIG1vdXNlV2hlZWw6IHRydWUsXG4gICAgICAgICAgICBjbGljazogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBpbnRlcmFjdGl2ZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBmYWRlU2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHNocmlua1Njcm9sbGJhcnM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgICAgICAgIHNjcm9sbFBhZ2UobXlTY3JvbGwueSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbEVuZCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gd2luZG93LmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpbml0TXlTY3JvbGwoKTtcbiAgICAvLyB9O1xuICAgIFxuICAgICRkb2N1bWVudC5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5uYXYtbWFpbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1swXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1vdXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMV0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtZ2FtZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1syXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gZ2FtZVxuICAgIHZhciBnYW1lO1xuICAgIGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4IDtcbiAgICAgICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICAgICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAgICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIHZhciBpbWFnZXMgPSBbXTtcbiAgICBmdW5jdGlvbiBpbml0R2FtZSgpIHtcbiAgICAgICAgdmFyICRnYW1lRmllbGRDZWxsID0gJCgnLmdhbWUtZmllbGQtY2VsbCcpLnJlbW92ZSgpLFxuICAgICAgICAgICAgJGdhbWVGaWVsZCA9ICQoJy5nYW1lLWZpZWxkJyksXG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgXG4gICAgICAgICQoJy5nYW1lLXBvcHVwLW5leHQgLnNvY2lhbC12ayBzdmcnKS5jbG9uZSgpLmFwcGVuZFRvKCcuZ2FtZS1wb3B1cC13aW4gLnNvY2lhbC12aycpO1xuICAgICAgICAkKCcuZ2FtZS1wb3B1cC1uZXh0IC5zb2NpYWwtZmIgc3ZnJykuY2xvbmUoKS5hcHBlbmRUbygnLmdhbWUtcG9wdXAtd2luIC5zb2NpYWwtZmInKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgdmFyICRjdXJyR2FtZUZpZWxkQ2VsbCA9ICRnYW1lRmllbGRDZWxsLmNsb25lKCk7XG4gICAgICAgICAgICBpZiAoaSAlIDUgPT09IDApICRjdXJyR2FtZUZpZWxkQ2VsbC5hZGRDbGFzcygnY29sLXhzLW9mZnNldC0xJyk7XG4gICAgICAgICAgICAkY3VyckdhbWVGaWVsZENlbGwuY2hpbGRyZW4oJy5nYW1lLXRpbGUnKS5hZGRDbGFzcygnZ2FtZS10aWxlLScgKyBpKTtcbiAgICAgICAgICAgICRnYW1lRmllbGQuYXBwZW5kKCRjdXJyR2FtZUZpZWxkQ2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vaW1nL3RpbGUtJyArIGkgKyAnLnBuZyc7XG4gICAgICAgICAgICBpbWFnZXMucHVzaChpbWcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBUaWxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm51bWJlciA9IG9wdGlvbnMubnVtYmVyO1xuICAgICAgICAgICAgdGhpcy5pbWdOdW1lciA9IG9wdGlvbnMuaW1nTnVtZXI7XG4gICAgICAgICAgICB0aGlzLiRkaXYgPSAkKCcuZ2FtZS10aWxlLScgKyBvcHRpb25zLm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLmltZyA9IGltYWdlc1tvcHRpb25zLmltZ051bWVyXTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzU29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYuYXBwZW5kKCQodGhpcy5pbWcpLmNsb25lKCkpO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNTb2x2ZWQgfHwgX3RoaXMuaXNMb2NrZWQgfHwgX3RoaXMuaXNPcGVuIHx8ICFfdGhpcy5nYW1lLnN0YXJ0ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9ja2VkJyk7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5nYW1lLm9wZW5UYWxlKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUuc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzU29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkuYWRkQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLnVubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9ja2VkJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgR2FtZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNvbHZlZCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZVRvdGFsID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZVNjb3JlTWF4ID0gOTAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja1Njb3JlTWF4ID0gOTAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3NUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICAgICAgdGhpcy5sb2NrZWRJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuYmFja0ltZyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblN0YXJ0ID0gJCgnLnN0YXJ0LWdhbWUnKVxuICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uU3RhcnQudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwU3RhcnQuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uUmVzdGFydCA9ICQoJy5yZXN0YXJ0LWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25SZXN1bWUgPSAkKCcucmVzdW1lLWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25OZXh0ID0gJCgnLm5leHQtZ2FtZScpO1xuICAgICAgICAgICAgdGhpcy4kaW5mb0RpdiA9IG9wdGlvbnMuJGluZm9EaXY7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLnNob3dEZWxheSA9IDMwMDA7XG4gICAgICAgICAgICB0aGlzLiRnYW1lID0gJCgnLmdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lciA9ICQoJy5nYW1lLXRpbWVyJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzID0gJCgnLmdhbWUtY2xpY2tzJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUgPSAkKCcuZ2FtZS1zY29yZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVGV4dCA9ICQoJy5nYW1lLXNjb3JlLXRleHQnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRvdGFsID0gJCgnLmdhbWUtc2NvcmUtdG90YWwnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbCA9ICQoJy5nYW1lLWxldmVsJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGFzayA9ICQoJy5nYW1lLXRhc2snKTtcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydGVkKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm5leHRMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb3VudCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnN0YXJ0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50aW1lID0gTWF0aC5yb3VuZChfdGhpcy50aW1lTWF4IC0gKERhdGUubm93KCkgLSBfdGhpcy5zdGFydFRpbWUpLzEwMDApO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lVGltZXIudGV4dChfdGhpcy50aW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGltZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWlsTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydGVkKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdW1lLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvblJlc3VtZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b25SZXN1bWUudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBSZXN1bWUuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKSAtICh0aGlzLnRpbWVNYXggLSB0aGlzLnRpbWUpICogMTAwMDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb3VudCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgICAgIHRpbGUuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUubmV4dExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pbml0TGV2ZWwodGhpcy5sZXZlbCArIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmluaXRMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID4gNSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbC50ZXh0KCfQo9GA0L7QstC10L3RjCAnICsgbGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcy50ZXh0KDApO1xuICAgICAgICAgICAgc3dpdGNoKGxldmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDMwMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlTWFwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDksIDEwLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTgxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNywgOSwgMTAsIDEyLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTIxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxODtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxMjE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA4LCA5LCAxMCwgMTEsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gOTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZU1hcCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWVNYXggLSAxO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRpbWVyLnRleHQodGhpcy50aW1lTWF4IC0gMSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFsZXNUb1NvbHZlOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlcnMucHVzaChpICUgKHRoaXMudGFsZXNUb1NvbHZlL3RoaXMudGlsZXNJbkNoYWluKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBzaHVmZmxlKHRoaXMubnVtYmVycyk7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50aWxlcy5wdXNoKG5ldyBUaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBfdGhpcy50aWxlTWFwW2ldLFxuICAgICAgICAgICAgICAgICAgICBpbWdOdW1lcjogZWwsXG4gICAgICAgICAgICAgICAgICAgIGdhbWU6IF90aGlzXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGFzay50ZXh0KHRoaXMudGlsZXNJbkNoYWluICsgJyAnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzICs9IDE7XG4gICAgICAgICAgICB0aGlzLmNsaWNrc1RvdGFsICs9IDE7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzLnRleHQodGhpcy5jbGlja3MpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsZWFyTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNvbHZlZCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGVsLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LnBhcmVudCgpLnVuYmluZCgnY2xpY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jb21wbGV0ZUxldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgICAgICBzY29yZSA9ICh0aGlzLnRpbWVTY29yZU1heCAqIHRoaXMudGltZS90aGlzLnRpbWVNYXggKyB0aGlzLmNsaWNrU2NvcmVNYXggLyB0aGlzLmNsaWNrcykgKiB0aGlzLmxldmVsO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSBNYXRoLmZsb29yKHNjb3JlKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCArPSB0aGlzLnNjb3JlTGV2ZWw7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUudGV4dCh0aGlzLnNjb3JlTGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVGV4dC50ZXh0KGRlY2xpbmF0b3IuZGVjbGluYXRlKHRoaXMuc2NvcmVMZXZlbCkpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwudGV4dCh0aGlzLnNjb3JlVG90YWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgPCA1KSB7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cE5leHQuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbk5leHQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvbk5leHQudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAkZ2FtZVBvcHVwTmV4dC5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRnYW1lUG9wdXBXaW4uZmFkZUluKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuZmFpbExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCAtPSAxO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICAkZ2FtZVBvcHVwUmVzdGFydC5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b25SZXN0YXJ0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRnYW1lQnV0dG9uUmVzdGFydC51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgJGdhbWVQb3B1cFJlc3RhcnQuZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUud2luTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUxldmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3BlblRhbGUgPSBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLnB1c2godGlsZSk7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW1lciA9IHRoaXMub3BlbmVkWzBdLmltZ051bWVyLFxuICAgICAgICAgICAgICAgICAgICBpc0JpbmRlZFRhbGVzID0gdGhpcy5vcGVuZWQuZXZlcnkoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5pbWdOdW1lciA9PT0gaW1nTnVtZXI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JpbmRlZFRhbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiB0aGlzLnRpbGVzSW5DaGFpbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb2x2ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhbGVzVG9Tb2x2ZSA9PT0gdGhpcy5zb2x2ZWQpIHRoaXMud2luTGV2ZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBnYW1lID0gbmV3IEdhbWUoe1xuICAgICAgICAgICAgJGluZm9EaXY6ICQoJy5kZXNjLWdhbWUgZGl2JylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGluaXRHYW1lKCk7XG4gICAgJCgnLnByZWxvYWQtaW1nLCAucHJlbG9hZGVyLXByb2dyZXNzJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLnByZWxvYWRlcicpLmFuaW1hdGUoe1xuICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuZmFkZU91dCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBhdWRpb1xuICAgIHZhciBUcmFja0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHJhY2tzID0gW1xuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIEJlY2F1c2UgSSBXYW50IFlvdS5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIEJyb2tlbiBQcm9taXNlLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gRHJhZy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIE1lZHMubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBPbmUgT2YgQSBLaW5kLm1wMydcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayArPSAxO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2sgPiB0aGlzLnRyYWNrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzW3RoaXMuY3VycmVudFRyYWNrXTtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1swXTtcbiAgICB9O1xuICAgIFxuICAgIHZhciB0cmFja0xpc3QgPSBuZXcgVHJhY2tMaXN0KCk7XG4gICAgXG4gICAgLy8gU2V0dXAgdGhlIHBsYXllciB0byBhdXRvcGxheSB0aGUgbmV4dCB0cmFja1xuICAgIHZhciBhID0gd2luZG93LmF1ZGlvanMuY3JlYXRlQWxsKHtcbiAgICAgICAgdHJhY2tFbmRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiB0aGUgZmlyc3QgdHJhY2tcbiAgICB2YXIgYXVkaW8gPSBhWzBdO1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgIGZ1bmN0aW9uIHNob3dCdXR0b24oKSB7XG4gICAgICAgIGlmIChhdWRpby5wbGF5aW5nKSB7XG4gICAgICAgICAgICAkcGxheVBhdXNlLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciAkcGxheVBhdXNlID0gJCgnLnJhZGlvLW11c2ljLWJ0bi1wYXVzZScpLFxuICAgICAgICAkcGxheU5leHQgPSAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQtaG92ZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRwbGF5TmV4dC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHBsYXlOZXh0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSwgNDAwKTtcbiAgICB9KTtcbiAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgJHBsYXlQYXVzZS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIGEgdHJhY2sgb24gY2xpY2tcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbn0pO1xufVxuXG52YXIgaW1hZ2VzVG9Mb2FkO1xuZnVuY3Rpb24gbG9hZEltYWdlKHNyYywgbnVtYmVyLCBsaXN0KSB7XG4gICAgbG9hZEltYWdlLmNvdW50ZXIgPSBsb2FkSW1hZ2UuY291bnRlciB8fCAwO1xuICAgIGxvYWRJbWFnZS5tYXggPSBsb2FkSW1hZ2UubWF4IHx8IGxpc3QubGVuZ3RoIDtcbiAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9hZEltYWdlLmNvdW50ZXIrKztcbiAgICAgICAgJHByZWxvYWRlclByb2dyZXNzLmNzcyh7J3dpZHRoJzogKDEwMCAqIGxvYWRJbWFnZS5jb3VudGVyL2xvYWRJbWFnZS5tYXgpICsgJyUnfSk7XG4gICAgICAgIGlmIChsb2FkSW1hZ2UuY291bnRlciA9PT0gbG9hZEltYWdlLm1heCkge1xuICAgICAgICAgICAgJGZyaWRnZUlubmVyLmF0dHIoJ3NyYycsIGltYWdlc1RvTG9hZFswXSk7XG4gICAgICAgICAgICBpbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gaW1nO1xufVxuXG5mdW5jdGlvbiBwcmVsb2FkKCkge1xuICAgIHZhciBwb3N0Zml4ID0gJycsXG4gICAgICAgIGk7XG5cbiAgICBpZiggL2lQKGFkfG9kfGhvbmUpfEFuZHJvaWR8QmxhY2tiZXJyeXxXaW5kb3dzIFBob25lL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgLy8gcG9zdGZpeCA9ICdfaXBhZDInO1xuICAgICAgICBwb3N0Zml4ID0gJ190YWJsZXQnO1xuICAgIH1cbiAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDwgNDAwKSB7XG4gICAgICAgIHBvc3RmaXggPSAnX21vYmlsZSc7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZCA9IFtcbiAgICAgICAgJy4vaW1nL2ZyaWRnZV93aXRoX3JhZGlvJyArIHBvc3RmaXggKyAnLnBuZycsXG4gICAgICAgICcuL2ltZy9xdWVzdGlvbi5wbmcnLFxuICAgICAgICAnLi9pbWcvYmxhbmsucG5nJyxcbiAgICAgICAgJy4vaW1nL3NjcmVlbi5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dC5wbmcnLFxuICAgICAgICAnLi9pbWcvbmV4dF9hY3RpdmUucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXkucG5nJyxcbiAgICAgICAgJy4vaW1nL3BsYXlfYWN0aXZlLnBuZydcbiAgICBdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGltYWdlc1RvTG9hZC5wdXNoKCcuL2ltZy90aWxlLScgKyBpICsgJy5wbmcnKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IDIyOyBpKyspIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IGkgPCAxMCA/ICcwJyA6ICcnLFxuICAgICAgICAgICAgcGF0aCA9ICcuL2ltZy9kb29yLScgKyBwcmVmaXggKyBpICsgcG9zdGZpeCArICcucG5nJztcbiAgICAgICAgaW1hZ2VzVG9Mb2FkLnB1c2gocGF0aCk7XG4gICAgICAgIGRvb3JzSW1nLnB1c2gocGF0aCk7XG4gICAgfVxuICAgIGltYWdlc1RvTG9hZC5mb3JFYWNoKGxvYWRJbWFnZSk7XG59XG5wcmVsb2FkKCk7Il19
