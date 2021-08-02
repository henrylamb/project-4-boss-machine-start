const express = require('express');
const apiRouter = express.Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');



apiRouter.param('minionId',(req,res,next,id) => {
    const minion = getFromDatabaseById('minions',id);
       if(minion) {
           req.minion = minion
           next();
       } else {
           res.status(404).send();
       }
})

// minons routes:

apiRouter.get('/minions', (req,res,next) => {
    const allMinions = getAllFromDatabase('minions'); 
    res.send(allMinions);
})
    .get('/minions/:minionId',  (req,res,next) => {
        res.send(req.minion);
    })
    .post('/minions', (req,res,next) => {
        const addMinion = addToDatabase('minions', req.body);
        res.status(201).send(addMinion)
    })
    .put('/minions/:minionId', (req,res,next) => {
        const addMinion = updateInstanceInDatabase('minion', req.param.minionId);
        res.send(addMinion)
    })
    .delete('/minions/:minionId', (req,res,next) => {
        const removeMinion = deleteFromDatabasebyId('minion', req.param.minionID);
        if(removeMinion){
            res.status(204)
        } else {
            res.status(500)
        }
        res.send();
    });


//middleware for ideas route: 

apiRouter.param('ideaId', (req,res,next,id) => {
    const idea = getFromDatabaseById('ideas',id);
    if(idea) {
        req.idea = idea
        next();
    } else {
        next(err);
    }
 });

 const millionIdea = require('./checkMillionDollarIdea');
//ideas routes:

apiRouter.get('/ideas', (req,res,next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.send(allIdeas);
})
    .get('/ideas/:ideaId',  (req,res,next) => {
        res.send(req.idea);
    })
    .post('/ideas', millionIdea, (req,res, next) => {
        const newIdea = addToDatabase('ideas', req.body);
        res.status(201).send(newIdea);
    })
    .put('/ideas/:ideaId', millionIdea, (req,res,next) => {
        const updateIdea = updateInstanceInDatabase('ideas', req.param.ideaId);
        res.status(203).send(updateIdea);
    })
    .delete('/ideas/:ideaId', (req,res,next) => {
        const deleteIdea = deleteFromDatabasebyId('ideas', req.param.ideaId);
        if(deleteIdea){
            res.status(204);
        } else {
            res.status(500);
        }
    } 
    );

//meetings routes:

apiRouter.get('/meetings', (req,res,next) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.send(allMeetings);
})
    .post('/meetings', (req,res,next) => {
        const newMeeting = updateInstanceInDatabase('meetings', req.body);
        res.status(204).send(newMeeting);
    })
    .delete('/meetings', (req,res,next) => {
        const deleteAllMeetings = deleteAllFromDatabase('meetings');
        if(deleteAllMeetings){
            res.status(204);
        } else {
            res.status(500);
        }
    })

//error handlers

module.exports = apiRouter;
