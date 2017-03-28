function render(data) {

	var items = data;

	$
		.ajax('/api/items')
		.done(function (items) {
			$('.results').empty();
			for (var i = 0; i < items.length; i++) {
				var item = items[i];

				var $template = $('<li><input type="button" value="Edit" class="edit-button"/><input type="button value="Delete" class="delete-button"/><br></li>');
				$template.attr('value', item._id);
				$template.text(item.name + ' $' + item.price);
				$template.append('<input type="button" value="Edit" class="edit-button"/><input type="button" value="Delete" class="delete-button"/><br>')
				$('.results').append($template);

			}
		});

}

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
	$
		.ajax(options)
		.done(render);
}

function putAJAX(id) {
	var options = {
		url: 'api/items/' + id,
		type: 'PUT',
		contentType: 'application/json',
		name: '',
		price: ''
	}
	$
		.ajax(options)
		.done(render);
}

function deleteAJAX(id) {
	var options = {
		url: '/api/items/' + id,
		method: 'DELETE',
		error: function (err) {
			console.log('an' + err + 'has occured with deleting')
		}
	}
	$
		.ajax(options)
		.done(render);
}

render();

$('.add-button').on('click', postAJAX);

$('.results').on('click', '.edit-button', function () {

	var id = $(this).parent().attr('value');
	// todo the rest

});

$('.update-button').on('click', putAJAX, function () {
	$('.update-button').hide();
});

$('.results').on('click', '.delete-button', function () {
	var id = $(this).parent().attr('value');
	deleteAJAX(id);
});