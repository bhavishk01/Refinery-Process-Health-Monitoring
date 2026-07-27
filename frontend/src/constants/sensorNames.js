export const SENSOR_NAMES = [
    ...Array.from({ length: 41 }, (_, i) => `xmeas_${i + 1}`),
    ...Array.from({ length: 11 }, (_, i) => `xmv_${i + 1}`)
];