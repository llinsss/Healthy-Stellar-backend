"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.MfaController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
var audit_log_entity_1 = require("../../common/audit/audit-log.entity");
var MfaController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Multi-Factor Authentication'), (0, common_1.Controller)('auth/mfa')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _setupMfa_decorators;
    var _verifyMfa_decorators;
    var _verifyCode_decorators;
    var _getDevices_decorators;
    var _regenerateBackupCodes_decorators;
    var _disableMfa_decorators;
    var MfaController = _classThis = /** @class */ (function () {
        function MfaController_1(mfaService, auditService) {
            this.mfaService = (__runInitializers(this, _instanceExtraInitializers), mfaService);
            this.auditService = auditService;
        }
        /**
         * Initialize MFA setup
         */
        MfaController_1.prototype.setupMfa = function (mfaSetupDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 5]);
                            return [4 /*yield*/, this.mfaService.setupMfa(req.user.userId, mfaSetupDto.deviceName)];
                        case 1:
                            result = _a.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent(audit_log_entity_1.AuditAction.MFA_ENABLED, true, {
                                    userId: req.user.userId,
                                    description: 'MFA setup initiated',
                                    ipAddress: this.getIpAddress(req),
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, {
                                    secret: result.secret,
                                    qrCode: result.qrCode,
                                    backupCodes: result.backupCodes,
                                    message: 'Scan QR code with authenticator app and verify the code',
                                }];
                        case 3:
                            error_1 = _a.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent(audit_log_entity_1.AuditAction.MFA_ENABLED, false, {
                                    userId: req.user.userId,
                                    reason: error_1.message,
                                    ipAddress: this.getIpAddress(req),
                                    severity: 'MEDIUM',
                                })];
                        case 4:
                            _a.sent();
                            throw error_1;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Verify and enable MFA
         */
        MfaController_1.prototype.verifyMfa = function (mfaEnableDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 5]);
                            return [4 /*yield*/, this.mfaService.verifyAndEnableMfa(req.user.userId, mfaEnableDto.verificationCode, mfaEnableDto.deviceName)];
                        case 1:
                            result = _a.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent(audit_log_entity_1.AuditAction.MFA_VERIFIED, true, {
                                    userId: req.user.userId,
                                    ipAddress: this.getIpAddress(req),
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: result.message,
                                    backupCodes: result.backupCodes,
                                    warning: 'Save backup codes in a secure location. You can use them to access your account if you lose access to your authenticator.',
                                }];
                        case 3:
                            error_2 = _a.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent(audit_log_entity_1.AuditAction.MFA_VERIFIED, false, {
                                    userId: req.user.userId,
                                    reason: error_2.message,
                                    ipAddress: this.getIpAddress(req),
                                    severity: 'HIGH',
                                })];
                        case 4:
                            _a.sent();
                            throw error_2;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Verify MFA code (during login or action verification)
         */
        MfaController_1.prototype.verifyCode = function (mfaVerifyDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!/^\d{6}$/.test(mfaVerifyDto.code)) {
                                throw new common_1.BadRequestException('Invalid code format');
                            }
                            return [4 /*yield*/, this.mfaService.verifyMfaCode(req.user.userId, mfaVerifyDto.code)];
                        case 1:
                            isValid = _a.sent();
                            if (!!isValid) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent(audit_log_entity_1.AuditAction.MFA_VERIFIED, false, {
                                    userId: req.user.userId,
                                    reason: 'Invalid MFA code',
                                    ipAddress: this.getIpAddress(req),
                                    severity: 'MEDIUM',
                                })];
                        case 2:
                            _a.sent();
                            throw new common_1.BadRequestException('Invalid MFA code');
                        case 3: return [2 /*return*/, { success: true, message: 'MFA code verified' }];
                    }
                });
            });
        };
        /**
         * Get MFA devices
         */
        MfaController_1.prototype.getDevices = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var devices;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mfaService.getMfaDevices(req.user.userId)];
                        case 1:
                            devices = _a.sent();
                            return [2 /*return*/, devices.map(function (device) { return ({
                                    id: device.id,
                                    name: device.deviceName,
                                    isPrimary: device.isPrimary,
                                    createdAt: device.createdAt,
                                    lastUsedAt: device.lastUsedAt,
                                    remainingBackupCodes: device.backupCodes ? device.backupCodes.length : 0,
                                }); })];
                    }
                });
            });
        };
        /**
         * Generate new backup codes
         */
        MfaController_1.prototype.regenerateBackupCodes = function (backupCodesDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid, newCodes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mfaService.verifyMfaCode(req.user.userId, backupCodesDto.verificationCode)];
                        case 1:
                            isValid = _a.sent();
                            if (!isValid) {
                                throw new common_1.BadRequestException('Invalid MFA code');
                            }
                            return [4 /*yield*/, this.mfaService.generateNewBackupCodes(req.user.userId)];
                        case 2:
                            newCodes = _a.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent(audit_log_entity_1.AuditAction.MFA_ENABLED, true, {
                                    userId: req.user.userId,
                                    description: 'Backup codes regenerated',
                                    ipAddress: this.getIpAddress(req),
                                    severity: 'MEDIUM',
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    backupCodes: newCodes,
                                    message: 'New backup codes generated',
                                }];
                    }
                });
            });
        };
        /**
         * Disable MFA
         */
        MfaController_1.prototype.disableMfa = function (backupCodesDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mfaService.verifyMfaCode(req.user.userId, backupCodesDto.verificationCode)];
                        case 1:
                            isValid = _a.sent();
                            if (!isValid) {
                                throw new common_1.BadRequestException('Invalid MFA code');
                            }
                            return [4 /*yield*/, this.mfaService.disableMfa(req.user.userId)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent(audit_log_entity_1.AuditAction.MFA_DISABLED, true, {
                                    userId: req.user.userId,
                                    ipAddress: this.getIpAddress(req),
                                    severity: 'HIGH',
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { success: true, message: 'MFA has been disabled' }];
                    }
                });
            });
        };
        MfaController_1.prototype.getIpAddress = function (req) {
            return (req.ip || req.socket.remoteAddress || 'unknown').toString();
        };
        return MfaController_1;
    }());
    __setFunctionName(_classThis, "MfaController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _setupMfa_decorators = [(0, common_1.Post)('setup'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Initialize MFA setup - returns secret and QR code' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'MFA setup initialized' })];
        _verifyMfa_decorators = [(0, common_1.Post)('verify'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Verify MFA code and enable MFA' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'MFA enabled successfully' })];
        _verifyCode_decorators = [(0, common_1.Post)('verify-code'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Verify MFA code' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'MFA code verified' })];
        _getDevices_decorators = [(0, common_1.Get)('devices'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Get all MFA devices' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'MFA devices retrieved' })];
        _regenerateBackupCodes_decorators = [(0, common_1.Post)('backup-codes/regenerate'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Generate new backup codes' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'New backup codes generated' })];
        _disableMfa_decorators = [(0, common_1.Post)('disable'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Disable MFA' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'MFA disabled' })];
        __esDecorate(_classThis, null, _setupMfa_decorators, { kind: "method", name: "setupMfa", static: false, private: false, access: { has: function (obj) { return "setupMfa" in obj; }, get: function (obj) { return obj.setupMfa; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyMfa_decorators, { kind: "method", name: "verifyMfa", static: false, private: false, access: { has: function (obj) { return "verifyMfa" in obj; }, get: function (obj) { return obj.verifyMfa; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyCode_decorators, { kind: "method", name: "verifyCode", static: false, private: false, access: { has: function (obj) { return "verifyCode" in obj; }, get: function (obj) { return obj.verifyCode; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDevices_decorators, { kind: "method", name: "getDevices", static: false, private: false, access: { has: function (obj) { return "getDevices" in obj; }, get: function (obj) { return obj.getDevices; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _regenerateBackupCodes_decorators, { kind: "method", name: "regenerateBackupCodes", static: false, private: false, access: { has: function (obj) { return "regenerateBackupCodes" in obj; }, get: function (obj) { return obj.regenerateBackupCodes; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _disableMfa_decorators, { kind: "method", name: "disableMfa", static: false, private: false, access: { has: function (obj) { return "disableMfa" in obj; }, get: function (obj) { return obj.disableMfa; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MfaController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MfaController = _classThis;
}();
exports.MfaController = MfaController;
