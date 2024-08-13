const Ably = require('ably');
require('dotenv').config()

const ably_key = process.env.ABLY_KEY
const ably = new Ably.Realtime(ably_key);
const channel = ably.channels.get('inventory-updates');

// function to publish inventory update notifications
const notifyInventoryUpdate = () => {
  channel.publish('update', { message: 'Inventory updated' }, (err) => {
    if (err) {
      console.error('Failed to publish message:', err);
    } else {
      console.log('Inventory update notification sent');
    }
  });
};

module.exports = notifyInventoryUpdate