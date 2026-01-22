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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenService = void 0;
var common_1 = require("@nestjs/common");
var AuthTokenService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthTokenService = _classThis = /** @class */ (function () {
        function AuthTokenService_1(jwtService, configService) {
            this.jwtService = jwtService;
            this.configService = configService;
        }
        /**
         * Generate JWT access token for authenticated user
         */
        AuthTokenService_1.prototype.generateAccessToken = function (user, sessionId, mfaVerified) {
            if (mfaVerified === void 0) { mfaVerified = false; }
            var payload = {
                userId: user.id,
                email: user.email,
                role: user.role,
                mfaEnabled: user.mfaEnabled && mfaVerified,
                sessionId: sessionId,
            };
            return this.jwtService.sign(payload, {
                expiresIn: this.configService.get('JWT_EXPIRATION', '15m'),
                secret: this.configService.get('JWT_SECRET'),
                algorithm: 'HS512', // High security algorithm
                issuer: 'healthy-stellar-auth',
                audience: 'healthy-stellar-api',
            });
        };
        /**
         * Generate refresh token for session renewal
         */
        AuthTokenService_1.prototype.generateRefreshToken = function (user, sessionId) {
            var payload = {
                userId: user.id,
                sessionId: sessionId,
                type: 'refresh',
            };
            return this.jwtService.sign(payload, {
                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION', '7d'),
                secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                algorithm: 'HS512',
                issuer: 'healthy-stellar-auth',
                audience: 'healthy-stellar-api',
            });
        };
        /**
         * Generate tokens for completed authentication
         */
        AuthTokenService_1.prototype.generateTokenPair = function (user, sessionId, mfaVerified) {
            if (mfaVerified === void 0) { mfaVerified = false; }
            var accessToken = this.generateAccessToken(user, sessionId, mfaVerified);
            var refreshToken = this.generateRefreshToken(user, sessionId);
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: 900, // 15 minutes in seconds
                refreshExpiresIn: 604800, // 7 days in seconds
            };
        };
        /**
         * Verify access token
         */
        AuthTokenService_1.prototype.verifyAccessToken = function (token) {
            try {
                return this.jwtService.verify(token, {
                    secret: this.configService.get('JWT_SECRET'),
                    algorithms: ['HS512'],
                });
            }
            catch (error) {
                return null;
            }
        };
        /**
         * Verify refresh token
         */
        AuthTokenService_1.prototype.verifyRefreshToken = function (token) {
            try {
                return this.jwtService.verify(token, {
                    secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                    algorithms: ['HS512'],
                });
            }
            catch (error) {
                return null;
            }
        };
        /**
         * Decode token without verification
         */
        AuthTokenService_1.prototype.decodeToken = function (token) {
            return this.jwtService.decode(token);
        };
        return AuthTokenService_1;
    }());
    __setFunctionName(_classThis, "AuthTokenService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthTokenService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthTokenService = _classThis;
}();
exports.AuthTokenService = AuthTokenService;
