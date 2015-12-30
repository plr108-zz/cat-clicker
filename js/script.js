// Cat Clicker Take 1

var clicks = 0;

$('#cat').click(function(e) {

    var $message = $('#message');

    // clear out old data before new request
    $message.text("");

    clicks++;
    console.log("Cat clicks: " + clicks);

    $message.text("Cat clicks: " + clicks);

});