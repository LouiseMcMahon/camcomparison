function declareCustomSearchFunctions(){
	jQuery.extend( jQuery.fn.dataTableExt.oSort, {	     
		    "size-range-asc": function( a, b ) {	    	
		    	a = a.split("-")
		    	a[0] = parseFloat(a[0])
		    	a[1] = parseFloat(a[1])
		    	
		    	b = b.split("-")
		    	b[0] = parseFloat(b[0])
		    	b[1] = parseFloat(b[1])
		    	
		        return ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0));
		    },
		 
		    "size-range-desc": function(a,b) {
		    	a = a.split("-")
		    	a[0] = parseFloat(a[0])
		    	a[1] = parseFloat(a[1])
		    	
		    	b = b.split("-")
		    	b[0] = parseFloat(b[0])
		    	b[1] = parseFloat(b[1])
		    	
		        return ((a[1] < b[1]) ? 1 : ((a[1] > b[1]) ? -1 : 0));
		    }
		} );
	
	//range search function
		$.fn.dataTable.ext.search.push(
	    function( settings, data, dataIndex ) {
	        var rangeContains =  $('#rangeInput').val() 	       	
	 		
	        if (!rangeContains){
	        	return true;
	        }
	        rangeContains = parseInt(rangeContains)
	        if(!$.isNumeric( rangeContains )){
	        	return true;
	        }			    
	        
	    	var camRange =  data[3].split("-")
	    	camRange[0] = parseFloat(camRange[0])
	    	camRange[1] = parseFloat(camRange[1])
	    	
	    	if (camRange[0] <= rangeContains && camRange[1] >= rangeContains){
	    		return true;
	    	}
	    	return false;			        
	    }
	);
	
		//price search function
		$.fn.dataTable.ext.search.push(
	    function( settings, data, dataIndex ) {
	        var lessThanPrice =  $('#priceInput').val() 	       	
	 		
	        if (!lessThanPrice){
	        	return true;
	        }
	        lessThanPrice = parseInt(lessThanPrice)
	        if(!$.isNumeric( lessThanPrice )){
	        	return true;
	        }		        
	    	
	    	if (data[4].replace(/\D/g,'') <= lessThanPrice){
	    		return true;
	    	}
	    	return false;			        
		}
	);
		
		//weight search function
		$.fn.dataTable.ext.search.push(
	    function( settings, data, dataIndex ) {
	        var lessThanWeight =  $('#weightInput').val() 	       	
	 		
	        if (!lessThanWeight){
	        	return true;
	        }
	        lessThanWeight = parseInt(lessThanWeight)
	        if(!$.isNumeric( lessThanWeight )){
	        	return true;
	        }
	    	
	    	if (data[5].replace(/\D/g,'') <= lessThanWeight){
	    		return true;
	    	}
	    	return false;			        
		}
	);
		
		//strength search function
		$.fn.dataTable.ext.search.push(
	    function( settings, data, dataIndex ) {
	        var greaterThanStrength =  $('#strengthInput').val() 	       	
	 		
	        if (!greaterThanStrength){
	        	return true;
	        }
	        greaterThanStrength = parseInt(greaterThanStrength)
	        if(!$.isNumeric( greaterThanStrength )){
	        	return true;
	        }
	    	
	    	if (data[6].replace(/\D/g,'') >= greaterThanStrength){
	    		return true;
	    	}
	    	return false;			        
		}
	);
}