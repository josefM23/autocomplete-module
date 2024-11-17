# Clean Code Practices in MusicMatch Project

This document reflects the principles and practices applied in the development of the MusicMatch project, structured around the key chapters of "Clean Code". It includes personal reflections, real examples from the project, and areas for future improvement.

---

# 1. Namngivning (Kapitel 2)

De flesta av reglerna och principerna i kapitel 2 är redan välbekanta, då vi tidigare har fått mycket träning i dessa områden. Principer som att undvika variabel- och tabellnamn som är för uppenbara eller förvirrande är standardpraxis, liksom att använda namn som är lätta att uttala och förstå. Några regler, som att undvika att använda prefix som "-m" för medlemmar av en klass, känns dock föråldrade. 

Det som jag fortfarande funderar över är längden på namnen – jag har blivit tränad i att längden på ett namn inte spelar så stor roll, då autofyll och kopiering minskar behovet av att skriva ut långa namn. Annars tycker jag att boken är enkel att förstå och läsa. Det kan vara en utmaning att byta perspektiv och skriva kod för andra programmerare snarare än att bara skriva för att bli bedömd. När det gäller att använda programmeringsterminologi i namngivning tycker jag att det är något jag kan bli bättre på, eftersom det hjälper till att förtydliga intentionen med koden.

---

### Principer som är tillämpliga på min 
kod:
- **Use Intention-Revealing Names:** Namnen ska vara tydliga och beskriva exakt vad variabler, funktioner och klasser gör.
- **Avoid Disinformation:** Namnen får inte leda till förvirring eller missförstånd.
- **Use Pronounceable Names:** Namnen ska vara lätta att uttala och förstå.
- **Make Meaningful Distinctions:** Namnge variabler och funktioner på ett sätt som tydligt särskiljer deras syfte.

### Namnändringar:
För att förbättra tydligheten och läsbarheten har jag gjort några mindre namnjusteringar:

- `handleInput` → `onUserInput`
  - **Motivering:** Mer beskrivande av vad funktionen gör. Den reagerar på användarinmatning.
  
- `filterUniqueData` → `getUniqueLowercaseData`
  - **Motivering:** Gör tydligare att data returneras i unik och gemen form.
  
- `performSearch` → `searchSuggestions`
  - **Motivering:** Tydligare att denna metod söker igenom förslag.
  
- `showSuggestions` → `displaySuggestions`
  - **Motivering:** Ordet "show" kan vara för allmänt. "Display" ger mer tydlighet om visning av förslag.

---

# 2. Funktioner (Kapitel 3)

Den första regeln om att hålla funktioner korta och göra dem ännu kortare om möjligt är lite problematisk för mig. Jag ser mig själv som en ganska dålig programmerare och har ibland svårt att starta om från början utan att ha tidigare projekt att referera till. Jag föredrar därför ofta en längre funktion framför flera små, eftersom jag tycker att det blir enklare att hålla koll på koden. Logiken är min starka sida.

Trots det inser jag vikten av att förbättra detta och att varje funktion bara ska göra en sak. Det känns dock svårt att dela upp funktioner i för många små delar. Jag tycker att det är enklare att hantera två saker i en funktion, vilket känns som en lagom nivå. Jag håller dock med om att användningen av beskrivande namn för funktioner är en bra idé, särskilt eftersom jag ofta använder många radkommentarer som skulle kunna ersättas med tydligare funktionsnamn.

Argument i funktioner är också något jag funderar över – ibland verkar det förvirrande att inte ha några argument, och i vissa fall kan det vara svårt att undvika det.

---

### Funktionerna ska följa principerna:
- **Do One Thing:** Varje funktion bör endast utföra en sak.
- **Small!:** Funktionerna ska vara små och lätta att förstå.
- **Use Descriptive Names:** Namnge funktioner så att de beskriver exakt vad de gör.
- **Function Arguments:** Minimera antalet argument, helst ett.

### Förslag och lösningar:

#### Förslag 1: `onUserInput`-metoden

- **Problem:** Funktionen hanterar både inmatningsvalidering och anrop till sökning eller rensning av förslag. Detta bryter mot principen om att en funktion endast ska göra en sak.
  
- **Lösning:** Dela upp ansvaret genom att skapa en separat metod för validering av inmatningen.

#### Förslag 2: `searchSuggestions`-metoden

- **Problem:** Funktionen både filtrerar förslag och visar resultaten. Dessa två uppgifter bör vara separerade för att följa principen om enkla, fokuserade funktioner.

- **Lösning:** Dela upp så att varje funktion hanterar sitt eget ansvarsområde. `searchSuggestions` hanterar bara sökningen, och en separat funktion (`displayFilteredSuggestions`) tar hand om visningen.

#### Förslag 3: `renderSuggestions`-metoden

- **Problem:** Funktionen gör två saker: den renderar varje förslag och hanterar klickhändelser för dessa förslag. Detta bryter mot principen "Do One Thing".

- **Lösning:** Skapa en separat metod för att hantera klickhändelser (`createSuggestionElement`) så att `renderSuggestions` bara ansvarar för att lägga till list-element i DOM:en.

