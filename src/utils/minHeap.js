"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinHeap = void 0;
var MinHeap = /** @class */ (function () {
    function MinHeap() {
        this.heap = [];
    }
    MinHeap.prototype.getParentIndex = function (index) {
        return Math.floor((index - 1) / 2);
    };
    MinHeap.prototype.getLeftChildIndex = function (index) {
        return 2 * index + 1;
    };
    MinHeap.prototype.getRightChildIndex = function (index) {
        return 2 * index + 2;
    };
    MinHeap.prototype.swap = function (index1, index2) {
        var _a;
        _a = [this.heap[index2], this.heap[index1]], this.heap[index1] = _a[0], this.heap[index2] = _a[1];
    };
    MinHeap.prototype.heapifyUp = function () {
        var index = this.heap.length - 1;
        while (index > 0 && this.heap[index] < this.heap[this.getParentIndex(index)]) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    };
    MinHeap.prototype.heapifyDown = function () {
        var index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            var smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            }
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    };
    MinHeap.prototype.insert = function (value) {
        this.heap.push(value);
        this.heapifyUp();
    };
    MinHeap.prototype.extractMin = function () {
        if (this.heap.length === 0) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        var min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
    };
    MinHeap.prototype.peek = function () {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    };
    MinHeap.prototype.size = function () {
        return this.heap.length;
    };
    return MinHeap;
}());
exports.MinHeap = MinHeap;
