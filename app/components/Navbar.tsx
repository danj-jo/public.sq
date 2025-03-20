import {useState} from "react"
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleIsOpen = () => {
        setIsOpen(prev => !prev)
    }
    return (
        isOpen ? <nav className="p-6 flex-col"> 
        <ul className="flex justify-between">
        <li className="mr-32"> <a href="./"> <img src="img/stylenest.svg"/> </a></li>
        <li className=""> <button onClick={() => setIsOpen(false)}> <span className="material-symbols-outlined">
close
</span> </button> </li>
        </ul>
        <ul className="mt-10">
            <li className="mb-4"> <a href="" className="mb-8"> Shop All </a> </li>
            <li> <a href=""> Latest Arrivals </a> </li>
        </ul>
        </nav> : <nav className="p-6 flex justify-between ">
            <ul className="flex justify-between">
        <li className="lg:mr-36"> <a href="./"> <img src="img/stylenest.svg" className=""/></a></li>
    
        <ul className=" hidden lg:flex mt-1">
            <li className="mr-12">
                    <a href=""> Shop All </a>
            </li>
            <li className="">
               <a href=""> Latest Arrivals </a>
            </li>
        </ul>
        </ul>
        <ul className="flex text-center">
            <li> 
                <button>
                    <span className="material-symbols-outlined mr-6">
                    shopping_bag
                    </span>
                </button>
            </li>
            <li>   
                <button onClick={() => setIsOpen(true)}>          
                    <span className="material-symbols-outlined inline lg:hidden">
                     menu
                    </span>
                </button>  
            </li>               
            </ul>
        </nav>
    )
}
export default Navbar