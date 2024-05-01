const body = document.querySelector("body");
const showLibBtn = document.querySelector(".show-lib");

showLibBtn.addEventListener("click", () => {
  let i = 1;
  myLibrary.forEach((book) => {
    let bookPropsAreDisplayed = false;
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.className += i;

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookDiv.appendChild(bookTitle);

    body.appendChild(bookDiv);
    i++;

    bookDiv.addEventListener("click", () => {
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
      } else {
        let childrenNumber = bookDiv.children.length;
        for (let j = bookDiv.children.length - 1; j > 0; j--) {
          bookDiv.removeChild(bookDiv.children[j]);
        }
        bookPropsAreDisplayed = false;
      }
    });
  });
});

const myLibrary = [
  {
    title: "1984",
    author: "George Orwell",
    publishY: 1948,
    genre: "Sci-fi",
  },
  {
    title: "The Bitcoin Standard",
    author: "Saifedean Ammous",
    publishY: 2018,
    genre: "Economics",
  },
  {
    title: "Longitude",
    author: "somebody",
    publishY: 2010,
    genre: "History",
  },
];

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
