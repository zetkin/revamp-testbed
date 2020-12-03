import React, { useState, useRef } from 'react';
import {CommandBarButton, DefaultButton, Link, PrimaryButton, Stack, Text} from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
import { people } from '@uifabric/example-data';
import { Card } from '@uifabric/react-cards';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Persona, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const FluentUI = props => {
  console.log(props.data);
  return (
    <>
      <Action data={props.data}/>
      <EditAction data={props.data}/>
      <Person data={props.data}/>
      <EditPerson data={props.data}/>
    </>
)}

export default FluentUI;

const Action = props => {
  const duration = props.data.action.start_time.slice(11, 16) + '–' +  props.data.action.end_time.slice(11, 16);
  const name = props.data.person.first_name + ' ' + props.data.person.last_name

  const [currentSelectedItems, setCurrentSelectedItems] = useState([]);
  const [delayResults, setDelayResults] = useState(false);
  const [isPickerDisabled, setIsPickerDisabled] = useState(false);
  const [peopleList] = useState(people);

  const suggestionProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts',
  };  

  const picker = useRef(null);

  const onFilterChanged = (filterText, currentPersonas, limitResults) => {
    if (filterText) {
      let filteredPersonas = filterPersonasByText(filterText);
      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.slice(0, limitResults) : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const filterPersonasByText = (filterText) => {
    return peopleList.filter(item => doesTextStartWith(item.text, filterText));
  };

  const filterPromise = (personasToReturn) => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  const onItemsChange = (items) => {
    setCurrentSelectedItems(items);
  };

  const controlledItems = [];
  for (let i = 0; i < 5; i++) {
    const item = peopleList[i];
    if (currentSelectedItems.indexOf(item) === -1) {
      controlledItems.push(peopleList[i]);
    }
  }

  return (
    <>
      <Stack gap={20} padding={20}>
        <Stack.Item>
          <Text variant={'xxLarge'}>Action: {props.data.action.activity.title}</Text>
        </Stack.Item>
        <Stack.Item horizontal={true}>
          <Icon iconName='Snow' />
          <Text>
            {props.data.action.info_text}
          </Text>
        </Stack.Item>
        <Stack.Item horizontal={true}>
          <Icon iconName='Snow' />
          <Text>
            {props.data.action.start_time.slice(0, 20)}
          </Text>
        </Stack.Item>
        <Stack.Item horizontal={true}>
          <Icon iconName='Snow' />
          <Text>
            {duration}
          </Text>
        </Stack.Item>
        <Stack.Item horizontal={true}>
          <Link>
            Edit action
          </Link>
        </Stack.Item>
      </Stack>
      <Stack padding={20} horizontalAlign='space-between' horizontal={true}>
        <Stack.Item horizontal={true}>
          <Icon iconName='Snow' />
          <Text variant={'xLarge'}>
            Sign-ups
          </Text>
        </Stack.Item>
        <Stack.Item>
          <Icon iconName='Snow' />
          <Text variant={'medium'}>
            Click in list to book
          </Text>
        </Stack.Item>
      </Stack>
      <Stack padding={20} gap={20}>
        <Stack.Item horizontal={true}>
          <Icon iconName='Snow' />
          <Text variant={'xLarge'}>
            Contact person
          </Text>
        </Stack.Item>
        <Stack.Item>
          <Card aria-label='Basic vertical card'>
            <Card.Item>
              <Persona
                initialsColor={PersonaInitialsColor.green}
                text={name}
                /* imageAlt='Green circle with the letter G in white text at the center' */
              />
              <Text>
                Drop another person here or select one to change
              </Text>
            </Card.Item>
          </Card>
        </Stack.Item>
      </Stack>
      <Stack gap={20} padding={20}>
        <Stack.Item horizontal={true}>
          <Icon iconName='Snow' />
          <Text variant={'xLarge'}>
            Booked participants
          </Text>
        </Stack.Item>  
        <Stack.Item>
          <NormalPeoplePicker
            // eslint-disable-next-line react/jsx-no-bind
            onResolveSuggestions={onFilterChanged}
            getTextFromItem={getTextFromItem}
            pickerSuggestionsProps={suggestionProps}
            className={'ms-PeoplePicker'}
            key={'controlled'}
            selectedItems={currentSelectedItems}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onItemsChange}
            inputProps={{
              onBlur: (ev) => console.log('onBlur called'),
              onFocus: (ev) => console.log('onFocus called'),
            }}
            componentRef={picker}
            resolveDelay={300}
            disabled={isPickerDisabled}
          />
        </Stack.Item>
      </Stack>
    </>
  )};

function doesTextStartWith(text, filterText) {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(personas, possibleDupes) {
  return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
}

function listContainsPersona(persona, personas) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter(item => item.text === persona.text).length > 0;
}

function convertResultsToPromise(results) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(results), 2000));
}

function getTextFromItem(persona) {
  return persona.text;
}

