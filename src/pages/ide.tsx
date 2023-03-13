import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Ide({dataState}) {
    return(
    <>
    <AceEditor
     mode="javascript"
     theme="monokai"
     name="blah2"
    //  onLoad={this.onLoad}
     onChange={dataState}
     fontSize={14}
     showPrintMargin={true}
     showGutter={true}
     highlightActiveLine={true}
    editorProps={{ $blockScrolling: true }}
  />
    </>);
}