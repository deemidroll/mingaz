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
        scrollStates = [0, $radio[0].clientWidth * 124/1080 + 20, $radio[0].clientWidth * 124/1080 + 20 + $fridge[0].clientWidth * 585/814 + $fridgeBottomGrip[0].clientWidth*186/805];
        $page.css('height', window.innerHeight + scrollStates[2]);
        console.log($fridgeBottomGrip.offset().top, $fridgeBottomGrip[0].clientWidth*186/805);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQgPSAod2luZG93LiQpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpdGhEZXNjID0gJCgnLndpdGgtZGVzYycpLFxuICAgICAgICAkZm9vdGVyID0gJCgnLmZvb3RlcicpLFxuICAgICAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS10b3AtaW1nJyksXG4gICAgICAgIC8vICRmcmlkZ2VCb3R0b20gPSAkKCcuZnJpZGdlLWJvdHRvbScpLFxuICAgICAgICAkcGFnZSA9ICQoJy5wYWdlJyksXG4gICAgICAgICRsZWZ0VGV4dCA9ICQoJy5sZWZ0LXRleHQnKSxcbiAgICAgICAgJHJhZGlvID0gJCgnLnJhZGlvJyksXG4gICAgICAgICRmcmlkZ2VCb3R0b21HcmlwID0gJCgnLmZyaWRnZS1ib3R0b20tZ3JpcCcpLFxuICAgICAgICAkd2luZG93ID0gJCh3aW5kb3cpLFxuICAgICAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbiAgICBcbiAgICB2YXIgaGVpZ2h0LFxuICAgICAgICBzY3JvbGxTdGF0ZXM7XG4gICAgXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICAgICAgc2Nyb2xsU3RhdGVzID0gWzAsICRyYWRpb1swXS5jbGllbnRXaWR0aCAqIDEyNC8xMDgwICsgMjAsICRyYWRpb1swXS5jbGllbnRXaWR0aCAqIDEyNC8xMDgwICsgMjAgKyAkZnJpZGdlWzBdLmNsaWVudFdpZHRoICogNTg1LzgxNCArICRmcmlkZ2VCb3R0b21HcmlwWzBdLmNsaWVudFdpZHRoKjE4Ni84MDVdO1xuICAgICAgICAkcGFnZS5jc3MoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCArIHNjcm9sbFN0YXRlc1syXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRmcmlkZ2VCb3R0b21HcmlwLm9mZnNldCgpLnRvcCwgJGZyaWRnZUJvdHRvbUdyaXBbMF0uY2xpZW50V2lkdGgqMTg2LzgwNSk7XG4gICAgfVxuICAgIHJlc2l6ZSgpO1xuICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gICAgXG4gICAgJHdpdGhEZXNjLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gJGZvb3Rlci5jc3MoJ2hlaWdodCcpO1xuICAgICAgICAgICAgJGZvb3Rlci5hZGRDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGZ1bmN0aW9uIHByZXBhcmVDbGFzZXNUb1JlbW92ZShuYW1lLCBuKSB7XG4gICAgICAgIHZhciBjbGFzZXNUb1JlbW92ZSA9ICcnO1xuICAgICAgICBuID0gbiArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjbGFzZXNUb1JlbW92ZSArPSBuYW1lICsgaSArICcgJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xhc2VzVG9SZW1vdmUuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICB2YXIgZnJpZGdlQ2xhc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc2VzVG9SZW1vdmUoJ29wZW4tJywgMjMpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBoKSB7XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wIDw9IGgvMjQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjIpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyICYmIHNjcm9sbFRvcCA8IGgvMjQqMyk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjMgJiYgc2Nyb2xsVG9wIDwgaC8yNCo0KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjUpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo1ICYmIHNjcm9sbFRvcCA8IGgvMjQqNik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjYgJiYgc2Nyb2xsVG9wIDwgaC8yNCo3KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjgpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo4ICYmIHNjcm9sbFRvcCA8IGgvMjQqOSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjkgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEwICYmIHNjcm9sbFRvcCA8IGgvMjQqMTEpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTEgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMik6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjEzKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEzICYmIHNjcm9sbFRvcCA8IGgvMjQqMTQpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNSAmJiBzY3JvbGxUb3AgPCBoLzI0KjE2KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE2ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTcpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTcgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxOCk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxOCAmJiBzY3JvbGxUb3AgPCBoLzI0KjE5KTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE5ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjApOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjAgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMSk6XG4gICAgICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMSAmJiBzY3JvbGxUb3AgPCBoLzI0KjIyKTpcbiAgICAgICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIyICYmIHNjcm9sbFRvcCA8IGgvMjQqMjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjMpOlxuICAgICAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKHNjcm9sbCkge1xuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gLXNjcm9sbCxcbiAgICAgICAgICAgIGggPSBzY3JvbGxTdGF0ZXNbMV07XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPCBoLzEyKSB7XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItZml4ZWQnKS5hZGRDbGFzcygnZm9vdGVyLWhpZGUnKTtcbiAgICAgICAgICAgICRsZWZ0VGV4dC5yZW1vdmVDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1oaWRlJykuYWRkQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpO1xuICAgICAgICAgICAgJGxlZnRUZXh0LmFkZENsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBoKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG15U2Nyb2xsO1xuICAgIGZ1bmN0aW9uIGluaXRNeVNjcm9sbCgpIHtcbiAgICAgICAgbXlTY3JvbGwgPSBuZXcgd2luZG93LklTY3JvbGwoJyN3cmFwcGVyJywgeyBwcm9iZVR5cGU6IDMsIG1vdXNlV2hlZWw6IHRydWUsIGNsaWNrOiB0cnVlIH0pO1xuICAgIFxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICAgICAgICBzY3JvbGxQYWdlKG15U2Nyb2xsLnkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGwnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgICAgIG15U2Nyb2xsLm9uKCdzY3JvbGxFbmQnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgfVxuICAgIFxuICAgIHdpbmRvdy5sb2FkZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGluaXRNeVNjcm9sbCgpO1xuICAgIH07XG4gICAgXG4gICAgJGRvY3VtZW50Lm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLm5hdi1tYWluJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzBdLCAxMDAwKTtcbiAgICB9KTtcbiAgICAkKCcubmF2LW91cicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1sxXSwgMTAwMCk7XG4gICAgfSk7XG4gICAgJCgnLm5hdi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzJdLCAxMDAwKTtcbiAgICB9KTtcbiAgICBcbiAgICBcbiAgICB2YXIgVHJhY2tMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRyYWNrcyA9IFtcbiAgICAgICAgICAgICcuL211c2ljL0JlY291c2UgSSBXYW50IFlvdS5tcDMnLFxuICAgICAgICAgICAgJy4vbXVzaWMvQnJva2VuIFByb21pc2UubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL0RyYWcubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL01lZHMubXAzJyxcbiAgICAgICAgICAgICcuL211c2ljL09uZSBPZiBBIEtpbmQubXAzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG4gICAgfTtcbiAgICBcbiAgICBUcmFja0xpc3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xuICAgIH07XG4gICAgXG4gICAgVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzWzBdO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyYWNrTGlzdCA9IG5ldyBUcmFja0xpc3QoKTtcbiAgICBcbiAgICAvLyBTZXR1cCB0aGUgcGxheWVyIHRvIGF1dG9wbGF5IHRoZSBuZXh0IHRyYWNrXG4gICAgdmFyIGEgPSB3aW5kb3cuYXVkaW9qcy5jcmVhdGVBbGwoe1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIHZhciBhdWRpbyA9IGFbMF07XG4gICAgYXVkaW8ubG9hZCh0cmFja0xpc3QuZmlyc3QoKSk7XG4gICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tcGF1c2UnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiBhIHRyYWNrIG9uIGNsaWNrXG4gICAgJCgnLnJhZGlvLW11c2ljLWJ0bi1uZXh0JykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICQoJy5yYWRpby1tdXNpYy1zb25nJykudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgIH0pO1xufSk7Il19
