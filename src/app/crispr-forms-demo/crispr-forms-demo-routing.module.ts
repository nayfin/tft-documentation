import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectComponent, OverviewComponent, ComputedFieldComponent } from './containers';
import { DisabledFieldComponent } from './containers/disabled-field/disabled-field.component';
import { AutocompleteComponent } from './containers/autocomplete/autocomplete.component';
import { InputComponent } from './containers/input/input.component';
import { TextareaComponent } from './containers/textarea/textarea.component';
import { CheckboxComponent } from './containers/checkbox/checkbox.component';
import { SliderComponent } from './containers/slider/slider.component';


const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full'},
  { path: 'overview', component: OverviewComponent},
  { path: 'select', component: SelectComponent},
  { path: 'autocomplete', component: AutocompleteComponent},
  { path: 'input', component: InputComponent},
  { path: 'textarea', component: TextareaComponent},
  { path: 'checkbox', component: CheckboxComponent},
  { path: 'slider', component: SliderComponent},
  { path: 'computed-field', component: ComputedFieldComponent},
  { path: 'disabled-field', component: DisabledFieldComponent},
  { path: '**', redirectTo: 'overview'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisprFormsDemoRoutingModule { }
