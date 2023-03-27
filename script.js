const myLibrary = [];

function Book(name, author, date, chapters, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.date = date;
  this.chapters = chapters;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  return `${this.name} by ${this.author}, ${this.pages} pages long, ${
    this.readStatus ? "already read" : "not read yet"
  }.`;
};

function addToLibrary(name, author, date, chapters, pages, readStatus) {
  const newBook = new Book(name, author, date, chapters, pages, readStatus);
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
  const blockWidth = 10 + Math.floor(book.pages / 25);
  bookBlock.setAttribute("style", `height: ${blockWidth}px`);
  const bookCover = createElement("div", bookItself, "book-cover");
  const coverFontSize = () => {
    if (book.name.length < 50) {
      return 3 - book.name.length * 0.05;
    }
    return 1;
  };
  bookCover.setAttribute("style", `font-size: ${coverFontSize()}rem`);
  bookCover.textContent = book.name;

  const bookInfo = createElement("section", newCard, "book-info");
  const bookName = createElement("p", bookInfo, "book-name");
  bookName.textContent = book.name;
  const bookAuthor = createElement("p", bookInfo, "book-author");
  bookAuthor.textContent = `by ${book.author}`;
  const bookDate = createElement("p", bookInfo, "book-date");
  bookDate.textContent = `Publication date: ${book.date}`;
  const bookLength = createElement("p", bookInfo, "book-length");
  if (book.chapters > 1) {
    bookLength.textContent = `${book.chapters} chapters || ${book.pages} pages`;
  } else bookLength.textContent = `${book.pages} pages`;

  const cardButtonGroup = createElement("section", newCard, "card-buttons");
  const readBtn = createElement("button", cardButtonGroup, "read-btn");
  readBtn.textContent = "Mark as read";
  const editBtn = createElement("button", cardButtonGroup, "edit-btn");
  editBtn.textContent = "Edit card";
  const removeBtn = createElement("button", cardButtonGroup, "remove-btn");
  removeBtn.textContent = "Remove";
}

addToLibrary("The Hobbit", "J.R.R. Tolkien", "1937-9-21", "25", "259", false);
addToLibrary("Ada", "George R.R. Martin", "1996-8-1", "36", "694", false);
addToLibrary(
  "Critique of Pure Reason",
  "Immanuel Kant",
  "1781-??-??",
  "54",
  "856",
  true
);
addToLibrary(
  "Game Design Workshop: A Playcentric Approach to Creating Innovative Games",
  "Dr. Seuss",
  "1957-10-12",
  "0",
  "64",
  true
);

createCard(myLibrary[0]);
createCard(myLibrary[1]);
createCard(myLibrary[2]);
createCard(myLibrary[3]);

function allInfo() {
  for (const book of myLibrary) {
    console.log(book.info());
  }
}
