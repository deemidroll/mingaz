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
        $radioMusicSong = $('.radio-music-song'),
        $radioMusicSongText = $('.radio-music-song-text'),
        $window = $(window),
        $document = $(document);
    
    var height,
        scrollStates,
        scrollTop;
    
    function resize() {
        var radioHeight = $radio[0].clientWidth * 124/1080 + 20,
            percent = 0.44;
        height = parseInt($footer.css('height'), 10);
        scrollStates = [0, radioHeight, radioHeight + $fridgeInner[0].clientWidth * $fridgeInner.attr('height')/$fridgeInner.attr('width') * percent];
        $page.css('height', scrollStates[2] + window.innerHeight);
    }
    resize();
    $window.on('resize', resize);
    
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
            break;
            case (scrollTop > h/24 && scrollTop < h/24*2):
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
        myScroll = new window.IScroll('#wrapper', { probeType: 3, mouseWheel: true, click: true });
    
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
            $playPause.children().attr('src', './img/pause.png');
        } else {
            $playPause.children().attr('src', './img/play.png');
        }
    }
    var $playPause = $('.radio-music-btn-pause');
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
            return this;
        };
        Tile.prototype.unlock = function () {
            this.isLocked = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh3aW5kb3cuJCk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd2l0aERlc2MgPSAkKCcud2l0aC1kZXNjJyksXG4gICAgICAgICRmb290ZXIgPSAkKCcuZm9vdGVyJyksXG4gICAgICAgICRmcmlkZ2UgPSAkKCcuZnJpZGdlLWRvb3InKSxcbiAgICAgICAgJGZyaWRnZUlubmVyID0gJCgnLmZyaWRnZS1pbm5lcicpLFxuICAgICAgICAkcGFnZSA9ICQoJy5wYWdlJyksXG4gICAgICAgICRsZWZ0VGV4dCA9ICQoJy5sZWZ0LXRleHQnKSxcbiAgICAgICAgJHJhZGlvID0gJCgnLnJhZGlvJyksXG4gICAgICAgICRyYWRpb011c2ljU29uZyA9ICQoJy5yYWRpby1tdXNpYy1zb25nJyksXG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQgPSAkKCcucmFkaW8tbXVzaWMtc29uZy10ZXh0JyksXG4gICAgICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICAgIFxuICAgIHZhciBoZWlnaHQsXG4gICAgICAgIHNjcm9sbFN0YXRlcyxcbiAgICAgICAgc2Nyb2xsVG9wO1xuICAgIFxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgdmFyIHJhZGlvSGVpZ2h0ID0gJHJhZGlvWzBdLmNsaWVudFdpZHRoICogMTI0LzEwODAgKyAyMCxcbiAgICAgICAgICAgIHBlcmNlbnQgPSAwLjQ0O1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgc2Nyb2xsU3RhdGVzID0gWzAsIHJhZGlvSGVpZ2h0LCByYWRpb0hlaWdodCArICRmcmlkZ2VJbm5lclswXS5jbGllbnRXaWR0aCAqICRmcmlkZ2VJbm5lci5hdHRyKCdoZWlnaHQnKS8kZnJpZGdlSW5uZXIuYXR0cignd2lkdGgnKSAqIHBlcmNlbnRdO1xuICAgICAgICAkcGFnZS5jc3MoJ2hlaWdodCcsIHNjcm9sbFN0YXRlc1syXSArIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpO1xuICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gICAgXG4gICAgJHdpdGhEZXNjLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzI0KjE1KSByZXR1cm47XG4gICAgICAgICAgICAkZm9vdGVyLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICRyYWRpb011c2ljU29uZy5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyYWRpb011c2ljU29uZ1RleHQuYWRkQ2xhc3MoJ2FuaW1hdGUtc2Nyb2xsJyk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnJlbW92ZUNsYXNzKCdhbmltYXRlLXNjcm9sbCcpO1xuICAgIH0pO1xuICAgIFxuICAgIGZ1bmN0aW9uIHByZXBhcmVDbGFzc2VzVG9SZW1vdmUobmFtZSwgbikge1xuICAgICAgICB2YXIgY2xhc3Nlc1RvUmVtb3ZlID0gJyc7XG4gICAgICAgIG4gPSBuICsgMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNsYXNzZXNUb1JlbW92ZSArPSBuYW1lICsgaSArICcgJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xhc3Nlc1RvUmVtb3ZlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgdmFyIGRlc2NDbGFzc2VUb1JlbW92ZSA9IHByZXBhcmVDbGFzc2VzVG9SZW1vdmUoJ3dpdGgtZGVzYy0nLCA2KTtcbiAgICB2YXIgZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNzZXNUb1JlbW92ZSgnb3Blbi0nLCAyMyk7XG4gICAgZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNSAmJiBzY3JvbGxUb3AgPCBoLzI0KjYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOCAmJiBzY3JvbGxUb3AgPCBoLzI0KjkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEwICYmIHNjcm9sbFRvcCA8IGgvMjQqMTEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjExICYmIHNjcm9sbFRvcCA8IGgvMjQqMTIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEyICYmIHNjcm9sbFRvcCA8IGgvMjQqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEzICYmIHNjcm9sbFRvcCA8IGgvMjQqMTQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE1ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE2ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE3ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE4ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE5ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIwICYmIHNjcm9sbFRvcCA8IGgvMjQqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIxICYmIHNjcm9sbFRvcCA8IGgvMjQqMjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIyICYmIHNjcm9sbFRvcCA8IGgvMjQqMjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIzKjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyNCo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wIDwgaC8yNCoyNCo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjUqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjUqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjI2KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjI2KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyNyo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyNyo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjgqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjgqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjI5KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjI5KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCozMCo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozMCo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMzEqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzEqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjMyKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjMyKjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCozMyo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozMyo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMzQqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjM1KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjM1KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCozNio0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozNio0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMzcqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzcqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjM4KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi05Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzgqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjM5KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMzkqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQwKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDAqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQxKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDEqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQyKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDIqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQzKjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDMqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQ0KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQ1KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDUqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjQ2KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNDYqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2Nyb2xsKSB7XG4gICAgICAgIHNjcm9sbFRvcCA9IC1zY3JvbGw7XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMTIpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFN0YXRlc1syXSAtIHNjcm9sbFRvcCA8IDMwKSB7XG4gICAgICAgICAgICAkKCcuZ2FtZScpLmZhZGVJbigpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcyhkZXNjQ2xhc3NlVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5nYW1lJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIHNjcm9sbFN0YXRlc1sxXSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBteVNjcm9sbDtcbiAgICBmdW5jdGlvbiBpbml0TXlTY3JvbGwoKSB7XG4gICAgICAgIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHsgcHJvYmVUeXBlOiAzLCBtb3VzZVdoZWVsOiB0cnVlLCBjbGljazogdHJ1ZSB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgICAgICAgc2Nyb2xsUGFnZShteVNjcm9sbC55KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsJywgdXBkYXRlUG9zaXRpb24pO1xuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsRW5kJywgdXBkYXRlUG9zaXRpb24pO1xuICAgIH1cbiAgICBcbiAgICB3aW5kb3cubG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpbml0TXlTY3JvbGwoKTtcbiAgICB9O1xuICAgIFxuICAgICRkb2N1bWVudC5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5uYXYtbWFpbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1swXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1vdXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMV0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtZ2FtZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1syXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gYXVkaW9cbiAgICB2YXIgVHJhY2tMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRyYWNrcyA9IFtcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBCZWNhdXNlIEkgV2FudCBZb3UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBCcm9rZW4gUHJvbWlzZS5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIERyYWcubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBNZWRzLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gT25lIE9mIEEgS2luZC5tcDMnXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNrID4gdGhpcy50cmFja3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1t0aGlzLmN1cnJlbnRUcmFja107XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbMF07XG4gICAgfTtcbiAgICBcbiAgICB2YXIgdHJhY2tMaXN0ID0gbmV3IFRyYWNrTGlzdCgpO1xuICAgIFxuICAgIC8vIFNldHVwIHRoZSBwbGF5ZXIgdG8gYXV0b3BsYXkgdGhlIG5leHQgdHJhY2tcbiAgICB2YXIgYSA9IHdpbmRvdy5hdWRpb2pzLmNyZWF0ZUFsbCh7XG4gICAgICAgIHRyYWNrRW5kZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgICAgICRyYWRpb011c2ljU29uZ1RleHQudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gdGhlIGZpcnN0IHRyYWNrXG4gICAgdmFyIGF1ZGlvID0gYVswXTtcbiAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5maXJzdCgpKTtcbiAgICBmdW5jdGlvbiBzaG93QnV0dG9uKCkge1xuICAgICAgICBpZiAoYXVkaW8ucGxheWluZykge1xuICAgICAgICAgICAgJHBsYXlQYXVzZS5jaGlsZHJlbigpLmF0dHIoJ3NyYycsICcuL2ltZy9wYXVzZS5wbmcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UuY2hpbGRyZW4oKS5hdHRyKCdzcmMnLCAnLi9pbWcvcGxheS5wbmcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgJHBsYXlQYXVzZSA9ICQoJy5yYWRpby1tdXNpYy1idG4tcGF1c2UnKTtcbiAgICAkcmFkaW9NdXNpY1NvbmdUZXh0LnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgJHBsYXlQYXVzZS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIGEgdHJhY2sgb24gY2xpY2tcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgJHJhZGlvTXVzaWNTb25nVGV4dC50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcblxuICAgIC8vIGdhbWVcbiAgICBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleCA7XG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gICAgICAgIHZhciBUaWxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm51bWJlciA9IG9wdGlvbnMubnVtYmVyO1xuICAgICAgICAgICAgdGhpcy5pbWdOdW1lciA9IG9wdGlvbnMuaW1nTnVtZXI7XG4gICAgICAgICAgICB0aGlzLiRkaXYgPSAkKCcuZ2FtZS10aWxlLScgKyBvcHRpb25zLm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLmltZyA9IGltYWdlc1tvcHRpb25zLmltZ051bWVyXTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzU29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYuYXBwZW5kKCQodGhpcy5pbWcpLmNsb25lKCkpO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNTb2x2ZWQgfHwgX3RoaXMuaXNMb2NrZWQgfHwgX3RoaXMuaXNPcGVuIHx8ICFfdGhpcy5nYW1lLnN0YXJ0ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5mYWRlSW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmdhbWUub3BlblRhbGUodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5zb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS51bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgR2FtZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNvbHZlZCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZVRvdGFsID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZVNjb3JlTWF4ID0gOTAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja1Njb3JlTWF4ID0gOTAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5jbGlja3NUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICAgICAgdGhpcy5sb2NrZWRJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuYmFja0ltZyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQnV0dG9uID0gJCgnLnN0YXJ0LWdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGluZm9EaXYgPSBvcHRpb25zLiRpbmZvRGl2O1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZUJ1dHRvbi5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0RlbGF5ID0gMzAwMDtcbiAgICAgICAgICAgIHRoaXMuJGdhbWUgPSAkKCcuZ2FtZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRpbWVyID0gJCgnLmdhbWUtdGltZXInKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MgPSAkKCcuZ2FtZS1jbGlja3MnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVTY29yZSA9ICQoJy5nYW1lLXNjb3JlJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmVUb3RhbCA9ICQoJy5nYW1lLXNjb3JlLXRvdGFsJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lTGV2ZWwgPSAkKCcuZ2FtZS1sZXZlbCcpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRhc2sgPSAkKCcuZ2FtZS10YXNrJyk7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5uZXh0TGV2ZWwoKTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRnYW1lLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGltZSA9IE1hdGguZmxvb3IoX3RoaXMudGltZU1heCAtIChEYXRlLm5vdygpIC0gX3RoaXMuc3RhcnRUaW1lKS8xMDAwKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kZ2FtZVRpbWVyLnRleHQoX3RoaXMudGltZSk7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZhaWxMZXZlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgICAgIHRpbGUuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUubmV4dExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pbml0TGV2ZWwodGhpcy5sZXZlbCArIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmluaXRMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID4gNSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUxldmVsLnRleHQoJ9Cj0YDQvtCy0LXQvdGMICcgKyBsZXZlbCk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzLnRleHQoMCk7XG4gICAgICAgICAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMzAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxODE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDIwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDE4MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTIxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSA0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSA2MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lci50ZXh0KHRoaXMudGltZU1heCAtIDEpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRhbGVzVG9Tb2x2ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJzLnB1c2goaSAlICh0aGlzLnRhbGVzVG9Tb2x2ZS90aGlzLnRpbGVzSW5DaGFpbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5udW1iZXJzID0gc2h1ZmZsZSh0aGlzLm51bWJlcnMpO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGlsZXMucHVzaChuZXcgVGlsZSh7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgaW1nTnVtZXI6IGVsLFxuICAgICAgICAgICAgICAgICAgICBnYW1lOiBfdGhpc1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVRhc2sudGV4dCh0aGlzLnRpbGVzSW5DaGFpbiArICcgJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyArPSAxO1xuICAgICAgICAgICAgdGhpcy5jbGlja3NUb3RhbCArPSAxO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcy50ZXh0KHRoaXMuY2xpY2tzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5jbGVhckxldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zb2x2ZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIGVsLiRkaXYuY2hpbGRyZW4oKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY29tcGxldGVMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNjb3JlID0gKHRoaXMudGltZVNjb3JlTWF4ICogdGhpcy50aW1lL3RoaXMudGltZU1heCArIHRoaXMuY2xpY2tTY29yZU1heCAvIHRoaXMuY2xpY2tzKSAqIHRoaXMubGV2ZWw7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSBNYXRoLmZsb29yKHNjb3JlKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCArPSB0aGlzLnNjb3JlTGV2ZWw7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUudGV4dCh0aGlzLnNjb3JlTGV2ZWwpLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwudGV4dCh0aGlzLnNjb3JlVG90YWwpLmZhZGVJbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgPCA1KSB0aGlzLiRnYW1lQnV0dG9uLnRleHQoJ9Ch0LvQtdC00YPRjtGJ0LjQuSDRg9GA0L7QstC10L3RjCcpLmZhZGVJbigpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmZhaWxMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCAtPSAxO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbi50ZXh0KCfQndCw0YfQsNGC0Ywg0YPRgNC+0LLQtdC90Ywg0LfQsNC90L7QstC+JykuZmFkZUluKCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGV2ZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS53aW5MZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlTGV2ZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vcGVuVGFsZSA9IGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGltZ051bWVyID0gdGhpcy5vcGVuZWRbMF0uaW1nTnVtZXIsXG4gICAgICAgICAgICAgICAgICAgIGlzQmluZGVkVGFsZXMgPSB0aGlzLm9wZW5lZC5ldmVyeShmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLmltZ051bWVyID09PSBpbWdOdW1lcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQmluZGVkVGFsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuZWQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3BlbmVkLmxlbmd0aCA+IHRoaXMudGlsZXNJbkNoYWluIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNvbHZlZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFsZXNUb1NvbHZlID09PSB0aGlzLnNvbHZlZCkgdGhpcy53aW5MZXZlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIG5ldyBHYW1lKHtcbiAgICAgICAgICAgICRpbmZvRGl2OiAkKCcuZGVzYy1nYW1lIGRpdicpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgZnVuY3Rpb24gY291bnQoKSB7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICBpZiAoY291bnRlciA9PT0gOSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2ltZy90aWxlLScgKyBpICsgJy5qcGcnO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGNvdW50O1xuICAgICAgICAgICAgaW1hZ2VzLnB1c2goaW1nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkSW1hZ2VzKGluaXRHYW1lKTtcblxufSk7Il19
