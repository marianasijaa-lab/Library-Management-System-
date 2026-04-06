interface StoredBook {
  id: number;
  title: string;
  author: string;
  category: string;
  isAvailable: boolean;
  isRef: boolean;
  locationCode: string;
  authorBirthYear: string;
  publishDate: string;
  authorNationality: string;
  rating: string;
}

class Book {
  #title: string;
  #author: string;
  #category: string;
  #isAvailable: boolean;
  #id: number;
  #authorBirthYear: string;
  #publishDate: string;
  #authorNationality: string;
  #rating: string;

  constructor(
    id: number,
    title: string,
    author: string,
    category: string,
    isAvailable: boolean = true,
    authorBirthYear: string = "",
    publishDate: string = "",
    authorNationality: string = "",
    rating: string = ""
  ) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#category = category;
    this.#isAvailable = isAvailable;
    this.#authorBirthYear = authorBirthYear;
    this.#publishDate = publishDate;
    this.#authorNationality = authorNationality;
    this.#rating = rating;
  }

  getId() { return this.#id; }
  getTitle() { return this.#title; }
  getAuthor() { return this.#author; }
  getCategory() { return this.#category; }
  isAvailable() { return this.#isAvailable; }
  getAuthorBirthYear() { return this.#authorBirthYear; }
  getPublishDate() { return this.#publishDate; }
  getAuthorNationality() { return this.#authorNationality; }
  getRating() { return this.#rating; }

  toggleAvailability() { this.#isAvailable = !this.#isAvailable; }
  displayInfo(): string { return `${this.#title} by ${this.#author}`; }
}

// ReferenceBook Class
class ReferenceBook extends Book {
  #locationCode: string;

  constructor(
    id: number,
    title: string,
    author: string,
    category: string,
    locationCode: string,
    authorBirthYear: string = "",
    publishDate: string = "",
    authorNationality: string = "",
    rating: string = ""
  ) {
    super(id, title, author, category, true, authorBirthYear, publishDate, authorNationality, rating);
    this.#locationCode = locationCode;
  }

  getLocationCode() { return this.#locationCode; }

  displayInfo(): string {
    return `${super.displayInfo()} (Ref: ${this.#locationCode})`;
  }
}

// Library Class
class Library {
  #books: Book[] = [];

  addBook(book: Book) {
    this.#books.push(book);
    this.saveToStorage();
  }

  removeBook(id: number) {
    this.#books = this.#books.filter(b => b.getId() !== id);
    this.saveToStorage();
  }

  searchBooks(query: string): Book[] {
    return this.#books.filter(b =>
      b.getTitle().toLowerCase().includes(query.toLowerCase()) ||
      b.getAuthor().toLowerCase().includes(query.toLowerCase())
    );
  }

  filterByCategory(category: string): Book[] {
    if (category === "all") return this.#books;
    return this.#books.filter(b => b.getCategory() === category);
  }

  toggleAvailability(id: number) {
    const book = this.#books.find(b => b.getId() === id);
    if (book) book.toggleAvailability();
    this.saveToStorage();
  }

  getBooks(): Book[] { return this.#books; }

  saveToStorage() {
    const data = this.#books.map(b => {
      const isRef = b instanceof ReferenceBook;
      return {
        id: b.getId(),
        title: b.getTitle(),
        author: b.getAuthor(),
        category: b.getCategory(),
        isAvailable: b.isAvailable(),
        isRef,
        locationCode: isRef ? (b as ReferenceBook).getLocationCode() : "",
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
    if (!data) return;
    const arr = JSON.parse(data) as StoredBook[];
    this.#books = arr.map((b) => {
      return b.isRef
        ? new ReferenceBook(b.id, b.title, b.author, b.category, b.locationCode, b.authorBirthYear, b.publishDate, b.authorNationality, b.rating)
        : new Book(b.id, b.title, b.author, b.category, b.isAvailable, b.authorBirthYear, b.publishDate, b.authorNationality, b.rating);
    });
  }
}


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
} else {
  library.loadFromStorage();
}

const container = document.getElementById("booksContainer") as HTMLElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const categoryFilter = document.getElementById("categoryFilter") as HTMLSelectElement;
const addBtn = document.getElementById("addBook") as HTMLButtonElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const authorInput = document.getElementById("author") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLInputElement;
const isRefInput = document.getElementById("isReference") as HTMLInputElement;
const locationInput = document.getElementById("location") as HTMLInputElement;
const authorBirthYearInput = document.getElementById("authorBirthYear") as HTMLInputElement;
const publishDateInput = document.getElementById("publishDate") as HTMLInputElement;
const authorNationalityInput = document.getElementById("authorNationality") as HTMLInputElement;
const ratingInput = document.getElementById("rating") as HTMLInputElement;
const toggleFormBtn = document.getElementById("toggleForm") as HTMLButtonElement;
const addBookForm = document.getElementById("addBookForm") as HTMLElement;
const bookCount = document.getElementById("bookCount") as HTMLElement;

toggleFormBtn.addEventListener("click", () => {
  const isHidden = addBookForm.style.display === "none";
  addBookForm.style.display = isHidden ? "block" : "none";
  toggleFormBtn.textContent = isHidden ? "✖ Close Form" : "➕ Add New Book";
});

// ID counter
let nextId = library.getBooks().length
  ? Math.max(...library.getBooks().map(b => b.getId())) + 1
  : 1;

function getCategoryBadgeClass(category: string): string {
  const map: Record<string, string> = {
    programming: "badge-programming",
    science: "badge-science",
    history: "badge-history"
  };
  return map[category.toLowerCase()] ?? "badge-other";
}

function renderStars(rating: string): string {
  const val = parseFloat(rating);
  if (isNaN(val)) return "N/A";
  const full = Math.floor(val);
  const half = val - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return `<span class="star-rating">${"★".repeat(full)}${"½".repeat(half)}${"☆".repeat(empty)}</span> ${val}`;
}

// Render Function
function renderBooks(books: Book[]) {
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

    const detailsPanel = card.querySelector(".details-panel") as HTMLElement;
    card.querySelector(".details")!.addEventListener("click", () => {
      const isHidden = detailsPanel.style.display === "none";
      detailsPanel.style.display = isHidden ? "block" : "none";
      (card.querySelector(".details") as HTMLButtonElement).textContent = isHidden ? "Hide" : "Details";
    });

    card.querySelector(".toggle")!.addEventListener("click", () => {
      library.toggleAvailability(book.getId());
      updateView();
    });

    card.querySelector(".delete")!.addEventListener("click", () => {
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

  if (searchValue) books = library.searchBooks(searchValue);
  if (categoryValue !== "all") books = books.filter(b => b.getCategory() === categoryValue);

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
