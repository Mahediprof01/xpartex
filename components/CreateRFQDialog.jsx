"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Label } from "./ui/label";
import FileUploadCard from "./FileUploadCard";

export default function CreateRFQDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
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
  });
  const [files, setFiles] = useState([]);
  const [descriptionWords, setDescriptionWords] = useState(0);
  const [descriptionError, setDescriptionError] = useState("");
  const MIN_DESCRIPTION_WORDS = 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate description word count
    const wordCount = (formData.description || "").trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < MIN_DESCRIPTION_WORDS) {
      setDescriptionError(`Description must be at least ${MIN_DESCRIPTION_WORDS} words. (${wordCount}/${MIN_DESCRIPTION_WORDS})`);
      return;
    }
    const newRFQ = {
      id: `RFQ-${Date.now()}`,
      ...formData,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
      responses: 0,
      quote: null,
      files: files,
      budget: Number(formData.budget) || 0,
      quantity: Number(formData.quantity) || 0,
      negotiationRounds: Number(formData.negotiationRounds) || 0,
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
    setFiles((prev) => [...prev, newFile]);
  };

  const handleFileDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleFilePreview = (file) => {
    console.log("Previewing file:", file.name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-full sm:max-w-4xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
        <DialogHeader className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-t-md border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl text-sky-700">Create New RFQ</DialogTitle>
              <DialogDescription className="text-sm text-sky-600">Submit a request for quotation to a specific supplier</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title" className="block text-sm text-gray-700">Title *</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="RFQ Title" required className="mt-1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="category" className="block text-sm text-gray-700">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
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
              <Input id="budget" type="number" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} placeholder="5000" required className="mt-1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="quantity" className="block text-sm text-gray-700">Quantity *</Label>
              <Input id="quantity" type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} placeholder="100" required className="mt-1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="deadline" className="block text-sm text-gray-700">Deadline *</Label>
              <Input id="deadline" type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} required className="mt-1" />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="seller" className="block text-sm text-gray-700">Select Supplier *</Label>
            <Select value={formData.seller} onValueChange={(value) => setFormData({ ...formData, seller: value })}>
              <SelectTrigger className="mt-1 bg-white">
                <SelectValue placeholder="Choose a supplier" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="UrbanWear Co.">UrbanWear Co.</SelectItem>
                <SelectItem value="EcoFashion">EcoFashion</SelectItem>
                <SelectItem value="StyleHub">StyleHub</SelectItem>
                <SelectItem value="GreenTextiles">GreenTextiles</SelectItem>
                <SelectItem value="LuxuryFabrics">LuxuryFabrics</SelectItem>
                <SelectItem value="PremiumManufacturing">PremiumManufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="block text-sm text-gray-700">Description * <span className="text-xs text-muted-foreground">(min {MIN_DESCRIPTION_WORDS} words)</span></Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, description: value });
                const wc = (value || "").trim().split(/\s+/).filter(Boolean).length;
                setDescriptionWords(wc);
                if (wc >= MIN_DESCRIPTION_WORDS) setDescriptionError("");
              }}
              placeholder="Detailed description of the product or service needed"
              rows={4}
              required
              className="mt-1"
            />
            <div className="flex items-center justify-between text-xs mt-1">
              <div className={`text-sm ${descriptionWords < MIN_DESCRIPTION_WORDS ? 'text-red-600' : 'text-green-600'}`}>
                {descriptionError || `${descriptionWords}/${MIN_DESCRIPTION_WORDS} words`}
              </div>
              <div className="text-muted-foreground">Tip: include product specs, quality, and timelines.</div>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="requirements" className="block text-sm text-gray-700">Requirements *</Label>
            <Textarea id="requirements" value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} placeholder="Specific requirements, quality standards, certifications needed" rows={3} required className="mt-1" />
          </div>

          {/* Additional Notes removed per request */}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="negotiationRounds" className="block text-sm text-gray-700">Negotiation Rounds</Label>
              <Select value={formData.negotiationRounds.toString()} onValueChange={(value) => setFormData({ ...formData, negotiationRounds: parseInt(value) })}>
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
              <Input id="timeLimit" type="date" value={formData.timeLimit} onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })} required className="mt-1" />
            </div>
          </div>

          <FileUploadCard files={files} onFileUpload={handleFileUpload} onFileDelete={handleFileDelete} onFilePreview={handleFilePreview} />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
              disabled={descriptionWords < MIN_DESCRIPTION_WORDS}
            >
              Create RFQ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
