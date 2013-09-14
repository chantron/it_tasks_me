$(document).ready(function() {

	$('form.single-task-form input').change(function(){

		var task_id = $(this).parent().data('task-id');
		var finished_value = $(this).attr('value');

		
		console.log(task_id);

		$.ajax({
			type: 'POST',
			url: '/edit/' + task_id,
			data: { finished: finished_value }
			}).done(function( msg ) {
			

			var original_div = $('div[data-task-id="' + task_id + '"]');

			if ( finished_value === 'true' ) {

				console.log("True!" + finished_value);
				
				$(original_div).append(
					'<button class="pure-button pure-button-success" data-task-id="' + task_id + '">' + msg + '</button>'
				);

				$('button[data-task-id="' + task_id + '"]').delay( 900 ).fadeOut();

				$(original_div).parent()
				.delay( 1000 )
				.fadeOut( 500, function() {
					$(this)
					.detach()
					.appendTo("#completed_tasks")
					.fadeIn( 300 );
				});

						
			}
			else if ( finished_value === 'false' ) {

				console.log("True!" + finished_value);

				$(original_div).append(
					'<button class="pure-button pure-button-success" data-task-id="' + task_id + '">' + msg + '</button>'
				);

				$('button[data-task-id="' + task_id + '"]').delay( 900 ).fadeOut();

				$(original_div).parent()
				.delay( 1000 )
				.fadeOut( 500, function() {
					$(this)
					.detach()
					.appendTo("#current_tasks")
					.fadeIn( 300 );
				});
							
			}
			else {
				alert('ERROR!');
			}

			
		});
	});

});