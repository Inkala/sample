import React from "react";
import {
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";

import "./TreeNode.css";

const TreeNode = props => {
  const {
    node,
    getChildNodes,
    level,
    onToggle,
    onNodeSelect,
    getMargin,
    getNodeLabel
  } = props;

  return (
    <div className="TreeNode">
      <div
        level={level}
        className="TreeParent"
        type={node.type}
        style={getMargin(level)}
        onClick={() => onToggle(node)}
      >
        <div className="file-arrow">
          {node.type === "folder" &&
            (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </div>

        <div className="file-icon">
          {node.type === "file" && <FaFile />}
          {node.type === "folder" && node.isOpen === true && <FaFolderOpen />}
          {node.type === "folder" && !node.isOpen && <FaFolder />}
        </div>

        <span
          className="file-name"
          role="button"
          onClick={() => onNodeSelect(node)}
        >
          {getNodeLabel(node)}
        </span>
      </div>

      {node.isOpen &&
        getChildNodes(node).map(childNode => {
          return (
            <TreeNode
              {...props}
              key={`child${childNode.id}`}
              node={childNode}
              level={level + 1}
            />
          );
        })}
    </div>
  );
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
