"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Book_title, _Book_author, _Book_category, _Book_isAvailable, _Book_id, _Book_authorBirthYear, _Book_publishDate, _Book_authorNationality, _Book_rating, _ReferenceBook_locationCode, _Library_books;
class Book {
    constructor(id, title, author, category, isAvailable = true, authorBirthYear = "", publishDate = "", authorNationality = "", rating = "") {
        _Book_title.set(this, void 0);
        _Book_author.set(this, void 0);
        _Book_category.set(this, void 0);
        _Book_isAvailable.set(this, void 0);
        _Book_id.set(this, void 0);
        _Book_authorBirthYear.set(this, void 0);
        _Book_publishDate.set(this, void 0);
        _Book_authorNationality.set(this, void 0);
        _Book_rating.set(this, void 0);
        __classPrivateFieldSet(this, _Book_id, id, "f");
        __classPrivateFieldSet(this, _Book_title, title, "f");
        __classPrivateFieldSet(this, _Book_author, author, "f");
        __classPrivateFieldSet(this, _Book_category, category, "f");
        __classPrivateFieldSet(this, _Book_isAvailable, isAvailable, "f");
        __classPrivateFieldSet(this, _Book_authorBirthYear, authorBirthYear, "f");
        __classPrivateFieldSet(this, _Book_publishDate, publishDate, "f");
        __classPrivateFieldSet(this, _Book_authorNationality, authorNationality, "f");
        __classPrivateFieldSet(this, _Book_rating, rating, "f");
    }
    getId() { return __classPrivateFieldGet(this, _Book_id, "f"); }
    getTitle() { return __classPrivateFieldGet(this, _Book_title, "f"); }
    getAuthor() { return __classPrivateFieldGet(this, _Book_author, "f"); }
    getCategory() { return __classPrivateFieldGet(this, _Book_category, "f"); }
    isAvailable() { return __classPrivateFieldGet(this, _Book_isAvailable, "f"); }
    getAuthorBirthYear() { return __classPrivateFieldGet(this, _Book_authorBirthYear, "f"); }
    getPublishDate() { return __classPrivateFieldGet(this, _Book_publishDate, "f"); }
    getAuthorNationality() { return __classPrivateFieldGet(this, _Book_authorNationality, "f"); }
    getRating() { return __classPrivateFieldGet(this, _Book_rating, "f"); }
    toggleAvailability() { __classPrivateFieldSet(this, _Book_isAvailable, !__classPrivateFieldGet(this, _Book_isAvailable, "f"), "f"); }
    displayInfo() { return `${__classPrivateFieldGet(this, _Book_title, "f")} by ${__classPrivateFieldGet(this, _Book_author, "f")}`; }
}
_Book_title = new WeakMap(), _Book_author = new WeakMap(), _Book_category = new WeakMap(), _Book_isAvailable = new WeakMap(), _Book_id = new WeakMap(), _Book_authorBirthYear = new WeakMap(), _Book_publishDate = new WeakMap(), _Book_authorNationality = new WeakMap(), _Book_rating = new WeakMap();
// ReferenceBook Class
class ReferenceBook extends Book {
    constructor(id, title, author, category, locationCode, authorBirthYear = "", publishDate = "", authorNationality = "", rating = "") {
        super(id, title, author, category, true, authorBirthYear, publishDate, authorNationality, rating);
        _ReferenceBook_locationCode.set(this, void 0);
        __classPrivateFieldSet(this, _ReferenceBook_locationCode, locationCode, "f");
    }
    getLocationCode() { return __classPrivateFieldGet(this, _ReferenceBook_locationCode, "f"); }
    displayInfo() {
        return `${super.displayInfo()} (Ref: ${__classPrivateFieldGet(this, _ReferenceBook_locationCode, "f")})`;
    }
}
_ReferenceBook_locationCode = new WeakMap();
// Library Class
class Library {
    constructor() {
        _Library_books.set(this, []);
    }
    addBook(book) {
        __classPrivateFieldGet(this, _Library_books, "f").push(book);
        this.saveToStorage();
    }
    removeBook(id) {
        __classPrivateFieldSet(this, _Library_books, __classPrivateFieldGet(this, _Library_books, "f").filter(b => b.getId() !== id), "f");
        this.saveToStorage();
    }
    searchBooks(query) {
        return __classPrivateFieldGet(this, _Library_books, "f").filter(b => b.getTitle().toLowerCase().includes(query.toLowerCase()) ||
            b.getAuthor().toLowerCase().includes(query.toLowerCase()));
    }
    filterByCategory(category) {
        if (category === "all")
            return __classPrivateFieldGet(this, _Library_books, "f");
        return __classPrivateFieldGet(this, _Library_books, "f").filter(b => b.getCategory() === category);
    }
    toggleAvailability(id) {
        const book = __classPrivateFieldGet(this, _Library_books, "f").find(b => b.getId() === id);
        if (book)
            book.toggleAvailability();
        this.saveToStorage();
    }
    getBooks() { return __classPrivateFieldGet(this, _Library_books, "f"); }
    saveToStorage() {
        const data = __classPrivateFieldGet(this, _Library_books, "f").map(b => {
            const isRef = b instanceof ReferenceBook;
            return {
                id: b.getId(),
                title: b.getTitle(),
                author: b.getAuthor(),
                category: b.getCategory(),
                isAvailable: b.isAvailable(),
                isRef,
                locationCode: isRef ? b.getLocationCode() : "",
                authorBirthYear: b.getAuthorBirthYear(),
                publishDate: b.getPublishDate(),
                authorNationality: b.getAuthorNationality(),
                rating: b.getRating()
            };
        });
        localStorage.setItem("books", JSON.stringify(data));
    }
    loadFromStorage() {
        const data = localStorage.getItem("books");
        if (!data)
            return;
        const arr = JSON.parse(data);
        __classPrivateFieldSet(this, _Library_books, arr.map((b) => {
            return b.isRef
                ? new ReferenceBook(b.id, b.title, b.author, b.category, b.locationCode, b.authorBirthYear, b.publishDate, b.authorNationality, b.rating)
                : new Book(b.id, b.title, b.author, b.category, b.isAvailable, b.authorBirthYear, b.publishDate, b.authorNationality, b.rating);
        }), "f");
    }
}
_Library_books = new WeakMap();
// UI Logic
const library = new Library();
if (!localStorage.getItem("books")) {
    library.addBook(new Book(1, "Clean Code", "Robert Martin", "Programming", true, "1952", "2008", "American", "4.5"));
    library.addBook(new Book(2, "JavaScript Guide", "John Doe", "Programming", true, "1980", "2015", "British", "4.0"));
    library.addBook(new Book(3, "TypeScript Basics", "Alex Smith", "Programming", true, "1990", "2020", "Canadian", "4.2"));
    library.addBook(new Book(4, "HTML & CSS Design", "Jon Duckett", "Programming", true, "1975", "2011", "British", "4.7"));
    library.addBook(new Book(5, "Physics Basics", "Albert Newton", "Science", true, "1960", "2000", "German", "4.3"));
    library.addBook(new Book(6, "Quantum Mechanics", "Max Planck", "Science", true, "1858", "1900", "German", "4.8"));
    library.addBook(new Book(7, "Biology 101", "Charles Darwin", "Science", true, "1809", "1859", "British", "4.6"));
    library.addBook(new Book(8, "World History", "Smith", "History", true, "1970", "2005", "American", "3.9"));
    library.addBook(new Book(9, "Ancient Civilizations", "Herodotus", "History", true, "484 BC", "440 BC", "Greek", "4.4"));
    library.addBook(new Book(10, "Modern History", "Eric Hobsbawm", "History", true, "1917", "1994", "British", "4.5"));
    library.addBook(new ReferenceBook(11, "Encyclopedia", "Britannica", "Science", "A1", "", "2010", "International", "4.9"));
    library.addBook(new ReferenceBook(12, "Dictionary", "Oxford", "Programming", "B2", "", "2019", "British", "4.8"));
    library.addBook(new ReferenceBook(13, "Atlas", "National Geographic", "History", "C3", "", "2018", "American", "4.7"));
}
else {
    library.loadFromStorage();
}
const container = document.getElementById("booksContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const addBtn = document.getElementById("addBook");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categoryInput = document.getElementById("category");
const isRefInput = document.getElementById("isReference");
const locationInput = document.getElementById("location");
const authorBirthYearInput = document.getElementById("authorBirthYear");
const publishDateInput = document.getElementById("publishDate");
const authorNationalityInput = document.getElementById("authorNationality");
const ratingInput = document.getElementById("rating");
const toggleFormBtn = document.getElementById("toggleForm");
const addBookForm = document.getElementById("addBookForm");
const bookCount = document.getElementById("bookCount");
toggleFormBtn.addEventListener("click", () => {
    const isHidden = addBookForm.style.display === "none";
    addBookForm.style.display = isHidden ? "block" : "none";
    toggleFormBtn.textContent = isHidden ? "✖ Close Form" : "➕ Add New Book";
});
// ID counter
let nextId = library.getBooks().length
    ? Math.max(...library.getBooks().map(b => b.getId())) + 1
    : 1;
function getCategoryBadgeClass(category) {
    var _a;
    const map = {
        programming: "badge-programming",
        science: "badge-science",
        history: "badge-history"
    };
    return (_a = map[category.toLowerCase()]) !== null && _a !== void 0 ? _a : "badge-other";
}
function renderStars(rating) {
    const val = parseFloat(rating);
    if (isNaN(val))
        return "N/A";
    const full = Math.floor(val);
    const half = val - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return `<span class="star-rating">${"★".repeat(full)}${"½".repeat(half)}${"☆".repeat(empty)}</span> ${val}`;
}
// Render Function
function renderBooks(books) {
    container.innerHTML = "";
    bookCount.textContent = `${books.length} book${books.length !== 1 ? "s" : ""} found`;
    if (books.length === 0) {
        container.innerHTML = "<p>No books found 😢</p>";
        return;
    }
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";
        const isRef = book instanceof ReferenceBook;
        const availabilityClass = book.isAvailable() ? "available" : "not-available";
        const catBadge = getCategoryBadgeClass(book.getCategory());
        card.innerHTML = `
      <div class="card-badges">
        <span class="badge ${catBadge}">${book.getCategory()}</span>
        ${isRef ? '<span class="badge badge-ref">Reference</span>' : ""}
      </div>
      <h3>${book.getTitle()}</h3>
      <p><strong>Author:</strong> ${book.getAuthor()}</p>
      <p class="${availabilityClass}">${book.isAvailable() ? "✅ Available" : "❌ Not Available"}</p>
      <p class="card-info">${book.displayInfo()}</p>
      <div class="details-panel" style="display:none;">
        <p><strong>Birth Year:</strong> ${book.getAuthorBirthYear() || "N/A"}</p>
        <p><strong>Published:</strong> ${book.getPublishDate() || "N/A"}</p>
        <p><strong>Nationality:</strong> ${book.getAuthorNationality() || "N/A"}</p>
        <p><strong>Rating:</strong> ${book.getRating() ? renderStars(book.getRating()) : "N/A"}</p>
      </div>
      <div class="card-actions">
        <button class="details">Details</button>
        <button class="toggle">Toggle</button>
        <button class="delete">Delete</button>
      </div>
    `;
        const detailsPanel = card.querySelector(".details-panel");
        card.querySelector(".details").addEventListener("click", () => {
            const isHidden = detailsPanel.style.display === "none";
            detailsPanel.style.display = isHidden ? "block" : "none";
            card.querySelector(".details").textContent = isHidden ? "Hide" : "Details";
        });
        card.querySelector(".toggle").addEventListener("click", () => {
            library.toggleAvailability(book.getId());
            updateView();
        });
        card.querySelector(".delete").addEventListener("click", () => {
            library.removeBook(book.getId());
            updateView();
        });
        container.appendChild(card);
    });
}
// Update View
function updateView() {
    let books = library.getBooks();
    const searchValue = searchInput.value.trim();
    const categoryValue = categoryFilter.value;
    if (searchValue)
        books = library.searchBooks(searchValue);
    if (categoryValue !== "all")
        books = books.filter(b => b.getCategory() === categoryValue);
    renderBooks(books);
}
// Events
searchInput.addEventListener("input", updateView);
categoryFilter.addEventListener("change", updateView);
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const category = categoryInput.value.trim();
    const isRef = isRefInput.checked;
    const location = locationInput.value.trim();
    const authorBirthYear = authorBirthYearInput.value.trim();
    const publishDate = publishDateInput.value.trim();
    const authorNationality = authorNationalityInput.value.trim();
    const rating = ratingInput.value.trim();
    if (!title || !author || !category || (isRef && !location)) {
        alert("Please fill all required fields");
        return;
    }
    const book = isRef
        ? new ReferenceBook(nextId++, title, author, category, location, authorBirthYear, publishDate, authorNationality, rating)
        : new Book(nextId++, title, author, category, true, authorBirthYear, publishDate, authorNationality, rating);
    library.addBook(book);
    titleInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";
    isRefInput.checked = false;
    locationInput.value = "";
    authorBirthYearInput.value = "";
    publishDateInput.value = "";
    authorNationalityInput.value = "";
    ratingInput.value = "";
    updateView();
});
// Initial Render
updateView();
