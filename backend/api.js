const express = require('express');
const router = express.Router();

// Mock Intent Classifier & Responder (NLP layer mock)
router.post('/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  // Basic mock intent detection
  const text = message.toLowerCase();
  let response = "I'm still learning, but I can help you with registration, finding booths, or tracking status.";
  let intent = "unknown";

  if (text.includes('register') || text.includes('apply')) {
    intent = "registration";
    response = "Here is how you register:\n1. Fill out Form 6 online or offline.\n2. Submit required ID and address proof.\n3. Wait for verification.";
  } else if (text.includes('booth') || text.includes('where to vote')) {
    intent = "polling_booth";
    response = "You can find your polling booth by checking our Booth Finder tool. Just enter your PIN code or use your current location.";
  } else if (text.includes('status')) {
    intent = "status";
    response = "You can track your application status using the App ID. Please use the Status Tracker tool in the main menu.";
  }

  res.json({ success: true, intent, response });
});

// Mock Document Extractor (OCR layer mock)
router.post('/document/extract', (req, res) => {
  // Normally this would accept multipart/form-data with a file,
  // call a Vision API or OCR tool, and extract fields.
  
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        name: "Jane Doe",
        dob: "01/01/1990",
        address: "123 Civic Ave, Block D format error" // intentional error to show validation UI
      }
    });
  }, 1500); // simulate delay
});

// Mock Polling Booth Finder (Maps/Location mock)
router.get('/booths', (req, res) => {
  const { query, lat, lng } = req.query;
  
  // Dummy data
  const booths = [
    { id: 1, name: 'St. Mary\'s High School', distance: '0.8 km', address: '123 Main St, Block A', crowd: 'Low', waitTime: '5 mins' },
    { id: 2, name: 'Community Center Hall', distance: '1.2 km', address: '45 Park Ave, Sector 4', crowd: 'High', waitTime: '25 mins' }
  ];

  res.json({ success: true, booths });
});

module.exports = router;