const EditAction = props => {
  const dropdownStyles = {
    dropdown: { width: 300 },
  };
  
  const options = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' },
  ];

  const DayPickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    shortDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S',],

    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',
    monthPickerHeaderAriaLabel: '{0}, select to change the year',
    yearPickerHeaderAriaLabel: '{0}, select to change the month',
  };

  const controlClass = ({
    control: {
      margin: '0 0 15px 0',
      maxWidth: '300px',
    },
  });

  const deleteIcon = { iconName: 'Delete' };

  return (
    <>
      <Stack gap={20} padding={20}>
        <Stack.Item>
          <Text variant={'xxLarge'}>
            Edit action
          </Text>
        </Stack.Item>
        <Stack.Item>
          <Dropdown
            placeholder='Select campaign'
            label='Campaign'
            /* defaultSelectedKeys={['apple', 'banana', 'grape']} */
            multiSelect
            options={options}
            styles={dropdownStyles}
          />
        </Stack.Item> 
        <Stack.Item>
          <DatePicker
            className={controlClass.control}
            label='Date'
            /* firstDayOfWeek={firstDayOfWeek} */
            strings={DayPickerStrings}
            showWeekNumbers={true}
            firstWeekOfYear={1}
            showMonthPickerAsOverlay={true}
            placeholder='Select a date...'
            ariaLabel='Select a date'
          />
        </Stack.Item>  
        <Stack.Item>
          <Text>
            No timepicker
          </Text>
        </Stack.Item>
        <Stack.Item>
          <TextField label='Minimum number of participants' />
        </Stack.Item>
        <Stack.Item>
          <Dropdown
            placeholder='Select an option'
            label='Basic uncontrolled example'
            options={options}
            styles={dropdownStyles}
          />
        </Stack.Item>
        <Stack.Item>
          <TextField label='Standard' multiline rows={3} />
        </Stack.Item>
      </Stack>
      <Stack gap={20} padding={20}>
        <Stack.Item>
          <CommandBarButton 
            text='Delete'
            iconProps={deleteIcon}
            /* onClick={_alertClicked} */ 
            /* allowDisabledFocus disabled={disabled}  */
            /* checked={checked}  */
          />
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton 
            text='Save' 
            /* onClick={_alertClicked} */ 
            /* allowDisabledFocus disabled={disabled} */ 
            /* checked={checked}  */
          />
        </Stack.Item>
      </Stack>
    </>
  )};

  const Person = props => {
    const personaWithInitials = {
      text: '',
      imageInitials: 'RS',
    };
    const addIcon = { iconName: 'Add' };
  
    return (
      <>
        <Stack gap={20} padding={20}>
          <Stack.Item>
            <Text variant={'xxLarge'}>
              {props.data.person.first_name} 
              {props.data.person.last_name}
            </Text>
          </Stack.Item>
          <Stack.Item>
            <Persona
              {...personaWithInitials}
            />
          </Stack.Item>
          <Stack.Item horizontal={true}>
            <Icon iconName='Snow' />
            <Text>
              Connected to Zetkin account
            </Text>
          </Stack.Item>
          <Stack.Item horizontal={true}>
            <Icon iconName='Snow' />
            <Text>
              {props.data.person.email} 
            </Text>
          </Stack.Item>
          <Stack.Item horizontal={true}>
            <Icon iconName='Snow' />
            <Text>
              {props.data.person.phone}
            </Text>
          </Stack.Item>
          <Stack.Item horizontal={true}>
            <Link>
              Edit personal data
            </Link>
          </Stack.Item>
        </Stack>
        <Stack padding={20}>
          <Stack.Item horizontal={true}>
            <Icon iconName='Snow' />
            <Text variant={'xLarge'}>
              Tags
            </Text>
          </Stack.Item>
        </Stack> 
        <Stack verticalAlign='center' horizontal={true} gap={20} padding={20}>
          <Stack.Item>
            <Text>
              No tag component
            </Text>
          </Stack.Item>
          <Stack.Item>
            <CommandBarButton 
              text='Add tag'
              iconProps={addIcon}
              /* onClick={_alertClicked} */ 
              /* allowDisabledFocus disabled={disabled}  */
              /* checked={checked}  */
              />
          </Stack.Item>
        </Stack>
      </>
    )};

const EditPerson = props => {
  const dropdownStyles = {
    dropdown: { width: 300 },
  };
  
  const options = [
    { key: 'female', text: 'Female' },
    { key: 'male', text: 'Male' },
    { key: 'non-binary', text: 'Non-binary' },
  ];

  const controlClass = ({
    control: {
      margin: '0 0 15px 0',
      maxWidth: '300px',
    },
  });

  return (
    <>
      <Stack gap={20} padding={20}>
        <Stack.Item>
          <Text variant={'xxLarge'}>
            {props.data.person.first_name} 
            {props.data.person.last_name}
          </Text>
        </Stack.Item>
        <Stack.Item>
          <TextField label='External ID' />
        </Stack.Item> 
        <Stack.Item>
          <Dropdown
            placeholder='Select an option'
            label='Basic uncontrolled example'
            options={options}
            styles={dropdownStyles}
          />
        </Stack.Item>
      </Stack>
      <Stack gap={20} padding={20}>
        <Stack.Item>
          <PrimaryButton 
            text='Save' 
            /* onClick={_alertClicked} */ 
            /* allowDisabledFocus disabled={disabled} */ 
            /* checked={checked}  */
          />
        </Stack.Item>
      </Stack>
    </>
  )};