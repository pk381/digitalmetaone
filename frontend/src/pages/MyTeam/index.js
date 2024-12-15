import React, { useState, useEffect } from "react";

import MembersCount from "../../components/MembersCount";
import MembersTable from "../../components/MembersTable";
import useMembers from "../../hooks/useMembers";
import { toastError } from "../../components/Notification";

import { useAuthContext } from "../../contexts/authContext";
import useTree from "../../hooks/useTree";

import CircularProgress from "@mui/joy/CircularProgress";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

const MyTeam = () => {
  const authContext = useAuthContext();
  const { user } = authContext;
  const { getMyTeamMembersData } = useMembers();
  const { fetchTree } = useTree();

  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState(null);
  const [activeMembers, setActiveMembers] = useState(null);
  const [directMembers, setDirectMembers] = useState(null);
  const [teamTreeMembers, setTeamTreeMembers] = useState(null);

  const extractIds = (data, idsList = [], depth = 0) => {
    if (Array.isArray(data)) {
      for (const item of data) {
        extractIds(item, idsList, depth + 1);
      }
    } else if (typeof data === "object") {
      if (data._id) {
        idsList.push({ id: data._id, depth });
      }
      if (data.children) {
        extractIds(data.children, idsList, depth + 1);
      }
    }
    return idsList;
  };

  useEffect(() => {
    const fetch = async () => {
      let active = [];

      const data = await getMyTeamMembersData(user?.referenceId);
      if (data) {
        setTeamMembers(data);

        data.members.map((member) => {
          if (member.planType !== "inactive") {
            active.push(member);
          }
        });
        setActiveMembers(active);

        return setLoading(false);
      }
      toastError("Please try again later");
      setTeamMembers([]);
      return setLoading(false);
    };
    // const fetchTeamTree = async () => {
    //   if (teamTreeMembers) {

    //     // return;
    //   }
    //   const data = await fetchTree(user?.id);
    //   if (data) {
    //     console.log(extractIds(data));

    //     const teamMembers = extractIds(data.data);

    //     setTeamTreeMembers(teamMembers);

    //     return setLoading(false);
    //   }
    //   toastError("Failed to load complete tree");
    //   setTeamMembers([]);
    //   return setLoading(false);
    // };
    fetch();
    // fetchTeamTree();
  }, []);

  return loading ? (
    <div className="w-full h-[76.5vh] flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div>
      <div>
        <MembersCount
          active={teamMembers?.activeMembers ?? 0}
          inactive={teamMembers?.inactiveMembers ?? 0}
          activeThisMonth={teamMembers?.activeInMonth ?? 0}
          inactiveThisMonth={teamMembers?.notActiveInMonth ?? 0}
          total={teamMembers?.totalMembers ?? 0}
          direct={teamMembers?.totalMembers ?? 0}
        />

        {teamMembers && teamMembers?.members.length === 0 ? (
          <p className="text-center text-2xl text-gray-500">
            You do not have any team members
          </p>
        ) : (
          <Tabs aria-label="Vertical tabs" orientation="horizontal">
            <TabList>
              <Tab>Direct Team List</Tab>
              <Tab>Active Team List</Tab>
            </TabList>
            <div className="">
              <TabPanel value={0}>
                <MembersTable teamMembers={teamMembers?.members ?? []} />
              </TabPanel>
            </div>
            <div className="w-[100%]">
              <TabPanel value={1}>
                <MembersTable teamMembers={activeMembers ?? []} />
              </TabPanel>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
