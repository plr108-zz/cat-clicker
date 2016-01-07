// Cat Clicker Take 5 - Cat Clicker Premium Pro - Model-View-Octopus with Admin Mode

var model = {
	activeCat: null,
	adminMode: false,
	cats: [
		{
			name : 'Azrael',
			clicks : 0,
			imageURL: 'images/azrael.jpg'
		},
		{
			name : 'Felix',
			clicks : 0,
			imageURL: 'images/felix.jpg'
		},
		{
			name : 'Garfield',
			clicks : 0,
			imageURL: 'images/garfield.jpg'
		},
		{
			name : 'Scratchy',
			clicks : 0,
			imageURL: 'images/scratchy.jpg'
		},
		{
			name : 'Tom',
			clicks : 0,
			imageURL: 'images/tom.jpg'
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

		activeCatView.init();


		var cats = octopus.getCats();

		// randCat used to set a random cat to show on startup
		var randCat = Math.floor(Math.random() * 5);

		for (i = 0; i < cats.length; i++) {
			var cat = cats[i];
			this.catList.append('<div class="cat" id="' + cat.name + '"><h2>' + cat.name + '</h2></div>');

			// set a random cat to show on startup
			if(randCat === i) {
				octopus.setActiveCat(cat);
				activeCatView.render();
			}

			jQueryElem = $('#' + cat.name);
			// using an IFFE and the jQuery .click() method
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
		this.admin.append('<p id="admin-welcome"></p>');
		this.adminButton = $('#admin-button');
		this.adminWelcome = $('#admin-welcome');
		this.setButtonListener();
	},

	showAdminMode: function() {
		this.adminWelcome.empty();
		this.adminWelcome.append('<p id="admin-welcome">Welcome to Admin Mode.</p>');
		this.adminWelcome.append('<p id="admin-welcome2">Change the details of your cat.</p>');

		var activeCat = octopus.getActiveCat();
		console.log(activeCat.name);

		//this.adminWelcome.append('<h1>Name</h1><input type="text" name="name" value=' + activeCat.name +'>');
		this.adminWelcome.append('<h1>Image</h1><input type="text" name="image-url" value="someURLstring">');
		this.adminWelcome.append('<h1>Clicks</h1><input type="text" name="clicks" value="numClicks">');
	},

	hideAdminMode: function() {
		this.adminWelcome.empty();
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
		adminView.init();

	}
};

// initialize octopus
octopus.init();