import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { nodeKeyToRedisOptions } from "ioredis/built/cluster/util.js";
import Redis from "ioredis";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    //if not in redis, fetch from mongodb
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "no featured products found" });
    }
    // store in redis for future quick access
    await nodeKeyToRedisOptions.set(
      "featured_products",
      JSON.stringify(featuredProducts)
    );
    res.json(featuredProducts);
    
  } catch (error) {
    console.log("Error in getFeatured products controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinaryResponse.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "server error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleting image from cloudinary");
      } catch (error) {
        console.log("error deleting image from cloudinary", error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("delete product error");
    res.status(500).json({ message: "delete error" });
  }
};
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $product: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: " recommendation error" });
  }
};
export const getProductsByCategory= async(req,res)=>{
    const {category} = req.params;
    try {
        const products = await Product.find({category});
        res.json(products);
        
    } catch (error) {
        console.log("error in getProductsByCategory controller", error.message);
        res.status(500).json({message: "server error",error:error.message});
    }
}
export const toggleFeaturedProducts = async(req,res)=>{
    try {
      const product = await Product.findById(req.params.id);
      if(product) {
        product.isFeatured= !product.isFeatured;
        const updatedProduct = await product.save();
        await updateFeatureProductsCache();
        res.status(404).json({message: "product not found"});
      }
      
    } catch (error) {
      console.log("error in toggleFeaturedProduct controller",errr.message);
      res.status(500).json({message: "Server error", error: error.message});
    }
}
async function updateFeatureProductsCache(){
  try {
    const featuredProducts = await Product.find({isFeatured: true}).lean();
    await Redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
   console.error("error in update cache function")
  }
}