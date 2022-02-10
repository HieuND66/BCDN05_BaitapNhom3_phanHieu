// import

// import Products from "../models/ad-Products.js"
hienThiDanhSachGioHang()






// Xử lí trên giao diện
let sideBar = document.querySelector('.side-bar');
document.querySelector('#menu-btn').onclick = () => {
    sideBar.classList.toggle('active');
}

document.querySelector('#close-side-bar').onclick = () => {
    sideBar.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}

/// Tạo list Product
function getData() {
    axios({
            method: 'get',
            url: 'https://61d6e9e735f71e0017c2e8c7.mockapi.io/smartphone',
        })
        .then(function (result) {
            // console.log(result.data);
            hienThiDS(result.data)
        })
        .catch(function (error) {
            console.log(error);
        })

}
getData();
let listProduct = []
// Hiển thị  lên giao diện
function hienThiDS(mangSP) {
    // console.log(mangSP);
    listProduct = mangSP;
    console.log(listProduct);
    var content = "";
    mangSP.map(function (sp, index) {
        content += `
        <div class="box">
            <div class="image">
                <img src="${sp.img}" class="main-img" alt="">
                <div class="icons" onclick="addToCart(${index})">
                    <i class="fas fa-shopping-cart"></i>
                </div>
            </div>
            <div class="content">
                <h3>${sp.name}</h3>
                <div class="products-info">
                    <p>price: ${sp.price}$</p>
                    <p>screen: ${sp.screen}</p>
                    <p>backCamera: ${sp.backCamera}</p>
                    <p>frontCamera: ${sp.frontCamera}</p>
                    <p>${sp.desc}</p>
                </div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
            </div>
        </div>
        `
    })
    document.getElementById("productList").innerHTML = content;
}


/// CART--------------------

// Hiện thị danh sách giỏ hàng
function hienThiDanhSachGioHang() {
    // var jsonDanhSachSanPham = localStorage.getItem('cart')
    // var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
    // Get local storage
    var danhSachSanPham = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    // console.log(danhSachSanPham);
    var content = "";
    danhSachSanPham.map(function (sp) {
        content += `
        <div class="cart_item">
        <div class="picture_item">
            <img src="${sp.img}" alt="">
        </div>
        <p class="name_item">${sp.name}</p>
        <div class="price_item">
            <span class="giaBan">${sp.price}$</span>
        </div>
        <input type="number" class="soLuong_item" value="1">
        <p class="tongTien">${sp.price}$</p>
        <i class="far fa-trash-alt" onclick = "deleteCart(${sp.id})"></i>
    </div>
        `
    })
    document.getElementById("cart").innerHTML = content;
}


// Xử lý giỏ hàng

// Set local Storage
function setLocalStorage(mang) {
    // stringify: chuyển kiểu array sang json
    //localStorage: đối tượng có sẵn của JS
    // JSON: đối tượng của JS
    localStorage.setItem("cart", JSON.stringify(mang))

}

function addToCart(id) {
    // console.log(listProduct[id]);
    // console.log(listProduct.length);
    var content = "";
    // Get local storage
    let cartList = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    // let cartList = [];
    // console.log(cartList);


    cartList.push(listProduct[id])
    setLocalStorage(cartList)
    cartList.map(function (sp) {
        // console.log("san pham: " + sp);
        content += `
        <div class="cart_item">
        <div class="picture_item">
            <img src="${sp.img}" alt="">
        </div>
        <p class="name_item">${sp.name}</p>
        <div class="price_item">
            <span class="giaBan">${sp.price}$</span>
        </div>
        <input type="number" class="soLuong_item" value="1">
        <p class="tongTien">${sp.price}$</p>
        <i class="far fa-trash-alt"></i>
    </div>
        `
    })
    document.getElementById("cart").innerHTML = content;
}
window.addToCart = addToCart
// function chuyenDoiTuongItemSangHTML(mangSP) {
//     listProduct = mangSP;
//     // console.log(listProduct);
//     var content = "";
//     mangSP.map(function(sp, index){
//         content += `
//         <div class="cart_item">
//         <div class="picture_item">
//             <img src="./images/product-1.jpg" alt="">
//         </div>
//         <p class="name_item">Iphone5</p>
//         <div class="price_item">
//             <span class="giaGoc">5000</span>
//             <span class="giaBan">4000</span>
//         </div>
//         <input type="number" class="soLuong_item" value="1">
//         <p class="tongTien">4000</p>
//         <i class="far fa-trash-alt"></i>
//     </div>
//         `
//     })
//     document.getElementById("productList").innerHTML = content;
// }

// Delete Cart


function deleteCart(id) {
    // Get local storage
    var danhSachSanPham = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    // console.log(danhSachSanPham);
    danhSachSanPham = danhSachSanPham.filter(item => item.id != id)
    setLocalStorage(danhSachSanPham)
    hienThiDanhSachGioHang()
    // let cartItem = document.querySelectorAll(".cart_item")
    // // console.log(cartItem);
    // for (var i = 0; i < cartItem.length; i++) {
    //     var productSelect = document.querySelectorAll(".cart_item i")
    //     // console.log(productDelete);
    //     productSelect[i].addEventListener('click', function (event) {
    //         var cartDelete = event.target
    //         console.log(cartDelete);
    //         var cartParent = cartDelete.parentElement
    //         console.log(cartParent);
    //         console.log(typeof danhSachSanPham);
    //     })
    // }
}
window.deleteCart = deleteCart