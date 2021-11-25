const router = require("express").Router();
const { tokenAdding } = require("../controller/userToken");
const { tokenValidate } = require("../validations/UserTokenValidate");

router.post('/addToken', tokenValidate, tokenAdding);

module.exports = router;
