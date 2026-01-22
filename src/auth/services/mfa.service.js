"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaService = void 0;
var common_1 = require("@nestjs/common");
var speakeasy = require("speakeasy");
var QRCode = require("qrcode");
var MfaService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MfaService = _classThis = /** @class */ (function () {
        function MfaService_1(mfaRepository, userRepository) {
            this.mfaRepository = mfaRepository;
            this.userRepository = userRepository;
        }
        /**
         * Initialize MFA setup for user - generate secret and QR code
         */
        MfaService_1.prototype.setupMfa = function (userId, deviceName) {
            return __awaiter(this, void 0, void 0, function () {
                var user, secret, qrCode, backupCodes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            secret = speakeasy.generateSecret({
                                name: "Healthy Stellar (".concat(user.email, ")"),
                                issuer: 'Healthy Stellar',
                                length: 32, // 256-bit entropy
                            });
                            return [4 /*yield*/, QRCode.toDataURL(secret.otpauth_url)];
                        case 2:
                            qrCode = _a.sent();
                            backupCodes = this.generateBackupCodes(8);
                            return [2 /*return*/, {
                                    secret: secret.base32,
                                    qrCode: qrCode,
                                    backupCodes: backupCodes,
                                }];
                    }
                });
            });
        };
        /**
         * Verify MFA setup and save to database
         */
        MfaService_1.prototype.verifyAndEnableMfa = function (userId, verificationCode, deviceName) {
            return __awaiter(this, void 0, void 0, function () {
                var user, secret, verified, backupCodes, mfaDevice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            secret = speakeasy.generateSecret({
                                name: "Healthy Stellar (".concat(user.email, ")"),
                                issuer: 'Healthy Stellar',
                                length: 32,
                            });
                            verified = speakeasy.totp.verify({
                                secret: secret.base32,
                                encoding: 'base32',
                                token: verificationCode,
                                window: 2, // Allow 30 seconds before/after
                            });
                            if (!verified) {
                                throw new common_1.BadRequestException('Invalid verification code');
                            }
                            backupCodes = this.generateBackupCodes(8);
                            mfaDevice = this.mfaRepository.create({
                                userId: userId,
                                secret: secret.base32,
                                backupCodes: backupCodes,
                                isVerified: true,
                                verifiedAt: new Date(),
                                deviceName: deviceName || 'Primary Device',
                                isPrimary: true,
                            });
                            return [4 /*yield*/, this.mfaRepository.save(mfaDevice)];
                        case 2:
                            _a.sent();
                            // Update user to enable MFA
                            user.mfaEnabled = true;
                            user.mfaSecret = secret.base32;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: 'MFA enabled successfully',
                                    backupCodes: backupCodes,
                                }];
                    }
                });
            });
        };
        /**
         * Verify MFA code during login
         */
        MfaService_1.prototype.verifyMfaCode = function (userId, code) {
            return __awaiter(this, void 0, void 0, function () {
                var mfaDevice, isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mfaRepository.findOne({
                                where: {
                                    userId: userId,
                                    isActive: true,
                                    isPrimary: true,
                                },
                            })];
                        case 1:
                            mfaDevice = _a.sent();
                            if (!mfaDevice) {
                                throw new common_1.NotFoundException('MFA device not found');
                            }
                            isValid = speakeasy.totp.verify({
                                secret: mfaDevice.secret,
                                encoding: 'base32',
                                token: code,
                                window: 2,
                            });
                            if (!isValid) return [3 /*break*/, 3];
                            // Update last used timestamp
                            mfaDevice.lastUsedAt = new Date();
                            return [4 /*yield*/, this.mfaRepository.save(mfaDevice)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3: 
                        // Try backup codes
                        return [2 /*return*/, this.verifyBackupCode(mfaDevice, code)];
                    }
                });
            });
        };
        /**
         * Verify backup code
         */
        MfaService_1.prototype.verifyBackupCode = function (mfaDevice, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mfaDevice.backupCodes || !mfaDevice.backupCodes.includes(code)) {
                                return [2 /*return*/, false];
                            }
                            // Remove used backup code
                            mfaDevice.backupCodes = mfaDevice.backupCodes.filter(function (c) { return c !== code; });
                            mfaDevice.lastUsedAt = new Date();
                            return [4 /*yield*/, this.mfaRepository.save(mfaDevice)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * Generate new backup codes
         */
        MfaService_1.prototype.generateNewBackupCodes = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var mfaDevice, newBackupCodes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mfaRepository.findOne({
                                where: {
                                    userId: userId,
                                    isPrimary: true,
                                },
                            })];
                        case 1:
                            mfaDevice = _a.sent();
                            if (!mfaDevice) {
                                throw new common_1.NotFoundException('MFA device not found');
                            }
                            newBackupCodes = this.generateBackupCodes(8);
                            mfaDevice.backupCodes = newBackupCodes;
                            return [4 /*yield*/, this.mfaRepository.save(mfaDevice)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, newBackupCodes];
                    }
                });
            });
        };
        /**
         * Disable MFA
         */
        MfaService_1.prototype.disableMfa = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            // Deactivate all MFA devices
                            return [4 /*yield*/, this.mfaRepository.update({ userId: userId }, { isActive: false })];
                        case 2:
                            // Deactivate all MFA devices
                            _a.sent();
                            // Update user
                            user.mfaEnabled = false;
                            user.mfaSecret = null;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get MFA devices for user
         */
        MfaService_1.prototype.getMfaDevices = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.mfaRepository.find({
                            where: { userId: userId, isActive: true },
                        })];
                });
            });
        };
        /**
         * Generate backup codes (8 characters, alphanumeric)
         */
        MfaService_1.prototype.generateBackupCodes = function (count) {
            var codes = [];
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (var i = 0; i < count; i++) {
                var code = '';
                for (var j = 0; j < 8; j++) {
                    code += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                codes.push(code);
            }
            return codes;
        };
        /**
         * Check if user has MFA enabled
         */
        MfaService_1.prototype.isMfaEnabled = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var mfaDevice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mfaRepository.findOne({
                                where: {
                                    userId: userId,
                                    isActive: true,
                                    isVerified: true,
                                },
                            })];
                        case 1:
                            mfaDevice = _a.sent();
                            return [2 /*return*/, !!mfaDevice];
                    }
                });
            });
        };
        return MfaService_1;
    }());
    __setFunctionName(_classThis, "MfaService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MfaService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MfaService = _classThis;
}();
exports.MfaService = MfaService;
