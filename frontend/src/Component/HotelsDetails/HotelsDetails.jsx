import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./HotelsDetails.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const HotelsDetails = () => {
  const [hotelDetails, setHotelDetails] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [hotelPayment, setHotelPayment] = useState(false);
  const [chosenHotel, setChosenHotel] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/hotels/")
      .then((result) => {
        console.log(result.data.result);
        setHotelDetails(result.data.result);
        // console.log("ahmad", hotelDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const bookNow = (hotels) => {
    setSelectedHotel(hotels);
    setShowDetail(true);
  };
  return (
    <>
      {/* <div>HotelsDetails</div> */}
      <div className="slider">
        <Carousel className="slider">
          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="First slide"
              // className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Second slide"
              // className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=400"
              // className="d-block w-100"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <>
        {/*  {hotelDetails.map((ele, i) => {
          return (
            <>
            <div>
              
              <Card style={{ width: "18rem", display: "grid" }}>
                <Card.Img variant="top" src={ele.image_url} />
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  <Card.Text>
                    <h3>{ele.location}</h3>
                    <h3>{ele.price_per_night} $</h3>
                  </Card.Text>
                  <Button variant="primary">Book Now</Button>
                </Card.Body>
              </Card>
            </div> 
             
            </>
            
          );
        })} */}
        <Row
          xs={3}
          md={3}
          className="g-4"
          style={({ margin: "15px" }, { padding: "10px" })}
        >
          {hotelDetails.map((ele, i) => (
            <Col key={i}>
              <Card className="card">
                <Card.Img className="img2" variant="top" src={ele.image_url} />
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  <Card.Text>
                    <h4>{ele.price_per_night} $</h4>
                    <h4>City : {ele.location}</h4>
                  </Card.Text>
                  <Button variant="primary">Book Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    </>
  );
};

export default HotelsDetails;