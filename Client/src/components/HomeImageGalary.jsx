import imgUrl from "../assets/Image/img_01.png";
import imgUrl2 from "../assets/Image/img_02.png";
import { PropagateLoader } from "react-spinners";

const HomeImageGalary = () => {
  return (
    <div className="container mx-auto mt-8 max-w-screen-lg">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold">AI-Powered images for you</h3>
      </div>
      <div className="container  grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 mx-auto mt-2 gap-3">
        <PropagateLoader color="#212121" size={30} />
        <div className="rounded-xl">
          <img src={imgUrl} alt="image" className="rounded-xl" />
        </div>
        <div className="rounded-xl">
          <img src={imgUrl2} alt="image" className="rounded-xl" />
        </div>
        <div className="rounded-xl">
          <img src={imgUrl} alt="image" className="rounded-xl" />
        </div>
        <div className="rounded-xl">
          <img src={imgUrl} alt="image" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default HomeImageGalary;
