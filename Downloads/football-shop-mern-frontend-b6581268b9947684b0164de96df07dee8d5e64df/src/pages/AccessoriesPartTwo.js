import React, { useEffect } from 'react'
import EcommerceGridVertical from '../components/EcommerceGridVerticalPartTwo'
import Overlay from '../components/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import AccessoriesImg from "../assets/Accessories.jpg"
import { fetchAll, selectProducts } from './ProductSlice'
import { useParams } from 'react-router-dom'
import EcommerceGridHorizontal from '../components/EcommerceGridHorizontalPartTwo'

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

    useEffect( () => {

        async function fetchData() { try {
            const originalPromiseResult = await dispatch(fetchAll('accessories')).unwrap()
            if (originalPromiseResult.product)
                console.log({ okay: originalPromiseResult })

        } catch (rejectedValueOrSerializedError) {
            console.log({ failed: rejectedValueOrSerializedError })
        }}
        let controller = new AbortController();
        fetchData()
        console.log(elem)
        return () => {
            return () => controller?.abort();

        }
    }, [elem.length])

    return (
        <div>
            <Overlay imgSrc={AccessoriesImg} alt="accessories" >
                <h1>THE PERFECT EQUIPMENT</h1>
            </Overlay>
            {/* <EcommerceGridHorizontal product="accessories" data={elem} numberOfItems={4} headingTrue={true} /> */}
            <EcommerceGridVertical product="accessories" data={elem} />
        </div>
    )
}

export default JerseysPartTwo
