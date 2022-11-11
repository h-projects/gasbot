import process from 'node:process';
import { env } from '#env';
import { blue, bold, magenta, red, yellow } from 'yoctocolors';

export class Logger {
  private static getDate() {
    const date = new Date();
    const [day] = date.toISOString().split('T');
    const [time] = date.toTimeString().split(' ');

    return `${day} ${time}`;
  }

  static debug(msg: unknown, ...args: unknown[]) {
    if (env.NODE_ENV === 'production') {
      return;
    }

    const date = this.getDate();
    console.error(bold(magenta(`${date} DEBUG`)), msg, ...args);
  }

  static error(msg: unknown, ...args: unknown[]) {
    const date = this.getDate();
    console.error(bold(red(`${date} ERROR`)), msg, ...args);
  }

  static fatal(msg: unknown, ...args: unknown[]) {
    const date = this.getDate();
    console.error(bold(red(`${date} FATAL`)), msg, ...args);
    process.exit(1);
  }

  static log(msg: unknown, ...args: unknown[]) {
    const date = this.getDate();
    console.log(bold(blue(`${date} LOG`)), msg, ...args);
  }

  static warn(msg: unknown, ...args: unknown[]) {
    const date = this.getDate();
    console.warn(bold(yellow(`${date} WARN`)), msg, ...args);
  }
}
