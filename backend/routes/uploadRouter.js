import path from 'path'; //trebalo mi zbog extenzija
import express from 'express';
import multer from 'multer'; //middleware za uploadovanje slika
const uploadRouter = express.Router();

//Inicijalizacija storage engine-a
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); //ovo null oznacava da nema greske; drugi parametar je mesto gde ce se cuvati slike
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      //nazivu slike dodajemo vreme kako ne bismo imali dve slike sa istim imenom, takodje dodajemo odgovarajucu extenziju
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  ); //vrata true ili false
  const mimetype = filetypes.test(file.mimetype); //vraca true ili false

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// /uploads/image-datum.extension
uploadRouter.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
