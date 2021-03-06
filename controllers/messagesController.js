const db = require("../models");

module.exports = {
  
    findAll: function(req, res) {
      db.Message
        .find(req.query)
        .sort({ postedDate: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
      db.Message
        .find({ recieverId: req.params.recieverId })
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findBySenderId: function(req, res) {
      db.Message
        .find({ senderId: req.params.senderId })
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      let {
          recieverId,
          senderId,
          senderName,
          recieverName,
          jobOwner,
          inResponseMessage,
          messageBody,
          jobTitle,
          date
        } = req.body;
      db.Message
        .create({
            recieverId: recieverId,
            senderId: senderId,
            recieverName: recieverName,
            jobOwner: jobOwner,
            senderName: senderName,
            inResponseMessage: inResponseMessage,
            messageBody: messageBody,
            jobTitle: jobTitle,
            date: date
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
        
    },
    createOffer: function(req, res) {
      let {
          recieverId,
          senderId,
          senderName,
          recieverName,
          jobOwner,
          inResponseMessage,
          messageBody,
          jobTitle,
          date
        } = req.body;
      db.Message
        .create({
            recieverId: recieverId,
            senderId: senderId,
            recieverName: recieverName,
            jobOwner: jobOwner,
            senderName: senderName,
            inResponseMessage: inResponseMessage,
            messageBody: messageBody,
            jobTitle: jobTitle,
            date: date
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      console.log(req.params)
      db.Message
        .findById({ _id: req.params.id })
        //.then(dbModel => dbModel.remove())
        .then(dbModel => {
          res.json(dbModel)
          dbModel.remove()})
        .catch(err => res.status(422).json(err));
    },
}