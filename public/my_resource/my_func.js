var _currentLabelId = 0;
var _currentTextFieldId = 0;
var _currentButtonId = 0;

var componentNames = [];

function isExistingName(name){
	var index = componentNames.indexOf(name);
	if (index == -1) return false;
	return true;
}

//only update componentNames
function updateName(oldName, newName){
	var index = componentNames.indexOf(oldName);
	if (index != -1){
		componentNames[index] = newName;
	}

}

function getNewId(componentType){
	switch (componentType){
		case "label":
			id = _currentLabelId++;
			break;
		case "text-field":
			id = _currentTextFieldId++;
			break;
		case "button":
			id = _currentButtonId++;
			break;
		default:
			return null;
	}
	return componentType + id;
}

function getComponentHtml(componentType, top, left, isDesigned = false){
	var id = getNewId(componentType);
	componentNames.push(id);

	var html = "";
	switch (componentType){
		case "label":
			html = $("<div id='" + id  +"'> "+ componentType +"</div>");
			break;
		case "text-field":
			html = $("<div id='" + id  +"'> "+ componentType +"</div>");
			break;
		case "button":
			html = $("<div id='" + id  +"'> "+ componentType +"</div>");
			break;
		case "combobox":
			html = $("<div id='" + id  +"'> "+ componentType +"</div>");
			break;
		default:
			return "error";
	}

	html = html.addClass("component " + componentType).css({
			"position": "absolute",
			"top" : top,
			"left" : left
		});

	if (isDesigned) {
		html = html.addClass("designed");
	}
	return html;
}



                        
function getProperties(component){ //component is jqueryObj
	var obj;
	var properties = [];
	//setup name prop
	var name = component.attr("id");
	obj = {property: "name", value: name};
	properties.push(obj);
	//setup position prop (x: left, y: top)
	var x = parseInt(component.css("left"));
	var y = parseInt(component.css("top"));
	obj = {property: "position", value: "(" + x + ", " + y + ")"};
	properties.push(obj);
	//setup width prop
	var width = component.css("width");
	obj = {property: "width", value: width};
	properties.push(obj);
	//setup height prop
	var height = component.css("height");
	obj = {property: "height", value: height};
	properties.push(obj);
	return properties;
}

function addPropertiesToTable(table, properties){ //table is jqueryObj
	table.find('tbody').empty();
	for (var i = 0; i < properties.length; i++) {
        var property = properties[i].property;
        var value = properties[i].value;
		var html = "<tr><td>"+ property + "</td><td>"+ value + "</td></tr>"
    	table.find('tbody').append($(html));
    }
}