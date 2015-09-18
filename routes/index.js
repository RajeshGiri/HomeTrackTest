var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.send({title:"test"});
	res.render("index",{title:"test"});
});

router.post("/validate",function(req,res){
	if(isValid(req.body.data)){
		var address_details = JSON.parse(req.body.data);
		var result = [];
		for(i=0;i < address_details.payload.length;i++)
		{
			if(address_details.payload[i].type==='htv' && address_details.payload[i].workflow==='completed')
			{	
				result.push({"concataddress": address_details.payload[i].address.buildingNumber+" "+address_details.payload[i].address.street+' '+address_details.payload[i].address.suburb+
                ' '+address_details.payload[i].address.state+" "+address_details.payload[i].address.postcode,"type": address_details.payload[i].type,"workflow": address_details.payload[i].workflow});
			}    
		}
		var payload_address_details = {};
		payload_address_details.respone=result;
		res.send(JSON.stringify(payload_address_details));
	}else{
		res.send("400",{"error": "Could not decode request: JSON parsing failed"});
	}
	
});

function isValid(json){
	try{
		JSON.parse(json)
	}catch(e){
		return false
	}
	return true;
}
module.exports = router;
