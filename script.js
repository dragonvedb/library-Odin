const myLibrary = [];

function Book(
  name,
  author,
  date,
  chapters,
  pages,
  coverColour,
  textColour,
  coverFont,
  readStatus
) {
  this.id = `${myLibrary.length + 1}`;
  this.name = name;
  this.author = author;
  this.date = date;
  this.chapters = chapters;
  this.pages = pages;
  this.coverColour = coverColour;
  this.textColour = textColour;
  this.coverFont = coverFont;
  this.readStatus = readStatus;
}

function addToLibrary(
  name,
  author,
  date,
  chapters,
  pages,
  coverColour,
  textColour,
  coverFont,
  readStatus
) {
  const newBook = new Book(
    name,
    author,
    date,
    chapters,
    pages,
    coverColour,
    textColour,
    coverFont,
    readStatus
  );
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
  newCard.setAttribute("data-id", book.id);

  const bookItself = createElement("section", newCard, "book-itself");
  const bookBlock = createElement("div", bookItself, "book-block");
  const blockWidth = 10 + Math.floor(book.pages / 25);
  bookBlock.setAttribute(
    "style",
    `height: ${blockWidth}px; border-color: ${book.coverColour}; border-right: 1px solid transparent`
  );
  const bookCover = createElement("div", bookItself, "book-cover");
  const coverFontFamily = () => {
    switch (book.coverFont) {
      case 1:
        return '"Times New Roman", serif';
      case 2:
        return "Helvetica, sans-serif";
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      default:
        return "cursive";
    }
  };
  const coverFontSize = () => {
    if (book.name.length < 50) {
      return 3 - book.name.length * 0.05;
    }
    return 1;
  };
  bookCover.setAttribute(
    "style",
    `background-color: ${book.coverColour}; color: ${
      book.textColour
    }; font-family: ${coverFontFamily()}; font-size: ${coverFontSize()}rem`
  );
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
  removeBtn.addEventListener("click", (e) => {
    const parentCard = e.target.parentElement.parentElement;
    const bookEntry = myLibrary.find(
      (entry) => entry.id === parentCard.getAttribute("data-id")
    );
    myLibrary.splice(myLibrary.indexOf(bookEntry), 1);
    parentCard.remove();
  });
}

const cardForm = document.getElementById("card-form");

function toggleForm() {
  cardForm.classList.toggle("hidden");
}

cardForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(cardForm);
  addToLibrary(
    formData.get("name"),
    formData.get("author"),
    formData.get("date"),
    formData.get("chapters"),
    formData.get("pages"),
    formData.get("coverColour"),
    formData.get("textColour"),
    formData.get("coverFont"),
    formData.get("status")
  );
  createCard(myLibrary[4]);
  toggleForm();
};

const addCardButton = document.getElementById("add-card-btn");
addCardButton.onclick = () => toggleForm();

const cancelButton = document.getElementById("cancel-btn");
cancelButton.onclick = () => toggleForm();

addToLibrary(
  "The Hobbit",
  "J.R.R. Tolkien",
  "1937-9-21",
  "25",
  "259",
  "red",
  "white",
  1,
  false
);
addToLibrary(
  "Ada",
  "George R.R. Martin",
  "1996-8-1",
  "36",
  "694",
  "orange",
  "green",
  2,
  false
);
addToLibrary(
  "Critique of Pure Reason",
  "Immanuel Kant",
  "1781-??-??",
  "54",
  "856",
  "azure",
  "lightblue",
  1,
  true
);
addToLibrary(
  "Game Design Workshop: A Playcentric Approach to Creating Innovative Games",
  "Dr. Seuss",
  "1957-10-12",
  "0",
  "64",
  "violet",
  "white",
  2,
  true
);

createCard(myLibrary[0]);
createCard(myLibrary[1]);
createCard(myLibrary[2]);
createCard(myLibrary[3]);
