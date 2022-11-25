import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Container } from '@mui/system'
import Widget from '../components/widget/Widget'
import QuestionDetails from '../components/Question/QuestionDetails'

const DisplayQuestion = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item md={2} xs={3}>
          <Sidebar />
        </Grid>
        <Grid item md={7} xs={9}>
          <QuestionDetails  />
        </Grid>
        <Grid item md={3} xs={12}>
          <Widget />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DisplayQuestion