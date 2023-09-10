//Error middleware - resurs ne postoji
//Niti je objectID dobro formatiran
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//Error middleware - bilo koji tip greske...
const errorHandler = (err, req, res, next) => {
  //kada dobijemo da je status 200, iako je u pitanju greska...
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  //odgovor ce biti json object
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
