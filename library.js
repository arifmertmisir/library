const addBookButton = document.querySelector(".addBook-button");
const saveButton = document.querySelector(".save-button");
const cancelButton = document.querySelector(".cancel-button");
const titleField = document.querySelector("#titleField");
const authorField = document.querySelector("#authorField");
const pagesField = document.querySelector("#pagesField");
const isReadField = document.querySelector("#isReadField");
const yearField = document.querySelector("#yearField");
const dialog = document.querySelector("#dialog");
const book = document.querySelector(".book");
const myLibrary = [];

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});
saveButton.addEventListener("click", addBookToLibrary);
cancelButton.addEventListener("click", () => dialog.close());

function Book(id, title, author, pages, isRead, year) {
  if (!new.target) {
    console.log(
      "You must instantiate the Book constructor with the new keyword!",
    );
    return;
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead === "yes" ? true : false;
  this.year = year;
}

Book.prototype.showBookDetails = function () {
  return `${this.title}, ${this.author}, ${this.pages}, ${this.isRead ? "Read" : "Not read"}, ${this.year}`;
};

Book.prototype.updateIsReadStatus = function () {
  this.isRead = !this.isRead;
};

function resetAllFields() {
  titleField.value = "";
  authorField.value = "";
  pagesField.value = "";
  isReadField.value = "";
  yearField.value = "";
}

function addBookToLibrary(e) {
  e.preventDefault();
  const id = crypto.randomUUID();
  const title = titleField.value;
  const author = authorField.value;
  const pages = pagesField.value;
  const isRead = isReadField.value;
  const year = yearField.value;

  const book = new Book(id, title, author, pages, isRead, year);
  myLibrary.push(book);
  display();
  dialog.close();
  resetAllFields();
}

function display() {
  book.textContent = "";

  myLibrary.forEach((item) => {
    const div = document.createElement("div");
    const para = document.createElement("p");
    const icon = document.createElement("span");
    const deleteButton = document.createElement("button");
    const updateReadButton = document.createElement("button");

    para.textContent = item.showBookDetails();
    icon.classList.add("mdi", "mdi-trash-can-outline");
    deleteButton.classList.add("remove-button");
    updateReadButton.textContent = "Update read status";
    updateReadButton.classList.add("update-read-button");
    div.classList.add("wrapper-para");

    deleteButton.appendChild(icon);
    div.appendChild(para);
    div.appendChild(deleteButton);
    div.appendChild(updateReadButton);
    book.appendChild(div);

    deleteButton.addEventListener("click", () => {
      const index = myLibrary.findIndex((book) => book.id === item.id);
      myLibrary.splice(index, 1);
      book.removeChild(div);
    });

    updateReadButton.addEventListener("click", () => {
      item.updateIsReadStatus();
      para.textContent = item.showBookDetails();
    });
  });
}
