let array: any[] = [];

addEventListener('load', (event) => {
  getTable();
});

function addToCart() {
  const ID = Number((document.getElementById('id') as HTMLInputElement)!.value);
  const Amount = (document.getElementById('amount') as HTMLInputElement)!.value;
  var table = document.getElementById('cartTable') as HTMLTableElement;
  const rows = table!.rows.length;
  var row = table.insertRow(rows);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = String(ID);
  cell2.innerHTML = JSON.stringify(array.find((x) => x.id == ID).name);
  cell3.innerHTML = String(Amount);
  (document.getElementById('id') as HTMLInputElement)!.value = '';
  (document.getElementById('amount') as HTMLInputElement)!.value = '';
  return;
}

function pushLists() {
  var table: HTMLTableElement = document.getElementById(
    'cartTable'
  ) as HTMLTableElement;
  const ID = Number((document.getElementById('id') as HTMLInputElement)!.value);
  const Amount = (document.getElementById('amount') as HTMLInputElement)!.value;
  pushList(table, 'order');
  clearPage(table);
  window.location.reload();
  return;
}

function pushList(
  table: HTMLTableElement,
  title: string,
) {
  const rowCount = Number(table.rows.length) - 1;
  let array = [];
  for (var i = 1, row; (row = table.rows[i]); i++) {
    const product = row.cells[0].innerHTML.toString()
    const quantity = row.cells[2].innerHTML.toString()
    const order = `[${product}, ${quantity}]`
    array.push(order);
  }
  const arrayString = String(array);
  const url = window.location.href;

  let nextURL = `${url}?`;

  nextURL = `${nextURL}${title}=${arrayString}`;

  const nextTitle = document.querySelector('title')!.innerText;
  const nextState = {
    additionalInformation: document.querySelector('title')!.innerText,
  };

  window.history.pushState(nextState, nextTitle, nextURL);
  return array;
}

function clearPage(table: HTMLTableElement) {
  const rowCount = Number(table.rows.length) - 1;
  for (let i = 0; i < rowCount; i++) {
    table.deleteRow(1);
  }
}

async function getTable() {
  let table: HTMLTableElement;
  const fetchTable = await fetch('/store/products').then((r) => r.json());
  for (var i = 0; i < fetchTable.length; i++) {
    array.push(fetchTable[i]);
  }
  console.log(array)
}
