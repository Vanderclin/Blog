var firebaseConfig = {
apiKey: "AIzaSyDuZZjRBlNQ8Qw9CGnMpGzatnqTFOuzuZ4",
authDomain: "blog-vanderclin-rocha.firebaseapp.com",
databaseURL: "https://blog-vanderclin-rocha-default-rtdb.firebaseio.com",
projectId: "blog-vanderclin-rocha",
storageBucket: "blog-vanderclin-rocha.appspot.com",
messagingSenderId: "421849393187",
appId: "1:421849393187:web:dc673dc06bf255d398a996",
measurementId: "G-M58ZR1WKEW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// --------------  //
var show = "block";
var hide = "none";
// Firebase Auth
var username;
var useremail;
var email_verified;
var isAnonymous;
var userpicture;
var providerData;
var userid;


// Firebase Database
var mDatabaseReference = firebase.database().ref('/');
// ID's
var dropdown_signin = document.getElementById('dropdown_signin');
var dropdown_signout = document.getElementById('dropdown_signout');
var floating_button = document.getElementById('floatingActionButton');

firebase.auth().onAuthStateChanged(function (user) {
    if ( user ) {
        username = user.displayName;
        useremail = user.email;
        email_verified = user.emailVerified;
        isAnonymous = user.isAnonymous;
        userpicture = user.photoURL;
        providerData = user.providerData;
        userid = user.uid;

        dropdown_signin.style.display = hide;
        dropdown_signout.style.display = show;
        floating_button.style.display = show;

        if ( username == null || username == "" ) {
            document.getElementById('display_user_name').innerText = "Unknown";
			document.getElementById('username_preview').innerText = "Unknown";
            $('#modal_profile_edition').modal('show');
        } else {
            document.getElementById('display_user_name').innerText = username;
			document.getElementById('username_preview').innerText = username;
        }
        if ( userpicture == null || userpicture == "" ) {
            document.getElementById('display_user_picture').src = "../assets/icons/user_avatar.png";
			document.getElementById('userpicture_preview').src = "../assets/icons/user_avatar.png";
            $('#modal_profile_edition').modal('show');
        } else {
            document.getElementById('display_user_picture').src = userpicture;
			document.getElementById('userpicture_preview').src = userpicture;
        }

    } else {
        dropdown_signin.style.display = show;
        dropdown_signout.style.display = hide;
        floating_button.style.display = hide;
    }

});

$("#button_signin").on("click",function () {
    var email = document.getElementById('email_signin').value;
    var password = document.getElementById('password_signin').value;
    if ( email.length = 0 ) {
        alert('Por favor insira um endereço de e-mail.');
        return;
    }
    if ( password.length = 0 ) {
        alert('Por favor insira uma senha.');
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email,password).then(function () {
        $("#modal_signin").modal("hide");
    }).catch( function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if ( errorCode === 'auth/wrong-password' ) {
            alert('Senha incorreta.');
        } else if ( errorCode === 'auth/user-not-found' ) {
            alert('Usuário não registrado.');
        } else {
            alert(errorMessage);
        }
        alert(error);
        document.getElementById('button_signin').disabled = false;
    } );
    document.getElementById('button_signin').disabled = true;
});


$("#button_signout").on("click",function () {
    firebase.auth().signOut().then(function () {
        window.location.reload();
    });
});

