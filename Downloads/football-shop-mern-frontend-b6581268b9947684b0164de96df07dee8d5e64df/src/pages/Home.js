import React from 'react'
import "./Home.css"
import { Carousel, CarouselComponent } from '../components/Carousel'
import RonaldoImg from "../assets/Ronaldo.jpg"
import BeastImg from "../assets/Beast.jpg"
import HeartbreakImg from "../assets/Heartbreak.jpg"
import RealMadridImg from "../assets/RealMadrid.jpg"

import Nike from "../assets/Nike.png"
import Puma from "../assets/Puma.png"
import NewBalance from "../assets/NewBalance.png"
import Charly from "../assets/Charly.png"
import KwikGoal from "../assets/KwikGoal.png"
import Adidas from "../assets/Adidas.png"

import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import Overlay from '../components/Overlay'
import BootsImg from "../assets/Boots.jpg"
import JerseyImg from "../assets/Jerseys.jpg"
import AccessoriesImg from "../assets/Accessories.jpg"
import { Link } from 'react-router-dom'


function Home() {

    return (
        <div>
            <Carousel numberOfSlides={4} >
                <CarouselComponent image={RonaldoImg} alt="Ronaldo" >
                    <h1 className="font-weight-bold text-white text-uppercase font-myfirstFont">Age doesn't matter</h1>
                </CarouselComponent>
                <CarouselComponent image={BeastImg} alt="Traore" className="d-none" >
                    <h1 className="font-weight-bold text-warning text-uppercase font-myfirstFont">Beast unleashed</h1>
                </CarouselComponent>
                <CarouselComponent image={HeartbreakImg} alt="Dembele" className="d-none" >
                    <h1 className="font-weight-bold text-warning text-uppercase font-myfirstFont">Never say "Die!"</h1>
                </CarouselComponent>
                <CarouselComponent image={RealMadridImg} alt="Ronaldo" className="d-none" >
                    <h1 className="font-weight-bold text-dark text-uppercase font-myfirstFont">Real Madrid wins again...</h1>
                </CarouselComponent>
            </Carousel>
            <MDBContainer>
                <h1 className="text-center mb-2 mt-5">Categories</h1>
                <MDBRow>

                    <MDBCol lg="4" className="px-0">
                        <Link to="/jerseys">
                            <Overlay imgSrc={JerseyImg} alt="jerseys" >
                                <p>Jerseys</p>
                            </Overlay>
                        </Link>
                    </MDBCol>

                    <MDBCol lg="4">
                        <Link to="/boots">
                            <Overlay imgSrc={BootsImg} alt="boots" >
                                <p>Boots</p>
                            </Overlay>
                        </Link>
                    </MDBCol>

                    <MDBCol lg="4">
                        <Link to="/accessories">
                            <Overlay imgSrc={AccessoriesImg} alt="accessories" >
                                <p>Accessories</p>
                            </Overlay>
                        </Link>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>


                <h1 class="brand-title-display2 font-myfirstFont text-warning text-center mt-4 mb-1 mx-auto">WE HAVE YOUR BRAND</h1>

                <MDBRow className="mx-auto w-50">
                    <div className="gridNew">
                        <img style={{maxWidth: "100%"}} src={Nike} alt="Nike Logo" />
                        <img style={{maxWidth: "100%"}} src={KwikGoal} alt="KwikGoal Logo" />
                        <img style={{maxWidth: "100%"}} src={Puma} alt="Puma Logo" />
                        <img style={{maxWidth: "100%"}} src={Charly} alt="Charly Logo" />
                        <img style={{maxWidth: "100%"}} className="align-middle" src={Adidas} alt="Adidas Logo" />
                        <img style={{maxWidth: "100%"}} className="align-middle" src={NewBalance} alt="NewBalance Logo" />
                    </div>
                </MDBRow>

            <br />
            <br />
        </div >

    )
}

export default Home
