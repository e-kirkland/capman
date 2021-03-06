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
import { DocsLink } from 'src/reusable'

import usersData from './users/UsersData.js'
require('dotenv').config();



// let playerData = async () => {
//   await fetchAllData().then((data)=> { 
//       console.log(" PLAYER DATA FROM FETCH: ", data)
//       return data})
//   }

// let playerArray = Object.values(playerData())

// console.log("PLAYER DATA: ", typeof playerArray)

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['display_name', 'player', 'position', 'team', 'salary', 'war', 'value']

const AllPlayers = () => {

  const [playerData, setPlayerData] = useState([]);

  // Fetching summary data for selected waiver
  const fetchAllData = async () => {

    let url = process.env.REACT_APP_API + '/getPlayers'
    console.log("URL: ", url)
    let summary = await fetch(url)
      .then(res => res.json());

    let summaryArray = Object.values(summary);
    console.log("SUMMARY ARRAY: ", summaryArray);
    setPlayerData(summaryArray);
    return summary
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
              ALL PLAYERS
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={playerData}
                fields={fields}
                sorter
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={100}
                // pagination
                scopedSlots={{
                  'status':
                    (item) => (
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

export default AllPlayers
