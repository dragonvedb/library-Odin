const myLibrary = [];

function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  return `${this.name} by ${this.author}, ${this.pages} pages long, ${
    this.readStatus ? "already read" : "not read yet"
  }.`;
};

function addToLibrary(name, author, pages, readStatus) {
  const newBook = new Book(name, author, pages, readStatus);
  myLibrary.push(newBook);
}

const cardsContainer = document.querySelector("#cards-container");

function createCard(book) {
  function createElement(tag, parentElem, ...elemClasses) {
    const newElement = document.createElement(tag);

    for (const elemClass of elemClasses) {
      newElement.classList.add(elemClass);
    }

    parentElem.appendChild(newElement);
    return newElement;
  }

  const newCard = createElement("article", cardsContainer, "book-card");

  const bookItself = createElement("section", newCard, "book-itself");
  const bookBlock = createElement("div", bookItself, "book-block");
  const bookCover = createElement("div", bookItself, "book-cover");
  bookCover.textContent = book.name;

  const bookInfo = createElement("section", newCard, "book-info");
  const bookName = createElement("p", bookInfo, "book-name");
  const bookAuthor = createElement("p", bookInfo, "book-author");
  const bookDate = createElement("p", bookInfo, "book-date");
  const bookLength = createElement("p", bookInfo, "book-length");

  const cardButtonGroup = createElement("section", newCard, "card-buttons");
  const readBtn = createElement("button", cardButtonGroup, "read-btn");
  const editBtn = createElement("button", cardButtonGroup, "edit-btn");
  const removeBtn = createElement("button", cardButtonGroup, "remove-btn");
}

addToLibrary("The Hobbit", "J.R.R. Tolkien", 259, false);
addToLibrary("Game of Thrones", "George R.R. Martin", 548, false);
addToLibrary("City of Sol", "Eugene Rudashevsky", 305, true);

createCard(myLibrary[0]);
/* createCard(myLibrary[1]);
createCard(myLibrary[2]); */

function allInfo() {
  for (const book of myLibrary) {
    console.log(book.info());
  }
}
