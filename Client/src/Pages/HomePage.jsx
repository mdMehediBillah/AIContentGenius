import HomeImageGalary from "../components/HomeImageGalary";
import { CardComponent, FormFieldComponent } from "../components";
import { CircleLoader } from "react-spinners";
import { DNA } from "react-loader-spinner";

import { useState } from "react";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  // render cards
  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <CardComponent key={post._id} {...post} />);
    }
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    );
  };
  return (
    <>
      <section className="max-w-screen-lg mx-auto  container">
        <div>
          <h1 className="text-3xl font-bold mt-8 container mx-auto">
            Welcome to AIContentGenius
          </h1>
          <h3 className="text-xl mt-2 container mx-auto">
            Your AI-Powered Creative Solutions Hub
          </h3>
          <p className="container mx-auto mt-6">
            Welcome to AIContentGenius, your one-stop destination for
            cutting-edge AI-generated content designed to elevate your digital
            presence! Leveraging the latest advancements in artificial
            intelligence!
          </p>
        </div>
        <div className="mt-16 container mx-auto">
          <FormFieldComponent />
        </div>
        <div className="mt-10 max-w-screen-lg mx-auto  container">
          {loading ? (
            <div className="flex justify-center items-center">
              <DNA loading={loading} color="#212121" size={28} />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="container mx-auto font-medium text-xl text-[#666e75]">
                  Showing results for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
              <div className="container grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 mx-auto mt-2 gap-3">
                {searchText ? (
                  <RenderCards data={[]} title="No search results found" />
                ) : (
                  <RenderCards data={[]} title="No posts found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
      {/* <HomeImageGalary /> */}
    </>
  );
};

export default HomePage;
