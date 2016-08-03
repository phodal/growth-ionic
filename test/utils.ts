'use strict';

import { AbstractControl } from '@angular/common';

export class Utils {

  public static promiseCatchHandler(err: Error): void {
    console.error('ERROR - An error has occurred inside a promise! ' + err);
    // throw the error out to the console - http://stackoverflow.com/a/30741722
    setTimeout(function(): void { throw err; });
  }

  // bit of a hack here to reset the validation / state on the control as well as the value
  // expecting a Control.reset() method to do this but there doesn't seem to be one
  // http://stackoverflow.com/questions/33084280/how-to-reset-control-value
  public static resetControl(control: AbstractControl): AbstractControl {
    control['updateValue']('');
    control['_touched'] = false;
    control['_untouched'] = true;
    control['_pristine'] = true;
    control['_dirty'] = false;
    // control.setErrors(null);
    return control;
  }
}
