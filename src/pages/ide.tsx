import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Ide({dataState, consumerMessages}) {
    return(
    <>
    <AceEditor
     mode="javascript"
     theme="monokai"
     name="javascriptuniquefilter"
    //onLoad={onload}
    defaultValue={`function filter(){ 
        //insert filter functionality for messages here 
        console.log(${consumerMessages})
    }`}
     onChange={dataState}
     fontSize={14}
     showPrintMargin={true}
     showGutter={true}
     highlightActiveLine={true}
    editorProps={{ $blockScrolling: true }}
  />
    </>);
}
