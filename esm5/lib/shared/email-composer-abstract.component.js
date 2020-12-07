import { ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
var _c0 = ["emailInputBox"];
var _c1 = ["emailBody"];
function isValidEmail(control) {
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
        this.messageTitle = 'Email title';
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
            this.alertMessage = 'The email is being sent out.';
            this.alertSubMessage = '';
            this.alertDismissible = false;
            this.sender(outputs).then(function () {
                _this.alertType = AlertTypeEnum.none;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1lbWFpbC1jb21wb3Nlci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRWxDLFNBQVMsWUFBWSxDQUFDLE9BQXVCO0lBQ3pDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsSUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDO0lBQzFCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTztRQUNILGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsSUFBWTtJQUM5QjtnRUFDNEQ7SUFDNUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRCxJQUFNLFlBQVksR0FBRyxzSUFBc0ksQ0FBQztBQUU1Sjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxTQUFpQjtJQUN6Qzs7TUFFRTtJQUNGLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLEtBQXNCLENBQUM7SUFDM0IsT0FBTyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FB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SUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdEUsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV0Qiw0Q0FBNEM7UUFDNUMsK0NBQStDO1FBQy9DLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ1osS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7d0dBbEhpQiwwQkFBMEI7bUVBQTFCLDBCQUEwQjs7Ozs7Ozs7cUNBcEZoRDtDQXdNQyxBQXBIRCxJQW9IQztTQXBIcUIsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhZ0lucHV0Q29tcG9uZW50IH0gZnJvbSAnbmd4LWNoaXBzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZnVuY3Rpb24gaXNWYWxpZEVtYWlsKGNvbnRyb2w6IHsgdmFsdWU6IGFueSB9KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgIGNvbnN0IHJlID0gL1xcUytAXFxTK1xcLlxcUysvO1xuICAgIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6IHRydWVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5X25hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgLyogUmVtb3ZlIGFsbCBxdW90ZXMgXG4gICAgICAgUmVtb3ZlIHdoaXRlc3BhY2UsIGJyYWNrZXRzLCBhbmQgY29tbWFzIGZyb20gdGhlIGVuZHMuICovXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKF5bXFxzLD5dKyl8XCJ8KFtcXHMsPF0rJCkvZywgJycpO1xufVxuXG5jb25zdCBFbWFpbFBhdHRlcm4gPSAvW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKi9nO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMgbGlrZSB1c2VyPHVzZXJAZ21haWwuY29tPlxuICogQHBhcmFtIGFkZHJfbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICAvKiBSZWdleCBzb3VyY2U6XG4gICAgICAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjdmFsaWQtZS1tYWlsLWFkZHJlc3NcbiAgICAqL1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgbGV0IGRpc3BsYXk6IHN0cmluZztcbiAgICAgICAgaWYgKGRpc3BsYXkgPSBkaXNwbGF5X25hbWUoYWRkcl9saXN0LnN1YnN0cmluZyhpZHgsIG1hdGNoWydpbmRleCddKSkpIHtcbiAgICAgICAgICAgIGVtYWlscy5wdXNoKCdcIicgKyBkaXNwbGF5ICsgJ1wiICcgKyAnPCcgKyBtYXRjaFswXSArICc+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaChtYXRjaFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ID0gbWF0Y2hbJ2luZGV4J10gKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBlbWFpbHM7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhIGxpc3Qgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMganVzdCBhbiBlbWFpbC5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT25seUVtYWlscyhhZGRyX2xpc3Q6IHN0cmluZykge1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvQ29tcGxldGVNb2RlbCB7XG4gICAgdmFsdWU6IGFueTtcbiAgICBkaXNwbGF5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEFsZXJ0VHlwZUVudW0ge1xuICAgIG5vbmUgPSAwLFxuICAgIGluZm8gPSAxLFxuICAgIHdhcm5pbmcgPSAyLFxuICAgIHJ1bm5pbmcgPSAzLFxuICAgIHN1Y2Nlc3MgPSA0LFxuICAgIGVycm9yID0gNVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbWFpbFNlbmRlcklucHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBAVmlld0NoaWxkKCdlbWFpbElucHV0Qm94JykgZW1haWxJbnB1dEJveDogVGFnSW5wdXRDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZCgnZW1haWxCb2R5JykgZW1haWxCb2R5OiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWVzc2FnZVRpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWVzc2FnZUJvZHk6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM6IE9ic2VydmFibGU8QXJyYXk8SUF1dG9Db21wbGV0ZU1vZGVsPj47XG4gICAgQElucHV0KClcbiAgICBzZW5kZXI6IChhOiBJRW1haWxTZW5kZXJJbnB1dCkgPT4gUHJvbWlzZTxhbnk+O1xuICAgIEBPdXRwdXQoKVxuICAgIG9uVGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KClcbiAgICBvblN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8SUVtYWlsU2VuZGVySW5wdXQ+KCk7XG4gICAgQE91dHB1dCgpXG4gICAgb25TZW50ID0gbmV3IEV2ZW50RW1pdHRlcjx7IHN1Y2Nlc3M6IGJvb2xlYW4gfT4oKTtcblxuICAgIGFsZXJ0TWVzc2FnZTogc3RyaW5nO1xuICAgIGFsZXJ0U3ViTWVzc2FnZTogc3RyaW5nO1xuICAgIGFsZXJ0VHlwZTogQWxlcnRUeXBlRW51bTtcbiAgICBhbGVydERpc21pc3NpYmxlOiBib29sZWFuO1xuXG4gICAgcHVibGljIGVtYWlsczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgdmFsaWRhdG9ycyA9IFtpc1ZhbGlkRW1haWxdO1xuICAgIHB1YmxpYyBlcnJvck1lc3NhZ2VzID0ge1xuICAgICAgICAnaXNWYWxpZEVtYWlsJzogJ1BsZWFzZSBpbnB1dCBhIHZhbGlkIGVtYWlsJ1xuICAgIH07XG5cbiAgICBwcml2YXRlIGRpc2FibGVGb2N1c0V2ZW50OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlVGl0bGUgPSAnRW1haWwgdGl0bGUnO1xuICAgICAgICB0aGlzLmVtYWlscyA9IFtdO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCb2R5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdWJtaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmFsZXJ0VHlwZSA9PT0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXQoKSB7XG4gICAgICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZW1haWxzLmZvckVhY2goZWxlbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB4ID0gZWxlbSB8fCAoZWxlbS52YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gcGFyc2VPbmx5RW1haWxzKHgpO1xuICAgICAgICAgICAgeS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICAgICAgICAgIGVtYWlscy5wdXNoKG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG91dHB1dHM6IElFbWFpbFNlbmRlcklucHV0ID0ge1xuICAgICAgICAgICAgY29uZmlybWVkOiB0cnVlLFxuICAgICAgICAgICAgZW1haWxSZWNlaXZlcnM6IGVtYWlscyxcbiAgICAgICAgICAgIGVtYWlsQm9keTogdGhpcy5tZXNzYWdlQm9keSxcbiAgICAgICAgICAgIGVtYWlsVGl0bGU6IHRoaXMubWVzc2FnZVRpdGxlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1RoZSBlbWFpbCBpcyBiZWluZyBzZW50IG91dC4nO1xuICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnNlbmRlcihvdXRwdXRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ubm9uZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VudCAmJiB0aGlzLm9uU2VudC5lbWl0KHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5lcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICdTb21ldGhpbmcgd2VudCB3cm9uZy4nO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3JJbmZvKSA/IGVycm9yLmVycm9ySW5mbyA6ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZW50ICYmIHRoaXMub25TZW50LmVtaXQoeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblN1Ym1pdCAmJiB0aGlzLm9uU3VibWl0LmVtaXQob3V0cHV0cyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uT3V0T2ZUYWdJbnB1dChldnQ6IGFueSkge1xuXG4gICAgICAgIGlmICh0aGlzLmVtYWlsSW5wdXRCb3guZHJvcGRvd24gJiYgdGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gQSB0ZW1wb3J5IGhhY2sgZm9yIGZpeGluZyB0aGUgZm9jdXMgaXNzdWVcbiAgICAgICAgLy8gb24gaW52b2tpbmcgdGhlIG9uQWRkaW5nUmVxdWVzdGVkIG1ldGhvZCAuLi5cbiAgICAgICAgY29uc3QgZW1haWxzID0gcGFyc2VFbWFpbHModGhpcy5lbWFpbElucHV0Qm94LmZvcm1WYWx1ZSk7XG5cbiAgICAgICAgZW1haWxzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtYWlscy5wdXNoKHYpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVtYWlsSW5wdXRCb3guc2V0SW5wdXRWYWx1ZSgnJyk7XG5cbiAgICAgICAgLy8gSnVtcCB0byBvdGhlciBwbGFjZVxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWFpbEJvZHkubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==