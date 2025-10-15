const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Masonic Time Calculator Class
class MasonicTime {
    constructor() {
        this.yearALOffset = 4000;    // Anno Lucis
        this.yearAMOffset = 3760;    // Anno Mundi
        this.yearAIOffset = 530;     // Anno Inventionis
        this.yearADepOffset = 1000;  // Anno Depositionis
        this.yearAOOffset = -1118;   // Anno Ordinis
        this.yearABOffset = 1911;    // Anno Benefacio
    }

    toAL(year) { return year + this.yearALOffset; }
    toAM(year) { return year + this.yearAMOffset; }
    toAI(year) { return year + this.yearAIOffset; }
    toAdep(year) { return year + this.yearADepOffset; }
    toAO(year) { return year + this.yearAOOffset; }
    toAB(year) { return year + this.yearABOffset; }

    formatALDate(date) {
        const year = date.getFullYear();
        const alYear = this.toAL(year);
        return `${date.getMonth() + 1}/${date.getDate()}/${alYear}`;
    }

    formatAMDate(date) {
        const year = date.getFullYear();
        const amYear = this.toAM(year);
        return `${date.getMonth() + 1}/${date.getDate()}/${amYear}`;
    }

    formatAIDate(date) {
        const year = date.getFullYear();
        const aiYear = this.toAI(year);
        return `${date.getMonth() + 1}/${date.getDate()}/${aiYear}`;
    }

    formatAdepDate(date) {
        const year = date.getFullYear();
        const adepYear = this.toAdep(year);
        return `${date.getMonth() + 1}/${date.getDate()}/${adepYear}`;
    }

    formatAODDate(date) {
        const year = date.getFullYear();
        const aoYear = this.toAO(year);
        return `${date.getMonth() + 1}/${date.getDate()}/${aoYear}`;
    }

    formatABDate(date) {
        const year = date.getFullYear();
        const abYear = this.toAB(year);
        return `${date.getMonth() + 1}/${date.getDate()}/${abYear}`;
    }
}

// Initialize Masonic Time
const fmTime = new MasonicTime();

// Calendar descriptions
const calendarDescriptions = {
  AL: {
    name: 'Anno Lucis',
    abbreviation: 'A.L.',
    description: 'In the Year of Light - Dating from the creation of the world according to Masonic tradition',
    symbol: '☀️',
    offset: 4000
  },
  AM: {
    name: 'Anno Mundi',
    abbreviation: 'A.M.',
    description: 'In the Year of the World - Hebrew calendar calculation from the creation',
    symbol: '🌍',
    offset: 3760
  },
  AI: {
    name: 'Anno Inventionis',
    abbreviation: 'A.I.',
    description: 'In the Year of Discovery - Commemorating the recovery of the lost word',
    symbol: '🔍',
    offset: 530
  },
  ADep: {
    name: 'Anno Depositionis',
    abbreviation: 'A.Dep.',
    description: 'In the Year of the Deposit - From the laying of the foundation stone',
    symbol: '🏛️',
    offset: 1000
  },
  AO: {
    name: 'Anno Ordinis',
    abbreviation: 'A.O.',
    description: 'In the Year of the Order - Knights Templar founding (1118 CE)',
    symbol: '⚔️',
    offset: -1118
  },
  AB: {
    name: 'Anno Benefacio',
    abbreviation: 'A.B.',
    description: 'In the Year of the Blessing - Scottish Rite calendar',
    symbol: '✨',
    offset: 1911
  }
};

// API Routes

// Get all current times
app.get('/api/times', (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    const times = {
      gregorian: {
        date: now.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        }),
        time: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        year: currentYear
      },
      masonic: {
        AL: {
          ...calendarDescriptions.AL,
          year: fmTime.toAL(currentYear),
          date: fmTime.formatALDate(now)
        },
        AM: {
          ...calendarDescriptions.AM,
          year: fmTime.toAM(currentYear),
          date: fmTime.formatAMDate(now)
        },
        AI: {
          ...calendarDescriptions.AI,
          year: fmTime.toAI(currentYear),
          date: fmTime.formatAIDate(now)
        },
        ADep: {
          ...calendarDescriptions.ADep,
          year: fmTime.toAdep(currentYear),
          date: fmTime.formatAdepDate(now)
        },
        AO: {
          ...calendarDescriptions.AO,
          year: fmTime.toAO(currentYear),
          date: fmTime.formatAODDate(now)
        },
        AB: {
          ...calendarDescriptions.AB,
          year: fmTime.toAB(currentYear),
          date: fmTime.formatABDate(now)
        }
      }
    };
    
    res.json(times);
  } catch (error) {
    console.error('Error generating times:', error);
    res.status(500).json({ error: 'Failed to generate times' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Masonic Time Service' });
});

// Serve index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🔺 Masonic Time Service running on port ${PORT}`);
  console.log(`📍 Access at: http://localhost:${PORT}`);
});
