var express = require("express");

// create express app
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/landing");
});

app.get("/result", (req, res) => {
    var m = (parseInt(req.query.cm, 10) / 100);
    var kg = req.query.kg;
    var sex = req.query.gender;
    var waist = parseInt(req.query.waist, 10);
    var hip = parseInt(req.query.hip, 10);

    if(m == 0 || isNaN(m)){
        res.redirect("/");
    }else {
        var bmi = (kg / (m * m));
        var bmiCategory = '';
        var waistToHipRatio = '';
        
        if(bmi < 18.5) {
            bmiCategory = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25){
            bmiCategory = 'Healthy weight';
        } else if (bmi >= 25 && bmi < 30){
            bmiCategory = 'Overweight';
        } else if (bmi >= 30) {
            bmiCategory = 'Obese';
        }

        switch(sex) {
            case 'female':
                waistToHipRatio = waistToHipRatioForWomen(waist, hip);
                break;
            case 'male':
                waistToHipRatio = waistToHipRatioForMen(waist, hip);
                break;
            default:
                res.redirect("/");
        }

        res.render("pages/result", {
            bmi: bmi,
            bmiCategory: bmiCategory,
            waistToHipRatio: waistToHipRatio
        });
    }
});

function waistToHipRatioForMen(waist, hip) {
    var ratio = waistToHipRatioCalculator(waist, hip);
    if (ratio < 0.90) {
        return 'Normal weight';
    } else if (ratio >= 0.90 && ratio < 1) {
        return 'Over-weight';
    } else if (ratio >= 1) {
        return 'Obesity'
    }
}

function waistToHipRatioForWomen(waist, hip) {
    var ratio = waistToHipRatioCalculator(waist, hip);
    if (ratio < 0.80) {
        return 'Normal weight';
    } else if (ratio >= 0.80 && ratio < 0.85) {
        return 'Over-weight';
    } else if (ratio >= 0.85) {
        return 'Obesity'
    }
}

function waistToHipRatioCalculator(waist,hip) {
    return (waist/hip);
}

var port = 8080;
console.log("App is running on http://localhost:"+port)
app.listen(port);