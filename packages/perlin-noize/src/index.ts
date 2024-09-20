const MAX_VALUE = 0xffffffff;

export interface IPerlinOptions {
  octaveCount?: number;
  amplitude?: number;
  persistence?: number;
  seed?: number;
}

export function randomSeed(s = generateSeed()) {
  var mask = 0xffffffff;
  var m_w = (123456789 + s) & mask;
  var m_z = (987654321 - s) & mask;

  return function () {
    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  };
}

export const generatePerlinNoise = (
  width: number,
  height: number,
  options: IPerlinOptions = {}
) => {
  const {
    octaveCount = 4,
    persistence = .2,
    seed = generateSeed()
  } = options;

  let {
    amplitude = .1,
  } = options;

  const whiteNoise = generateWhiteNoise(width, height, seed);
  const smoothNoiseList = Array.from({ length: octaveCount }, (_, octave) => {
    const noise = new Array<number>(width * height);
    const samplePeriod = Math.pow(2, octave);
    const sampleFrequency = 1 / samplePeriod;

    let noiseIndex = 0;

    for (let y = 0; y < height; ++y) {
      const sampleY0 = Math.floor(y / samplePeriod) * samplePeriod;
      const sampleY1 = (sampleY0 + samplePeriod) % height;
      const vertBlend = (y - sampleY0) * sampleFrequency;

      for (let x = 0; x < width; ++x) {
        const sampleX0 = Math.floor(x / samplePeriod) * samplePeriod;
        const sampleX1 = (sampleX0 + samplePeriod) % width;
        const horizBlend = (x - sampleX0) * sampleFrequency;

        const top = interpolate(whiteNoise[sampleY0 * width + sampleX0], whiteNoise[sampleY1 * width + sampleX0], vertBlend);
        const bottom = interpolate(whiteNoise[sampleY0 * width + sampleX1], whiteNoise[sampleY1 * width + sampleX1], vertBlend);

        noise[noiseIndex++] = interpolate(top, bottom, horizBlend);
      }
    }
    return noise;
  });

  const perlinNoise = new Array<number>(width * height);
  let totalAmplitude = 0;

  for (let i = octaveCount - 1; i >= 0; --i) {
    amplitude *= persistence;
    totalAmplitude += amplitude;

    for (let j = 0; j < perlinNoise.length; ++j) {
      perlinNoise[j] = perlinNoise[j] || 0;
      perlinNoise[j] += smoothNoiseList[i][j] * amplitude;
    }
  }

  for (let i = 0; i < perlinNoise.length; ++i) {
    perlinNoise[i] /= totalAmplitude;
  }

  return perlinNoise;
};

export const generateSeed = () => Math.random() * MAX_VALUE;

export const generateWhiteNoise = (width: number, height: number, seed = generateSeed()) => {
  const random = randomSeed(seed);

  return (
    Array.from({ length: width * height }, () => random())
  );
};

const interpolate = (x0: number, x1: number, alpha: number) => (
  x0 * (1 - alpha) + alpha * x1
);
