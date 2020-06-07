firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // alert("LoggedIn");
    } else {
      // alert("LoggedOut");
    }
  });

function signInFunction(){
    var email=document.getElementById("email_field").value;
    var password=document.getElementById("pass_field").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
      window.location.href='/helperDetail.html';
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        
        // ...
      });
}

function signUpFunction(){
    var email=document.getElementById("email_field").value;
    var password=document.getElementById("pass_field").value;
    var confirePassword=document.getElementById("pass_confirm_field").value;
    console.log(email);
if(confirePassword===password){
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    window.location.href='/helperDetail.html';
  }).catch(function(error){
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
}
else{
  alert("Password do not match");
  document.getElementById("pass_field").value=null;
  document.getElementById("pass_confirm_field").value=null;
}
}

  
function logOutFunction(){
  
    firebase.auth().signOut().then(function() {
      window.location.href='/Signin.html';
        
      }).catch(function(error) {
        // An error happened.
      });
}


var database = firebase.database();
function submitFunction(){
  var user = firebase.auth().currentUser;
  console.log(user.uid);
  
  var U_name=document.getElementById("name_field").value;
  var U_email=document.getElementById("email_field").value;
  var U_number=document.getElementById("number_field").value;
  var U_lat,U_long;
  
  navigator.geolocation.getCurrentPosition(function(position){
    
      U_lat=position.coords.latitude;
      console.log(U_lat);
      U_long=position.coords.longitude;    
      upload();
  })
  function upload(){
    firebase.database().ref('users/'+user.uid).set({
      name: U_name,
      email: U_email,
      number : U_number,
      latitude:U_lat,
      longitude:U_long
    }).then(function(){
      
      window.location.href='/thankYou.html';
    }).catch(function(error){
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
}