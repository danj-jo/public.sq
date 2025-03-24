import { useLoaderData } from "@remix-run/react";
import products from "../data/products.json"
import productImages from "../data/product-images.json"
import inventory from "../data/inventory.json"
import {useState} from "react"
import colorObj from "~/components/colors";
 export const loader =  async() => {
    return null
}

interface productProps{
    productId: string,
    features: string[],
    fabricAndCare: string[],
    sku:string
}

const ItemDetails  = () => {
    return <ProductDetails 
                            sku="vh-green-xs"
                            productId="voyager-hoodie" 
                            features={[
                            "Designed for comfort and durability","Soft", 
                            "breathable fabric ideal for travel and adventure","Large front pocket and adjustable hood","Minimalist design pairs well with any style",
                             "Made with eco conscious material"
                            ]}  
                            fabricAndCare={[
                                "Machine wash cold on a gentle cycle",
                                "Tumble dry low or hang to dry",
                                "Do not use fabric softners or bleach",
                                "Iron on a low setting if necessary"
                            ]}
    />}

  const ProductDetails = ({sku, productId, features, fabricAndCare}: productProps) => {
    const [quantity, setQuantity] = useState(0)
    const [color, setColor] = useState("")
    const [selectedImage, setSelectedImage] = useState("")
    const [featuresOpen, setFeaturesOpen] = useState(false)
    const [fabricOpen, setFabircOpen] = useState(false)
    const [shippingOpen, setShippingOpen] = useState(false)
    const shipping = ["Free standard shipping on all orders", "Expedited shipping available at an additional cost", "Packaged in biodegradable materials to reduce environmental impact" ]
    const imageSet: Set<string> = new Set()
    const images = productImages.filter(i => i.product_id == productId).forEach(i => imageSet.add(`${i.image_url}`))
    const currentImage = productImages.filter(i => i.product_id == productId).map(i => i.image_url)
 
    const name = products.filter(i => i.product_id == productId).map(i => i.name)
    const salePrice = inventory.filter(item => item.sku == sku).map(i => `$${i.sale_price}`)
    const listPrice = inventory.filter(item => item.sku == sku).map(i => `$${i.list_price}`)
    const description = products.filter(item => item.product_id == productId).map(i => i.description)
    const colorSet = new Set()
    const colors = productImages.filter(i => i.product_id == productId).forEach(i => colorSet.add(`${i.color}`))
    
    const sizeSet = new Set()
    const sizes = inventory.filter(i => i.product_id == productId).forEach(i => sizeSet.add(i.size))

    
    return (
        <div className=" p-2 lg:flex">
            <div className = "left-top flex flex-col w-auto">
                <img className = " rounded-md h-[500px]" src= {selectedImage == "" ? currentImage[0] : selectedImage} />
                <div className="flex">
                    <ul className="flex gap-2">
                {Array.from(imageSet).map(item => 
                <li key={Array.from(imageSet).indexOf(item)}>
                    <button className="mt-4" onClick={() => setSelectedImage(item)}>
                        <img className={`rounded-md h-24 w-24 ${selectedImage == item ? "border-2 border-blue-600" : ""}`} src={item} />
                    </button>
                </li>)}
                </ul>
                </div>
            </div>
  
            <div className="right flex flex-col"> 
                
                <div className ="name-price-review-discount flex flex-col">
                    <div className="mt-6">
                    <h2 className ="
                         font-NotoSans-SemiBold text-neutral-900 w-full text-[32px]">
                            {name}
                    </h2>
                    </div>
                    <div className="flex gap-2">

                        <h2 className="text-[25px] text-neutral-600">
                            {salePrice}
                        </h2>
                        <s className="text-[18px] self-center text-neutral-400">
                            {listPrice}
                        </s>
                    </div>
                    {inventory.filter(item => item.sku == sku).map(i => {
                       return <div className="bg-amber-100 text-[13px] font-NotoSans-Regular text-amber-700 border-2 border-amber-500 text-center p-1 rounded-2xl w-20 h-8"> {0 < i.discount_percentage! ? `${i.discount_percentage}% OFF` : ""}
                        </div>})}
                </div>
             

                <p className="font-NotoSans-Regular text-neutral-600 py-8 leeading-[24px] text-[16px] mt-6">
                    {description}
                </p>


                <div className="flex flex-col gap-[32px]">
                    <div className="flex flex-col gap-[16px]">
                    <p className="text-small font-NotoSans-Regular text-neutral-500"> Available Colors </p>
                    <div className="flex space-around">
                         {Array.from(colorSet).map(i => <button style={{backgroundColor:colorObj[i], borderRadius:"100%", width: "45px", height:"45px",marginRight:"10px", lineHeight: "20px",border:"1px solid gray"}}><button key={Array.from(colorSet).indexOf(i)}style={{backgroundColor: `${colorObj[i]}`, borderRadius:"100%", width:"10px"}}onClick={() => console.log(colorObj[i])}> </button></button>)}
                    </div>
                    </div>
                    <p className ="font-NotoSans-Regular text-neutral-500"> Available Sizes </p>
                    <div className="flex flex-wrap gap-2 w-72">
                        {Array.from(sizeSet).map(i => <button key={Array.from(sizeSet).indexOf(i)} className="p-3 rounded-md bg-neutral-100 text-neutral-400 border-2 border-neutral-200 w-[64px] h-[48px] text-md">{i!.toString().toUpperCase()}</button>)}
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-NotoSans-Regular text-neutral-500"> Quantity </h3>
                        <div className="flex gap-6 bg-neutral-50 border-neutral-200 border-2 w-[124px] items-center justify-center rounded-md">
                            <button onClick={() => setQuantity(prev => {
                                prev == 0 ? 0 : prev - 1
                                return prev
                            })}> 
                            <span className="material-symbols-outlined w-[20px] h-[20px] text-[20px]">
                            remove
                            </span>
                             </button>
                         {quantity} 
                         <button onClick={() => setQuantity(prev => prev + 1)}> 
                            <span className="material-symbols-outlined w-[20px] h-[20px] text-[20px]">
                                add
                            </span>
                        </button>
                        </div>
                    </div>
                    <button className="p-4 rounded-md bg-indigo-700 text-white "> Add to Cart </button>
                    <div className="mt-4">
                    <div className="flex justify-between mb-6">
                        <h3> Features </h3>
                            <button onClick = {()=> setFeaturesOpen(prev => !prev)}> 
                                <span className="material-symbols-outlined">
                                    {featuresOpen ? `do_not_disturb_on` : `add_circle`}
                                </span>
                            </button>
                </div>
                {featuresOpen && 
                <ul className="list-disc ml-4 p-1">
                    {features.map(item => <li className="text-neutral-600 leading-[24px]">{item}</li>)}
                </ul>
                }
                 <div className="h-[1px] mb-6 bg-gray-200"></div>
                <div className="flex justify-between mb-6">
                    <h3> Fabric and Care </h3>
                    <button onClick = {()=> setFabircOpen(prev => !prev)}> 
                        <span className="material-symbols-outlined">
                        {fabricOpen ? `do_not_disturb_on` : `add_circle`}
                        </span>
                    </button>
                </div>
                {fabricOpen && <ul className="list-disc ml-4 p-1">
                    {fabricAndCare.map(item => <li className="text-neutral-600 leading-[24px]">{item}</li>)}
                </ul>}
                <div className="h-[1px] mb-6 bg-gray-200"></div>
                    <div className="flex justify-between">
                        <h3> Shipping </h3>
                        <button onClick = {()=> setShippingOpen(prev => !prev)}> 
                            <span className="material-symbols-outlined">
                            {shippingOpen ? `do_not_disturb_on` : `add_circle`}
                            </span> 
                        </button>
                    </div>
                    {shippingOpen && 
                        <ul className="list-disc ml-4 p-1">
                        {shipping.map(i => <li className="text-neutral-600 leading-[24px]">{i}</li>)}
                        </ul>
                    }
                    
                </div>
                </div>
                


            

            </div>
        </div>
    )
  }
  
  export default ItemDetails