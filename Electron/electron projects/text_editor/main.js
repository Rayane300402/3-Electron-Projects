const electron = require("electron");
const { app, BrowserWindow, ipcMain, dialog, Menu } = electron;
const fs = require("fs");
let win = undefined;
let filePath = undefined

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
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

ipcMain.on("save", async (event, text) => {
  //save the text to a file

//   if (filePath === undefined) {
//     dialog.showSaveDialog(win, { defaultPath: "filename.txt" }, (fullpath) => {
//       if (fullpath) {
//         filePath = fullpath;
//         writeToFile(text);
//       }
//     });
//   } else {
//     writeToFile(text);
//   }
if (filePath === undefined) {
    const result = await dialog.showSaveDialog(win, {
      defaultPath: "filename.txt",
      filters: [{ name: "Text Files", extensions: ["txt"] }],
    });
    if (result.filePath) {
      filePath = result.filePath;
      writeToFile(text);
    }
  } else {
    writeToFile(text);
  }
});

// function writeToFile(data) {
//   fs.writeFile(filePath, data, (err) => {
//     if (err) console.log("there was an error", err);
//     console.log("file has been saved");
//     win.webContents.send("saved", "success");
//   });
// }

function writeToFile(data) {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.log("there was an error", err);
        win.webContents.send("saved", "error");
      } else {
        console.log("file has been saved");
        win.webContents.send("saved", "success");
      }
    });
  }

const menuTemplate = [
  ...(process.platform == "darwin"
    ? [
        {
          label: app.getName(),
          submenu: [{ role: "about" }],
        },
      ]
    : []),
  {
    label: "File",
    submenu: [
      {
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click() {
          win.webContents.send("save-clicked");
        },
      },

      {
        label: "Save As",
        accelerator: "CmdOrCtrl+Shift+S",
        click() {
          filePath = undefined;
          win.webContents.send("save-clicked");
        },
      },
    ],
  },

  { role: "editMenu" },
  { role: "viewMenu" },
];
