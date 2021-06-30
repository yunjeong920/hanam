(function($) {
	'use strict';

	$(function() {

		var $window = element.$window = $(window),
			$html = element.$html = $('html'),
			$header = element.$header = $('header'),
			$container = element.$container = $('#container');

		/* 탭메뉴 */
		var $tabs = $container.find('.tabs'),
			$tabButton = $tabs.find('.tab_button');

		$tabButton.on('click', function(){
			if($(this).parent().hasClass('button_box')){
				$(this).parents('.board_item').addClass('active').siblings().removeClass('active');
			} else {
				$(this).parent().addClass('active').siblings().removeClass('active');
			}
		});

		/* 상단 알림 */
		var $notice = $header.find('.notice_top'),
			$noticeList = $notice.find('.notice_list'),
			$noticeCurrent = $notice.find('.notice_current'),
			$noticeTotal =  $notice.find('.notice_total'),
			$noticePrev = $notice.find('.notice_prev'),
			$noticeAuto = $notice.find('.notice_auto'),
			$noticeNext = $notice.find('.notice_next'),
			$noticeClose = $notice.find('.notice_close');

		$noticeList.slick({
			infinite: true,
			rows: 1,
			slidesToScroll: 1,
			autoplay: true,
			current: $noticeCurrent,
			total: $noticeTotal,
			playText : '재생',
			pauseText : '정지',
			autoArrow : $noticeAuto,
			prevArrow : $noticePrev,
			nextArrow : $noticeNext,
			vertical: true/*,
			responsive: [
				{
					breakpoint: 1401,
					settings:{
						rows: 4
					}
				}
			]*/
		});

		if($notice.length){
			$html.addClass('notice_open');
		}
		$noticeClose.on('click', function(){
			$html.removeClass('notice_open');
			$notice.remove();
		});

		/* 비주얼 */
		var $visual = $container.find('.visual'),
			$visualItem = $visual.find('.visual_item'),
			$visualOpen = $visual.find('.visual_open'),
			$visualList = $visual.find('.basic_list'),
			$visualControl = $visual.find('.visual_control'),
			$visualCurrent = $visual.find('.visual_current'),
			$visualTotal =  $visual.find('.visual_total'),
			$visualAuto =  $visual.find('.visual_auto'),
			$visualPrev =  $visual.find('.visual_prev'),
			$visualNext =  $visual.find('.visual_next'),
			$visualSlickOpt = {
				slidesToShow: 1,
				autoplay: true,
				current: $visualCurrent,
				total: $visualTotal,
				playText: '재생',
				pauseText: '정지',
				autoArrow: $visualAuto,
				prevArrow: $visualPrev,
				nextArrow: $visualNext
			}

		$('.visual .visual_item.active .basic_list').slick($visualSlickOpt);

		$visualItem.each(function (){
			if($(this).hasClass('n1')){
				$(this).children('.visual_open').on('click', function(){
					$('.visual_item.n2 .basic_list').slick('unslick');
					$(this).siblings('.visual_panel').children('.basic_list').slick($visualSlickOpt).slick('setPosition');
					$visualControl.removeClass('n2');
				});
			} else {
				$(this).children('.visual_open').on('click', function(){
					$('.visual_item.n1 .basic_list').slick('unslick');
					$(this).siblings('.visual_panel').children('.basic_list').slick($visualSlickOpt).slick('setPosition');
					$visualControl.addClass('n2');
				});
			}
		});

		/* 게시판 */
		var $board = $container.find('.board'),
			$boardOpen = $board.find('.board_open'),
			$boardList = $board.find('.basic_list'),
			$boardCurrent = $board.find('.board_current'),
			$boardTotal =  $board.find('.board_total'),
			$boardPrev =  $board.find('.board_prev'),
			$boardNext =  $board.find('.board_next'),
			$boardSlickOpt = {
				/*rows: 3,
				vertical: true,*/
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: false,
				current: $boardCurrent,
				/*total: $boardTotal,*/
				prevArrow: $boardPrev,
				nextArrow: $boardNext,
				responsive: [
					{
						breakpoint: 1401,
						settings:{
							slidesToShow: 2,
							slidesToScroll: 1
						}
					}
				]
			}

		function boardTotal() {
			if ($(window).width() < 1401) {
				$boardTotal.text('7');
			} else {
				$boardTotal.text('6');
			}
		}

		boardTotal();

		$('.board .board_item.active .basic_list').slick($boardSlickOpt)
			.on("beforeChange", function (e, slick, current, next) {
				boardTotal();
			});

		$boardOpen.on('click', function(){
			$boardList.slick('unslick');
			$(this).parent().siblings('.board_panel').children('.basic_list').slick($boardSlickOpt).slick('setPosition');
		});

		/* 즐겨찾는메뉴 */
		var $favorite = $container.find('.favorite'),
			$favoriteOpen = $favorite.find('.favorite_btn'),
			$favoriteList = $favorite.find('.favorite_list'),
			$favoritePrev =  $favorite.find('.favorite_prev'),
			$favoriteNext =  $favorite.find('.favorite_next'),
			$favoriteSlickOpt = {
				infinite: true,
				slidesToShow: 9,
				slidesToScroll: 1,
				autoplay: false,
				swipeToSlide: true,
				/*current: $favoriteCurrent,
				total: $favoriteTotal,*/
				prevArrow: $favoritePrev,
				nextArrow: $favoriteNext,
				responsive: [
					{
						breakpoint: 1401,
						settings:{
							slidesToShow: 7
						}
					},
					{
						breakpoint: 1201,
						settings:{
							slidesToShow: 6
						}
					},
					{
						breakpoint: 641,
						settings:{
							slidesToShow: 4.5
						}
					}
				]
			}

		$favoriteList.slick($favoriteSlickOpt);

		$favoriteOpen.click(function(){
			if($(this).hasClass('close')){
				$(this).removeClass('close');
				/*$favoriteCount.removeClass('skip');*/
				$favoriteList.slick($favoriteSlickOpt).removeClass('open');
				$(this).children('span').html('전체<span>보기</span>');
			} else {
				$(this).addClass('close');
				$favoriteList.slick('unslick').addClass('open');
				/*$favoriteCount.addClass('skip');*/
				$(this).children('span').html('닫기');
				$('.favorite_list a').attr("tabindex",0);
			}
		});

		$favoriteList.slick({

		});

		/* sns */
		var $sns = $container.find('.sns'),
			$snsList = $sns.find('.sns_panel .sns_list'),
			$snsItem = $sns.find('.sns_panel .sns_item'),
			$snsButton = $sns.find('.sns_tab .sns_item button'),
			$snsPanelTitle = $sns.find('.sns_panel h3'),
			$snsCurrent = $sns.find('.sns_current'),
			$snsTotal =  $sns.find('.sns_total'),
			$snsPrev =  $sns.find('.sns_prev'),
			$snsNext =  $sns.find('.sns_next'),
			$snsSlickOpt = {
				infinite: false,
				slidesToShow: 5,
				slidesToScroll: 5,
				autoplay: true,
				swipeToSlide: true,
				current: $snsCurrent,
				total: $snsTotal,
				prevArrow: $snsPrev,
				nextArrow: $snsNext,
				responsive: [
					{
						breakpoint: 1001,
						settings:{
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 641,
						settings:{
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			};

		$snsList.slick($snsSlickOpt);

		$snsButton.on('click', function() {
			var $this = $(this),
				$thisParent = $this.parent(),
				NewsIndex = $this.index(),
				data = $this.parent().data(),
				newPanelTitle = $this.text();

			$snsButton.removeAttr('title');
			$thisParent.attr('title', '선택됨');
			$thisParent.addClass('active').siblings().removeClass('active');
			$snsPanelTitle.text(newPanelTitle);
			$snsList.slick('unslick');
			$snsItem.remove();
			$snsList.append((data.category === 'all') ? $snsItem : $snsItem.filter('[data-category="' + data.category + '"]'));
			$snsList.slick($snsSlickOpt);
		}).filter('.active').triggerHandler('click');

		//sns 높이조절
		$(window).load(function (){
			function setHeight(parent ,object) {
				parent = $(parent);
				object = $(object);
				object.css('height', 'auto');
				parent.each(function (){
					var objectArray = new Array();

					$(this).find(object).each(function (){
						var objectHeight = $(this).outerHeight();
						objectArray.push(objectHeight);
					});
					var maxHeight = Math.max.apply(null, objectArray);
					$(this).find(object).height(maxHeight);
				});
			};

			$(document).ready(function() {
				setHeight('.sns','.sns .sns_img');
			});

			$(window).resize(function() {
				setHeight('.sns','.sns .sns_img');
			});
		});

	});
})(window.jQuery);
