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
exports.MedicalRecordsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var medical_record_entity_1 = require("./entities/medical-record.entity");
var medical_record_version_entity_1 = require("./entities/medical-record-version.entity");
var medical_history_entity_1 = require("./entities/medical-history.entity");
var clinical_note_template_entity_1 = require("./entities/clinical-note-template.entity");
var medical_attachment_entity_1 = require("./entities/medical-attachment.entity");
var medical_record_consent_entity_1 = require("./entities/medical-record-consent.entity");
var medical_records_service_1 = require("./services/medical-records.service");
var clinical_templates_service_1 = require("./services/clinical-templates.service");
var consent_service_1 = require("./services/consent.service");
var file_upload_service_1 = require("./services/file-upload.service");
var medical_records_controller_1 = require("./controllers/medical-records.controller");
var clinical_templates_controller_1 = require("./controllers/clinical-templates.controller");
var consent_controller_1 = require("./controllers/consent.controller");
var file_upload_controller_1 = require("./controllers/file-upload.controller");
var reporting_controller_1 = require("./controllers/reporting.controller");
var reporting_service_1 = require("./services/reporting.service");
var MedicalRecordsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    medical_record_entity_1.MedicalRecord,
                    medical_record_version_entity_1.MedicalRecordVersion,
                    medical_history_entity_1.MedicalHistory,
                    clinical_note_template_entity_1.ClinicalNoteTemplate,
                    medical_attachment_entity_1.MedicalAttachment,
                    medical_record_consent_entity_1.MedicalRecordConsent,
                ]),
            ],
            controllers: [
                medical_records_controller_1.MedicalRecordsController,
                clinical_templates_controller_1.ClinicalTemplatesController,
                consent_controller_1.ConsentController,
                file_upload_controller_1.FileUploadController,
                reporting_controller_1.ReportingController,
            ],
            providers: [
                medical_records_service_1.MedicalRecordsService,
                clinical_templates_service_1.ClinicalTemplatesService,
                consent_service_1.ConsentService,
                file_upload_service_1.FileUploadService,
                reporting_service_1.ReportingService,
            ],
            exports: [
                medical_records_service_1.MedicalRecordsService,
                clinical_templates_service_1.ClinicalTemplatesService,
                consent_service_1.ConsentService,
                file_upload_service_1.FileUploadService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MedicalRecordsModule = _classThis = /** @class */ (function () {
        function MedicalRecordsModule_1() {
        }
        return MedicalRecordsModule_1;
    }());
    __setFunctionName(_classThis, "MedicalRecordsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MedicalRecordsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MedicalRecordsModule = _classThis;
}();
exports.MedicalRecordsModule = MedicalRecordsModule;
