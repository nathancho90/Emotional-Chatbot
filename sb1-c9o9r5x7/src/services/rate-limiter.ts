class RateLimiter {
  private static instance: RateLimiter;
  private requestCount: number = 0;
  private lastReset: number = Date.now();
  private readonly resetInterval: number = 60000; // 1 minute
  private readonly maxRequests: number = 3; // Max requests per minute

  private constructor() {}

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  async checkLimit(): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastReset >= this.resetInterval) {
      this.requestCount = 0;
      this.lastReset = now;
    }

    if (this.requestCount >= this.maxRequests) {
      return false;
    }

    this.requestCount++;
    return true;
  }
}

export const rateLimiter = RateLimiter.getInstance();