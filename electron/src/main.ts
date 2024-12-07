import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fork } from 'child_process';

let mainWindow: BrowserWindow | null = null;

function createWindow() {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        const nuxtIndex = 'file://' + path.join(app.getAppPath(), 'nuxt', 'index.html').replace(/\\/g, '/');
        mainWindow.loadURL(nuxtIndex);
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// ----------------------------------------

ipcMain.handle('getArgs', () => {
    return process.env.NODE_ENV === 'development' ? [] : process.argv.slice(1);
});

// ----------------------------------------

const workerPath = path.join(__dirname, 'io-worker.js');
let ioWorker = fork(workerPath);

// worker 통신을 Promise 기반으로 변경
ipcMain.handle('read-file', async (event, filePath) => {
    return new Promise((resolve) => {
        ioWorker.send(filePath);
        ioWorker.once('message', (data) => {
            resolve(data);
        });
    });
});

app.whenReady().then(createWindow);