import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getServices = async () => {
    try {
        const response = await api.get('/services');
        return response.data;
    } catch (error) {
        console.error("Error fetching services", error);
        return { services: [] };
    }
};

export const sendChatMessage = async (message) => {
    try {
        const response = await api.post('/chat', { message });
        return response.data;
    } catch (error) {
        console.error("Error sending chat", error);
        return { response: "Sorry, I am having trouble connecting to the server. Please check your backend is running." };
    }
};

export const sendVoiceCommand = async (audioBlob) => {
    try {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');
        const response = await axios.post(`${API_URL}/voice`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error processing voice", error);
        return { text: "Error processing voice." };
    }
};

export const processOcrId = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);
        const response = await axios.post(`${API_URL}/ocr`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error processing OCR", error);
        return { extracted_text: "Error processing image text." };
    }
};

export const getNearestPollingBooth = async (location) => {
    try {
        const response = await api.get(`/polling-booth?location=${encodeURIComponent(location)}`);
        return response.data;
    } catch (error) {
         return { nearest_booth: "Fetch error" };
    }
}

export const trackApplication = async (application_id) => {
     try {
        const response = await api.post('/track', { application_id });
        return response.data;
    } catch (error) {
        return { status: "Fetch error" };
    }
}
