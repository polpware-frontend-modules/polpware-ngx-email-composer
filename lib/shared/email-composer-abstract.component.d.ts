import { ElementRef } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
import * as i0 from "@angular/core";
declare function isValidEmail(control: {
    value: any;
}): {
    isValidEmail: boolean;
};
/**
 * Parses the given string into an array of email entries.
 * Each entry is like user<user@gmail.com>
 * @param addr_list
 */
export declare function parseEmails(addr_list: string): any[];
/**
 * Parses the given string into a list of email entries.
 * Each entry is just an email.
 * @param addr_list
 */
export declare function parseOnlyEmails(addr_list: string): any[];
export declare abstract class EmailFormAbstractComponent {
    emailInputBox: TagInputComponent;
    emailBody: ElementRef;
    title: string;
    messageBody: string;
    emails: Array<any>;
    validators: (typeof isValidEmail)[];
    errorMessages: {
        isValidEmail: string;
    };
    private disableFocusEvent;
    constructor();
    get isSubmitDisabled(): boolean;
    abstract onSubmit(): void;
    onOutOfTagInput(evt: any): void;
    static ɵfac: i0.ɵɵFactoryDef<EmailFormAbstractComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<EmailFormAbstractComponent, never, never, {}, {}, never>;
}
export {};
