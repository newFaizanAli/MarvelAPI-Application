let FetchingData = async (value, offset, limit) => {
  let result = await fetch(
    `https://gateway.marvel.com/v1/public/${value}?ts=1&limit=${limit}&offset=${offset}&apikey=fc51ecbf9581e40a39dfa4cf69b993a5&hash=0ab8a111519e56ed0624d7f7a9b8fafa`
  ).then((res) => res.json());
  return result;
};

//Search Data
let SearchData = async () => {
  let input = document.getElementById("input_value").value.toLowerCase();
  if (id) {
    let result = await FetchingData(id, 0, 90);
    let data = result.data.results;
    let serach_data = await data.filter((ele) => {
      return ele.title
        ? ele.title.toLowerCase().includes(input)
        : ele.name.includes(input);
    });
    console.log(serach_data);
    RenderElements(serach_data);
  } else {
    alert("Kindly select any Option which thing you want to search");
  }
};


//Open Page 

let Open_Page = () => {
  let selected = document.getElementById("select").value;
  console.log(selected);
  window.open(`/item.html?id=${selected}`,"_self")
}


//URL Params
const url = window.location.search;
console.log(url);
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id')

let getData = async () => {
  let result = await FetchingData(id, 10 , 20)
  RenderElements(result.data.results);
};


//Render Elements
let RenderElements = async (res) => {
  let ele = document.getElementById("Render");
  let layout = "";

  layout += `<div class="row m-0 p-0 justify-content-center">`;

  await res.forEach((ele) => {
    layout += `<div class="card m-3 p-1 shadow-lg"  style="width: 18rem; height:auto">`;
    layout += `<img src="${ele.thumbnail.path}.jpg" class="card-img-top border rounded-4" alt="..." style="height:50%; overflow: hidden";>`;
    layout += `<div class="card-body">`;
    layout += `<h5 class="card-title">${ele.name ? ele.name : ele.title}</h5>`;
    layout += `<p class="card-text">${
      ele.description ? ele.description.slice(1, 80) : `Description not found`
    }....</p>`;
    layout += `</div>`;
    layout += `<div class="d-flex justify-content-center align-self-center">`;
    layout += `<button type="button" class="btn btn-warning ">More Info</button>`;
    layout += `</div>`;
    layout += ` </div>`;
  });

  layout += `</div>`;

  ele.innerHTML = "";
  ele.innerHTML = layout;
};


let Set_Slider = () => {
  var splide = new Splide('.splide', {
    type: 'loop',
    perPage: 4,
    lazyLoad: 'nearby',
    perMove: 1,
    breakpoints: {
      400: {
        perPage: 1,
      },
      800: {
        perPage: 2,
      }
    },
  });

  splide.mount();
}

let Card_Slider = async (ElementID, value) => {
  let ele = document.getElementById(ElementID);
  let res = await FetchingData(value, 20, 6)
  .then((res) => {return res.data.results})
  console.log(res);
    // .then((res) => console.log(res));
  let layout = "";
  await res.forEach((ele) => {
    layout += `<li class="splide__slide" id="splide__slide">`;
    layout += ` <div class="card m-2" style="width: 18rem;">`;
    layout += `<div class="card-body">`;
    layout += `<img src="${ele.thumbnail.path}.jpg" class="card-img-top border rounded-4" alt="..."
    style="height:50%; overflow: hidden";>`
    layout += `<h5 class="card-title text-center">${ele.name}</h5>`;
    layout += ` </div>`;
    layout += `</div>`;
    layout += `</li>`;
  });

  ele.innerHTML = layout;
  //Set Slider
  Set_Slider()

};

let Load_Characters = () => {
  Card_Slider("Character_list" ,"characters");
};

window.addEventListener("load", (event) => {
  id ? getData() : Load_Characters()
});
