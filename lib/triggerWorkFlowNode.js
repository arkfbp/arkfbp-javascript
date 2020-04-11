"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var flow_1 = require("./flow");
var node_1 = require("./node");
var TriggerWorkflowNode = /** @class */ (function (_super) {
    tslib_1.__extends(TriggerWorkflowNode, _super);
    function TriggerWorkflowNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'triggerWorkflow';
        return _this;
    }
    TriggerWorkflowNode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var flowOptions, outputs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof this.flow === 'undefined') {
                            throw new Error('flow not set');
                        }
                        flowOptions = this.buildOptions ? this.buildOptions() : undefined;
                        return [4 /*yield*/, flow_1.runWorkflowByClass(this.flow, this.inputs, flowOptions)];
                    case 1:
                        outputs = _a.sent();
                        return [2 /*return*/, outputs];
                }
            });
        });
    };
    return TriggerWorkflowNode;
}(node_1.Node));
exports.TriggerWorkflowNode = TriggerWorkflowNode;