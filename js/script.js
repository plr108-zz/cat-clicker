// Cat Clicker Take 4 - Cat Clicker Premium using Model-View-Octopus

var model = {
	activeCat: null,
	cats: [
		{
			name : 'Arlene',
			clicks : 0
		},
		{
			name : 'Azrael',
			clicks : 0
		},
		{
			name : 'Beerus',
			clicks : 0
		},
		{
			name : 'Butch',
			clicks : 0
		},
		{
			name : 'CatDog',
			clicks : 0
		}
	]
};

var listView = {
	init: function() {
		this.catList = $('#cat-list');
		this.catList.append('<div id="cat-list-header"><h1>Select Your Cat</h1></div>');
		this.render();
	},

	render: function() {
		var cats = octopus.getCats();
		for (i = 0; i < cats.length; i++) {
			var cat = cats[i];

			this.catList.append('<div class="cat" id="' + cat.name + '"><h2>' + cat.name + '</h2></div>');

			// using a IFFE and the jQuery .click() method
			jQueryElem = $('#' + cat.name);
			jQueryElem.click((function (meow) {
				return function() {
					octopus.setActiveCat(meow);
					activeCatView.render();
				};
			})(cat));

		}
	}
};

var activeCatView = {
	init: function() {
		this.activeCatHeader = $('#active-cat-header');
		this.activeCatPicVanilla = document.getElementById('active-cat-pic');
		this.activeCatPic = $('#active-cat-pic');
		this.activeCatClicks = $('#active-cat-clicks');
		this.activeCatPic.click(function() {
			octopus.updateClicks();
		});
	},

	render: function() {

		var activeCat = octopus.getActiveCat();

		this.activeCatHeader.empty();
		this.activeCatHeader.append('<h1>Your Cat: ' + activeCat.name + '</h1>');

		this.activeCatClicks.empty();
		this.activeCatClicks.append('<h1>Clicks: ' + activeCat.clicks + '</h1>');

		this.activeCatPic.empty();
		this.activeCatPic.append('<img id="active-cat-img" src="images/' + activeCat.name + '.jpg">');
	}
};

var octopus = {
	getCats: function() {
		return model.cats;
	},

	getActiveCat: function() {

		return model.activeCat;
	},

	setActiveCat: function(cat) {

		model.activeCat = cat;
	},

	updateClicks: function() {
		model.activeCat.clicks++;
		activeCatView.render();
	},

	init: function() {
		listView.init();
		activeCatView.init();
	}
};

// initialize octopus
octopus.init();
