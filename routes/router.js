const express = require('express');
const router = express.Router();
const authenticate = require('../common/auth_middleware');
const upload = require('../common/upload_middleware');
const constants = require('../common/constants');
const helpers = require('../common/helpers');
const fs = require('fs');
const mime = require('mime');
const path = require('path');
const {v1:uuidv1,v4:uuidv4} = require('uuid');


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
*     summary: Welcome to Poll-It
*     tags: [General API]
*     responses:
*       200:
*         description: Welcome to Poll-It
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*       500:
*         description:  Internal Server Error
*/

router.get('/', (req, res) => {
    return res.status(200).send("Welcome to Poll-It");
});


/**
* @swagger
* /upload:
*  post:
*     summary: Upload an image
*     description: "Roles: [User, Client]"
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
*       500:
*         description:  Internal Server Error
*/

router.post('/upload', authenticate([constants.USER, constants.CLIENT, constants.ADMIN]), upload.single('file'), (req, res) => {
    if (!req.file) return helpers.sendError(res, 400, "No file chosen");
    else return res.status(200).send({url: process.env.DOMAIN_URL + "/" + req.file.path.replace(/\\/g, "/")});
})


router.post('/uploadBase64', authenticate([constants.USER, constants.CLIENT, constants.ADMIN]), (req, res) => {
    var matches = req.body.file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches) return helpers.sendError(res, 400, "Invalid input")
    response = {};
    if (matches.length !== 3) return helpers.sendError(res, 400, "Invalid input")
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = uuidv4() +'.'+ extension;
    fs.writeFileSync(path.join(constants.STORAGE_PATH,fileName),imageBuffer,"utf8")
    return res.status(200).send({url: process.env.DOMAIN_URL + "/" + constants.STORAGE_PATH+fileName});
})


/**
* @swagger
* /download/{imageName}:
*   get:
*     summary: Download an image
*     description: "Roles: [Client]"
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
*         description: Image has been downloaded
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*       500:
*         description:  Internal Server Error
*/

router.get('/download/:image', authenticate([constants.CLIENT, constants.ADMIN]), (req, res) => {
    if (!fs.existsSync(constants.STORAGE_PATH + req.params.image)) return helpers.sendError(res, 400, "File is not exists")
    else return res.download(constants.STORAGE_PATH + req.params.image);
});
module.exports = router;                                              