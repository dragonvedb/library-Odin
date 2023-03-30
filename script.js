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
  this.id = `${myLibrary.length}`;
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

  const newCard = createElement("article", cardsContainer, "book-card");
  newCard.setAttribute("data-id", this.id);

  const bookItself = createElement("section", newCard, "book-itself");
  const bookBlock = createElement("div", bookItself, "book-block");
  const blockWidth = 10 + Math.floor(this.pages / 25);
  bookBlock.setAttribute(
    "style",
    `height: ${blockWidth}px; border-color: ${this.coverColour}; border-right: 1px solid transparent`
  );
  const bookCover = createElement("div", bookItself, "book-cover");
  const coverFontFamily = () => {
    switch (this.coverFont) {
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
    if (this.name.length < 50) {
      return 3 - this.name.length * 0.05;
    }
    return 1;
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

  const cardButtonGroup = createElement("section", newCard, "card-buttons");
  const readBtn = createElement("button", cardButtonGroup, "read-btn");
  readBtn.textContent = "Mark as read";
  const removeBtn = createElement("button", cardButtonGroup, "remove-btn");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", (e) => {
    console.log(this);
    const parentCard = e.target.parentElement.parentElement;
    /* const bookEntry = myLibrary.find(
      (entry) => entry.id === parentCard.getAttribute("data-id")
    ); */
    myLibrary.splice(myLibrary.indexOf(this), 1);
    parentCard.remove();
  });
};

const cardForm = document.getElementById("card-form");

function toggleForm() {
  cardForm.classList.toggle("hidden");
}

cardForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(cardForm);
  const newBook = new Book(
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
  myLibrary.push(newBook);
  newBook.createCard();
  toggleForm();
};

const addCardButton = document.getElementById("add-card-btn");
addCardButton.onclick = () => toggleForm();

const cancelButton = document.getElementById("cancel-btn");
cancelButton.onclick = () => toggleForm();
