import itemModal from "../modals/itemModal.js";

// Public API base — used to build absolute image URLs
// Hardcoded because behind Cloudflare/Dokploy, req.protocol returns 'http'
// which causes mixed-content blocking in the browser.
const PUBLIC_API_URL = 'https://api.pzelghanachopbar.com';

export const createItem = async (req, res, next) => {
    try {
        const { name, description, priceLRD, priceUSD, rating, hearts } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        // Normalize categories: could be a single string or an array (from FormData)
        let categories = req.body.categories;
        if (!categories) {
            return res.status(400).json({ message: 'At least one category is required' });
        }
        if (!Array.isArray(categories)) {
            categories = [categories];
        }
        // Filter out empty strings just in case
        categories = categories.filter(c => c && c.trim());

        if (categories.length === 0) {
            return res.status(400).json({ message: 'At least one valid category is required' });
        }

        const total = Number(priceLRD) * 1;

        const newItem = new itemModal({
            name,
            description,
            categories,
            priceLRD,
            priceUSD,
            rating,
            hearts,
            imageUrl,
            total
        });

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
        if (err.code === 11000) {
            res.status(400).json({ message: 'Item already exists' });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

// GET FUNCTION TO GET ALL ITEMS
export const getItems = async (req, res, next) => {
    try {
        const items = await itemModal.find().sort({ createdAt: -1 });

        // Force HTTPS + public API domain for image URLs
        // This avoids mixed-content blocking (frontend is HTTPS, image URLs were HTTP)
        const withFullUrl = items.map(i => {
            if (!i.imageUrl) {
                return { ...i.toObject(), imageUrl: '' };
            }

            // If imageUrl is already an absolute URL (http:// or https://),
            // extract only the path portion so we can reattach our HTTPS host.
            const isAbsolute = /^https?:\/\//i.test(i.imageUrl);
            let pathPart = i.imageUrl;

            if (isAbsolute) {
                try {
                    pathPart = new URL(i.imageUrl).pathname;
                } catch {
                    // Fallback: strip protocol+host manually
                    pathPart = i.imageUrl.replace(/^https?:\/\/[^/]+/i, '');
                }
            }

            return {
                ...i.toObject(),
                imageUrl: `${PUBLIC_API_URL}${pathPart}`,
            };
        });

        res.json(withFullUrl);
    }
    catch (err) {
        next(err);
    }
}

// DELETE FUNCTION TO DELETE ITEMS
export const deleteItem = async (req, res, next) => {
    try {
        const removed = await itemModal.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Item not found' });
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
}