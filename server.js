var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyA2sZSSxRo7BHMOmu5Pcw8sWBp5UxLNjos",
    authDomain: "womensafetyband.firebaseapp.com",
    databaseURL: "https://womensafetyband.firebaseio.com",
    projectId: "womensafetyband",
    storageBucket: "womensafetyband.appspot.com",
    messagingSenderId: "220679958301",
    appId: "1:220679958301:web:4a61a9bf1c7688cb687bf4",
    measurementId: "G-BWKS7T44BL"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Database
var rf = firebase.database().ref('users');
var rf2 = firebase.database().ref('WomenSafetyApp');

/*
Steps:
1. Get Women Location
2. Get Helper Objects(Because you their number and location both)
3. Check for distance one by one, call message function.
4. Move girl's location to a different database.
*/

let helperObj;
let femaleObj;
getHelperLocation()
femaleDetail()
setTimeout(function() {
 // console.log(helperObj)
 // console.log(femaleObj)
  var helperKeys=Object.keys(helperObj);
  var femaleKeys=Object.keys(femaleObj);

  
    for(var i=0;i<femaleKeys.length;i++) {
      console.log(femaleObj[femaleKeys[i]]);
      var locationFemaleString=femaleObj[femaleKeys[i]]

      locationFemaleString=locationFemaleString.substr(1).slice(0, -1)
      var locationFemale = locationFemaleString.split(",")
      let latFemale=Number(locationFemale[0]);
      let longFemale=Number(locationFemale[1]);
   

    var HelperList=[]
    for(var j=0;j<helperKeys.length;j++) {
      var latHelper=Number(helperObj[helperKeys[j]].latitude);
      var longHelper=Number(helperObj[helperKeys[j]].longitude);
   
      
      var distance=calculateDistance(latFemale,longFemale,latHelper,longHelper);
      //console.log(distance)
      if(distance<0.1){
      HelperList.push(helperObj[helperKeys[j]].number);
      message(latFemale,longFemale,'91'+helperObj[helperKeys[j]].number);
      }

    }
    console.log(HelperList)
      
    }
  }, 5000);


function getHelperLocation(){
  rf.on('value', gotData,errorData);

  function gotData(data){
    helperObj=data.val();//Getting Data
    
  }

  function errorData(error){
    console.log("error Aya");
    console.log(error);
  }
}

function femaleDetail() {
  rf2.on('value', gotData2,errorData2);

  function gotData2(data){
    femaleObj=data.val();
  }
  
  function errorData2(error){
    console.log("error In 2");
    console.log(error);
  }
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  
  var dist=earthRadiusKm*c
  return dist;
}

function message(lat,long,helNumber)
{
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'b5b8b298',
  apiSecret: '7dlD77kOibsNrbvY',
});

const from = 'anshul';
const to = String(helNumber);
const text = `Women in need near you!!.. https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
nexmo.message.sendSms(from, to, text);

}