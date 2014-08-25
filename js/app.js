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
            case (scrollTop > h/24*23):
                $fridge.removeClass(fridgeClassesToRemove).addClass('open-23');
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
            $footer.removeClass(descClasseToRemove).addClass('with-game');
        } else {
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
            $('.radio-music-song').text(audio.mp3.slice(8, -4));
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
    $('.radio-music-song').text(audio.mp3.slice(8, -4));
    $playPause.click(function(e) {
        e.preventDefault();
        audio.playPause();
        showButton();
    });
    // Load in a track on click
    $('.radio-music-btn-next').click(function(e) {
        e.preventDefault();
        audio.load(trackList.next());
        $('.radio-music-song').text(audio.mp3.slice(8, -4));
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
            this.$div.click(function () {
                if (_this.isSolved || _this.isLocked || _this.isOpen || !_this.game.started) return;
                _this.open();
            });
        };
        Tile.prototype.open = function () {
            this.isOpen = true;
            this.$div.children().animate({opacity: 1});
            // this.$div.children().fadeIn();
            this.game.openTale(this);
            return this;
        };
        Tile.prototype.close = function () {
            this.isOpen = false;
            this.$div.children().animate({opacity: 0.25});
            // this.$div.children().fadeOut();
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
                    this.opened.forEach(function (el) {
                        el.close();
                    });
                    this.opened = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh3aW5kb3cuJCk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd2l0aERlc2MgPSAkKCcud2l0aC1kZXNjJyksXG4gICAgICAgICRmb290ZXIgPSAkKCcuZm9vdGVyJyksXG4gICAgICAgICRmcmlkZ2UgPSAkKCcuZnJpZGdlLWRvb3InKSxcbiAgICAgICAgJGZyaWRnZUlubmVyID0gJCgnLmZyaWRnZS1pbm5lcicpLFxuICAgICAgICAkcGFnZSA9ICQoJy5wYWdlJyksXG4gICAgICAgICRsZWZ0VGV4dCA9ICQoJy5sZWZ0LXRleHQnKSxcbiAgICAgICAgJHJhZGlvID0gJCgnLnJhZGlvJyksXG4gICAgICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICAgIFxuICAgIHZhciBoZWlnaHQsXG4gICAgICAgIHNjcm9sbFN0YXRlcyxcbiAgICAgICAgc2Nyb2xsVG9wO1xuICAgIFxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgdmFyIHJhZGlvSGVpZ2h0ID0gJHJhZGlvWzBdLmNsaWVudFdpZHRoICogMTI0LzEwODAgKyAyMCxcbiAgICAgICAgICAgIHBlcmNlbnQgPSAwLjQ0O1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgc2Nyb2xsU3RhdGVzID0gWzAsIHJhZGlvSGVpZ2h0LCByYWRpb0hlaWdodCArICRmcmlkZ2VJbm5lclswXS5jbGllbnRXaWR0aCAqICRmcmlkZ2VJbm5lci5hdHRyKCdoZWlnaHQnKS8kZnJpZGdlSW5uZXIuYXR0cignd2lkdGgnKSAqIHBlcmNlbnRdO1xuICAgICAgICAkcGFnZS5jc3MoJ2hlaWdodCcsIHNjcm9sbFN0YXRlc1syXSArIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpO1xuICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gICAgXG4gICAgJHdpdGhEZXNjLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzI0KjE1KSByZXR1cm47XG4gICAgICAgICAgICAkZm9vdGVyLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICAgICAgdmFyIGNsYXNzZXNUb1JlbW92ZSA9ICcnO1xuICAgICAgICBuID0gbiArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjbGFzc2VzVG9SZW1vdmUgKz0gbmFtZSArIGkgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXNzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHZhciBkZXNjQ2xhc3NlVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc3Nlc1RvUmVtb3ZlKCd3aXRoLWRlc2MtJywgNik7XG4gICAgdmFyIGZyaWRnZUNsYXNzZXNUb1JlbW92ZSA9IHByZXBhcmVDbGFzc2VzVG9SZW1vdmUoJ29wZW4tJywgMjMpO1xuICAgIGZ1bmN0aW9uIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBoKSB7XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wIDw9IGgvMjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc3Nlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0wJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIgJiYgc2Nyb2xsVG9wIDwgaC8yNCozKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjMgJiYgc2Nyb2xsVG9wIDwgaC8yNCo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCo1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjUgJiYgc2Nyb2xsVG9wIDwgaC8yNCo2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjYgJiYgc2Nyb2xsVG9wIDwgaC8yNCo3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjcgJiYgc2Nyb2xsVG9wIDwgaC8yNCo4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjggJiYgc2Nyb2xsVG9wIDwgaC8yNCo5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjkgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMCAmJiBzY3JvbGxUb3AgPCBoLzI0KjExKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjEzKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjE0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjE1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNSAmJiBzY3JvbGxUb3AgPCBoLzI0KjE2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjE3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjE4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxOCAmJiBzY3JvbGxUb3AgPCBoLzI0KjE5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjIwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMCAmJiBzY3JvbGxUb3AgPCBoLzI0KjIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMSAmJiBzY3JvbGxUb3AgPCBoLzI0KjIyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjIzKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKHNjcm9sbCkge1xuICAgICAgICBzY3JvbGxUb3AgPSAtc2Nyb2xsO1xuICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgc2Nyb2xsU3RhdGVzWzFdLzEyKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItZml4ZWQnKS5hZGRDbGFzcygnZm9vdGVyLWhpZGUnKTtcbiAgICAgICAgICAgICRsZWZ0VGV4dC5yZW1vdmVDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1oaWRlJykuYWRkQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LmFkZENsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxTdGF0ZXNbMl0gLSBzY3JvbGxUb3AgPCAzMCkge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcyhkZXNjQ2xhc3NlVG9SZW1vdmUpLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ3dpdGgtZ2FtZScpO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBzY3JvbGxTdGF0ZXNbMV0pO1xuICAgIH1cbiAgICBcbiAgICB2YXIgbXlTY3JvbGw7XG4gICAgZnVuY3Rpb24gaW5pdE15U2Nyb2xsKCkge1xuICAgICAgICBteVNjcm9sbCA9IG5ldyB3aW5kb3cuSVNjcm9sbCgnI3dyYXBwZXInLCB7IHByb2JlVHlwZTogMywgbW91c2VXaGVlbDogdHJ1ZSwgY2xpY2s6IHRydWUgfSk7XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgICAgICAgIHNjcm9sbFBhZ2UobXlTY3JvbGwueSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbEVuZCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgd2luZG93LmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5pdE15U2Nyb2xsKCk7XG4gICAgfTtcbiAgICBcbiAgICAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcubmF2LW1haW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtb3VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIGF1ZGlvXG4gICAgdmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQmVjYXVzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gQnJva2VuIFByb21pc2UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL1BsYWNlYm8gLSBEcmFnLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9QbGFjZWJvIC0gTWVkcy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvUGxhY2VibyAtIE9uZSBPZiBBIEtpbmQubXAzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzWzBdO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyYWNrTGlzdCA9IG5ldyBUcmFja0xpc3QoKTtcbiAgICBcbiAgICAvLyBTZXR1cCB0aGUgcGxheWVyIHRvIGF1dG9wbGF5IHRoZSBuZXh0IHRyYWNrXG4gICAgdmFyIGEgPSB3aW5kb3cuYXVkaW9qcy5jcmVhdGVBbGwoe1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIHZhciBhdWRpbyA9IGFbMF07XG4gICAgYXVkaW8ubG9hZCh0cmFja0xpc3QuZmlyc3QoKSk7XG4gICAgZnVuY3Rpb24gc2hvd0J1dHRvbigpIHtcbiAgICAgICAgaWYgKGF1ZGlvLnBsYXlpbmcpIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UuY2hpbGRyZW4oKS5hdHRyKCdzcmMnLCAnLi9pbWcvcGF1c2UucG5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcGxheVBhdXNlLmNoaWxkcmVuKCkuYXR0cignc3JjJywgJy4vaW1nL3BsYXkucG5nJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyICRwbGF5UGF1c2UgPSAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJyk7XG4gICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICRwbGF5UGF1c2UuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLnBsYXlQYXVzZSgpO1xuICAgICAgICBzaG93QnV0dG9uKCk7XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiBhIHRyYWNrIG9uIGNsaWNrXG4gICAgJCgnLnJhZGlvLW11c2ljLWJ0bi1uZXh0JykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICQoJy5yYWRpby1tdXNpYy1zb25nJykudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICBzaG93QnV0dG9uKCk7XG4gICAgfSk7XG5cbiAgICAvLyBnYW1lXG4gICAgZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXggO1xuICAgICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgICAgICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuICAgICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG4gICAgdmFyIGltYWdlcyA9IFtdO1xuICAgIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xuICAgICAgICB2YXIgVGlsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBvcHRpb25zLm51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuaW1nTnVtZXIgPSBvcHRpb25zLmltZ051bWVyO1xuICAgICAgICAgICAgdGhpcy4kZGl2ID0gJCgnLmdhbWUtdGlsZS0nICsgb3B0aW9ucy5udW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5pbWcgPSBpbWFnZXNbb3B0aW9ucy5pbWdOdW1lcl07XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc1NvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lO1xuICAgICAgICAgICAgdGhpcy4kZGl2LmFwcGVuZCgkKHRoaXMuaW1nKS5jbG9uZSgpKTtcbiAgICAgICAgICAgIHRoaXMuJGRpdi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzU29sdmVkIHx8IF90aGlzLmlzTG9ja2VkIHx8IF90aGlzLmlzT3BlbiB8fCAhX3RoaXMuZ2FtZS5zdGFydGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFRpbGUucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRkaXYuY2hpbGRyZW4oKS5hbmltYXRlKHtvcGFjaXR5OiAxfSk7XG4gICAgICAgICAgICAvLyB0aGlzLiRkaXYuY2hpbGRyZW4oKS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5vcGVuVGFsZSh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkaXYuY2hpbGRyZW4oKS5hbmltYXRlKHtvcGFjaXR5OiAwLjI1fSk7XG4gICAgICAgICAgICAvLyB0aGlzLiRkaXYuY2hpbGRyZW4oKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUuc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzU29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUaWxlLnByb3RvdHlwZS5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGlsZS5wcm90b3R5cGUudW5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEdhbWUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAwO1xuICAgICAgICAgICAgdGhpcy5zb2x2ZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxldmVsID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbWVTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTY29yZU1heCA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICAgICAgICAgIHRoaXMubG9ja2VkSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLmJhY2tJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbiA9ICQoJy5zdGFydC1nYW1lJyk7XG4gICAgICAgICAgICB0aGlzLiRpbmZvRGl2ID0gb3B0aW9ucy4kaW5mb0RpdjtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVCdXR0b24uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVCdXR0b24uZmFkZU91dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNob3dEZWxheSA9IDMwMDA7XG4gICAgICAgICAgICB0aGlzLiRnYW1lID0gJCgnLmdhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUaW1lciA9ICQoJy5nYW1lLXRpbWVyJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lQ2xpY2tzID0gJCgnLmdhbWUtY2xpY2tzJyk7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUgPSAkKCcuZ2FtZS1zY29yZScpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwgPSAkKCcuZ2FtZS1zY29yZS10b3RhbCcpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUxldmVsID0gJCgnLmdhbWUtbGV2ZWwnKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrID0gJCgnLmdhbWUtdGFzaycpO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubmV4dExldmVsKCk7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZS5mYWRlSW4oKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbWUgPSBNYXRoLmZsb29yKF90aGlzLnRpbWVNYXggLSAoRGF0ZS5ub3coKSAtIF90aGlzLnN0YXJ0VGltZSkvMTAwMCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGdhbWVUaW1lci50ZXh0KF90aGlzLnRpbWUpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mYWlsTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICAgICAgICB0aWxlLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm5leHRMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdExldmVsKHRoaXMubGV2ZWwgKyAxKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5pbml0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDUpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGV2ZWwoKTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVMZXZlbC50ZXh0KCfQo9GA0L7QstC10L3RjCAnICsgbGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUNsaWNrcy50ZXh0KDApO1xuICAgICAgICAgICAgc3dpdGNoKGxldmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDEyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDMwMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gMTgxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWxlc1RvU29sdmUgPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc0luQ2hhaW4gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVNYXggPSAxODE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbGVzVG9Tb2x2ZSA9IDE4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzSW5DaGFpbiA9IDM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZU1heCA9IDEyMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFsZXNUb1NvbHZlID0gMjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNJbkNoYWluID0gNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTWF4ID0gNjE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRnYW1lVGltZXIudGV4dCh0aGlzLnRpbWVNYXggLSAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWxlc1RvU29sdmU7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVycy5wdXNoKGkgJSAodGhpcy50YWxlc1RvU29sdmUvdGhpcy50aWxlc0luQ2hhaW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IHNodWZmbGUodGhpcy5udW1iZXJzKTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRpbGVzLnB1c2gobmV3IFRpbGUoe1xuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IGksXG4gICAgICAgICAgICAgICAgICAgIGltZ051bWVyOiBlbCxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogX3RoaXNcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVUYXNrLnRleHQodGhpcy50aWxlc0luQ2hhaW4gKyAnICcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGlja3MgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzVG90YWwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuJGdhbWVDbGlja3MudGV4dCh0aGlzLmNsaWNrcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xlYXJMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVMZXZlbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC4kZGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZWwuJGRpdi51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY29tcGxldGVMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNjb3JlID0gKHRoaXMudGltZVNjb3JlTWF4ICogdGhpcy50aW1lL3RoaXMudGltZU1heCArIHRoaXMuY2xpY2tTY29yZU1heCAvIHRoaXMuY2xpY2tzKSAqIHRoaXMubGV2ZWw7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGV2ZWwgPSBNYXRoLmZsb29yKHNjb3JlKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUb3RhbCArPSB0aGlzLnNjb3JlTGV2ZWw7XG4gICAgICAgICAgICB0aGlzLiRnYW1lU2NvcmUudGV4dCh0aGlzLnNjb3JlTGV2ZWwpLmZhZGVJbigpO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZVNjb3JlVG90YWwudGV4dCh0aGlzLnNjb3JlVG90YWwpLmZhZGVJbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgPCA1KSB0aGlzLiRnYW1lQnV0dG9uLnRleHQoJ9Ch0LvQtdC00YPRjtGJ0LjQuSDRg9GA0L7QstC10L3RjCcpLmZhZGVJbigpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmZhaWxMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCAtPSAxO1xuICAgICAgICAgICAgdGhpcy4kZ2FtZUJ1dHRvbi50ZXh0KCfQndCw0YfQsNGC0Ywg0YPRgNC+0LLQtdC90Ywg0LfQsNC90L7QstC+JykuZmFkZUluKCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGV2ZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS53aW5MZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlTGV2ZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vcGVuVGFsZSA9IGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5lZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGltZ051bWVyID0gdGhpcy5vcGVuZWRbMF0uaW1nTnVtZXIsXG4gICAgICAgICAgICAgICAgICAgIGlzQmluZGVkVGFsZXMgPSB0aGlzLm9wZW5lZC5ldmVyeShmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLmltZ051bWVyID09PSBpbWdOdW1lcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQmluZGVkVGFsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZCA9IFtdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVuZWQubGVuZ3RoID4gdGhpcy50aWxlc0luQ2hhaW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc29sdmVkICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZCA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWxlc1RvU29sdmUgPT09IHRoaXMuc29sdmVkKSB0aGlzLndpbkxldmVsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgbmV3IEdhbWUoe1xuICAgICAgICAgICAgJGluZm9EaXY6ICQoJy5kZXNjLWdhbWUgZGl2JylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvYWRJbWFnZXMoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICBmdW5jdGlvbiBjb3VudCgpIHtcbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyID09PSA5KSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vaW1nL3RpbGUtJyArIGkgKyAnLmpwZyc7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gY291bnQ7XG4gICAgICAgICAgICBpbWFnZXMucHVzaChpbWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvYWRJbWFnZXMoaW5pdEdhbWUpO1xuXG59KTsiXX0=
