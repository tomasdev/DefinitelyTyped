import { PNG } from "pngjs";
import { PNG as BrowserPNG } from "pngjs/browser";
import { createDeflate } from "zlib";
import fs = require("fs");

const pngs = [
    new PNG(),
    new PNG({}),
    new PNG({ width: 1 }),
    new PNG({ checkCRC: false }),
    new PNG({ deflateChunkSize: 3 }),
    new PNG({
        bitDepth: 8,
        checkCRC: true,
        colorType: 4,
        deflateChunkSize: 1,
        deflateFactory: createDeflate,
        deflateLevel: 1,
        deflateStrategy: 1,
        fill: false,
        filterType: 4,
        height: 1,
        inputHasAlpha: false,
        skipRescale: false,
        width: 1,
    }),
    new BrowserPNG(),
    new BrowserPNG({ filterType: [1, 2, 3] }),
    new BrowserPNG({}),
    new BrowserPNG({ width: 1 }),
    new BrowserPNG({ checkCRC: false }),
    new BrowserPNG({ deflateChunkSize: 3 }),
    new BrowserPNG({
        bitDepth: 8,
        checkCRC: true,
        colorType: 4,
        deflateChunkSize: 1,
        deflateFactory: createDeflate,
        deflateLevel: 1,
        deflateStrategy: 1,
        fill: false,
        filterType: 4,
        height: 1,
        inputHasAlpha: false,
        skipRescale: false,
        width: 1,
    }),
    new BrowserPNG({ filterType: [1, 2, 3] }),
];

const png = pngs[0];

if (png.readable) {
    console.log("readable");
}
if (png.writable) {
    console.log("writable");
}
png.width === 1;
png.height === 1;
png.gamma === 1;
png.adjustGamma();

png.bitblt(pngs[1]);
png.bitblt(pngs[1], 1);
png.bitblt(pngs[1], 1, 1);
png.bitblt(pngs[1], 1, 1, 1, 1, 1, 1);

png.on("metadata", metadata => {
    metadata.bpp === 1;
});
png.on("metadata", function(metadata) {
    this; // $ExpectType PNG
    this.width === metadata.width;
    this.height === metadata.height;
});
png.on("parsed", data => {
    data.byteLength === 1;
});
png.on("parsed", function(data) {
    this; // $ExpectType PNG
    this.adjustGamma();
    this.pack().pipe(fs.createWriteStream("out.png"));
});
png.on("error", error => {
    error === new Error("testing");
});
png.on("error", function(error) {
    this; // $ExpectType PNG
});
png.on("closed", () => {
    // closed
});
png.on("closed", function() {
    this; // $ExpectType PNG
});
png.on("foo", () => {});
png.on("foo", function() {
    this; // $ExpectType PNG
});

png.pack().adjustGamma();

png.parse("foo").adjustGamma();
png.parse(Buffer.from("foo")).adjustGamma();
png.parse("foo", (error, data) => {
    error.stack;
    data.adjustGamma();
}).adjustGamma();

PNG.adjustGamma(png);

PNG.bitblt(png, pngs[1]);
PNG.bitblt(png, pngs[1], 1, 1, 1, 1, 1, 1);

const pngWithMeta = PNG.sync.read(Buffer.from("foo"));
!pngWithMeta.alpha;
pngWithMeta.bpp === 1;
!pngWithMeta.color;
pngWithMeta.colorType === 0;
pngWithMeta.depth === 1;
pngWithMeta.height === 1;
!pngWithMeta.interlace;
!pngWithMeta.palette;
pngWithMeta.width === 1;
