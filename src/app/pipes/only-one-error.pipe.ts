import { Pipe, PipeTransform } from "@angular/core";

/*
    Pipes allows manipulation of data in the HTML by 'piping' data into
    a function. Pipes must be declared in app.module just like directives.
*/

/*
    'Pure / Unpure' property determines when the pipe is re-evaluated. Pure is
    only when the data is changed. Unpure is during every change cycle. 
    
    Pure is default.
*/
@Pipe({
    name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {
    transform(allErrors: any, errorsPriority: any[]): any {
        
        if(!allErrors) {
            return null;
        }

        const onlyOneError: any = {};

        // Go through list and find error in order of priority
        for (let error of errorsPriority) {
            if (allErrors[error]) {
                onlyOneError[error] = allErrors[error];
                break;
            }
        }

        return onlyOneError;
    }
}