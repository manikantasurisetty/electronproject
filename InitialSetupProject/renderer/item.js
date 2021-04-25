
const items = document.getElementById("items");
const fs = require('fs')
let isNew = false;
let readerJs;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
    readerJs = data.toString()
});

window.addEventListener('message', e => {

    //delete item at certain index
    console.log(e.data);

    items.removeChild(document.getElementsByClassName('read-item selected')[0]);
    // let index = (JSON.parse(localStorage.getItem('items'))).forEach((item, i) => {

    //     if (item.url == document.getElementsByClassName('read-item selected')[0].dataset.url) {
    //         return i;
    //     }

    // })
    //this.storage.splice(index, 1) 
})


let readerWindowCOnfig = {
    maxWidth: 2000,
    maxHeight: 2000,
    width: 1200,
    height: 100,
    backgroundColor: 'red',
    nodeIntegration: 0,
    contextIsolation: 1

}


exports.storage = JSON.parse(localStorage.getItem('items')) || [];
exports.save = () => {
    localStorage.setItem('items', JSON.stringify(this.storage))
}
exports.addNewItem = (item, isNew) => {

    let divItem = document.createElement('div')
    divItem.setAttribute('class', 'read-item');
    divItem.setAttribute('data-url', item.url)
    divItem.innerHTML = `<img src=${item.screenshot}><h2>${item.title}</h2>`;

    //debugger;
    if (isNew) {
        this.storage.push(item);
        this.save();
    }
    divItem.addEventListener('click', (e) => {
        this.selected(e);
    });
    divItem.addEventListener('dblclick', (e) => {
        this.open();
    })
    items.appendChild(divItem);
}

exports.selected = (e) => {
    if (document.getElementsByClassName('selected')[0])
        document.getElementsByClassName('selected')[0].classList.remove('selected');
    e.currentTarget.classList.add('selected')

}

exports.open = () => {
    if (!this.storage.length) return;
    let selectedItem = document.getElementsByClassName('read-item selected')[0]

    if (!selectedItem)
        return;
    let contentUrl = selectedItem.dataset.url;
    let readerWindow = window.open(contentUrl, '');
    readerWindow.eval(readerJs);
    //console.log(contentUrl);
}
this.storage.forEach(item => this.addNewItem(item, false))

