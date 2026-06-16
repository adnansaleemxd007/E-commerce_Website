import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [editId, setEditId] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload (Base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Please select an image');
      return;
    }
    setLoading(true);

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/products/${editId}` : '/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success(editId ? 'Product updated successfully' : 'Product added successfully');
        setFormData({ title: '', price: '', description: '', category: '', image: '' });
        setEditId(null);
        fetchProducts();
      } else {
        toast.error('Failed to save product');
      }
    } catch (error) {
      toast.error('Server error');
    }
    setLoading(false);
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  // Edit Product (populate form)
  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditId(null);
    setFormData({ title: '', price: '', description: '', category: '', image: '' });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            {editId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 w-full p-2 border rounded-md" />
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover rounded border" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="mt-1 w-full p-2 border rounded-md"></textarea>
            </div>
            <div className="flex space-x-2">
              <button type="submit" disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition font-medium">
                {editId ? 'Update Product' : 'Add Product'}
              </button>
              {editId && (
                <button type="button" onClick={cancelEdit} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md transition font-medium">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Product List ({products.length})</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border-b">Image</th>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">
                    <img src={product.image} alt={product.title} className="w-12 h-12 object-contain rounded" />
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-800 truncate max-w-[200px]" title={product.title}>
                    {product.title}
                  </td>
                  <td className="p-3 text-green-600 font-semibold">${product.price}</td>
                  <td className="p-3 text-sm text-gray-600 capitalize">{product.category}</td>
                  <td className="p-3 flex justify-center space-x-3 mt-2">
                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No products found. Use the form to add some!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
