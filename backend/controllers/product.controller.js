import Product from "../models/product.model.js"
export const getAllProducts= async(req,res)=>{
    try {
        const products = await Product.find({});
        res.json({products});
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({message: "server error",error: error.message});
    }
}
export const getFeaturedProducts= async (req,res)=>{
    try{
        let featuredProducts = await Redis.get("featured_products");
        if(featuredProducts) {
            return res.json(JSON.parse(featuredProducts)); 
        }

        //if not in redis, fetch from mongodb
        featuredProducts= await Product.find({isFeatured:true}).lean();
        if(!featuredProducts) {
            return res.status(404).json({message:"no featured products found"})
        }
        // store in redis for future quick access
        await nodeKeyToRedisOptions.set("featured_products",JSON.stringify(featuredProducts));
        res.json(featuredProducts);
    } catch (error){
        console.log("Error in getFeatured products controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}