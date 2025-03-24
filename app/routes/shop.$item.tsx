

import { useParams, useSearchParams } from "@remix-run/react"
import { database } from "~/backend/db/connection"

export const loader = async() => {
    const {id} = useParams
    database.aggregate([
        {
            $match: { product_id: {id} } // Replace with actual product ID
          },
          {
            $lookup: {
              from: "product-images",
              localField: "product_id",
              foreignField: "product_id",
              as: "images_data"
            }
          },
          {
            $lookup: {
              from: "inventory",
              localField: "product_id",
              foreignField: "product_id",
              as: "inventory_data"
            }
          },
          {
            $project: {
              _id: 0,
              title: 1,
              description: 1,
              image_url: { $arrayElemAt: ["$images_data.image_url", 0] },
              color: { $arrayElemAt: ["$images_data.color", 0] },
              size: { $arrayElemAt: ["$inventory_data.size", 0] },
              sale_price: { $arrayElemAt: ["$inventory_data.sale_price", 0] },
              total_price: { $arrayElemAt: ["$inventory_data.total_price", 0] },
              inventory_color: { $arrayElemAt: ["$inventory_data.color", 0] },
              discount_percentage: { $arrayElemAt: ["$inventory_data.discount_percentage", 0] }
            }
          }
    ])
}


// Products Table -> title, description
// Product-images table -> images, color of image
// inventory table -> sizes, sale price, total price, color, discount percentage
