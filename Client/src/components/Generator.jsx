import { Link, Outlet } from "react-router-dom";

const Generator = () => {
  return (
    <div>
      <div className="container mx-auto mt-8">
        <ul className="flex gap-2 items-center mb-10">
          <Link to={"textGenerator"}>
            <li className="py-2 px-4 bg-gray-300 rounded-xl hover:bg-gray-400">
              Text Generator
            </li>
          </Link>
          <Link to={"image-generator"}>
            <li className="py-2 px-4 bg-gray-300 rounded-xl hover:bg-gray-400">
              Image Generator
            </li>
          </Link>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Generator;
