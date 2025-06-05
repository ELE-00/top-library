
//Main container of the page
const mainContainer = document.querySelector(".mainContainer");


const myLibrary = [];

function Book(id, author, title, pages, read) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  let id = crypto.randomUUID(); 
  const book = new Book(id, author, title, pages, read);
  myLibrary.push(book)
}


addBookToLibrary("Lindsey Kelk","The Bell Witches", "448","Not yet read");
addBookToLibrary("David Dalglish","Level: Ascension", "414","Not yet read");
addBookToLibrary("Django Wexler","Everybody Wants to Rule the World Except Me", "377","Not yet read");


function displayLibrary(){
    for(let book in myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard.textContent = myLibrary[book].title   

        mainContainer.appendChild(bookCard);
    }



};


displayLibrary();




