import React, {useState} from 'react';
import {
	Avatar,
	Box,
	Button,
	Center,
	ChakraProvider,
	Flex,
	Heading,
	Input,
	extendTheme,
    Link,
    List,
    ListItem,
    ListIcon,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Select,
    Tag,
	Text,
	Textarea,
} from '@chakra-ui/react';
import {
    AddIcon, 
    DeleteIcon,
	SearchIcon,
	StarIcon,
	SunIcon,
} from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
}

const theme = extendTheme({colors})

const Chakra = props => {
    return (
        <ChakraProvider theme={theme}>
            <Action data={props.data} />
            <EditAction data={props.data} />
            <Person data={props.data} />
            <EditPerson data={props.data} />
        </ChakraProvider>
    );
}

export default Chakra;

const Action = props => {
    const duration = props.data.action.start_time.slice(11, 16) + '–' +  props.data.action.end_time.slice(11, 16);
    const name = props.data.person.first_name + ' ' + props.data.person.last_name;
    const [participants, SetParticipants] = useState([]);

    const handleChange = (e) => {
        SetParticipants((items) => [...items, e.target.value])
    };

    const options = [
        {
            value: name,
            label: name,
        },
        {
            value: 'Kristoffer Larberg',
            label: 'Kristoffer Larberg',
        },
        {
            value: 'Niklas Vanhaninen',
            label: 'Niklas Vanhainen',
        },
    ]
    
    return (
        <Box mx='10'>
            <Box mt='10' mb='10'>
                <Heading as='h1' size='xl'>
                    Action: {props.data.action.activity.title}
                </Heading>
            </Box>
            <List spacing={3} borderBottom='1px' pb='5' fontSize='sm'>
                <ListItem>
                    <ListIcon as={SearchIcon} />
                    {props.data.action.info_text}
                </ListItem>
                <ListItem>
                    <ListIcon as={SearchIcon} />
                    {props.data.action.start_time.slice(0, 10)}
                </ListItem>
                <ListItem>
                    <ListIcon as={SearchIcon} />
                    {duration}
                </ListItem>
            </List>
            <Box>
                <Link fontSize='sm'>Edit action</Link>
            </Box>
            <Box mt='10' mb='10'>
                <Flex align='center' justify='space-between'>
                    <Center>
                        <Box mr='2'>
                            <SunIcon />
                        </Box>
                        <Heading as='h2' size='md'>
                            Sign-ups
                        </Heading>
                    </Center>
                    <Center>
                        <Box mr='2'>
                            <StarIcon color='grey' />
                        </Box>
                        <Text fontSize='sm' color='grey'>
                            Click in list to book
                        </Text>
                    </Center>
                </Flex>
            </Box>
            <Box my='10'>
                <Flex mb='5'>
                    <Box mr='2'>
                        <SunIcon />
                    </Box>
                    <Heading as='h2' size='md'>
                        Contact person
                    </Heading>
                </Flex>
                <Flex border='1px' p='2' borderStyle='dashed' borderColor='grey'>
                    <Avatar name={name} src='https://bit.ly/broken-link' />
                    <Box ml='3'>
                        <Text fontWeight='bold'>{name}</Text>
                        <Text fontSize='sm' color='grey'>
                            Drag another person here or select one to change
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Box my='10'>
                <Flex mb='5'>
                    <Box mr='2'>
                        <SunIcon />
                    </Box>
                    <Heading as='h2' size='md'>
                        Booked participants
                    </Heading>
                </Flex>
                <Select
                    placeholder='Start typing to find or create'
                    onChange={handleChange}
                >
                    {options.map((item, i) => (
                        <option key={i} id={item.id} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </Select>
                <Text fontSize='sm' color='grey'>
                    Select a person from the list or drop here to select.
                </Text>
                {participants.map((item, i) => (
                    <Flex border='1px' p='2' mt='5' key={i} borderColor='grey'>
                        <Avatar name={item} src='https://bit.ly/broken-link' />
                        <Box ml='3'>
                            <Text fontWeight='bold'>{item}</Text>
                            <Text fontSize='sm' color='grey'>
                                Drag another person here or select one to change
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
}

const EditAction = () => {
    const [campaign, setCampaign] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (e) => {
        setCampaign(e.target.value)
    };

    const options = [
        {
            value: 'Campaign 1',
            label: 'Campaign 1',
        },
        {
            value: 'Campaign 2',
            label: 'Campaign 2',
        },
        {
            value: 'Campaign 3',
            label: 'Campaign 3',
        },
    ]

    return (
        <Box mx='10' mt='20'>
            <Box mt='10' mb='10'>
                <Heading as='h1' size='xl'>
                    Edit action
                </Heading>
            </Box>
            <Box my='5'>
                <Text fontSize='sm' color='grey'>
                    Booked participants
                </Text>
                <Select onChange={handleChange}>
                    {options.map((item, i) => (
                        <option key={i} id={item.id} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box my='5'>
                <Text fontSize='sm' color='grey'>
                    Date
                </Text>
                {/* react-datepicker */}
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
            </Box>
            <Flex my='5'>
                <Box>
                    <Text fontSize='sm' color='grey'>
                        Start time
                    </Text>
                    {/* react-datepicker */}
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption='Time'
                        dateFormat='h:mm aa'
                    />
                </Box>
                <Box>
                    <Text fontSize='sm' color='grey'>
                        End time
                    </Text>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption='Time'
                        dateFormat='h:mm aa'
                    />
                </Box>
            </Flex>
            <Box my='5'>
                <Text fontSize='sm' color='grey'>
                    Minimum number of participants
                </Text>
                <NumberInput defaultValue={0} min={1} max={500}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>
            <Box my='5'>
                <Text fontSize='sm' color='grey'>
                    Information at sign-up
                </Text>
                <Textarea placeholder='Information at sign-up' />
            </Box>
            <Box my='10'>
                <Button
                    leftIcon={<DeleteIcon />}
                    height='50px'
                    colorScheme='red'
                    variant='solid'
                >
                    Delete
                </Button>
            </Box>
            <Box my='10'>
                <Button
                    size='md'
                    height='50px'
                    width='100%'
                    colorScheme='blue'
                    variant='solid'
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
}
        
const Person = (props) => {
    const name = props.data.person.first_name + ' ' + props.data.person.last_name;

    return (
        <Box mx='10' mt='20'>
            <Box mt='10' mb='10'>
                <Heading as='h1' size='xl'>
                    {name}
                </Heading>
                <Box mt='5'>
                    <Avatar name={name} src='https://bit.ly/broken-link' size='xl' />
                </Box>
            </Box>
            <List spacing={3} borderBottom='1px' pb='5' fontSize='sm'>
                <ListItem>
                    <ListIcon as={SearchIcon} />
                    Connected to Zetkin account
                </ListItem>
                <ListItem>
                    <ListIcon as={SearchIcon} />
                    {props.data.person.email}
                </ListItem>
                <ListItem>
                    <ListIcon as={SearchIcon} />
                    {props.data.person.phone}
                </ListItem>
            </List>
            <Box>
                <Link fontSize='sm'>Edit personal data</Link>
            </Box>
            <Box my='10'>
                <Flex mb='5'>
                    <Box mr='2'>
                        <SunIcon />
                    </Box>
                    <Heading as='h2' size='md'>
                        Tags
                    </Heading>
                </Flex>
                <Flex>
                    <Tag mr='2'>Sample Tag</Tag>
                    <Button leftIcon={<AddIcon />} colorScheme='blue' size='xs'>
                        Add tag
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

const EditPerson = (props) => {
    const name = props.data.person.first_name + ' ' + props.data.person.last_name;
	const [gender, setGender] = useState();

	const handleChange = (e) => {
		setGender(e.target.value);
	};

	const options = [
		{
			value: 'Female',
			label: 'Female',
		},
		{
			value: 'Male',
			label: 'Male',
		},
		{
			value: 'Non-binary',
			label: 'Non-binary',
		},
	];

	return (
		<Box mx='10' mt='20'>
			<Box mt='10' mb='10'>
				<Heading as='h1' size='xl'>
					{name}
				</Heading>
			</Box>
			<Box my='5'>
				<Text fontSize='sm' color='grey'>
					External ID
				</Text>
				<Input placeholder='External ID' />
			</Box>
			<Box my='5'>
				<Text fontSize='sm' color='grey'>
					Gender
				</Text>
				<Select onChange={handleChange}>
					{options.map((item, i) => (
						<option key={i} id={item.id} value={item.value}>
							{item.label}
						</option>
					))}
				</Select>
			</Box>
			<Box my='10'>
				<Button
					size='md'
					height='50px'
					width='100%'
					colorScheme='blue'
					variant='solid'
				>
					Save
				</Button>
			</Box>
		</Box>
	);
}