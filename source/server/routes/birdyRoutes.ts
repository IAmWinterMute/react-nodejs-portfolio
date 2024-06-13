import axios from 'axios';
import express from 'express'
import path from 'path'
import contractGetGeoData from '../../sharedLayer/contracts/contractGetGeoData.js';
import { IGeolocation } from '../../sharedLayer/models/geolocation.js';
import { fileURLToPath } from 'url';
import requestIP from 'request-ip'
import contractGetBirdSightingData from '../../sharedLayer/contracts/contractGetBirdSightingData.js';
import { IBirdSighting } from '../../sharedLayer/models/birdSighting.js';
import contractGetBirdInfo from '../../sharedLayer/contracts/contractGetBirdInfo.js';


//The router & paths
let router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Bird info route
router.get('/api/birdySPA/birdsightings', (req, res) => {

    //Specifing the contract for this endpoint to force agreed upon response
    const contract = contractGetBirdSightingData({ latitude: Number(req.query.latitude.toString()), longitude: Number(req.query.longitude.toString()) })
    if (!contract.validate().valid) { return res.status(400).json(contract.validate().failReason) }

    //Getting bird sighting information from ebird
    axios.get<IBirdSighting[]>('https://api.ebird.org/v2/data/obs/geo/recent/?lat=' + contract.parameters.latitude + '&lng=' + contract.parameters.longitude, {
        headers: {
            'X-eBirdApiToken': process.env.EBIRD_API,
        }
    }).then(result => {
        return res.status(200).json(contract.response({ birdSightings: result.data }));
    }).catch(err => {
        console.log(err)
        return res.status(400).json("error")
    })

});

//Bird info route
router.get('/api/birdySPA/birdinformation', (req, res) => {

    //Specifing the contract for this endpoint to force agreed upon response
    const contract = contractGetBirdInfo({ sciName: req.query.sciName.toString() })
    if (!contract.validate().valid) { return res.status(400).json(contract.validate().failReason) }

    //Getting bird sighting information from ebird
    axios.get('https://nuthatch.lastelm.software/v2/birds?sciName=' + contract.parameters.sciName, { headers: { 'API-Key': process.env.NUTHATCH, } }).then(result => {
        if (result.data?.entities[0] != null) {
            return res.status(200).json(contract.response({ birdInfo: result.data?.entities[0] }));
        } else {
            return res.status(200).json({});
        }
    }).catch(err => {
        return res.status(400).json("error")
    })

});


//Geolocation route
router.get('/api/birdySPA/geolocation', (req, res) => {

    //Specifing the contract for this endpoint to force agreed upon response
    const contract = contractGetGeoData({})

    //Getting the Ip from the request
    const clientIp = requestIP.getClientIp(req);

    //Getting the geolocation
    axios.get<IGeolocation>('https://api.ipgeolocation.io/ipgeo?apiKey=' + process.env.GEOLOCATION + '&ip=' + clientIp).then(result => {
        return res.status(200).json(contract.response({ location: result.data }));
    }).catch(err => {
        return res.status(400).json("error")
    })

});

//Routes
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../assets/views', 'birdyIndex.htm'));
});


//Export the router
export default router;