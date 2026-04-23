import { useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, scanning, extracted, confirmed
  const [extractedData, setExtractedData] = useState({
    name: '',
    dob: '',
    address: ''
  });

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      setStatus('scanning');
      
      // Simulate OCR delay
      setTimeout(() => {
        setExtractedData({
          name: 'Jane Doe',
          dob: '01/01/1990',
          address: '' // missing address to simulate error
        });
        setStatus('extracted');
      }, 2500);
    }
  };

  const handleConfirm = () => {
    setStatus('confirmed');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Document Validation</h2>

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border-2 border-dashed border-primary-300 rounded-3xl p-8 bg-primary-50 text-center cursor-pointer hover:bg-primary-100 transition-colors relative"
          >
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary-600">
              <UploadCloud size={32} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-1">Upload ID Document</h3>
            <p className="text-sm text-slate-500">Tap here or drag & drop<br/> JPG, PNG up to 5MB</p>
          </motion.div>
        )}

        {status === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="card text-center py-12"
          >
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">Scanning Document</h3>
            <p className="text-slate-500">Extracting information using AI...</p>
          </motion.div>
        )}

        {status === 'extracted' && (
          <motion.div
            key="extracted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3">
              <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-amber-800 text-sm">Action Required</h4>
                <p className="text-amber-700 text-xs mt-1">We couldn't clearly read the address. Please fill it manually.</p>
              </div>
            </div>

            <div className="card space-y-4">
              {file && (
                <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden mb-4 relative">
                  <img src={file} alt="Document preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-slate-900/60 backdrop-blur text-white text-xs px-2 py-1 rounded-md font-medium">Preview</div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ">Full Name</label>
                <input 
                  type="text" 
                  value={extractedData.name}
                  onChange={e => setExtractedData({...extractedData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 outline-none text-slate-800 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date of Birth</label>
                <input 
                  type="text" 
                  value={extractedData.dob}
                  onChange={e => setExtractedData({...extractedData, dob: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 outline-none text-slate-800 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Address <span className="text-rose-500">*</span></label>
                <textarea 
                  value={extractedData.address}
                  onChange={e => setExtractedData({...extractedData, address: e.target.value})}
                  className={`w-full bg-slate-50 border focus:ring-2 rounded-xl px-4 py-3 outline-none text-slate-800 transition-all min-h-[80px] font-medium ${!extractedData.address ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-200 focus:border-primary-500 focus:ring-primary-200'}`}
                  placeholder="Enter your full address"
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setStatus('idle')}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                >
                  <RefreshCw size={18} />
                  <span>Retake</span>
                </button>
                <button 
                  onClick={handleConfirm}
                  disabled={!extractedData.address}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <CheckCircle size={18} />
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="font-bold text-2xl text-emerald-800 mb-2">Verified Successfully</h3>
            <p className="text-emerald-600 mb-6">Your document has been validated and data is securely saved.</p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
              Continue to Application
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentUpload;
