!function(window) {
'use strict';

var mediaQueryDesktop = 'screen and (min-width: 768pt)',
    debounce,
    onClick_jobOffer,
	onClick_toggleMissionStatement,
    onSubmit_contactForm,
    onClick_sectionTab,
    onClick_profile,
    onClick_video,
    onClick_jobOfferApply,
    onClick_navButton,
    onClick_navLink,
    onResize_window,
    onClick_medianav,
    onMedia_screen,
    onScroll_pageContent,
    $pageContent,
    $video,
    $mediawall,
    mediaPos;	

debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

$(function() {
  var isMediaWallActive = false,
      matchDesktop;

  mediaPos = 0;	
	
  $pageContent = $('.page-content');

  $mediawall = $('#media .mediawall .media-container');

  $video = $('#opener video');
  $video.get(0).oncanplay = function(ev) {
    onResize_window();
    $video.css('opacity', 1);
    ev.currentTarget.play();
  };

  matchDesktop = matchMedia(mediaQueryDesktop);
  if (matchDesktop.matches) {
    onMedia_screen(null);
  }
  matchDesktop.addListener(onMedia_screen);

  $('#jobs').on('click', '.job-offer button.apply', onClick_jobOfferApply);
  $('#jobs').on('click', '.job-offer', onClick_jobOffer);
	
  $('#mission').on('click', '.statementTitle', onClick_toggleMissionStatement);	
	
  $('#contact').on('submit', 'form', onSubmit_contactForm);
  $('body').on('click', '.section-footer .tab', onClick_sectionTab);
  $('#team').on('click', '.profile', onClick_profile);
  $('#media').on('click', '.media-item.video', onClick_video);
  $('#media').on('click', '.medianav button', onClick_medianav);
  $('header button[data-toggle]').on('click', onClick_navButton);
  $('header').on('click', '.navgroup li a', onClick_navLink);
  $('header').on('click', '.navgroup li a', function(ev) {
    $($(ev.currentTarget).attr('href') + ' video').each(function(i, e) {
      e.play();
    });
  });

  $mediawall.isotope({
    layoutMode: 'packery',
    getSortData: {
      name: function(elem) {
        return $(elem).attr('data-date');
      }
    },
    itemSelector: '.media-item',
    sortBy: 'name',
    sortAscending: false,
    containerStyle: {},
    packery: {
      isHorizontal: true
      //columnWidth: '#media .grid-size',
      //gutter: '#media .gutter-size'
    },
    masonryHorizontal: {
      rowHeight: $mediawall.children('.grid-size').get(1),
      gutter: $mediawall.children('.gutter-size').get(0)
    }
  });

  $(window).on('resize', onResize_window);
  $(document).load(function(ev) {
    $($0).isotope('layout');
  });
  $pageContent.on('scroll', debounce(onScroll_pageContent, 100));

  onScroll_pageContent(null);
  $(document.body).on('load', function() {
    onScroll_pageContent(null);
  });

  positionMapPins($('#contact .map .pin'));
});

function positionMapPins($pins) {
  var R = 70;

  $pins.each(function(i, e) {
    var $pin = $(e),
        coords = $pin.data('coords').split(',');

    //debugger

    $pin.css({
      left: R * Math.cos(coords[1]) * Math.cos(coords[0]) + 'px',
      top: R * Math.cos(coords[1]) * Math.sin(coords[0]) + 'px'
    });
  });
}

function scrollPosition(iterOffsetParent) {
  var scrollOffset = 0;
  iterOffsetParent = $(iterOffsetParent)[0];
  while (iterOffsetParent !== $('.page-content').get(0)) {
    scrollOffset += iterOffsetParent.offsetTop;
    iterOffsetParent = iterOffsetParent.offsetParent;
  }
  return scrollOffset;
}

function isDesktop() {
  return matchMedia('screen and (min-width: 768pt)').matches;
}

onScroll_pageContent = function(ev) {
  var baseOffset = 0;
  $('section').each(function(i, e) {
    var middle,
        scrollPos;

    try {
      scrollPos = scrollPosition(e) + e.offsetHeight;
    } catch (e) {
      return true;
    }

    if (i === 0) baseOffset = scrollPos;
    middle = $pageContent.scrollTop() + baseOffset;

    if (middle <= scrollPos) {
      $('header nav li a[href=#' + e.id + ']')
        .addClass('active')
        .parent()
        .siblings().children('a')
        .removeClass('active');

      $('video', e).each(function(k, v) {
        v.play();
      });
      return false;
    }
  });
};

onMedia_screen = function(ev) {
  $video.children('source').each(function(i, src) {
    var $src = $(src),
        video = $video.get(0);

    if (video.canPlayType($src.attr('type'))) {
      video.src = $src.data('video-hires');
      video.load();
      video.play();
      return false;
    }
  });
};

onClick_navLink = function() {
  if (matchMedia('screen and (min-width: 768pt)').matches) return true;

  $(document.body).removeClass('show-navigation');
};

onClick_navButton = function(ev) {
  $(document.body).toggleClass('show-navigation');

  if ($(document.body).hasClass('show-navigation')) {
    $('.page-content').one('click', function() {
      $(document.body).removeClass('show-navigation');
    });
  }
};

onResize_window = function(ev) {
  var offset = (window.innerWidth - $video.width()) / 2;
  $video.css('transform', 'translateX(' + offset + 'px)');

  $mediawall.isotope();
};

onClick_profile = function(ev) {
  var photoUrl = $(ev.currentTarget).find('.photo img').attr('src'),
      firstname = $(ev.currentTarget).find('.firstname').text(),
      lastname = $(ev.currentTarget).find('.lastname').text(),
      bio = $(ev.currentTarget).find('.bio-copy').clone(),
      $leadProfile = $(ev.delegateTarget).find('.lead-profile'),
      scrollOffset = 0,
      iterOffsetParent = $leadProfile.get(0);

  if (matchMedia('screen and (min-width: 768pt)').matches) return true;

  scrollOffset = scrollPosition(iterOffsetParent);

  $(ev.currentTarget)
    .addClass('expanded')
    .siblings()
    .removeClass('expanded');

  $leadProfile.clearQueue().fadeOut(300, function() {

    $leadProfile.find('.photo img').attr('src', photoUrl);
    $leadProfile.find('.firstname').text(firstname);
    $leadProfile.find('.lastname').text(lastname);
    $leadProfile.find('.bio-copy').replaceWith(bio);

    $leadProfile.removeClass('hidden');

    $leadProfile.fadeIn(300);

    $('.page-content')
      .clearQueue()
      .animate({
        scrollTop: scrollOffset - 24
      });
  });
};

onClick_video = function(ev) {
  if (isDesktop()) {
    ev.preventDefault();

    $.magnificPopup.close();
    $.magnificPopup.open({
      items: {
        src: $(ev.currentTarget).attr('href')
      },
      type: 'iframe'
    }, 0);
  }
};

onClick_medianav = function(ev) {

  ev.preventDefault();	
	
  var $target = $(ev.currentTarget),
      $mediawall = $('#media .mediawall'),
      mediawallWidth = $mediawall.width();

  var numItems = $mediawall.find('.media-item.large').length;
  var positions = [0];
	
  for (var i = 1; i < numItems; i++) {
	  positions.push(i * mediawallWidth * .67);
  }
	
  if ($target.hasClass('left')) {
	  mediaPos--;
  } else {
	  mediaPos++;
  }

  mediaPos = Math.max(0, Math.min(mediaPos, numItems - 1));
  $mediawall.clearQueue().animate({scrollLeft: positions[mediaPos]}, 300);
};

onClick_jobOffer = function(ev) {
  var $target = $(ev.currentTarget),
	$parent = $target,
	scrollOffset = 0,
	iterOffsetParent = $parent.get(0);
	
  var isExpanded = $parent.hasClass('expanded');

  if (isExpanded) {
	$parent.removeClass('expanded');
  } 
  else {
	$parent
		.addClass('expanded')
		.siblings()
		.removeClass('expanded');	  
  }
	
  setTimeout(function() {
    scrollOffset = scrollPosition(iterOffsetParent);

    //debugger
    $('.page-content')
      .clearQueue()
      .animate({
        scrollTop: scrollOffset - parseInt($target.css('marginTop')) - 64
      }, 300);
  }, 410);
};

onClick_jobOfferApply = function(ev) {
  var $job = $(ev.currentTarget).closest('.job-offer');

  ev.preventDefault();
  ev.stopImmediatePropagation();

  window.location.href =
    'mailto:info@ethereum.org?subject=Application for role: ' +
    $job.find('.title').text();

  //$('#contact form [name="message"]')
    //.val('Job enquiry: "' + $job.find('.title').text() + '"\n');

  //$('#contact form [name="name.full"]').focus();

  //$('.page-content')
    //.clearQueue()
    //.animate({
      //scrollTop: $('#contact').get(0).offsetTop
    //})
};

onClick_toggleMissionStatement = function(ev) {
	var $missionStatementContents = $('.mission-statement');
	var isOpen = $missionStatementContents.hasClass('expanded');
	
	if (isOpen) {
		$missionStatementContents.removeClass('expanded');
	}
	else {
		$missionStatementContents.addClass('expanded');
		var scrollOffset = scrollPosition($('#mission'));
		$('.page-content').clearQueue().animate({scrollTop: scrollOffset});		
	}
};	

onClick_sectionTab = function(ev) {
  $('.page-content')
    .clearQueue()
    .animate({
      scrollTop: $(this).closest('section').next().get(0).offsetTop
    });
};

onSubmit_contactForm = function(ev) {
  var data = {};

  $(ev.target)
    .serializeArray()
    .forEach(function(x) { data[x.name] = x.value; });

  ev.preventDefault();

  $.post('/ajax/contact', data)
    .promise()
    .then(function() {
      debugger;
    }, function() {
      debugger;
    });
};

}(this);
