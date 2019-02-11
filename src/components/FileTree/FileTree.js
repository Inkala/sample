import React from "react";

import TreeNode from "../TreeNode/TreeNode";
import "./FileTree.css";

const FileTree = props => {
  const {
    getRootNodes,
    getMargin,
    getNodeLabel,
    getChildNodes,
    onToggle,
    onSelect
  } = props;

  const rootNodes = getRootNodes();
  return (
    <div className="FileTree">
      {rootNodes.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          getMargin={getMargin}
          getNodeLabel={getNodeLabel}
          getChildNodes={getChildNodes}
          onToggle={onToggle}
          onNodeSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default FileTree;
