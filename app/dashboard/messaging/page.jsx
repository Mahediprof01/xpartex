"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Search,
  Send,
  MoreHorizontal,
  MessageSquare,
  User,
  Building2,
  Clock,
  Check,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Smile,
  Phone,
  Star,
  MapPin,
  Mail,
  Globe,
  Award,
  ShieldCheck,
  X,
  Users,
  Calendar,
  TrendingUp,
  CheckCheck,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";

const conversations = [
  {
    id: "CONV-001",
    participant: {
      name: "UrbanWear Co.",
      type: "supplier",
      avatar: "/placeholder-logo.svg",
      online: true,
      verified: true,
      location: "Mumbai, India",
      email: "contact@urbanwear.com",
      phone: "+91-98765-43210",
      website: "www.urbanwear.com",
      rating: 4.8,
      totalOrders: 156,
      joinedDate: "2020-03-15",
      specialties: ["Denim", "Casual Wear", "Sustainable Fashion"],
      description: "Leading manufacturer of premium denim and casual wear with 15+ years of experience in sustainable fashion.",
    },
    lastMessage:
      "We can deliver the denim jackets within 20 days. Would you like to discuss pricing?",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    subject: "Denim Jackets - RFQ #RFQ-001",
    messages: [
      {
        id: "MSG-001",
        sender: "UrbanWear Co.",
        content:
          "Thank you for your RFQ. We can supply 500 denim jackets as requested.",
        timestamp: "2024-01-20T10:00:00Z",
        type: "received",
      },
      {
        id: "MSG-002",
        sender: "me",
        content: "Great! What's your lead time and pricing?",
        timestamp: "2024-01-20T11:30:00Z",
        type: "sent",
      },
      {
        id: "MSG-003",
        sender: "UrbanWear Co.",
        content:
          "We can deliver within 20 days. Would you like to discuss pricing?",
        timestamp: "2024-01-20T14:00:00Z",
        type: "received",
      },
    ],
  },
  {
    id: "CONV-002",
    participant: {
      name: "EcoFashion",
      type: "supplier",
      avatar: "/placeholder-logo.svg",
      online: false,
      verified: true,
      location: "Bangalore, India",
      email: "hello@ecofashion.com",
      phone: "+91-87654-32109",
      website: "www.ecofashion.in",
      rating: 4.9,
      totalOrders: 89,
      joinedDate: "2021-06-20",
      specialties: ["Organic Cotton", "Eco-Friendly", "Sustainable Materials"],
      description: "Certified organic cotton supplier focused on sustainable and eco-friendly textile solutions.",
    },
    lastMessage:
      "The organic cotton samples are ready for shipping. Tracking number will be sent tomorrow.",
    lastMessageTime: "1 day ago",
    unreadCount: 0,
    subject: "Organic Cotton Samples - SAMPLE-002",
    messages: [
      {
        id: "MSG-004",
        sender: "EcoFashion",
        content:
          "The organic cotton samples are ready for shipping. Tracking number will be sent tomorrow.",
        timestamp: "2024-01-19T16:00:00Z",
        type: "received",
      },
    ],
  },
  {
    id: "CONV-003",
    participant: {
      name: "Fashion Retail Co.",
      type: "buyer",
      avatar: "/placeholder-logo.svg",
      online: true,
      verified: false,
      location: "New Delhi, India",
      email: "procurement@fashionretail.com",
      phone: "+91-76543-21098",
      website: "www.fashionretail.co.in",
      rating: 4.6,
      totalOrders: 234,
      joinedDate: "2019-11-10",
      specialties: ["Retail Fashion", "Bulk Orders", "Seasonal Collections"],
      description: "Major fashion retail chain with 50+ stores across India, specializing in trendy apparel for young adults.",
    },
    lastMessage:
      "The samples look great! We'd like to proceed with the bulk order.",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    subject: "Sample Approval - SAMPLE-001",
    messages: [
      {
        id: "MSG-005",
        sender: "Fashion Retail Co.",
        content:
          "The samples look great! We'd like to proceed with the bulk order.",
        timestamp: "2024-01-17T09:00:00Z",
        type: "received",
      },
    ],
  },
];

