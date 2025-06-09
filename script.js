
//Main container of the page
const mainContainer = document.querySelector(".mainContainer");


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

//Card prototype
function displayCard(id, title, author, pages, read) {

        //Card container
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");

        //Card title section
        const cardTitle = document.createElement("div");
        cardTitle.classList.add("cardTitle");
        cardTitle.textContent = title

        //Card author section
        const cardAuthor = document.createElement("div");
        cardAuthor.classList.add("cardcontent");
        cardAuthor.textContent = "By: " + author

        //Card pages section
        const cardPages = document.createElement("div");
        cardPages.classList.add("cardcontent");
        cardPages.textContent = "No. of pages: " + pages

        //Card author section
        const cardReadLabel = document.createElement("label");
        cardReadLabel.classList.add("readLabel");
        cardReadLabel.for = "checkbox";
        cardReadLabel.textContent = "Mark as Read: "

        //Card read toggle section
        const cardReadToggle = document.createElement("input");
        cardReadToggle.classList.add("readToggle");
        cardReadToggle.type = "checkbox";
        cardReadToggle.id = "checkbox";
        cardReadToggle.checked = read;
        
        //Sets the card color based on "read" status in the myLibrary array
        if (read) {
        bookCard.style.background = 'linear-gradient(to bottom, rgb(255, 255, 255), rgba(0, 255, 191, 0.7))';
        } else {
        bookCard.style.background = 'linear-gradient(to bottom, rgb(255, 255, 255), rgba(147, 145, 148, 0.7))';
        };

        //Changes the card color based on "read" status on the card checkbox
        cardReadToggle.addEventListener("change", () => {
            if(cardReadToggle.checked) {    
                bookCard.style.background = 'linear-gradient(to bottom,rgb(255, 255, 255),rgba(0, 255, 191, 0.7))';
            } else {
                bookCard.style.background = 'linear-gradient(to bottom,rgb(255, 255, 255),rgba(147, 145, 148, 0.7))';
            };

        // Update the read status in the myLibrary array
        const book = myLibrary.find(book => book.id === id);
        if (book) book.read = cardReadToggle.checked;

        });


        //Appending children
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.id = id;

        bookCard.appendChild(cardTitle);
        bookCard.appendChild(cardAuthor);
        bookCard.appendChild(cardPages);   
        
        cardReadLabel.appendChild(cardReadToggle);
        bookCard.appendChild(cardReadLabel);

        bookCard.appendChild(removeBtn);
        mainContainer.appendChild(bookCard);

} 

//Loop creating cards to display books stored in the array
function displayLibrary(){
    mainContainer.innerHTML = "";
    for(let book in myLibrary) {
        let id = myLibrary[book].id; 
        let title = myLibrary[book].title; 
        let author = myLibrary[book].author; 
        let pages = myLibrary[book].pages; 
        let read = myLibrary[book].read; 
        displayCard(id, title, author, pages, read);
    }

    //Adding event listeners to the remove buttons
    const removeBtn = document.querySelectorAll(".removeBtn");
    removeBtn.forEach(button => {
    button.addEventListener("click", () => {
        let id = button.dataset.id;
        let index = myLibrary.findIndex(book => book.id === id);
        myLibrary.splice(index,1)

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
    displayLibrary();

    console.log("Form submitted!");
    console.log(id, title, author, pages, read);

});


displayLibrary();

