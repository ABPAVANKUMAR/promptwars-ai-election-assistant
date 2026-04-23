import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './pages/ChatAssistant';
import DocumentUpload from './pages/DocumentUpload';
import PollingBoothFinder from './pages/PollingBoothFinder';
import StatusTracker from './pages/StatusTracker';
import VotingSimulator from './pages/VotingSimulator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<ChatAssistant />} />
          <Route path="upload" element={<DocumentUpload />} />
          <Route path="polling-booth" element={<PollingBoothFinder />} />
          <Route path="status" element={<StatusTracker />} />
          <Route path="simulator" element={<VotingSimulator />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
