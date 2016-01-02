// Cat Clicker Take 3 - Cat Clicker Premium

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
  			console.log( "click." );
  			allCats[numCopy].clicks++;
  			var activeCatCountDiv = '<div id="active-cat-count"><h1>Clicks: ' + allCats[numCopy].clicks + '</h1></div>';
			$("#active-cat-count").replaceWith(activeCatCountDiv);
		});
    };
	})(i));
}