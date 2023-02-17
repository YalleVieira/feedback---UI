import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Feedbacks from "./components/Feedbacks";
import AlboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Feedbacks />} />
            <Route path="/about" element={<AlboutPage />} />
          </Routes>

          <AboutIconLink />
        </div>
      </BrowserRouter>
    </FeedbackProvider>
  );
}

export default App;
