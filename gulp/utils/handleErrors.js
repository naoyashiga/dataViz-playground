import notifier from 'node-notifier';

module.exports = function(error) {
  notifier.notify({
    message: error.message,
    title: error.plugin,
    sound: 'Pop'
  });
  console.log(error);
  this.emit('end')
};
