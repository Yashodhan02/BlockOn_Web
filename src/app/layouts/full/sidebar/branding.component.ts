import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding text-center" style="
    padding: 20px 20px 0px 20px;">
      <a href="/">
        <img
  
          src="/assets/images/admin/BlockON.png"
          class="align-middle m-2 logo-new"style="width: 25%;"
          alt="logo"
        />
      </a>
         
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
