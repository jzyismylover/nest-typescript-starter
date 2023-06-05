import * as os from 'os';

type UsageOptions = {
  cpuUsageMS: number;
  percentage: boolean;
};

const sleep = (cpuUsageMS) => new Promise((resolve) => setTimeout(resolve, cpuUsageMS));

export class CPUUtils {
  cpuUsageMSDefault: number;
  constructor() {
    this.cpuUsageMSDefault = 1000;
  }

  // 获取一段时间内 cpu 的利用率
  async getCPUUsage(options: Partial<UsageOptions> = {}) {
    let { cpuUsageMS, percentage } = options;
    cpuUsageMS = cpuUsageMS || this.cpuUsageMSDefault;
    const t1 = this._getCPUInfo();
    await sleep(cpuUsageMS);
    const t2 = this._getCPUInfo();
    const total = t2.total - t1.total;
    const idle = t2.idle - t1.idle;
    let usage = 1 - idle / total;
    if (percentage) {
      return (usage * 100).toFixed(2) + '%';
    }
    return usage;
  }

  // 获取当前的 cpu 使用情况
  _getCPUInfo() {
    const cpus = os.cpus();
    let user = 0,
      nice = 0,
      sys = 0,
      idle = 0,
      irq = 0,
      total = 0;
    for (const cpu in cpus) {
      const times = cpus[cpu].times;
      user += times.user;
      nice += times.nice;
      sys += times.sys;
      idle += times.idle;
      irq = times.irq;
    }
    total += user + nice + sys + idle + irq;
    return {
      user,
      sys,
      idle,
      total,
    };
  }
}
