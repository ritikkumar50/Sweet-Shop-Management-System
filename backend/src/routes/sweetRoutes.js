const express = require('express');
const {
    getSweets,
    getSweet,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    searchSweets,
    restockSweet
} = require('../controllers/sweetController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getSweets)
    .post(protect, authorize('admin'), createSweet);

router.route('/search')
    .get(searchSweets);

router.route('/:id')
    .get(getSweet)
    .put(protect, authorize('admin'), updateSweet)
    .delete(protect, authorize('admin'), deleteSweet);

router.route('/:id/purchase')
    .post(protect, purchaseSweet);

router.route('/:id/restock')
    .post(protect, authorize('admin'), restockSweet);

module.exports = router;
