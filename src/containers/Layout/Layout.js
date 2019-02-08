import React, { Component } from 'react';

import FileTree from '../../components/FileTree/FileTree';
import './Layout.css';

export default class FileExplorer extends Component { 
  state = {
    selectedFile: null,
  };

  onSelect = (file) => this.setState({ selectedFile: file });

  render() {
    const { selectedFile } = this.state;

    return (
      <div className="Layout">
        <div className="TreeWrapper">
          <FileTree onSelect={this.onSelect} />
        </div>
        <div className="file-content">
          { selectedFile && selectedFile.type === 'file' && selectedFile.content }
        </div>
      </div>
    )
  }
}