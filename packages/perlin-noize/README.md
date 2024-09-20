# perlin noise generator for node.js


## Usage ESNext

```js
import {generatePerlinNoise} from '@vicimpa/perlin-noise';
const noise = generatePerlinNoise(480, 480);
// noise is an number array with length 480 * 480
```

## Usage CommonJS

```js
const {generatePerlinNoise} = require('@vicimpa/perlin-noise');
const noise = generatePerlinNoise(480, 480);
// noise is an number array with length 480 * 480
```

## Documentation

```ts
interface IPerlinOptions {
    octaveCount?: number;
    amplitude?: number;
    persistence?: number;
    seed?: number;
}

function randomSeed(s?: number): () => number;
function generatePerlinNoise(width: number, height: number, options?: IPerlinOptions): number[];
function generateSeed(): number;
function generateWhiteNoise(width: number, height: number, seed?: number): number[];
```

