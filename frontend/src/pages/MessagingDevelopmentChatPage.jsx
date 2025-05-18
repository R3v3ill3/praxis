// frontend/src/pages/MessagingDevelopmentChatPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ScrollArea } from '../components/ui/scroll-area';
import { useToast } from '../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { SendHorizonal } from 'lucide-react';

const ALL_POTENTIAL_KEYS_WITH_FRIENDLY_NAMES = {
    "issueName": "The core issue or problem your campaign addresses",
    "geographicContext": "The specific location or community context of your campaign",
    "proposedChange": "The specific change or solution your campaign is proposing",
    "primaryAudience": "The main group of people you want to reach and persuade with your messaging",
    "desiredOutcome": "The ultimate overall outcome or impact you hope to achieve with the campaign (this may be related to your main campaign goals, which we have noted from your earlier setup)",
    "campaignObjective": "A more specific objective for this particular messaging effort (e.g., what should people think, feel, or do after seeing/hearing the message?)",
    "audienceProfile.demographics": "Key demographics of your primary audience (e.g., age, gender, occupation, location, specific community groups)",
    "audienceProfile.psychographics": "Common values, attitudes, lifestyles, aspirations, or concerns of your audience",
    "audienceProfile.priorBeliefs": "What your audience likely already thinks, feels, or believes about the issue or the proposed change",
    "audienceProfile.mediaHabits": "How or where your audience typically gets their information or spends their time (e.g., specific social media, local news, community events, word-of-mouth)",
    "deliveryContext.format": "The planned formats for delivering these messages (e.g., social media posts, flyers, emails, public talks, videos)",
    "deliveryContext.messenger": "Who (person, group, or type of individual) would be the most credible or relatable to deliver these messages to your audience",
    "deliveryContext.timing": "Any specific timing considerations for when these messages should be delivered (e.g., tied to an upcoming event, a particular phase of the campaign, a specific time of year/day)",
    "knownComparisons": "Any similar campaigns or messaging efforts (from your side or others, successful or not) that you are aware of that might offer insights or lessons",
    "benchmarkData": "Any existing data, statistics, or benchmarks related to current audience awareness, attitudes, or behaviors regarding the issue"
};


