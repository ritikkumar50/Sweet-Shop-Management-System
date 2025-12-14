const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./src/models/User');
const Sweet = require('./src/models/Sweet');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import into DB
const importData = async () => {
    try {
        await User.create({
            name: 'Admin User',
            email: 'admin@sweetshop.com',
            password: 'password123',
            role: 'admin'
        });

        console.log('Admin User Imported...'.green.inverse);

        const sweets = [
            // Milk-based Sweets
            {
                name: 'Gulab Jamun',
                category: 'Milk-based Sweets',
                price: 120.00,
                quantity: 50,
                description: 'Soft, spongy milk-solid balls soaked in fragrant rose-cardamom syrup. A classic Indian dessert.',
                image: '/images/sweets/gulab_jamun.png'
            },
            {
                name: 'Rasgulla',
                category: 'Milk-based Sweets',
                price: 100.00,
                quantity: 40,
                description: 'Soft, white cottage cheese balls cooked in light sugar syrup. A Bengali specialty.',
                image: '/images/sweets/rasgulla.png'
            },
            {
                name: 'Rasmalai',
                category: 'Milk-based Sweets',
                price: 150.00,
                quantity: 30,
                description: 'Delicate cottage cheese patties soaked in sweetened, thickened milk flavored with cardamom and saffron.',
                image: '/images/sweets/rasmalai.png'
            },
            {
                name: 'Sandesh',
                category: 'Milk-based Sweets',
                price: 130.00,
                quantity: 35,
                description: 'Traditional Bengali sweet made from fresh cottage cheese and sugar, delicately flavored.',
                image: '/images/sweets/sandesh.png'
            },

            // Dry Sweets
            {
                name: 'Kaju Katli',
                category: 'Dry Sweets',
                price: 450.00,
                quantity: 25,
                description: 'Premium cashew fudge with a thin silver leaf. The king of Indian sweets.',
                image: '/images/sweets/kaju_katli.png'
            },
            {
                name: 'Barfi (Milk Cake)',
                category: 'Dry Sweets',
                price: 180.00,
                quantity: 40,
                description: 'Dense, sweet confection made from condensed milk and sugar, available in various flavors.',
                image: '/images/sweets/barfi.png'
            },
            {
                name: 'Besan Ladoo',
                category: 'Dry Sweets',
                price: 160.00,
                quantity: 45,
                description: 'Round sweet balls made from gram flour, ghee, and sugar. A festive favorite.',
                image: '/images/sweets/besan_ladoo.png'
            },
            {
                name: 'Peda',
                category: 'Dry Sweets',
                price: 140.00,
                quantity: 50,
                description: 'Soft, round sweet made from khoya (reduced milk) and flavored with cardamom.',
                image: '/images/sweets/peda.png'
            },
            {
                name: 'Mysore Pak',
                category: 'Dry Sweets',
                price: 200.00,
                quantity: 30,
                description: 'Rich, buttery sweet from Karnataka made with gram flour, ghee, and sugar.',
                image: '/images/sweets/mysore_pak.png'
            },
            {
                name: 'Soan Papdi',
                category: 'Dry Sweets',
                price: 110.00,
                quantity: 60,
                description: 'Flaky, crispy sweet with a melt-in-mouth texture made from gram flour and sugar.',
                image: '/images/sweets/soan_papdi.png'
            },

            // Syrup-based Sweets
            {
                name: 'Jalebi',
                category: 'Syrup-based Sweets',
                price: 80.00,
                quantity: 70,
                description: 'Crispy, spiral-shaped sweet soaked in sugar syrup. Best enjoyed warm.',
                image: '/images/sweets/jalebi.png'
            },
            {
                name: 'Imarti',
                category: 'Syrup-based Sweets',
                price: 90.00,
                quantity: 50,
                description: 'Flower-shaped sweet made from lentil batter, deep-fried and soaked in saffron syrup.',
                image: '/images/sweets/imarti.png'
            },

            // Halwa & Puddings
            {
                name: 'Gajar Halwa',
                category: 'Halwa & Puddings',
                price: 170.00,
                quantity: 35,
                description: 'Warm carrot pudding cooked with milk, ghee, and garnished with nuts. A winter delicacy.',
                image: '/images/sweets/gajar_halwa.png'
            },
            {
                name: 'Moong Dal Halwa',
                category: 'Halwa & Puddings',
                price: 190.00,
                quantity: 25,
                description: 'Rich, aromatic halwa made from yellow lentils, ghee, and sugar. Labor of love.',
                image: '/images/sweets/moong_dal_halwa.png'
            },

            // Frozen Desserts
            {
                name: 'Kulfi (Malai)',
                category: 'Frozen Desserts',
                price: 60.00,
                quantity: 80,
                description: 'Traditional Indian ice cream made from reduced milk, denser and creamier than regular ice cream.',
                image: '/images/sweets/kulfi_malai.png'
            },
            {
                name: 'Kulfi (Pista)',
                category: 'Frozen Desserts',
                price: 70.00,
                quantity: 75,
                description: 'Pistachio-flavored kulfi with real pistachio pieces. Refreshing and rich.',
                image: '/images/sweets/kulfi_pista.png'
            },

            // Traditional Sweets
            {
                name: 'Chikki (Peanut)',
                category: 'Traditional Sweets',
                price: 50.00,
                quantity: 100,
                description: 'Crunchy peanut brittle made with jaggery. A healthy, traditional snack.',
                image: '/images/sweets/chikki.png'
            },
            {
                name: 'Coconut Ladoo',
                category: 'Traditional Sweets',
                price: 120.00,
                quantity: 55,
                description: 'Sweet balls made from fresh coconut and condensed milk, rolled in desiccated coconut.',
                image: '/images/sweets/coconut_ladoo.png'
            }
        ];

        await Sweet.insertMany(sweets);
        console.log('Sweets Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Sweet.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Please pass argument: -i to import, -d to delete');
    process.exit();
}
