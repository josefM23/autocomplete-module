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

## Sammanfattning

Jag kommer att fortsätta försöka förbättra mina funktioner genom att hålla dem korta och fokuserade på en enda uppgift, även om det fortfarande känns utmanande att implementera fullt ut. Samtidigt kommer jag att lägga mer fokus på tydliga och beskrivande namn för att göra koden mer begriplig för andra programmerare.