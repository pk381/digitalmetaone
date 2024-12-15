import React from "react";

const MembersCount = ({
  total,
  direct,
  inactive,
  active,
  activeThisMonth,
  inactiveThisMonth,
}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex justify-center flex-wrap -m-4 text-center">
          
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-yellow-500 text-white  w-full md:w-[18%] mx-2 my-4">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
              {total < 10 ? `0${total}` : total}
            </h2>
            <p className="leading-relaxed">Total Users</p>
          </div>

          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-pink-400 text-white w-full md:w-[18%] mx-2 my-4">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
              {direct < 10 ? `0${direct}` : direct}
            </h2>
            <p className="leading-relaxed">Direct Referrals</p>
          </div>

          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-green-400 text-white  w-full md:w-[18%] mx-2 my-4">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
              {active < 10 ? `0${active}` : active}
            </h2>
            <p className="leading-relaxed">Active Members</p>
          </div>
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-red-400 text-white  w-full md:w-[18%] mx-2 my-4">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
              {inactive < 10 ? `0${inactive}` : inactive}
            </h2>
            <p className="leading-relaxed">Non Active Members</p>
          </div>

          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-violet-400 text-white  w-full md:w-[18%] mx-2 my-4">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
              {activeThisMonth < 10 ? `0${activeThisMonth}` : activeThisMonth}
            </h2>
            <p className="leading-relaxed">Active This Month</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersCount;
