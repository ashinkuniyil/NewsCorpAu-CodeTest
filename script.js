import { generateLeftArticle } from "./leftArticle.js";
import { generateRightArticle } from "./rightArticle.js";

// config
const loader = document.querySelector("#loading");
const leftContianer = document.querySelector("#left-contianer");
const leftArticle = document.querySelector("#left-article");
const rightArticle = document.querySelector("#right-article");
const pageMockUrl = "./mock-api/page.json";
const collectionMockUrl = "./mock-api/collection.json";
const currentPage = "landing";

// showing loading
function displayLoading() {
  loader.classList.add("display");
  leftContianer.classList.remove("display");
}

// hiding loading
function hideLoading() {
  loader.classList.remove("display");
  leftContianer.classList.add("display");
}

// fetch landing page data
function fetchLanding(currentPage) {
  displayLoading();
  fetch(pageMockUrl)
    .then((response) => response.json())
    .then((pages) => {
      const seletedPageInfo = pages.filter(
        (page) => page?.collectiontype === currentPage
      );
      if (seletedPageInfo) {
        fetch(collectionMockUrl)
          .then((response) => response.json())
          .then((collections) => {
            console.log(collections);
            if (collections) {
              collections.forEach((article) => {
                if (article?.Possition === "left") {
                  leftArticle.innerHTML += generateLeftArticle(article);
                } else if (article?.Possition === "right") {
                  rightArticle.innerHTML += generateRightArticle(article);
                }
              });
            }
            hideLoading();
          });
      } else {
        hideLoading();
      }
    });
}

fetchLanding(currentPage);
