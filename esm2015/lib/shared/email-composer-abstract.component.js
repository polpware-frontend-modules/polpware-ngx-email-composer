import { ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
const _c0 = ["emailInputBox"];
const _c1 = ["emailBody"];
function isValidEmail(control) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1lbWFpbC1jb21wb3Nlci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRWxDLFNBQVMsWUFBWSxDQUFDLE9BQXVCO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsTUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDO0lBQzFCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTztRQUNILGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsSUFBWTtJQUM5QjtnRUFDNEQ7SUFDNUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRCxNQUFNLFlBQVksR0FBRyxzSUFBc0ksQ0FBQztBQUU1Sjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxTQUFpQjtJQUN6Qzs7TUFFRTtJQUNGLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLEtBQXNCLENBQUM7SUFDM0IsT0FBTyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FB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LENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdEUsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV0Qiw0Q0FBNEM7UUFDNUMsK0NBQStDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7b0dBbEhpQiwwQkFBMEI7K0RBQTFCLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWdJbnB1dENvbXBvbmVudCB9IGZyb20gJ25neC1jaGlwcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbWFpbChjb250cm9sOiB7IHZhbHVlOiBhbnkgfSkge1xuICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICBjb25zdCByZSA9IC9cXFMrQFxcUytcXC5cXFMrLztcbiAgICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgICdpc1ZhbGlkRW1haWwnOiB0cnVlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheV9uYW1lKHRleHQ6IHN0cmluZykge1xuICAgIC8qIFJlbW92ZSBhbGwgcXVvdGVzIFxuICAgICAgIFJlbW92ZSB3aGl0ZXNwYWNlLCBicmFja2V0cywgYW5kIGNvbW1hcyBmcm9tIHRoZSBlbmRzLiAqL1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLyheW1xccyw+XSspfFwifChbXFxzLDxdKyQpL2csICcnKTtcbn1cblxuY29uc3QgRW1haWxQYXR0ZXJuID0gL1thLXpBLVowLTkuISMkJSYnKitcXC89P15fYHt8fX4tXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSovZztcblxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIGVtYWlsIGVudHJpZXMuXG4gKiBFYWNoIGVudHJ5IGlzIGxpa2UgdXNlcjx1c2VyQGdtYWlsLmNvbT5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW1haWxzKGFkZHJfbGlzdDogc3RyaW5nKSB7XG4gICAgLyogUmVnZXggc291cmNlOlxuICAgICAgICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI3ZhbGlkLWUtbWFpbC1hZGRyZXNzXG4gICAgKi9cbiAgICBjb25zdCBlbWFpbHMgPSBbXTtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICB3aGlsZSAobWF0Y2ggPSBFbWFpbFBhdHRlcm4uZXhlYyhhZGRyX2xpc3QpKSB7XG4gICAgICAgIGxldCBkaXNwbGF5OiBzdHJpbmc7XG4gICAgICAgIGlmIChkaXNwbGF5ID0gZGlzcGxheV9uYW1lKGFkZHJfbGlzdC5zdWJzdHJpbmcoaWR4LCBtYXRjaFsnaW5kZXgnXSkpKSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaCgnXCInICsgZGlzcGxheSArICdcIiAnICsgJzwnICsgbWF0Y2hbMF0gKyAnPicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGlkeCA9IG1hdGNoWydpbmRleCddICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYSBsaXN0IG9mIGVtYWlsIGVudHJpZXMuXG4gKiBFYWNoIGVudHJ5IGlzIGp1c3QgYW4gZW1haWwuXG4gKiBAcGFyYW0gYWRkcl9saXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9ubHlFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbWFpbHMgPSBbXTtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICB3aGlsZSAobWF0Y2ggPSBFbWFpbFBhdHRlcm4uZXhlYyhhZGRyX2xpc3QpKSB7XG4gICAgICAgIGVtYWlscy5wdXNoKG1hdGNoWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGVtYWlscztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXV0b0NvbXBsZXRlTW9kZWwge1xuICAgIHZhbHVlOiBhbnk7XG4gICAgZGlzcGxheTogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBBbGVydFR5cGVFbnVtIHtcbiAgICBub25lID0gMCxcbiAgICBpbmZvID0gMSxcbiAgICB3YXJuaW5nID0gMixcbiAgICBydW5uaW5nID0gMyxcbiAgICBzdWNjZXNzID0gNCxcbiAgICBlcnJvciA9IDVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRW1haWxTZW5kZXJJbnB1dCB7XG4gICAgY29uZmlybWVkPzogYm9vbGVhbjtcbiAgICBlbWFpbFJlY2VpdmVycz86IHN0cmluZ1tdO1xuICAgIGVtYWlsQm9keT86IHN0cmluZztcbiAgICBlbWFpbFRpdGxlPzogc3RyaW5nO1xuICAgIHN1Y2NlZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW1haWxGb3JtQWJzdHJhY3RDb21wb25lbnQge1xuXG4gICAgQFZpZXdDaGlsZCgnZW1haWxJbnB1dEJveCcpIGVtYWlsSW5wdXRCb3g6IFRhZ0lucHV0Q29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoJ2VtYWlsQm9keScpIGVtYWlsQm9keTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lc3NhZ2VUaXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lc3NhZ2VCb2R5OiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBhdXRvY29tcGxldGVJdGVtc0FzeW5jOiBPYnNlcnZhYmxlPEFycmF5PElBdXRvQ29tcGxldGVNb2RlbD4+O1xuICAgIEBJbnB1dCgpXG4gICAgc2VuZGVyOiAoYTogSUVtYWlsU2VuZGVySW5wdXQpID0+IFByb21pc2U8YW55PjtcbiAgICBAT3V0cHV0KClcbiAgICBvblRleHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpXG4gICAgb25TdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPElFbWFpbFNlbmRlcklucHV0PigpO1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VudCA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdWNjZXNzOiBib29sZWFuIH0+KCk7XG5cbiAgICBhbGVydE1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFN1Yk1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFR5cGU6IEFsZXJ0VHlwZUVudW07XG4gICAgYWxlcnREaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBlbWFpbHM6IEFycmF5PGFueT47XG4gICAgcHVibGljIHZhbGlkYXRvcnMgPSBbaXNWYWxpZEVtYWlsXTtcbiAgICBwdWJsaWMgZXJyb3JNZXNzYWdlcyA9IHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6ICdQbGVhc2UgaW5wdXQgYSB2YWxpZCBlbWFpbCdcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkaXNhYmxlRm9jdXNFdmVudDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMubWVzc2FnZVRpdGxlID0gJ0VtYWlsIHRpdGxlJztcbiAgICAgICAgdGhpcy5lbWFpbHMgPSBbXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQm9keSA9ICcnO1xuXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzU3VibWl0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlscy5sZW5ndGggPT09IDAgfHwgdGhpcy5hbGVydFR5cGUgPT09IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0KCkge1xuICAgICAgICBjb25zdCBlbWFpbHMgPSBbXTtcblxuICAgICAgICB0aGlzLmVtYWlscy5mb3JFYWNoKGVsZW0gPT4ge1xuXG4gICAgICAgICAgICBsZXQgeCA9IGVsZW0gfHwgKGVsZW0udmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHBhcnNlT25seUVtYWlscyh4KTtcbiAgICAgICAgICAgIHkuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICBlbWFpbHMucHVzaChtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvdXRwdXRzOiBJRW1haWxTZW5kZXJJbnB1dCA9IHtcbiAgICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsUmVjZWl2ZXJzOiBlbWFpbHMsXG4gICAgICAgICAgICBlbWFpbEJvZHk6IHRoaXMubWVzc2FnZUJvZHksXG4gICAgICAgICAgICBlbWFpbFRpdGxlOiB0aGlzLm1lc3NhZ2VUaXRsZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnNlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLnJ1bm5pbmc7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICdUaGUgZW1haWwgaXMgYmVpbmcgc2VudCBvdXQuJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gJyc7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5zZW5kZXIob3V0cHV0cykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLm5vbmU7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbnQgJiYgdGhpcy5vblNlbnQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9ySW5mbykgPyBlcnJvci5lcnJvckluZm8gOiAnJztcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VudCAmJiB0aGlzLm9uU2VudC5lbWl0KHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TdWJtaXQgJiYgdGhpcy5vblN1Ym1pdC5lbWl0KG91dHB1dHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk91dE9mVGFnSW5wdXQoZXZ0OiBhbnkpIHtcblxuICAgICAgICBpZiAodGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duICYmIHRoaXMuZW1haWxJbnB1dEJveC5kcm9wZG93bi5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVGb2N1c0V2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIEEgdGVtcG9yeSBoYWNrIGZvciBmaXhpbmcgdGhlIGZvY3VzIGlzc3VlXG4gICAgICAgIC8vIG9uIGludm9raW5nIHRoZSBvbkFkZGluZ1JlcXVlc3RlZCBtZXRob2QgLi4uXG4gICAgICAgIGNvbnN0IGVtYWlscyA9IHBhcnNlRW1haWxzKHRoaXMuZW1haWxJbnB1dEJveC5mb3JtVmFsdWUpO1xuXG4gICAgICAgIGVtYWlscy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWFpbHMucHVzaCh2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbWFpbElucHV0Qm94LnNldElucHV0VmFsdWUoJycpO1xuXG4gICAgICAgIC8vIEp1bXAgdG8gb3RoZXIgcGxhY2VcbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1haWxCb2R5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=