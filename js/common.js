(function($) {
	'use strict';

	$(function() {
		/* 메뉴 */
		var $header = $('#header'),
			$lnb = $header.find('.lnb'),
			depth3ItemLenght = $lnb.find('.depth3_item').length;

		if(depth3ItemLenght >= 10){
			$(this).parents('.depth2_item').addClass('wide');
		}

		/* 검색 */
		var $search = $header.find('.search'),
			$searchQuery = $search.find('.search_query'),
			$searchKeyboard = $search.find('.search_keyboard'),
			nvk = new NeoVirtualKeyboard({
				inputElement : $searchQuery,
				keyLayoutType : 'MULTI'
			});

		$searchKeyboard.on('click', function () {
			nvk.showKeyboard(this);
		});
	});
})(window.jQuery);
