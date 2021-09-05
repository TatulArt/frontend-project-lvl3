let currentTimerID;

export const clearTimer = () => {
  clearTimeout(currentTimerID);
};

export const setTimer = (time, cb) => {
  cb();
  currentTimerID = setTimeout(setTimer, time, time, cb);
};
