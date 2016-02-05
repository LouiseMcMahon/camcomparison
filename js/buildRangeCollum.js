function buildRangeCollum() {
		
	var minCamSize = false
    var maxCamSize = false
    
    var colors = []
	colors["blue"] = "#216EA6"
	colors["silver"] = "#E9E4E0"
	colors["purple"] = "#B15DA8"
	colors["green"] = "#47954A"
	colors["red"] = "#CD4843"
	colors["gold"] = "#E4B05D"
	
	//get min and max cam sizes		
	$( "#camTable tr td:nth-child(4)" ).each(function( index ) {
    	var camRange = $( this ).text().split("-")	    	
    	camRange[0] = parseFloat(camRange[0])
    	camRange[1] = parseFloat(camRange[1])
    	
    	if (minCamSize == false || camRange[0] < minCamSize){
       		minCamSize = camRange[0]
       	}	        	
      	if (maxCamSize == false || maxCamSize < camRange[1]){
       		maxCamSize = camRange[1]
    	}	      	
	});
			
	//calculate %   
    var totalCamRange = maxCamSize - minCamSize	    
    var rangeCollWidth = 100
    var camRangeMMPerPx =  rangeCollWidth/totalCamRange
    
    var camTable = $('#camTable').DataTable();
	
    //create range graph
    camTable.rows().eq(0).each( function ( index ) {
        var row = camTable.row( index );
        
        var data = row.data();
        var rangeTdNode = $(row.node()).children('td:nth-child(4)')    	

    	var rangeText = data[3]
    	var camRange = data[3].split("-")
    	camRange[0] = parseFloat(camRange[0])
    	camRange[1] = parseFloat(camRange[1])
    	
    	if(data[11]=="silver"){
    		textColor = "#2e2e2e"
    	}
    	else
    		textColor = "inherit"
    	
    	rangeTdNode.text("")
    	html = ""
    	html +="<div class='rangeCell fistSizeDiv'> </div>"
    	html +="<div class='rangeCell mainSizeDiv' style='background-color:"+colors[data[11]]+";color:"+textColor+";' title='"+rangeText+"'><span>"+rangeText+"</span></div>"
    	html +="<div class='rangeCell lastSizeDiv'> </div>"	    	
    	rangeTdNode.attr("data-search", rangeText);
    	rangeTdNode.attr("data-order", rangeText); 
    	rangeTdNode.append(html)
    	
    	var fistSizeDivSize = (camRange[0]-minCamSize)*camRangeMMPerPx
    	var lastSizeDivSize = (maxCamSize-camRange[1])*camRangeMMPerPx
    	var mainSizeDivSize = rangeCollWidth-(fistSizeDivSize+lastSizeDivSize)		    	
    	
    	rangeTdNode.find('.fistSizeDiv:first').width(fistSizeDivSize+"%")
    	rangeTdNode.find('.lastSizeDiv:first').width(lastSizeDivSize+"%")
    	rangeTdNode.find('.mainSizeDiv:first').width(mainSizeDivSize+"%")
    });	
    
    //building range scale
    $(".scaleSection").remove();
     
    var numberOfPointsOnScale = 0

    numberOfPointsOnScale = Math.ceil($('.rangeHeader').width()/100)
    var rangeScaleSectionSize = totalCamRange/numberOfPointsOnScale   
    
    for(var i = 0; i < numberOfPointsOnScale-1; i++) {
    	var scaleNumber = Math.round((rangeScaleSectionSize*i)+minCamSize)
    	var html = "<div style='width:"+100/numberOfPointsOnScale+"%' class='scaleSection'>"+scaleNumber+"mm</div>"
    	
    	$(".rangeScale").append(html);
    }
    $(".rangeScale").append("<div class='scaleSection'>"+maxCamSize+"mm</div>");
    
    //adding tooltips
    $(function() {
        $('.mainSizeDiv').tooltip();
  	});
	
    //auto resize text
    $('.mainSizeDiv').children('span').show()
    $('.mainSizeDiv').textfill({
    	minFontPixels : 10,
    	changeLineHeight : true,
        fail: function(failedDiv) {
        	$(failedDiv).children('span').hide()
        }
    });
    
}