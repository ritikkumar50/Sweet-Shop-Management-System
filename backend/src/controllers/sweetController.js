const Sweet = require('../models/Sweet');

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
exports.getSweets = async (req, res, next) => {
    try {
        const sweets = await Sweet.find();
        res.status(200).json({ success: true, count: sweets.length, data: sweets });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get single sweet
// @route   GET /api/sweets/:id
// @access  Public
exports.getSweet = async (req, res, next) => {
    try {
        const sweet = await Sweet.findById(req.params.id);

        if (!sweet) {
            return res.status(404).json({ success: false, message: `Sweet not found with id of ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: sweet });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create new sweet
// @route   POST /api/sweets
// @access  Private (Admin)
exports.createSweet = async (req, res, next) => {
    try {
        const sweet = await Sweet.create(req.body);
        res.status(201).json({ success: true, data: sweet });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update sweet
// @route   PUT /api/sweets/:id
// @access  Private (Admin)
exports.updateSweet = async (req, res, next) => {
    try {
        let sweet = await Sweet.findById(req.params.id);

        if (!sweet) {
            return res.status(404).json({ success: false, message: `Sweet not found with id of ${req.params.id}` });
        }

        sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: sweet });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete sweet
// @route   DELETE /api/sweets/:id
// @access  Private (Admin)
exports.deleteSweet = async (req, res, next) => {
    try {
        const sweet = await Sweet.findById(req.params.id);

        if (!sweet) {
            return res.status(404).json({ success: false, message: `Sweet not found with id of ${req.params.id}` });
        }

        await sweet.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Purchase sweet (reduce stock)
// @route   POST /api/sweets/:id/purchase
// @access  Private
exports.purchaseSweet = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const qtyToBuy = quantity || 1;

        if (qtyToBuy < 1) {
             return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
        }

        const sweet = await Sweet.findById(req.params.id);

        if (!sweet) {
            return res.status(404).json({ success: false, message: `Sweet not found` });
        }

        if (sweet.quantity < qtyToBuy) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        sweet.quantity -= qtyToBuy;
        await sweet.save();

        res.status(200).json({ success: true, data: sweet });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
