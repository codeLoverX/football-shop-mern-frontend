import React, {useState, useEffect} from 'react'
import EcommerceGridVertical from '../components/EcommerceGridVerticalPartTwo'
import Overlay from '../components/Overlay'
import JerseyImg from "../assets/Jerseys.jpg"
import Description from './Description'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  fetchAll } from './ProductSlice'
// The placement of react router is everything
// If you want the page to be replaced, 
// no other alternative but to put here.


function Jerseys() {
    // /:userPath
    // variable must be userPath

    // let urlNamePart = value.name.replace(/\s/g, '').toLowerCase();
    // urlNamePart = urlNamePart.replaceAll("/", "-")

    let [elem, setElem] = useState([])
    const dispatch = useDispatch()
    useEffect(async() => {
        let controller = new AbortController();
         try {
            const originalPromiseResult = await dispatch(fetchAll()).unwrap()
            console.log({okay: originalPromiseResult})
            if(originalPromiseResult.products)
                setElem(originalPromiseResult.products)
          } catch (rejectedValueOrSerializedError) {
            console.log({failed: rejectedValueOrSerializedError})
          }
        console.log(elem)
        return () => {
            return () => controller?.abort();

        }
    }, [elem.length])


    return (
        <div>
            <Route path="/jerseys/:userPath">
                <Description dataJson={elem} product="jerseys" />
            </Route>

            <Route exact path="/jerseys">
                <Overlay imgSrc={JerseyImg} alt="jerseys" >
                    <h1>THE HEROES</h1>
                    <h5>OF OLD</h5>
                </Overlay>
                {/* <EcommerceGridHorizontal product="jerseys" data={elem} numberOfItems={6} headingTrue={true} /> */}
                <EcommerceGridVertical product="jerseys" data={elem} />
            </Route>
        </div>
    )
}

export default Jerseys
