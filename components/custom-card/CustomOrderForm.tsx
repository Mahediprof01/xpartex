"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import useCustomOrderStore from "@/store/customOrderStore";
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
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, X } from "lucide-react";

const CustomOrderForm = ({ onClose, productInfo }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addCustomOrder } = useCustomOrderStore();
  const { 
    getCustomOrderData, 
    setCustomOrderData, 
    clearCustomOrderData 
  } = useFormDataStore();
  
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [products, setProducts] = useState(() => (productInfo?.title ? [productInfo.title] : []));
  const [newProduct, setNewProduct] = useState("");
  
  // Initialize form data from stored data or defaults
  const [formData, setFormData] = useState(() => {
    const savedData = getCustomOrderData();
    if (savedData) {
      return savedData;
    }
    return {
      buyer: "Your Company Name",
      items: productInfo?.title ? 1 : 0,
      budget: "",
      requirements: "",
      deadline: "",
      products: productInfo?.title ? [productInfo.title] : [],
    };
  });

  // Update products state when form data changes
  useEffect(() => {
    if (formData.products && formData.products.length > 0) {
      setProducts(formData.products);
    }
  }, [formData.products]);

  // Save form data whenever it changes
  useEffect(() => {
    setCustomOrderData(formData);
  }, [formData, setCustomOrderData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProduct = () => {
    if (newProduct.trim()) {
      const updatedProducts = [...products, newProduct.trim()];
      setProducts(updatedProducts);
      setFormData((prev) => ({
        ...prev,
        items: prev.items + 1,
        products: updatedProducts,
      }));
      setNewProduct("");
    }
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    
    setFormData((prev) => ({
      ...prev,
      items: prev.items - 1,
      products: updatedProducts,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Show signup modal instead of redirecting immediately
      setShowSignupModal(true);
      return;
    }
    
    // Add the custom order
    const orderData = {
      ...formData,
      budget: parseFloat(formData.budget),
    };
    
    addCustomOrder(orderData);
    
    // Clear stored form data after successful submission
    clearCustomOrderData();
    
    // Close the modal
    onClose();
    
    // Show success message or redirect to the orders page
    router.push(`/dashboard/orders`);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Company/Business Name
            </label>
            <Input
              name="buyer"
              value={formData.buyer}
              onChange={handleChange}
              placeholder="Enter your company name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Products
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {products.map((product, index) => (
                <Badge key={index} variant="outline" className="py-1.5 pl-2 pr-1">
                  {product}
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Add product"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addProduct}
                size="sm"
              >
                Add
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter your budget"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements & Specifications
            </label>
            <Textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Describe your requirements, materials, quality, etc."
              rows={4}
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
          >
            Submit Custom Order
          </Button>
        </div>
      </form>

      {/* Signup Prompt Modal */}
      <SignupPromptModal
        isOpen={showSignupModal}
        onClose={handleCloseSignupModal}
        formType="custom-order"
      />
    </>
  );
};

export default CustomOrderForm;
