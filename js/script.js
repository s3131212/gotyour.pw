$(document).ready(function (){
    $.ajax({
        url: 'data.json',
        type: 'GET',
        dataType: 'json',
        success: function(data){
        	var htmldata = "";
        	var i = 1;
        	$.each(data[0], function( index, value ) {
        		if(i % 2 == 1){
        			htmldata += '<div class="row"><div class="6u 12u(narrower)"><section class="box">';
        		}else{
        			htmldata += '<div class="6u 12u(narrower)"><section class="box">';
        		}

        		htmldata += '<header class="major"><h2>' + index + '</h2></header>';
        		htmldata += '<ul>';

        		$.each(value, function( indexx, valuee ) {
        			htmldata += '<li data-category=\'' + JSON.stringify(valuee.category) + '\' data-difficulty="' + valuee.difficulty + '"><a href="' + valuee.url + '" target="_blank" rel="nofollow">' + valuee.name + '</a><br /><span>' + valuee.description + '</span>';
				});

        		htmldata += '</ul>';
				if(i % 2 == 1){
        			htmldata += '</section></div>';
        		}else{
        			htmldata += '</section></div></div>';
        		}

        		i++;
			});

			$("#datacon").append(htmldata);
        },
        error: function(){
        	alert("Oh no, something goes wrong.");
        }
    });
    $('#difficulty, #category').on('change', function(){
        $('.selected_resources').removeClass('selected_resources');
        $('.unselected_resources').removeClass('unselected_resources');
        if($('#category').val() == 0 && $('#difficulty').val() == 0) return false;
        $('#datacon li').each(function(){
            if($(this).data('difficulty') == $('#difficulty').val() || $(this).data('difficulty') == 0 || $('#difficulty').val() == 0){
                if($('#category').val() == 0 ||jQuery.inArray($('#category').val(), $(this).data('category'))>-1){
                    $(this).addClass('selected_resources');
                }
            }
        });
        $('#datacon li:not(.selected_resources)').addClass('unselected_resources');
    });
});
