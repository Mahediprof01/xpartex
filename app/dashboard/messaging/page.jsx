"use client";

import { useState } from "react";
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

const MessageBubble = ({ message, isOwn }) => (
  <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
    <div
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwn
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-foreground"
      }`}
    >
      <div className="text-sm">{message.content}</div>
      <div
        className={`text-xs mt-1 ${
          isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  </div>
);

export default function MessagingPage() {
  const { role } = useAuthStore();
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" || conv.participant.type === filterType;

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
    if (role === "seller") {
      return type === "buyer" ? "Buyer" : "Supplier";
    } else {
      return type === "supplier" ? "Supplier" : "Buyer";
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Conversations List */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conversations</SelectItem>
                <SelectItem value="supplier">Suppliers</SelectItem>
                <SelectItem value="buyer">Buyers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedConversation?.id === conversation.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={conversation.participant.avatar}
                    alt={conversation.participant.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {conversation.participant.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm truncate">
                      {conversation.participant.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {conversation.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {getParticipantTypeLabel(conversation.participant.type)}
                    </Badge>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.subject}
                  </p>

                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedConversation.participant.avatar}
                      alt={selectedConversation.participant.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {selectedConversation.participant.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {selectedConversation.participant.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getParticipantTypeLabel(
                          selectedConversation.participant.type
                        )}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {selectedConversation.participant.online
                          ? "Online"
                          : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                {selectedConversation.subject}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender === "me"}
                />
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-end gap-2">
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
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{newMessage.length}/1000</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No conversation selected
              </h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
