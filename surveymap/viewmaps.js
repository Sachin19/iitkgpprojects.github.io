var map;
var infowindow;
var data = [];
var questions = {}
var markers = [];
var headings, entries=[];
var lat, lng;
function initialize() {
  var mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(0,0)
  };
  map = new google.maps.Map(document.getElementById('viewmap'), mapOptions);
  infowindow = new google.maps.InfoWindow();
}

function handleFileSelect(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
  	reader.onload = (function(theFile) {
    	return function(e) {
    		data = {};
    		questions = {};
    		entries = [];
    		contents = e.target.result;
    		var centerLat = 0.0;
    		var centerLong = 0.0;
    		var allTextLines = contents.split(/\r\n|\n/);
    		headings = allTextLines[0].split(",");
    		for (var i = headings.length - 1; i >= 0; i--) {
    			headings[i] = headings[i].replace(" ","");
    			if(headings[i].toLowerCase() === "latitude"){
    				lat = i;
    			}
    			if(headings[i].toLowerCase() === "longitude"){
    				lng = i;
    			}
    			questions[headings[i]] = {};
    			data[headings[i]] = {};
    		}

    		for(var i = 1; i<allTextLines.length; i++) {
    			var entity = allTextLines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

    			if(entity != null) {
    				entries.push(entity);
    				addData(entity, i-1);
	    			centerLat += parseFloat(entity[lat]);
	    			centerLong += parseFloat(entity[lng]);
			        var myLatLng = new google.maps.LatLng(parseFloat(entity[lat]), parseFloat(entity[lng]));
			        var mark = new google.maps.Marker({
			            position: myLatLng,
			            map: map,
			        });
			        markers.push(mark);
			        iWindow(mark, entity);
		    	}
    		}
    		num = allTextLines.length-1;
    		map.setZoom(6);
    		// // google.maps.event.trigger(map, 'resize');
    		if(num > 0) {
    			centerLat/=num;
    			centerLong/=num;
    			map.setCenter(new google.maps.LatLng(centerLat, centerLong));
    		}

    		// $('#questions').html("");
    		// for(question in questions) {
    		// 	qid = question;
    		// 	$('#questions').append("<div class=\"form-group\"><label>"+question+": </label><select class=\"form-control\" id=\""+qid+"\"></select></div>");
    		// 	$('#'+question).append("<option>All</option>");

    		// 	for(option in questions[question]){
    		// 		$('#'+qid).append("<option>"+option+"</option>");
    		// 	}
    		// }
    		populateDropDown();
		}
  	})(files[0]);
  	reader.readAsText(files[0]);
}

function populateDropDown() {
	$("#que").html("<option value=\"All\">All</option>");
	for(question in questions) {
		if(question !== "Latitude" && question !== "Longitude")
			$('#que').append("<option value=\""+question+"\">"+question+"</option>");
	}
	$('#que').on("change",function(){
		var q = $("#que :selected").val();
		if(q === "All") {
			for(var i=0; i<markers.length; i++) {
				markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
			}
		}
		opts = Object.keys(questions[q]);
		//alert(opts.length)
		for (var j=0; j<opts.length; j++) {
			var opt = opts[j];
			var color = questions[q][opt];
			for(var i=0;i<data[q][opt].length;i++) {
				var k = data[q][opt][i];
				markers[parseInt(k)].setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+color);
			}
		}

	});
}
function addData(entity, i) {
	var patt = /".*"/g;
	for (var j = 0; j < entity.length; j++) {
		if(patt.test(entity[j])) {
			options = entity[j].replace(/(^"|"$)/g, '').match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
			//alert(options);
			for(var k=0; k<options.length; k++) {
				//alert(options[k]);
				if(options[k] in questions[headings[j]])
					data[headings[j]][options[k]].push(i);
				else{
					//alert(entity[j])
					//alert(options[k]);
					color = ''+(Math.random()*0xFFFFFF<<0).toString(16);
					questions[headings[j]][options[k]] = color;
					data[headings[j]][options[k]] = [];
					data[headings[j]][options[k]].push(i);
				}
			}
		}
		else {
			if(entity[j] in questions[headings[j]])
				data[headings[j]][entity[j]].push(i);
			else{
				//alert(entity[j])
				color = ''+(Math.random()*0xFFFFFF<<0).toString(16);
				questions[headings[j]][entity[j]] = color;
				data[headings[j]][entity[j]] = [];
				data[headings[j]][entity[j]].push(i);
			}
		}
	}

}

function iWindow(marker, entity) {
	content = "";
	for(var i=0;i<entity.length;i++) {
		if(i != lat && i != lng) {
			content += "<b>"+headings[i]+"</b>: "+entity[i]+"<br/>";
		}
	}
	marker.content = content;
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(this.content);
        infowindow.open(map, marker);
    });
}
// function filter() {
// 	result = [];
// 	for(var i =0 ; i<entries.length; i++){
// 		result.push(i);
// 	}
// 	for( question in questions) {
// 		option = $('#'+question+" :selected").text();
// 		if(option === 'All') {

// 		}
// 		else {
// 			temp = [];
// 			//alert(data[question][option]);
// 			for(var i=0;i<data[question][option].length;i++) {
// 				if(result.indexOf(data[question][option][i]) >= 0) {
// 					temp.push(data[question][option][i]);
// 				}
// 			}
// 			result = temp;
// 		}
// 	}
// 	alert(result);
// 	for(var i =0 ; i<result.length; i++){

// 		markers[parseInt(result[i])].setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffffff');
// 	}
// }
$(document).ready(function(){
	initialize();
	$('input[type=file]').on("change", handleFileSelect);
});