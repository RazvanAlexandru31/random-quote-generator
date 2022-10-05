// Get quotes from API https://type.fit/api/quotes
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const quoteNewBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")

let apiQuotes = [];

function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
  loading();
  const random = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(random)

  // Check if the author is null
  if (!random.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = random.author;
  }

  if (random.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = random.text;
  loadingComplete();
}

async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    // console.log(apiQuotes)
  } catch (error) {}
}


// Event Listeners
quoteNewBtn.addEventListener("click", newQuote);
getQuote();

