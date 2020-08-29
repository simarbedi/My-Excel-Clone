const electron = require("electron")
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ejs = require("ejs-electron");

ejs.data({
    "title":"Excel App",
    "rows":100,
    "cols":26
})

function createWindow(){
    const win = new BrowserWindow({
      webPreferences:{
        nodeIntegration:true
      }
    });
    win.loadFile("index.ejs").then(function(){
        win.removeMenu();
        win.maximize();
        win.webContents.openDevTools();
    });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.