const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/auth');

router.post('/approve/:requestId', authMiddleware, requestController.approveJoinRequest);
router.post('/reject/:requestId', authMiddleware, requestController.rejectJoinRequest);
router.get('/:chatRoomId', authMiddleware, requestController.getJoinRequests);

module.exports = router;