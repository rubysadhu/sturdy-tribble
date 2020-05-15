module.exports = ( req, res ) => {
  console.log(req.query)
  res.json({result: req.query})
};
