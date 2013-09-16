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

					//console.log("EVALUATED TRUE!" + finished_value);
					
					appendMessage( original_div, task_id, msg );
					
					setTimeout( function(){ moveMessage( original_div, '#finished_tasks' ) }, 900 );
					
				}
				else if ( finished_value === 'false' ) {

					console.log("EVALUATED FALSE" + finished_value);

					//appendMessage( original_div, task_id, msg );

					setTimeout( function(){ moveMessage( original_div, '#open_tasks') }, 900);
								
				}

				else {
					console.log('Couldn\'t Move Task!');
				}
			}
		});
	});
	
	/*
	$('button.edit_task'.click() {
		var task_id = $(this).parent().data('task-id');
		$.ajax({
			type: 'POST',
			url: '' + task_id,
			data: '',
			success: function( msg ) {
				$('div[data-task-id="' + task_id + '"]').
			}
		})
	}
	*/

	$('button.archive_task').click(
		function() {

			var task_id = $(this).parent().parent().data('task-id');
			var original_div = $('div[data-task-id="' + task_id + '"]');

			$.ajax({
				type: 'POST',
				url: '/archive/' + task_id,
				data: '',
				success: function( msg ) {

					appendMessage( original_div, task_id, msg );
					setTimeout( 
						function() {
							$('div[data-task-id="' + task_id + '"]').fadeOut().remove();
						}, 3000
					);
					
				}
			});
		}
		
	);

	$('button.delete_task').click(
		function(){
			var task_id = $(this).parent().parent().data('task-id');
			var original_div = $('div[data-task-id="' + task_id + '"]');

			$.ajax({
				type: 'POST',
				url: '/delete/' + task_id,
				data: '',
				success: function( msg ) {
					appendMessage( original_div, task_id, msg );
					setTimeout( 
						function() {
							$('div[data-task-id="' + task_id + '"]').fadeOut().remove();
						}, 3000
					);
				}
			})
		}	
	);

	$('div.task_options').hide();

	$('i.settings_icon').click(
			function() {
			$(this).siblings('div.task_options').slideToggle();
			$(this).toggleClass('activated');
		}
	);

	$('div.new_task_drawer').hide();

	$('button.drawer_button').click(
		function() {
			$(this).siblings('div.new_task_drawer').slideToggle();
			
		}
	);

	toggleLinks('show_open', 'open_tasks');
	toggleLinks('show_finished', 'finished_tasks');

	function toggleLinks( link_class, div_id ) {
		$('div#'+ div_id).hide();

		$('a.' +link_class).click(
			function(event) {
				event.preventDefault();

				if ( $(this).text() == '+' ) {
					$(this).text('-');
					$('div#'+ div_id).slideToggle();
				}
				else if ( $(this).text() == '-') {
					$(this).text('+');
					$('div#'+ div_id).slideToggle();
				}			
			}

		);		
	}
	

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

	function appendMessage( original_div, task_id, msg ) {
		$(original_div).append(
			'<button class="success" data-task-id="' + task_id + '">' + msg + '</button>'
		);

		setTimeout(
			function() {
				$('button[data-task-id="' + task_id + '"]').fadeOut( 300 )
			},
		 	2000
		);
	}
});