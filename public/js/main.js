$(document).ready(function() {

	$('form.single-task-form div.switch input').change(function(){

		var task_id = $(this).parent().parent().data('task-id');
		var finished_value = $(this).attr('value');

		$.ajax({
			type: 'POST',
			url: '/edit/' + task_id,
			data: { finished: finished_value },
			success: function( msg ) {
				var original_div = $('div[data-task-id="' + task_id + '"]');

				if ( finished_value === 'true' ) {

					console.log("True!" + finished_value);
					
					$(original_div).append(
						'<button class="pure-button pure-button-success" data-task-id="' + task_id + '">' + msg + '</button>'
					);

					setTimeout(
						function() {
							$('button[data-task-id="' + task_id + '"]').fadeOut()
						},
					 	900
					);
					
					setTimeout( function(){ moveMessage( original_div, '#completed_tasks' ) }, 900 );
					
				}
				else if ( finished_value === 'false' ) {

					console.log("True!" + finished_value);

					$(original_div).append(
						'<button class="pure-button pure-button-success" data-task-id="' + task_id + '">' + msg + '</button>'
					);

					setTimeout(
						function() {
							$('button[data-task-id="' + task_id + '"]').fadeOut()
						},
					 	900
					);

					setTimeout( function(){ moveMessage( original_div, '#current_tasks') }, 900);
								
				}

				else {
					console.log('Couldn\'t Move Task!');
				}
			}
		});
	});
	$('div.task_options').hide();
	$('i.settings_icon').click(
			function() {
			$(this).siblings('div.task_options').slideToggle();
			$(this).toggleClass('activated');
		}
	);

	function moveMessage( original_div, div ) {
		var div
		var original_div
		$(original_div).parent()
		.fadeOut( 500, function() {
			$(this)
			.detach()
			.appendTo(div)
			.fadeIn( 300 );
		});
	}

});