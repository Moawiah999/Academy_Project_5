const db = require("../models/db");

//create tour packages

const createTourPackages = async (req, res) => {
  const {
    name,
    destination,
    duration_days,
    start_date,
    end_date,
    hotel_name,
    price,
    description,
    image_url,
  } = req.body;

  const query = `INSERT INTO tour_packages (
    name,
    destination,
    duration_days,
    start_date,
    end_date,
    hotel_name,
    description,
    price,
    image_url,is_deleted) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,9,0) RETURNING *`;

  const values = [
    name,
    destination,
    duration_days,
    start_date,
    end_date,
    hotel_name,
    description,
    price,
    image_url,
  ];

  try {
    const result = await db.query(query, values);
    res.status(200).json({ success: true, result: result.rows });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, error: error });
  }
};
//the get all tour packeges
const getAllTourPakages = async (req, res) => {
  const query = `SELECT  * FROM tour_packages `;

  try {
    const result = await db.query(query);
    res.status(201).json({
      success: true,

      message: "All the tour packages",

      TourPakages: [result.rows],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,

      message: "Server error",

      err: error,
    });
  }
};

//add put to Admin
//This function delete tour By id 

const deletedById = async (req, res) => {
  const tour_packages_id = req.params.tour_packages_id;
  const query = `DELETE FROM tour_packages WHERE tour_packages_id = $1 RETURNING * `;
  const values = [tour_packages_id];

  try {
    const result = await db.query(query, values);
    res.status(200).json({
      success: true,
      message: `deleted is sucsessfully ${tour_packages_id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

module.exports = { createTourPackages, getAllTourPakages, deletedById };
