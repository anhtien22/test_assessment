const User = require('../models/User.js');

// @route POST '/api/users/register'
// @access Public
exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body)
    if (!req.body.fullname) {
      throw new Error('Bạn chưa nhập tên!')
    }
    if (!req.body.email) {
      throw new Error('Bạn chưa nhập email!')
    }
    if (!req.body.password) {
      throw new Error('Bạn chưa nhập mật khẩu!')
    }
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Login user
// @route POST '/api/users/login'
// @access Public
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    if (!user) {
      throw new Error('Email và Mật khẩu không hợp lệ!')
    }
    if (!req.body.email || !req.body.password) {
      throw new Error('Email và Mật khẩu không hợp lệ!')
    }
    const token = await user.generateAuthToken()
    res.status(200).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Read user profile
// @route GET '/api/users/profile'
// @access Private: User
exports.readProfile = async (req, res) => {
  // res.json(req.user)
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  })
}

// @desc Update user profile
// @route PATCH '/api/users/profile'
// @access Private : user
exports.updateProfile = async (req, res) => {
  console.log(req.body);
  if (!req.body.fullname) {
    throw new Error('Bạn chưa nhập tên!')
  }
  if (!req.body.email) {
    throw new Error('Bạn chưa nhập email!')
  }
  if (!req.body.birthday) {
    throw new Error('Bạn chưa nhập birthday!')
  }
  if (!req.body.phone) {
    throw new Error('Bạn chưa nhập phone!')
  }
  const updates = Object.keys(req.body)
  const allowedUpdates = ['fullname', 'email', 'birthday', 'phone']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  console.log(isValidOperation);
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Cập nhật không thành công' })
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]))

    await req.user.save()
    res.json({ success: true, message: 'Hồ sơ cá nhân đã cập nhật', user: req.user })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }

}
