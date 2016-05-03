function importData(){
		
	var currencySymbols = []
	currencySymbols["USD"] = "$"
	currencySymbols["GBP"] = "£"
	currencySymbols["EUR"] = "€"
	
	var camTable = $('#camTable').DataTable();
	camTable.clear();
	
	var selectedCurrency = $('#currencyInput').val()
	
	//Import Data and create base html table
	$.getJSON("cams.json", function(result){			
        $.each(result, function(i, cam){
        	row = camTable.row.add([
             	cam["manufacturer"],
               	cam["name"],
               	cam["variant"],
               	cam["range"][0]+'-'+cam["range"][1],
               	currencySymbols[selectedCurrency]+cam["price"][selectedCurrency],
               	cam["weight"]+"g",
               	cam["strength"]+"kN",
               	cam["stemNumber"],
               	cam["axleNumber"],
		        cam["lobeNumber"],
               	cam["extendableSling"],
				cam["offset"],
             	cam["color"]
               ])
        });
        
        camTable.draw()
    
	});
}