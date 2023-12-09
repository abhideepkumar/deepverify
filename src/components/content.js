import React, { useState } from "react";
import Image from "next/image";

const Content = () => {
  const [file, setFile] = useState(null);
  const [flag, setFlag] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultLabel, setResultLabel] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    setLoading(true);
    setResultLabel(null);

    if (!file) {
      console.error("No file selected");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/harsh00/girlgeek1",
        {
          headers: { Authorization: `Bearer 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` },
          method: "POST",
          body: file,
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(result));

      if (result && result.length > 0) {
        const highestScore = result.reduce((max, current) =>
          max.score > current.score ? max : current
        );
        setResultLabel(highestScore.label);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundColor = () => {
    if (resultLabel === "Real") {
      return "bg-green-500";
    } else if (resultLabel === "Fake") {
      return "bg-red-500";
    }
    return "";
  };

  return (
    <main
      className={
        resultLabel == null ? "bg-blue-100" : resultLabel === "Real" ? "bg-green-100" : "bg-red-100"
      }
    >
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-center md:space-x-6 p-10"
      >
        <div className="md:w-1/2 text-center md:text-left p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unmask the unmaskable</h2>
          <p className="text-gray-600">
            Unmasking Truth in a World of Illusions. Our cutting-edge technology distinguishes
            between reality and deepfake content, empowering you with the clarity to trust what you
            see. Safeguard your truth with DeepVerify.
          </p>
          <a
            href="#verify"
            className="md:inline-block rounded-md bg-blue-500 text-white px-4 py-2 mt-4 text-center"
          >
            Get Started
          </a>
        </div>
        <div className="md:w-1/2 p-4">
          <Image
            src={"https://duet-cdn.vox-cdn.com/thumbor/0x0:662x370/750x500/filters:focal(331x185:332x186):no_upscale():format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/11076487/deep_fake_gan_celebrities_nvidia.gif"||"https://images.unsplash.com/photo-1648195699350-fa0ed4a263e7?q=80&w=1775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Description of image"
            width={720}
            height={360}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </section>
      {/* Verify Section */}
      <section id="verify" className="p-4">
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          {imageUrl && (
            <section className="flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Uploaded preview"
                className="max-w-full h-auto rounded-md max-h-80"
              />
            </section>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-600"
          />
          <div className="flex items-center text-sm">
            <input type="checkbox" value="true" checked={true} />
            <p className="px-3">
              By submitting data, you are agreeing to our terms of services and privacy policy.
            </p>
          </div>
          <button
            onClick={handleUpload}
            className={`py-2 px-4 rounded-md text-white ${loading ? "bg-gray-500" : "bg-blue-500"}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Upload"}
          </button>
          <div className={`w-full h-16 mt-4 rounded-md ${getBackgroundColor()}`}>
            {resultLabel && <p className="text-white text-center p-4">Result: {resultLabel}</p>}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-4">
        <div className="text-center md:text-left p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">About Us</h2>
          <p className="font-light">
            Deepverify is the result of our passion for unmasking truth in a world filled with
            illusions. Our cutting-edge technology is designed to analyze images and videos,
            distinguishing between genuine and deepfake content. We believe in empowering you with
            the clarity to trust what you see, safeguarding your reality with Deepverify.
          </p> 
          <h2 className="text-xl py-5 font-bold"> Our Origin Story</h2>
          <p className="font-light">
            Deepverify was born out of a vision to combat the rising threat of deepfake technology.
            We started this project during a hackathon, fueled by the desire to contribute to a
            safer digital environment. The challenge inspired us to create a tool that goes beyond
            conventional means, providing an innovative solution to a pressing problem.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="p-4">
        <div className="text-center md:text-left p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>

          <p className="text-gray-600">
            
          </p>
        </div>
      </section>
    </main>
  );
};

export default Content;
