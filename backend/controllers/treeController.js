const User = require("../models/User");

const createTreeData = async (nodeId) => {
  const element = await User.findById(nodeId).select({
    _id: 1,
    name: 1,
    direct: 1,
    referenceId: 1,
  });

  let children = await User.find({ underId: element.referenceId }).select({
    _id: 1,
    name: 1,
    direct: 1,
    side: 1,
  });

  if (children.length === 0) {
    return { element, children: [] };
  } else {
    const childs = [];

    for (let i = 0; i < children.length; i++) {
      const child = await createTreeData(children[i].id);

      childs.push(child);
    }
    return { element, children: childs };
  }
};

const getTree = async (req, res) => {
  console.log("geting tree");

  try {
    const nodeId = req.params.id;

    const data = await createTreeData(nodeId);

    res.status(201).json({ message: "success", data: data });
  } catch (error) {
    console.log("Error from treeController's getTree", error);
  }
};

module.exports = { getTree };
