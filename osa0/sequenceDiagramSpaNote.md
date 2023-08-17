```mermaid
sequenceDiagram
    participant browser as Browser
    participant server as Server

    Note over Browser: User is on the SPA version and decides to create a new note.

    Note over Browser: User enters text into the note field and clicks "Save" or "Add" in the SPA interface.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: Contains the content of the new note in JSON format.

    activate server
    Note over Server: Server processes the POST request, saves the new note to the database.

    server-->>browser: Response (e.g., 200 OK, JSON confirmation)
    deactivate server

    Note over Browser: JavaScript processes the server's response. If successful, the new note is added to the list dynamically without a full page reload.
