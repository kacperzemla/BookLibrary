let myLibrary = []
const divLibrary = document.querySelector(".library")
const addButton = document.querySelector("#addNew")
const newBookForm = document.querySelector(".bg-modal")
const cancelBtn = document.getElementById("cancel-btn")
const newBookBtn = document.getElementById("newbook-btn")
const searchBar = document.querySelectorAll("#searchBar")

const booksFromLocalStorage = JSON.parse(localStorage.getItem("myLibrary"))

if(booksFromLocalStorage){
  myLibrary = booksFromLocalStorage
}

//moze nie najlepsze praktyki ale pomyślę potem, może grid
searchBar.forEach(function(search){
    search.addEventListener('keyup', function(e){
        // console.log(e.target.value)
    
        const searchValue = e.target.value.toLowerCase()
        const filteredBooks = myLibrary.filter( (book)=>{
            return book.type.toLowerCase().includes(searchValue)
        })
        console.log(filteredBooks)
        if(filteredBooks.length > 0){
            render(filteredBooks)
        } else{
            render(myLibrary)
        }
       
    })
})

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
    let type = document.getElementById('type').value
    if(title != "" && author != "" && pages != "" && read != "" && type != ""){
        let book = new Book(title, author, pages, read, type)
        myLibrary.push(book)
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
})

function Book(title, author, pages, read, type){
    this.title = title
    this.author = author
    this.pages = pages + ' pages'
    this.read = read
    this.type = type
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

function render(myLibrary){
    const books = document.querySelectorAll(".book")
    books.forEach( book => divLibrary.removeChild(book))

    myLibrary.forEach(function(book){
        CreateBook(book)
    })
    check(myLibrary);

}


render(myLibrary);


function CreateBook(book){
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const pAuthor = document.createElement('p')
    const pNumberOfPages = document.createElement('p')
    const pType = document.createElement('p')
    div.classList.add("book")
    h1.innerText = book.title
    pAuthor.innerText = book.author
    pNumberOfPages.innerText = book.pages
    pType.innerText = book.type

    // for(key in book){
    //     let td = document.createElement('td')
    //     td.innerText = book[key]
    //     tRow.appendChild(td)
    // }
    const buttonDelete = document.createElement('button')
    buttonDelete.innerText = "Delete"

    buttonDelete.classList.add("delete")
    buttonDelete.setAttribute('data-id', myLibrary.indexOf(book))

    buttonDelete.addEventListener("click", function(){
        myLibrary.splice(myLibrary.indexOf(book),1)
        // console.log(myLibrary)
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        render(myLibrary);
    })

    const label = document.createElement('label')
    label.classList.add('switch')
    const toggleSwitch = ` 
    <span class="toggle-thumb">

         <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill:#4ADE80;transform:;-ms-filter:"><path d="M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z"></path></svg>

         <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill:#F87171;transform:;-ms-filter:"><path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"></path></svg>

    </span>`
    const input = document.createElement('input')
    input.type = "checkbox"
    input.classList.add("checkbox")
    label.appendChild(input)
    label.innerHTML += toggleSwitch
   
   

    div.appendChild(h1)
    div.appendChild(pAuthor)
    div.appendChild(pNumberOfPages)
    div.appendChild(pType)
    div.appendChild(buttonDelete)
    div.appendChild(label)
    divLibrary.appendChild(div)
}

function check(myLibrary){
    
        let checkbox = document.querySelectorAll('.checkbox')
        // console.log(checkbox)
        for(let i = 0; i < myLibrary.length; i++){
            let book = myLibrary[i]
            if(book.read === "Yes"){
                checkbox[i].checked = true
            }
            checkbox[i].addEventListener('change', function(){
                if(checkbox[i].checked){
                    book.read = "Yes";
                } else {
                    book.read = "No";
                }
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
                console.log(book + '   ' + book.read)

            })
        }

   
}



