const myLibrary = [];

const startLibrary = [
  {
    author: "J.R.R. Tolkien",
    chapters: "19",
    coverColour: "#261717",
    coverFont: "4",
    date: "21.09.1973",
    id: "0",
    name: "The Hobbit",
    pages: "304",
    readStatus: true,
    textColour: "#ce3b3b",
  },
  {
    id: "1",
    name: "The Wretched of the Earth",
    author: "Frantz Fanon",
    date: "1961",
    chapters: "5",
    pages: "251",
    coverColour: "#ca1212",
    textColour: "#efebeb",
    coverFont: "2",
    readStatus: false,
  },
  {
    id: "2",
    name: "The Gray House",
    author: "Mariam Petrosyan",
    date: "2009",
    chapters: "3",
    pages: "992",
    coverColour: "#46284d",
    textColour: "#e2cb78",
    coverFont: "8",
    readStatus: true,
  },
  {
    id: "3",
    name: "Dead Souls",
    author: "Nikolai Gogol",
    date: "05.1842",
    chapters: "11",
    pages: "445",
    coverColour: "#2f366a",
    textColour: "#eee7c3",
    coverFont: "1",
    readStatus: true,
  },
  {
    id: "4",
    name: "Children of the Blue Flamingo",
    author: "Vladislav Krapivin",
    date: "1980",
    chapters: "26",
    pages: "224",
    coverColour: "#f3e4ff",
    textColour: "#184ecd",
    coverFont: "7",
    readStatus: true,
  },
  {
    id: "5",
    name: "Critique of Pure Reason",
    author: "Immanuel Kant",
    date: "1781",
    chapters: "8",
    pages: "856",
    coverColour: "#46553a",
    textColour: "#f4f0f0",
    coverFont: "6",
    readStatus: false,
  },
  {
    id: "6",
    name: "GURPS Basic Set",
    author: "Steve Jackson",
    date: "2004",
    chapters: "22",
    pages: "336",
    coverColour: "#212b24",
    textColour: "#f7e259",
    coverFont: "5",
    readStatus: true,
  },
];

function Book(
  id,
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
  this.id = id;
  this.name = name;
  this.author = author;
  this.date = date;
  this.chapters = chapters;
  this.pages = pages;
  this.coverColour = coverColour;
  this.textColour = textColour;
  this.coverFont = coverFont;
  this.readStatus = !!readStatus;
}

const formContainer = document.getElementById("form-container");
const cardForm = document.getElementById("card-form");

function toggleForm() {
  formContainer.classList.toggle("hidden");
}

cardForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(cardForm);
  const newBook = new Book(
    formData.get("id"),
    formData.get("name"),
    formData.get("author"),
    formData.get("date"),
    formData.get("chapters"),
    formData.get("pages"),
    formData.get("coverColour"),
    formData.get("textColour"),
    formData.get("coverFont"),
    formData.get("readStatus")
  );
  myLibrary.splice(formData.get("id"), 1, newBook);
  newBook.createCard();
  toggleForm();
  cardForm.reset();
};

const addCardButton = document.getElementById("add-card-btn");
addCardButton.onclick = () => {
  toggleForm();
  document.getElementById("form-id").value = myLibrary.length;
};

const cancelButton = document.getElementById("cancel-btn");
cancelButton.onclick = () => toggleForm();

const cardsContainer = document.querySelector("#cards-container");

