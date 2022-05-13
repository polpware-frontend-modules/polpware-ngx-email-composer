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
        this.emailBody.nativeElement.focus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcG9scHdhcmUvbmd4LWVtYWlsLWNvbXBvc2VyL3NyYy9saWIvc2hhcmVkL2VtYWlsLWNvbXBvc2VyLWFic3RyYWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUk5RixNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQXVCO0lBQ2hELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsTUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDO0lBQzFCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTztRQUNILGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsSUFBWTtJQUM5QjtnRUFDNEQ7SUFDNUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRCxNQUFNLFlBQVksR0FBRyxzSUFBc0ksQ0FBQztBQUU1Sjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxTQUFpQjtJQUN6Qzs7TUFFRTtJQUNGLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLEtBQXNCLENBQUM7SUFDM0IsT0FBTyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN6QyxJQUFJLE9BQWUsQ0FBQztRQUNwQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDNUQ7YUFDSTtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekI7UUFDRCxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDMUM7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQUMsU0FBaUI7SUFDN0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksS0FBc0IsQ0FBQztJQUMzQixPQUFPLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBT0QsTUFBTSxDQUFOLElBQVksYUFPWDtBQVBELFdBQVksYUFBYTtJQUNyQixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtJQUNSLHVEQUFXLENBQUE7SUFDWCx1REFBVyxDQUFBO0lBQ1gsdURBQVcsQ0FBQTtJQUNYLG1EQUFTLENBQUE7QUFDYixDQUFDLEVBUFcsYUFBYSxLQUFiLGFBQWEsUUFPeEI7QUFrQkQsTUFBTSxPQUFnQiwwQkFBMEI7SUFvQzVDO1FBdEJBLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFFakQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO1FBUTNDLGVBQVUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLGtCQUFhLEdBQUc7WUFDbkIsY0FBYyxFQUFFLDRCQUE0QjtTQUMvQyxDQUFDO1FBU0UsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQ2hGLENBQUM7SUFFTSxXQUFXLENBQUMsR0FBUTtRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0saUJBQWlCO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNO1FBQ1QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBRXZCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBc0I7WUFDL0IsU0FBUyxFQUFFLElBQUk7WUFDZixjQUFjLEVBQUUsTUFBTTtZQUN0QixTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2hDLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxpQ0FBaUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLHlDQUF5QyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFFekIsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyx1QkFBdUIsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDekUsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxlQUFlLENBQUMsR0FBUTtRQUUzQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUN0RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXRCLDRDQUE0QztRQUM1QywrQ0FBK0M7UUFDL0MsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckMsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztvR0FsSWlCLDBCQUEwQjs2RUFBMUIsMEJBQTBCOzs7Ozs7Ozt1RkFBMUIsMEJBQTBCO2NBRC9DLFNBQVM7c0NBR3NCLGFBQWE7a0JBQXhDLFNBQVM7bUJBQUMsZUFBZTtZQUNGLFNBQVM7a0JBQWhDLFNBQVM7bUJBQUMsV0FBVztZQUdmLFlBQVk7a0JBRGxCLEtBQUs7WUFHQyxXQUFXO2tCQURqQixLQUFLO1lBR04sc0JBQXNCO2tCQURyQixLQUFLO1lBR04sTUFBTTtrQkFETCxLQUFLO1lBR04sWUFBWTtrQkFEWCxNQUFNO1lBR1AsUUFBUTtrQkFEUCxNQUFNO1lBR1AsTUFBTTtrQkFETCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICduZ3gtY2hpcHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZEVtYWlsKGNvbnRyb2w6IHsgdmFsdWU6IGFueSB9KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgIGNvbnN0IHJlID0gL1xcUytAXFxTK1xcLlxcUysvO1xuICAgIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6IHRydWVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5X25hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgLyogUmVtb3ZlIGFsbCBxdW90ZXMgXG4gICAgICAgUmVtb3ZlIHdoaXRlc3BhY2UsIGJyYWNrZXRzLCBhbmQgY29tbWFzIGZyb20gdGhlIGVuZHMuICovXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKF5bXFxzLD5dKyl8XCJ8KFtcXHMsPF0rJCkvZywgJycpO1xufVxuXG5jb25zdCBFbWFpbFBhdHRlcm4gPSAvW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKi9nO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMgbGlrZSB1c2VyPHVzZXJAZ21haWwuY29tPlxuICogQHBhcmFtIGFkZHJfbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICAvKiBSZWdleCBzb3VyY2U6XG4gICAgICAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjdmFsaWQtZS1tYWlsLWFkZHJlc3NcbiAgICAqL1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgbGV0IGRpc3BsYXk6IHN0cmluZztcbiAgICAgICAgaWYgKGRpc3BsYXkgPSBkaXNwbGF5X25hbWUoYWRkcl9saXN0LnN1YnN0cmluZyhpZHgsIG1hdGNoWydpbmRleCddKSkpIHtcbiAgICAgICAgICAgIGVtYWlscy5wdXNoKCdcIicgKyBkaXNwbGF5ICsgJ1wiICcgKyAnPCcgKyBtYXRjaFswXSArICc+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaChtYXRjaFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ID0gbWF0Y2hbJ2luZGV4J10gKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBlbWFpbHM7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhIGxpc3Qgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMganVzdCBhbiBlbWFpbC5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT25seUVtYWlscyhhZGRyX2xpc3Q6IHN0cmluZykge1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvQ29tcGxldGVNb2RlbCB7XG4gICAgdmFsdWU6IGFueTtcbiAgICBkaXNwbGF5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEFsZXJ0VHlwZUVudW0ge1xuICAgIG5vbmUgPSAwLFxuICAgIGluZm8gPSAxLFxuICAgIHdhcm5pbmcgPSAyLFxuICAgIHJ1bm5pbmcgPSAzLFxuICAgIHN1Y2Nlc3MgPSA0LFxuICAgIGVycm9yID0gNVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbWFpbFNlbmRlcklucHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVtYWlsQ29tcG9zZXJJbnB1dCB7XG4gICAgbWVzc2FnZVRpdGxlPzogc3RyaW5nO1xuICAgIG1lc3NhZ2VCb2R5Pzogc3RyaW5nO1xuICAgIGF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM6IE9ic2VydmFibGU8QXJyYXk8SUF1dG9Db21wbGV0ZU1vZGVsPj47XG4gICAgZW1haWxzPzogQXJyYXk8YW55Pjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW1haWxGb3JtQWJzdHJhY3RDb21wb25lbnQge1xuXG4gICAgQFZpZXdDaGlsZCgnZW1haWxJbnB1dEJveCcpIGVtYWlsSW5wdXRCb3g6IFRhZ0lucHV0Q29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoJ2VtYWlsQm9keScpIGVtYWlsQm9keTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lc3NhZ2VUaXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lc3NhZ2VCb2R5OiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBhdXRvY29tcGxldGVJdGVtc0FzeW5jOiBPYnNlcnZhYmxlPEFycmF5PElBdXRvQ29tcGxldGVNb2RlbD4+O1xuICAgIEBJbnB1dCgpXG4gICAgc2VuZGVyOiAoYTogSUVtYWlsU2VuZGVySW5wdXQpID0+IFByb21pc2U8YW55PjtcbiAgICBAT3V0cHV0KClcbiAgICBvblRleHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpXG4gICAgb25TdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPElFbWFpbFNlbmRlcklucHV0PigpO1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VudCA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdWNjZXNzOiBib29sZWFuIH0+KCk7XG5cbiAgICBhbGVydE1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFN1Yk1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFR5cGU6IEFsZXJ0VHlwZUVudW07XG4gICAgYWxlcnREaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBlbWFpbHM6IEFycmF5PGFueT47XG4gICAgcHVibGljIHZhbGlkYXRvcnMgPSBbaXNWYWxpZEVtYWlsXTtcbiAgICBwdWJsaWMgZXJyb3JNZXNzYWdlcyA9IHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6ICdQbGVhc2UgaW5wdXQgYSB2YWxpZCBlbWFpbCdcbiAgICB9O1xuXG4gICAgLy8gQ29udHJvbCBvdmVyIHRoZSBjbG9zZSBidXR0b25cbiAgICBwdWJsaWMgc2hvd0Nsb3NlQnRuOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBkaXNhYmxlRm9jdXNFdmVudDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMubWVzc2FnZVRpdGxlID0gJyc7XG4gICAgICAgIHRoaXMuZW1haWxzID0gW107XG4gICAgICAgIHRoaXMubWVzc2FnZUJvZHkgPSAnJztcblxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1N1Ym1pdERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWFpbHMubGVuZ3RoID09PSAwIHx8IHRoaXMuYWxlcnRUeXBlID09PSBBbGVydFR5cGVFbnVtLnJ1bm5pbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHRleHRDaGFuZ2VkKGV2dDogYW55KSB7XG4gICAgICAgIHRoaXMuc2hvd0Nsb3NlQnRuID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQoZXZ0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3RoZXJGaWVsZENoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0Nsb3NlQnRuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdCgpIHtcbiAgICAgICAgY29uc3QgZW1haWxzID0gW107XG5cbiAgICAgICAgdGhpcy5lbWFpbHMuZm9yRWFjaChlbGVtID0+IHtcblxuICAgICAgICAgICAgbGV0IHggPSBlbGVtIHx8IChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZU9ubHlFbWFpbHMoeCk7XG4gICAgICAgICAgICB5LmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICAgICAgZW1haWxzLnB1c2gobSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0czogSUVtYWlsU2VuZGVySW5wdXQgPSB7XG4gICAgICAgICAgICBjb25maXJtZWQ6IHRydWUsXG4gICAgICAgICAgICBlbWFpbFJlY2VpdmVyczogZW1haWxzLFxuICAgICAgICAgICAgZW1haWxCb2R5OiB0aGlzLm1lc3NhZ2VCb2R5LFxuICAgICAgICAgICAgZW1haWxUaXRsZTogdGhpcy5tZXNzYWdlVGl0bGVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5zZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnVGhlIGVtYWlsIGlzIGJlaW5nIHNlbnQgb3V0IC4uLic7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuc2VuZGVyKG91dHB1dHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5pbmZvO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ0VtYWlscyBoYXZlIGJlZW4gc3VjY2Vzc2Z1bGx5IHNlbnQgb3V0Lic7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDbG9zZUJ0biA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VudCAmJiB0aGlzLm9uU2VudC5lbWl0KHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5lcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICdTb21ldGhpbmcgd2VudCB3cm9uZy4nO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3JJbmZvKSA/IGVycm9yLmVycm9ySW5mbyA6ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZW50ICYmIHRoaXMub25TZW50LmVtaXQoeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblN1Ym1pdCAmJiB0aGlzLm9uU3VibWl0LmVtaXQob3V0cHV0cyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uT3V0T2ZUYWdJbnB1dChldnQ6IGFueSkge1xuXG4gICAgICAgIGlmICh0aGlzLmVtYWlsSW5wdXRCb3guZHJvcGRvd24gJiYgdGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gQSB0ZW1wb3J5IGhhY2sgZm9yIGZpeGluZyB0aGUgZm9jdXMgaXNzdWVcbiAgICAgICAgLy8gb24gaW52b2tpbmcgdGhlIG9uQWRkaW5nUmVxdWVzdGVkIG1ldGhvZCAuLi5cbiAgICAgICAgY29uc3QgZW1haWxzID0gcGFyc2VFbWFpbHModGhpcy5lbWFpbElucHV0Qm94LmZvcm1WYWx1ZSk7XG5cbiAgICAgICAgZW1haWxzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtYWlscy5wdXNoKHYpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVtYWlsSW5wdXRCb3guc2V0SW5wdXRWYWx1ZSgnJyk7XG5cbiAgICAgICAgLy8gSnVtcCB0byBvdGhlciBwbGFjZVxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWFpbEJvZHkubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==