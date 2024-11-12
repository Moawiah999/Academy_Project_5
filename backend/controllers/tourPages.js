const db = require('../models/db');


const createTour_Packages = async (req,res)=>{
    const {name,destination,duration_days,start_date,end_date,price,description}  =  req.body;

    const query = `INSERT INTO tour_packages VALUES ($1,$2,$3,$4,$5,$6,$7,is_deleted = 0) RETURNING *`;

    const values = [name,destination,duration_days,start_date,end_date,price,description];

    try {
        const result = await db.query(query,values);
        res.status(200).json({success : true , result:result.rows});

    } catch (error) {
        console.log(error);

        res.status(500).json({success:false , error:error});
        
    }
}

module.exports = {createTour_Packages};
