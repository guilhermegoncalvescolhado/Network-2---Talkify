const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth');
const admMiddleware = require('../middleware/admCheck');

router.post('/', authMiddleware, admMiddleware, reportController.createReport);
router.get('/', authMiddleware, admMiddleware, reportController.getReports);
router.patch('/:reportId', authMiddleware, admMiddleware, reportController.updateReportStatus);

module.exports = router;
