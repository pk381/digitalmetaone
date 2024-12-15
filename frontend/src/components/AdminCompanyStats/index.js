import React from "react";

const AdminCompanyStats = ({
  totalWithdrawal,
  monthlyWithDrawal,
  investmentToday,
  withDrawalToday,
  totalMembers,
}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto ">
        <div className="flex flex-col text-center w-full mb-5"></div>
        <div className="flex flex-wrap -m-4 text-center md:justify-center">
          <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-yellow-400 text-white">
              <h2 className="title-font font-medium text-3xl ">{`$${
                investmentToday ?? 0
              }`}</h2>
              <p className="leading-relaxed">Today's Investment</p>
            </div>
          </div>
          <div className="p-4 md:w-1/5 sm:w-1/2 w-full ">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-pink-400 text-white">
              <h2 className="title-font font-medium text-3xl ">{`$${
                totalWithdrawal ?? 0
              }`}</h2>
              <p className="leading-relaxed">Total Withdrawal</p>
            </div>
          </div>
          <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-blue-400 text-white">
              <h2 className="title-font font-medium text-3xl">{`$${
                monthlyWithDrawal ?? 0
              }`}</h2>
              <p className="leading-relaxed">Monthly Withdrawal</p>
            </div>
          </div>
          <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-green-400 text-white">
              <h2 className="title-font font-medium text-3xl">{`$${
                withDrawalToday ?? 0
              }`}</h2>
              <p className="leading-relaxed">Today Withdrawal</p>
            </div>
          </div>
          <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-amber-700 text-white">
              <h2 className="title-font font-medium text-3xl">
                {totalMembers ?? 0}
              </h2>
              <p className="leading-relaxed">Total Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCompanyStats;
