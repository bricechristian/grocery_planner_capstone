// testing connection
// alert('connected');

// append items from database to the item-container
// as a list. there will also be a update and delete button
// that appends dynamically next to each item once that item
// is appended.
function render (data) {

	var items = data;
	// console.log(items);
	var options = {
		url: 'api/items',
		type: 'GET',
		contentType: 'application/json'
	}

	$.ajax(options).done(function(items){
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			$('.item').append(item.name + ' $' + item.price + ' ' + '<input type="button" value="Edit" class="edit-button"/>' + '<input type="button" value="Delete" class="delete-button"/>' + '<br>');
		}
	})

	$.ajax(options).done(function(items){
		for(var i = 0; i < items.length; i++){
			var array = [];
			var item = items[i].price;
			var itemNum = Number(item);
			array.push(itemNum);
			var sum = array.reduce(add);
			function add(a, b) {
    			return a + b;
			}
			$('.total').text('Total $' + sum);
			console.log(array);
		// 	var sum = item.reduce(add);
		// 	function add(a, b) {
  //   			return a + b;
		// 	}
		// 	console.log(item)
		// 	$('.total').append(sum);
		}
	})

}

// ajax functions 


function postAJAX () {
	var options = {
		url: 'api/items',
		type: 'POST',
		contentType: 'application/json',
		name: $('.name').val(), 
		price: $('.price').val(),
		}	
	$.ajax(options).done(render);
}



function putAJAX (id) {
	var options = {
		url: 'api/items/' + id,
		type: 'PUT',
		contentType: 'application/json',
		name: '', 
		price: ''
		}	
	$.ajax(options).done(render);
}



function deleteAJAX (id) {
	var options = {
		url: 'api/items/' + id,
		type: 'DELETE',
		async: true,
		error: function(err) {console.log('an' + err + 'has occured with deleting')}
		}	
	$.ajax(options).done(render);
}


render();

// add button click handler and ajax request

$('.add-button').on('click', postAJAX());

// edit button click handler allowing for price/item editing
// idea shown here http://jsfiddle.net/davidThomas/767y4/8/

$('.edit-button').on('click',function() {
    // $(this).siblings().each(
    //     function(){
    //         if ($(this).find('input').length){
    //             $(this).text($(this).find('input').val());
    //         }
    //         else {
    //             var t = $(this).text();
    //             $(this).text('').append($('<input />',{'value' : t}).val(t));
    //         }
    //     });
    // $('.update-button').show();

    alert('hello');
});

// update button that'll procede edit button allowing to submit the edit
$('.update-button').on('click', putAJAX(), function(){
	$('.update-button').hide();
});


// delete button click handler and ajax request

$('.delete-button').on('click', deleteAJAX(), function(){
	$(this).parent().remove();
	$('.delete-button').hide();
});

