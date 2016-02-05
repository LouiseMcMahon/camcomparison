function fillAdvancedSearchOptions(){
		
	var camTable = $('#camTable').DataTable();
	
	//manufacturer
	$("#manufacturerSearchOption option").remove();
	$('#manufacturerSearchOption').append( $('<option value="">All</option>') );
	
	var currentSearchTerm = camTable.column(0).search()
	camTable.column(0, {page:'all',search:'none'}).data().unique().sort().each( function( val ) {
		var html = ""
		html += '<option value="'+val+'" '			
		if(val==currentSearchTerm){
			html += 'selected="selected"'
		}			
		html += ' >'+val+'</option>'
		
		$('#manufacturerSearchOption').append( html );
	} );
	
	//Model
	$("#modelSearchOption option").remove();
	$('#modelSearchOption').append( $('<option value="">All</option>') );
	
	var currentSearchTerm = camTable.column(1).search()
	camTable.column(1, {page:'all',search:'applied'}).data().unique().sort().each( function( val ) {
		var html = ""
		html += '<option value="'+val+'" '			
		if(val==currentSearchTerm){
			html += 'selected="selected"'
		}			
		html += ' >'+val+'</option>'
		
		$('#modelSearchOption').append( html );
	} );
	
	//Name
	$("#nameSearchOption option").remove();
	$('#nameSearchOption').append( $('<option value="">All</option>') );
	
	var currentSearchTerm = camTable.column(2).search()
	camTable.column(2, {page:'all',search:'applied'}).data().unique().sort().each( function( val ) {
		var html = ""
		html += '<option value="'+val+'" '			
		if(val==currentSearchTerm){
			html += 'selected="selected"'
		}			
		html += ' >'+val+'</option>'
		
		$('#nameSearchOption').append( html );
	} );	
		    
}