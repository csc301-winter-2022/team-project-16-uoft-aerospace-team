const { app, BrowserWindow, Menu } = require("electron");

if (require('electron-squirrel-startup')) app.quit();

const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    resizable: false,
    webPreferences: {
      frame: false,
      nodeIntegration: true,
      enableRemoteModule: true, //this must be true
      preload: path.join(__dirname, '/backend/')
    }
  });

  win.loadFile('build/index.html');

  const mainMenu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(mainMenu);
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});