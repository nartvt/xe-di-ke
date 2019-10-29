const express = require('express');

const { User } = require('../Models/User');
const bcrypt = require('bcryptjs');

// route level middleware

const router = express.route();

router.post("/", async (req, res) => {
  // 1. get data send from client
  try {


    const { name, email, password, avatar } = req.body;

    const hasPassword = await bcrypt.hash(password, 12);

    // 2. create new object receipt from client
    const user = await new User({
      name, email, password: hasPassword, avatar
      // 3. save  to db
    });

    const err = user.validate();
    if (err) return res.status(422).send(err);

    const newUser = await user.save();
    // 4. response to client
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status.apply(404).send();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }

})


router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status.apply(404).send();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }

})

router.patch('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updateFields = Object.keys(req.body);
    const allowUpdateFields = ['name', 'avatar', 'password'];

    const canUpdate = updateFields.every(item => allowUpdateFields.includes(item))
    if (!canUpdate) return res.status.apply(403).send();

    const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
    if (!user) return res.status.apply(404).send();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }

})


module.exports = router;