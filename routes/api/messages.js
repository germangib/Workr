const router = require("express").Router();
const messagesController = require("../../controllers/messagesController");

// Matches with "/api/messages"
router.route("/")
  .get(messagesController.findAll)
  .post(messagesController.create);

router.route("/offer")
  .post(messagesController.createOffer);

router.route("/:recieverId")
  .get(messagesController.findById)

  router.route("/remove/:id")
  .delete(messagesController.remove);

router.route("/sent/:senderId")
  .get(messagesController.findBySenderId);

module.exports = router;