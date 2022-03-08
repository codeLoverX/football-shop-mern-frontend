import React, { useState, Fragment, useEffect } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTooltip, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBCollapse, MDBIcon } from "mdbreact";
import { useDispatch } from "react-redux";
import {  setIndexQuantity, setDeleteQuantity, fetchCart } from "./CartSlice";
import { useHistory } from "react-router";

// name, price, imageSrc, type
// inputs: rate, size, quantity


export default function Cart() {
  /*
          name, price, imageSrc, type
          inputs: rate, size, quantity
      */


  let [data, setData] = useState({ products: [], description: [] });
  let [collapse, setCollapse] = useState(Array(data.length).fill(false));
  let toggleCollapse = index => () => {
    console.log(collapse[index])
    setCollapse((prev) => {
      let newCollapse = [...prev]
      newCollapse[index] = !prev[index]
      return newCollapse
    })
  }
  const dispatch = useDispatch();
  const history = useHistory();
  let columns = [
    {
      label: '',
      field: 'imageSrc',
    },
    {
      label: <strong>Cart</strong>,
      field: 'name'
    },
    {
      label: <strong>Size</strong>,
      field: 'size'
    },
    {
      label: <strong>Price</strong>,
      field: 'price'
    },
    {
      label: <strong>Quantity</strong>,
      field: 'quantity'
    },
    {
      label: <strong>Amount</strong>,
      field: 'amount'
    },
    {
      label: '',
      field: 'button'
    }
  ]

  let total = 0;
  let rows = []

  function roundToTwo(num) {
    let string = num.toString()
    let position = string.indexOf('.')
    return (string.slice(0, position) + string.slice(position, position + 3))
  }

  data.products.forEach((value, index) => {
    let totalPrice = 0
    console.log(parseInt(value.price))
    totalPrice = data.description[index].quantity * value.price
    totalPrice = totalPrice
    total += totalPrice
    rows.push(
      {
        'imageSrc': <img src={`/assets/${value.type}/${value.image}`} alt="" style={{ width: "50px" }} />,
        'name': <strong> {value.name}</strong>,
        'size': <strong> {data.description[index].size} </strong>,
        'price': <strong> {roundToTwo(value.price)} </strong>,
        'quantity':
          <input type="number" name="quantity" value={data.description[index].quantity} className="form-control" style={{ width: "100px" }} onChange={(evt) => { handleInputChange(evt, index) }} />,
        'amount': <strong>${totalPrice}</strong>,
        'button':
          <MDBTooltip placement="top">
            <MDBBtn outline color="amber" size="sm" onClick={() => { deleteCart(index) }}>
              X
            </MDBBtn>
            <div>Remove item</div>
          </MDBTooltip>
      }
    )
  });
  total= roundToTwo(total)

  useEffect(() => {
    // fetch Data
    async function fetchData() {
      const originalPromiseResult = await dispatch(fetchCart()).unwrap()
      console.log({ okay: originalPromiseResult.cart })
      if (originalPromiseResult.cart)
        setData(originalPromiseResult.cart)
    }

    let controller = new AbortController();
    try {
      fetchData()
    } catch (rejectedValueOrSerializedError) {
      console.log({ failed: rejectedValueOrSerializedError })
    }
    return () => {

      controller?.abort();

    }
  }, [data.length])
  let handleInputChange = (event, index) => {
    let value = event.target.value;
    value = parseInt(value)
    index = parseInt(index)
    if (value <= 0) {
      alert("value cannot be less than zero");
    }
    else {
      dispatch(setIndexQuantity({ index, value }))
      setData((prevData) => {
        return prevData.map((val, idx) => {
          if (idx === index) {
            return { ...val, quantity: value }
          }
          else {
            return val
          }
        })
      })
    }
  }
  let checkOut = () => {
    if (rows.length === 0) {
      alert("Purchase an item first!");
    }
    else {
      history.replace("/checkOut")
    }
  }

  let deleteCart = (index) => {
    dispatch(setDeleteQuantity(index))
    setData((prevData) => {
      return prevData.filter((val, idx) => {
        return idx !== index
      })
    })
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <MDBRow className="my-5" center>
        <MDBCard style={{ marginTop: "50px" }}>
          <MDBCardBody>

            {/* Table */}

            <MDBTable className="product-table d-none d-md-table">
              <MDBTableHead className="font-weight-bold cart" color="mdb-color lighten-5" columns={columns} />
              <MDBTableBody rows={rows} />
            </MDBTable>

            {/* Table */}
            <div className="px-1">
              {
                rows.map((val, index) => {
                  console.log(val.imageSrc)
                  return (
                    <Fragment key={`${val}${index}}`} >
                      <div onClick={toggleCollapse(index)} className="d-grid d-md-none w-80 special-width"
                        style={{
                          display: "grid ", gridTemplateColumns: "0.5fr 1fr 3fr 1fr", justifyContent: "center",
                          alignItems: "center"

                        }}
                      >
                        <span
                        ><
                            MDBIcon icon="angle-down" />
                        </span>
                        <span>
                          {val.imageSrc}
                        </span>
                        <span className="special-big-text">
                          {val.name}
                        </span>
                        <div
                          className="mx-auto"
                        >
                          <MDBIcon far icon="times-circle" />
                        </div>
                      </div>
                      <MDBCollapse id="basicCollapse" isOpen={collapse[index]} className="pt-4">

                        <strong> Size: {val.size} </strong>
                        <br />
                        <strong> Price: {val.price} </strong>
                        <br />
                        <strong> Quantity {val.quantity} </strong>
                        <br />
                        <strong> ${val.totalItemPrice}</strong>

                      </MDBCollapse>
                    </Fragment>
                  )
                }
                )
              }
            </div>
            {
              rows.length === 0 &&
              <div style={{ textAlign: "center" }}>
                Added nothing to cart !
              </div>

            }
            {
              rows.length !== 0 &&
              <div className="d-flex justify-content-end pt-5">
                <span>TOTAL &nbsp;</span>
                <span>{total}</span>
              </div>
            }
          </MDBCardBody>





          <MDBCardBody>
            <div className="mb-3">
              <div className="pt-1">
                <p className="text-amber lighten-1 mb-0"><i className="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
                  items to your cart does not mean booking them.</p>
                {/* <Redirect to="/checkOut"> */}
                <div className="mb-3">
                  <MDBBtn onClick={checkOut} outline color="amber lighten-1">Check Out</MDBBtn>
                </div>
                {/* </Redirect> */}
              </div>
            </div>

            <div className="mb-3">
              <div className="pt-2">
                <p className="mb-1">We accept the following payment methods:</p>
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa" />
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express" />
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard" />
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                  alt="PayPal acceptance mark" />
              </div>
            </div>


          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </div >
  );
}


