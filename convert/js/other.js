
var devices = null
var report = null
var exp = []



function loadFiles(evt) {
	var files = evt.target.files; // FileList object
	// console.log(evt)

	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		reader.onload = (function(theFile) {
			return function(e) {
				if (theFile.name == 'Device Summary-Table 1.csv' || theFile.name == 'Device Summary -Table 1.csv' || theFile.name == 'Device Summary- Table 1.csv') {

					var rowRange = function(entry, state) {
						var start = 6;
						if (state.rowNum >= start) {
							return entry;
						}
						return false;
					}

					var columnRange = function(value, state) {
						var start = 2;
						if (state.colNum >= start) {
							return value;
						}
						return false;
					}
					devices = $.csv.toArrays(e.target.result, { onParseEntry: rowRange, onParseValue: columnRange })


				} else if (theFile.name == 'System Test-FIRE ALARM INSPECTION REPORT.csv' || theFile.name == 'System Test -FIRE ALARM INSPECTION REPORT.csv' || theFile.name == 'System Test- FIRE ALARM INSPECTION REPORT.csv') {

					var columnRange = function(value, state) {
						var end = 9;
						if (state.colNum <= end) {
							return value;
						}
						return false;
					}
					report = $.csv.toArrays(e.target.result, { onParseValue: columnRange })

				} else {
					alert('INVALID FILE!!!')
				}
			};
		})(f);
		reader.readAsText(f);
	}
	
	setInterval(function () {
		if ( devices && report ) {




			// console.log(dirp)

			// 4, 5, 6, 9
			for (i = 0; i < report.length; i++) {
				for (v = 0; v < 9; v++) {
					var txt = parseBool(report[i][v].trim())
					report[i][v] = parseBool(txt)
				}
			}

			
			var v = report.length
			for (t = 0; t < 25; t++) {
				var i = v + t
				report[i] = []
				report[i][0] = ""
				report[i][1] = ""
				report[i][2] = ""
				report[i][3] = ""
				report[i][4] = ""
				report[i][5] = ""
				report[i][6] = ""
				report[i][7] = ""
				report[i][8] = ""
			}

			

			for (i = 0; i < devices.length; i++) {

				for (v = 0; v < devices[i].length; v++) {
					devices[i][v] = devices[i][v].trim()
				}

				// console.log(devices[i][2])
				if (devices[i][2] == "TRUE" || devices[i][2] == "FALSE") {
					devices[i].splice(2, 0, "")
				}
				// console.log(devices[i])

				devices[i][3] = parseBool(devices[i][3])
				devices[i][4] = parseBool(devices[i][4])
				devices[i][5] = parseBool(devices[i][5])
				devices[i][8] = parseBool(devices[i][8])

				devices[i][12] = ''
				devices[i][13] = ''
				devices[i][14] = ''
				console.log(devices[i])
			}


			exp[0] = report
			exp[1] = devices

			console.log(report.length)
			console.log(devices.length)

			var str = JSON.stringify(exp)
			var name = report[12][1].replace(/ /g,'') + "_"

			var d = new Date().toDateString()
			var date = d.replace(/ /g,'_')

			var blob = new Blob([str], {type: "text/plain;charset=utf-8"});
			saveAs(blob, name + date + ".json");
			devices = null
			report = null
			exp = []


		}
	}, 250);
}
document.getElementById('files').addEventListener('change', loadFiles, false);




















function parseBool (str) {
	var boolmap = {
		'no': false,
		'NO': false,
		'FALSE': false,
		'false': false,
		'Fail': false,
		'FAIL': false,
		'Pass': true,
		'PASS': true,
		'yes': true,
		'YES': true,
		'TRUE': true,
		'true': true
	}
	// return (str in boolmap && boolmap.hasOwnProperty(str)) ? boolmap[str] : !!str
	// console.log(boolmap[str])
	if (str in boolmap && boolmap.hasOwnProperty(str)) {
		return boolmap[str]
	} else {
		return str
	}
}












