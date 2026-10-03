# FEPPLA:
- Ta bort sidoeffekter från importer
- Behövs DOM fortfarande bindas med this? (behöver kunna skicka REF till DOM)
- Ska hantering av implicit node för Ref och Dom kunnas bytas ut på samma sätt som reactive?
- Minnesanvändning + CPU
- Konvertera till TS och transpilera källkoden. Gå över till Vite?
- Bryta loss watch och reactive till något eget? De är användingsbara utan ref().
  - Går dock med att köra ref(document) som workaround, de kommer dock inte gå att disposa
  - Nog en fördel att knyta livscyklar till existens av DOM noder tills vidare.

# REF
- Fixa bättre approach till liveness, nextframe + isConnected kostar redigt mycket, använda mutation observer
  - liveness gäller både Element och Node, så node är inte queryable direkt. Bättre isf att lägga i en batcher
- Early done for live based callbacks
- DTS files
- .method() kanske?
- Benchmarka mot andra ramverk https://github.com/krausest/js-framework-benchmark
- Döda all state properties vid cleanup i init?
- Kanske Observe APIs (resize, intersection, mutation, etc)..? Dock inte lika självklar relation till noden
- Shorthand utility function?

# DOM
- Öka upp concurreny för defer? Eller handlar det bara om bättre vetskap och att utvecklaren själv får optimera?
  - Här finns möjlighet för egen tagged template literal för att registrera alla template promises concurrent!
    - concurrent`...`
    - Om man alltid använder concurrent så kommer djupa components alltid bubbla upp till närmaste defer.
- döp om clearBlock och appendBlock till clear och append bara?
- Pattern för att lösa Vue Suspense! (https://vuejs.org/guide/built-ins/suspense.html)
  - Fog för en primitive som tar emot async html template. Eventuellt också att ha an async-renderer som skapar ett promise med en toString som genererar error ifall den invokas.
  - Finns också caset med att komponent djupt ner i hierarkin vill vara async och trigga suspense boundary
    - Det skulle kunna lösas ifall kontext är tillgänligt iom vi behöver undvika prob/await drilling
- Component injection för att undvika prop-drilling?
- Stöd för Vue keepAlive eller är det något som extensions får beröra?
  - Vue keepAlive handlar bara om att cacha state, har inget med DOM att göra
  - MoveBefore kan faktiskt rädda oss här!
- DOM animations
- DTS files
- Explicit mode
- defineComponent i utils för typade components
- Add teleport method...?
- Förenkla when till att inte vara baserad på repeat
- Testa .textContent = '' istället för .innerHTML, kanske parsas snabbare
- ChatGPT bollplank
  - swap()       → reactive block replacement
  - animate()    → enter/exit/transition animations
- Weakmap istället för expando props för repeat..?
- Förbättra repeat sortering genom "Longest increasing subsequence" eller annat
- Add timeout if domPlaceholderId is not found? Or keep deferred callback always until resolved? Gäller ref också
- NodeIterator has some buggy memory issue in Chromium, lead to removals taking forever in some cases
  - Buggrapport till chromium
- Gör det nån skillnad att använda template eller div för renderTemplate?
- Använd moveBefore i repeat för existerande buckets

# DEV
- Behöver rensa upp instances, växer obegränsat nu
- Needs to work with swapped reactivity, use lower primitives?

# UTILS
- observeRootForAddedNodes() bör vara optional ifall man bara vill använda Feppla inom ShadowDOM

# CASES
- Pattern for rendering "component slots"
- Favicon?
- Document title?
