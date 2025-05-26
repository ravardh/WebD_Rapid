async function getProduct() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  const prod = document.getElementById("products");
  prod.innerHTML="";
  console.log(data);

  data.forEach((element) => {
    const d = document.createElement("div");

    d.innerHTML = `
    <div class="container bg-light border rounded d-flex gap-4 p-2 my-2">
            <!--products -->
            <div class="w-25">
              <img
                src=${element.image}
                alt=""
                class="w-100 object-fit-contain"
              />
            </div>
            <div class="container">
              <h2>${element.title}</h2>
              <h6>Category <span>${element.category}</span></h6>
              <h4>Price: <span>$ ${element.price} </span></h4>
              <p>
               ${element.description}
              </p>
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
