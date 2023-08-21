
let FetchingData = async(value, offset) => {
  let result = await fetch(
    `https://gateway.marvel.com/v1/public/${value}?ts=1&limit=20&offset=${offset}&apikey=fc51ecbf9581e40a39dfa4cf69b993a5&hash=0ab8a111519e56ed0624d7f7a9b8fafa`
  ).then((res) => res.json());
  return result
}

//Search Data
let SearchData = async (event) => {
  let selected = document.getElementById("select").value;
  let input = document.getElementById("input_value").value.toLowerCase();
  if(selected){  
    let result = await FetchingData(selected, 0)
    let data = result.data.results;
    let serach_data = await data.filter((ele) => {
      return ele.title ? ele.title.toLowerCase().includes(input) : ele.name.includes(input);
    });
    console.log(serach_data);
    RenderElements(serach_data);
  }else{
    alert('Kindly select any Option which thing you want to search')
  }
  
};

//Get Data
let getData = async (offset) => {
  let selected = document.getElementById("select").value;
  
  let result = selected ? await FetchingData(selected, offset) : await FetchingData('characters', offset) 
  console.log(result.data.results);
  RenderElements(result.data.results);
  //Paginator
  lastpage = (Math.ceil(result.data.results.total / 20))
  Paginator()
};

//Paginator 
let startIndex = 0
let endIndex = startIndex + 4
let lastpage;

let Paginator = () => {
  let layout = ""
  layout += `<li class="page-item"><a class="page-link" href="#" onclick="">First</a></li>`;
  for (var i = startIndex; i <= endIndex; i++) {
    if (i == endIndex) {
      layout += `<li class="page-item"><a class="page-link" id="${i}" href="#" onclick="OpenPage(${i}); open_page(${i});">${i}</a></li>`;
    }
    else if (i == startIndex) {
        if (startIndex == 1) {
            layout += `<li class="page-item"><a class="page-link" id="${i}" href="#" onclick="OpenPage(${i});">${i}</a></li>`;
        } else {
          layout += `<li class="page-item"><a class="page-link" id="${i}" href="#" onclick="prev(); OpenPage(${i});">${i}</a></li>`;
        }
    }
    else {
      layout += `<li class="page-item"><a class="page-link" id="${i}" href="#" onclick="OpenPage(${i});">${i}</a></li>`;
    }
}
  layout += `<li class="page-item"><a class="page-link" href="#" onclick="">last</a></li>`;
  document.getElementById('pagination').innerHTML = layout;
}


let OpenPage = (i) => {
  let page = (i - 1) * 20;
  console.log(page++);
  if(i === endIndex){
    startIndex = startIndex + 4
    endIndex = startIndex + 4
    getData(page++)
  }
  getData(page++)
}

//Render Elements
let RenderElements = async (res) => {
  let ele = document.getElementById("Render");
  let layout = "";

  layout += `<div class="row m-0 p-0 justify-content-center">`;

  await res.forEach((ele) => {
    layout += `<div class="card m-3 p-1 shadow-lg"  style="width: 18rem;">`;
    layout += `<img src="${ele.thumbnail.path}.jpg" class="card-img-top border rounded-4" alt="..." style="height:50%; overflow: hidden";>`;
    layout += `<div class="card-body">`;
    layout += `<h5 class="card-title">${ele.name ? ele.name : ele.title}</h5>`;
    layout += `<p class="card-text">${ele.description}</p>`;
    layout += `<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>`;
    
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

window.addEventListener("load", (event) => {
  getData(0);
});
