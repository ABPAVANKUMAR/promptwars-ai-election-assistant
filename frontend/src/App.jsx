import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import DashboardContent from './components/DashboardContent';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-800 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
         {/* Top Header */}
         <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 shadow-sm z-10">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {activeTab.replace('-', ' ')}
            </h2>
            <div className="flex items-center space-x-4">
                <div className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full border border-brand-100 text-sm font-medium">
                   Next Election: 24 Nov 2026
                </div>
            </div>
         </header>

         {/* Main Content Area */}
         <div className="flex-1 p-8 overflow-y-auto relative">
           {/* Abstract background shapes */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-100 opacity-50 blur-3xl pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100 opacity-40 blur-3xl pointer-events-none"></div>

           <div className="max-w-6xl mx-auto h-full relative z-10">
              {activeTab === 'dashboard' && <DashboardContent setActiveTab={setActiveTab} />}
              {activeTab === 'chat' && (
                <div className="h-full flex items-center justify-center">
                    <div className="w-full max-w-3xl h-[85%] shadow-xl rounded-2xl">
                       <ChatInterface />
                    </div>
                </div>
              )}
              {activeTab === 'services' && (
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                     <h3 className="text-2xl font-bold text-gray-800 mb-4">Voter Services Portal</h3>
                     <p className="text-gray-600">Access all voter services. Use the chat bot for guided assistance.</p>
                 </div>
              )}
              {activeTab === 'booth' && (
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                     <h3 className="text-2xl font-bold text-gray-800 mb-4">Polling Booth Locator</h3>
                     <p className="text-gray-600">Enter your area code in the Chat Assistant to find nearest booths.</p>
                 </div>
              )}
              {activeTab === 'track' && (
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                     <h3 className="text-2xl font-bold text-gray-800 mb-4">Track Application</h3>
                     <p className="text-gray-600">Provide your application ID to the AI bot to get live status.</p>
                 </div>
              )}
              {activeTab === 'notifications' && (
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                     <h3 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h3>
                     <ul className="space-y-3">
                         <li className="p-4 bg-brand-50 border border-brand-100 rounded-lg text-sm text-brand-800">Your voter verification is successful.</li>
                         <li className="p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600">Upcoming municipal elections on 24 Nov.</li>
                     </ul>
                 </div>
              )}
              {activeTab === 'help' && (
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                     <h3 className="text-2xl font-bold text-gray-800 mb-4">Help & Support</h3>
                     <p className="text-gray-600">Read our FAQs or speak to the AI Assistant.</p>
                 </div>
              )}
           </div>
         </div>
      </main>
    </div>
  );
}

export default App;
