(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);

var $withDesc = $('.with-desc'),
    $footer = $('.footer'),
    $fridge = $('.fridge-top-img'),
    $page = $('.page'),
    $window = $(window);

var height = parseInt($footer.css('height'), 10);
// var pageHeight = parseInt($page.css('height'), 10);

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

$(window).on('resize', function () {
    height = parseInt($footer.css('height'), 10);
});

function prepareClasesToRemove(name, n) {
    var clasesToRemove = '';
    n = n + 1;
    for (var i = 1; i < n; i++) {
        clasesToRemove += name + i + ' ';
    }
    return clasesToRemove.slice(0, -1);
}

var fridgeClasesToRemove = prepareClasesToRemove('open-', 11);

var currScroll = 0;
var interval;
$('.nav-main').click(function () {
    clearInterval(interval);
    if (currScroll === 0) return;
    interval = setInterval(function () {
        currScroll -= height/2;
        if (currScroll < 0) currScroll = 0;
        window.scrollTo(0, currScroll);
        if (currScroll === 0) {
            clearInterval(interval);
        }
    }, 25);
});
$('.nav-our').click(function () {
    clearInterval(interval);
    if (currScroll > height*11 && currScroll < height*12) return;
    var sign = 1;
    if (currScroll > height*12) sign = -1;
    interval = setInterval(function () {
        currScroll += height/2 * sign;
        window.scrollTo(0, currScroll);
        if ((currScroll > height*11 && currScroll < height*12)) {
            clearInterval(interval);
        }
    }, 25);
});
$('.nav-game').click(function () {
    clearInterval(interval);
    if (currScroll > height*20) return;
    interval = setInterval(function () {
        currScroll += height/2;
        window.scrollTo(0, currScroll);
        if (currScroll > height*20) {
            clearInterval(interval);
        }
    }, 25);
});

