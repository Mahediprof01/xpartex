"use client";
import React from "react";

interface RentFiltersProps {
  onClose?: () => void;
}

const RentFilters: React.FC<RentFiltersProps> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Filters</h3>
        {onClose && (
          <button
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
            <option>All</option>
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" placeholder="e.g. 50-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" placeholder="e.g. Car, Machine" />
        </div>
      </div>
    </div>
  );
};

export default RentFilters;
