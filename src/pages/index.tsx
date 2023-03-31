import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect, Suspense } from 'react'
import dynamic from "next/dynamic"
import { Any } from 'react-spring'
const Ide = dynamic(() => import("../pages/ide"), {
  ssr: false
})

export default function Home({data, topics}) {
  const [newData, setNewData] = useState(data);
  const [topicList, setTopicList] = useState(topics);
  const [codeData, setCodeData] = useState(); 
  const [javascriptExecutionCode , setJavascriptExecutionCode] = useState();
  const [filterNow, setFilterNow] = useState(false)

  function executeScript(source) {
    useEffect(() => {
      var script = document.createElement("script");
      script.onload = script.onerror = function(){ this.remove(); };
      script.src = "data:text/plain;base64," + btoa(source);
      document.body.appendChild(script);
    
    
  })
  }

  function filter(newData:any, codeData: any){
    
    console.log(codeData);
    let testVal = Object.entries(newData);
    let javascriptStringCode: string = ``
    if(codeData !== undefined){
       javascriptStringCode = `
      Object.filter = (obj, predicate) => 
         Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );

        let consumedMessages = [${testVal}];` +
         `let newFilteredArray = ${codeData}` + 
         ` return newFilteredArray`
    }else{
      javascriptStringCode = `
      Object.filter = (obj, predicate) => 
         Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );

        let consumedMessages = [${testVal}];` +
         `let newFilteredArray = Object.filter(consumedMessages, consumedMessage => consumedMessage.ordertime === 1497014222380);` + 
         ` return newFilteredArray`
    }
   
          

    console.log(javascriptStringCode)
    var result = Function(javascriptStringCode)();
    
    console.log(filterNow);
    console.log([JSON.stringify(result["1"])])
      setNewData(newData => newData = [JSON.stringify(result["1"])]);
      //setFilterNow(resetFilter => resetFilter = false);
    
    //let newFilteredConsumedMessages = newData.filter(codeData);
    //setNewData(newFilteredConsumedMessages);
  }

  /**
   * function for changing the topic data
   */
async function setNewTopicData(event){
  
  const res = await fetch('/api/testcall', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({topicName: event.target.id}),
  })

  const json = await res.json();
  console.log("json ", json.data);
  setNewData(newData => newData = json.data)
}

// useEffect(() => {
//   setNewTopicData();
// })

  return (
    <>
    <Suspense>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Kafka Demo UI</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Consumer</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <main className="d-flex flex-nowrap bg-dark">
    <div className="flex-shrink-0 p-3 bg-dark" style={{width: "280px;", height: "100vh"}}>
    <div className="accordion border-dark bg-dark" id="accordionExample">
  <div className="accordion-item border-dark bg-dark">
    <h2 className="accordion-header border-dark" id="headingOne">
      <button className="accordion-button border-dark bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        cluster_0
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <ul className="list-unstyled ps-0">
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed text-white" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Topics
        </button>
        <div className="collapse show" id="home-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {topicList.map(function(topic, index) {
           return <li><a className="link-light d-inline-flex text-decoration-none rounded" id={topic.name} onClick={async (e) => setNewTopicData(e)}>{topic.name}</a></li>
          })}
          </ul>
        </div>
      </li>
      <li className="border-top border-dark my-3"></li>
    </ul>
    </div>
    </div>
    </div>
  </div>
    
  </div>
  <div className="accordion bg-dark" id="accordionPanelsStayOpenExample">
  <div className="card bg-dark">
  <div className="card bg-dark">
    <div className="card-body">
    <h2>Consumer settings</h2>
    <p className="d-inline-flex">Number of messages:</p>
      <div className="dropdown d-inline-flex" style={{marginRight: "15px"}}>
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      10
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">100</a></li>
        <li><a className="dropdown-item" href="#">1000</a></li>
        <li><a className="dropdown-item" href="#">5000</a></li>
      </ul>
    </div>
    <div className="container">
          <div className='left'>
            <label htmlFor="JS">Javascript filter: </label>
            <Ide dataState={setCodeData} consumerMessages={newData}/>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => {setFilterNow(resetFilter => resetFilter = true); filter(newData, codeData); }}>Filter</button>
    </div>
  </div>
</div>
  <div className="card-body">
  {newData.map(function(data, index) {
    return <div className="accordion-item bg-dark">
      <h2 className="accordion-header bg-dark "  id={'panelsStay-' + `${index}`}>
        <button className="accordion-button btn-secondary collapsed " type="button" data-bs-toggle="collapse" data-bs-target={'#panelsStayOpen-' + `${index}`} aria-expanded="false" aria-controls={'panelsStayOpen-' + `${index}`} key={index}>
        {data}
        </button>
      </h2>
      <div id={'panelsStayOpen-' + `${index}`} className="accordion-collapse collapse text-white" aria-labelledby={'panelsStayOpen-' + `${index}`} data-bs-parent={'panelsStay-' + `${index}`}>
        <div className="accordion-body bg-dark text-white">
        {data}
        </div>
      </div>
    </div>
   
  })}
</div>
</div>
  </div>
  </main>
  </Suspense>
    </>
  )
}



export async function getServerSideProps() {

  const res = await fetch('http:localhost:3000/api/testcall');
  const json = await res.json();
  
  return{
    props: {
      data: json.data,
      topics: json.topics
           }
        }
  
  }
