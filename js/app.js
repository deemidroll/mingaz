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
    $window = $(window);

var height,
    scrollStates;

function resize() {
    height = parseInt($footer.css('height'), 10);
    scrollStates = [0, $radio[0].clientHeight, $fridgeBottomGrip.offset().top + $fridgeBottomGrip[0].clientHeight];
    $page.css('height', window.innerHeight + scrollStates[2]);
}
$window.on('resize', resize);
resize();

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

var myScroll = new window.IScroll('#wrapper', { probeType: 3, mouseWheel: true, click: true });

function updatePosition () {
    scrollPage(myScroll.y);
}

myScroll.on('scroll', updatePosition);
myScroll.on('scrollEnd', updatePosition);

$(document).on('touchmove', function (e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQgPSAod2luZG93LiQpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbnZhciAkd2l0aERlc2MgPSAkKCcud2l0aC1kZXNjJyksXG4gICAgJGZvb3RlciA9ICQoJy5mb290ZXInKSxcbiAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS10b3AtaW1nJyksXG4gICAgLy8gJGZyaWRnZUJvdHRvbSA9ICQoJy5mcmlkZ2UtYm90dG9tJyksXG4gICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICRsZWZ0VGV4dCA9ICQoJy5sZWZ0LXRleHQnKSxcbiAgICAkcmFkaW8gPSAkKCcucmFkaW8nKSxcbiAgICAkZnJpZGdlQm90dG9tR3JpcCA9ICQoJy5mcmlkZ2UtYm90dG9tLWdyaXAnKSxcbiAgICAkd2luZG93ID0gJCh3aW5kb3cpO1xuXG52YXIgaGVpZ2h0LFxuICAgIHNjcm9sbFN0YXRlcztcblxuZnVuY3Rpb24gcmVzaXplKCkge1xuICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xuICAgIHNjcm9sbFN0YXRlcyA9IFswLCAkcmFkaW9bMF0uY2xpZW50SGVpZ2h0LCAkZnJpZGdlQm90dG9tR3JpcC5vZmZzZXQoKS50b3AgKyAkZnJpZGdlQm90dG9tR3JpcFswXS5jbGllbnRIZWlnaHRdO1xuICAgICRwYWdlLmNzcygnaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0ICsgc2Nyb2xsU3RhdGVzWzJdKTtcbn1cbiR3aW5kb3cub24oJ3Jlc2l6ZScsIHJlc2l6ZSk7XG5yZXNpemUoKTtcblxuJHdpdGhEZXNjLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAkKHRoaXMpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9ICRmb290ZXIuY3NzKCdoZWlnaHQnKTtcbiAgICAgICAgJGZvb3Rlci5hZGRDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhc2VzVG9SZW1vdmUobmFtZSwgbikge1xuICAgIHZhciBjbGFzZXNUb1JlbW92ZSA9ICcnO1xuICAgIG4gPSBuICsgMTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgICBjbGFzZXNUb1JlbW92ZSArPSBuYW1lICsgaSArICcgJztcbiAgICB9XG4gICAgcmV0dXJuIGNsYXNlc1RvUmVtb3ZlLnNsaWNlKDAsIC0xKTtcbn1cbnZhciBmcmlkZ2VDbGFzZXNUb1JlbW92ZSA9IHByZXBhcmVDbGFzZXNUb1JlbW92ZSgnb3Blbi0nLCAyMyk7XG5cbmZ1bmN0aW9uIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBoKSB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA8PSBoLzI0KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTAnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjMpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMicpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCozICYmIHNjcm9sbFRvcCA8IGgvMjQqNCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0zJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjQgJiYgc2Nyb2xsVG9wIDwgaC8yNCo1KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNSAmJiBzY3JvbGxUb3AgPCBoLzI0KjYpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo2ICYmIHNjcm9sbFRvcCA8IGgvMjQqNyk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi02Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjcgJiYgc2Nyb2xsVG9wIDwgaC8yNCo4KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOCAmJiBzY3JvbGxUb3AgPCBoLzI0KjkpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo5ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTApOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tOScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMCAmJiBzY3JvbGxUb3AgPCBoLzI0KjExKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEwJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjExICYmIHNjcm9sbFRvcCA8IGgvMjQqMTIpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTIgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMyk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMicpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjE0KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEzJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTUpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTUgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNik6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjE3KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE2Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE3ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTgpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTggJiYgc2Nyb2xsVG9wIDwgaC8yNCoxOSk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjIwKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE5Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIwICYmIHNjcm9sbFRvcCA8IGgvMjQqMjEpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjAnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjEgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMik6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjIzKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIzKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIzJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2Nyb2xsUGFnZShzY3JvbGwpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gLXNjcm9sbCxcbiAgICAgICAgaCA9IHNjcm9sbFN0YXRlc1sxXTtcbiAgICBpZiAoc2Nyb2xsVG9wIDwgaC8xMikge1xuICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItZml4ZWQnKS5hZGRDbGFzcygnZm9vdGVyLWhpZGUnKTtcbiAgICAgICAgJGxlZnRUZXh0LnJlbW92ZUNsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1oaWRlJykuYWRkQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpO1xuICAgICAgICAkbGVmdFRleHQuYWRkQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgfVxuICAgIGFuaW1hdGVEb29yU3RhdGUoc2Nyb2xsVG9wLCBoKTtcbn1cblxudmFyIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHsgcHJvYmVUeXBlOiAzLCBtb3VzZVdoZWVsOiB0cnVlLCBjbGljazogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgIHNjcm9sbFBhZ2UobXlTY3JvbGwueSk7XG59XG5cbm15U2Nyb2xsLm9uKCdzY3JvbGwnLCB1cGRhdGVQb3NpdGlvbik7XG5teVNjcm9sbC5vbignc2Nyb2xsRW5kJywgdXBkYXRlUG9zaXRpb24pO1xuXG4kKGRvY3VtZW50KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuJCgnLm5hdi1tYWluJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xufSk7XG4kKCcubmF2LW91cicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbn0pO1xuJCgnLm5hdi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xufSk7XG5cblxudmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRyYWNrcyA9IFtcbiAgICAgICAgJy4vbXVzaWMvQmVjb3VzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICcuL211c2ljL0Jyb2tlbiBQcm9taXNlLm1wMycsXG4gICAgICAgICcuL211c2ljL0RyYWcubXAzJyxcbiAgICAgICAgJy4vbXVzaWMvTWVkcy5tcDMnLFxuICAgICAgICAnLi9tdXNpYy9PbmUgT2YgQSBLaW5kLm1wMydcbiAgICBdO1xuICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbn07XG5cblRyYWNrTGlzdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnJlbnRUcmFjayArPSAxO1xuICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xufTtcblxuVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFja3NbMF07XG59O1xuXG52YXIgdHJhY2tMaXN0ID0gbmV3IFRyYWNrTGlzdCgpO1xuXG4gICAgLy8gU2V0dXAgdGhlIHBsYXllciB0byBhdXRvcGxheSB0aGUgbmV4dCB0cmFja1xuICAgIHZhciBhID0gd2luZG93LmF1ZGlvanMuY3JlYXRlQWxsKHtcbiAgICAgICAgdHJhY2tFbmRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAgICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiB0aGUgZmlyc3QgdHJhY2tcbiAgICB2YXIgYXVkaW8gPSBhWzBdO1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgICQoJy5yYWRpby1tdXNpYy1zb25nJykudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLnBsYXlQYXVzZSgpO1xuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9KTtcbn0pOyJdfQ==
