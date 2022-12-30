"use strict";
let array = [];
addEventListener('load', (event) => {
    getTable();
});
function addToCart() {
    const ID = Number(document.getElementById('id').value);
    const Amount = document.getElementById('amount').value;
    var table = document.getElementById('cartTable');
    const rows = table.rows.length;
    var row = table.insertRow(rows);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = String(ID);
    cell2.innerHTML = JSON.stringify(array.find((x) => x.id == ID).name);
    cell3.innerHTML = String(Amount);
    document.getElementById('id').value = '';
    document.getElementById('amount').value = '';
    return;
}
function pushLists() {
    var table = document.getElementById('cartTable');
    const ID = Number(document.getElementById('id').value);
    const Amount = document.getElementById('amount').value;
    let arrayID = pushList(table, 0, 'products', true);
    let arrayAmount = pushList(table, 0, 'amounts', false);
    clearPage(table);
    window.location.reload();
    return;
}
function pushList(table, cellIndex, title, isFrist) {
    const rowCount = Number(table.rows.length) - 1;
    let rowIndex = 0;
    let array = [];
    const cells = table.querySelectorAll('tr');
    for (var i = 1, row; (row = table.rows[i]); i++) {
        rowIndex = rowIndex + 1;
        array.push(rowIndex);
    }
    const arrayString = String(array);
    const url = window.location.href;
    let nextURL;
    if (isFrist == true)
        nextURL = `${url}?`;
    else
        nextURL = `${url}&`;
    nextURL = `${nextURL}${title}=${arrayString}`;
    const nextTitle = document.querySelector('title').innerText;
    const nextState = {
        additionalInformation: document.querySelector('title').innerText,
    };
    window.history.pushState(nextState, nextTitle, nextURL);
    return array;
}
function clearPage(table) {
    const rowCount = Number(table.rows.length) - 1;
    for (let i = 0; i < rowCount; i++) {
        table.deleteRow(1);
    }
}
async function getTable() {
    let table;
    const fetchTable = await fetch('/store').then((r) => r.json());
    for (var i = 0; i < fetchTable.length; i++) {
        array.push(fetchTable[i]);
    }
    console.log(array);
}
