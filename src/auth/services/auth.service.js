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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("../entities/user.entity");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(userRepository, passwordValidationService, authTokenService, mfaService, sessionManagementService, auditService) {
            this.userRepository = userRepository;
            this.passwordValidationService = passwordValidationService;
            this.authTokenService = authTokenService;
            this.mfaService = mfaService;
            this.sessionManagementService = sessionManagementService;
            this.auditService = auditService;
        }
        /**
         * Register new user (healthcare staff)
         */
        AuthService_1.prototype.register = function (registerDto_1) {
            return __awaiter(this, arguments, void 0, function (registerDto, role, ipAddress, userAgent) {
                var existingUser, passwordValidation, hashedPassword, user, savedUser, sessionId, expiresAt, refreshTokenExpiresAt, tokens;
                if (role === void 0) { role = user_entity_1.UserRole.PATIENT; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: registerDto.email },
                            })];
                        case 1:
                            existingUser = _a.sent();
                            if (!existingUser) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('USER_CREATED', false, {
                                    email: registerDto.email,
                                    reason: 'Email already exists',
                                    ipAddress: ipAddress,
                                })];
                        case 2:
                            _a.sent();
                            throw new common_1.ConflictException('Email already registered');
                        case 3:
                            passwordValidation = this.passwordValidationService.validatePassword(registerDto.password);
                            if (!passwordValidation.isValid) {
                                throw new common_1.BadRequestException({
                                    message: 'Password does not meet security requirements',
                                    errors: passwordValidation.errors,
                                });
                            }
                            return [4 /*yield*/, this.passwordValidationService.hashPassword(registerDto.password)];
                        case 4:
                            hashedPassword = _a.sent();
                            user = this.userRepository.create({
                                email: registerDto.email,
                                passwordHash: hashedPassword,
                                firstName: registerDto.firstName,
                                lastName: registerDto.lastName,
                                role: role,
                                isActive: true,
                                lastPasswordChangeAt: new Date(),
                                mfaEnabled: false,
                                requiresPasswordChange: false,
                            });
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 5:
                            savedUser = _a.sent();
                            // Log user creation
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('USER_CREATED', true, {
                                    userId: savedUser.id,
                                    email: savedUser.email,
                                    role: savedUser.role,
                                    ipAddress: ipAddress,
                                })];
                        case 6:
                            // Log user creation
                            _a.sent();
                            if (!(role !== user_entity_1.UserRole.PATIENT)) return [3 /*break*/, 8];
                            savedUser.requiresPasswordChange = false; // Password was just set
                            return [4 /*yield*/, this.userRepository.save(savedUser)];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8:
                            sessionId = this.generateSessionId();
                            expiresAt = new Date(Date.now() + 15 * 60 * 1000);
                            refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                            tokens = this.authTokenService.generateTokenPair(user, sessionId);
                            return [4 /*yield*/, this.sessionManagementService.createSession(savedUser.id, tokens.accessToken, tokens.refreshToken, expiresAt, refreshTokenExpiresAt, ipAddress, userAgent)];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, {
                                    user: this.formatUser(savedUser),
                                    tokens: {
                                        accessToken: tokens.accessToken,
                                        refreshToken: tokens.refreshToken,
                                        expiresIn: tokens.expiresIn,
                                    },
                                }];
                    }
                });
            });
        };
        /**
         * Login user
         */
        AuthService_1.prototype.login = function (loginDto, ipAddress, userAgent) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, user, _a, mfaEnabled, sessionId, expiresAt, refreshTokenExpiresAt, tokens;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            email = loginDto.email, password = loginDto.password;
                            return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                        case 1:
                            user = _b.sent();
                            _a = !user;
                            if (_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.passwordValidationService.verifyPassword(password, user.passwordHash)];
                        case 2:
                            _a = !(_b.sent());
                            _b.label = 3;
                        case 3:
                            if (!_a) return [3 /*break*/, 9];
                            if (!user) return [3 /*break*/, 7];
                            user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
                            if (!(user.failedLoginAttempts >= 5)) return [3 /*break*/, 5];
                            user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('ACCOUNT_LOCKED', false, {
                                    userId: user.id,
                                    reason: 'Too many failed login attempts',
                                    ipAddress: ipAddress,
                                })];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [4 /*yield*/, this.userRepository.save(user)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7: return [4 /*yield*/, this.auditService.logAuthenticationEvent('LOGIN_FAILED', false, {
                                email: email,
                                reason: 'Invalid credentials',
                                ipAddress: ipAddress,
                            })];
                        case 8:
                            _b.sent();
                            throw new common_1.UnauthorizedException('Invalid email or password');
                        case 9:
                            if (!(user.lockedUntil && user.lockedUntil > new Date())) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('LOGIN_FAILED', false, {
                                    userId: user.id,
                                    reason: 'Account is locked',
                                    ipAddress: ipAddress,
                                })];
                        case 10:
                            _b.sent();
                            throw new common_1.UnauthorizedException('Account is locked. Try again later');
                        case 11:
                            if (!!user.isActive) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('LOGIN_FAILED', false, {
                                    userId: user.id,
                                    reason: 'User account is inactive',
                                    ipAddress: ipAddress,
                                })];
                        case 12:
                            _b.sent();
                            throw new common_1.UnauthorizedException('User account is inactive');
                        case 13:
                            if (!(user.lastPasswordChangeAt && this.passwordValidationService.isPasswordExpired(user.lastPasswordChangeAt))) return [3 /*break*/, 15];
                            user.requiresPasswordChange = true;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 14:
                            _b.sent();
                            _b.label = 15;
                        case 15: return [4 /*yield*/, this.mfaService.isMfaEnabled(user.id)];
                        case 16:
                            mfaEnabled = _b.sent();
                            if (!(user.role !== user_entity_1.UserRole.PATIENT && !mfaEnabled)) return [3 /*break*/, 18];
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('LOGIN_FAILED', false, {
                                    userId: user.id,
                                    reason: 'MFA required but not enabled',
                                    ipAddress: ipAddress,
                                })];
                        case 17:
                            _b.sent();
                            throw new common_1.BadRequestException({
                                message: 'MFA setup required for healthcare staff',
                                mfaRequired: true,
                                requiresMfaSetup: true,
                            });
                        case 18:
                            // Reset failed login attempts
                            user.failedLoginAttempts = 0;
                            user.lockedUntil = null;
                            user.lastLoginAt = new Date();
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 19:
                            _b.sent();
                            sessionId = this.generateSessionId();
                            expiresAt = new Date(Date.now() + 15 * 60 * 1000);
                            refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                            tokens = this.authTokenService.generateTokenPair(user, sessionId, !mfaEnabled);
                            return [4 /*yield*/, this.sessionManagementService.createSession(user.id, tokens.accessToken, tokens.refreshToken, expiresAt, refreshTokenExpiresAt, ipAddress, userAgent)];
                        case 20:
                            _b.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('LOGIN', true, {
                                    userId: user.id,
                                    email: user.email,
                                    ipAddress: ipAddress,
                                })];
                        case 21:
                            _b.sent();
                            return [2 /*return*/, {
                                    user: this.formatUser(user),
                                    tokens: {
                                        accessToken: tokens.accessToken,
                                        refreshToken: tokens.refreshToken,
                                        expiresIn: tokens.expiresIn,
                                    },
                                    mfaRequired: mfaEnabled,
                                }];
                    }
                });
            });
        };
        /**
         * Change password
         */
        AuthService_1.prototype.changePassword = function (userId, changePasswordDto, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var currentPassword, newPassword, confirmPassword, user, isValid, passwordValidation, hashedPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentPassword = changePasswordDto.currentPassword, newPassword = changePasswordDto.newPassword, confirmPassword = changePasswordDto.confirmPassword;
                            if (newPassword !== confirmPassword) {
                                throw new common_1.BadRequestException('Passwords do not match');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            return [4 /*yield*/, this.passwordValidationService.verifyPassword(currentPassword, user.passwordHash)];
                        case 2:
                            isValid = _a.sent();
                            if (!!isValid) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('PASSWORD_CHANGE', false, {
                                    userId: userId,
                                    reason: 'Invalid current password',
                                    ipAddress: ipAddress,
                                    severity: 'MEDIUM',
                                })];
                        case 3:
                            _a.sent();
                            throw new common_1.UnauthorizedException('Current password is incorrect');
                        case 4:
                            passwordValidation = this.passwordValidationService.validatePassword(newPassword, userId);
                            if (!passwordValidation.isValid) {
                                throw new common_1.BadRequestException({
                                    message: 'New password does not meet security requirements',
                                    errors: passwordValidation.errors,
                                });
                            }
                            return [4 /*yield*/, this.passwordValidationService.hashPassword(newPassword)];
                        case 5:
                            hashedPassword = _a.sent();
                            user.passwordHash = hashedPassword;
                            user.lastPasswordChangeAt = new Date();
                            user.requiresPasswordChange = false;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.auditService.logAuthenticationEvent('PASSWORD_CHANGE', true, {
                                    userId: userId,
                                    ipAddress: ipAddress,
                                })];
                        case 7:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Logout user
         */
        AuthService_1.prototype.logout = function (userId, sessionId, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!sessionId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sessionManagementService.revokeSession(sessionId)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.auditService.logAuthenticationEvent('LOGOUT', true, {
                                userId: userId,
                                sessionId: sessionId,
                                ipAddress: ipAddress,
                            })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get user by ID
         */
        AuthService_1.prototype.getUserById = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userRepository.findOne({ where: { id: userId } })];
                });
            });
        };
        /**
         * Update user profile
         */
        AuthService_1.prototype.updateUserProfile = function (userId, updates) {
            return __awaiter(this, void 0, void 0, function () {
                var user, allowedFields, safeUpdates, _i, allowedFields_1, field;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            allowedFields = ['firstName', 'lastName', 'specialization', 'licenseNumber', 'npi'];
                            safeUpdates = {};
                            for (_i = 0, allowedFields_1 = allowedFields; _i < allowedFields_1.length; _i++) {
                                field = allowedFields_1[_i];
                                if (field in updates) {
                                    safeUpdates[field] = updates[field];
                                }
                            }
                            Object.assign(user, safeUpdates);
                            return [2 /*return*/, this.userRepository.save(user)];
                    }
                });
            });
        };
        /**
         * Format user for response
         */
        AuthService_1.prototype.formatUser = function (user) {
            return {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                mfaEnabled: user.mfaEnabled,
            };
        };
        /**
         * Generate session ID
         */
        AuthService_1.prototype.generateSessionId = function () {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