### Slutliga justeringar:
- `onUserInput` gör nu bara en sak: den hanterar flödet baserat på om inmatningen är giltig eller inte. Valideringen sker i en separat metod (`isValidInput`).
- `searchSuggestions` ansvarar endast för att filtrera data, medan `displayFilteredSuggestions` ansvarar för att visa resultaten.
- `renderSuggestions` hanterar endast DOM-manipulation, medan skapandet av element och hantering av klickhändelser är flyttat till `createSuggestionElement`.

## 3. Kommentarer (Kapitel 4)

### Reflektioner och tillämpningar

I MusicMatch-projektet används kommentarer sparsamt och endast där de tillför betydande värde, såsom att förklara komplex logik eller designbeslut. Målet har varit att göra koden så självförklarande som möjligt, men jag har vissa undantag:

- **Många redundanta kommentarer i tester**: Eftersom testning är en relativt ny process för mig har jag valt att inkludera fler kommentarer där, även om de ibland är överflödiga. Detta hjälper mig att förstå och navigera koden bättre under ändringar.
- **JSDoc för publika klasser och metoder**: Alla publika klasser och metoder använder JSDoc för att säkerställa att utvecklare enkelt kan förstå deras syfte och användning. (det är fär många jsdoc kometarer med lnu.lint standdarden -dvs att det måset vara en för clasen och en för constructor - käns inte bra men har de entlien Mats-kodstanard.)
- **Kommentarer för designbeslut**: Kommentarer används för att förklara varför en viss lösning valts, snarare än att beskriva vad koden gör.

Exempel på en designkommentar i projektet:

```javascript
/**
 * Handles user input, fetches suggestions from Last.fm, and updates autocomplete.
 * If the query is invalid or the API request fails, it clears suggestions.
 *
 * This method is intentionally kept short by delegating responsibilities to
 * helper methods such as #isValidQuery() and #fetchSuggestions().
 */
async #handleUserInput() {
  ...
}
```

### Utmaningar och lärdomar
- Jag har märkt att redundanta kommentarer ibland kan göra det svårt att se viktigare delar av koden. Mitt fokus framöver är att minska sådana kommentarer genom att förbättra namngivning och struktur.

---

## 4. Formatering (Kapitel 5)

### Tillvägagångssätt och tillämpningar

Formatering är avgörande för läsbarhet och underhåll. I MusicMatch-projektet har följande tillämpats:

- **Vertikal formatering**: Metoder som är relaterade placeras nära varandra, medan orelaterade block separeras med tomma rader.
- **Horisontell linjelängd**: Alla rader hålls under 120 tecken för att undvika horisontell rullning.
- **Kodens ordningsföljd**: Jag placerar ibland funktioner som `clearSuggestions` sist i klassen, även om detta bryter mot strikt vertikal formatering, eftersom jag tycker det gör koden mer logisk att läsa från en processperspektiv.

Exempel på kodstruktur:

```javascript
class MusicMatchController {
  #inputElement;
  #suggestionsElement;

  constructor(inputElement, suggestionsElement) {
    this.#inputElement = inputElement;
    this.#suggestionsElement = suggestionsElement;
    this.#initialize();
  }

  async #handleUserInput() { /* Hanterar användarinmatning */ }

  #clearAutocompleteSuggestions() { /* Rensar förslag */ }
}
```

### Reflektioner
- Jag har lärt mig att vertikal formatering ibland kan kännas motstridig, särskilt när jag vill följa logiken i hur koden körs.

---

## 5. Objekt och datastrukturer (Kapitel 6)

### Tillämpningar i MusicMatch

Projektet följer objektorienterade principer där möjligt och skiljer tydligt mellan objekt och datastrukturer:

- **Inkapsling**: Privata fält (t.ex. `#apiKey`) och metoder används flitigt för att dölja interna implementationer.
- **Law of Demeter**: Objekt interagerar endast med sina direkta beroenden.

Exempel från `LastfmModel`:

```javascript
export class LastfmModel {
  #apiKey;
  constructor(apiKey = import.meta.env.VITE_LASTFM_API_KEY) {
    this.#apiKey = apiKey;
    if (!this.#apiKey) {
      throw new Error("API key for Last.fm is not defined.");
    }
  }

  async searchTracks(query) {
    this.#validateQuery(query);
    const url = this.#buildSearchUrl(query);
    return await this.#fetchData(url);
  }
}
```

### Reflektion
- Min målsättning har varit att hålla klasser små och fokuserade, men jag kämpar ibland med att hitta balansen mellan att dela upp klasser och att hålla dem hanterbara.

---

## 6. Felhantering (Kapitel 7)

### Tillämpningar

Felhantering är kritisk i MusicMatch eftersom vi integrerar med externa API:er. Följande strategier används:

- **Undantag istället för returvärden**: Exempelvis kastar `LastfmModel` undantag vid ogiltiga API-svar.
- **Ingen användning av null**: Null används inte, vilket minimerar risken för oväntade fel. " det är dåliga att använda null men det är värre at går forbi den."

