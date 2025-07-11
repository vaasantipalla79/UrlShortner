export const Logger = {
  logEvent: (eventName, details) => {
    const logs = JSON.parse(sessionStorage.getItem('appLogs') || '[]');
    logs.push({
      type: 'EVENT',
      eventName,
      details,
      timestamp: new Date().toISOString(),
    });
    sessionStorage.setItem('appLogs', JSON.stringify(logs));
  },

  logError: (errorName, details) => {
    const logs = JSON.parse(sessionStorage.getItem('appLogs') || '[]');
    logs.push({
      type: 'ERROR',
      errorName,
      details,
      timestamp: new Date().toISOString(),
    });
    sessionStorage.setItem('appLogs', JSON.stringify(logs));
  },

  getLogs: () => {
    return JSON.parse(sessionStorage.getItem('appLogs') || '[]');
  },

  clearLogs: () => {
    sessionStorage.removeItem('appLogs');
  }
};
