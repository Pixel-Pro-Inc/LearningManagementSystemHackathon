import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  'ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGJWfFppR2NbfU5xdl9CYVZQQWY/P1ZhSXxRd0VgWX5cdHFQRWZUU0c='
);

if (environment.production) {
  enableProdMode();
}
