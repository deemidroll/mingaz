(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);

$(function () {
    var $withDesc = $('.with-desc'),
        $footer = $('.footer'),
        $fridge = $('.fridge-top-img'),
        // $fridgeBottom = $('.fridge-bottom'),
        $page = $('.page'),
        $leftText = $('.left-text'),
        $radio = $('.radio'),
        $fridgeBottomGrip = $('.fridge-bottom-grip'),
        $window = $(window),
        $document = $(document);
    
    var height,
        scrollStates;
    
    function resize() {
        height = parseInt($footer.css('height'), 10);
        scrollStates = [0, $radio[0].clientHeight, $fridgeBottomGrip.offset().top + $fridgeBottomGrip[0].clientWidth*186/805];
        $page.css('height', window.innerHeight + scrollStates[2]);
    }
    resize();
    $window.on('resize', resize);
    
    $withDesc.each(function (i) {
        $(this).hover(function () {
            var height = $footer.css('height');
            $footer.addClass('with-desc-' + (i + 1));
            $footer.css('height', height);
        }, function () {
            $footer.removeClass('with-desc-' + (i + 1));
            $footer.css('height', 'auto');
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
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gKHdpbmRvdy4kKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR3aXRoRGVzYyA9ICQoJy53aXRoLWRlc2MnKSxcbiAgICAgICAgJGZvb3RlciA9ICQoJy5mb290ZXInKSxcbiAgICAgICAgJGZyaWRnZSA9ICQoJy5mcmlkZ2UtdG9wLWltZycpLFxuICAgICAgICAvLyAkZnJpZGdlQm90dG9tID0gJCgnLmZyaWRnZS1ib3R0b20nKSxcbiAgICAgICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICAgICAkbGVmdFRleHQgPSAkKCcubGVmdC10ZXh0JyksXG4gICAgICAgICRyYWRpbyA9ICQoJy5yYWRpbycpLFxuICAgICAgICAkZnJpZGdlQm90dG9tR3JpcCA9ICQoJy5mcmlkZ2UtYm90dG9tLWdyaXAnKSxcbiAgICAgICAgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICAgICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG4gICAgXG4gICAgdmFyIGhlaWdodCxcbiAgICAgICAgc2Nyb2xsU3RhdGVzO1xuICAgIFxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoJGZvb3Rlci5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgICAgIHNjcm9sbFN0YXRlcyA9IFswLCAkcmFkaW9bMF0uY2xpZW50SGVpZ2h0LCAkZnJpZGdlQm90dG9tR3JpcC5vZmZzZXQoKS50b3AgKyAkZnJpZGdlQm90dG9tR3JpcFswXS5jbGllbnRXaWR0aCoxODYvODA1XTtcbiAgICAgICAgJHBhZ2UuY3NzKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQgKyBzY3JvbGxTdGF0ZXNbMl0pO1xuICAgIH1cbiAgICByZXNpemUoKTtcbiAgICAkd2luZG93Lm9uKCdyZXNpemUnLCByZXNpemUpO1xuICAgIFxuICAgICR3aXRoRGVzYy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICQodGhpcykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9ICRmb290ZXIuY3NzKCdoZWlnaHQnKTtcbiAgICAgICAgICAgICRmb290ZXIuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2xhc2VzVG9SZW1vdmUobmFtZSwgbikge1xuICAgICAgICB2YXIgY2xhc2VzVG9SZW1vdmUgPSAnJztcbiAgICAgICAgbiA9IG4gKyAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY2xhc2VzVG9SZW1vdmUgKz0gbmFtZSArIGkgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXNlc1RvUmVtb3ZlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgdmFyIGZyaWRnZUNsYXNlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNlc1RvUmVtb3ZlKCdvcGVuLScsIDIzKTtcbiAgICBcbiAgICBmdW5jdGlvbiBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgaCkge1xuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA8PSBoLzI0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0wJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozICYmIHNjcm9sbFRvcCA8IGgvMjQqNCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCo1KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNSAmJiBzY3JvbGxUb3AgPCBoLzI0KjYpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo2ICYmIHNjcm9sbFRvcCA8IGgvMjQqNyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjcgJiYgc2Nyb2xsVG9wIDwgaC8yNCo4KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOCAmJiBzY3JvbGxUb3AgPCBoLzI0KjkpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo5ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMCAmJiBzY3JvbGxUb3AgPCBoLzI0KjExKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjExICYmIHNjcm9sbFRvcCA8IGgvMjQqMTIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTExJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTIgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjE0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTUgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjE3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE3ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE3Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTggJiYgc2Nyb2xsVG9wIDwgaC8yNCoxOSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjIwKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIwICYmIHNjcm9sbFRvcCA8IGgvMjQqMjEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjEgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjIzKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIzKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gc2Nyb2xsUGFnZShzY3JvbGwpIHtcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IC1zY3JvbGwsXG4gICAgICAgICAgICBoID0gc2Nyb2xsU3RhdGVzWzFdO1xuICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgaC8xMikge1xuICAgICAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWZpeGVkJykuYWRkQ2xhc3MoJ2Zvb3Rlci1oaWRlJyk7XG4gICAgICAgICAgICAkbGVmdFRleHQucmVtb3ZlQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItaGlkZScpLmFkZENsYXNzKCdmb290ZXItZml4ZWQnKTtcbiAgICAgICAgICAgICRsZWZ0VGV4dC5hZGRDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgaCk7XG4gICAgfVxuICAgIFxuICAgIHZhciBteVNjcm9sbDtcbiAgICBmdW5jdGlvbiBpbml0TXlTY3JvbGwoKSB7XG4gICAgICAgIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHsgcHJvYmVUeXBlOiAzLCBtb3VzZVdoZWVsOiB0cnVlLCBjbGljazogdHJ1ZSB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgICAgICAgc2Nyb2xsUGFnZShteVNjcm9sbC55KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsJywgdXBkYXRlUG9zaXRpb24pO1xuICAgICAgICBteVNjcm9sbC5vbignc2Nyb2xsRW5kJywgdXBkYXRlUG9zaXRpb24pO1xuICAgIH1cbiAgICBcbiAgICB3aW5kb3cubG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpbml0TXlTY3JvbGwoKTtcbiAgICB9O1xuICAgIFxuICAgICRkb2N1bWVudC5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5uYXYtbWFpbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1swXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1vdXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMV0sIDEwMDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtZ2FtZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1syXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgXG4gICAgXG4gICAgdmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICAgICAnLi9tdXNpYy9CZWNvdXNlIEkgV2FudCBZb3UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL0Jyb2tlbiBQcm9taXNlLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9EcmFnLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9NZWRzLm1wMycsXG4gICAgICAgICAgICAnLi9tdXNpYy9PbmUgT2YgQSBLaW5kLm1wMydcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayArPSAxO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2sgPiB0aGlzLnRyYWNrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzW3RoaXMuY3VycmVudFRyYWNrXTtcbiAgICB9O1xuICAgIFxuICAgIFRyYWNrTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrc1swXTtcbiAgICB9O1xuICAgIFxuICAgIHZhciB0cmFja0xpc3QgPSBuZXcgVHJhY2tMaXN0KCk7XG4gICAgXG4gICAgLy8gU2V0dXAgdGhlIHBsYXllciB0byBhdXRvcGxheSB0aGUgbmV4dCB0cmFja1xuICAgIHZhciBhID0gd2luZG93LmF1ZGlvanMuY3JlYXRlQWxsKHtcbiAgICAgICAgdHJhY2tFbmRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAgICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiB0aGUgZmlyc3QgdHJhY2tcbiAgICB2YXIgYXVkaW8gPSBhWzBdO1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgICQoJy5yYWRpby1tdXNpYy1zb25nJykudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLnBsYXlQYXVzZSgpO1xuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9KTtcbn0pOyJdfQ==
