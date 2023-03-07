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

  /* const addFeedback = async (newFeedback) => {
    try {
      const res = await fetch("/api/feedbacks", {
        method: "POST",
        body: JSON.stringify(newFeedback),
      });

      const json = await res.json();
      setFeedback([...feedback, json.feedback]);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }; */

  //Add feedback
  const addFeedback = async (newFeedback) => {
    setFeedback([newFeedback, ...feedback]);
  };

  //Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
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
