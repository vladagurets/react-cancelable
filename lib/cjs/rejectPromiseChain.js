"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rejectPromiseChain() {
    return Promise.reject('Request canceled');
}
exports.default = rejectPromiseChain;
