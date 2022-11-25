import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Container } from '@mui/system'
import Widget from '../components/widget/Widget'
import Users from '../components/Users/Users'
import { useDispatch } from 'react-redux'
import { fetchAllUser } from '../redux/actions/authActions'
const Userspage = () => {
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
                    <Users />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Userspage