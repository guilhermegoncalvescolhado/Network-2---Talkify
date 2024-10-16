const Report = require('../models/Report');
const WebSocket = require('ws');
const { getWebSocketServer } = require('../config/socket'); 

exports.createReport = async (req, res, next) => {
  try {
    const { reportedUser, reason, reportedMessage, reportedChatRoom } = req.body;

    if (!reportedUser || !reason) {
      return res.status(400).json({ message: 'Usuário reportado e razão são obrigatórios' });
    }

    const newReport = new Report({
      reporter: req.user.id,
      reportedUser,
      reportedMessage,
      reportedChatRoom,
      reason,
    });

    const savedReport = await newReport.save();

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Novo report', chatRoom: reportedChatRoom, user: reportedUser }));
      }
    });

    res.status(201).json(savedReport);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .populate('reporter', 'username email')
      .populate('reportedUser', 'username email')
      .populate('reportedMessage')
      .populate('reportedChatRoom');

    res.status(200).json(reports);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateReportStatus = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'reviewed', 'resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    report.status = status;
    await report.save();

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Report atualizado', Report: reportId, status: status }));
      }
    });

    res.status(200).json(report);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
