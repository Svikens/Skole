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
  
        
        return data[name]["fodselsdato"];
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
  var navnSkriftsstorrelse = document.getElementById('navnH1header').style.fontSize || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["navnSkriftsstorrelse"];
  })
      .catch((error) => {
        console.error(error);
  });
  console.log(document.getElementById('navnH1').style.fontSize);
  var stillingSkriftsstorrelse = document.getElementById('stillingH2header').style.fontSize || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["stillingSkriftsstorrelse"];
  })
      .catch((error) => {
        console.error(error);
  });
  var stillingSkriftsstorrelse = document.getElementById('stillingH2header').style.fontSize || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["stillingSkriftsstorrelse"];
  })
      .catch((error) => {
        console.error(error);
  });
  var kjonnSkriftsstorrelse = document.getElementById('kjonnH3header').style.fontSize || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["kjonnSkriftsstorrelse"];
  })
      .catch((error) => {
        console.error(error);
  });
  var telefonnummerSkriftsstorrelse = document.getElementById('telefonnummerH3header').style.fontSize || await personsDatabaseDB.once("value")
      .then((snapshot) => {
        
        const data = snapshot.val();
  
        
        return data[name]["telefonnummerSkriftsstorrelse"];
  })
      .catch((error) => {
        console.error(error);
  });
  var forerkortSkriftsstorrelse = document.getElementById('forerkortH3header').style.fontSize || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["forerkortSkriftsstorrelse"];
})
  .catch((error) => {
    console.error(error);
});
var fodselsdatoSkriftsstorrelse = document.getElementById('fodselsdatoH3header').style.fontSize || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["fodselsdatoSkriftsstorrelse"];
})
  .catch((error) => {
    console.error(error);
});
var rectBilde = bildeIMGEL.getBoundingClientRect();
var bildePosisjonTop = (rectBilde.top - 86.5) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["bildePosisjonTop"];
})
  .catch((error) => {
    console.error(error);
});
var bildePosisjonLeft = (rectBilde.left - 542.2000122070312) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["bildePosisjonLeft"];
})
  .catch((error) => {
    console.error(error);
});
var bildePosisjonRight = bildeIMGEL.style.right || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["bildePosisjonRight"];
})
  .catch((error) => {
    console.error(error);
});
var bildePosisjonBottom = bildeIMGEL.style.bottom || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["bildePosisjonBottom"];
})
  .catch((error) => {
    console.error(error);
});
var rectNavn = document.getElementById('navnH1header').getBoundingClientRect();
var rectValue = document.getElementById('visittkortet').getBoundingClientRect();
console.log(rectValue.top)

console.log("NAVNTOP")
console.log(document.getElementById('navnH1').style.top)
console.log(document.getElementById('navnH1').style.left)
console.log("RECT  top"+ rectNavn.top);
console.log("RECT left "+ rectNavn.left)
console.log("RECT bottom "+ rectNavn.bottom)
console.log("RECT right "+ rectNavn.right)
console.log("rectNavn top - rectValue top" + (rectNavn.top - rectValue.top));
var navnTop = (rectNavn.top - 116.08332824707031) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["navnTop"];
})
  .catch((error) => {
    console.error(error);
});




var navnLeft = (rectNavn.left - 542.2000122070312) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    
    const data = snapshot.val();

    
    return data[name]["navnLeft"];
})
  .catch((error) => {
    console.error(error);
});

var rectStilling = document.getElementById('stillingH2header').getBoundingClientRect();

var stillingTop = (rectStilling.top - 163.46665954589844) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["stillingTop"];
})
  .catch((error) => {
    console.error(error);
});

var stillingBottom = rectStilling.bottom || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["stillingBottom"];
})
  .catch((error) => {
    console.error(error);
});

var stillingLeft = (rectStilling.left - 542.2000122070312) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["stillingLeft"];
})
  .catch((error) => {
    console.error(error);
});

var stillingRight = rectStilling.right || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["stillingRight"];
})
  .catch((error) => {
    console.error(error);
});

var rectKjonn = document.getElementById('kjonnH3header').getBoundingClientRect();
var kjonnTop =  (rectKjonn.top - 212.36666870117188) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["kjonnTop"];
})
  .catch((error) => {
    console.error(error);
});

var kjonnBottom = rectKjonn.bottom || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["kjonnBottom"];
})
  .catch((error) => {
    console.error(error);
});

var kjonnLeft = (rectKjonn.left - 542.2000122070312) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["kjonnLeft"];
})
  .catch((error) => {
    console.error(error);
});

