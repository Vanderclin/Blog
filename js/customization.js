document.getElementById('publish_posts').disabled = true;


// Floating Action Button
$(function() {
	$('.btn-group-fab').on('click','.btn',function() {
		$('.btn-group-fab').toggleClass('active');
	});
	$('has-tooltip').tooltip();
});

function readURL(input) {
	if ( input.files && input.files[0] ) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$("#update_user_picture_preview").attr("src",e.target.result);
		};
		reader.readAsDataURL(input.files[0]);
	}
}

$("#update_user_picture").change(function () {
	readURL(this);
});


$("#checkbox_validator").on("click",function() {
	var checkBox = document.getElementById("checkbox_validator");
	var checkBoxResult = document.getElementById("checkbox_validator_result");

	checkBoxResult.innerText = "bloqueado";
	if ( checkBox.checked == true ) {
		document.getElementById('publish_posts').disabled = false;
		checkBox.classList.add("is-valid");
		checkBox.classList.remove("is-invalid");
		checkBoxResult.innerText = "desbloqueado";
	} else {
		document.getElementById('publish_posts').disabled = true;
		checkBox.classList.add("is-invalid");
		checkBox.classList.remove("is-valid");
		checkBoxResult.innerText = "bloqueado";
	}
});





var currentFilePixReward = "/assets/update/PixReward/app-release.apk";
var currentFileMobileTV = "/assets/update/MobileTV/app-release.apk";
$("#buttonPixReward").click( function(){
	var buttonText = document.getElementById("buttonPixReward");
	var counter = 11;
	setInterval(function() {
		counter--;
		if (counter >= 0) {
			buttonText.innerText = "Aguarde " + counter + " segundos";
		}
		if (counter === 0) {
			window.location.href = currentFilePixReward, '_blank';
			clearInterval(counter);
			buttonText.innerText = "Obrigado!";
       }
     }, 1000);
});

$("#buttonMobileTV").click( function(){
	var buttonText = document.getElementById("buttonMobileTV");
	var counter = 11;
	setInterval(function() {
		counter--;
		if (counter >= 0) {
			buttonText.innerText = "Aguarde " + counter + " segundos";
		}
		if (counter === 0) {
			window.location.href = currentFileMobileTV, '_blank';
			clearInterval(counter);
			buttonText.innerText = "Obrigado!";
       }
     }, 1000);
});




$(document).ready(function() {
    if (location.hash) {
        $("a[href='" + location.hash + "']").tab("show");
    }
    $(document).on("click", "a[data-bs-toggle='pill']", function(event) {
        location.hash = this.getAttribute("href");
    });
});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-bs-toggle='pill']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
	$("a[data-bs-target='"+location.hash+"']").addClass('.active');
});



$('[href$="PrivacyPolicy"]').on("click", function () {
	$("#PrivacyPolicyView").toggleClass("bi-eye-slash bi-eye");
});
$('[href$="CollectedData"]').on("click", function () {
	$("#CollectedDataView").toggleClass("bi-eye-slash bi-eye");
});
$('[href$="UserCommitment"]').on("click", function () {
	$("#UserCommitmentView").toggleClass("bi-eye-slash bi-eye");
});
$('[href$="Contacts"]').on("click", function () {
	$("#ContactsView").toggleClass("bi-eye-slash bi-eye");
});
