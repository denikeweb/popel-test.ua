$F = {
	loading : {
		loadingStatus : false,
		// setting timer for tracking loading
		logoLoadingControll : function () {
			animationTime = 12500; // default: 2s + .5s = 2500
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
			plug.fadeOut (1000, function () {$('.download').removeClass ('download')});
			console.log ('Выполнено действие');
			return true;
		},
		debugClear : function (){
			this.loadingAction ();
		}
	}
};

$F.loading.logoLoadingControll ();
// задаем таймер

$(function(){
	$F.loading.pageIsLoad ();
	//$F.loading.debugClear ();
	//console.log ('Страница загружена: ' + $F.loading.loadingStatus);
});