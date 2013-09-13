$(document).ready(function() {

	$('form.single-task-form input').change(function(){

		var task_id = $(this).parent().data('task-id')
		var finished_value = $(this).attr('value')

		console.log(finished_value);
		console.log(task_id);

		$.ajax({
			type: 'POST',
			url: '/edit/' + task_id,
			data: { finished: finished_value }
			}).done(function( msg ) {
			
			console.log($('div').data('task-id', task_id));

			$('div[data-task-id="' + task_id + '"]').append(
				'<button class="pure-button pure-button-success" data-task-id="' + task_id + '">' + msg + '</button>'
			);
			

			if ( finished_value === true ) {
				$('div[data-task-id="' + task_id + '"]').parent().clone().appendTo("#completed_tasks");
				$('#completed_tasks div div[data-task-id="' + task_id + '"]').parent().delay( 1200 ).fadeOut( 300 );
			}
			else {
				$('div[data-task-id="' + task_id + '"]').parent().clone().appendTo("#current_tasks");
				$('#completed_tasks div div[data-task-id="' + task_id + '"]').parent().delay( 1200 ).fadeOut( 300 );
			}

			$('button[data-task-id="' + task_id + '"]').delay( 900 ).fadeOut();
		});
	});

});