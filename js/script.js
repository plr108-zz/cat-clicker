// Cat Clicker Take 3 - Cat Clicker Premium

var clicks1 = 0;
var clicks2 = 0;

var $catName1 = $('#catName1');
$catName1.text('Pinky');

var $catName2 = $('#catName2');
$catName2.text('Dave');


$('#catPic1').click(function(e) {

	$('#catName1').text = 'Fluffy';

	console.log("Cat 1 clicked");
    var $message1 = $('#message1');

    // clear out old data before new request
    $message1.text("");

    clicks1++;

    $message1.text("Clicks: " + clicks1);

});

$('#catPic2').click(function(e) {


	console.log("Cat 2 clicked");
    var $message2 = $('#message2');

    // clear out old data before new request
    $message2.text("");

    clicks2++;

    $message2.text("Clicks: " + clicks2);

});