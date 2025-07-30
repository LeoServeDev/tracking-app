import { Request, Response } from 'express';
import PunchRecord from '../models/PunchRecord';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export const punchInOut = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const { punchType, notes } = req.body;
    
    if (!punchType || !['in', 'out'].includes(punchType)) {
      return res.status(400).json({ message: 'Punch type must be "in" or "out"' });
    }

    const now = new Date();
    const today = startOfDay(now);

    // Auto-capture device and location info
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ipAddress = req.ip || req.socket.remoteAddress || 'Unknown';
    
    // Determine device type from user agent
    let deviceType = 'Unknown';
    if (userAgent.includes('Mobile')) deviceType = 'Mobile';
    else if (userAgent.includes('Tablet')) deviceType = 'Tablet';
    else if (userAgent.includes('Windows') || userAgent.includes('Mac') || userAgent.includes('Linux')) deviceType = 'Desktop';
    
    const device = `${deviceType} (${userAgent.split(' ')[0]})`;
    const location = `IP: ${ipAddress}`;

    if (punchType === 'in') {
      // Check if user already punched in today
      const existingPunch = await PunchRecord.findOne({
        user: userId,
        date: { $gte: today, $lte: endOfDay(now) },
        punchOut: { $exists: false }
      });

      if (existingPunch) {
        return res.status(400).json({ message: 'Already punched in today' });
      }

      const punchRecord = await PunchRecord.create({
        user: userId,
        punchIn: now,
        date: today,
        punchType: 'in',
        location,
        device,
        notes
      });

      return res.status(201).json({ punchRecord });
    } else {
      // Punch out - find the latest punch in record
      const latestPunch = await PunchRecord.findOne({
        user: userId,
        date: { $gte: today, $lte: endOfDay(now) },
        punchOut: { $exists: false }
      }).sort({ punchIn: -1 });

      if (!latestPunch) {
        return res.status(400).json({ message: 'No punch in record found for today' });
      }

      latestPunch.punchOut = now;
      latestPunch.punchType = 'out';
      latestPunch.location = location;
      latestPunch.device = device;
      if (notes) latestPunch.notes = notes;
      
      await latestPunch.save();
      return res.status(200).json({ punchRecord: latestPunch });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getAllPunches = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const punches = await PunchRecord.find({ user: userId })
      .sort({ punchIn: -1 })
      .populate('user', 'firstName lastName email');
    
    return res.status(200).json({ punches });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getTodayPunches = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const today = startOfDay(new Date());
    const punches = await PunchRecord.find({
      user: userId,
      date: { $gte: today, $lte: endOfDay(today) }
    }).sort({ punchIn: -1 });
    
    return res.status(200).json({ punches });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getWeekPunches = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
    
    const punches = await PunchRecord.find({
      user: userId,
      date: { $gte: weekStart, $lte: weekEnd }
    }).sort({ punchIn: -1 });
    
    return res.status(200).json({ punches });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const deletePunch = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const { id } = req.params;
    
    const punch = await PunchRecord.findOneAndDelete({
      _id: id,
      user: userId
    });
    
    if (!punch) {
      return res.status(404).json({ message: 'Punch record not found' });
    }
    
    return res.status(200).json({ message: 'Punch record deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getStats = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const { range = 'week' } = req.query;
    
    let startDate, endDate;
    const now = new Date();
    
    switch (range) {
      case 'week':
        startDate = startOfWeek(now, { weekStartsOn: 1 });
        endDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      default:
        return res.status(400).json({ message: 'Invalid range. Use "week" or "month"' });
    }
    
    const punches = await PunchRecord.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ punchIn: 1 });
    
    // Calculate stats
    let totalHours = 0;
    let totalDays = 0;
    const dailyHours: { [key: string]: number } = {};
    
    for (const punch of punches) {
      if (punch.punchOut) {
        const hours = (punch.punchOut.getTime() - punch.punchIn.getTime()) / (1000 * 60 * 60);
        const dateKey = punch.date.toISOString().split('T')[0];
        
        if (!dailyHours[dateKey]) {
          dailyHours[dateKey] = 0;
          totalDays++;
        }
        dailyHours[dateKey] += hours;
        totalHours += hours;
      }
    }
    
    const stats = {
      range,
      totalHours: Math.round(totalHours * 100) / 100,
      totalDays,
      averageHoursPerDay: totalDays > 0 ? Math.round((totalHours / totalDays) * 100) / 100 : 0,
      dailyHours
    };
    
    return res.status(200).json({ stats });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
}; 