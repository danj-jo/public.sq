import { useLoaderData } from "@remix-run/react";
import connect, {inventory, productImages, products} from "../backend/db/connection";
import { json } from "@remix-run/node";  

connect().catch(err => console.log(err))

 export const loader =  async() => {
    let names = await products.find({}).toArray()
    let data =  await inventory.find({}).toArray()
    let images = await productImages.find({}).toArray()
    let inventorySet: Set<Object> = new Set()
    let inventoryObject: object[] = []
    let noDuplicatesInventory = []
    for(let i of names){
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
        color: await data.filter(item => item.product_id == i.product_id).map(product => product.color),
        list_price:  await data.filter(item => item.product_id == i).map(product => product.list_price),
        image: await images.filter(item => item.product_id == i).map(product => product.image_url)
     })
}

 // search by object id, not name id 
    console.log(noDuplicatesInventory)
    return noDuplicatesInventory
}



const shop = () => {
   const data = useLoaderData<typeof loader>()
    return (
        <>
        <ul>
            {data.map(item => <li> {`${item.name} ${item.color}`} </li>)}
        </ul>
        </>
    )
}

export default shop