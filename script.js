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
  const book = {
    id: i,
    title: "title" + i,
    author: "author" + i,
    publishY: Math.floor(Math.random() * 1000) + 1000,
    genre: bookGenres[Math.floor(Math.random() * 10) % 6],
    read: false,
  };
  myLibrary.push(book);
}
// const book0 = {
//   id: 0,
//   title: "1984",
//   author: "George Orwell",
//   publishY: 1948,
//   genre: "Sci-fi",
//   read: false,
// };

// const book1 = {
//   id: 1,
//   title: "The Bitcoin Standard",
//   author: "Saifedean Ammous",
//   publishY: 2018,
//   genre: "Economics",
//   read: false,
// };

// const book2 = {
//   id: 2,
//   title: "Longitude",
//   author: "somebody",
//   publishY: 2010,
//   genre: "History",
//   read: false,
// };

// const myLibrary = [book0, book1, book2];

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
function Book(title, author, publishY, genre, read) {
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
  isLibDisplayed = true;
  myLibrary.forEach((book) => {
    let areBookPropsDisplayed = false;
    let bookDiv = document.createElement("div");
    bookDiv.className = "book" + i;

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookDiv.appendChild(bookTitle);

    library.appendChild(bookDiv);
    i++;

    // expands and collapses book in library
    bookTitle.addEventListener("click", () => {
      areBookPropsDisplayed = expandBook(book, bookDiv, areBookPropsDisplayed);
    });
  });
}

function expandBook(book, bookDiv, areBookPropsDisplayed) {
  book.read ? bookDiv.classList.add("read") : bookDiv.classList.remove("read");
  if (!areBookPropsDisplayed) {
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.author;
    bookDiv.appendChild(bookAuthor);

    const bookGenre = document.createElement("p");
    bookGenre.textContent = book.genre;
    bookDiv.appendChild(bookGenre);

    const bookPublishY = document.createElement("p");
    bookPublishY.textContent = book.publishY;
    bookDiv.appendChild(bookPublishY);

    // Book buttons functionality
    const bookReadBtn = document.createElement("button");
    //

    if (!book.read) {
      bookReadBtn.textContent = "Mark as read";
    } else {
      bookReadBtn.textContent = "Mark as not read";
    }
    bookReadBtn.addEventListener("click", () => {
      toggleBookRead(book, bookDiv, bookReadBtn);
    });

    const bookRemoveBtn = document.createElement("button");
    bookRemoveBtn.textContent = "X";

    bookRemoveBtn.addEventListener("click", () => {
      removeBook(book.id);
    });

    bookDiv.appendChild(bookReadBtn);
    bookDiv.appendChild(bookRemoveBtn);
    return (areBookPropsDisplayed = true);
  } else {
    for (let j = bookDiv.children.length - 1; j > 0; j--) {
      bookDiv.removeChild(bookDiv.children[j]);
    }
    bookDiv.classList.remove("read");
    return (areBookPropsDisplayed = false);
  }
}

function toggleBookRead(book, bookDiv, bookReadBtn) {
  if (!book.read) {
    book.read = true;
    bookDiv.classList.add("read");
    bookReadBtn.textContent = "Mark as not read";
  } else {
    book.read = false;
    bookDiv.classList.remove("read");
    bookReadBtn.textContent = "Mark as read";
  }
}

function removeBook(bookId) {
  // let removeConfirm = prompt(
  //   "Confirm you want to delete this book from Library? (y/n)"
  // ).toLowerCase();
  // if (removeConfirm == "y") {
  removeByAttribute(myLibrary, "id", bookId);
  clearLibraryDisplay();
  showLibrary(i);
  //}
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
