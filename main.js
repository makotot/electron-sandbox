var app = require('app'),
  BrowserWindow = require('browser-window'),
  client = require('electron-connect').client;

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  mainWindow = new BrowserWindow({
    width: 500,
    height: 400
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  client.create(mainWindow);

  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});

