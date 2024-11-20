const db = require("../models");
const Temple = db.temples;
const mongoose = require("mongoose")

const apiKey =
  "Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N";

exports.create = async(req, res, next) => {
  try {
    // Create a Temple
    const temple = new Temple({
      temple_id: req.body.temple_id,
      name: req.body.name,
      dedicated: req.body.dedicated,
      location: req.body.location,
    });

    // Save Temple in the database
    const data = await temple.save()
    res.status(201).json(data)
    
    
  } catch (error) {
    next(error)
  }
}
exports.findAll = async (req, res, next) => {
  // #swagger.description = 'API Key if needed: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  try {
    const apiKeyHeader = req.header("apiKey")
    if (!apiKeyHeader) {
      return res.status(403).json({message: "Api Key is missing. Please read the documentation."})
    }

    if (apiKeyHeader === apiKey) {
      const result = await Temple.find(
        {},
        {
          temple_id: 1,
          name: 1,
          location: 1,
          dedicated: 1,
          additionalInfo: 1,
          _id: 0,
        }
      )
      if (result?.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({message: "No temple found"})
      }
    } else {
      return res.status(403).json({message: "Invalid API key.  Please read the documentation."})
    }
      
  } catch (error) {
    next(error)
  }
}

// Find a single Temple with an id
exports.findOne = async (req, res, next) => {
  // ##swagger.description = 'API Key if needed: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  try {
    const apiKeyHeader = req.header("apiKey")
    if (!apiKeyHeader) {
      return res.status(403).json({message: "API Key is missing.  Please read the documentation."})
    } 
    const temple_id = req.params.temple_id;
    if (!temple_id) {
      return res.status(400).json({message: "Temple ID is required."})
    }

    if (apiKeyHeader === apiKey) {
      const result = await Temple.find({ temple_id: temple_id })
        
      if (!result || result.length === 0) {
        return res.status(404).json({message: "Not found Temple with id " + temple_id})
        } else {
          return res.status(200).json(result[0])
        }
    } else {
      return res.status(403).json({message: "Invalid apiKey, please read the documentation."})
    }

  } catch (error) {
    next(error)
  }
};

// Update a Temple by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid ID format"})
    }

    const result = await Temple.findByIdAndUpdate(id, req.body, { new: true })

    if (!result) {
      return res.status(404).json({
        message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
      });
    } else {
      return res.status(200).json({ message: "Temple was updated successfully." })
    }

  } catch (error) {
    next(error)
  }
}

// Delete a Temple with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await Temple.findByIdAndRemove(id)
    if (!result) {
      return res.status(404).json({
        message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
      });
    }
    return res.status(204).send();

  } catch (error) {
    next(error)
  }
}

// Delete all Temples from the database.
exports.deleteAll = async (req, res, next) => {
  try {
    const result = await Temple.deleteMany({})

    if (result.deletedCount === 0) {
      return res.status(200).json({message: "No temple found to delete."})
    }
    return res.status(204).send();
  } catch (error) {
    next(error)
  }
};

// Find all published Temples
// exports.findAllPublished = (req, res) => {
//   Temple.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving temple.',
//       });
//     });
// };
