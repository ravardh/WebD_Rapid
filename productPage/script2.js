async function getProduct() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  const prod = document.getElementById("products");
  prod.innerHTML = "";
  console.log(data);

  data.forEach((element) => {
    const d = document.createElement("div");
    d.classList.add("col-4");

    d.innerHTML = `
           
            <div class="card d-grid gap-2 mt-2 overflow-hidden" style="height: 500px" onclick="viewProduct(${element.id})">
             <div class="container text-center">
                 <img
                src=${element.image}
                alt=""
                height="300px"
                width="100%"
                class="object-fit-contain"
              />
             </div>
              <div class="container">
                <h2> ${
                  element.title.length > 20
                    ? element.title.slice(0, 20) + "…"
                    : element.title
                }</h2>
                <h6>Category <span>${element.category}</span></h6>
                <h4>Price: <span>$ ${element.price}  </span></h4>

                <div>
                  <button class="btn btn-primary">Buy Now</button>
                  <button class="btn btn-outline-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          
    `;

    prod.appendChild(d);
  });
}

getProduct();


function viewProduct(id){
    console.log("Product id: ",id);
    
}