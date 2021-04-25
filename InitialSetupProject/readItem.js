
// const function1 = (url) => {
//     console.log('first func' + url)
// }
// const function2 = () => {
//     return 'myText from module'
// }
// module.exports = (url) => {
//     func1: function1(url)

// }


const { BrowserWindow } = require('electron');

//offscreen window

let offscreenWindow;

module.exports = (url, callback) => {

    offscreenWindow = new BrowserWindow({
        width: 500,
        height: 300,
        show: false,
        webPreferences: {
            offscreen: true
        }
    });
    offscreenWindow.loadURL(url);

    offscreenWindow.webContents.on('did-finish-load', e => {
        let title = offscreenWindow.getTitle();


        //get screenshote

        offscreenWindow.webContents.capturePage().then((image) => {

            let screenshot = image.toDataURL();
            let obj = { title: title, screenshot: screenshot, url: url }

            callback(obj);
            // offscreenWindow.quit();
            offscreenWindow = null
        })
    })
}