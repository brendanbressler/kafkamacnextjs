import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic"
const Ide = dynamic(() => import("../pages/ide"), {
  ssr: false
})



const inter = Inter({ subsets: ['latin'] })

export default function Home({data, topics}) {
  const [newData, setNewData] = useState(data);
  const [topicList, setTopicList] = useState(topics);
  const [codeData, setCodeData] = useState(); 

  return (
    <>
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
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    <main className="d-flex flex-nowrap bg-dark">
    <div className="flex-shrink-0 p-3 bg-dark" style={{width: "280px;", height: "100vh"}}>
    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
      <svg className="bi pe-none me-2" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
      <span className="fs-5 fw-semibold">cluster_0</span>
    </a>
    <ul className="list-unstyled ps-0">
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed text-white" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Topics
        </button>
        <div className="collapse show" id="home-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {topicList.map(function(topic, index) {
           return <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded">{topic.name}</a></li>
          })}
          </ul>
        </div>
      </li>
      <li className="border-top my-3"></li>
    </ul>
  </div>
  <div className="accordion bg-dark" id="accordionPanelsStayOpenExample">
  <div className="card bg-dark">
  <div className="card bg-dark">
    <div className="card-body text-bg-secondary">
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
            <Ide dataState={setCodeData}/>
          </div>
    </div>
  </div>
</div>
  <div className="card-body">
    
  {newData.map(function(data, index) {
    return <div className="accordion-item bg-dark text-white">
      <h2 className="accordion-header bg-dark text-white"  id={'panelsStay-' + `${index}`}>
        <button className="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target={'#panelsStayOpen-' + `${index}`} aria-expanded="false" aria-controls={'panelsStayOpen-' + `${index}`} key={index}>
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
