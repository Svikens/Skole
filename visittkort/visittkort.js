// Kriterier: Fullt navn, jobbtittel, addresse, fødelsdato, firma nummer, du skal kunne plassere elementene selv. Legg til 2 ting ekstra, at den lagrer hvor du plasserte, slik at du bare kan trykke på plasser. Legg også til at programmet legger det inn for deg.

// Variabelen posisjonsLagring er en array som lagrer posisjonene til hvert element på visittkortet, pluss font størelsen.
var posisjonsLagring = [[], [], [], [], [], [], []];

/* Funksjonen plasserAutomatisk blir utført når man trykker på "Plasser Automatisk" knappen. 
   Funksjonen lagrer først posisjonen til hvert element som allerede er på visittkortet, sånn at man kan trykke på "Plasser der hvor du plasserte manuelt" knappen senere
   og få de satt tilbake der man plasserte de manuelt.
   Deretter plasseres elementene der hvor jeg har valgt at de skal være. De får også en bestemt skrift størrelse.
*/

var plasseringsLagringToggle = 0;
function plasserAutomatisk() {
    navnH1EL = document.getElementById("navnH1");
    stillingH2 = document.getElementById("stillingH2");
    kjonnH3EL = document.getElementById("kjonnH3");
    telefonnummerH3EL = document.getElementById("telefonnummerH3");
    forerkortH3EL = document.getElementById("forerkortH3");
    fodselsdatoH3EL = document.getElementById("fodselsdatoH3");
    bildeIMGEL = document.getElementById("bildeIMG");
    if((plasseringsLagringToggle % 2) == 0) {
    posisjonsLagring[0][0] = navnH1EL.style.top;
    posisjonsLagring[0][1] = navnH1EL.style.left;
    posisjonsLagring[0][2] = navnH1EL.style.fontSize;
    posisjonsLagring[1][0] = stillingH2.style.top;
    posisjonsLagring[1][1] = stillingH2.style.left;
    posisjonsLagring[1][2] = stillingH2.style.fontSize;
    posisjonsLagring[2][0] = kjonnH3EL.style.top;
    posisjonsLagring[2][1] = kjonnH3EL.style.left;
    posisjonsLagring[2][2] = kjonnH3EL.style.fontSize;
    posisjonsLagring[3][0] = telefonnummerH3EL.style.top;
    posisjonsLagring[3][1] = telefonnummerH3EL.style.left;
    posisjonsLagring[3][2] = telefonnummerH3EL.style.fontSize;
    posisjonsLagring[4][0] = forerkortH3EL.style.top;
    posisjonsLagring[4][1] = forerkortH3EL.style.left;
    posisjonsLagring[4][2] = forerkortH3EL.style.fontSize;
    posisjonsLagring[5][0] = fodselsdatoH3EL.style.top;
    posisjonsLagring[5][1] = fodselsdatoH3EL.style.left;
    posisjonsLagring[5][2] = fodselsdatoH3EL.style.fontSize;
    posisjonsLagring[6][0] = bildeIMGEL.style.top;
    posisjonsLagring[6][1] = bildeIMGEL.style.left;
    posisjonsLagring[6][2] = bildeIMGEL.style.right;
    posisjonsLagring[6][3] = bildeIMGEL.style.bottom;
    }

    navnH1EL.style.top = "-6vh";
    navnH1EL.style.left = "2vw";
    navnH1EL.style.fontSize = "6vh"

    stillingH2.style.top = "12vh";
    stillingH2.style.left = "3vw";
    stillingH2.style.fontSize = "5vh"

    kjonnH3EL.style.top = "20vh";
    kjonnH3EL.style.left = "3vw";
    kjonnH3EL.style.fontSize = "5vh"

    telefonnummerH3EL.style.top = "60vh";
    telefonnummerH3EL.style.left = "0vw";
    telefonnummerH3EL.style.fontSize = "4vh"

    forerkortH3EL.style.top = "29vh";
    forerkortH3EL.style.left = "3vw";
    forerkortH3EL.style.fontSize = "5vh"

    fodselsdatoH3EL.style.top = "38vh";
    fodselsdatoH3EL.style.left = "3vw";
    fodselsdatoH3EL.style.fontSize = "5vh"

    bildeIMGEL.style.left = "39.99vw";
    bildeIMGEL.style.top = "0";

    plasseringsLagringToggle = 1;

    
}

