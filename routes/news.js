const { default: Axios } = require('axios');
const dayjs = require('dayjs');
const express = require('express');
const router = express.Router();

const constructUrl = require("../utils/constructUrl");

const BASE_URL = "https://newsapi.org/v2"

router.get('/everything', async (req, res, next) => {
    const endPoint = "everything";
    let {q, startDate, endDate, sortBy, domain} = req.query;
    const queryString = q;
    const sortFilter = sortBy;
    const domainFilter = domain;
    startDate = dayjs(startDate).format("YYYY-MM-DD");
    endDate = dayjs(endDate).format("YYYY-MM-DD");
    try {
        if(!process.env.API_KEY) throw new Error("Auth failure");
        if(!q) throw new Error("Required parameters are missing, the scope of your search is too broad.")
        const url = constructUrl(BASE_URL, endPoint, {queryString, startDate, endDate, sortFilter, domainFilter}, process.env.API_KEY);
        const {data, status} = await Axios.get(url);
        if(status !== 200) throw new Error("something went wrong!")
        console.log(data);
        res.send(data)
    } catch (e) {
        res.send(400, e.message);
    }
    
});

router.get('/sources', async (req, res, next) => {
    const endPoint = "sources";
    let {language, country} = req.query;
    
    const url = constructUrl(BASE_URL, endPoint, {language, country}, process.env.API_KEY)
    
    try {
        if(!process.env.API_KEY) throw new Error("Auth failure");
        const {data, status} = await Axios.get(url);
        if(status !== 200) throw new Error("something went wrong!")
        res.send(data);
    } catch (e) {
        res.send(400, e.message);
    }
});

module.exports = router;
