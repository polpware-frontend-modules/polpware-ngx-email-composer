import { ViewChild, Input, Output, EventEmitter, Directive } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["emailInputBox"];
const _c1 = ["emailBody"];
export function isValidEmail(control) {
    const value = control.value;
    const re = /\S+@\S+\.\S+/;
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
const EmailPattern = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g;
/**
 * Parses the given string into an array of email entries.
 * Each entry is like user<user@gmail.com>
 * @param addr_list
 */
export function parseEmails(addr_list) {
    /* Regex source:
        https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
    */
    const emails = [];
    let idx = 0;
    let match;
    while (match = EmailPattern.exec(addr_list)) {
        let display;
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
    const emails = [];
    let match;
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
export class EmailFormAbstractComponent {
    constructor() {
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
    get isSubmitDisabled() {
        return this.emails.length === 0 || this.alertType === AlertTypeEnum.running;
    }
    textChanged(evt) {
        this.showCloseBtn = false;
        this.onTextChange.emit(evt);
    }
    otherFieldChanged() {
        this.showCloseBtn = false;
    }
    submit() {
        const emails = [];
        this.emails.forEach(elem => {
            let x = elem || (elem.value);
            const y = parseOnlyEmails(x);
            y.forEach(m => {
                emails.push(m);
            });
        });
        const outputs = {
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
            this.sender(outputs).then(() => {
                this.alertType = AlertTypeEnum.info;
                this.alertMessage = 'Emails have been successfully sent out.';
                this.alertDismissible = true;
                this.showCloseBtn = true;
                this.onSent && this.onSent.emit({ success: true });
            }, (error) => {
                this.alertType = AlertTypeEnum.error;
                this.alertMessage = 'Something went wrong.';
                this.alertDismissible = true;
                this.alertSubMessage = (error && error.errorInfo) ? error.errorInfo : '';
                this.onSent && this.onSent.emit({ success: false });
            });
        }
        this.onSubmit && this.onSubmit.emit(outputs);
    }
    onOutOfTagInput(evt) {
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
        const emails = parseEmails(this.emailInputBox.formValue);
        emails.forEach(v => {
            this.emails.push(v);
        });
        this.emailInputBox.setInputValue('');
        // Jump to other place
        this.disableFocusEvent = true;
        if (this.emailBody && this.emailBody.nativeElement) {
            this.emailBody.nativeElement.focus();
        }
        else if (this.emailBody && this.emailBody.focus) {
            this.emailBody.focus();
        }
        this.disableFocusEvent = false;
    }
    static { this.ɵfac = function EmailFormAbstractComponent_Factory(t) { return new (t || EmailFormAbstractComponent)(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: EmailFormAbstractComponent, viewQuery: function EmailFormAbstractComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailInputBox = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailBody = _t.first);
        } }, inputs: { messageTitle: "messageTitle", messageBody: "messageBody", autocompleteItemsAsync: "autocompleteItemsAsync", sender: "sender" }, outputs: { onTextChange: "onTextChange", onSubmit: "onSubmit", onSent: "onSent" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailFormAbstractComponent, [{
        type: Directive
    }], () => [], { emailInputBox: [{
            type: ViewChild,
            args: ['emailInputBox']
        }], emailBody: [{
            type: ViewChild,
            args: ['emailBody']
        }], messageTitle: [{
            type: Input
        }], messageBody: [{
            type: Input
        }], autocompleteItemsAsync: [{
            type: Input
        }], sender: [{
            type: Input
        }], onTextChange: [{
            type: Output
        }], onSubmit: [{
            type: Output
        }], onSent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcG9scHdhcmUvbmd4LWVtYWlsLWNvbXBvc2VyL3NyYy9saWIvc2hhcmVkL2VtYWlsLWNvbXBvc2VyLWFic3RyYWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUk5RixNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQXVCO0lBQ2hELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsTUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDO0lBQzFCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFPO1FBQ0gsY0FBYyxFQUFFLElBQUk7S0FDdkIsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFZO0lBQzlCO2dFQUM0RDtJQUM1RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELE1BQU0sWUFBWSxHQUFHLHNJQUFzSSxDQUFDO0FBRTVKOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLFNBQWlCO0lBQ3pDOztNQUVFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksS0FBc0IsQ0FBQztJQUMzQixPQUFPLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDMUMsSUFBSSxPQUFlLENBQUM7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QVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekMsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzsyRkF0SWlCLDBCQUEwQjtvRUFBMUIsMEJBQTBCOzs7Ozs7Ozs7aUZBQTFCLDBCQUEwQjtjQUQvQyxTQUFTO29CQUdzQixhQUFhO2tCQUF4QyxTQUFTO21CQUFDLGVBQWU7WUFDRixTQUFTO2tCQUFoQyxTQUFTO21CQUFDLFdBQVc7WUFHZixZQUFZO2tCQURsQixLQUFLO1lBR0MsV0FBVztrQkFEakIsS0FBSztZQUdOLHNCQUFzQjtrQkFEckIsS0FBSztZQUdOLE1BQU07a0JBREwsS0FBSztZQUdOLFlBQVk7a0JBRFgsTUFBTTtZQUdQLFFBQVE7a0JBRFAsTUFBTTtZQUdQLE1BQU07a0JBREwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhZ0lucHV0Q29tcG9uZW50IH0gZnJvbSAnbmd4LWNoaXBzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRFbWFpbChjb250cm9sOiB7IHZhbHVlOiBhbnkgfSkge1xuICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICBjb25zdCByZSA9IC9cXFMrQFxcUytcXC5cXFMrLztcbiAgICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgICdpc1ZhbGlkRW1haWwnOiB0cnVlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheV9uYW1lKHRleHQ6IHN0cmluZykge1xuICAgIC8qIFJlbW92ZSBhbGwgcXVvdGVzIFxuICAgICAgIFJlbW92ZSB3aGl0ZXNwYWNlLCBicmFja2V0cywgYW5kIGNvbW1hcyBmcm9tIHRoZSBlbmRzLiAqL1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLyheW1xccyw+XSspfFwifChbXFxzLDxdKyQpL2csICcnKTtcbn1cblxuY29uc3QgRW1haWxQYXR0ZXJuID0gL1thLXpBLVowLTkuISMkJSYnKitcXC89P15fYHt8fX4tXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSovZztcblxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIGVtYWlsIGVudHJpZXMuXG4gKiBFYWNoIGVudHJ5IGlzIGxpa2UgdXNlcjx1c2VyQGdtYWlsLmNvbT5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW1haWxzKGFkZHJfbGlzdDogc3RyaW5nKSB7XG4gICAgLyogUmVnZXggc291cmNlOlxuICAgICAgICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI3ZhbGlkLWUtbWFpbC1hZGRyZXNzXG4gICAgKi9cbiAgICBjb25zdCBlbWFpbHMgPSBbXTtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICB3aGlsZSAobWF0Y2ggPSBFbWFpbFBhdHRlcm4uZXhlYyhhZGRyX2xpc3QpKSB7XG4gICAgICAgIGxldCBkaXNwbGF5OiBzdHJpbmc7XG4gICAgICAgIGlmIChkaXNwbGF5ID0gZGlzcGxheV9uYW1lKGFkZHJfbGlzdC5zdWJzdHJpbmcoaWR4LCBtYXRjaFsnaW5kZXgnXSkpKSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaCgnXCInICsgZGlzcGxheSArICdcIiAnICsgJzwnICsgbWF0Y2hbMF0gKyAnPicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGlkeCA9IG1hdGNoWydpbmRleCddICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYSBsaXN0IG9mIGVtYWlsIGVudHJpZXMuXG4gKiBFYWNoIGVudHJ5IGlzIGp1c3QgYW4gZW1haWwuXG4gKiBAcGFyYW0gYWRkcl9saXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9ubHlFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbWFpbHMgPSBbXTtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICB3aGlsZSAobWF0Y2ggPSBFbWFpbFBhdHRlcm4uZXhlYyhhZGRyX2xpc3QpKSB7XG4gICAgICAgIGVtYWlscy5wdXNoKG1hdGNoWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGVtYWlscztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXV0b0NvbXBsZXRlTW9kZWwge1xuICAgIHZhbHVlOiBhbnk7XG4gICAgZGlzcGxheTogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBBbGVydFR5cGVFbnVtIHtcbiAgICBub25lID0gMCxcbiAgICBpbmZvID0gMSxcbiAgICB3YXJuaW5nID0gMixcbiAgICBydW5uaW5nID0gMyxcbiAgICBzdWNjZXNzID0gNCxcbiAgICBlcnJvciA9IDVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRW1haWxTZW5kZXJJbnB1dCB7XG4gICAgY29uZmlybWVkPzogYm9vbGVhbjtcbiAgICBlbWFpbFJlY2VpdmVycz86IHN0cmluZ1tdO1xuICAgIGVtYWlsQm9keT86IHN0cmluZztcbiAgICBlbWFpbFRpdGxlPzogc3RyaW5nO1xuICAgIHN1Y2NlZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbWFpbENvbXBvc2VySW5wdXQge1xuICAgIG1lc3NhZ2VUaXRsZT86IHN0cmluZztcbiAgICBtZXNzYWdlQm9keT86IHN0cmluZztcbiAgICBhdXRvY29tcGxldGVJdGVtc0FzeW5jOiBPYnNlcnZhYmxlPEFycmF5PElBdXRvQ29tcGxldGVNb2RlbD4+O1xuICAgIGVtYWlscz86IEFycmF5PGFueT47XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVtYWlsRm9ybUFic3RyYWN0Q29tcG9uZW50IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2VtYWlsSW5wdXRCb3gnKSBlbWFpbElucHV0Qm94OiBUYWdJbnB1dENvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKCdlbWFpbEJvZHknKSBlbWFpbEJvZHk6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lc3NhZ2VUaXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lc3NhZ2VCb2R5OiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBhdXRvY29tcGxldGVJdGVtc0FzeW5jOiBPYnNlcnZhYmxlPEFycmF5PElBdXRvQ29tcGxldGVNb2RlbD4+O1xuICAgIEBJbnB1dCgpXG4gICAgc2VuZGVyOiAoYTogSUVtYWlsU2VuZGVySW5wdXQpID0+IFByb21pc2U8YW55PjtcbiAgICBAT3V0cHV0KClcbiAgICBvblRleHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpXG4gICAgb25TdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPElFbWFpbFNlbmRlcklucHV0PigpO1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VudCA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdWNjZXNzOiBib29sZWFuIH0+KCk7XG5cbiAgICBhbGVydE1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFN1Yk1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFR5cGU6IEFsZXJ0VHlwZUVudW07XG4gICAgYWxlcnREaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBlbWFpbHM6IEFycmF5PGFueT47XG4gICAgcHVibGljIHZhbGlkYXRvcnMgPSBbaXNWYWxpZEVtYWlsXTtcbiAgICBwdWJsaWMgZXJyb3JNZXNzYWdlcyA9IHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6ICdQbGVhc2UgaW5wdXQgYSB2YWxpZCBlbWFpbCdcbiAgICB9O1xuXG4gICAgLy8gQ29udHJvbCBvdmVyIHRoZSBjbG9zZSBidXR0b25cbiAgICBwdWJsaWMgc2hvd0Nsb3NlQnRuOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBkaXNhYmxlRm9jdXNFdmVudDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMubWVzc2FnZVRpdGxlID0gJyc7XG4gICAgICAgIHRoaXMuZW1haWxzID0gW107XG4gICAgICAgIHRoaXMubWVzc2FnZUJvZHkgPSAnJztcblxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1N1Ym1pdERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWFpbHMubGVuZ3RoID09PSAwIHx8IHRoaXMuYWxlcnRUeXBlID09PSBBbGVydFR5cGVFbnVtLnJ1bm5pbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHRleHRDaGFuZ2VkKGV2dDogYW55KSB7XG4gICAgICAgIHRoaXMuc2hvd0Nsb3NlQnRuID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQoZXZ0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3RoZXJGaWVsZENoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0Nsb3NlQnRuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdCgpIHtcbiAgICAgICAgY29uc3QgZW1haWxzID0gW107XG5cbiAgICAgICAgdGhpcy5lbWFpbHMuZm9yRWFjaChlbGVtID0+IHtcblxuICAgICAgICAgICAgbGV0IHggPSBlbGVtIHx8IChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZU9ubHlFbWFpbHMoeCk7XG4gICAgICAgICAgICB5LmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICAgICAgZW1haWxzLnB1c2gobSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0czogSUVtYWlsU2VuZGVySW5wdXQgPSB7XG4gICAgICAgICAgICBjb25maXJtZWQ6IHRydWUsXG4gICAgICAgICAgICBlbWFpbFJlY2VpdmVyczogZW1haWxzLFxuICAgICAgICAgICAgZW1haWxCb2R5OiB0aGlzLm1lc3NhZ2VCb2R5LFxuICAgICAgICAgICAgZW1haWxUaXRsZTogdGhpcy5tZXNzYWdlVGl0bGVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5zZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnVGhlIGVtYWlsIGlzIGJlaW5nIHNlbnQgb3V0IC4uLic7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuc2VuZGVyKG91dHB1dHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5pbmZvO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ0VtYWlscyBoYXZlIGJlZW4gc3VjY2Vzc2Z1bGx5IHNlbnQgb3V0Lic7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDbG9zZUJ0biA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VudCAmJiB0aGlzLm9uU2VudC5lbWl0KHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5lcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICdTb21ldGhpbmcgd2VudCB3cm9uZy4nO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3JJbmZvKSA/IGVycm9yLmVycm9ySW5mbyA6ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZW50ICYmIHRoaXMub25TZW50LmVtaXQoeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblN1Ym1pdCAmJiB0aGlzLm9uU3VibWl0LmVtaXQob3V0cHV0cyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uT3V0T2ZUYWdJbnB1dChldnQ6IGFueSkge1xuXG4gICAgICAgIGlmICh0aGlzLmVtYWlsSW5wdXRCb3guZHJvcGRvd24gJiYgdGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gQSB0ZW1wb3J5IGhhY2sgZm9yIGZpeGluZyB0aGUgZm9jdXMgaXNzdWVcbiAgICAgICAgLy8gb24gaW52b2tpbmcgdGhlIG9uQWRkaW5nUmVxdWVzdGVkIG1ldGhvZCAuLi5cbiAgICAgICAgY29uc3QgZW1haWxzID0gcGFyc2VFbWFpbHModGhpcy5lbWFpbElucHV0Qm94LmZvcm1WYWx1ZSk7XG5cbiAgICAgICAgZW1haWxzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtYWlscy5wdXNoKHYpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVtYWlsSW5wdXRCb3guc2V0SW5wdXRWYWx1ZSgnJyk7XG5cbiAgICAgICAgLy8gSnVtcCB0byBvdGhlciBwbGFjZVxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZW1haWxCb2R5ICYmIHRoaXMuZW1haWxCb2R5Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1haWxCb2R5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVtYWlsQm9keSAmJiB0aGlzLmVtYWlsQm9keS5mb2N1cykge1xuICAgICAgICAgICAgdGhpcy5lbWFpbEJvZHkuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==