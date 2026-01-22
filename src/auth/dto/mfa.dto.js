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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupCodesDto = exports.MfaEnableDto = exports.MfaVerifyDto = exports.MfaSetupDto = void 0;
var class_validator_1 = require("class-validator");
var MfaSetupDto = function () {
    var _a;
    var _deviceName_decorators;
    var _deviceName_initializers = [];
    var _deviceName_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MfaSetupDto() {
                this.deviceName = __runInitializers(this, _deviceName_initializers, void 0);
                __runInitializers(this, _deviceName_extraInitializers);
            }
            return MfaSetupDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _deviceName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(1, 255)];
            __esDecorate(null, null, _deviceName_decorators, { kind: "field", name: "deviceName", static: false, private: false, access: { has: function (obj) { return "deviceName" in obj; }, get: function (obj) { return obj.deviceName; }, set: function (obj, value) { obj.deviceName = value; } }, metadata: _metadata }, _deviceName_initializers, _deviceName_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MfaSetupDto = MfaSetupDto;
var MfaVerifyDto = function () {
    var _a;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MfaVerifyDto() {
                this.code = __runInitializers(this, _code_initializers, void 0);
                __runInitializers(this, _code_extraInitializers);
            }
            return MfaVerifyDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _code_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.Length)(6, 6)];
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MfaVerifyDto = MfaVerifyDto;
var MfaEnableDto = function () {
    var _a;
    var _verificationCode_decorators;
    var _verificationCode_initializers = [];
    var _verificationCode_extraInitializers = [];
    var _deviceName_decorators;
    var _deviceName_initializers = [];
    var _deviceName_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MfaEnableDto() {
                this.verificationCode = __runInitializers(this, _verificationCode_initializers, void 0);
                this.deviceName = (__runInitializers(this, _verificationCode_extraInitializers), __runInitializers(this, _deviceName_initializers, void 0));
                __runInitializers(this, _deviceName_extraInitializers);
            }
            return MfaEnableDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _verificationCode_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.Length)(6, 6)];
            _deviceName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(1, 255)];
            __esDecorate(null, null, _verificationCode_decorators, { kind: "field", name: "verificationCode", static: false, private: false, access: { has: function (obj) { return "verificationCode" in obj; }, get: function (obj) { return obj.verificationCode; }, set: function (obj, value) { obj.verificationCode = value; } }, metadata: _metadata }, _verificationCode_initializers, _verificationCode_extraInitializers);
            __esDecorate(null, null, _deviceName_decorators, { kind: "field", name: "deviceName", static: false, private: false, access: { has: function (obj) { return "deviceName" in obj; }, get: function (obj) { return obj.deviceName; }, set: function (obj, value) { obj.deviceName = value; } }, metadata: _metadata }, _deviceName_initializers, _deviceName_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MfaEnableDto = MfaEnableDto;
var BackupCodesDto = function () {
    var _a;
    var _verificationCode_decorators;
    var _verificationCode_initializers = [];
    var _verificationCode_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BackupCodesDto() {
                this.verificationCode = __runInitializers(this, _verificationCode_initializers, void 0);
                __runInitializers(this, _verificationCode_extraInitializers);
            }
            return BackupCodesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _verificationCode_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.Length)(6, 6)];
            __esDecorate(null, null, _verificationCode_decorators, { kind: "field", name: "verificationCode", static: false, private: false, access: { has: function (obj) { return "verificationCode" in obj; }, get: function (obj) { return obj.verificationCode; }, set: function (obj, value) { obj.verificationCode = value; } }, metadata: _metadata }, _verificationCode_initializers, _verificationCode_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BackupCodesDto = BackupCodesDto;
