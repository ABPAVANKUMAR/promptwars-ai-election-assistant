import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Download, CheckCircle, Upload } from 'lucide-react';
import { sendChatMessage, sendVoiceCommand, processOcrId } from '../services/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Election Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;
    
    const newUserMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    const data = await sendChatMessage(text);
    
    setMessages(prev => [...prev, { id: Date.now(), text: data.response, sender: 'bot' }]);
    setIsLoading(false);
  };

  const startVoiceRecording = async () => {
    setIsRecording(true);
    // In a real app we'd use MediaRecorder here. For mock we'll just wait 2 seconds.
    setTimeout(async () => {
        setIsRecording(false);
        setMessages(prev => [...prev, { id: Date.now(), text: "(Voice Message Recorded)", sender: 'user' }]);
        setIsLoading(true);
        const data = await sendVoiceCommand(new Blob([]));
        handleSend(data.text || "Voice recognized message");
    }, 2000);
  };

  const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if(!file) return;
      
      setMessages(prev => [...prev, { id: Date.now(), text: `Uploaded Document: ${file.name}`, sender: 'user' }]);
      setIsLoading(true);
      
      const data = await processOcrId(file);
      setMessages(prev => [...prev, { id: Date.now(), text: `OCR Extraction Result:\n${data.extracted_text}`, sender: 'bot' }]);
      setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-brand-primary text-white flex justify-between items-center z-10">
        <div>
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <p className="text-white/80 text-xs">Online and ready to help</p>
        </div>
        <div className="flex space-x-2">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
            </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl p-4 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'}`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 py-2 bg-white flex space-x-2 overflow-x-auto whitespace-nowrap hide-scrollbar border-t border-gray-100">
         {["Am I eligible to vote?", "How to register?", "Find my polling booth", "Track my application"].map((q, idx) => (
             <button key={idx} onClick={() => handleSend(q)} className="text-xs bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1.5 rounded-full hover:bg-brand-100 transition-colors">
                 {q}
             </button>
         ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all">
          
          <button onClick={startVoiceRecording} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-100 text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}>
            <Mic size={20} />
          </button>
          
          <label className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors relative">
            <Upload size={20} />
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload}/>
          </label>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-gray-700"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
