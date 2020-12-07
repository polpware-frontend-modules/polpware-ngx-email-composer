import { ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
import { Observable } from 'rxjs';
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
        this.messageTitle = 'Email title';
        this.emails = [];
        this.messageBody = '';
        this.disableFocusEvent = false;
    }
    get isSubmitDisabled() {
        return this.emails.length === 0 || this.alertType === AlertTypeEnum.running;
    }
    textChanged(evt) {
        this.onTextChange.emit(evt);
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
            this.alertMessage = 'The email is being sent out.';
            this.alertSubMessage = '';
            this.alertDismissible = false;
            this.sender(outputs).then(() => {
                this.alertType = AlertTypeEnum.none;
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
        this.emailBody.nativeElement.focus();
        this.disableFocusEvent = false;
    }
}
EmailFormAbstractComponent.ɵfac = function EmailFormAbstractComponent_Factory(t) { return new (t || EmailFormAbstractComponent)(); };
EmailFormAbstractComponent.ɵdir = i0.ɵɵdefineDirective({ type: EmailFormAbstractComponent, viewQuery: function EmailFormAbstractComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailInputBox = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailBody = _t.first);
    } }, inputs: { messageTitle: "messageTitle", messageBody: "messageBody", autocompleteItemsAsync: "autocompleteItemsAsync", sender: "sender" }, outputs: { onTextChange: "onTextChange", onSubmit: "onSubmit", onSent: "onSent" } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1lbWFpbC1jb21wb3Nlci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRWxDLE1BQU0sVUFBVSxZQUFZLENBQUMsT0FBdUI7SUFDaEQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixNQUFNLEVBQUUsR0FBRyxjQUFjLENBQUM7SUFDMUIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPO1FBQ0gsY0FBYyxFQUFFLElBQUk7S0FDdkIsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFZO0lBQzlCO2dFQUM0RDtJQUM1RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELE1BQU0sWUFBWSxHQUFHLHNJQUFzSSxDQUFDO0FBRTVKOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLFNBQWlCO0lBQ3pDOztNQUVFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksS0FBc0IsQ0FBQztJQUMzQixPQUFPLEtBQUssR0FBRyxZQUFZLENBQUMsSUFB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SSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLGVBQWUsQ0FBQyxHQUFRO1FBRTNCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3RFLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLE9BQU87U0FDVjtRQUVELEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdEIsNENBQTRDO1FBQzVDLCtDQUErQztRQUMvQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6RCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O29HQXRIaUIsMEJBQTBCOytEQUExQiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICduZ3gtY2hpcHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZEVtYWlsKGNvbnRyb2w6IHsgdmFsdWU6IGFueSB9KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgIGNvbnN0IHJlID0gL1xcUytAXFxTK1xcLlxcUysvO1xuICAgIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6IHRydWVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5X25hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgLyogUmVtb3ZlIGFsbCBxdW90ZXMgXG4gICAgICAgUmVtb3ZlIHdoaXRlc3BhY2UsIGJyYWNrZXRzLCBhbmQgY29tbWFzIGZyb20gdGhlIGVuZHMuICovXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKF5bXFxzLD5dKyl8XCJ8KFtcXHMsPF0rJCkvZywgJycpO1xufVxuXG5jb25zdCBFbWFpbFBhdHRlcm4gPSAvW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKi9nO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMgbGlrZSB1c2VyPHVzZXJAZ21haWwuY29tPlxuICogQHBhcmFtIGFkZHJfbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICAvKiBSZWdleCBzb3VyY2U6XG4gICAgICAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjdmFsaWQtZS1tYWlsLWFkZHJlc3NcbiAgICAqL1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgbGV0IGRpc3BsYXk6IHN0cmluZztcbiAgICAgICAgaWYgKGRpc3BsYXkgPSBkaXNwbGF5X25hbWUoYWRkcl9saXN0LnN1YnN0cmluZyhpZHgsIG1hdGNoWydpbmRleCddKSkpIHtcbiAgICAgICAgICAgIGVtYWlscy5wdXNoKCdcIicgKyBkaXNwbGF5ICsgJ1wiICcgKyAnPCcgKyBtYXRjaFswXSArICc+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaChtYXRjaFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ID0gbWF0Y2hbJ2luZGV4J10gKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBlbWFpbHM7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhIGxpc3Qgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMganVzdCBhbiBlbWFpbC5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT25seUVtYWlscyhhZGRyX2xpc3Q6IHN0cmluZykge1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvQ29tcGxldGVNb2RlbCB7XG4gICAgdmFsdWU6IGFueTtcbiAgICBkaXNwbGF5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEFsZXJ0VHlwZUVudW0ge1xuICAgIG5vbmUgPSAwLFxuICAgIGluZm8gPSAxLFxuICAgIHdhcm5pbmcgPSAyLFxuICAgIHJ1bm5pbmcgPSAzLFxuICAgIHN1Y2Nlc3MgPSA0LFxuICAgIGVycm9yID0gNVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbWFpbFNlbmRlcklucHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVtYWlsQ29tcG9zZXJJbnB1dCB7XG4gICAgbWVzc2FnZVRpdGxlPzogc3RyaW5nO1xuICAgIG1lc3NhZ2VCb2R5Pzogc3RyaW5nO1xuICAgIGF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM6IE9ic2VydmFibGU8QXJyYXk8SUF1dG9Db21wbGV0ZU1vZGVsPj47XG4gICAgZW1haWxzPzogQXJyYXk8YW55Pjtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVtYWlsRm9ybUFic3RyYWN0Q29tcG9uZW50IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2VtYWlsSW5wdXRCb3gnKSBlbWFpbElucHV0Qm94OiBUYWdJbnB1dENvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKCdlbWFpbEJvZHknKSBlbWFpbEJvZHk6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtZXNzYWdlVGl0bGU6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtZXNzYWdlQm9keTogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgYXV0b2NvbXBsZXRlSXRlbXNBc3luYzogT2JzZXJ2YWJsZTxBcnJheTxJQXV0b0NvbXBsZXRlTW9kZWw+PjtcbiAgICBASW5wdXQoKVxuICAgIHNlbmRlcjogKGE6IElFbWFpbFNlbmRlcklucHV0KSA9PiBQcm9taXNlPGFueT47XG4gICAgQE91dHB1dCgpXG4gICAgb25UZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxJRW1haWxTZW5kZXJJbnB1dD4oKTtcbiAgICBAT3V0cHV0KClcbiAgICBvblNlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgc3VjY2VzczogYm9vbGVhbiB9PigpO1xuXG4gICAgYWxlcnRNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRTdWJNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRUeXBlOiBBbGVydFR5cGVFbnVtO1xuICAgIGFsZXJ0RGlzbWlzc2libGU6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZW1haWxzOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyB2YWxpZGF0b3JzID0gW2lzVmFsaWRFbWFpbF07XG4gICAgcHVibGljIGVycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICdpc1ZhbGlkRW1haWwnOiAnUGxlYXNlIGlucHV0IGEgdmFsaWQgZW1haWwnXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGlzYWJsZUZvY3VzRXZlbnQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLm1lc3NhZ2VUaXRsZSA9ICdFbWFpbCB0aXRsZSc7XG4gICAgICAgIHRoaXMuZW1haWxzID0gW107XG4gICAgICAgIHRoaXMubWVzc2FnZUJvZHkgPSAnJztcblxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1N1Ym1pdERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWFpbHMubGVuZ3RoID09PSAwIHx8IHRoaXMuYWxlcnRUeXBlID09PSBBbGVydFR5cGVFbnVtLnJ1bm5pbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHRleHRDaGFuZ2VkKGV2dDogYW55KSB7XG4gICAgICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQoZXZ0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0KCkge1xuICAgICAgICBjb25zdCBlbWFpbHMgPSBbXTtcblxuICAgICAgICB0aGlzLmVtYWlscy5mb3JFYWNoKGVsZW0gPT4ge1xuXG4gICAgICAgICAgICBsZXQgeCA9IGVsZW0gfHwgKGVsZW0udmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHBhcnNlT25seUVtYWlscyh4KTtcbiAgICAgICAgICAgIHkuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICBlbWFpbHMucHVzaChtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvdXRwdXRzOiBJRW1haWxTZW5kZXJJbnB1dCA9IHtcbiAgICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsUmVjZWl2ZXJzOiBlbWFpbHMsXG4gICAgICAgICAgICBlbWFpbEJvZHk6IHRoaXMubWVzc2FnZUJvZHksXG4gICAgICAgICAgICBlbWFpbFRpdGxlOiB0aGlzLm1lc3NhZ2VUaXRsZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnNlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLnJ1bm5pbmc7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICdUaGUgZW1haWwgaXMgYmVpbmcgc2VudCBvdXQuJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gJyc7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5zZW5kZXIob3V0cHV0cykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLm5vbmU7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbnQgJiYgdGhpcy5vblNlbnQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9ySW5mbykgPyBlcnJvci5lcnJvckluZm8gOiAnJztcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VudCAmJiB0aGlzLm9uU2VudC5lbWl0KHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TdWJtaXQgJiYgdGhpcy5vblN1Ym1pdC5lbWl0KG91dHB1dHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk91dE9mVGFnSW5wdXQoZXZ0OiBhbnkpIHtcblxuICAgICAgICBpZiAodGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duICYmIHRoaXMuZW1haWxJbnB1dEJveC5kcm9wZG93bi5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVGb2N1c0V2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIEEgdGVtcG9yeSBoYWNrIGZvciBmaXhpbmcgdGhlIGZvY3VzIGlzc3VlXG4gICAgICAgIC8vIG9uIGludm9raW5nIHRoZSBvbkFkZGluZ1JlcXVlc3RlZCBtZXRob2QgLi4uXG4gICAgICAgIGNvbnN0IGVtYWlscyA9IHBhcnNlRW1haWxzKHRoaXMuZW1haWxJbnB1dEJveC5mb3JtVmFsdWUpO1xuXG4gICAgICAgIGVtYWlscy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWFpbHMucHVzaCh2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbWFpbElucHV0Qm94LnNldElucHV0VmFsdWUoJycpO1xuXG4gICAgICAgIC8vIEp1bXAgdG8gb3RoZXIgcGxhY2VcbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1haWxCb2R5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=