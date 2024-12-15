import React, { useEffect, useState } from "react";

import useTree from "../../hooks/useTree";
import { useAuthContext } from "../../contexts/authContext";
import { toastError } from "../../components/Notification";

import { CircularProgress } from "@mui/joy";

import "./tree.css";

const CompanyTree = () => {
  const authContext = useAuthContext();
  const { user } = authContext;
  const { fetchTree } = useTree();

  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchTree(user?.id ?? "");
        console.log(data);
        setTreeData(data);
        setLoading(false);
      } catch (error) {
        toastError("Can not fetch tree");
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const showTree = (data) => (
    <div className="node" key={data.element.id}>
      <div className="node_element">
        <p>{data.element.name}</p>
        <p>Id: {data.element.referenceId}</p>
        <p>Team: {data.element.direct !== null ? data.element.direct : 0}</p>
      </div>
      <div className="node_children">{data.children.map(showTree)}</div>
    </div>
  );

  return loading ? (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div className="genealogy-body genealogy-scroll">
      <div className="tree">{treeData && showTree(treeData)}</div>
    </div>
  );
};

export default CompanyTree;
