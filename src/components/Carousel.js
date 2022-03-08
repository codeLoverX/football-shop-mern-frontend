import React, { useState, useEffect } from "react";
import "../components/Carousel.css"

// previousCount= (prevCount + 1) % numberOfSlides

// children is a special prop
export function CarouselComponent({ image, children, alt }) {
    return (
        <div className="imageWrapper">
            <img src={image} alt={alt} />
            <div className="textCarousel text-center text-light">
                {children}
            </div>
        </div>);
}

// Everything must be stateful
export function Carousel({ numberOfSlides, children }) {

    const [count, setCount] = useState(0);

    // Cannot create and delete timeouts

    // let [timer, setTimer] = useState(null);

    // let start = () => {
    // setTimer(setInterval(() => { counter() }, time));
    // }

    // let stop = () => {
    // clearInterval(timer)
    // setTimer(null)
    // }

    useEffect(() => {
        // 1. CODE MUST RUN ONLY ONCE. so inside useeefect
        // 2. TO clear interval, do this:
        //    callFunction()
        //    v/s
        //    let functionXYZ= callFunction()
        //    clearInterval(functionXYZ)  ---> clear a stored call of the function 
        const counter = setInterval(() => {
            setCount(prevCounter => {
                return ((prevCounter + 1) % numberOfSlides);
            }
            );
        }, 3000);
        return () =>
            clearInterval(counter)
        // if (typeof changeWillPause==="number"){
        // }
    },
        // eslint-disable-next-line 
        []);

    useEffect(
        () => {
            (function loadImages() {
                const images = document.querySelectorAll("div.component__carousel div.imageWrapper");
                Array.from(images).forEach((value, index, array) => {
                    if (index === count) {
                        if (value.classList.contains("d-none")) {
                            array[index].classList.remove("d-none");
                        }
                    } else {
                        if (!value.classList.contains("d-none")) {
                            array[index].classList.add("d-none");
                        }
                    }
                });
            })();

        },
        // eslint-disable-next-line 
        [count]);

    return (

        <div className="component__carousel">

            {children}

           
        </div>
    );
}



