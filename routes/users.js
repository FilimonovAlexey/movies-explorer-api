const router = require('express').Router();
const { getProfileData, updateProfileData } = require('../controllers/users');
const { updateProfileDataValidator } = require('../middlewares/validators');

router.get('/me', getProfileData);
router.patch('/me', updateProfileDataValidator, updateProfileData);

module.exports = router;
