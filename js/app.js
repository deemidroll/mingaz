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
            $footer.css('height', height-20).addClass('with-desc-' + (i + 1));
        }, function () {
            $footer.removeClass('with-desc-' + (i + 1)).css('height', 'auto');
        });
    });
    
    function prepareClasesToRemove(name, n) {
        var clasesToRemove = '';
        n = n + 1;
        for (var i = 0; i < n; i++) {
            clasesToRemove += name + i + ' ';
        }
        return clasesToRemove.slice(0, -1);
    }
    var fridgeClasesToRemove = prepareClasesToRemove('open-', 23);
    
    function animateDoorState(scrollTop, h) {
        switch (true) {
            case (scrollTop <= h/24):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-0');
            break;
            case (scrollTop > h/24 && scrollTop < h/24*2):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-1');
            break;
            case (scrollTop > h/24*2 && scrollTop < h/24*3):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-2');
            break;
            case (scrollTop > h/24*3 && scrollTop < h/24*4):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-3');
            break;
            case (scrollTop > h/24*4 && scrollTop < h/24*5):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-4');
            break;
            case (scrollTop > h/24*5 && scrollTop < h/24*6):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-5');
            break;
            case (scrollTop > h/24*6 && scrollTop < h/24*7):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-6');
            break;
            case (scrollTop > h/24*7 && scrollTop < h/24*8):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-7');
            break;
            case (scrollTop > h/24*8 && scrollTop < h/24*9):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-8');
            break;
            case (scrollTop > h/24*9 && scrollTop < h/24*10):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-9');
            break;
            case (scrollTop > h/24*10 && scrollTop < h/24*11):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-10');
            break;
            case (scrollTop > h/24*11 && scrollTop < h/24*12):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-11');
            break;
            case (scrollTop > h/24*12 && scrollTop < h/24*13):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-12');
            break;
            case (scrollTop > h/24*13 && scrollTop < h/24*14):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-13');
            break;
            case (scrollTop > h/24*14 && scrollTop < h/24*15):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-14');
            break;
            case (scrollTop > h/24*15 && scrollTop < h/24*16):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-15');
            break;
            case (scrollTop > h/24*16 && scrollTop < h/24*17):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-16');
            break;
            case (scrollTop > h/24*17 && scrollTop < h/24*18):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-17');
            break;
            case (scrollTop > h/24*18 && scrollTop < h/24*19):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-18');
            break;
            case (scrollTop > h/24*19 && scrollTop < h/24*20):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-19');
            break;
            case (scrollTop > h/24*20 && scrollTop < h/24*21):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-20');
            break;
            case (scrollTop > h/24*21 && scrollTop < h/24*22):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-21');
            break;
            case (scrollTop > h/24*22 && scrollTop < h/24*23):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-22');
            break;
            case (scrollTop > h/24*23):
                $fridge.removeClass(fridgeClasesToRemove).addClass('open-23');
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
            $footer.css('height', height - 20).addClass('with-game');
        } else {
            $footer.removeClass('with-game').css('height', 'auto');
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
            './music/Becouse I Want You.mp3',
            './music/Broken Promise.mp3',
            './music/Drag.mp3',
            './music/Meds.mp3',
            './music/One Of A Kind.mp3'
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
        var Tale = function (options) {
            var _this = this;
            this.div = options.div;
            this.number = options.number;
            this.imgNumer = options.imgNumer;
            this.img = options.img;
            this.lockedImg = options.lockedImg;
            this.backImg = options.backImg;
            this.isOpen = false;
            this.isLocked = false;
            this.binded = [];
            this.game = options.game;
            this.bindedTalesInLevel = 2;
            this.div.append($(this.img).clone());
            this.solved = false;
            this.div.click(function () {
                _this.open();
            });
        };
        Tale.prototype.bind = function (tales) {
            var _this = this;
            tales.forEach(function (el) {
                _this.binded.push(el);
            });
            return this;
        };
        Tale.prototype.unbindAll = function () {
            this.binded = [];
            return this;
        };
        Tale.prototype.open = function () {
            this.isOpen = true;
            this.div.children().fadeIn(200);
            this.game.opened.push(this);
            if (this.game.opened.length > 1) {
                var imgNumer = this.game.opened[0].imgNumer,
                    isBindedTales = this.game.opened.every(function (el) {
                    return el.imgNumer === imgNumer;
                });
                if (!isBindedTales) {
                    this.game.opened.forEach(function (el) {
                        el.close();
                    });
                    this.game.opened = [];
                } else {
                    this.game.opened.forEach(function (el) {
                        el.solve();
                    });
                    this.game.opened = [];
                }
            }
            return this;
        };
        Tale.prototype.close = function () {
            this.isOpen = false;
            this.div.children().fadeOut();
            return this;
        };
        Tale.prototype.solve = function () {
            this.solved = true;
            return this;
        };
        Tale.prototype.unsolve = function () {
            this.solved = false;
            return this;
        };
        Tale.prototype.lock = function () {
            this.isLocked = true;
            return this;
        };
        Tale.prototype.unlock = function () {
            this.isLocked = false;
            return this;
        };
        Tale.prototype.hide = function () {
            this.div.fadeOut();
            return this;
        };
        Tale.prototype.show = function () {
            this.div.fadeIn();
            return this;
        };

        var Game = function (options) {
            this.level = 1;
            this.timeScore = 900;
            this.failScore = 900;
            this.fails = 0;
            this.time = 0;
            this.tales = [];
            this.images = images;
            this.lockedImg = {};
            this.backImg = {};
            this.started = false;
            this.infoDiv = options.infoDiv;
            this.numbers = [];
            this.opened = [];
            for (var i = 0; i < 20; i++) {
                this.numbers.push(i%10);
            }
            this.numbers = shuffle(this.numbers);
        };
        Game.prototype.init = function () {
            var _this = this;
            this.numbers.forEach(function (el, i) {
                _this.tales.push(new Tale({
                    div: $('.game-tale-' + i),
                    number: i,
                    imgNumer: el,
                    img: _this.images[el],
                    lockedImg: _this.lockedImg,
                    backImg: _this.backImg,
                    game: _this
                }));
            });
            this.tales.forEach(function (tale, i, tales) {
                tale.bind((function () {
                    return tales.filter(function (el) {
                        return el.imgNumer === tale.imgNumer && el !== tale;
                    });
                })());
            });
            return this;
        };
        Game.prototype.start = function () {
            this.started = true;
            return this;
        };
        Game.prototype.over = function () {
            this.started = false;
            return this;
        };
        Game.prototype.nextLevel = function () {
    
            return this;
        };
        Game.prototype.clearLevel = function () {
    
            return this;
        };
        Game.prototype.fail = function () {
    
            return this;
        };
        var game = new Game({
            infoDiv: $('.desc-game div')
        });
        game.init();
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
            img.src = './img/tale-' + i + '.jpg';
            img.onload = count;
            images.push(img);
        }
    }
    loadImages(initGame);

});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gKHdpbmRvdy4kKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR3aXRoRGVzYyA9ICQoJy53aXRoLWRlc2MnKSxcbiAgICAgICAgJGZvb3RlciA9ICQoJy5mb290ZXInKSxcbiAgICAgICAgJGZyaWRnZSA9ICQoJy5mcmlkZ2UtZG9vcicpLFxuICAgICAgICAkZnJpZGdlSW5uZXIgPSAkKCcuZnJpZGdlLWlubmVyJyksXG4gICAgICAgICRwYWdlID0gJCgnLnBhZ2UnKSxcbiAgICAgICAgJGxlZnRUZXh0ID0gJCgnLmxlZnQtdGV4dCcpLFxuICAgICAgICAkcmFkaW8gPSAkKCcucmFkaW8nKSxcbiAgICAgICAgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICAgICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG4gICAgXG4gICAgdmFyIGhlaWdodCxcbiAgICAgICAgc2Nyb2xsU3RhdGVzLFxuICAgICAgICBzY3JvbGxUb3A7XG4gICAgXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICB2YXIgcmFkaW9IZWlnaHQgPSAkcmFkaW9bMF0uY2xpZW50V2lkdGggKiAxMjQvMTA4MCArIDIwLFxuICAgICAgICAgICAgcGVyY2VudCA9IDAuNDQ7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICBzY3JvbGxTdGF0ZXMgPSBbMCwgcmFkaW9IZWlnaHQsIHJhZGlvSGVpZ2h0ICsgJGZyaWRnZUlubmVyWzBdLmNsaWVudFdpZHRoICogJGZyaWRnZUlubmVyLmF0dHIoJ2hlaWdodCcpLyRmcmlkZ2VJbm5lci5hdHRyKCd3aWR0aCcpICogcGVyY2VudF07XG4gICAgICAgICRwYWdlLmNzcygnaGVpZ2h0Jywgc2Nyb2xsU3RhdGVzWzJdICsgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICB9XG4gICAgcmVzaXplKCk7XG4gICAgJHdpbmRvdy5vbigncmVzaXplJywgcmVzaXplKTtcbiAgICBcbiAgICAkd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAkKHRoaXMpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMjQqMTUpIHJldHVybjtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQtMjApLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNsYXNlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICAgICAgdmFyIGNsYXNlc1RvUmVtb3ZlID0gJyc7XG4gICAgICAgIG4gPSBuICsgMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNsYXNlc1RvUmVtb3ZlICs9IG5hbWUgKyBpICsgJyAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHZhciBmcmlkZ2VDbGFzZXNUb1JlbW92ZSA9IHByZXBhcmVDbGFzZXNUb1JlbW92ZSgnb3Blbi0nLCAyMyk7XG4gICAgXG4gICAgZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIgJiYgc2Nyb2xsVG9wIDwgaC8yNCozKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqNSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjUgJiYgc2Nyb2xsVG9wIDwgaC8yNCo2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo3ICYmIHNjcm9sbFRvcCA8IGgvMjQqOCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjggJiYgc2Nyb2xsVG9wIDwgaC8yNCo5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi05Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTAgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEyICYmIHNjcm9sbFRvcCA8IGgvMjQqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTMgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjE1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE1ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE1Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTYgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjE4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE4ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTkgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMCAmJiBzY3JvbGxUb3AgPCBoLzI0KjIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIxICYmIHNjcm9sbFRvcCA8IGgvMjQqMjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIxJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjIgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2Nyb2xsKSB7XG4gICAgICAgIHNjcm9sbFRvcCA9IC1zY3JvbGw7XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBzY3JvbGxTdGF0ZXNbMV0vMTIpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFN0YXRlc1syXSAtIHNjcm9sbFRvcCA8IDMwKSB7XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0IC0gMjApLmFkZENsYXNzKCd3aXRoLWdhbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ3dpdGgtZ2FtZScpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICAgICAgfVxuICAgICAgICBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgc2Nyb2xsU3RhdGVzWzFdKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG15U2Nyb2xsO1xuICAgIGZ1bmN0aW9uIGluaXRNeVNjcm9sbCgpIHtcbiAgICAgICAgbXlTY3JvbGwgPSBuZXcgd2luZG93LklTY3JvbGwoJyN3cmFwcGVyJywgeyBwcm9iZVR5cGU6IDMsIG1vdXNlV2hlZWw6IHRydWUsIGNsaWNrOiB0cnVlIH0pO1xuICAgIFxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICAgICAgICBzY3JvbGxQYWdlKG15U2Nyb2xsLnkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGwnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGxFbmQnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgfVxuICAgIFxuICAgIHdpbmRvdy5sb2FkZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGluaXRNeVNjcm9sbCgpO1xuICAgIH07XG4gICAgXG4gICAgJGRvY3VtZW50Lm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLm5hdi1tYWluJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzBdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LW91cicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1sxXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzJdLCAxMDAwKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBhdWRpb1xuICAgIHZhciBUcmFja0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHJhY2tzID0gW1xuICAgICAgICAgICAgJy4vbXVzaWMvQmVjb3VzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9Ccm9rZW4gUHJvbWlzZS5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvRHJhZy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvTWVkcy5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvT25lIE9mIEEgS2luZC5tcDMnXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNrID4gdGhpcy50cmFja3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1t0aGlzLmN1cnJlbnRUcmFja107XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbMF07XG4gICAgfTtcbiAgICBcbiAgICB2YXIgdHJhY2tMaXN0ID0gbmV3IFRyYWNrTGlzdCgpO1xuICAgIFxuICAgIC8vIFNldHVwIHRoZSBwbGF5ZXIgdG8gYXV0b3BsYXkgdGhlIG5leHQgdHJhY2tcbiAgICB2YXIgYSA9IHdpbmRvdy5hdWRpb2pzLmNyZWF0ZUFsbCh7XG4gICAgICAgIHRyYWNrRW5kZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgICAgICQoJy5yYWRpby1tdXNpYy1zb25nJykudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gdGhlIGZpcnN0IHRyYWNrXG4gICAgdmFyIGF1ZGlvID0gYVswXTtcbiAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5maXJzdCgpKTtcbiAgICBmdW5jdGlvbiBzaG93QnV0dG9uKCkge1xuICAgICAgICBpZiAoYXVkaW8ucGxheWluZykge1xuICAgICAgICAgICAgJHBsYXlQYXVzZS5jaGlsZHJlbigpLmF0dHIoJ3NyYycsICcuL2ltZy9wYXVzZS5wbmcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwbGF5UGF1c2UuY2hpbGRyZW4oKS5hdHRyKCdzcmMnLCAnLi9pbWcvcGxheS5wbmcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgJHBsYXlQYXVzZSA9ICQoJy5yYWRpby1tdXNpYy1idG4tcGF1c2UnKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgJHBsYXlQYXVzZS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIGEgdHJhY2sgb24gY2xpY2tcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLW5leHQnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ubG9hZCh0cmFja0xpc3QubmV4dCgpKTtcbiAgICAgICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIHNob3dCdXR0b24oKTtcbiAgICB9KTtcblxuICAgIC8vIGdhbWVcbiAgICBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleCA7XG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gICAgICAgIHZhciBUYWxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmRpdiA9IG9wdGlvbnMuZGl2O1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBvcHRpb25zLm51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuaW1nTnVtZXIgPSBvcHRpb25zLmltZ051bWVyO1xuICAgICAgICAgICAgdGhpcy5pbWcgPSBvcHRpb25zLmltZztcbiAgICAgICAgICAgIHRoaXMubG9ja2VkSW1nID0gb3B0aW9ucy5sb2NrZWRJbWc7XG4gICAgICAgICAgICB0aGlzLmJhY2tJbWcgPSBvcHRpb25zLmJhY2tJbWc7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5iaW5kZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IG9wdGlvbnMuZ2FtZTtcbiAgICAgICAgICAgIHRoaXMuYmluZGVkVGFsZXNJbkxldmVsID0gMjtcbiAgICAgICAgICAgIHRoaXMuZGl2LmFwcGVuZCgkKHRoaXMuaW1nKS5jbG9uZSgpKTtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRpdi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAodGFsZXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0YWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmJpbmRlZC5wdXNoKGVsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGVkID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGFsZS5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGl2LmNoaWxkcmVuKCkuZmFkZUluKDIwMCk7XG4gICAgICAgICAgICB0aGlzLmdhbWUub3BlbmVkLnB1c2godGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLm9wZW5lZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGltZ051bWVyID0gdGhpcy5nYW1lLm9wZW5lZFswXS5pbWdOdW1lcixcbiAgICAgICAgICAgICAgICAgICAgaXNCaW5kZWRUYWxlcyA9IHRoaXMuZ2FtZS5vcGVuZWQuZXZlcnkoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5pbWdOdW1lciA9PT0gaW1nTnVtZXI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JpbmRlZFRhbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5vcGVuZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUub3BlbmVkID0gW107XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLm9wZW5lZC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5vcGVuZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGFsZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kaXYuY2hpbGRyZW4oKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGFsZS5wcm90b3R5cGUuc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGFsZS5wcm90b3R5cGUudW5zb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGFsZS5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLnVubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUYWxlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kaXYuZmFkZU91dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmRpdi5mYWRlSW4oKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBHYW1lID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICAgICAgdGhpcy50aW1lU2NvcmUgPSA5MDA7XG4gICAgICAgICAgICB0aGlzLmZhaWxTY29yZSA9IDkwMDtcbiAgICAgICAgICAgIHRoaXMuZmFpbHMgPSAwO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMudGFsZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICAgICAgdGhpcy5sb2NrZWRJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuYmFja0ltZyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluZm9EaXYgPSBvcHRpb25zLmluZm9EaXY7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlcnMucHVzaChpJTEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtYmVycyA9IHNodWZmbGUodGhpcy5udW1iZXJzKTtcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm51bWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50YWxlcy5wdXNoKG5ldyBUYWxlKHtcbiAgICAgICAgICAgICAgICAgICAgZGl2OiAkKCcuZ2FtZS10YWxlLScgKyBpKSxcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBpLFxuICAgICAgICAgICAgICAgICAgICBpbWdOdW1lcjogZWwsXG4gICAgICAgICAgICAgICAgICAgIGltZzogX3RoaXMuaW1hZ2VzW2VsXSxcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkSW1nOiBfdGhpcy5sb2NrZWRJbWcsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tJbWc6IF90aGlzLmJhY2tJbWcsXG4gICAgICAgICAgICAgICAgICAgIGdhbWU6IF90aGlzXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRhbGVzLmZvckVhY2goZnVuY3Rpb24gKHRhbGUsIGksIHRhbGVzKSB7XG4gICAgICAgICAgICAgICAgdGFsZS5iaW5kKChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWxlcy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuaW1nTnVtZXIgPT09IHRhbGUuaW1nTnVtZXIgJiYgZWwgIT09IHRhbGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLm92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5uZXh0TGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuY2xlYXJMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5mYWlsID0gZnVuY3Rpb24gKCkge1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnYW1lID0gbmV3IEdhbWUoe1xuICAgICAgICAgICAgaW5mb0RpdjogJCgnLmRlc2MtZ2FtZSBkaXYnKVxuICAgICAgICB9KTtcbiAgICAgICAgZ2FtZS5pbml0KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvYWRJbWFnZXMoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICBmdW5jdGlvbiBjb3VudCgpIHtcbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyID09PSA5KSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vaW1nL3RhbGUtJyArIGkgKyAnLmpwZyc7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gY291bnQ7XG4gICAgICAgICAgICBpbWFnZXMucHVzaChpbWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvYWRJbWFnZXMoaW5pdEdhbWUpO1xuXG59KTsiXX0=
