import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  handleBeforeInput = (chars, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    
    if (chars === ' ') {
      if (currentText.endsWith('#')) {
        const newEditorState = RichUtils.toggleBlockType(editorState, 'header-one');
        this.setState({ editorState: newEditorState });
        return 'handled';
      } else if (currentText.endsWith('*')) {
        if(currentText.endsWith('**')){
          if (currentText.endsWith('***')) {
            const newEditorState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
            this.setState({ editorState: newEditorState });
          } else {
            const newEditorState = RichUtils.toggleInlineStyle(editorState, 'RED_COLOR');
            this.setState({ editorState: newEditorState });
          }
        }
         else {
          
          const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
          this.setState({ editorState: newEditorState });
        }
        
        return 'handled';
      }

    }

    return 'not-handled';
  };

  onChange = (newEditorState) => {
    this.setState({ editorState: newEditorState });
  };

  render() {
    // Custom style map to map the 'RED_COLOR' style to a CSS class
    const styleMap = {
      'RED_COLOR': {
        color: 'red',
      },
      'UNDERLINE': {
        textDecoration: 'underline',
      },
    };

    return (
      <div>
        <div>
          <button onClick={this.handleSave}>Save</button>
        </div>
        <div>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleBeforeInput={this.handleBeforeInput}
            customStyleMap={styleMap}
          />
        </div>
      </div>
    );
  }
}

export default App;
