import React, { lazy, useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'

const WidgetsBrand = lazy(() => import('../widgets/WidgetsTeam.js'))

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['display_name','player', 'position', 'team', 'salary', 'war', 'value']


const TeamTable = () => {

  const [playerData, setPlayerData] = useState([]);
  const [salaryCap, setSalaryCap] = useState(0);
  const [teamCap, setTeamCap] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [rosterMax, setRosterMax] = useState(0);  

  // Fetching summary data for selected waiver
  const fetchAllData = async () => {
    
    let url = process.env.REACT_APP_API + '/getPlayers'
    console.log("URL: ", url)
    let summary = await fetch(url)
                      .then(res => res.json());

    let summaryArray = Object.values(summary);

    // filter Array to objects in team of interest
    let teamArray = summaryArray.filter(item => item.display_name==='jeffreywolfeherbst')
    console.log("KICKERS AND QBS SUMMARY ARRAY: ", teamArray);
    setPlayerData(teamArray);
    return teamArray
  };

  // Fetching summary data for selected waiver
  const fetchLeagueData = async () => {
    
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

    let teamData = leagueCapJSON.find(o => o.display_name === 'jeffreywolfeherbst')
    setTeamCap(teamData['current_salary'])
    console.log("SALARY ARRAY: ", teamData)
    let settingsJSON = summaryArray[1]
    console.log("SETTINGS JSON: ", settingsJSON)
    setTeamCount(teamData['current_players'])
    setSalaryCap(parseInt(settingsJSON['salary_cap']));
    setRosterMax(parseInt(settingsJSON['roster_max']));
    return summary
  };

  useEffect(() => {
    fetchAllData();
    fetchLeagueData();
  }, [])

  return (
    <>
      <WidgetsBrand withCharts teamCap={teamCap} teamCount={teamCount} salaryCap={salaryCap} rosterMax={rosterMax}/>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              KICKERS AND QBS
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={playerData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={100}
              // pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      
    </>
  )
}

export default TeamTable;
