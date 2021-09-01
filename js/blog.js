var currentFilePixReward = "/assets/update/PixReward/app-release.apk";
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