async function sendMessagingChatMessage(payload) {
  const response = await fetch('/api/messaging-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: 'Network error or non-JSON server response.',
      details: `Status: ${response.status}`
    }));
    const errorMessage = errorData.error || errorData.details || `Server error: ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

const MessagingDevelopmentChatPage = () => {
  const {
    campaignId,
    summary,
    goals,
    classification, // Get classification from context
    messagingInputs,
    initialMessagingInputs: contextInitialMessagingInputs,
    updateMessagingInputs,
  } = useCampaign();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [conversation, setConversation] = useState([]);
  const [currentUserMessage, setCurrentUserMessage] = useState('');
  
  const [isLoadingNextMessage, setIsLoadingNextMessage] = useState(false);
  
  const [isInitializingChat, setIsInitializingChat] = useState(false);
  const [initializationStatus, setInitializationStatus] = useState('pending');
  const [initializationError, setInitializationError] = useState(null);

  const [isComplete, setIsComplete] = useState(false);
  const [currentFieldInFocus, setCurrentFieldInFocus] = useState(null);

  const chatContainerRef = useRef(null);
  const initCalledRef = useRef(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const initializeChat = useCallback(async () => {
    console.log("CALLBACK: initializeChat function body executing.");
    if (!campaignId) {
      setInitializationError("Campaign ID is missing.");
      setInitializationStatus('failed');
      setIsInitializingChat(false);
      return;
    }
     if (!classification) { // Ensure classification is available
      setInitializationError("Campaign classification is missing. Please ensure the campaign setup is complete.");
      setInitializationStatus('failed');
      setIsInitializingChat(false);
      return;
    }
    
    setInitializationError(null);

    let currentKnownInputs = messagingInputs;
    const isMessagingInputsEffectivelyEmpty = !currentKnownInputs || 
                                            (typeof currentKnownInputs === 'object' && Object.keys(currentKnownInputs).length === 0) ||
                                            (contextInitialMessagingInputs && JSON.stringify(currentKnownInputs) === JSON.stringify(contextInitialMessagingInputs));


    if (isMessagingInputsEffectivelyEmpty) {
      console.log("MessagingDevelopmentChatPage: Initializing messagingInputs in context for chat.");
      const initialData = { ...(contextInitialMessagingInputs || {}) };
      if (summary) {
        initialData.issueName = summary.purpose || initialData.issueName || '';
        initialData.primaryAudience = summary.audience || initialData.primaryAudience || '';
      }
      if (goals && goals.length > 0) {
        initialData.desiredOutcome = goals.sort((a,b) => a.rank - b.rank).map(g => g.label).join('; ') || initialData.desiredOutcome || '';
      }
      // Only update if there's actually something to update to avoid potential loops
      if(JSON.stringify(currentKnownInputs) !== JSON.stringify(initialData)) {
          updateMessagingInputs(initialData);
      }
      currentKnownInputs = initialData;
    } else {
      console.log("MessagingDevelopmentChatPage: Using existing messagingInputs for chat initial call.", currentKnownInputs);
    }
    
    const payload = {
      campaignId,
      conversationHistory: [],
      currentUserMessage: '',
      knownInputs: currentKnownInputs,
      classification: classification, // <<< Pass classification to backend
    };

    try {
      console.log("FETCH: Initializing chat, sending to /api/messaging-chat:", payload);
      const response = await sendMessagingChatMessage(payload);
      console.log("FETCH: Initial response from /api/messaging-chat:", response);

      if (response.aiMessage) {
        setConversation([{ role: 'assistant', content: response.aiMessage }]);
      }
      if (response.updatedKnownInputs) {
        updateMessagingInputs(response.updatedKnownInputs);
      }
      setCurrentFieldInFocus(response.fieldInFocus || null);
      setIsComplete(response.isComplete || false);
      setInitializationStatus('success');

    } catch (error) { /* ... (same error handling as your last version) ... */
        console.error("FETCH ERROR: Error initializing chat:", error);
        const errorMessage = error.message || "An unknown error occurred during chat initialization.";
        setInitializationError(errorMessage);
        setInitializationStatus('failed');
        toast({ variant: "destructive", title: "Error Initializing Chat", description: errorMessage });
        setConversation([{ role: 'assistant', content: `Sorry, I couldn't start our conversation: ${errorMessage}. Please wait for rate limits to clear and then refresh the page.` }]);
    } finally {
      setIsInitializingChat(false);
    }
  }, [campaignId, summary, goals, classification, messagingInputs, contextInitialMessagingInputs, updateMessagingInputs, toast]); // Added classification to deps

  useEffect(() => {
    // console.log("EFFECT: Checking conditions for initializeChat", { campaignId, classification: !!classification, status: initializationStatus, isInitializing: isInitializingChat, initCalled: initCalledRef.current });
    if (campaignId && classification && !initCalledRef.current && !isInitializingChat) { // Added check for classification
      // console.log("EFFECT: Conditions MET. Setting initCalledRef to true and calling initializeChat.");
      initCalledRef.current = true;
      setIsInitializingChat(true);
      initializeChat();
    } else {
      // console.log("EFFECT: Conditions NOT MET or already called. Not calling initializeChat.");
    }
  }, [campaignId, classification, initializeChat, isInitializingChat]); // Added classification to deps

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentUserMessage.trim() || isLoadingNextMessage || isComplete || initializationStatus !== 'success' || isInitializingChat) return;

    const newUserMessage = { role: 'user', content: currentUserMessage.trim() };
    setConversation(prevConversation => [...prevConversation, newUserMessage]);
    setCurrentUserMessage('');
    setIsLoadingNextMessage(true);

    const currentMessagingInputs = messagingInputs || contextInitialMessagingInputs || {};
    const payload = {
      campaignId,
      conversationHistory: [...conversation, newUserMessage], 
      knownInputs: currentMessagingInputs,
      classification: classification, // <<< Pass classification to backend
    };

    try {
      // ... (rest of handleSendMessage remains the same, sending payload) ...
      console.log("SEND: Sending message to /api/messaging-chat:", payload);
      const response = await sendMessagingChatMessage(payload);
      console.log("SEND: Response from /api/messaging-chat:", response);

      if (response.aiMessage) { setConversation(prev => [...prev, { role: 'assistant', content: response.aiMessage }]); }
      if (response.updatedKnownInputs) { updateMessagingInputs(response.updatedKnownInputs); }
      setCurrentFieldInFocus(response.fieldInFocus || null);
      setIsComplete(response.isComplete || false);
      if (response.isComplete) { toast({ title: "Information Complete!", description: "We've gathered all necessary details." }); }
    } catch (error) { /* ... (same error handling as your last version) ... */
        console.error("SEND ERROR: Error sending message:", error);
        const errorMessage = error.message || "An unknown error occurred while sending the message.";
        toast({ variant: "destructive", title: "Chat Error", description: errorMessage });
        setConversation(prev => [...prev, { role: 'assistant', content: `Sorry, I encountered an issue: ${errorMessage}` }]);
    } finally {
      setIsLoadingNextMessage(false);
    }
  };
  
  // --- JSX (largely the same as your last version, ensure loading/error states are good) ---
  // ... (Initial loading state, init failed state, no campaign ID state) ...
  // ... (Main chat UI, disabled states for input based on initializationStatus, etc.)

  if (isInitializingChat && initializationStatus === 'pending') { /* ... loading UI ... */ }
  if (initializationStatus === 'failed') { /* ... failed UI ... */ }
  if (!campaignId && !isInitializingChat) { /* ... no campaign UI ... */ }
  if (initializationStatus !== 'success') { /* ... generic loading/problem UI ... */ }

  // The rest of your JSX return should be mostly fine.
  // Just ensure the input `disabled` conditions use `initializationStatus !== 'success'` correctly.
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto flex flex-col h-[calc(100vh-100px)]">
      <Card className="flex-grow flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">Develop Messaging (AI Chat)</CardTitle>
          <CardDescription>
            Let's gather the info for your messaging guide. Campaign ID: {campaignId}
            {currentFieldInFocus && !isComplete && <span className="block text-sm text-blue-600">I'm currently asking about: {ALL_POTENTIAL_KEYS_WITH_FRIENDLY_NAMES[currentFieldInFocus] || currentFieldInFocus.replace("audienceProfile.", "Audience ").replace("deliveryContext.", "Delivery ")}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col overflow-hidden">
          <ScrollArea className="flex-grow mb-4 pr-4" ref={chatContainerRef}>
            {conversation.map((msg, index) => (
              <div key={index} className={`mb-3 p-3 rounded-lg max-w-[85%] ${
                msg.role === 'user' ? 'bg-blue-500 text-white ml-auto' : msg.content.startsWith("Sorry, I couldn't start") ? 'bg-red-100 text-red-700 mr-auto' : 'bg-gray-200 text-gray-800 mr-auto'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
            {isLoadingNextMessage && <div className="mb-3 p-3 rounded-lg max-w-[85%] bg-gray-200 text-gray-800 mr-auto"><p className="text-sm italic">Assistant is typing...</p></div>}
          </ScrollArea>

          {isComplete ? (
            <div className="text-center p-4 border-t">
              <p className="text-green-600 font-semibold mb-3">All information has been collected!</p>
              <Button onClick={() => navigate('/app/campaign/message')}>Proceed to Generate Messaging Guide</Button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t pt-4">
              <Input
                type="text"
                placeholder={initializationStatus !== 'success' ? "Chat not ready..." : "Your response..."}
                value={currentUserMessage}
                onChange={(e) => setCurrentUserMessage(e.target.value)}
                disabled={isLoadingNextMessage || isComplete || isInitializingChat || initializationStatus !== 'success'}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoadingNextMessage || isComplete || isInitializingChat || initializationStatus !== 'success' || !currentUserMessage.trim()} size="icon">
                <SendHorizonal className="h-5 w-5" />
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default MessagingDevelopmentChatPage;
