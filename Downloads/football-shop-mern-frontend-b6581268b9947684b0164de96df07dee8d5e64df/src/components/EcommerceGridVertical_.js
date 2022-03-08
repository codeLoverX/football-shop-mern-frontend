import React, { useState, useEffect, Fragment } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBTooltip, MDBRow, MDBCol } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import "../components/EcommerceGridVertical.css"
// JS for loop doesnt work inside html

function EcommerceGridVertical({ product, data }) {
    let [begin, setBegin] = useState(0);
    let [length] = useState(16);
    let [dataLength] = useState(data.length);
    let [jsonData, setJsonData] = useState(null);
    let increment = (multiplier) => {
        setBegin((prev) => {
            prev = prev + (length * parseInt(multiplier))
            if (prev <= 0) {
                prev = 0;
            }
            if (prev >= dataLength) {
                prev = dataLength - length;
            }
            return prev;
        });
    }
    let num = Math.ceil(parseInt(dataLength) / parseInt(length));
    let arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(i)
    }
    useEffect(() => {
        var arr = []
        for (var cnt = begin; (cnt < begin + length) && (cnt < dataLength); cnt++) {
            arr.push(data[cnt]);
        }
        setJsonData(arr)
        // jsonData is updated in useEffect, so if you keep jsonData in dependency array, useEffect will be implementeda
        // again and again
        // so if you keep begin in dependency array, they are updated outside useEffect
        // so no continuous re-render
    }, [begin, data, length, dataLength])

    return (
        <Fragment>
            <div>
                <h1 className="text-center text-uppercase font-weight-bolder text-warning my-5 py-3"> Our {product} </h1>
                <div className="loadGrid__gridItems">
                    {
                        jsonData !== null &&
                        jsonData.length !== 0 &&
                        jsonData[0].name !== undefined &&
                        jsonData.map((value, index) => {
                            console.log({jsonData})
                            let urlNamePart = value.name.replace(/\s/g, '').toLowerCase();
                            urlNamePart = urlNamePart.replaceAll("/", "-")
                            return (
                                <Fragment key={`${index}${value}`}>
                                    <MDBCard className="px-0 mx-0" style={{ border: "1px solid gold" }}>

                                        <NavLink to={`/${product}/${urlNamePart}`} className="image-hyperlink">
                                            <MDBCardImage className="card-image" src={`/assets/${product}/image${index + begin}.jpg`} alt={`image${index}`} waves />

                                            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
                                                <MDBCardTitle >
                                                    <MDBTooltip
                                                        domElement tag="span"
                                                        placement="top"
                                                    >
                                                        <p className="card-text-custom text"> {value.name} </p>
                                                        <span> {value.name} </span>
                                                    </MDBTooltip>
                                                </MDBCardTitle>
                                                <p className="card-text-custom text-bold">
                                                    {value.price}
                                                </p>
                                            </MDBCardBody>
                                        </NavLink>
                                    </MDBCard>
                                </Fragment>
                            )
                        })
                    }
                </div>
                <div className="divBtnOutline text-center py-5">
                    <MDBBtn
                        onClick={
                            () => increment(-1)
                        }
                    > Prev </MDBBtn>
                    {
                        arr.map((value) => {
                            return (
                                <MDBBtn key={`${value}button`} onClick={() => {
                                    setBegin(length * value)
                                }
                                }>
                                    {value + 1}
                                </MDBBtn>
                            )
                        }
                        )
                    }
                    <MDBBtn
                        onClick={
                            () => increment(1)
                        }> Next </MDBBtn>
                </div>
            </div>
        </Fragment>
    )
}

export default EcommerceGridVertical
