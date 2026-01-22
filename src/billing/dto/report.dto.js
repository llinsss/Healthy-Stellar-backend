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
exports.DenialAnalysisDto = exports.ARAgingReportDto = exports.ReportSearchDto = exports.GenerateReportDto = exports.PeriodType = exports.ReportType = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var ReportType;
(function (ReportType) {
    ReportType["REVENUE_SUMMARY"] = "revenue_summary";
    ReportType["AR_AGING"] = "ar_aging";
    ReportType["PAYER_MIX"] = "payer_mix";
    ReportType["DENIAL_ANALYSIS"] = "denial_analysis";
    ReportType["COLLECTION_PERFORMANCE"] = "collection_performance";
    ReportType["PROVIDER_PRODUCTIVITY"] = "provider_productivity";
    ReportType["PROCEDURE_ANALYSIS"] = "procedure_analysis";
})(ReportType || (exports.ReportType = ReportType = {}));
var PeriodType;
(function (PeriodType) {
    PeriodType["DAILY"] = "daily";
    PeriodType["WEEKLY"] = "weekly";
    PeriodType["MONTHLY"] = "monthly";
    PeriodType["QUARTERLY"] = "quarterly";
    PeriodType["YEARLY"] = "yearly";
    PeriodType["CUSTOM"] = "custom";
})(PeriodType || (exports.PeriodType = PeriodType = {}));
var GenerateReportDto = function () {
    var _a;
    var _reportType_decorators;
    var _reportType_initializers = [];
    var _reportType_extraInitializers = [];
    var _periodType_decorators;
    var _periodType_initializers = [];
    var _periodType_extraInitializers = [];
    var _periodStart_decorators;
    var _periodStart_initializers = [];
    var _periodStart_extraInitializers = [];
    var _periodEnd_decorators;
    var _periodEnd_initializers = [];
    var _periodEnd_extraInitializers = [];
    var _providerId_decorators;
    var _providerId_initializers = [];
    var _providerId_extraInitializers = [];
    var _payerId_decorators;
    var _payerId_initializers = [];
    var _payerId_extraInitializers = [];
    var _facilityId_decorators;
    var _facilityId_initializers = [];
    var _facilityId_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GenerateReportDto() {
                this.reportType = __runInitializers(this, _reportType_initializers, void 0);
                this.periodType = (__runInitializers(this, _reportType_extraInitializers), __runInitializers(this, _periodType_initializers, void 0));
                this.periodStart = (__runInitializers(this, _periodType_extraInitializers), __runInitializers(this, _periodStart_initializers, void 0));
                this.periodEnd = (__runInitializers(this, _periodStart_extraInitializers), __runInitializers(this, _periodEnd_initializers, void 0));
                this.providerId = (__runInitializers(this, _periodEnd_extraInitializers), __runInitializers(this, _providerId_initializers, void 0));
                this.payerId = (__runInitializers(this, _providerId_extraInitializers), __runInitializers(this, _payerId_initializers, void 0));
                this.facilityId = (__runInitializers(this, _payerId_extraInitializers), __runInitializers(this, _facilityId_initializers, void 0));
                this.notes = (__runInitializers(this, _facilityId_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                __runInitializers(this, _notes_extraInitializers);
            }
            return GenerateReportDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _reportType_decorators = [(0, swagger_1.ApiProperty)({ enum: ReportType }), (0, class_validator_1.IsEnum)(ReportType)];
            _periodType_decorators = [(0, swagger_1.ApiProperty)({ enum: PeriodType }), (0, class_validator_1.IsEnum)(PeriodType)];
            _periodStart_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsDateString)()];
            _periodEnd_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsDateString)()];
            _providerId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _payerId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _facilityId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _reportType_decorators, { kind: "field", name: "reportType", static: false, private: false, access: { has: function (obj) { return "reportType" in obj; }, get: function (obj) { return obj.reportType; }, set: function (obj, value) { obj.reportType = value; } }, metadata: _metadata }, _reportType_initializers, _reportType_extraInitializers);
            __esDecorate(null, null, _periodType_decorators, { kind: "field", name: "periodType", static: false, private: false, access: { has: function (obj) { return "periodType" in obj; }, get: function (obj) { return obj.periodType; }, set: function (obj, value) { obj.periodType = value; } }, metadata: _metadata }, _periodType_initializers, _periodType_extraInitializers);
            __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: function (obj) { return "periodStart" in obj; }, get: function (obj) { return obj.periodStart; }, set: function (obj, value) { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
            __esDecorate(null, null, _periodEnd_decorators, { kind: "field", name: "periodEnd", static: false, private: false, access: { has: function (obj) { return "periodEnd" in obj; }, get: function (obj) { return obj.periodEnd; }, set: function (obj, value) { obj.periodEnd = value; } }, metadata: _metadata }, _periodEnd_initializers, _periodEnd_extraInitializers);
            __esDecorate(null, null, _providerId_decorators, { kind: "field", name: "providerId", static: false, private: false, access: { has: function (obj) { return "providerId" in obj; }, get: function (obj) { return obj.providerId; }, set: function (obj, value) { obj.providerId = value; } }, metadata: _metadata }, _providerId_initializers, _providerId_extraInitializers);
            __esDecorate(null, null, _payerId_decorators, { kind: "field", name: "payerId", static: false, private: false, access: { has: function (obj) { return "payerId" in obj; }, get: function (obj) { return obj.payerId; }, set: function (obj, value) { obj.payerId = value; } }, metadata: _metadata }, _payerId_initializers, _payerId_extraInitializers);
            __esDecorate(null, null, _facilityId_decorators, { kind: "field", name: "facilityId", static: false, private: false, access: { has: function (obj) { return "facilityId" in obj; }, get: function (obj) { return obj.facilityId; }, set: function (obj, value) { obj.facilityId = value; } }, metadata: _metadata }, _facilityId_initializers, _facilityId_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GenerateReportDto = GenerateReportDto;
var ReportSearchDto = function () {
    var _a;
    var _reportType_decorators;
    var _reportType_initializers = [];
    var _reportType_extraInitializers = [];
    var _periodType_decorators;
    var _periodType_initializers = [];
    var _periodType_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ReportSearchDto() {
                this.reportType = __runInitializers(this, _reportType_initializers, void 0);
                this.periodType = (__runInitializers(this, _reportType_extraInitializers), __runInitializers(this, _periodType_initializers, void 0));
                this.startDate = (__runInitializers(this, _periodType_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                __runInitializers(this, _endDate_extraInitializers);
            }
            return ReportSearchDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _reportType_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: ReportType }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ReportType)];
            _periodType_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: PeriodType }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(PeriodType)];
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            __esDecorate(null, null, _reportType_decorators, { kind: "field", name: "reportType", static: false, private: false, access: { has: function (obj) { return "reportType" in obj; }, get: function (obj) { return obj.reportType; }, set: function (obj, value) { obj.reportType = value; } }, metadata: _metadata }, _reportType_initializers, _reportType_extraInitializers);
            __esDecorate(null, null, _periodType_decorators, { kind: "field", name: "periodType", static: false, private: false, access: { has: function (obj) { return "periodType" in obj; }, get: function (obj) { return obj.periodType; }, set: function (obj, value) { obj.periodType = value; } }, metadata: _metadata }, _periodType_initializers, _periodType_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ReportSearchDto = ReportSearchDto;
var ARAgingReportDto = function () {
    var _a;
    var _asOfDate_decorators;
    var _asOfDate_initializers = [];
    var _asOfDate_extraInitializers = [];
    var _payerId_decorators;
    var _payerId_initializers = [];
    var _payerId_extraInitializers = [];
    var _providerId_decorators;
    var _providerId_initializers = [];
    var _providerId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ARAgingReportDto() {
                this.asOfDate = __runInitializers(this, _asOfDate_initializers, void 0);
                this.payerId = (__runInitializers(this, _asOfDate_extraInitializers), __runInitializers(this, _payerId_initializers, void 0));
                this.providerId = (__runInitializers(this, _payerId_extraInitializers), __runInitializers(this, _providerId_initializers, void 0));
                __runInitializers(this, _providerId_extraInitializers);
            }
            return ARAgingReportDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _asOfDate_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsDateString)()];
            _payerId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _providerId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _asOfDate_decorators, { kind: "field", name: "asOfDate", static: false, private: false, access: { has: function (obj) { return "asOfDate" in obj; }, get: function (obj) { return obj.asOfDate; }, set: function (obj, value) { obj.asOfDate = value; } }, metadata: _metadata }, _asOfDate_initializers, _asOfDate_extraInitializers);
            __esDecorate(null, null, _payerId_decorators, { kind: "field", name: "payerId", static: false, private: false, access: { has: function (obj) { return "payerId" in obj; }, get: function (obj) { return obj.payerId; }, set: function (obj, value) { obj.payerId = value; } }, metadata: _metadata }, _payerId_initializers, _payerId_extraInitializers);
            __esDecorate(null, null, _providerId_decorators, { kind: "field", name: "providerId", static: false, private: false, access: { has: function (obj) { return "providerId" in obj; }, get: function (obj) { return obj.providerId; }, set: function (obj, value) { obj.providerId = value; } }, metadata: _metadata }, _providerId_initializers, _providerId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ARAgingReportDto = ARAgingReportDto;
var DenialAnalysisDto = function () {
    var _a;
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _payerId_decorators;
    var _payerId_initializers = [];
    var _payerId_extraInitializers = [];
    var _denialReason_decorators;
    var _denialReason_initializers = [];
    var _denialReason_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DenialAnalysisDto() {
                this.startDate = __runInitializers(this, _startDate_initializers, void 0);
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.payerId = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _payerId_initializers, void 0));
                this.denialReason = (__runInitializers(this, _payerId_extraInitializers), __runInitializers(this, _denialReason_initializers, void 0));
                __runInitializers(this, _denialReason_extraInitializers);
            }
            return DenialAnalysisDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _startDate_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsDateString)()];
            _endDate_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsDateString)()];
            _payerId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _denialReason_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _payerId_decorators, { kind: "field", name: "payerId", static: false, private: false, access: { has: function (obj) { return "payerId" in obj; }, get: function (obj) { return obj.payerId; }, set: function (obj, value) { obj.payerId = value; } }, metadata: _metadata }, _payerId_initializers, _payerId_extraInitializers);
            __esDecorate(null, null, _denialReason_decorators, { kind: "field", name: "denialReason", static: false, private: false, access: { has: function (obj) { return "denialReason" in obj; }, get: function (obj) { return obj.denialReason; }, set: function (obj, value) { obj.denialReason = value; } }, metadata: _metadata }, _denialReason_initializers, _denialReason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DenialAnalysisDto = DenialAnalysisDto;
