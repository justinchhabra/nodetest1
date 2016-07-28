
//alert("hello");
//console.log("hello2")


$(function() {

	getItems();

    $( "#saveList" ).click(function() {
	  updateDatabase();
	});

	$( "#addItem" ).click(function() {
	  addNewItem();
	});

});



function getItems(){
	console.log("getting items from database");

	 $.ajax({
        type: 'GET',
        url: 'getItems',
        data: "",
        contentType: 'application/json',
        dataType: 'json',
        success: function (items) {

        	var name = "default name";
            for(var x=0, y=items.length; x<y; x++){
            	name = items[x].name;
            	addItem(name)
            	//name = "new Item"
	            
			}


			//$( "#sortable" ).append("<li class='ui-state-default' id='"+name+"'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>"+name+"</li>")

			$( "#sortable" ).sortable();
			$( "#sortable" ).disableSelection();

			$( ".delete" ).click(function(e) {
				removeListItem(e);
			  
			});

        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}

function updateDatabase(){
	console.log("updating database");

	var itemArray = $( "#sortable" ).sortable("toArray");
	var itemJsonArray = [];

	for(var x=0, y=itemArray.length; x<y; x++){
		var itemJson = {name:itemArray[x]};
		itemJsonArray.push(itemJson);
	}

	$.ajax({
        type: 'POST',
        data: JSON.stringify(itemJsonArray),
        processData: true,
        contentType: 'application/json',
        url: 'update'
    }).done(function( response) {

        // Check for successful (blank) response
        if (response.status === 'success') {

            console.log("updated");
            // Update the table

            // update history collection
            //DSN.Global.Util.addRaceToHistory(raceObject._id);
        }
        else {

            // If something goes wrong, alert the error message that our service returned
            console.log('Error: ' + response.message);
            console.log("not updated");

        }
    });
}

function addNewItem(){
	console.log("add list item");
	var itemName = $("#newItem").val();

	addItem(itemName)
	
}

function addItem(name){
	$( "#sortable" ).append("<li class='ui-state-default' id='"+name+"'><span class='delete ui-icon ui-icon-closethick'></span>"+name+"</li>")
}

function removeListItem(e){
	console.log("from remove list item", e);
	var $item = $(e.currentTarget)
	console.log($item);
	$item.closest("li").remove();
	
}

