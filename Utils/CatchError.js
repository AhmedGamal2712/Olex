 
exports.catch_Error = (res, error) => {
    console.log({catchError: error});
    return res.status(500).json({
      message: 'Internal Server Error',
      error
    });
};