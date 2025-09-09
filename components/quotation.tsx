"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { FileText, Upload, Eye, Trash2 } from "lucide-react";
import { showToast } from "../lib/toast";

const quotations = [
  {
    title: '320 GSM Fleece Hoodie',
    image: '/quotation1.jpg',
  },
  {
    title: 'Perkinsheven 180 GSM 100% Cotton',
    image: '/quotation2.jpg',
  },
  {
    title: 'Cutfabs 25 Options 100%',
    image: '/quotation3.jpg',
  },
  {
    title: 'Heavyweight Polo Shirt',
    image: '/quotation4.jpg',
  },
  {
    title: 'Bates 2" x 4" Heavy Duty Hook',
    image: '/quotation5.jpg',
  },
];

// File Upload Component
const FileUploadCard = ({
  files,
  onFileUpload,
  onFileDelete,
  onFilePreview,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "word":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "excel":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "image":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "ai":
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Attachments</CardTitle>
        <CardDescription>
          Upload supporting documents (PDF, Word, Excel, Images, AI files)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop files here, or click to browse
            </p>
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Supported: PDF, Word, Excel, Images, AI files (Max 10MB each)
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Uploaded Files:</h4>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFilePreview(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFileDelete(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Create RFQ Dialog Component
function CreateRFQDialog({ open, onOpenChange, onSubmit, selectedProduct }) {
  const [formData, setFormData] = useState({
    title: selectedProduct?.title || "",
    category: "",
    priority: "medium",
    budget: "",
    quantity: "",
    deadline: "",
    description: "",
    requirements: "",
    seller: "",
    negotiationRounds: 3,
    timeLimit: "",
    buyerNotes: "",
  });
  const [files, setFiles] = useState([]);

  // Update form data when selectedProduct changes
  React.useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        title: selectedProduct.title,
        description: `Request for quotation for ${selectedProduct.title}`,
      }));
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRFQ = {
      id: `RFQ-${Date.now()}`,
      ...formData,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
      responses: 0,
      quote: null,
      files: files,
      buyer: "Current Buyer",
      contactInfo: {
        name: "Current User",
        email: "user@example.com",
        phone: "+1 (555) 000-0000",
      },
    };
    onSubmit(newRFQ);
    setFormData({
      title: "",
      category: "",
      priority: "medium",
      budget: "",
      quantity: "",
      deadline: "",
      description: "",
      requirements: "",
      seller: "",
      negotiationRounds: 3,
      timeLimit: "",
      buyerNotes: "",
    });
    setFiles([]);
    onOpenChange(false);
  };

  const handleFileUpload = (file) => {
    const newFile = {
      name: file.name,
      type: file.name.split(".").pop().toLowerCase(),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    };
    setFiles([...files, newFile]);
  };

  const handleFileDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleFilePreview = (file) => {
    console.log("Previewing file:", file.name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Create New RFQ</DialogTitle>
          <DialogDescription>
            Submit a request for quotation to a specific supplier
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title" className="block text-sm text-gray-700">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="RFQ Title"
                required
                className="mt-1"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="category" className="block text-sm text-gray-700">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Textiles">Textiles</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Machinery">Machinery</SelectItem>
                  <SelectItem value="Chemicals">Chemicals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="priority" className="block text-sm text-gray-700">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="budget" className="block text-sm text-gray-700">Budget (USD) *</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                placeholder="5000"
                required
                className="mt-1"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="quantity" className="block text-sm text-gray-700">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                placeholder="100"
                required
                className="mt-1"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="deadline" className="block text-sm text-gray-700">Deadline *</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Seller Selection */}
          <div className="space-y-1">
            <Label htmlFor="seller" className="block text-sm text-gray-700">Select Supplier *</Label>
            <Select
              value={formData.seller}
              onValueChange={(value) =>
                setFormData({ ...formData, seller: value })
              }
            >
              <SelectTrigger className="mt-1 bg-white">
                <SelectValue placeholder="Choose a supplier" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="UrbanWear Co.">UrbanWear Co.</SelectItem>
                <SelectItem value="EcoFashion">EcoFashion</SelectItem>
                <SelectItem value="StyleHub">StyleHub</SelectItem>
                <SelectItem value="GreenTextiles">GreenTextiles</SelectItem>
                <SelectItem value="LuxuryFabrics">LuxuryFabrics</SelectItem>
                <SelectItem value="PremiumManufacturing">
                  PremiumManufacturing
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description & Requirements */}
          <div className="space-y-1">
            <Label htmlFor="description" className="block text-sm text-gray-700">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed description of the product or service needed"
              rows={3}
              required
              className="mt-1"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="requirements" className="block text-sm text-gray-700">Requirements *</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              placeholder="Specific requirements, quality standards, certifications needed"
              rows={3}
              required
              className="mt-1"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="buyerNotes" className="block text-sm text-gray-700">Additional Notes</Label>
            <Textarea
              id="buyerNotes"
              value={formData.buyerNotes}
              onChange={(e) =>
                setFormData({ ...formData, buyerNotes: e.target.value })
              }
              placeholder="Any additional information for the supplier..."
              rows={2}
              className="mt-1"
            />
          </div>

          {/* Negotiation Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="negotiationRounds" className="block text-sm text-gray-700">Negotiation Rounds</Label>
              <Select
                value={formData.negotiationRounds.toString()}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    negotiationRounds: parseInt(value),
                  })
                }
              >
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1">1 Round</SelectItem>
                  <SelectItem value="2">2 Rounds</SelectItem>
                  <SelectItem value="3">3 Rounds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="timeLimit" className="block text-sm text-gray-700">Negotiation Time Limit *</Label>
              <Input
                id="timeLimit"
                type="date"
                value={formData.timeLimit}
                onChange={(e) =>
                  setFormData({ ...formData, timeLimit: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* File Upload */}
          <FileUploadCard
            files={files}
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            onFilePreview={handleFilePreview}
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create RFQ</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Quotation() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rfqList, setRfqList] = useState([]);

  const handleRequestQuotation = (product) => {
    setSelectedProduct(product);
    setCreateDialogOpen(true);
  };

  const handleCreateRFQ = (newRFQ) => {
    setRfqList((prev) => [newRFQ, ...prev]);
    // Persist to localStorage so RFQs page can read it
    try {
      const existing = typeof window !== "undefined" ? localStorage.getItem("rfqs") : null;
      const list = existing ? JSON.parse(existing) : [];
      const updated = [newRFQ, ...list];
      if (typeof window !== "undefined") {
        localStorage.setItem("rfqs", JSON.stringify(updated));
        // Notify other components/pages
        window.dispatchEvent(new Event("rfqs-updated"));
      }
    } catch (e) {
      console.error("Failed to persist RFQ", e);
    }

    // Show success toast
    showToast("Request successfully submitted!", "success");
    console.log("New RFQ created:", newRFQ);
  };

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Quotation Products</h2>
            <button className="bg-sky-400 hover:bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all">View All Quotation</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {quotations.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center w-full min-w-[220px] max-w-[260px] p-6">
                <div className="w-full h-44 flex items-center justify-center mb-3">
                  <Image src={item.image} alt={item.title} width={180} height={180} className="object-contain max-h-44" />
                </div>
                <div className="font-medium text-base text-center mb-3 truncate w-full" title={item.title}>{item.title}</div>
                <button 
                  onClick={() => handleRequestQuotation(item)}
                  className="w-full border border-gray-300 bg-white text-gray-900 font-semibold py-2 rounded-full text-sm transition-all hover:bg-gray-50"
                >
                  Request for Quotation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ Modal */}
      <CreateRFQDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateRFQ}
        selectedProduct={selectedProduct}
      />
    </>
  );
}
