const per_page = 12;
const page = 1;
const extras = "url_m";
let description = "spring";
const accessKey = 'EadTIY20XojISltGLBgtmWXeD92Et1BTfoHnsKsSyZk';
const arrayOfImages = [];

function getApiUrl() {
  return `https://api.unsplash.com/search/photos?query=${description}&per_page=${per_page}&page=${page}&extras=${extras}&&client_id=${accessKey}`;
}

const photoContainer = document.querySelector('.main-container');

function populateImages(images) {
    photoContainer.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
        const div = document.createElement('div');
        div.className = 'img-div';
        div.style.backgroundImage = `url(${images[i]})`;
        photoContainer.appendChild(div);
    }
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

getData();


//Click handlers for the input
document.querySelector('.search').addEventListener('input', (e) => {
  description = e.target.value.trim();
  if (description.length === 0) {
    description = 'spring';
  }
});

document.querySelector('.search').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
      getData();
  }
});

document.querySelector('.search-svg').addEventListener("click", getData);
