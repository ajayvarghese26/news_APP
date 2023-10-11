const express = require("express");
const bodyParser = require("body-parser");
const newsRoutes = express.Router();
const verifyToken = require("../middleware/authJWT");
newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());
const { default: axios } = require("axios");
const e = require("express");
const newsAPI ='https://newsapi.org/v2/top-headlines?apiKey=5414cc3f8f0a4615a031eb55478cf173';

//To get news details for selected preference
newsRoutes.post('/',verifyToken,async(req,res)=>{
    if (!req.user && req.message == null) {
        res.status(403).send({
          message: "Invalid JWT token",
        });
      } else if (!req.user && req.message) {
        res.status(403).send({
          message: req.message,
        });
      } else {
        let userPreference = req.user.preferences;
        let prefParam= '';
        if(userPreference && userPreference.language){
            prefParam += '&'+'language'+'='+userPreference.language;
        }
        if(userPreference && userPreference.country){
            prefParam +='&'+'country'+'='+userPreference.country;
        }
        let newsUrl = newsAPI+prefParam; 
        console.log("newsUzrl",newsUrl);
        axios.get(newsUrl).then(dat =>{
            if(dat.data && dat.data.articles.length >0){
                res.status(200).send(dat.data.articles);
            }
            else{
                res.status(200).send("No Data available for the selected preference");
            }
        }).catch(e =>{
            res.status(400).send(e);
        })
        
      }

})

module.exports = { newsRoutes };