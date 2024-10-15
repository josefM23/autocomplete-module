Kravspecifikation för MusicMatch
1. Funktionella krav
1.1 Användargränssnitt

    HTML-baserad startsida:
        MusicMatch ska ha en enkel, responsiv HTML-sida där användare kan interagera med applikationen.
        Sökfält: Ett sökfält ska finnas tillgängligt för användare där de kan skriva in musikrelaterade termer (artister, låtar, album) för att få förslag.
        Förslagslista: En dynamisk lista under sökfältet som visar autocomplete-förslag baserat på användarens inmatning.
        Resultatvisning: Sökresultat visas på en separat vy eller i en resultatsida (t.ex., via SearchView.js) när användaren väljer ett förslag från listan.

1.2 Autocomplete-funktion

    Autocomplete Module:
        MusicMatch ska använda en anpassad version av en autocomplete-modul för att hantera inmatning och sökförslag.
        Modulen ska kunna bearbeta användarens inmatning och hämta förslag i realtid från Last.fm API (eller liknande).
        Förslag ska innehålla relevant information såsom artistnamn, låttitlar eller album, och visas dynamiskt under inmatningsfältet.

1.3 Integration med Last.fm API

    API-anrop:
        MusicMatch ska använda Last.fm API för att hämta dynamisk musikdata (artister, låtar, album).
        API-anrop ska ske när användaren har skrivit minst tre tecken i sökfältet, och resultaten ska visas som förslag under fältet.

1.4 Användarinteraktion

    Sökförslag:
        När användaren börjar skriva i sökfältet ska autocomplete-modulen automatiskt hämta förslag och visa dessa i realtid.
        Användaren ska kunna välja ett förslag genom att klicka på det.
    Sökresultatsida:
        När ett förslag väljs ska användaren antingen dirigeras till en ny sida som visar mer detaljerad information om låten/artisten/albumet, eller så visas resultaten direkt på samma sida.

2. Icke-funktionella krav
2.1 Prestanda

    Snabb svarstid: (kanske)
        Autocomplete-modulen ska kunna returnera sökförslag inom 500 millisekunder efter att användaren börjar skriva.
        API-anrop till Last.fm bör vara optimerade för att minimera latens.

2.2 Tillgänglighet

    Responsiv design: (kanske)
        Användargränssnittet ska vara fullt responsivt och fungera på både datorer och mobila enheter.

2.3 Tillförlitlighet

    API-fallhantering:
        Om API-anrop misslyckas (på grund av nätverksproblem eller andra problem), ska ett felmeddelande visas för användaren och inga förslag ska visas.
    Modulens stabilitet:
        Den anpassade autocomplete-modulen måste vara robust och hantera fel som kan uppstå vid användarens inmatning (t.ex. inga förslag funna, ogiltiga inmatningar).

3. Drift och underhåll
3.1 Deployment

    Netlify Deployment:
        Applikationen ska vara hostad på Netlify och publiceras automatiskt från en branch i GitHub-repositoryt. Varje gång en commit görs på den aktuella branchen (ex. musicmatch), ska applikationen automatiskt byggas och publiceras på Netlify.

3.2 Versionshantering

    GitHub:
        Projektet ska använda GitHub för versionshantering och deploy via Netlify. Ändringar i koden ska hanteras genom pull requests och kontinuerlig integration.

4. Testning
4.1 Automatiserade tester

    Jest-tester:
        Autocomplete-funktion: Testa att autocomplete-modulen korrekt returnerar unika, sorterade förslag baserat på användarinmatning.
        API-anrop: Testa att API-anropen till Last.fm returnerar korrekta data när användaren har skrivit in giltiga sökningar.
        Felhantering: Testa att appen hanterar fel korrekt (t.ex. tomma inmatningar, nätverksproblem med API).

Exempel på testfall med Jest:

    Kontrollera att setData() i autocomplete-modulen filtrerar bort dubbletter.
    Testa att API-anrop returnerar korrekt data baserat på inmatning av användaren.
    Kontrollera att felmeddelanden visas om API-anrop misslyckas.

4.2 Manuella tester

    Användarflöde:
        Testa att en användare kan skriva in en term i sökfältet och se realtidsförslag.
        Kontrollera att när en användare väljer ett förslag, visas mer detaljerad information om låten/artisten/albumet.
    Responsivitet:
        Testa att webbapplikationen fungerar korrekt på olika enheter och skärmstorlekar (mobil, surfplatta, dator).
    Felhantering:
        Testa hur applikationen hanterar olika typer av fel, som tomma sökningar eller om API
        inte svarar.

5. Framtida funktioner
5.1 Förbättrad användarupplevelse

    Fler filter: (kanske)
        Planer finns att införa filter för sökningar baserat på genre, album eller årtal.

5.2 Fler databaskällor

    Integration med fler API (kanske)
    :
        I framtiden kan fler musiktjänster läggas till, vilket skulle innebära fler datakällor för autocomplete-funktionen.