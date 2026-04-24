import React from 'react';
import { Home, MessageSquare, MapPin, Activity, Bell, HelpCircle, FileText } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: Home },
    { id: 'chat', label: 'Chat Assistant', icon: MessageSquare },
    { id: 'services', label: 'Voter Services', icon: FileText },
    { id: 'booth', label: 'Find Polling Booth', icon: MapPin },
    { id: 'track', label: 'Track Application', icon: Activity },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex items-start flex-col">
      <div className="p-6 w-full text-center border-b border-gray-100 flex items-center justify-center space-x-2">
        <div className="bg-brand-primary w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">EA</span>
        </div>
        <h1 className="text-xl font-bold text-brand-primary tracking-tight">VoterAssist AI</h1>
      </div>
      
      <nav className="flex-1 w-full py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-md' 
                  : 'text-gray-600 hover:bg-brand-50 hover:text-brand-primary'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 w-full border-t border-gray-200">
        <div className="flex items-center space-x-3 w-full p-2 rounded-lg bg-gray-50 border border-gray-100">
           <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User Profile" className="w-8 h-8 rounded-full"/>
           <div className="flex flex-col text-left">
             <span className="text-sm font-semibold text-gray-800">Citizen</span>
             <span className="text-xs text-gray-500">Verified Voter</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
