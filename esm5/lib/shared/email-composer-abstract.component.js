import { ElementRef, ViewChild } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
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
var EmailFormAbstractComponent = /** @class */ (function () {
    function EmailFormAbstractComponent() {
        this.validators = [isValidEmail];
        this.errorMessages = {
            'isValidEmail': 'Please input a valid email'
        };
        this.title = 'Send out an email';
        this.emails = [];
        this.messageBody = '';
        this.disableFocusEvent = false;
    }
    Object.defineProperty(EmailFormAbstractComponent.prototype, "isSubmitDisabled", {
        get: function () {
            return this.emails.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    EmailFormAbstractComponent.prototype.onOutOfTagInput = function (evt) {
        var _this = this;
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
        } } });
    return EmailFormAbstractComponent;
}());
export { EmailFormAbstractComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1lbWFpbC1jb21wb3Nlci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7OztBQUU5QyxTQUFTLFlBQVksQ0FBQyxPQUF1QjtJQUN6QyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLElBQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQztJQUMxQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU87UUFDSCxjQUFjLEVBQUUsSUFBSTtLQUN2QixDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQVk7SUFDOUI7Z0VBQzREO0lBQzVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQsSUFBTSxZQUFZLEdBQUcsc0lBQXNJLENBQUM7QUFFNUo7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsU0FBaUI7SUFDekM7O01BRUU7SUFDRixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSSxLQUFzQixDQUFDO0lBQzNCLE9BQU8sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDekMsSUFBSSxPQUFPLFNBQVEsQ0FBQztRQUNwQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDNUQ7YUFDSTtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekI7UUFDRCxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDMUM7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQUMsU0FBaUI7SUFDN0MsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksS0FBc0IsQ0FBQztJQUMzQixPQUFPLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQ7SUFpQkk7UUFQTyxlQUFVLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixrQkFBYSxHQUFHO1lBQ25CLGNBQWMsRUFBRSw0QkFBNEI7U0FDL0MsQ0FBQztRQU1FLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0JBQVcsd0RBQWdCO2FBQTNCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFJTSxvREFBZSxHQUF0QixVQUF1QixHQUFRO1FBQS9CLGlCQXdCQztRQXRCRyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXRCLDRDQUE0QztRQUM1QywrQ0FBK0M7UUFDL0MsSUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDWixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzt3R0F4RGlCLDBCQUEwQjttRUFBMUIsMEJBQTBCOzs7Ozs7OztxQ0E3RGhEO0NBdUhDLEFBMURELElBMERDO1NBMURxQiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhZ0lucHV0Q29tcG9uZW50IH0gZnJvbSAnbmd4LWNoaXBzJztcblxuZnVuY3Rpb24gaXNWYWxpZEVtYWlsKGNvbnRyb2w6IHsgdmFsdWU6IGFueSB9KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgIGNvbnN0IHJlID0gL1xcUytAXFxTK1xcLlxcUysvO1xuICAgIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6IHRydWVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5X25hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgLyogUmVtb3ZlIGFsbCBxdW90ZXMgXG4gICAgICAgUmVtb3ZlIHdoaXRlc3BhY2UsIGJyYWNrZXRzLCBhbmQgY29tbWFzIGZyb20gdGhlIGVuZHMuICovXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKF5bXFxzLD5dKyl8XCJ8KFtcXHMsPF0rJCkvZywgJycpO1xufVxuXG5jb25zdCBFbWFpbFBhdHRlcm4gPSAvW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKi9nO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMgbGlrZSB1c2VyPHVzZXJAZ21haWwuY29tPlxuICogQHBhcmFtIGFkZHJfbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFbWFpbHMoYWRkcl9saXN0OiBzdHJpbmcpIHtcbiAgICAvKiBSZWdleCBzb3VyY2U6XG4gICAgICAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjdmFsaWQtZS1tYWlsLWFkZHJlc3NcbiAgICAqL1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgbGV0IGRpc3BsYXk6IHN0cmluZztcbiAgICAgICAgaWYgKGRpc3BsYXkgPSBkaXNwbGF5X25hbWUoYWRkcl9saXN0LnN1YnN0cmluZyhpZHgsIG1hdGNoWydpbmRleCddKSkpIHtcbiAgICAgICAgICAgIGVtYWlscy5wdXNoKCdcIicgKyBkaXNwbGF5ICsgJ1wiICcgKyAnPCcgKyBtYXRjaFswXSArICc+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbWFpbHMucHVzaChtYXRjaFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ID0gbWF0Y2hbJ2luZGV4J10gKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBlbWFpbHM7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhIGxpc3Qgb2YgZW1haWwgZW50cmllcy5cbiAqIEVhY2ggZW50cnkgaXMganVzdCBhbiBlbWFpbC5cbiAqIEBwYXJhbSBhZGRyX2xpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT25seUVtYWlscyhhZGRyX2xpc3Q6IHN0cmluZykge1xuICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5O1xuICAgIHdoaWxlIChtYXRjaCA9IEVtYWlsUGF0dGVybi5leGVjKGFkZHJfbGlzdCkpIHtcbiAgICAgICAgZW1haWxzLnB1c2gobWF0Y2hbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZW1haWxzO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW1haWxGb3JtQWJzdHJhY3RDb21wb25lbnQge1xuXG4gICAgQFZpZXdDaGlsZCgnZW1haWxJbnB1dEJveCcpIGVtYWlsSW5wdXRCb3g6IFRhZ0lucHV0Q29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoJ2VtYWlsQm9keScpIGVtYWlsQm9keTogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuXG4gICAgcHVibGljIG1lc3NhZ2VCb2R5OiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZW1haWxzOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyB2YWxpZGF0b3JzID0gW2lzVmFsaWRFbWFpbF07XG4gICAgcHVibGljIGVycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICdpc1ZhbGlkRW1haWwnOiAnUGxlYXNlIGlucHV0IGEgdmFsaWQgZW1haWwnXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGlzYWJsZUZvY3VzRXZlbnQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLnRpdGxlID0gJ1NlbmQgb3V0IGFuIGVtYWlsJztcbiAgICAgICAgdGhpcy5lbWFpbHMgPSBbXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQm9keSA9ICcnO1xuXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzU3VibWl0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlscy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGFic3RyYWN0IG9uU3VibWl0KCk6IHZvaWQ7XG5cbiAgICBwdWJsaWMgb25PdXRPZlRhZ0lucHV0KGV2dDogYW55KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gQSB0ZW1wb3J5IGhhY2sgZm9yIGZpeGluZyB0aGUgZm9jdXMgaXNzdWVcbiAgICAgICAgLy8gb24gaW52b2tpbmcgdGhlIG9uQWRkaW5nUmVxdWVzdGVkIG1ldGhvZCAuLi5cbiAgICAgICAgY29uc3QgZW1haWxzID0gcGFyc2VFbWFpbHModGhpcy5lbWFpbElucHV0Qm94LmZvcm1WYWx1ZSk7XG5cbiAgICAgICAgZW1haWxzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtYWlscy5wdXNoKHYpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVtYWlsSW5wdXRCb3guc2V0SW5wdXRWYWx1ZSgnJyk7XG5cbiAgICAgICAgLy8gSnVtcCB0byBvdGhlciBwbGFjZVxuICAgICAgICB0aGlzLmRpc2FibGVGb2N1c0V2ZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWFpbEJvZHkubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==