$(window).scroll(function () {
    var scrollTop = $window.scrollTop();

    switch (true) {
        case (scrollTop < height):
            $footer.removeClass('footer-fixed').addClass('footer-hide');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-relative');
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-0');
        break;
        case (scrollTop > height && scrollTop < height*2):
            $footer.removeClass('footer-hide').addClass('footer-fixed');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-1');
        break;
        case (scrollTop > height*2 && scrollTop < height*3):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-2');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*3 && scrollTop < height*4):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-3');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*4 && scrollTop < height*5):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-4');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*5 && scrollTop < height*6):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-5');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*6 && scrollTop < height*7):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-6');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*7 && scrollTop < height*8):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-7');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*8 && scrollTop < height*9):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-8');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*9 && scrollTop < height*10):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-9');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*10 && scrollTop < height*11):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-10');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*11 && scrollTop < height*12):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-11');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed');
        break;
        case (scrollTop > height*20):
            $fridge.removeClass(fridgeClasesToRemove).addClass('open-11');
            $page.removeClass('page-relative page-fixed page-fixed-bottom').addClass('page-fixed-bottom');
        break;
    }
    currScroll = scrollTop;
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvaGVsaWNvcHRlci9taW5nYXovbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvRG1pdHJ5L3Byb2plY3RzL2hlbGljb3B0ZXIvbWluZ2F6L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh3aW5kb3cuJCk7XG5cbnZhciAkd2l0aERlc2MgPSAkKCcud2l0aC1kZXNjJyksXG4gICAgJGZvb3RlciA9ICQoJy5mb290ZXInKSxcbiAgICAkZnJpZGdlID0gJCgnLmZyaWRnZS10b3AtaW1nJyksXG4gICAgJHBhZ2UgPSAkKCcucGFnZScpLFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyk7XG5cbnZhciBoZWlnaHQgPSBwYXJzZUludCgkZm9vdGVyLmNzcygnaGVpZ2h0JyksIDEwKTtcbi8vIHZhciBwYWdlSGVpZ2h0ID0gcGFyc2VJbnQoJHBhZ2UuY3NzKCdoZWlnaHQnKSwgMTApO1xuXG4kd2l0aERlc2MuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICQodGhpcykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGVpZ2h0ID0gJGZvb3Rlci5jc3MoJ2hlaWdodCcpO1xuICAgICAgICAkZm9vdGVyLmFkZENsYXNzKCd3aXRoLWRlc2MtJyArIChpICsgMSkpO1xuICAgICAgICAkZm9vdGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ3dpdGgtZGVzYy0nICsgKGkgKyAxKSk7XG4gICAgICAgICRmb290ZXIuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgIH0pO1xufSk7XG5cbiQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgIGhlaWdodCA9IHBhcnNlSW50KCRmb290ZXIuY3NzKCdoZWlnaHQnKSwgMTApO1xufSk7XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFzZXNUb1JlbW92ZShuYW1lLCBuKSB7XG4gICAgdmFyIGNsYXNlc1RvUmVtb3ZlID0gJyc7XG4gICAgbiA9IG4gKyAxO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGNsYXNlc1RvUmVtb3ZlICs9IG5hbWUgKyBpICsgJyAnO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc2VzVG9SZW1vdmUuc2xpY2UoMCwgLTEpO1xufVxuXG52YXIgZnJpZGdlQ2xhc2VzVG9SZW1vdmUgPSBwcmVwYXJlQ2xhc2VzVG9SZW1vdmUoJ29wZW4tJywgMTEpO1xuXG52YXIgY3VyclNjcm9sbCA9IDA7XG52YXIgaW50ZXJ2YWw7XG4kKCcubmF2LW1haW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgaWYgKGN1cnJTY3JvbGwgPT09IDApIHJldHVybjtcbiAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VyclNjcm9sbCAtPSBoZWlnaHQvMjtcbiAgICAgICAgaWYgKGN1cnJTY3JvbGwgPCAwKSBjdXJyU2Nyb2xsID0gMDtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGN1cnJTY3JvbGwpO1xuICAgICAgICBpZiAoY3VyclNjcm9sbCA9PT0gMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9LCAyNSk7XG59KTtcbiQoJy5uYXYtb3VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIGlmIChjdXJyU2Nyb2xsID4gaGVpZ2h0KjExICYmIGN1cnJTY3JvbGwgPCBoZWlnaHQqMTIpIHJldHVybjtcbiAgICB2YXIgc2lnbiA9IDE7XG4gICAgaWYgKGN1cnJTY3JvbGwgPiBoZWlnaHQqMTIpIHNpZ24gPSAtMTtcbiAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VyclNjcm9sbCArPSBoZWlnaHQvMiAqIHNpZ247XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBjdXJyU2Nyb2xsKTtcbiAgICAgICAgaWYgKChjdXJyU2Nyb2xsID4gaGVpZ2h0KjExICYmIGN1cnJTY3JvbGwgPCBoZWlnaHQqMTIpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH0sIDI1KTtcbn0pO1xuJCgnLm5hdi1nYW1lJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIGlmIChjdXJyU2Nyb2xsID4gaGVpZ2h0KjIwKSByZXR1cm47XG4gICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN1cnJTY3JvbGwgKz0gaGVpZ2h0LzI7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBjdXJyU2Nyb2xsKTtcbiAgICAgICAgaWYgKGN1cnJTY3JvbGwgPiBoZWlnaHQqMjApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfSwgMjUpO1xufSk7XG5cbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgIHZhciBzY3JvbGxUb3AgPSAkd2luZG93LnNjcm9sbFRvcCgpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA8IGhlaWdodCk6XG4gICAgICAgICAgICAkZm9vdGVyLnJlbW92ZUNsYXNzKCdmb290ZXItZml4ZWQnKS5hZGRDbGFzcygnZm9vdGVyLWhpZGUnKTtcbiAgICAgICAgICAgICRwYWdlLnJlbW92ZUNsYXNzKCdwYWdlLXJlbGF0aXZlIHBhZ2UtZml4ZWQgcGFnZS1maXhlZC1ib3R0b20nKS5hZGRDbGFzcygncGFnZS1yZWxhdGl2ZScpO1xuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaGVpZ2h0ICYmIHNjcm9sbFRvcCA8IGhlaWdodCoyKTpcbiAgICAgICAgICAgICRmb290ZXIucmVtb3ZlQ2xhc3MoJ2Zvb3Rlci1oaWRlJykuYWRkQ2xhc3MoJ2Zvb3Rlci1maXhlZCcpO1xuICAgICAgICAgICAgJHBhZ2UucmVtb3ZlQ2xhc3MoJ3BhZ2UtcmVsYXRpdmUgcGFnZS1maXhlZCBwYWdlLWZpeGVkLWJvdHRvbScpLmFkZENsYXNzKCdwYWdlLWZpeGVkJyk7XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoZWlnaHQqMiAmJiBzY3JvbGxUb3AgPCBoZWlnaHQqMyk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0yJyk7XG4gICAgICAgICAgICAkcGFnZS5yZW1vdmVDbGFzcygncGFnZS1yZWxhdGl2ZSBwYWdlLWZpeGVkIHBhZ2UtZml4ZWQtYm90dG9tJykuYWRkQ2xhc3MoJ3BhZ2UtZml4ZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGhlaWdodCozICYmIHNjcm9sbFRvcCA8IGhlaWdodCo0KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTMnKTtcbiAgICAgICAgICAgICRwYWdlLnJlbW92ZUNsYXNzKCdwYWdlLXJlbGF0aXZlIHBhZ2UtZml4ZWQgcGFnZS1maXhlZC1ib3R0b20nKS5hZGRDbGFzcygncGFnZS1maXhlZCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaGVpZ2h0KjQgJiYgc2Nyb2xsVG9wIDwgaGVpZ2h0KjUpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNCcpO1xuICAgICAgICAgICAgJHBhZ2UucmVtb3ZlQ2xhc3MoJ3BhZ2UtcmVsYXRpdmUgcGFnZS1maXhlZCBwYWdlLWZpeGVkLWJvdHRvbScpLmFkZENsYXNzKCdwYWdlLWZpeGVkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoZWlnaHQqNSAmJiBzY3JvbGxUb3AgPCBoZWlnaHQqNik6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi01Jyk7XG4gICAgICAgICAgICAkcGFnZS5yZW1vdmVDbGFzcygncGFnZS1yZWxhdGl2ZSBwYWdlLWZpeGVkIHBhZ2UtZml4ZWQtYm90dG9tJykuYWRkQ2xhc3MoJ3BhZ2UtZml4ZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGhlaWdodCo2ICYmIHNjcm9sbFRvcCA8IGhlaWdodCo3KTpcbiAgICAgICAgICAgICRmcmlkZ2UucmVtb3ZlQ2xhc3MoZnJpZGdlQ2xhc2VzVG9SZW1vdmUpLmFkZENsYXNzKCdvcGVuLTYnKTtcbiAgICAgICAgICAgICRwYWdlLnJlbW92ZUNsYXNzKCdwYWdlLXJlbGF0aXZlIHBhZ2UtZml4ZWQgcGFnZS1maXhlZC1ib3R0b20nKS5hZGRDbGFzcygncGFnZS1maXhlZCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaGVpZ2h0KjcgJiYgc2Nyb2xsVG9wIDwgaGVpZ2h0KjgpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tNycpO1xuICAgICAgICAgICAgJHBhZ2UucmVtb3ZlQ2xhc3MoJ3BhZ2UtcmVsYXRpdmUgcGFnZS1maXhlZCBwYWdlLWZpeGVkLWJvdHRvbScpLmFkZENsYXNzKCdwYWdlLWZpeGVkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoZWlnaHQqOCAmJiBzY3JvbGxUb3AgPCBoZWlnaHQqOSk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi04Jyk7XG4gICAgICAgICAgICAkcGFnZS5yZW1vdmVDbGFzcygncGFnZS1yZWxhdGl2ZSBwYWdlLWZpeGVkIHBhZ2UtZml4ZWQtYm90dG9tJykuYWRkQ2xhc3MoJ3BhZ2UtZml4ZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGhlaWdodCo5ICYmIHNjcm9sbFRvcCA8IGhlaWdodCoxMCk6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi05Jyk7XG4gICAgICAgICAgICAkcGFnZS5yZW1vdmVDbGFzcygncGFnZS1yZWxhdGl2ZSBwYWdlLWZpeGVkIHBhZ2UtZml4ZWQtYm90dG9tJykuYWRkQ2xhc3MoJ3BhZ2UtZml4ZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKHNjcm9sbFRvcCA+IGhlaWdodCoxMCAmJiBzY3JvbGxUb3AgPCBoZWlnaHQqMTEpOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTAnKTtcbiAgICAgICAgICAgICRwYWdlLnJlbW92ZUNsYXNzKCdwYWdlLXJlbGF0aXZlIHBhZ2UtZml4ZWQgcGFnZS1maXhlZC1ib3R0b20nKS5hZGRDbGFzcygncGFnZS1maXhlZCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoc2Nyb2xsVG9wID4gaGVpZ2h0KjExICYmIHNjcm9sbFRvcCA8IGhlaWdodCoxMik6XG4gICAgICAgICAgICAkZnJpZGdlLnJlbW92ZUNsYXNzKGZyaWRnZUNsYXNlc1RvUmVtb3ZlKS5hZGRDbGFzcygnb3Blbi0xMScpO1xuICAgICAgICAgICAgJHBhZ2UucmVtb3ZlQ2xhc3MoJ3BhZ2UtcmVsYXRpdmUgcGFnZS1maXhlZCBwYWdlLWZpeGVkLWJvdHRvbScpLmFkZENsYXNzKCdwYWdlLWZpeGVkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChzY3JvbGxUb3AgPiBoZWlnaHQqMjApOlxuICAgICAgICAgICAgJGZyaWRnZS5yZW1vdmVDbGFzcyhmcmlkZ2VDbGFzZXNUb1JlbW92ZSkuYWRkQ2xhc3MoJ29wZW4tMTEnKTtcbiAgICAgICAgICAgICRwYWdlLnJlbW92ZUNsYXNzKCdwYWdlLXJlbGF0aXZlIHBhZ2UtZml4ZWQgcGFnZS1maXhlZC1ib3R0b20nKS5hZGRDbGFzcygncGFnZS1maXhlZC1ib3R0b20nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGN1cnJTY3JvbGwgPSBzY3JvbGxUb3A7XG59KTsiXX0=
