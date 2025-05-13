// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react'; // Removed useContext, not needed directly here
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Reverted to using useAuth hook
import { db } from '../firebase'; // Import client Firestore config
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

export default function Dashboard() {
  console.log("✅ Dashboard component mounted");
  // Reverted to using the useAuth hook
  const { currentUser, getIdToken } = useAuth();
  const navigate = useNavigate();

  const [organizationData, setOrganizationData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // --- Log 1: Check currentUser (from useAuth) ---
      console.log("Dashboard Effect: currentUser from useAuth():", currentUser);

      if (!currentUser) {
        console.log("Dashboard Effect: No user logged in. Setting loading states to false.");
        setLoadingOrg(false);
        setLoadingCampaigns(false);
        // navigate('/login'); // Consider redirecting
        return;
      }

      // --- Fetch Organization Data (Client-side Firestore) ---
      setLoadingOrg(true);
      let orgExists = false;
      try {
        // --- Log 2: Fetching Org Data ---
        console.log(`Dashboard Effect: Fetching organisation data for UID: ${currentUser.uid}`);
        const orgDocRef = doc(db, 'organisations', currentUser.uid);
        const orgDocSnap = await getDoc(orgDocRef);

        if (orgDocSnap.exists()) {
          orgExists = true;
          const data = orgDocSnap.data();
          // --- Log 3: Org Data Found ---
          console.log("Dashboard Effect: Fetched organization data:", data);
          setOrganizationData(data);
        } else {
          // --- Log 4: No Org Data Found ---
          console.log("Dashboard Effect: No organization data found for user. Redirecting to onboarding.");
           navigate('/onboarding');
           setLoadingOrg(false);
           setLoadingCampaigns(false);
           return;
        }
      } catch (err) {
        console.error("Dashboard Effect: Error fetching organization data:", err);
        setError('Failed to load organization details.');
        orgExists = false;
      } finally {
        setLoadingOrg(false);
      }

      // --- Fetch Campaigns Data (Backend API) ---
       if (orgExists && !error) {
        setLoadingCampaigns(true);
        let token = null;
        try {
          // --- Log 5: Attempting to get ID token (using getIdToken from useAuth) ---
          console.log("Dashboard Effect: Attempting to get Firebase ID token via getIdToken()...");
          token = await getIdToken(); // Use getIdToken from useAuth hook
          // --- Log 6: Got ID token ---
          console.log("Dashboard Effect: Got Firebase ID token (first 10 chars):", token ? token.substring(0, 10) + '...' : 'No token found');

          if (!token) {
            console.error("Dashboard Effect: Authentication token not available after call.");
            setError(prev => prev + (prev ? ' | ' : '') + 'Authentication token unavailable.');
            setCampaigns([]);
            setLoadingCampaigns(false);
            return;
          }

          // --- Log 7: Calling /api/campaigns ---
          console.log("Dashboard Effect: Calling GET /api/campaigns with token.");
          const response = await axios.get('/api/campaigns', {
            headers: { Authorization: `Bearer ${token}` },
          });

          // --- Log 8: Received response from /api/campaigns ---
          console.log("Dashboard Effect: Received response from /api/campaigns:", response);
          console.log("Dashboard Effect: Campaigns data:", response.data);

          setCampaigns(response.data || []); // Ensure array

        } catch (err) {
          // --- Log 9: Error calling /api/campaigns ---
          console.error("Dashboard Effect: Error fetching campaigns from API:", err);
          if (err.response) {
            console.error("Dashboard Effect: API Error Response Data:", err.response.data);
            console.error("Dashboard Effect: API Error Response Status:", err.response.status);
            console.error("Dashboard Effect: API Error Response Headers:", err.response.headers);
             let errMsg = `API Error ${err.response.status}: Failed to load campaigns.`;
             if (err.response.status === 401 || err.response.status === 403) {
                 errMsg += ' (Authorization Failed)';
             } else if (err.response.data?.message) {
                 errMsg += ` Backend Message: ${err.response.data.message}`;
             }
             setError(prev => prev + (prev ? ' | ' : '') + errMsg);
          } else if (err.request) {
            console.error("Dashboard Effect: API Error Request:", err.request);
            setError(prev => prev + (prev ? ' | ' : '') + 'Network error or no response from server when fetching campaigns.');
          } else {
            console.error('Dashboard Effect: API Error Message:', err.message);
            setError(prev => prev + (prev ? ' | ' : '') + 'Error setting up request to fetch campaigns.');
          }
          setCampaigns([]);
        } finally {
          setLoadingCampaigns(false);
        }
      } else if (!orgExists) {
          console.log("Dashboard Effect: Skipping campaign fetch because organization data check failed or redirected.");
          setLoadingCampaigns(false);
      }
    };

    fetchData();

  // Dependencies should include everything from the outer scope used inside useEffect
  }, [currentUser, getIdToken, navigate]); // Keep dependencies


  // --- Log 10: Rendering component ---
  console.log(`Dashboard Render: LoadingOrg=${loadingOrg}, LoadingCampaigns=${loadingCampaigns}, Error='${error}', Campaigns Count=${campaigns?.length}`);


  if (loadingOrg || loadingCampaigns) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-700 bg-red-100 border border-red-400 rounded">
        <h2 className="font-bold text-lg mb-2">Error Loading Dashboard</h2>
        <p>{error}</p>
      </div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome back! Manage your organisation and campaigns here.</p>

      <button
        onClick={() => navigate('/app/campaign/new')}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Start a New Campaign
      </button>

      {organizationData && (
        <div className="bg-white shadow p-6 rounded-lg mt-6">
          <h2 className="text-2xl font-semibold mb-4">Organisation Overview</h2>
          <ul>
            {Object.entries(organizationData).map(([key, value]) => (
              <li key={key} className="text-sm mb-1">
                <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white shadow p-6 rounded-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Your Campaigns</h2>
        {Array.isArray(campaigns) && campaigns.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {campaigns.map((campaign) => (
              <li key={campaign.id} className="mb-2 text-sm">
                <span className="font-medium">{campaign.name || `Campaign ${campaign.id.substring(0, 5)}`}</span>
                {campaign.createdAt?.seconds && (
                  <span className="text-gray-500 text-xs ml-2">
                    (Created: {new Date(campaign.createdAt.seconds * 1000).toLocaleDateString()})
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't created any campaigns yet.</p>
        )}
      </div>
    </div>
  );
}
