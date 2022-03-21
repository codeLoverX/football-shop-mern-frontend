import React from 'react'
import EcommerceGridHorizontal from '../components/EcommerceGridHorizontal'
import EcommerceGridVertical from '../components/EcommerceGridVertical'
import data from "../json/accessories.json"
import AccessoriesImg from "../assets/Accessories.jpg"
import Overlay from '../components/Overlay'
import { Route } from 'react-router-dom'
import Description from './Description'

function Accessories() {

    return (

        <div>
            <Route path="/accessories/:userPath">
                <Description dataJson={data} product="accessories" />
            </Route>

            <Route exact path="/accessories">
                <Overlay imgSrc={AccessoriesImg} alt="accessories" >
                    <h1>THE PERFECT EQUIPMENT</h1>
                </Overlay>
                <EcommerceGridHorizontal product="accessories" data={data} numberOfItems={8} headingTrue={true} />
                <EcommerceGridVertical product="accessories" data={data} />
            </Route>
        </div>
    )
}

export default Accessories
