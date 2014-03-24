$(function(){

	$('.vertical.sidebar').first().sidebar('toggle');
	$('.ui.checkbox').checkbox();

	var $menu = $('div.sidebar.menu');
	var $activeMenu = $menu.find('a.item.active');
	var $search = $menu.find('div.right.menu');

	$menu.find('a.item').on('click', function() {
		var section = $(this).attr('tab-section');

		$menu.find('a.item').removeClass('active');
		$('section').hide();

		section === "mp-dishes" ? $search.show() : $search.hide();

		$(this).addClass('active');
		$('section.'+section).show();

	});
	

	$activeMenu.click();

});