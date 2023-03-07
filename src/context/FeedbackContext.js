import { createContext, useEffect, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetch("/api/feedbacks")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.feedbacks);
        setFeedback(json.feedbacks);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //Add feedback
  const addFeedback = (newFeedback) => {
    try {
      setFeedback([newFeedback, ...feedback]);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete feedback
  const deleteFeedback = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        setFeedback(feedback.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update feedback item
  const updateFeedback = async (id, updItem) => {
    try {
      setFeedback(
        feedback.map((item) =>
          item.id === id ? { ...item, ...updItem } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
