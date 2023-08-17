```mermaid
sequenceDiagram
    participant browser as Browser
    participant server as Server

    Note over Browser: User enters the URL https://studies.cs.helsinki.fi/exampleapp/spa in the browser.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: SPA HTML document (including embedded JS for dynamic content)
    deactivate server

    Note over Browser: Browser renders the initial SPA page. The embedded JS starts executing.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json (or a similar endpoint for data)
    activate server
    server-->>browser: JSON data for notes (e.g., [{ "content": "SPA is cool", "date": "2023-1-1" }, ... ])
    deactivate server

    Note over Browser: The browser's JavaScript processes the JSON data and dynamically updates the SPA content without a full page reload.
