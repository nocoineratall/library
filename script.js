const library = document.querySelector(".library");
const expandAllButton = document.querySelector(".button-toggle-expand");
const addBookBtn = document.querySelector(".add-book");
const addBookContainer = document.querySelector(".new-book-container");
const submitBookBtn = document.querySelector(".submit-button");

//form inputs
const inputNewTitle = document.querySelector("#title");
const inputNewAuthor = document.querySelector("#author");
const inputNewPublishY = document.querySelector("#publishY");
const inputNewGenre = document.querySelector("#genre");
const inputNewStatusRead = document.querySelector("#read");

let toggleReadString = "Mark as read";
let toggleNotReadString = "Mark as not read";
let isFormDisplayed = false;
let areAllBooksExpanded = false;
let i = 0; //book object index

// initialize genres
bookGenres = [
  "Fantasy",
  "Adventure",
  "Thriller",
  "Sci-fi",
  "Novel",
  "Historical",
  "Economics",
];

// initialize library
let myLibrary = [];

// define default books which require myLibrary to be initialized
const book0 = new Book(
  0,
  "The Bitcoin Standard",
  "Saifedean Ammous",
  2018,
  "Economics",
  true,
  false
);

const book1 = new Book(1, "1984", "George Orwell", 1949, "Sci-fi", true, false);

const book2 = new Book(
  2,
  "La Divina Commedia",
  "Dante Alighieri",
  1314,
  "Novel",
  false,
  false
);

// I can not populate myLibrary
myLibrary = [book0, book1, book2];

// -------------------------------   EVENTS  ----------------------------------- //

expandAllButton.addEventListener("click", expandAllBooks);

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
  this.arePropsDisplayed = false;
}

// Prototype function definition
Book.prototype.toggleBookRead = function (bookReadBtn) {
  if (!this.read) {
    this.read = true;
    this.div.classList.add("read");
    bookReadBtn.textContent = toggleNotReadString;
  } else {
    this.read = false;
    this.div.classList.remove("read");
    bookReadBtn.textContent = toggleReadString;
  }
};

function showLibrary() {
  i = 0;
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookReadBtn = document.createElement("button");
    const bookRemoveBtn = document.createElement("button");
    const buttonsWrapper = document.createElement("div");

    bookDiv.className = "book" + i++;
    book.div = bookDiv;
    book.areBookPropsDisplayed = false;
    bookTitle.textContent = book.title;
    bookRemoveBtn.textContent = "X";
    bookRemoveBtn.classList.add("remove-button");
    buttonsWrapper.classList.add("button-wrapper");

    if (!book.read) {
      bookReadBtn.textContent = toggleReadString;
    } else {
      bookReadBtn.textContent = toggleNotReadString;
      book.div.classList.add("read");
    }

    bookReadBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      book.toggleBookRead(bookReadBtn);
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

    // expands and collapses book in library
    bookDiv.addEventListener("click", () => {
      expandBook(book);
    });
  });
}

function expandBook(book) {
  book.read
    ? book.div.classList.add("read")
    : book.div.classList.remove("read");
  if (!book.areBookPropsDisplayed) {
    const bookAuthor = document.createElement("p");
    const bookGenre = document.createElement("p");
    const bookPublishY = document.createElement("p");

    bookAuthor.textContent = book.author;
    bookGenre.textContent = book.genre;
    bookPublishY.textContent = book.publishY;

    book.div.appendChild(bookAuthor);
    book.div.appendChild(bookGenre);
    book.div.appendChild(bookPublishY);
    book.areBookPropsDisplayed = true;
  } else {
    // collapses the bookDiv removing all children except for h3-title and button-wrapper
    // this is achieved by setting the loop to end at j > 1 (skips last two elements)
    for (let j = book.div.children.length - 1; j > 1; j--) {
      book.div.removeChild(book.div.children[j]);
    }
    book.areBookPropsDisplayed = false;
  }
}

function expandAllBooks() {
  if (!areAllBooksExpanded) {
    myLibrary.forEach((book) => {
      const bookDiv = document.createElement("div");
      if (!book.areBookPropsDisplayed) {
        expandBook(book);
      }
    });
    areAllBooksExpanded = true;
    expandAllButton.textContent = "Collapse All";
  } else {
    myLibrary.forEach((book) => {
      if (book.areBookPropsDisplayed) {
        expandBook(book);
      }
    });
    areAllBooksExpanded = false;
    expandAllButton.textContent = "Expand All";
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

function clearLibraryDisplay() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
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

function submitNewBook() {
  let readProperty;
  inputNewStatusRead.value == "true"
    ? (readProperty = true)
    : (readProperty = false);
  const book = new Book(
    myLibrary.length,
    inputNewTitle.value,
    inputNewAuthor.value,
    inputNewPublishY.value,
    inputNewGenre.value,
    readProperty,
    false
  );
  if (inputNewTitle.value == "" || inputNewAuthor.value == "") {
    return alert("Book Title and Author are required");
  }
  myLibrary.push(book);

  clearLibraryDisplay();
  showLibrary();
  toggleNewBookSidebar();

  inputNewTitle.value = "";
  inputNewAuthor.value = "";
  inputNewPublishY.value = "";
  inputNewGenre.value = "";
  //inputNewStatusRead.value = "";
}

// ------------------------------- START UP EXECUTION --------------------------

// for (let i = 0; i < librarySize; i++) {
//   let id = i;
//   let title = "title" + i;
//   let author = "author" + i;
//   let publishY = Math.floor(Math.random() * 1000) + 1000;
//   let genre = bookGenres[Math.floor(Math.random() * 10) % 6];
//   let read = false;
//   const book = new Book(id, title, author, publishY, genre, read);
//   myLibrary.push(book);
// }

showLibrary();

// creates the option elements for the genre select input
bookGenres.forEach((genre) => {
  const optionElement = document.createElement("option");
  optionElement.setAttribute("value", genre);
  optionElement.textContent = genre;
  inputNewGenre.appendChild(optionElement);
});
