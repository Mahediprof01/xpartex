"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import useSampleStore from "@/store/sampleStore";
import useFormDataStore from "@/store/formDataStore";
import SignupPromptModal from "@/components/SignupPromptModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  // Select,
  // SelectContent,
  // SelectItem,
  // SelectTrigger,
  // SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";

const SampleRequestForm = ({ onClose, productInfo }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addSampleRequest } = useSampleStore();
  const { 
    getSampleRequestData, 
    setSampleRequestData, 
    clearSampleRequestData 
  } = useFormDataStore();
  
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  // Initialize form data from stored data or defaults
  const [formData, setFormData] = useState(() => {
    const savedData = getSampleRequestData();
    if (savedData) {
      return savedData;
    }
    return {
      productName: productInfo?.title || "",
      supplier: "Supplier Name", // This would be filled with actual supplier data
      quantity: 1,
      specifications: "",
      notes: "",
    };
  });

  // Save form data whenever it changes
  useEffect(() => {
    setSampleRequestData(formData);
  }, [formData, setSampleRequestData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Show signup modal instead of redirecting immediately
      setShowSignupModal(true);
      return;
    }
    
    // Submit sample request
    const sampleData = {
      productName: formData.productName,
      supplier: formData.supplier,
      buyer: "Current Buyer", // This would come from auth
      quantity: formData.quantity,
      specifications: formData.specifications,
      buyerNotes: formData.notes,
    };
    
    // Add the sample request to the store
    addSampleRequest(sampleData);
    
    // Clear stored form data after successful submission
    clearSampleRequestData();
    
    // Close the modal
    onClose();
    
    // Navigate to samples page
    router.push("/dashboard/samples");
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </Label>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier
            </Label>
            <Input
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Enter supplier name"
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </Label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-1">
              Specifications
            </Label>
            <Input
              id="specifications"
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              placeholder="Size, color, material, etc."
            />
          </div>

          <div>
            <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requirements or questions..."
              rows={3}
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full">
            Submit Sample Request
          </Button>
        </div>
      </form>

      {/* Signup Prompt Modal */}
      <SignupPromptModal
        isOpen={showSignupModal}
        onClose={handleCloseSignupModal}
        formType="sample-request"
      />
    </>
  );
};

export default SampleRequestForm;
