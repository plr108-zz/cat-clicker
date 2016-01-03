// Cat Clicker Take 4 - Cat Clicker Premium using Model-View-Octopus

$(function(){

	var model = {
		init: function() {
			localStorage.clear();
			localStorage.cats = JSON.stringify([]);
		},

		add: function(obj) {
			var data = JSON.parse(localStorage.cats);
			data.push(obj);
			localStorage.cats = JSON.stringify(data);
		},

		update: function() {

		},

		getCats: function() {
			return JSON.parse(localStorage.cats);
		}
	};

	var listView = {
		init: function() {
			this.catList = $('#cat-list');
		},
		render: function() {
			var htmlStr = '<div id="cat-list-header"><h1>Select Your Cat</h1></div>';
			var i = 0;
			octopus.getCats().forEach(function(cat){
				htmlStr += '<div class="cat" id="cat-' + i + '"><h2>' + cat.name + '</h2></div>';
				i++;
			});

			this.catList.html(htmlStr);
		}
	};

	var activeCatView = {
		init: function() {
			// do nothing, no Active Cat to start
		}
	};

	var octopus = {

		addCat: function(name) {
			model.add({
				name: name,
				clicks: 0
			});
		},

		getCats: function() {
			return model.getCats();
		},

		init: function() {
			model.init();
			listView.init();

			//create our cats
			octopus.addCat("Arlene");
			octopus.addCat("Azrael");
			octopus.addCat("Beerus");
			octopus.addCat("Butch");
			octopus.addCat("Cat(dog)");

			listView.render();
		}
	};

	// initialize octopus
	octopus.init();

});

/* OLD VERSION -----------------------
var Cat = function(name, pic) {

	var obj = Object.create(Cat.prototype);

	obj.name = name;
	obj.pic = pic;
	obj.clicks = 0;

	return obj;
};

var allCats = [];

allCats[0] = Cat("Arlene","arlene");
allCats[1] = Cat("Azrael","azrael");
allCats[2] = Cat("Beerus","beerus");
allCats[3] = Cat("Butch","butch");
allCats[4] = Cat("Cat(dog)","catdog");

for(i=0; i < allCats.length; i++)
{
	var catDiv = '<div class="cat" id="cat-' + i + '""><h2>' + allCats[i].name + '</h2></div>';
	$("#cat-list").append(catDiv);
	var elem = document.getElementById("cat-"+i);
	var activeCatIndex = -1;

	elem.addEventListener('click', (function(numCopy) {

    return function() {

        var activeCatHeaderDiv = '<div id="active-cat-header"><h1>Your Cat: ' + allCats[numCopy].name + '</h1></div>';
		$("#active-cat-header").replaceWith(activeCatHeaderDiv);

		var activeCatDiv = '<div id="active-cat-pic"><img src="images/' + allCats[numCopy].pic + '.jpg"></div>';
		$("#active-cat-pic").replaceWith(activeCatDiv);

		activeCatIndex = numCopy;

		var activeCatCountDiv = '<div id="active-cat-count"><h1>Clicks: ' + allCats[numCopy].clicks + '</h1></div>';
		$("#active-cat-count").replaceWith(activeCatCountDiv);

		$( "#active-cat-pic" ).click(function() {
  			allCats[numCopy].clicks++;
  			var activeCatCountDiv = '<div id="active-cat-count"><h1>Clicks: ' + allCats[numCopy].clicks + '</h1></div>';
			$("#active-cat-count").replaceWith(activeCatCountDiv);
		});
    };
	})(i));
}
------------ END OLD VERSION */