angular.module('app.controllers', [])
//controller voor de homepagina, hier staan alle knoppen in
.controller('homeCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])
//controller voor berichten, hier kan de gebruiker een verzoeknummer aanvragen dat vervolgens in de Realtime DB van Firebase wordt upgeload
.controller('berichtenCtrl', ['$scope', '$stateParams','$cordovaSQLite','$cordovaDialogs',
function ($scope, $stateParams,$cordovaSQLite,$cordovaDialogs) {

  $scope.data = {};
  userId="test1";
  name="test";
  email="test";
  imageUrl="test";
  //functie voor verzoeksnummers op de database op te slaan onder opgegeven naam
  $scope.bericht=function () {
  firebase.database().ref('berichten/' + $scope.data.gebruiker).set({
    artiest:$scope.data.artiest,
    nummer: $scope.data.nummer,
    comment: $scope.data.comment,
  });
//tonen van alert(native)
  $cordovaDialogs.alert('Uw verzoeknummer werd verzonden', 'Proficiat', 'ok')
  .then(function() {
  // callback success
  });
}



}])
//dit is de controller voor de evenementsInfo, dit is gewoon een statische html pagina waar men wat info van het evenement kan plaatsen
.controller('evenementsInfoCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])
//dit is de controller voor de zaklamppagina, op de pagina staat een toggleknop die de zaklamp togglet
.controller('zaklampCtrl', ['$scope', '$stateParams', 'Camera', '$cordovaFlashlight',
function ($scope, $stateParams,$cordovaFlashlight,Camera) {
  $scope.zaklamp=function($scope, $cordovaFlashlight){
//aanzetten van de zaklamp functie
    window.plugins.flashlight.toggle(
      function() {}, // optional success callback
      function() {}, // optional error callback
      {intensity: 0.3} // optional as well, used on iOS when switching on
    );


  };


}])
//dit is de controller voor locatiepagina, deze laat een kaartje zien waar het evenement plaatsvindt met een plattegrond van het terrein
.controller('locatieCtrl', ['$scope', '$stateParams','$cordovaGeolocation',
function ($scope, $stateParams,$cordovaGeolocation) {


}])
//dit is de controller voor de foto's pagina, op deze pagina kan mn foto's maken, foto's uit het geheugen kiezen en deze vervolgens naar de Storage van Firebase doorsturen waarin ze worden opgeslagen met hun bestandsnaam
.controller('fotoSCtrl', ['$scope', '$stateParams', 'Camera','$cordovaFile','$cordovaDialogs',
function ($scope, $stateParams,Camera,$cordovaFile,$cordovaDialogs) {

  $scope.picturelocatie;
  $scope.imageurl='img/icon.jpg'
  //ophalen van een foto type 1 in base64 string
  $scope.takePicture = function (options) {

    var options = {
       quality : 75,
       targetWidth: 200,
       targetHeight: 200,
       sourceType: 1,
       encodingType:0,
       destinationType : 0

    };

    Camera.getPicture(options).then(function(imageData) {

       $scope.picture = imageData;
       $scope.imageurl="data:image/jpeg;base64,"+ imageData ;

       $scope.naam= (imageData).replace(/[^0-9\.]+/g,"");


    }, function(err) {
       console.log(err);
    });


 };
 //ophalen foto type 0 in base64 string
 $scope.getPicture = function (options) {

      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 0,
         destinationType :0,
         encodingType:0
      };

      Camera.getPicture(options).then(function(imageData) {

         $scope.picture = imageData;
         $scope.imageurl="data:image/jpeg;base64,"+ imageData ;

         $scope.naam= (imageData).replace(/[^0-9\.]+/g,"");




      }, function(err) {
         console.log(err);
      });
   };

   //verzenden van een foto, in base 64 string, met als naam de naam van het bestand. Vervolgens wordt deze opgeslagen in de Firebase Storage

   $scope.verzendfoto=function(){
     var stringURL = "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";

    var fileName= $scope.picture;
    var storageRef= firebase.storage().ref('/images/' +$scope.naam+".jpg");
    var uploadTask= storageRef.putString(fileName, 'base64') ;
    // Listen for state changes, errors, and completion of the upload.
//     // Register three observers:
// // 1. 'state_changed' observer, called any time the state changes
// // 2. Error observer, called on failure
// // 3. Completion observer, called on successful completion
// uploadTask.on('state_changed', function(snapshot){
//   // Observe state change events such as progress, pause, and resume
//   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('Upload is ' + progress + '% done');
//   switch (snapshot.state) {
//     case firebase.storage.TaskState.PAUSED: // or 'paused'
//       console.log('Upload is paused');
//       break;
//     case firebase.storage.TaskState.RUNNING: // or 'running'
//       console.log('Upload is running');
//       break;
//   }
// }, function(error) {
//   // Handle unsuccessful uploads
// }, function() {
//   // Handle successful uploads on complete
//   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//   var downloadURL = uploadTask.snapshot.downloadURL;
// });
    //alert("de foto werd upgeload");
    //tonen van alert (native )
    $cordovaDialogs.alert('De afbeelding werd succesvol ge-upload', 'Proficiat', 'ok')
   .then(function() {
     // callback success
   });




  }


}])


//controller voor delenpagina: hier kan men uit verschillende methodes kiezen (afhankelijk van de beschikbare op het toestel) om te delen: hier wordt het facebookevenemnt gedeeld
.controller('delenCtrl', ['$scope', '$stateParams','$cordovaSocialSharing','$cordovaDialogs', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
function ($scope, $stateParams,$cordovaSocialSharing,$cordovaDialogs) {
  $scope.shareAnywhere = function() {
    //native functie voor het delen van het evenement
       $cordovaSocialSharing.share( "https://www.facebook.com/events/583733521828028/");
   }


}])
//controller voor de registratiepagina ; hier kan men zich op de applicatie registreren, deze gegevens worden op de realtime database van firebase opgeslagen.
.controller('registrerenCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {

  $scope.data = {};
  $scope.registreren=function () {
//controle of de wachtwoorden overeen komen
if( $scope.data.password== $scope.data.passwordconfirm ){
  firebase.database().ref('users/' + $scope.data.username).set({
    user:$scope.data.username,
    password: $scope.data.password

  });
//tonen van alert(native) bij succesvolle registratie
  $cordovaDialogs.alert('U bent nu in het systeem opgeslagen', 'Proficiat', 'ok')
 .then(function() {
   $scope.data.username="";
   $scope.data.password="";
   $scope.data.passwordconfirm="";
 });
//tonen van alert(native)+ vibratie bij fout (niet overeenstemmende wachtwoorden)
}else {
  navigator.vibrate(300);
  $cordovaDialogs.alert('De twee wachtwoorden komen niet overeen', 'Helaas', 'ok')
 .then(function() {

 });

}
}



}])



