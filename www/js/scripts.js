$F = {
	loading : {
		loadingStatus : false,
		// setting timer for tracking loading


		logoLoadingControll : function () {
			animationTime = 2500; // default: 2s + .5s = 2500
			setTimeout(function () {
				This = $F.loading;
				//console.log ('Заданный интервал времени прошел: ' + This.loadingStatus + This);
				if (This.loadingStatus === true) {
					//console.log('Должно быть выполнено действие: по истечению времени');
					This.loadingAction();
				} else {
					This.loadingStatus = true;
					//console.log('Изменен статус по истечению времени: ' + This.loadingStatus);
				}
			}, animationTime);
			//console.log (this);
			return true;
		},
		//reporting loading complete

		pageIsLoad : function () {
			if (this.loadingStatus === true) {
				//console.log('Должно быть выполнено действие: по статусу загрузки');
				this.loadingAction();
			} else {
				this.loadingStatus = true;
				//console.log('Изменен статус по результату полной загрузки страницы: ' + this.loadingStatus);
			}
		},
		// actions after all page loading

		loadingAction : function () {
			var logo = $('.start-plug'),
				plug = $('.plug-box');
			actionTime = 1000;
			plug.fadeOut (actionTime, function () {$('.download').removeClass ('download')});
			setTimeout(function () {$('.plug-box').detach ();}, actionTime);
			// спустя некоторое время после открытия контента удаляем
			// сверстанный логотип, так как он занимает много памяти и нам не нужен

			console.log ('Выполнено действие');
			return true;
		},

		isBigSlider : function () {
			return $('body').hasClass('one');
		},

		allDescriptionShow : function (This) {
			//var This = $F.loading;
			var one = $('.content.one, .background'),
				two = $('.content.two'),
			 header = $('.header-little.two');
			   body = $('body');
			body.removeClass('one');
			///one.slideUp (2000);
			one.addClass ('hideSlider');
			two.show (2000);
			header.show ();
		},

		turn : function (direction, This) {
			//var This = $(this);
			var time = 0;
			if (direction == 1) {
				var thisSlide = This.parent ().parent (),
				nextSlide = thisSlide.next('.slides');
				console.log ('+' + This.text());
				thisSlide.slideUp(time);
				nextSlide.slideDown(time);
				console.log (thisSlide + ' ' + nextSlide);
			} else {
				var thisSlide = This.parent ().parent (),
					prevSlide = thisSlide.prev('.slides');
				console.log ('+' + This.text());
				thisSlide.hide(time);
				prevSlide.show(time);
				console.log (thisSlide + ' ' + nextSlide);
			}
		},

		onWindowScroll : function () {
			var This = $F.loading;
			if (This.isBigSlider () === true) {
				//This.allDescriptionShow ();
			} else {
				$F.sideBars.checkRightSidebar ();
				$F.sideBars.checkLeftNav ();
			}
		},

		onWindowResize : function () {
			//console.log('_resize');
		},

		debugClear : function (){
			this.loadingAction ();
			//$('.content.one, .background').hide();
			//$('.content.two').show();
			//$('body').removeClass('one');
		}
	},
	initializeLections : undefined,
	sideBars : {
		checkRightSidebar : function (){
			if ($F.loading.isBigSlider ()) return false;
			var   element = $('.rightSideBar');
			var	  related = $('.related-lections');
			var     elementTopMargin = 180,
				 elementBottomMargin = 40,
						  elementTop = element.offset ().top - $(window).scrollTop (),
					   elementParams = element.offset ().top + element.height () + elementBottomMargin,
					   relatedParams = related.offset ().top;

			//console.log (elementParams + ' ' + relatedParams + '_' + elementTop);

			if (elementParams > relatedParams && !element.hasClass ('state')) {
				element.addClass ('state');
			} else {
				if (elementTop > elementTopMargin) {
					element.removeClass ('state');
				}
			}
		},
		checkLeftNav : function () {
			if ($F.loading.isBigSlider ()) return false;
			var navs = $('.navigator-item'),
				top = $(window).scrollTop (),
				thisTop = top + 3000,
				thisObj = $(window),
				active = $('.navigator-item.active');

			navs.each(function () {
				var This = $($(this).attr('href'));
				//console.log (This.offset ().top + ' ' + thisTop + ' ' + top);
				var submit = Math.abs(This.offset ().top - top);
				if (submit < thisTop) {
					thisTop = submit;
					thisObj = $(this);
				}
			});
			console.log (thisObj);
			if (!thisObj.hasClass('active')){
				active.removeClass('active');
				thisObj.addClass('active');
				console.log (12);
			}
			//console.log (thisTop);
		},
		navigatorClick : function () {

		}
	}

};


//jQuery code
$(function(){
	$F.loading.pageIsLoad ();
	$F.loading.debugClear ();
	//console.log ('Страница загружена: ' + $F.loading.loadingStatus);

	var readMore = $('.more.one'),
			navs = $('.navigator-item'),
			  tr = $('.turn-right'),
			  tl = $('.turn-left');

	readMore.on('click', function () {$F.loading.allDescriptionShow ($(this));});
	tr.on('click', function () {$F.loading.turn (1, $(this));});
	tl.on('click', function () {$F.loading.turn (0, $(this));});

	navs.on('click', function () {
		var         This = $(this),
			   className = This.attr('href'),
				  active = $('.navigator-item.active');

		active.removeClass('active');
		This.addClass('active');
		$('html, body').animate({scrollTop: $(className).offset().top - 100}, 300);

		return false;
	});

});

// Vanille JS code
$F.loading.logoLoadingControll (); // set Timer

window.onresize = $F.loading.onWindowResize;
window.onscroll = $F.loading.onWindowScroll;