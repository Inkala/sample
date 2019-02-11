import React, { Component } from "react";
import values from "lodash/values";

import FileTree from "../../components/FileTree/FileTree";
import data from "../../assets/mock-data.json";
import "./Layout.css";

export default class FileExplorer extends Component {
  state = {
    selectedFile: null,
    nodes: data[0]
  };

  nodeSelectHandler = node => {
    this.setState({ selectedFile: node });
  };

  rootNodesHandler = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  };

  childNodesHandler = node => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  };

  toggleHandler = node => {
    const { nodes } = this.state;
    // debugger;
    nodes[node.path].isOpen = !nodes[node.path].isOpen;
    this.setState({ nodes });
  };

  nodeLabelHandler = node => node.path.split("/").pop();

  marginHandler = (level) => {
    const margin = {
      marginLeft: `${level * 2}0px`
    };
    return margin;
  };

  render() {
    const { selectedFile } = this.state;

    return (
      <div className="Layout">
        <div className="TreeWrapper">
          <FileTree
            onSelect={this.nodeSelectHandler}
            nodes={this.state.nodes}
            getRootNodes={this.rootNodesHandler}
            getChildNodes={this.childNodesHandler}
            onToggle={this.toggleHandler}
            getNodeLabel={this.nodeLabelHandler}
            getMargin={this.marginHandler}
          />
        </div>
        <div className="file-content">
          {selectedFile && selectedFile.type === "file" && selectedFile.content}
        </div>
      </div>
    );
  }
}
