var app = require('app'),
  BrowserWindow = require('browser-window'),
  Tray = require('tray');


var http = require('http');
var static = require('node-static');

var connect;

if (process.env.NODE_ENV === 'development') {
  connect = require('electron-connect').client;
}

var staticServer = new static.Server('./dist');

http.createServer(function (request, response) {
  request.addListener('end', function () {
    staticServer.serve(request, response);
  }).resume();
}).listen(8080);


if (process.env.NODE_ENV === 'development') {
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
    resizable: (process.env.NODE_ENV === 'development')
  });

  appIcon.window.loadURL('http://127.0.0.1:8080');

  if (process.env.NODE_ENV === 'development') {
    connect.create(appIcon.window);
  }

//  if (process.env.NODE_ENV === 'development') {
    appIcon.window.openDevTools();
//  }

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

