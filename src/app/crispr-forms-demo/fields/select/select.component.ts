import { Component, OnInit } from '@angular/core';
import { FormConfig, SelectOption, ControlType } from '@tft/crispr-forms';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EndpointsService } from '../../endpoints.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'doc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  multiSelectInitialValue = {
    initialValueMultiSelectField: [
      'a', 'b', 'c'
    ]
  }
  selectConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.SELECT,
        label: 'This select field uses a simple array of options',
        controlName: 'selectField',
        options: [
          {label: 'option a', value: 'a'},
          {label: 'option b', value: 'b'},
          {label: 'option c', value: 'c'},
        ]
      },
      {
        controlType: ControlType.SELECT,
        label: 'This select field uses a simple array of options',
        controlName: 'multiSelectField',
        multiple: true,
        options: [
          {label: 'option a', value: 'a'},
          {label: 'option b', value: 'b'},
          {label: 'option c', value: 'c'},
        ]
      },
      {
        controlType: ControlType.SELECT,
        label: 'This select field uses a simple array of options',
        controlName: 'initialValueMultiSelectField',
        multiple: true,
        enableToggleAll: true,
        options: [
          {label: 'option a', value: 'a'},
          {label: 'option b', value: 'b'},
          {label: 'option c', value: 'c'},
        ]
      },
      {
        controlType: ControlType.BUTTON,
        label: 'Submit'
      }
    ]
  }

  promiseSelectConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.SELECT,
        label: 'This select field uses a function that returns a promise to resolve options',
        controlName: 'selectFieldPromise',
        // validators: [Validators.required],
        options: (): Promise<SelectOption[]> => {
          return new Promise( (resolve, reject) => {
            // make an http request here
            setTimeout( () => {
              resolve([
                {label: 'option a', value: 'a'},
                {label: 'option b', value: 'b'},
                {label: 'option c', value: 'c'},
              ]);
            }, 5000);
          });
        }
      },
    ]
  }

  observableSelectConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.HEADING,
        label: 'Here we use an input put to search for plants that are available as options for the select field below',
        typographyClass: 'mat-h2'
      },
      {
        controlType: ControlType.INPUT,
        inputType: 'text',
        controlName: 'multiSelectDriver',
        label: 'Search for garden plants',
        placeholder: 'Search for garden plants',
      },
      {
        controlType: ControlType.SELECT,
        label: 'Results',
        placeholder: 'Searched plants available as options here',
        controlName: 'multiSelectField',
        multiple:true,
        info: {
          content: 'The result of the plant search above are displayed here'
        },
        options: (group) => {
          return group.get('multiSelectDriver').valueChanges.pipe(
            switchMap((searchText: string) => {
              return this.endpointsService.searchEndpointForOptions(searchText, 'openFarm')
            })
          )
        },
      },
    ]
  }

  reactiveOptionsConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.SELECT,
        label: 'This select field drives the options of the following select field',
        controlName: 'optionsDriver',
        options: [
          {label: 'Display options set a', value: 'a'},
          {label: 'Display options set b', value: 'b'}
        ]
      },
      {
        controlType: ControlType.SELECT,
        label: 'This select field uses an observable to resolve options',
        controlName: 'selectFieldObservable',
        options: (group) => {
          return group.get('optionsDriver').valueChanges.pipe(
            switchMap( valueOfWatchedControl => {
              if (valueOfWatchedControl === 'a') {
                // this could easily be an httpClient get request
                return of([
                  { label: 'a1', value: 'a1'},
                  { label: 'a2', value: 'a2'}
                ]);
              } else {
                return of([
                  { label: 'b1', value: 'b1'},
                  { label: 'b2', value: 'b2'}
                ]);
              }
            })
          )
        },
      }
    ]
  }

  constructor(
    private endpointsService: EndpointsService
  ) { }

  ngOnInit() {
  }

  handleSubmit(form: FormGroup) {
    console.log({form})
  }

}
