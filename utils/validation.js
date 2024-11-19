const { body, validationResult } = require("express-validator")

const validateTemple = [
    body("temple_id").notEmpty().withMessage("Temple ID is required.").isInt().withMessage("Temple ID must be an integer."),
    body("name").trim().escape().notEmpty().withMessage("Temple name is required"),
    body("location").trim().escape().notEmpty().withMessage("Temple location is required"),
    body("dedicated").trim().escape().notEmpty().withMessage("Temple dedicated date is required")
]

const handleValidation = (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    next()
}

module.exports = {
    validateTemple,
    handleValidation
}