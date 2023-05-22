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


function sjekkOmBrukernavnEksisterer(brukernavn) {
    return new Promise((resolve, reject) => {
      const navnRef = firebase.database().ref("personsDatabase/" + brukernavn);
    
      navnRef.once("value")
        .then((snapshot) => {
          const brukernavnEksisterer = snapshot.exists();
          console.log("Sjekker:" + brukernavnEksisterer);
          resolve(brukernavnEksisterer);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  function sjekkOmPassordErRiktig(brukernavn, passord) {
    return new Promise((resolve, reject) => {
      const navnRef = firebase.database().ref("personsDatabase/" + brukernavn);
    
      navnRef.once("value")
        .then((snapshot) => {
          const brukerData = snapshot.val();
          console.log(brukerData.passord);
          console.log(passord)
          if (brukerData.passord == passord) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }


  function hentInformasjon(brukernavn, key) {
personsDatabaseDB.once("value")
    .then((snapshot) => {
      const data = snapshot.val();

      return data[brukernavn][key];
})
    .catch((error) => {
      console.error(error);
});
  }

  function hentAutentikasjonsToken(brukernavn, key) {
   return new Promise((resolve, reject) => {
        personsDatabaseDB.once("value")
          .then((snapshot) => {
            const data = snapshot.val();
    
            autentikasjonsToken = data[brukernavn][key];
            resolve(autentikasjonsToken);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
      }
  
  


var autentikasjonsToken;
var loggetInnBrukernavn;
var loggetInnPassord;

  async function login(brukernavn, passord) {
    try {
    document.getElementById('lagNyBrukerKnapp').style.display = "inline";
    document.getElementById('Passord').style.display = "inline";
    document.getElementById('Brukernavn').style.display = "inline";
    document.getElementById('brukernavnNyBruker').style.display = "none";
    document.getElementById('passordNyBruker').style.display = "none";
    document.getElementById('brukernavnNyBruker').innerHTML = "";
    document.getElementById('passordNyBruker').innerHTML = "";
    document.getElementById('nyBruker').style.display = "none";
    
      const brukernavnEksisterer = await sjekkOmBrukernavnEksisterer(brukernavn);
      
      if (brukernavnEksisterer) {
        console.log("LOGIN: true");
        
        const passordRiktig = await sjekkOmPassordErRiktig(brukernavn, passord);
        if (passordRiktig) {
          console.log("PASSORD: TRUE");

          hentAutentikasjonsToken(brukernavn, "autentikasjonsToken");

          document.getElementById('loginTekst').innerHTML = "Logget inn som: "+ brukernavn;
          document.getElementById('Brukernavn').style.display = "none";
          document.getElementById('Passord').style.display = "none";
          document.getElementById('loginnKnapp').style.display = "none";
          document.getElementById('logoutKnapp').style.display = "inline";
          document.getElementById('lagrePerson').style.display = "inline";
          document.getElementById('lagNyBrukerKnapp').style.display = "none";
          loggetInnBrukernavn = brukernavn;
          loggetInnPassord = passord;

        } else {
          console.log("PASSORD: FALSE");
          return; 
        }
      } else {
        console.log("LOGIN: false");
        return;
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  

async function lagrePerson() {
    var name = loggetInnBrukernavn;
    var navn;
    var kjonn;
    var stilling;
    var telefonnummer;
    var forerkort;
    var bakgrunnsfarge;
    var fodselsdato;
    var kortBredde;
    var kortHoyde;
    var ramme1;
    var ramme2;
  
    var autentikasjonsTokenSjekker = await hentAutentikasjonsToken(loggetInnBrukernavn, "autentikasjonsToken");
  
    console.log(autentikasjonsToken);
    console.log(autentikasjonsTokenSjekker);
    console.log(autentikasjonsToken == autentikasjonsTokenSjekker);
  
    if (autentikasjonsToken == autentikasjonsTokenSjekker) {
      var hvorInformasjonenSkalSendes = personsDatabaseDB.child(name);
        


      /* Await virker bare når du skriver det slik, ikke hvis det var en funksjon, derfor kan du ikke lage en funksjon */
      navn = document.getElementById('navnInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["name"];
  })
      .catch((error) => {
        console.error(error);
  });
      kjonn = document.getElementById('kjonn').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["kjonn"];
  })
      .catch((error) => {
        console.error(error);
  });
      stilling = document.getElementById('jobbtittelInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["job"];
  })
      .catch((error) => {
        console.error(error);
  });
      telefonnummer = document.getElementById('telefonnummerInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["telefonnummer"];
  })
      .catch((error) => {
        console.error(error);
  });
      forerkort = document.getElementById('forerkortInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["forerkort"];
  })
      .catch((error) => {
        console.error(error);
  });
      bakgrunnsfarge = document.getElementById('bakgrunnsfargeInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["bakgrunnsfarge"];
  })
      .catch((error) => {
        console.error(error);
  });
      ramme1 = document.getElementById('rammerundt1Input').checked || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["ramme1"];
  })
      .catch((error) => {
        console.error(error);
  });
      ramme2 = document.getElementById('rammerundt2Input').checked || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["ramme2"];
  })
      .catch((error) => {
        console.error(error);
  });
      fodselsdato = document.getElementById('fodselsdatoInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["fodelsdato"];
  })
      .catch((error) => {
        console.error(error);
  });
      kortBredde = document.getElementById('breddeInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["kortBredde"];
  })
      .catch((error) => {
        console.error(error);
  });
      kortHoyde = document.getElementById('hoydeInput').value || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["kortHoyde"];
  })
      .catch((error) => {
        console.error(error);
  });
  
      hvorInformasjonenSkalSendes.set({
        name: navn,
        job: stilling,
        kjonn: kjonn,
        telefonnummer: telefonnummer,
        forerkort: forerkort,
        bakgrunnsfarge: bakgrunnsfarge,
        ramme1: ramme1,
        ramme2: ramme2,
        fodselsdato: fodselsdato,
        kortBredde: kortBredde,
        kortHoyde: kortHoyde,
        autentikasjonsToken: autentikasjonsToken,
        passord: loggetInnPassord,
      });
    }
  }
  


/* FISK FOR RAMME, den blir ikke lagret */





function nyBruker() {
    document.getElementById('lagNyBrukerKnapp').style.display = "none";
    document.getElementById('Passord').style.display = "none";
    document.getElementById('Brukernavn').style.display = "none";
    document.getElementById('Passord').innerHTML = "";
    document.getElementById('Brukernavn').innerHTML = "";
    document.getElementById('brukernavnNyBruker').style.display = "inline";
    document.getElementById('passordNyBruker').style.display = "inline";
    document.getElementById('nyBruker').style.display = "inline";
}

async function lagNyBruker() {
    var brukernavn = document.getElementById('brukernavnNyBruker').value;
    var passord = document.getElementById('passordNyBruker').value;
    var databaseNode = personsDatabaseDB.child(brukernavn);
    var nyAutentikasjonsToken = autentikasjonsTokenGenerator(Math.floor(Math.random() * 60) + 40);
    var navn = document.getElementById('navnInput').value;
    var kjonn = document.getElementById('kjonn').value;
    var stilling = document.getElementById('jobbtittelInput').value;
    var telefonnummer = document.getElementById('telefonnummerInput').value;
    var forerkort = document.getElementById('forerkortInput').value;
    var bakgrunnsfarge = document.getElementById('bakgrunnsfargeInput').value;
    var ramme1 = document.getElementById('rammerundt1Input').checked;
    var ramme2 = document.getElementById('rammerundt2Input').checked;
    var fodselsdato = document.getElementById('fodselsdatoInput').value;
    var kortBredde = document.getElementById('breddeInput').value;
    var kortHoyde = document.getElementById('hoydeInput').value;
    if (await sjekkOmBrukernavnEksisterer(brukernavn)) {
      console.log("BRUKER EKSITERER");
      return;
    } else {
      if (await hentInformasjon(brukernavn, "passord")) {
        console.log("BRUKER EKSITERER");
        return;
      } else {
        databaseNode.set({
        name : navn,
        job : stilling,
        kjonn : kjonn,
        telefonnummer : telefonnummer,
        forerkort : forerkort,
        bakgrunnsfarge : bakgrunnsfarge,
        ramme1 : ramme1,
        ramme2 : ramme2,
        fodselsdato : fodselsdato,
        kortBredde : kortBredde,
        kortHoyde : kortHoyde,
          passord: passord,
          autentikasjonsToken: nyAutentikasjonsToken,
        });
        document.getElementById('brukernavnNyBruker').innerHTML = "";
        document.getElementById('passordNyBruker').innerHTML = "";
        login(document.getElementById('Brukernavn').value, document.getElementById('Passord').value);
        alert('Brukeren din er nå registrert');
      }
    }
};



function autentikasjonsTokenGenerator(lengde) {
    const alfabetet ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"!(/$&))* ';
    let resultat = ' ';
    const alfabetlengde = alfabetet.length;
    for ( let i = 0; i < lengde; i++ ) {
        resultat += alfabetet.charAt(Math.floor(Math.random() * alfabetlengde));
    }

    return resultat;
}

function sjekkNyBruker() {
    var brukernavnInput = document.getElementById("brukernavnNyBruker");
    var passordInput = document.getElementById("passordNyBruker");

    if (brukernavnInput.value.trim() === "" || passordInput.value.trim() === "") {
      alert("Fyll inn alle feltene.");
    } else {
      lagNyBruker();
    }
  }









function logUt() {
    autentikasjonsToken = "";
    document.getElementById('loginTekst').innerHTML = "Login";
    document.getElementById('Brukernavn').style.display = "inline";
    document.getElementById('Passord').style.display = "inline";
    document.getElementById('loginnKnapp').style.display = "inline";
    document.getElementById('logoutKnapp').style.display = "none";
    document.getElementById('lagrePerson').style.display = "none";
    document.getElementById('lagNyBrukerKnapp').style.display = "inline";
}






async function personvelger(navnInput) {


    // Her byttet jeg til PromiseAll, for jeg la merke til at hvis jeg ba om en og en informasjonskapsel, så tok det litt over et halvt sekund, osm er lang tid
    const hentData = async (nokkel) => {
        try {
          const snapshot = await personsDatabaseDB.once("value");
          const data = snapshot.val();
          return data[navnInput][nokkel];
        } catch (error) {
          console.error(error);
        }
      };
      
      const [navn, stilling, kjonn, telefonnummer, forerkort, fodelsdato, bakgrunnsfarge, ramme1, ramme2, kortBredde, kortHoyde] = await Promise.all([
        hentData("name"),
        hentData("job"),
        hentData("kjonn"),
        hentData("telefonnummer"),
        hentData("forerkort"),
        hentData("fodselsdato"),
        hentData("bakgrunnsfarge"),
        hentData("ramme1"),
        hentData("ramme2"),
        hentData("kortBredde"),
        hentData("kortHoyde")
      ]);
      

    navnH1EL.innerHTML = navn;
    stillingH2.innerHTML = stilling;
    kjonnH3EL.innerHTML = kjonn;
    telefonnummerH3EL.innerHTML = telefonnummer;
    if(forerkort) {
        forerkortH3EL.innerHTML = navn + " har førerkort"
    }
    else {
        forerkortH3EL.innerHTML = navn + " har ikke førerkort"
    }
    fodselsdatoH3EL.innerHTML = fodelsdato;
    document.getElementById('visittkortet').style.backgroundColor = bakgrunnsfarge;
    if(ramme1) {
        ammevelger('visittkortet', 'lightgray');
    }
    else {
        rammevelger('visittkortet', '#FFFFFF');
    }
    document.getElementById('visittkortet').style.width = kortBredde + "vw";
    document.getElementById('visittkortet').style.height = kortHoyde + "vh";
  }