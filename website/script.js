var diz = {};
var citations = [];
$.getJSON("files/JSONclippings.json", function(json) {
	diz = json;
	
	createBooksList()
	citations = fromDictToList()
});
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function fromDictToList() {
	list = [];
	Object.entries(diz).forEach(([k, v]) => {
		list = list.concat(v);
	})

	return list;
}

function searchAuthor(cit) {
	var auth = "undefinedddd";
	var BreakException = {};
	try {
		Object.entries(diz).forEach(([k, v]) => {
			if (v.includes(cit)) {
				auth = k;
				throw BreakException;
			}
		})
	}
	catch (e) {
		if (e !== BreakException) throw e;
	}
	return auth;
}


function onClick() {

	var cit = citations[getRandomInt(0, citations.length)]
	if (cit != undefined && cit.length > 0)
		document.getElementById("quote").innerHTML = cit;
	document.getElementById("quoteGenius").innerHTML = searchAuthor(cit);
}


function createBooksList() {
	for (var k in diz) {
		var div = document.getElementById("lista")
		var detail = document.createElement("details")
		var summary = document.createElement("summary")
		summary.innerHTML = k
		detail.appendChild(summary)
		var ul = document.createElement("ul")
		for (cit in k) {
			if(diz[k][cit] != undefined) {
				var parag = document.createElement("li")
				parag.className = "answer"
				parag.innerHTML = diz[k][cit]
				ul.appendChild(parag)
			}
		}
		detail.appendChild(ul)
		div.appendChild(detail)
		
	}
}
