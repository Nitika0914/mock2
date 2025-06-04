let itemStore = []
function generateID(){
    return Math.random().toString(36).substr(2, 9);
}
function handler(req, res){
    if(req.method === "POST"){
        const {name, price, quantity} = req.body;
        if(!name || !price || !quantity){
            return res.status(400).json({message: "All fields are required"});
        }
        const id = generateID()
        itemStore.push({id, name, price, quantity})
        return res.status(200).json({status: "success", message: "item received"})
    } else if(req.method === "GET"){
        return res.status(200).json(itemStore)
    } else if(req.method === "PUT"){
        const {id, name, price, quantity} = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID is required for update" });
        }
        const itemIndex = itemStore.findIndex((item)=>item.id===id);
        if(itemIndex===-1){
            return res.status(404).json({message: "Item not found"});
        }
        itemStore[itemIndex]={
            ...itemStore[itemIndex],
            name: name?? itemStore[itemIndex].name,
            price: price?? itemStore[itemIndex].price,
            quantity: quantity?? itemStore[itemIndex].quantity,
        };
        return res.status(200).json({ status: "success", message: "Item updated" });
     
    } else if(req.method === "DELETE") {
        const {id} = req.body;
        if(!id){
            return res.status(400).json({ message: "ID is required for delete" });
        }
        const itemIndex = itemStore.findIndex((item)=> item.id===id);
        if(itemIndex===-1){
            return res.status(404).json({message: "Item not found"});
        }
        itemStore.splice(itemIndex, 1);
        return res.status(200).json({status: "success", message: "Item deleted"})
    } else{
        return res.status(405).json({message: `Unable to find ${req.method} request`});
    }
}

export default handler;