const errorHandler = (err, req, res, next) => {
    console.error(`Error occurred while executing ${req.method} ${req.originalUrl}`, err.stack);
    
    res.status(err.status || 500).json({
        error: true,
        message: `Error occurred while executing ${req.method} ${req.originalUrl}: ${err.message || "Internal Server Error"}`
    })
}

module.exports = errorHandler