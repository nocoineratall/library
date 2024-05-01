const body = document.querySelector("body");
const library = document.querySelector(".library");
const showLibBtn = document.querySelector(".show-lib");
let libIsDisplayed = false;

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

// ------------------------------- E V E N T S -----------------------------------//

showLibBtn.addEventListener("click", () => {
  if (!libIsDisplayed) {
    let i = 0;
    clearLibraryDisplay();
    showLibrary(i);
  } else {
    clearLibraryDisplay();
  }
});

function Book() {
  this.title = title;
  this.author = author;
  this.publishY = publishY;
  this.genre = genre;
}

function addBookToLib() {
  const book = new Book(title, author, publishY, genre);
  myLibrary.push(book);
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

function showLibrary(i) {
  libIsDisplayed = true;
  myLibrary.forEach((book) => {
    let bookPropsAreDisplayed = false;
    let bookDiv = document.createElement("div");
    bookDiv.className = "book" + i;

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookDiv.appendChild(bookTitle);

    library.appendChild(bookDiv);
    i++;

    // displays and removes book properties
    bookTitle.addEventListener("click", () => {
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
        const bookReadToggle = document.createElement("button");
        bookReadToggle.textContent = "Read";
        bookReadToggle.addEventListener("click", () => {
          !book.read ? (book.read = true) : (book.read = false);
          book.read
            ? bookDiv.classList.add("read")
            : bookDiv.classList.remove("read");
        });

        const bookRemoveBtn = document.createElement("button");
        bookRemoveBtn.textContent = "X";
        bookRemoveBtn.addEventListener("click", () => {
          let removeConfirm = prompt(
            "Confirm you want to delete this book from Library? (y/n)"
          ).toLowerCase();
          if (removeConfirm == "y") {
            removeByAttribute(myLibrary, "id", book.id);
            clearLibraryDisplay();
            showLibrary(i);
          }
        });

        bookDiv.appendChild(bookReadToggle);
        bookDiv.appendChild(bookRemoveBtn);
      } else {
        for (let j = bookDiv.children.length - 1; j > 0; j--) {
          bookDiv.removeChild(bookDiv.children[j]);
        }
        bookPropsAreDisplayed = false;
      }
    });
  });
}

function clearLibraryDisplay() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  libIsDisplayed = false;
}
