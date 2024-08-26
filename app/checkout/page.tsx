'use client';
import { X, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function CheckOutPage() {
  const [selectedProduct, setSelectedProduct] = useState('Motor PCB');
  const [quantity, setQuantity] = useState(0);
  const [usage, setUsage] = useState('In Milk Analyzer');
  const [reason, setReason] = useState('Servicing');
  const [description, setDescription] = useState('');

  const [serialNumbers, setSerialNumbers] = useState<string[]>([]);

  const handleForm = (formData: FormData) => {
    if (!selectedProduct || !quantity || !usage || !reason || !description || serialNumbers.length !== quantity) {
      toast.error("Please fill all fields and ensure serial numbers match the quantity.");
      return;
    }

    const checkoutData = {
      selectedProduct,
      quantity,
      usage,
      reason,
      description,
      serialNumbers,
    };

    console.log(checkoutData);
    toast.success("Checkout successful");
  };

  const addSerialNumber = () => {
    setSerialNumbers([...serialNumbers, ""]);
  };

  const removeSerialNumber = (index: number) => {
    const newSerialNumbers = serialNumbers.filter((_, i) => i !== index);
    setSerialNumbers(newSerialNumbers);
  };

  const updateSerialNumber = (index: number, value: string) => {
    const newSerialNumbers = [...serialNumbers];
    newSerialNumbers[index] = value;
    setSerialNumbers(newSerialNumbers);
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className="upper flex justify-between items-center w-full px-5 py-4 sm:px-10 sm:py-5">
        <h1 className='text-black font-extrabold text-2xl sm:text-4xl'>Check Out</h1>
        <Link href={"/"}>
          <div className='bg-zinc-400 rounded flex justify-center items-center w-8 h-8'>
            <X />
          </div>
        </Link>
      </div>

      <div className="lower flex flex-col lg:flex-row w-full px-5 sm:px-10 gap-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForm(new FormData(e.currentTarget));
          }}
          className='w-full lg:w-[70%] lg:pr-10'
        >
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

            <div className='flex flex-col sm:flex-row justify-between gap-4'>
              <div className="mb-4 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
                  Products
                </label>
                <select
                  id="product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
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
                  onChange={(e: any) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
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
                  onChange={(e) => setUsage(e.target.value)}
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
                  onChange={(e) => setReason(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                placeholder="Enter description"
              />
            </div>

            <button className="w-full bg-black text-white font-bold py-2 px-4 rounded-md">
              Check Out
            </button>
          </div>
        </form>

        <div className="right w-full lg:w-[30%] lg:pl-10">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-gray-700 text-lg font-bold">Serial Numbers</h2>
            <button onClick={addSerialNumber} className="bg-black text-white px-2 py-1 rounded-md">
              <Plus size={16} />
            </button>
          </div>

          {serialNumbers.map((serial, index) => (
            <div key={index} className="mb-4 flex items-center space-x-2">
              <input
                type="text"
                value={serial}
                onChange={(e) => updateSerialNumber(index, e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                onClick={() => removeSerialNumber(index)}
                className="bg-black text-white px-2 py-1 rounded-md"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
