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
exports.LecturerEntity = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const AdminEntity_1 = require("./AdminEntity");
let LecturerEntity = class LecturerEntity extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.admin = AdminEntity_1.AdminEntity;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
    // type: "uuid",
    }),
    __metadata("design:type", Object)
], LecturerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LecturerEntity.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LecturerEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LecturerEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LecturerEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LecturerEntity.prototype, "schoolName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AdminEntity_1.AdminEntity, (admin) => admin.lecturers),
    __metadata("design:type", Object)
], LecturerEntity.prototype, "admin", void 0);
LecturerEntity = __decorate([
    (0, typeorm_1.Entity)("LecturerEntities")
], LecturerEntity);
exports.LecturerEntity = LecturerEntity;
//# sourceMappingURL=LecturerEntity.js.map