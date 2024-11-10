import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Get the health status of the application.
   * @returns {Object} - An object containing the status, uptime, and timestamp of the application.
   */
  getHealth() {
    return {
      status: 'OK',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
