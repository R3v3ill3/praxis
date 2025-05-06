// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { useAuth } from '../contexts/AuthContext.jsx'; // Use .jsx extension
import { db } from '../firebase'; // Import client Firestore
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios'; // For calling backend API

export default function Dashboard() {
  console.log("✅ Dashboard component mounted");
  const { currentUser, getIdToken } = useAuth();
  const navigate = useNavigate();

  const [organizationData, setOrganizationData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      if (!currentUser) {
        console.log("Dashboard: No user logged in.");
        setLoadingOrg(false);
        setLoadingCampaigns(false);
        // Optionally redirect to login if not logged in after loading check
        // navigate('/login');
        return; // Exit if no user
      }

      // --- Fetch Organization Data (from client-side Firestore) ---
      setLoadingOrg(true);
      try {
        const orgDocRef = doc(db, 'organisations', currentUser.uid);
        const orgDocSnap = await getDoc(orgDocRef);
        if (orgDocSnap.exists()) {
           console.log("Dashboard: Fetched organization data:", orgDocSnap.data());
          setOrganizationData(orgDocSnap.data());
        } else {
          console.log("Dashboard: No organization data found for user. Redirecting to onboarding.");
          // Redirect to onboarding if no org data exists after signup/login
          navigate('/onboarding');
          // Return here to prevent campaign fetch if onboarding needed
          return;
        }
      } catch (err) {
        console.error("Dashboard: Error fetching organization data:", err);
        setError('Failed to load organization details.');
      } finally {
        setLoadingOrg(false);
      }

      // --- Fetch Campaigns Data (from backend API) ---
      setLoadingCampaigns(true);
      try {
        const token = await getIdToken();
        console.log("DEBUG: Retrieved Token:", token);
        if (!token) {
          // Handle case where token is not available (e.g., user logged out)
          console.error("Dashboard: Authentication token not available.");
          setError(prev => prev + (prev ? ' ' : '') + 'Authentication error.');
          // Potentially clear campaigns or redirect to login
          setCampaigns([]);
          setLoadingCampaigns(false);
          return; // Exit if no token
        }
        // Make sure the API endpoint '/api/campaigns' exists and is correct
        const response = await axios.get('/api/campaigns', {
          headers: { Authorization: `Bearer ${token}` },
        });
         console.log("Dashboard: Fetched campaigns data:", response.data);
        setCampaigns(response.data || []); // Ensure it's an array even if API returns null/undefined
      } catch (err) {
        console.error("Dashboard: Error fetching campaigns:", err);
        // Check for specific errors like 401/403 which might indicate auth issues
         if (err.response?.status === 401 || err.response?.status === 403) {
             setError(prev => prev + (prev ? ' ' : '') + 'Authorization failed while fetching campaigns.');
             // Handle auth error - maybe force re-login?
         } else {
             setError(prev => prev + (prev ? ' ' : '') + 'Failed to load campaigns.'); // Append error
         }
         setCampaigns([]); // Clear campaigns on error
      } finally {
        setLoadingCampaigns(false);
      }
    }; // <--- End of fetchData function definition

    // Call the async function
    fetchData();

  // Add dependencies for useEffect. Re-run if the user changes.
  }, [currentUser, getIdToken, navigate]); // Added navigate as dependency

  // Display Loading States
   if (loadingOrg || loadingCampaigns) {
       return <div className="p-6">Loading dashboard data...</div>;
   }

  // Display Errors
  if (error) {
       return <div className="p-6 text-red-600">Error loading dashboard: {error}</div>;
  }

  // Main Dashboard Render
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome back! Manage your organisation and campaigns here.</p>

      {/* Button to start new campaign - Ensure path matches App.jsx */}
      <button
        onClick={() => navigate('/app/campaign/new')}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Start a New Campaign
      </button>

      {/* Onboarding Summary Section */}
      {organizationData && (
        <div className="bg-white shadow p-6 rounded-lg mt-6">
          <h2 className="text-2xl font-semibold mb-4">Organisation Overview</h2>
          {/* Improve display of org data */}
          <ul>
              {Object.entries(organizationData).map(([key, value]) => (
                 <li key={key} className="text-sm mb-1">
                     <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : String(value)}
                 </li>
              ))}
          </ul>
           {/* <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">{JSON.stringify(organizationData, null, 2)}</pre> */}
        </div>
      )}

      {/* Campaign List Section */}
      <div className="bg-white shadow p-6 rounded-lg mt-6">
          <h2 className="text-2xl font-semibold mb-4">Your Campaigns</h2>
          {campaigns && campaigns.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {campaigns.map((campaign) => (
                <li key={campaign.id} className="mb-2 text-sm">
                  {/* Make campaign name clickable - Link to campaign view/edit page (TODO) */}
                  <span className="font-medium">{campaign.name || `Campaign ${campaign.id.substring(0, 5)}`}</span>
                  {/* Add more details like status or creation date if available */}
                   {campaign.createdAt?.seconds && (
                       <span className="text-gray-500 text-xs ml-2">
                           (Created: {new Date(campaign.createdAt.seconds * 1000).toLocaleDateString()})
                       </span>
                   )}
                   {/* TODO: Add View/Edit/Delete buttons? */}
                </li>
              ))}
            </ul>
          ) : (
             <p className="text-gray-500">You haven't created any campaigns yet.</p>
          )}
      </div>
    </div>
  ); // <--- End of return statement
} // <--- End of Dashboard component function
