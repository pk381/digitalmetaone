import React from "react";

const PlanWiseUsersCount = ({
  starterUsers,
  basicUsers,
  starUsers,
  superstarUsers,
  primeUsers,
  royalUsers,
}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto ">
        <div className="flex flex-col text-center w-full mb-5"></div>
        <div className="flex flex-wrap -m-4 text-center md:justify-center">
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-yellow-400 text-white">
              <h2 className="title-font font-medium text-3xl ">
                {starterUsers ?? 0}
              </h2>
              <p className="leading-relaxed">Starter Users</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full ">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-pink-400 text-white">
              <h2 className="title-font font-medium text-3xl ">
                {basicUsers ?? 0}
              </h2>
              <p className="leading-relaxed">Basic Users</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-blue-400 text-white">
              <h2 className="title-font font-medium text-3xl">
                {starUsers ?? 0}
              </h2>
              <p className="leading-relaxed">Star Users</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-green-400 text-white">
              <h2 className="title-font font-medium text-3xl">
                {superstarUsers ?? 0}
              </h2>
              <p className="leading-relaxed">Superstar Users</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-amber-700 text-white">
              <h2 className="title-font font-medium text-3xl">
                {royalUsers ?? 0}
              </h2>
              <p className="leading-relaxed">Royal Users</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-amber-700 text-white">
              <h2 className="title-font font-medium text-3xl">
                {primeUsers ?? 0}
              </h2>
              <p className="leading-relaxed">Prime Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanWiseUsersCount;
