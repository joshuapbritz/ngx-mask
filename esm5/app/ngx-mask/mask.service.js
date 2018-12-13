/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { config } from './config';
import { DOCUMENT } from '@angular/common';
import { MaskApplierService } from './mask-applier.service';
var MaskService = /** @class */ (function (_super) {
    tslib_1.__extends(MaskService, _super);
    function MaskService(document, _config, _elementRef, _renderer) {
        var _this = _super.call(this, _config) || this;
        _this.document = document;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        _this.maskExpression = '';
        _this.isNumberValue = false;
        _this.showMaskTyped = false;
        _this.maskIsShown = '';
        // tslint:disable-next-line
        _this.onChange = function (_) { };
        _this.onTouch = function () { };
        _this._formElement = _this._elementRef.nativeElement;
        return _this;
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyMask = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        this.maskIsShown = this.showMaskTyped
            ? this.maskExpression.replace(/\w/g, '_')
            : '';
        if (!inputValue && this.showMaskTyped) {
            return this.prefix + this.maskIsShown;
        }
        /** @type {?} */
        var result = _super.prototype.applyMask.call(this, inputValue, maskExpression, position, cb);
        Array.isArray(this.dropSpecialCharacters)
            ? this.onChange(this._removeMask(this._removeSufix(this._removePrefix(result)), this.dropSpecialCharacters))
            : this.dropSpecialCharacters === true
                ? this.onChange(this.isNumberValue
                    ? Number(this._removeMask(this._removeSufix(this._removePrefix(result)), this.maskSpecialCharacters))
                    : this._removeMask(this._removeSufix(this._removePrefix(result)), this.maskSpecialCharacters))
                : this.onChange(this._removeSufix(this._removePrefix(result)));
        /** @type {?} */
        var ifMaskIsShown = '';
        if (!this.showMaskTyped) {
            return result;
        }
        /** @type {?} */
        var resLen = result.length;
        /** @type {?} */
        var prefNmask = this.prefix + this.maskIsShown;
        ifMaskIsShown = prefNmask.slice(resLen);
        return result + ifMaskIsShown;
    };
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyValueChanges = /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        /** @type {?} */
        var maskedInput = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        this._formElement.value = maskedInput;
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    };
    /**
     * @return {?}
     */
    MaskService.prototype.showMaskInInput = /**
     * @return {?}
     */
    function () {
        if (this.showMaskTyped) {
            this.maskIsShown = this.maskExpression.replace(/\w/g, '_');
        }
    };
    /**
     * @return {?}
     */
    MaskService.prototype.clearIfNotMatchFn = /**
     * @return {?}
     */
    function () {
        if (this.clearIfNotMatch === true &&
            this.maskExpression.length !== this._formElement.value.length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    };
    Object.defineProperty(MaskService.prototype, "formElementProperty", {
        set: /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), name = _b[0], value = _b[1];
            this._renderer.setProperty(this._formElement, name, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._removeMask = /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (value, specialCharactersForRemove) {
        return value
            ? value.replace(this._regExpForRemove(specialCharactersForRemove), '')
            : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removePrefix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.prefix) {
            return value;
        }
        return value
            ? value.replace(this.prefix, '')
            : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removeSufix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.sufix) {
            return value;
        }
        return value
            ? value.replace(this.sufix, '')
            : value;
    };
    /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._regExpForRemove = /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map(function (item) { return "\\" + item; }).join('|'), 'gi');
    };
    MaskService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MaskService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MaskService;
}(MaskApplierService));
export { MaskService };
if (false) {
    /** @type {?} */
    MaskService.prototype.maskExpression;
    /** @type {?} */
    MaskService.prototype.isNumberValue;
    /** @type {?} */
    MaskService.prototype.showMaskTyped;
    /** @type {?} */
    MaskService.prototype.maskIsShown;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._formElement;
    /** @type {?} */
    MaskService.prototype.onChange;
    /** @type {?} */
    MaskService.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MaskService.prototype._config;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJhcHAvbmd4LW1hc2svbWFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxFQUFXLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQUNpQyx1Q0FBa0I7SUFTakQscUJBRTRCLFFBQWEsRUFDYixPQUFnQixFQUNsQyxXQUF1QixFQUN2QixTQUFvQjtRQUw5QixZQU9FLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1FBUDJCLGNBQVEsR0FBUixRQUFRLENBQUs7UUFDYixhQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2xDLGlCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFidkIsb0JBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsaUJBQVcsR0FBVyxFQUFFLENBQUM7O1FBR3pCLGNBQVEsR0FBRyxVQUFDLENBQU0sSUFBTSxDQUFDLENBQUM7UUFDMUIsYUFBTyxHQUFHLGNBQU8sQ0FBQyxDQUFDO1FBU3hCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7O0lBQ3JELENBQUM7Ozs7Ozs7O0lBRU0sK0JBQVM7Ozs7Ozs7SUFBaEIsVUFDRSxVQUFrQixFQUNsQixjQUFzQixFQUN0QixRQUFvQixFQUNwQixFQUF1QjtRQUR2Qix5QkFBQSxFQUFBLFlBQW9CO1FBQ3BC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WUFDZixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxLQUFLO1lBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDL0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNaLENBQUM7Ozs7OztJQUVPLHNDQUFnQjs7Ozs7SUFBeEIsVUFBeUIsMEJBQW9DO1FBQzNELE9BQU8sSUFBSSxNQUFNLENBQ2YsMEJBQTBCLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsT0FBSyxJQUFNLEVBQVgsQ0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUN2RSxJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7O2dCQWhJRixVQUFVOzs7O2dEQVlOLE1BQU0sU0FBQyxRQUFRO2dEQUNmLE1BQU0sU0FBQyxNQUFNO2dCQWxCVCxVQUFVO2dCQUFzQixTQUFTOztJQXNJbEQsa0JBQUM7Q0FBQSxBQWpJRCxDQUNpQyxrQkFBa0IsR0FnSWxEO1NBaElZLFdBQVc7OztJQUN0QixxQ0FBbUM7O0lBQ25DLG9DQUFzQzs7SUFDdEMsb0NBQXNDOztJQUN0QyxrQ0FBZ0M7Ozs7O0lBQ2hDLG1DQUF1Qzs7SUFFdkMsK0JBQWlDOztJQUNqQyw4QkFBMEI7Ozs7O0lBR3hCLCtCQUF1Qzs7Ozs7SUFDdkMsOEJBQTBDOzs7OztJQUMxQyxrQ0FBK0I7Ozs7O0lBQy9CLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25maWcsIElDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXNrQXBwbGllclNlcnZpY2UgfSBmcm9tICcuL21hc2stYXBwbGllci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hc2tTZXJ2aWNlIGV4dGVuZHMgTWFza0FwcGxpZXJTZXJ2aWNlIHtcbiAgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIGlzTnVtYmVyVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNob3dNYXNrVHlwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIG1hc2tJc1Nob3duOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfZm9ybUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7fTtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KGNvbmZpZykgcHJvdGVjdGVkIF9jb25maWc6IElDb25maWcsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKF9jb25maWcpO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIGFwcGx5TWFzayhcbiAgICBpbnB1dFZhbHVlOiBzdHJpbmcsXG4gICAgbWFza0V4cHJlc3Npb246IHN0cmluZyxcbiAgICBwb3NpdGlvbjogbnVtYmVyID0gMCxcbiAgICBjYjogRnVuY3Rpb24gPSAoKSA9PiB7fVxuICApOiBzdHJpbmcgIHtcblxuICAgIHRoaXMubWFza0lzU2hvd24gPSB0aGlzLnNob3dNYXNrVHlwZWRcbiAgICAgICAgPyB0aGlzLm1hc2tFeHByZXNzaW9uLnJlcGxhY2UoL1xcdy9nLCAnXycpXG4gICAgICAgIDogJyc7XG4gICAgaWYgKCFpbnB1dFZhbHVlICYmIHRoaXMuc2hvd01hc2tUeXBlZCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0OiBzdHJpbmcgID0gc3VwZXIuYXBwbHlNYXNrKFxuICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgIG1hc2tFeHByZXNzaW9uLFxuICAgICAgcG9zaXRpb24sXG4gICAgICBjYlxuICAgICk7XG4gICAgQXJyYXkuaXNBcnJheSh0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycylcbiAgICAgICAgPyB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpLCB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycykpXG4gICAgICAgIDogdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPT09IHRydWVcbiAgICAgICAgID8gdGhpcy5vbkNoYW5nZShcbiAgICAgICAgICB0aGlzLmlzTnVtYmVyVmFsdWVcbiAgICAgICAgICAgICA/IE51bWJlcih0aGlzLl9yZW1vdmVNYXNrKHRoaXMuX3JlbW92ZVN1Zml4KHRoaXMuX3JlbW92ZVByZWZpeChyZXN1bHQpKSwgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMpKVxuICAgICAgICAgICAgIDogdGhpcy5fcmVtb3ZlTWFzayh0aGlzLl9yZW1vdmVTdWZpeCh0aGlzLl9yZW1vdmVQcmVmaXgocmVzdWx0KSksIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzKVxuICAgICAgICAgICAgKVxuICAgICAgICAgOiB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JlbW92ZVN1Zml4KHRoaXMuX3JlbW92ZVByZWZpeChyZXN1bHQpKSk7XG4gICAgICAgICAgbGV0IGlmTWFza0lzU2hvd246IHN0cmluZyA9ICcnO1xuICAgICAgICAgIGlmICghdGhpcy5zaG93TWFza1R5cGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXNMZW46IG51bWJlciA9IHJlc3VsdC5sZW5ndGg7XG4gICAgICAgICAgY29uc3QgcHJlZk5tYXNrOiBzdHJpbmcgPSB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XG4gICAgICAgICAgaWZNYXNrSXNTaG93biA9IHByZWZObWFzay5zbGljZShyZXNMZW4pO1xuICAgIHJldHVybiByZXN1bHQgKyBpZk1hc2tJc1Nob3duO1xuICB9XG5cbiAgcHVibGljIGFwcGx5VmFsdWVDaGFuZ2VzKFxuICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwLFxuICAgIGNiOiBGdW5jdGlvbiA9ICgpID0+IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG1hc2tlZElucHV0OiBzdHJpbmcgfCBudW1iZXIgPSB0aGlzLmFwcGx5TWFzayhcbiAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLFxuICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbixcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgY2JcbiAgICApO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlID0gbWFza2VkSW5wdXQ7XG4gICAgaWYgKHRoaXMuX2Zvcm1FbGVtZW50ID09PSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2hGbigpO1xuICB9XG5cbiAgcHVibGljIHNob3dNYXNrSW5JbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG93TWFza1R5cGVkKSB7XG4gICAgICB0aGlzLm1hc2tJc1Nob3duID0gdGhpcy5tYXNrRXhwcmVzc2lvbi5yZXBsYWNlKC9cXHcvZywgJ18nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoRm4oKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jbGVhcklmTm90TWF0Y2ggPT09IHRydWUgJiZcbiAgICAgIHRoaXMubWFza0V4cHJlc3Npb24ubGVuZ3RoICE9PSB0aGlzLl9mb3JtRWxlbWVudC52YWx1ZS5sZW5ndGhcbiAgICApIHtcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCAnJ107XG4gICAgICB0aGlzLmFwcGx5TWFzayh0aGlzLl9mb3JtRWxlbWVudC52YWx1ZSwgdGhpcy5tYXNrRXhwcmVzc2lvbik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBmb3JtRWxlbWVudFByb3BlcnR5KFtuYW1lLCB2YWx1ZV06IFtzdHJpbmcsIHN0cmluZyB8IGJvb2xlYW5dKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZm9ybUVsZW1lbnQsIG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU1hc2soXG4gICAgdmFsdWU6IHN0cmluZyxcbiAgICBzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZTogc3RyaW5nW11cbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgID8gdmFsdWUucmVwbGFjZSh0aGlzLl9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmUpLCAnJylcbiAgICAgIDogdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVQcmVmaXgodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnByZWZpeCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgICAgID8gdmFsdWUucmVwbGFjZSh0aGlzLnByZWZpeCwgJycpXG4gICAgICA6IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlU3VmaXgodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnN1Zml4KSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICAgICAgPyB2YWx1ZS5yZXBsYWNlKHRoaXMuc3VmaXgsICcnKVxuICAgICAgOiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ0V4cEZvclJlbW92ZShzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZTogc3RyaW5nW10pOiBSZWdFeHAge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKFxuICAgICAgc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmUubWFwKChpdGVtOiBzdHJpbmcpID0+IGBcXFxcJHtpdGVtfWApLmpvaW4oJ3wnKSxcbiAgICAgICdnaSdcbiAgICApO1xuICB9XG59Il19