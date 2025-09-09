'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, ClipboardList, MessageSquareText, TicketPercent, Search, Paperclip, MoreHorizontal, Star, ChevronDown, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import useAuthStore from '@/store/authStore'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface Contact {
  id: string
  name: string
  company: string
  lastMessage: string
  timestamp: string
  isOnline: boolean
  isVerified?: boolean
  avatar?: string
  unreadCount?: number
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'TexMart Traders',
    company: 'TexMart Traders',
    lastMessage: 'Me: Okay that...',
    timestamp: 'Just Now',
    isOnline: true,
    isVerified: true,
    avatar: '/expertavatar.png'
  },
  {
    id: '2',
    name: 'Global Stitch',
    company: 'Global Stitch',
    lastMessage: 'Me: Okay that...',
    timestamp: 'Just Now',
    isOnline: false,
    avatar: '/expertavatar2.png'
  },
  {
    id: '3',
    name: 'Fabricon Supplies',
    company: 'Fabricon Supplies',
    lastMessage: 'Me: Okay that...',
    timestamp: 'Just Now',
    isOnline: false,
    avatar: '/expertavatar3.png'
  },
  {
    id: '4',
    name: 'ThreadLine',
    company: 'ThreadLine',
    lastMessage: 'Hi there, I Can Del...',
    timestamp: 'Just Now',
    isOnline: false,
    avatar: '/expertavatar4.png'
  },
  {
    id: '5',
    name: 'Weave & Wear',
    company: 'Weave & Wear',
    lastMessage: 'Me: Okay that...',
    timestamp: 'Just Now',
    isOnline: false,
    avatar: '/expertavatar.png'
  },
  {
    id: '6',
    name: 'NextGen',
    company: 'NextGen',
    lastMessage: 'Me: Okay that...',
    timestamp: 'Just Now',
    isOnline: true,
    avatar: '/expertavatar2.png'
  },
  {
    id: '7',
    name: 'CottonCraft',
    company: 'CottonCraft',
    lastMessage: 'Me: Okay that...',
    timestamp: 'Just Now',
    isOnline: true,
    avatar: '/expertavatar3.png'
  },
  {
    id: '8',
    name: 'Urban Loom Trade..',
    company: 'Urban Loom Trade..',
    lastMessage: 'Me: Okay that...',
    timestamp: 'Just Now',
    isOnline: true,
    avatar: '/expertavatar4.png'
  }
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'For your safety & protection, do not pay outside sparrex',
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: '2',
      text: 'TexMart Traders is a Verified Seller',
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: '3',
      text: 'Verified seller has good reputation management and marked safe for business.',
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: '4', 
      text: 'Responded to Need Customized Wooden Buttons',
      sender: 'user',
      timestamp: new Date()
    },
    {
      id: '5',
      text: 'Bid Price: 5600  Timeline: 50ays',
      sender: 'user',
      timestamp: new Date()
    },
    {
      id: '6',
      text: 'Thank you for your interest in wooden buttons. We are pleased to offer 500 pieces of premium-quality wooden buttons as per your requirements.',
      sender: 'user',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const { role } = useAuthStore()
  const router = useRouter()

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // const closeChat = () => {
  //   setIsOpen(false)
  // }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  const sendMessage = () => {
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message! Our team will get back to you shortly.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleRFQListClick = () => {
    if (role === 'seller') {
      // Navigate to seller-specific page (to be implemented)
      router.push('/dashboard') // Placeholder route for sellers
    } else {
      // Default behavior for buyers or other roles
      router.push('/rfq')
    }
  }

  return (
    <>
      {/* Full Chat Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-[600px] flex overflow-hidden">
            {/* Left Sidebar - All Messages */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 p-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Messages</h2>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="p-1">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Contacts List */}
              <div className="flex-1 overflow-y-auto">
                {mockContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={cn(
                      "p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                      selectedContact?.id === contact.id && "bg-gray-100 dark:bg-gray-800"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback className="bg-blue-600 text-white text-lg">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {contact.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                            {contact.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {contact.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {contact.lastMessage}
                          </p>
                          <Star className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Chat Details */}
            <div className="flex-1 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-900">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                          {selectedContact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedContact.name}
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
                      <Button variant="ghost" size="sm" className="p-2">
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
                  {selectedContact.isVerified && (
                    <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedContact.name} is a Verified Seller
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
                              <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                              <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
                              {message.sender === 'user' ? 'You' : selectedContact.name}
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
                      <Button variant="outline" size="sm" className="mx-2 text-sm font-semibold border-gray-300 dark:border-gray-600">
                        Create Order
                      </Button>
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" className="p-2">
                          <MessageSquareText className="h-5 w-5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Paperclip className="h-5 w-5 text-gray-500" />
                        </Button>
                        <Button 
                          onClick={sendMessage}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 w-8 p-2"
                          disabled={!inputMessage.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <p>Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white dark:bg-gray-800 p-1.5 rounded-lg shadow-lg flex flex-col items-center space-y-1 border border-gray-200 dark:border-gray-700">
          <button onClick={handleRFQListClick} className="flex flex-col items-center justify-center p-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 w-14 h-14 group">
            <ClipboardList className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
            <span className="text-xs mt-0.5 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:font-semibold">RFQ List</span>
          </button>
          <button onClick={toggleChat} className="flex flex-col items-center justify-center p-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 w-14 h-14 relative group">
            <MessageSquareText className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
            <span className="text-xs mt-0.5 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:font-semibold">Message</span>
            {!isOpen && (
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
            )}
          </button>
          <button className="flex flex-col items-center justify-center p-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 w-14 h-14 group">
            <TicketPercent className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
            <span className="text-xs mt-0.5 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:font-semibold">Coupon</span>
          </button>
        </div>
      </div>
    </>
  )
}