Book.prototype.createCard = function () {
  function createElement(tag, parentElem, ...elemClasses) {
    const newElement = document.createElement(tag);

    for (const elemClass of elemClasses) {
      newElement.classList.add(elemClass);
    }

    parentElem.appendChild(newElement);
    return newElement;
  }

  let newCard;
  if (document.querySelector(`[data-id="${this.id}"]`)) {
    newCard = document.querySelector(`[data-id="${this.id}"]`);
    newCard.innerHTML = "";
  } else {
    newCard = createElement("article", cardsContainer, "book-card");
    newCard.setAttribute("data-id", this.id);
    if (this.readStatus) newCard.classList.add("read");
  }

  const bookItself = createElement("section", newCard, "book-itself");
  const bookBlock = createElement("div", bookItself, "book-block");
  let blockWidth = 10 + Math.floor(this.pages / 25);
  if (blockWidth > 50) blockWidth = 50;
  bookBlock.setAttribute(
    "style",
    `height: ${blockWidth}px; border-color: ${this.coverColour}; border-right: 1px solid transparent`
  );
  const bookCover = createElement("div", bookItself, "book-cover");
  const coverFontFamily = () => {
    switch (this.coverFont) {
      case "1":
        return "'Libre Baskerville', serif";
      case "2":
        return "'Oswald', sans-serif";
      case "3":
        return "'Josefin Sans', sans-serif";
      case "4":
        return "'Macondo', cursive";
      case "5":
        return "'Amarante', cursive";
      case "6":
        return "'Charm', cursive";
      case "7":
        return "'Sue Ellen Francisco', cursive";
      case "8":
        return "'Rock Salt', cursive";
      default:
        return "'Libre Baskerville', serif";
    }
  };
  const coverFontSize = () => {
    if (this.name.length < 50) {
      return 2.85 - this.name.length * 0.035;
    }
    return 1.1;
  };
  bookCover.setAttribute(
    "style",
    `background-color: ${this.coverColour}; color: ${
      this.textColour
    }; font-family: ${coverFontFamily()}; font-size: ${coverFontSize()}rem`
  );
  bookCover.textContent = this.name;

  const bookInfo = createElement("section", newCard, "book-info");
  const bookName = createElement("p", bookInfo, "book-name");
  bookName.textContent = this.name;
  const bookAuthor = createElement("p", bookInfo, "book-author");
  bookAuthor.textContent = `by ${this.author}`;
  const bookDate = createElement("p", bookInfo, "book-date");
  bookDate.textContent = `Publication date: ${this.date}`;
  const bookLength = createElement("p", bookInfo, "book-length");
  if (this.chapters > 1) {
    bookLength.textContent = `${this.chapters} chapters || ${this.pages} pages`;
  } else bookLength.textContent = `${this.pages} pages`;

  const statusBtn = createElement("button", newCard, "status-button");
  statusBtn.addEventListener("click", (e) => {
    const parentCard = e.target.parentElement;
    parentCard.classList.toggle("read");
    if (this.readStatus === true) {
      this.readStatus = false;
    } else this.readStatus = true;
  });

  const cardButtonGroup = createElement("section", newCard, "card-buttons");
  const editBtn = createElement("button", cardButtonGroup, "edit-btn");
  editBtn.addEventListener("click", (e) => {
    toggleForm();
    document.getElementById("form-id").value = this.id;
    document.getElementById("name-field").value = this.name;
    document.getElementById("author-field").value = this.author;
    document.getElementById("date-field").value = this.date;
    document.getElementById("chapters-field").value = this.chapters;
    document.getElementById("pages-field").value = this.pages;
    document.getElementById("color-field").value = this.coverColour;
    document.getElementById("text-color-field").value = this.textColour;
    document.getElementById("font-field").value = this.coverFront;
  });

  const removeBtn = createElement("button", cardButtonGroup, "remove-btn");
  removeBtn.addEventListener("click", (e) => {
    document.querySelector(`[data-id="${this.id}"]`).remove();
    myLibrary.splice(myLibrary.indexOf(this), 1);

    for (let i = this.id; i < myLibrary.length; i++) {
      const book = myLibrary[i];
      const bookCard = document.querySelector(`[data-id="${book.id}"]`);
      book.id = String(i);
      bookCard.setAttribute("data-id", book.id);
    }
  });
};

function displayLibrary(library) {
  for (const book of library) {
    const bookBook = new Book(
      book.id,
      book.name,
      book.author,
      book.date,
      book.chapters,
      book.pages,
      book.coverColour,
      book.textColour,
      book.coverFont,
      book.readStatus
    );
    myLibrary.push(bookBook);
    bookBook.createCard();
  }
}

displayLibrary(startLibrary);
