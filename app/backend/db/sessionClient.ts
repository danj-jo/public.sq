import {inventory, categories, collections, products, productImages} from "./connection";
import {ObjectId} from "mongodb";

export const createInventoryObject = async () => {
let names = await products.find({}).toArray()
let data =  await inventory.find({}).toArray()
let images = await productImages.find({}).toArray()
let inventorySet: Set<Object> = new Set()
let inventoryObject: object[] = []
let noDuplicatesInventory = []
for(let i of data){
        inventoryObject.push({
            name: names.filter(item => item.product_id == i.product_id).map(product => product.product_id),
            color: await images.filter(item => item.product_id == i.product_id).map(product => product.color),
            list_price: i.list_price,
            image: await images.filter(item => item.product_id == i.product_id).map(product => product.image_url)

})
}
for(let i of inventoryObject){
inventorySet.add(i.name)
}
for(let i of inventorySet){
noDuplicatesInventory.push({
    name: i,
    color: await data.filter(item => item.product_id == i).map(product => product.color),
    list_price:  await data.filter(item => item.product_id == i).map(product => product.list_price),
    image: await images.filter(item => item.product_id == i).map(product => product.image_url)
 })
}
console.log(noDuplicatesInventory)
return noDuplicatesInventory
}

// search by object id, not name id 
// return images 
