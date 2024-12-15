import React, { useState, useEffect, useId } from "react";

import { useAuthContext } from "../../contexts/authContext";
import useMembers from "../../hooks/useMembers";
import usePayments from "../../hooks/usePayments";
import useUser from "../../hooks/useUser";
import useJoiningRequests from "../../hooks/useJoiningRequests";
import useContactUs from "../../hooks/useContactUs";
import uesInvestment from "../../hooks/useInvestment";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import CircularProgress from "@mui/joy/CircularProgress";
import Avatar from "@mui/joy/Avatar";

import MembersTable from "../../components/MembersTable";
import { toastError } from "../../components/Notification";
import AdminStats from "../../components/AdminStats";
import JoiningReqestsTable from "../../components/JoiningRequestsTable";
import WithdrawalTable from "../../components/WithdrawalTable";
import ContctQueryTable from "../../components/ContactQueryTable";
import AdminCompanyStats from "../../components/AdminCompanyStats";
import PlanWiseUsersCount from "../../components/PlanWiseUsersCount";
import ChangePasswordModal from "../../components/ChangePasswordAdminModal";

const AdminDashboard = () => {
  const authContext = useAuthContext();
  const { user, profilePicture } = authContext;
  const { getMembersData } = useMembers();
  const { getWithdrawals, getTotalWithdrawals } = usePayments();
  const { fetchUsersJoinedThisMonth } = useUser();
  const { fetchJoiningRequests, acceptJoiningRequest } = useJoiningRequests();
  const { fetchQueries } = useContactUs();
  const { getTotalInvestment } = uesInvestment();

  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState(null);
  const [joinedThisMonth, setJoinedThisMonth] = useState(null);
  const [withdrawals, setWithdrawals] = useState(null);
  const [activeMembers, setActiveMembers] = useState(null);
  const [totalMembers, setTotalMembers] = useState(null);
  const [nonActiveMembers, setNonActiveMembers] = useState(null);
  const [joiningRequests, setJoiningRequests] = useState(null);
  const [contactQueries, setContactQueries] = useState(null);
  const [totoalInvestment, setTotalInvestment] = useState(0);
  const [investmentThisMonth, setInvestmentThisMonth] = useState(0);
  const [investmentToday, setInvestmentToday] = useState(0);
  const [withdrawalsToaday, setWithdrawalsToaday] = useState(0);
  const [withdrawalsThisMonth, setWithdrawalsThisMonth] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  const [starterUsers, setStarterUsers] = useState(0);
  const [basicUsers, setBasicUsers] = useState(0);
  const [starUsers, setStarUsers] = useState(0);
  const [superstarUsers, setSuperStarUsers] = useState(0);
  const [primeUsers, setPrimeUsers] = useState(0);
  const [royalUsers, setRoyalUsers] = useState(0);

  const countUsersPlanWise = (users) => {
    let starterCount = 0;
    let basicCount = 0;
    let starCount = 0;
    let primeCount = 0;
    let superstarCount = 0;
    let royalCount = 0;

    for (const user of users) {
      let directUsersActive = user.directUsersActive;
      const planType = user.planType;

      if (directUsersActive > 1 && planType !== "inactive") {
        starterCount++;
      }

      if (
        directUsersActive > 3 &&
        planType !== "inactive" &&
        planType !== "starter"
      ) {
        basicCount++;
      }

      if (
        directUsersActive > 5 &&
        planType !== "inactive" &&
        planType !== "starter" &&
        planType !== "basic"
      ) {
        starCount++;
      }
      if (
        directUsersActive > 7 &&
        planType !== "inactive" &&
        planType !== "starter" &&
        planType !== "basic" &&
        planType !== "star"
      ) {
        superstarCount++;
      }
      if (
        directUsersActive > 9 &&
        planType !== "inactive" &&
        planType !== "starter" &&
        planType !== "basic" &&
        planType !== "star" &&
        planType !== "superstar"
      ) {
        primeCount++;
      }

      if (
        directUsersActive > 11 &&
        planType !== "inactive" &&
        planType !== "starter" &&
        planType !== "basic" &&
        planType !== "star" &&
        planType !== "superstar" &&
        planType !== "prime"
      ) {
        royalCount++;
      }
    }

    setStarterUsers(starterCount);
    setBasicUsers(basicCount);
    setStarUsers(starCount);
    setSuperStarUsers(superstarCount);
    setPrimeUsers(primeCount);
    setRoyalUsers(royalCount);
  };

  useEffect(() => {
    const fetch = async () => {
      if (teamMembers) {
        return;
      }
      let active = [];
      let nonActive = [];

      const data = await getMembersData();
      if (data) {
        setTeamMembers(data);
        setTotalMembers(data.length);
        countUsersPlanWise(data);

        data.map((member) => {
          if (member.planType !== "inactive") {
            active.push(member);
          } else {
            nonActive.push(member);
          }
        });
        setActiveMembers(active);
        setNonActiveMembers(nonActive);

        return;
      }
      toastError("Please try again later");
      return setTeamMembers([]);
    };

    const fetchWithdrawalRequests = async () => {
      if (withdrawals) {
        return;
      }
      const response = await getWithdrawals();

      if (response) {
        return setWithdrawals(response);
      }
      setWithdrawals([]);
      return toastError("Error fetching withdrawals");
    };

    const getWithDrawalStats = async () => {
      if (withdrawalsThisMonth || withdrawalsToaday || totalWithdrawals) {
        return;
      }
      const response = await getTotalWithdrawals();

      if (response) {
        setTotalWithdrawals(response.totalWithdrawals);
        setWithdrawalsThisMonth(response.totalWithdrawalsThisMonth);
        setWithdrawalsToaday(response.totalWithdrawalsToday);
        return;
      }
      return toastError("Error fetching withdrawals");
    };

    const fetchJoinedThisMonth = async () => {
      const response = await fetchUsersJoinedThisMonth();

      if (response) {
        return setJoinedThisMonth(response);
      }
      setJoinedThisMonth([]);
      return toastError("Error fetching user joined this month");
    };

    const getJoiningRequests = async () => {
      if (joiningRequests) {
        return;
      }
      const response = await fetchJoiningRequests();
      if (response) {
        return setJoiningRequests(response);
      }
      setJoiningRequests([]);
      return toastError("Error fetching joining requests");
    };

    const fetchContactQueries = async () => {
      if (contactQueries) {
        return;
      }
      const response = await fetchQueries();
      if (response) {
        return setContactQueries(response);
      }
      setContactQueries([]);
      return toastError("Error fetching Contact Queries");
    };

    const fetchInvestMent = async () => {
      if (investmentThisMonth || totoalInvestment) {
        return;
      }
      const response = await getTotalInvestment();

      if (response) {
        setTotalInvestment(response.totalInvestment);
        setInvestmentThisMonth(response.monthlyInvestment);
        setInvestmentToday(response.totalInvestmentToday);
      } else {
        toastError("Failed to fetch investment");
      }
    };

    fetch();
    fetchJoinedThisMonth();
    getJoiningRequests();
    fetchWithdrawalRequests();
    fetchContactQueries();
    fetchInvestMent();
    getWithDrawalStats();
  }, []);

  const updateJoiningRequests = (id) => {
    const tempJoiningRequests = joiningRequests;

    const indexToUpdate = tempJoiningRequests.findIndex(
      (request) => request._id === id
    );
    if (indexToUpdate !== -1) {
      const updatedObject = {
        ...tempJoiningRequests[indexToUpdate],
        status:
          tempJoiningRequests[indexToUpdate].status === "accepted"
            ? "initiated"
            : "accepted",
      };
      tempJoiningRequests[indexToUpdate] = updatedObject;

      setJoiningRequests(tempJoiningRequests);
      return true;
    }
    return toastError("Failed to update request status");
  };

  const updateDeclinedJoiningRequest = (id) => {
    const tempJoiningRequests = [...joiningRequests];

    const indexToUpdate = tempJoiningRequests.findIndex(
      (request) => request._id === id
    );
    if (indexToUpdate !== -1) {
      const updatedObject = {
        ...tempJoiningRequests[indexToUpdate],
        status: "declined",
      };
      tempJoiningRequests[indexToUpdate] = updatedObject;

      setJoiningRequests(tempJoiningRequests);
      return true;
    }
    return toastError("Failed to update request status");
  };

  const changeWithdrawalStatus = (id) => {
    const tempWithdrawals = [...withdrawals];

    const indexToUpdate = tempWithdrawals.findIndex(
      (withdrawal) => withdrawal._id === id
    );

    if (indexToUpdate !== -1) {
      const updatedObject = {
        ...tempWithdrawals[indexToUpdate],
        status: "completed",
      };
      tempWithdrawals[indexToUpdate] = updatedObject;

      setWithdrawals(tempWithdrawals);
      return true;
    }
  };

  return loading ? (
    <div className="w-full h-[76.5vh] flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : user.type === "admin" ? (
    <div className="m-6">
      <div className="text-left flex justify-between">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <ChangePasswordModal />
      </div>

      <div className="md:p-10 md:shadow-lg md:flex">
        <div className="md:border-r md:border-gray-400 md:pr-5 flex just md:w-[25%] w-full my-6">
          <div className=" flex sm:w-[100%]  md:w-[25%]">
            <Avatar
              size="lg"
              sx={{ width: "95px", height: "95px" }}
              src={profilePicture}
            />
          </div>

          <div className="text-left">
            <p className="mx-6 text-3xl">{user?.name ?? ""}</p>
            <p className="mx-6 text-sm text-gray-400">admin</p>
          </div>
        </div>
        <div className="md:w-[75%] sm:w-[90%]">
          <AdminStats
            joinedThisMonth={joinedThisMonth ? joinedThisMonth.length : 0}
            activeMembers={activeMembers ? activeMembers.length : 0}
            totalInvestment={totoalInvestment}
            monthlyInvestment={investmentThisMonth}
          />
        </div>
      </div>
      <div className="py-5">
        <AdminCompanyStats
          investmentToday={investmentToday}
          monthlyWithDrawal={withdrawalsThisMonth}
          totalWithdrawal={totalWithdrawals}
          withDrawalToday={withdrawalsToaday}
          totalMembers={totalMembers}
        />
      </div>
      <div className="py-5">
        <PlanWiseUsersCount
          basicUsers={basicUsers}
          primeUsers={primeUsers}
          starUsers={starUsers}
          superstarUsers={superstarUsers}
          starterUsers={starterUsers}
          royalUsers={royalUsers}
        />
      </div>
      <div className="my-4" style={{ overflowX: "auto" }}>
        <Tabs
          aria-label="tabs"
          defaultValue={0}
          sx={{ bgcolor: "transparent" }}
          orientation="horizontal"
        >
          <TabList
            disableUnderline
            sx={{
              fontSize: "14px",
              "@media screen and (max-width: 600px)": {
                fontSize: "12px",
              },
              whiteSpace: "nowrap",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
              p: 0.5,
              gap: 0.5,
              borderRadius: "xl",
              bgcolor: "background.level1",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
              },
            }}
          >
            <div className="sm:w-[150px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                Joined This Month
              </Tab>
            </div>

            <div className="sm:w-[180px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                User Accounts
              </Tab>
            </div>

            <div className="sm:w-[180px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                Active Accounts
              </Tab>
            </div>

            <div className="sm:w-[180px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                Inactive Accounts
              </Tab>
            </div>

            <div className="sm:w-[180px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                Withdrawal Requests
              </Tab>
            </div>

            <div className="sm:w-[180px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                Joining Requests
              </Tab>
            </div>

            <div className="sm:w-[180px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                Conatct Queries
              </Tab>
            </div>
          </TabList>

          <TabPanel value={0}>
            <MembersTable teamMembers={joinedThisMonth ?? []} />
          </TabPanel>

          <TabPanel value={1}>
            <MembersTable teamMembers={teamMembers ?? []} />
          </TabPanel>

          <TabPanel value={2}>
            <MembersTable teamMembers={activeMembers ?? []} />
          </TabPanel>

          <TabPanel value={3}>
            <MembersTable teamMembers={nonActiveMembers ?? []} />
          </TabPanel>

          <TabPanel value={4}>
            <WithdrawalTable
              withdrawals={withdrawals ?? []}
              setLoadingStatus={setLoading}
              changeWithdrawalStatus={changeWithdrawalStatus}
            />
          </TabPanel>

          <TabPanel value={5}>
            <JoiningReqestsTable
              joiningRequests={joiningRequests ?? []}
              acceptJoiningRequest={acceptJoiningRequest}
              updateJoiningRequests={updateJoiningRequests}
              updateDeclinedJoiningRequest={updateDeclinedJoiningRequest}
            />
          </TabPanel>

          <TabPanel value={6}>
            <ContctQueryTable contactQueries={contactQueries ?? []} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  ) : (
    <div className=" w-full text-center">
      <p>You do not have permission to access this page !</p>
    </div>
  );
};

export default AdminDashboard;
