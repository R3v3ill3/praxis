// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
    const fetchData = async () => {
      if (!currentUser) {
        console.log("Dashboard: No user logged in.");
        setLoadingOrg(false);
        setLoadingCampaigns(false);
        return; // Should be protected by router anyway
      }

      // Fetch Organization Data (from client-side Firestore)
      setLoadingOrg(true);
      try {
        const orgDocRef = doc(db, 'organisations', currentUser.uid);
        const orgDocSnap = await getDoc(orgDocRef);
        if (orgDocSnap.exists()) {
           console.log("Dashboard: Fetched organization data:", orgDocSnap.data());
          setOrganizationData(orgDocSnap.data());
        } else {
          console.log("Dashboard: No organization data found for user.");
          // Maybe redirect to onboarding if needed?
          // navigate('/onboarding');
        }
      } catch (err) {
        console.error("Dashboard: Error fetching organization data:", err);
        setError('Failed to load organization details.');
      } finally {
        setLoadingOrg(false);
      }

      // Fetch Campaigns Data (from backend API)
      setLoadingCampaigns(true);
      try {
        const token = await getIdToken();
        if (!token) {
          throw new Error("Authentication token not available.");
        }
        const response = await axios.get('/api/campaigns', {
          headers: { Authorization: `Bearer ${token}` },
        });
         console.log("Dashboard: Fetched campaigns data:", response.data);
        setCampaigns(response.data || []); // Ensure it's an array
      } catch (err) {
        console.error("Dashboard: Error fetching campaigns:", err);
        setError(prev => prev + (prev ? ' ' : '') + 'Failed to load campaigns.'); // Append error
      } finally {
        setLoadingCampaigns(false);
      }
    };

    fetch
