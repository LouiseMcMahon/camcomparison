function buildRangeCollum() {
		
	var minCamSize = false
    var maxCamSize = false
    
    var colors = []
	colors["blue"] = "#216EA6"
	colors["silver"] = "#E9E4E0"
	colors["purple"] = "#B15DA8"
	colors["green"] = "#47954A"
	colors["red"] = "#CD4843"
	colors["yellow"] = "#DCDE46"
	colors["black"] = "#000000"
	colors["gold"] = "#E4B05D"
	colors["orange"] = "#E4B05D"
		
	var camTable = $('#camTable').DataTable();
	
	//get min and max cam sizes		
	camTable.rows({search:'applied'}).eq(0).each( function ( index ) {
    	var row = camTable.row( index );        
        var data = row.data();
        
    	var camRange = data[3].split("-")	    	
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
    
    
	
    //create range graph
    camTable.rows({search:'applied'}).eq(0).each( function ( index ) {
    	var row = camTable.row( index );
        
        var data = row.data();
        var rangeTdNode = $(row.node()).children('td:nth-child(4)')
    	rangeTdNode.children(".rangeCell").remove();
    	
        //if not enough room for graph just show data
    	if($('.rangeHeader').width()>300){	    	    	
	
	    	var rangeText = data[3]
	    	var camRange = data[3].split("-")
	    	camRange[0] = parseFloat(camRange[0])
	    	camRange[1] = parseFloat(camRange[1])
	    	
	    	if(data[12]=="silver" || data[12]=="yellow" ){
	    		textColor = "#2e2e2e"
	    	}
	    	else
	    		textColor = "inherit"
	    	
	    	rangeTdNode.text("")
	    	html = ""
	    	html +="<div class='rangeCell fistSizeDiv'> </div>"
	    	html +="<div class='rangeCell mainSizeDiv' style='background-color:"+colors[data[12]]+";color:"+textColor+";' title='"+rangeText+"'><span>"+rangeText+"</span></div>"
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
    	}
    	else{
    		rangeTdNode.html(data[3])
    	}
    });	
    
    //building range scale
    $(".scaleSection").remove();
    
  //if not enough room dont create scale
    if($('.rangeHeader').width()>300){
	    var numberOfPointsOnScale = 0
	
	    numberOfPointsOnScale = Math.ceil($('.rangeHeader').width()/100)
	    var rangeScaleSectionSize = totalCamRange/numberOfPointsOnScale   
	    
	    for(var i = 0; i < numberOfPointsOnScale-1; i++) {
	    	var scaleNumber = Math.round((rangeScaleSectionSize*i)+minCamSize)
	    	var html = "<div style='width:"+100/numberOfPointsOnScale+"%' class='scaleSection'>"+scaleNumber+"mm</div>"
	    	
	    	$(".rangeScale").append(html);
	    }
	    $(".rangeScale").append("<div style='width:"+100/numberOfPointsOnScale+"%' class='scaleSection'>"+maxCamSize+"mm</div>");
    }
    
    //adding tooltips
    $(function() {
        $('.mainSizeDiv').tooltip({
	        content: function(){
		        if ($(this).text() != ""){
			        var range = $(this).text().split("-");
			        var minInch = parseFloat(range[0]*0.0393701).toFixed(2);
			        var maxInch = parseFloat(range[1]*0.0393701).toFixed(2);

					return range[0]+" - "+range[1]+" mm</br>" +minInch+" - "+maxInch+" Inches"

		        }else{
			        return "";
		        }
	        }
        });
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