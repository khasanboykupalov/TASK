let page = 1;
const pageSize = 20;
let pages = 1;
let title = "";

let tbodyElement = document.getElementById("myTable");
let prevPageButton = document.getElementById("prevPage");
let nextPageButton = document.getElementById("nextPage");

function searchTitle(event) {
  title = event.target.value;
  fetchData();
}

function paginationFunc(pageData) {
  page += pageData;
  if (page < 1) {
    page = 1;
  }
  if (page > pages) {
    page = pages;
  }
  fetchData();
}

function fetchData() {
  let url = ``;
  if (title) {
    url = `https://kep.uz/api/problems?page=${page}&page_size=${pageSize}&title=${title}`;
  } else {
    url = `https://kep.uz/api/problems?page=${page}&page_size=${pageSize}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      getProblemData(json);
      pages = json.pages;
      let data = json.data;
      let size = data.length;
      if (size < 20) {
        if (nextPageButton && !nextPageButton.disabled) {
          nextPageButton.classList.add("disabled-btn");
          nextPageButton.disabled = true;
        }
      } else {
        nextPageButton.classList.remove("disabled-btn");
        updatePagination();
      }
    });
}

function getProblemData(data) {
  dates = data.data;
  tbodyElement.innerHTML = "";

  dates.forEach((date) => {
    let newRow = document.createElement("tr");
    let tagsNames = date.tags.map((tag) => tag.name);

    let tagsButtons = tagsNames.map(
      (tagName) => `<span class="tag">${tagName}</span>`
    );

    function tags() {
      tagsNames.forEach((tag) => {
        return tag;
      });
    }

    newRow.innerHTML = `
            <td>${date.id}</td>
            <td>${date.title}</td>
            <td>${date.difficultyTitle}</td>
            <td> 
            <div class="tag-name">
            ${tagsButtons.join(" ")}
        </div>
            </td>
            <td> 
                <div>
                    <i class="fa-regular fa-thumbs-up"></i>    
                    ${date.likesCount} 
                </div>
                <div>
                    <i class="fa-regular fa-thumbs-down"></i>
                    ${date.dislikesCount}
                </div>
            </td>
            <td> 
                <span class="solved">
                    ${date.solved}
                </span> 
                / 
                <span class="attempCount">
                    ${date.attemptsCount}
                </span> 
            </td>
        `;

    tbodyElement.appendChild(newRow);
  });
}

function updatePagination() {
  document.getElementById("page").innerText = page;
  prevPageButton.disabled = page === 1;
  nextPageButton.disabled = page === pages;
}

fetchData();
