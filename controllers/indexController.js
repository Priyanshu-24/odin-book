const Bookmark = require("../models/Bookmark");
const Post = require("../models/Post");

exports.show_post = async (req, res, next) => {
  const posts = await Post.find({});
  res.render("index", { user: req.user, posts: posts });
};

exports.show_profile = async (req, res, next) => {
  const posts = await Post.find({});
  res.render("profile", { user: req.user, posts: posts });
};

exports.show_saved = async (req, res, next) => {
  if (req.user) {
    const posts = await Bookmark.find({});
    res.render("saved", { user: req.user, posts: posts });
  } else res.redirect("/");
};

exports.save_post_delete = async (req, res, next) => {
  const {id} = req.params;
  const response = await Bookmark.findByIdAndDelete(id);

  res.redirect("/saved");

}
