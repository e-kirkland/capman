import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CJumbotron,
  CRow,
  CEmbed,
  CEmbedItem
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Jumbotrons = () => {

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CJumbotron className="border">
                <h3 className="display-5">Acworth Eagles</h3>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Jumbotrons
