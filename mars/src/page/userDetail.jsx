import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetail = () => {
    const [ratingData, setRatingData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [newRating, setNewRating] = useState({ name: '', QA: '', Ketganlar: '', Retention: '', Usage: '', Umumiy: '' });

    useEffect(() => {
        const fetchRatingData = async () => {
            try {
                const response = await axios.get("https://shoopjson-2.onrender.com/api/rating");
                console.log("Rating data response:", response.data);
                setRatingData(response.data || []);
            } catch (error) {
                console.error("Error fetching rating data", error);
                setError("Rating ma'lumotlarini olishda xato.");
            }
        };
        fetchRatingData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRatingData = ratingData.filter((rating) =>
        rating.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedRatingData = [...filteredRatingData].sort((a, b) => b.Umumiy - a.Umumiy);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://shoopjson-2.onrender.com/api/rating/${id}`);
            setRatingData(ratingData.filter(rating => rating.id !== id));
        } catch (error) {
            console.error("Error deleting rating", error);
            setError("Rating ma'lumotlarini o'chirishda xato.");
        }
    };

    const handleAddRating = async () => {
        try {
            const response = await axios.post("https://shoopjson-2.onrender.com/api/rating", newRating);
            setRatingData([...ratingData, response.data]);
            setNewRating({ name: '', QA: '', Ketganlar: '', Retention: '', Usage: '', Umumiy: '' }); // Reset input fields
        } catch (error) {
            console.error("Error adding rating", error);
            setError("Rating ma'lumotlarini qo'shishda xato.");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Search input */}
            <div className="mb-6 flex justify-between items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Ism bo'yicha qidirish..."
                    className="p-3 border border-gray-300 rounded-lg w-full max-w-md shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <Link
                    to="/create-user"
                    className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 shadow-md"
                >
                    Foydalanuvchi yaratish
                </Link>
            </div>

            {/* New Rating Form */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Yangi Rating Qo'shish</h2>
                <input
                    type="text"
                    placeholder="Mentor ismi"
                    value={newRating.name}
                    onChange={(e) => setNewRating({ ...newRating, name: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="QA(40)"
                    value={newRating.QA}
                    onChange={(e) => setNewRating({ ...newRating, QA: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Ketganlar soni"
                    value={newRating.Ketganlar}
                    onChange={(e) => setNewRating({ ...newRating, Ketganlar: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Retention Score(20)"
                    value={newRating.Retention}
                    onChange={(e) => setNewRating({ ...newRating, Retention: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Space Usage"
                    value={newRating.Usage}
                    onChange={(e) => setNewRating({ ...newRating, Usage: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Umumiy"
                    value={newRating.Umumiy}
                    onChange={(e) => setNewRating({ ...newRating, Umumiy: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                />
                <button
                    onClick={handleAddRating}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                    Qo'shish
                </button>
            </div>

            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm font-semibold">
                    <tr>
                        <th className="py-3 px-6 text-left">#</th>
                        <th className="py-3 px-6 text-left">Mentor</th>
                        <th className="py-3 px-6 text-center">QA(40) Audit</th>
                        <th className="py-3 px-6 text-center">Ketganlar soni</th>
                        <th className="py-3 px-6 text-center">Retention Score(20)</th>
                        <th className="py-3 px-6 text-center">Space Usage</th>
                        <th className="py-3 px-6 text-center">Umumiy</th>
                        <th className="py-3 px-6 text-center">Amallar</th> {/* Action Column */}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                    {sortedRatingData.length > 0 ? (
                        sortedRatingData.map((rating, index) => (
                            <tr key={rating.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <span className="font-medium">{index + 1}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <Link to={`/rating/${rating.id}`} className="text-blue-500 hover:underline">
                                        {rating.name}
                                    </Link>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                        {rating.QA}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-teal-100 text-teal-600 py-1 px-3 rounded-full text-xs">
                                        {rating.Ketganlar}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs">
                                        {rating.Retention}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-xs">
                                        {rating.Usage}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs">
                                        {rating.Umumiy}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleDelete(rating.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        O'chirish
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-4 text-center">
                                Ma'lumotlar topilmad
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserDetail;
