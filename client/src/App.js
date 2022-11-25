import Navbar from "./components/navbar/Navbar";
import { Routes, Route, } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import Questionpage from "./Pages/Questionpage";
import AskQuestion from "./Pages/AskQuestion";
import DisplayQuestion from "./Pages/DisplayQuestion";
import { UserProvider } from "./context";
import Tagspage from "./Pages/Tagspage";
import Userspage from "./Pages/Userspage";
import Userdetailspage from "./Pages/Userdetailspage";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/questions" element={<Questionpage />} />
          <Route path="/questions/:id" element={<DisplayQuestion />} />
          <Route path="/askquestions" element={<AskQuestion />} />
          <Route path="/tags" element={<Tagspage />} />
          <Route path="/users" element={<Userspage />} />
          <Route path="/users/:id" element={<Userdetailspage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
