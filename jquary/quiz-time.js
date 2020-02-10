$(document).ready(function(){
	var marke=0;
	$("#div2").hide();
	$("#div3").hide();
	$("#div4").hide();
	$("#div5").hide();
	$("#again").hide();
	$("#next").click(function(){
		if($("#div1").is(":visible")){
			if($("input[name='q1']:checked").val()!=null){
				if($("input[name='q1']:checked").val()==2){
					marke++;
				}
				$("#div1").hide();
				$("#div2").show();
			}else{
				alert("You have not selected any option!!!")
			}
		}else if($("#div2").is(":visible")){
			if($("input[name='q2']:checked").val()!=null){
				if($("input[name='q2']:checked").val()==4){
					marke++;
				}
				$("#div2").hide();
				$("#div3").show();
			}else{
				alert("You have not selected any option!!!")
			}

		}else if($("#div3").is(":visible")){
			if($("input[name='q3']:checked").val()!=null){
				if($("input[name='q3']:checked").val()==6){
					marke++;
				}
				$("#div3").hide();
				$("#div4").show();
			}else{
				alert("You have not selected any option!!!")
			}

		}else if($("#div4").is(":visible")){
			if($("input[name='q4']:checked").val()!=null){
				if($("input[name='q4']:checked").val()==8){
					marke++;
				}
				$("#div4").hide();
				$("#div5").show();
			}else{
				alert("You have not selected any option!!!")
			}

		}else if($("#div5").is(":visible")){
			if($("input[name='q5']:checked").val()!=null){
				if($("input[name='q5']:checked").val()==10){
					marke++;
				}
				$("#div5").hide();
				$("#next").hide();
				$("#result").html("Result="+marke+"/5");
				$("#again").show();
			}else{
				alert("You have not selected any option!!!")
			}

		}
	});
	$("#again").click(function(){
		location.reload(true);
	});
});
$(document).ready(function(){
	$("#quiz").hide();
	$("#btnStart").click(function(){
		$("#quiz-time").hide();
		$("#quiz").show();
	});
});
function openNav() {
  document.getElementById("mySidebar").style.width = "60%";
  document.getElementById("mySidebar").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidebar").style.display = "none";
}