var kjonnRight = rectKjonn.right || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["kjonnRight"];
})
  .catch((error) => {
    console.error(error);
});
var rectTelefon = document.getElementById('telefonnummerH3header').getBoundingClientRect();
var telefonnummerTop = (rectTelefon.top - 261.26666259765625) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["telefonnummerTop"];
})
  .catch((error) => {
    console.error(error);
});

var telefonnummerBottom = rectTelefon.bottom || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["telefonnummerBottom"];
})
  .catch((error) => {
    console.error(error);
});

var telefonnummerLeft = (rectTelefon.left - 542.2000122070312) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["telefonnummerLeft"];
})
  .catch((error) => {
    console.error(error);
});

var telefonnummerRight = rectTelefon.right || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["telefonnummerRight"];
})
  .catch((error) => {
    console.error(error);
});
var rectForerkort = document.getElementById('forerkortH3header').getBoundingClientRect();
var forerkortTop = (rectForerkort.top - 310.16668701171875) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["forerkortTop"];
})
  .catch((error) => {
    console.error(error);
});

var forerkortBottom = rectForerkort.bottom || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["forerkortBottom"];
})
  .catch((error) => {
    console.error(error);
});

var forerkortLeft = (rectForerkort.left - 542.2000122070312) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["forerkortLeft"];
})
  .catch((error) => {
    console.error(error);
});

var forerkortRight = rectForerkort.right || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["forerkortRight"];
})
  .catch((error) => {
    console.error(error);
});
var rectFodsel = document.getElementById('fodselsdatoH3header').getBoundingClientRect();
var fodselsdatoTop = (rectFodsel.top - 359.066650390625) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["fodselsdatoTop"];
})
  .catch((error) => {
    console.error(error);
});

var fodselsdatoBottom = rectFodsel.bottom || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["fodselsdatoBottom"];
})
  .catch((error) => {
    console.error(error);
});

var fodselsdatoLeft = (rectFodsel.left - 542.2000122070312) || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["fodselsdatoLeft"];
})
  .catch((error) => {
    console.error(error);
});

