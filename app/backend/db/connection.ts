import {Collection, Db, MongoClient, ServerApiVersion} from 'mongodb';
// @ts-ignore
const DB_URI: string = process.env.MONGO_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
export const database: Db = client.db('clothing')
export const collections: Collection = database.collection('collections')
export const inventory: Collection = database.collection('inventory')
export const products: Collection = database.collection('products')
export const productImages: Collection = database.collection('product-images')
export const categories: Collection = database.collection('categories')
export const merged: Collection = database.collection('merged')

export const connect = async () => {
    try {
        await client.connect()
        console.log('connected!')
    }
    catch (err: unknown) {
        console.error(err)
    }
}
export default connect