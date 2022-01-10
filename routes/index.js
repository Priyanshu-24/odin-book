var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer({dest: __dirname + '/../public/images/profile'});

const authController = require("../controllers/authController");
const indexController = require("../controllers/indexController");
const postController = require("../controllers/postController");

router.get("/", indexController.show_post);

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

router.get("/logout", authController.logout);

router.get("/create_post", postController.post_get);
router.post("/create_post", postController.post_send);
router.post("/delete_post/:id", postController.delete_post);

router.get("/profile", indexController.show_profile);

router.post("/comment_post/:id", postController.post_comment);

router.post("/save_post/:id", postController.save_post);
router.get("/saved", indexController.show_saved);
router.post("/delete_save_post/:id", indexController.save_post_delete);

module.exports = router;
