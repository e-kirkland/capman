import React, { useEffect, useState } from 'react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartRoster = (attributes) => {

  const [leagueRosterData, setLeagueRosterData] = useState([]);

  console.log("ATTRIBUTES: ", attributes.leagueCapData)


  const defaultDatasets = (()=>{
    let elements = 10
    const data1 = leagueRosterData
    return [
      {
        label: 'Roster',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      },
    ]
  })()

  const defaultOptions = (()=>{
    return {
        options: {
          indexAdis: 'y',
        },  
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(30 / 5),
              max: 30
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

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
    console.log("Roster ARRAY: ", rosterNums)
    setLeagueRosterData(rosterNums);
    let settings = summaryArray[1]

    return summary
  };

  useEffect(() => {
    fetchAllData();
  }, [])

  // render
  return (
    <CChartBar
      {...attributes}
      datasets={defaultDatasets}
      // datasets={leagueCapData}
      // datasets={datasetLoad()}
      options={defaultOptions}
      labels={[
        'Acworth Eagles',
        'Atkinson Rules',
        'Beats By Ray',
        'Essendon Bombers',
        'Go Big or Go Home',
        'GTech Nick',
        'Kickers and QBs',
        'Tampa Bay Badgers',
        'The Cleveland Steamers',
        'Trust The Process'
      ]}
    />
  )
}


export default MainChartRoster
