# Meltwater Coding Exercise

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Redaction Exercise

This Redaction Exercises will allow a user to enter multiple phrases or keywords to redact in a document. The document is entered in the textarea and then below that, the redacted version of the document is displayed.

### Tradeoffs/Design Issues
One of the tradeoffs I needed to consider was a styling concern. I wanted to highlight any redacted words in the redacted document using the `<mark>`tags. However, initial attempts proved unsuccessful due to exposure to XSS. 

One big issue I ran across was how to redact phrases. For instance, if I redact the phrase tool, originally, my Regular Expression would replace any instance of the character combination for tool, not the word tool. Tool would become XXXX and Toadstool would become ToadsXXXX.

The other big concern I had was that I originally designed this so it would replace any instance of a word with X * the length of the original word. I think if this application's main purpose is privacy, than keeping a constant phrase(XXXX) it get's replaced with helps keeps things private. 

### Exercise Part 2
- I would store the data in 3 separate SQL tables.
    1. Documents table, to store the original document and a fully redacted document
    2. A phrases table
    3. A pivot table(document_redacted_phrases). This table will also have a field on it for clearance level
These three tables will allow me to keep the original unaltered document for users that have a high enough clearance level, but as the clearance levels decrease, the amount of redaction that occurs increases.

The user would have to make an API request like such whenever they are creating a document with redacted phrases

```js
//POST /api/documentsw
{
    document_text: "Some document that should be redacted because of references of aliens. Special Agent John Smith was the agent in charge on this case. Incident happened October 1st, 2021",
    phrases: [
        {
            phrase: "aliens",
            clearance_level: 9
        },
        {
            phrase: "John Smith",
            clearance_level: 6
        },
        {
            phrase_id: 1 // referencing an existing phrase incident in the database,
            clearance_level: 1
        }

    ],
    redacted_text: "Some document that should be redacted because of references of XXXX. Special Agent XXXX was the agent in charge on this case. XXXX happened October 1st, 2021"
}

```

A post with this data will store one new `document`, two new `phrases` and then three `document_redacted_phrases`.

When a user looks up this redacted document, depending on their clearance level, it will return the document with the correct redactions. For External consumers, they will only have access to the `redacted_text` which is the most redacted version of the document, due to the fact that they don't have any clearance.

This structure will also allow us to search for redacted documents with specific phrases via the document_redacted_phrases table,
It would look something like 
```sql
SELECT documents.text, document_redacted_phrases.clearance_level, redacted_phrases.phrase FROM documents 

JOIN document_redacted_phrases ON documents.document_id = document_redacted_phrases.document_id 

JOIN redacted_phrases ON redacted_phrases.redacted_phrase_id = document_redacted_phrases.redacted_phrase_id 

WHERE redacted_phrases.phrase LIKE '%aliens%';
```