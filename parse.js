// Piwik Data Parsing Function
function parsePiwikData(data){
	var returnData = [];
	for (var i = 0; i < data.length; i++) {
		var comid = 'No ID';
		var mail = 'No Mail';
		var cv_tassist = '0';
		var cv_feedback = '0';
		var stayDurationTime = '0';
		var startDate = '0';
		var startTime = '0';

		// Get VisitEvents
		var visitEvents = data[i];

		//Parse Customevariables
		var customVariables = visitEvents['customVariables'];

		for(key in customVariables){
			switch(key){
				case "1": comid = customVariables[key]["customVariableValue1"]; break;
				case "2": mail = customVariables[key]["customVariableValue2"]; break;
			}
		}

		//Parse Customevariables
		var actionDetails = visitEvents['actionDetails'];

		for (var j = 0; j < actionDetails.length; j++) {
			var action = actionDetails[j];
			if(action['type'] == "goal"){
				var goalId = action['goalId'];
				switch(goalId){
					case "1":
						cv_tassist = "1";
						break;
					case "2":
						cv_feedback = "1";
						break;
				}
			}
		}

		stayDurationTime = visitEvents['visitDuration'];
		startDate = visitEvents['serverDatePretty'];
		startTime = visitEvents['serverTimePretty'];

		var returnItem = {
			comid : comid,
			mail : mail,
			cv_tassist : cv_tassist,
			cv_feedback : cv_feedback,
			stayDurationTime : stayDurationTime,
			startDate : startDate,
			startTime : startTime
		};
		returnData.push(returnItem);
	}
	return returnData;
}

function json2csv(json) {
    var header = Object.keys(json[0]).join(',') + "\n";

    var body = json.map(function(d){
        return Object.keys(d).map(function(key) {
            return d[key];
        }).join(',');
    }).join("\n");

    return header + body;
}

var sampleData = require("./sample.json");

console.log(json2csv(parsePiwikData(sampleData)));