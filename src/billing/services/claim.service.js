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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var enums_1 = require("../../common/enums");
var uuid_1 = require("uuid");
var ClaimService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ClaimService = _classThis = /** @class */ (function () {
        function ClaimService_1(claimRepository, insuranceRepository, billingRepository) {
            this.claimRepository = claimRepository;
            this.insuranceRepository = insuranceRepository;
            this.billingRepository = billingRepository;
        }
        ClaimService_1.prototype.create = function (createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var insurance, billing, claimNumber, billedAmount, timelyFilingDeadline, claim;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.insuranceRepository.findOne({
                                where: { id: createDto.insuranceId },
                            })];
                        case 1:
                            insurance = _a.sent();
                            if (!insurance) {
                                throw new common_1.NotFoundException("Insurance with ID ".concat(createDto.insuranceId, " not found"));
                            }
                            return [4 /*yield*/, this.billingRepository.findOne({
                                    where: { id: createDto.billingId },
                                    relations: ['lineItems'],
                                })];
                        case 2:
                            billing = _a.sent();
                            if (!billing) {
                                throw new common_1.NotFoundException("Billing with ID ".concat(createDto.billingId, " not found"));
                            }
                            claimNumber = "CLM-".concat(Date.now(), "-").concat((0, uuid_1.v4)().substring(0, 4).toUpperCase());
                            billedAmount = createDto.procedureCodes.reduce(function (sum, proc) { return sum + proc.charge * proc.units; }, 0);
                            timelyFilingDeadline = new Date();
                            timelyFilingDeadline.setDate(timelyFilingDeadline.getDate() + 365);
                            claim = this.claimRepository.create({
                                claimNumber: claimNumber,
                                billingId: createDto.billingId,
                                insuranceId: createDto.insuranceId,
                                patientId: createDto.patientId,
                                claimType: createDto.claimType || enums_1.ClaimType.PROFESSIONAL,
                                status: enums_1.ClaimStatus.DRAFT,
                                serviceStartDate: new Date(createDto.serviceStartDate),
                                serviceEndDate: new Date(createDto.serviceEndDate),
                                billedAmount: billedAmount,
                                diagnosisCodes: createDto.diagnosisCodes,
                                procedureCodes: createDto.procedureCodes,
                                provider: createDto.provider,
                                facility: createDto.facility,
                                subscriber: createDto.subscriber,
                                patient: createDto.patient || {
                                    name: createDto.subscriber.name,
                                    dob: createDto.subscriber.dob,
                                    gender: createDto.subscriber.gender,
                                    relationship: 'self',
                                    address: createDto.subscriber.address,
                                },
                                timelyFilingDeadline: timelyFilingDeadline,
                                notes: createDto.notes,
                                submissionHistory: [],
                            });
                            return [2 /*return*/, this.claimRepository.save(claim)];
                    }
                });
            });
        };
        ClaimService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var claim;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.claimRepository.findOne({
                                where: { id: id },
                                relations: ['insurance', 'denials'],
                            })];
                        case 1:
                            claim = _a.sent();
                            if (!claim) {
                                throw new common_1.NotFoundException("Claim with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, claim];
                    }
                });
            });
        };
        ClaimService_1.prototype.findByClaimNumber = function (claimNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var claim;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.claimRepository.findOne({
                                where: { claimNumber: claimNumber },
                                relations: ['insurance', 'denials'],
                            })];
                        case 1:
                            claim = _a.sent();
                            if (!claim) {
                                throw new common_1.NotFoundException("Claim with number ".concat(claimNumber, " not found"));
                            }
                            return [2 /*return*/, claim];
                    }
                });
            });
        };
        ClaimService_1.prototype.search = function (searchDto) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, filters, skip, where, _c, data, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = searchDto.page, page = _a === void 0 ? 1 : _a, _b = searchDto.limit, limit = _b === void 0 ? 20 : _b, filters = __rest(searchDto, ["page", "limit"]);
                            skip = (page - 1) * limit;
                            where = {};
                            if (filters.patientId) {
                                where.patientId = filters.patientId;
                            }
                            if (filters.insuranceId) {
                                where.insuranceId = filters.insuranceId;
                            }
                            if (filters.status) {
                                where.status = filters.status;
                            }
                            if (filters.claimType) {
                                where.claimType = filters.claimType;
                            }
                            if (filters.startDate && filters.endDate) {
                                where.serviceStartDate = (0, typeorm_1.Between)(new Date(filters.startDate), new Date(filters.endDate));
                            }
                            return [4 /*yield*/, this.claimRepository.findAndCount({
                                    where: where,
                                    relations: ['insurance'],
                                    skip: skip,
                                    take: limit,
                                    order: { createdAt: 'DESC' },
                                })];
                        case 1:
                            _c = _d.sent(), data = _c[0], total = _c[1];
                            return [2 /*return*/, { data: data, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        ClaimService_1.prototype.update = function (id, updateDto) {
            return __awaiter(this, void 0, void 0, function () {
                var claim;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            claim = _a.sent();
                            if (claim.status === enums_1.ClaimStatus.PAID || claim.status === enums_1.ClaimStatus.VOID) {
                                throw new common_1.BadRequestException("Cannot update claim in ".concat(claim.status, " status"));
                            }
                            Object.assign(claim, updateDto);
                            return [2 /*return*/, this.claimRepository.save(claim)];
                    }
                });
            });
        };
        ClaimService_1.prototype.submit = function (submitDto) {
            return __awaiter(this, void 0, void 0, function () {
                var claim, edi837;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(submitDto.claimId)];
                        case 1:
                            claim = _a.sent();
                            if (claim.status !== enums_1.ClaimStatus.DRAFT && claim.status !== enums_1.ClaimStatus.REJECTED) {
                                throw new common_1.BadRequestException("Cannot submit claim in ".concat(claim.status, " status"));
                            }
                            edi837 = this.generateEDI837(claim);
                            claim.edi837Payload = edi837;
                            claim.status = enums_1.ClaimStatus.PENDING;
                            claim.submittedAt = new Date();
                            claim.submissionAttempts += 1;
                            claim.clearinghouseClaimId = submitDto.clearinghouseId || "CH-".concat((0, uuid_1.v4)().substring(0, 8));
                            claim.submissionHistory = __spreadArray(__spreadArray([], (claim.submissionHistory || []), true), [
                                {
                                    date: new Date().toISOString(),
                                    status: 'submitted',
                                    message: 'Claim submitted to clearinghouse',
                                },
                            ], false);
                            return [4 /*yield*/, this.claimRepository.save(claim)];
                        case 2:
                            _a.sent();
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            claim.status = enums_1.ClaimStatus.ACCEPTED;
                                            claim.acceptedAt = new Date();
                                            claim.submissionHistory = __spreadArray(__spreadArray([], (claim.submissionHistory || []), true), [
                                                {
                                                    date: new Date().toISOString(),
                                                    status: 'accepted',
                                                    message: 'Claim accepted by payer',
                                                },
                                            ], false);
                                            return [4 /*yield*/, this.claimRepository.save(claim)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 2000);
                            return [2 /*return*/, claim];
                    }
                });
            });
        };
        ClaimService_1.prototype.generateEDI837 = function (claim) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g;
            var isa = "ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *".concat(this.formatDate(new Date()), "*").concat(this.formatTime(new Date()), "*^*00501*000000001*0*P*:~");
            var gs = "GS*HC*SENDER*RECEIVER*".concat(this.formatDateGS(new Date()), "*").concat(this.formatTimeGS(new Date()), "*1*X*005010X222A1~");
            var st = "ST*837*0001*005010X222A1~";
            var bht = "BHT*0019*00*".concat(claim.claimNumber, "*").concat(this.formatDateGS(new Date()), "*").concat(this.formatTimeGS(new Date()), "*CH~");
            var nm1Submitter = "NM1*41*2*".concat(claim.provider.name, "*****46*").concat(claim.provider.taxId, "~");
            var nm1Receiver = "NM1*40*2*".concat(((_a = claim.insurance) === null || _a === void 0 ? void 0 : _a.payerName) || 'PAYER', "*****46*").concat(((_b = claim.insurance) === null || _b === void 0 ? void 0 : _b.payerId) || '', "~");
            var hl1 = "HL*1**20*1~";
            var nm1BillingProvider = "NM1*85*2*".concat(claim.provider.name, "*****XX*").concat(claim.provider.npi, "~");
            var hl2 = "HL*2*1*22*1~";
            var sbr = "SBR*P*18*".concat(claim.subscriber.memberId, "******CI~");
            var nm1Subscriber = "NM1*IL*1*".concat(claim.subscriber.name.split(' ').slice(-1)[0], "*").concat(claim.subscriber.name.split(' ')[0], "****MI*").concat(claim.subscriber.memberId, "~");
            var hl3 = "HL*3*2*23*0~";
            var clm = "CLM*".concat(claim.claimNumber, "*").concat(claim.billedAmount, "***").concat(((_c = claim.facility) === null || _c === void 0 ? void 0 : _c.placeOfService) || '11', ":B:1*Y*A*Y*Y~");
            var diagnosisSegments = '';
            (_d = claim.diagnosisCodes) === null || _d === void 0 ? void 0 : _d.forEach(function (dx, index) {
                var qualifier = index === 0 ? 'ABK' : 'ABF';
                diagnosisSegments += "HI*".concat(qualifier, ":").concat(dx.code, "~");
            });
            var serviceLines = '';
            (_e = claim.procedureCodes) === null || _e === void 0 ? void 0 : _e.forEach(function (proc, index) {
                var lx = "LX*".concat(index + 1, "~");
                var sv1 = "SV1*HC:".concat(proc.code).concat(proc.modifiers ? ':' + proc.modifiers.join(':') : '', "*").concat(proc.charge, "*UN*").concat(proc.units, "***").concat(proc.diagnosisPointers.join(':'), "~");
                var dtp = "DTP*472*D8*".concat(_this.formatDateGS(claim.serviceStartDate), "~");
                serviceLines += lx + sv1 + dtp;
            });
            var se = "SE*".concat(20 + (((_f = claim.diagnosisCodes) === null || _f === void 0 ? void 0 : _f.length) || 0) + (((_g = claim.procedureCodes) === null || _g === void 0 ? void 0 : _g.length) || 0) * 3, "*0001~");
            var ge = "GE*1*1~";
            var iea = "IEA*1*000000001~";
            return [
                isa,
                gs,
                st,
                bht,
                nm1Submitter,
                nm1Receiver,
                hl1,
                nm1BillingProvider,
                hl2,
                sbr,
                nm1Subscriber,
                hl3,
                clm,
                diagnosisSegments,
                serviceLines,
                se,
                ge,
                iea,
            ].join('\n');
        };
        ClaimService_1.prototype.formatDate = function (date) {
            return date.toISOString().slice(2, 10).replace(/-/g, '');
        };
        ClaimService_1.prototype.formatTime = function (date) {
            return date.toISOString().slice(11, 16).replace(/:/g, '');
        };
        ClaimService_1.prototype.formatDateGS = function (date) {
            return date.toISOString().slice(0, 10).replace(/-/g, '');
        };
        ClaimService_1.prototype.formatTimeGS = function (date) {
            return date.toISOString().slice(11, 19).replace(/:/g, '');
        };
        ClaimService_1.prototype.processERA = function (processDto) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedClaims, eraData, _i, _a, claimData, claim, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            updatedClaims = [];
                            eraData = this.parseEDI835(processDto.edi835Content);
                            _i = 0, _a = eraData.claims;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            claimData = _a[_i];
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, this.findByClaimNumber(claimData.claimNumber)];
                        case 3:
                            claim = _b.sent();
                            claim.status = claimData.paidAmount > 0 ? enums_1.ClaimStatus.PAID : enums_1.ClaimStatus.DENIED;
                            claim.paidAmount = claimData.paidAmount;
                            claim.allowedAmount = claimData.allowedAmount;
                            claim.adjustmentAmount = claimData.adjustmentAmount;
                            claim.patientResponsibility = claimData.patientResponsibility;
                            claim.copayAmount = claimData.copay || 0;
                            claim.deductibleAmount = claimData.deductible || 0;
                            claim.coinsuranceAmount = claimData.coinsurance || 0;
                            claim.edi835Response = processDto.edi835Content;
                            claim.adjudicatedAt = new Date();
                            claim.payerClaimNumber = claimData.payerClaimNumber;
                            if (claimData.remarkCodes) {
                                claim.remarkCodes = claimData.remarkCodes;
                            }
                            if (claimData.adjustmentCodes) {
                                claim.adjustmentCodes = claimData.adjustmentCodes;
                            }
                            claim.submissionHistory = __spreadArray(__spreadArray([], (claim.submissionHistory || []), true), [
                                {
                                    date: new Date().toISOString(),
                                    status: claim.status,
                                    message: "ERA processed. Paid: $".concat(claimData.paidAmount),
                                },
                            ], false);
                            return [4 /*yield*/, this.claimRepository.save(claim)];
                        case 4:
                            _b.sent();
                            updatedClaims.push(claim);
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _b.sent();
                            console.error("Error processing claim ".concat(claimData.claimNumber, ":"), error_1);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/, updatedClaims];
                    }
                });
            });
        };
        ClaimService_1.prototype.parseEDI835 = function (_edi835) {
            return {
                claims: [
                    {
                        claimNumber: 'CLM-SAMPLE',
                        payerClaimNumber: 'PAYER-12345',
                        paidAmount: 120.0,
                        allowedAmount: 140.0,
                        adjustmentAmount: 10.0,
                        patientResponsibility: 30.0,
                        copay: 25.0,
                        deductible: 0,
                        coinsurance: 5.0,
                        remarkCodes: [
                            { code: 'N130', description: 'Payment adjusted based on fee schedule' },
                        ],
                        adjustmentCodes: [
                            { groupCode: 'CO', reasonCode: '45', amount: 10.0 },
                        ],
                    },
                ],
            };
        };
        ClaimService_1.prototype.getClaimsByStatus = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.claimRepository.find({
                            where: { status: status },
                            relations: ['insurance'],
                            order: { createdAt: 'DESC' },
                        })];
                });
            });
        };
        ClaimService_1.prototype.getPendingClaims = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.claimRepository.find({
                            where: [
                                { status: enums_1.ClaimStatus.PENDING },
                                { status: enums_1.ClaimStatus.SUBMITTED },
                                { status: enums_1.ClaimStatus.ACCEPTED },
                            ],
                            relations: ['insurance'],
                            order: { submittedAt: 'ASC' },
                        })];
                });
            });
        };
        ClaimService_1.prototype.voidClaim = function (id, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var claim;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            claim = _a.sent();
                            if (claim.status === enums_1.ClaimStatus.PAID) {
                                throw new common_1.BadRequestException('Cannot void a paid claim');
                            }
                            claim.status = enums_1.ClaimStatus.VOID;
                            claim.notes = "".concat(claim.notes || '', "\nVoided: ").concat(reason);
                            claim.submissionHistory = __spreadArray(__spreadArray([], (claim.submissionHistory || []), true), [
                                {
                                    date: new Date().toISOString(),
                                    status: 'void',
                                    message: "Claim voided: ".concat(reason),
                                },
                            ], false);
                            return [2 /*return*/, this.claimRepository.save(claim)];
                    }
                });
            });
        };
        return ClaimService_1;
    }());
    __setFunctionName(_classThis, "ClaimService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ClaimService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ClaimService = _classThis;
}();
exports.ClaimService = ClaimService;
