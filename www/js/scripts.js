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

		allDescriptionShow : function () {
			This = $F.loading;

		},

		onWindowScroll : function () {
			This = $F.loading;
			if (This.isBigSlider () === true) {
				This.allDescriptionShow ();
			} else {
				$F.sideBars.checkRightSidebar ();
			}
		},

		onWindowResize : function () {
			//console.log('_resize');
		},

		debugClear : function (){
			this.loadingAction ();
			$('.content.one, .background').hide();
			$('body').removeClass('one');
		}
	},
	initializeLections : undefined,
	sideBars : {
		checkRightSidebar : function (){
			var   element = $('.rightSideBar');
			var	  related = $('.related-lections');
			var     elementTopMargin = 180,
				 elementBottomMargin = 40,
						  elementTop = element.offset ().top - $(window).scrollTop (),
					   elementParams = element.offset ().top + element.height () + elementBottomMargin,
					   relatedParams = related.offset ().top;

			console.log (elementParams + ' ' + relatedParams + '_' + elementTop);

			if (elementParams > relatedParams && !element.hasClass ('state')) {
				element.addClass ('state');
			} else {
				if (elementTop > elementTopMargin) {
					element.removeClass ('state');
				}
			}
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
			navs = $('.navigator-item');

	readMore.on('click', $F.loading.allDescriptionShow ());
	navs.on('click', function () {
		var className = $(this).attr('href');
		$('html, body').animate({scrollTop: $(className).offset().top}, 300);
		return false;
	});
});

// Vanille JS code
$F.loading.logoLoadingControll (); // set Timer

window.onresize = $F.loading.onWindowResize;
window.onscroll = $F.loading.onWindowScroll;