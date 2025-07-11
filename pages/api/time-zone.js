import { DateTime } from 'luxon';

export default async function handler(req, res) {
  try {
    // Get client IP address
    // const ip = req.headers['x-forwarded-for'] || 
    //           req.headers['x-real-ip'] || 
    //           req.ip || 
    //           '8.8.8.8'; // Fallback to Google DNS server

    const ip = req.ip;

    // Get geolocation data from ip-api.com
    console.log(`http://ip-api.com/json/${ip}`);
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    console.log(data);
    
    if (data.status !== 'success') {
      res.status(200).json({
        result: data
      });
      // throw new Error('Could not determine location');
    }

    // Get timezone from geolocation
    const timezone = data.timezone;
    if (!timezone) {
      throw new Error('Could not determine timezone');
    }

    // Create DateTime object with the timezone
    const now = DateTime.now().setZone(timezone);
    
    // Calculate GMT offset in minutes
    const gmtOffset = now.offset;
    
    // Check if DST is active
    const isDST = data.dst === '1';
    
    res.status(200).json({
      timezone,
      gmtOffset,
      isDST
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
