import FeedbackForm from "./FeedbackForm";
import FeedbackStats from "./FeedbackStats";
import FeedbackList from "./FeedbackList";
import { FeedbackProvider } from "../context/FeedbackContext";

const Feedbacks = () => {
  return (
    <FeedbackProvider>
      <div div className="container">
        <FeedbackForm />
        <FeedbackStats />
        <FeedbackList />
      </div>
    </FeedbackProvider>
  );
};

export default Feedbacks;
