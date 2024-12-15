import React, { useState, useEffect } from "react";

import { CircularProgress } from "@mui/joy";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import { useAuthContext } from "../../contexts/authContext";
import useBoostBoard from "../../hooks/useBoostBoard";

import { toastError } from "../../components/Notification";
import BoostBoardDetailsTable from "../../components/BoostBoardDetaulsTable";

const BoostBoardDetails = () => {
  const { user } = useAuthContext();
  const { getBoostBoardEntries } = useBoostBoard();

  const [loading, setLoading] = useState(true);
  const [boostEntries, setBoostEntries] = useState([]);
  const [boostEntries5, setBoostEntries5] = useState([]);
  const [boostEntries10, setBoostEntries10] = useState([]);
  const [boostEntries20, setBoostEntries20] = useState([]);
  const [boostEntries50, setBoostEntries50] = useState([]);
  const [boostEntries100, setBoostEntries100] = useState([]);
  const [boostEntries200, setBoostEntries200] = useState([]);
  const [boostEntries500, setBoostEntries500] = useState([]);

  const changeEntriesStatus = (referenceId, amount) => {
    if (amount === 5) {
      setBoostEntries5((prevEntries) => {
        return prevEntries.filter((entry) => entry.referenceId !== referenceId);
      });
    } else if (amount === 10) {
      setBoostEntries10((prevEntries) => {
        return prevEntries.filter((entry) => entry.referenceId !== referenceId);
      });
    } else if (amount === 20) {
      setBoostEntries20((prevEntries) => {
        return prevEntries.filter((entry) => entry.referenceId !== referenceId);
      });
    } else if (amount === 50) {
      setBoostEntries50((prevEntries) => {
        return prevEntries.filter((entry) => entry.referenceId !== referenceId);
      });
    } else if (amount === 100) {
      setBoostEntries100((prevEntries) => {
        return prevEntries.filter((entry) => entry.referenceId !== referenceId);
      });
    } else if (amount === 200) {
      setBoostEntries200((prevEntries) => {
        return prevEntries.filter((entry) => entry.referenceId !== referenceId);
      });
    } else if (amount === 500) {
      setBoostEntries500((prevEntries) => {
        return prevEntries.filter((entry) => entry.referenceId !== referenceId);
      });
    }
    setBoostEntries500((prevEntries) => {
      return prevEntries.filter((entry) => entry.referenceId !== referenceId);
    });
  };

  const filterEntriesAmountWise = (entries) => {
    if (!entries) {
      return;
    }

    let entries5 = [];
    let entries10 = [];
    let entries20 = [];
    let entries50 = [];
    let entries100 = [];
    let entries200 = [];
    let entries500 = [];

    for (const entry of entries) {
      switch (entry.amount) {
        case 5:
          entries5.push(entry);
          break;

        case 10:
          entries10.push(entry);
          break;

        case 20:
          entries20.push(entry);
          break;

        case 50:
          entries50.push(entry);
          break;

        case 100:
          entries100.push(entry);
          break;

        case 200:
          entries200.push(entry);
          break;

        case 500:
          entries500.push(entry);
          break;
      }
    }
    setBoostEntries5(entries5);
    setBoostEntries10(entries10);
    setBoostEntries20(entries20);
    setBoostEntries50(entries50);
    setBoostEntries100(entries100);
    setBoostEntries200(entries200);
    setBoostEntries500(entries500);
  };

  useEffect(() => {
    const fetch = async () => {
      if (boostEntries.length >= 1) {
        return;
      }
      const response = await getBoostBoardEntries();
      if (response) {
        setBoostEntries(response);
        filterEntriesAmountWise(response);
      } else {
        setBoostEntries([]);
        toastError("Failed to fetch boost board");
      }
      return setLoading(false);
    };
    fetch();
  }, []);

  return loading ? (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : user.type === "admin" ? (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Boost Board</h1>
      </div>

      <div className="mt-10">
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
            <div className="sm:w-[100px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                $05
              </Tab>
            </div>
            <div className="sm:w-[100px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                $10
              </Tab>
            </div>

            <div className="sm:w-[100px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                $20
              </Tab>
            </div>

            <div className="sm:w-[100px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                $50
              </Tab>
            </div>

            <div className="sm:w-[100px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                $100
              </Tab>
            </div>

            <div className="sm:w-[100px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                $200
              </Tab>
            </div>

            <div className="sm:w-[100px]">
              <Tab disableIndicator sx={{ scrollSnapAlign: "start" }}>
                $500
              </Tab>
            </div>
          </TabList>
          <TabPanel value={0}>
            <BoostBoardDetailsTable
              entries={boostEntries5}
              changeEtriesStatus={changeEntriesStatus}
              setLoadingStatus={setLoading}
            />
          </TabPanel>
          <TabPanel value={1}>
            <BoostBoardDetailsTable
              entries={boostEntries10}
              changeEtriesStatus={changeEntriesStatus}
              setLoadingStatus={setLoading}
            />
          </TabPanel>

          <TabPanel value={2}>
            <BoostBoardDetailsTable
              entries={boostEntries20}
              changeEtriesStatus={changeEntriesStatus}
              setLoadingStatus={setLoading}
            />
          </TabPanel>

          <TabPanel value={3}>
            <BoostBoardDetailsTable
              entries={boostEntries50}
              changeEtriesStatus={changeEntriesStatus}
              setLoadingStatus={setLoading}
            />
          </TabPanel>

          <TabPanel value={4}>
            <BoostBoardDetailsTable
              entries={boostEntries100}
              changeEtriesStatus={changeEntriesStatus}
              setLoadingStatus={setLoading}
            />
          </TabPanel>
          <TabPanel value={5}>
            <BoostBoardDetailsTable
              entries={boostEntries200}
              changeEtriesStatus={changeEntriesStatus}
              setLoadingStatus={setLoading}
            />
          </TabPanel>
          <TabPanel value={6}>
            <BoostBoardDetailsTable
              entries={boostEntries500}
              changeEtriesStatus={changeEntriesStatus}
              setLoadingStatus={setLoading}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  ) : (
    <div className="text-center">
      <p>You are not authorized to access this page</p>
    </div>
  );
};

export default BoostBoardDetails;
