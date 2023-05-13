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
