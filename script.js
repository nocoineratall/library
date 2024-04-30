const body = document.querySelector("body");
const showLibBtn = document.querySelector(".show-lib");

showLibBtn.addEventListener("click", () => {
  let i = 1;
  myLibrary.forEach((book) => {
    const bookBtn = document.createElement("button");
    bookBtn.className = "book" + i;
    i++;
    bookBtn.textContent = book.title;
    bookBtn.addEventListener("click", () => {
      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = book.author;
      bookBtn.appendChild(bookAuthor);
    });
    body.appendChild(bookBtn);
  });
});

const myLibrary = [
  {
    title: "1984",
    author: "George Orwell",
    publishDate: 1948,
    genre: "Sci-fi",
  },
  {
    title: "The Bitcoin Standard",
    author: "Saifedean Ammous",
    publishDate: 2018,
    genre: "Economics",
  },
];

function Book() {
  this.title = title;
  this.author = author;
  this.publishDate = publishDate;
  this.genre = genre;
}

function addBookToLib() {
  const book = new Book(title, author, publishDate, genre);
  myLibrary.push(book);
}
