const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const asyncHandler = require('express-async-handler');

// 获取所有日程
router.get('/', asyncHandler(async (req, res) => {
  const { date } = req.query;
  console.log('获取日程，日期:', date);
  
  const query = date ? { date: new Date(date) } : {};
  const schedules = await Schedule.find(query).sort({ startTime: 1 });
  
  console.log('查询结果:', schedules);
  res.json(schedules);
}));

// 创建新日程
router.post('/', asyncHandler(async (req, res) => {
  console.log('创建日程，数据:', req.body);
  const schedule = new Schedule(req.body);
  const savedSchedule = await schedule.save();
  console.log('创建成功:', savedSchedule);
  res.status(201).json(savedSchedule);
}));

// 更新日程
router.put('/:id', asyncHandler(async (req, res) => {
  console.log('更新日程,ID:', req.params.id, '数据:', req.body);
  const schedule = await Schedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  
  if (!schedule) {
    res.status(404).json({ message: '未找到该日程' });
    return;
  }
  
  console.log('更新成功:', schedule);
  res.json(schedule);
}));

// 删除日程
router.delete('/:id', asyncHandler(async (req, res) => {
  console.log('删除日程，ID:', req.params.id);
  const schedule = await Schedule.findByIdAndDelete(req.params.id);
  
  if (!schedule) {
    res.status(404).json({ message: '未找到该日程' });
    return;
  }
  
  console.log('删除成功');
  res.status(204).send();
}));

module.exports = router; 