import React, { useEffect } from 'react'
import EcommerceGridHorizontal from '../components/EcommerceGridHorizontalPartTwo'
import EcommerceGridVertical from '../components/EcommerceGridVerticalPartTwo'
import Overlay from '../components/Overlay'
import BootsImg from "../assets/Boots.jpg"
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
    useEffect( () => {
        let controller = new AbortController();
        async function fetchData() {
            try {
                const originalPromiseResult = await dispatch(fetchAll('boots')).unwrap()
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
            <Overlay imgSrc={BootsImg} alt="boots" >
                <h5>PREMIUM QUALITY CLEATS</h5>
            </Overlay>
            {/* <EcommerceGridHorizontal product="boots" data={elem} numberOfItems={4} headingTrue={true} /> */}
            <EcommerceGridVertical product="boots" data={elem} />
        </div>
    )
}

export default JerseysPartTwo
