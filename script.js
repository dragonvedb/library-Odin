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

/* addToLibrary("The Hobbit", "J.R.R. Tolkien", 259, false);
addToLibrary("Game of Thrones", "George R.R. Martin", 548, false);
addToLibrary("City of Sol", "Eugene Rudashevsky", 305, true);

function allInfo() {
  for (const book of myLibrary) {
    console.log(book.info());
  }
}

allInfo(); */
