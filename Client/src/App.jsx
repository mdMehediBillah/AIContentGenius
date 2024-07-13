import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import TextGenerator from "./components/TextGenerator";
import ImageGenerator from "./components/ImageGenerator";
import { HomePage, GeneratorPage } from "./Pages";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<GeneratorPage />}>
          <Route path="textGenerator" element={<TextGenerator />} />
          <Route path="image-generator" element={<ImageGenerator />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
