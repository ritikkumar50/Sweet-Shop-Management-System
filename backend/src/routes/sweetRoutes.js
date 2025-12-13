const express = require('express');
const {
    getSweets,
    getSweet,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet
} = require('../controllers/sweetController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getSweets)
    .post(protect, authorize('admin'), createSweet);

router.route('/:id')
    .get(getSweet)
    .put(protect, authorize('admin'), updateSweet)
    .delete(protect, authorize('admin'), deleteSweet);

router.route('/:id/purchase')
    .post(protect, purchaseSweet);

module.exports = router;
