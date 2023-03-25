"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEntity = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const LecturerEntity_1 = require("./LecturerEntity");
let AdminEntity = class AdminEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
    // type: "uuid",
    }),
    __metadata("design:type", Object)
], AdminEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "schoolName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], AdminEntity.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LecturerEntity_1.LecturerEntity, (lectures) => lectures.admin),
    __metadata("design:type", Array)
], AdminEntity.prototype, "lecturers", void 0);
AdminEntity = __decorate([
    (0, typeorm_1.Entity)("AdminEntities")
], AdminEntity);
exports.AdminEntity = AdminEntity;
//# sourceMappingURL=AdminEntity.js.map