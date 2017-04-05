// RENDER FUNCTION


function render(data) {

		var items = data;
		var array = [];

		$.ajax('/api/items')
			.done(function (items) {
						$('.results').empty();
						$('.total').empty();
						for (var i = 0; i < items.length; i++) {
								var item = items[i];
								var itemName = item.name;
								var itemPrice = item.price;
								var $template = $('<li></li>');
								$template.attr('value', item._id);
								$template.html('<a class="itemName">' + itemName + '</a><a data-pk=' + item._id + ' class="itemPrice"> $' + itemPrice + ' </a>');
								$template.append('<input type="button" value="Delete" class="delete-button"/><br>');
								$('.results').append($template);
								array.push(Number(itemPrice));
						}

						var priceTotal = _.sum(array).toFixed(2);
						
						$('.total').append('TOTAL: ' + priceTotal);


						// PUT REQUEST THROUGH X-EDITABLE


						$(document).ready(function () {
								$('.itemPrice').editable({
										url: '/api/items/update',
										name: 'price',
										type: 'text',
										ajaxOptions: {
												type: 'put'
										},
										title: 'Change Item Price'
								});
								$.fn.editable.defaults.mode = 'popup';
						});

				});

}



// AJAX REQUESTS



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



// CLICK EVENT HANDLERS AND RENDER FUNCTION CALLED


render();

$('.add-button').on('click', postAJAX);

$('.results').on('click', '.delete-button', function () {
		var id = $(this)
				.parent()
				.attr('value');
		deleteAJAX(id);
});