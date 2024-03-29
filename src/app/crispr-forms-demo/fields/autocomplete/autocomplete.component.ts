import { Component } from '@angular/core';
import { FormConfig, ControlType, SelectOption } from '@tft/crispr-forms';
import { FormGroup, Validators } from '@angular/forms';
import { EndpointsService, ENDPOINTS } from '../../endpoints.service';


@Component({
  selector: 'doc-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  arraySelectInitialValue = {
    groupList: [
      {
        selectField: 'a',
        autocompleteField: {label: 'option a', value: {id:'a', description: 'some things a'}},
      }
    ]
  };
  arraySelectConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.AUTOCOMPLETE,
        label: 'This autocomplete field uses a simple array of options',
        controlName: 'autocompleteField',
        options: (_group, searchTerm) => [
          {label: 'option a', value: 'a'},
          {label: 'option b', value: 'b'},
          {label: 'option c', value: 'c'},
        ].filter(option => option.label.includes(searchTerm)),
        validators: [Validators.required]
      },
      {
        controlType: ControlType.GROUP_LIST,
        controlName: 'groupList',
        minListLength: 0,
        displayInitialItem: true,
        itemLabelBuilder: (i) => `${i + 1}) item`,
        heading: {
          label: 'Group List',
          typographyClass: 'mat-h2'
        },
        addButtonLabel: 'ADD ITEM',
        addButtonColor: 'primary',
        itemConfig: {
          controlName: 'groupListItem',
          controlType: ControlType.SUB_GROUP,
          fields: [
            {
              controlType: ControlType.AUTOCOMPLETE,
              controlName: 'autocompleteField',
              label: 'This autocomplete field is part of a group list',
              options: (_group, searchTerm) => [
                {label: 'option a', value: {id:'a', description: 'some things a'}},
                {label: 'option b', value: {id:'b', description: 'some things b'}},
                {label: 'option c', value: {id:'c', description: 'some things c'}},
              ].filter(option => option.label.includes(searchTerm)),
            },
          ]
        },
      },
      {
        controlType: ControlType.BUTTON,
        label: 'SUBMIT',
        type: 'submit'
      }
    ]
  }

  promiseSelectConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.AUTOCOMPLETE,
        label: 'This autocomplete field uses a function that returns a promise to resolve options',
        controlName: 'selectFieldPromise',
        options: async (_group, searchString): Promise<SelectOption[]> => {
          const res = await fetch(`${ENDPOINTS['reddit'].url}${searchString}`);
          const redditRes = await res.json();
          return ENDPOINTS['reddit'].mappingCallback(redditRes);
        },
      },
    ]
  }

  observableSelectConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.AUTOCOMPLETE,
        label: 'This select field uses an observable to resolve options',
        controlName: 'selectFieldObservable',
        options: (_group, searchTerm) => {
          return this.endpointsService.searchEndpointForOptions(searchTerm, 'reddit')
        },
      }
    ]
  }

  reactiveOptionsConfig: FormConfig = {
    fields: [
      {
        controlType: ControlType.SELECT,
        label: 'This select field drives the options of the following select field',
        controlName: 'optionsDriver',
        options: [
          {label: 'OpenFarm Plants', value: 'openFarm'},
          {label: 'Reddit Titles', value: 'reddit'},
        ]
      },
      {
        controlType: ControlType.AUTOCOMPLETE,
        label: 'This select field uses an observable to resolve options',
        controlName: 'selectFieldObservable',
        options: (group, searchText) => {
          const databaseKey: string = group.get('optionsDriver').value || 'openFarm';
          return this.endpointsService.searchEndpointForOptions(searchText, databaseKey)
        },
      },
      {
        controlType: ControlType.BUTTON,
        label: 'SUBMIT',
        buttonType: 'flat'
      }
    ]
  }
  constructor(
    private endpointsService: EndpointsService
  ) { }

  handleSubmit(form: FormGroup) {
    console.log({value: form.value})
  }

}
