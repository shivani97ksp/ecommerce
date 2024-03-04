// import React from "react";
// import { useState } from "react";
// import Product from "./Product";
// import './product.css'

// function ProductList() {
// //   const [productsList, setproductsList] = useState([
//     const productsList =[
//     {
//       id: 1,
//       name: "Samsung Galaxy Note 10",
//       category: "Mobiles",
//       price: 11500,
//       productImage: require("./assets/product1.jpg"),
//     },
//     {
//       id: 5,
//       name: "SkullCandy BT Inkd Plus",
//       category: "Bluetooth Headset",
//       price: 800,
//       productImage: require("./assets/product2.jpg"),
//     },
//     {
//       id: 13,
//       name: "Anker Soundbuds Rise",
//       category: "Bluetooth Headset",
//       price: 600,
//       productImage: require("./assets/product3.jpg"),
//     },
//     {
//       id: 8,
//       name: "JBL Flip 3 Bluetooth speaker",
//       category: "Speakers",
//       price: 1400,
//       productImage: require("./assets/product4.png"),
//     },
//     {
//       id: 10,
//       name: "Conekt Volt Power Bank",
//       category: "Power Bank",
//       price: 650,
//       productImage: require("./assets/product5.jpg"),
//     },
//     {
//       id: 18,
//       name: "Apple Watch Series",
//       category: "Watch",
//       price: 640,
//       productImage: require("./assets/product6.jpg"),
//     },
//     {
//       id: 20,
//       name: "IBall Slide Spirit X2",
//       category: "Tablets",
//       price: 9000,
//       productImage: require("./assets/product7.jpg"),
//     },
//     {
//       id: 22,
//       name: "Skullcandy Set 2.0 ",
//       category: "Headset",
//       price: 900,
//       productImage: require("./assets/product8.jpg"),
//     },
// ]
// //   ]);
//   const [displayProduct, SetdisplayProduct] = useState();

//   return (
//     <div className="container">
//       <div className="products">
//         {productsList.map((product, index) => {
//           return (
//             <div className="prod"
//               id={`product${index}`}
//               onClick={() => SetdisplayProduct(product)}
//             >
//               <img src={product.productImage} id={`image${index}`} alt="" />
//               <h3>{product.name}</h3>
//             </div>
//           );
//         })}
//       </div>
//       <Product product={displayProduct} />
//     </div>
//   );
// }

// export default ProductList;
