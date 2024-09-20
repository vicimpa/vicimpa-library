import { Vec2 } from "./vec2";

declare global {
  type TXY = [x: number, y: number] | [xy: Vec2];
  type TAB = [a: number, b: number] | [ab: Vec2];
  type TCD = [c: number, d: number] | [cd: Vec2];
  type TEF = [e: number, f: number] | [cd: Vec2];
  type TSXY = [sx: number, sy: number] | [xy: Vec2];
  type TXY0 = [x0: number, y0: number] | [xy0: Vec2];
  type TXY1 = [x1: number, y1: number] | [xy1: Vec2];
  type TXY2 = [x2: number, y2: number] | [xy2: Vec2];
  type TCP = [cpx: number, cpy: number] | [cp: Vec2];
  type TCP1 = [cp1x: number, cp1y: number] | [cp1: Vec2];
  type TCP2 = [cp2x: number, cp2y: number] | [cp2: Vec2];
  type TDXY = [dx: number, dy: number] | [dxy: Vec2];
  type TWH = [w: number, h: number] | [wh: Vec2];
  type TSWH = [sw: number, sh: number] | [wh: Vec2];
  type TDWH = [dw: number, dh: number] | [dwh: Vec2];
  type TAngles = [startAngle: number, endAngle: number] | [startEndAngle: Vec2];
  type TRadius = [radiusX: number, radiusY: number] | [radiusXY: Vec2];
  type TDirtyXY = [dirtyX: number, dirtyY: number] | [dirtyXY: Vec2];
  type TDirtyWidthHeight = [dirtyWidth: number, dirtyHeight: number] | [dirtyWidthHeight: Vec2];
  type TABCDEF = [...TAB, ...TCD, ...TEF];
  type TXY01 = [...TXY0, ...TXY1];
  type TXY01R = [...TXY0, r0: number, ...TXY1, r1: number];
  type TXYMaxWidth = [...TXY, maxWidth?: number];
  type TXYFillRule = [...TXY, fillRule?: CanvasFillRule];
  type TXYWH = [...TXY, ...TWH];
  type TDXYWH = [...TDXY, ...TDWH];
  type TDSXYWH = [...TSXY, ...TSWH, ...TDXYWH];

  interface CanvasRect {
    clearRect(...args: TXYWH): void;
    fillRect(...args: TXYWH): void;
    strokeRect(...args: TXYWH): void;
  }

  interface CanvasPath {
    arc(...args: [...TXY, radius: number, ...TAngles, counterclockwise?: boolean]): void;
    arcTo(...args: [...TXY1, ...TXY2, radius: number]): void;
    bezierCurveTo(...args: [...TCP1, ...TCP2, ...TXY]): void;
    ellipse(...args: [...TXY, ...TRadius, rotation: number, ...TAngles, counterclockwise?: boolean]): void;
    lineTo(...args: TXY): void;
    moveTo(...args: TXY): void;
    quadraticCurveTo(...args: [...TCP, ...TXY]): void;
    rect(...args: TXYWH): void;
    roundRect(...args: [...TXYWH, radii?: number | DOMPointInit | (number | DOMPointInit)[]]): void;
  }

  interface Path2D {
    // A
    arc(...args: [...TXY, radius: number, ...TAngles, counterclockwise?: boolean]): void;
    arcTo(...args: [...TXY1, ...TXY2, radius: number]): void;
    // C
    bezierCurveTo(...args: [...TCP1, ...TCP2, ...TXY]): void;
    ellipse(...args: [...TXY, ...TRadius, rotation: number, ...TAngles, counterclockwise?: boolean]): void;
    // L
    lineTo(...args: TXY): void;
    // M
    moveTo(...args: TXY): void;
    // Q
    quadraticCurveTo(...args: [...TCP, ...TXY]): void;
    rect(...args: TXYWH): void;
    roundRect(...args: [...TXYWH, radii?: number | DOMPointInit | (number | DOMPointInit)[]]): void;
    // Z - closepath
  }

  interface CanvasDrawImage {
    drawImage(image: CanvasImageSource, ...args: TDXY): void;
    drawImage(image: CanvasImageSource, ...args: TDXYWH): void;
    drawImage(image: CanvasImageSource, ...args: TDSXYWH): void;
  }

  interface CanvasImageData {
    createImageData(...args: [...TSWH, settings?: ImageDataSettings]): ImageData;
    getImageData(...args: [...TXYWH, settings?: ImageDataSettings]): ImageData;
    putImageData(imagedata: ImageData, ...args: TDXY): void;
    putImageData(imagedata: ImageData, ...args: [...TDXY, ...TDirtyXY, ...TDirtyWidthHeight]): void;
  }

  interface CanvasDrawPath {
    isPointInPath(...args: TXYFillRule): boolean;
    isPointInPath(path: Path2D, ...args: TXYFillRule): boolean;
    isPointInStroke(...args: TXY): boolean;
    isPointInStroke(path: Path2D, ...args: TXY): boolean;
  }

  interface CanvasFillStrokeStyles {
    createConicGradient(startAngle: number, ...args: TXY): CanvasGradient;
    createLinearGradient(...args: TXY01): CanvasGradient;
    createRadialGradient(...args: TXY01R): CanvasGradient;
  }

  interface CanvasText {
    fillText(text: string, ...args: TXYMaxWidth): void;
    strokeText(text: string, ...args: TXYMaxWidth): void;
  }

  interface CanvasTransform {
    scale(...args: TXY): void;
    setTransform(...args: TABCDEF): void;
    transform(...args: TABCDEF): void;
    translate(...args: TXY): void;
  }
}

const methods = [
  'clearRect',
  'fillRect',
  'strokeRect',
  'arc',
  'arcTo',
  'bezierCurveTo',
  'ellipse',
  'lineTo',
  'moveTo',
  'quadraticCurveTo',
  'rect',
  'roundRect',
  'drawImage',
  'createImageData',
  'getImageData',
  'putImageData',
  'isPointInPath',
  'isPointInStroke',
  'createConicGradient',
  'createLinearGradient',
  'createRadialGradient',
  'fillText',
  'strokeText',
  'scale',
  'setTransform',
  'transform',
  'translate'
] as const;

const mapped = (args: any[]) => {
  for (let i = 0; i < args.length; i++) {
    const element = args[i];

    if (element instanceof Vec2) {
      args.splice(i, 1, ...element);
      i += 1;
    }
  }

  return args;
};

const patch = <T extends (...args: any[]) => any>(func: T): T => (
  function (this: any, ...args: Parameters<T>) {
    return func.apply(this, mapped(args));
  }
) as T;

if (typeof CanvasRenderingContext2D !== 'undefined') {
  const { prototype } = CanvasRenderingContext2D;
  for (const key of methods) {
    if (key in prototype)
      Object.assign(prototype, {
        [key]: patch(prototype[key])
      });
  }
}


if (typeof Path2D !== 'undefined') {
  const { prototype } = Path2D;
  for (const key of methods) {
    if (key in prototype) {
      Object.assign(prototype, {
        [key]: patch((prototype as any)[key])
      });
    }
  }
}