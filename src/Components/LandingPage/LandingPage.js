import React from "react";
import { Carousel } from "antd";
import { Button } from 'antd';
import Carousel1 from "../../Images/CarouselImages/Carousel1.jpg"
import Carousel2 from "../../Images/CarouselImages/Carousel2.jpg"
import Carousel3 from "../../Images/CarouselImages/Carousel3.jpg"
import Carousel4 from "../../Images/CarouselImages/Carousel4.jpg"
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>        <div className="Carousel-Wrapper">
            <Carousel autoplay="{100}" dotPosition="bottom">
                <div>
                    <img src={Carousel1}></img>
                </div>
                <div>
                    <img src={Carousel2}></img>
                </div>
                <div>
                    <img src={Carousel3}></img>
                </div>
                <div>
                    <img src={Carousel4}></img>
                </div>
            </Carousel>
            <div className="Carousel-Caption">
                <h2>Restful Clinic</h2>
                <p>Быть здоровым — быть счастливым!</p>
            </div>
        </div>
        <div className="RoutesWrapper">

            <div className="RouteServicesWrapper">
                <Link to={"/Services"}>
                    <Button className="RouteServices">
                        <h2>Услуги</h2>
                    </Button> 
                </Link >
            </div>

            <div className="RouteDoctorsWrapper">
                <Link to={"/Doctors"}>
                    <Button className="RouteDoctors">
                        <h2>Доктора</h2>
                    </Button>
                </Link >
            </div>
        </div>
        </>
    );
}


export default LandingPage;