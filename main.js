var isDevelopment = process.env.NODE_ENV === 'development';

var app = require('app'),
  BrowserWindow = require('browser-window'),
  Tray = require('tray');

var connect;

if (isDevelopment) {
  connect = require('electron-connect').client;
}

var express = require('express');
var webApp = express();
var port = 3838;

webApp.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});
webApp.use('/css', express.static(__dirname + '/dist/css'));
webApp.use('/js', express.static(__dirname + '/dist/js'));

var server = webApp.listen(port, function () {
  console.log('app listening at http://%s:%s', server.address().address, server.address().port);
});


if (isDevelopment) {
  require('electron-debug')();
  require('crash-reporter').start();
}

var mainWindow = null;

app.on('window-all-closed', function () {
  app.quit();
});


function toggleWindow (win, bounds) {
  if (win && win.isVisible()) {
    hideWindow(win);
  } else {
    showWindow(win, bounds);
  }
}

function showWindow (win, bounds) {
  win.setPosition(bounds.x, bounds.y);
  win.show();
}

function hideWindow (win) {
  win.hide();
}

var appIcon = null;

app.on('ready', function () {

  // from http://www.flaticon.com/free-icon/youtube-symbol_24530
  var iconPath = __dirname + '/icons/tray.png';

  appIcon = new Tray(iconPath);

  appIcon.window = new BrowserWindow({
    width: 400,
    height: 540,
    show: false,
    frame: false,
    resizable: isDevelopment
  });

  appIcon.window.loadURL('http://127.0.0.1:'+ port);

  if (isDevelopment) {
    connect.create(appIcon.window);
    appIcon.window.openDevTools();
  }

  appIcon.window
    .on('closed', function () {
      appIcon.window = null;
    })
    .on('blur', function () {
      hideWindow(appIcon.window);
    });

  appIcon
    .on('click', function (e, bounds) {
      toggleWindow(appIcon.window, bounds);
    });
});
