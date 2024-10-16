https://github.com/josefM23/autocomplete-module/tree/musicmatch

Application name 	MusicMatch
API key 	5e53511c35203f7d4025c4b6dc1de4cc
Shared secret 	ebc8bf5bbc72229491c67d38d3af1e4c
Registered to 	jm224ae

arbete: brach AC modul till MM och försåk att koopla till netifly, men vill behölla vite, för att testa enkelt (behövs då inte pusha vid varje ändring.)
stora ändringar i struktren, dvs att alt blir mvc inte separat modul fr autocompletande. bättre struktur, osv
 nu är strukturen klart, beövs ändringi flesta importer. har det index.js i varje fil som i stort sätt bara importerar undeligande indexer eller sälva moduler/classer med undertag att indexen i js importerar dynamisk musicMatch.js för bättre prestanda. och initialiserar domen. nu är det att ha model som jag har tänkt blir bara lastFmModel, det är det ända som jag vill/behöver gömma från användare, view - behövs inte ... har inte mer databas baserat saker som motsvarar models i MVC conceptet.
 Nu har jag iplemneterat lastFmModel och musicMatch controler i den sätt som jag är van, dvs många komentarer i både svenska och engelska, det fungerar, nu blir det att göra den finare och med Clean Code boken förbättra koden.. och göra den mer OO kod ....  och sen blir det tester, och till slut att istället av vite ska bara vara netifly som drivsätnig.
 visa saket är konstiga, dvs att jag vill läta låten, artist från första bokstav, osv...
 nu har jag någon som funerar i grunden och gör vad jag vill, nu ska det bara att det gör hur jag vill (och hur du Daniel vill)