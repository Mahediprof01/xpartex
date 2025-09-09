"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, RotateCcw } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import useCartStore from '@/store/cartStore';


function CheckoutPageContent() {
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const [isDefaultShipping, setIsDefaultShipping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const router = useRouter();
  const { items: cartItems, getSubtotal, getTotalWithTax, clearCart } = useCartStore();
 
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems.length, router]);
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
  
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      
      // Show success message
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('showToast', {
          detail: { message: 'Order placed successfully!', type: 'success' }
        });
        window.dispatchEvent(event);
      }
      
      router.push('/dashboard'); // Redirect to dashboard or order confirmation
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="container mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button onClick={() => router.push('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  py-8">
      <div className="container mx-auto  sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Shipping Address</CardTitle>
                <div className="flex items-center text-green-600 text-sm">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Your information is encrypted and secure
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name*</Label>
                    <Input id="fullName" placeholder="Enter your full name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number*</Label>
                    <div className="flex mt-1">
                      <div className="flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 text-sm">
                        <span className="mr-1">🇧🇩</span>
                        <span>+880</span>
                      </div>
                      <Input id="phone" placeholder="1700000000" className="rounded-l-none flex-1" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country*</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Bangladesh" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="division">Division*</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="chittagong">Chittagong</SelectItem>
                        <SelectItem value="sylhet">Sylhet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="area">Area*</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="area1">Area 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city">City*</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city1">City 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">House no./Building/Apartment*</Label>
                  <Input id="address" placeholder="Enter your address" className="mt-1" />
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm font-medium mb-3">Address Category</div>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input type="radio" name="addressType" value="home" className="mr-2" defaultChecked />
                      Home
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="addressType" value="office" className="mr-2" />
                      Office
                    </label>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    *We will attempt to deliver your parcel on weekdays between 9:00 AM and 6:00 PM
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="defaultShipping" 
                    checked={isDefaultShipping}
                    onCheckedChange={(checked) => setIsDefaultShipping(checked === true)}
                  />
                  <Label htmlFor="defaultShipping" className="text-sm">
                    Set as default shipping address
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                    <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                    <Label htmlFor="cash-on-delivery" className="flex-1 font-medium">
                      Cash On Delivery
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="other-methods" id="other-methods" />
                    <Label htmlFor="other-methods" className="flex-1 font-medium">
                      Other payment methods
                    </Label>
                    <div className="flex space-x-1 items-center">
                      <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                      <span className="text-gray-400 text-sm">...</span>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Order Summary ({cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'})
                </CardTitle>
                
                {/* Order Items */}
                <div className="space-y-3 mt-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200">
                        <Image
                          src={item.image}
                          alt={item.name || item.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.name || item.title}
                        </h4>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Qty: {item.quantity}</span>
                            {item.type && (
                              <span className={`text-xs px-1 py-0.5 rounded ${
                                item.type === 'ebook' ? 'bg-purple-100 text-purple-600' :
                                item.type === 'course' ? 'bg-green-100 text-green-600' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {item.type === 'ebook' ? '📚' : 
                                 item.type === 'course' ? '🎓' : 
                                 '🛍️'}
                              </span>
                            )}
                          </div>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Promotional Code" className="flex-1" />
                  <Button variant="outline" size="sm" className="bg-blue-500 text-white px-4 hover:bg-blue-600">
                    Apply
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Sub Total</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(getSubtotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${getTotalWithTax().toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                  Your order will be delivered to your doorstep with the highest level 
                  of safety within just <span className="font-semibold">7-14 days</span>.
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Every payment you make via Xpartex is secured with advanced SSL 
                      encryption and PCI data protection protocols. View details
                    </span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RotateCcw className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Claim a refund if your order doesn&apos;t ship, is missing, or arrives 
                      with product issues. View details
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <CheckoutPageContent />
    </AuthGuard>
  );
}
