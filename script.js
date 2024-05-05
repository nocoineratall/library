const body = document.querySelector("body");
const library = document.querySelector(".library");
const showLibBtn = document.querySelector(".show-lib");
const addBookBtn = document.querySelector(".add-book");
const submitBookBtn = document.querySelector(".submit-button");
const addBookContainer = document.querySelector(".new-book-container");

//form inputs
const inputNewTitle = document.querySelector("#title");
const inputNewAuthor = document.querySelector("#author");
const inputNewPublishY = document.querySelector("#publishY");
const inputNewGenre = document.querySelector("#genre");
const inputNewStatusRead = document.querySelector("#read");

let isLibDisplayed = false;
let isFormDisplayed = false;
const librarySize = 5;
const myLibrary = [];
let i = 0;

bookGenres = [
  "Fantasy",
  "Adventure",
  "Thriller",
  "Sci-fi",
  "Romantic",
  "Historical",
];

for (let i = 0; i < librarySize; i++) {
  let id = i;
  let title = "title" + i;
  let author = "author" + i;
  let publishY = Math.floor(Math.random() * 1000) + 1000;
  let genre = bookGenres[Math.floor(Math.random() * 10) % 6];
  let read = false;

  const book = new Book(id, title, author, publishY, genre, read);
  myLibrary.push(book);
}

// -------------------------------   EVENTS  ----------------------------------- //

showLibBtn.addEventListener("click", () => {
  if (!isLibDisplayed) {
    i = 0;
    clearLibraryDisplay();
    showLibrary();
  } else {
    clearLibraryDisplay();
  }
});

addBookBtn.addEventListener("click", toggleNewBookSidebar);

submitBookBtn.addEventListener("click", submitNewBook);

// -------------------------------  FUNCTIONS ----------------------------------- //

//book object constructor
function Book(id, title, author, publishY, genre, read) {
  this.id = myLibrary.length;
  this.title = title;
  this.author = author;
  this.publishY = publishY;
  this.genre = genre;
  this.read = read;
}

// Object.getPrototypeOf(Book).arePropsDisplayed = false;
Book.prototype.arePropsDisplayed = false;

function submitNewBook() {
  const book = new Book(
    inputNewTitle.value,
    inputNewAuthor.value,
    inputNewPublishY.value,
    inputNewGenre.value,
    inputNewStatusRead.value
  );
  if (inputNewTitle.value == "") {
    return alert("Book title can't be empty");
  }
  myLibrary.push(book);

  clearLibraryDisplay();
  showLibrary();
  toggleNewBookSidebar();

  inputNewTitle.value = "";
  inputNewAuthor.value = "";
  inputNewPublishY.value = "";
  inputNewGenre.value = "";
  inputNewStatusRead.value = "";
}

function removeByAttribute(array, attribute, value) {
  let index = array.length;
  while (index--) {
    if (
      array[index] &&
      array[index].hasOwnProperty(attribute) &&
      arguments.length > 2 &&
      array[index][attribute] === value
    ) {
      array.splice(index, 1);
    }
  }
  return array;
}

function showLibrary() {
  i = 0;
  isLibDisplayed = true;
  myLibrary.forEach((book) => {
    let areBookPropsDisplayed = false;
    const bookDiv = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookReadBtn = document.createElement("button");
    const bookRemoveBtn = document.createElement("button");
    const buttonsWrapper = document.createElement("div");

    bookDiv.className = "book" + i;
    bookTitle.textContent = book.title;
    buttonsWrapper.classList.add("button-wrapper");
    bookRemoveBtn.textContent = "X";
    bookRemoveBtn.classList.add("remove-button");

    if (!book.read) {
      bookReadBtn.textContent = "MARK AS READ";
    } else {
      bookReadBtn.textContent = "MARK AS NOT READ";
    }

    bookReadBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      book.toggleBookRead(book, bookDiv, bookReadBtn);
    });
    bookRemoveBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      removeBook(book.id);
    });

    bookDiv.appendChild(bookTitle);
    buttonsWrapper.appendChild(bookReadBtn);
    buttonsWrapper.appendChild(bookRemoveBtn);
    bookDiv.appendChild(buttonsWrapper);
    library.appendChild(bookDiv);
    i++;

    // expands and collapses book in library
    bookDiv.addEventListener("click", () => {
      areBookPropsDisplayed = expandBook(book, bookDiv, areBookPropsDisplayed);
    });
  });
}

function expandBook(book, bookDiv, areBookPropsDisplayed) {
  book.read ? bookDiv.classList.add("read") : bookDiv.classList.remove("read");
  if (!areBookPropsDisplayed) {
    const bookAuthor = document.createElement("p");
    const bookGenre = document.createElement("p");
    const bookPublishY = document.createElement("p");
    // const bookReadBtn = document.createElement("button");
    // const bookRemoveBtn = document.createElement("button");
    // const buttonsWrapper = document.createElement("div");

    bookAuthor.textContent = book.author;
    bookGenre.textContent = book.genre;
    bookPublishY.textContent = book.publishY;
    // buttonsWrapper.classList.add("button-wrapper");
    // bookRemoveBtn.textContent = "X";
    // if (!book.read) {
    //   bookReadBtn.textContent = "MARK AS READ";
    // } else {
    //   bookReadBtn.textContent = "MARK AS NOT READ";
    // }
    // bookReadBtn.addEventListener("click", () => {
    //   book.toggleBookRead(book, bookDiv, bookReadBtn);
    // });

    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookGenre);
    bookDiv.appendChild(bookPublishY);
    // buttonsWrapper.appendChild(bookReadBtn);
    // buttonsWrapper.appendChild(bookRemoveBtn);
    // bookDiv.appendChild(buttonsWrapper);

    // bookRemoveBtn.addEventListener("click", () => {
    //   removeBook(book.id);
    // });
    return (areBookPropsDisplayed = true);
  } else {
    // collapses the bookDiv removing all children except for h3 title and button-wrapper
    //this is achieved by setting the loop to end at j > 1 (skips last two elements)
    for (let j = bookDiv.children.length - 1; j > 1; j--) {
      bookDiv.removeChild(bookDiv.children[j]);
    }
    //bookDiv.classList.remove("read");
    return (areBookPropsDisplayed = false);
  }
}

function removeBook(bookId) {
  let removeConfirm = prompt(
    "Confirm you want to delete this book from Library? (y/n)"
  ).toLowerCase();
  if (removeConfirm == "y") {
    removeByAttribute(myLibrary, "id", bookId);
    clearLibraryDisplay();
    showLibrary(i);
  }
}

function clearLibraryDisplay() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  isLibDisplayed = false;
}

function toggleNewBookSidebar() {
  if (!isFormDisplayed) {
    isFormDisplayed = true;
    addBookContainer.classList.add("display");
  } else {
    isFormDisplayed = false;
    addBookContainer.classList.remove("display");
  }
}

Book.prototype.toggleBookRead = function (book, bookDiv, bookReadBtn) {
  if (!book.read) {
    book.read = true;
    bookDiv.classList.add("read");
    bookReadBtn.textContent = "MARK AS NOT READ";
  } else {
    book.read = false;
    bookDiv.classList.remove("read");
    bookReadBtn.textContent = "MARK AS READ";
  }
};
