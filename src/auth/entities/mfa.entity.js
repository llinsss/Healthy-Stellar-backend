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
exports.MfaEntity = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var MfaEntity = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mfa_devices')];
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
    var _secret_decorators;
    var _secret_initializers = [];
    var _secret_extraInitializers = [];
    var _backupCodes_decorators;
    var _backupCodes_initializers = [];
    var _backupCodes_extraInitializers = [];
    var _isVerified_decorators;
    var _isVerified_initializers = [];
    var _isVerified_extraInitializers = [];
    var _verifiedAt_decorators;
    var _verifiedAt_initializers = [];
    var _verifiedAt_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _lastUsedAt_decorators;
    var _lastUsedAt_initializers = [];
    var _lastUsedAt_extraInitializers = [];
    var _isPrimary_decorators;
    var _isPrimary_initializers = [];
    var _isPrimary_extraInitializers = [];
    var _deviceName_decorators;
    var _deviceName_initializers = [];
    var _deviceName_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var MfaEntity = _classThis = /** @class */ (function () {
        function MfaEntity_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.secret = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _secret_initializers, void 0));
            this.backupCodes = (__runInitializers(this, _secret_extraInitializers), __runInitializers(this, _backupCodes_initializers, void 0));
            this.isVerified = (__runInitializers(this, _backupCodes_extraInitializers), __runInitializers(this, _isVerified_initializers, void 0));
            this.verifiedAt = (__runInitializers(this, _isVerified_extraInitializers), __runInitializers(this, _verifiedAt_initializers, void 0));
            this.isActive = (__runInitializers(this, _verifiedAt_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.lastUsedAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _lastUsedAt_initializers, void 0));
            this.isPrimary = (__runInitializers(this, _lastUsedAt_extraInitializers), __runInitializers(this, _isPrimary_initializers, void 0));
            this.deviceName = (__runInitializers(this, _isPrimary_extraInitializers), __runInitializers(this, _deviceName_initializers, void 0));
            this.createdAt = (__runInitializers(this, _deviceName_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return MfaEntity_1;
    }());
    __setFunctionName(_classThis, "MfaEntity");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.mfaDevices; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _secret_decorators = [(0, typeorm_1.Column)()];
        _backupCodes_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _isVerified_decorators = [(0, typeorm_1.Column)({ default: false })];
        _verifiedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _lastUsedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true })];
        _isPrimary_decorators = [(0, typeorm_1.Column)({ default: false })];
        _deviceName_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 255 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _secret_decorators, { kind: "field", name: "secret", static: false, private: false, access: { has: function (obj) { return "secret" in obj; }, get: function (obj) { return obj.secret; }, set: function (obj, value) { obj.secret = value; } }, metadata: _metadata }, _secret_initializers, _secret_extraInitializers);
        __esDecorate(null, null, _backupCodes_decorators, { kind: "field", name: "backupCodes", static: false, private: false, access: { has: function (obj) { return "backupCodes" in obj; }, get: function (obj) { return obj.backupCodes; }, set: function (obj, value) { obj.backupCodes = value; } }, metadata: _metadata }, _backupCodes_initializers, _backupCodes_extraInitializers);
        __esDecorate(null, null, _isVerified_decorators, { kind: "field", name: "isVerified", static: false, private: false, access: { has: function (obj) { return "isVerified" in obj; }, get: function (obj) { return obj.isVerified; }, set: function (obj, value) { obj.isVerified = value; } }, metadata: _metadata }, _isVerified_initializers, _isVerified_extraInitializers);
        __esDecorate(null, null, _verifiedAt_decorators, { kind: "field", name: "verifiedAt", static: false, private: false, access: { has: function (obj) { return "verifiedAt" in obj; }, get: function (obj) { return obj.verifiedAt; }, set: function (obj, value) { obj.verifiedAt = value; } }, metadata: _metadata }, _verifiedAt_initializers, _verifiedAt_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _lastUsedAt_decorators, { kind: "field", name: "lastUsedAt", static: false, private: false, access: { has: function (obj) { return "lastUsedAt" in obj; }, get: function (obj) { return obj.lastUsedAt; }, set: function (obj, value) { obj.lastUsedAt = value; } }, metadata: _metadata }, _lastUsedAt_initializers, _lastUsedAt_extraInitializers);
        __esDecorate(null, null, _isPrimary_decorators, { kind: "field", name: "isPrimary", static: false, private: false, access: { has: function (obj) { return "isPrimary" in obj; }, get: function (obj) { return obj.isPrimary; }, set: function (obj, value) { obj.isPrimary = value; } }, metadata: _metadata }, _isPrimary_initializers, _isPrimary_extraInitializers);
        __esDecorate(null, null, _deviceName_decorators, { kind: "field", name: "deviceName", static: false, private: false, access: { has: function (obj) { return "deviceName" in obj; }, get: function (obj) { return obj.deviceName; }, set: function (obj, value) { obj.deviceName = value; } }, metadata: _metadata }, _deviceName_initializers, _deviceName_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MfaEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MfaEntity = _classThis;
}();
exports.MfaEntity = MfaEntity;
