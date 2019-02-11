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
    onToggle,
    onNodeSelect,
    getMargin,
    getNodeLabel,
    level
  } = props;

  let fileArrow;
  let fileIcon;
  const fileLabel = getNodeLabel(node);

  if (node.type === "file") {
    fileIcon = <FaFile onClick={() => onNodeSelect(node)} />;
  } else {
    fileIcon = node.isOpen ? <FaFolderOpen /> : <FaFolder />;
    fileArrow = node.isOpen ? <FaChevronDown /> : <FaChevronRight />;
  }

  return (
    <div className="TreeNode">
      <div
        level={level}
        className="TreeParent"
        type={node.type}
        style={getMargin(level)}
        onClick={() => onToggle(node)}
      >
        <div className="file-arrow">{fileArrow}</div>
        <div className="file-icon">{fileIcon}</div>
        <span
          className="file-name"
          role="button"
          onClick={() => onNodeSelect(node)}
        >
          {fileLabel}
        </span>
      </div>

      {node.isOpen &&
        getChildNodes(node).map(childNode => (
          <TreeNode
            {...props}
            key={childNode.id}
            node={childNode}
            level={level + 1}
          />
        ))}
    </div>
  );
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
