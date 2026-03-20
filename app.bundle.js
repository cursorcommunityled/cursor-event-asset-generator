"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../node_modules/jszip/dist/jszip.min.js
  var require_jszip_min = __commonJS({
    "../node_modules/jszip/dist/jszip.min.js"(exports, module) {
      !(function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
        }
      })(function() {
        return (function s(a, o, h) {
          function u(r, e2) {
            if (!o[r]) {
              if (!a[r]) {
                var t = "function" == typeof __require && __require;
                if (!e2 && t) return t(r, true);
                if (l) return l(r, true);
                var n = new Error("Cannot find module '" + r + "'");
                throw n.code = "MODULE_NOT_FOUND", n;
              }
              var i = o[r] = { exports: {} };
              a[r][0].call(i.exports, function(e3) {
                var t2 = a[r][1][e3];
                return u(t2 || e3);
              }, i, i.exports, s, a, o, h);
            }
            return o[r].exports;
          }
          for (var l = "function" == typeof __require && __require, e = 0; e < h.length; e++) u(h[e]);
          return u;
        })({ 1: [function(e, t, r) {
          "use strict";
          var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function(e2) {
            for (var t2, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t2 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
            return h.join("");
          }, r.decode = function(e2) {
            var t2, r2, n, i, s, a, o = 0, h = 0, u = "data:";
            if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
            var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
            if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t2 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t2, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
            return l;
          };
        }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r) {
          "use strict";
          var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
          function o(e2, t2, r2, n2, i2) {
            this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
          }
          o.prototype = { getContentWorker: function() {
            var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
            return e2.on("end", function() {
              if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), e2;
          }, getCompressedWorker: function() {
            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          } }, o.createWorkerFrom = function(e2, t2, r2) {
            return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
          }, t.exports = o;
        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r) {
          "use strict";
          var n = e("./stream/GenericWorker");
          r.STORE = { magic: "\0\0", compressWorker: function() {
            return new n("STORE compression");
          }, uncompressWorker: function() {
            return new n("STORE decompression");
          } }, r.DEFLATE = e("./flate");
        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r) {
          "use strict";
          var n = e("./utils");
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2) {
            return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3.charCodeAt(a))];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : 0;
          };
        }, { "./utils": 32 }], 5: [function(e, t, r) {
          "use strict";
          r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}], 6: [function(e, t, r) {
          "use strict";
          var n = null;
          n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n };
        }, { lie: 37 }], 7: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
          function h(e2, t2) {
            a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
          }
          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
            this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
          }, h.prototype.flush = function() {
            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
          }, h.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function() {
            this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
            var t2 = this;
            this._pako.onData = function(e2) {
              t2.push({ data: e2, meta: t2.meta });
            };
          }, r.compressWorker = function(e2) {
            return new h("Deflate", e2);
          }, r.uncompressWorker = function() {
            return new h("Inflate", {});
          };
        }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r) {
          "use strict";
          function A(e2, t2) {
            var r2, n2 = "";
            for (r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
            return n2;
          }
          function n(e2, t2, r2, n2, i2, s2) {
            var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
            t2 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
            var S = 0;
            t2 && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0, C = 0;
            w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= (function(e3, t3) {
              var r3 = e3;
              return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
            })(h.unixPermissions, w)) : (C = 20, z |= (function(e3) {
              return 63 & (e3 || 0);
            })(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p };
          }
          var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
          function s(e2, t2, r2, n2) {
            i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          I.inherits(s, i), s.prototype.push = function(e2) {
            var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
            this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t2 + 100 * (r2 - n2 - 1)) / r2 : 100 } }));
          }, s.prototype.openedSource = function(e2) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
            var t2 = this.streamFiles && !e2.file.dir;
            if (t2) {
              var r2 = n(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({ data: r2.fileRecord, meta: { percent: 0 } });
            } else this.accumulate = true;
          }, s.prototype.closedSource = function(e2) {
            this.accumulate = false;
            var t2 = this.streamFiles && !e2.file.dir, r2 = n(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r2.dirRecord), t2) this.push({ data: (function(e3) {
              return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
            })(e2), meta: { percent: 100 } });
            else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function() {
            for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
            var r2 = this.bytesWritten - e2, n2 = (function(e3, t3, r3, n3, i2) {
              var s2 = I.transformTo("string", i2(n3));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
            })(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
            this.push({ data: n2, meta: { percent: 100 } });
          }, s.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function(e2) {
            this._sources.push(e2);
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
          }, s.prototype.error = function(e2) {
            var t2 = this._sources;
            if (!i.prototype.error.call(this, e2)) return false;
            for (var r2 = 0; r2 < t2.length; r2++) try {
              t2[r2].error(e2);
            } catch (e3) {
            }
            return true;
          }, s.prototype.lock = function() {
            i.prototype.lock.call(this);
            for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
          }, t.exports = s;
        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r) {
          "use strict";
          var u = e("../compressions"), n = e("./ZipFileWorker");
          r.generateWorker = function(e2, a, t2) {
            var o = new n(a.streamFiles, t2, a.platform, a.encodeFileName), h = 0;
            try {
              e2.forEach(function(e3, t3) {
                h++;
                var r2 = (function(e4, t4) {
                  var r3 = e4 || t4, n3 = u[r3];
                  if (!n3) throw new Error(r3 + " is not a valid compression method !");
                  return n3;
                })(t3.options.compression, a.compression), n2 = t3.options.compressionOptions || a.compressionOptions || {}, i = t3.dir, s = t3.date;
                t3._compressWorker(r2, n2).withStreamInfo("file", { name: e3, dir: i, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o);
              }), o.entriesCount = h;
            } catch (e3) {
              o.error(e3);
            }
            return o;
          };
        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r) {
          "use strict";
          function n() {
            if (!(this instanceof n)) return new n();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
              var e2 = new n();
              for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
              return e2;
            };
          }
          (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function(e2, t2) {
            return new n().loadAsync(e2, t2);
          }, n.external = e("./external"), t.exports = n;
        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r) {
          "use strict";
          var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
          function f(n2) {
            return new i.Promise(function(e2, t2) {
              var r2 = n2.decompressed.getContentWorker().pipe(new a());
              r2.on("error", function(e3) {
                t2(e3);
              }).on("end", function() {
                r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
              }).resume();
            });
          }
          t.exports = function(e2, o) {
            var h = this;
            return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), l.isNode && l.isStream(e2) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
              var t2 = new s(o);
              return t2.load(e3), t2;
            }).then(function(e3) {
              var t2 = [i.Promise.resolve(e3)], r2 = e3.files;
              if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t2.push(f(r2[n2]));
              return i.Promise.all(t2);
            }).then(function(e3) {
              for (var t2 = e3.shift(), r2 = t2.files, n2 = 0; n2 < r2.length; n2++) {
                var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
                h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
              }
              return t2.zipComment.length && (h.comment = t2.zipComment), h;
            });
          };
        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../stream/GenericWorker");
          function s(e2, t2) {
            i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
          }
          n.inherits(s, i), s.prototype._bindStream = function(e2) {
            var t2 = this;
            (this._stream = e2).pause(), e2.on("data", function(e3) {
              t2.push({ data: e3, meta: { percent: 0 } });
            }).on("error", function(e3) {
              t2.isPaused ? this.generatedError = e3 : t2.error(e3);
            }).on("end", function() {
              t2.isPaused ? t2._upstreamEnded = true : t2.end();
            });
          }, s.prototype.pause = function() {
            return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
          }, t.exports = s;
        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r) {
          "use strict";
          var i = e("readable-stream").Readable;
          function n(e2, t2, r2) {
            i.call(this, t2), this._helper = e2;
            var n2 = this;
            e2.on("data", function(e3, t3) {
              n2.push(e3) || n2._helper.pause(), r2 && r2(t3);
            }).on("error", function(e3) {
              n2.emit("error", e3);
            }).on("end", function() {
              n2.push(null);
            });
          }
          e("../utils").inherits(n, i), n.prototype._read = function() {
            this._helper.resume();
          }, t.exports = n;
        }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r) {
          "use strict";
          t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
            if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
            return new Buffer(e2, t2);
          }, allocBuffer: function(e2) {
            if (Buffer.alloc) return Buffer.alloc(e2);
            var t2 = new Buffer(e2);
            return t2.fill(0), t2;
          }, isBuffer: function(e2) {
            return Buffer.isBuffer(e2);
          }, isStream: function(e2) {
            return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
          } };
        }, {}], 15: [function(e, t, r) {
          "use strict";
          function s(e2, t2, r2) {
            var n2, i2 = u.getTypeOf(t2), s2 = u.extend(r2 || {}, f);
            s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n2 = _(e2)) && b.call(this, n2, true);
            var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
            r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i2 = "string");
            var o2 = null;
            o2 = t2 instanceof c || t2 instanceof l ? t2 : p.isNode && p.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
            var h2 = new d(e2, o2, s2);
            this.files[e2] = h2;
          }
          var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
            "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
            var t2 = e2.lastIndexOf("/");
            return 0 < t2 ? e2.substring(0, t2) : "";
          }, g = function(e2) {
            return "/" !== e2.slice(-1) && (e2 += "/"), e2;
          }, b = function(e2, t2) {
            return t2 = void 0 !== t2 ? t2 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
          };
          function h(e2) {
            return "[object RegExp]" === Object.prototype.toString.call(e2);
          }
          var n = { load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, forEach: function(e2) {
            var t2, r2, n2;
            for (t2 in this.files) n2 = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n2);
          }, filter: function(r2) {
            var n2 = [];
            return this.forEach(function(e2, t2) {
              r2(e2, t2) && n2.push(t2);
            }), n2;
          }, file: function(e2, t2, r2) {
            if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
            if (h(e2)) {
              var n2 = e2;
              return this.filter(function(e3, t3) {
                return !t3.dir && n2.test(e3);
              });
            }
            var i2 = this.files[this.root + e2];
            return i2 && !i2.dir ? i2 : null;
          }, folder: function(r2) {
            if (!r2) return this;
            if (h(r2)) return this.filter(function(e3, t3) {
              return t3.dir && r2.test(e3);
            });
            var e2 = this.root + r2, t2 = b.call(this, e2), n2 = this.clone();
            return n2.root = t2.name, n2;
          }, remove: function(r2) {
            r2 = this.root + r2;
            var e2 = this.files[r2];
            if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
            else for (var t2 = this.filter(function(e3, t3) {
              return t3.name.slice(0, r2.length) === r2;
            }), n2 = 0; n2 < t2.length; n2++) delete this.files[t2[n2].name];
            return this;
          }, generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, generateInternalStream: function(e2) {
            var t2, r2 = {};
            try {
              if ((r2 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
              u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
              var n2 = r2.comment || this.comment || "";
              t2 = o.generateWorker(this, r2, n2);
            } catch (e3) {
              (t2 = new l("error")).error(e3);
            }
            return new a(t2, r2.type || "string", r2.mimeType);
          }, generateAsync: function(e2, t2) {
            return this.generateInternalStream(e2).accumulate(t2);
          }, generateNodeStream: function(e2, t2) {
            return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
          } };
          t.exports = n;
        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r) {
          "use strict";
          t.exports = e("stream");
        }, { stream: void 0 }], 17: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
            for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data[this.zero + e2];
          }, i.prototype.lastIndexOfSignature = function(e2) {
            for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
            return -1;
          }, i.prototype.readAndCheckSignature = function(e2) {
            var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
            return t2 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
          }, i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return [];
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r) {
          "use strict";
          var n = e("../utils");
          function i(e2) {
            this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
          }
          i.prototype = { checkOffset: function(e2) {
            this.checkIndex(this.index + e2);
          }, checkIndex: function(e2) {
            if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
          }, setIndex: function(e2) {
            this.checkIndex(e2), this.index = e2;
          }, skip: function(e2) {
            this.setIndex(this.index + e2);
          }, byteAt: function() {
          }, readInt: function(e2) {
            var t2, r2 = 0;
            for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
            return this.index += e2, r2;
          }, readString: function(e2) {
            return n.transformTo("string", this.readData(e2));
          }, readData: function() {
          }, lastIndexOfSignature: function() {
          }, readAndCheckSignature: function() {
          }, readDate: function() {
            var e2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
          } }, t.exports = i;
        }, { "../utils": 32 }], 19: [function(e, t, r) {
          "use strict";
          var n = e("./Uint8ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data.charCodeAt(this.zero + e2);
          }, i.prototype.lastIndexOfSignature = function(e2) {
            return this.data.lastIndexOf(e2) - this.zero;
          }, i.prototype.readAndCheckSignature = function(e2) {
            return e2 === this.readData(4);
          }, i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r) {
          "use strict";
          var n = e("./ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
            var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
          t.exports = function(e2) {
            var t2 = n.getTypeOf(e2);
            return n.checkSupport(t2), "string" !== t2 || i.uint8array ? "nodebuffer" === t2 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
          };
        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r) {
          "use strict";
          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}], 24: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../utils");
          function s(e2) {
            n.call(this, "ConvertWorker to " + e2), this.destType = e2;
          }
          i.inherits(s, n), s.prototype.processChunk = function(e2) {
            this.push({ data: i.transformTo(this.destType, e2.data), meta: e2.meta });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../crc32");
          function s() {
            n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
            this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
          }, t.exports = s;
        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
          }
          n.inherits(s, i), s.prototype.processChunk = function(e2) {
            if (e2) {
              var t2 = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = t2 + e2.data.length;
            }
            i.prototype.processChunk.call(this, e2);
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataWorker");
            var t2 = this;
            this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
              t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
            }, function(e3) {
              t2.error(e3);
            });
          }
          n.inherits(s, i), s.prototype.cleanUp = function() {
            i.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
          }, s.prototype._tickAndRepeat = function() {
            this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
          }, s.prototype._tick = function() {
            if (this.isPaused || this.isFinished) return false;
            var e2 = null, t2 = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
              case "string":
                e2 = this.data.substring(this.index, t2);
                break;
              case "uint8array":
                e2 = this.data.subarray(this.index, t2);
                break;
              case "array":
              case "nodebuffer":
                e2 = this.data.slice(this.index, t2);
            }
            return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r) {
          "use strict";
          function n(e2) {
            this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
          }
          n.prototype = { push: function(e2) {
            this.emit("data", e2);
          }, end: function() {
            if (this.isFinished) return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (e2) {
              this.emit("error", e2);
            }
            return true;
          }, error: function(e2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
          }, on: function(e2, t2) {
            return this._listeners[e2].push(t2), this;
          }, cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          }, emit: function(e2, t2) {
            if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
          }, pipe: function(e2) {
            return e2.registerPrevious(this);
          }, registerPrevious: function(e2) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          }, resume: function() {
            if (!this.isPaused || this.isFinished) return false;
            var e2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
          }, flush: function() {
          }, processChunk: function(e2) {
            this.push(e2);
          }, withStreamInfo: function(e2, t2) {
            return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
          }, mergeStreamInfo: function() {
            for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
          }, lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          }, toString: function() {
            var e2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + e2 : e2;
          } }, t.exports = n;
        }, {}], 29: [function(e, t, r) {
          "use strict";
          var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
          if (n.nodestream) try {
            o = e("../nodejs/NodejsStreamOutputAdapter");
          } catch (e2) {
          }
          function l(e2, o2) {
            return new a.Promise(function(t2, r2) {
              var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
              e2.on("data", function(e3, t3) {
                n2.push(e3), o2 && o2(t3);
              }).on("error", function(e3) {
                n2 = [], r2(e3);
              }).on("end", function() {
                try {
                  var e3 = (function(e4, t3, r3) {
                    switch (e4) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", t3), r3);
                      case "base64":
                        return u.encode(t3);
                      default:
                        return h.transformTo(e4, t3);
                    }
                  })(s2, (function(e4, t3) {
                    var r3, n3 = 0, i3 = null, s3 = 0;
                    for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                    switch (e4) {
                      case "string":
                        return t3.join("");
                      case "array":
                        return Array.prototype.concat.apply([], t3);
                      case "uint8array":
                        for (i3 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i3.set(t3[r3], n3), n3 += t3[r3].length;
                        return i3;
                      case "nodebuffer":
                        return Buffer.concat(t3);
                      default:
                        throw new Error("concat : unsupported type '" + e4 + "'");
                    }
                  })(i2, n2), a2);
                  t2(e3);
                } catch (e4) {
                  r2(e4);
                }
                n2 = [];
              }).resume();
            });
          }
          function f(e2, t2, r2) {
            var n2 = t2;
            switch (t2) {
              case "blob":
              case "arraybuffer":
                n2 = "uint8array";
                break;
              case "base64":
                n2 = "string";
            }
            try {
              this._internalType = n2, this._outputType = t2, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
            } catch (e3) {
              this._worker = new s("error"), this._worker.error(e3);
            }
          }
          f.prototype = { accumulate: function(e2) {
            return l(this, e2);
          }, on: function(e2, t2) {
            var r2 = this;
            return "data" === e2 ? this._worker.on(e2, function(e3) {
              t2.call(r2, e3.data, e3.meta);
            }) : this._worker.on(e2, function() {
              h.delay(t2, arguments, r2);
            }), this;
          }, resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          }, pause: function() {
            return this._worker.pause(), this;
          }, toNodejsStream: function(e2) {
            if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
          } }, t.exports = f;
        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r) {
          "use strict";
          if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
          else {
            var n = new ArrayBuffer(0);
            try {
              r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
            } catch (e2) {
              try {
                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
              } catch (e3) {
                r.blob = false;
              }
            }
          }
          try {
            r.nodestream = !!e("readable-stream").Readable;
          } catch (e2) {
            r.nodestream = false;
          }
        }, { "readable-stream": 16 }], 31: [function(e, t, s) {
          "use strict";
          for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
          u[254] = u[254] = 1;
          function a() {
            n.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function l() {
            n.call(this, "utf-8 encode");
          }
          s.utf8encode = function(e2) {
            return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
              for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
              for (t2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
              return t2;
            })(e2);
          }, s.utf8decode = function(e2) {
            return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
              for (t2 = r2 = 0; t2 < s2; ) if ((n2 = e3[t2++]) < 128) a2[r2++] = n2;
              else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t2 += i2 - 1;
              else {
                for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t2 < s2; ) n2 = n2 << 6 | 63 & e3[t2++], i2--;
                1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
              }
              return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
            })(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
          }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
            var t2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r2 = t2;
                (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
              } else t2 = this.leftOver.concat(t2);
              this.leftOver = null;
            }
            var n2 = (function(e3, t3) {
              var r3;
              for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
              return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u[e3[r3]] > t3 ? r3 : t3;
            })(t2), i2 = t2;
            n2 !== t2.length && (h.uint8array ? (i2 = t2.subarray(0, n2), this.leftOver = t2.subarray(n2, t2.length)) : (i2 = t2.slice(0, n2), this.leftOver = t2.slice(n2, t2.length))), this.push({ data: s.utf8decode(i2), meta: e2.meta });
          }, a.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
            this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
          }, s.Utf8EncodeWorker = l;
        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
          "use strict";
          var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
          function n(e2) {
            return e2;
          }
          function l(e2, t2) {
            for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
            return t2;
          }
          e("setimmediate"), a.newBlob = function(t2, r2) {
            a.checkSupport("blob");
            try {
              return new Blob([t2], { type: r2 });
            } catch (e2) {
              try {
                var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return n2.append(t2), n2.getBlob(r2);
              } catch (e3) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var i = { stringifyByChunk: function(e2, t2, r2) {
            var n2 = [], i2 = 0, s2 = e2.length;
            if (s2 <= r2) return String.fromCharCode.apply(null, e2);
            for (; i2 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
            return n2.join("");
          }, stringifyByChar: function(e2) {
            for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
            return t2;
          }, applyCanBeUsed: { uint8array: (function() {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (e2) {
              return false;
            }
          })(), nodebuffer: (function() {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (e2) {
              return false;
            }
          })() } };
          function s(e2) {
            var t2 = 65536, r2 = a.getTypeOf(e2), n2 = true;
            if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t2; ) try {
              return i.stringifyByChunk(e2, r2, t2);
            } catch (e3) {
              t2 = Math.floor(t2 / 2);
            }
            return i.stringifyByChar(e2);
          }
          function f(e2, t2) {
            for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
            return t2;
          }
          a.applyFromCharCode = s;
          var c = {};
          c.string = { string: n, array: function(e2) {
            return l(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.string.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return l(e2, new Uint8Array(e2.length));
          }, nodebuffer: function(e2) {
            return l(e2, r.allocBuffer(e2.length));
          } }, c.array = { string: s, array: n, arraybuffer: function(e2) {
            return new Uint8Array(e2).buffer;
          }, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.arraybuffer = { string: function(e2) {
            return s(new Uint8Array(e2));
          }, array: function(e2) {
            return f(new Uint8Array(e2), new Array(e2.byteLength));
          }, arraybuffer: n, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(new Uint8Array(e2));
          } }, c.uint8array = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return e2.buffer;
          }, uint8array: n, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.nodebuffer = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.nodebuffer.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return f(e2, new Uint8Array(e2.length));
          }, nodebuffer: n }, a.transformTo = function(e2, t2) {
            if (t2 = t2 || "", !e2) return t2;
            a.checkSupport(e2);
            var r2 = a.getTypeOf(t2);
            return c[r2][e2](t2);
          }, a.resolve = function(e2) {
            for (var t2 = e2.split("/"), r2 = [], n2 = 0; n2 < t2.length; n2++) {
              var i2 = t2[n2];
              "." === i2 || "" === i2 && 0 !== n2 && n2 !== t2.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
            }
            return r2.join("/");
          }, a.getTypeOf = function(e2) {
            return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && e2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function(e2) {
            if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
            var t2, r2, n2 = "";
            for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
            return n2;
          }, a.delay = function(e2, t2, r2) {
            setImmediate(function() {
              e2.apply(r2 || null, t2 || []);
            });
          }, a.inherits = function(e2, t2) {
            function r2() {
            }
            r2.prototype = t2.prototype, e2.prototype = new r2();
          }, a.extend = function() {
            var e2, t2, r2 = {};
            for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
            return r2;
          }, a.prepareContent = function(r2, e2, n2, i2, s2) {
            return u.Promise.resolve(e2).then(function(n3) {
              return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) && "undefined" != typeof FileReader ? new u.Promise(function(t2, r3) {
                var e3 = new FileReader();
                e3.onload = function(e4) {
                  t2(e4.target.result);
                }, e3.onerror = function(e4) {
                  r3(e4.target.error);
                }, e3.readAsArrayBuffer(n3);
              }) : n3;
            }).then(function(e3) {
              var t2 = a.getTypeOf(e3);
              return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = (function(e4) {
                return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
              })(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
          function h(e2) {
            this.files = [], this.loadOptions = e2;
          }
          h.prototype = { checkSignature: function(e2) {
            if (!this.reader.readAndCheckSignature(e2)) {
              this.reader.index -= 4;
              var t2 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t2) + ", expected " + i.pretty(e2) + ")");
            }
          }, isSignature: function(e2, t2) {
            var r2 = this.reader.index;
            this.reader.setIndex(e2);
            var n2 = this.reader.readString(4) === t2;
            return this.reader.setIndex(r2), n2;
          }, readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t2, e2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          }, readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var e2, t2, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r2 };
          }, readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          }, readLocalFiles: function() {
            var e2, t2;
            for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
          }, readCentralDir: function() {
            var e2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          }, readEndOfCentral: function() {
            var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(e2);
            var t2 = e2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var n2 = t2 - r2;
            if (0 < n2) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
            else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
          }, prepareReader: function(e2) {
            this.reader = n(e2);
          }, load: function(e2) {
            this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          } }, t.exports = h;
        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
          function l(e2, t2) {
            this.options = e2, this.loadOptions = t2;
          }
          l.prototype = { isEncrypted: function() {
            return 1 == (1 & this.bitFlag);
          }, useUTF8: function() {
            return 2048 == (2048 & this.bitFlag);
          }, readLocalPart: function(e2) {
            var t2, r2;
            if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if (null === (t2 = (function(e3) {
              for (var t3 in h) if (Object.prototype.hasOwnProperty.call(h, t3) && h[t3].magic === e3) return h[t3];
              return null;
            })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
          }, readCentralPart: function(e2) {
            this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
            var t2 = e2.readInt(2);
            if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
          }, processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var e2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
          }, parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var e2 = n(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          }, readExtraFields: function(e2) {
            var t2, r2, n2, i2 = e2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t2] = { id: t2, length: r2, value: n2 };
            e2.setIndex(i2);
          }, handleUTF8: function() {
            var e2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var t2 = this.findExtraFieldUnicodePath();
              if (null !== t2) this.fileNameStr = t2;
              else {
                var r2 = s.transformTo(e2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var n2 = this.findExtraFieldUnicodeComment();
              if (null !== n2) this.fileCommentStr = n2;
              else {
                var i2 = s.transformTo(e2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(i2);
              }
            }
          }, findExtraFieldUnicodePath: function() {
            var e2 = this.extraFields[28789];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          }, findExtraFieldUnicodeComment: function() {
            var e2 = this.extraFields[25461];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          } }, t.exports = l;
        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r) {
          "use strict";
          function n(e2, t2, r2) {
            this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
          }
          var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
          n.prototype = { internalStream: function(e2) {
            var t2 = null, r2 = "string";
            try {
              if (!e2) throw new Error("No output type specified.");
              var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
              "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
              var i2 = !this._dataBinary;
              i2 && !n2 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
            } catch (e3) {
              (t2 = new h("error")).error(e3);
            }
            return new s(t2, r2, "");
          }, async: function(e2, t2) {
            return this.internalStream(e2).accumulate(t2);
          }, nodeStream: function(e2, t2) {
            return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
          }, _compressWorker: function(e2, t2) {
            if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t2);
          }, _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
          } };
          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
          t.exports = n;
        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l, t) {
          (function(t2) {
            "use strict";
            var r, n, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
            if (e2) {
              var i = 0, s = new e2(u), a = t2.document.createTextNode("");
              s.observe(a, { characterData: true }), r = function() {
                a.data = i = ++i % 2;
              };
            } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
              var e3 = t2.document.createElement("script");
              e3.onreadystatechange = function() {
                u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
              }, t2.document.documentElement.appendChild(e3);
            } : function() {
              setTimeout(u, 0);
            };
            else {
              var o = new t2.MessageChannel();
              o.port1.onmessage = u, r = function() {
                o.port2.postMessage(0);
              };
            }
            var h = [];
            function u() {
              var e3, t3;
              n = true;
              for (var r2 = h.length; r2; ) {
                for (t3 = h, h = [], e3 = -1; ++e3 < r2; ) t3[e3]();
                r2 = h.length;
              }
              n = false;
            }
            l.exports = function(e3) {
              1 !== h.push(e3) || n || r();
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 37: [function(e, t, r) {
          "use strict";
          var i = e("immediate");
          function u() {
          }
          var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
          function o(e2) {
            if ("function" != typeof e2) throw new TypeError("resolver must be a function");
            this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
          }
          function h(e2, t2, r2) {
            this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
          }
          function f(t2, r2, n2) {
            i(function() {
              var e2;
              try {
                e2 = r2(n2);
              } catch (e3) {
                return l.reject(t2, e3);
              }
              e2 === t2 ? l.reject(t2, new TypeError("Cannot resolve promise with itself")) : l.resolve(t2, e2);
            });
          }
          function c(e2) {
            var t2 = e2 && e2.then;
            if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
              t2.apply(e2, arguments);
            };
          }
          function d(t2, e2) {
            var r2 = false;
            function n2(e3) {
              r2 || (r2 = true, l.reject(t2, e3));
            }
            function i2(e3) {
              r2 || (r2 = true, l.resolve(t2, e3));
            }
            var s2 = p(function() {
              e2(i2, n2);
            });
            "error" === s2.status && n2(s2.value);
          }
          function p(e2, t2) {
            var r2 = {};
            try {
              r2.value = e2(t2), r2.status = "success";
            } catch (e3) {
              r2.status = "error", r2.value = e3;
            }
            return r2;
          }
          (t.exports = o).prototype.finally = function(t2) {
            if ("function" != typeof t2) return this;
            var r2 = this.constructor;
            return this.then(function(e2) {
              return r2.resolve(t2()).then(function() {
                return e2;
              });
            }, function(e2) {
              return r2.resolve(t2()).then(function() {
                throw e2;
              });
            });
          }, o.prototype.catch = function(e2) {
            return this.then(null, e2);
          }, o.prototype.then = function(e2, t2) {
            if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
            var r2 = new this.constructor(u);
            this.state !== n ? f(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h(r2, e2, t2));
            return r2;
          }, h.prototype.callFulfilled = function(e2) {
            l.resolve(this.promise, e2);
          }, h.prototype.otherCallFulfilled = function(e2) {
            f(this.promise, this.onFulfilled, e2);
          }, h.prototype.callRejected = function(e2) {
            l.reject(this.promise, e2);
          }, h.prototype.otherCallRejected = function(e2) {
            f(this.promise, this.onRejected, e2);
          }, l.resolve = function(e2, t2) {
            var r2 = p(c, t2);
            if ("error" === r2.status) return l.reject(e2, r2.value);
            var n2 = r2.value;
            if (n2) d(e2, n2);
            else {
              e2.state = a, e2.outcome = t2;
              for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t2);
            }
            return e2;
          }, l.reject = function(e2, t2) {
            e2.state = s, e2.outcome = t2;
            for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t2);
            return e2;
          }, o.resolve = function(e2) {
            if (e2 instanceof this) return e2;
            return l.resolve(new this(u), e2);
          }, o.reject = function(e2) {
            var t2 = new this(u);
            return l.reject(t2, e2);
          }, o.all = function(e2) {
            var r2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var n2 = e2.length, i2 = false;
            if (!n2) return this.resolve([]);
            var s2 = new Array(n2), a2 = 0, t2 = -1, o2 = new this(u);
            for (; ++t2 < n2; ) h2(e2[t2], t2);
            return o2;
            function h2(e3, t3) {
              r2.resolve(e3).then(function(e4) {
                s2[t3] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
              }, function(e4) {
                i2 || (i2 = true, l.reject(o2, e4));
              });
            }
          }, o.race = function(e2) {
            var t2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var r2 = e2.length, n2 = false;
            if (!r2) return this.resolve([]);
            var i2 = -1, s2 = new this(u);
            for (; ++i2 < r2; ) a2 = e2[i2], t2.resolve(a2).then(function(e3) {
              n2 || (n2 = true, l.resolve(s2, e3));
            }, function(e3) {
              n2 || (n2 = true, l.reject(s2, e3));
            });
            var a2;
            return s2;
          };
        }, { immediate: 36 }], 38: [function(e, t, r) {
          "use strict";
          var n = {};
          (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
        }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r) {
          "use strict";
          var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
          function p(e2) {
            if (!(this instanceof p)) return new p(e2);
            this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
            if (r2 !== l) throw new Error(i[r2]);
            if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
              var n2;
              if (n2 = "string" == typeof t2.dictionary ? h.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
              this._dict_set = true;
            }
          }
          function n(e2, t2) {
            var r2 = new p(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
            return r2.result;
          }
          p.prototype.push = function(e2, t2) {
            var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
            do {
              if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
              0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
            } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
            return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
          }, p.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, p.prototype.onEnd = function(e2) {
            e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, n(e2, t2);
          }, r.gzip = function(e2, t2) {
            return (t2 = t2 || {}).gzip = true, n(e2, t2);
          };
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r) {
          "use strict";
          var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
          function a(e2) {
            if (!(this instanceof a)) return new a(e2);
            this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
            var r2 = c.inflateInit2(this.strm, t2.windowBits);
            if (r2 !== m.Z_OK) throw new Error(n[r2]);
            this.header = new s(), c.inflateGetHeader(this.strm, this.header);
          }
          function o(e2, t2) {
            var r2 = new a(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
            return r2.result;
          }
          a.prototype.push = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
            do {
              if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
              h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
            } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
            return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, a.prototype.onEnd = function(e2) {
            e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, o(e2, t2);
          }, r.ungzip = o;
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
          r.assign = function(e2) {
            for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
              var r2 = t2.shift();
              if (r2) {
                if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
                for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
              }
            }
            return e2;
          }, r.shrinkBuf = function(e2, t2) {
            return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
          };
          var i = { arraySet: function(e2, t2, r2, n2, i2) {
            if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n2), i2);
            else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            var t2, r2, n2, i2, s2, a;
            for (t2 = n2 = 0, r2 = e2.length; t2 < r2; t2++) n2 += e2[t2].length;
            for (a = new Uint8Array(n2), t2 = i2 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i2), i2 += s2.length;
            return a;
          } }, s = { arraySet: function(e2, t2, r2, n2, i2) {
            for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            return [].concat.apply([], e2);
          } };
          r.setTyped = function(e2) {
            e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(n);
        }, {}], 42: [function(e, t, r) {
          "use strict";
          var h = e("./common"), i = true, s = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (e2) {
            i = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (e2) {
            s = false;
          }
          for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
          function l(e2, t2) {
            if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t2));
            for (var r2 = "", n2 = 0; n2 < t2; n2++) r2 += String.fromCharCode(e2[n2]);
            return r2;
          }
          u[254] = u[254] = 1, r.string2buf = function(e2) {
            var t2, r2, n2, i2, s2, a = e2.length, o = 0;
            for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          }, r.buf2binstring = function(e2) {
            return l(e2, e2.length);
          }, r.binstring2buf = function(e2) {
            for (var t2 = new h.Buf8(e2.length), r2 = 0, n2 = t2.length; r2 < n2; r2++) t2[r2] = e2.charCodeAt(r2);
            return t2;
          }, r.buf2string = function(e2, t2) {
            var r2, n2, i2, s2, a = t2 || e2.length, o = new Array(2 * a);
            for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
            else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
            else {
              for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
              1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
            }
            return l(o, n2);
          }, r.utf8border = function(e2, t2) {
            var r2;
            for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
            return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u[e2[r2]] > t2 ? r2 : t2;
          };
        }, { "./common": 41 }], 43: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2, r2, n) {
            for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
              for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t2[n++] | 0) | 0, --a; ) ;
              i %= 65521, s %= 65521;
            }
            return i | s << 16 | 0;
          };
        }, {}], 44: [function(e, t, r) {
          "use strict";
          t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
        }, {}], 45: [function(e, t, r) {
          "use strict";
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2, r2, n) {
            var i = o, s = n + r2;
            e2 ^= -1;
            for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t2[a])];
            return -1 ^ e2;
          };
        }, {}], 46: [function(e, t, r) {
          "use strict";
          var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
          function R(e2, t2) {
            return e2.msg = n[t2], t2;
          }
          function T(e2) {
            return (e2 << 1) - (4 < e2 ? 9 : 0);
          }
          function D(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          function F(e2) {
            var t2 = e2.state, r2 = t2.pending;
            r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
          }
          function N(e2, t2) {
            u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F(e2.strm);
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = t2;
          }
          function P(e2, t2) {
            e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
          }
          function L(e2, t2) {
            var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
            do {
              if (u2[(r2 = t2) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
                s2 += 2, r2++;
                do {
                } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
                if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                  if (e2.match_start = t2, o2 <= (a2 = n2)) break;
                  d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
                }
              }
            } while ((t2 = f2[t2 & l2]) > h2 && 0 != --i2);
            return a2 <= e2.lookahead ? a2 : e2.lookahead;
          }
          function j(e2) {
            var t2, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
            do {
              if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
                for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t2 = r2 = e2.hash_size; n2 = e2.head[--t2], e2.head[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                for (t2 = r2 = f2; n2 = e2.prev[--t2], e2.prev[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                i2 += f2;
              }
              if (0 === e2.strm.avail_in) break;
              if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
            } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
          }
          function Z(e2, t2) {
            for (var r2, n2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
                for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
                e2.strstart++;
              } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
              else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
              if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function W(e2, t2) {
            for (var r2, n2, i2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
                for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
                if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
              } else if (e2.match_available) {
                if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
              } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
            }
            return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function M(e2, t2, r2, n2, i2) {
            this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n2, this.func = i2;
          }
          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function G(e2) {
            var t2;
            return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C : E, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l, u._tr_init(t2), m) : R(e2, _);
          }
          function K(e2) {
            var t2 = G(e2);
            return t2 === m && (function(e3) {
              e3.window_size = 2 * e3.w_size, D(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
            })(e2.state), t2;
          }
          function Y(e2, t2, r2, n2, i2, s2) {
            if (!e2) return _;
            var a2 = 1;
            if (t2 === g && (t2 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R(e2, _);
            8 === n2 && (n2 = 9);
            var o2 = new H();
            return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r2, K(e2);
          }
          h = [new M(0, 0, 0, 0, function(e2, t2) {
            var r2 = 65535;
            for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
              if (e2.lookahead <= 1) {
                if (j(e2), 0 === e2.lookahead && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              e2.strstart += e2.lookahead, e2.lookahead = 0;
              var n2 = e2.block_start + r2;
              if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
              if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = 0, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e2, t2) {
            return Y(e2, t2, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t2) {
            return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t2, m) : _;
          }, r.deflate = function(e2, t2) {
            var r2, n2, i2, s2;
            if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R(e2, _) : _;
            if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t2 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
            if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t2, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
            else {
              var a2 = v + (n2.w_bits - 8 << 4) << 8;
              a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P(n2, a2), 0 !== n2.strstart && (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), e2.adler = 1;
            }
            if (69 === n2.status) if (n2.gzhead.extra) {
              for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
            } else n2.status = 73;
            if (73 === n2.status) if (n2.gzhead.name) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
            } else n2.status = 91;
            if (91 === n2.status) if (n2.gzhead.comment) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
            } else n2.status = 103;
            if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
              if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
            } else if (0 === e2.avail_in && T(t2) <= T(r2) && t2 !== f) return R(e2, -5);
            if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
            if (0 !== e2.avail_in || 0 !== n2.lookahead || t2 !== l && 666 !== n2.status) {
              var o2 = 2 === n2.strategy ? (function(e3, t3) {
                for (var r3; ; ) {
                  if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                    if (t3 === l) return A;
                    break;
                  }
                  if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : 3 === n2.strategy ? (function(e3, t3) {
                for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                  if (e3.lookahead <= S) {
                    if (j(e3), e3.lookahead <= S && t3 === l) return A;
                    if (0 === e3.lookahead) break;
                  }
                  if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                    s3 = e3.strstart + S;
                    do {
                    } while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                    e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                  }
                  if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : h[n2.level].func(n2, t2);
              if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
              if (o2 === I && (1 === t2 ? u._tr_align(n2) : 5 !== t2 && (u._tr_stored_block(n2, 0, 0, false), 3 === t2 && (D(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
            }
            return t2 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
          }, r.deflateEnd = function(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state.status) !== C && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E && 666 !== t2 ? R(e2, _) : (e2.state = null, t2 === E ? R(e2, -3) : m) : _;
          }, r.deflateSetDictionary = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t2.length;
            if (!e2 || !e2.state) return _;
            if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
            for (1 === s2 && (e2.adler = d(e2.adler, t2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t2, l2 - r2.w_size, r2.w_size, 0), t2 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t2, j(r2); r2.lookahead >= x; ) {
              for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
              r2.strstart = n2, r2.lookahead = x - 1, j(r2);
            }
            return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
          };
        }, {}], 48: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2) {
            var r2, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
            r2 = e2.state, n = e2.next_in, z = e2.input, i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
            e: do {
              p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
              t: for (; ; ) {
                if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (d & (1 << y) - 1)];
                      continue t;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break e;
                    }
                    e2.msg = "invalid literal/length code", r2.mode = 30;
                    break e;
                  }
                  w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                  r: for (; ; ) {
                    if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                      if (0 == (64 & y)) {
                        v = _[(65535 & v) + (d & (1 << y) - 1)];
                        continue r;
                      }
                      e2.msg = "invalid distance code", r2.mode = 30;
                      break e;
                    }
                    if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (d >>>= y, p -= y, (y = s - a) < k) {
                      if (l < (y = k - y) && r2.sane) {
                        e2.msg = "invalid distance too far back", r2.mode = 30;
                        break e;
                      }
                      if (S = c, (x = 0) === f) {
                        if (x += u - y, y < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      } else if (f < y) {
                        if (x += u + f - y, (y -= f) < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          if (x = 0, f < w) {
                            for (w -= y = f; C[s++] = c[x++], --y; ) ;
                            x = s - k, S = C;
                          }
                        }
                      } else if (x += f - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                      for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                      w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                    } else {
                      for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                      w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                    }
                    break;
                  }
                }
                break;
              }
            } while (n < i && s < o);
            n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
          };
        }, {}], 49: [function(e, t, r) {
          "use strict";
          var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, n = 852, i = 592;
          function L(e2) {
            return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
          }
          function s() {
            this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function a(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I.Buf32(n), t2.distcode = t2.distdyn = new I.Buf32(i), t2.sane = 1, t2.back = -1, N) : U;
          }
          function o(e2) {
            var t2;
            return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U;
          }
          function h(e2, t2) {
            var r2, n2;
            return e2 && e2.state ? (n2 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U : (null !== n2.window && n2.wbits !== t2 && (n2.window = null), n2.wrap = r2, n2.wbits = t2, o(e2))) : U;
          }
          function u(e2, t2) {
            var r2, n2;
            return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t2)) !== N && (e2.state = null), r2) : U;
          }
          var l, f, c = true;
          function j(e2) {
            if (c) {
              var t2;
              for (l = new I.Buf32(512), f = new I.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
              for (; t2 < 256; ) e2.lens[t2++] = 9;
              for (; t2 < 280; ) e2.lens[t2++] = 7;
              for (; t2 < 288; ) e2.lens[t2++] = 8;
              for (T(D, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
              T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
            }
            e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
          }
          function Z(e2, t2, r2, n2) {
            var i2, s2 = e2.state;
            return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t2, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t2, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
          }
          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
            return u(e2, 15);
          }, r.inflateInit2 = u, r.inflate = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
            12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
            e: for (; ; ) switch (r2.mode) {
              case P:
                if (0 === r2.wrap) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && 35615 === u2) {
                  E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  e2.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if (8 != (15 & u2)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
                else if (k > r2.wbits) {
                  e2.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, 8 != (255 & r2.flags)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  e2.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                } else r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    e2.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                e2.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (5 === t2 || 6 === t2) break e;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, 6 !== t2) break;
                    u2 >>>= 2, l2 -= 2;
                    break e;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    e2.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  e2.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t2) break e;
              case 15:
                r2.mode = 16;
              case 16:
                if (d = r2.length) {
                  if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                  I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  e2.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                  else {
                    if (16 === b) {
                      for (z = _ + 2; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                        e2.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _ + 7; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + d > r2.nlen + r2.ndist) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; d--; ) r2.lens[r2.have++] = k;
                  }
                }
                if (30 === r2.mode) break;
                if (0 === r2.lens[256]) {
                  e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  e2.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, 6 === t2) break e;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o2 && 258 <= h2) {
                  e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                  e2.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (0 === h2) break e;
                if (d = c2 - h2, r2.offset > d) {
                  if ((d = r2.offset - d) > r2.whave && r2.sane) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
                } else m = i2, p = a2 - r2.offset, d = r2.length;
                for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
                0 === r2.length && (r2.mode = 21);
                break;
              case 26:
                if (0 === h2) break e;
                i2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 |= n2[s2++] << l2, l2 += 8;
                  }
                  if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    e2.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    e2.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break e;
              case 30:
                x = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
            return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t2) && x === N && (x = -5), x);
          }, r.inflateEnd = function(e2) {
            if (!e2 || !e2.state) return U;
            var t2 = e2.state;
            return t2.window && (t2.window = null), e2.state = null, N;
          }, r.inflateGetHeader = function(e2, t2) {
            var r2;
            return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t2).done = false, N) : U;
          }, r.inflateSetDictionary = function(e2, t2) {
            var r2, n2 = t2.length;
            return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t2, n2, 0) !== r2.check ? -3 : Z(e2, t2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r) {
          "use strict";
          var D = e("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          t.exports = function(e2, t2, r2, n, i, s, a, o) {
            var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
            for (b = 0; b <= 15; b++) O[b] = 0;
            for (v = 0; v < n; v++) O[t2[r2 + v]]++;
            for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
            if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
            for (y = 1; y < w && 0 === O[y]; y++) ;
            for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
            if (0 < z && (0 === e2 || 1 !== w)) return -1;
            for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
            for (v = 0; v < n; v++) 0 !== t2[r2 + v] && (a[B[t2[r2 + v]]++] = v);
            if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
            for (; ; ) {
              for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
              for (h = 1 << b - 1; E & h; ) h >>= 1;
              if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                if (b === w) break;
                b = t2[r2 + a[v]];
              }
              if (k < b && (E & f) !== l) {
                for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
                if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
                i[l = E & f] = k << 24 | x << 16 | c - s | 0;
              }
            }
            return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, { "../utils/common": 41 }], 51: [function(e, t, r) {
          "use strict";
          t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
        }, {}], 52: [function(e, t, r) {
          "use strict";
          var i = e("../utils/common"), o = 0, h = 1;
          function n(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
          n(z);
          var C = new Array(2 * f);
          n(C);
          var E = new Array(512);
          n(E);
          var A = new Array(256);
          n(A);
          var I = new Array(a);
          n(I);
          var O, B, R, T = new Array(f);
          function D(e2, t2, r2, n2, i2) {
            this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
          }
          function F(e2, t2) {
            this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
          }
          function N(e2) {
            return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
          }
          function P(e2, t2, r2) {
            e2.bi_valid > d - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
          }
          function L(e2, t2, r2) {
            P(e2, r2[2 * t2], r2[2 * t2 + 1]);
          }
          function j(e2, t2) {
            for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
            return r2 >>> 1;
          }
          function Z(e2, t2, r2) {
            var n2, i2, s2 = new Array(g + 1), a2 = 0;
            for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
            for (i2 = 0; i2 <= t2; i2++) {
              var o2 = e2[2 * i2 + 1];
              0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
            }
          }
          function W(e2) {
            var t2;
            for (t2 = 0; t2 < l; t2++) e2.dyn_ltree[2 * t2] = 0;
            for (t2 = 0; t2 < f; t2++) e2.dyn_dtree[2 * t2] = 0;
            for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
            e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
          }
          function M(e2) {
            8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
          }
          function H(e2, t2, r2, n2) {
            var i2 = 2 * t2, s2 = 2 * r2;
            return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t2] <= n2[r2];
          }
          function G(e2, t2, r2) {
            for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t2, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
            e2.heap[r2] = n2;
          }
          function K(e2, t2, r2) {
            var n2, i2, s2, a2, o2 = 0;
            if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t2) : (L(e2, (s2 = A[i2]) + u + 1, t2), 0 !== (a2 = w[s2]) && P(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
            L(e2, m, t2);
          }
          function Y(e2, t2) {
            var r2, n2, i2, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h2 = t2.stat_desc.elems, u2 = -1;
            for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
            for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
            for (t2.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
            for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
            e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t3) {
              var r3, n3, i3, s3, a3, o3, h3 = t3.dyn_tree, u3 = t3.max_code, l2 = t3.stat_desc.static_tree, f2 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p2 = t3.stat_desc.max_length, m2 = 0;
              for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
              for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
              if (0 !== m2) {
                do {
                  for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                  e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
                } while (0 < m2);
                for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
              }
            })(e2, t2), Z(s2, u2, e2.bl_count);
          }
          function X(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), t2[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t2[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
          }
          function V(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t2[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
              if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
              else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P(e2, o2 - 11, 7));
              s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
            }
          }
          n(T);
          var q = false;
          function J(e2, t2, r2, n2) {
            P(e2, (s << 1) + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
            })(e2, t2, r2, true);
          }
          r._tr_init = function(e2) {
            q || ((function() {
              var e3, t2, r2, n2, i2, s2 = new Array(g + 1);
              for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
              for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
              for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
              for (t2 = 0; t2 <= g; t2++) s2[t2] = 0;
              for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
              for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
              for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
              O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
            })(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
          }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t2, r2, n2) {
            var i2, s2, a2 = 0;
            0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
              var t3, r3 = 4093624447;
              for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o;
              if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
              for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h;
              return o;
            })(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = (function(e3) {
              var t3;
              for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S[t3] + 1]; t3--) ;
              return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
            })(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t2 ? J(e2, t2, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P(e2, 4 + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              var i3;
              for (P(e3, t3 - 257, 5), P(e3, r3 - 1, 5), P(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P(e3, e3.bl_tree[2 * S[i3] + 1], 3);
              V(e3, e3.dyn_ltree, t3 - 1), V(e3, e3.dyn_dtree, r3 - 1);
            })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
          }, r._tr_tally = function(e2, t2, r2) {
            return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
          }, r._tr_align = function(e2) {
            P(e2, 2, 3), L(e2, m, z), (function(e3) {
              16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
            })(e2);
          };
        }, { "../utils/common": 41 }], 53: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}], 54: [function(e, t, r) {
          (function(e2) {
            !(function(r2, n) {
              "use strict";
              if (!r2.setImmediate) {
                var i, s, t2, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
                e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                  process.nextTick(function() {
                    c(e4);
                  });
                } : (function() {
                  if (r2.postMessage && !r2.importScripts) {
                    var e4 = true, t3 = r2.onmessage;
                    return r2.onmessage = function() {
                      e4 = false;
                    }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                  }
                })() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                  r2.postMessage(a + e4, "*");
                }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                  c(e4.data);
                }, function(e4) {
                  t2.port2.postMessage(e4);
                }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                  var t3 = l.createElement("script");
                  t3.onreadystatechange = function() {
                    c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                  }, s.appendChild(t3);
                }) : function(e4) {
                  setTimeout(c, 0, e4);
                }, e3.setImmediate = function(e4) {
                  "function" != typeof e4 && (e4 = new Function("" + e4));
                  for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                  var n2 = { callback: e4, args: t3 };
                  return h[o] = n2, i(o), o++;
                }, e3.clearImmediate = f;
              }
              function f(e4) {
                delete h[e4];
              }
              function c(e4) {
                if (u) setTimeout(c, 0, e4);
                else {
                  var t3 = h[e4];
                  if (t3) {
                    u = true;
                    try {
                      !(function(e5) {
                        var t4 = e5.callback, r3 = e5.args;
                        switch (r3.length) {
                          case 0:
                            t4();
                            break;
                          case 1:
                            t4(r3[0]);
                            break;
                          case 2:
                            t4(r3[0], r3[1]);
                            break;
                          case 3:
                            t4(r3[0], r3[1], r3[2]);
                            break;
                          default:
                            t4.apply(n, r3);
                        }
                      })(t3);
                    } finally {
                      f(e4), u = false;
                    }
                  }
                }
              }
              function d(e4) {
                e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
              }
            })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}] }, {}, [10])(10);
      });
    }
  });

  // ../node_modules/html-to-image/es/util.js
  function resolveUrl(url, baseUrl) {
    if (url.match(/^[a-z]+:\/\//i)) {
      return url;
    }
    if (url.match(/^\/\//)) {
      return window.location.protocol + url;
    }
    if (url.match(/^[a-z]+:/i)) {
      return url;
    }
    const doc = document.implementation.createHTMLDocument();
    const base = doc.createElement("base");
    const a = doc.createElement("a");
    doc.head.appendChild(base);
    doc.body.appendChild(a);
    if (baseUrl) {
      base.href = baseUrl;
    }
    a.href = url;
    return a.href;
  }
  var uuid = /* @__PURE__ */ (() => {
    let counter = 0;
    const random = () => (
      // eslint-disable-next-line no-bitwise
      `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
    );
    return () => {
      counter += 1;
      return `u${random()}${counter}`;
    };
  })();
  function toArray(arrayLike) {
    const arr = [];
    for (let i = 0, l = arrayLike.length; i < l; i++) {
      arr.push(arrayLike[i]);
    }
    return arr;
  }
  var styleProps = null;
  function getStyleProperties(options = {}) {
    if (styleProps) {
      return styleProps;
    }
    if (options.includeStyleProperties) {
      styleProps = options.includeStyleProperties;
      return styleProps;
    }
    styleProps = toArray(window.getComputedStyle(document.documentElement));
    return styleProps;
  }
  function px(node, styleProperty) {
    const win = node.ownerDocument.defaultView || window;
    const val = win.getComputedStyle(node).getPropertyValue(styleProperty);
    return val ? parseFloat(val.replace("px", "")) : 0;
  }
  function getNodeWidth(node) {
    const leftBorder = px(node, "border-left-width");
    const rightBorder = px(node, "border-right-width");
    return node.clientWidth + leftBorder + rightBorder;
  }
  function getNodeHeight(node) {
    const topBorder = px(node, "border-top-width");
    const bottomBorder = px(node, "border-bottom-width");
    return node.clientHeight + topBorder + bottomBorder;
  }
  function getImageSize(targetNode, options = {}) {
    const width = options.width || getNodeWidth(targetNode);
    const height = options.height || getNodeHeight(targetNode);
    return { width, height };
  }
  function getPixelRatio() {
    let ratio;
    let FINAL_PROCESS;
    try {
      FINAL_PROCESS = process;
    } catch (e) {
    }
    const val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
    if (val) {
      ratio = parseInt(val, 10);
      if (Number.isNaN(ratio)) {
        ratio = 1;
      }
    }
    return ratio || window.devicePixelRatio || 1;
  }
  var canvasDimensionLimit = 16384;
  function checkCanvasDimensions(canvas) {
    if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) {
      if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) {
        if (canvas.width > canvas.height) {
          canvas.height *= canvasDimensionLimit / canvas.width;
          canvas.width = canvasDimensionLimit;
        } else {
          canvas.width *= canvasDimensionLimit / canvas.height;
          canvas.height = canvasDimensionLimit;
        }
      } else if (canvas.width > canvasDimensionLimit) {
        canvas.height *= canvasDimensionLimit / canvas.width;
        canvas.width = canvasDimensionLimit;
      } else {
        canvas.width *= canvasDimensionLimit / canvas.height;
        canvas.height = canvasDimensionLimit;
      }
    }
  }
  function createImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        img.decode().then(() => {
          requestAnimationFrame(() => resolve(img));
        });
      };
      img.onerror = reject;
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.src = url;
    });
  }
  async function svgToDataURL(svg) {
    return Promise.resolve().then(() => new XMLSerializer().serializeToString(svg)).then(encodeURIComponent).then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
  }
  async function nodeToDataURL(node, width, height) {
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, "svg");
    const foreignObject = document.createElementNS(xmlns, "foreignObject");
    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${height}`);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    foreignObject.setAttribute("width", "100%");
    foreignObject.setAttribute("height", "100%");
    foreignObject.setAttribute("x", "0");
    foreignObject.setAttribute("y", "0");
    foreignObject.setAttribute("externalResourcesRequired", "true");
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svgToDataURL(svg);
  }
  var isInstanceOfElement = (node, instance) => {
    if (node instanceof instance)
      return true;
    const nodePrototype = Object.getPrototypeOf(node);
    if (nodePrototype === null)
      return false;
    return nodePrototype.constructor.name === instance.name || isInstanceOfElement(nodePrototype, instance);
  };

  // ../node_modules/html-to-image/es/clone-pseudos.js
  function formatCSSText(style) {
    const content = style.getPropertyValue("content");
    return `${style.cssText} content: '${content.replace(/'|"/g, "")}';`;
  }
  function formatCSSProperties(style, options) {
    return getStyleProperties(options).map((name) => {
      const value = style.getPropertyValue(name);
      const priority = style.getPropertyPriority(name);
      return `${name}: ${value}${priority ? " !important" : ""};`;
    }).join(" ");
  }
  function getPseudoElementStyle(className, pseudo, style, options) {
    const selector = `.${className}:${pseudo}`;
    const cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style, options);
    return document.createTextNode(`${selector}{${cssText}}`);
  }
  function clonePseudoElement(nativeNode, clonedNode, pseudo, options) {
    const style = window.getComputedStyle(nativeNode, pseudo);
    const content = style.getPropertyValue("content");
    if (content === "" || content === "none") {
      return;
    }
    const className = uuid();
    try {
      clonedNode.className = `${clonedNode.className} ${className}`;
    } catch (err) {
      return;
    }
    const styleElement = document.createElement("style");
    styleElement.appendChild(getPseudoElementStyle(className, pseudo, style, options));
    clonedNode.appendChild(styleElement);
  }
  function clonePseudoElements(nativeNode, clonedNode, options) {
    clonePseudoElement(nativeNode, clonedNode, ":before", options);
    clonePseudoElement(nativeNode, clonedNode, ":after", options);
  }

  // ../node_modules/html-to-image/es/mimes.js
  var WOFF = "application/font-woff";
  var JPEG = "image/jpeg";
  var mimes = {
    woff: WOFF,
    woff2: WOFF,
    ttf: "application/font-truetype",
    eot: "application/vnd.ms-fontobject",
    png: "image/png",
    jpg: JPEG,
    jpeg: JPEG,
    gif: "image/gif",
    tiff: "image/tiff",
    svg: "image/svg+xml",
    webp: "image/webp"
  };
  function getExtension(url) {
    const match = /\.([^./]*?)$/g.exec(url);
    return match ? match[1] : "";
  }
  function getMimeType(url) {
    const extension = getExtension(url).toLowerCase();
    return mimes[extension] || "";
  }

  // ../node_modules/html-to-image/es/dataurl.js
  function getContentFromDataUrl(dataURL) {
    return dataURL.split(/,/)[1];
  }
  function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
  }
  function makeDataUrl(content, mimeType) {
    return `data:${mimeType};base64,${content}`;
  }
  async function fetchAsDataURL(url, init, process2) {
    const res = await fetch(url, init);
    if (res.status === 404) {
      throw new Error(`Resource "${res.url}" not found`);
    }
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => {
        try {
          resolve(process2({ res, result: reader.result }));
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsDataURL(blob);
    });
  }
  var cache = {};
  function getCacheKey(url, contentType, includeQueryParams) {
    let key = url.replace(/\?.*/, "");
    if (includeQueryParams) {
      key = url;
    }
    if (/ttf|otf|eot|woff2?/i.test(key)) {
      key = key.replace(/.*\//, "");
    }
    return contentType ? `[${contentType}]${key}` : key;
  }
  async function resourceToDataURL(resourceUrl, contentType, options) {
    const cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
    if (cache[cacheKey] != null) {
      return cache[cacheKey];
    }
    if (options.cacheBust) {
      resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
    }
    let dataURL;
    try {
      const content = await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
        if (!contentType) {
          contentType = res.headers.get("Content-Type") || "";
        }
        return getContentFromDataUrl(result);
      });
      dataURL = makeDataUrl(content, contentType);
    } catch (error) {
      dataURL = options.imagePlaceholder || "";
      let msg = `Failed to fetch resource: ${resourceUrl}`;
      if (error) {
        msg = typeof error === "string" ? error : error.message;
      }
      if (msg) {
        console.warn(msg);
      }
    }
    cache[cacheKey] = dataURL;
    return dataURL;
  }

  // ../node_modules/html-to-image/es/clone-node.js
  async function cloneCanvasElement(canvas) {
    const dataURL = canvas.toDataURL();
    if (dataURL === "data:,") {
      return canvas.cloneNode(false);
    }
    return createImage(dataURL);
  }
  async function cloneVideoElement(video, options) {
    if (video.currentSrc) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
      ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL2 = canvas.toDataURL();
      return createImage(dataURL2);
    }
    const poster = video.poster;
    const contentType = getMimeType(poster);
    const dataURL = await resourceToDataURL(poster, contentType, options);
    return createImage(dataURL);
  }
  async function cloneIFrameElement(iframe, options) {
    var _a;
    try {
      if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) {
        return await cloneNode(iframe.contentDocument.body, options, true);
      }
    } catch (_b) {
    }
    return iframe.cloneNode(false);
  }
  async function cloneSingleNode(node, options) {
    if (isInstanceOfElement(node, HTMLCanvasElement)) {
      return cloneCanvasElement(node);
    }
    if (isInstanceOfElement(node, HTMLVideoElement)) {
      return cloneVideoElement(node, options);
    }
    if (isInstanceOfElement(node, HTMLIFrameElement)) {
      return cloneIFrameElement(node, options);
    }
    return node.cloneNode(isSVGElement(node));
  }
  var isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SLOT";
  var isSVGElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SVG";
  async function cloneChildren(nativeNode, clonedNode, options) {
    var _a, _b;
    if (isSVGElement(clonedNode)) {
      return clonedNode;
    }
    let children = [];
    if (isSlotElement(nativeNode) && nativeNode.assignedNodes) {
      children = toArray(nativeNode.assignedNodes());
    } else if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) {
      children = toArray(nativeNode.contentDocument.body.childNodes);
    } else {
      children = toArray(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
    }
    if (children.length === 0 || isInstanceOfElement(nativeNode, HTMLVideoElement)) {
      return clonedNode;
    }
    await children.reduce((deferred, child) => deferred.then(() => cloneNode(child, options)).then((clonedChild) => {
      if (clonedChild) {
        clonedNode.appendChild(clonedChild);
      }
    }), Promise.resolve());
    return clonedNode;
  }
  function cloneCSSStyle(nativeNode, clonedNode, options) {
    const targetStyle = clonedNode.style;
    if (!targetStyle) {
      return;
    }
    const sourceStyle = window.getComputedStyle(nativeNode);
    if (sourceStyle.cssText) {
      targetStyle.cssText = sourceStyle.cssText;
      targetStyle.transformOrigin = sourceStyle.transformOrigin;
    } else {
      getStyleProperties(options).forEach((name) => {
        let value = sourceStyle.getPropertyValue(name);
        if (name === "font-size" && value.endsWith("px")) {
          const reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - 0.1;
          value = `${reducedFont}px`;
        }
        if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") {
          value = "block";
        }
        if (name === "d" && clonedNode.getAttribute("d")) {
          value = `path(${clonedNode.getAttribute("d")})`;
        }
        targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
      });
    }
  }
  function cloneInputValue(nativeNode, clonedNode) {
    if (isInstanceOfElement(nativeNode, HTMLTextAreaElement)) {
      clonedNode.innerHTML = nativeNode.value;
    }
    if (isInstanceOfElement(nativeNode, HTMLInputElement)) {
      clonedNode.setAttribute("value", nativeNode.value);
    }
  }
  function cloneSelectValue(nativeNode, clonedNode) {
    if (isInstanceOfElement(nativeNode, HTMLSelectElement)) {
      const clonedSelect = clonedNode;
      const selectedOption = Array.from(clonedSelect.children).find((child) => nativeNode.value === child.getAttribute("value"));
      if (selectedOption) {
        selectedOption.setAttribute("selected", "");
      }
    }
  }
  function decorate(nativeNode, clonedNode, options) {
    if (isInstanceOfElement(clonedNode, Element)) {
      cloneCSSStyle(nativeNode, clonedNode, options);
      clonePseudoElements(nativeNode, clonedNode, options);
      cloneInputValue(nativeNode, clonedNode);
      cloneSelectValue(nativeNode, clonedNode);
    }
    return clonedNode;
  }
  async function ensureSVGSymbols(clone, options) {
    const uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
    if (uses.length === 0) {
      return clone;
    }
    const processedDefs = {};
    for (let i = 0; i < uses.length; i++) {
      const use = uses[i];
      const id = use.getAttribute("xlink:href");
      if (id) {
        const exist = clone.querySelector(id);
        const definition = document.querySelector(id);
        if (!exist && definition && !processedDefs[id]) {
          processedDefs[id] = await cloneNode(definition, options, true);
        }
      }
    }
    const nodes = Object.values(processedDefs);
    if (nodes.length) {
      const ns = "http://www.w3.org/1999/xhtml";
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("xmlns", ns);
      svg.style.position = "absolute";
      svg.style.width = "0";
      svg.style.height = "0";
      svg.style.overflow = "hidden";
      svg.style.display = "none";
      const defs = document.createElementNS(ns, "defs");
      svg.appendChild(defs);
      for (let i = 0; i < nodes.length; i++) {
        defs.appendChild(nodes[i]);
      }
      clone.appendChild(svg);
    }
    return clone;
  }
  async function cloneNode(node, options, isRoot) {
    if (!isRoot && options.filter && !options.filter(node)) {
      return null;
    }
    return Promise.resolve(node).then((clonedNode) => cloneSingleNode(clonedNode, options)).then((clonedNode) => cloneChildren(node, clonedNode, options)).then((clonedNode) => decorate(node, clonedNode, options)).then((clonedNode) => ensureSVGSymbols(clonedNode, options));
  }

  // ../node_modules/html-to-image/es/embed-resources.js
  var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
  var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
  var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
  function toRegex(url) {
    const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
  }
  function parseURLs(cssText) {
    const urls = [];
    cssText.replace(URL_REGEX, (raw, quotation, url) => {
      urls.push(url);
      return raw;
    });
    return urls.filter((url) => !isDataUrl(url));
  }
  async function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
    try {
      const resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
      const contentType = getMimeType(resourceURL);
      let dataURL;
      if (getContentFromUrl) {
        const content = await getContentFromUrl(resolvedURL);
        dataURL = makeDataUrl(content, contentType);
      } else {
        dataURL = await resourceToDataURL(resolvedURL, contentType, options);
      }
      return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
    } catch (error) {
    }
    return cssText;
  }
  function filterPreferredFontFormat(str, { preferredFontFormat }) {
    return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, (match) => {
      while (true) {
        const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
        if (!format) {
          return "";
        }
        if (format === preferredFontFormat) {
          return `src: ${src};`;
        }
      }
    });
  }
  function shouldEmbed(url) {
    return url.search(URL_REGEX) !== -1;
  }
  async function embedResources(cssText, baseUrl, options) {
    if (!shouldEmbed(cssText)) {
      return cssText;
    }
    const filteredCSSText = filterPreferredFontFormat(cssText, options);
    const urls = parseURLs(filteredCSSText);
    return urls.reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
  }

  // ../node_modules/html-to-image/es/embed-images.js
  async function embedProp(propName, node, options) {
    var _a;
    const propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
    if (propValue) {
      const cssString = await embedResources(propValue, null, options);
      node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
      return true;
    }
    return false;
  }
  async function embedBackground(clonedNode, options) {
    ;
    await embedProp("background", clonedNode, options) || await embedProp("background-image", clonedNode, options);
    await embedProp("mask", clonedNode, options) || await embedProp("-webkit-mask", clonedNode, options) || await embedProp("mask-image", clonedNode, options) || await embedProp("-webkit-mask-image", clonedNode, options);
  }
  async function embedImageNode(clonedNode, options) {
    const isImageElement = isInstanceOfElement(clonedNode, HTMLImageElement);
    if (!(isImageElement && !isDataUrl(clonedNode.src)) && !(isInstanceOfElement(clonedNode, SVGImageElement) && !isDataUrl(clonedNode.href.baseVal))) {
      return;
    }
    const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
    const dataURL = await resourceToDataURL(url, getMimeType(url), options);
    await new Promise((resolve, reject) => {
      clonedNode.onload = resolve;
      clonedNode.onerror = options.onImageErrorHandler ? (...attributes) => {
        try {
          resolve(options.onImageErrorHandler(...attributes));
        } catch (error) {
          reject(error);
        }
      } : reject;
      const image = clonedNode;
      if (image.decode) {
        image.decode = resolve;
      }
      if (image.loading === "lazy") {
        image.loading = "eager";
      }
      if (isImageElement) {
        clonedNode.srcset = "";
        clonedNode.src = dataURL;
      } else {
        clonedNode.href.baseVal = dataURL;
      }
    });
  }
  async function embedChildren(clonedNode, options) {
    const children = toArray(clonedNode.childNodes);
    const deferreds = children.map((child) => embedImages(child, options));
    await Promise.all(deferreds).then(() => clonedNode);
  }
  async function embedImages(clonedNode, options) {
    if (isInstanceOfElement(clonedNode, Element)) {
      await embedBackground(clonedNode, options);
      await embedImageNode(clonedNode, options);
      await embedChildren(clonedNode, options);
    }
  }

  // ../node_modules/html-to-image/es/apply-style.js
  function applyStyle(node, options) {
    const { style } = node;
    if (options.backgroundColor) {
      style.backgroundColor = options.backgroundColor;
    }
    if (options.width) {
      style.width = `${options.width}px`;
    }
    if (options.height) {
      style.height = `${options.height}px`;
    }
    const manual = options.style;
    if (manual != null) {
      Object.keys(manual).forEach((key) => {
        style[key] = manual[key];
      });
    }
    return node;
  }

  // ../node_modules/html-to-image/es/embed-webfonts.js
  var cssFetchCache = {};
  async function fetchCSS(url) {
    let cache2 = cssFetchCache[url];
    if (cache2 != null) {
      return cache2;
    }
    const res = await fetch(url);
    const cssText = await res.text();
    cache2 = { url, cssText };
    cssFetchCache[url] = cache2;
    return cache2;
  }
  async function embedFonts(data, options) {
    let cssText = data.cssText;
    const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
    const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
    const loadFonts = fontLocs.map(async (loc) => {
      let url = loc.replace(regexUrl, "$1");
      if (!url.startsWith("https://")) {
        url = new URL(url, data.url).href;
      }
      return fetchAsDataURL(url, options.fetchRequestInit, ({ result }) => {
        cssText = cssText.replace(loc, `url(${result})`);
        return [loc, result];
      });
    });
    return Promise.all(loadFonts).then(() => cssText);
  }
  function parseCSS(source) {
    if (source == null) {
      return [];
    }
    const result = [];
    const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
    let cssText = source.replace(commentsRegex, "");
    const keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
    while (true) {
      const matches = keyframesRegex.exec(cssText);
      if (matches === null) {
        break;
      }
      result.push(matches[0]);
    }
    cssText = cssText.replace(keyframesRegex, "");
    const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
    const combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})";
    const unifiedRegex = new RegExp(combinedCSSRegex, "gi");
    while (true) {
      let matches = importRegex.exec(cssText);
      if (matches === null) {
        matches = unifiedRegex.exec(cssText);
        if (matches === null) {
          break;
        } else {
          importRegex.lastIndex = unifiedRegex.lastIndex;
        }
      } else {
        unifiedRegex.lastIndex = importRegex.lastIndex;
      }
      result.push(matches[0]);
    }
    return result;
  }
  async function getCSSRules(styleSheets, options) {
    const ret = [];
    const deferreds = [];
    styleSheets.forEach((sheet) => {
      if ("cssRules" in sheet) {
        try {
          toArray(sheet.cssRules || []).forEach((item, index) => {
            if (item.type === CSSRule.IMPORT_RULE) {
              let importIndex = index + 1;
              const url = item.href;
              const deferred = fetchCSS(url).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
                try {
                  sheet.insertRule(rule, rule.startsWith("@import") ? importIndex += 1 : sheet.cssRules.length);
                } catch (error) {
                  console.error("Error inserting rule from remote css", {
                    rule,
                    error
                  });
                }
              })).catch((e) => {
                console.error("Error loading remote css", e.toString());
              });
              deferreds.push(deferred);
            }
          });
        } catch (e) {
          const inline = styleSheets.find((a) => a.href == null) || document.styleSheets[0];
          if (sheet.href != null) {
            deferreds.push(fetchCSS(sheet.href).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
              inline.insertRule(rule, inline.cssRules.length);
            })).catch((err) => {
              console.error("Error loading remote stylesheet", err);
            }));
          }
          console.error("Error inlining remote css file", e);
        }
      }
    });
    return Promise.all(deferreds).then(() => {
      styleSheets.forEach((sheet) => {
        if ("cssRules" in sheet) {
          try {
            toArray(sheet.cssRules || []).forEach((item) => {
              ret.push(item);
            });
          } catch (e) {
            console.error(`Error while reading CSS rules from ${sheet.href}`, e);
          }
        }
      });
      return ret;
    });
  }
  function getWebFontRules(cssRules) {
    return cssRules.filter((rule) => rule.type === CSSRule.FONT_FACE_RULE).filter((rule) => shouldEmbed(rule.style.getPropertyValue("src")));
  }
  async function parseWebFontRules(node, options) {
    if (node.ownerDocument == null) {
      throw new Error("Provided element is not within a Document");
    }
    const styleSheets = toArray(node.ownerDocument.styleSheets);
    const cssRules = await getCSSRules(styleSheets, options);
    return getWebFontRules(cssRules);
  }
  function normalizeFontFamily(font) {
    return font.trim().replace(/["']/g, "");
  }
  function getUsedFonts(node) {
    const fonts = /* @__PURE__ */ new Set();
    function traverse(node2) {
      const fontFamily = node2.style.fontFamily || getComputedStyle(node2).fontFamily;
      fontFamily.split(",").forEach((font) => {
        fonts.add(normalizeFontFamily(font));
      });
      Array.from(node2.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          traverse(child);
        }
      });
    }
    traverse(node);
    return fonts;
  }
  async function getWebFontCSS(node, options) {
    const rules = await parseWebFontRules(node, options);
    const usedFonts = getUsedFonts(node);
    const cssTexts = await Promise.all(rules.filter((rule) => usedFonts.has(normalizeFontFamily(rule.style.fontFamily))).map((rule) => {
      const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
      return embedResources(rule.cssText, baseUrl, options);
    }));
    return cssTexts.join("\n");
  }
  async function embedWebFonts(clonedNode, options) {
    const cssText = options.fontEmbedCSS != null ? options.fontEmbedCSS : options.skipFonts ? null : await getWebFontCSS(clonedNode, options);
    if (cssText) {
      const styleNode = document.createElement("style");
      const sytleContent = document.createTextNode(cssText);
      styleNode.appendChild(sytleContent);
      if (clonedNode.firstChild) {
        clonedNode.insertBefore(styleNode, clonedNode.firstChild);
      } else {
        clonedNode.appendChild(styleNode);
      }
    }
  }

  // ../node_modules/html-to-image/es/index.js
  async function toSvg(node, options = {}) {
    const { width, height } = getImageSize(node, options);
    const clonedNode = await cloneNode(node, options, true);
    await embedWebFonts(clonedNode, options);
    await embedImages(clonedNode, options);
    applyStyle(clonedNode, options);
    const datauri = await nodeToDataURL(clonedNode, width, height);
    return datauri;
  }
  async function toCanvas(node, options = {}) {
    const { width, height } = getImageSize(node, options);
    const svg = await toSvg(node, options);
    const img = await createImage(svg);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const ratio = options.pixelRatio || getPixelRatio();
    const canvasWidth = options.canvasWidth || width;
    const canvasHeight = options.canvasHeight || height;
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    if (!options.skipAutoScale) {
      checkCanvasDimensions(canvas);
    }
    canvas.style.width = `${canvasWidth}`;
    canvas.style.height = `${canvasHeight}`;
    if (options.backgroundColor) {
      context.fillStyle = options.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  async function toPng(node, options = {}) {
    const canvas = await toCanvas(node, options);
    return canvas.toDataURL();
  }

  // js/brandTokens.js
  var LIGHT_COLOR_TABLE = [
    { name: "bg", hex: "#f7f7f4", rgb: "247, 247, 244", hsl: "60, 16%, 96%", description: "Main background color" },
    { name: "fg", hex: "#26251e", rgb: "38, 37, 30", hsl: "53, 12%, 13%", description: "Primary foreground and text. Secondary text at 60% opacity." },
    { name: "accent", hex: "#f54e00", rgb: "245, 78, 0", hsl: "19, 100%, 48%", description: "Primary accent - use sparingly" },
    { name: "card", hex: "#f2f1ed", rgb: "242, 241, 237", hsl: "48, 16%, 94%", description: "Default card background" },
    { name: "card-01", hex: "#f0efeb", rgb: "240, 239, 235", hsl: "48, 14%, 93%", description: "Card background level 1 (~1% darker)" },
    { name: "card-02", hex: "#ebeae5", rgb: "235, 234, 229", hsl: "50, 13%, 91%", description: "Card background level 2 (~2.5% darker)" },
    { name: "card-03", hex: "#e6e5e0", rgb: "230, 229, 224", hsl: "50, 11%, 89%", description: "Card background level 3 (~5% darker)" },
    { name: "card-04", hex: "#e1e0db", rgb: "225, 224, 219", hsl: "50, 9%, 87%", description: "Card background level 4 (~7.5% darker)" }
  ];
  var DARK_COLOR_TABLE = [
    { name: "bg", hex: "#14120b", rgb: "20, 18, 11", hsl: "47, 29%, 6%", description: "Main background color" },
    { name: "fg", hex: "#edecec", rgb: "237, 236, 236", hsl: "0, 3%, 93%", description: "Primary foreground and text. Secondary text at 60% opacity." },
    { name: "accent", hex: "#f54e00", rgb: "245, 78, 0", hsl: "19, 100%, 48%", description: "Primary accent - use sparingly" },
    { name: "card", hex: "#1b1913", rgb: "27, 25, 19", hsl: "45, 17%, 9%", description: "Default card background" },
    { name: "card-01", hex: "#1d1b15", rgb: "29, 27, 21", hsl: "45, 16%, 10%", description: "Card level 1 (~1% lighter)" },
    { name: "card-02", hex: "#201e18", rgb: "32, 30, 24", hsl: "45, 14%, 11%", description: "Card level 2 (~2.5% lighter)" },
    { name: "card-03", hex: "#26241e", rgb: "38, 36, 30", hsl: "45, 12%, 13%", description: "Card level 3 (~5% lighter)" },
    { name: "card-04", hex: "#2b2923", rgb: "43, 41, 35", hsl: "45, 10%, 15%", description: "Card level 4 (~7.5% lighter)" }
  ];
  var BRAND_TOKENS = {
    light: {
      bg: "#f7f7f4",
      fg: "#26251e",
      accent: "#f54e00",
      card: "#f2f1ed",
      card01: "#f0efeb",
      card02: "#ebeae5",
      card03: "#e6e5e0",
      card04: "#e1e0db"
    },
    dark: {
      bg: "#14120b",
      fg: "#edecec",
      accent: "#f54e00",
      card: "#1b1913",
      card01: "#1d1b15",
      card02: "#201e18",
      card03: "#26241e",
      card04: "#2b2923"
    }
  };
  function buildTokensJson() {
    return JSON.stringify(
      {
        $schema: "A flat token map for Cursor community branding",
        source: "cursor-branding-guidelines.md",
        light: BRAND_TOKENS.light,
        dark: BRAND_TOKENS.dark
      },
      null,
      2
    ) + "\n";
  }
  function buildTokensCss() {
    const lines = [
      "/* Auto-generated - Cursor community colors */",
      ":root {",
      "  color-scheme: light dark;",
      "}",
      "",
      "[data-cursor-theme='light'] {",
      ...Object.entries(BRAND_TOKENS.light).map(([key, value]) => `  --cursor-${key}: ${value};`),
      "}",
      "",
      "[data-cursor-theme='dark'] {",
      ...Object.entries(BRAND_TOKENS.dark).map(([key, value]) => `  --cursor-${key}: ${value};`),
      "}",
      ""
    ];
    return lines.join("\n");
  }
  function triggerDownload(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }
  function downloadBrandTokensJson() {
    triggerDownload("cursor-brand-colors.json", buildTokensJson(), "application/json");
  }
  function downloadBrandTokensCss() {
    triggerDownload("cursor-brand-colors.css", buildTokensCss(), "text/css");
  }

  // js/lumaTileAssets.js
  var ASSET_ROOT = "./assets/";
  var RAW_ROWS = [
    ["General Logos/Cube/SVG/CUBE_25D.svg", "General Logos/Cube", "Cube 2.5D", "CUBE_25D.svg"],
    ["General Logos/Cube/SVG/CUBE_2D_DARK.svg", "General Logos/Cube", "Cube 2d Dark", "CUBE_2D_DARK.svg"],
    ["General Logos/Cube/SVG/CUBE_2D_LIGHT.svg", "General Logos/Cube", "Cube 2d Light", "CUBE_2D_LIGHT.svg"],
    ["General Logos/Wordmark/SVG/WORDMARK_DARK.svg", "General Logos/Wordmark", "Wordmark Dark", "WORDMARK_DARK.svg"],
    ["General Logos/Wordmark/SVG/WORDMARK_LIGHT.svg", "General Logos/Wordmark", "Wordmark Light", "WORDMARK_LIGHT.svg"],
    ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_25D_DARK.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2.5D Dark", "LOCKUP_HORIZONTAL_25D_DARK.svg"],
    ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_25D_LIGHT.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2.5D Light", "LOCKUP_HORIZONTAL_25D_LIGHT.svg"],
    ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_DARK.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2d Dark", "LOCKUP_HORIZONTAL_2D_DARK.svg"],
    ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_LIGHT.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2d Light", "LOCKUP_HORIZONTAL_2D_LIGHT.svg"],
    ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_25D_DARK.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2.5D Dark", "LOCKUP_VERTICAL_25D_DARK.svg"],
    ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_25D_LIGHT.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2.5D Light", "LOCKUP_VERTICAL_25D_LIGHT.svg"],
    ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_2D_DARK.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2d Dark", "LOCKUP_VERTICAL_2D_DARK.svg"],
    ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_2D_LIGHT.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2d Light", "LOCKUP_VERTICAL_2D_LIGHT.svg"],
    ["Avatars/Circle/SVG/AVATAR_CIRCLE_25D_DARK.svg", "Avatars/Circle", "Avatar Circle 2.5D Dark", "AVATAR_CIRCLE_25D_DARK.svg"],
    ["Avatars/Circle/SVG/AVATAR_CIRCLE_25D_LIGHT.svg", "Avatars/Circle", "Avatar Circle 2.5D Light", "AVATAR_CIRCLE_25D_LIGHT.svg"],
    ["Avatars/Circle/SVG/AVATAR_CIRCLE_25D_WHITE.svg", "Avatars/Circle", "Avatar Circle 2.5D White", "AVATAR_CIRCLE_25D_WHITE.svg"],
    ["Avatars/Circle/SVG/AVATAR_CIRCLE_2D_DARK.svg", "Avatars/Circle", "Avatar Circle 2d Dark", "AVATAR_CIRCLE_2D_DARK.svg"],
    ["Avatars/Circle/SVG/AVATAR_CIRCLE_2D_LIGHT.svg", "Avatars/Circle", "Avatar Circle 2d Light", "AVATAR_CIRCLE_2D_LIGHT.svg"],
    ["Avatars/Circle/SVG/AVATAR_CIRCLE_2D_WHITE.svg", "Avatars/Circle", "Avatar Circle 2d White", "AVATAR_CIRCLE_2D_WHITE.svg"],
    ["Avatars/Square/SVG/AVATAR_SQUARE_25D_DARK.svg", "Avatars/Square", "Avatar Square 2.5D Dark", "AVATAR_SQUARE_25D_DARK.svg"],
    ["Avatars/Square/SVG/AVATAR_SQUARE_25D_LIGHT.svg", "Avatars/Square", "Avatar Square 2.5D Light", "AVATAR_SQUARE_25D_LIGHT.svg"],
    ["Avatars/Square/SVG/AVATAR_SQUARE_25D_WHITE.svg", "Avatars/Square", "Avatar Square 2.5D White", "AVATAR_SQUARE_25D_WHITE.svg"],
    ["Avatars/Square/SVG/AVATAR_SQUARE_2D_DARK.svg", "Avatars/Square", "Avatar Square 2d Dark", "AVATAR_SQUARE_2D_DARK.svg"],
    ["Avatars/Square/SVG/AVATAR_SQUARE_2D_LIGHT.svg", "Avatars/Square", "Avatar Square 2d Light", "AVATAR_SQUARE_2D_LIGHT.svg"],
    ["Avatars/Square/SVG/AVATAR_SQUARE_2D_WHITE.svg", "Avatars/Square", "Avatar Square 2d White", "AVATAR_SQUARE_2D_WHITE.svg"],
    ["App Icons/SVG_PSD/APP_ICON_25D_DARK.svg", "App Icons", "App Icon 2.5D Dark", "APP_ICON_25D_DARK.svg"],
    ["App Icons/SVG_PSD/APP_ICON_25D_LIGHT.svg", "App Icons", "App Icon 2.5D Light", "APP_ICON_25D_LIGHT.svg"],
    ["App Icons/SVG_PSD/APP_ICON_2D_DARK.svg", "App Icons", "App Icon 2d Dark", "APP_ICON_2D_DARK.svg"],
    ["App Icons/SVG_PSD/APP_ICON_2D_LIGHT.svg", "App Icons", "App Icon 2d Light", "APP_ICON_2D_LIGHT.svg"]
  ];
  function assetSrc(id) {
    return ASSET_ROOT + id.split("/").map(encodeURIComponent).join("/");
  }
  var BRAND_ASSETS = RAW_ROWS.map(([id, category, label, fileName]) => ({
    id,
    category,
    label,
    fileName,
    src: assetSrc(id)
  }));
  var BRAND_COLORS = {
    light: { bg: BRAND_TOKENS.light.bg, fg: BRAND_TOKENS.light.fg, card: BRAND_TOKENS.light.card },
    dark: { bg: BRAND_TOKENS.dark.bg, fg: BRAND_TOKENS.dark.fg, card: BRAND_TOKENS.dark.card }
  };
  var LOCKUP_VERTICAL_2D_DARK = "General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_2D_DARK.svg";
  var CATEGORY_ORDER = [
    "General Logos/Cube",
    "General Logos/Wordmark",
    "General Logos/Lockup Horizontal",
    "General Logos/Lockup Vertical",
    "Avatars/Circle",
    "Avatars/Square",
    "App Icons"
  ];
  var CATEGORY_LABELS = {
    "General Logos/Cube": "General logos / cube",
    "General Logos/Wordmark": "General logos / wordmark",
    "General Logos/Lockup Horizontal": "General logos / lockup horizontal",
    "General Logos/Lockup Vertical": "General logos / lockup vertical",
    "Avatars/Circle": "Avatars / circle",
    "Avatars/Square": "Avatars / square",
    "App Icons": "App icons"
  };
  var EXPORT_SIZE_MIN_PX = 64;
  var EXPORT_SIZE_MAX_PX = 8192;
  var DEFAULT_EXPORT_PX = 800;
  var EXPORT_SIZE_SHORTCUTS = [
    { label: "800", size: 800 },
    { label: "1080", size: 1080 },
    { label: "1200", size: 1200 },
    { label: "2048", size: 2048 },
    { label: "4096", size: 4096 },
    { label: "8000", size: 8e3 },
    { label: "8192", size: 8192 }
  ];
  function clampExportSizePx(raw) {
    if (!Number.isFinite(raw)) {
      return DEFAULT_EXPORT_PX;
    }
    return Math.min(EXPORT_SIZE_MAX_PX, Math.max(EXPORT_SIZE_MIN_PX, Math.round(raw)));
  }
  var BRAND_ASSET_IDS = new Map(BRAND_ASSETS.map((a) => [a.id, a]));
  var DEFAULT_PRIMARY_ASSET_ID = "General Logos/Cube/SVG/CUBE_2D_DARK.svg";
  var DEFAULT_SECONDARY_ASSET_ID = "General Logos/Wordmark/SVG/WORDMARK_DARK.svg";
  function getAssetById(assetId) {
    return BRAND_ASSET_IDS.get(assetId) ?? BRAND_ASSETS[0];
  }
  function getCategoryAssets(category) {
    return BRAND_ASSETS.filter((a) => a.category === category);
  }
  function getThemedVariantId(assetId, nextTheme) {
    const asset = getAssetById(assetId);
    const themedFileName = asset.fileName.replace(/_(LIGHT|DARK)(?=\.svg$)/, nextTheme === "dark" ? "_DARK" : "_LIGHT");
    const themedAsset = BRAND_ASSETS.find(
      (c) => c.category === asset.category && c.fileName === themedFileName
    );
    return themedAsset?.id ?? assetId;
  }
  function getAssetWidth(category, scale, slot) {
    const baseWidthByCategory = {
      "General Logos/Cube": { primary: 30, secondary: 20 },
      "General Logos/Wordmark": { primary: 70, secondary: 54 },
      "General Logos/Lockup Horizontal": { primary: 76, secondary: 58 },
      "General Logos/Lockup Vertical": { primary: 48, secondary: 34 },
      "Avatars/Circle": { primary: 34, secondary: 22 },
      "Avatars/Square": { primary: 34, secondary: 22 },
      "App Icons": { primary: 34, secondary: 24 }
    };
    const baseW = baseWidthByCategory[category]?.[slot] ?? 30;
    return `${Math.round(baseW * (scale / 100))}%`;
  }
  function getBrandAssetMeta(asset) {
    const stem = asset.fileName.replace(/\.svg$/i, "");
    const upper = stem.toUpperCase();
    let dimensions = "-";
    if (upper.includes("25D")) {
      dimensions = "2.5D";
    } else if (upper.includes("2D")) {
      dimensions = "2D";
    }
    let theme = "-";
    if (/_WHITE$/i.test(stem) || upper.includes("_WHITE")) {
      theme = "White";
    } else if (/_DARK$/i.test(stem)) {
      theme = "Dark";
    } else if (/_LIGHT$/i.test(stem)) {
      theme = "Light";
    }
    let avatarShape = null;
    if (asset.category.startsWith("Avatars/")) {
      avatarShape = asset.category.includes("Circle") ? "Circle" : "Square";
    }
    return { dimensions, theme, avatarShape, format: "SVG" };
  }
  function getAvatarOptions() {
    return BRAND_ASSETS.filter((a) => a.id.startsWith("Avatars/")).map((a) => ({
      id: a.id,
      src: a.src,
      label: a.label,
      shape: a.category.includes("Circle") ? "circle" : "square"
    }));
  }

  // js/avatarTool.js
  var EXPORT_SIZE = 512;
  function mountAvatarTool(container, { navigate: navigate2, onGuidelines, onColours }) {
    const AVATAR_OPTIONS = getAvatarOptions();
    const firstCircle = AVATAR_OPTIONS.find((o) => o.shape === "circle");
    let shape = (
      /** @type {"circle" | "square"} */
      "circle"
    );
    let assetId = firstCircle?.id ?? AVATAR_OPTIONS[0]?.id ?? "";
    let bgKey = (
      /** @type {"light" | "dark" | "neutral"} */
      "neutral"
    );
    let isExporting = false;
    container.innerHTML = `
    <div class="editor-root">
      <header class="app-top-bar app-top-bar-editor">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" id="av-back">\u2190 Assets center</button>
          <p class="eyebrow">Community profile</p>
          <h1 class="app-top-bar-title">Chapter avatar</h1>
          <p class="app-top-bar-tagline">
            Official circle or square avatars from the brand kit. Export PNG for Discord, Slack,
            Luma host image, or Meetup organiser photo.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" id="av-guidelines">Guidelines</button>
            <button type="button" class="button-text" id="av-colours">Colours</button>
          </nav>
          <div class="app-top-bar-buttons">
            <button type="button" class="button button-primary" id="av-export">Download ${EXPORT_SIZE}px PNG</button>
          </div>
        </div>
      </header>
      <main class="avatar-tool-body">
        <section class="avatar-preview-panel panel">
          <h2 class="avatar-panel-title">Preview</h2>
          <p class="avatar-panel-hint">
            Checker background is only for contrast; exported PNG uses transparency around the mark
            where the SVG allows.
          </p>
          <div class="avatar-preview-stage" id="av-stage">
            <div class="avatar-export-frame avatar-export-frame-circle" id="av-frame">
              <img alt="" class="avatar-preview-img" id="av-img" />
            </div>
          </div>
          <p class="error-message" id="av-err" hidden></p>
        </section>
        <aside class="avatar-controls panel">
          <h2 class="avatar-panel-title">Asset</h2>
          <div class="field-group rail-field-first">
            <label for="avatar-shape">Shape</label>
            <select id="avatar-shape"><option value="circle">Circle</option><option value="square">Square</option></select>
          </div>
          <div class="field-group">
            <label for="avatar-variant">Variant</label>
            <select id="avatar-variant"></select>
          </div>
          <div class="field-group">
            <label for="avatar-bg">Preview background</label>
            <select id="avatar-bg">
              <option value="neutral">Neutral (check contrast)</option>
              <option value="light">Brand light bg</option>
              <option value="dark">Brand dark bg</option>
            </select>
          </div>
          <div class="notes-card notes-card-rail avatar-notes">
            <p class="avatar-notes-p">
              Use <strong>2D</strong> avatars by default. Prefer a variant that matches your platform
              (dark avatar on light UI, etc.).
            </p>
          </div>
        </aside>
      </main>
    </div>
  `;
    const el = (id) => container.querySelector(`#${id}`);
    const frame = (
      /** @type {HTMLElement | null} */
      el("av-frame")
    );
    const img = (
      /** @type {HTMLImageElement | null} */
      el("av-img")
    );
    const stage = (
      /** @type {HTMLElement | null} */
      el("av-stage")
    );
    const variantSelect = (
      /** @type {HTMLSelectElement | null} */
      el("avatar-variant")
    );
    const shapeSelect = (
      /** @type {HTMLSelectElement | null} */
      el("avatar-shape")
    );
    const bgSelect = (
      /** @type {HTMLSelectElement | null} */
      el("avatar-bg")
    );
    const errEl = (
      /** @type {HTMLElement | null} */
      el("av-err")
    );
    const exportBtn = (
      /** @type {HTMLButtonElement | null} */
      el("av-export")
    );
    function filteredOptions() {
      return AVATAR_OPTIONS.filter((o) => o.shape === shape);
    }
    function selected() {
      const list = filteredOptions();
      return list.find((o) => o.id === assetId) ?? list[0];
    }
    function fillVariants() {
      if (!variantSelect) {
        return;
      }
      const list = filteredOptions();
      variantSelect.innerHTML = list.map((o) => `<option value="${o.id}">${o.label}</option>`).join("");
      if (list.some((o) => o.id === assetId)) {
        variantSelect.value = assetId;
      } else if (list[0]) {
        assetId = list[0].id;
        variantSelect.value = assetId;
      }
    }
    function sync() {
      const s = selected();
      const previewBgByKey = {
        light: BRAND_TOKENS.light.bg,
        dark: BRAND_TOKENS.dark.bg,
        neutral: "#c8c4bc"
      };
      if (stage) {
        stage.style.background = previewBgByKey[bgKey];
      }
      if (frame) {
        frame.className = `avatar-export-frame avatar-export-frame-${shape}`;
      }
      if (img && s) {
        img.src = s.src;
        img.alt = s.label;
      }
    }
    el("av-back")?.addEventListener("click", () => navigate2("hub"));
    el("av-guidelines")?.addEventListener("click", onGuidelines);
    el("av-colours")?.addEventListener("click", onColours);
    shapeSelect?.addEventListener("change", () => {
      shape = /** @type {"circle" | "square"} */
      shapeSelect.value;
      const first = AVATAR_OPTIONS.find((o) => o.shape === shape);
      if (first) {
        assetId = first.id;
      }
      fillVariants();
      sync();
    });
    variantSelect?.addEventListener("change", () => {
      assetId = variantSelect.value;
      sync();
    });
    bgSelect?.addEventListener("change", () => {
      bgKey = /** @type {"light" | "dark" | "neutral"} */
      bgSelect.value;
      sync();
    });
    exportBtn?.addEventListener("click", () => void runExport());
    async function runExport() {
      if (!frame) {
        return;
      }
      isExporting = true;
      if (errEl) {
        errEl.hidden = true;
      }
      if (exportBtn) {
        exportBtn.textContent = "Exporting\u2026";
        exportBtn.disabled = true;
      }
      try {
        const dataUrl = await toPng(frame, {
          cacheBust: true,
          pixelRatio: 2,
          canvasWidth: EXPORT_SIZE,
          canvasHeight: EXPORT_SIZE
        });
        const link = document.createElement("a");
        link.download = `cursor-chapter-avatar-${shape}-${EXPORT_SIZE}.png`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.error(e);
        if (errEl) {
          errEl.textContent = "Export failed. Try again when the preview has loaded.";
          errEl.hidden = false;
        }
      } finally {
        isExporting = false;
        if (exportBtn) {
          exportBtn.textContent = `Download ${EXPORT_SIZE}px PNG`;
          exportBtn.disabled = false;
        }
      }
    }
    el("avatar-shape").value = shape;
    fillVariants();
    sync();
  }

  // js/tileEditor.js
  function mountTileEditor(container, { boot, navigate: navigate2, onGuidelines, onColours }) {
    const state = {
      theme: (
        /** @type {"dark" | "light"} */
        "dark"
      ),
      eyebrow: "Cursor community",
      chapter: "Krakow",
      subtitle: "Community event",
      footer: "cursor.com",
      exportSizePx: DEFAULT_EXPORT_PX,
      primaryCategory: "General Logos/Cube",
      primaryAssetId: DEFAULT_PRIMARY_ASSET_ID,
      secondaryCategory: "General Logos/Wordmark",
      secondaryAssetId: DEFAULT_SECONDARY_ASSET_ID,
      showSecondaryAsset: true,
      primaryScale: 100,
      secondaryScale: 100,
      exportFormat: (
        /** @type {"png" | "svg"} */
        "png"
      ),
      mobileTab: (
        /** @type {"build" | "preview"} */
        "build"
      ),
      exportModalOpen: false,
      exportSizeMenuOpen: false,
      isExporting: false,
      errorMessage: ""
    };
    function runPresetLumaDark() {
      state.theme = "dark";
      state.eyebrow = "Cursor community";
      state.chapter = "Krakow";
      state.subtitle = "Community event";
      state.footer = "cursor.com";
      state.exportSizePx = DEFAULT_EXPORT_PX;
      state.primaryCategory = "General Logos/Cube";
      state.primaryAssetId = DEFAULT_PRIMARY_ASSET_ID;
      state.secondaryCategory = "General Logos/Wordmark";
      state.secondaryAssetId = DEFAULT_SECONDARY_ASSET_ID;
      state.showSecondaryAsset = true;
      state.primaryScale = 100;
      state.secondaryScale = 100;
      state.errorMessage = "";
    }
    function runPresetLumaLight() {
      state.theme = "light";
      state.eyebrow = "Cursor community";
      state.chapter = "Your city";
      state.subtitle = "Community event";
      state.footer = "cursor.com";
      state.primaryCategory = "General Logos/Cube";
      state.primaryAssetId = getThemedVariantId(DEFAULT_PRIMARY_ASSET_ID, "light");
      state.secondaryCategory = "General Logos/Wordmark";
      state.secondaryAssetId = getThemedVariantId(DEFAULT_SECONDARY_ASSET_ID, "light");
      state.showSecondaryAsset = true;
      state.primaryScale = 100;
      state.secondaryScale = 100;
      state.errorMessage = "";
    }
    function runPresetPromoCopy() {
      state.theme = "dark";
      state.eyebrow = "Save the date";
      state.chapter = "Your city";
      state.subtitle = "In-person meetup";
      state.footer = "cursor.com";
      state.primaryCategory = "General Logos/Cube";
      state.primaryAssetId = getThemedVariantId(DEFAULT_PRIMARY_ASSET_ID, "dark");
      state.secondaryCategory = "General Logos/Wordmark";
      state.secondaryAssetId = getThemedVariantId(DEFAULT_SECONDARY_ASSET_ID, "dark");
      state.showSecondaryAsset = true;
      state.primaryScale = 105;
      state.secondaryScale = 100;
      state.errorMessage = "";
    }
    function runPresetLockupSoloDark() {
      state.theme = "dark";
      state.eyebrow = "Cursor community";
      state.chapter = "Your city";
      state.subtitle = "";
      state.footer = "cursor.com";
      state.primaryCategory = "General Logos/Lockup Vertical";
      state.primaryAssetId = LOCKUP_VERTICAL_2D_DARK;
      state.secondaryCategory = "General Logos/Wordmark";
      state.secondaryAssetId = getThemedVariantId(DEFAULT_SECONDARY_ASSET_ID, "dark");
      state.showSecondaryAsset = false;
      state.primaryScale = 100;
      state.secondaryScale = 100;
      state.errorMessage = "";
    }
    if (boot === "luma-dark") {
      runPresetLumaDark();
    } else if (boot === "luma-light") {
      runPresetLumaLight();
    } else if (boot === "lockup") {
      runPresetLockupSoloDark();
    }
    container.innerHTML = `
    <div class="editor-root">
      <header class="app-top-bar app-top-bar-editor">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" id="tile-back">\u2190 Assets center</button>
          <p class="eyebrow">Square graphics</p>
          <h1 class="app-top-bar-title">Square designer</h1>
          <p class="app-top-bar-tagline">
            Build in the preview; use <strong>Export</strong> to pick format (PNG or SVG) and square output size.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" id="tile-guidelines">Guidelines</button>
            <button type="button" class="button-text" id="tile-colours">Colours</button>
          </nav>
          <div class="app-top-bar-buttons">
            <button type="button" class="button button-secondary" id="tile-reset">Reset</button>
            <button type="button" class="button button-primary" id="tile-export-open">Export\u2026</button>
          </div>
        </div>
      </header>

      <dialog class="export-modal panel" id="export-dialog" aria-labelledby="export-modal-title">
        <h2 id="export-modal-title" class="export-modal-title">Export graphic</h2>
        <p class="export-modal-lead">
          Square output. PNG is a flat bitmap; SVG wraps the layout (editable in many tools - text uses web fonts).
        </p>
        <div class="export-modal-block">
          <span id="export-format-label" class="export-modal-label">Format</span>
          <fieldset class="export-format-segmented" aria-labelledby="export-format-label">
            <legend class="visually-hidden">Export format</legend>
            <button type="button" class="export-format-segment" id="fmt-png" data-fmt="png">PNG</button>
            <button type="button" class="export-format-segment" id="fmt-svg" data-fmt="svg">SVG</button>
          </fieldset>
        </div>
        <div class="export-modal-block">
          <span id="export-size-label" class="export-modal-label">Square size</span>
          <div class="export-size-dropdown" id="export-size-dropdown">
            <button type="button" id="export-size-trigger" class="export-size-dropdown-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="export-size-menu" aria-labelledby="export-size-label">
              <span class="export-size-dropdown-value" id="export-size-value"></span>
              <span class="export-size-dropdown-chevron" id="export-size-chevron" aria-hidden="true"></span>
            </button>
            <div id="export-size-menu" class="export-size-dropdown-panel" hidden>
              <p class="export-size-dropdown-heading">Presets</p>
              <div class="export-size-dropdown-grid" id="export-size-grid"></div>
              <div class="export-size-dropdown-custom">
                <label for="export-modal-custom-px" class="export-size-dropdown-custom-label">Custom</label>
                <input id="export-modal-custom-px" type="number" inputmode="numeric" min="${EXPORT_SIZE_MIN_PX}" max="${EXPORT_SIZE_MAX_PX}" step="1" class="export-size-dropdown-custom-input" />
              </div>
            </div>
          </div>
          <p class="export-modal-hint" id="export-modal-hint"></p>
        </div>
        <p class="export-modal-filename">File: <code id="export-filename"></code></p>
        <p class="error-message export-modal-error" id="export-error" hidden></p>
        <div class="export-modal-actions">
          <button type="button" class="button button-secondary" id="export-cancel">Cancel</button>
          <button type="button" class="button button-primary" id="export-download">Download</button>
        </div>
      </dialog>

      <div class="mobile-tab-bar" role="tablist" aria-label="Mobile view">
        <button type="button" role="tab" class="mobile-tab" id="tab-build" aria-selected="true">Build</button>
        <button type="button" role="tab" class="mobile-tab" id="tab-preview" aria-selected="false">Preview</button>
      </div>

      <main class="app-body" id="tile-main" data-mobile-tab="build">
        <section class="app-main panel panel-preview" aria-label="Live preview">
          <div class="preview-hero">
            <div class="preview-frame">
              <div class="preview-frame-meter">
                <div class="event-tile-fit">
                <div class="event-tile" id="tile-preview-root">
                  <div class="event-tile-noise"></div>
                  <div class="event-tile-content">
                    <div class="event-tile-top"><p class="event-tile-eyebrow" id="pv-eyebrow"></p></div>
                    <div class="event-tile-main">
                      <div class="event-tile-brand">
                        <img class="event-tile-primary-asset" id="pv-primary" alt="" />
                        <img class="event-tile-secondary-asset" id="pv-secondary" alt="" />
                      </div>
                      <div class="event-tile-copy">
                        <p class="event-tile-title" id="pv-title"></p>
                        <p class="event-tile-subtitle" id="pv-subtitle"></p>
                      </div>
                    </div>
                    <div class="event-tile-bottom"><p class="event-tile-footer" id="pv-footer"></p></div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div class="preview-summary" aria-live="polite">
              <span class="preview-summary-item" id="sum-theme"></span>
              <span class="preview-summary-sep">\xB7</span>
              <span class="preview-summary-item" id="sum-export"></span>
            </div>
            <p class="error-message error-message-preview" id="preview-err" hidden></p>
          </div>
        </section>
        <aside class="app-rail panel panel-controls" aria-label="Build controls">
          <div class="rail-inner" id="rail-inner"></div>
        </aside>
      </main>
    </div>
  `;
    const railHtml = `
    <div class="build-card">
      <h2 class="build-card-title">Quick start</h2>
      <p class="build-card-hint">Pick a preset, then edit copy.</p>
      <div class="preset-chips">
        <button type="button" class="chip" id="pre-luma-dark">Luma (dark)</button>
        <button type="button" class="chip" id="pre-luma-light">Luma (light)</button>
        <button type="button" class="chip" id="pre-promo">Promo / save the date</button>
        <button type="button" class="chip" id="pre-lockup">Lockup only</button>
      </div>
      <div class="field-group">
        <label for="theme">Theme</label>
        <select id="theme"><option value="dark">Dark</option><option value="light">Light</option></select>
      </div>
    </div>
    <div class="build-card">
      <h2 class="build-card-title">Event copy</h2>
      <p class="build-card-hint">Main content users see on the tile.</p>
      <div class="field-group rail-field-first">
        <label for="eyebrow">Eyebrow</label>
        <input id="eyebrow" type="text" maxlength="40" placeholder="Cursor community" />
      </div>
      <div class="field-group">
        <label for="chapter">Title</label>
        <input id="chapter" type="text" maxlength="50" placeholder="Krakow" />
      </div>
      <div class="field-group">
        <label for="subtitle">Subtitle</label>
        <input id="subtitle" type="text" maxlength="60" placeholder="Community event" />
      </div>
      <div class="field-group">
        <label for="footer">Footer</label>
        <input id="footer" type="text" maxlength="40" placeholder="cursor.com" />
      </div>
    </div>
    <details class="build-card rail-advanced">
      <summary class="rail-advanced-summary">Advanced brand controls</summary>
      <div class="rail-advanced-body">
        <div class="asset-block">
          <h3 class="asset-block-title">Primary</h3>
          <div class="field-row">
            <div class="field-group rail-field-first">
              <label for="primary-category">Family</label>
              <select id="primary-category"></select>
            </div>
            <div class="field-group">
              <label for="primary-asset">File</label>
              <select id="primary-asset"></select>
            </div>
          </div>
          <div class="field-group">
            <label for="primary-scale">Size</label>
            <input id="primary-scale" type="range" min="70" max="140" step="5" />
            <p class="field-help" id="primary-scale-help"></p>
          </div>
        </div>
        <div class="asset-block asset-block-secondary">
          <div class="toggle-row">
            <h3 class="asset-block-title">Secondary</h3>
            <label class="checkbox-label">
              <input type="checkbox" id="show-secondary" /> <span>Show</span>
            </label>
          </div>
          <div id="secondary-controls">
            <div class="field-row">
              <div class="field-group rail-field-first">
                <label for="secondary-category">Family</label>
                <select id="secondary-category"></select>
              </div>
              <div class="field-group">
                <label for="secondary-asset">File</label>
                <select id="secondary-asset"></select>
              </div>
            </div>
            <div class="field-group">
              <label for="secondary-scale">Size</label>
              <input id="secondary-scale" type="range" min="70" max="140" step="5" />
              <p class="field-help" id="secondary-scale-help"></p>
            </div>
          </div>
        </div>
      </div>
    </details>
  `;
    const railInner = container.querySelector("#rail-inner");
    if (railInner) {
      railInner.innerHTML = railHtml;
    }
    const el = (id) => container.querySelector(`#${id}`);
    const previewRoot = (
      /** @type {HTMLElement | null} */
      el("tile-preview-root")
    );
    const previewFrameMeter = (
      /** @type {HTMLElement | null} */
      container.querySelector(".preview-frame-meter")
    );
    const tileFit = (
      /** @type {HTMLElement | null} */
      container.querySelector(".event-tile-fit")
    );
    const exportDialog = (
      /** @type {HTMLDialogElement | null} */
      el("export-dialog")
    );
    let exportAnchorEl = (
      /** @type {HTMLElement | null} */
      el("tile-export-open")
    );
    const exportSizeDropdown = el("export-size-dropdown");
    const exportSizeMenu = el("export-size-menu");
    const exportSizeTrigger = el("export-size-trigger");
    const exportSizeChevron = el("export-size-chevron");
    let sizeRaf = 0;
    function syncPreviewSquareSize() {
      if (!previewFrameMeter || !tileFit) {
        return;
      }
      const side = Math.floor(Math.min(previewFrameMeter.clientWidth, previewFrameMeter.clientHeight, 760) * 0.84);
      if (side <= 0) {
        return;
      }
      tileFit.style.width = `${side}px`;
      tileFit.style.height = `${side}px`;
    }
    function schedulePreviewSquareSize() {
      if (sizeRaf) {
        cancelAnimationFrame(sizeRaf);
      }
      sizeRaf = requestAnimationFrame(() => {
        sizeRaf = 0;
        syncPreviewSquareSize();
      });
    }
    function fillCategorySelect(selectEl, currentCat) {
      if (!selectEl) {
        return;
      }
      selectEl.innerHTML = CATEGORY_ORDER.map(
        (c) => `<option value="${c}">${CATEGORY_LABELS[c]}</option>`
      ).join("");
      selectEl.value = currentCat;
    }
    function fillAssetSelect(selectEl, category, currentId) {
      if (!selectEl) {
        return;
      }
      const opts = getCategoryAssets(category);
      selectEl.innerHTML = opts.map((a) => `<option value="${a.id}">${a.label}</option>`).join("");
      if (opts.some((a) => a.id === currentId)) {
        selectEl.value = currentId;
      } else if (opts[0]) {
        selectEl.value = opts[0].id;
      }
    }
    function syncFormFromState() {
      el("eyebrow").value = state.eyebrow;
      el("chapter").value = state.chapter;
      el("subtitle").value = state.subtitle;
      el("footer").value = state.footer;
      el("theme").value = state.theme;
      el("primary-scale").value = String(state.primaryScale);
      el("secondary-scale").value = String(state.secondaryScale);
      el("show-secondary").checked = state.showSecondaryAsset;
      fillCategorySelect(
        /** @type {HTMLSelectElement | null} */
        el("primary-category"),
        state.primaryCategory
      );
      fillCategorySelect(
        /** @type {HTMLSelectElement | null} */
        el("secondary-category"),
        state.secondaryCategory
      );
      fillAssetSelect(
        /** @type {HTMLSelectElement | null} */
        el("primary-asset"),
        state.primaryCategory,
        state.primaryAssetId
      );
      fillAssetSelect(
        /** @type {HTMLSelectElement | null} */
        el("secondary-asset"),
        state.secondaryCategory,
        state.secondaryAssetId
      );
      state.primaryAssetId = /** @type {HTMLSelectElement} */
      el("primary-asset").value;
      state.secondaryAssetId = /** @type {HTMLSelectElement} */
      el("secondary-asset").value;
    }
    function syncPreview() {
      const palette = BRAND_COLORS[state.theme];
      const primary = getAssetById(state.primaryAssetId);
      const secondary = getAssetById(state.secondaryAssetId);
      if (!previewRoot) {
        return;
      }
      previewRoot.className = `event-tile event-tile-${state.theme}`;
      previewRoot.style.backgroundColor = palette.bg;
      previewRoot.style.color = palette.fg;
      const eyebrowEl = el("pv-eyebrow");
      const subEl = el("pv-subtitle");
      const footEl = el("pv-footer");
      const secImg = (
        /** @type {HTMLImageElement | null} */
        el("pv-secondary")
      );
      if (eyebrowEl) {
        if (state.eyebrow.trim()) {
          eyebrowEl.textContent = state.eyebrow.trim();
          eyebrowEl.style.display = "";
        } else {
          eyebrowEl.textContent = "";
          eyebrowEl.style.display = "none";
        }
      }
      const titleEl = el("pv-title");
      if (titleEl) {
        titleEl.textContent = state.chapter.trim() || "Your chapter";
      }
      if (subEl) {
        if (state.subtitle.trim()) {
          subEl.textContent = state.subtitle.trim();
          subEl.style.display = "";
        } else {
          subEl.textContent = "";
          subEl.style.display = "none";
        }
      }
      if (footEl) {
        if (state.footer.trim()) {
          footEl.textContent = state.footer.trim();
          footEl.style.display = "";
        } else {
          footEl.textContent = "";
          footEl.style.display = "none";
        }
      }
      const pImg = (
        /** @type {HTMLImageElement | null} */
        el("pv-primary")
      );
      if (pImg) {
        pImg.src = primary.src;
        pImg.alt = primary.label;
        pImg.style.width = getAssetWidth(primary.category, state.primaryScale, "primary");
      }
      if (secImg) {
        if (state.showSecondaryAsset) {
          secImg.src = secondary.src;
          secImg.alt = secondary.label;
          secImg.style.width = getAssetWidth(secondary.category, state.secondaryScale, "secondary");
          secImg.style.display = "";
        } else {
          secImg.style.display = "none";
        }
      }
      const st = el("sum-theme");
      const se = el("sum-export");
      if (st) {
        st.textContent = state.theme === "dark" ? "Dark" : "Light";
      }
      if (se) {
        se.textContent = `Next export: ${clampExportSizePx(state.exportSizePx)}\xD7${clampExportSizePx(state.exportSizePx)} px ${state.exportFormat.toUpperCase()}`;
      }
      const psh = el("primary-scale-help");
      const ssh = el("secondary-scale-help");
      if (psh) {
        psh.textContent = `${state.primaryScale}% of template default`;
      }
      if (ssh) {
        ssh.textContent = `${state.secondaryScale}% of template default`;
      }
      const secBlock = el("secondary-controls");
      if (secBlock) {
        secBlock.style.display = state.showSecondaryAsset ? "" : "none";
      }
      const perr = el("preview-err");
      if (perr) {
        if (state.errorMessage) {
          perr.textContent = state.errorMessage;
          perr.hidden = false;
        } else {
          perr.hidden = true;
        }
      }
      schedulePreviewSquareSize();
    }
    function updateFormatButtons() {
      const png = el("fmt-png");
      const svg = el("fmt-svg");
      png?.classList.toggle("export-format-segment--active", state.exportFormat === "png");
      svg?.classList.toggle("export-format-segment--active", state.exportFormat === "svg");
    }
    function updateExportModalUi() {
      el("export-size-value").textContent = `${clampExportSizePx(state.exportSizePx)} px`;
      el("export-modal-hint").textContent = state.exportFormat === "png" ? "Raster square - typical 800 (events) or 1080 (social), up to 8192." : "SVG canvas size; vector marks stay sharp inside the file.";
      const chapterSlug = state.chapter.trim().toLowerCase().replaceAll(/\s+/g, "-") || "cursor-event";
      const side = clampExportSizePx(state.exportSizePx);
      el("export-filename").textContent = `cursor-${chapterSlug}-${side}.${state.exportFormat}`;
      const grid = el("export-size-grid");
      if (grid) {
        grid.innerHTML = EXPORT_SIZE_SHORTCUTS.map((shortcut) => {
          const active = clampExportSizePx(state.exportSizePx) === shortcut.size;
          return `<button type="button" class="export-size-dropdown-option${active ? " export-size-dropdown-option--active" : ""}" data-size="${shortcut.size}">${shortcut.label}px</button>`;
        }).join("");
        grid.querySelectorAll("[data-size]").forEach((btn) => {
          btn.addEventListener("click", () => {
            state.exportSizePx = Number(btn.getAttribute("data-size"));
            el("export-modal-custom-px").value = String(state.exportSizePx);
            state.exportSizeMenuOpen = false;
            refreshExportMenu();
            updateExportModalUi();
            syncPreview();
          });
        });
      }
      el("export-modal-custom-px").value = String(state.exportSizePx);
      updateFormatButtons();
      const dlBtn = el("export-download");
      if (dlBtn && !state.isExporting) {
        dlBtn.textContent = `Download ${state.exportFormat.toUpperCase()}`;
      }
    }
    function refreshExportMenu() {
      if (!exportSizeMenu || !exportSizeTrigger || !exportSizeChevron) {
        return;
      }
      exportSizeMenu.hidden = !state.exportSizeMenuOpen;
      exportSizeTrigger.setAttribute("aria-expanded", state.exportSizeMenuOpen ? "true" : "false");
      exportSizeChevron.classList.toggle("export-size-dropdown-chevron--open", state.exportSizeMenuOpen);
    }
    function positionExportPopover() {
      if (!exportDialog || !exportDialog.open) {
        return;
      }
      const anchorRect = exportAnchorEl?.getBoundingClientRect() ?? /** @type {HTMLElement | null} */
      el("tile-export-open")?.getBoundingClientRect();
      if (!anchorRect) {
        return;
      }
      const margin = 12;
      const preferredWidth = Math.min(360, Math.max(280, Math.floor(window.innerWidth * 0.32)));
      const popoverWidth = Math.min(preferredWidth, window.innerWidth - margin * 2);
      const left = Math.min(
        window.innerWidth - popoverWidth - margin,
        Math.max(margin, Math.round(anchorRect.right - popoverWidth))
      );
      const popoverHeight = Math.max(220, exportDialog.getBoundingClientRect().height || 0);
      const placeBelow = anchorRect.bottom + 8 + popoverHeight <= window.innerHeight - margin;
      const top = placeBelow ? Math.max(margin, Math.round(anchorRect.bottom + 8)) : Math.max(margin, Math.round(anchorRect.top - popoverHeight - 8));
      exportDialog.style.left = `${left}px`;
      exportDialog.style.top = `${top}px`;
      exportDialog.style.width = `${popoverWidth}px`;
    }
    function openExportModal(anchorEl) {
      exportAnchorEl = /** @type {HTMLElement | null} */
      anchorEl ?? exportAnchorEl;
      state.exportModalOpen = true;
      state.exportSizeMenuOpen = false;
      if (exportDialog) {
        if (!exportDialog.open) {
          exportDialog.show();
        }
        positionExportPopover();
      }
      updateExportModalUi();
      refreshExportMenu();
    }
    function closeExportModal() {
      state.exportModalOpen = false;
      state.exportSizeMenuOpen = false;
      exportDialog?.close();
    }
    el("tile-back")?.addEventListener("click", () => navigate2("hub"));
    el("tile-guidelines")?.addEventListener("click", onGuidelines);
    el("tile-colours")?.addEventListener("click", onColours);
    el("tile-reset")?.addEventListener("click", () => {
      runPresetLumaDark();
      syncFormFromState();
      syncPreview();
    });
    el("tile-export-open")?.addEventListener("click", (e) => {
      state.errorMessage = "";
      openExportModal(
        /** @type {HTMLElement} */
        e.currentTarget
      );
    });
    exportDialog?.addEventListener("close", () => {
      state.exportModalOpen = false;
      state.exportSizeMenuOpen = false;
    });
    el("export-cancel")?.addEventListener("click", () => closeExportModal());
    el("fmt-png")?.addEventListener("click", () => {
      state.exportFormat = "png";
      updateExportModalUi();
      syncPreview();
    });
    el("fmt-svg")?.addEventListener("click", () => {
      state.exportFormat = "svg";
      updateExportModalUi();
      syncPreview();
    });
    exportSizeTrigger?.addEventListener("click", () => {
      state.exportSizeMenuOpen = !state.exportSizeMenuOpen;
      if (state.exportSizeMenuOpen) {
        updateExportModalUi();
      }
      refreshExportMenu();
    });
    el("export-modal-custom-px")?.addEventListener("change", (e) => {
      const v = Number(
        /** @type {HTMLInputElement} */
        e.target.value
      );
      if (Number.isFinite(v)) {
        state.exportSizePx = v;
      }
    });
    el("export-modal-custom-px")?.addEventListener("blur", () => {
      state.exportSizePx = clampExportSizePx(state.exportSizePx);
      updateExportModalUi();
      syncPreview();
    });
    el("export-modal-custom-px")?.addEventListener("click", (e) => e.stopPropagation());
    el("export-modal-custom-px")?.addEventListener("keydown", (e) => e.stopPropagation());
    document.addEventListener(
      "pointerdown",
      (ev) => {
        if (state.exportModalOpen && exportDialog && !exportDialog.contains(
          /** @type {Node} */
          ev.target
        )) {
          state.exportSizeMenuOpen = false;
          refreshExportMenu();
          closeExportModal();
          return;
        }
        if (!state.exportSizeMenuOpen || !exportSizeDropdown) {
          return;
        }
        if (!exportSizeDropdown.contains(
          /** @type {Node} */
          ev.target
        )) {
          state.exportSizeMenuOpen = false;
          refreshExportMenu();
        }
      },
      true
    );
    window.addEventListener("resize", () => {
      positionExportPopover();
    });
    el("pre-luma-dark")?.addEventListener("click", () => {
      runPresetLumaDark();
      syncFormFromState();
      syncPreview();
    });
    el("pre-luma-light")?.addEventListener("click", () => {
      runPresetLumaLight();
      syncFormFromState();
      syncPreview();
    });
    el("pre-promo")?.addEventListener("click", () => {
      runPresetPromoCopy();
      syncFormFromState();
      syncPreview();
    });
    el("pre-lockup")?.addEventListener("click", () => {
      runPresetLockupSoloDark();
      syncFormFromState();
      syncPreview();
    });
    ["eyebrow", "chapter", "subtitle", "footer"].forEach((fid) => {
      el(fid)?.addEventListener("input", (e) => {
        const v = (
          /** @type {HTMLInputElement} */
          e.target.value
        );
        if (fid === "eyebrow") {
          state.eyebrow = v;
        }
        if (fid === "chapter") {
          state.chapter = v;
        }
        if (fid === "subtitle") {
          state.subtitle = v;
        }
        if (fid === "footer") {
          state.footer = v;
        }
        syncPreview();
      });
    });
    el("theme")?.addEventListener("change", (e) => {
      const next = (
        /** @type {HTMLSelectElement} */
        e.target.value
      );
      state.theme = next === "light" ? "light" : "dark";
      state.primaryAssetId = getThemedVariantId(state.primaryAssetId, state.theme);
      state.secondaryAssetId = getThemedVariantId(state.secondaryAssetId, state.theme);
      syncFormFromState();
      syncPreview();
    });
    el("primary-category")?.addEventListener("change", (e) => {
      state.primaryCategory = /** @type {HTMLSelectElement} */
      e.target.value;
      const first = getCategoryAssets(state.primaryCategory)[0];
      if (first) {
        state.primaryAssetId = getThemedVariantId(first.id, state.theme);
      }
      fillAssetSelect(
        /** @type {HTMLSelectElement | null} */
        el("primary-asset"),
        state.primaryCategory,
        state.primaryAssetId
      );
      state.primaryAssetId = /** @type {HTMLSelectElement} */
      el("primary-asset").value;
      syncPreview();
    });
    el("primary-asset")?.addEventListener("change", (e) => {
      state.primaryAssetId = /** @type {HTMLSelectElement} */
      e.target.value;
      syncPreview();
    });
    el("primary-scale")?.addEventListener("input", (e) => {
      state.primaryScale = Number(
        /** @type {HTMLInputElement} */
        e.target.value
      );
      syncPreview();
    });
    el("secondary-category")?.addEventListener("change", (e) => {
      state.secondaryCategory = /** @type {HTMLSelectElement} */
      e.target.value;
      const first = getCategoryAssets(state.secondaryCategory)[0];
      if (first) {
        state.secondaryAssetId = getThemedVariantId(first.id, state.theme);
      }
      fillAssetSelect(
        /** @type {HTMLSelectElement | null} */
        el("secondary-asset"),
        state.secondaryCategory,
        state.secondaryAssetId
      );
      state.secondaryAssetId = /** @type {HTMLSelectElement} */
      el("secondary-asset").value;
      syncPreview();
    });
    el("secondary-asset")?.addEventListener("change", (e) => {
      state.secondaryAssetId = /** @type {HTMLSelectElement} */
      e.target.value;
      syncPreview();
    });
    el("secondary-scale")?.addEventListener("input", (e) => {
      state.secondaryScale = Number(
        /** @type {HTMLInputElement} */
        e.target.value
      );
      syncPreview();
    });
    el("show-secondary")?.addEventListener("change", (e) => {
      state.showSecondaryAsset = /** @type {HTMLInputElement} */
      e.target.checked;
      syncPreview();
    });
    el("tab-build")?.addEventListener("click", () => {
      state.mobileTab = "build";
      el("tile-main")?.setAttribute("data-mobile-tab", "build");
      el("tab-build")?.classList.add("mobile-tab-active");
      el("tab-preview")?.classList.remove("mobile-tab-active");
      el("tab-build")?.setAttribute("aria-selected", "true");
      el("tab-preview")?.setAttribute("aria-selected", "false");
    });
    el("tab-preview")?.addEventListener("click", () => {
      state.mobileTab = "preview";
      el("tile-main")?.setAttribute("data-mobile-tab", "preview");
      el("tab-preview")?.classList.add("mobile-tab-active");
      el("tab-build")?.classList.remove("mobile-tab-active");
      el("tab-preview")?.setAttribute("aria-selected", "true");
      el("tab-build")?.setAttribute("aria-selected", "false");
      schedulePreviewSquareSize();
    });
    el("export-download")?.addEventListener("click", () => void runExportDownload());
    async function runExportDownload() {
      if (!previewRoot) {
        return;
      }
      if (location.protocol === "file:") {
        state.errorMessage = "Export is blocked in file:// mode by browser security. Open this folder via http(s) (e.g. local static server) or GitHub Pages.";
        syncPreview();
        const errEl2 = el("export-error");
        if (errEl2) {
          errEl2.textContent = state.errorMessage;
          errEl2.hidden = false;
        }
        return;
      }
      state.isExporting = true;
      state.errorMessage = "";
      const errEl = el("export-error");
      const btn = el("export-download");
      if (errEl) {
        errEl.hidden = true;
      }
      if (btn) {
        btn.textContent = "Working\u2026";
        btn.disabled = true;
      }
      try {
        const side = clampExportSizePx(state.exportSizePx);
        const chapterSlug = state.chapter.trim().toLowerCase().replaceAll(/\s+/g, "-") || "cursor-event";
        const dataUrl = state.exportFormat === "png" ? await toPng(previewRoot, {
          cacheBust: true,
          pixelRatio: 1,
          canvasWidth: side,
          canvasHeight: side
        }) : await toSvg(previewRoot, {
          cacheBust: true,
          width: side,
          height: side
        });
        const link = document.createElement("a");
        link.download = `cursor-${chapterSlug}-${side}.${state.exportFormat}`;
        link.href = dataUrl;
        link.click();
        closeExportModal();
      } catch (error) {
        console.error(error);
        state.errorMessage = "Export failed. Try again after the preview finishes loading.";
        syncPreview();
        if (errEl) {
          errEl.textContent = state.errorMessage;
          errEl.hidden = false;
        }
      } finally {
        state.isExporting = false;
        if (btn) {
          btn.textContent = `Download ${state.exportFormat.toUpperCase()}`;
          btn.disabled = false;
        }
      }
    }
    if (previewFrameMeter && typeof ResizeObserver !== "undefined") {
      const previewResizeObserver = new ResizeObserver(() => {
        schedulePreviewSquareSize();
      });
      previewResizeObserver.observe(previewFrameMeter);
    }
    window.addEventListener("resize", schedulePreviewSquareSize);
    syncFormFromState();
    syncPreview();
    updateExportModalUi();
    schedulePreviewSquareSize();
  }

  // js/views/assetLibrary.js
  function escapeHtml(s) {
    return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  function renderAssetLibrary(container, { navigate: navigate2, onGuidelines, onColours }) {
    container.innerHTML = `
    <div class="library-page">
      <header class="app-top-bar app-top-bar-hub library-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>\u2190 Assets center</button>
          <p class="eyebrow">Brand kit</p>
          <h1 class="app-top-bar-title hub-header-compact">Asset library</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Browse every approved SVG with preview and parameters (2D / 2.5D, theme, avatar shape). Download
            any file directly-no paths to copy.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines>Guidelines</button>
            <button type="button" class="button-text" data-colours>Colours</button>
          </nav>
        </div>
      </header>

      <div class="library-toolbar panel">
        <div class="library-filters">
          <div class="field-group library-field">
            <label for="lib-search">Search</label>
            <input id="lib-search" type="search" placeholder="Name, filename, dark, 2.5D, circle\u2026" autocomplete="off" />
          </div>
          <div class="field-group library-field">
            <label for="lib-category">Family</label>
            <select id="lib-category">
              <option value="">All families (${BRAND_ASSETS.length})</option>
              ${CATEGORY_ORDER.map(
      (cat) => `<option value="${escapeHtml(cat)}">${escapeHtml(CATEGORY_LABELS[cat])} (${BRAND_ASSETS.filter((a) => a.category === cat).length})</option>`
    ).join("")}
            </select>
          </div>
        </div>
        <p class="library-count" aria-live="polite" id="lib-count"></p>
      </div>

      <ul class="library-grid" id="lib-grid"></ul>
      <p class="library-empty" id="lib-empty" hidden>No assets match your filters. Try clearing search or family.</p>
    </div>
  `;
    const searchEl = (
      /** @type {HTMLInputElement} */
      container.querySelector("#lib-search")
    );
    const catEl = (
      /** @type {HTMLSelectElement} */
      container.querySelector("#lib-category")
    );
    const grid = container.querySelector("#lib-grid");
    const empty = container.querySelector("#lib-empty");
    const countEl = container.querySelector("#lib-count");
    let actionMessage = "";
    function filteredAssets() {
      const q = searchEl.value.trim().toLowerCase();
      const categoryFilter = catEl.value;
      return BRAND_ASSETS.filter((asset) => {
        if (categoryFilter && asset.category !== categoryFilter) {
          return false;
        }
        if (!q) {
          return true;
        }
        const meta = getBrandAssetMeta(asset);
        const hay = [
          asset.label,
          asset.fileName,
          asset.category,
          asset.id,
          meta.dimensions,
          meta.theme,
          meta.avatarShape ?? ""
        ].join(" ").toLowerCase();
        return hay.includes(q);
      });
    }
    async function downloadSvg(asset) {
      try {
        const res = await fetch(asset.src);
        if (!res.ok) {
          throw new Error("Network error");
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = asset.fileName;
        anchor.rel = "noopener";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        actionMessage = `Downloaded ${asset.fileName}`;
      } catch {
        actionMessage = "Download failed - try again";
      }
      renderGrid();
      globalThis.setTimeout(() => {
        actionMessage = "";
        renderGrid();
      }, 2500);
    }
    function renderGrid() {
      const list = filteredAssets();
      if (!grid || !empty || !countEl) {
        return;
      }
      const toast = actionMessage ? ` \xB7 ${actionMessage}` : "";
      countEl.innerHTML = `Showing <strong>${list.length}</strong> of ${BRAND_ASSETS.length} assets${toast ? `<span class="library-action-toast">${escapeHtml(toast)}</span>` : ""}`;
      empty.hidden = list.length > 0;
      grid.innerHTML = list.map((asset) => {
        const meta = getBrandAssetMeta(asset);
        const shapeRow = meta.avatarShape ? `<div class="library-param"><dt>Shape</dt><dd>${escapeHtml(meta.avatarShape)}</dd></div>` : "";
        return `
        <li class="library-card panel">
          <div class="library-card-preview">
            <img src="${escapeHtml(asset.src)}" alt="" class="library-card-img" loading="lazy" />
          </div>
          <div class="library-card-body">
            <p class="library-card-family">${escapeHtml(CATEGORY_LABELS[asset.category] ?? asset.category)}</p>
            <h2 class="library-card-title">${escapeHtml(asset.label)}</h2>
            <dl class="library-params">
              <div class="library-param"><dt>File</dt><dd><code class="library-mono">${escapeHtml(asset.fileName)}</code></dd></div>
              <div class="library-param"><dt>Mark</dt><dd>${escapeHtml(meta.dimensions)}</dd></div>
              <div class="library-param"><dt>Theme</dt><dd>${escapeHtml(meta.theme)}</dd></div>
              ${shapeRow}
              <div class="library-param"><dt>Format</dt><dd>${escapeHtml(meta.format)}</dd></div>
            </dl>
            <button type="button" class="button button-primary library-download-btn" data-dl="${escapeHtml(asset.id)}">Download SVG</button>
          </div>
        </li>`;
      }).join("");
      grid.querySelectorAll("[data-dl]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-dl");
          const asset = BRAND_ASSETS.find((a) => a.id === id);
          if (asset) {
            void downloadSvg(asset);
          }
        });
      });
    }
    searchEl.addEventListener("input", renderGrid);
    catEl.addEventListener("change", renderGrid);
    container.querySelector("[data-back]")?.addEventListener("click", () => navigate2("hub"));
    container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
    container.querySelector("[data-colours]")?.addEventListener("click", onColours);
    renderGrid();
  }

  // js/views/colours.js
  function escapeHtml2(s) {
    return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  function renderColours(container, { navigate: navigate2, onGuidelines }) {
    container.innerHTML = `
    <div class="reference-page colours-page">
      <header class="app-top-bar app-top-bar-hub reference-page-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>\u2190 Assets center</button>
          <p class="eyebrow">Brand reference</p>
          <h1 class="app-top-bar-title hub-header-compact">Colours &amp; tokens</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Values from the official guidelines. Tap a swatch or hex to copy. Export JSON/CSS for your own
            tools-or read
            <button type="button" class="button-text reference-inline-nav" data-guidelines>Guidelines</button>
            for usage.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines-nav>Guidelines \u2192</button>
          </nav>
        </div>
      </header>

      <div class="reference-page-body">
        <section class="reference-section panel" aria-labelledby="colours-swatch-heading">
          <h2 id="colours-swatch-heading" class="reference-section-title">Quick swatches</h2>
          <p class="reference-section-lead">
            Outside the IDE: <strong>sentence case</strong> for titles. Use accent orange sparingly.
          </p>
          <div class="colours-swatch-grid" aria-label="Brand colour swatches" id="swatch-grid"></div>
          <p class="copy-hint colours-copy-hint" id="copy-hint" hidden></p>
        </section>

        <section class="reference-section panel" aria-labelledby="colours-table-light-heading">
          <h2 id="colours-table-light-heading" class="reference-section-title">Light theme</h2>
          <div class="colour-table-wrap">
            <table class="colour-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Hex</th>
                  <th scope="col">RGB</th>
                  <th scope="col">HSL</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="tbody-light"></tbody>
            </table>
          </div>
        </section>

        <section class="reference-section panel" aria-labelledby="colours-table-dark-heading">
          <h2 id="colours-table-dark-heading" class="reference-section-title">Dark theme</h2>
          <div class="colour-table-wrap">
            <table class="colour-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Hex</th>
                  <th scope="col">RGB</th>
                  <th scope="col">HSL</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="tbody-dark"></tbody>
            </table>
          </div>
        </section>

        <section class="reference-section panel reference-section--compact" aria-labelledby="colours-export-heading">
          <h2 id="colours-export-heading" class="reference-section-title">Download tokens</h2>
          <p class="reference-section-lead">
            Flat maps for <code>BRAND_TOKENS</code> in code-camelCase keys in JSON (<code>card01</code>, etc.).
          </p>
          <div class="download-row">
            <button type="button" class="button button-tertiary" id="dl-json">Download colours (JSON)</button>
            <button type="button" class="button button-tertiary" id="dl-css">Download colours (CSS vars)</button>
          </div>
        </section>
      </div>
    </div>
  `;
    const hintEl = container.querySelector("#copy-hint");
    async function copyHex(hex) {
      try {
        await navigator.clipboard.writeText(hex);
        if (hintEl) {
          hintEl.textContent = `Copied ${hex}`;
          hintEl.hidden = false;
        }
        globalThis.setTimeout(() => {
          if (hintEl) {
            hintEl.hidden = true;
          }
        }, 2e3);
      } catch {
        if (hintEl) {
          hintEl.textContent = "Copy blocked - select the hex manually";
          hintEl.hidden = false;
        }
        globalThis.setTimeout(() => {
          if (hintEl) {
            hintEl.hidden = true;
          }
        }, 3e3);
      }
    }
    const swatches = [
      {
        label: "Accent",
        hex: BRAND_TOKENS.light.accent,
        className: "",
        labelClass: "",
        hexClass: ""
      },
      {
        label: "Light bg",
        hex: BRAND_TOKENS.light.bg,
        className: " colours-swatch-tile--border",
        labelClass: "",
        hexClass: ""
      },
      {
        label: "Light fg",
        hex: BRAND_TOKENS.light.fg,
        className: "",
        labelClass: " colours-swatch-label--on-dark",
        hexClass: " colours-swatch-hex--on-dark"
      },
      {
        label: "Dark bg",
        hex: BRAND_TOKENS.dark.bg,
        className: "",
        labelClass: " colours-swatch-label--on-dark",
        hexClass: " colours-swatch-hex--on-dark"
      },
      {
        label: "Dark fg",
        hex: BRAND_TOKENS.dark.fg,
        className: "",
        labelClass: "",
        hexClass: ""
      }
    ];
    const swatchGrid = container.querySelector("#swatch-grid");
    if (swatchGrid) {
      swatchGrid.innerHTML = swatches.map(
        (s) => `
      <button type="button" class="colours-swatch-tile${s.className}" style="background:${escapeHtml2(s.hex)}" data-hex="${escapeHtml2(s.hex)}">
        <span class="colours-swatch-label${s.labelClass}">${escapeHtml2(s.label)}</span>
        <span class="colours-swatch-hex${s.hexClass}">${escapeHtml2(s.hex)}</span>
      </button>`
      ).join("");
      swatchGrid.querySelectorAll("[data-hex]").forEach((btn) => {
        btn.addEventListener("click", () => copyHex(btn.getAttribute("data-hex") ?? ""));
      });
    }
    function tbodyRows(rows) {
      return rows.map(
        (row) => `
      <tr>
        <td><code class="colour-table-name">${escapeHtml2(row.name)}</code></td>
        <td><button type="button" class="colour-table-hex-btn" data-hex="${escapeHtml2(row.hex)}">${escapeHtml2(row.hex)}</button></td>
        <td class="colour-table-mono">${escapeHtml2(row.rgb)}</td>
        <td class="colour-table-mono">${escapeHtml2(row.hsl)}</td>
        <td>${escapeHtml2(row.description)}</td>
      </tr>`
      ).join("");
    }
    const tbLight = container.querySelector("#tbody-light");
    const tbDark = container.querySelector("#tbody-dark");
    if (tbLight) {
      tbLight.innerHTML = tbodyRows(LIGHT_COLOR_TABLE);
    }
    if (tbDark) {
      tbDark.innerHTML = tbodyRows(DARK_COLOR_TABLE);
    }
    container.querySelectorAll(".colour-table-hex-btn[data-hex]").forEach((btn) => {
      btn.addEventListener("click", () => copyHex(btn.getAttribute("data-hex") ?? ""));
    });
    container.querySelector("#dl-json")?.addEventListener("click", () => downloadBrandTokensJson());
    container.querySelector("#dl-css")?.addEventListener("click", () => downloadBrandTokensCss());
    container.querySelector("[data-back]")?.addEventListener("click", () => navigate2("hub"));
    container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
    container.querySelector("[data-guidelines-nav]")?.addEventListener("click", onGuidelines);
  }

  // js/eventTemplates.js
  function fillCity(body, city) {
    const trimmed = city.trim();
    if (!trimmed) {
      return body;
    }
    return body.replaceAll("{{city}}", trimmed);
  }
  var EVENT_TEMPLATES = [
    {
      id: "meetup",
      name: "Cursor Meetup",
      tagline: "Evening community meetup - speakers, demos, pizza.",
      body: `Join us for the next Cursor Meetup in {{city}}!

We're bringing together developers, indie hackers, and AI builders who use Cursor to rethink how software gets built. Whether you're deep into AI-assisted coding or just getting started - this is a space to exchange ideas, workflows, and lessons learned from shipping real things.

tl;dr a room full of people who build, not just talk.

What to expect

\u{1F355} Pizza, drinks & warm-up
Kick things off casually - grab a slice, meet other builders, get into the flow.

\u{1F399}\uFE0F Short talks
Practitioners sharing how they actually use Cursor day-to-day. Practical insights, not theory.
Speakers will be announced soon - want to present? Let us know!

\u{1F6E0}\uFE0F Show & tell
Bring your laptop. Demo what you're working on. Get feedback, swap setups, or just watch and learn.

Why come?
\u2022 See how others use Cursor in production and side projects
\u2022 Exchange workflows, prompts, and tooling tricks
\u2022 Meet people who are building real things

\u{1F355} Pizza & drinks provided
\u{1F4CD} {{city}} - venue details coming soon
\u{1F91D} Builder-first, low-ego atmosphere
\u{1F4BB} Laptops encouraged

Come to share, come to learn, or just come to build.

See you in {{city}} \u{1F44B}`
    },
    {
      id: "cafe",
      name: "Cafe Cursor",
      tagline: "Daytime cafe takeover - co-work, coffee, credits.",
      body: `Join us at Cafe Cursor in {{city}}.

We're taking over a cafe for the day and inviting Cursor users to swing by. Bring your laptop and spend a few hours building alongside other developers - or just pop in for coffee and a chat.

\u{1F4BB} Comfortable co-working space
\u2615 Coffee on us
\u{1F4B3} Cursor credits for those who come to build
\u{1F91D} Casual networking with developers and builders

Members of the Cursor team will be around through the day - ask questions, share what you're working on, or just say hi.

We have limited seats, so when you sign up please pick the slot that works for you:

9:30\u201313:00 - morning co-working block
13:00\u201316:00 - afternoon co-working block
Drop-in - just stopping by for coffee and a quick hello

See you soon!`
    },
    {
      id: "hackathon",
      name: "Cursor Hackathon",
      tagline: "Build sprint - any length, teams, prizes, sponsors.",
      body: `Cursor Hackathon - {{city}}

Ready to turn an idea into a working product?

Join us for a hackathon in {{city}} where developers, designers, and builders come together to prototype, ship, and present real projects - all built with Cursor.

This isn't just a competition. It's an opportunity to push your limits, collaborate with talented people, and walk away with something you can actually use.

What to expect
- Focused building time on your own AI-powered project
- A community of developers and makers who take shipping seriously
- The chance to build your MVP using Cursor as your main tool
- Prizes, recognition, and real feedback from judges and peers

Teams of 1\u20135 are welcome. Solo builders too. Bring your idea and your laptop - we'll handle the rest.

\u{1F355} Food & drinks provided
\u{1F4B3} Cursor credits for all participants
\u{1F39F}\uFE0F Limited spots - if your plans change, update your RSVP so someone from the waitlist can join

If you've been sitting on an idea, this is your excuse to finally build it.

See you in {{city}} \u{1F680}`
    },
    {
      id: "workshop",
      name: "Cursor Workshop",
      tagline: "Hands-on session - learn workflows, build together.",
      body: `Cursor Workshop - {{city}}

A hands-on session for developers who want to go deeper with Cursor.

Whether you've been using it for months or just installed it last week - bring your laptop, bring a task you're working on, and let's build together. We'll walk through real workflows, share tricks that actually save time, and answer questions live.

What we'll cover
\u2022 How people are using Cursor agents, rules, and context in real projects
\u2022 Live walkthrough of setups that work (and ones that don't)
\u2022 Open build time - work on your own stuff with help from the room
\u2022 Q&A with experienced Cursor users

This isn't a lecture. It's a working session. You'll leave with better prompts, a cleaner setup, and a few new ideas to try on Monday.

\u{1F4CD} {{city}} - venue details on signup
\u{1F4BB} Bring your laptop and something to work on
\u2615 Coffee and snacks provided

Spots are limited - save yours and come ready to build.`
    },
    {
      id: "demo-night",
      name: "Demo Night",
      tagline: "Show what you built - short demos, audience feedback.",
      body: `Cursor Demo Night - {{city}}

Built something with Cursor? Come show it off.

We're hosting a demo night in {{city}} - a casual evening where builders get 5 minutes on stage to show what they've been working on. No slides required, just your screen and your story.

It doesn't have to be finished. It doesn't have to be polished. If you built it and you're proud of it (or learned something from it) - that's enough.

How it works
\u2022 Sign up to demo when you register (or just come to watch)
\u2022 Each demo is ~5 minutes + a few questions from the crowd
\u2022 Audience votes on favorites at the end

Whether you shipped a side project, automated your workflow, or built something weird and wonderful with agents - we want to see it.

\u{1F355} Food & drinks
\u{1F4CD} {{city}} - venue on signup
\u{1F3C6} Crowd favorites get Cursor credits and merch

Come to present, come to get inspired, or come for the pizza. All good.

See you there \u{1F44B}`
    }
  ];
  function getEventTemplateById(id) {
    return EVENT_TEMPLATES.find((t) => t.id === id);
  }

  // js/views/eventTemplates.js
  function escapeHtml3(s) {
    return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  function renderEventTemplates(container, { navigate: navigate2, onGuidelines, onColours }) {
    let templateId = EVENT_TEMPLATES[0]?.id ?? "";
    let city = "";
    container.innerHTML = `
    <div class="reference-page event-templates-page">
      <header class="app-top-bar app-top-bar-hub reference-page-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>\u2190 Assets center</button>
          <p class="eyebrow">Community</p>
          <h1 class="app-top-bar-title hub-header-compact">Event description templates</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Pick a format, type your city, then copy or download. Edit the rest after pasting into Luma,
            Meetup, or wherever you publish.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines>Guidelines</button>
            <button type="button" class="button-text" data-colours>Colours</button>
          </nav>
        </div>
      </header>

      <div class="event-templates-body">
        <section class="panel event-templates-picker" aria-label="Choose a template">
          <div class="event-templates-top-row">
            <h2 class="event-templates-section-title">Template</h2>
            <div class="event-templates-city-inline">
              <label for="evt-city" class="event-templates-city-label">City</label>
              <input id="evt-city" type="text" class="event-templates-city-input" placeholder="Your city" />
            </div>
          </div>
          <ul class="event-templates-chip-list" id="chip-list"></ul>
        </section>

        <section class="panel event-templates-preview-block" aria-label="Preview and actions">
          <div class="event-templates-preview-header">
            <h2 class="event-templates-section-title" id="preview-title"></h2>
            <div class="event-templates-preview-actions">
              <button type="button" class="button button-secondary" id="btn-copy">Copy</button>
              <button type="button" class="button button-primary" id="btn-dl">Download .txt</button>
            </div>
          </div>
          <p class="event-templates-toast" id="toast" aria-live="polite" hidden></p>
          <pre class="event-templates-preview" id="preview"></pre>
        </section>
      </div>
    </div>
  `;
    function slugFromCityOrName() {
      const t = getEventTemplateById(templateId);
      return (city.trim() || t?.name || "event").toLowerCase().replaceAll(/\s+/g, "-").replaceAll(/[^a-z0-9-]/g, "").slice(0, 40) || "event";
    }
    function downloadTextFile(filename, content) {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    function showToast(msg) {
      const toast = container.querySelector("#toast");
      if (toast) {
        toast.textContent = msg;
        toast.hidden = false;
        globalThis.setTimeout(() => {
          toast.hidden = true;
        }, 2200);
      }
    }
    function sync() {
      const t = getEventTemplateById(templateId);
      const preview = container.querySelector("#preview");
      const titleEl = container.querySelector("#preview-title");
      if (!t || !preview || !titleEl) {
        return;
      }
      titleEl.textContent = t.name;
      preview.textContent = fillCity(t.body, city);
    }
    const chipList = container.querySelector("#chip-list");
    if (chipList) {
      chipList.innerHTML = EVENT_TEMPLATES.map(
        (item) => `
      <li>
        <button type="button" class="event-template-chip${item.id === templateId ? " event-template-chip--active" : ""}" data-id="${escapeHtml3(item.id)}">
          <span class="event-template-chip-name">${escapeHtml3(item.name)}</span>
          <span class="event-template-chip-tagline">${escapeHtml3(item.tagline)}</span>
        </button>
      </li>`
      ).join("");
      chipList.querySelectorAll("[data-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          templateId = btn.getAttribute("data-id") ?? "";
          chipList.querySelectorAll(".event-template-chip").forEach((b) => {
            b.classList.toggle("event-template-chip--active", b.getAttribute("data-id") === templateId);
          });
          sync();
        });
      });
    }
    const cityInput = (
      /** @type {HTMLInputElement | null} */
      container.querySelector("#evt-city")
    );
    cityInput?.addEventListener("input", () => {
      city = cityInput.value;
      sync();
    });
    container.querySelector("#btn-copy")?.addEventListener("click", async () => {
      const t = getEventTemplateById(templateId);
      const text = t ? fillCity(t.body, city) : "";
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard");
      } catch {
        showToast("Copy blocked - use Download instead");
      }
    });
    container.querySelector("#btn-dl")?.addEventListener("click", () => {
      const t = getEventTemplateById(templateId);
      const text = t ? fillCity(t.body, city) : "";
      const slug = slugFromCityOrName();
      downloadTextFile(`cursor-${t?.id ?? "event"}-${slug}.txt`, text);
      showToast("Downloaded .txt");
    });
    container.querySelector("[data-back]")?.addEventListener("click", () => navigate2("hub"));
    container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
    container.querySelector("[data-colours]")?.addEventListener("click", onColours);
    sync();
  }

  // js/views/guidelines.js
  var PHOTO_SRC = "../photos_guideliness.png";
  function renderGuidelines(container, { navigate: navigate2, onColours }) {
    container.innerHTML = `
    <div class="reference-page guidelines-page">
      <header class="app-top-bar app-top-bar-hub reference-page-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>\u2190 Assets center</button>
          <p class="eyebrow">Brand reference</p>
          <h1 class="app-top-bar-title hub-header-compact">Guidelines</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Community brand rules from <code>cursor-branding-guidelines.md</code>-logos, type, voice,
            photography, and motion. Full hex tables live on the
            <button type="button" class="button-text reference-inline-nav" data-colours>Colours</button>
            page.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-colours-nav>Colours \u2192</button>
          </nav>
        </div>
      </header>

      <div class="reference-page-body">
        <p class="reference-page-source">
          Source: <code>cursor-branding-guidelines.md</code> in this repo. Asset zips named in that file.
        </p>

        <section class="reference-section panel" id="logos" aria-labelledby="guidelines-logos-heading">
          <h2 id="guidelines-logos-heading" class="reference-section-title">Logos</h2>
          <p class="reference-section-lead">
            Logos are Cursor's most visible marker (cube and wordmark). Use at modest sizes and leave
            enough breathing room for a refined feel.
          </p>
          <div class="reference-do-dont">
            <div class="reference-do">
              <h3 class="reference-do-dont-title">Do</h3>
              <ul class="reference-list">
                <li>Use the provided horizontal and vertical lockups.</li>
                <li>Keep clear space around the cube (at least \u2153 cube width).</li>
                <li>Prefer the 2D logo for primary use.</li>
                <li>Use the logo with restraint and modesty.</li>
              </ul>
            </div>
            <div class="reference-dont">
              <h3 class="reference-do-dont-title">Don't</h3>
              <ul class="reference-list">
                <li>Don't create your own lockups.</li>
                <li>Don't crowd the logo-give it space.</li>
                <li>Don't build custom patterns from the logo.</li>
                <li>Don't place the logo where it feels oversized.</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="reference-section panel" id="colour" aria-labelledby="guidelines-colour-heading">
          <h2 id="guidelines-colour-heading" class="reference-section-title">Colour</h2>
          <p class="reference-section-lead">
            Neutrals as the base, with a bright orange accent
            <code class="reference-mono-inline">${BRAND_TOKENS.light.accent}</code>. Keep accent use sharp and
            intentional-see the full
            <button type="button" class="button-text reference-inline-nav" data-colours2>colour tables</button>.
          </p>
        </section>

        <section class="reference-section panel" id="typography" aria-labelledby="guidelines-type-heading">
          <h2 id="guidelines-type-heading" class="reference-section-title">Typography</h2>
          <p class="reference-section-lead">
            <strong>Cursor Gothic</strong> is the official brand typeface and should be used whenever
            possible (this site uses system UI fonts for portability).
          </p>
        </section>

        <section class="reference-section panel" id="voice" aria-labelledby="guidelines-voice-heading">
          <h2 id="guidelines-voice-heading" class="reference-section-title">Voice &amp; tone</h2>
          <p class="reference-section-lead">
            Quiet confidence: clear, concise, approachable. Technical when needed, light when possible.
            Professional, sometimes witty, never forced.
          </p>
          <div class="reference-do-dont">
            <div class="reference-do">
              <h3 class="reference-do-dont-title">Do</h3>
              <ul class="reference-list">
                <li>Say things simply and directly.</li>
                <li>Be clear and concise, but complete.</li>
                <li>Stay professional and considerate.</li>
              </ul>
            </div>
            <div class="reference-dont">
              <h3 class="reference-do-dont-title">Don't</h3>
              <ul class="reference-list">
                <li>Don't oversell or exaggerate.</li>
                <li>Don't try too hard to be funny or casual.</li>
                <li>Don't hide meaning in jargon or corporate speak.</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="reference-section panel" id="casing" aria-labelledby="guidelines-casing-heading">
          <h2 id="guidelines-casing-heading" class="reference-section-title">Casing &amp; punctuation</h2>
          <p class="reference-section-lead">
            Use <strong>sentence case</strong> for headings, labels, and titles
            <em>outside the Cursor IDE</em>. Only capitalise proper nouns.
          </p>
          <div class="reference-examples-grid">
            <div class="reference-example-card reference-example-card--do">
              <h3 class="reference-example-label">Do</h3>
              <ul class="reference-list reference-list--examples">
                <li>Improved Agent tools, steerability, and usage visibility</li>
                <li>Bringing the Cursor Agent to Linear</li>
                <li>New API key</li>
                <li>Only run when mentioned</li>
              </ul>
            </div>
            <div class="reference-example-card reference-example-card--dont">
              <h3 class="reference-example-label">Don't</h3>
              <ul class="reference-list reference-list--examples">
                <li>Improved Agent Tools, Steerability, and Usage Visibility</li>
                <li>New API Key</li>
                <li>Only Run When Mentioned</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="reference-section panel" id="motion" aria-labelledby="guidelines-motion-heading">
          <h2 id="guidelines-motion-heading" class="reference-section-title">Logo animations</h2>
          <p class="reference-section-lead">
            Animated logos suit video end cards, loading states, and UI motion. Use where motion adds
            delight-avoid overuse or distracting loops. Grab official packs from the brand download linked
            in the markdown source.
          </p>
        </section>

        <section class="reference-section panel" id="photography" aria-labelledby="guidelines-photo-heading">
          <h2 id="guidelines-photo-heading" class="reference-section-title">Photography</h2>
          <p class="reference-section-lead">
            Warm, not overproduced, precise in intent. Natural light, candid shots, real energy. Film /
            disposable cameras can add spontaneity and texture.
          </p>
          <ul class="reference-keyword-list" aria-label="Photography keywords">
            <li>rich</li>
            <li>warm</li>
            <li>natural</li>
            <li>not overproduced</li>
            <li>spontaneous</li>
          </ul>
          <figure class="reference-photo-figure">
            <img src="${PHOTO_SRC}" alt="Mood board: warm candid photography examples with natural light and social scenes, matching brand photography direction"
              class="reference-photo-img" loading="lazy" />
            <figcaption class="reference-photo-caption">
              Reference mood board from brand guidelines-warm tones, natural light, candid moments.
            </figcaption>
          </figure>
          <div class="reference-do-dont">
            <div class="reference-do">
              <h3 class="reference-do-dont-title">Do</h3>
              <ul class="reference-list">
                <li>Shoot with warm, natural tones.</li>
                <li>Use natural light when possible.</li>
                <li>Embrace candid and spontaneous shots.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
    const goColours = () => onColours();
    container.querySelector("[data-back]")?.addEventListener("click", () => navigate2("hub"));
    container.querySelector("[data-colours]")?.addEventListener("click", goColours);
    container.querySelector("[data-colours-nav]")?.addEventListener("click", goColours);
    container.querySelector("[data-colours2]")?.addEventListener("click", goColours);
  }

  // js/views/hub.js
  var HUB_KIT_PREVIEW_BY_CATEGORY = {
    "General Logos/Cube": "General Logos/Cube/SVG/CUBE_25D.svg",
    "General Logos/Wordmark": "General Logos/Wordmark/SVG/WORDMARK_DARK.svg",
    "General Logos/Lockup Horizontal": "General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_25D_DARK.svg",
    "General Logos/Lockup Vertical": "General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_25D_DARK.svg",
    "Avatars/Circle": "Avatars/Circle/SVG/AVATAR_CIRCLE_25D_DARK.svg",
    "Avatars/Square": "Avatars/Square/SVG/AVATAR_SQUARE_25D_DARK.svg",
    "App Icons": "App Icons/SVG_PSD/APP_ICON_25D_DARK.svg"
  };
  var HUB_PREVIEW_ASSETS = CATEGORY_ORDER.map((cat) => {
    const preferredId = HUB_KIT_PREVIEW_BY_CATEGORY[cat];
    const byId = preferredId ? BRAND_ASSETS.find((a) => a.id === preferredId) : void 0;
    return byId ?? BRAND_ASSETS.find((a) => a.category === cat);
  }).filter(Boolean);
  function renderHub(container, { navigate: navigate2 }) {
    container.innerHTML = `
    <div class="hub-page">
      <section class="hub-hero panel hub-hero--compact">
        <p class="eyebrow">Cursor ambassador studio</p>
        <h1 class="hub-title">Ambassador assets center</h1>
        <p class="hub-lead">
          Logos, avatars, event copy starters, and references-square designer, templates for Luma/Meetup, SVG
          library, and brand pages.
        </p>
        <div class="hub-hero-links">
          <button type="button" class="hub-secondary-link" data-nav="guidelines">Guidelines</button>
          <button type="button" class="hub-secondary-link" data-nav="colours">Colours &amp; tokens</button>
        </div>
      </section>

      <section class="hub-start-panel panel" aria-label="Tools">
        <h2 class="hub-start-heading">Tools</h2>
        <p class="hub-start-lead">
          <strong>Square designer</strong> covers Luma, Meetup, and social squares-open Export in the tool to
          choose <strong>PNG or SVG</strong> and pixel size. Other tiles jump in with a layout starter.
        </p>
        <ul class="hub-action-grid">
          <li>
            <button type="button" class="hub-action-tile hub-action-tile--primary" data-nav="tile" data-boot="luma-dark">
              <p class="hub-action-tile-kicker">Square 1:1</p>
              <p class="hub-action-tile-title">Square designer</p>
              <p class="hub-action-tile-desc">Event pages, feeds, print-set size &amp; format when you export.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="tile" data-boot="luma-light">
              <p class="hub-action-tile-kicker">Starter</p>
              <p class="hub-action-tile-title">Light tile</p>
              <p class="hub-action-tile-desc">Light theme + cube &amp; wordmark to tweak.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="tile" data-boot="lockup">
              <p class="hub-action-tile-kicker">Starter</p>
              <p class="hub-action-tile-title">Lockup only</p>
              <p class="hub-action-tile-desc">Vertical lockup solo-hide secondary mark.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="avatar">
              <p class="hub-action-tile-kicker">PNG</p>
              <p class="hub-action-tile-title">Chapter avatar</p>
              <p class="hub-action-tile-desc">Circle or square from <code>Avatars/</code>.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="speaker-generator">
              <p class="hub-action-tile-kicker">Batch output</p>
              <p class="hub-action-tile-title">Speaker generator</p>
              <p class="hub-action-tile-desc">Upload photo + details, then download square/horizontal/Instagram in dark and light.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="event-templates">
              <p class="hub-action-tile-kicker">Luma &amp; email</p>
              <p class="hub-action-tile-title">Event descriptions</p>
              <p class="hub-action-tile-desc">Starters for meetups, caf\xE9s, hackathons-pick, set city, copy or download.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="library">
              <p class="hub-action-tile-kicker">Browse</p>
              <p class="hub-action-tile-title">Asset library</p>
              <p class="hub-action-tile-desc">Preview every mark and download SVGs directly.</p>
            </button>
          </li>
        </ul>
      </section>

      <section class="hub-kit-strip panel" aria-label="Kit families">
        <div class="hub-kit-strip-header">
          <h2 class="hub-kit-strip-title">Families in the pack</h2>
          <button type="button" class="button-text hub-kit-strip-link" data-nav="library">Open full library \u2192</button>
        </div>
        <ul class="hub-kit-grid hub-kit-grid--compact" id="hub-kit-grid"></ul>
      </section>

      <h2 class="hub-section-title">More from the brand pack</h2>
      <div class="hub-grid hub-grid-single">
        <article class="hub-card hub-card-muted">
          <p class="hub-card-kicker">Motion &amp; platform</p>
          <h3 class="hub-card-title">Animations &amp; app icons</h3>
          <p class="hub-card-body">
            Logo animations for video and store app icons ship with the official brand pack-this site
            doesn't edit video. Grab SVGs from the library or the full zip from your brand contact.
          </p>
          <button type="button" class="button-text hub-inline-link" data-nav="library">Open asset library \u2192</button>
        </article>
      </div>
    </div>
  `;
    const kitGrid = container.querySelector("#hub-kit-grid");
    if (kitGrid) {
      kitGrid.innerHTML = HUB_PREVIEW_ASSETS.map(
        (asset) => `
      <li class="hub-preview-cell">
        <div class="hub-preview-thumb${asset.category === "General Logos/Wordmark" ? " hub-preview-thumb--wordmark" : ""}${asset.category === "Avatars/Circle" ? " hub-preview-thumb--circle" : ""}" title="${escapeAttr(asset.label)}">
          <img src="${escapeAttr(asset.src)}" alt="" loading="lazy" />
        </div>
        <span class="hub-preview-caption">${CATEGORY_LABELS[asset.category] ?? asset.category}</span>
      </li>
    `
      ).join("");
    }
    container.querySelectorAll("[data-nav]").forEach((el) => {
      el.addEventListener("click", () => {
        const screen = el.getAttribute("data-nav");
        const boot = el.getAttribute("data-boot");
        if (screen === "tile" && boot) {
          navigate2(`tile?boot=${encodeURIComponent(boot)}`);
        } else if (screen) {
          navigate2(screen);
        }
      });
    });
  }
  function escapeAttr(s) {
    return s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  }

  // js/views/speakerGenerator.js
  var import_jszip = __toESM(require_jszip_min(), 1);
  var LOGO_BY_THEME = {
    dark: "General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_DARK.svg",
    light: "General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_LIGHT.svg"
  };
  var FORMATS = {
    square: { label: "Square 1:1", width: 1080, height: 1080 },
    horizontal: { label: "Horizontal 16:9", width: 1920, height: 1080 },
    instagram: { label: "Story 9:16", width: 1080, height: 1920 }
  };
  function mountSpeakerGenerator(container, { navigate: navigate2, onGuidelines, onColours }) {
    const state = {
      fullName: "Name Surname",
      speakerTitle: "Role / Company",
      topicTitle: "Topic title",
      eventName: "Cursor community",
      datePlace: "20 Apr 2026 - Krakow",
      photoDataUrl: "",
      format: (
        /** @type {"square"|"horizontal"|"instagram"} */
        "square"
      ),
      theme: (
        /** @type {"dark"|"light"} */
        "dark"
      ),
      message: ""
    };
    container.innerHTML = `
    <div class="editor-root speaker-generator-root">
      <header class="app-top-bar app-top-bar-editor">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back><- Assets center</button>
          <p class="eyebrow">Community</p>
          <h1 class="app-top-bar-title">Speaker asset generator</h1>
          <p class="app-top-bar-tagline">Upload photo, add speaker details, then export all key formats in dark and light.</p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines>Guidelines</button>
            <button type="button" class="button-text" data-colours>Colours</button>
          </nav>
        </div>
      </header>

      <main class="app-body speaker-generator-body">
        <section class="app-main panel panel-preview speaker-preview-panel" aria-label="Speaker preview">
          <div class="speaker-preview-toolbar">
            <div class="speaker-chip-row" id="sg-format-row"></div>
            <div class="speaker-chip-row" id="sg-theme-row"></div>
            <div class="speaker-preview-actions">
              <button type="button" class="button button-secondary" id="sg-download-current">Download current</button>
              <button type="button" class="button button-primary" id="sg-download-all">Download all (6)</button>
            </div>
          </div>
          <p class="speaker-preview-message" id="sg-message" hidden></p>
          <div class="speaker-preview-wrap">
            <div class="speaker-card speaker-card--square speaker-card--dark" id="sg-preview-card">
              <div class="speaker-card-overlay"></div>
              <div class="speaker-card-inner">
                <div class="speaker-card-photo" data-photo-wrap>
                  <img alt="Speaker photo" data-photo />
                </div>
                <p class="speaker-card-event" data-event></p>
                <h2 class="speaker-card-name" data-name></h2>
                <p class="speaker-card-title" data-title></p>
                <p class="speaker-card-topic" data-topic></p>
                <p class="speaker-card-meta" data-meta></p>
                <img class="speaker-card-logo" data-logo alt="" />
              </div>
            </div>
          </div>
        </section>

        <aside class="app-rail panel panel-controls speaker-controls-panel" aria-label="Speaker controls">
          <div class="rail-inner">
            <div class="build-card">
              <h2 class="build-card-title">Speaker details</h2>
              <div class="field-group rail-field-first">
                <label for="sg-name">Name and surname</label>
                <input id="sg-name" type="text" value="${escapeHtml4(state.fullName)}" />
              </div>
              <div class="field-group">
                <label for="sg-title">Title / role</label>
                <input id="sg-title" type="text" value="${escapeHtml4(state.speakerTitle)}" />
              </div>
              <div class="field-group">
                <label for="sg-topic">Topic title</label>
                <input id="sg-topic" type="text" value="${escapeHtml4(state.topicTitle)}" />
              </div>
            </div>

            <div class="build-card">
              <h2 class="build-card-title">Event details</h2>
              <div class="field-group rail-field-first">
                <label for="sg-event">Event name</label>
                <input id="sg-event" type="text" value="${escapeHtml4(state.eventName)}" />
              </div>
              <div class="field-group">
                <label for="sg-meta">Date and place</label>
                <input id="sg-meta" type="text" value="${escapeHtml4(state.datePlace)}" placeholder="20 Apr 2026 - Krakow" />
              </div>
            </div>

            <div class="build-card">
              <h2 class="build-card-title">Photo</h2>
              <p class="build-card-hint">Upload once, auto-cropped into a circle.</p>
              <div class="field-group rail-field-first">
                <label for="sg-photo">Speaker photo</label>
                <input id="sg-photo" type="file" accept="image/*" />
              </div>
              <div class="download-row">
                <button type="button" class="button button-secondary" id="sg-clear-photo">Remove photo</button>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <div class="speaker-export-stage" id="sg-export-stage" aria-hidden="true"></div>
    </div>
  `;
    const el = (s) => (
      /** @type {HTMLElement | null} */
      container.querySelector(s)
    );
    const previewCard = el("#sg-preview-card");
    const msgEl = el("#sg-message");
    const exportStage = el("#sg-export-stage");
    if (!previewCard || !msgEl || !exportStage) {
      return;
    }
    function setMessage(text) {
      state.message = text;
      msgEl.textContent = text;
      msgEl.hidden = !text;
    }
    function paintCard(card, format, theme) {
      card.className = `speaker-card speaker-card--${format} speaker-card--${theme}`;
      const nameEl = card.querySelector("[data-name]");
      const titleEl = card.querySelector("[data-title]");
      const topicEl = card.querySelector("[data-topic]");
      const eventEl = card.querySelector("[data-event]");
      const metaEl = card.querySelector("[data-meta]");
      const photoWrap = card.querySelector("[data-photo-wrap]");
      const photoImg = (
        /** @type {HTMLImageElement|null} */
        card.querySelector("[data-photo]")
      );
      const logoImg = (
        /** @type {HTMLImageElement|null} */
        card.querySelector("[data-logo]")
      );
      if (nameEl) nameEl.textContent = state.fullName.trim() || "Name Surname";
      if (titleEl) titleEl.textContent = state.speakerTitle.trim() || "Role / Company";
      if (topicEl) topicEl.textContent = state.topicTitle.trim() || "Topic title";
      if (eventEl) eventEl.textContent = state.eventName.trim() || "Cursor community";
      if (metaEl) metaEl.textContent = state.datePlace.trim() || "";
      if (photoWrap && photoImg) {
        if (state.photoDataUrl) {
          photoImg.src = state.photoDataUrl;
          photoImg.style.display = "";
          photoWrap.classList.remove("speaker-card-photo--empty");
        } else {
          photoImg.removeAttribute("src");
          photoImg.style.display = "none";
          photoWrap.classList.add("speaker-card-photo--empty");
        }
      }
      if (logoImg) {
        const id = LOGO_BY_THEME[theme];
        const logo = getAssetById(id);
        logoImg.src = logo.src;
      }
    }
    function updatePreview() {
      paintCard(previewCard, state.format, state.theme);
      setMessage("");
      renderChipRows();
    }
    function renderChipRows() {
      const formatRow = el("#sg-format-row");
      const themeRow = el("#sg-theme-row");
      if (!formatRow || !themeRow) {
        return;
      }
      formatRow.innerHTML = Object.entries(FORMATS).map(
        ([id, f]) => `<button type="button" class="chip${state.format === id ? " chip-active" : ""}" data-format="${id}">${f.label}</button>`
      ).join("");
      themeRow.innerHTML = ["dark", "light"].map(
        (t) => `<button type="button" class="chip${state.theme === t ? " chip-active" : ""}" data-theme="${t}">${t === "dark" ? "Dark" : "Light"}</button>`
      ).join("");
      formatRow.querySelectorAll("[data-format]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.format = /** @type {"square"|"horizontal"|"instagram"} */
          btn.getAttribute("data-format");
          updatePreview();
        });
      });
      themeRow.querySelectorAll("[data-theme]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.theme = /** @type {"dark"|"light"} */
          btn.getAttribute("data-theme");
          updatePreview();
        });
      });
    }
    function buildExportHtml(format, theme) {
      const logoId = LOGO_BY_THEME[theme];
      const logo = getAssetById(logoId);
      const isDark = theme === "dark";
      const dims = FORMATS[format];
      const W = dims.width;
      const H = dims.height;
      const bg = isDark ? "radial-gradient(circle at 20% 15%,rgba(245,78,0,0.22),transparent 32%),radial-gradient(circle at 65% 90%,rgba(245,78,0,0.08),transparent 24%),#14120b" : "radial-gradient(circle at 20% 15%,rgba(245,78,0,0.14),transparent 32%),radial-gradient(circle at 65% 90%,rgba(245,78,0,0.05),transparent 24%),#f7f7f4";
      const fg = isDark ? "#edecec" : "#26251e";
      const fgSub = isDark ? "rgba(237,236,236,0.7)" : "rgba(38,37,30,0.7)";
      const fgMeta = isDark ? "rgba(237,236,236,0.55)" : "rgba(38,37,30,0.55)";
      const photoBorder = isDark ? "rgba(255,255,255,0.45)" : "rgba(38,37,30,0.18)";
      const placeholderBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(38,37,30,0.06)";
      const nameText = escapeHtml4(state.fullName.trim() || "Name Surname");
      const titleText = escapeHtml4(state.speakerTitle.trim() || "Role / Company");
      const topicText = escapeHtml4(state.topicTitle.trim() || "Topic title");
      const eventText = escapeHtml4(state.eventName.trim() || "Cursor community");
      const metaText = escapeHtml4(state.datePlace.trim() || "");
      const hasPhoto = !!state.photoDataUrl;
      const px2 = (pct) => Math.round(W * pct / 100);
      const pxH = (pct) => Math.round(H * pct / 100);
      if (format === "horizontal") {
        const padSide = px2(5);
        const padV = pxH(8);
        const photoSize2 = pxH(32);
        const colGap = px2(3);
        const rowGap = pxH(1);
        const eventFs2 = pxH(3);
        const nameFs2 = pxH(11);
        const titleFs2 = pxH(4);
        const topicFs2 = pxH(5);
        const metaFs2 = pxH(3);
        const logoW2 = px2(15);
        const photoStyle2 = `width:${photoSize2}px;height:${photoSize2}px;border-radius:50%;overflow:hidden;border:4px solid ${photoBorder};box-shadow:0 12px 32px rgba(20,18,11,0.3);grid-area:photo;align-self:center;justify-self:center;`;
        const photoHtml2 = hasPhoto ? `<div style="${photoStyle2}"><img src="${state.photoDataUrl}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>` : `<div style="${photoStyle2}background:${placeholderBg};"></div>`;
        return `<div style="position:relative;overflow:hidden;background:${bg};color:${fg};width:${W}px;height:${H}px;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 75%,rgba(255,255,255,0.05),transparent 18%);pointer-events:none;"></div>
        <div style="position:relative;z-index:1;width:100%;height:100%;box-sizing:border-box;display:grid;grid-template-columns:${photoSize2 + colGap * 2}px 1fr;grid-template-areas:'photo event' 'photo name' 'photo role' 'photo topic' 'photo meta';padding:${padV}px ${padSide}px;gap:${rowGap}px ${colGap}px;justify-items:start;align-content:center;text-align:left;">
          ${photoHtml2}
          <p style="grid-area:event;margin:0;font-size:${eventFs2}px;color:${fgSub};text-transform:uppercase;letter-spacing:0.12em;font-weight:500;align-self:end;margin-bottom:${pxH(0.3)}px;">${eventText}</p>
          <h2 style="grid-area:name;margin:0;font-size:${nameFs2}px;line-height:1.05;letter-spacing:-0.03em;font-weight:700;color:${fg};">${nameText}</h2>
          <p style="grid-area:role;margin:0;font-size:${titleFs2}px;color:${fgSub};font-weight:400;">${titleText}</p>
          <p style="grid-area:topic;margin:0;font-size:${topicFs2}px;font-weight:700;color:${fg};margin-top:${pxH(0.8)}px;">${topicText}</p>
          ${metaText ? `<p style="grid-area:meta;margin:0;font-size:${metaFs2}px;color:${fgMeta};font-weight:400;">${metaText}</p>` : ""}
          <img src="${logo.src}" alt="" style="position:absolute;right:${padSide}px;bottom:${padV}px;width:${logoW2}px;height:auto;opacity:0.85;"/>
        </div>
      </div>`;
      }
      if (format === "instagram") {
        const padSide = px2(10);
        const photoSize2 = px2(24);
        const gap2 = pxH(1.5);
        const eventFs2 = px2(2.5);
        const nameFs2 = px2(10);
        const titleFs2 = px2(3.5);
        const topicFs2 = px2(4.5);
        const metaFs2 = px2(2.5);
        const logoW2 = px2(24);
        const photoStyle2 = `width:${photoSize2}px;height:${photoSize2}px;border-radius:50%;overflow:hidden;border:4px solid ${photoBorder};box-shadow:0 12px 32px rgba(20,18,11,0.3);`;
        const photoHtml2 = hasPhoto ? `<div style="${photoStyle2}"><img src="${state.photoDataUrl}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>` : `<div style="${photoStyle2}background:${placeholderBg};"></div>`;
        return `<div style="position:relative;overflow:hidden;background:${bg};color:${fg};width:${W}px;height:${H}px;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 75%,rgba(255,255,255,0.05),transparent 18%);pointer-events:none;"></div>
        <div style="position:relative;z-index:1;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:${pxH(6)}px ${padSide}px;gap:${gap2}px;">
          ${photoHtml2}
          <p style="margin:0;margin-top:${gap2}px;font-size:${eventFs2}px;color:${fgSub};text-transform:uppercase;letter-spacing:0.12em;font-weight:500;">${eventText}</p>
          <h2 style="margin:0;font-size:${nameFs2}px;line-height:1.05;letter-spacing:-0.03em;font-weight:700;color:${fg};">${nameText}</h2>
          <p style="margin:0;font-size:${titleFs2}px;color:${fgSub};font-weight:400;">${titleText}</p>
          <p style="margin:0;font-size:${topicFs2}px;font-weight:700;color:${fg};margin-top:${gap2}px;">${topicText}</p>
          ${metaText ? `<p style="margin:0;font-size:${metaFs2}px;color:${fgMeta};font-weight:400;">${metaText}</p>` : ""}
          <img src="${logo.src}" alt="" style="width:${logoW2}px;height:auto;opacity:0.85;margin-top:${pxH(4)}px;"/>
        </div>
      </div>`;
      }
      const pad = px2(5);
      const gap = px2(1.8);
      const photoSize = px2(22);
      const eventFs = px2(2.2);
      const nameFs = px2(9);
      const titleFs = px2(3.2);
      const topicFs = px2(4);
      const metaFs = px2(2.2);
      const logoW = px2(22);
      const photoStyle = `width:${photoSize}px;height:${photoSize}px;border-radius:50%;overflow:hidden;border:4px solid ${photoBorder};box-shadow:0 12px 32px rgba(20,18,11,0.3);`;
      const photoHtml = hasPhoto ? `<div style="${photoStyle}"><img src="${state.photoDataUrl}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>` : `<div style="${photoStyle}background:${placeholderBg};"></div>`;
      return `<div style="position:relative;overflow:hidden;background:${bg};color:${fg};width:${W}px;height:${H}px;">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 75%,rgba(255,255,255,0.05),transparent 18%);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;width:100%;height:100%;box-sizing:border-box;display:grid;justify-items:center;align-content:center;text-align:center;padding:${pad}px;gap:${gap}px;">
        ${photoHtml}
        <p style="margin:0;font-size:${eventFs}px;color:${fgSub};text-transform:uppercase;letter-spacing:0.1em;font-weight:500;">${eventText}</p>
        <h2 style="margin:0;font-size:${nameFs}px;line-height:1.05;letter-spacing:-0.03em;font-weight:700;color:${fg};">${nameText}</h2>
        <p style="margin:0;font-size:${titleFs}px;color:${fgSub};font-weight:400;">${titleText}</p>
        <p style="margin:0;font-size:${topicFs}px;font-weight:700;color:${fg};">${topicText}</p>
        ${metaText ? `<p style="margin:0;font-size:${metaFs}px;color:${fgMeta};font-weight:400;">${metaText}</p>` : ""}
        <img src="${logo.src}" alt="" style="width:${logoW}px;height:auto;margin-top:${px2(1.5)}px;opacity:0.85;"/>
      </div>
    </div>`;
    }
    function fileSlug(v) {
      return (v || "speaker").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 42);
    }
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    function makeFileName(format, theme) {
      const name = fileSlug(state.fullName || "speaker");
      const eventSlug = fileSlug(state.eventName || "event");
      return `cursor-${eventSlug}-${name}-${format}-${theme}.png`;
    }
    async function renderCard(format, theme) {
      const dims = FORMATS[format];
      const wrapper = document.createElement("div");
      wrapper.innerHTML = buildExportHtml(format, theme);
      const root2 = (
        /** @type {HTMLElement} */
        wrapper.firstElementChild
      );
      exportStage.innerHTML = "";
      exportStage.appendChild(root2);
      await delay(250);
      return toPng(root2, {
        cacheBust: true,
        pixelRatio: 1,
        width: dims.width,
        height: dims.height
      });
    }
    function dataUrlToBlob(dataUrl) {
      const [header, b64] = dataUrl.split(",");
      const mime = header.match(/:(.*?);/)?.[1] || "image/png";
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return new Blob([arr], { type: mime });
    }
    async function downloadCurrent() {
      if (location.protocol === "file:") {
        setMessage("Export requires http(s). Open this page via localhost or GitHub Pages.");
        return;
      }
      try {
        setMessage("Exporting...");
        const dataUrl = await renderCard(state.format, state.theme);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = makeFileName(state.format, state.theme);
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage("Downloaded current asset.");
      } catch (err) {
        console.error("Export error:", err);
        setMessage("Export failed. Use localhost/http(s), then try again.");
      }
    }
    async function downloadAll() {
      if (location.protocol === "file:") {
        setMessage("Export requires http(s). Open this page via localhost or GitHub Pages.");
        return;
      }
      try {
        const zip = new import_jszip.default();
        const jobs = ["square", "horizontal", "instagram"].flatMap((f) => ["dark", "light"].map((t) => [f, t]));
        let count = 0;
        for (const [f, t] of jobs) {
          count++;
          setMessage(`Rendering ${count} of ${jobs.length}...`);
          const dataUrl = await renderCard(
            /** @type {"square"|"horizontal"|"instagram"} */
            f,
            /** @type {"dark"|"light"} */
            t
          );
          const blob = dataUrlToBlob(dataUrl);
          zip.file(makeFileName(f, t), blob);
        }
        setMessage("Packing zip...");
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const name = fileSlug(state.fullName || "speaker");
        const eventSlug = fileSlug(state.eventName || "event");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(zipBlob);
        a.download = `cursor-${eventSlug}-${name}-assets.zip`;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
        setMessage("Downloaded zip with 6 assets.");
      } catch (err) {
        console.error("Download all error:", err);
        setMessage("Download all failed. Use localhost/http(s), then try again.");
      }
    }
    ["#sg-name", "#sg-title", "#sg-topic", "#sg-event", "#sg-meta"].forEach((selector) => {
      const input = (
        /** @type {HTMLInputElement | null} */
        el(selector)
      );
      input?.addEventListener("input", () => {
        state.fullName = /** @type {HTMLInputElement} */
        el("#sg-name").value;
        state.speakerTitle = /** @type {HTMLInputElement} */
        el("#sg-title").value;
        state.topicTitle = /** @type {HTMLInputElement} */
        el("#sg-topic").value;
        state.eventName = /** @type {HTMLInputElement} */
        el("#sg-event").value;
        state.datePlace = /** @type {HTMLInputElement} */
        el("#sg-meta").value;
        updatePreview();
      });
    });
    el("#sg-photo")?.addEventListener("change", (ev) => {
      const file = (
        /** @type {HTMLInputElement} */
        ev.currentTarget.files?.[0]
      );
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        state.photoDataUrl = String(reader.result || "");
        updatePreview();
      };
      reader.readAsDataURL(file);
    });
    el("#sg-clear-photo")?.addEventListener("click", () => {
      state.photoDataUrl = "";
      const photoInput = (
        /** @type {HTMLInputElement | null} */
        el("#sg-photo")
      );
      if (photoInput) {
        photoInput.value = "";
      }
      updatePreview();
    });
    el("#sg-download-current")?.addEventListener("click", () => {
      void downloadCurrent();
    });
    el("#sg-download-all")?.addEventListener("click", () => {
      void downloadAll();
    });
    container.querySelector("[data-back]")?.addEventListener("click", () => navigate2("hub"));
    container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
    container.querySelector("[data-colours]")?.addEventListener("click", onColours);
    updatePreview();
  }
  function escapeHtml4(s) {
    return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  // js/main.js
  var root = document.getElementById("root");
  if (!root) {
    throw new Error("Missing #root");
  }
  function navigate(hashPath) {
    const cleaned = hashPath.replace(/^#?\/?/, "");
    location.hash = `/${cleaned}`;
  }
  function parseRoute() {
    const raw = (location.hash.slice(1) || "/hub").replace(/^\//, "");
    const [pathPart, queryPart] = raw.split("?");
    const segment = pathPart.split("/").filter(Boolean)[0] || "hub";
    const params = new URLSearchParams(queryPart ?? "");
    return { screen: segment, boot: params.get("boot") ?? void 0 };
  }
  function hubLayoutClass(screen) {
    return ["hub", "library", "guidelines", "colours", "event-templates"].includes(screen) ? "app-layout app-layout--hub" : "app-layout app-layout--editor";
  }
  function renderHubHeader() {
    return `
    <header class="app-top-bar app-top-bar-hub">
      <div class="app-top-bar-brand">
        <p class="eyebrow">Cursor ambassador studio</p>
        <h1 class="app-top-bar-title hub-header-compact">Ambassador assets center</h1>
        <p class="app-top-bar-tagline hub-tagline-wide">
          Square promos, chapter avatars, and brand reference-aligned with the official asset
          folders and guidelines.
        </p>
      </div>
      <div class="app-top-bar-actions">
        <nav class="app-top-bar-nav" aria-label="Reference">
          <button type="button" class="button-text" id="hdr-guidelines">Guidelines</button>
          <button type="button" class="button-text" id="hdr-colours">Colours</button>
        </nav>
      </div>
    </header>
  `;
  }
  function render() {
    const { screen, boot } = parseRoute();
    root.className = hubLayoutClass(screen);
    const ctx = {
      navigate,
      onGuidelines: () => navigate("guidelines"),
      onColours: () => navigate("colours")
    };
    if (screen === "hub") {
      root.innerHTML = renderHubHeader() + '<div id="view"></div>';
      const view2 = document.getElementById("view");
      if (view2) {
        renderHub(view2, { navigate });
      }
      document.getElementById("hdr-guidelines")?.addEventListener("click", ctx.onGuidelines);
      document.getElementById("hdr-colours")?.addEventListener("click", ctx.onColours);
      return;
    }
    root.innerHTML = '<div id="view" class="view-root"></div>';
    const view = document.getElementById("view");
    if (!view) {
      return;
    }
    switch (screen) {
      case "library":
        renderAssetLibrary(view, ctx);
        break;
      case "guidelines":
        renderGuidelines(view, { navigate, onColours: ctx.onColours });
        break;
      case "colours":
        renderColours(view, { navigate, onGuidelines: ctx.onGuidelines });
        break;
      case "event-templates":
        renderEventTemplates(view, ctx);
        break;
      case "tile":
        mountTileEditor(view, { boot, navigate, onGuidelines: ctx.onGuidelines, onColours: ctx.onColours });
        break;
      case "avatar":
        mountAvatarTool(view, ctx);
        break;
      case "speaker-generator":
        mountSpeakerGenerator(view, ctx);
        break;
      default:
        navigate("hub");
    }
  }
  window.addEventListener("hashchange", render);
  if (!location.hash || location.hash === "#") {
    location.hash = "/hub";
  } else {
    render();
  }
})();
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)
*/
