import React, { useState, useEffect, Fragment } from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBTooltip } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import "./EcommerceGridHorizontal.css"

function EcommerceGridHorizontal({ product, data, numberOfItems, headingTrue }) {
    let [begin, setBegin] = useState(0);
    let [length] = useState(numberOfItems);
    let [dataLength] = useState(numberOfItems);
    let [jsonData, setJsonData] = useState(null);
    let num = Math.ceil(parseInt(dataLength) / parseInt(length));
    let arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(i)
    }

    console.log({ jsonData })

    useEffect(() => {
        var arr = []
        if (data.length > numberOfItems) {
            
                arr.push(data[3]);
                arr.push(data[6]);
                arr.push(data[9]);
                arr.push(data[12]);

        }
        setJsonData(arr)
        // jsonData is updated in useEffect, so if you keep jsonData in dependency array, useEffect will be implementeda
        // again and again
        // so if you keep begin in dependency array, they are updated outside useEffect
        // so no continuous re-render
    }, [begin, data, length, dataLength])

    return (
        <Fragment>
            <div className="text-center position-relative outerRow">
                {headingTrue && <h1 className="text-center text-uppercase font-weight-bolder text-warning my-5 py-3 my-5"> Best Value {product} </h1>}
                <div className="loadRow__Items">
                    {
                        jsonData !== null &&
                        jsonData.length !== 0 &&

                        jsonData.map((value, index) => {
                            console.log({ jsonData })
                            let urlNamePart = value.name.replace(/\s/g, '').toLowerCase();
                            urlNamePart = urlNamePart.replaceAll("/", "-")
                            return (
                                <Fragment key={index}>
                                    <MDBCard style={{ borderRadius: "10px !important", border: "0.5px solid gold", boxShadow: "0px 0px 5px 0px lightyellow" }} >
                                        <NavLink to={`/${product}/${urlNamePart}`}>
                                            <MDBCardImage className="img-fluid rowImg" src={`/assets/${product}/image${index + begin}.jpg`} alt={`image${index}`} waves />
                                            <MDBCardBody className="rowBody py-0">
                                                <MDBCardTitle className="rowTitle">
                                                    <MDBTooltip
                                                        domElement tag="span"
                                                        placement="top"
                                                    >
                                                        <p className="title-info-1"> {value.name} </p>
                                                        <span> {value.name} </span>
                                                    </MDBTooltip>
                                                </MDBCardTitle>
                                                <p className="title-info-1">{value.price}</p>
                                            </MDBCardBody>
                                        </NavLink>
                                    </MDBCard>
                                </Fragment>
                            )
                        })
                    }
                </div>

            </div>
        </Fragment >
    )
}

export default EcommerceGridHorizontal
