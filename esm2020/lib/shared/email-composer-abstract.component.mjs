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
}
EmailFormAbstractComponent.ɵfac = function EmailFormAbstractComponent_Factory(t) { return new (t || EmailFormAbstractComponent)(); };
EmailFormAbstractComponent.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: EmailFormAbstractComponent, viewQuery: function EmailFormAbstractComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailInputBox = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailBody = _t.first);
    } }, inputs: { messageTitle: "messageTitle", messageBody: "messageBody", autocompleteItemsAsync: "autocompleteItemsAsync", sender: "sender" }, outputs: { onTextChange: "onTextChange", onSubmit: "onSubmit", onSent: "onSent" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailFormAbstractComponent, [{
        type: Directive
    }], function () { return []; }, { emailInputBox: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcG9scHdhcmUvbmd4LWVtYWlsLWNvbXBvc2VyL3NyYy9saWIvc2hhcmVkL2VtYWlsLWNvbXBvc2VyLWFic3RyYWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUk5RixNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQXVCO0lBQ2hELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsTUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDO0lBQzFCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTztRQUNILGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsSUFBWTtJQUM5QjtnRUFDNEQ7SUFDNUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRCxNQUFNLFlBQVksR0FBRyxzSUFBc0ksQ0FBQztBQUU1Sjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxTQUFpQjtJQUN6Qzs7TUFFRTtJQUNGLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLEtBQXNCLENBQUM7SUFDM0IsT0FBTyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN6QyxJQUFJLE9BQWUsQ0FBQztRQUNwQixJQUFJLE9BQU8s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QUMsS0FBSyxFQUFFO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O29HQXRJaUIsMEJBQTBCOzZFQUExQiwwQkFBMEI7Ozs7Ozs7O3VGQUExQiwwQkFBMEI7Y0FEL0MsU0FBUztzQ0FHc0IsYUFBYTtrQkFBeEMsU0FBUzttQkFBQyxlQUFlO1lBQ0YsU0FBUztrQkFBaEMsU0FBUzttQkFBQyxXQUFXO1lBR2YsWUFBWTtrQkFEbEIsS0FBSztZQUdDLFdBQVc7a0JBRGpCLEtBQUs7WUFHTixzQkFBc0I7a0JBRHJCLEtBQUs7WUFHTixNQUFNO2tCQURMLEtBQUs7WUFHTixZQUFZO2tCQURYLE1BQU07WUFHUCxRQUFRO2tCQURQLE1BQU07WUFHUCxNQUFNO2tCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWdJbnB1dENvbXBvbmVudCB9IGZyb20gJ25neC1jaGlwcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRW1haWwoY29udHJvbDogeyB2YWx1ZTogYW55IH0pIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgY29uc3QgcmUgPSAvXFxTK0BcXFMrXFwuXFxTKy87XG4gICAgaWYgKHJlLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICAnaXNWYWxpZEVtYWlsJzogdHJ1ZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlfbmFtZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAvKiBSZW1vdmUgYWxsIHF1b3RlcyBcbiAgICAgICBSZW1vdmUgd2hpdGVzcGFjZSwgYnJhY2tldHMsIGFuZCBjb21tYXMgZnJvbSB0aGUgZW5kcy4gKi9cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC8oXltcXHMsPl0rKXxcInwoW1xccyw8XSskKS9nLCAnJyk7XG59XG5cbmNvbnN0IEVtYWlsUGF0dGVybiA9IC9bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqL2c7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBlbWFpbCBlbnRyaWVzLlxuICogRWFjaCBlbnRyeSBpcyBsaWtlIHVzZXI8dXNlckBnbWFpbC5jb20+XG4gKiBAcGFyYW0gYWRkcl9saXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVtYWlscyhhZGRyX2xpc3Q6IHN0cmluZykge1xuICAgIC8qIFJlZ2V4IHNvdXJjZTpcbiAgICAgICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCN2YWxpZC1lLW1haWwtYWRkcmVzc1xuICAgICovXG4gICAgY29uc3QgZW1haWxzID0gW107XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXk7XG4gICAgd2hpbGUgKG1hdGNoID0gRW1haWxQYXR0ZXJuLmV4ZWMoYWRkcl9saXN0KSkge1xuICAgICAgICBsZXQgZGlzcGxheTogc3RyaW5nO1xuICAgICAgICBpZiAoZGlzcGxheSA9IGRpc3BsYXlfbmFtZShhZGRyX2xpc3Quc3Vic3RyaW5nKGlkeCwgbWF0Y2hbJ2luZGV4J10pKSkge1xuICAgICAgICAgICAgZW1haWxzLnB1c2goJ1wiJyArIGRpc3BsYXkgKyAnXCIgJyArICc8JyArIG1hdGNoWzBdICsgJz4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVtYWlscy5wdXNoKG1hdGNoWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZHggPSBtYXRjaFsnaW5kZXgnXSArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGVtYWlscztcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGEgbGlzdCBvZiBlbWFpbCBlbnRyaWVzLlxuICogRWFjaCBlbnRyeSBpcyBqdXN0IGFuIGVtYWlsLlxuICogQHBhcmFtIGFkZHJfbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VPbmx5RW1haWxzKGFkZHJfbGlzdDogc3RyaW5nKSB7XG4gICAgY29uc3QgZW1haWxzID0gW107XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXk7XG4gICAgd2hpbGUgKG1hdGNoID0gRW1haWxQYXR0ZXJuLmV4ZWMoYWRkcl9saXN0KSkge1xuICAgICAgICBlbWFpbHMucHVzaChtYXRjaFswXSk7XG4gICAgfVxuICAgIHJldHVybiBlbWFpbHM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dG9Db21wbGV0ZU1vZGVsIHtcbiAgICB2YWx1ZTogYW55O1xuICAgIGRpc3BsYXk6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gQWxlcnRUeXBlRW51bSB7XG4gICAgbm9uZSA9IDAsXG4gICAgaW5mbyA9IDEsXG4gICAgd2FybmluZyA9IDIsXG4gICAgcnVubmluZyA9IDMsXG4gICAgc3VjY2VzcyA9IDQsXG4gICAgZXJyb3IgPSA1XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVtYWlsU2VuZGVySW5wdXQge1xuICAgIGNvbmZpcm1lZD86IGJvb2xlYW47XG4gICAgZW1haWxSZWNlaXZlcnM/OiBzdHJpbmdbXTtcbiAgICBlbWFpbEJvZHk/OiBzdHJpbmc7XG4gICAgZW1haWxUaXRsZT86IHN0cmluZztcbiAgICBzdWNjZWVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRW1haWxDb21wb3NlcklucHV0IHtcbiAgICBtZXNzYWdlVGl0bGU/OiBzdHJpbmc7XG4gICAgbWVzc2FnZUJvZHk/OiBzdHJpbmc7XG4gICAgYXV0b2NvbXBsZXRlSXRlbXNBc3luYzogT2JzZXJ2YWJsZTxBcnJheTxJQXV0b0NvbXBsZXRlTW9kZWw+PjtcbiAgICBlbWFpbHM/OiBBcnJheTxhbnk+O1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBAVmlld0NoaWxkKCdlbWFpbElucHV0Qm94JykgZW1haWxJbnB1dEJveDogVGFnSW5wdXRDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZCgnZW1haWxCb2R5JykgZW1haWxCb2R5OiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtZXNzYWdlVGl0bGU6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtZXNzYWdlQm9keTogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgYXV0b2NvbXBsZXRlSXRlbXNBc3luYzogT2JzZXJ2YWJsZTxBcnJheTxJQXV0b0NvbXBsZXRlTW9kZWw+PjtcbiAgICBASW5wdXQoKVxuICAgIHNlbmRlcjogKGE6IElFbWFpbFNlbmRlcklucHV0KSA9PiBQcm9taXNlPGFueT47XG4gICAgQE91dHB1dCgpXG4gICAgb25UZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxJRW1haWxTZW5kZXJJbnB1dD4oKTtcbiAgICBAT3V0cHV0KClcbiAgICBvblNlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgc3VjY2VzczogYm9vbGVhbiB9PigpO1xuXG4gICAgYWxlcnRNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRTdWJNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRUeXBlOiBBbGVydFR5cGVFbnVtO1xuICAgIGFsZXJ0RGlzbWlzc2libGU6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZW1haWxzOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyB2YWxpZGF0b3JzID0gW2lzVmFsaWRFbWFpbF07XG4gICAgcHVibGljIGVycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICdpc1ZhbGlkRW1haWwnOiAnUGxlYXNlIGlucHV0IGEgdmFsaWQgZW1haWwnXG4gICAgfTtcblxuICAgIC8vIENvbnRyb2wgb3ZlciB0aGUgY2xvc2UgYnV0dG9uXG4gICAgcHVibGljIHNob3dDbG9zZUJ0bjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgZGlzYWJsZUZvY3VzRXZlbnQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLm1lc3NhZ2VUaXRsZSA9ICcnO1xuICAgICAgICB0aGlzLmVtYWlscyA9IFtdO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCb2R5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdWJtaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmFsZXJ0VHlwZSA9PT0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyB0ZXh0Q2hhbmdlZChldnQ6IGFueSkge1xuICAgICAgICB0aGlzLnNob3dDbG9zZUJ0biA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KGV2dCk7XG4gICAgfVxuXG4gICAgcHVibGljIG90aGVyRmllbGRDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLnNob3dDbG9zZUJ0biA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXQoKSB7XG4gICAgICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZW1haWxzLmZvckVhY2goZWxlbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB4ID0gZWxlbSB8fCAoZWxlbS52YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gcGFyc2VPbmx5RW1haWxzKHgpO1xuICAgICAgICAgICAgeS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICAgICAgICAgIGVtYWlscy5wdXNoKG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG91dHB1dHM6IElFbWFpbFNlbmRlcklucHV0ID0ge1xuICAgICAgICAgICAgY29uZmlybWVkOiB0cnVlLFxuICAgICAgICAgICAgZW1haWxSZWNlaXZlcnM6IGVtYWlscyxcbiAgICAgICAgICAgIGVtYWlsQm9keTogdGhpcy5tZXNzYWdlQm9keSxcbiAgICAgICAgICAgIGVtYWlsVGl0bGU6IHRoaXMubWVzc2FnZVRpdGxlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1RoZSBlbWFpbCBpcyBiZWluZyBzZW50IG91dCAuLi4nO1xuICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnNlbmRlcihvdXRwdXRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uaW5mbztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICdFbWFpbHMgaGF2ZSBiZWVuIHN1Y2Nlc3NmdWxseSBzZW50IG91dC4nO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2xvc2VCdG4gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbnQgJiYgdGhpcy5vblNlbnQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9ySW5mbykgPyBlcnJvci5lcnJvckluZm8gOiAnJztcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VudCAmJiB0aGlzLm9uU2VudC5lbWl0KHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TdWJtaXQgJiYgdGhpcy5vblN1Ym1pdC5lbWl0KG91dHB1dHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk91dE9mVGFnSW5wdXQoZXZ0OiBhbnkpIHtcblxuICAgICAgICBpZiAodGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duICYmIHRoaXMuZW1haWxJbnB1dEJveC5kcm9wZG93bi5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVGb2N1c0V2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIEEgdGVtcG9yeSBoYWNrIGZvciBmaXhpbmcgdGhlIGZvY3VzIGlzc3VlXG4gICAgICAgIC8vIG9uIGludm9raW5nIHRoZSBvbkFkZGluZ1JlcXVlc3RlZCBtZXRob2QgLi4uXG4gICAgICAgIGNvbnN0IGVtYWlscyA9IHBhcnNlRW1haWxzKHRoaXMuZW1haWxJbnB1dEJveC5mb3JtVmFsdWUpO1xuXG4gICAgICAgIGVtYWlscy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWFpbHMucHVzaCh2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbWFpbElucHV0Qm94LnNldElucHV0VmFsdWUoJycpO1xuXG4gICAgICAgIC8vIEp1bXAgdG8gb3RoZXIgcGxhY2VcbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmVtYWlsQm9keSAmJiB0aGlzLmVtYWlsQm9keS5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmVtYWlsQm9keS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbWFpbEJvZHkgJiYgdGhpcy5lbWFpbEJvZHkuZm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZW1haWxCb2R5LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=