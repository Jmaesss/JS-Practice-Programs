// Data Structures

class Book{
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    } 
}

class Library {
    constructor(){
        this.books = []
    }

    addBook(newBook){
        if(!this.inThisLibrary(newBook)){
            this.books.push(newBook)
        }
    }

    removeBook(title){
        this.books = this.books.filter((book) => book.title !== title)
    }
    getBook(title){
        return this.books.find((book) => book.title === title)
    }
    inThisLibrary(newBook){
        return this.books.some((book) => book.title === newBook.title)
    }
}
const library = new Library()

// Local Storage functions
const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
}

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library')) || []
    library.books = books
    updateBooksGrid()
}

// UI

const addBookBtn = document.getElementById('addBookBtn')
const addBookModel = document.getElementById('addBookModel')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('addBookForm')
const booksGrid = document.getElementById('booksGrid')
const themeToggle = document.getElementById('themeToggle')
const themeIcon = themeToggle.querySelector('i')


const openAddBookModel = () => {
    addBookForm.reset()
    addBookModel.classList.add('active')
    overlay.classList.add('active')
}
const closeAddBookModel = () => {
    addBookModel.classList.remove('active')
    overlay.classList.remove('active')
}
const closeAllModels = () => {
    closeAddBookModel()
}

const handleKeyboardInputs = (e) => {
    if(e.key === `Escape`) closeAllModels()
}
const updateBooksGrid = () => {
    resetBooksGrid()
    for(let book of library.books){
        createBookCard(book)
    }
}

const resetBooksGrid = () => {
    booksGrid.innerHTML = ''
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    bookCard.classList.add('book-card')
    buttonGroup.classList.add('button-group')
    readBtn.classList.add('btn')
    removeBtn.classList.add('btn')
    readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook
    
    title.textContent = `${book.title}`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = 'Remove'

    if (book.isRead){
        readBtn.textContent = 'Read'
        readBtn.classList.add('btn-light-green')
    } else {
        readBtn.textContent = 'Not Read'
        readBtn.classList.add('btn-light-red')
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    buttonGroup.appendChild(readBtn)
    buttonGroup.appendChild(removeBtn)
    bookCard.appendChild(buttonGroup)
    booksGrid.appendChild(bookCard)
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
}
const addBook = (e) => {
  e.preventDefault()
  console.log('Adding book...')
  const newBook = getBookFromInput()
  library.addBook(newBook)
  saveLocal()
  updateBooksGrid()
  closeAddBookModel()
}

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.textContent
  library.removeBook(title)
  saveLocal()
  updateBooksGrid()
}

const toggleRead = (e) => {
  const button = e.target
  const title = button.parentNode.parentNode.firstChild.textContent
  const book = library.books.find(book => book.title === title)
  if (book) {
    book.isRead = !book.isRead
    button.textContent = book.isRead ? 'Read' : 'Not Read'
    button.classList.remove(book.isRead ? 'btn-light-red' : 'btn-light-green')
    button.classList.add(book.isRead ? 'btn-light-green' : 'btn-light-red')
    saveLocal()
  }
}

// Theme Management
const getCurrentTheme = () => {
    return localStorage.getItem('theme') || 'light'
}

const saveTheme = (theme) => {
    localStorage.setItem('theme', theme)
}

const toggleTheme = () => {
    const currentTheme = getCurrentTheme()
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    
    document.documentElement.setAttribute('data-theme', newTheme)
    themeIcon.className = newTheme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
    saveTheme(newTheme)
}

// Initialize theme
document.documentElement.setAttribute('data-theme', getCurrentTheme())
themeIcon.className = getCurrentTheme() === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'

// Event Listeners
addBookBtn.onclick = openAddBookModel
overlay.onclick = closeAllModels
addBookForm.onsubmit = addBook
window.onkeydown = handleKeyboardInputs
themeToggle.onclick = toggleTheme

// Load saved books when page loads
restoreLocal()