import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Container } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUser } from '../redux/actions/authActions'
import Userdetails from '../components/Users/Userdetails'

const Userdetailspage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllUser())
    }, [dispatch])

    return (
        <Container maxWidth='lg'>
            <Grid container>
                <Grid item md={2} xs={3} >
                    <Sidebar />
                </Grid>
                <Grid item md={10} xs={9}>
                    <Userdetails />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Userdetailspage