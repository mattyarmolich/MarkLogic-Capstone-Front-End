import React, { Component } from 'react'
import './DragDrop.scss';
import axios from 'axios';

class DragDrop extends Component {
    constructor(props) {
      super(props);
      this.dropRef = React.createRef()
      this.state = {
          dragging: false,
          files: [
          ]
      }
    }

    submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        this.state.files.map( (file, index) => {
          console.log(index);
        })
        formData.append('file', this.state.files[0]);
        axios.get('/upload', {
            params: {
                // hard coded test params for now
                file_name: "Basic_Stats.csv",
                user_id: 12345,
                bucket_name: "uploads" | "classified"
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    handleFileDrop = (files) => {
      let fileList = this.state.files
      for (var i = 0; i < files.length; i++) {
        if (!files[i].name) return
        fileList.push(files[i].name)
      }
      this.setState({files: fileList})
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({dragging: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.handleFileDrop(e.dataTransfer.files)
            // e.dataTransfer.clearData()
            this.dragCounter = 0
        }
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({dragging: true})
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        this.setState({dragging: true})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            this.setState({dragging: true})
        }
    }

    handleDragOut = (e) => {
        this.setState({dragging: false})
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
    }

    handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    render() {
        return (
            <div
              className="DragDrop"
              onDragEnter={(e) => this.handleDragIn(e)}
              onDragOver={(e) => this.handleDragOver(e)}
              onDrop={(e) => this.handleDrop(e)}
              onDragEnd={(e) => this.handleDragOut(e)}
            >
                {this.state.files.length > 0 ?   <div className="file-container">
                    {this.state.files.map((file, index) =>
                      <div key={index}>{file}</div>
                    )}
                  </div>
                  :
                  <div>no files uploaded</div>
                }

                {this.state.dragging &&
                 <div className="drag-drop-container">
                    <div className="drop-zone">
                        <div>Drop files here</div>
                    </div>
                </div>
                }
                <button onClick={(e) => this.submitFile(e)}>submit</button>
            </div>
        )
    }


}

export default DragDrop
