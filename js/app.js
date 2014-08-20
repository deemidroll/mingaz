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
    // Load in a track on click
    $('.radio-music-btn-next').click(function(e) {
        e.preventDefault();
        audio.load(trackList.next());
        $('.radio-music-song').text(audio.mp3.slice(8, -4));
        audio.play();
    });
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gKHdpbmRvdy4kKTtcblxudmFyICR3aXRoRGVzYyA9ICQoJy53aXRoLWRlc2MnKSxcbiAgICAkZm9vdGVyID0gJCgnLmZvb3RlcicpLFxuICAgICRmcmlkZ2UgPSAkKCcuZnJpZGdlLXRvcC1pbWcnKSxcbiAgICAvLyAkZnJpZGdlQm90dG9tID0gJCgnLmZyaWRnZS1ib3R0b20nKSxcbiAgICAkcGFnZSA9ICQoJy5wYWdlJyksXG4gICAgJGxlZnRUZXh0ID0gJCgnLmxlZnQtdGV4dCcpLFxuICAgICRyYWRpbyA9ICQoJy5yYWRpbycpLFxuICAgICRmcmlkZ2VCb3R0b21HcmlwID0gJCgnLmZyaWRnZS1ib3R0b20tZ3JpcCcpLFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyk7XG5cbnZhciBoZWlnaHQsXG4gICAgc2Nyb2xsU3RhdGVzO1xuXG5mdW5jdGlvbiByZXNpemUoKSB7XG4gICAgaGVpZ2h0ID0gcGFyc2VJbnQoJGZvb3Rlci5jc3MoJ2hlaWdodCcpLCAxMCk7XG4gICAgc2Nyb2xsU3RhdGVzID0gWzAsICRyYWRpb1swXS5jbGllbnRIZWlnaHQsICRmcmlkZ2VCb3R0b21HcmlwLm9mZnNldCgpLnRvcCArICRmcmlkZ2VCb3R0b21HcmlwWzBdLmNsaWVudEhlaWdodF07XG4gICAgJHBhZ2UuY3NzKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQgKyBzY3JvbGxTdGF0ZXNbMl0pO1xufVxuJHdpbmRvdy5vbigncmVzaXplJywgcmVzaXplKTtcbnJlc2l6ZSgpO1xuXG4kd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICQodGhpcykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGVpZ2h0ID0gJGZvb3Rlci5jc3MoJ2hlaWdodCcpO1xuICAgICAgICAkZm9vdGVyLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFzZXNUb1JlbW92ZShuYW1lLCBuKSB7XG4gICAgdmFyIGNsYXNlc1RvUmVtb3ZlID0gJyc7XG4gICAgbiA9IG4gKyAxO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGNsYXNlc1RvUmVtb3ZlICs9IG5hbWUgKyBpICsgJyAnO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc2VzVG9SZW1vdmUuc2xpY2UoMCwgLTEpO1xufVxudmFyIGZyaWRnZUNsYXNlc1RvUmVtb3ZlID0gcHJlcGFyZUNsYXNlc1RvUmVtb3ZlKCdvcGVuLScsIDIzKTtcblxuZnVuY3Rpb24gYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpIHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wIDw9IGgvMjQpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjIpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyICYmIHNjcm9sbFRvcCA8IGgvMjQqMyk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjMgJiYgc2Nyb2xsVG9wIDwgaC8yNCo0KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTMnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNCAmJiBzY3JvbGxUb3AgPCBoLzI0KjUpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo1ICYmIHNjcm9sbFRvcCA8IGgvMjQqNik6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjYgJiYgc2Nyb2xsVG9wIDwgaC8yNCo3KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTYnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqNyAmJiBzY3JvbGxUb3AgPCBoLzI0KjgpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNycpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCo4ICYmIHNjcm9sbFRvcCA8IGgvMjQqOSk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjkgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi05Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEwICYmIHNjcm9sbFRvcCA8IGgvMjQqMTEpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTAnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTEgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxMik6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxMiAmJiBzY3JvbGxUb3AgPCBoLzI0KjEzKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTEyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjEzICYmIHNjcm9sbFRvcCA8IGgvMjQqMTQpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTMnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTQgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxNSk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxNSAmJiBzY3JvbGxUb3AgPCBoLzI0KjE2KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE1Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE2ICYmIHNjcm9sbFRvcCA8IGgvMjQqMTcpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTYnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMTcgJiYgc2Nyb2xsVG9wIDwgaC8yNCoxOCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xNycpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoxOCAmJiBzY3JvbGxUb3AgPCBoLzI0KjE5KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTE4Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjE5ICYmIHNjcm9sbFRvcCA8IGgvMjQqMjApOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjAgJiYgc2Nyb2xsVG9wIDwgaC8yNCoyMSk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yMCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaC8yNCoyMSAmJiBzY3JvbGxUb3AgPCBoLzI0KjIyKTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTIxJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoLzI0KjIyICYmIHNjcm9sbFRvcCA8IGgvMjQqMjMpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjInKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGgvMjQqMjMpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMjMnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzY3JvbGxQYWdlKHNjcm9sbCkge1xuICAgIHZhciBzY3JvbGxUb3AgPSAtc2Nyb2xsLFxuICAgICAgICBoID0gc2Nyb2xsU3RhdGVzWzFdO1xuICAgIGlmIChzY3JvbGxUb3AgPCBoLzEyKSB7XG4gICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpLmFkZENsYXNzKCdmb290ZXItaGlkZScpO1xuICAgICAgICAkbGVmdFRleHQucmVtb3ZlQ2xhc3MoJ2xlZnQtdGV4dC12aXNpYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGZvb3Rlci5yZW1vdmVDbGFzcygnZm9vdGVyLWhpZGUnKS5hZGRDbGFzcygnZm9vdGVyLWZpeGVkJyk7XG4gICAgICAgICRsZWZ0VGV4dC5hZGRDbGFzcygnbGVmdC10ZXh0LXZpc2libGUnKTtcbiAgICB9XG4gICAgYW5pbWF0ZURvb3JTdGF0ZShzY3JvbGxUb3AsIGgpO1xufVxuXG52YXIgbXlTY3JvbGw7XG4kKCdib2R5JylbMF0ub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIG15U2Nyb2xsID0gbmV3IHdpbmRvdy5JU2Nyb2xsKCcjd3JhcHBlcicsIHsgcHJvYmVUeXBlOiAzLCBtb3VzZVdoZWVsOiB0cnVlLCBjbGljazogdHJ1ZSB9KTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgICAgc2Nyb2xsUGFnZShteVNjcm9sbC55KTtcbiAgICB9XG5cbiAgICBteVNjcm9sbC5vbignc2Nyb2xsJywgdXBkYXRlUG9zaXRpb24pO1xuICAgIG15U2Nyb2xsLm9uKCdzY3JvbGxFbmQnLCB1cGRhdGVQb3NpdGlvbik7XG59O1xuJChkb2N1bWVudCkub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbiQoJy5uYXYtbWFpbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzBdLCAxMDAwKTtcbn0pO1xuJCgnLm5hdi1vdXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgbXlTY3JvbGwuc2Nyb2xsVG8oMCwgLXNjcm9sbFN0YXRlc1sxXSwgMTAwMCk7XG59KTtcbiQoJy5uYXYtZ2FtZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBteVNjcm9sbC5zY3JvbGxUbygwLCAtc2Nyb2xsU3RhdGVzWzJdLCAxMDAwKTtcbn0pO1xuXG5cbnZhciBUcmFja0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50cmFja3MgPSBbXG4gICAgICAgICcuL211c2ljL0JlY291c2UgSSBXYW50IFlvdS5tcDMnLFxuICAgICAgICAnLi9tdXNpYy9Ccm9rZW4gUHJvbWlzZS5tcDMnLFxuICAgICAgICAnLi9tdXNpYy9EcmFnLm1wMycsXG4gICAgICAgICcuL211c2ljL01lZHMubXAzJyxcbiAgICAgICAgJy4vbXVzaWMvT25lIE9mIEEgS2luZC5tcDMnXG4gICAgXTtcbiAgICB0aGlzLmN1cnJlbnRUcmFjayA9IDA7XG59O1xuXG5UcmFja0xpc3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jdXJyZW50VHJhY2sgKz0gMTtcbiAgICBpZiAodGhpcy5jdXJyZW50VHJhY2sgPiB0aGlzLnRyYWNrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRyYWNrID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhY2tzW3RoaXMuY3VycmVudFRyYWNrXTtcbn07XG5cblRyYWNrTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhY2tzWzBdO1xufTtcblxudmFyIHRyYWNrTGlzdCA9IG5ldyBUcmFja0xpc3QoKTtcblxuJChmdW5jdGlvbigpIHsgXG4gICAgLy8gU2V0dXAgdGhlIHBsYXllciB0byBhdXRvcGxheSB0aGUgbmV4dCB0cmFja1xuICAgIHZhciBhID0gd2luZG93LmF1ZGlvanMuY3JlYXRlQWxsKHtcbiAgICAgICAgdHJhY2tFbmRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAgICAgJCgnLnJhZGlvLW11c2ljLXNvbmcnKS50ZXh0KGF1ZGlvLm1wMy5zbGljZSg4LCAtNCkpO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTG9hZCBpbiB0aGUgZmlyc3QgdHJhY2tcbiAgICB2YXIgYXVkaW8gPSBhWzBdO1xuICAgIGF1ZGlvLmxvYWQodHJhY2tMaXN0LmZpcnN0KCkpO1xuICAgICQoJy5yYWRpby1tdXNpYy1zb25nJykudGV4dChhdWRpby5tcDMuc2xpY2UoOCwgLTQpKTtcbiAgICAkKCcucmFkaW8tbXVzaWMtYnRuLXBhdXNlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGF1ZGlvLnBsYXlQYXVzZSgpO1xuICAgIH0pO1xuICAgIC8vIExvYWQgaW4gYSB0cmFjayBvbiBjbGlja1xuICAgICQoJy5yYWRpby1tdXNpYy1idG4tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhdWRpby5sb2FkKHRyYWNrTGlzdC5uZXh0KCkpO1xuICAgICAgICAkKCcucmFkaW8tbXVzaWMtc29uZycpLnRleHQoYXVkaW8ubXAzLnNsaWNlKDgsIC00KSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9KTtcbn0pOyJdfQ==
