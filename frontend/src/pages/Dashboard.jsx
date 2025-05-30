// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Stays the same
import { db } from '../firebase'; // Stays the same
import { doc, getDoc } from 'firebase/firestore'; // Stays the same
import axios from 'axios'; // Stays the same

export default function Dashboard() {
  console.log("✅ Dashboard component mounted");
  const { user, loading: authLoading } = useAuth(); // MODIFIED: Get 'user' and 'loading' (aliased to authLoading)
  const navigate = useNavigate();

  const [organizationData, setOrganizationData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loadingOrg, setLoadingOrg] = useState(true); // This is for org data fetching
  const [loadingCampaigns, setLoadingCampaigns] = useState(true); // This is for campaigns data fetching
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // MODIFIED: Wait for authLoading to be false
      if (authLoading) {
        console.log("Dashboard Effect: Auth state is loading. Waiting...");
        // Keep component-specific loading true until auth is resolved
        setLoadingOrg(true);
        setLoadingCampaigns(true);
        return;
      }

      console.log("Dashboard Effect: Auth state resolved. User from useAuth():", user ? user.uid : 'null');

      if (!user) { // MODIFIED: Check user (from useAuth)
        console.log("Dashboard Effect: No user logged in after auth check. Setting component loading states false.");
        setLoadingOrg(false);
        setLoadingCampaigns(false);
        // navigate('/login'); // Consider redirecting if not handled by ProtectedRoute, though ProtectedRoute should handle this.
        return;
      }

      // If user exists, proceed to fetch data
      setLoadingOrg(true); // Reset for actual data fetching attempt
      let orgExists = false;
      try {
        console.log(`Dashboard Effect: Fetching organisation data for UID: ${user.uid}`); // MODIFIED: Use user.uid
        const orgDocRef = doc(db, 'organisations', user.uid); // MODIFIED: Use user.uid
        const orgDocSnap = await getDoc(orgDocRef);

        if (orgDocSnap.exists()) {
          orgExists = true;
          const data = orgDocSnap.data();
          console.log("Dashboard Effect: Fetched organization data:", data);
          setOrganizationData(data);
        } else {
          console.log("Dashboard Effect: No organization data found for user. Redirecting to onboarding.");
          navigate('/onboarding');
          setLoadingOrg(false); // Still set these if redirecting
          setLoadingCampaigns(false);
          return;
        }
      } catch (err) {
        console.error("Dashboard Effect: Error fetching organization data:", err);
        setError('Failed to load organization details.');
        orgExists = false; // Ensure this is set on error
      } finally {
        setLoadingOrg(false);
      }

      if (orgExists && !error) { // Ensure no error before fetching campaigns
        setLoadingCampaigns(true);
        let token = null;
        try {
          console.log("Dashboard Effect: Attempting to get Firebase ID token from user object...");
          token = await user.getIdToken(); // MODIFIED: Call getIdToken() on the user object
          console.log("Dashboard Effect: Got Firebase ID token (first 10 chars):", token ? token.substring(0, 10) + '...' : 'No token found');

          if (!token) {
            console.error("Dashboard Effect: Authentication token not available from user object.");
            setError(prev => prev + (prev ? ' | ' : '') + 'Authentication token unavailable.');
            setCampaigns([]); // Clear campaigns on error
            setLoadingCampaigns(false);
            return;
          }

          console.log("Dashboard Effect: Calling GET /api/campaigns with token.");
          const response = await axios.get('/api/campaigns', {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Dashboard Effect: Received response from /api/campaigns:", response);
          setCampaigns(response.data || []);
        } catch (err) {
          console.error("Dashboard Effect: Error fetching campaigns from API:", err);
          if (err.response) {
            console.error("Dashboard Effect: API Error Response Data:", err.response.data);
            let errMsg = `API Error ${err.response.status}: Failed to load campaigns.`;
            if (err.response.status === 401 || err.response.status === 403) {
              errMsg += ' (Authorization Failed)';
            } else if (err.response.data?.message) {
              errMsg += ` Backend Message: ${err.response.data.message}`;
            }
            setError(prev => prev + (prev ? ' | ' : '') + errMsg);
          } else if (err.request) {
            setError(prev => prev + (prev ? ' | ' : '') + 'Network error or no response from server when fetching campaigns.');
          } else {
            setError(prev => prev + (prev ? ' | ' : '') + 'Error setting up request to fetch campaigns.');
          }
          setCampaigns([]); // Clear campaigns on error
        } finally {
          setLoadingCampaigns(false);
        }
      } else if (!orgExists) {
        console.log("Dashboard Effect: Skipping campaign fetch because organization data check failed, error occurred, or redirected.");
        setLoadingCampaigns(false); // Ensure this is set
      }
    };

    fetchData();
    // MODIFIED: Add authLoading and user to dependency array. Remove getIdToken as it's now part of 'user'.
  }, [user, authLoading, navigate]);

  console.log(`Dashboard Render: AuthLoading=${authLoading}, LoadingOrg=${loadingOrg}, LoadingCampaigns=${loadingCampaigns}, Error='${error}', Campaigns Count=${campaigns?.length}`);

  // MODIFIED: Prioritize authLoading for the top-level loading display
  if (authLoading) {
    return <div className="p-6">Authenticating user...</div>;
  }

  // If auth is resolved, but user is null (and ProtectedRoute didn't catch it, though it should)
  if (!user && !authLoading) {
     return <div className="p-6">Please log in to view the dashboard. You will be redirected shortly... (If not, <Link to="/login" className="text-indigo-600">click here to login</Link>)</div>;
  }

  // If auth is resolved, user exists, but org/campaign data is still loading
  if (loadingOrg || loadingCampaigns) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-700 bg-red-100 border border-red-400 rounded">
        <h2 className="font-bold text-lg mb-2">Error Loading Dashboard</h2>
        <p>{error}</p>
      </div>;
  }

  const campaignOutputBaseUrl = '/app/campaign';

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome back, {user?.email || 'User'}! Manage your organisation and campaigns here.</p> {/* MODIFIED: Use user.email */}

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
          <ul className="space-y-6">
            {campaigns.map((campaign) => (
              <li key={campaign.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-xl font-semibold text-indigo-700">{campaign.name || `Campaign ${campaign.id?.substring(0, 5)}`}</h3>
                        {campaign.createdAt?.seconds && (
                        <p className="text-gray-500 text-xs">
                            Created: {new Date(campaign.createdAt.seconds * 1000).toLocaleDateString()}
                        </p>
                        )}
                    </div>
                </div>

                <h4 className="text-md font-medium text-gray-700 mb-2">Generated Outputs:</h4>
                <ul className="list-none space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span>📊 Campaign Classification:</span>
                    {campaign.classification && campaign.classification.primary_type ? ( // MODIFIED: Check primary_type for more robust check
                      <Link to={`${campaignOutputBaseUrl}/${campaign.id}/messaging-guide`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400">Not yet generated</span>
                    )}
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🔬 Messaging Research (Analysis):</span>
                    {campaign.step1Analysis ? (
                      <Link to={`${campaignOutputBaseUrl}/${campaign.id}/messaging-guide`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400">Not yet generated</span>
                    )}
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🗣️ Messaging Guide:</span>
                    {campaign.messagingGuide ? (
                      <Link to={`${campaignOutputBaseUrl}/${campaign.id}/messaging-guide`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400">Not yet generated</span>
                    )}
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🗺️ Action Plan:</span>
                    {campaign.actionPlan ? (
                      <Link to={`${campaignOutputBaseUrl}/${campaign.id}/action-plan`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400">Not yet generated</span>
                    )}
                  </li>
                </ul>
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
