import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Mic, MoreVertical, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultSuggested = [
  "How do I register to vote?",
  "Where is my polling booth?",
  "What documents do I need?"
];

const mockBotResponses = {
  "eligibility": "To vote, you must be a citizen, at least 18 years old, and a resident of your constituency.",
  "register": "Here is how you register:\n1. Fill out Form 6 online or offline.\n2. Submit required ID and address proof.\n3. Wait for verification.",
  "default": "I'm still learning, but I can help you with registration, finding booths, or tracking status. What would you like to know?"
};

const ChatAssistant = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to your Election Assistant! How can I help you today?", isBot: true, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const intent = searchParams.get('intent');
    if (intent) {
      handleSend(`Tell me about ${intent}`, intent);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text, intentOverride = null) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      text,
      isBot: false,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = mockBotResponses.default;
      const lower = text.toLowerCase();
      if (intentOverride) {
        botReply = mockBotResponses[intentOverride] || botReply;
      } else if (lower.includes('register')) {
        botReply = mockBotResponses.register;
      } else if (lower.includes('eligibility') || lower.includes('eligible')) {
        botReply = mockBotResponses.eligibility;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botReply,
        isBot: true,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] pb-safe relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-indigo-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-bold">AI</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="font-bold text-slate-800 leading-none">Election Assistant</h2>
            <span className="text-xs text-green-600 font-medium tracking-wide">Online</span>
          </div>
        </div>
        <button className="text-slate-500 hover:text-slate-800 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-3.5 shadow-sm ${msg.isBot ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-none' : 'bg-primary-600 text-white rounded-tr-none'}`}>
                {msg.text.split('\n').map((line, i) => (
                  <span key={i} className="block leading-relaxed">{line}</span>
                ))}
              </div>
              <div className="flex items-center space-x-1 mt-1 px-1">
                <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                {!msg.isBot && <CheckCheck size={14} className="text-primary-500" />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start"
          >
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex space-x-1.5 items-center">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length < 3 && !isTyping && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-slate-50 border-t border-slate-200">
          {defaultSuggested.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap bg-white border border-primary-200 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-primary-50 active:scale-95 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-200 pb-[calc(1rem+env(safe-area-inset-bottom)+70px)]">
        <div className="flex items-end space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex-wrap sm:flex-nowrap">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent px-3 py-2 outline-none text-slate-800 placeholder-slate-400 min-w-0"
          />
          <div className="flex items-center space-x-1 pb-1 pr-1 shrink-0">
            {input.trim() ? (
              <button 
                onClick={() => handleSend(input)}
                className="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            ) : (
              <button className="w-10 h-10 bg-white border border-slate-200 hover:bg-slate-50 text-primary-600 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
