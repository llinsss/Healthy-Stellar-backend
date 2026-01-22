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
exports.SessionManagementService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var session_entity_1 = require("../entities/session.entity");
var SessionManagementService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SessionManagementService = _classThis = /** @class */ (function () {
        function SessionManagementService_1(sessionRepository, userRepository) {
            this.sessionRepository = sessionRepository;
            this.userRepository = userRepository;
        }
        /**
         * Create a new session
         */
        SessionManagementService_1.prototype.createSession = function (userId, accessToken, refreshToken, expiresAt, refreshTokenExpiresAt, ipAddress, userAgent, deviceId) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    session = this.sessionRepository.create({
                        userId: userId,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        expiresAt: expiresAt,
                        refreshTokenExpiresAt: refreshTokenExpiresAt,
                        ipAddress: ipAddress,
                        userAgent: userAgent,
                        deviceId: deviceId || 'unknown',
                        isActive: true,
                    });
                    return [2 /*return*/, this.sessionRepository.save(session)];
                });
            });
        };
        /**
         * Get active session
         */
        SessionManagementService_1.prototype.getSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.sessionRepository.findOne({
                            where: {
                                id: sessionId,
                                isActive: true,
                                expiresAt: (0, typeorm_1.LessThan)(new Date()),
                            },
                        })];
                });
            });
        };
        /**
         * Get all active sessions for user
         */
        SessionManagementService_1.prototype.getUserSessions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.sessionRepository.find({
                            where: {
                                userId: userId,
                                isActive: true,
                            },
                            order: {
                                createdAt: 'DESC',
                            },
                        })];
                });
            });
        };
        /**
         * Refresh session tokens
         */
        SessionManagementService_1.prototype.refreshSession = function (sessionId, newAccessToken, newRefreshToken, newExpiresAt, newRefreshTokenExpiresAt) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.findOne({ where: { id: sessionId } })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                throw new common_1.UnauthorizedException('Session not found');
                            }
                            if (!session.isActive) {
                                throw new common_1.UnauthorizedException('Session is not active');
                            }
                            if (new Date() > session.refreshTokenExpiresAt) {
                                throw new common_1.UnauthorizedException('Refresh token expired');
                            }
                            session.accessToken = newAccessToken;
                            session.refreshToken = newRefreshToken;
                            session.expiresAt = newExpiresAt;
                            session.refreshTokenExpiresAt = newRefreshTokenExpiresAt;
                            return [2 /*return*/, this.sessionRepository.save(session)];
                    }
                });
            });
        };
        /**
         * Revoke session
         */
        SessionManagementService_1.prototype.revokeSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.findOne({ where: { id: sessionId } })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                throw new common_1.NotFoundException('Session not found');
                            }
                            session.isActive = false;
                            session.revokedAt = new Date();
                            return [4 /*yield*/, this.sessionRepository.save(session)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Revoke all sessions for user
         */
        SessionManagementService_1.prototype.revokeAllUserSessions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var sessions, _i, sessions_1, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.find({
                                where: {
                                    userId: userId,
                                    isActive: true,
                                },
                            })];
                        case 1:
                            sessions = _a.sent();
                            for (_i = 0, sessions_1 = sessions; _i < sessions_1.length; _i++) {
                                session = sessions_1[_i];
                                session.isActive = false;
                                session.revokedAt = new Date();
                            }
                            return [4 /*yield*/, this.sessionRepository.save(sessions)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if session is valid
         */
        SessionManagementService_1.prototype.isSessionValid = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.findOne({ where: { id: sessionId } })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                return [2 /*return*/, false];
                            }
                            if (!session.isActive) {
                                return [2 /*return*/, false];
                            }
                            if (!(new Date() > session.expiresAt)) return [3 /*break*/, 3];
                            session.isActive = false;
                            return [4 /*yield*/, this.sessionRepository.save(session)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * Clean up expired sessions (run periodically)
         */
        SessionManagementService_1.prototype.cleanupExpiredSessions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository
                                .createQueryBuilder()
                                .update(session_entity_1.SessionEntity)
                                .set({ isActive: false, revokedAt: new Date() })
                                .where('expiresAt < :now AND isActive = :active', { now: new Date(), active: true })
                                .execute()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.affected || 0];
                    }
                });
            });
        };
        /**
         * Enforce session timeout (HIPAA requirement: 15 minutes of inactivity)
         */
        SessionManagementService_1.prototype.enforceSessionTimeout = function (sessionId_1) {
            return __awaiter(this, arguments, void 0, function (sessionId, inactivityMinutes) {
                var session, lastActivityTime, now, minutesSinceLastActivity;
                if (inactivityMinutes === void 0) { inactivityMinutes = 15; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.findOne({ where: { id: sessionId } })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                return [2 /*return*/, false];
                            }
                            lastActivityTime = session.updatedAt;
                            now = new Date();
                            minutesSinceLastActivity = (now.getTime() - lastActivityTime.getTime()) / (1000 * 60);
                            if (!(minutesSinceLastActivity > inactivityMinutes)) return [3 /*break*/, 3];
                            session.isActive = false;
                            session.revokedAt = new Date();
                            return [4 /*yield*/, this.sessionRepository.save(session)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * Get session info for user
         */
        SessionManagementService_1.prototype.getSessionInfo = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.findOne({ where: { id: sessionId } })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, {
                                    id: session.id,
                                    userId: session.userId,
                                    ipAddress: session.ipAddress,
                                    userAgent: session.userAgent,
                                    deviceId: session.deviceId,
                                    createdAt: session.createdAt,
                                    expiresAt: session.expiresAt,
                                }];
                    }
                });
            });
        };
        /**
         * Update session activity timestamp
         */
        SessionManagementService_1.prototype.updateSessionActivity = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.update({ id: sessionId }, { updatedAt: new Date() })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SessionManagementService_1;
    }());
    __setFunctionName(_classThis, "SessionManagementService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SessionManagementService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SessionManagementService = _classThis;
}();
exports.SessionManagementService = SessionManagementService;
