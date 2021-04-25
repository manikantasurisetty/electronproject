//alert('alert from separate file')
//Create a button to mark as done
let readingClose = document.createElement('div');
readingClose.innerText = 'Done';

readingClose.style.position = 'fixed';
readingClose.style.bottom = '15px';
readingClose.style.padding = '5px 10px';
readingClose.style.color = 'white';
readingClose.style.background = 'blue';


readingClose.addEventListener('click', (e) => {
    window.opener.postMessage('item-done', '*');
    window.close();
})
document.getElementsByTagName('body')[0].append(readingClose);