/* 
    Funksjonen plasserManueltAutomatisk() blir utført når man trykker på "Plasser der hvor du plasserte manuelt" knappen.
    Denne funksjonen setter tilbake posisjonen til hvert element på visittkortet til det posisjonen ble lagret som 
    i funksjonen plasserAutomatisk().
*/
function plasserManueltAutomatisk() {
    navnH1EL.style.top = posisjonsLagring[0][0];
    navnH1EL.style.left = posisjonsLagring[0][1];
    navnH1EL.style.fontSize = posisjonsLagring[0][2];
    stillingH2.style.top = posisjonsLagring[1][0];
    stillingH2.style.left = posisjonsLagring[1][1];
    stillingH2.style.fontSize = posisjonsLagring[1][2];
    kjonnH3EL.style.top = posisjonsLagring[2][0];
    kjonnH3EL.style.left = posisjonsLagring[2][1];
    kjonnH3EL.style.fontSize = posisjonsLagring[2][2];
    telefonnummerH3EL.style.top = posisjonsLagring[3][0];
    telefonnummerH3EL.style.left = posisjonsLagring[3][1];
    telefonnummerH3EL.style.fontSize = posisjonsLagring[3][2];
    forerkortH3EL.style.top = posisjonsLagring[4][0];
    forerkortH3EL.style.left = posisjonsLagring[4][1];
    forerkortH3EL.style.fontSize = posisjonsLagring[4][2];
    fodselsdatoH3EL.style.top = posisjonsLagring[5][0];
    fodselsdatoH3EL.style.left = posisjonsLagring[5][1];
    fodselsdatoH3EL.style.fontSize = posisjonsLagring[5][2];
    bildeIMGEL.style.top = posisjonsLagring[6][0];
    bildeIMGEL.style.left = posisjonsLagring[6][1];
    bildeIMGEL.style.right = posisjonsLagring[6][2];
    bildeIMGEL.style.bottom = posisjonsLagring[6][3];
    plasseringsLagringToggle = 0;
}

/*
 Disse 6 linjene er for å utføre funksjonen draModus på hvert element som er på visittkortet.
*/
draModus(document.getElementById("navnH1"));
draModus(document.getElementById("stillingH2"));
draModus(document.getElementById("telefonnummerH3"));
draModus(document.getElementById("kjonnH3"));
draModus(document.getElementById("forerkortH3"));
draModus(document.getElementById("fodselsdatoH3"));
draModus(document.getElementById("bildeIMG"));

