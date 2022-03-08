import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";
import "./Description.css"
import { useDispatch } from 'react-redux';
import { setCart } from "./CartSlice";

const BreadcrumbPage = ({ productType, productName }) => {
    return (
        <MDBContainer className="mt-2 pt-4 mb-0">
            <MDBBreadcrumb style={{ backgroundColor: "transparent" }} >
                <MDBBreadcrumbItem >
                    <Link to="/" className="text-warning font-weight-bold"> Home </Link>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem className="text-capitalize">
                    <Link to={`/${productType.toLowerCase()}`} className="text-warning font-weight-bold">
                        {productType}
                    </Link>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem >
                    <Link to={`/${productType.toLowerCase()}/${productName.toLowerCase().replaceAll(/\s/g, '').replaceAll("/", "-")}`} className="text-warning font-weight-bold">
                        {productName}
                    </Link>
                </MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBContainer>
    );
};

function Description({ dataJson, product }) {
    // 1. Variable must be in a different function
    // 2. Variable must be in a different component
    // 3. Try to find patterns and replicate documentation
    // instead of creativity.
    // Because often only a particular pattern works 

    // Your natural program flow is not important
    // Documentation structure and flow is more important
    const { userPath } = useParams();
    /* DERIVED STATE FROM PROPS? NO NEED */
    let matches = false;
    let foundObject = {}
    /* DERIVED STATE FROM PROPS? */
    console.log({ userPath, product, dataJson })

    let urlNamePart;
    urlNamePart = dataJson[0].name.replaceAll(/\s/g, '').toLowerCase().replaceAll("/", "-");
    dataJson.forEach((value, index) => {
        urlNamePart = value.name.replace(/\s/g, '').toLowerCase();
        urlNamePart = urlNamePart.replaceAll("/", "-");
        if ((urlNamePart === userPath) && (!matches)) {
            foundObject = { ...value, index: `${index}` };
            matches = true;
        }
    });
    let productAd = "";
    if (product === "boots") {
        productAd = "Stylish boots| Great coomfort and support| Synthetic | Split grooves "
    }
    else if (product === "jerseys") {
        productAd = "Super-premium fabric| Lycra sleeves | Side Mesh | Silicon Elastic Bottom Grip| Customizable"
    }
    else {
        productAd = "Premium quality accessories| Exported from the best places"
    }
    let imageSrc, sentObject;
    if (matches) {
        imageSrc = `/assets/${product}/image${foundObject.index}.jpg`;
        sentObject = {
            name: foundObject.name,
            price: foundObject.price,
            imageSrc,
            type: product,
        }
    }
    else {
        imageSrc = ""
        sentObject = {}
    }
    /*
        name, price, imageSrc, type
        inputs: rate, size, quantity
    */
    let [cartStateToReducer, setCartStateToReducer] = useState({
        // INPUT
        rate: 0,
        size: (product === "accessories") ? "Standard" : "SM",
        quantity: 1
        // INPUT
    })

    let handleInputChange = (event) => {
        console.log({ product })

        const target = event.target;
        let value = target.value;
        value = (Object.is(parseInt(value), NaN)) ? value : parseInt(value);
        const name = target.name;
        if (name === "quantity" && (value === null || value === undefined)) {
            return;
        }
        else if (name === "quantity" && value < 0) {
            alert("Value can't be less than zero")
            return;
        }
        setCartStateToReducer({
            ...cartStateToReducer,
            [name]: value
        });
    }

    const dispatch = useDispatch();

    let addToCart = () => {
        if (cartStateToReducer.quantity > 0) {
            let totalItemPrice = parseInt(cartStateToReducer.quantity) * parseInt(sentObject.price.replace("€", ""))
            dispatch(setCart({ ...cartStateToReducer, ...sentObject, totalItemPrice }))
            alert("Added to cart.")
        }
        else {
            alert("Quantity can't be less than zero")
        }
    }
    useEffect(() => {
        // S0 CAN ACCESS ENTIRE PAGE
        let cartIcon = document.querySelector('.cart-icon')
        cartIcon.classList.add('glow-icon')
        window.setTimeout(() => {
            cartIcon.classList.remove('glow-icon')
        }, 3000)
    }, []);

    return (
        // Interpreter thinks that you return undefined and doesn't 
        // check your next line. That's the return operator thing.
        // Put your opened bracket on the same line with the return.
        <Fragment>
            {
                matches &&
                <          div style={{ marginTop: "-80px" }}
                >
                    <br />
                    <BreadcrumbPage productType={product} productName={foundObject.name} />
                    <MDBContainer className="pt-0">
                        <MDBRow style={{ marginTop: 0, paddingTop: 0 }} className="pt-0">
                            <MDBCol xs="12" lg="6" className="col-xs-12-imageWraper" >
                                <img src={`/assets/${product}/imageL${foundObject.index}.jpg`} alt={`${foundObject.name}`}
                                    className="description-img frame" style={{maxWidth: "80vw"}}
                                />
                            </MDBCol>
                            <MDBCol xs="12" lg="6">
                                <div className="special-font font-weight-bold">
                                    <h5 className="font-weight-bold ">
                                        {foundObject.name}
                                    </h5>
                                    <h5 className="font-weight-bold ">
                                        {foundObject.price}
                                    </h5>
                                    <div className="rate" onChange={(evt) => { handleInputChange(evt) }}>
                                        <input type="radio" id="star5" name="rate" value="5" />
                                        <label className="description-label" htmlFor="star5" title="text">5 stars</label>
                                        <input type="radio" id="star4" name="rate" value="4" />
                                        <label className="description-label" htmlFor="star4" title="text">4 stars</label>
                                        <input className="description-label" type="radio" id="star3" name="rate" value="3" />
                                        <label className="description-label" htmlFor="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" value="2" />
                                        <label className="description-label" htmlFor="star2" title="text">2 stars</label>
                                        <input type="radio" id="star1" name="rate" value="1" />
                                        <label className="description-label" htmlFor="star1" title="text">1 star</label>
                                    </div>
                                </div>
                                <hr className="description-label" />
                                <br />
                                <div className="special-font ">
                                    <p>
                                        Premium quality  {product}
                                    </p>
                                    <p> {productAd}</p>
                                    <br />
                                    <p className="text">
                                        Please cross-check your size with the size chart to ensure a good fit.
                                        <br />

                                    </p>
                                </div>

                                <br />
                                <table>
                                    <tbody >
                                        <tr className="mb-4">
                                            <td className="text-left ml-0 px-0">
                                                <span>SIZE: </span>
                                            </td>
                                            <td>
                                                {product !== "accessories" &&
                                                    <select className="form-control" style={{ width: "100px" }} onChange={(evt) => { handleInputChange(evt) }} name="size">
                                                        <option>SM</option>
                                                        <option>L</option>
                                                        <option>XL</option>
                                                        <option>XXL</option>
                                                    </select>
                                                }
                                                {product === "accessories" &&
                                                    <select className="form-control" style={{ width: "100px" }} onChange={(evt) => { handleInputChange(evt) }} name="size">
                                                        <option>Standard</option>
                                                    </select>
                                                }
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td className="text-left ml-0 px-0">
                                                <span>QUANTITY: </span>
                                            </td>
                                            <td>
                                                <input type="number" name="quantity" style={{ width: "100px" }} value={cartStateToReducer.quantity} className="form-control" onChange={(evt) => { handleInputChange(evt) }} />,
                                                {/* <MDBInput type="number" name="quantity" default={sentObject.qty} className="form-control" style={{ width: "80px" }} onChange={(evt) => { handleInputChange(evt) }} />, */}
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                                <br />
                                <br />
                                <MDBBtn outline color="amber" className="mx-auto" onClick={addToCart}>ADD TO CART</MDBBtn>

                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol >
                            </MDBCol>
                            <MDBCol xs="12" lg="6">
                                <i>
                                    Note: Your Product will be dispatched/ shipped within 7-10 days
                                </i>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>

            }

        </Fragment>
    )
}

export default Description
