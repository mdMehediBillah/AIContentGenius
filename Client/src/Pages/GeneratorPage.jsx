// import logoUrl from "../../public/gpt-logo.png";
import Generator from "../components/Generator";

const GeneratorPage = () => {
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold py-2 px-2 mt-8">
          Generate Your AI content
        </h1>
        <p>
          Create imaginative and visually stunning images and content through
          Open-AI and share them with the community
        </p>
      </div>
      <Generator />
    </div>
  );
};

export default GeneratorPage;
