import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, updateProduct, fetchProducts } from './ProductSlice'; // Make sure updateProduct and fetchProducts are correctly imported

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [name, setName] = useState('');
  const [coin, setCoin] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [have, setHave] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when the component loads
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: editId || Date.now(), // Use current timestamp if not editing
      name,
      price,
      image,
      quantity,
    };

    if (editId) {
      dispatch(updateProduct(newProduct)); // Update product if editId exists
    } else {
      dispatch(addProduct(newProduct)); // Otherwise, add new product
    }

    // Clear the form after submission
    setName('');
    setCoin('');
    setImgUrl('');
    setHave('');
    setEditId(null);
  };

  const handleRemove = (id) => {
    dispatch(removeProduct(id)); // Remove product by ID
  };

  const handleEdit = (product) => {
    setEditId(product.id); // Set the product to be edited
    setName(product.name);
    setCoin(product.price);
    setImgUrl(product.image);
    setHave(product.quantity);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen admin-panel-container">
      <h1 className="text-3xl font-bold mb-6 admin-panel-title">Admin Panel</h1>

      <h2 className="text-2xl mb-4 product-list-title">Mahsulotlar Ro'yxati</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="border p-4 mb-4 bg-white rounded shadow-md product-item">
            {editId === product.id ? (
              // If the product is being edited, show the form inside this card
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Mahsulot Nomi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border border-gray-300 rounded form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Sotib Olingan Coin"
                  value={coin}
                  onChange={(e) => setCoin(e.target.value)}
                  className="p-2 border border-gray-300 rounded form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Rasm URL"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className="p-2 border border-gray-300 rounded form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Qolgan Soni"
                  value={have}
                  onChange={(e) => setHave(e.target.value)}
                  className="p-2 border border-gray-300 rounded form-input"
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                    Mahsulotni Yangilash
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)} // Cancel edit mode
                    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                  >
                    Bekor Qilish
                  </button>
                </div>
              </form>
            ) : (
              // Otherwise, show product details
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold product-name">{product.name}</h3>
                  <p className="text-gray-600 product-coin">Coin: {product.price}</p>
                  <p className="text-gray-600 product-have">Qolgan Soni: {product.quantity}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition duration-200 edit-button"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200 delete-button"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
