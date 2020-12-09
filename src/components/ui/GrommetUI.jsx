import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Anchor,
    Avatar,
    Box,
    Button,
    Card,
    Collapsible,
    DateInput,
    Heading,
    Grommet,
    Keyboard,
    Layer,
    List,
    MaskedInput,
    ResponsiveContext,
    Select,
    Text,
    TextInput,
    TextArea
} from 'grommet';
import { Actions, Cube, FormClose, Notification, StatusInfo, Trash } from 'grommet-icons';

const theme = {
    global: {
        colors: {
            brand: '#228BE6',
        },
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

const SaveButton = styled(Button)`
    width: calc(100% - 2rem);
    margin: 1rem;
    padding: 1rem;
    border-radius: 2px;
    border: 0;
    color: white;
`;

const DeleteButton = styled(SaveButton)`
    width: 400px;
    padding: 1rem;
    background-color: #FF4040;
    border-radius: 2px;
    border: 0;
    color: white;
`;

const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
    />
);
    
const GrommetUI = props => {
    console.log(props.data);
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <Grommet theme={theme}>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <Heading level='3' margin='none'>Grommet</Heading>
                            <Button icon={<Notification />} onClick={() => setShowSidebar(!showSidebar)} />
                        </AppBar>
                        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                            <Box flex align='center' justify='center'>
                                <Action data={props.data}/>
                                <EditAction data={props.data}/>
                                <Person data={props.data}/>
                                <EditPerson data={props.data}/>
                            </Box>
                            {(!showSidebar || size !== 'small') ? (
                                <Collapsible direction='horizontal' open={showSidebar}>
                                    <Box
                                        flex
                                        width='medium'
                                        background='light-2'
                                        elevation='small'
                                        align='center'
                                        justify='center'
                                    >
                                        sidebar
                                    </Box>
                                </Collapsible>
                            ): (
                                <Layer>
                                    <Box
                                        background='light-2'
                                        tag='header'
                                        justify='end'
                                        align='center'
                                        direction='row'
                                    >
                                        <Button
                                            icon={<FormClose />}
                                            onClick={() => setShowSidebar(false)}
                                        />
                                    </Box>
                                    <Box
                                        fill
                                        background='light-2'
                                        align='center'
                                        justify='center'
                                    >
                                        sidebar
                                    </Box>
                                </Layer>
                            )}
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    )};

export default GrommetUI;

const Action = props => {
    const defaultOptions = [];
    for (let x = 1; x <= 10; x += 1) {
        defaultOptions.push(`${props.data.person.first_name} ${props.data.person.last_name} ${x}`);
    }
    const [options, setOptions] = useState(defaultOptions);
    const [valueMultiple, setValueMultiple] = useState([]);
    const duration = props.data.action.start_time.slice(11, 16) + '–' +  props.data.action.end_time.slice(11, 16);
    return (
        <Box fill='horizontal' margin='medium'>
            <Heading level='3'>
                Action:
                {props.data.action.activity.title}
            </Heading>
            <List
                alignSelf='start'
                primaryKey='icon'
                secondaryKey='title'
                data={[
                    { icon: <Actions />, title: props.data.action.info_text },
                    { icon: <Actions />, title: props.data.action.start_time.slice(0, 10) },
                    { icon: <Actions />, title: duration },
                ]}
            />
            <Anchor href='#' label='Edit action' margin='medium'/>
            <Box direction='row' justify='between'>
                <Box align='center' direction='row'>
                    <Cube margin='small'/>
                    <Heading level='4'>
                        Sign-ups
                    </Heading>
                </Box>
                <Box align='center' direction='row'>
                    <StatusInfo/>
                    <Heading level='6'>
                        Click in list to book
                    </Heading>
                </Box>
            </Box>
            <Box justify='between'>
                <Box align='center' direction='row'>
                    <Cube margin='small'/>
                    <Heading margin='small' level='4'>
                        Contact person
                    </Heading>
                </Box>
                <Card margin='medium' background='light-1'>
                    <Box direction='row' align='center'> 
                        <Avatar margin='small' background='accent-4' size='medium' round={false}>
                            {props.data.person.first_name.charAt(0)}
                            {props.data.person.last_name.charAt(0)}
                        </Avatar>
                        <Box>
                            <Heading margin='0' level='4'>
                                {props.data.person.first_name} {props.data.person.last_name}
                            </Heading>
                            <Heading margin='0' color='status-unknown' level='6'>
                                Drag another person here or select one to change
                            </Heading>
                        </Box>
                    </Box>
                </Card>
            </Box>
            <Box>
                <Box align='center' direction='row'>
                    <Cube margin='small'/>
                    <Heading margin='small' level='4'>
                        Booked participants
                    </Heading>
                </Box>
                <Select
                    multiple
                    size='medium'
                    placeholder='Start typing to find or create'
                    value={valueMultiple}
                    options={options}
                    onChange={({ value: nextValue }) => setValueMultiple(nextValue)}
                    onClose={() => setOptions(defaultOptions)}
                    onSearch={text => {
                        // The line below escapes regular expression special characters:
                        // [ \ ^ $ . | ? * + ( )
                        const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
                        // Create the regular expression with modified value which
                        // handles escaping special characters. Without escaping special
                        // characters, errors will appear in the console
                        const exp = new RegExp(escapedText, 'i');
                        setOptions(defaultOptions.filter(o => exp.test(o)));
                    }}
                />
                {valueMultiple.map((item, i) => (
                    <Card margin='medium' background='light-1' key={i}>
                        <Box direction='row' align='center'> 
                            <Avatar margin='small' background='accent-4' size='medium' round={false}>
                                {item[0]}{item[8]}
                            </Avatar>
                            <Box>
                                <Heading margin='0' level='4'>
                                    {item}
                                </Heading>
                                <Heading margin='0' color='status-unknown' level='6'>
                                    Not reminded
                                </Heading>
                            </Box>
                        </Box>
                    </Card> 
                ))}
            </Box>
        </Box>
)};

