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
    EmailFormAbstractComponent.prototype.textChanged = function (evt) {
        this.onTextChange.emit(evt);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1lbWFpbC1jb21wb3Nlci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRWxDLE1BQU0sVUFBVSxZQUFZLENBQUMsT0FBdUI7SUFDaEQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixJQUFNLEVBQUUsR0FBRyxjQUFjLENBQUM7SUFDMUIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPO1FBQ0gsY0FBYyxFQUFFLElBQUk7S0FDdkIsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFZO0lBQzlCO2dFQUM0RDtJQUM1RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELElBQU0sWUFBWSxHQUFHLHNJQUFzSSxDQUFDO0FBRTVKOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLFNBQWlCO0lBQ3pDOztNQUVFO0lBQ0YsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksS0FBc0IsQ0FBQztJQUMzQixPQUFPLEtBQUssR0FBRyxZQUFZLENBQUMsSUFB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QUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sb0RBQWUsR0FBdEIsVUFBdUIsR0FBUTtRQUEvQixpQkE0QkM7UUExQkcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdEUsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV0Qiw0Q0FBNEM7UUFDNUMsK0NBQStDO1FBQy9DLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ1osS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7d0dBdEhpQiwwQkFBMEI7bUVBQTFCLDBCQUEwQjs7Ozs7Ozs7cUNBM0ZoRDtDQW1OQyxBQXhIRCxJQXdIQztTQXhIcUIsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhZ0lucHV0Q29tcG9uZW50IH0gZnJvbSAnbmd4LWNoaXBzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRFbWFpbChjb250cm9sOiB7IHZhbHVlOiBhbnkgfSkge1xuICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICBjb25zdCByZSA9IC9cXFMrQFxcUytcXC5cXFMrLztcbiAgICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgICdpc1ZhbGlkRW1haWwnOiB0cnVlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheV9uYW1lKHRleHQ6IHN0cmluZykge1xuICAgIC8qIFJlbW92ZSBhbGwgcXVvdGVzIFxuICAgICAgIFJlbW92ZSB3aGl0ZXNwYWNlLCBicmFja2V0cywgYW5kIGNvbW1hcyBmcm9tIHRoZSBlbmRzLiAqL1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLyheW1xccyw+XSspfFwifChbXFxzLDxdKyQpL2csICcnKTtcbn1cblxuY29uc3QgRW1haWxQYXR0ZXJuID0gL1thLXpBLVowLTkuISMkJSYnKitcXC89P15fYHt8fX4tXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSovZztcblxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIGVtYWlsIGVudHJpZXMuXG4gKiBFYWNoIGVudHJ5IGlzIGxpa2UgdXNlcjx1c2VyQGdtYWlsLmNvbT5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW1haWxzKGFkZHJfbGlzdDogc3RyaW5nKSB7XG4gICAgLyogUmVnZXggc291cmNlOlxuICAgICAgICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI3ZhbGlkLWUtbWFpbC1hZGRyZXNzXG4gICAgKi9cbiAgICBjb25zdCBlbWFpbHMgPSBbXTtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICB3aGlsZSAobWF0Y2ggPSBFbWFpbFBhdHRlcm4uZXhlYyhhZGRyX2xpc3QpKSB7XG4gICAgICAgIGxldCBkaXNwbGF5OiBzdHJpbmc7XG4gICAgICAgIGlmIChkaXNwbGF5ID0gZGlzcGxheV9uYW1lKGFkZHJfbGlzdC5zdWJzdHJpbmcoaWR4LCBtYXRjaFsnaW5kZXgnXSkpKSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaCgnXCInICsgZGlzcGxheSArICdcIiAnICsgJzwnICsgbWF0Y2hbMF0gKyAnPicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGlkeCA9IG1hdGNoWydpbmRleCddICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYSBsaXN0IG9mIGVtYWlsIGVudHJpZXMuXG4gKiBFYWNoIGVudHJ5IGlzIGp1c3QgYW4gZW1haWwuXG4gKiBAcGFyYW0gYWRkcl9saXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9ubHlFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbWFpbHMgPSBbXTtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICB3aGlsZSAobWF0Y2ggPSBFbWFpbFBhdHRlcm4uZXhlYyhhZGRyX2xpc3QpKSB7XG4gICAgICAgIGVtYWlscy5wdXNoKG1hdGNoWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGVtYWlscztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXV0b0NvbXBsZXRlTW9kZWwge1xuICAgIHZhbHVlOiBhbnk7XG4gICAgZGlzcGxheTogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBBbGVydFR5cGVFbnVtIHtcbiAgICBub25lID0gMCxcbiAgICBpbmZvID0gMSxcbiAgICB3YXJuaW5nID0gMixcbiAgICBydW5uaW5nID0gMyxcbiAgICBzdWNjZXNzID0gNCxcbiAgICBlcnJvciA9IDVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRW1haWxTZW5kZXJJbnB1dCB7XG4gICAgY29uZmlybWVkPzogYm9vbGVhbjtcbiAgICBlbWFpbFJlY2VpdmVycz86IHN0cmluZ1tdO1xuICAgIGVtYWlsQm9keT86IHN0cmluZztcbiAgICBlbWFpbFRpdGxlPzogc3RyaW5nO1xuICAgIHN1Y2NlZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbWFpbENvbXBvc2VySW5wdXQge1xuICAgIG1lc3NhZ2VUaXRsZT86IHN0cmluZztcbiAgICBtZXNzYWdlQm9keT86IHN0cmluZztcbiAgICBhdXRvY29tcGxldGVJdGVtc0FzeW5jOiBPYnNlcnZhYmxlPEFycmF5PElBdXRvQ29tcGxldGVNb2RlbD4+O1xuICAgIGVtYWlscz86IEFycmF5PGFueT47XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBAVmlld0NoaWxkKCdlbWFpbElucHV0Qm94JykgZW1haWxJbnB1dEJveDogVGFnSW5wdXRDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZCgnZW1haWxCb2R5JykgZW1haWxCb2R5OiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWVzc2FnZVRpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWVzc2FnZUJvZHk6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM6IE9ic2VydmFibGU8QXJyYXk8SUF1dG9Db21wbGV0ZU1vZGVsPj47XG4gICAgQElucHV0KClcbiAgICBzZW5kZXI6IChhOiBJRW1haWxTZW5kZXJJbnB1dCkgPT4gUHJvbWlzZTxhbnk+O1xuICAgIEBPdXRwdXQoKVxuICAgIG9uVGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KClcbiAgICBvblN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8SUVtYWlsU2VuZGVySW5wdXQ+KCk7XG4gICAgQE91dHB1dCgpXG4gICAgb25TZW50ID0gbmV3IEV2ZW50RW1pdHRlcjx7IHN1Y2Nlc3M6IGJvb2xlYW4gfT4oKTtcblxuICAgIGFsZXJ0TWVzc2FnZTogc3RyaW5nO1xuICAgIGFsZXJ0U3ViTWVzc2FnZTogc3RyaW5nO1xuICAgIGFsZXJ0VHlwZTogQWxlcnRUeXBlRW51bTtcbiAgICBhbGVydERpc21pc3NpYmxlOiBib29sZWFuO1xuXG4gICAgcHVibGljIGVtYWlsczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgdmFsaWRhdG9ycyA9IFtpc1ZhbGlkRW1haWxdO1xuICAgIHB1YmxpYyBlcnJvck1lc3NhZ2VzID0ge1xuICAgICAgICAnaXNWYWxpZEVtYWlsJzogJ1BsZWFzZSBpbnB1dCBhIHZhbGlkIGVtYWlsJ1xuICAgIH07XG5cbiAgICBwcml2YXRlIGRpc2FibGVGb2N1c0V2ZW50OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlVGl0bGUgPSAnRW1haWwgdGl0bGUnO1xuICAgICAgICB0aGlzLmVtYWlscyA9IFtdO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCb2R5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdWJtaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmFsZXJ0VHlwZSA9PT0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyB0ZXh0Q2hhbmdlZChldnQ6IGFueSkge1xuICAgICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KGV2dCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdCgpIHtcbiAgICAgICAgY29uc3QgZW1haWxzID0gW107XG5cbiAgICAgICAgdGhpcy5lbWFpbHMuZm9yRWFjaChlbGVtID0+IHtcblxuICAgICAgICAgICAgbGV0IHggPSBlbGVtIHx8IChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZU9ubHlFbWFpbHMoeCk7XG4gICAgICAgICAgICB5LmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICAgICAgZW1haWxzLnB1c2gobSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0czogSUVtYWlsU2VuZGVySW5wdXQgPSB7XG4gICAgICAgICAgICBjb25maXJtZWQ6IHRydWUsXG4gICAgICAgICAgICBlbWFpbFJlY2VpdmVyczogZW1haWxzLFxuICAgICAgICAgICAgZW1haWxCb2R5OiB0aGlzLm1lc3NhZ2VCb2R5LFxuICAgICAgICAgICAgZW1haWxUaXRsZTogdGhpcy5tZXNzYWdlVGl0bGVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5zZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnVGhlIGVtYWlsIGlzIGJlaW5nIHNlbnQgb3V0Lic7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuc2VuZGVyKG91dHB1dHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZW50ICYmIHRoaXMub25TZW50LmVtaXQoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLmVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nLic7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5lcnJvckluZm8pID8gZXJyb3IuZXJyb3JJbmZvIDogJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbnQgJiYgdGhpcy5vblNlbnQuZW1pdCh7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU3VibWl0ICYmIHRoaXMub25TdWJtaXQuZW1pdChvdXRwdXRzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25PdXRPZlRhZ0lucHV0KGV2dDogYW55KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZW1haWxJbnB1dEJveC5kcm9wZG93biAmJiB0aGlzLmVtYWlsSW5wdXRCb3guZHJvcGRvd24uaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlRm9jdXNFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBBIHRlbXBvcnkgaGFjayBmb3IgZml4aW5nIHRoZSBmb2N1cyBpc3N1ZVxuICAgICAgICAvLyBvbiBpbnZva2luZyB0aGUgb25BZGRpbmdSZXF1ZXN0ZWQgbWV0aG9kIC4uLlxuICAgICAgICBjb25zdCBlbWFpbHMgPSBwYXJzZUVtYWlscyh0aGlzLmVtYWlsSW5wdXRCb3guZm9ybVZhbHVlKTtcblxuICAgICAgICBlbWFpbHMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1haWxzLnB1c2godik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZW1haWxJbnB1dEJveC5zZXRJbnB1dFZhbHVlKCcnKTtcblxuICAgICAgICAvLyBKdW1wIHRvIG90aGVyIHBsYWNlXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtYWlsQm9keS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IGZhbHNlO1xuICAgIH1cblxufVxuIl19