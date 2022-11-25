import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components'
import { fetchAllUser } from '../../redux/actions/authActions'
import UserUpdate from './UserUpdate';
import 'leaflet/dist/leaflet.css'
import { Button } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet"


const Userdetails = () => {
  var users = useSelector(state => state.allUserReducer);
  var currentuser = useSelector(state => state.currentUserReducer);
  const { id } = useParams();
  const [loc, setLoc] = useState({
    lat: null, long: null
  })
  const [profile, setProfile] = useState(true);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    dispatch(fetchAllUser())
    const array = users.filter((user) => user._id === id)
    setUser(array[0]);
  }, [id, dispatch])

  const getIcon = (_iconSize) => {
    return L.icon({
      iconUrl: require('../../Assets/marker.png'),
      iconSize: [_iconSize]
    })
  }
  const getLoc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        setLoc({ lat: pos.coords.latitude, long: pos.coords.longitude })
      })
    }
  }
  return (
    <div>
      {profile ?
        <UserdetailsWrapper>

          {currentuser?.user._id === user?._id ?
            <div className='editProfile'>
              <button onClick={() => setProfile(!profile)}>Edit Profile <EditIcon /></button>
            </div> : ""}
          {(user === null || user?.name === null) ? <p>loading</p> :
            <div className='userdetailcard'>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className='nameInitals'>
                  <p>{user?.name[0]?.toUpperCase()}</p>
                </div>
                <div className='userDetails'>
                  <p className='name'>{user?.name}</p>
                  <p className='joined'>joined {moment(user?.joinedOn).fromNow()}</p>
                </div>
              </div>
              <div className='about'>
                <div>
                  {user?.tags.map((tag, index) => (<span key={index} className="tags">{tag}</span>))}
                </div>
                <p style={{ fontSize: "1rem", fontWeight: 500 }}>About</p>
                <p style={{ fontSize: "0.8rem", }}>{user?.about}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {
                  currentuser?.user._id === user?._id ? <>
                    {loc.lat === null ? "" : <MapContainer center={[loc.lat, loc.long]} zoom={14} scrollWheelZoom={false} style={{ width: '25rem', height: "25rem" }}>
                      <TileLayer
                        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=cyi0cHzTrF6ZAWTg78OV"
                      />
                      <Marker icon={getIcon(20)} position={[loc.lat, loc.long]} >
                        <Popup>
                          {<p>{loc.lat}{", "}{loc.long}</p>}
                        </Popup>
                      </Marker>
                    </MapContainer>}

                    <Button style={{ marginTop: "1.52rem  ", fontSize: "0.81rem" }} variant={'contained'} onClick={getLoc}> Get your current location here  </Button></> : ""
                }
              </div>


            </div>
          }
        </UserdetailsWrapper> : <UserUpdate />
      }
    </div >
  )
}

const UserdetailsWrapper = styled.div`
display: flex;
position: relative;
margin-top: 2rem;
padding: 2rem;
.userdetailcard{
  display: flex;
  flex-direction: column;
  gap: 1rem;
.nameInitals{
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  font-size: 3rem;
  background-color: purple;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
.userDetails{
  margin-top: 0.51rem;
  .name{
    font-weight: 500;
    text-transform: capitalize;
  }
  .joined{
    font-size: 0.8rem;
    color: #484848;
  }
}

}

.editProfile{
  position: absolute;
  right: 0;
  top: 0;
  button{
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem ;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap:0.5rem;
    font-size: 0.9rem;
    border: 1px solid grey;
    svg{
      font-size: 0.9rem;
    }
  }
}
.tags{
  display: inline-block;
    color:#2C5877;
    border-radius: 0.188rem;
    padding: 0.313rem 0.375rem;
    margin: 0.5rem 0.2rem;
    text-transform: lowercase;
    background: #D0E3F1;
    font-weight: 500;
    font-size: 0.75rem;
}
`

export default Userdetails