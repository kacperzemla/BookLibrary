let myLibrary = []
const tbody = document.querySelector("tbody")
const addButton = document.querySelector("#addNew")
const newBookForm = document.querySelector(".bg-modal")
const cancelBtn = document.getElementById("cancel-btn")
const newBookBtn = document.getElementById("newbook-btn")

const booksFromLocalStorage = JSON.parse(localStorage.getItem("myLibrary"))
//to przy odswiezaniu sie dzieje 
if(booksFromLocalStorage){
  myLibrary = booksFromLocalStorage
}

addButton.addEventListener("click", function(){
    newBookForm.style.display = "flex"
})

cancelBtn.addEventListener("click", function(){
    newBookForm.style.display = "none"
})

newBookBtn.addEventListener("click", function(){
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pages = document.getElementById('pages').value
    let read = document.querySelector('input[name="read"]:checked').value

    if(title != "" && author != "" && pages != "" && read != ""){
        let book = new Book(title, author, pages, read)
        myLibrary.push(book)
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
})

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

function render(){
    const books = document.querySelectorAll(".book")
    books.forEach( book => tbody.removeChild(book))

    myLibrary.forEach(function(book){
        CreateBook(book)
    })

}

render();

function CreateBook(book){
    let tRow = document.createElement('tr')
    tRow.classList.add("book")

    for(key in book){
        let td = document.createElement('td')
        td.innerText = book[key]
        tRow.appendChild(td)
    }
    let tdDelete = document.createElement('td')
    let buttonDelete = document.createElement('button')
    buttonDelete.innerText = "Delete"

    buttonDelete.classList.add("delete")
    buttonDelete.setAttribute('data-id', myLibrary.indexOf(book))

    buttonDelete.addEventListener("click", function(){
        myLibrary.splice(myLibrary.indexOf(book),1)
        console.log(myLibrary)
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        render();
    })

    tdDelete.appendChild(buttonDelete)
    tRow.appendChild(tdDelete)

    tbody.appendChild(tRow)
    console.log(tbody)
}



