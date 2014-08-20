(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);

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

var myScroll;
$('body')[0].onload = function () {
    myScroll = new window.IScroll('#wrapper', { probeType: 3, mouseWheel: true, click: true });

    function updatePosition () {
        scrollPage(myScroll.y);
    }

    myScroll.on('scroll', updatePosition);
    myScroll.on('scrollEnd', updatePosition);
};
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

$(function() { 
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
    console.log(audio);
    // Load in a track on click
    $('.radio-music-btn-next').click(function(e) {
        e.preventDefault();
        audio.load(trackList.next());
        $('.radio-music-song').text(audio.mp3.slice(8, -4));
        audio.play();
    });
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQgPSAod2luZG93LiQpO1xuXG52YXIgJHdpdGhEZXNjID0gJCgnLndpdGgtZGVzYycpLFxuICAgICRmb290ZXIgPSAkKCcuZm9vdGVyJyksXG4gICAgJGZyaWRnZSA9ICQoJy5mcmlkZ2UtdG9wLWltZycpLFxuICAgIC8vICRmcmlkZ2VCb3R0b20gPSAkKCcuZnJpZGdlLWJvdHRvbScpLFxuICAgICRwYWdlID0gJCgnLnBhZ2UnKSxcbiAgICAkbGVmdFRleHQgPSAkKCcubGVmdC10ZXh0JyksXG4gICAgJHJhZGlvID0gJCgnLnJhZGlvJyksXG4gICAgJGZyaWRnZUJvdHRvbUdyaXAgPSAkKCcuZnJpZGdlLWJvdHRvbS1ncmlwJyksXG4gICAgJHdpbmRvdyA9ICQod2luZG93KTtcblxudmFyIGhlaWdodCxcbiAgICBzY3JvbGxTdGF0ZXM7XG5cbmZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbiAgICBzY3JvbGxTdGF0ZXMgPSBbMCwgJHJhZGlvWzBdLmNsaWVudEhlaWdodCwgJGZyaWRnZUJvdHRvbUdyaXAub2Zmc2V0KCkudG9wICsgJGZyaWRnZUJvdHRvbUdyaXBbMF0uY2xpZW50SGVpZ2h0XTtcbiAgICAkcGFnZS5jc3MoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCArIHNjcm9sbFN0YXRlc1syXSk7XG59XG4kd2luZG93Lm9uKCdyZXNpemUnLCByZXNpemUpO1xucmVzaXplKCk7XG5cbiR3aXRoRGVzYy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoZWlnaHQgPSAkZm9vdGVyLmNzcygnaGVpZ2h0Jyk7XG4gICAgICAgICRmb290ZXIuYWRkQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnd2l0aC1kZXNjLScgKyAoaSArIDEpKTtcbiAgICAgICAgJGZvb3Rlci5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgfSk7XG59KTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYXNlc1RvUmVtb3ZlKG5hbWUsIG4pIHtcbiAgICB2YXIgY2xhc2VzVG9SZW1vdmUgPSAnJztcbiAgICBuID0gbiArIDE7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgY2xhc2VzVG9SZW1vdmUgKz0gbmFtZSArIGkgKyAnICc7XG4gICAgfVxuICAgIHJldHVybiBjbGFzZXNUb1JlbW92ZS5zbGljZSgwLCAtMSk7XG59XG52YXIgZnJpZGdlQ2xhc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc2VzVG9SZW1vdmUoJ29wZW4tJywgMjMpO1xuXG5mdW5jdGlvbiBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgaCkge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPD0gaC8yNCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0wJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0ICYmIHNjcm9sbFRvcCA8IGgvMjQqMik6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIgJiYgc2Nyb2xsVG9wIDwgaC8yNCozKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTInKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMyAmJiBzY3JvbGxUb3AgPCBoLzI0KjQpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMycpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo0ICYmIHNjcm9sbFRvcCA8IGgvMjQqNSk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi00Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjUgJiYgc2Nyb2xsVG9wIDwgaC8yNCo2KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNiAmJiBzY3JvbGxUb3AgPCBoLzI0KjcpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNicpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo3ICYmIHNjcm9sbFRvcCA8IGgvMjQqOCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi03Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjggJiYgc2Nyb2xsVG9wIDwgaC8yNCo5KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqOSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEwKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTAgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMSk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMSAmJiBzY3JvbGxUb3AgPCBoLzI0KjEyKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTExJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEyICYmIHNjcm9sbFRvcCA8IGgvMjQqMTMpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTInKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTMgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMycpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjE1KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE1ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTYpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTYgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNyk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNicpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjE4KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE3Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE4ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTkpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTkgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xOScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMCAmJiBzY3JvbGxUb3AgPCBoLzI0KjIxKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIwJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIxICYmIHNjcm9sbFRvcCA8IGgvMjQqMjIpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjIgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMyk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMicpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMyk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMycpO1xuICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2Nyb2xsKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IC1zY3JvbGwsXG4gICAgICAgIGggPSBzY3JvbGxTdGF0ZXNbMV07XG4gICAgaWYgKHNjcm9sbFRvcCA8IGgvMTIpIHtcbiAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWZpeGVkJykuYWRkQ2xhc3MoJ2Zvb3Rlci1oaWRlJyk7XG4gICAgICAgICRsZWZ0VGV4dC5yZW1vdmVDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItaGlkZScpLmFkZENsYXNzKCdmb290ZXItZml4ZWQnKTtcbiAgICAgICAgJGxlZnRUZXh0LmFkZENsYXNzKCdsZWZ0LXRleHQtdmlzaWJsZScpO1xuICAgIH1cbiAgICBhbmltYXRlRG9vclN0YXRlKHNjcm9sbFRvcCwgaCk7XG59XG5cbnZhciBteVNjcm9sbDtcbiQoJ2JvZHknKVswXS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbXlTY3JvbGwgPSBuZXcgd2luZG93LklTY3JvbGwoJyN3cmFwcGVyJywgeyBwcm9iZVR5cGU6IDMsIG1vdXNlV2hlZWw6IHRydWUsIGNsaWNrOiB0cnVlIH0pO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgICBzY3JvbGxQYWdlKG15U2Nyb2xsLnkpO1xuICAgIH1cblxuICAgIG15U2Nyb2xsLm9uKCdzY3JvbGwnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgbXlTY3JvbGwub24oJ3Njcm9sbEVuZCcsIHVwZGF0ZVBvc2l0aW9uKTtcbn07XG4kKGRvY3VtZW50KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuJCgnLm5hdi1tYWluJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMF0sIDEwMDApO1xufSk7XG4kKCcubmF2LW91cicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzFdLCAxMDAwKTtcbn0pO1xuJCgnLm5hdi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIG15U2Nyb2xsLnNjcm9sbFRvKDAsIC1zY3JvbGxTdGF0ZXNbMl0sIDEwMDApO1xufSk7XG5cblxudmFyIFRyYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRyYWNrcyA9IFtcbiAgICAgICAgJy4vbXVzaWMvQmVjb3VzZSBJIFdhbnQgWW91Lm1wMycsXG4gICAgICAgICcuL211c2ljL0Jyb2tlbiBQcm9taXNlLm1wMycsXG4gICAgICAgICcuL211c2ljL0RyYWcubXAzJyxcbiAgICAgICAgJy4vbXVzaWMvTWVkcy5tcDMnLFxuICAgICAgICAnLi9tdXNpYy9PbmUgT2YgQSBLaW5kLm1wMydcbiAgICBdO1xuICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbn07XG5cblRyYWNrTGlzdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnJlbnRUcmFjayArPSAxO1xuICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayA+IHRoaXMudHJhY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VHJhY2sgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50VHJhY2tdO1xufTtcblxuVHJhY2tMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFja3NbMF07XG59O1xuXG52YXIgdHJhY2tMaXN0ID0gbmV3IFRyYWNrTGlzdCgpO1xuXG4kKGZ1bmN0aW9uKCkgeyBcbiAgICAvLyBTZXR1cCB0aGUgcGxheWVyIHRvIGF1dG9wbGF5IHRoZSBuZXh0IHRyYWNrXG4gICAgdmFyIGEgPSB3aW5kb3cuYXVkaW9qcy5jcmVhdGVBbGwoe1xuICAgICAgICB0cmFja0VuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0Lm5leHQoKSk7XG4gICAgICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMb2FkIGluIHRoZSBmaXJzdCB0cmFja1xuICAgIHZhciBhdWRpbyA9IGFbMF07XG4gICAgYXVkaW8ubG9hZCh0cmFja0xpc3QuZmlyc3QoKSk7XG4gICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tcGF1c2UnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXVkaW8ucGxheVBhdXNlKCk7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coYXVkaW8pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9KTtcbn0pOyJdfQ==
