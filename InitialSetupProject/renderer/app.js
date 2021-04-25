
const { ipcRenderer, ipcMain } = require('electron');
const items = require('./item');


let showModal = document.getElementById('show-modal'),
    closeModal = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    itemUrl = document.getElementById('url'),
    addItem = document.getElementById('add-item'),
    search = document.getElementById('search'),
    readItem = document.getElementsByClassName('read-item')

//Disable and eable modal button

ipcRenderer.on('menu-show-modal', () => {
    triggerShowModal();
})

const toggleModalButons = () => {

    if (addItem.disabled === true) {
        addItem.disabled = false;
        addItem.style.opacity = 1;
        addItem.innerText = 'Add Item'
        closeModal.style.display = 'inline';

    }
    else {
        addItem.disabled = true;
        addItem.style.opacity = 0.5;
        addItem.innerText = 'addding.....'
        closeModal.style.display = 'none';
    }
}
showModal.addEventListener('click', () => {
    triggerShowModal();
})

const triggerShowModal = () => {
    modal.style.display = 'flex';
    itemUrl.focus();
}

search.addEventListener('keyup', (e) => {

    Array.from(document.getElementsByClassName('read-item')).forEach((item) => {
        let hasMatch = item.innerText.toLowerCase().includes(search.value);
        if (hasMatch)
            item.style.display = 'flex'
        else
            item.style.display = 'none'
    })
})
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
})


// readItem.addEventListener('click', (e) => {
//     console.log(e);
// })
addItem.addEventListener('click', (event) => {
    //  debugger;
    if (itemUrl.value) {

        //send it to main porcess
        ipcRenderer.send('new-item', itemUrl.value);
        toggleModalButons()
        console.log(itemUrl.value);
    }
})

ipcRenderer.on('new-item-success', (e, val) => {

    console.log('item sent from main process' + val);
    items.addNewItem(val, true);
    toggleModalButons();
    modal.style.display = 'none';
    itemUrl.value = '';
    //    console.log(resosneData.data);

})

itemUrl.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        addItem.click();
    }
})