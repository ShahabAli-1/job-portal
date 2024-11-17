import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axiosConfig";
import { AuthContext } from "./AuthContext";

export const JobContext = createContext();

// Job Provider Component
export const JobProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false); // Indicates if jobs are being fetched
  const [error, setError] = useState(null); // Job-related errors

  // Fetch all jobs on component mount or when user changes
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchJobs();
    } else {
      setJobs([]); // Clear jobs if user logs out
    }
  }, [user]);

  // Create a new job
  const createJob = async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token before creating a job
      const csrfRes = await axios.get("/api/csrf-token");
      const csrfToken = csrfRes.data.csrfToken;

      const res = await axios.post("/api/jobs", jobData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      setJobs([res.data, ...jobs]); // Add new job to the list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing job
  const updateJob = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token before updating a job
      const csrfRes = await axios.get("/api/csrf-token");
      const csrfToken = csrfRes.data.csrfToken;

      const res = await axios.put(`/api/jobs/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      setJobs(jobs.map((job) => (job._id === id ? res.data : job)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  // Delete a job
  const deleteJob = async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token before deleting a job
      const csrfRes = await axios.get("/api/csrf-token");
      const csrfToken = csrfRes.data.csrfToken;

      await axios.delete(`/api/jobs/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        createJob,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
