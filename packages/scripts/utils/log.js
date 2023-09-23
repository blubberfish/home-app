export const LOG_STATUS = {
  ERROR: 0,
  WARNING: 1,
  SUCCESS: 2,
  INFO: 3,
  DEBUG: 4,
};

export const LOG_STATUS_LEVEL = {
  [LOG_STATUS.ERROR]: 0,
  [LOG_STATUS.WARNING]: 1,
  [LOG_STATUS.SUCCESS]: 2,
  [LOG_STATUS.INFO]: 2,
  [LOG_STATUS.DEBUG]: 3,
};

const LOG_STATUS_TEXT = {
  [LOG_STATUS.ERROR]: 'Error',
  [LOG_STATUS.WARNING]: 'Alert',
  [LOG_STATUS.SUCCESS]: 'Ok',
  [LOG_STATUS.INFO]: 'Info',
  [LOG_STATUS.DEBUG]: 'Debug',
};

const MAX_LOG_STATUS_TEXT_LENGTH = Object.values(LOG_STATUS_TEXT).reduce(
  (max, text) => Math.max(max, text.length),
  0,
);

function builder() {
  return {
    fragments: [],
    addTimestamp(date = new Date()) {
      this.fragments.push(date.toISOString());
      return this;
    },
    addStatus(stat) {
      const text = LOG_STATUS_TEXT[stat] ?? LOG_STATUS_TEXT[LOG_STATUS.INFO];
      this.fragments.push(text.padEnd(MAX_LOG_STATUS_TEXT_LENGTH));
      return this;
    },
    addContent(...message) {
      for (const content of message) {
        if (content) {
          this.fragments.push(content);
        }
      }
      return this;
    },
  };
}
builder.logLevel = LOG_STATUS_LEVEL[LOG_STATUS.DEBUG];

export function debug(...message) {
  console.log(
    ...builder()
      .addTimestamp()
      .addStatus(LOG_STATUS.DEBUG)
      .addContent(...message).fragments,
  );
}

export function info(...message) {
  console.log(
    ...builder()
      .addTimestamp()
      .addStatus(LOG_STATUS.INFO)
      .addContent(...message).fragments,
  );
}

export function error(...message) {
  console.log(
    ...builder()
      .addTimestamp()
      .addStatus(LOG_STATUS.ERROR)
      .addContent(...message).fragments,
  );
}

export function warning(...message) {
  console.log(
    ...builder()
      .addTimestamp()
      .addStatus(LOG_STATUS.WARNING)
      .addContent(...message).fragments,
  );
}

export function success(...message) {
  console.log(
    ...builder()
      .addTimestamp()
      .addStatus(LOG_STATUS.SUCCESS)
      .addContent(...message).fragments,
  );
}
