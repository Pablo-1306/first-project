"use client";

import axios from "axios";

const { useState, useContext, createContext, useEffect } = require("react");

// Create a context to create the CRUD operations for the reviews
const ReviewContext = createContext();

// Create a provider to wrap the application and give access to the reviews and the CRUD operations
export const ReviewProvider = ({ children }) => {
  // Create a state to store the reviews
  const [reviews, setReviews] = useState();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try{
      const response = await axios.get("http://localhost:8000/api/v1/reviews");
      setReviews(response.data);
    }
    catch(error){
      console.log("Error fetching reviews:", error);
    }
  }

  // Create operation
  const addReview = (review) => setReviews([...reviews, review]);

  // Update operation
  const editReview = (updatedReview) =>
    setReviews(
      reviews.map((r) => (r._id === updatedReview._id ? updatedReview : r)),
    );

  // Delete operation
  const deleteReview = (_id) => setReviews(reviews.filter((r) => r._id !== _id));

  return (
    <ReviewContext.Provider
      value={{ reviews, addReview, editReview, deleteReview }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

// Export a hook to use the review context in any component
export const useReviews = () => useContext(ReviewContext);
