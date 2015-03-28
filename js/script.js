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
        			htmldata += '<li><a href="' + valuee.url + '" target="_blank" rel="nofollow">' + valuee.name + '</a><br />' + valuee.descriptions;
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
});