// RENDER FUNCTION


function render(data) {

		var items = data;
		var array = [];

		$.ajax('/api/items')
			.done(function (items) {
						$('.itemInput').val('');
						$('.priceInput').val('');
						$('.results').empty();
						$('.total').empty();
						for (var i = 0; i < items.length; i++) {
								var item = items[i];
								var itemName = item.name;
								var itemPrice = item.price;
								var $template = $('<li></li>');
								$template.attr('value', item._id);
								$template.html('<div class="itemContainer col-L-4"><a class="itemName">' + itemName + '</a></div><div class="priceContainer col-L-4"><a data-pk=' + item._id + ' class="itemPrice"> $' + itemPrice + ' </a></div>');
								$template.append('<div class="deleteContainer col-L-4"><input type="button" value="delete" style="width: 150px; border: none;" class="delete-button"/></div><br>');
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
						name: $('.itemInput').val(),
						price: $('.priceInput').val()
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
				.closest('li')
				.attr('value');
		deleteAJAX(id);
});