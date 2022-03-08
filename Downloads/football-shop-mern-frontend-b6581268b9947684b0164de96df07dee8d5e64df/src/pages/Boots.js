import React from 'react'
import EcommerceGridHorizontal from '../components/EcommerceGridHorizontal'
import EcommerceGridVertical from '../components/EcommerceGridVerticalPartTwo'
import data from "../json/boots.json"
import BootsImg from "../assets/Boots.jpg"
import Overlay from '../components/Overlay'
import { Route } from 'react-router-dom'
import Description from './Description'

function Boots() {
   
    return (
        <>
            <Route path="/boots/:userPath">
                <Description dataJson={data} product="boots" />
            </Route>

            <Route exact path="/boots">
                <Overlay imgSrc={BootsImg} alt="boots" >
                    <h5>PREMIUM QUALITY CLEATS</h5>
                </Overlay>
                <EcommerceGridHorizontal product="boots" data={data} numberOfItems={4} headingTrue={true} />
                <EcommerceGridVertical product="boots" data={data} />
            </Route>
        </>
    )
}

export default Boots
