import React, { useState, useEffect } from "react";

import { IoMdWallet } from "react-icons/io";

import { CircularProgress } from "@mui/joy";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import WithdrawModal from "../../components/WithdrawModal";
import ActivateFriendsIdModal from "../../components/ActivateFriendsIdModal";
import UpgradePlanModal from "../../components/UpgradePlanModal";
import usePayments from "../../hooks/usePayments";
import WithdrawalTable from "../../components/WithdrawalTable";
import { toastError, toastSuccess } from "../../components/Notification";

import useUser from "../../hooks/useUser";
import { useAuthContext } from "../../contexts/authContext";
import useBoostBoard from "../../hooks/useBoostBoard";

import { Amount } from "../../constants/plans";
import JoinBoostBoardModal from "../../components/JoinBoostBoardModal";

const MyWallet = () => {
  const authContext = useAuthContext();

  const { user, userEarnings, updateAddedUser } = authContext;
  const { requestWithDrawal, getUserWithdrawals } = usePayments();
  const { activateUserId, upgradePlan, updateUser } = useUser();
  const { joinBoostBoard } = useBoostBoard();

  const [loading, setLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);
  const [completedWithdrawals, setCompletedWithdrawals] = useState([]);
  const [incompleteWithdrawals, setIncompleteWithdrawals] = useState([]);
  const [balance, setBalance] = useState(user?.balance);
  const [withdrawal, setWithdrawal] = useState(userEarnings?.widthdrawl);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getUserWithdrawals(user.id);
      if (response) {
        setWithdrawals(response);
        let completeWithdrawals = [];
        let incompleteWithdrawals = [];

        response.map((item) => {
          if (item.status === "completed") {
            completeWithdrawals.push(item);
          } else {
            incompleteWithdrawals.push(item);
          }
        });

        setCompletedWithdrawals(completeWithdrawals);
        setIncompleteWithdrawals(incompleteWithdrawals);

        return setLoading(false);
      }
      toastError("Can not fetch withdrawals");
      return setLoading(false);
    };

    fetch();
  }, []);

  const withDrawAmount = async (amount, address) => {
    if (balance < amount) {
      return toastError("Insufficient balance");
    }

    setLoading(true);
    const payload = {
      userId: user?.id,
      name: user?.name,
      address: address,
      amount: amount,
    };
    const response = await requestWithDrawal(payload);

    if (response) {
      let existingBalance = balance;
      existingBalance -= amount;

      setBalance(existingBalance);

      let existingWithdrawalBalance = withdrawal;
      existingWithdrawalBalance += amount;

      setWithdrawal(existingWithdrawalBalance);
      toastSuccess("Withdrawal request created");
      return setLoading(false);
    }

    toastError("Failed to create withdrawal request");
    return setLoading(false);
  };

  const activateFriendsId = async (userId) => {
    setLoading(true);
    const response = await activateUserId(userId);

    if (response) {
      if (response === "user-not-found") {
        setLoading(false);
        return toastError("User does not exist");
      }

      const updateUserData = {
        balance: balance - 10,
      };
      setBalance(balance - 10);
      setWithdrawal(userEarnings?.widthdrawl);

      const isUserUpdated = await updateUser(updateUserData, user?.referenceId);

      if (isUserUpdated) {
        toastSuccess("ID Activated Successfully");
        setBalance(balance - 10);
      } else {
        setBalance(balance + 10);
        setWithdrawal(userEarnings?.widthdrawl);
        toastError("Failed to update balacne");
      }
      return setLoading(false);
    }
    setLoading(false);
    return toastError("Failed to activate ID");
  };

  const handleUpgradePlan = async () => {
    setLoading(true);
    const response = await upgradePlan(
      user?.id,
      user?.planType,
      checkUpgradePlanEligibility().nextPlan,
      checkUpgradePlanEligibility().amount
    );

    if (response) {
      updateAddedUser(response);

      setBalance(response?.balance);
      setWithdrawal(userEarnings?.widthdrawl);

      setLoading(false);
      return toastSuccess("Plan Upgraded Successfully");
    }
    setLoading(false);
    return toastError("Failed To Upgrade Plan");
  };

  const checkUpgradePlanEligibility = () => {
    const currentUserPlan = user?.planType;

    switch (currentUserPlan) {
      case "inactive":
        return {
          isEligible: user.balance >= Amount.STARTER,
          amount: Amount.STARTER,
          nextPlan: "STARTER",
        };

      case "starter":
        return {
          isEligible: user.balance >= Amount.BASIC,
          amount: Amount.BASIC,
          nextPlan: "BASIC",
        };

      case "basic":
        return {
          isEligible: user.balance >= Amount.STAR,
          amount: Amount.STAR,
          nextPlan: "STAR",
        };

      case "star":
        return {
          isEligible: user.balance >= Amount.SUPESTAR,
          amount: Amount.SUPESTAR,
          nextPlan: "SUPERSTAR",
        };

      case "superstar":
        return {
          isEligible: user.balance >= Amount.ROYAL,
          amount: Amount.ROYAL,
          nextPlan: "ROYAL",
        };

      case "prime":
        return {
          isEligible: user.balance >= Amount.PRIME,
          amount: Amount.PRIME,
          nextPlan: "PRIME",
        };

      default:
        return false;
    }
  };

  const handleJoinBoostBoard = async (amount) => {
    setLoading(true);

    const response = await joinBoostBoard(user?.referenceId, amount, user.name);

    if (response) {
      const existingUser = user;
      existingUser.balance -= amount;
      existingUser.isEligibleToJoinBoostBoard = false;
      setBalance(existingUser.balance);
      setWithdrawal(userEarnings?.widthdrawl);
      updateAddedUser(existingUser);
      toastSuccess("Income boosted successfully");
    } else {
      toastError("Failed to join boost board");
    }
    return setLoading(false);
  };

  return loading ? (
    <div className="w-full h-[76.5vh] flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div className="md:m-10">
      <div className=" md:text-left sm:text-center md:flex md:justify-between ">
        <div className="bg-blue-700 p-12 rounded-lg md:w-[50%] flex justify-center items-center text-white">
          <span className="text-6xl mx-2">
            <IoMdWallet />
          </span>
          <span className="mx-2 text-5xl font-semibold">{`$ ${
            balance > 0 ? balance.toFixed(2) : "0" + balance.toFixed(2)
          }`}</span>
        </div>

        <div className=" md:px-12 py-6 rounded-lg md:w-[23%] text-center">
          <span className="text-4xl block">Withdrawals</span>
          <span className="text-5xl md:block my-4 font-semibold">{`$ ${
            withdrawal > 10 ? withdrawal : "0" + withdrawal
          }`}</span>
        </div>

        <div className=" md:px-12 md:py-4 rounded-lg md:w-[23%] flex-row justify-between">
          {/* <ActivateFriendsIdModal
            activateId={activateFriendsId}
            isEligible={balance >= 10}
          /> */}
          <WithdrawModal
            withdrawAmount={withDrawAmount}
            isEligible={user?.balance >= 10 && user?.direct >= 2}
          />
          {user?.planType !== "royal" && (
            <UpgradePlanModal
              amount={checkUpgradePlanEligibility().amount}
              upgradedPlan={checkUpgradePlanEligibility().nextPlan}
              upgradePlan={handleUpgradePlan}
              isEligible={checkUpgradePlanEligibility().isEligible}
            />
          )}
          <JoinBoostBoardModal
            key="boostBoardModal"
            isEligible={user?.isEligibleToJoinBoostBoard}
            joinBoostBoard={handleJoinBoostBoard}
            balance={balance}
          />
        </div>
      </div>
      <div>
        <hr />
      </div>

      {withdrawals.length === 0 ? (
        <div className="text-center mt-14">
          <h1 className="text-2xl text-gray-400">
            You have not made any withdrawals yet !
          </h1>
        </div>
      ) : (
        <div className="mt-14">
          <div className="text-left">
            <h1 className="text-3xl">My Withdrawals</h1>
          </div>
          <div className="my-4">
            <Tabs
              aria-label="tabs"
              defaultValue={0}
              sx={{ bgcolor: "transparent" }}
            >
              <TabList
                disableUnderline
                sx={{
                  p: 0.5,
                  gap: 0.5,
                  borderRadius: "xl",
                  width: "395px",
                  bgcolor: "background.level1",
                  [`& .${tabClasses.root}[aria-selected="true"]`]: {
                    boxShadow: "sm",
                    bgcolor: "background.surface",
                  },
                }}
              >
                <Tab disableIndicator>All Withdrawals</Tab>
                <Tab disableIndicator>Completed</Tab>
                <Tab disableIndicator>Pending</Tab>
              </TabList>
              <TabPanel value={0}>
                <WithdrawalTable withdrawals={withdrawals} />
              </TabPanel>
              <TabPanel value={1}>
                <WithdrawalTable withdrawals={completedWithdrawals} />
              </TabPanel>
              <TabPanel value={2}>
                <WithdrawalTable withdrawals={incompleteWithdrawals} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWallet;
