/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  const a = Math.floor(Date.parse(dateLeft) / (24*60*60*1000));
  const b = Math.floor(Date.parse(dateRight) / (24*60*60*1000));
  return a == b;
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const date = new Date(ts)
  const h = date.getHours();
  const mm = (date.getMinutes() + '0').slice(-2);
  return `${h}:${mm}`
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  const dateCloseAtDate = new Date(closeAt)
  if (dateCloseAtDate < new Date()) {
    return "投票締切";
  }

  if ((dateCloseAtDate - new Date()) >= 2 * 60 * 60 * 1000) {
    return "投票受付中";
  }

  return `締切${Math.floor((dateCloseAtDate - new Date()) / (60 * 1000))}分前`;
};
