const aws = require('aws-sdk')
const { AppConfig } = require('aws-sdk');
const validator = require("../middleware/validation")
const mongoose = require('mongoose')
const productModel = require('../models/productModel')

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}



//==============================================-: CREATE PRODUCT:-================================================================


aws.config.update({
    accessKeyId: "AKIAY3L35MCRUJ6WPO6J",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile = async(file) => {
    return new Promise(function(resolve, reject) {
        // this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws

        var uploadParams = {
<<<<<<< HEAD
            ACL: "public-read",
            Bucket: "classroom-training-bucket", //HERE
=======
            ACL: "public-read",//public access
            Bucket: "classroom-training-bucket",   //HERE
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
            Key: "abc/" + file.originalname, //HERE 
            Body: file.buffer
        }


        s3.upload(uploadParams, function(err, body) {
            if (err) {
                console.log(err)
                return reject({ "error": err })
            }
            console.log(body)
            console.log("file uploaded succesfully")
            return resolve(body.Location)
        })

    })
}


const createProduct = async function(req, res) {
    try {

        let reqBody = req.body
        //req body check
        if (Object.keys(reqBody).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }
        //destracture
        const { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments } = reqBody

        //validation start
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, msg: "title is required" })
        }
<<<<<<< HEAD
=======
        //uniqe valid...
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        let checkTitle = await productModel.findOne({ title: title })
        if (checkTitle) {
            return res.status(400).send({ status: false, msg: "title already exist" })
        }
        if (!validator.isValid(description)) {
            return res.status(400).send({ status: false, msg: "description is required" })
        }

        if (!validator.isValid(price)) {
            return res.status(400).send({ status: false, msg: "price is required" })
        }
        //price must be >=0
        if (price <= 0) {
            return res.status(400).send({ status: false, message: `Price should be a valid number` })
        }
        if (!validator.isValid(currencyId)) {
            return res.status(400).send({ status: false, msg: "currencyId is required" })
        }
        //currency must be 'INR'
        if (currencyId !== 'INR') return res.status(400).send({ status: false, msg: "currencyId should be 'INR'" })

        if (!validator.isValid(currencyFormat)) {
            return res.status(400).send({ status: false, msg: "currencyFormat is required" })
        }
<<<<<<< HEAD

=======
        //geting the file 
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        let files = req.files

        if (files && files.length > 0) {
            //upload filse in aws s3
            var productUrl = await uploadFile(files[0]);
            console.log(productUrl)
        } else {
            return res.status(400).send({ msg: "No file found" })
        }
        //for valid enum
        if (availableSizes) {
            let array = availableSizes.split(",").map(x => x.trim())
            console.log(array)
            for (let i = 0; i < array.length; i++) {
                if (!(["S", "XS", "M", "X", "L", "XXL", "XL"].includes(array[i]))) {
                    return res.status(400).send({ status: false, message: `Available Sizes must be among ${["S", "XS", "M", "X", "L", "XXL", "XL"]}` })
                }
            }
        }

        if (!validator.validInstallment(installments)) {
            return res.status(400).send({ status: false, msg: "installments can't be a decimal number & must be greater than equalto zero " })
        }

<<<<<<< HEAD

        let filterBody = { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments }
        filterBody.productImage = productUrl
        console.log(productUrl)
        let productCreated = await productModel.create(filterBody)
        res.status(201).send({ status: true, productCreated })
    } catch (err) {
=======
        //save all key data
        let filterBody = { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments }
        filterBody.productImage = productUrl
        console.log(productUrl)
        //successfully created product
        let productCreated = await productModel.create(filterBody)
        res.status(201).send({ status: true, data: productCreated })
    }
    catch (err) {
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//===============================  Get Poduct By Id============================

const getProduct = async function(req, res) {
    try {
        //userid from path=======
        const product_id = req.params.productId;

        //id validation====

        if (!isValidObjectId(product_id)) {
            return res.status(400).send({ status: false, message: `This ${product_id} is invalid productId` });
        }


        const product = await productModel.findOne({ _id: product_id, isDeleted: false })
<<<<<<< HEAD
            // product not found===
=======
        // product not found===
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        if (!product) {
            return res.status(404).send({ status: false, message: "Product not found" });
        }
        //return product in response==
        return res.status(200).send({ status: true, data: product });


<<<<<<< HEAD
    } catch (error) {
=======
    }
    catch (error) {
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        res.status(500).send({ status: false, msg: error.message })
    }

}

//=============================================================================================================

const productByQuery = async function(req, res) {
    try {
        // from Query to QuryParams
<<<<<<< HEAD
        const queryParams = req.query

        // Existence of product=====
        let productExist = await productModel.find({ queryParams, isDeleted: false })
=======
      const{size, name, price} = req.query
      console.log(req.query)
    // Existence of product=====
    queryParams={};
    if("size" in req.query){

        let array = size.split(",").map(x => x.trim())

        for (let i = 0; i < array.length; i++) {
            if (!(["S", "XS", "M", "X", "L", "XXL", "XL"].includes(array[i]))) {
                return res.status(400).send({ status: false, message: `Available Sizes must be among ${["S", "XS", "M", "X", "L", "XXL", "XL"]}` })
            }
        }  
        
        queryParams["availableSizes"]= size
    }
    if("name" in req.query){

        if(!validator.isValid(name)){
            return res.status(400).send({status:false,message:"name is required"})
        }
      queryParams["title"] = name
    }
    if("price" in req.query){
        if (price <= 0) {
            return res.status(400).send({ status: false, message: `Price should be a valid number` })
        }
        queryParams["price"]= price
    }

        let productExist = await productModel.find({queryParams, isDeleted: false })
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        if (productExist.length == 0) {
            return res.status(404).send({ status: false, message: "there is no product" })
        }
        // sort by price in product collection.==========
        const products = await productModel.find({ $and: [queryParams, { isDeleted: false }] }).sort({ price: 1 })
        res.status(200).send({ status: true, data: products });


<<<<<<< HEAD
    } catch (error) {
=======
    }
    catch (error) {
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        res.status(500).send({ status: false, msg: error.message })
    }

}

// ==============================================================================================================
const updateProduct = async function(req, res) {
    try {

        let product_id = req.params.productId

        //id format validation
        if (!isValidObjectId(product_id)) {
            return res.status(400).send({ status: false, message: "Invalid productId" });
        }

<<<<<<< HEAD
        //fetch product using productId
        const product = await productModel.findOne({
            $and: [{ product_id }, { isDeleted: false }],
        });
=======
        // //fetch product using productId
        const product = await productModel.findOne({ $and: [{ _id:product_id }, { isDeleted: false }], });
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
        if (!product) {
            return res.status(404).send({ status: true, data: "product not found" });
        }

        //reading updates
        let updates = req.body
         let upData = {};
        const { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage, style, availableSizes, installments } = updates

        if("title" in updates) {
            if (!validator.isValid(title)) {
                return res.status(400).send({ status: false, msg: "title is required" })
            }
             upData["title"] = title
             
            //check uniqueness of product title
            const uniqueTitle = await productModel.findOne({title:title});

            if (uniqueTitle) {
                return res.status(400).send({ status: false, message: `${title} already exist` });
            }
           
        }

        if (description) {
            if (!validator.isValid(description)) {
                return res.status(400).send({ status: false, msg: "description is required" })
            }
        }
        if (price) {
            if (!validator.isValid(price)) {
                return res.status(400).send({ status: false, msg: "price is required" })
            }
        }
        if (currencyId) {
            if (!validator.isValid(currencyId)) {
                return res.status(400).send({ status: false, msg: "currencyId is required" })
            }
        }
        if (currencyFormat) {
            if (!validator.isValid(currencyFormat)) {
                return res.status(400).send({ status: false, msg: "currencyFormat is required" })
            }
        }
        if (isFreeShipping) {
            if (!validator.isValid(isFreeShipping)) {
                return res.status(400).send({ status: false, msg: "isFreeShipping is required" })
            }
        }
        if (productImage) {
            if (!validator.isValid(productImage)) {
                return res.status(400).send({ status: false, msg: "productImage is required" })
            }
        }
        if(style){
            if (!validator.isValid(style)) {
                return res.status(400).send({ status: false, msg: "style is required" })
            }
        }
        if (availableSizes) {
            if (!validator.isValid(availableSizes)) {
                return res.status(400).send({ status: false, msg: "availableSizes is required" })
            }
        }
        if (installments) {
            if (!validator.isValid(installments)) {
                return res.status(400).send({ status: false, msg: "installments is required" })
            }
        }



        let files = req.files
        if (files && files.length > 0) {
            var productUrl = await uploadFile(files[0])
        } 
        // else {
        //     return res.status(400).send({ msg: "No files found" })
        // }
        
        updates.productImage = productUrl

        let productUpdated = await productModel.findOneAndUpdate({ _id: product_id ,  isDeleted: false } ,{$set:updates}, { new: true })
        res.status(200).send({ status: true, message: "Product updated", date: productUpdated })



    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

<<<<<<< HEAD
module.exports = { updateProduct, getProduct, productByQuery, createProduct }
=======
const deleteProduct = async function (req, res) {
    try {
        let id = req.params.productId

         //id format validation
         if (!isValidObjectId(id)) {
            return res.status(400).send({ status: false, message: "Invalid productId" });
        }

        //check if the document is found with that Product id and check if it already deleted or not
        let verification = await productModel.findById(id)
        if (!verification) {
            return res.status(404).send({ Status: false, msg: "Document Not Found" })
        }
        if (verification.isDeleted === true) {
            return res.status(400).send({ Status: false, msg: "Document already deleted" })
        }
        //secussfully deleted Product data
        else {
            let FinalResult = await productModel.findByIdAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() }, { new: true })
            return res.status(200).send({ Status: true, message: " Successfully deleted the Product "})
        }
    }
    catch (err) {
        return res.status(500).send({ Status: false, msg: "Error", error: err.message })
    }
}

module.exports = { updateProduct, getProduct, productByQuery, createProduct, deleteProduct }
>>>>>>> eebf378e8981a36039a5994ec7552497b7269e1e