/*
    Funksjonen draModus blir utført når man trykker og drar et av elementene som er på visittkortet.
    Målet med funksjonen er å gjøre det mulig å trykke og dra et element på visittkortet rundt.
    Funksjonen starter med å definere noen variabler, som jeg bruker som posisjon.
    Den sjekker deretter om elementet, som ligger under diven, eksisterer. Hvis den gjør det, så settes en 
    eventlistener (som utføres når du trykker ned på elementet) til elementet. Hvis elementet ikke eksisterer, så settes 
    eventlisteneren til diven. Funksjonen startDraModus blir utført når man trykker ned på elementet, eller elementet med navnet likt elementet + "header".
*/
function draModus(elementet) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elementet.id + "header")) {
        document.getElementById(elementet.id + "header").onmousedown = startDraModus;
    } else {
        elementet.onmousedown = startDraModus;
    }

    /*
    Denne funksjonen blir utført når man trykker ned på et av elementene som ble definert ovenfor.
    event.preventDefault() hindrer at f.eks markering vil skje når man drar på elementet.
    Funksjonen lagrer y-og x-posisjonen til elementet som blir trykket ned.
    Deretter setter den en eventlistener til elementet, som gjør at når du ikke trykker ned på elementet lengre, så
    kjøres funksjonen draModusAv (som gjør at man slipper elementet).
    En annen evenlistener blir satt til elementet, som gjør at når du rører rundt på musen, så utføres funksjonen draElementet().
    Så draElemenetet blir kjørt hele tiden mens du rører på musen din mens du holder et element, litt som en while-løkke.
    */
    function startDraModus(event) {
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = draModusAv;
        document.onmousemove = draElementet;
    }

    /*
    Funksjonen draElementet er en funksjon som blir utført når man aktivt drar rundt på elementet.
    Funksjonen gjør at når du drar elementet rundt, så føler elementer etter. Det gjør også slikt at elementet blir sittende igjen 
    der du slipper elementet.
    event.preventDefault() har fortsatt samme funksjon, at den hindrer f.eks. markering av tekst.
    Variabelen pos1 blir satt til pos3, som er startposisjonen, - event.clientX, slik at når du slipper elementet, så 
    er den nye X-posisjonen lagret.
    Variabelen pos2 blir satt til pos4, som er startposisjonen, - event.clientY, slik at når du slipper elementet, så 
    er den nye Y-posisjonen lagret.
    Så blir pos3 satt til den nye posisjonen, slik at når funksjonen blir kjørt på nytt, så har den riktig startpunkt.
    Så blir pos4 satt til den nye posisjonen, slik at når funksjonen blir kjørt på nytt, så har den riktig startpunkt.
    Derettet blir elementets "top" posisjon satt til elementets "offsetTop", som git hvor langt elementet er fra toppen av skjermen, minus 
    den nye posisjonen 2, slik at elementet får en ny x-posisjon. 
    Derettet blir elementets "left" posisjon satt til elementets "offsetLeft", som git hvor langt elementet er fra venste side av skjermen, 
    minus den nye posisjonen 2, slik at elementet får en ny y-posisjon. 
    Disse to linjene skaper effekten av at du drar elementet rundt på en smooth måte.
    */

    function draElementet(event) {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        elementet.style.top = (elementet.offsetTop - pos2) + "px";
        elementet.style.left = (elementet.offsetLeft - pos1) + "px";
    }

    /*
    Funksjonen draModusAv blir kjørt når man slipper elementet, "onmouseup".
    Funksjonen gjør at når du slipper elementet, så slipper du faktisk elementet.
    De to linjene bare tar bort eventlistenersene "onmouseup" og "onmousemove" til hele dokumentet (men det virker for brukeren
    som at det bare var for elementet).
    */
    function draModusAv() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/* De to neste linjene henter elementet "bildeIput", som er input elementer med typen file, og
    "bildeIMGHeader, som er elementet hvor bildet skal plasseres.*/
let fileInput = document.getElementById('bildeInput');
imgElement = document.getElementById('bildeIMGheader');

/* Først definerer variabelen leser som new FileReader(), FileReader er et objekt som blir brukt til å lese filer fra PCEN, uten at 
programmet blir blokkert av nettleserene */
let leser = new FileReader();

/* Her settes en eventlistener "onload", da kjøres når du laster inn en ny fil.
Funksjonen setter inn bildet, som variabelen leser finner, inn i "src" til bildeelementet.
*/
leser.onload = function(){
    imgElement.src = leser.result;
  };

  /* Her settes en eventlistener som gjør at funksjonen kjøres når du laster inn en ny fil i input elementet med type fil.
  Denne funksjonen leser filen som blir oppgitt som en DataURL, dette gjør at bildet kan vises uten at programmet må laste ned bildet.
  */
fileInput.addEventListener('change', function(){
  leser.readAsDataURL(fileInput.files[0]);
});