var fodselsdatoRight = rectFodsel.right || await personsDatabaseDB.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    return data[name]["fodselsdatoRight"];
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
        navnSkriftsstorrelse : navnSkriftsstorrelse,
        stillingSkriftsstorrelse : stillingSkriftsstorrelse,
        kjonnSkriftsstorrelse : kjonnSkriftsstorrelse,
        autentikasjonsToken: autentikasjonsToken,
        telefonnummerSkriftsstorrelse : telefonnummerSkriftsstorrelse,
        forerkortSkriftsstorrelse : forerkortSkriftsstorrelse,
        fodselsdatoSkriftsstorrelse : fodselsdatoSkriftsstorrelse,
        bildePosisjonTop : bildePosisjonTop,
        bildePosisjonBottom : bildePosisjonBottom,
        bildePosisjonLeft : bildePosisjonLeft,
        bildePosisjonRight : bildePosisjonRight,
        navnTop : navnTop,
        navnLeft : navnLeft,
        kjonnTop : kjonnTop,
        kjonnRight : kjonnRight,
        kjonnLeft : kjonnLeft,
        kjonnBottom, kjonnBottom,
        stillingTop : stillingTop,
        stillingBottom : stillingBottom,
        stillingRight : stillingRight,
        stillingLeft : stillingLeft,
        forerkortTop : forerkortTop,
        forerkortBottom : forerkortBottom,
        forerkortLeft : forerkortLeft,
        forerkortRight : forerkortRight,
        fodselsdatoTop : fodselsdatoTop,
        fodselsdatoBottom : fodselsdatoBottom,
        fodselsdatoLeft : fodselsdatoLeft,
        fodselsdatoRight : fodselsdatoRight,
        telefonnummerTop : telefonnummerTop,
        telefonnummerBottom : telefonnummerBottom,
        telefonnummerLeft : telefonnummerLeft,
        telefonnummerRight : telefonnummerRight,
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
    var bildePosisjonBottom = bildeIMGEL.style.bottom
    var bildePosisjonTop = bildeIMGEL.style.top
    var bildePosisjonLeft = bildeIMGEL.style.left
    var bildePosisjonRight = bildeIMGEL.style.right
    var fodselsdatoSkriftsstorrelse = document.getElementById('fodselsdatoH3header').style.fontSize + "px";
    var telefonnummerSkriftsstorrelse = document.getElementById('telefonnummerH3header').style.fontSize + "px";
    var forerkortSkriftsstorrelse = document.getElementById('forerkortH3header').style.fontSize + "px";
    var kjonnSkriftsstorrelse = document.getElementById('kjonnH3header').style.fontSize + "px";
    var stillingSkriftsstorrelse = document.getElementById('stillingH2header').style.fontSize + "px";
    var navnSkriftsstorrelse = document.getElementById('navnH1header').style.fontSize + "px";
    var rectFodsel = document.getElementById('fodselsdatoH3header').getBoundingClientRect();
    var fodselsdatoTop = rectFodsel.top;
    var fodselsdatoBottom = rectFodsel.bottom;
    var fodselsdatoLeft = rectFodsel.left;
    var fodselsdatoRight = rectFodsel.right;

    var rectTelefonnummer = document.getElementById('telefonnummerH3header').getBoundingClientRect();
    var telefonnummerTop = rectTelefonnummer.top;
    var telefonnummerBottom = rectTelefonnummer.bottom;
    var telefonnummerLeft = rectTelefonnummer.left;
    var telefonnummerRight = rectTelefonnummer.right;

    var rectForerkort = document.getElementById('forerkortH3header').getBoundingClientRect();
    var forerkortTop = rectForerkort.top;
    var forerkortBottom = rectForerkort.bottom;
    var forerkortLeft = rectForerkort.left;
    var forerkortRight = rectForerkort.right;

    var rectKjonn = document.getElementById('kjonnH3header').getBoundingClientRect();
    var kjonnTop = rectKjonn.top;
    var kjonnBottom = rectKjonn.bottom;
    var kjonnLeft = rectKjonn.left;
    var kjonnRight = rectKjonn.right;

    var rectStilling = document.getElementById('stillingH2header').getBoundingClientRect();
    var stillingTop = rectStilling.top;
    var stillingBottom = rectStilling.bottom;
    var stillingLeft = rectStilling.left;
    var stillingRight = rectStilling.right;

    var rectNavn = document.getElementById('navnH1header').getBoundingClientRect();
    var navnTop = document.getElementById('navnH1header').style.top;
    var navnLeft = document.getElementById('navnH1header').style.left;

    

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
        bildePosisjonBottom : bildePosisjonBottom,
        bildePosisjonLeft : bildePosisjonLeft,
        bildePosisjonRight : bildePosisjonRight,
        bildePosisjonTop : bildePosisjonTop, 
        fodselsdatoSkriftsstorrelse : fodselsdatoSkriftsstorrelse,
        telefonnummerSkriftsstorrelse : telefonnummerSkriftsstorrelse,
        forerkortSkriftsstorrelse : forerkortSkriftsstorrelse,
        kjonnSkriftsstorrelse : kjonnSkriftsstorrelse,
        stillingSkriftsstorrelse : stillingSkriftsstorrelse,
        navnSkriftsstorrelse : navnSkriftsstorrelse,
        navnTop : navnTop,
        navnLeft : navnLeft,
        kjonnTop : kjonnTop,
        kjonnRight : kjonnRight,
        kjonnLeft : kjonnLeft,
        kjonnBottom, kjonnBottom,
        stillingTop : stillingTop,
        stillingBottom : stillingBottom,
        stillingRight : stillingRight,
        stillingLeft : stillingLeft,
        forerkortTop : forerkortTop,
        forerkortBottom : forerkortBottom,
        forerkortLeft : forerkortLeft,
        forerkortRight : forerkortRight,
        fodselsdatoTop : fodselsdatoTop,
        fodselsdatoBottom : fodselsdatoBottom,
        fodselsdatoLeft : fodselsdatoLeft,
        fodselsdatoRight : fodselsdatoRight,
        telefonnummerTop : telefonnummerTop,
        telefonnummerBottom : telefonnummerBottom,
        telefonnummerLeft : telefonnummerLeft,
        telefonnummerRight : telefonnummerRight,
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
      
      const [navn, stilling, kjonn, telefonnummer, forerkort, fodelsdato, bakgrunnsfarge, ramme1, ramme2, kortBredde, kortHoyde, fodselsdatoSkriftsstorrelse, forerkortSkriftsstorrelse, kjonnSkriftsstorrelse, navnSkriftsstorrelse, stillingSkriftsstorrelse, telefonnummerSkriftsstorrelse, bildePosisjonBottom, bildePosisjonLeft, bildePosisjonRight, bildePosisjonTop, navnTop, navnLeft, kjonnTop, kjonnLeft,forerkortTop, forerkortLeft, fodselsdatoTop, fodselsdatoLeft, telefonnummerTop,telefonnummerLeft, stillingTop, stillingLeft ] = await Promise.all([
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
        hentData("kortHoyde"),
        hentData("fodselsdatoSkriftsstorrelse"),
        hentData("forerkortSkriftsstorrelse"),
        hentData("kjonnSkriftsstorrelse"),
        hentData("navnSkriftsstorrelse"),
        hentData("stillingSkriftsstorrelse"),
        hentData("telefonnummerSkriftsstorrelse"),
        hentData("bildePosisjonBottom"),
        hentData("bildePosisjonLeft"),
        hentData("bildePosisjonRight"),
        hentData("bildePosisjonTop"),
        hentData("navnTop"),
        hentData("navnLeft"),
        hentData("kjonnTop"),
        hentData("kjonnLeft"),
        hentData("forerkortTop"),
        hentData("forerkortLeft"),
        hentData("fodselsdatoTop"),
        hentData("fodselsdatoLeft"),
        hentData("telefonnummerTop"),
        hentData("telefonnummerLeft"),
        hentData("stillingTop"),
        hentData("stillingLeft"),
      ]);
      
    document.getElementById('navnH1header').innerHTML = navn;
    document.getElementById('stillingH2header').innerHTML = stilling;
    document.getElementById('kjonnH3header').innerHTML = kjonn;
    document.getElementById('telefonnummerH3header').innerHTML = telefonnummer;
    if(forerkort) {
      document.getElementById('forerkortH3header').innerHTML = navn + " har førerkort"
    }
    else {
      document.getElementById('forerkortH3header').innerHTML = navn + " har ikke førerkort"
    }
    document.getElementById('fodselsdatoH3header').innerHTML = fodelsdato;
    document.getElementById('visittkortet').style.backgroundColor = bakgrunnsfarge;
    if(ramme1) {
        ammevelger('visittkortet', 'lightgray');
    }
    else {
        rammevelger('visittkortet', '#FFFFFF');
    }
    document.getElementById('visittkortet').style.width = kortBredde + "vw";
    document.getElementById('visittkortet').style.height = kortHoyde + "vh";
    document.getElementById('fodselsdatoH3header').style.fontSize = fodselsdatoSkriftsstorrelse;
    document.getElementById('navnH1header').style.fontSize = navnSkriftsstorrelse + "px";
    document.getElementById('stillingH2header').style.fontSize = stillingSkriftsstorrelse + "px";
    document.getElementById('kjonnH3header').style.fontSize = kjonnSkriftsstorrelse + "px";
    document.getElementById('telefonnummerH3header').style.fontSize = telefonnummerSkriftsstorrelse + "px";
    document.getElementById('forerkortH3header').style.fontSize = forerkortSkriftsstorrelse + "px";
    document.getElementById('bildeIMG').style.top = bildePosisjonTop + "px";
    document.getElementById('bildeIMG').style.left = bildePosisjonLeft + "px";
    document.getElementById('fodselsdatoH3header').style.top = fodselsdatoTop + "px";
    document.getElementById('fodselsdatoH3header').style.left = fodselsdatoLeft + "px";
    document.getElementById('telefonnummerH3header').style.top = telefonnummerTop + "px";
    document.getElementById('telefonnummerH3header').style.left = telefonnummerLeft + "px";
    document.getElementById('forerkortH3header').style.top =  forerkortTop + "px";
    document.getElementById('forerkortH3header').style.left = forerkortLeft + "px";
    document.getElementById('kjonnH3header').style.position = "absolute" ;
    document.getElementById('kjonnH3header').style.top = kjonnTop + "px" ;
    document.getElementById('kjonnH3header').style.left = kjonnLeft + "px";
    document.getElementById('stillingH2header').style.position = "absolute";
    document.getElementById('stillingH2header').style.top = stillingTop + "px";
    document.getElementById('stillingH2header').style.left =  stillingLeft + "px";
    document.getElementById('navnH1header').style.position = "absolute";
    document.getElementById('navnH1header').style.top = navnTop + "px";
    document.getElementById('navnH1header').style.left = navnLeft +"px";
    
  }


  function fraPikslerTilVh(tall) {
    // Get the viewport dimensions
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
    // Calculate the value in viewport units
    var vh = ((tall / viewportHeight) * 100) + "vh";
  
    // Return the converted values
    console.log(vh);
    return vh;
  }
  function fraPikslerTilVw(tall) {
    // Get the viewport dimensions
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  
    // Calculate the value in viewport units
    var vw = ((tall / viewportWidth) * 100) + "vw";
  
    // Return the converted values
    return vw;
  }
  
  
  function fraVwTilPx(vw) {
    var windowWidth = window.innerWidth;
    var pixelVerdi = windowWidth * (vw / 100);
    return pixelVerdi;
  }
  function fraVhTilPx(vh) {
    var windowHeigth = window.innerHeight;
    var pixelVerdi = windowHeigth * (vh / 100);
    return pixelVerdi;
  }
  
