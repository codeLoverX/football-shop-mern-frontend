import React, { useEffect } from 'react'
import EcommerceGridVertical from '../components/EcommerceGridVerticalPartTwo'
import Overlay from '../components/Overlay'
import JerseyImg from "../assets/Jerseys.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll, selectProducts } from './ProductSlice'
import { useParams } from 'react-router-dom'

// The placement of react router is everything
// If you want the page to be replaced, 
// no other alternative but to put here.

function JerseysPartTwo() {
    // /:userPath
    // variable must be userPath
    const { userPath } = useParams();
    console.log({ userPath })

    // let urlNamePart = value.name.replace(/\s/g, '').toLowerCase();
    // urlNamePart = urlNamePart.replaceAll("/", "-")

    let elem = useSelector(selectProducts)
    const dispatch = useDispatch()
    useEffect(() => {
        let controller = new AbortController();
        async function fetchData() {
            try {
                const originalPromiseResult = await dispatch(fetchAll('jerseys')).unwrap()
                if (originalPromiseResult.product)
                    console.log({ okay: originalPromiseResult })
            } catch (rejectedValueOrSerializedError) {
                console.log({ failed: rejectedValueOrSerializedError })
            }
        }

        fetchData()

        return () => {
            return () => controller?.abort();
        }
    }, [elem.length])

    return (
        <div>
            <Overlay imgSrc={JerseyImg} alt="jerseys" >
                <h1>THE HEROES</h1>
                <h5>OF OLD</h5>
            </Overlay>
            {/* <EcommerceGridHorizontal product="jerseys" data={elem} numberOfItems={4} headingTrue={true} /> */}
            <EcommerceGridVertical product="jerseys" data={elem} />
        </div>
    )
}

export default JerseysPartTwo
