"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, User, UserPlus } from "lucide-react";

interface SignupPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: "custom-order" | "sample-request";
  redirectUrl?: string;
}

const SignupPromptModal: React.FC<SignupPromptModalProps> = ({
  isOpen,
  onClose,
  formType,
  redirectUrl
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignupRedirect = () => {
    const currentUrl = window.location.pathname;
    const params = new URLSearchParams();
    params.set("redirect", currentUrl);
    params.set("formType", formType);
    if (redirectUrl) {
      params.set("redirectUrl", redirectUrl);
    }
    
    onClose();
    router.push(`/signup?${params.toString()}`);
  };

  const handleLoginRedirect = () => {
    const currentUrl = window.location.pathname;
    const params = new URLSearchParams();
    params.set("redirect", currentUrl);
    params.set("formType", formType);
    if (redirectUrl) {
      params.set("redirectUrl", redirectUrl);
    }
    
    onClose();
    router.push(`/login?${params.toString()}`);
  };

  const formTypeLabel = formType === "custom-order" ? "Custom Order" : "Sample Request";

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sign Up Required
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To submit your <span className="font-medium">{formTypeLabel}</span>, you need to have an account. 
                Your form data will be saved and restored after signup.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSignupRedirect}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
            </Button>
            
            <Button 
              onClick={handleLoginRedirect}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <User className="w-4 h-4 mr-2" />
              Already have an account? Sign In
            </Button>
          </div>

          {/* Cancel */}
          <div className="pt-2 border-t border-gray-100">
            <Button 
              onClick={onClose}
              variant="ghost"
              className="w-full text-gray-500 hover:text-gray-700"
              size="sm"
            >
              Continue filling form (submit later)
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPromptModal;
