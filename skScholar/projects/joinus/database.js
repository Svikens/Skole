// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUgx-uVVt51oKT5auC7MAKFNWlv2iyhuk",
    authDomain: "personsdatabase-1.firebaseapp.com",
    databaseURL: "https://personsdatabase-1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "personsdatabase-1",
    storageBucket: "personsdatabase-1.appspot.com",
    messagingSenderId: "774565114393",
    appId: "1:774565114393:web:b8579795f11a7a409f7088"
};
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
  
  
var personsDatabaseDB = firebase.database().ref('personsDatabase')
var hvorInformasjonenSkalSendes = personsDatabaseDB.child('forms').push();

function sendDataTilDatabase() {
    // Here you can add the code to send the form data to the database
    // For example, you can access the input values and perform the necessary database operations
    
    var fornavnInputValue = document.getElementById('fornavnInput').value;
    var etternavnInputValue = document.getElementById('etternavnInput').value;
    var emailInputValue = document.getElementById('emailInput').value;
    var grunnInputValue = document.getElementById('grunnInput').value;
    hvorInformasjonenSkalSendes.set({
        fornavn : fornavnInputValue,
        etternavn : etternavnInputValue,
        email : emailInputValue,
        grunn : grunnInputValue
        });
    
    alert('Din søknad har blitt sendt')
  
    document.getElementById('form').reset();
  }
  