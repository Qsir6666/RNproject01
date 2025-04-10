const mongoose = require('mongoose');
const Schedule = require('../models/schedule');
require('dotenv').config();

const today = new Date();
today.setHours(0, 0, 0, 0);

const schedules = [
  {
    title: '高等数学',
    date: today,
    startTime: '08:00',
    endTime: '09:40',
    status: 'blue'
  },
  {
    title: '大学英语',
    date: today,
    startTime: '10:00',
    endTime: '11:40',
    status: 'blue'
  },
  {
    title: '计算机基础',
    date: today,
    startTime: '14:00',
    endTime: '15:40',
    status: 'blue'
  }
];

async function addSchedules() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('成功连接到MongoDB');

    // 先删除今天的课程
    await Schedule.deleteMany({ date: today });
    console.log('已删除今天的课程');

    // 添加新课程
    const result = await Schedule.insertMany(schedules);
    console.log('成功添加课程:', result);

    process.exit(0);
  } catch (error) {
    console.error('错误:', error);
    process.exit(1);
  }
}

addSchedules(); 