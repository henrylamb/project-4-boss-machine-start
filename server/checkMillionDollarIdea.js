const checkMillionDollarIdea = (req,res,next) => {
    const {numWeeks, weeklyRevenue} = req.body;
    const million = 1000000;
    const divided = Number(numWeeks)*Number(weeklyRevenue);

    if(divided < million){
        res.status(400).send()
    } else {
        next()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
