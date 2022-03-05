const { app, BrowserWindow, Menu } = require("electron");

const path = require('path');
const isDev = require('electron-is-dev');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    resizable: false,
  });

  // win.loadURL(
  //     isDev
  //       ? 'http://localhost:3000'
  //       : `file://${path.join(__dirname, '../build/index.html')}`
  // );

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/../build/index.html`);

  //win.webContents.openDevTools()

  // build menu from template
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