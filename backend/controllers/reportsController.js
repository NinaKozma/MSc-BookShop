import expressAsyncHandler from 'express-async-handler';
import MongoClient from 'mongodb';

const getReports = expressAsyncHandler(async (req, res) => {
  var url = process.env.MONGO_URI;
  MongoClient.connect(url, function (connectToDbError, db) {
    if (connectToDbError) throw connectToDbError;
    var dbo = db.db('bookshop');
    dbo
      .collection('reports')
      .find({})
      .toArray(function (collectionLoadError, result) {
        if (collectionLoadError) throw collectionLoadError;
        res.json(result);
        db.close();
      });
  });
});

export { getReports };
