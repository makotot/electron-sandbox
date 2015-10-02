var app = require('app'),
  BrowserWindow = require('browser-window'),
  Tray = require('tray'),
  client = require('electron-connect').client;

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


function showWindow (win, bounds) {
  win.setPosition(bounds.x, bounds.y);
  win.show();
}

function hideWindow (win) {
  win.hide();
}

var appIcon = null;

app.on('ready', function () {

  // http://www.flaticon.com/free-icon/youtube-symbol_24530
  var iconPath = __dirname + '/icons/tray.png';

  appIcon = new Tray(iconPath);

  appIcon.window = new BrowserWindow({
    width: 300,
    height: 500,
    show: false,
    frame: false
  });

  appIcon.window.loadUrl('file://' + __dirname + '/index.html');

  client.create(appIcon.window);

  appIcon.window
    .on('closed', function () {
      appIcon.window = null;
    })
    .on('blur', function () {
      hideWindow(appIcon.window);
    });

  appIcon
    .on('clicked', function (e, bounds) {
      showWindow(appIcon.window, bounds);
    });
});

