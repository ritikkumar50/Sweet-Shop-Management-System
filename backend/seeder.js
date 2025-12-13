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
            // Cakes
            {
                name: 'Red Velvet Cake',
                category: 'Cakes',
                price: 45.99,
                quantity: 15,
                description: 'A luxurious red velvet cake with cream cheese frosting, perfect for special occasions.',
                image: '/Red.png'
            },
            {
                name: 'Tiramisu Slice',
                category: 'Cakes',
                price: 9.50,
                quantity: 20,
                description: 'Classic Italian dessert with espresso-soaked ladyfingers and creamy mascarpone.',
                image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80'
            },
            {
                name: 'Classic Cheesecake',
                category: 'Cakes',
                price: 35.00,
                quantity: 10,
                description: 'Rich and creamy New York style cheesecake with a graham cracker crust.',
                image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&q=80'
            },

            // Cookies
            {
                name: 'Macaron Box',
                category: 'Cookies',
                price: 24.00,
                quantity: 30,
                description: 'Delicate French macarons in raspberry, pistachio, and vanilla flavors.',
                image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80'
            },
            {
                name: 'Almond Biscotti',
                category: 'Cookies',
                price: 15.00,
                quantity: 25,
                description: 'Crunchy Italian cookies perfect for dipping in coffee or tea.',
                image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800&q=80'
            },
            {
                name: 'Chocolate Chip Cookies',
                category: 'Cookies',
                price: 12.99,
                quantity: 50,
                description: 'Chewy cookies loaded with semi-sweet chocolate chips.',
                image: "/Chip.png"
            },

            // Chocolates
            {
                name: 'Dark Chocolate Bar',
                category: 'Chocolates',
                price: 7.99,
                quantity: 40,
                description: '72% cacao single-origin dark chocolate from Ecuador.',
                image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&q=80'
            },
            {
                name: 'Chocolate Truffles',
                category: 'Chocolates',
                price: 28.50,
                quantity: 18,
                description: 'Handcrafted Belgian chocolate truffles with assorted fillings.',
                image: 'https://images.unsplash.com/photo-1548741487-18d363dc4469?w=800&q=80'
            },
            {
                name: 'Salted Caramel Fudge',
                category: 'Chocolates',
                price: 12.99,
                quantity: 25,
                description: 'Melt-in-your-mouth fudge with a perfect balance of sweet and salty.',
                image: '/Salted.png'
            },

            // Pastries
            {
                name: 'Butter Croissants',
                category: 'Pastries',
                price: 4.50,
                quantity: 0,
                description: 'Flaky, golden French croissants made with real butter.',
                image: '/Pastry.png'
            },
            {
                name: 'Fruit Tart',
                category: 'Pastries',
                price: 32.00,
                quantity: 8,
                description: 'Buttery tart shell filled with vanilla custard and topped with fresh seasonal fruit.',
                image: '/Fruit.png'
            },
            {
                name: 'Danish Pastry',
                category: 'Pastries',
                price: 5.50,
                quantity: 12,
                description: 'Sweet pastry with fruit or custard filling.',
                image: '/Danish.png'
            },

            // Ice Cream
            {
                name: 'Vanilla Bean Gelato',
                category: 'Ice Cream',
                price: 8.99,
                quantity: 20,
                description: 'Creamy Italian gelato made with Madagascar vanilla beans.',
                image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=800&q=80'
            },
            {
                name: 'Strawberry Sorbet',
                category: 'Ice Cream',
                price: 7.50,
                quantity: 15,
                description: 'Refreshing dairy-free sorbet made with ripe strawberries.',
                image: '/Sorbet.png'
            },

            // Candies
            {
                name: 'Gummy Bears Mix',
                category: 'Candies',
                price: 5.99,
                quantity: 100,
                description: 'Assorted fruit-flavored gummy bears in a resealable bag.',
                image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800&q=80'
            },
            {
                name: 'Lollipops Assortment',
                category: 'Candies',
                price: 4.50,
                quantity: 80,
                description: 'Colorful swirl lollipops in various fruit flavors.',
                image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=800&q=80'
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
