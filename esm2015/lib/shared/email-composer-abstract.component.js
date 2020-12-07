import { ElementRef, ViewChild } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
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
export class EmailFormAbstractComponent {
    constructor() {
        this.validators = [isValidEmail];
        this.errorMessages = {
            'isValidEmail': 'Please input a valid email'
        };
        this.title = 'Send out an email';
        this.emails = [];
        this.messageBody = '';
        this.disableFocusEvent = false;
    }
    get isSubmitDisabled() {
        return this.emails.length === 0;
    }
    onOutOfTagInput(evt) {
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
    } } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1lbWFpbC1jb21wb3Nlci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZW1haWwtY29tcG9zZXItYWJzdHJhY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7OztBQUU5QyxTQUFTLFlBQVksQ0FBQyxPQUF1QjtJQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLE1BQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQztJQUMxQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU87UUFDSCxjQUFjLEVBQUUsSUFBSTtLQUN2QixDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQVk7SUFDOUI7Z0VBQzREO0lBQzVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQsTUFBTSxZQUFZLEdBQUcsc0lBQXNJLENBQUM7QUFFNUo7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsU0FBaUI7SUFDekM7O01BRUU7SUFDRixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSSxLQUFzQixDQUFDO0lBQzNCLE9BQU8sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDekMsSUFBSSxPQUFlLENBQUM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO2FBQ0k7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQzFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLFNBQWlCO0lBQzdDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLEtBQXNCLENBQUM7SUFDM0IsT0FBTyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sT0FBZ0IsMEJBQTBCO0lBaUI1QztRQVBPLGVBQVUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLGtCQUFhLEdBQUc7WUFDbkIsY0FBYyxFQUFFLDRCQUE0QjtTQUMvQyxDQUFDO1FBTUUsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBSU0sZUFBZSxDQUFDLEdBQVE7UUFFM0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV0Qiw0Q0FBNEM7UUFDNUMsK0NBQStDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7b0dBeERpQiwwQkFBMEI7K0RBQTFCLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICduZ3gtY2hpcHMnO1xuXG5mdW5jdGlvbiBpc1ZhbGlkRW1haWwoY29udHJvbDogeyB2YWx1ZTogYW55IH0pIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgY29uc3QgcmUgPSAvXFxTK0BcXFMrXFwuXFxTKy87XG4gICAgaWYgKHJlLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICAnaXNWYWxpZEVtYWlsJzogdHJ1ZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlfbmFtZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAvKiBSZW1vdmUgYWxsIHF1b3RlcyBcbiAgICAgICBSZW1vdmUgd2hpdGVzcGFjZSwgYnJhY2tldHMsIGFuZCBjb21tYXMgZnJvbSB0aGUgZW5kcy4gKi9cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC8oXltcXHMsPl0rKXxcInwoW1xccyw8XSskKS9nLCAnJyk7XG59XG5cbmNvbnN0IEVtYWlsUGF0dGVybiA9IC9bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqL2c7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBlbWFpbCBlbnRyaWVzLlxuICogRWFjaCBlbnRyeSBpcyBsaWtlIHVzZXI8dXNlckBnbWFpbC5jb20+XG4gKiBAcGFyYW0gYWRkcl9saXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVtYWlscyhhZGRyX2xpc3Q6IHN0cmluZykge1xuICAgIC8qIFJlZ2V4IHNvdXJjZTpcbiAgICAgICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCN2YWxpZC1lLW1haWwtYWRkcmVzc1xuICAgICovXG4gICAgY29uc3QgZW1haWxzID0gW107XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXk7XG4gICAgd2hpbGUgKG1hdGNoID0gRW1haWxQYXR0ZXJuLmV4ZWMoYWRkcl9saXN0KSkge1xuICAgICAgICBsZXQgZGlzcGxheTogc3RyaW5nO1xuICAgICAgICBpZiAoZGlzcGxheSA9IGRpc3BsYXlfbmFtZShhZGRyX2xpc3Quc3Vic3RyaW5nKGlkeCwgbWF0Y2hbJ2luZGV4J10pKSkge1xuICAgICAgICAgICAgZW1haWxzLnB1c2goJ1wiJyArIGRpc3BsYXkgKyAnXCIgJyArICc8JyArIG1hdGNoWzBdICsgJz4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVtYWlscy5wdXNoKG1hdGNoWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZHggPSBtYXRjaFsnaW5kZXgnXSArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGVtYWlscztcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGEgbGlzdCBvZiBlbWFpbCBlbnRyaWVzLlxuICogRWFjaCBlbnRyeSBpcyBqdXN0IGFuIGVtYWlsLlxuICogQHBhcmFtIGFkZHJfbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VPbmx5RW1haWxzKGFkZHJfbGlzdDogc3RyaW5nKSB7XG4gICAgY29uc3QgZW1haWxzID0gW107XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXk7XG4gICAgd2hpbGUgKG1hdGNoID0gRW1haWxQYXR0ZXJuLmV4ZWMoYWRkcl9saXN0KSkge1xuICAgICAgICBlbWFpbHMucHVzaChtYXRjaFswXSk7XG4gICAgfVxuICAgIHJldHVybiBlbWFpbHM7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBAVmlld0NoaWxkKCdlbWFpbElucHV0Qm94JykgZW1haWxJbnB1dEJveDogVGFnSW5wdXRDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZCgnZW1haWxCb2R5JykgZW1haWxCb2R5OiBFbGVtZW50UmVmO1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgbWVzc2FnZUJvZHk6IHN0cmluZztcblxuICAgIHB1YmxpYyBlbWFpbHM6IEFycmF5PGFueT47XG4gICAgcHVibGljIHZhbGlkYXRvcnMgPSBbaXNWYWxpZEVtYWlsXTtcbiAgICBwdWJsaWMgZXJyb3JNZXNzYWdlcyA9IHtcbiAgICAgICAgJ2lzVmFsaWRFbWFpbCc6ICdQbGVhc2UgaW5wdXQgYSB2YWxpZCBlbWFpbCdcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkaXNhYmxlRm9jdXNFdmVudDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMudGl0bGUgPSAnU2VuZCBvdXQgYW4gZW1haWwnO1xuICAgICAgICB0aGlzLmVtYWlscyA9IFtdO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCb2R5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdWJtaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25TdWJtaXQoKTogdm9pZDtcblxuICAgIHB1YmxpYyBvbk91dE9mVGFnSW5wdXQoZXZ0OiBhbnkpIHtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlRm9jdXNFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBBIHRlbXBvcnkgaGFjayBmb3IgZml4aW5nIHRoZSBmb2N1cyBpc3N1ZVxuICAgICAgICAvLyBvbiBpbnZva2luZyB0aGUgb25BZGRpbmdSZXF1ZXN0ZWQgbWV0aG9kIC4uLlxuICAgICAgICBjb25zdCBlbWFpbHMgPSBwYXJzZUVtYWlscyh0aGlzLmVtYWlsSW5wdXRCb3guZm9ybVZhbHVlKTtcblxuICAgICAgICBlbWFpbHMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1haWxzLnB1c2godik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZW1haWxJbnB1dEJveC5zZXRJbnB1dFZhbHVlKCcnKTtcblxuICAgICAgICAvLyBKdW1wIHRvIG90aGVyIHBsYWNlXG4gICAgICAgIHRoaXMuZGlzYWJsZUZvY3VzRXZlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtYWlsQm9keS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRm9jdXNFdmVudCA9IGZhbHNlO1xuICAgIH1cblxufVxuIl19