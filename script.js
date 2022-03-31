let myNotes = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));
const tabBtn = document.getElementById("tab-btn");

if (notesFromLocalStorage) {
  myNotes = notesFromLocalStorage;
  render(myNotes);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myNotes.push(tabs[0].url);
    localStorage.setItem("myNotes", JSON.stringify(myNotes));
    render(myNotes);
  });
});

function render(notes) {
  let listItems = "";
  for (let i = 0; i < notes.length; i++) {
    listItems += `
            <li>
                    ${notes[i]}
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myNotes = [];
  render(myNotes);
});

inputBtn.addEventListener("click", function () {
  myNotes.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myNotes", JSON.stringify(myNotes));
  render(myNotes);
});
