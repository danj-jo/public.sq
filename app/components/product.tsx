import {useState} from "react"
interface swatchProps {
    color: string
    inStock: boolean
}

const Swatch = ({color, inStock}: swatchProps) => {
    const [selected, setSelected] = useState(false)
    return (
        <button className={`${color} w-6 h-6 hover:b-blue `}> 
        </button>
    )
}
const ProductCard = ({id, price, imagePath, color}: Product) => {
    return (
        <div> 
            <div className="">
            <img src={imagePath} />
            <h3> {color} </h3>
            <h2> {id} </h2>
            </div>
            <div>
                {price}
            </div>
        </div>
    )
}