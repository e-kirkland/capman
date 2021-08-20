import React, { lazy, useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import MainChartExample from './charts/MainChartExample.js'
import MainChartRoster from './charts/MainChartRoster.js'
require('dotenv').config();



const WidgetsDropdown = lazy(() => import('./widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('./widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [leagueCapData, setLeagueCapData] = useState([]);
  const [leagueRosterData, setLeagueRosterData] = useState([]);
  const [salaryCap, setSalaryCap] = useState(0);
  const [avgSpend, setAvgSpend] = useState(0);
  const [rosterMin, setRosterMin] = useState(0);
  const [rosterMax, setRosterMax] = useState(0);

  // Fetching summary data for selected waiver
  const fetchAllData = async () => {
    
    let url = process.env.REACT_APP_API + '/capStatus'
    console.log("URL: ", url)
    let summary = await fetch(url)
                      .then(res => res.json());

    let summaryArray = Object.values(summary);
    console.log("SUMMARY ARRAY: ", summaryArray);
    let leagueCapJSON = summaryArray[0]
    let salaries = []
    let rosterNums = []
    leagueCapJSON.forEach(function(item){
      let salary = item['current_salary']
      let num = item['current_players']
      rosterNums.push(num)
      salaries.push(salary)
      })
    console.log("SALARY ARRAY: ", salaries)
    setLeagueCapData(salaries);
    console.log("ROSTER TOTALS: ", rosterNums)
    setLeagueRosterData(rosterNums)
    let settingsJSON = summaryArray[1]
    console.log("SETTINGS JSON: ", settingsJSON)
    const average = arr => arr.reduce((acc,v) => acc + v) / arr.length;
    setAvgSpend(average(salaries));
    setSalaryCap(parseInt(settingsJSON['salary_cap']));
    setRosterMin(parseInt(settingsJSON['roster_min']));
    setRosterMax(parseInt(settingsJSON['roster_max']));
    return summary
  };

  useEffect(() => {
    fetchAllData();
  }, [])
  return (
    <>
      <WidgetsBrand withCharts avgSpend={avgSpend} salaryCap={salaryCap} rosterMin={rosterMin} rosterMax={rosterMax}/>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Salary Cap Spending</h4>
              <div className="small text-muted">All Teams</div>
            </CCol>

          </CRow>
          <MainChartExample leagueCapData={leagueCapData} style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
        
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Roster Numbers</h4>
              <div className="small text-muted">All Teams</div>
            </CCol>

          </CRow>
          <MainChartRoster style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
        
      </CCard>

      

      
    </>
  )
}

export default Dashboard
