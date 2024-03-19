import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<unknown> = (component:MemberEditComponent):boolean => {
  if(component.editForm.dirty) return confirm("Unsaved changes")
  return true;
};
