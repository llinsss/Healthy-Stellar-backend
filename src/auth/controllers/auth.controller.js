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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
var user_entity_1 = require("../entities/user.entity");
var AuthController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Authentication'), (0, common_1.Controller)('auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _register_decorators;
    var _registerStaff_decorators;
    var _login_decorators;
    var _refreshToken_decorators;
    var _changePassword_decorators;
    var _logout_decorators;
    var _getCurrentUser_decorators;
    var _getSessions_decorators;
    var _revokeSession_decorators;
    var _revokeAllSessions_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService, mfaService, sessionManagementService, authTokenService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.mfaService = mfaService;
            this.sessionManagementService = sessionManagementService;
            this.authTokenService = authTokenService;
        }
        /**
         * Register new user (healthcare staff or patient)
         */
        AuthController_1.prototype.register = function (registerDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.register(registerDto, user_entity_1.UserRole.PATIENT, this.getIpAddress(req), req.get('user-agent'))];
                });
            });
        };
        /**
         * Register healthcare staff
         */
        AuthController_1.prototype.registerStaff = function (body, req) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!body.role || !Object.values(user_entity_1.UserRole).includes(body.role)) {
                                throw new common_1.BadRequestException('Invalid role');
                            }
                            if (body.role === user_entity_1.UserRole.PATIENT) {
                                throw new common_1.BadRequestException('Use /register endpoint for patient registration');
                            }
                            return [4 /*yield*/, this.authService.register(body, body.role, this.getIpAddress(req), req.get('user-agent'))];
                        case 1:
                            result = _a.sent();
                            // Staff requires MFA setup immediately
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * Login user
         */
        AuthController_1.prototype.login = function (loginDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.login(loginDto, this.getIpAddress(req), req.get('user-agent'))];
                });
            });
        };
        /**
         * Refresh access token
         */
        AuthController_1.prototype.refreshToken = function (refreshTokenDto) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, session, user, expiresAt, refreshTokenExpiresAt, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            payload = this.authTokenService.verifyRefreshToken(refreshTokenDto.refreshToken);
                            if (!payload) {
                                throw new common_1.BadRequestException('Invalid refresh token');
                            }
                            return [4 /*yield*/, this.sessionManagementService.getSession(payload.sessionId)];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                throw new common_1.NotFoundException('Session not found');
                            }
                            return [4 /*yield*/, this.authService.getUserById(payload.userId)];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            expiresAt = new Date(Date.now() + 15 * 60 * 1000);
                            refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                            tokens = this.authTokenService.generateTokenPair(user, payload.sessionId, user.mfaEnabled);
                            return [4 /*yield*/, this.sessionManagementService.refreshSession(payload.sessionId, tokens.accessToken, tokens.refreshToken, expiresAt, refreshTokenExpiresAt)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    accessToken: tokens.accessToken,
                                    expiresIn: tokens.expiresIn,
                                }];
                    }
                });
            });
        };
        /**
         * Change password
         */
        AuthController_1.prototype.changePassword = function (changePasswordDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.changePassword(req.user.userId, changePasswordDto, this.getIpAddress(req))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Password changed successfully' }];
                    }
                });
            });
        };
        /**
         * Logout user
         */
        AuthController_1.prototype.logout = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.logout(req.user.userId, req.sessionId, this.getIpAddress(req))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Logged out successfully' }];
                    }
                });
            });
        };
        /**
         * Get current user
         */
        AuthController_1.prototype.getCurrentUser = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.getUserById(req.user.userId)];
                });
            });
        };
        /**
         * Get user sessions
         */
        AuthController_1.prototype.getSessions = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var sessions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionManagementService.getUserSessions(req.user.userId)];
                        case 1:
                            sessions = _a.sent();
                            return [2 /*return*/, sessions.map(function (session) { return ({
                                    id: session.id,
                                    ipAddress: session.ipAddress,
                                    deviceId: session.deviceId,
                                    createdAt: session.createdAt,
                                    expiresAt: session.expiresAt,
                                }); })];
                    }
                });
            });
        };
        /**
         * Revoke session
         */
        AuthController_1.prototype.revokeSession = function (req, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionManagementService.getSession(sessionId)];
                        case 1:
                            session = _a.sent();
                            if (!session || session.userId !== req.user.userId) {
                                throw new common_1.NotFoundException('Session not found');
                            }
                            return [4 /*yield*/, this.sessionManagementService.revokeSession(sessionId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Session revoked' }];
                    }
                });
            });
        };
        /**
         * Revoke all sessions (except current)
         */
        AuthController_1.prototype.revokeAllSessions = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var sessions, _i, sessions_1, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionManagementService.getUserSessions(req.user.userId)];
                        case 1:
                            sessions = _a.sent();
                            _i = 0, sessions_1 = sessions;
                            _a.label = 2;
                        case 2:
                            if (!(_i < sessions_1.length)) return [3 /*break*/, 5];
                            session = sessions_1[_i];
                            if (!(session.id !== req.sessionId)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.sessionManagementService.revokeSession(session.id)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, { message: 'All other sessions revoked' }];
                    }
                });
            });
        };
        AuthController_1.prototype.getIpAddress = function (req) {
            return (req.ip || req.socket.remoteAddress || 'unknown').toString();
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _register_decorators = [(0, common_1.Post)('register'), (0, swagger_1.ApiOperation)({ summary: 'Register new user' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'User registered successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already registered' })];
        _registerStaff_decorators = [(0, common_1.Post)('register/staff'), (0, swagger_1.ApiOperation)({ summary: 'Register healthcare staff with role' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Staff registered successfully' })];
        _login_decorators = [(0, common_1.Post)('login'), (0, swagger_1.ApiOperation)({ summary: 'Login user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' })];
        _refreshToken_decorators = [(0, common_1.Post)('refresh'), (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Token refreshed successfully' })];
        _changePassword_decorators = [(0, common_1.Post)('change-password'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Change user password' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Password changed successfully' })];
        _logout_decorators = [(0, common_1.Post)('logout'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Logout user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout successful' })];
        _getCurrentUser_decorators = [(0, common_1.Get)('me'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile retrieved' })];
        _getSessions_decorators = [(0, common_1.Get)('sessions'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Get all active sessions' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Sessions retrieved' })];
        _revokeSession_decorators = [(0, common_1.Post)('sessions/:sessionId/revoke'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Revoke a specific session' })];
        _revokeAllSessions_decorators = [(0, common_1.Post)('sessions/revoke-all'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Revoke all sessions except current' })];
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: function (obj) { return "register" in obj; }, get: function (obj) { return obj.register; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registerStaff_decorators, { kind: "method", name: "registerStaff", static: false, private: false, access: { has: function (obj) { return "registerStaff" in obj; }, get: function (obj) { return obj.registerStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refreshToken_decorators, { kind: "method", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _changePassword_decorators, { kind: "method", name: "changePassword", static: false, private: false, access: { has: function (obj) { return "changePassword" in obj; }, get: function (obj) { return obj.changePassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCurrentUser_decorators, { kind: "method", name: "getCurrentUser", static: false, private: false, access: { has: function (obj) { return "getCurrentUser" in obj; }, get: function (obj) { return obj.getCurrentUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSessions_decorators, { kind: "method", name: "getSessions", static: false, private: false, access: { has: function (obj) { return "getSessions" in obj; }, get: function (obj) { return obj.getSessions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _revokeSession_decorators, { kind: "method", name: "revokeSession", static: false, private: false, access: { has: function (obj) { return "revokeSession" in obj; }, get: function (obj) { return obj.revokeSession; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _revokeAllSessions_decorators, { kind: "method", name: "revokeAllSessions", static: false, private: false, access: { has: function (obj) { return "revokeAllSessions" in obj; }, get: function (obj) { return obj.revokeAllSessions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
