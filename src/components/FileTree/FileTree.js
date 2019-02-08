import React, { Component } from "react";
import values from "lodash/values";
import PropTypes from "prop-types";

import TreeNode from "../TreeNode/TreeNode";
import "./FileTree.css";
// import data from '../../assets/mock-data.json';

const data = {
  "/Documents": {
    path: "/Documents",
    type: "folder",
    isRoot: true,
    children: ["/Documents/Books", "/Documents/Articles"],
    isOpen: true,
    id: 1
  },
  "/Documents/Books": {
    path: "/Documents/Books",
    type: "folder",
    children: ["/Documents/Books/readme.md"],
    isOpen: true,
    id: 2
  },
  "/Documents/Books/readme.md": {
    path: "/Documents/Books/readme.md",
    type: "file",
    content: "Thanks for reading me me. But there is nothing here."
  },
  "/Documents/Articles": {
    path: "/Documents/Articles",
    type: "folder",
    children: ["/Documents/Articles/News", "/Documents/Articles/Blog"],
    isOpen: true,
    id: 3
  },
  "/Documents/Articles/News": {
    path: "/Documents/Articles/News",
    type: "folder",
    children: ["/Documents/Articles/News/In Progress"],
    isOpen: true,
    id: 4
  },
  "/Documents/Articles/News/In Progress": {
    path: "/Documents/Articles/News/In Progress",
    type: "folder",
    children: [],
    isOpen: true,
    id: 5
  },
  "/Documents/Articles/Blog": {
    path: "/Documents/Articles/Blog",
    type: "folder",
    children: [],
    isOpen: true,
    id: 6
  }
};

export default class Tree extends Component {
  state = {
    nodes: data
  };

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  };

  getChildNodes = node => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  };

  onToggle = node => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  };

  getMargin = level => {
    const margin = {
      marginLeft: `${level * 2}0px`
    };
    return margin;
  };

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  };

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div className="FileTree">
        {rootNodes.map(node => (
          <TreeNode
            key={node.id}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    );
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
