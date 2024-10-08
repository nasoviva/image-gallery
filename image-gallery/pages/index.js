document.addEventListener("DOMContentLoaded", function () {
  const per_page = 12;
  const page = 1;
  const extras = "url_m";
  let description = "spring";
  const accessKey = "EadTIY20XojISltGLBgtmWXeD92Et1BTfoHnsKsSyZk";
  const arrayOfImages = [];
  const photoContainer = document.querySelectorAll(".img-div");
  const searchInput = document.querySelector(".search");
  const searchSvg = document.querySelector(".search-svg");
  const clearIcon = document.querySelector(".clear");
  const body = document.querySelector("body");
  const backgroundPopap = document.querySelector(".no-scroll-background");
  const popap = document.querySelectorAll(".popap");

  //Functions for get images
  function getApiUrl() {
    return `https://api.unsplash.com/search/photos?query=${description}&per_page=${per_page}&page=${page}&extras=${extras}&&client_id=${accessKey}`;
  }

  async function getData() {
    const url = getApiUrl();
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Error");
    }
    const data = await res.json();
    arrayOfImages.length = 0;
    if (data.results && data.results.length > 0) {
      for (let i = 0; i < data.results.length; i++) {
        arrayOfImages.push(data.results[i].urls.regular);
      }
      populateImages(arrayOfImages);
    } else {
      console.error("Error");
    }
  }
  searchInput.focus();
  getData();

  // Function for populate images
  function populateImages(images) {
    for (let i = 0; i < images.length; i++) {
      photoContainer[i].style.backgroundImage = `url(${images[i]})`;
      popap[i].style.backgroundImage = `url(${images[i]})`;
      photoContainer[i].addEventListener("click", function () {
        openPopap(i);
      });
    }
  }

  // Function to open the popup for a specific image
  function openPopap(index) {
    popap[index].classList.add("open");
    backgroundPopap.classList.add("open");
    body.classList.add("no-scroll");
  }

  // Function to close the popup
  function closePopap() {
    popap.forEach(function (p) {
      p.classList.remove("open");
    });
    backgroundPopap.classList.remove("open");
    body.classList.remove("no-scroll");
  }

  // Click handler for the close button
  const closeButtons = document.querySelectorAll(".popap-close");
  closeButtons.forEach(function (closeButton) {
    closeButton.addEventListener("click", closePopap);
  });

  // Click handler for the background to close the popup
  backgroundPopap.addEventListener("click", function (event) {
    if (!event.target.closest(".popap")) {
      closePopap();
    }
  });

  //Functios for input elements
  function styleInput() {
    searchInput.style.boxShadow = "0 0 0.5rem 0.1rem #9a2d2f";
    setTimeout(function () {
      searchInput.style.boxShadow = "";
    }, 300);
  }

  function clearInput() {
    searchInput.value = "";
    clearIcon.style.display = "none";
    description = "";
  }

  //Handlers for the input elements
  searchInput.addEventListener("input", (event) => {
    description = event.target.value.trim();
    clearIcon.style.display = description ? "block" : "none";
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getData();
      searchInput.blur();
    }
  });

  searchSvg.addEventListener("click", getData);

  searchSvg.addEventListener("click", styleInput);

  clearIcon.addEventListener("click", clearInput);
});
