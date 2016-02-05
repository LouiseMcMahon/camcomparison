function defineEvents(){
	var camTable = $('#camTable').DataTable();

	camTable.on( 'draw', function () {
		buildRangeCollum()
		fillAdvancedSearchOptions()
	} );
	
	$( window ).resize(function() {
		buildRangeCollum()
	});
	
	$('#manufacturerSearchOption').on( 'change', function () {
		camTable
		.column(0)
		.search( $(this).val() )
		camTable
		.column(1)
		.search("")
		camTable
		.column(2)
		.search("")				
		
	    camTable.draw();
	} );
	
	$('#modelSearchOption').on( 'change', function () {
		camTable
		.column(1)
		.search( $(this).val() )				
		camTable
		.column(2)
		.search("")
	    
		camTable.draw();
	} );
	
	$('#nameSearchOption').on( 'change', function () {
		camTable
		.column(2)
		.search( $(this).val() )
	    .draw();
	} );		    
		   		
	
	$('#rangeInput').keyup( function() {
		camTable.draw();
	} );
	
	$('#priceInput').keyup( function() {
		camTable.draw();
	} );
	
	$('#weightInput').keyup( function() {
		camTable.draw();
	} );
	
	$('#strengthInput').keyup( function() {
		camTable.draw();
	} );
	
	$('#stemCountInput').on( 'change', function () {
		camTable
		.column(7)
		.search( $(this).val() )
	    .draw();
	} );
	
	$('#axleCountInput').on( 'change', function () {
		camTable
		.column(8)
		.search( $(this).val() )
	    .draw();
	} );
	
	$('#extendableSlingInput').on( 'change', function () {
		camTable
		.column(9)
		.search( $(this).val() )
	    .draw();
	} );
	
	$('#offsetInput').on( 'change', function () {
		camTable
		.column(10)
		.search( $(this).val() )
	    .draw();
	} );
	
	$('#showExtraData').on( 'click', function () {
		
		console.log(camTable.columns(5).visible()[0])
		if (camTable.columns(5).visible()[0]){
			camTable
			.columns([5,6,7,8,9,10])
			.visible(false)
			$('#showExtraData').text("Show Extra Data")
		}
		else{
			camTable
			.columns([5,6,7,8,9,10])
			.visible(true)
			$('#showExtraData').text("Hide Extra Data")
		}
		buildRangeCollum()
		
	} );
	
	$('#currencyInput').on( 'change', function () {
		importData()
	} );
}