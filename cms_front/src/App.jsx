import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Welcome to CMS</h1>
        {/* Render your CMS content here */}
      </div>
    </>
  );
};

export default App;
