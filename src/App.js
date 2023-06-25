import React,{useState} from 'react';
 
import {useDropzone} from 'react-dropzone'
import Header from './components/Header'
import Output from './components/output'
import * as XLSX from "xlsx";




function App() {
  const [files,setFiles] = useState([])
  const {acceptedFiles,getRootProps, getInputProps} = useDropzone({
    accept:"image/*,.txt,.xls",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })
  
  const wb = acceptedFiles[0];
  
  
  const [ff,setFf] = useState([]);
  
  const readFile = (wb)=>{
    const reader = new FileReader();
    
     reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      // console.log(data);
      if(ff.length === 0){
        data.forEach((res)=>{
          // ff.push(res);
          ff.push(res);
          //console.log(res)
        }) 
      }
      
    };
    
  reader.readAsBinaryString(wb);
  }
  
  


  const generateReport= (data)=>{
    //console.log(data[0])
    var sortData = [];
    
data.forEach(obj => {
    var item = Object.entries(obj); 
    
    if(item[0].includes('__EMPTY_2') && item[1].includes('__EMPTY_6')&& item[2].includes('__EMPTY_18')){
        let nm;
        let qy;
        var itm
        
        Object.entries(obj).forEach(([key,value]) => {
            //console.log(`${key} ${value}`);
            if(key === '__EMPTY_6'&& value != null){
                nm = value;
                //console.log(name);
            }
            else if(key === '__EMPTY_18' && value != null){
                qy = value;
                //console.log(qty);
            }
            
        
        });
        itm = { name:nm,qty:qy}
        //console.log(itm);
        sortData.push(itm);
    }
    
    
});
var report = [];
// console.log(JSON.stringify(sortData,null,4));
var totalQ = 0;

    sortData.forEach(obj => {
      
        if(obj.name === "Salmon Sashimi"){
            console.log(obj.name);
            totalQ += 2*obj.qty;
            
        }
        if(obj.name === "Sushi&Sashimi Platter"){
            console.log(obj.name);
            totalQ += 2*obj.qty;
        }
        if(obj.name === "Giant Platter"){
            console.log(obj.name);
            totalQ += 4*obj.qty;
        }
        if(obj.name === "Regular Sashimi"){
            console.log(obj.name);
            totalQ += 2*obj.qty;
        }
        if(obj.name === "Deluxe Sashimi"){
            console.log(obj.name);
            totalQ += 3*obj.qty;
        }
        

    })
    let itm = { name:'Salmon',qty:totalQ}
    report.push(itm);
    //console.log(totalQ);
    //console.log(report[0]);
    return report;
}





var res = generate();
function generate(){
  if(wb){
    readFile(wb);
    readFile(wb);
    console.log(ff)
    var res = null;
    var report = generateReport(ff);
     res = report.map(obj =>(
      <li key={obj.name}> ItemName:{obj.name} --ItemQty:{obj.qty}</li>
    ))
  }
  return res;
}

const Search = () => {
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => setShowResults(true)
  return (
    <div>
      <input type="submit" value="Search" onClick={onClick} />
      { showResults ? <Results /> : null }
    </div>
  )
}


const Results = () => (
  <div id="results" className="search-results">
    <ul>{res}</ul>
  </div>
)

  
  const fls = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
        
      </div>
    </div>
  ))


  return (
    
    <div className="App">
      <Header/>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop files here</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{fls}</ul>
       <Search/>
        
      </aside>
      <div>{images}</div>
      <button onClick={generate}>generate</button>
      
      
    </div>
  );
}

export default App;
