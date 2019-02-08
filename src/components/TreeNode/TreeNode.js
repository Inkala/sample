import React from "react";
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

import './TreeNode.css';

const getNodeLabel = node => node.path.split("/").pop();

const TreeNode = props => {
  const { node, getChildNodes, level, onToggle, onNodeSelect } = props;

  const getMargin = level => {
    const margin = {
      marginLeft: `${level*2}0px`,
    };
    return margin;
  };

  return (
    <div className="TreeNode">
      <div level={level} className="TreeParent" type={node.type} style={getMargin(level)}>
        <div className="file-arrow" onClick={() => onToggle(node)}>
          {node.type === "folder" && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </div>

        <div className="file-icon">
          {node.type === "file" && <FaFile />}
          {node.type === "folder" && node.isOpen === true && <FaFolderOpen />}
          {node.type === "folder" && !node.isOpen && <FaFolder />}
        </div>

        <span className="file-name" role="button" onClick={() => onNodeSelect(node)}>
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

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
