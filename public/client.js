// testing connection
alert('connected');

// append items from database to the item-container
// as a list. there will also be a update and delete button
// that appends dynamically next to each item once that item
// is appended.
function renderItems () {
	
	$('.item-container').append(/*somehow append all of my items from my collection*/)
	$('.update-button').show();
	$('.delete-button').show();

}

// ajax functions 

function postAJAX() {

	$.ajax({
		url: '/items',
		type: 'POST',
		contentType: 'application/json',
		data: {name: $('.name').val(), price: $('.price').val()},
		success: renderItems

	});
}


function putAJAX(id) {

	$.ajax({
		url: '/items' + id,
		type: 'PUT',
		contentType: 'application/json',
		data: {/* input value from dynamically appended update input boxes */},
		success: renderItems

	});
}


function deleteAJAX(id) {

	$.ajax({
		url: '/items' + id,
		async: true,
		success: $('').remove();
		error: function(err) {}

	});
}



// add button click handler and ajax request

$('.add-button').on('click', postAJAX());

// edit button click handler allowing for price/item editing
// idea shown here http://jsfiddle.net/davidThomas/767y4/8/

$('.edit-button').on('click',function() {
    $(this).siblings().each(
        function(){
            if ($(this).find('input').length){
                $(this).text($(this).find('input').val());
            }
            else {
                var t = $(this).text();
                $(this).text('').append($('<input />',{'value' : t}).val(t));
            }
        });
});

// update button that'll procede edit button allowing to submit the edit
$('.update-button').on('click', putAJAX());


// delete button click handler and ajax request

$('.delete-button').on('click', deleteAJAX());

