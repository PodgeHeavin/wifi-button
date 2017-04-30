$(function() {
    var winners = [];
    var winnerObjs = [];
    var inProgress = false;
    var imageCount = 0;
	var count = 0;
	
	$('#complete').hide();
    setInterval(function() {
        $.get("is-button-hit", function(data, status) {
            if (data == true && !inProgress) {
				if(count < prizesMax){
					$('#main').show();
					$('#complete').hide();
					pickWinner();
					count ++;
				}
				else{
					$('#main').hide();
					$('#complete').show();
				}
            }
        });
    }, 500);

    $('body').keyup(function(e) {
        if (e.keyCode == 13 && !inProgress) {
            if(count < prizesMax){
					$('#main').show();
					$('#complete').hide();
					pickWinner();
					count ++;
				}
				else{
					$('#main').hide();
					$('#complete').show();
				}
        }
		if(e.keyCode == 107){
			prizesMax ++;
		}
    });
	
	function pickWinner(){
		inProgress = true;
            // user has pressed space
            $('#gif').hide("");
            $('#name').html("").hide();
            var count = 0;
            var randomNumbersCount = Math.floor((Math.random() * (10)) + 5);
            var interval = setInterval(function() {
				
                var index = Math.floor(Math.random() * (members.length));
                console.log("Selected Index:"+index);
				$("#winner").html(members[index].number);
				count++;
				
                if (count > randomNumbersCount) {
					clearInterval(interval);
					
					var currentWinner  = members[index];
					console.log("Selected Index:"+index);				
					console.log("Winner: "+currentWinner);
					
					winnerObjs.push(currentWinner);		
					
                    console.log("winner:" + members[index].number);
                    
                    if (imageCount == 29) {
                        imageCount = 1;
                    } else {
                        imageCount++;
                    }
                    setTimeout(function() {
                        $('#name').html(nameToTitleCase(members[index].firstName) + " " + nameToTitleCase(members[index].surname)).fadeIn();
                    }, 2000);
                    setTimeout(function() {
                        $('#gif').attr("src", "img/winner" + imageCount + ".gif").show();
                    }, 3000);
                    setTimeout(function() {
                        inProgress = false;
						members[index]=null;
						members = cleanArray(members);						
                    }, 5000);                    
                }
            }, 150);
	}

    function nameToTitleCase(str) {
        var nameSplit = str.split('\'');
        if (nameSplit.length > 1) {
            return nameSplit[0].charAt(0).toUpperCase() + "'" + nameSplit[1].charAt(0).toUpperCase() + nameSplit[1].substr(1).toLowerCase();
        }
        var nameSplit = str.split('\'');
        if (str.match("^mc") || str.match("^Mc") || str.match("^MC")) {
            return "Mc" + str.charAt(2).toUpperCase() + str.substr(3).toLowerCase();
        }
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    }
	
	function cleanArray(actual) {
	  var newArray = new Array();
	  for (var i = 0; i < actual.length; i++) {
		if (actual[i]) {
		  newArray.push(actual[i]);
		}
	  }
	  return newArray;
	}
});