$(document).ready(function () {
    mDatabaseReference.child('public').orderByChild("id").on('child_added',function (snapshot) {
        var card = "";
		card += '<div class="col">';
		card += '<div class="card mb-3">';
		card += '<div class="card-body">';
		card += '<div class="scroll">';
		card += '<p class="card-text">'+snapshot.child("description").val()+'</p>';
		card += '</div>';
		card += '</div>';
		card += '<div class="card-footer">';
		card += '<img src="'+snapshot.child("userpicture").val()+'">';
		card += '<strong>'+snapshot.child("username").val()+'</strong>';
		card += '<span>'+snapshot.child("datehour").val()+'</span>';
		card += '</div>';
		card += '</div>';
		card += '</div>';

        $("#content_private").html($("#content_private").html() + card);
    });

	$("#publish_posts").on('click', function ( ) {
		var description = $("#description_add").val();
		description = description.replace(/\r?\n/g,'<br/>').replace(/\*(?=\w)/,'<b>').replace(/(?<=\w)\*/,'</b>').replace(/\_(?=\w)/,'<em>').replace(/(?<=\w)\_/,'</em>').replace(/\~(?=\w)/,'<del>').replace(/(?<=\w)\~/,'</del>');
		var timestamp = new Date();
		var id = timestamp.getTime();
		var key = mDatabaseReference.child("public").push().key;
		mDatabaseReference.child("public").child(key).set({
		"description": description,
		"id": -id,
		"key": key,
		"username": username,
		"userpicture": userpicture,
		"datehour": date() +' - '+hour()
		});
		$("#description_add").val("");
		setTimeout(function() {
			$("#modal_poster").modal("hide");
		}, 3000);
	});
	$("#description_add").on("keyup",function() {
		var getText = $(this).val();
		getText = getText.replace(/\r?\n/g,'<br/>').replace(/\*(?=\w)/,'<b>').replace(/(?<=\w)\*/,'</b>').replace(/\_(?=\w)/,'<em>').replace(/(?<=\w)\_/,'</em>').replace(/\~(?=\w)/,'<del>').replace(/(?<=\w)\~/,'</del>');
		var character = 0;
		var character = $(this).val().length;
		if ( getText === null || getText === "" ) {
			getText = ( "Previsão da descrição" );
		} else if ( this.value.length > 449 ) {
			$("#remaining_description_counter").text("Restam apenas 50 caracteres");
		} else if ( this.value.length < 450 ) {
			$("#remaining_description_counter").text("");
		} else if ( this.value.length === 500 ) {
			$(this).prop('disabled',true);
		}
		$("#description_counter").text(character + " / 500");
		$("#description_preview").html(getText);
	});
	
	setInterval(function() {
		document.getElementById("datehour_preview").innerText = date() +' - '+hour();
	},1000);

});









function hour() {
    var today = new Date();
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);
    return hour + ":" + minutes + ':' + seconds;
}

function date() {
    var today = new Date();
    var day = today.getDate() + "";
    var month = ( today.getMonth() + 1 ) + "";
    var year = today.getFullYear() + "";
    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    return day + "/" + month + "/" + year;
}

function checkZero(data) {
    if ( data.length == 1 ) {
        data = "0" + data;
    }
    return data;
}

function postDelete(key) {
	firebase.database().ref('public').child(key).remove();
	setTimeout(function () {
        window.location.reload();
    },2500);
}

function postShared(key) {
	$("#modal_shared").modal("show");
	var input_url = document.getElementById("set_url");
	input_url.value = "https://blog.vanderclin.ml/#" + key;
	$("#copy_url").on("click",function() {
        input_url.select();
        input_url.setSelectionRange(0,99999);
        document.execCommand("copy");
        alert("Copied the text: " + input_url.value);
    });



}


