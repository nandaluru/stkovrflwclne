import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Container } from '@mui/system'
import Widget from '../components/widget/Widget'
import Questions from '../components/Question/Questions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestionAction } from '../redux/actions/questionAction'

const Home = () => {
  const dispatch = useDispatch();
  const questionList = useSelector(state => state.questionReducer)
  useEffect(() => {
    dispatch(getAllQuestionAction())
  }, [dispatch])

  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item md={2} xs={3} >
          <Sidebar />
        </Grid>
        <Grid item md={7} xs={9}>
          <Questions questionHead={"Top Questions"} questionList={questionList} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Widget />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home