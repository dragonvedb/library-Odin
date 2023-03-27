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
  const cardTitle = createElement("div", newCard, "book-title");
  cardTitle.textContent = `${book.name} by ${book.author}`;
  /* newCard.appendChild(cardTitle);
  cardsContainer.appendChild(newCard); */
}

addToLibrary("The Hobbit", "J.R.R. Tolkien", 259, false);
addToLibrary("Game of Thrones", "George R.R. Martin", 548, false);
addToLibrary("City of Sol", "Eugene Rudashevsky", 305, true);

/* createCard(myLibrary[0]);
createCard(myLibrary[1]);
createCard(myLibrary[2]); */

function allInfo() {
  for (const book of myLibrary) {
    console.log(book.info());
  }
}
