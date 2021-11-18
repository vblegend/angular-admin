import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  template: `
    <form class="mb-3">
      <label class="from-label mb-2" for="subject">Subject:</label>
      <input class="form-control" nbInput id="subject" type="text">

      <label class="from-label mb-2 text-label" for="text">Text:</label>
      <textarea class="form-control" nbInput id="text"></textarea>
    </form>
  `,
  styleUrls: ['window-form.component.scss'],
})
export class WindowFormComponent {
  constructor(public windowRef: NbWindowRef) {}

  close() {
    this.windowRef.close();
  }
}
