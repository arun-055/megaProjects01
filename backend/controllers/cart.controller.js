export const addTocart =async (req,res) =>{

    try {
        const {productId} = req.body;
        const user = req.body;

        const existingItem = user.cartItems.find(item=> item.id === productId);
        if(existingItem){
            existingItem.quantity+=1;
        }else {
            user.cartItems.push(productId)
        }
        await user.save();

        res.json(user.cartItems)
        
    } catch (error) {
        console.log("Error in addTocart",error.message );
        res.status(500).json({message: "server error", error: error.message});
    }
};
export const removeAllFromCart = async(req,res) => {
    try{
        const {productId}=req.body;
        const user = req.user;
        if(!productId) {
            user.cartItems = [];
        } else {
            user.cartItems =user.cartItems.filter((item)=>item.id !== productId);
        }
        await user.save();
        res.json(user.cartItems);

    }catch(error){
        res.status(500).json({message: "server error"});
    }
}
export const updateQuantity = async(req,res)=> {
    try {
        const {id:productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;
        const existingItem = user.cartitems.find((item)=> item.id === productId);

        if(existingItem) {
            user.cartItems = user.cartItems.filter((item)=> item.id!== productId);
            await user.save();
            return res.json(user.cartitems);
        }
        existingItem.quantity= quantity;
        await user.save;
        return res.json(user.cartItems);
    
        else{
            res.status(404).json({message: " Product not found"});
        }
    } catch (error) {
        console.log("Error in updateQuantity controller");
        res.status(500).json({message: "server error",error:error.message});
      
    }



}