/*
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;
		
		document.getElementById('dropdown_signin').style.display = "none";
		document.getElementById('dropdown_signout').style.display = "block";
		document.getElementById('floatingActionButton').style.display = "block";

		if (displayName == null || displayName == "") {
			document.getElementById('display_user_name').innerText = "Unknow";
			$('#modal_profile_edition').modal('show');
		} else {
			document.getElementById('display_user_name').innerText = displayName;
		}
		if (photoURL == null || photoURL == "") {
			document.getElementById('display_user_picture').src = "../assets/icons/user_avatar.png";
			$('#modal_profile_edition').modal('show');
		} else {
			document.getElementById('display_user_picture').src = photoURL;
		}
		
		$("#publish_posts").on('click', function ( ) {
			var posts_title = $("#posts_title").val();
			var posts_description = $("#posts_description").val();
			
			posts_description = posts_description.replace(/\r?\n/g, '<br/>');
			
			var timestamp = new Date();
			var posts_id = timestamp.getTime();
			
			var posts_ref = mDatabaseReference.child(publication).push();
			var posts_key = posts_ref.key;
			mDatabaseReference.child(publication).child(posts_key).set({
				"posts_description": posts_description,
				"posts_id": -posts_id,
				"posts_key": posts_key,
				"posts_time": posts_time(),
				"posts_title": posts_title,
				"posts_username": displayName,
				"posts_userpicture": photoURL,
				"posts_useruid": uid
			});
		});
		
	} else {
		document.getElementById('dropdown_signin').style.display = "block";
		document.getElementById('dropdown_signout').style.display = "none";
		document.getElementById('floatingActionButton').style.display = "none";
			
	}
	
});

$(document).ready(function ( ) {
		var mDatabaseReference = firebase.database().ref('/');
		mDatabaseReference.child('posts').orderByChild("posts_id").on('child_added', function ( snapshot ) {
				var posts_userpicture = snapshot.child('posts_userpicture').val();
				if (posts_userpicture == null) {
					posts_userpicture = "../assets/icons/user_avatar.png";
				} else {
					posts_userpicture = snapshot.child('posts_userpicture').val();
				}

				var card = "";
				card += '<div class="col">';
				card += '<div class="card mb-4 rounded-3 shadow-sm">';
				card += '<div class="card-header">';
				card += '<img src="' + posts_userpicture + '">';
				card += '<h5 class="me-auto my-auto">' + snapshot.child('posts_username').val() + '</h5>';
				card += '<span class="my-auto ms-auto">' + snapshot.child('posts_time').val() + '</span>';
				card += '</div>';
				card += '<div class="card-body">';
				card += '<h1 class="card-title">' + snapshot.child('posts_title').val() + '</h1>';
				card += '<div class="mt-3 mb-4">';
				card += '<p>' + snapshot.child('posts_description').val() + '</p>';
				card += '</div>';
				card += '</div>';
				card += '</div>';
				card += '</div>';

				$("#content_private").html($("#content_private").html() + card);
			});
	});


function childDeleted( key ) {
	swal({
			title: "Tem certeza?",
			text: "Uma vez excluído, você não será capaz de recuperar!",
			icon: "warning",
			buttons: ["Cancelar", "Apagar"],
			dangerMode: true,
		}).then((willDelete) => {
	if (willDelete) {
		firebase.database().ref('posts').child(key).remove();
		swal("Sua postagem foi excluída!", {
				icon: "success",
			});
		setTimeout(function ( ) {
				window.location.reload();
			}, 2500);
	} else {
		swal({
				text: "Sua postagem está segura!",
				button: true
			});
	}
});
}


$("#button_signin").click(function () {
	var email = document.getElementById('email_signin').value;
	var password = document.getElementById('password_signin').value;
	if (email.length < 4) {
		alert('Por favor insira um endereço de e-mail.');
		return;
	}
	if (password.length < 4) {
		alert('Por favor insira uma senha.');
		return;
	}
	firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
		$("#modal_signin").modal("hide");
	}).catch(function (error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode === 'auth/wrong-password') {
			alert('Senha incorreta.');
		} else if (errorCode === 'auth/user-not-found') {
			alert('Usuário não registrado.');
		} else {
			alert(errorMessage);
		}
		alert(error);
		document.getElementById('button_signin').disabled = false;
	});
	document.getElementById('button_signin').disabled = true;
});

$("#button_signout").click(function () {
	firebase.auth().signOut().then(function () {
		// Sign-out successful.
		window.location.reload();
	}).catch(function (error) {
		// An error happened.
	});
});

$("#visibility").click(function () {
	if (document.getElementById('visibility').checked) {
		document.getElementById('group_visibility').innerText = "Privado";
		publication = "private";
	} else {
		publication = "public";
		document.getElementById('group_visibility').innerText = "Público";
	}
});

function posts_time( ) {
	var today = new Date();
	var day = today.getDate() + "";
	var month = (today.getMonth() + 1) + "";
	var year = today.getFullYear() + "";
	var hour = today.getHours() + "";
	var minutes = today.getMinutes() + "";
	var seconds = today.getSeconds() + "";

	day = checkZero(day);
	month = checkZero(month);
	year = checkZero(year);
	hour = checkZero(hour);
	minutes = checkZero(minutes);
	seconds = checkZero(seconds);
	return day + "/" + month + "/" + year + " - " + hour + ":" + minutes + ":" + seconds;
}

function checkZero( data ) {
	if (data.length == 1) {
		data = "0" + data;
	}
	return data;
}
*/
