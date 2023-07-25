

var form=document.getElementById('myForm');
var list=document.getElementById('items');
var itemName=document.getElementById('itemName');
var category=document.getElementById('category');
var price=document.getElementById('price');
var quantity=document.getElementById('quantity');

var form=document.getElementById('myForm');
var list=document.getElementById('items');

window.addEventListener("DOMContentLoaded", async () => {
try {
let res = await axios.get("https://crudcrud.com/api/1250cddc7ed944c390534b64e9aa5d89/itemData")

for (let i = 0; i < res.data.length; i++) {
list.innerHTML += `<li class="lists"><span class="span" style="display:none">${res.data[i]._id}</span> <span class="span">${res.data[i].ItemName}</span> <span class="span">${res.data[i].Category}</span> <span class="span">${res.data[i].Price}</span><span class="span">${res.data[i].Quantity}</span><button class="Buy">Buy</button></li>`

}


} catch (error) {
console.log(error)

}

})

//Add items
form.addEventListener("submit", async (e) => {
e.preventDefault()
try {

let itemObj={
        "ItemName":itemName.value,
        "Category":category.value,
        "Price":price.value,
        "Quantity":quantity.value,
        
}
const data  = await axios.post("https://crudcrud.com/api/1250cddc7ed944c390534b64e9aa5d89/itemData",itemObj)

console.log(data)


list.innerHTML += `<li class="lists"><span class="span" style="display:none">${data._id}</span> <span class="span"">${data.ItemName}</span> <span class="span">${data.Category}</span> <span class="span">${data.Price}</span><span class="span">${data.Quantity}</span><button class="Buy">Buy</button></li>`

itemName.value = "";
category.value="";
price.value="";
quantity.value="";
} catch (error) {
console.log(error)

}

})

    


list.addEventListener('click', async (e) => {
try {
if (e.target.classList.contains("Buy")) {

console.log("true");
    const li = e.target.parentElement;
    var id=li.children[0].innerText;
    var quantity=li.children[4].textContent-1
    li.children[4].textContent=quantity;
    let itemObj={
        "ItemName":li.children[1].innerText,
        "Category":li.children[2].innerText,
        "Price":li.children[3].innerText,
        "Quantity":quantity
        
}
    
const data=axios.put(`https://crudcrud.com/api/1250cddc7ed944c390534b64e9aa5d89/itemData/${id}`,itemObj)
console.log("successfully updated..."+data);
    

}

} catch (err) {
console.log(err)

}
})

