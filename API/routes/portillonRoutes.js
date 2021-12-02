var portillonService = require('../services/portillonService')
const router = require("express").Router();


//GET ALL
router.route("/getPortillons").get(async (req, res) => {    
    await portillonService.getAllPortillons()
    .then((data) => {
        res.status(200).json({
            success: true,
            datas: data,
        });
    })
    .catch((data) => {
        res.status(500).json({
            success: false,
            datas: data,
        });        
    })
});


//GET BY ID
router.route("/getPortillon/:id").get(async (req, res) => {    
    await portillonService.getPortillonById(req.params.id)
    .then((data) => {
        res.status(200).json({
            success: true,
            datas: data,
        });
    })
    .catch((data) => {
        res.status(500).json({
            success: false,
            datas: data,
        });        
    })
});


//POST
router.route("/addPortillon").post(async (req, res) => {    
    await portillonService.addPortillon(req.body)
    .then((data) => {
        res.status(201).json({
            success: true,
            datas: data,
        });
    })
    .catch((data) => {
        res.status(500).json({
            success: false,
            datas: data,
        });        
    })
});


//DELETE
router.route("/deletePortillon/:id").delete(async (req, res) => {    
    await portillonService.deletePortillon(req.params.id)
    .then((data) => {
        res.status(200).json({
            success: true,
            datas: data,
        });
    })
    .catch((data) => {
        res.status(500).json({
            success: false,
            datas: data,
        });        
    })
});


//PUT
router.route("/editPortillon/:id").put(async (req, res) => {    
    await portillonService.editPortillon(req.params.id, req.body)
    .then((data) => {
        res.status(200).json({
            success: true,
            datas: data,
        });
    })
    .catch((data) => {
        res.status(500).json({
            success: false,
            datas: data,
        });        
    })
});

//Inscription au portillon
router.route("/inscriptionPortillon/:id/:uuid").get(async (req, res) => {    
    await portillonService.inscriptionPortillon(req.params.id, req.params.uuid)
    .then((data) => {
        res.status(200).json({
            success: true,
            datas: data,
        });
    })
    .catch((data) => {
        res.status(500).json({
            success: false,
            datas: data,
        });        
    })
});


module.exports = router;