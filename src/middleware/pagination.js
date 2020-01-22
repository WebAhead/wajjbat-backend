// the file name might be a bit misleading, all that im doing
// here is set req.pagination to have the offset and the limit
// and set the response header

export default (req, res, next) => {
  // set the response header for CORS
  // https://github.com/marmelab/react-admin/blob/master/packages/ra-data-simple-rest/README.md#rest-dialect
  res.append('Access-Control-Expose-Headers', 'Content-Range');

  const [offset, max] = JSON.parse(req.query.range);

  const limit = max - offset + 1;

  req.pagination = {
    offset,
    limit,
    max
  };

  next();
};
