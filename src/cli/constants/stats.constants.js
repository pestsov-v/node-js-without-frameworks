const os = require("os");
const v8 = require("v8");

const LOAD_AVERAGE = os.loadavg().join("");
const CPU_COUNT = os.cpus().length;
const FREE_MEMORY = os.freemem();
const CURRENT_MALLOCED_MEMORY = v8.getHeapStatistics().malloced_memor;
const PEAK_MALLOCED_MEMORY = v8.getHeapStatistics().peak_malloced_memory;
const ALLOCATED_HEAP_USED = Math.round(
  (v8.getHeapStatistics().used_heap_size /
    v8.getHeapStatistics().total_heap_size) *
    100
);
const AVAILABLE_HEAP_ALLOCATED = Math.round(
  (v8.getHeapStatistics().total_heap_size /
    v8.getHeapStatistics().heap_size_limit) *
    100
);
const UPTIME = os.uptime() + " Секунд";

const stats = {
  loadAverage: LOAD_AVERAGE,
  cpuCount: CPU_COUNT,
  freeMemory: FREE_MEMORY,
  currentMallocedMemmory: CURRENT_MALLOCED_MEMORY,
  peakMallocedMemory: PEAK_MALLOCED_MEMORY,
  allocatedHeapUsed: ALLOCATED_HEAP_USED,
  availableHeapAllocated: AVAILABLE_HEAP_ALLOCATED,
  uptime: UPTIME,
};

module.exports = stats;
