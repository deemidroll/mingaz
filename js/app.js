(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);

$(function () {
    var $withDesc = $('.with-desc'),
        $footer = $('.footer'),
        $fridge = $('.fridge-top-img'),
        $fridgeInner = $('.fridge-inner'),
        // $fridgeBottom = $('.fridge-bottom'),
        $page = $('.page'),
        $leftText = $('.left-text'),
        $radio = $('.radio'),
        // $fridgeBottomGrip = $('.fridge-bottom-grip'),
        $window = $(window),
        $document = $(document);
    
    var height,
        scrollStates;
    
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
            $footer.css('height', height-20).addClass('with-desc-' + (i + 1));
        }, function () {
            $footer.removeClass('with-desc-' + (i + 1)).css('height', 'auto');
        });
    });
    
    function prepareClasesToRemove(name, n) {
        var clasesToRemove = '';
        n = n + 1;
        for (var i = 1; i < n; i++) {
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
        var scrollTop = -scroll,
            h = scrollStates[1];
        if (scrollTop < h/12) {
            $footer.removeClass('footer-fixed').addClass('footer-hide');
            $leftText.removeClass('left-text-visible');
        } else {
            $footer.removeClass('footer-hide').addClass('footer-fixed');
            $leftText.addClass('left-text-visible');
        }
        if (scrollStates[2] - scrollTop < 30) {
            $footer.css('height', height).addClass('with-game');
        } else {
            $footer.removeClass('with-game').css('height', 'auto');
        }
        animateDoorState(scrollTop, h);
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
    $('.radio-music-song').text(audio.mp3.slice(8, -4));
    $('.radio-music-btn-pause').click(function(e) {
        e.preventDefault();
        audio.playPause();
    });
    // Load in a track on click
    $('.radio-music-btn-next').click(function(e) {
        e.preventDefault();
        audio.load(trackList.next());
        $('.radio-music-song').text(audio.mp3.slice(8, -4));
        audio.play();
    });

    // game
    var images = [];
    function initGame() {
        var Tale = function (options) {
            var _this = this;
            this.div = options.div;
            this.number = options.number;
            this.img = options.img;
            this.lockedImg = options.lockedImg;
            this.backImg = options.backImg;
            this.isOpen = false;
            this.isLocked = false;
            this.binded = [];
            this.div.append($(this.img).clone());
            this.div.click(function () {
                _this.open();
            });
        };
        Tale.prototype.bind = function () {
            this.binded.push(arguments);
            return this;
        };
        Tale.prototype.unbindAll = function () {
            this.binded = [];
            return this;
        };
        Tale.prototype.open = function () {
            var _this = this;
            this.isOpen = true;
            _this.div.children().fadeIn(200);
            return this;
        };
        Tale.prototype.close = function () {
            this.isOpen = false;
            console.log(this.div.children());
            this.div.children().fadeOut();
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

        // var testTale = new Tale({
        //     div: $('.game-tale-0'),
        //     number: 0,
        //     img: images[0]
        // });

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
        };
        Game.prototype.init = function () {
            var _this = this;
            for (var i = 0; i < 20; i++) {
                this.tales.push(new Tale({
                    div: $('.game-tale-' + i),
                    number: i,
                    img: _this.images[i%10],
                    lockedImg: _this.lockedImg,
                    backImg: _this.backImg
                }));
            }
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
            img.src = '../img/tale-' + i + '.jpg';
            img.onload = count;
            images.push(img);
        }
    }
    loadImages(initGame);

});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gKHdpbmRvdy4kKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR3aXRoRGVzYyA9ICQoJy53aXRoLWRlc2MnKSxcbiAgICAgICAgJGZvb3RlciA9ICQoJy5mb290ZXInKSxcbiAgICAgICAgJGZyaWRnZSA9ICQoJy5mcmlkZ2UtdG9wLWltZycpLFxuICAgICAgICAkZnJpZGdlSW5uZXIgPSAkKCcuZnJpZGdlLWlubmVyJyksXG4gICAgICAgIC8vICRmcmlkZ2VCb3R0b20gPSAkKCcuZnJpZGdlLWJvdHRvbScpLFxuICAgICAgICAkcGFnZSA9ICQoJy5wYWdlJyksXG4gICAgICAgICRsZWZ0VGV4dCA9ICQoJy5sZWZ0LXRleHQnKSxcbiAgICAgICAgJHJhZGlvID0gJCgnLnJhZGlvJyksXG4gICAgICAgIC8vICRmcmlkZ2VCb3R0b21HcmlwID0gJCgnLmZyaWRnZS1ib3R0b20tZ3JpcCcpLFxuICAgICAgICAkd2luZG93ID0gJCh3aW5kb3cpLFxuICAgICAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbiAgICBcbiAgICB2YXIgaGVpZ2h0LFxuICAgICAgICBzY3JvbGxTdGF0ZXM7XG4gICAgXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICB2YXIgcmFkaW9IZWlnaHQgPSAkcmFkaW9bMF0uY2xpZW50V2lkdGggKiAxMjQvMTA4MCArIDIwLFxuICAgICAgICAgICAgcGVyY2VudCA9IDAuNDQ7XG4gICAgICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgICAgICBzY3JvbGxTdGF0ZXMgPSBbMCwgcmFkaW9IZWlnaHQsIHJhZGlvSGVpZ2h0ICsgJGZyaWRnZUlubmVyWzBdLmNsaWVudFdpZHRoICogJGZyaWRnZUlubmVyLmF0dHIoJ2hlaWdodCcpLyRmcmlkZ2VJbm5lci5hdHRyKCd3aWR0aCcpICogcGVyY2VudF07XG4gICAgICAgICRwYWdlLmNzcygnaGVpZ2h0Jywgc2Nyb2xsU3RhdGVzWzJdICsgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICB9XG4gICAgcmVzaXplKCk7XG4gICAgJHdpbmRvdy5vbigncmVzaXplJywgcmVzaXplKTtcbiAgICBcbiAgICAkd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAkKHRoaXMpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQtMjApLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNsYXNlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICAgICAgdmFyIGNsYXNlc1RvUmVtb3ZlID0gJyc7XG4gICAgICAgIG4gPSBuICsgMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNsYXNlc1RvUmVtb3ZlICs9IG5hbWUgKyBpICsgJyAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHZhciBmcmlkZ2VDbGFzZXNUb1JlbW92ZSA9IHByZXBhcmVDbGFzZXNUb1JlbW92ZSgnb3Blbi0nLCAyMyk7XG4gICAgXG4gICAgZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIgJiYgc2Nyb2xsVG9wIDwgaC8yNCozKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqNSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjUgJiYgc2Nyb2xsVG9wIDwgaC8yNCo2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo3ICYmIHNjcm9sbFRvcCA8IGgvMjQqOCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjggJiYgc2Nyb2xsVG9wIDwgaC8yNCo5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi05Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTAgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEyICYmIHNjcm9sbFRvcCA8IGgvMjQqMTMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTMgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjE1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE1ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE1Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTYgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjE4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE4ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTkgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMCAmJiBzY3JvbGxUb3AgPCBoLzI0KjIxKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIxICYmIHNjcm9sbFRvcCA8IGgvMjQqMjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIxJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjIgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2Nyb2xsKSB7XG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAtc2Nyb2xsLFxuICAgICAgICAgICAgaCA9IHNjcm9sbFN0YXRlc1sxXTtcbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8IGgvMTIpIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFN0YXRlc1syXSAtIHNjcm9sbFRvcCA8IDMwKSB7XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KS5hZGRDbGFzcygnd2l0aC1nYW1lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWdhbWUnKS5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpO1xuICAgIH1cbiAgICBcbiAgICB2YXIgbXlTY3JvbGw7XG4gICAgZnVuY3Rpb24gaW5pdE15U2Nyb2xsKCkge1xuICAgICAgICBteVNjcm9sbCA9IG5ldyB3aW5kb3cuSVNjcm9sbCgnI3dyYXBwZXInLCB7IHByb2JlVHlwZTogMywgbW91c2VXaGVlbDogdHJ1ZSwgY2xpY2s6IHRydWUgfSk7XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgICAgICAgIHNjcm9sbFBhZ2UobXlTY3JvbGwueSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgbXlTY3JvbGwub24oJ3Njcm9sbEVuZCcsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgd2luZG93LmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5pdE15U2Nyb2xsKCk7XG4gICAgfTtcbiAgICBcbiAgICAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcubmF2LW1haW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtb3VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LWdhbWUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIGF1ZGlvXG4gICAgdmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICAgICAnLi9tdXNpYy9CZWNvdXNlIEkgV2FudCBZb3UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL0Jyb2tlbiBQcm9taXNlLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9EcmFnLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9NZWRzLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9PbmUgT2YgQSBLaW5kLm1wMydcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayArPSAxO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2sgPiB0aGlzLnRyYWNrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzW3RoaXMuY3VycmVudFRyYWNrXTtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1swXTtcbiAgICB9O1xuICAgIFxuICAgIHZhciB0cmFja0xpc3QgPSBuZXcgVHJhY2tMaXN0KCk7XG4gICAgXG4gICAgLy8gU2V0dXAgdGhlIHBsYXllciB0byBhdXRvcGxheSB0aGUgbmV4dCB0cmFja1xuICAgIHZhciBhID0gd2luZG93LmF1ZGlvanMuY3JlYXRlQWxsKHtcbiAgICAgICAgdHJhY2tFbmRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAgICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiB0aGUgZmlyc3QgdHJhY2tcbiAgICB2YXIgYXVkaW8gPSBhWzBdO1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgICQoJy5yYWRpby1tdXNpYy1zb25nJykudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLnBsYXlQYXVzZSgpO1xuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9KTtcblxuICAgIC8vIGdhbWVcbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gICAgICAgIHZhciBUYWxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmRpdiA9IG9wdGlvbnMuZGl2O1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBvcHRpb25zLm51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuaW1nID0gb3B0aW9ucy5pbWc7XG4gICAgICAgICAgICB0aGlzLmxvY2tlZEltZyA9IG9wdGlvbnMubG9ja2VkSW1nO1xuICAgICAgICAgICAgdGhpcy5iYWNrSW1nID0gb3B0aW9ucy5iYWNrSW1nO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYmluZGVkID0gW107XG4gICAgICAgICAgICB0aGlzLmRpdi5hcHBlbmQoJCh0aGlzLmltZykuY2xvbmUoKSk7XG4gICAgICAgICAgICB0aGlzLmRpdi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRlZC5wdXNoKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGFsZS5wcm90b3R5cGUudW5iaW5kQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5iaW5kZWQgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUYWxlLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIF90aGlzLmRpdi5jaGlsZHJlbigpLmZhZGVJbigyMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGl2LmNoaWxkcmVuKCkpO1xuICAgICAgICAgICAgdGhpcy5kaXYuY2hpbGRyZW4oKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVGFsZS5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLnVubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUYWxlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kaXYuZmFkZU91dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRhbGUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmRpdi5mYWRlSW4oKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHZhciB0ZXN0VGFsZSA9IG5ldyBUYWxlKHtcbiAgICAgICAgLy8gICAgIGRpdjogJCgnLmdhbWUtdGFsZS0wJyksXG4gICAgICAgIC8vICAgICBudW1iZXI6IDAsXG4gICAgICAgIC8vICAgICBpbWc6IGltYWdlc1swXVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICB2YXIgR2FtZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gMTtcbiAgICAgICAgICAgIHRoaXMudGltZVNjb3JlID0gOTAwO1xuICAgICAgICAgICAgdGhpcy5mYWlsU2NvcmUgPSA5MDA7XG4gICAgICAgICAgICB0aGlzLmZhaWxzID0gMDtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRhbGVzID0gW107XG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICAgICAgICAgIHRoaXMubG9ja2VkSW1nID0ge307XG4gICAgICAgICAgICB0aGlzLmJhY2tJbWcgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbmZvRGl2ID0gb3B0aW9ucy5pbmZvRGl2O1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudGFsZXMucHVzaChuZXcgVGFsZSh7XG4gICAgICAgICAgICAgICAgICAgIGRpdjogJCgnLmdhbWUtdGFsZS0nICsgaSksXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgaW1nOiBfdGhpcy5pbWFnZXNbaSUxMF0sXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZEltZzogX3RoaXMubG9ja2VkSW1nLFxuICAgICAgICAgICAgICAgICAgICBiYWNrSW1nOiBfdGhpcy5iYWNrSW1nXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBHYW1lLnByb3RvdHlwZS5vdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUubmV4dExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIEdhbWUucHJvdG90eXBlLmNsZWFyTGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5wcm90b3R5cGUuZmFpbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lKHtcbiAgICAgICAgICAgIGluZm9EaXY6ICQoJy5kZXNjLWdhbWUgZGl2JylcbiAgICAgICAgfSk7XG4gICAgICAgIGdhbWUuaW5pdCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgZnVuY3Rpb24gY291bnQoKSB7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICBpZiAoY291bnRlciA9PT0gOSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9ICcuLi9pbWcvdGFsZS0nICsgaSArICcuanBnJztcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBjb3VudDtcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKGltZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlcyhpbml0R2FtZSk7XG5cbn0pOyJdfQ==
