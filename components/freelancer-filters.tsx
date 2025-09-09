"use client";
import React from "react";

interface FreelancerFiltersProps {
  onClose?: () => void;
}

const FreelancerFilters: React.FC<FreelancerFiltersProps> = ({ onClose }) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" placeholder="e.g. India, Bangladesh" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" placeholder="e.g. Tech Pack, CAD" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min. Rating</label>
          <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
            <option value="">Any</option>
            <option value="4.5">4.5+</option>
            <option value="4.7">4.7+</option>
            <option value="4.9">4.9+</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FreelancerFilters;
