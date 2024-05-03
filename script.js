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

let libIsDisplayed = false;
let isFormDisplayed = false;

const book0 = {
  id: 0,
  title: "1984",
  author: "George Orwell",
  publishY: 1948,
  genre: "Sci-fi",
  read: false,
};

const book1 = {
  id: 1,
  title: "The Bitcoin Standard",
  author: "Saifedean Ammous",
  publishY: 2018,
  genre: "Economics",
  read: false,
};

const book2 = {
  id: 2,
  title: "Longitude",
  author: "somebody",
  publishY: 2010,
  genre: "History",
  read: false,
};

const myLibrary = [book0, book1, book2];
let bookPropsAreDisplayed = false;
let i = 0;

// -------------------------------   EVENTS  ----------------------------------- //

showLibBtn.addEventListener("click", () => {
  if (!libIsDisplayed) {
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
  libIsDisplayed = true;
  myLibrary.forEach((book) => {
    bookPropsAreDisplayed = false;
    let bookDiv = document.createElement("div");
    bookDiv.className = "book" + i;

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookDiv.appendChild(bookTitle);

    library.appendChild(bookDiv);
    i++;

    // expands and collapses book in library
    bookTitle.addEventListener("click", () => {
      expandBook(book, bookDiv);
    });
  });
}

function expandBook(book, bookDiv) {
  if (!bookPropsAreDisplayed) {
    bookPropsAreDisplayed = true;
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.author;
    bookDiv.appendChild(bookAuthor);

    const bookPublishY = document.createElement("p");
    bookPublishY.textContent = book.publishY;
    bookDiv.appendChild(bookPublishY);

    const bookGenre = document.createElement("p");
    bookGenre.textContent = book.genre;
    bookDiv.appendChild(bookGenre);

    // Book buttons functionality
    const bookReadBtn = document.createElement("button");
    //fix this!
    toggleBookRead(book, bookDiv);
    //fix this!

    bookReadBtn.textContent = "Read";
    bookReadBtn.addEventListener("click", () => {
      toggleBookRead(book, bookDiv);
    });

    const bookRemoveBtn = document.createElement("button");
    bookRemoveBtn.textContent = "X";

    bookRemoveBtn.addEventListener("click", () => {
      removeBook(book.id);
    });

    bookDiv.appendChild(bookReadBtn);
    bookDiv.appendChild(bookRemoveBtn);
  } else {
    for (let j = bookDiv.children.length - 1; j > 0; j--) {
      bookDiv.removeChild(bookDiv.children[j]);
    }
    bookPropsAreDisplayed = false;
  }
}

function toggleBookRead(book, bookDiv) {
  !book.read ? (book.read = true) : (book.read = false);
  book.read ? bookDiv.classList.add("read") : bookDiv.classList.remove("read");
}

function removeBook(bookId) {
  // let removeConfirm = prompt(
  //   "Confirm you want to delete this book from Library? (y/n)"
  // ).toLowerCase();
  // if (removeConfirm == "y") {
  removeByAttribute(myLibrary, "id", bookId);
  console.log(bookId);
  clearLibraryDisplay();
  showLibrary(i);
  //}
}

function clearLibraryDisplay() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  libIsDisplayed = false;
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
