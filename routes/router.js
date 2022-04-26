const express = require('express');
const router = express.Router();
const authenticate = require('../common/auth_middleware');
const upload = require('../common/upload_middleware');
const constants = require('../common/constants');


/**
* @swagger
* tags:
*   name: General API
*   description: The General API
*/

/**
* @swagger
* /:
*   get:
*     summary: Home page
*     tags: [General API]
*     responses:
*       200:
*         description: Home page
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/',(req,res)=>{
    res.send("HELLO!");
});


/**
* @swagger
* /upload:
*  post:
*     summary: Upload an image
*     tags: [General API]
*     requestBody:
*        required: true
*        content:
*           multipart/form-data:
*            schema:
*               type: object
*               properties:
*                   file:
*                       type: string
*                       format: binary
*     responses:
*       200:
*         description: Image has been uploaded
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.post('/upload',authenticate([constants.USER,constants.CLIENT]),upload.single('file'),(req,res)=>{                                                                     
    console.log(req)
    res.status(200).send({
        url: process.env.SERVER_URL +"/"+req.file.path.replace(/\\/g, "/")
    });
})


/**
* @swagger
* /download/{imageName}:
*   get:
*     summary: Download an image
*     tags: [General API]
*     parameters:
*       - in: path
*         name: imageName
*         schema:
*           type: string
*         required: true
*         description: The image name
*     responses:
*       200:
*         description: Logo image in PNG format
*         content:
*            image/png:
*              schema:
*                type: string
*                format: binary
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/download/:image',authenticate([constants.CLIENT]),(req,res)=>{
    res.download(constants.STORAGE_PATH+req.params.image);
});                                                               
module.exports = router;                                              