/* Funksjonen oppdaterInformasjonen utføres når brukeren fyller ut informasjon om seg selv.
    Hensikten til funksjonen er å oppdatere informasjonen samtidig som brukeren fyller den inn.
    Funksjonen tar verdien til inputfeltet (value) og ID-en til teksten som skal oppdateres (elementID) som paramtere.
    Så oppdateres innerHTML-en til elementet.
    Hvis elementID er lik navnH1header så kjøres forerkort funskjonen, som oppdaterer forerkort-teksten på visittkortet.
*/
function oppdaterInformasjon(value, elementID) {
    document.getElementById(elementID).innerHTML = document.getElementById(value).value;
    if(elementID == 'navnH1header') {
        forerkort('forerkortInput','forerkortH3header');
    }
}

/*
    Funksjonen forerkort() utføres når brukeren huker av på førerkort spørsmålet.
    Hensikten til funksjonen er å oppdatere teksten på visittkorter som omhandler om brukeren har førerkort eller ikke.
    Funksjonen tar verdien til inputfeltet (value) og ID-en til teksten som skal oppdateres (elementID) som paramtere.
    Hvis verdien til inputfeltet er false, så oppdateres teksten på visittkortet til 'Navnet til personen' har ikke førerkort.
    Hvis verdien til inputfeltet er true, så oppdateres teksten på visittkortet til 'Navnet til personen' har førerkort.
*/
function forerkort(value, element) {
    console.log(document.getElementById(value).checked);
    if(document.getElementById(value).checked == false) {
        document.getElementById(element).innerHTML = document.getElementById('navnH1header').innerHTML + " har ikke førerkort";
    }
    else {
        console.log(document.getElementById('navnH1header').innerHTML + " har førerkort");
        document.getElementById(element).innerHTML = document.getElementById('navnH1header').innerHTML + " har førerkort";
    }
}

/*
    Funskjonen fargevelger kjøres når man velger farge på "Farge på bakgrunn" spørsmålet.
    Hensikten til funksjonen er å sette bakgrunnsfargen på visittkortet til fargen som blir valgt.
    Funksjonen tar verdien til inputfeltet (value) og ID-en til teksten som skal oppdateres (elementID) som paramtere.
    Funksjonen setter bakgrunnsfargen på visittkotet til fargen som blir valgt.
*/

function fargevelger(value, element) {
    document.getElementById(element).style.backgroundColor = document.getElementById(value).value;
}

/*
    Funksjonen rammevelger  kjøres når man huker av på radioknappene på 'Ramme rundt' spørsmålet.
    Hensikten til funksjonen er å oppdatere rammen rundt visittkortet til rammen som blir valgt.
    Funksjonen tar elementet som skal få border og farge som parametere.
    Så settes border rundt elementet til fargen som ble valgt + "5px solid".
*/
function rammevelger(element, color) {
document.getElementById(element).style.border = "5px solid " + String(color);
}

/*
    Funksjonen visittkortHoyde kjøres når en bruker skriver inn i feltet Høyde på kortet i vh .
    Hensikten til funksjonen er å bytte høyden på visittkortet til den høyden som blir bestemt i "vh"-enhet.
    Funksjonen tar verdien til inputfeltet (value) og ID-en til teksten som skal oppdateres (elementID) som paramtere.
    Funskjonen sjekker så om visittkorthøyden blir for høy, hvis den ikke er for høy, så settes høyden til parameteren value, sin .value.
*/
function visittkortHoyde(value, element) {
    if(document.getElementById(String(value)).value <= 89){
        document.getElementById(element).style.height = document.getElementById(String(value)).value + "vh";
    }
    else {
        alert("Visittkortet blir for høyt");
    }
}

/*
    Funksjonen visittkortBredde kjøres når en bruker skriver inn i feltet Bredde på kortet i vw .
    Hensikten til funksjonen er å bytte bredden på visittkortet til den høyden som blir bestemt i "vw"-enhet.
    Funskjonen virker på samme måte som visittkortHoyde().
*/
function visittkortBredde(value, element) {
    if(document.getElementById(String(value)).value <= 76){
        document.getElementById(element).style.width = document.getElementById(String(value)).value + "vw";
    }
    else {
        alert("Visittkortet blir for bredt");
    }
    }

