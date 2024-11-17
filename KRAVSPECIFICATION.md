# Kravspecifikation för MusicMatch

## 1. Funktionella krav

### 1.1 Användargränssnitt

- **HTML-baserad startsida**  
  - MusicMatch ska ha en enkel, responsiv HTML-sida där användare kan interagera med applikationen.
  - **Sökfält**: Ett sökfält ska finnas tillgängligt för användare där de kan skriva in musikrelaterade termer (artister, låtar) för att få förslag.
  - **Förslagslista**: En dynamisk lista under sökfältet som visar autocomplete-förslag baserat på användarens inmatning.

### 1.2 Autocomplete-funktion

- **Autocomplete Module**  
  - MusicMatch använder en anpassad autocomplete-modul för att hantera inmatning och sökförslag.
  - Modulen bearbetar användarens inmatning och hämtar förslag i realtid från Last.fm API.
  - Förslag innehåller artistnamn och låttitlar och visas dynamiskt under inmatningsfältet.

### 1.3 Integration med Last.fm API

- **API-anrop**  
  - MusicMatch använder Last.fm API för att hämta dynamisk musikdata (artister och låtar).
  - API-anrop sker när användaren har skrivit minst tre tecken i sökfältet, och resultaten visas som förslag under fältet.

### 1.4 Användarinteraktion

- **Sökförslag**  
  - När användaren börjar skriva i sökfältet hämtar autocomplete-modulen förslag och visar dessa i realtid.
  - Användaren kan välja ett förslag genom att klicka på det.

---

## 2. Icke-funktionella krav

### 2.1 Tillförlitlighet

- **API-fallhantering**  
  - Om API-anrop misslyckas (på grund av nätverksproblem eller andra problem), visas ett felmeddelande för användaren, och inga förslag visas.

- **Modulens stabilitet**  
  - Autocomplete-modulen hanterar fel som kan uppstå vid användarens inmatning (t.ex. inga förslag funna eller ogiltiga inmatningar).

---

## 3. Drift och underhåll

### 3.1 Deployment

- **Netlify Deployment**  
  - Applikationen hostas på Netlify och publiceras automatiskt från en branch i GitHub-repositoryt.  
  - Varje commit i huvudbranchen för MusicMatch bygger och publicerar automatiskt på Netlify.

### 3.2 Versionshantering

- **GitHub**  
  - Projektet använder GitHub för versionshantering och deploy via Netlify.  
  - Ändringar hanteras via pull requests och kontinuerlig integration.

---

## 4. Testning

### 4.1 Automatiserade tester

- **Jest-tester**  
  - **Autocomplete-funktion**: Testar att modulen korrekt returnerar unika, filtrerade förslag.  
  - **API-anrop**: Testar att API-anrop returnerar korrekt data vid giltiga sökningar.  
  - **Felhantering**: Testar att appen hanterar olika fel (t.ex. tomma inmatningar och nätverksproblem).  

**Exempel på testfall:**  

- Kontrollera att autocomplete-modulen filtrerar bort dubbletter.  
- Testa att API-anrop returnerar korrekt data baserat på användarens inmatning.  
- Kontrollera att felmeddelanden visas vid API-fel.

### 4.2 Manuella tester

- **Användarflöde**  
  - Testa att en användare kan skriva in en term i sökfältet och se realtidsförslag.  
  - Kontrollera att användaren kan välja ett förslag och att resultatet visas korrekt.  

- **Responsivitet**  
  - Testa att webbapplikationen fungerar på olika enheter och skärmstorlekar.  

- **Felhantering**  
  - Testa hur applikationen hanterar tomma sökningar och nätverksfel.  

---

## 5. Framtida funktioner

### 5.1 Förbättrad användarupplevelse

- **Fler filter**: Möjlighet att filtrera resultat baserat på exempelvis genre eller årtal.

### 5.2 Fler databaskällor

- **Integration med fler API**: Möjlighet att integrera fler musiktjänster som datakällor för autocomplete.