Exempel på felhantering i `LastfmModel`:

```javascript
async #fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data from Last.fm: ${error.message}`);
  }
}
```

---

## 7. Gränser (Boundaries) (Kapitel 8)

### Implementering av API-gränser

Gränser hanteras genom att kapsla in API-anrop i `LastfmModel`. Detta gör det enkelt att byta ut API:et eller hantera förändringar.

### Exempel: Boundary Testing

I testfilerna hanteras olika typer av fel, som nätverksproblem och ogiltiga API-svar:

```javascript
test("should handle API errors gracefully", async () => {
  global.fetch.mockImplementationOnce(() => Promise.reject(new Error("Network Error")));

  await expect(musicMatchController.triggerUserInput()).rejects.toThrow(
    "Failed to fetch suggestions: Network Error"
  );
});
```

---

## 8. Enhetstester (Kapitel 9)

### Testdriven utveckling

Jag har inte strikt följt TDD i detta projekt. Istället skrevs testerna efter den huvudsakliga implementationen, vilket ledde till att inte så många tester behövde justeras under refaktorisering.

### Reflektion
- Jag har tvärtom TDD eftesom i föra laboratoiret hade jag skivt tester ganska tidtig och sen tog det nästan 50% av tiden tt ändra de efter refrakotirng.osv....

### Testprinciper
- **Independence**: Alla tester är fristående och påverkar inte varandra.
- **Self-validating**: Tester returnerar tydliga booleanska resultat.

Exempel på ett test:

```javascript
test("should fetch and display suggestions on valid input", async () => {
  inputElement.value = "test";
  await musicMatchController.triggerUserInput();
  expect(suggestionsElement.children.length).toBe(2);
});
```

---

## 9. Klasser (Kapitel 10)

### Implementering och principer

- **Dependency Injection**: `MusicMatchController` tar in sina beroenden via konstruktorn, vilket gör koden mer flexibel och testbar.

Exempel:

```javascript
constructor(inputElement, suggestionsElement, lastfmModel) {
  this.#inputElement = inputElement;
  this.#suggestionsElement = suggestionsElement;
  this.#lastfmModel = lastfmModel;
}
```

---

## 10. Systems (Kapitel 11)
 
### Reflektioner och implementation
- Detta kapitel tycker jag, var lite för mycket java baserad, så jag har inte så mycket till min kod i detta.

- **Separation of Concerns**: Implementeras genom att dela upp koden i modeller, kontroller och vyer enligt MVC.
- **Dependency Injection**: Används för att separera skapande och användning av objekt. MusicMatch-projektet används Dependency Injection i flera klasser för att separera skapande och användning av objekt, vilket gör koden mer testbar och modulär. Ett tydligt exempel är i MusicMatchController, där LastfmModel och AutocompleteModule injiceras via konstruktorn.
- **Tidig validering**: Alla beslut om systemarkitektur har gjorts med fokus på flexibilitet och underhåll.

---

## Sammanfattning
Reflektionen över Clean Code-boken har haft en stor påverkan på min kodningsmetodik i MusicMatch-projektet. Genom de tio kapitlen har jag fått värdefulla insikter i hur man skapar ren och underhållbar kod. Här är de viktigaste lärdomarna:

   ### 2. Namngivning: 
   Fokus på intention-revealing names och att undvika disinformation har förbättrat läsbarheten i koden. Längre namn accepteras när de ger tydligare syfte.

   ### 3.Funktioner: 
   Att bryta ner funktioner till mindre och mer fokuserade delar har varit en utmaning men nödvändigt för underhållbarhet. Genom att minimera argument och ge funktioner beskrivande namn har jag gjort dem lättare att förstå.

   ### 4.Kommentarer: 
   Kommentarer används sparsamt och där de tillför värde, t.ex. för att förklara designbeslut. Överflödiga kommentarer har minskats, även om testerna fortfarande innehåller fler för att stödja inlärningsprocessen.

   ### 5.Formatering: 
   En konsekvent kodstruktur, både vertikalt och horisontellt, har implementerats för att förbättra läsbarheten.

   ### 6.Objekt och datastrukturer: 
   Inkapsling och separation mellan objekt och datastrukturer säkerställer tydlighet och minskar beroenden.

   ### 7.Felhantering: 
   Genom att använda undantag istället för returvärden och undvika null har felhanteringen blivit robust och tydlig.

   ### 8.Gränser: 
   Integrationen med externa system, som Last.fm API, är inkapslad i specifika klasser för att minska beroenden och underlätta byte av API.

   ### 9.Enhetstester: 
   Även om TDD inte tillämpades fullt ut, har tester varit centrala för att validera kodens funktionalitet och flexibilitet.

   ### 10.Klasser: 
   Klasser följer principer som Single Responsibility och Dependency Injection, vilket gör dem mer modulära och testbara.

   ### 11.System: 
   Separation of concerns har implementerats med en MVC-arkitektur för att uppnå skalbarhet och flexibilitet.

