import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, Settings, MessageSquare } from 'lucide-react';
import axios from 'axios';
import './App.css';
import ai from "./assets/ai.png";
import user from "./assets/user.png";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [interviewType, setInterviewType] = useState('Python');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userId, setUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const messageEndRef = useRef(null);
  const apiEndpoint = 'https://meerkat-saving-seriously.ngrok-free.app/speech';

  const trendingOpportunities = ['#Internships', '#AI Projects', '#Hackathons'];
  const recentChats = ['AI Career Advisor', 'Skill Recommender'];

  const speakText = (text) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('SpeechSynthesis not supported or text is empty');
    }
  };

  const startRecording = async () => {
    if (!userId) {
      alert('Please enter a user ID before starting the interview.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunks.current = [];
        sendAudioToServer(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToServer = (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('user_id', userId);
    formData.append('interview_type', interviewType);

    axios.post(apiEndpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log('Received response from server:', response.data);
        updateConversation(response.data);
      })
      .catch((error) => {
        console.error('Error sending audio to server:', error);
      });
  };

  const updateConversation = (data) => {
    const updatedHistory = [...conversationHistory];
    const newHistory = data.history.filter(
      (newMessage) => !updatedHistory.some(
        (oldMessage) => oldMessage.content === newMessage.content && oldMessage.role === newMessage.role
      )
    );
    setConversationHistory([...updatedHistory, ...newHistory]);
    newHistory.forEach((message) => {
      if (message.role === 'assistant') {
        speakText(message.content);
      }
    });
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationHistory]);

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">Opportune</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="trending">
          <h3>Trending Opportunities</h3>
          {trendingOpportunities.map((opp, index) => (
            <div key={index} className="trending-item">{opp}</div>
          ))}
        </div>
        <div className="recent-chats">
          <h3>Recent Chats</h3>
          {recentChats.map((chat, index) => (
            <div key={index} className="chat-item">
              <MessageSquare size={16} />
              <span>{chat}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Opportune AI Assistant - {interviewType} Interview</h2>
          <div className="header-icons">
            <Search size={20} />
            <Clock size={20} />
            <Settings size={20} />
          </div>
        </div>
        <div className="interview-settings">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
          <label htmlFor="interviewType">Interview Type:</label>
          <select
            id="interviewType"
            value={interviewType}
            onChange={(e) => setInterviewType(e.target.value)}
          >
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="Flask">Flask</option>
          </select>
        </div>
        <div className="chatbot-message-container">
          {conversationHistory.map((message, index) => (
            <div key={index} className={chatbot-message ${message.role}}>
              {message.role === 'assistant' ? (
                <>
                  <img src={ai} alt="AI Icon" className="assistant-icon" />
                  <span>{message.content}</span>
                </>
              ) : (
                <>
                  <span>{message.content}</span>
                  <img src={user} alt="User Icon" className="user-icon" />
                </>
              )}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <div className="input-area">
          <button
            className={record-button ${isRecording ? 'recording' : ''}}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? 'Stop Talking' : 'Start Talking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App