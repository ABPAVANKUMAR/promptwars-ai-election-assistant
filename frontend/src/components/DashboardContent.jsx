import React from 'react';
import { UserCheck, FilePlus, MapPin, Activity, Edit3, Download, ArrowRight, MessageCircle } from 'lucide-react';

const DashboardContent = ({ setActiveTab }) => {
  const cards = [
    { title: 'Check Eligibility', desc: 'See if you can vote', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { title: 'Register to Vote', desc: 'New voter enrollment', icon: FilePlus, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    { title: 'Find Polling Booth', desc: 'Locate your center', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', action: () => setActiveTab('booth') },
    { title: 'Track Application', desc: 'Check status online', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', action: () => setActiveTab('track') },
    { title: 'Update Details', desc: 'Change name/address', icon: Edit3, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
    { title: 'Download e-EPIC', desc: 'Get digital voter ID', icon: Download, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
  ];

  return (
    <div className="w-full flex gap-8 h-full">
      {/* Left Column: Welcome & Quick Links */}
      <div className="flex-1 flex flex-col space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <h1 className="text-3xl font-bold mb-2 relative z-10">Hello, I'm your Election Assistant AI 👋</h1>
          <p className="text-brand-100 mb-6 max-w-xl relative z-10 text-sm leading-relaxed">
            I can help you navigate the voting process, register online, track your application, and find your polling booth using chat or voice.
          </p>
          <div className="flex space-x-4 relative z-10">
            <button onClick={() => setActiveTab('chat')} className="bg-white text-brand-700 px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center space-x-2">
              <MessageCircle size={18} />
              <span>Start Chatting</span>
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Quick Services</h2>
              <button 
                onClick={() => setActiveTab('services')}
                className="text-sm text-brand-600 flex items-center font-medium hover:underline"
              >
                 View all <ArrowRight size={16} className="ml-1"/>
              </button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {cards.map((card, idx) => {
               const Icon = card.icon;
               return (
                 <div 
                   key={idx} 
                   onClick={card.action || undefined}
                   className="glass-panel p-5 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
                 >
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${card.bg} ${card.color} border ${card.border}`}>
                     <Icon size={20} />
                   </div>
                   <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-brand-600 transition-colors">{card.title}</h3>
                   <p className="text-xs text-gray-500">{card.desc}</p>
                 </div>
               );
             })}
           </div>
        </div>
      </div>

      {/* Right Column: AI Assistant Teaser OR Info Cards */}
      <div className="w-80 flex flex-col space-y-6">
         {/* Live Updates Card */}
         <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
             <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                Live Updates
             </h3>
             <div className="space-y-4">
                 <div className="border-l-2 border-brand-500 pl-3">
                     <p className="text-xs text-gray-500 mb-1">Today, 10:00 AM</p>
                     <p className="text-sm text-gray-800 font-medium">Voter list update extended to 30th May.</p>
                 </div>
                 <div className="border-l-2 border-gray-200 pl-3">
                     <p className="text-xs text-gray-500 mb-1">Yesterday</p>
                     <p className="text-sm text-gray-700">New polling booths added in Sector 4 & 5.</p>
                 </div>
             </div>
         </div>

         {/* Try AI Teaser */}
         <div className="flex-1 bg-gradient-to-b from-brand-50 to-white border border-brand-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
               <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-brand-600">
                  <MessageCircle size={24} />
               </div>
               <h3 className="font-bold text-gray-800 mb-2">Try the AI Assistant</h3>
               <p className="text-sm text-gray-600">
                  Got a complex query? Upload your ID card or just ask using voice commands!
               </p>
            </div>
            <button 
              onClick={() => setActiveTab('chat')}
              className="mt-6 w-full btn-primary py-2.5 flex items-center justify-center space-x-2"
            >
               <span>Open chat</span>
               <ArrowRight size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default DashboardContent;
