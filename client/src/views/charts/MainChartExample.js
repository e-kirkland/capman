import React, { useEffect, useState } from 'react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = (attributes) => {

  const [leagueCapData, setLeagueCapData] = useState([]);
  const [salaryCap, setSalaryCap] = useState(0);
  const [rosterNames, setRosterNames] = useState([]);

  console.log("ATTRIBUTES: ", attributes.leagueCapData)


  const defaultDatasets = (()=>{
    let elements = 10
    const data1 = leagueCapData
    return [
      {
        label: 'Salary',
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
              stepSize: Math.ceil(250 / 5),
              max: 250
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
    let teamNames = []
    leagueCapJSON.forEach(function(item){
      let salary = item['current_salary']
      let num = item['current_players']
      let name = item['display_name']
      rosterNums.push(num)
      salaries.push(salary)
      teamNames.push(name)
      })
    console.log("SALARY ARRAY: ", salaries)
    setLeagueCapData(salaries);
    setRosterNames(teamNames);
    let settings = summaryArray[1]
    // let settingsJSON = summaryArray['league_settings']
    setSalaryCap(settings['salary_cap']);
    // setRosterMin(settingsJSON['roster_min']);
    // setRosterMax(settingsJSON['roster_max']);
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
      labels={rosterNames}
    />
  )
}


export default MainChartExample
