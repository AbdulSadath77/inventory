import "./App.css";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
