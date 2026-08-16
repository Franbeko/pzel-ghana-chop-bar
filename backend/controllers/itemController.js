import itemModal from "../modals/itemModal.js";

export const createItem = async (req, res, next) => {
    try {
        const { name, description, category, priceLRD, priceUSD, rating, hearts } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const total = Number(priceLRD) * 1;

        const newItem = new itemModal({
            name, 
            description, 
            category, 
            priceLRD,
            priceUSD,
            rating, 
            hearts, 
            imageUrl, 
            total
        })

        const saved = await newItem.save();
        
        // EMIT SOCKET EVENT FOR NEW MENU ITEM
        const io = req.app.get('io');
        if (io) {
            io.emit('menuUpdated', saved);
            console.log('📡 Menu item added via WebSocket:', saved.name);
        }
        
        res.status(201).json(saved);
    } 
    catch (err) {
        if(err.code === 11000) {
            res.status(400).json({message: 'Item already exists'});
        } else {
            res.status(500).json({message: err.message});
        }
    }
}

// GET FUNCTION TO GET ALL ITEMS
export const getItems = async (req, res, next) => {
    try {
        const items = await itemModal.find().sort({createdAt: -1});
        const host = `${req.protocol}://${req.get('host')}`;

        const withFullUrl = items.map(i => ({
            ...i.toObject(),
            imageUrl: i.imageUrl ? host + i.imageUrl : '',
        }))
        res.json(withFullUrl)
    } 
    catch (err) {
        next(err);
    }
}

// DELETE FUNCTION TO DELETE ITEMS
export const deleteItem = async (req, res, next) => {
    try {
        const removed = await itemModal.findByIdAndDelete(req.params.id);
        if(!removed) return res.status(404).json({message: 'Item not found'});
        res.status(204).end();
    } 
    catch (err) {
        next(err);
    }
}