const db = require("../models/db");

//create tour packages

const createTourPackages = async (req, res) => {
  // const user_id = req.token.user_id;
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
    image_url,is_deleted) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,0) RETURNING *`;

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

      result: result.rows,
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
const updateTourPackage = async (req, res) => {
  const tour_packages_id = req.params.tour_packages_id;

  const {
    name,
    destination,
    duration_days,
    start_date,
    end_date,
    hotel_name,
    description,
    price,
    image_url,
  } = req.body;
  const query = `
    UPDATE tour_packages 
    SET 
      name = $1,
      destination = $2,
      duration_days = $3,
      start_date = $4,
      end_date = $5,
      hotel_name = $6,
      description = $7,
      price = $8,
      image_url = $9
    WHERE tour_packages_id = $10
    RETURNING *;
  `;

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
    tour_packages_id,
  ];

  try {
    const result = await db.query(query, values);
    res.status(200).json({ success: true, message: "Update successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error.message,
    });
  }
};
//This function delete tour By id
const deletedById = async (req, res) => {
  const tour_packages_id = req.params.tour_packages_id;
  const query = `DELETE FROM tour_packages WHERE tour_packages_id = $1 RETURNING * `;
  const values = tour_packages_id;
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

module.exports = {
  createTourPackages,
  getAllTourPakages,
  updateTourPackage,
  deletedById,
};