/*
    Funksjonen egenskapFontSizeEndrer() kjøres når brukeren skriver i 'Skriftstørrelse i px' feltet.
    Hensikten til funksjonen er å endre skriftstørrelsen til teksten på visittkortet.
    Funksjonen tar id, som er id-en til elementet man vil bytte skriftstørrelsen på, og value, som er id-en til inputfeltet, som parametere.
    Deretter settes id-en sin fontsize til value.value + 'px'.
*/
function egenskapFontSizeEndrer(id, value) {
    document.getElementById(String(id)).style.fontSize = document.getElementById(String(value)).value +  "px";
}
/*
    Funksjonen egenskapFontColorEndrer() kjøres når brukeren skriver i 'Skriftfarge navn' feltet.
    Hensikten til funskjonen er å bytte skriftfargen til teksten på visittkortet.
    Funksjonen tar id, som er id-en til elementet man vil bytte skriftfargen på, og value, som er id-en til inputfeltet, som parametere.
    Deretter settes id-en sin skriftfarge til value.value.
*/
function egenskapFontColorEndrer(id, value) {
    console.log(document.getElementById(String(value)).value);
    document.getElementById(String(id)).style.color = document.getElementById(String(value)).value;
}

/*
    Funksjonen egenskapFontTypeEndrer() utføres når brukeren skriver 'Font 0-7'-boksen.
    Hensikten til funksjonen er å endre på skrifttypen til elementet som blir valgt i menyen over 'Font 0-7'-boksen.
    Funksjonen tar id, som er id-en til elementet du vil bytte skrifttypen til, og value, som er id-en til input feltet til 'Font 0-7'-boksen, som parametere.
    I funksjonen så sjekkes det om id-en er visittkortet, hvis id-en er det, så settes skrifttypen til alle elementene på visittkortet til en av skrifttypene fra skrifttyper-listen ved hjelp av value.value.
    Hvis id-en ikke er det, så settes skrifttypen til det elementet som er valgt i menyen over 'Font 0-7'-boksen til en av skrifttypene fra skrifttyper-listen ved hjelp av value.value.
*/
function egenskapFontTypeEndrer(id, value) {
    const skrifttyper = ['Helvetica', 'Garamond', 'Futura', 'Bodoni', 'Arial', 'Times New Roman', 'Verdana', 'Rockwell'];
    if (String(id) == "visittkortet") {
        document.querySelectorAll("#visittkortet > div > h1, #visittkortet > div > h2, #visittkortet > div > h3").forEach(el => el.style.fontFamily = skrifttyper[document.getElementById(value).value]);
    }
    else{
        document.getElementById(String(id)).style.fontFamily = skrifttyper[document.getElementById(value).value];
    }
}

