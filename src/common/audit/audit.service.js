"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.AuditService = void 0;
var common_1 = require("@nestjs/common");
var audit_log_entity_1 = require("./audit-log.entity");
var AuditService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuditService = _classThis = /** @class */ (function () {
        function AuditService_1(auditLogRepository) {
            this.auditLogRepository = auditLogRepository;
        }
        /**
         * Log authentication events
         */
        AuditService_1.prototype.logAuthenticationEvent = function (action, success, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    log = this.auditLogRepository.create({
                        userId: metadata.userId || null,
                        action: action,
                        description: "".concat(action, " - ").concat(success ? 'Success' : 'Failed'),
                        ipAddress: metadata.ipAddress,
                        userAgent: metadata.userAgent,
                        metadata: __assign(__assign({}, metadata), { success: success }),
                        resourceType: 'AUTH',
                        severity: metadata.severity || (success ? 'LOW' : 'MEDIUM'),
                        requiresInvestigation: !success && action === audit_log_entity_1.AuditAction.UNAUTHORIZED_ACCESS_ATTEMPT,
                    });
                    return [2 /*return*/, this.auditLogRepository.save(log)];
                });
            });
        };
        /**
         * Log data access event
         */
        AuditService_1.prototype.logDataAccess = function (userId, resourceType, resourceId, ipAddress, userAgent, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    log = this.auditLogRepository.create({
                        userId: userId,
                        action: audit_log_entity_1.AuditAction.DATA_ACCESS,
                        description: "Accessed ".concat(resourceType, " (").concat(resourceId, ")"),
                        ipAddress: ipAddress,
                        userAgent: userAgent,
                        resourceId: resourceId,
                        resourceType: resourceType,
                        metadata: metadata,
                        severity: 'LOW',
                    });
                    return [2 /*return*/, this.auditLogRepository.save(log)];
                });
            });
        };
        /**
         * Log data export event
         */
        AuditService_1.prototype.logDataExport = function (userId, resourceType, resourceIds, ipAddress, userAgent, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    log = this.auditLogRepository.create({
                        userId: userId,
                        action: audit_log_entity_1.AuditAction.DATA_EXPORT,
                        description: "Exported ".concat(resourceIds.length, " ").concat(resourceType, " records"),
                        ipAddress: ipAddress,
                        userAgent: userAgent,
                        resourceType: resourceType,
                        metadata: __assign(__assign({}, metadata), { exportedCount: resourceIds.length, resourceIds: resourceIds }),
                        severity: 'MEDIUM',
                    });
                    return [2 /*return*/, this.auditLogRepository.save(log)];
                });
            });
        };
        /**
         * Log user management events
         */
        AuditService_1.prototype.logUserManagement = function (userId, action, targetUserId, ipAddress, userAgent, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    log = this.auditLogRepository.create({
                        userId: userId,
                        action: action,
                        description: "".concat(action, " for user ").concat(targetUserId),
                        ipAddress: ipAddress,
                        userAgent: userAgent,
                        resourceId: targetUserId,
                        resourceType: 'USER',
                        metadata: metadata,
                        severity: 'MEDIUM',
                    });
                    return [2 /*return*/, this.auditLogRepository.save(log)];
                });
            });
        };
        /**
         * Get audit logs for investigation
         */
        AuditService_1.prototype.getAuditLogs = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var query;
                return __generator(this, function (_a) {
                    query = this.auditLogRepository.createQueryBuilder('audit');
                    if (filters === null || filters === void 0 ? void 0 : filters.userId) {
                        query = query.where('audit.userId = :userId', { userId: filters.userId });
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.action) {
                        query = query.andWhere('audit.action = :action', { action: filters.action });
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.startDate) {
                        query = query.andWhere('audit.createdAt >= :startDate', { startDate: filters.startDate });
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.endDate) {
                        query = query.andWhere('audit.createdAt <= :endDate', { endDate: filters.endDate });
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.severity) {
                        query = query.andWhere('audit.severity = :severity', { severity: filters.severity });
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.requiresInvestigation) {
                        query = query.andWhere('audit.requiresInvestigation = :requiresInvestigation', {
                            requiresInvestigation: true,
                        });
                    }
                    query = query.orderBy('audit.createdAt', 'DESC');
                    if (filters === null || filters === void 0 ? void 0 : filters.limit) {
                        query = query.take(filters.limit);
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.offset) {
                        query = query.skip(filters.offset);
                    }
                    return [2 /*return*/, query.getMany()];
                });
            });
        };
        /**
         * Get high-risk audit events
         */
        AuditService_1.prototype.getHighRiskEvents = function () {
            return __awaiter(this, arguments, void 0, function (days) {
                var startDate;
                if (days === void 0) { days = 7; }
                return __generator(this, function (_a) {
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - days);
                    return [2 /*return*/, this.auditLogRepository
                            .createQueryBuilder('audit')
                            .where('audit.createdAt >= :startDate', { startDate: startDate })
                            .andWhere("audit.severity IN (:...severities)", { severities: ['HIGH', 'CRITICAL'] })
                            .orderBy('audit.createdAt', 'DESC')
                            .getMany()];
                });
            });
        };
        return AuditService_1;
    }());
    __setFunctionName(_classThis, "AuditService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuditService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuditService = _classThis;
}();
exports.AuditService = AuditService;
