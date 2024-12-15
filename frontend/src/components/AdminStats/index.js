import React from "react";

const AdminStats = ({
  joinedThisMonth,
  activeMembers,
  monthlyInvestment,
  totalInvestment,
}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-yellow-400 text-white">
              <h2 className="title-font font-medium text-3xl ">
                {activeMembers ?? 0}
              </h2>
              <p className="leading-relaxed">Active Members</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-pink-400 text-white">
              <h2 className="title-font font-medium text-3xl ">
                {joinedThisMonth ?? 0}
              </h2>
              <p className="leading-relaxed">Joined This month</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-blue-400 text-white">
              <h2 className="title-font font-medium text-3xl">
                {`$ ${monthlyInvestment ?? 0}`}
              </h2>
              <p className="leading-relaxed">Investment This Month</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-green-400 text-white">
              <h2 className="title-font font-medium text-3xl">
                {`$ ${totalInvestment ?? 0}`}
              </h2>
              <p className="leading-relaxed">Total Investment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminStats;
