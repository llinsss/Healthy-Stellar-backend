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
exports.AuditLogEntity = exports.AuditAction = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../auth/entities/user.entity");
var AuditAction;
(function (AuditAction) {
    AuditAction["LOGIN"] = "LOGIN";
    AuditAction["LOGOUT"] = "LOGOUT";
    AuditAction["LOGIN_FAILED"] = "LOGIN_FAILED";
    AuditAction["PASSWORD_CHANGE"] = "PASSWORD_CHANGE";
    AuditAction["PASSWORD_RESET"] = "PASSWORD_RESET";
    AuditAction["MFA_ENABLED"] = "MFA_ENABLED";
    AuditAction["MFA_DISABLED"] = "MFA_DISABLED";
    AuditAction["MFA_VERIFIED"] = "MFA_VERIFIED";
    AuditAction["SESSION_CREATED"] = "SESSION_CREATED";
    AuditAction["SESSION_REVOKED"] = "SESSION_REVOKED";
    AuditAction["USER_CREATED"] = "USER_CREATED";
    AuditAction["USER_UPDATED"] = "USER_UPDATED";
    AuditAction["USER_DELETED"] = "USER_DELETED";
    AuditAction["PERMISSION_GRANTED"] = "PERMISSION_GRANTED";
    AuditAction["PERMISSION_REVOKED"] = "PERMISSION_REVOKED";
    AuditAction["ACCOUNT_LOCKED"] = "ACCOUNT_LOCKED";
    AuditAction["ACCOUNT_UNLOCKED"] = "ACCOUNT_UNLOCKED";
    AuditAction["UNAUTHORIZED_ACCESS_ATTEMPT"] = "UNAUTHORIZED_ACCESS_ATTEMPT";
    AuditAction["DATA_ACCESS"] = "DATA_ACCESS";
    AuditAction["DATA_EXPORT"] = "DATA_EXPORT";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
var AuditLogEntity = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('audit_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _action_decorators;
    var _action_initializers = [];
    var _action_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _resourceId_decorators;
    var _resourceId_initializers = [];
    var _resourceId_extraInitializers = [];
    var _resourceType_decorators;
    var _resourceType_initializers = [];
    var _resourceType_extraInitializers = [];
    var _severity_decorators;
    var _severity_initializers = [];
    var _severity_extraInitializers = [];
    var _requiresInvestigation_decorators;
    var _requiresInvestigation_initializers = [];
    var _requiresInvestigation_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AuditLogEntity = _classThis = /** @class */ (function () {
        function AuditLogEntity_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.action = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _action_initializers, void 0));
            this.description = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.ipAddress = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            this.metadata = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.resourceId = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _resourceId_initializers, void 0));
            this.resourceType = (__runInitializers(this, _resourceId_extraInitializers), __runInitializers(this, _resourceType_initializers, void 0));
            this.severity = (__runInitializers(this, _resourceType_extraInitializers), __runInitializers(this, _severity_initializers, void 0));
            this.requiresInvestigation = (__runInitializers(this, _severity_extraInitializers), __runInitializers(this, _requiresInvestigation_initializers, void 0));
            this.createdAt = (__runInitializers(this, _requiresInvestigation_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AuditLogEntity_1;
    }());
    __setFunctionName(_classThis, "AuditLogEntity");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.auditLogs; }, { onDelete: 'SET NULL', nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _action_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: AuditAction })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 45 })];
        _userAgent_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _resourceId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _resourceType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _severity_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _requiresInvestigation_decorators = [(0, typeorm_1.Column)({ default: false })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _resourceId_decorators, { kind: "field", name: "resourceId", static: false, private: false, access: { has: function (obj) { return "resourceId" in obj; }, get: function (obj) { return obj.resourceId; }, set: function (obj, value) { obj.resourceId = value; } }, metadata: _metadata }, _resourceId_initializers, _resourceId_extraInitializers);
        __esDecorate(null, null, _resourceType_decorators, { kind: "field", name: "resourceType", static: false, private: false, access: { has: function (obj) { return "resourceType" in obj; }, get: function (obj) { return obj.resourceType; }, set: function (obj, value) { obj.resourceType = value; } }, metadata: _metadata }, _resourceType_initializers, _resourceType_extraInitializers);
        __esDecorate(null, null, _severity_decorators, { kind: "field", name: "severity", static: false, private: false, access: { has: function (obj) { return "severity" in obj; }, get: function (obj) { return obj.severity; }, set: function (obj, value) { obj.severity = value; } }, metadata: _metadata }, _severity_initializers, _severity_extraInitializers);
        __esDecorate(null, null, _requiresInvestigation_decorators, { kind: "field", name: "requiresInvestigation", static: false, private: false, access: { has: function (obj) { return "requiresInvestigation" in obj; }, get: function (obj) { return obj.requiresInvestigation; }, set: function (obj, value) { obj.requiresInvestigation = value; } }, metadata: _metadata }, _requiresInvestigation_initializers, _requiresInvestigation_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuditLogEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuditLogEntity = _classThis;
}();
exports.AuditLogEntity = AuditLogEntity;
