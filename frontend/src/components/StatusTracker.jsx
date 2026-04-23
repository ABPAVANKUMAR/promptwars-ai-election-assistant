import { useState } from 'react';
import { Search, CheckCircle2, Clock, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultStatus = {
  id: 'APP98273645',
  type: 'Voter ID Registration',
  submittedAt: '12 Oct 2026',
  currentStep: 2,
  steps: [
    { title: 'Application Submitted', date: '12 Oct 2026', completed: true },
    { title: 'Document Verification', date: '15 Oct 2026', completed: true },
    { title: 'Field Verification (BLO)', date: 'Estimated: 20 Oct', completed: false },
    { title: 'Final Approval', date: 'Pending', completed: false },
    { title: 'e-EPIC Generated', date: 'Pending', completed: false }
  ]
};

const StatusTracker = () => {
  const [appId, setAppId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!appId.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResult(defaultStatus);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh-140px)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Track Application</h2>
        <p className="text-slate-500 text-sm">Enter your Application ID to check current status.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="e.g. APP12345678" 
              value={appId}
              onChange={(e) => setAppId(e.target.value.toUpperCase())}
              className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 font-medium uppercase transition-all shadow-sm"
            />
            <FileText className="absolute left-3 top-3.5 text-slate-400" size={18} />
          </div>
          <button 
            type="submit"
            disabled={!appId.trim() || isSearching}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl px-5 flex items-center justify-center transition-colors shadow-sm"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search size={20} />
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {result && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md uppercase tracking-wide">
                    {result.type}
                  </span>
                  <h3 className="font-bold text-slate-800 text-lg mt-2">{result.id}</h3>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  Submitted: {result.submittedAt}
                </span>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-emerald-800 font-semibold text-sm">In Progress</p>
                  <p className="text-emerald-600 text-xs">Currently with Booth Level Officer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-6">Timeline</h4>
              
              <div className="relative pl-6 space-y-6">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                
                {result.steps.map((step, idx) => {
                  const isLast = idx === result.steps.length - 1;
                  const isCurrent = idx === result.currentStep;
                  
                  return (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center -ml-[3px] bg-white ring-4 ring-white ${step.completed ? 'text-primary-600' : isCurrent ? 'text-amber-500' : 'text-slate-300'}`}>
                        {step.completed ? <CheckCircle2 size={24} fill="currentColor" className="text-white" /> : 
                         isCurrent ? <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" /> :
                         <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                      </div>
                      
                      <div className={`${step.completed ? 'opacity-100' : isCurrent ? 'opacity-100' : 'opacity-50'}`}>
                        <h5 className={`font-bold text-sm ${step.completed ? 'text-slate-800' : isCurrent ? 'text-amber-700' : 'text-slate-500'}`}>
                          {step.title}
                        </h5>
                        <p className="text-xs font-medium text-slate-400 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusTracker;
