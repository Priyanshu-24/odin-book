const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
const Bookmark = require("../models/Bookmark");

exports.post_get = (req, res, next) => {
  if (req.user) res.render("create_post", { user: req.user });
  else res.redirect("/");
};

exports.post_send = async (req, res, next) => {
  const { caption } = req.body;
  const formatDate = moment().format("MMMM Do YYYY, dddd");

  const newPost = await Post.create({
    caption,
    username: req.user.username,
    timestamp: formatDate,
  });

  res.redirect("/");
};

exports.delete_post = async (req, res, next) => {
  const { id } = req.params;
  const response = await Post.findByIdAndDelete(id);

  res.redirect("/");
};

exports.post_comment = async (req, res, next) => {
  const { comments } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);
  const { comment } = post;

  comment.push({ comments, username: req.user.username });

  const result = await Post.findByIdAndUpdate(id, {comment});

  res.redirect("/");
};

exports.save_post = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  const { caption, username, timestamp, comment } = post;

  const response = await Bookmark.create({
    caption,
    timestamp,
    username,
    comment
  });


  res.redirect("/");
}