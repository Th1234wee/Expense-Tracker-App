import multer from 'multer';

const storage = multer.diskStorage({
    destination : (request,file,callback) => {
        callback(null,'./uploads');
    },
    filename : (request,file,callback) => {
        callback(null , Date.now() + '-' + file.originalname);
    }
    //filterFile -> (jpg,...)
    //fileSize -> 10MB
})

const upload = multer({
    storage : storage
});

export default upload;
