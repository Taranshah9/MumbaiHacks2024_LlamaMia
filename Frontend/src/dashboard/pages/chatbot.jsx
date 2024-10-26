import { useState, useRef, useEffect } from "react";
import { Send, User, Loader2, Sprout, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic } from "lucide-react";
import EnhancedSearchInput from "./Input";
import axios from "axios";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
const initialMessage = {
  id: 1,
  text: "👋 Hi there! I'm your agricultural assistant. I'm here to help with any farming, crop, or gardening questions you might have!",
  isBot: true,
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};
const GrowingPlantLoader = () => (
  <div className="flex items-start gap-3 animate-fade-in px-4">
    <Avatar className="w-10 h-10">
      <AvatarImage src="/api/placeholder/32/32" />
      <AvatarFallback className="bg-emerald-100">
        <Sprout className="w-5 h-5 text-emerald-600" />
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col gap-2 max-w-[80%]">
      <div className="flex items-center gap-2 h-8">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center text-sm text-emerald-600">
        <Sprout className="w-4 h-4 animate-pulse" />
        <span className="animate-pulse">Growing a response for you...</span>
      </div>
    </div>
  </div>
);

const DateDivider = ({ date }) => (
  <div className="flex items-center justify-center my-6 px-4">
    <div className="bg-gray-200 h-[1px] flex-grow" />
    <span className="px-4 text-sm text-gray-500 font-medium">{date}</span>
    <div className="bg-gray-200 h-[1px] flex-grow" />
  </div>
);

const ChatbotUI = () => {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [language, setLanguage] = useState("english");
  const handleLanguageChange = (value) => {
    setLanguage(value);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
const handleDataFromChild =  async (data)=>{
  console.log(data);
  if (data.trim()) {
    // console.log(data);
    
    const userMessage = {
      id: messages.length + 1,
      text: data,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    console.log(messages)
    // setInput("");
    
    setIsLoading(true);
const response = await axios.post("https://mumbaihacks-chatdisease.onrender.com/chat", {
  query: data,
  language: language.toLowerCase().slice(0,2)
})
setMessages((prev) => [...prev , {
  id: messages.length + 1,
      text: response.data.response,
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
}])
setIsLoading(false);
// setMessages({
//   id: messages.length + 1,
//       text: response.data.response,
//       isBot: true,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
// })
console.log("response" , response)

  }
}
  // const onSubmit = async (data) => {
  //   // e.preventDefault();
  //   if (data.trim()) {
  //     const userMessage = {
  //       id: messages.length + 1,
        
  //       text: input,
  //       isBot: false,
  //       timestamp: new Date().toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //     };
  //     setMessages((prevMessages) => [...prevMessages, userMessage]);
  //     console.log(messages)
  //     setInput("");
  //     setIsLoading(true);

  //   }
  // };

  const MessageBubble = ({ message }) => (
    <div
      className={`flex items-start gap-3 group animate-fade-in px-4 ${
        message.isBot ? "justify-start" : "justify-end"
      }`}
    >
      {message.isBot && (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback className="bg-emerald-100">
            <Sprout className="w-5 h-5 text-emerald-600" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`flex flex-col ${
          message.isBot ? "items-start" : "items-end"
        }`}
      >
        <div className="flex items-center gap-2">
          {message.isBot && (
            <span className="text-sm font-medium text-emerald-700">
              Agri Assistant
            </span>
          )}
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        <div
          className={`mt-1 p-3.5 rounded-2xl relative group ${
            message.isBot
              ? "bg-white border border-gray-200 rounded-tl-none shadow-sm"
              : "bg-emerald-600 text-white rounded-tr-none"
          }`}
          style={{ maxWidth: "min(420px, 80vw)" }}
        >
          {message.text}
          <div
            className={`absolute top-2 ${
              message.isBot ? "right-2" : "left-2"
            } opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <Button variant="ghost" size="icon" className="w-6 h-6">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      {!message.isBot && (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback className="bg-emerald-600 text-white">
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );

  return (
    <div className="h-[100vh]  bg-gray-50 flex flex-col">
      <div className="h-full flex flex-col">
        <div className="flex  justify-between bg-green-700 text-white py-2 px-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Agricultural Assistant</h1>
              <p className="text-sm text-green-100">
                Here to help with your farming queries
              </p>
            </div>

          </div>
          <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[120px] bg-white text-emerald-800">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="gujarati">Gujarati</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                </SelectContent>
              </Select>
        </div>
        {/* Chat Area */}
        <ScrollArea className="flex-grow">
          <div className="m-5 py-4">
            <DateDivider date="Today" />
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <GrowingPlantLoader />}
            </div>
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </ScrollArea>

        {/* Input Area */}
       <EnhancedSearchInput sendDataToParent={handleDataFromChild} /> 
      </div>
    </div>
  );
};

export default ChatbotUI;
