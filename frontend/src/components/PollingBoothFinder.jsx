import { useState } from 'react';
import { MapPin, Navigation2, Search, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultBooths = [
  { id: 1, name: 'St. Mary\'s High School', distance: '0.8 km', address: '123 Main St, Block A', crowd: 'Low', waitTime: '5 mins' },
  { id: 2, name: 'Community Center Hall', distance: '1.2 km', address: '45 Park Ave, Sector 4', crowd: 'High', waitTime: '25 mins' },
  { id: 3, name: 'City Public Library', distance: '2.5 km', address: '88 Library Rd', crowd: 'Medium', waitTime: '12 mins' }
];

const PollingBoothFinder = () => {
  const [query, setQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [booths, setBooths] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setIsLocating(true);
    setTimeout(() => {
      setBooths(defaultBooths);
      setIsLocating(false);
      setSearched(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 min-h-screen">
      <div className="p-4 bg-white shadow-sm z-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Find Polling Booth</h2>
        
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Enter PIN code or locality" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 border-none rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            />
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-4 flex items-center justify-center transition-colors"
          >
            <Search size={18} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="px-3 text-xs text-slate-400 font-medium uppercase">OR</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full mt-3 flex items-center justify-center space-x-2 py-3 rounded-xl border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors font-semibold"
        >
          <Crosshair size={18} />
          <span>Use My Current Location</span>
        </button>
      </div>

      <div className="flex-1 relative">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[#e5e3df] overflow-hidden">
          <div className="absolute inset-[-50%] opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 2px, transparent 2px), radial-gradient(circle at 50% 50%, #fff 2px, transparent 2px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}></div>
          {/* Mock routes */}
          <svg className="absolute inset-0 w-full h-full opacity-30 stroke-primary-600" fill="none">
             <path d="M 0,100 Q 150,150 200,300 T 400,400" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Loading Overlay */}
        {isLocating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center animate-bounce mb-4 text-white">
              <MapPin size={24} />
            </div>
            <p className="font-semibold text-slate-700">Locating coordinates...</p>
          </div>
        )}

        {/* Results Bottom Sheet */}
        {searched && !isLocating && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="absolute bottom-4 left-4 right-4 z-20 max-h-[60%] overflow-y-auto hidden-scrollbar"
          >
            <div className="space-y-3 pb-8">
              {booths.map((booth, i) => (
                <div key={booth.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="p-4 grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md">
                          {booth.distance}
                        </span>
                        {i === 0 && <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Nearest</span>}
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{booth.name}</h3>
                      <p className="text-sm text-slate-500 mb-3">{booth.address}</p>
                      
                      <div className="flex items-center space-x-4 text-xs font-medium">
                        <div className="flex items-center space-x-1">
                          <span className="text-slate-400">Crowd:</span>
                          <span className={booth.crowd === 'Low' ? 'text-emerald-500' : booth.crowd === 'Medium' ? 'text-amber-500' : 'text-rose-500'}>
                            {booth.crowd}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-slate-400">Wait:</span>
                          <span className="text-slate-700">{booth.waitTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl w-10 h-10 flex items-center justify-center transition-colors shadow-sm shadow-primary-600/30">
                        <Navigation2 size={18} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PollingBoothFinder;
