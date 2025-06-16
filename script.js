
//Main container of the page
const contentSection = document.querySelector(".contentSection");


const myLibrary = [];

//Book prototype
function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Adds books to the array
function addBookToLibrary(id, title, author, pages, read) {
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book)
}

addBookToLibrary("1", "The Bell Witches","Lindsey Kelk", "448");
addBookToLibrary("2", "Everybody Wants to Rule the World Except Me","Django Wexler", "377");
addBookToLibrary("3", "The Paris Novel","Ruth Reichl", "288");

//Card prototype
function displayCard(id, title, author, pages, read) {

        //Card container
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");

        // "X" icon to remove book    
        const svgNS = "http://www.w3.org/2000/svg";

        // Create the <svg> element with namespace
        const svgCloseIcon = document.createElementNS(svgNS, "svg");
        svgCloseIcon.setAttribute("viewBox", "0 0 24 24")

        // Create the <path> element with namespace
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z");
        svgCloseIcon.dataset.id = id;

        svgCloseIcon.appendChild(path);
        bookCard.appendChild(svgCloseIcon);


        //Card title section
        const cardTitle = document.createElement("div");
        cardTitle.classList.add("cardTitle");
        cardTitle.textContent = title
        bookCard.appendChild(cardTitle);

        //Card author section
        const cardAuthor = document.createElement("div");
        cardAuthor.classList.add("cardcontent");
        cardAuthor.textContent = "By: " + author
        bookCard.appendChild(cardAuthor);

        //Card pages section
        const cardPages = document.createElement("div");
        cardPages.classList.add("cardcontent");
        cardPages.textContent = "No. of pages: " + pages
        bookCard.appendChild(cardPages);   


        //Card "Mark as read" section
        const cardReadLabel = document.createElement("label");
        cardReadLabel.classList.add("readLabel");
        cardReadLabel.for = "checkbox";
        cardReadLabel.textContent = "Mark as read: "

        //Card read toggle section
        const cardReadToggle = document.createElement("input");
        cardReadToggle.classList.add("readToggle");
        cardReadToggle.type = "checkbox";
        cardReadToggle.id = "checkbox";
        cardReadToggle.checked = read;
        
        //Sets the card color based on "read" status in the myLibrary array
        if (read) {
        bookCard.style.background = 'linear-gradient(to top,  rgba(255, 196, 216, 1), rgb(255, 255, 255))';
        } else {
        bookCard.style.background = 'linear-gradient(to top, rgba(147, 145, 148, 0.7), rgb(255, 255, 255))';
        };

        //Changes the card color based on "read" status on the card checkbox
        cardReadToggle.addEventListener("change", () => {
            if(cardReadToggle.checked) {    
                bookCard.style.background = 'linear-gradient(to top, rgba(255, 196, 216, 1), rgb(255, 255, 255))';
            } else {
                bookCard.style.background = 'linear-gradient(to top,rgba(147, 145, 148, 0.7), rgb(255, 255, 255))';
            };

        // Update the read status in the myLibrary array
        const book = myLibrary.find(book => book.id === id);
        if (book) book.read = cardReadToggle.checked;
        
        headerSummary()
        });

        cardReadLabel.appendChild(cardReadToggle);
        bookCard.appendChild(cardReadLabel);
        
        contentSection.appendChild(bookCard);
} 

//Loop creating cards to display books stored in the array
function displayLibrary(){
    contentSection.innerHTML = "";
    for(let book in myLibrary) {
        let id = myLibrary[book].id; 
        let title = myLibrary[book].title; 
        let author = myLibrary[book].author; 
        let pages = myLibrary[book].pages; 
        let read = myLibrary[book].read; 
        displayCard(id, title, author, pages, read);
    }

    //Adding event listeners to the remove buttons
    const svgCloseIcon = document.querySelectorAll("svg");
    svgCloseIcon.forEach(button => {
    button.addEventListener("click", () => {
        let id = button.dataset.id;
        let index = myLibrary.findIndex(book => book.id === id);
        myLibrary.splice(index,1)

        headerSummary()
        displayLibrary();

        });
    });
};

//Add Book button and dialog fuctionality
const dialog = document.querySelector("dialog");
const bookBtn = document.querySelector(".bookBtn");
const submitBtn = document.querySelector(".submitBtn");
const closeBtn = document.querySelector(".closeBtn");

//Button opening dialog box
bookBtn.addEventListener("click", () => {
    console.log("Open button clicked");
    dialog.showModal();
});


//Close button inside Dialog box
closeBtn.addEventListener("click", () => {
    dialog.close();
});


//Submission of form data to the addBookLibrary
document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault(); //To stop attempt to send data to non existant server

    const id = crypto.randomUUID(); 
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(id, title, author, pages, read);
    dialog.close();
    headerSummary()
    displayLibrary();

    console.log("Form submitted!");
    console.log(id, title, author, pages, read);

});


//Summary section in header
function headerSummary(){
    const bookSummary = document.querySelector(".libSummary")
    bookSummary.innerHTML = "";

    let totalBookCount = myLibrary.length 
    let readBookCount = myLibrary.filter(book => book.read).length
    let unreadBookCount = myLibrary.filter(book => !book.read).length


    const totalBooks = document.createElement("div");
    totalBooks.classList.add("header");
    totalBooks.textContent = "Total books: " + totalBookCount

    //read books
    const readBooks = document.createElement("div");
    readBooks.classList.add("header");
    readBooks.textContent = "Read books: " + readBookCount

    //unread books
    const unreadBooks = document.createElement("div");
    unreadBooks.classList.add("header");
    unreadBooks.textContent = "Unread books: " + unreadBookCount
        
    bookSummary.appendChild(totalBooks);
    bookSummary.appendChild(readBooks);
    bookSummary.appendChild(unreadBooks);
};

headerSummary()
displayLibrary();

