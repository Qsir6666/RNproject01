const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');
require('dotenv').config();

const schedules = [
  {
    title: '英语个性化一对一课程',
    date: new Date(),
    startTime: '10:00',
    endTime: '12:00',
    status: 'blue'
  },
  {
    title: '英语个性化一对一课程',
    date: new Date(),
    startTime: '14:00',
    endTime: '16:00',
    status: 'blue'
  },
  {
    title: '英语个性化一对一课程',
    date: new Date(),
    startTime: '16:30',
    endTime: '18:30',
    status: 'red'
  },
  {
    title: '英语个性化一对一课程',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: '10:00',
    endTime: '12:00',
    status: 'blue'
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/schedule_db')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // 清空现有数据
    await Schedule.deleteMany({});
    console.log('Cleared existing schedules');

    // 插入新数据
    await Schedule.insertMany(schedules);
    console.log('Inserted sample schedules');

    mongoose.connection.close();
    console.log('Database connection closed');
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  }); 