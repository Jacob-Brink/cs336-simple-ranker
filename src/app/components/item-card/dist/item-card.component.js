"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ItemCardComponent = /** @class */ (function () {
    function ItemCardComponent() {
        // declare output variables
        this.nameResult = new core_1.EventEmitter();
        this.description = new core_1.EventEmitter();
        this.image = new core_1.EventEmitter();
        // use name for two way binding for updating title text to name
        this.name = "";
    }
    ItemCardComponent.prototype.ngOnInit = function () {
    };
    ItemCardComponent.prototype["delete"] = function () {
    };
    __decorate([
        core_1.Output("name")
    ], ItemCardComponent.prototype, "nameResult");
    __decorate([
        core_1.Output()
    ], ItemCardComponent.prototype, "description");
    __decorate([
        core_1.Output()
    ], ItemCardComponent.prototype, "image");
    ItemCardComponent = __decorate([
        core_1.Component({
            selector: 'app-item-card',
            templateUrl: './item-card.component.html',
            styleUrls: ['./item-card.component.scss']
        })
    ], ItemCardComponent);
    return ItemCardComponent;
}());
exports.ItemCardComponent = ItemCardComponent;
