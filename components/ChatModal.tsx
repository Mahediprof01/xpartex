"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MoreHorizontal, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Contact {
  id: string;
  name: string;
  company: string;
  avatar?: string;
  isVerified?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "For your safety & protection, do not pay outside xpartex",
    sender: "bot",
    timestamp: new Date(),
  },
  {
    id: "2",
    text: "This is a Verified Seller",
    sender: "bot",
    timestamp: new Date(),
  },
];

export default function ChatModal({ isOpen, onClose, contact }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setMessages(initialMessages);
  }, [isOpen, contact]);

  if (!isOpen || !contact) return null;

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! Our team will get back to you shortly.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="bg-blue-600 text-white text-sm">
                {contact.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {contact.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last seen 1 hour ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Star className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" onClick={onClose}>
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <span className="font-semibold">WE HAVE YOUR BACK</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
            For your safety & protection do not pay outside xpartex
          </p>
        </div>

        {/* Verified Seller Notice */}
        {contact.isVerified && (
          <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {contact.name} is a Verified Seller
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Verified seller has good reputation management and marked safe for business.{' '}
                <span className="underline cursor-pointer text-blue-600 dark:text-blue-400">Learn More</span>
              </p>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white dark:bg-gray-900">
          {messages.map((message, index) => (
            <div key={message.id}>
              {index === 0 && (
                <div className="text-center text-xs text-gray-500 my-4">
                  Aug 04, 8:52 AM
                </div>
              )}
              <div className={cn(
                "flex items-start space-x-3",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}>
                {message.sender !== 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                )}
                <div className="max-w-md">
                  <div className={cn(
                    "p-3 rounded-lg",
                    message.sender === 'user' 
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  )}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <div className={cn(
                    "text-xs text-gray-500 mt-1",
                    message.sender === 'user' ? "text-right" : "text-left"
                  )}>
                    {message.sender === 'user' ? 'You' : contact.name}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border-none focus:ring-0 focus-visible:ring-offset-0 bg-transparent"
            />
            <div className="flex items-center">
              <Button 
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 w-8 p-2 ml-2"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
