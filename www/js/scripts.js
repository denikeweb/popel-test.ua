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

		debugClear : function (){
			this.loadingAction ();
			$('.content.one, .background').hide();
			$('body').removeClass('one');
		},

		onWindowResize : function () {
			console.log('_resize');
		}
	},
	initializeLections : {
		lections : {
			lection1 : {
				price : 75,
				inBusket: false,
				title: 'Стародавня Греція. Боги. Мармур. Емоції.',
				date: '6 жовтня 2014 о 14:00',
				lector: ''
			}
		}
	}
};

$F.loading.logoLoadingControll ();
// задаем таймер

$(function(){
	$F.loading.pageIsLoad ();
	$F.loading.debugClear ();
	//console.log ('Страница загружена: ' + $F.loading.loadingStatus);
	var readMore = $('.more.one');
	readMore.on('click', function () {

	});
});

window.onresize = $F.loading.onWindowResize;