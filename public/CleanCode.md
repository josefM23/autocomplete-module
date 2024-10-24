# Clean Code - Sammanfattning

Denna sammanfattning inkluderar nyckelprinciper från *Clean Code* av Robert C. Martin (Uncle Bob), med kopplingar till implementationen i **MusicMatch**-projektet. Genom att följa dessa principer har koden blivit renare, lättare att underhålla och mer modulär.

---

## Kapitel 1: Clean Code

Ren kod är enkel, tydlig och fri från onödiga komplexiteter. Det är kod som är lätt att underhålla och utveckla över tid.

### I **MusicMatch**:
- **Meningsfulla namn** har använts för metoder och variabler. T.ex. `setData` byttes till `updateSuggestionsList` för att bättre beskriva vad metoden gör.

---

## Kapitel 2: Meningsfulla namn

Använd tydliga och beskrivande namn för variabler, metoder och klasser som reflekterar deras syfte. Undvik korta och otydliga namn.

### I **MusicMatch**:
- Namn som `onUserInput`, `fetchSuggestions`, och `clearAutocompleteSuggestions` ger en tydlig förståelse för vad varje metod gör.

---

## Kapitel 3: Funktioner

Funktioner ska vara små och fokuserade på att göra en enda sak. Funktioner som gör för mycket bör delas upp i mindre, mer fokuserade delar.

### I **MusicMatch**:
- Större metoder har delats upp i mindre metoder, såsom `#getQuery`, `#isValidQuery`, och `#fetchSuggestions`, för att följa principen om små, fokuserade funktioner.

---

## Kapitel 4: Kommentarer

Kommentarer ska användas sparsamt och endast när det behövs. Redundanta kommentarer som beskriver vad en tydlig kod redan gör, bör undvikas.

### I **MusicMatch**:
- Kommentarer används på ett sådant sätt att de förklarar komplex kod, men onödiga eller redundanta kommentarer har tagits bort.

---

## Kapitel 5: Formatering

Formatering gör koden mer läsbar och strukturerad. Bra formatering innebär att hålla en tydlig vertikal och horisontell struktur:

- **Vertikal densitet**: Relaterade metoder och variabler ska hållas nära varandra.
- **Horisontell densitet**: Håll rader korta (max 120 tecken) och undvik onödiga linjeavbrott.
- **Indentering och alignment**: Kod ska vara jämnt intryckt och rätt justerad för bättre läsbarhet.

### I **MusicMatch**:
- Kodindentering och tomma rader används för att separera logiska block och göra koden enklare att följa.

---

## Kapitel 6: Objekt och datatyper

Det är en myt att allt ska vara ett objekt. Objekt ska dölja data och exponera beteenden, medan datatyper ska vara enkla och tydliga. 

- **Law of Demeter**: Prata endast med dina närmaste "vänner" (objekt), inte med främmande objekt.
- **Hybrider**: Kombinerar data och beteende, men kan vara svåra att hantera.

### I **MusicMatch**:
- Klasser som `LastfmModel` är strukturerade för att exponera beteende genom metoder, snarare än att exponera sin interna data direkt.

---

## Kapitel 7: Felhantering

Använd undantag istället för felkoder. Fel ska hanteras genom att kasta undantag snarare än att returnera specialvärden, som null. 

### I **MusicMatch**:
- Undantag används i `LastfmModel` för att hantera API-fel, och null returneras inte. Istället kastas undantag när ett fel inträffar, vilket gör felhanteringen tydligare.

---

## Kapitel 8: Boundaries

Gränser (boundaries) handlar om att hantera interaktionen mellan din applikation och tredjepartskod, såsom externa API:er. Du bör testa hur din kod fungerar när dessa gränser beter sig oväntat.

### I **MusicMatch**:
- `LastfmModel` fungerar som en boundary mellan applikationen och Last.fm API. Här är boundary testing viktigt för att hantera externa API-fel korrekt.

---

## Kapitel 9: Enhetstester

Testdriven utveckling (TDD) handlar om att skriva tester först och sedan skriva den nödvändiga koden för att få testerna att passera. Tester bör vara snabba, oberoende och upprepbara.

- **F.I.R.S.T.-principerna**: Tester ska vara *Fast, Independent, Repeatable, Self-validating*, och *Timely*.

### I **MusicMatch**:
- Koden är skriven med tanke på testbarhet. Användning av Dependency Injection gör enhetstester lättare att implementera.

---

## Kapitel 10: Klasser

Klasser bör vara små och fokusera på ett enda ansvar. Principen om ett enda ansvar (Single Responsibility Principle, SRP) är avgörande för att skapa modulär och underhållbar kod.

### I **MusicMatch**:
- `MusicMatchController` följer SRP genom att hantera endast interaktionen mellan användaren och API:et, medan `LastfmModel` tar hand om API-anropen.

---

## Kapitel 11: System

Systemarkitekturer ska byggas med separation av ansvar och beroendeinjektion (Dependency Injection) för flexibilitet och testbarhet. Cross-cutting concerns som loggning och felhantering ska separeras från affärslogik.

### I **MusicMatch**:
- Dependency Injection används för att göra klasser som `MusicMatchController` och `LastfmModel` mer flexibla och enkla att testa.
- Systemet är strukturerat med tydliga gränser mellan controller, modell och vy.

---

## Additional Concepts

### Common Closure Principle (COP)
Klasser som förändras av samma skäl bör grupperas i samma modul eller paket. Detta minskar risken för att förändringar sprider sig över hela systemet.

### Dependency Inversion Principle (DIP)
Högre nivåmoduler ska inte bero på lägre nivåmoduler. Både högre och lägre nivåer ska bero på abstraktioner, vilket gör systemet mer flexibelt och testbart.

---

## Boundary i Last.fm API

`LastfmModel` fungerar som en boundary mellan din applikation och Last.fm API. Boundary testing är viktigt för att säkerställa att din applikation fungerar korrekt även när API:et misslyckas eller returnerar oväntade data.

---

## Objektorienterade principer: SRP, COP, DIP

### **Single Responsibility Principle (SRP)**
Varje klass har ett enda ansvar. I **MusicMatch** hanterar `LastfmModel` API-interaktion, `MusicMatchController` styr användarinteraktion, och `AutocompleteModule` visar sökresultaten.

### **Common Closure Principle (COP)**
Klasser som förändras av samma skäl grupperas tillsammans för att minimera spridningen av förändringar.

### **Dependency Inversion Principle (DIP)**
Högre nivåmoduler som `MusicMatchController` beror på abstraktioner (som `LastfmModel` och `AutocompleteModule`), vilket gör systemet mer flexibelt och testbart.

---

## Felhantering i MusicMatch

Undantag används för att hantera fel vid API-anrop och för korta sökfrågor. Genom att kasta undantag hanterar du fel mer effektivt än att returnera tomma listor eller felkoder. Detta gör felhantering mer robust och tydlig i koden.

