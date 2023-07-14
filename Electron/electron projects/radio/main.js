const electron = require("electron");
const { app, BrowserWindow } = electron;
let win = undefined;

app.on("ready", () => {
    console.log("App is now ready");
    win = new BrowserWindow({
        width: 900,
        height: 500,
        minWidth: 900,
        maxWidth: 900,
        minHeight: 500,
        maxHeight: 500,
        resizable: false,
        webPreferences: {
        nodeIntegration: true,
        //nodeIntegration is set to true to allow the use of node modules in the renderer process
        contextIsolation: false,
        },
    });
    
    win.loadFile("index.html");
});