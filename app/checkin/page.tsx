'use client';
import { X, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function CheckInPage() {
  const [formData, setFormData] = useState({
    selectedProduct: 'Motor PCB',
    quantity: 0,
    usage: 'In Milk Analyzer',
    reason: 'Servicing',
    description: '',
    serialNumbers: [] as string[],
  });

  const { selectedProduct, quantity, usage, reason, description, serialNumbers } = formData;

  useEffect(() => {
   if (quantity > 0) {
      const newSerialNumbers = [...serialNumbers];
      while (newSerialNumbers.length<quantity) {
        newSerialNumbers.push(''); 
      }
      while (newSerialNumbers.length>quantity) {
        newSerialNumbers.pop(); 
      }
      setFormData({ ...formData, serialNumbers: newSerialNumbers });
    }
  }, [quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const updateSerialNumber = (index: number, value: string) => {
    const newSerialNumbers = [...serialNumbers];
    newSerialNumbers[index] = value;
    setFormData({ ...formData, serialNumbers: newSerialNumbers });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity || !usage || !reason || !description || serialNumbers.includes('')) {
      toast.error('All fields, including serial numbers, are required.');
      return;
    }

    console.log({
      selectedProduct,
      quantity,
      usage,
      reason,
      description,
      serialNumbers,
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="upper flex justify-between items-center w-full px-5 py-4 sm:px-10 sm:py-5">
        <h1 className="text-black font-extrabold text-2xl sm:text-4xl">Check In</h1>
        <Link href="/">
          <div className="bg-zinc-400 rounded flex justify-center items-center w-8 h-8">
            <X />
          </div>
        </Link>
      </div>

      <div className="lower flex flex-col lg:flex-row w-full px-5 sm:px-10 gap-8">
        <form onSubmit={handleFormSubmit} className="w-full lg:w-[70%] lg:pr-10">
          <div className="left">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="admin-id">
                Admin/ID
              </label>
              <input
                id="admin-id"
                type="text"
                value="#ASDF43RFFF"
                disabled
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-gray-100"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="mb-4 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedProduct">
                  Products
                </label>
                <select
                  id="selectedProduct"
                  value={selectedProduct}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Motor PCB">Motor PCB</option>
                  <option value="Milk Analyzer">Milk Analyzer</option>
                </select>
              </div>

              <div className="mb-4 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="mb-4 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usage">
                  Usage
                </label>
                <input
                  id="usage"
                  type="text"
                  value={usage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                  Reason
                </label>
                <input
                  id="reason"
                  type="text"
                  value={reason}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                placeholder="Enter description"
              />
            </div>

            <button type="submit" className="w-full bg-black text-white font-bold py-2 px-4 rounded-md">
              Check In
            </button>
          </div>
        </form>

        <div className="right w-full lg:w-[30%] lg:pl-10">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-gray-700 text-lg font-bold">Serial Numbers</h2>
          </div>

          {serialNumbers.map((serial, index) => (
            <div key={index} className="mb-4 flex items-center space-x-2">
              <input
                type="text"
                value={serial}
                onChange={(e) => updateSerialNumber(index, e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckInPage;
