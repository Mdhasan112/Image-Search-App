const accessKey = "o4MwrhYYkzqyCPg5o_Dj1L1yZBQoel8VUACZA3Mgygw";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search-input");
const searchResult = document.querySelector(".search-images");
const showMoreBtn = document.querySelector("#show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const result = await data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  result.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-image");
    const images = document.createElement("img");
    images.src = result.urls.small;
    images.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(images);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
