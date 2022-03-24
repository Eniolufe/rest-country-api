// variable declaration
const countries = document.querySelector(".country-container");
const dropDown = document.querySelector(".dropdown");
const dropElements = document.querySelector(".drop-region");
const regionFilters = document.querySelectorAll(".region");

const toggleButton = document.querySelector(".toggle-btn");
const searchElements = document.querySelector(".search");
const countryModal = document.querySelector(".show");
const backBtn = document.querySelector(".back");

async function getCountry() {
  const url = await fetch("https://restcountries.com/v2/all");
  const res = await url.json();
  // console.log(res);
  res.forEach((element) => {
    showCountry(element);
  });
}
getCountry();

//display country data
function showCountry(data) {
  const countryElements = document.createElement("div");
  countryElements.classList.add("country");
  countryElements.innerHTML = ` <img src="${data.flag}" alt="${data.name}" />
  <div class="country-details">
    <h3 class="country-name">${data.name}</h3>
    <p><strong>Population: </strong>${data.population}</p>
    <p class="regionName"><strong>Region: </strong>${data.region}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
  </div>`;
  countries.appendChild(countryElements);
  const countryData = data;
  countryElements.addEventListener("click", () => {
    showCountryDetails(countryData);
    countryModal.style.display = "flex";
  });
}

function showCountryDetails(country) {
  // countryModal.style.display = "none";
  countryModal.innerHTML = `
  <button class="back" onclick="closeEvent()">
  <i class="fa-solid fa-arrow-left-long"></i>
  Back
    </button>
<div class="modal">
  <div class="left-modal">
    <img src="${country.flag}" alt="${country.name}" />
  </div>
   
   <div class="right-modal">
   <h3>${country.name}</h3>
    <div class="modal-details">
      <div class="inner-left inner">
        <p><strong>Native Name</strong>${country.nativeName}</p>
        <p><strong>Population: </strong>${country.population}</p>
        <p class="regionName"><strong>Region: </strong>${country.region}</p>
        <p><strong>Sub-Region: </strong>${country.subregion}</p>
        <p><strong>Capital: </strong>${country.capital}</p>
      </div>
      <div class="inner-right inner">
        <p><strong>Top Level Domain: </strong>${country.topLevelDomain}</p>
        <p><strong>Currencies: </strong>${country.currencies[0]["name"]}</p>
        <p ><strong>Languages: </strong>${country.languages[0]["name"]}</p>
      </div> 
   </div>
   <div class="borders">
   <p><strong>Border Countries: </strong>${country.borders}</p>    
        <button></button>
        <button></button>
        <button></button>
      </div>
  </div>
</div>`;

  return countryModal;
}

//event listener
dropDown.addEventListener("click", () => {
  dropElements.classList.toggle("showDrop");
});
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const closeEvent = () => {
  countryModal.style.display = "none";
};

searchElements.addEventListener("input", (e) => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach((name) => {
    // console.log(name.innerText);
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

// Region Filter
regionFilters.forEach((element) => {
  element.addEventListener("click", () => {
    const value = element.innerText;
    const regionName = document.querySelectorAll(".country-name");
    regionName.forEach((region) => {
      // console.log(region.innerText);
      if (region.innerText.includes(value) || value === "All") {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
