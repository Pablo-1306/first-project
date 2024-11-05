"use client";

const { useState, useContext, createContext } = require("react");
const { initialReviews } = require("../constants/reviews/constants");

// Create a context to create the CRUD operations for the reviews
const ReviewContext = createContext();

// Create a provider to wrap the application and give access to the reviews and the CRUD operations
export const ReviewProvider = ({ children }) => {
  // Create a state to store the reviews
  const [reviews, setReviews] = useState(initialReviews);

  // Create operation
  const addReview = (review) => setReviews([...reviews, review]);

  // Update operation
  const editReview = (updatedReview) =>
    setReviews(
      reviews.map((r) => (r.id === updatedReview.id ? updatedReview : r)),
    );

  // Delete operation
  const deleteReview = (id) => setReviews(reviews.filter((r) => r.id !== id));

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