//controller voor het zijmenu, deze bevat de methodes voor in te loggen en uit te loggen
.controller('menuCtrl', ['$scope', '$stateParams','$cordovaDialogs',
function ($scope, $stateParams, $cordovaDialogs) {

$scope.ingelogdegebruiker ="U bent niet ingelogd ";
$scope.image="img/cross.png";
$scope.data={};
$scope.data.username="";
$scope.data.wachtwoord="";
//uitloggen functie
  $scope.uitloggen=function(){
    $scope.ingelogdegebruiker ="U bent niet ingelogd ";
    $scope.image="img/cross.png";
//tonen van alert(native)
    $cordovaDialogs.alert('U bent succesvol uitgelogd', 'Proficiat', 'ok')
    .then(function() {
    // callback success
  });

    //alert("u bent succesvol uitgelogd ");

  }

  $scope.inloggen= function(){


      //ophalen gegevens firebase
      firebase.database().ref('/users/'+$scope.data.username+'/').once('value').then(function(snapshot) {

        var username = snapshot.val().user;
        var password = snapshot.val().password;


        //als de wachtwoorden overeenstemmen, wordt een alert getoond(native) die het succesvol inloggen aantoont
        if( password==$scope.data.password){

          $scope.ingelogdegebruiker="Ingelogd als "+ $scope.data.username+" ";
          $scope.image="img/check.png";
          $cordovaDialogs.alert('U bent succesvol ingelogd', 'Proficiat', 'ok')
          .then(function() {
          $scope.data.username="";
          $scope.data.password="";// callback success
        });
          //alert("U bent succesvol inggelogd ! ");
        }
        else{
          //bij fout laat een alert(native)zien dat het wachtwoord niet juist is + vibreer
          navigator.vibrate(300);
          //alert("het opgegeven wachtwoord is niet juist ");
          $cordovaDialogs.alert('Het opgegeven wachtwoord is niet correct', 'Helaas', 'ok')
          .then(function() {
          // callback success
        });
        }
      // ...
      //ALs de try failt ( niet gekend in het systeem) krijgt men ook een alert(native )te zien + vibreer
    }).catch(function(err) {
      navigator.vibrate(300);
      $cordovaDialogs.alert('De gebruikersnaam is niet gekend ', 'Helaas', 'ok')
      .then(function() {
      // callback success
    });
      //alert("de gebruikersnaam is niet gekend ");
    });



}








  // FB Login
  //  $scope.fbLogin = function () {
  //      FB.login(function (response) {
  //          if (response.authResponse) {
  //              getUserInfo();
  //          } else {
  //              console.log('User cancelled login or did not fully authorize.');
  //          }
  //      }, {scope: 'email,user_photos,user_videos'});
   //
  //      function getUserInfo() {
  //          // get basic info
  //          FB.api('/me', function (response) {
  //              console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
  //              // get profile picture
  //              FB.api('/me/picture?type=normal', function (picResponse) {
  //                  console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
  //                  response.imageUrl = picResponse.data.url;
  //                  // store data to DB - Call to API
  //                  // Todo
  //                  // After posting user data to server successfully store user data locally
  //                  var user = {};
  //                  user.name = response.name;
  //                  user.email = response.email;
  //                  if(response.gender) {
  //                      response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
  //                  } else {
  //                      user.gender = '';
  //                  }
  //                  user.profilePic = picResponse.data.url;
  //                  $cookieStore.put('userInfo', user);
  //                  $state.go('dashboard');
   //
  //              });
  //          });
  //      }
  //  };
   //
  //  // Set user details
  //  if ($scope.user != null ){
  //  $scope.user = $cookieStore.get('userInfo');
  //   }
  //  // Logout user
  //  $scope.logout = function () {
  //      $cookieStore.remove("userInfo");
  //      $state.go('welcome');
  //      $window.location.reload();


   // END FB Login

  // $scope.inloggen=function(){
  //   alert("de foto werd upgeload");
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   provider.addScope('user_birthday');
  //   provider.setCustomParameters({
  // 'display': 'popup'
  //   });
  //
  //   firebase.auth().signInWithPopUp(provider).then(function(result) {
  //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   // ...
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });
  //
  // }
  // $scope.uitloggen=function(){
  //   firebase.auth().signOut().then(function() {
  //     // Sign-out successful.
  //   }, function(error) {
  //     // An error happened.
  //   });
  //
  // }





}])
