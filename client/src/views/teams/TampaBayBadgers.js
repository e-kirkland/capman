import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
require('dotenv').config();

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['display_name','player', 'position', 'team', 'salary']  

const TeamTable = () => {

  const [playerData, setPlayerData] = useState([]);

  // Fetching summary data for selected waiver
  const fetchAllData = async () => {
    
    let url = process.env.REACT_APP_API + '/getPlayers'
    console.log("URL: ", url)
    let summary = await fetch(url)
                      .then(res => res.json());

    let summaryArray = Object.values(summary);

    // filter Array to objects in team of interest
    let teamArray = summaryArray.filter(item => item.display_name==='corydraper')
    console.log("SUMMARY ARRAY: ", teamArray);
    setPlayerData(teamArray);
    return teamArray
  };

  useEffect(() => {
    fetchAllData();
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              TAMPA BAY BADGERS
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
