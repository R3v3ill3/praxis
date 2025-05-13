// frontend/src/pages/CampaignBuilder.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCampaign } from '../contexts/CampaignContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function CampaignBuilder() {
  const { user: currentUser } = useAuth();
  if (!currentUser) {
    return <div className="p-4 text-center text-gray-600">Loading your profile…</div>;
  }
  const userId = currentUser.uid;
  console.log("[CampaignBuilder] currentUser:", currentUser);
  const { updateCampaignData } = useCampaign();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatRef = React.useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/campaign-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim(), history: newMessages }),
      });

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.aiMessage };
      setMessages((prev) => [...prev, aiMessage]);
      setTimeout(() => chatRef.current?.scrollTo(0, chatRef.current.scrollHeight), 100);

      if (data.done && data.structured) {
        const classificationRes = await fetch('/api/classify-campaign-type', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ summary: data }),
        });

        const { match } = await classificationRes.json();
        const campaignRecord = {
          userId: userId,
          summary: data,
          classification: match,
          createdAt: serverTimestamp(),
        };

        await setDoc(doc(db, 'campaigns', currentUser.uid), campaignRecord);
        updateCampaignData(campaignRecord);
        navigate('/campaign/next-steps');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Describe Your Campaign</h2>

      <div className="border rounded p-4 mb-4 bg-gray-50 max-h-[50vh] overflow-y-auto" ref={chatRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-4 py-2 rounded-lg shadow max-w-[80%] ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        className="w-full border rounded p-2 mb-2"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        disabled={loading}
      />

      <button
        onClick={sendMessage}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>

      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
