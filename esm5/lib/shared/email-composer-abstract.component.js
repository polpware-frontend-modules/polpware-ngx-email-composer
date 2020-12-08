import { ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
var _c0 = ["emailInputBox"];
var _c1 = ["emailBody"];
export function isValidEmail(control) {
    var value = control.value;
    var re = /\S+@\S+\.\S+/;
    if (re.test(value)) {
        return null;
    }
    return {
        'isValidEmail': true
    };
}
function display_name(text) {
    /* Remove all quotes
       Remove whitespace, brackets, and commas from the ends. */
    return text.replace(/(^[\s,>]+)|"|([\s,<]+$)/g, '');
}
var EmailPattern = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g;
/**
 * Parses the given string into an array of email entries.
 * Each entry is like user<user@gmail.com>
 * @param addr_list
 */
export function parseEmails(addr_list) {
    /* Regex source:
        https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
    */
    var emails = [];
    var idx = 0;
    var match;
    while (match = EmailPattern.exec(addr_list)) {
        var display = void 0;
        if (display = display_name(addr_list.substring(idx, match['index']))) {
            emails.push('"' + display + '" ' + '<' + match[0] + '>');
        }
        else {
            emails.push(match[0]);
        }
        idx = match['index'] + match[0].length;
    }
    return emails;
}
/**
 * Parses the given string into a list of email entries.
 * Each entry is just an email.
 * @param addr_list
 */
export function parseOnlyEmails(addr_list) {
    var emails = [];
    var match;
    while (match = EmailPattern.exec(addr_list)) {
        emails.push(match[0]);
    }
    return emails;
}
export var AlertTypeEnum;
(function (AlertTypeEnum) {
    AlertTypeEnum[AlertTypeEnum["none"] = 0] = "none";
    AlertTypeEnum[AlertTypeEnum["info"] = 1] = "info";
    AlertTypeEnum[AlertTypeEnum["warning"] = 2] = "warning";
    AlertTypeEnum[AlertTypeEnum["running"] = 3] = "running";
    AlertTypeEnum[AlertTypeEnum["success"] = 4] = "success";
    AlertTypeEnum[AlertTypeEnum["error"] = 5] = "error";
})(AlertTypeEnum || (AlertTypeEnum = {}));
var EmailFormAbstractComponent = /** @class */ (function () {
    function EmailFormAbstractComponent() {
        this.onTextChange = new EventEmitter();
        this.onSubmit = new EventEmitter();
        this.onSent = new EventEmitter();
        this.validators = [isValidEmail];
        this.errorMessages = {
            'isValidEmail': 'Please input a valid email'
        };
        this.messageTitle = '';
        this.emails = [];
        this.messageBody = '';
        this.disableFocusEvent = false;
    }
    Object.defineProperty(EmailFormAbstractComponent.prototype, "isSubmitDisabled", {
        get: function () {
            return this.emails.length === 0 || this.alertType === AlertTypeEnum.running;
        },
        enumerable: true,
        configurable: true
    });
    EmailFormAbstractComponent.prototype.textChanged = function (evt) {
        this.showCloseBtn = false;
        this.onTextChange.emit(evt);
    };
    EmailFormAbstractComponent.prototype.otherFieldChanged = function () {
        this.showCloseBtn = false;
    };
    EmailFormAbstractComponent.prototype.submit = function () {
        var _this = this;
        var emails = [];
        this.emails.forEach(function (elem) {
            var x = elem || (elem.value);
            var y = parseOnlyEmails(x);
            y.forEach(function (m) {
                emails.push(m);
            });
        });
        var outputs = {
            confirmed: true,
            emailReceivers: emails,
            emailBody: this.messageBody,
            emailTitle: this.messageTitle
        };
        if (this.sender) {
            this.alertType = AlertTypeEnum.running;
            this.alertMessage = 'The email is being sent out ...';
            this.alertSubMessage = '';
            this.alertDismissible = false;
            this.sender(outputs).then(function () {
                _this.alertType = AlertTypeEnum.info;
                _this.alertMessage = 'Emails have been successfully sent out.';
                _this.alertDismissible = true;
                _this.showCloseBtn = true;
                _this.onSent && _this.onSent.emit({ success: true });
            }, function (error) {
                _this.alertType = AlertTypeEnum.error;
                _this.alertMessage = 'Something went wrong.';
                _this.alertDismissible = true;
                _this.alertSubMessage = (error && error.errorInfo) ? error.errorInfo : '';
                _this.onSent && _this.onSent.emit({ success: false });
            });
        }
        this.onSubmit && this.onSubmit.emit(outputs);
    };
    EmailFormAbstractComponent.prototype.onOutOfTagInput = function (evt) {
        var _this = this;
        if (this.emailInputBox.dropdown && this.emailInputBox.dropdown.isVisible) {
            return;
        }
        if (this.disableFocusEvent) {
            return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        // A tempory hack for fixing the focus issue
        // on invoking the onAddingRequested method ...
        var emails = parseEmails(this.emailInputBox.formValue);
        emails.forEach(function (v) {
            _this.emails.push(v);
        });
        this.emailInputBox.setInputValue('');
        // Jump to other place
        this.disableFocusEvent = true;
        this.emailBody.nativeElement.focus();
        this.disableFocusEvent = false;
    };
    EmailFormAbstractComponent.ɵfac = function EmailFormAbstractComponent_Factory(t) { return new (t || EmailFormAbstractComponent)(); };
    EmailFormAbstractComponent.ɵdir = i0.ɵɵdefineDirective({ type: EmailFormAbstractComponent, viewQuery: function EmailFormAbstractComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
            i0.ɵɵviewQuery(_c1, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailInputBox = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailBody = _t.first);
        } }, inputs: { messageTitle: "messageTitle", messageBody: "messageBody", autocompleteItemsAsync: "autocompleteItemsAsync", sender: "sender" }, outputs: { onTextChange: "onTextChange", onSubmit: "onSubmit", onSent: "onSent" } });
    return EmailFormAbstractComponent;
}());
export { EmailFormAbstractComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1lbWFpbC1jb21wb3Nlci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRWxDLE1BQU0sVUFBVSxZQUFZLENBQUMsT0FBdUI7SUFDaEQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixJQUFNLEVBQUUsR0FBRyxjQUFjLENBQUM7SUFDMUIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPO1FBQ0gsY0FBYyxFQUFFLElBQUk7S0FDdkIsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFZO0lBQzlCO2dFQUM0RDtJQUM1RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELElBQU0sWUFBWSxHQUFHLHNJQUFzSSxDQUFDO0FBRTVKOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLFNBQWlCO0lBQ3pDOztNQUVFO0lBQ0YsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksS0FBc0IsQ0FBQztJQUMzQixPQUFPLEtBQUssR0FBRyxZQUFZLENBQUMsSUFB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SUFDbkMsQ0FBQzt3R0FsSWlCLDBCQUEwQjttRUFBMUIsMEJBQTBCOzs7Ozs7OztxQ0EzRmhEO0NBK05DLEFBcElELElBb0lDO1NBcElxQiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICduZ3gtY2hpcHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZEVtYWlsKGNvbnRyb2w6IHsgdmFsdWU6IGFueSB9KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgIGNvbnN0IHJlID0gL1xcUytAXFxTK1xcLlxcUysvO1xuICAgIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6IHRydWVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5X25hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgLyogUmVtb3ZlIGFsbCBxdW90ZXMgXG4gICAgICAgUmVtb3ZlIHdoaXRlc3BhY2UsIGJyYWNrZXRzLCBhbmQgY29tbWFzIGZyb20gdGhlIGVuZHMuICovXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKF5bXFxzLD5dKyl8XCJ8KFtcXHMsPF0rJCkvZywgJycpO1xufVxuXG5jb25zdCBFbWFpbFBhdHRlcm4gPSAvW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKi9nO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMgbGlrZSB1c2VyPHVzZXJAZ21haWwuY29tPlxuICogQHBhcmFtIGFkZHJfbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICAvKiBSZWdleCBzb3VyY2U6XG4gICAgICAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjdmFsaWQtZS1tYWlsLWFkZHJlc3NcbiAgICAqL1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgbGV0IGRpc3BsYXk6IHN0cmluZztcbiAgICAgICAgaWYgKGRpc3BsYXkgPSBkaXNwbGF5X25hbWUoYWRkcl9saXN0LnN1YnN0cmluZyhpZHgsIG1hdGNoWydpbmRleCddKSkpIHtcbiAgICAgICAgICAgIGVtYWlscy5wdXNoKCdcIicgKyBkaXNwbGF5ICsgJ1wiICcgKyAnPCcgKyBtYXRjaFswXSArICc+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaChtYXRjaFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ID0gbWF0Y2hbJ2luZGV4J10gKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBlbWFpbHM7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhIGxpc3Qgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMganVzdCBhbiBlbWFpbC5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT25seUVtYWlscyhhZGRyX2xpc3Q6IHN0cmluZykge1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvQ29tcGxldGVNb2RlbCB7XG4gICAgdmFsdWU6IGFueTtcbiAgICBkaXNwbGF5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEFsZXJ0VHlwZUVudW0ge1xuICAgIG5vbmUgPSAwLFxuICAgIGluZm8gPSAxLFxuICAgIHdhcm5pbmcgPSAyLFxuICAgIHJ1bm5pbmcgPSAzLFxuICAgIHN1Y2Nlc3MgPSA0LFxuICAgIGVycm9yID0gNVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbWFpbFNlbmRlcklucHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVtYWlsQ29tcG9zZXJJbnB1dCB7XG4gICAgbWVzc2FnZVRpdGxlPzogc3RyaW5nO1xuICAgIG1lc3NhZ2VCb2R5Pzogc3RyaW5nO1xuICAgIGF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM6IE9ic2VydmFibGU8QXJyYXk8SUF1dG9Db21wbGV0ZU1vZGVsPj47XG4gICAgZW1haWxzPzogQXJyYXk8YW55Pjtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVtYWlsRm9ybUFic3RyYWN0Q29tcG9uZW50IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2VtYWlsSW5wdXRCb3gnKSBlbWFpbElucHV0Qm94OiBUYWdJbnB1dENvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKCdlbWFpbEJvZHknKSBlbWFpbEJvZHk6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtZXNzYWdlVGl0bGU6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtZXNzYWdlQm9keTogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgYXV0b2NvbXBsZXRlSXRlbXNBc3luYzogT2JzZXJ2YWJsZTxBcnJheTxJQXV0b0NvbXBsZXRlTW9kZWw+PjtcbiAgICBASW5wdXQoKVxuICAgIHNlbmRlcjogKGE6IElFbWFpbFNlbmRlcklucHV0KSA9PiBQcm9taXNlPGFueT47XG4gICAgQE91dHB1dCgpXG4gICAgb25UZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxJRW1haWxTZW5kZXJJbnB1dD4oKTtcbiAgICBAT3V0cHV0KClcbiAgICBvblNlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgc3VjY2VzczogYm9vbGVhbiB9PigpO1xuXG4gICAgYWxlcnRNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRTdWJNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRUeXBlOiBBbGVydFR5cGVFbnVtO1xuICAgIGFsZXJ0RGlzbWlzc2libGU6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZW1haWxzOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyB2YWxpZGF0b3JzID0gW2lzVmFsaWRFbWFpbF07XG4gICAgcHVibGljIGVycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICdpc1ZhbGlkRW1haWwnOiAnUGxlYXNlIGlucHV0IGEgdmFsaWQgZW1haWwnXG4gICAgfTtcblxuICAgIC8vIENvbnRyb2wgb3ZlciB0aGUgY2xvc2UgYnV0dG9uXG4gICAgcHVibGljIHNob3dDbG9zZUJ0bjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgZGlzYWJsZUZvY3VzRXZlbnQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLm1lc3NhZ2VUaXRsZSA9ICcnO1xuICAgICAgICB0aGlzLmVtYWlscyA9IFtdO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCb2R5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdWJtaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmFsZXJ0VHlwZSA9PT0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyB0ZXh0Q2hhbmdlZChldnQ6IGFueSkge1xuICAgICAgICB0aGlzLnNob3dDbG9zZUJ0biA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KGV2dCk7XG4gICAgfVxuXG4gICAgcHVibGljIG90aGVyRmllbGRDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLnNob3dDbG9zZUJ0biA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXQoKSB7XG4gICAgICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZW1haWxzLmZvckVhY2goZWxlbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB4ID0gZWxlbSB8fCAoZWxlbS52YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gcGFyc2VPbmx5RW1haWxzKHgpO1xuICAgICAgICAgICAgeS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICAgICAgICAgIGVtYWlscy5wdXNoKG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG91dHB1dHM6IElFbWFpbFNlbmRlcklucHV0ID0ge1xuICAgICAgICAgICAgY29uZmlybWVkOiB0cnVlLFxuICAgICAgICAgICAgZW1haWxSZWNlaXZlcnM6IGVtYWlscyxcbiAgICAgICAgICAgIGVtYWlsQm9keTogdGhpcy5tZXNzYWdlQm9keSxcbiAgICAgICAgICAgIGVtYWlsVGl0bGU6IHRoaXMubWVzc2FnZVRpdGxlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1RoZSBlbWFpbCBpcyBiZWluZyBzZW50IG91dCAuLi4nO1xuICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnNlbmRlcihvdXRwdXRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uaW5mbztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICdFbWFpbHMgaGF2ZSBiZWVuIHN1Y2Nlc3NmdWxseSBzZW50IG91dC4nO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2xvc2VCdG4gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbnQgJiYgdGhpcy5vblNlbnQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9ySW5mbykgPyBlcnJvci5lcnJvckluZm8gOiAnJztcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VudCAmJiB0aGlzLm9uU2VudC5lbWl0KHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TdWJtaXQgJiYgdGhpcy5vblN1Ym1pdC5lbWl0KG91dHB1dHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk91dE9mVGFnSW5wdXQoZXZ0OiBhbnkpIHtcblxuICAgICAgICBpZiAodGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duICYmIHRoaXMuZW1haWxJbnB1dEJveC5kcm9wZG93bi5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVGb2N1c0V2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIEEgdGVtcG9yeSBoYWNrIGZvciBmaXhpbmcgdGhlIGZvY3VzIGlzc3VlXG4gICAgICAgIC8vIG9uIGludm9raW5nIHRoZSBvbkFkZGluZ1JlcXVlc3RlZCBtZXRob2QgLi4uXG4gICAgICAgIGNvbnN0IGVtYWlscyA9IHBhcnNlRW1haWxzKHRoaXMuZW1haWxJbnB1dEJveC5mb3JtVmFsdWUpO1xuXG4gICAgICAgIGVtYWlscy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWFpbHMucHVzaCh2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbWFpbElucHV0Qm94LnNldElucHV0VmFsdWUoJycpO1xuXG4gICAgICAgIC8vIEp1bXAgdG8gb3RoZXIgcGxhY2VcbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1haWxCb2R5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=