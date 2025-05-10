import React, { useState } from 'react';
import { FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const orders = [
  {
    id: 1,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    date: '4/12/2023',
    status: 'Completed',
    rating: 5,
  },
  {
    id: 2,
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    date: '3/28/2023',
    status: 'Completed',
    rating: 4,
  },
  {
    id: 3,
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    date: '3/15/2023',
    status: 'Completed',
    rating: 4,
  },
];

const History = () => {
  const [activeTab, setActiveTab] = useState('Completed');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-1">Order History</h2>
      <p className="text-gray-500 mb-6">Track your purchases and orders</p>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {['Completed', 'Pending'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab
                ? 'bg-gray-200 text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      {orders
        .filter((order) => order.status === activeTab)
        .map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between bg-white border rounded-xl px-4 py-4 mb-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-16 bg-gray-200 rounded-md" />
              <div>
                <h3 className="font-semibold">{order.title}</h3>
                <p className="text-gray-600 text-sm">{order.author}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500 space-x-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-xs font-medium rounded-full text-gray-700">
                    <FaCheckCircle className="mr-1 text-green-600" />
                    {order.status}
                  </span>
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {order.date}
                  </span>
                </div>
              </div>
            </div>
            {/* Rating */}
            <div className="flex text-orange-400">
              {[...Array(order.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
              {[...Array(5 - order.rating)].map((_, i) => (
                <span key={i} className="text-gray-300">★</span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default History;
