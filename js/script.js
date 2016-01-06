// Cat Clicker Take 4 - Cat Clicker Premium using Model-View-Octopus

var model = {
	activeCat: null,
	adminMode: false,
	cats: [
		{
			name : 'Arlene',
			clicks : 0,
			imageURL: 'images/Arlene.jpg'
		},
		{
			name : 'Azrael',
			clicks : 0,
			imageURL: 'images/Azrael.jpg'
		},
		{
			name : 'Beerus',
			clicks : 0,
			imageURL: 'images/Beerus.jpg'
		},
		{
			name : 'Butch',
			clicks : 0,
			imageURL: 'images/Butch.jpg'
		},
		{
			name : 'CatDog',
			clicks : 0,
			imageURL: 'images/CatDog.jpg'
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
		this.activeCatPic.append('<img id="active-cat-img" src="' + activeCat.imageURL + '">');
	}
};

var adminView = {
	init: function() {
		this.admin = $('#admin');
		this.admin.append('<button id="admin-button" type="button"><h1>Admin Mode: OFF</h1></button>');
		this.adminButton = $('#admin-button');
		this.setButtonListener();
	},

	showAdminMode: function() {
		console.log("showAdminMode");
	},

	hideAdminMode: function() {
		console.log("hideAdminMode");
	},

	setButtonListener: function() {
		this.adminButton.click((function(button) {
			return function() {

				button.empty();
				var mode = octopus.getAdminModeStatus() ? "OFF" : "ON";
				octopus.toggleAdminModeStatus();
				button.append('<h1>Admin Mode: ' + mode + '</h1>');
				if(mode === "ON") {
					adminView.showAdminMode();
				} else {
					adminView.hideAdminMode();
				}
			};
		})(this.adminButton));
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

	getAdminModeStatus: function() {
		return model.adminMode;
	},

	toggleAdminModeStatus: function() {
		model.adminMode = !model.adminMode;
	},

	init: function() {
		listView.init();
		activeCatView.init();
		adminView.init();
	}
};

// initialize octopus
octopus.init();