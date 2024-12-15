import React from "react";

const IncomeSection = ({ earnings, investments }) => {
  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-5"></div>
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-yellow-400 text-white">
                <h2 className="title-font font-medium text-3xl ">
                  {formatCurrency(earnings?.direct ?? 0)}
                </h2>
                <p className="leading-relaxed">Direct Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full ">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-pink-400 text-white">
                <h2 className="title-font font-medium text-3xl ">
                  {formatCurrency(earnings?.boost ?? 0)}
                </h2>
                <p className="leading-relaxed">Boost Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-green-400 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.dailyClub ?? 0)}
                </h2>
                <p className="leading-relaxed">Daily Club Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-amber-700 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.level ?? 0)}
                </h2>
                <p className="leading-relaxed">Level Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-teal-500 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(
                    earnings?.level +
                      earnings?.direct +
                      earnings?.dailyClub +
                      earnings?.boost +
                      earnings?.reward
                  )}
                </h2>
                <p className="leading-relaxed">Total Income</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4 md:justify-evenly text-center">
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-indigo-500 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.dailyClubStarter ?? 0)}
                </h2>
                <p className="leading-relaxed">Starter Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-fuchsia-500 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.dailyClubBasic ?? 0)}
                </h2>
                <p className="leading-relaxed">Basic Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-lime-500 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.dailyClubStar ?? 0)}
                </h2>
                <p className="leading-relaxed">Star Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-purple-500 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.dailyClubSuperstar ?? 0)}
                </h2>
                <p className="leading-relaxed">Superstar Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-cyan-500 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.dailyClubPrime ?? 0)}
                </h2>
                <p className="leading-relaxed">Prime Income</p>
              </div>
            </div>
            <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-orange-500 text-white">
                <h2 className="title-font font-medium text-3xl">
                  {formatCurrency(earnings?.dailyClubRoyal ?? 0)}
                </h2>
                <p className="leading-relaxed">Royal Income</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IncomeSection;
