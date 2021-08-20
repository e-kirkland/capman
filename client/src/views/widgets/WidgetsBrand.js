import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CWidgetBrand, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from '../charts/ChartLineSimple';
import ChartBarSimple from '../charts/ChartBarSimple'


const WidgetsBrand = (props, {withCharts})=>{

  // render

  console.log("PROPS: ", props)

  let cap = function () {
    return `$${props.salaryCap}`
  }
  let average = function () {
    return `$${props.avgSpend}`
  }
  let rosterMin = function () {
    return `${props.rosterMin}`
  }
  let rosterMax = function () {
    return `${props.rosterMax}`
  }

  useEffect(() => {
    cap();
    average();
    rosterMin();
    rosterMax();
  }, [props])

  let test = function () {
    return "TESTING"
  }

  return withCharts ?
  <CRow alignHorizontal='center'>
    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="facebook"
        rightHeader={cap()}
        rightFooter="Current Cap"
        leftHeader={average()}
        leftFooter="Avg Spend"
      >
        <CIcon
          name="cil-dollar"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[65, 59, 84, 84, 51, 55, 40]}
          label=""
          labels=""
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="twitter"
        rightHeader={rosterMin()}
        rightFooter="Roster Min"
        leftHeader={rosterMax()}
        leftFooter="Roster Max"
      >
        <CIcon
          name="cil-people"
          height="52"
          className="my-4"
        />
        <ChartBarSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[1, 13, 9, 17, 34, 41, 38]}
          label=""
          labels=""
        />
      </CWidgetBrand>
    </CCol>
  </CRow> :
  
  <CRow alignHorizontal='center'>
    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="facebook"
        rightHeader={cap()}
        rightFooter="Current Cap"
        leftHeader={average()}
        leftFooter="Avg Spend"
      >
        <CIcon
          name="cil-dollar"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[65, 59, 84, 84, 51, 55, 40]}
          label=""
          labels=""
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="twitter"
        rightHeader={rosterMin()}
        rightFooter="Roster Min"
        leftHeader={rosterMax()}
        leftFooter="Roster Max"
      >
        <CIcon
          name="cil-people"
          height="52"
          className="my-4"
        />
        <ChartBarSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[1, 13, 9, 17, 34, 41, 38]}
          label=""
          labels=""
        />
      </CWidgetBrand>
    </CCol>
  </CRow>
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool
}

export default WidgetsBrand
