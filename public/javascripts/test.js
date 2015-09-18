$("document").ready(function(){

$(".validate").on("click",function(){
	var data=$(".input").val();
	$.ajax({
		type : "POST",
		url : "/validate",
		data: {data:data},
		dataType:"json",
		success:function(res){
			$(".output").val(JSON.stringify(res));
		},
		error:function(err){
			$(".output").val(JSON.stringify(err.responseJSON));
		}
	});
});
	
});