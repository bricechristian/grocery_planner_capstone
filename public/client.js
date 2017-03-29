function render(data) {

	var items = data;

	$.ajax('/api/items')
		.done(function (items) {
			$('.results').empty();
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				// var edit = '<img class="edit" src="https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/edit-button-128.png">';
				var itemName = item.name;
				var itemPrice = item.price;
				var $template = $('<li></li>');
				$template.attr('value', item._id);
				// $template.text(itemName + ' $' + itemPrice);
				$template.html('<a class="itemName">' + itemName + '</a>' + '<a class="itemPrice">' + ' $' + itemPrice + '</a>')
				$template.append('<input type="button" value="Delete" class="delete-button"/><br>')
				$('.results').append($template);

			}
		});

}


// AJAX FUNCTIONS


function postAJAX(event) {
	event.preventDefault();

	var options = {
		url: '/api/items',
		type: 'POST',
		data: {
			name: $('.name').val(),
			price: $('.price').val()
		}
	}
	$.ajax(options).done(render);
}

function putAJAX(id) {
	event.preventDefault();

	var options = {
		url: 'api/items/' + id,
		type: 'PUT',
		contentType: 'application/json',
	}
	$.ajax(options).done(render);
}

function deleteAJAX(id) {
	var options = {
		url: '/api/items/' + id,
		method: 'DELETE',
		error: function (err) {
			console.log('an' + err + 'has occured with deleting')
		}
	}
	$.ajax(options).done(render);
}


// ATTEMPTS AT EDITING INLINE



$.fn.editable.defaults.mode = 'inline';

$(document).ready(function() {
    $('.itemName').editable();
});

$('.itemName').editable({
    type: 'text',
    pk: 1,
    url: '/api/items/',
    title: 'Enter Item Name',
    ajaxOptions: {
    	type: 'put',
    	dataType: 'json',
    },
    value: $(this).attr('value')
});

$(document).ready(function() {
    $('.itemPrice').editable();
});

$('.itemPrice').editable({
    type: 'text',
    pk: 1,
    url: '/api/items/',
    title: 'Enter Price',
    ajaxOptions: {
    	type: 'put',
    	dataType: 'json'
    },
    value: $(this).attr('value')
});



// function textEdit (){
// 	$('.save-button').remove();
//     $(this).siblings('#itemName, #itemPrice').each(
//         function(){
//             if ($(this).find('input').length){
//                 $(this).text($(this).find('input').val());
//             }
//             else {
//                 var t = $(this).text();
//                 $(this).html($('<input />',{'value' : t}).val(t));
//             }
//         });
//     $(this).siblings('#itemPrice').append('<input type="button" value="Save" class="save-button"/>')
// }


// $('#itemName').click(function(){
//     var name = $(this).text();
//     $(this).html('');
//     $('<input></input>')
//         .attr({
//             'type': 'text',
//             'name': 'fname',
//             'id': 'txt_fullname',
//             'size': '30',
//             'value': name
//         })
//         .appendTo('#itemName');
//     $('#txt_fullname').focus();
// });

// $('.results').on('blur','#txt_fullname', function(){
//     var name = $(this).val();
//     $.ajax({
//       type: 'PUT',
//       url: 'change-name.xhr?name=' + name,
//       success: function(){
//         $('#itemName').text(name);
//       }
//     });
// });



// RUNNING RENDER FUNCTION


render();



// CLICK HANDLERS



$('.add-button').on('click', postAJAX);

// $('.results').on('click', '.edit', textEdit)

// $('.results').on('click', '.save-button', function () {
// 	var id = $(this).parent().attr('value');
// 	putAJAX(id);
// });

$('.results').on('click', '.delete-button', function () {
	var id = $(this).parent().attr('value');
	deleteAJAX(id);
});