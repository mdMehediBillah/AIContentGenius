import defaurlImgUrl from "../../src/assets/Image/default_img.png";
import { useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import FormFieldComponent from "./FormFieldComponent";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { getRandomPrompt } from "../utils";

const ImageGenerator = () => {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const { name, prompt, photo } = form;
  let inputRef = useRef(null);

  // Function to handle image generation
  const handleImgGenerator = async (e) => {
    e.preventDefault();
    // if (inputRef.current.value === "") {
    //   return 0;
    // }

    if (form.prompt) {
      try {
        setLoading(true);
        setGeneratingImage(true);
        setShareButton(false);

        const response = await fetch(
          "http://localhost:5050/api/v1/images/generations",
          {
            method: "POST",
            headers: {
              provider: "open-ai",
              mode: "production",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "dall-e-3",
              prompt: form.prompt,
              // prompt: `${inputRef.current.value}`,
              size: "1024x1024",
              response_format: "b64_json",
            }),
          }
        );
        const data = await response.json();
        const base64Image = data[0].b64_json;
        if (base64Image) {
          const imageSrc = `data:image/png;base64,${base64Image}`;
          console.log(imageSrc);
          setImgUrl(imageSrc);
          localStorage.setItem("PhotoPost", imgUrl);
          setLoading(false);
          setGeneratingImage(false);
          setShareButton(true);
        } else {
          console.error("No base64 image data found");
        }

        form.prompt = "";
        console.log("hello from handle generate image");
        // inputRef.current.value = "";
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };
  const handleShare = (e) => {
    e.preventDefault();
    // Share functionality here
    console.log("Share functionality");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit functionality here
  };

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);

    setForm({ ...form, prompt: randomPrompt });
  };
  const photoPostUrl = localStorage.getItem("PhotoPost");
  console.log(photoPostUrl);

  return (
    <>
      <form className="mt-8 max-w-3xl" onClick={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormFieldComponent
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormFieldComponent
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a painting of a fox in the style of Starry Night"
            value={form.prompt}
            handleChange={handleChange}
            isSurproseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-64 h-64 flex justify-center items-center">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <img
                src={defaurlImgUrl}
                alt="default"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)] rounded-lg">
                <DNA loading={loading} color="#212121" size={28} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-4">
          <button
            type="button"
            onClick={handleImgGenerator}
            className="w-full py-2 px-5 bg-green-700 font-medium text-sm  text-center text-white "
          >
            {generatingImage ? "Generating..." : "Generate"}
          </button>
        </div>
        {!shareButton ? (
          <div className="mt-10 ">
            <p className="mt-2 text-[#666e75] text-[14px] text-center">
              Once you have created the image you want, you can share it with
              others in the community
            </p>
            <button
              type="submit"
              onClick={handleImgGenerator}
              className="mt-2 w-full py-2 px-5 bg-[#6469ff] font-medium text-sm  text-center text-white "
            >
              {loading ? "Sharing..." : "Share with the community"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};

export default ImageGenerator;
