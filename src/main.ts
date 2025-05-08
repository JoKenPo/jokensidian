import { app, BrowserWindow, globalShortcut } from 'electron';

// Ambient declarations for Vite environment variables
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

import path from 'node:path';
import started from 'electron-squirrel-startup';
import getResourcePath from './utils/get-assets-path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Icon development mode
// app.dock.setIcon(path.join(getResourcePath('logo.png')))

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1050,
    height: 700,
    // frame: false,
    icon: path.join(getResourcePath('logo.png')),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  globalShortcut.register('CmdOrCtrl+k', () => {
    console.log('evento')
    mainWindow.webContents.send('focus-search-input');
  })
};

// run this at early startup, before app.on('ready')
app.commandLine.appendSwitch('--no-sandbox')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
