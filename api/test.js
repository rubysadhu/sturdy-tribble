module.exports = ( req, res ) => {
  const order_id = req.query.order_id
  res.json({result: order_id})
};
