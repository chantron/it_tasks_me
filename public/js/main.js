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
			)
			$('button[data-task-id="' + task_id + '"]').delay( 900 ).fadeOut();
			//$('div[data-task-id="' + task_id + '"]').parent().contents().appendTo("#completed_tasks");
			//$('div[data-task-id="' + task_id + '"]').parent().fadeOut( 300 );
		});
	});

});