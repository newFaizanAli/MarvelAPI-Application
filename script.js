

//Search Data
let SearchData = async (event) => {

  let selected = document.getElementById("select").value;
  let input = document.getElementById("input_value").value
  let result = await fetch(
    `https://gateway.marvel.com/v1/public/${selected}?ts=1&limit=20&apikey=fc51ecbf9581e40a39dfa4cf69b993a5&hash=0ab8a111519e56ed0624d7f7a9b8fafa`
  ).then((res) => res.json());

  let data = result.data.results

  let serach_data = await data.filter((ele) => {
        return ele.title ? ele.title.includes(input) : ele.name.includes(input)
  })
  console.log(serach_data);
  RenderElements(serach_data);
};


//Get Data 
let getData = async () => {
  let result = await fetch(
    "https://gateway.marvel.com/v1/public/characters?ts=1&limit=20&apikey=fc51ecbf9581e40a39dfa4cf69b993a5&hash=0ab8a111519e56ed0624d7f7a9b8fafa"
  ).then((res) => res.json());
  console.log(result.data.results);
  RenderElements(result.data.results);
};


//Render Elements
let RenderElements = async(res) => {
  let ele = document.getElementById("Render");
  let layout = "";

  layout += `<div class="row m-0 p-0 justify-content-center">`;

  await res.forEach((ele) => {
    layout += `<div class="card m-3 p-1"  style="width: 18rem;">`;
    layout += `<img src="${ele.thumbnail.path}.jpg" class="card-img-top" alt="..." style="height:50%; overflow: hidden";>`;
    layout += `<div class="card-body">`;
    layout += `<h5 class="card-title">${ele.name ? ele.name : ele.title}</h5>`;
    layout += `<p class="card-text">${ele.description}</p>`;
    layout += `<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>`;
    layout += `</div>`;
    layout += ` </div>`;
  });

  layout += `</div>`;

  ele.innerHTML = "";
  ele.innerHTML = layout;
};

window.addEventListener("load", (event) => {
  getData();
});
