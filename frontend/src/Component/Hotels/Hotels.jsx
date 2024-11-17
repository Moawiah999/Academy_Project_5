import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import axios from "axios";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotels`)
      .then((result) => {
        console.log(result.data.result);
        setHotels(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(hotels);
  return (
    <>
    {hotels.map((ele,i)=>{
        {console.log(ele.name)}
       return <h1>{ele.name}</h1>
    })}
      {/* <div>Hotels</div> */}
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/26/e5/9e/exterior.jpg?w=800&h=500&s=1"
        />
        <Card.Body>
          <Card.Title>Movenpick</Card.Title>
          <Card.Text>price</Card.Text>
          <Button variant="primary">See More</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Hotels;
