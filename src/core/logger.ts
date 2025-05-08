type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogTransport {
  level: LogLevel;
  log(level: LogLevel, message: string, meta?: unknown): void;
}

export class Logger {
  private static instance: Logger;
  private transports: LogTransport[] = [];

  private constructor() {
    // Default console transport
    this.addTransport({
      level: 'info',
      log: (level, message) => console[level](message)
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public addTransport(transport: LogTransport): void {
    this.transports.push(transport);
  }

  public log(level: LogLevel, message: string, meta?: unknown): void {
    this.transports.forEach(transport => {
      if (this.shouldLog(level, transport.level)) {
        transport.log(level, message, meta);
      }
    });
  }

  private shouldLog(level: LogLevel, transportLevel: LogLevel): boolean {
    const levels: LogLevel[] = ['error', 'warn', 'info', 'debug'];
    return levels.indexOf(level) <= levels.indexOf(transportLevel);
  }

  // Convenience methods
  public error(message: string, meta?: unknown): void {
    this.log('error', message, meta);
  }

  public warn(message: string, meta?: unknown): void {
    this.log('warn', message, meta);
  }

  public info(message: string, meta?: unknown): void {
    this.log('info', message, meta);
  }

  public debug(message: string, meta?: unknown): void {
    this.log('debug', message, meta);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();
