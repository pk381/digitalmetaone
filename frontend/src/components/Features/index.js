import React from "react";

import connect from "../../assets/connect.png";
import discover from "../../assets/discover.png";
import create from "../../assets/search.png";

const Features = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
              <img src={connect} alt="connect" height="180px" width="180px" />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                Connect
              </h2>
              <p className="leading-relaxed text-base">
                Join our vibrant community of like-minded innovators and be part
                of a collective journey towards groundbreaking ideas and
                collaborative success. Embrace a network that fuels creativity
                and fosters innovation.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
              <img
                src={discover}
                alt="connect"
                height="180px"
                width="180px"
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                Discover
              </h2>
              <p className="leading-relaxed text-base">
                Embark on a journey through a world brimming with ideas and
                creativity, where every moment sparks inspiration and
                innovation. Uncover boundless possibilities in a realm that
                celebrates the power of imagination and the artistry of
                inventive minds.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <img
                src={create}
                alt="connect"
                height="220px"
                width="220px"
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                Create
              </h2>
              <p className="leading-relaxed text-base">
                Transform your visions into tangible reality through the
                collaborative strength of our company. Together, we'll navigate
                the path from concept to achievement, making your aspirations a
                vibrant and successful reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