// Professional User Profile Modal Component
const UserProfileModal = ({ isOpen, onClose, participant }) => {
  if (!isOpen || !participant) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-sky-600 to-cyan-500 text-white p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-white/30">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback className="bg-white/20 text-white text-xl">
                  {participant.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{participant.name}</h2>
                  {participant.verified && (
                    <ShieldCheck className="h-6 w-6 text-green-300" />
                  )}
                </div>
                <p className="text-sky-100 text-sm">{participant.type === 'supplier' ? 'Verified Supplier' : 'Business Partner'}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {participant.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Member since {new Date(participant.joinedDate).getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{participant.rating}</div>
                <div className="text-xs text-purple-600/70">Rating</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{participant.totalOrders}</div>
                <div className="text-xs text-blue-600/70">Orders</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">4.2y</div>
                <div className="text-xs text-green-600/70">Experience</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {participant.description}
              </p>
            </div>

            {/* Specialties */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {participant.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-gradient-to-r from-sky-50 to-cyan-50 border-sky-200 text-sky-700">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{participant.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{participant.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{participant.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-sky-600 to-cyan-500 text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const MessageBubble = ({ message, isOwn }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}
  >
    <div className={`relative max-w-md ${isOwn ? 'ml-12' : 'mr-12'}`}>
      {/* Message Content */}
      <div
        className={`px-4 py-3 rounded-2xl shadow-sm ${
          isOwn
            ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
            : "bg-white border border-gray-200 text-gray-900"
        } ${isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
      
      {/* Timestamp and Status */}
      <div className={`flex items-center gap-2 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <span className={`text-xs font-medium ${
          isOwn ? "text-gray-500" : "text-gray-500"
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        
        {isOwn && (
          <div className="flex items-center gap-1">
            <CheckCheck className="w-3 h-3 text-sky-500" />
          </div>
        )}
      </div>
      
      {/* Message Tail */}
      <div className={`absolute top-3 ${
        isOwn 
          ? 'right-0 transform translate-x-1' 
          : 'left-0 transform -translate-x-1'
      }`}>
        <div className={`w-3 h-3 transform rotate-45 ${
          isOwn 
            ? 'bg-gradient-to-br from-sky-500 to-cyan-500'
            : 'bg-white border-r border-b border-gray-200'
        }`}></div>
      </div>
    </div>
  </motion.div>
);

export default function MessagingPage() {
  const { role } = useAuthStore();
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" ||
      conv.participant.type === filterType;

    // Support 'freelancer' value explicitly (if participant.type uses 'freelancer')
    // (above already covers it, but keep explicit clarity)

    return matchesSearch && matchesType;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `MSG-${Date.now()}`,
      sender: "me",
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "sent",
    };

    selectedConversation.messages.push(message);
    setNewMessage("");
  };

  const getParticipantTypeLabel = (type) => {
    // show explicit Freelancer label
    if (type === 'freelancer') return 'Freelancer';

    if (role === "seller") {
      return type === "buyer" ? "Buyer" : "Supplier";
    } else {
      return type === "supplier" ? "Supplier" : "Buyer";
    }
  };

  const handleViewProfile = (participant) => {
    setSelectedProfile(participant);
    setShowProfileModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Main Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden"
            style={{ height: 'calc(100vh - 200px)' }}
          >
            <div className="flex h-full">
              {/* Conversations Sidebar */}
              <div className="w-80 border-r border-gray-200/50 flex flex-col bg-gradient-to-b from-white/90 to-gray-50/90">
                {/* Search Header */}
                <div className="p-6 bg-gradient-to-r from-sky-50 to-cyan-50 border-b border-gray-200/50">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search conversations..."
                        className="pl-10 bg-white/80 border-sky-200 focus:border-sky-400 focus:ring-sky-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="bg-white/80 border-sky-200 focus:border-sky-400 focus:ring-sky-400">
                        <SelectValue placeholder="Filter conversations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Conversations</SelectItem>
                        <SelectItem value="supplier">Suppliers</SelectItem>
                        <SelectItem value="buyer">Buyers</SelectItem>
                        <SelectItem value="freelancer">Freelancers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group relative p-4 cursor-pointer transition-all duration-300 ${
                        selectedConversation?.id === conversation.id 
                          ? "bg-gradient-to-r from-sky-100 to-cyan-50 border-r-4 border-sky-500" 
                          : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <Avatar 
                            className="w-12 h-12 border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewProfile(conversation.participant);
                            }}
                          >
                            <AvatarImage 
                              src={conversation.participant.avatar} 
                              alt={conversation.participant.name} 
                            />
                            <AvatarFallback className="bg-gradient-to-br from-sky-400 to-cyan-500 text-white font-semibold">
                              {conversation.participant.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          
                          {conversation.participant.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                          )}
                          
                          {conversation.participant.verified && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                              <ShieldCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900 truncate cursor-pointer hover:text-sky-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewProfile(conversation.participant);
                                  }}>
                                {conversation.participant.name}
                              </h3>
                              {conversation.participant.verified && (
                                <ShieldCheck className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                              {conversation.lastMessageTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs font-medium ${
                                conversation.participant.type === 'supplier' 
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              {getParticipantTypeLabel(conversation.participant.type)}
                            </Badge>
                            
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold animate-pulse">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                            
                            {conversation.participant.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600">{conversation.participant.rating}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-gray-600 font-medium truncate mb-1">
                            {conversation.subject}
                          </p>

                          <p className="text-sm text-gray-700 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-white/90">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gradient-to-r from-white via-sky-50 to-cyan-50 border-b border-gray-200/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar 
                              className="w-14 h-14 border-3 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => handleViewProfile(selectedConversation.participant)}
                            >
                              <AvatarImage 
                                src={selectedConversation.participant.avatar} 
                                alt={selectedConversation.participant.name} 
                              />
                              <AvatarFallback className="bg-gradient-to-br from-sky-400 to-cyan-500 text-white text-lg font-bold">
                                {selectedConversation.participant.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            
                            {selectedConversation.participant.online && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 
                                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-sky-600 transition-colors"
                                onClick={() => handleViewProfile(selectedConversation.participant)}
                              >
                                {selectedConversation.participant.name}
                              </h3>
                              {selectedConversation.participant.verified && (
                                <ShieldCheck className="w-5 h-5 text-blue-500" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3 mt-1">
                              <Badge 
                                variant="outline" 
                                className={`text-sm font-medium ${
                                  selectedConversation.participant.type === 'supplier' 
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                {getParticipantTypeLabel(selectedConversation.participant.type)}
                              </Badge>
                              
                              <span className={`text-sm font-medium flex items-center gap-1 ${
                                selectedConversation.participant.online 
                                  ? 'text-green-600' 
                                  : 'text-gray-500'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  selectedConversation.participant.online 
                                    ? 'bg-green-500' 
                                    : 'bg-gray-400'
                                }`}></div>
                                {selectedConversation.participant.online ? "Online" : "Offline"}
                              </span>
                              
                              {selectedConversation.participant.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 font-medium">{selectedConversation.participant.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="hover:bg-sky-50 hover:border-sky-300">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-white/60 rounded-lg border border-sky-100">
                        <p className="text-sm text-gray-700 font-medium">
                          📋 {selectedConversation.subject}
                        </p>
                      </div>
                    </motion.div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/30 to-white/50">
                      <div className="space-y-4">
                        {selectedConversation.messages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <MessageBubble message={message} isOwn={message.sender === "me"} />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gradient-to-r from-white via-sky-50 to-cyan-50 border-t border-gray-200/50"
                    >
                      <div className="flex items-end gap-3">
                        <div className="flex-1">
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            rows={2}
                            className="resize-none bg-white/80 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="hover:bg-sky-50 hover:border-sky-300">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="hover:bg-sky-50 hover:border-sky-300">
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="hover:bg-sky-50 hover:border-sky-300">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button 
                            onClick={handleSendMessage} 
                            size="icon"
                            className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white hover:from-sky-700 hover:to-cyan-600"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <span>Press Enter to send, Shift+Enter for new line</span>
                        <span className={newMessage.length > 800 ? 'text-amber-600' : ''}>{newMessage.length}/1000</span>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50"
                  >
                    <div className="text-center max-w-md">
                      <div className="w-24 h-24 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="h-12 w-12 text-sky-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Welcome to Messages
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Select a conversation from the sidebar to start messaging with your business partners. 
                        Stay connected and manage your communications efficiently.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        participant={selectedProfile}
      />
    </>
  );
}
