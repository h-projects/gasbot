import process from 'node:process';
import { styleText } from 'node:util';
import { env } from '#env';

const date = new Intl.DateTimeFormat('sv', {
  dateStyle: 'short',
  timeStyle: 'medium',
  hour12: false
});

export function debug(...args: unknown[]) {
  if (env.NODE_ENV === 'production') {
    return;
  }

  console.error(styleText(['bold', 'magenta'], `${date.format()} DEBUG`), ...args);
}

export function error(...args: unknown[]) {
  console.error(styleText(['bold', 'red'], `${date.format()} ERROR`), ...args);
}

export function fatal(...args: unknown[]) {
  console.error(styleText(['bold', 'red'], `${date.format()} FATAL`), ...args);
  process.exit(1);
}

export function log(...args: unknown[]) {
  console.log(styleText(['bold', 'blue'], `${date.format()} LOG`), ...args);
}

export function warn(...args: unknown[]) {
  console.warn(styleText(['bold', 'yellow'], `${date.format()} WARN`), ...args);
}
