"use client";
import React from "react";

interface JobFiltersProps {
  onClose?: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onClose }) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
            <option>All</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
            <option>All</option>
            <option>1+ Years</option>
            <option>2+ Years</option>
            <option>5+ Years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" placeholder="Enter location" />
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
