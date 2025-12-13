import { useState } from 'react';
import { mockSweets } from '../data/mockData';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';

const Admin = () => {
    const [sweets, setSweets] = useState(mockSweets);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSweet, setCurrentSweet] = useState(null);

    // Form State
    const initialFormState = { name: '', description: '', price: '', quantity: '', image: '', category: '' };
    const [formData, setFormData] = useState(initialFormState);

    const handleEdit = (sweet) => {
        setIsEditing(true);
        setCurrentSweet(sweet);
        setFormData({
            name: sweet.name,
            description: sweet.description,
            price: sweet.price,
            quantity: sweet.quantity,
            image: sweet.image,
            category: sweet.category
        });
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this sweet?')) {
            setSweets(sweets.filter(s => s.id !== id));
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentSweet(null);
        setFormData(initialFormState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing && currentSweet) {
            // Update
            setSweets(sweets.map(s => s.id === currentSweet.id ? { ...s, ...formData, price: Number(formData.price), quantity: Number(formData.quantity) } : s));
        } else {
            // Create
            const newSweet = {
                id: Date.now(), // simple ID gen
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            };
            setSweets([newSweet, ...sweets]);
        }
        handleCancel();
    };

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-slate-600">
                        Total Items: {sweets.length}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 sticky top-24">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                {isEditing ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                {isEditing ? 'Edit Sweet' : 'Add New Sweet'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Price ($)"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                        required
                                    />
                                </div>

                                <Input
                                    label="Category"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                />

                                <Input
                                    label="Image URL"
                                    icon={ImageIcon}
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm min-h-[100px]"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button type="submit" className="flex-1">
                                        <Save className="w-4 h-4 mr-2" />
                                        {isEditing ? 'Update' : 'Add Sweet'}
                                    </Button>
                                    {isEditing && (
                                        <Button type="button" variant="outline" onClick={handleCancel}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-4">
                        {sweets.map(sweet => (
                            <div key={sweet.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:shadow-md transition-shadow">
                                <img
                                    src={sweet.image}
                                    alt={sweet.name}
                                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                                    onError={(e) => e.target.src = 'https://placehold.co/100?text=Sweet'}
                                />

                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{sweet.name}</h3>
                                            <p className="text-sm text-gray-500">{sweet.category}</p>
                                        </div>
                                        <span className="font-bold text-primary">${Number(sweet.price).toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{sweet.description}</p>
                                    <div className={`text-xs font-bold mt-2 inline-block px-2 py-0.5 rounded ${sweet.quantity === 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        Stock: {sweet.quantity}
                                    </div>
                                </div>

                                <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                    <Button size="sm" variant="ghost" onClick={() => handleEdit(sweet)}>
                                        <Pencil className="w-4 h-4 text-gray-500" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="hover:bg-red-50" onClick={() => handleDelete(sweet.id)}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {sweets.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500">No sweets in inventory.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
