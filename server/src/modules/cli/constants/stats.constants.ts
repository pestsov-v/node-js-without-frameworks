import os from "os";
import v8 from "v8";

export enum stats {
  loadAverage = os.loadavg().length,
  cpuCount = os.cpus().length,
  freeMemory = os.freemem(),
  currentMallocedMemmory = v8.getHeapStatistics().malloced_memory,
  peakMallocedMemory = v8.getHeapStatistics().peak_malloced_memory,
  allocatedHeapUsed = Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
  availableHeapAllocated = Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) *100),
  uptime = os.uptime(),
}