const EditAction = props => {
    const defaultOptions = [];
    for (let x = 1; x <= 10; x += 1) {
        defaultOptions.push(`Campaign ${x}`);
    }
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = React.useState('');
    const [valueMultiple, setValueMultiple] = useState([]);
    return (
        <Box fill='horizontal' margin='medium'>
            <Heading level='3'>
                Edit action
            </Heading>
            <Heading level='6'>
                Campaign
            </Heading>
            {/* It's possible to limit selection */}
            <Select
                multiple
                size='medium'
                placeholder='Start typing to find or create'
                value={valueMultiple}
                options={options}
                onChange={({ value: nextValue }) => setValueMultiple(nextValue)}
                onClose={() => setOptions(defaultOptions)}
                onSearch={text => {
                    // The line below escapes regular expression special characters:
                    // [ \ ^ $ . | ? * + ( )
                    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
                    // Create the regular expression with modified value which
                    // handles escaping special characters. Without escaping special
                    // characters, errors will appear in the console
                    const exp = new RegExp(escapedText, 'i');
                    setOptions(defaultOptions.filter(o => exp.test(o)));
                }}
            />
            <Heading level='6'>
                Date
            </Heading>
            <DateInput
                margin={{'horizontal': 'medium'}}
                format='mm/dd/yyyy'
                value={(new Date()).toISOString()}
                onChange={({ value }) => {}}
            />
            <Box direction='row'>
                <Box>
                    <Heading level='6'>
                        Start time
                    </Heading>
                    <MaskedInput
                        mask={[
                            {
                                length: [1, 2],
                                options: Array.from({ length: 24 }, (v, k) => k + 1),
                                regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                                placeholder: 'hh',
                            },
                                { fixed: ':' },
                            {
                                length: 2,
                                options: ['00', '15', '30', '45'],
                                regexp: /^[0-5][0-9]$|^[0-9]$/,
                                placeholder: 'mm',
                            },
                        ]}    
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Box>
                <Box>
                    <Heading level='6'>
                        End time
                    </Heading>
                    <MaskedInput
                        mask={[
                            {
                                length: [1, 2],
                                options: Array.from({ length: 24 }, (v, k) => k + 1),
                                regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                                placeholder: 'hh',
                            },
                                { fixed: ':' },
                            {
                                length: 2,
                                options: ['00', '15', '30', '45'],
                                regexp: /^[0-5][0-9]$|^[0-9]$/,
                                placeholder: 'mm',
                            },
                        ]}    
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Box>
            </Box>
            <Heading level='6'>
                Minimum number of participants
            </Heading>
            <TextInput
                placeholder='type here'
                /* value={value}
                onChange={event => setValue(event.target.value)} */
            />
            <Heading level='6'>
                Information at sign-up
            </Heading>
            <TextArea
                placeholder='Type here'
                /* value={value}
                onChange={event => setValue(event.target.value)} */
            />
            <DeleteButton icon={<Trash color='white' />} margin='small' secondary size='small' label='Delete' />
            <SaveButton margin='large' primary size='medium' label='Save' />
        </Box>
)};

const allSuggestions = ['sony', 'sonar', 'foo', 'bar'];

