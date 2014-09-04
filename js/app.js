(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);

$(function () {
    var $withDesc = $('.with-desc'),
        $footer = $('.footer'),
        $fridge = $('.fridge-door'),
        $fridgeInner = $('.fridge-inner'),
        $page = $('.page'),
        $leftText = $('.left-text'),
        $radio = $('.radio'),
        $radioMusicSong = $('.radio-music-song-hover'),
        $radioMusicSongText = $('.radio-music-song-text'),
        $window = $(window),
        $document = $(document);
    
    var height,
        scrollStates,
        scrollTop;
    
    function resize() {
        var radioHeight = $radio[0].clientWidth * 124/1080 + 20,
            // percent = 0.44;
            percent = 0.54;
        height = parseInt($footer.css('height'), 10);
        scrollStates = [0, radioHeight, radioHeight + $fridgeInner[0].clientWidth * $fridgeInner.attr('height')/$fridgeInner.attr('width') * percent];
        $page.css('height', scrollStates[2] + window.innerHeight);
    }
    resize();
    $window.on('resize', resize);

    // var loadImageCounter = 0;
    // function loadImage(src) {
    //     var img = new window.Image();
    //     img.src = src;
    //     img.onload = function () {
    //         loadImageCounter++;
    //     };
    //     return img;
    // }

    function loadDoorImages() {
    //     var postfix = '',
    //         numbers = ['00','05','05','10','10','15','15','20','20','25','25','30','30','35','35','40','40','45','45','50','50','55','55','60'];
    //     if( /iP(ad|od|hone)|Android|Blackberry|Windows Phone/i.test(window.navigator.userAgent)) {
    //         postfix = '_ipad2';
    //     }
    //     // numbers.forEach(function (el, i) {
    //     //     var pstfx = i === 0 ? '' : postfix;
    //     //     var img = loadImage('./img/door_' + el + pstfx + '.png');
    //     //     $fridge.append($(img).addClass('fridge-top-img door-' + i));
    //     // });
    }
    loadDoorImages();
    
    $withDesc.each(function (i) {
        $(this).hover(function () {
            if (scrollTop < scrollStates[1]/24*15) return;
            $footer.addClass('with-desc-' + (i + 1));
        }, function () {
            $footer.removeClass('with-desc-' + (i + 1));
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
            case (scrollTop <= h/24):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-0');
                $('.Dver_1').show();
            break;
            case (scrollTop > h/24 && scrollTop < h/24*2):
                $('.Dver_1').hide();
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-1');
            break;
            case (scrollTop > h/24*2 && scrollTop < h/24*3):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-2');
            break;
            case (scrollTop > h/24*3 && scrollTop < h/24*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-3');
            break;
            case (scrollTop > h/24*4 && scrollTop < h/24*5):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-4');
            break;
            case (scrollTop > h/24*5 && scrollTop < h/24*6):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-5');
            break;
            case (scrollTop > h/24*6 && scrollTop < h/24*7):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-6');
            break;
            case (scrollTop > h/24*7 && scrollTop < h/24*8):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-7');
            break;
            case (scrollTop > h/24*8 && scrollTop < h/24*9):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-8');
            break;
            case (scrollTop > h/24*9 && scrollTop < h/24*10):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-9');
            break;
            case (scrollTop > h/24*10 && scrollTop < h/24*11):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-10');
            break;
            case (scrollTop > h/24*11 && scrollTop < h/24*12):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-11');
            break;
            case (scrollTop > h/24*12 && scrollTop < h/24*13):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-12');
            break;
            case (scrollTop > h/24*13 && scrollTop < h/24*14):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-13');
            break;
            case (scrollTop > h/24*14 && scrollTop < h/24*15):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-14');
            break;
            case (scrollTop > h/24*15 && scrollTop < h/24*16):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-15');
            break;
            case (scrollTop > h/24*16 && scrollTop < h/24*17):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-16');
            break;
            case (scrollTop > h/24*17 && scrollTop < h/24*18):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-17');
            break;
            case (scrollTop > h/24*18 && scrollTop < h/24*19):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-18');
            break;
            case (scrollTop > h/24*19 && scrollTop < h/24*20):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-19');
            break;
            case (scrollTop > h/24*20 && scrollTop < h/24*21):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-20');
            break;
            case (scrollTop > h/24*21 && scrollTop < h/24*22):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-21');
            break;
            case (scrollTop > h/24*22 && scrollTop < h/24*23):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-22');
            break;
            case (scrollTop > h/24*23*4 && scrollTop < h/24*24*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-23');
            break;
            case (scrollTop < h/24*24*4 && scrollTop < h/24*25*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-22');
            break;
            case (scrollTop > h/24*25*4 && scrollTop < h/24*26*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-21');
            break;
            case (scrollTop > h/24*26*4 && scrollTop < h/24*27*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-20');
            break;
            case (scrollTop > h/24*27*4 && scrollTop < h/24*28*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-19');
            break;
            case (scrollTop > h/24*28*4 && scrollTop < h/24*29*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-18');
            break;
            case (scrollTop > h/24*29*4 && scrollTop < h/24*30*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-17');
            break;
            case (scrollTop > h/24*30*4 && scrollTop < h/24*31*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-16');
            break;
            case (scrollTop > h/24*31*4 && scrollTop < h/24*32*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-15');
            break;
            case (scrollTop > h/24*32*4 && scrollTop < h/24*33*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-14');
            break;
            case (scrollTop > h/24*33*4 && scrollTop < h/24*34*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-13');
            break;
            case (scrollTop > h/24*34*4 && scrollTop < h/24*35*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-12');
            break;
            case (scrollTop > h/24*35*4 && scrollTop < h/24*36*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-11');
            break;
            case (scrollTop > h/24*36*4 && scrollTop < h/24*37*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-10');
            break;
            case (scrollTop > h/24*37*4 && scrollTop < h/24*38*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-9');
            break;
            case (scrollTop > h/24*38*4 && scrollTop < h/24*39*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-8');
            break;
            case (scrollTop > h/24*39*4 && scrollTop < h/24*40*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-7');
            break;
            case (scrollTop > h/24*40*4 && scrollTop < h/24*41*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-6');
            break;
            case (scrollTop > h/24*41*4 && scrollTop < h/24*42*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-5');
            break;
            case (scrollTop > h/24*42*4 && scrollTop < h/24*43*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-4');
            break;
            case (scrollTop > h/24*43*4 && scrollTop < h/24*44*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-3');
            break;
            case (scrollTop > h/24*44*4 && scrollTop < h/24*45*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-2');
            break;
            case (scrollTop > h/24*45*4 && scrollTop < h/24*46*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-1');
            break;
            case (scrollTop > h/24*46*4):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-0');
            break;
        }
    }
    
    function scrollPage(scroll) {
        scrollTop = -scroll;
        if (scrollTop < scrollStates[1]/12) {
            $footer.removeClass('footer-fixed').addClass('footer-hide');
            $leftText.removeClass('left-text-visible');
        } else {
            $footer.removeClass('footer-hide').addClass('footer-fixed');
            $leftText.addClass('left-text-visible');
        }
        if (scrollStates[2] - scrollTop < 30) {
            $('.game').fadeIn();
            $footer.removeClass(descClasseToRemove).addClass('with-game');
        } else {
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
            scrollbars: true,
            interactiveScrollbars: true,
            fadeScrollbars: true,
            shrinkScrollbars: true
        });
    
        function updatePosition () {
            scrollPage(myScroll.y);
        }
    
        myScroll.on('scroll', updatePosition);
        myScroll.on('scrollEnd', updatePosition);
    }
    
    window.loaded = function () {
        initMyScroll();
    };
    
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
            this.$div.parent().fadeIn();
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
                if (_this.time === 0) {
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
            this.$gameLevel.text('Уровень ' + level);
            this.$gameClicks.text(0);
            switch(level) {
                case 1:
                    this.talesToSolve = 12;
                    this.tilesInChain = 2;
                    this.timeMax = 301;
                break;
                case 2:
                    this.talesToSolve = 16;
                    this.tilesInChain = 2;
                    this.timeMax = 181;
                break;
                case 3:
                    this.talesToSolve = 20;
                    this.tilesInChain = 2;
                    this.timeMax = 181;
                break;
                case 4:
                    this.talesToSolve = 18;
                    this.tilesInChain = 3;
                    this.timeMax = 121;
                break;
                case 5:
                    this.talesToSolve = 20;
                    this.tilesInChain = 4;
                    this.timeMax = 61;
                break;
            }
            this.$gameTimer.text(this.timeMax - 1);
            for (var i = 0; i < this.talesToSolve; i++) {
                this.numbers.push(i % (this.talesToSolve/this.tilesInChain));
            }
            for (i = this.talesToSolve; i < 20; i++) {
                $('.game-tile-' + i).parent().addClass('locked');
            }
            this.numbers = shuffle(this.numbers);
            this.numbers.forEach(function (el, i) {
                _this.tiles.push(new Tile({
                    number: i,
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
                el.$div.parent().removeClass('active').fadeOut();
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
                        _this.opened = [];
                    }, 500);
                } else if (this.opened.length > this.tilesInChain - 1) {
                    this.opened.forEach(function (el) {
                        el.solve();
                        _this.solved += 1;
                    });
                    this.opened = [];
                }
                if (this.talesToSolve === this.solved) this.winLevel();
            }
            return this;
        };
        new Game({
            $infoDiv: $('.desc-game div')
        });
    }
    function loadImages(callback) {
        var counter = 0;
        function count() {
            counter++;
            if (counter === 9) {
                callback();
            }
        }
        for (var i = 0; i < 10; i++) {
            var img = new window.Image();
            img.src = './img/tile-' + i + '.jpg';
            img.onload = count;
            images.push(img);
        }
    }
    loadImages(initGame);

});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQgPSAod2luZG93LiQpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpdGhEZXNjID0gJCgnLndpdGgtZGVzYycpLFxuICAgICAgICAkZm9vdGVyID0gJCgnLmZvb3RlcicpLFxuICAgICAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS1kb29yJyksXG4gICAgICAgICRmcmlkZ2VJbm5lciA9ICQoJy5mcmlkZ2UtaW5uZXInKSxcbiAgICAgICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICAgICAkbGVmdFRleHQgPSAkKCcubGVmdC10ZXh0JyksXG4gICAgICAgICRyYWRpbyA9ICQoJy5yYWRpbycpLFxuICAgICAgICAkcmFkaW9NdXNpY1NvbmcgPSAkKCcucmFkaW8tbXVzaWMtc29uZy1ob3ZlcicpLFxuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0ID0gJCgnLnJhZGlvLW11c2ljLXNvbmctdGV4dCcpLFxuICAgICAgICAkd2luZG93ID0gJCh3aW5kb3cpLFxuICAgICAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbiAgICBcbiAgICB2YXIgaGVpZ2h0LFxuICAgICAgICBzY3JvbGxTdGF0ZXMsXG4gICAgICAgIHNjcm9sbFRvcDtcbiAgICBcbiAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIHZhciByYWRpb0hlaWdodCA9ICRyYWRpb1swXS5jbGllbnRXaWR0aCAqIDEyNC8xMDgwICsgMjAsXG4gICAgICAgICAgICAvLyBwZXJjZW50ID0gMC40NDtcbiAgICAgICAgICAgIHBlcmNlbnQgPSAwLjU0O1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgc2Nyb2xsU3RhdGVzID0gWzAsIHJhZGlvSGVpZ2h0LCByYWRpb0hlaWdodCArICRmcmlkZ2VJbm5lclswXS5jbGllbnRXaWR0aCAqICRmcmlkZ2VJbm5lci5hdHRyKCdoZWlnaHQnKS8kZnJpZGdlSW5uZXIuYXR0cignd2lkdGgnKSAqIHBlcmNlbnRdO1xuICAgICAgICAkcGFnZS5jc3MoJ2hlaWdodCcsIHNjcm9sbFN0YXRlc1syXSArIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpO1xuICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG5cbiAgICAvLyB2YXIgbG9hZEltYWdlQ291bnRlciA9IDA7XG4gICAgLy8gZnVuY3Rpb24gbG9hZEltYWdlKHNyYykge1xuICAgIC8vICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgIC8vICAgICBpbWcuc3JjID0gc3JjO1xuICAgIC8vICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAgICAgbG9hZEltYWdlQ291bnRlcisrO1xuICAgIC8vICAgICB9O1xuICAgIC8vICAgICByZXR1cm4gaW1nO1xuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIGxvYWREb29ySW1hZ2VzKCkge1xuICAgIC8vICAgICB2YXIgcG9zdGZpeCA9ICcnLFxuICAgIC8vICAgICAgICAgbnVtYmVycyA9IFsnMDAnLCcwNScsJzA1JywnMTAnLCcxMCcsJzE1JywnMTUnLCcyMCcsJzIwJywnMjUnLCcyNScsJzMwJywnMzAnLCczNScsJzM1JywnNDAnLCc0MCcsJzQ1JywnNDUnLCc1MCcsJzUwJywnNTUnLCc1NScsJzYwJ107XG4gICAgLy8gICAgIGlmKCAvaVAoYWR8b2R8aG9uZSl8QW5kcm9pZHxCbGFja2JlcnJ5fFdpbmRvd3MgUGhvbmUvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgIC8vICAgICAgICAgcG9zdGZpeCA9ICdfaXBhZDInO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAvLyAgICAgLy8gICAgIHZhciBwc3RmeCA9IGkgPT09IDAgPyAnJyA6IHBvc3RmaXg7XG4gICAgLy8gICAgIC8vICAgICB2YXIgaW1nID0gbG9hZEltYWdlKCcuL2ltZy9kb29yXycgKyBlbCArIHBzdGZ4ICsgJy5wbmcnKTtcbiAgICAvLyAgICAgLy8gICAgICRmcmlkZ2UuYXBwZW5kKCQoaW1nKS5hZGRDbGFzcygnZnJpZGdlLXRvcC1pbWcgZG9vci0nICsgaSkpO1xuICAgIC8vICAgICAvLyB9KTtcbiAgICB9XG4gICAgbG9hZERvb3JJbWFnZXMoKTtcbiAgICBcbiAgICAkd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAkKHRoaXMpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMjQqMTUpIHJldHVybjtcbiAgICAgICAgICAgICRmb290ZXIuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJHJhZGlvTXVzaWNTb25nLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC5hZGRDbGFzcygnYW5pbWF0ZS1zY3JvbGwnKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZShuYW1lLCBuKSB7XG4gICAgICAgIHZhciBjbGFzc2VzVG9SZW1vdmUgPSAnJztcbiAgICAgICAgbiA9IG4gKyAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY2xhc3Nlc1RvUmVtb3ZlICs9IG5hbWUgKyBpICsgJyAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFzc2VzVG9SZW1vdmUuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICB2YXIgZGVzY0NsYXNzZVRvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnd2l0aC1kZXNjLScsIDYpO1xuICAgIHZhciBmcmlkZ2VDbGFzc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKCdvcGVuLScsIDIzKTtcbiAgICBmdW5jdGlvbiBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgaCkge1xuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA8PSBoLzI0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMCcpO1xuICAgICAgICAgICAgICAgICQoJy5EdmVyXzEnKS5zaG93KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyKTpcbiAgICAgICAgICAgICAgICAkKCcuRHZlcl8xJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNSAmJiBzY3JvbGxUb3AgPCBoLzI0KjYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOCAmJiBzY3JvbGxUb3AgPCBoLzI0KjkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEwICYmIHNjcm9sbFRvcCA8IGgvMjQqMTEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjExICYmIHNjcm9sbFRvcCA8IGgvMjQqMTIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEyICYmIHNjcm9sbFRvcCA8IGgvMjQqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEzICYmIHNjcm9sbFRvcCA8IGgvMjQqMTQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE1ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE2ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE3ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE4ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE5ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIwICYmIHNjcm9sbFRvcCA8IGgvMjQqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIxICYmIHNjcm9sbFRvcCA8IGgvMjQqMjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIyICYmIHNjcm9sbFRvcCA8IGgvMjQqMjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIzKjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyNCo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wIDwgaC8yNCoyNCo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjUqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjUqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjI2KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjI2KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyNyo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyNyo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjgqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjgqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjI5KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjI5KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCozMCo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozMCo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMzEqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzEqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjMyKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjMyKjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCozMyo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozMyo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMzQqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjM1KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjM1KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCozNio0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozNio0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMzcqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzcqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjM4KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi05Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzgqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjM5KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzkqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQwKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDAqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQxKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDEqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQyKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDIqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQzKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDMqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQ0KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQ1KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDUqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQ2KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDYqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2Nyb2xsKSB7XG4gICAgICAgIHNjcm9sbFRvcCA9IC1zY3JvbGw7XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMTIpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFN0YXRlc1syXSAtIHNjcm9sbFRvcCA8IDMwKSB7XG4gICAgICAgICAgICAkKCcuZ2FtZScpLmZhZGVJbigpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcyhkZXNjQ2xhc3NlVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIHNjcm9sbFN0YXRlc1sxXSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBteVNjcm9sbDtcbiAgICBmdW5jdGlvbiBpbml0TXlTY3JvbGwoKSB7XG4gICAgICAgIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHtcbiAgICAgICAgICAgIHByb2JlVHlwZTogMyxcbiAgICAgICAgICAgIG1vdXNlV2hlZWw6IHRydWUsXG4gICAgICAgICAgICBjbGljazogdHJ1ZSxcbiAgICAgICAgICAgIHNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICBpbnRlcmFjdGl2ZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICBmYWRlU2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIHNocmlua1Njcm9sbGJhcnM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgICAgICAgIHNjcm9sbFBhZ2UobXlTY3JvbGwueSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbEVuZCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgd2luZG93LmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5pdE15U2Nyb2xsKCk7XG4gICAgfTtcbiAgICBcbiAgICAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcubmF2LW1haW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtb3VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIGF1ZGlvXG4gICAgdmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQmVjYXVzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQnJva2VuIFByb21pc2UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBEcmFnLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gTWVkcy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIE9uZSBPZiBBIEtpbmQubXAzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzWzBdO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyYWNrTGlzdCA9IG5ldyBUcmFja0xpc3QoKTtcbiAgICBcbiAgICAvLyBTZXR1cCB0aGUgcGxheWVyIHRvIGF1dG9wbGF5IHRoZSBuZXh0IHRyYWNrXG4gICAgdmFyIGEgPSB3aW5kb3cuYXVkaW9qcy5jcmVhdGVBbGwoe1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIHZhciBhdWRpbyA9IGFbMF07XG4gICAgYXVkaW8ubG9hZCh0cmFja0xpc3QuZmlyc3QoKSk7XG4gICAgZnVuY3Rpb24gc2hvd0J1dHRvbigpIHtcbiAgICAgICAgaWYgKGF1ZGlvLnBsYXlpbmcpIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHBsYXlQYXVzZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyICRwbGF5UGF1c2UgPSAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJyksXG4gICAgICAgICRwbGF5TmV4dCA9ICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpO1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dC1ob3ZlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHBsYXlOZXh0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkcGxheU5leHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9LCA0MDApO1xuICAgIH0pO1xuICAgICRyYWRpb011c2ljU29uZ1RleHQudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAkcGxheVBhdXNlLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5wbGF5UGF1c2UoKTtcbiAgICAgICAgc2hvd0J1dHRvbigpO1xuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgc2hvd0J1dHRvbigpO1xuICAgIH0pO1xuXG4gICAgLy8gZ2FtZVxuICAgIGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4IDtcbiAgICAgICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICAgICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAgICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIHZhciBpbWFnZXMgPSBbXTtcbiAgICBmdW5jdGlvbiBpbml0R2FtZSgpIHtcbiAgICAgICAgdmFyIFRpbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubnVtYmVyID0gb3B0aW9ucy5udW1iZXI7XG4gICAgICAgICAgICB0aGlzLmltZ051bWVyID0gb3B0aW9ucy5pbWdOdW1lcjtcbiAgICAgICAgICAgIHRoaXMuJGRpdiA9ICQoJy5nYW1lLXRpbGUtJyArIG9wdGlvbnMubnVtYmVyKTtcbiAgICAgICAgICAgIHRoaXMuaW1nID0gaW1hZ2VzW29wdGlvbnMuaW1nTnVtZXJdO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5hcHBlbmQoJCh0aGlzLmltZykuY2xvbmUoKSk7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1NvbHZlZCB8fCBfdGhpcy5pc0xvY2tlZCB8fCBfdGhpcy5pc09wZW4gfHwgIV90aGlzLmdhbWUuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIF90aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmZhZGVJbigpO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5vcGVuVGFsZSh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLnNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS51bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEdhbWUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAwO1xuICAgICAgICAgICAgdGhpcy5zb2x2ZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWVTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICAgICAgICAgIHRoaXMubG9ja2VkSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLmJhY2tJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbiA9ICQoJy5zdGFydC1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRpbmZvRGl2ID0gb3B0aW9ucy4kaW5mb0RpdjtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b24uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b24uZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNob3dEZWxheSA9IDMwMDA7XG4gICAgICAgICAgICB0aGlzLiRnYW1lID0gJCgnLmdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lciA9ICQoJy5nYW1lLXRpbWVyJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzID0gJCgnLmdhbWUtY2xpY2tzJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUgPSAkKCcuZ2FtZS1zY29yZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwgPSAkKCcuZ2FtZS1zY29yZS10b3RhbCcpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUxldmVsID0gJCgnLmdhbWUtbGV2ZWwnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrID0gJCgnLmdhbWUtdGFzaycpO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubmV4dExldmVsKCk7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbWUgPSBNYXRoLmZsb29yKF90aGlzLnRpbWVNYXggLSAoRGF0ZS5ub3coKSAtIF90aGlzLnN0YXJ0VGltZSkvMTAwMCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVUaW1lci50ZXh0KF90aGlzLnRpbWUpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWlsTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICAgICAgICB0aWxlLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm5leHRMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdExldmVsKHRoaXMubGV2ZWwgKyAxKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5pbml0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDUpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGV2ZWwoKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbC50ZXh0KCfQo9GA0L7QstC10L3RjCAnICsgbGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcy50ZXh0KDApO1xuICAgICAgICAgICAgc3dpdGNoKGxldmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDEyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDMwMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTgxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxODE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDEyMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gNjE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIudGV4dCh0aGlzLnRpbWVNYXggLSAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWxlc1RvU29sdmU7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVycy5wdXNoKGkgJSAodGhpcy50YWxlc1RvU29sdmUvdGhpcy50aWxlc0luQ2hhaW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IHRoaXMudGFsZXNUb1NvbHZlOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgICAgICQoJy5nYW1lLXRpbGUtJyArIGkpLnBhcmVudCgpLmFkZENsYXNzKCdsb2NrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IHNodWZmbGUodGhpcy5udW1iZXJzKTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbGVzLnB1c2gobmV3IFRpbGUoe1xuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IGksXG4gICAgICAgICAgICAgICAgICAgIGltZ051bWVyOiBlbCxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogX3RoaXNcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrLnRleHQodGhpcy50aWxlc0luQ2hhaW4gKyAnICcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MudGV4dCh0aGlzLmNsaWNrcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xlYXJMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgIGVsLiRkaXYudW5iaW5kKCdjbGljaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLm9wZW5lZCA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNvbXBsZXRlTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzY29yZSA9ICh0aGlzLnRpbWVTY29yZU1heCAqIHRoaXMudGltZS90aGlzLnRpbWVNYXggKyB0aGlzLmNsaWNrU2NvcmVNYXggLyB0aGlzLmNsaWNrcykgKiB0aGlzLmxldmVsO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gTWF0aC5mbG9vcihzY29yZSk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlVG90YWwgKz0gdGhpcy5zY29yZUxldmVsO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlLnRleHQodGhpcy5zY29yZUxldmVsKS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZVRvdGFsLnRleHQodGhpcy5zY29yZVRvdGFsKS5mYWRlSW4oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsIDwgNSkgdGhpcy4kZ2FtZUJ1dHRvbi50ZXh0KCfQodC70LXQtNGD0Y7RidC40Lkg0YPRgNC+0LLQtdC90YwnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5mYWlsTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgLT0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b24udGV4dCgn0J3QsNGH0LDRgtGMINGD0YDQvtCy0LXQvdGMINC30LDQvdC+0LLQvicpLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy5jbGVhckxldmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUud2luTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUxldmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUub3BlblRhbGUgPSBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLnB1c2godGlsZSk7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcGVuZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW1lciA9IHRoaXMub3BlbmVkWzBdLmltZ051bWVyLFxuICAgICAgICAgICAgICAgICAgICBpc0JpbmRlZFRhbGVzID0gdGhpcy5vcGVuZWQuZXZlcnkoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5pbWdOdW1lciA9PT0gaW1nTnVtZXI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JpbmRlZFRhbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiB0aGlzLnRpbGVzSW5DaGFpbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb2x2ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhbGVzVG9Tb2x2ZSA9PT0gdGhpcy5zb2x2ZWQpIHRoaXMud2luTGV2ZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBuZXcgR2FtZSh7XG4gICAgICAgICAgICAkaW5mb0RpdjogJCgnLmRlc2MtZ2FtZSBkaXYnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbG9hZEltYWdlcyhjYWxsYmFjaykge1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIGNvdW50KCkge1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPT09IDkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSAnLi9pbWcvdGlsZS0nICsgaSArICcuanBnJztcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBjb3VudDtcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKGltZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlcyhpbml0R2FtZSk7XG5cbn0pOyJdfQ==
