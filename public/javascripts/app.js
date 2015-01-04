$(function() {

var beerView = new BeerView();
var bacMeterView = new BacMeterView();
var alculatorView = new AlculatorView();

var round = [
	{hours: 1, sex: 'male', lbs: 155, abv: 5, drinks: 3}
]

new RoundView(round);



	$('#liquor-tab').on('click',
		function(e) {
			e.preventDefault();
			var liquorView = new LiquorView();
	});
	$('#wine-tab').on('click',
		function(e) {
			e.preventDefault();
			var wineView = new WineView();
	});
	$('#beer-tab').on('click',
		function(e) {
			e.preventDefault();
			var beerView = new BeerView();
	});
	$('#beer-search').on('submit', function(e) {
		e.preventDefault();
		beerQuery = $('#beer-query').val();
		$.ajax({
			url: '/beers',
			method: 'get',
			data: {
				query: beerQuery
			},
			dataType: 'JSON',
			success: function(data) {
				beer = new Beer(data);
				console.log(beer);
				var view = new BarTabView({model: beer});
			}
		});
	});


	$('#bac-submit-btn').on('click', function(e) {
		e.preventDefault;
		console.log('Heeyutz!');
		console.log(lbs);
		console.log(hours);
		console.log(drinks);
		console.log(abv);
		console.log(sex);
		$.ajax({
			url: '/api/rounds',
			method: 'POST',
			data: {
				lbs: document.getElementById('lbs').value,
				hours: document.getElementById('hours').value,
				drinks: document.getElementById('drinks').value,
				abv: document.getElementById('abv').value,
				sex: document.getElementById('male').value,
				rate: sex === 'male' ? 0.73 : 0.66,
			},
			success: function(data) {
				console.log('data');
				bevOz = drinks * 12,
				alcOz = bevOz * (abv * 0.01),
				metricOz = alcOz * 5.14,
				metabolism = lbs * rate,
				subLevel = metricOz /  metabolism,
				soberingRate = 0.015 * hours,
				bac = subLevel - soberingRate
				var round = new Round(data);
				var roundView = new RoundView(bac);
			},
			error: function() {
				alert('Nope');
			}
		});
	});

	$.get('/blocks', appendToList);

	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);
		var blockData = form.serialize();
		// serialize transforms form data to URL-encoded notation

		$.ajax({
			type: 'POST',
			url: '/blocks',
			data: blockData
		}).done(function(blockName){
			appendToList([blockName]);
			form.trigger('reset');
		});
	});

	$('.block-list').on('click', 'a[data-block]', function(event) {
		if (!confirm('Are you sure?')) {
			return false;
		}
		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE',
			url: '/blocks' + target.data('block')
		}).done(function() {
			target.parents('li').remove();
		});
	});

	function appendToList(blocks) {
		var list = [];
		var content, block;
		for(var i in blocks){
			block = blocks[i];
			content = '<a href="/blocks/'+block+'">'+block'</a>';
			'<a href="#" data-block='+block+'">delete</a>'
			list.push($('<li>', {html: content}));
		}
		$('.block-list').append(list)
	}
});



console.log('app');