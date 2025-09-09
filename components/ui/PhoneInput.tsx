"use client";
import React, { useState } from "react";
import { AsYouType, getCountryCallingCode } from "libphonenumber-js";
import { Input } from "./input";

const countryList = [
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  // Add more countries as needed
];

export default function PhoneInput({ value, onChange }: { value?: string; onChange?: (val: string) => void }) {
  const [country, setCountry] = useState("BD");
  const [number, setNumber] = useState(value || "");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    if (onChange) {
      onChange("");
    }
    setNumber("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const formatted = new AsYouType(country as "BD" | "US" | "IN").input(raw);
    setNumber(formatted);
    if (onChange) {
      onChange(formatted);
    }
  };

  return (
    <div className="flex">
      <select
        className="px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 text-sm focus:outline-none"
        value={country}
        onChange={handleCountryChange}
      >
        {countryList.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} +{getCountryCallingCode(c.code as "BD" | "US" | "IN")}
          </option>
        ))}
      </select>
      <Input
        type="tel"
        className="rounded-l-none flex-1"
        placeholder="Phone number"
        value={number}
        onChange={handleInputChange}
      />
    </div>
  );
}