const Tag = ({ children, onRemove, ...rest }) => {
    const tag = (
        <Box
            direction='row'
            align='center'
            background='brand'
            pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
            margin={{ vertical: 'xxsmall' }}
            round='medium'
            {...rest}
        >
        <Text size='xsmall' margin={{ right: 'xxsmall' }}>
            {children}
        </Text>
            {onRemove && <FormClose size='small' color='white' />}
        </Box>
    );

    if (onRemove) {
        return <Button onClick={onRemove}>{tag}</Button>;
    }
        return tag;
    };

const TagInput = ({ value = [], onAdd, onChange, onRemove, ...rest }) => {
    const [currentTag, setCurrentTag] = React.useState('');
    const [box, setBox] = React.useState();
    const boxRef = React.useCallback(setBox, []);
  
    const updateCurrentTag = event => {
        setCurrentTag(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };
    
    const onAddTag = tag => {
        if (onAdd) {
            onAdd(tag);
        }
    };
  
    const onEnter = () => {
        if (currentTag.length) {
            onAddTag(currentTag);
            setCurrentTag('');
        }
    };
  
    const renderValue = () =>
        value.map((v, index) => (
            <Tag
                margin='xxsmall'
                key={`${v}${index + 0}`}
                onRemove={() => onRemove(v)}
            >
                {v}
            </Tag>
      ));

    return (
        <Keyboard onEnter={onEnter}>
            <Box
                direction='row'
                align='center'
                pad={{ horizontal: 'xsmall' }}
                border='all'
                ref={boxRef}
                wrap
            >
                {value.length > 0 && renderValue()}
                <Box flex style={{ minWidth: '120px' }}>
                    <TextInput
                        type='search'
                        plain
                        dropTarget={box}
                        {...rest}
                        onChange={updateCurrentTag}
                        value={currentTag}
                        onSelect={event => {
                            event.stopPropagation();
                            onAddTag(event.suggestion);
                        }}
                    />
                </Box>
            </Box>
        </Keyboard>
)};

const Person = props => {
    const [selectedTags, setSelectedTags] = React.useState(['foo', 'sony']);
    const [suggestions, setSuggestions] = React.useState(allSuggestions);
  
    const onRemoveTag = tag => {
        const removeIndex = selectedTags.indexOf(tag);
        const newTags = [...selectedTags];
        if (removeIndex >= 0) {
            newTags.splice(removeIndex, 1);
        }
        setSelectedTags(newTags);
    };
  
    const onAddTag = tag => setSelectedTags([...selectedTags, tag]);
  
    const onFilterSuggestion = value =>
        setSuggestions(
            allSuggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            ),
        )
   
    return (
        <Box fill='horizontal' margin='medium'>
            <Heading level='3'>                    
                {props.data.person.first_name}
                {props.data.person.last_name}
            </Heading>
            <Avatar margin='medium' background='accent-4' size='xlarge' round={false}>
                {props.data.person.first_name.charAt(0)}
                {props.data.person.last_name.charAt(0)}
            </Avatar>
            <List
                alignSelf='start'
                primaryKey='icon'
                secondaryKey='title'
                data={[
                    { icon: <Actions />, title: 'Connected to Zetkin account' },
                    { icon: <Actions />, title: props.data.person.email },
                    { icon: <Actions />, title: props.data.person.phone },
                ]}
            />
            <Anchor href='#' label='Edit personal data' margin='medium'/>
            <Heading margin='0' level='4'>
                Tags
            </Heading>
            <Box pad='small'>
                <TagInput
                placeholder='Search for aliases...'
                suggestions={suggestions}
                value={selectedTags}
                onRemove={onRemoveTag}
                onAdd={onAddTag}
                onChange={({ target: { value } }) => onFilterSuggestion(value)}
                />
            </Box>
        </Box>
)};

const EditPerson = props => {
    const defaultOptions = [];
    for (let x = 1; x <= 10; x += 1) {
        defaultOptions.push(`Campaign ${x}`);
    }
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = React.useState('');
    const [valueMultiple, setValueMultiple] = useState([]);
    return (
        <Box fill='horizontal' margin='medium'>
            <Heading level='3'>
                {props.data.person.first_name}
                {props.data.person.last_name}
            </Heading>
            <Heading level='6'>
                External ID
            </Heading>
            <TextInput
                placeholder='type here'
                /* value={value}
                onChange={event => setValue(event.target.value)} */
            />
            <Heading level='6'>
                Gender
            </Heading>
            <Select
                options={['male', 'female', 'non-binary']}
                /* value={value}
                onChange={({ option }) => setValue(option)} */
            />
            <SaveButton margin='large' primary size='medium' label='Save' />
        </Box>
)};