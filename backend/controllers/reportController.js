const Report = require('../models/Report');

exports.createReport = async (req, res) => {
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
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar relatório', error });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporter', 'username email')
      .populate('reportedUser', 'username email')
      .populate('reportedMessage')
      .populate('reportedChatRoom');

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar relatórios', error });
  }
};

exports.updateReportStatus = async (req, res) => {
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

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status do relatório', error });
  }
};