/*
    Funksjonen egenskaperVisning() utføres når man velger element i listen under 'Endre Egenskaper'.
    Hensikten til funksjonen er å vise riktige egenskaper til hvert element.
    funksjonen tar id-en til elementet du velger som input.
    Så vises alle egenskaper unntatt høyde på bilde og bredde på bilde hvis id-en ikke er bildeIMGheader, hvis id-en er det
    så vises høyden på bilde og bredden på bilde.
*/
function egenskaperVisning(id) {
    let hoydePaaBildeKnapp = document.getElementById('hoydePaaBildeKnapp');
    let hoydePaaBilde = document.getElementById('hoydePaaBilde');
    let breddePaaBildeKnapp = document.getElementById('breddePaaBildeKnapp');
    let breddePaaBilde = document.getElementById('breddePaaBilde');
    let skrifttypeLabel = document.getElementById('skrifttypeLabel');
    let skriftfargeLabel = document.getElementById('skriftfargeLabel');
    let skriftstorrelseLabel = document.getElementById('skriftstorrelseLabel');
    let fargePaaRammen = document.getElementById('fargePaaRammen');
    let typeRammee = document.getElementById('typeRammee');
    let tykkelsePaaRammen = document.getElementById('tykkelsePaaRammen');
    
    if(String(id) != "bildeIMGheader" && String(id) != "rammen") {
        hoydePaaBilde.style.visibility = "hidden"
        hoydePaaBildeKnapp.style.visibility = "hidden";
        breddePaaBilde.style.visibility = "hidden"
        breddePaaBildeKnapp.style.visibility = "hidden";
        skrifttypeLabel.style.visibility = "visible";
        skriftfargeLabel.style.visibility = "visible";
        skriftstorrelseLabel.style.visibility = "visible";
        fargePaaRammen.style.visibility = 'hidden'
        typeRammee.style.visibility = 'hidden'
        tykkelsePaaRammen.style.visibility = 'hidden'
    }
    else if(String(id) == "bildeIMGheader") {
        skrifttypeLabel.style.visibility = "hidden";
        skriftfargeLabel.style.visibility = "hidden";
        skriftstorrelseLabel.style.visibility = "hidden";
        hoydePaaBilde.style.visibility = "visible"
        hoydePaaBildeKnapp.style.visibility = "visible";
        breddePaaBilde.style.visibility = "visible"
        breddePaaBildeKnapp.style.visibility = "visible";
        fargePaaRammen.style.visibility = 'hidden'
        typeRammee.style.visibility = 'hidden'
        tykkelsePaaRammen.style.visibility = 'hidden'

    }
    else {
        skrifttypeLabel.style.visibility = "hidden";
        skriftfargeLabel.style.visibility = "hidden";
        skriftstorrelseLabel.style.visibility = "hidden";
        hoydePaaBilde.style.visibility = "hidden"
        hoydePaaBildeKnapp.style.visibility = "hidden";
        breddePaaBilde.style.visibility = "hidden"
        breddePaaBildeKnapp.style.visibility = "hidden";
        fargePaaRammen.style.visibility = 'visible'
        typeRammee.style.visibility = 'visible'
        tykkelsePaaRammen.style.visibility = 'visible'
    }
}


/*
    Funksjonen bildeHoydeVelger() utføres når man trykker på knappen 'reset' ved siden av 'Høyde i px'.
    Hensikten til funksjonen er å sette høyden på bildet tilbake tilbake til starten.
*/

function bildeHoydeVelger() {
    document.getElementById('bildeIMGheader').style.height = '30vh'
    document.getElementById('hoydePaaBildeInput').value = "";
}

/*
    Funksjonen bildeBreddeVelger() utføres når man trykker på knappen 'reset' ved siden av 'Bredde i px'.
    Hensikten til funksjonen er å sette bredden på bildet tilbake tilbake til starten.
*/

function bildeBreddeVelger() {
    document.getElementById('bildeIMGheader').style.width = '30vw'
    document.getElementById('breddePaaBildeInput').value = "";
}

/*
    Funksjonen bildeBreddeVelger utføres når man trykker på en av boksene under 'Slå av og på elementer'.
    Hensikten til funksjonene er å vise og gjemme elementene på visittkortet i forhold til om en boks er huket av eller ikke.
    Funksjonen tar verdi, som er id-en til boksen som blir huket av, og elementID, som er id-en til elementet du vil at skal vises.
    Funksjonen bare sjekker om checkboxen er huket av eller ikke, hvis den er det vises ikke objektet, hvis checkboxen er det så vises ikke elmentet. 
*/

function toggleElementer(verdi, elementID) {
if(document.getElementById(verdi).checked) {
    document.getElementById(elementID).style.visibility = "visible";
}
else {
    document.getElementById(elementID).style.visibility = "hidden";
}
}

function rammeTypeVelger() {
document.getElementById('visittkortet').style.borderStyle = document.getElementById('rammeEgenskaper').value;
}