
```mermaid
sequenceDiagram
    participant browser as Browser
    participant server as Server

    Note over Browser: User enters text into the note field and clicks "Save".

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: Contains the content of the new note.

    activate server
    Note over Server: Server processes the POST request, saves the new note to the database.

    server-->>browser: Response (e.g., 200 OK, redirect to /notes)
    deactivate server

    Note over Browser: Browser might refresh to show the updated list of notes or display a success message.
