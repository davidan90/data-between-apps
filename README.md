# data-between-apps
This package create a global object to share info between apps.

## Install
```javascript
npm i data-between-apps
```

## Usage
1. Initialize the service:
    ```javascript
    DataExporter.initialize('AppName', store);
    ```
    This create an object in window.appName

2. Add more stores:
    ```javascript
    AppName.addStore(store: Object);
    ```
3. Get something from store:
    ```javascript
    AppName.getFromStore(ref: String | Array<String>);
    ```
4. Get all store:
    ```javascript
    AppName.getAll();
    ```
5. Set something in store:
    ```javascript
    AppName.getFromStore(ref: String | Array<String>, value: Any);
    ```

