import React, { useState } from 'react';
import {
	Avatar,
	Button,
	ComboBox,
	ComboBoxInput,
	ComboBoxList,
	ComboBoxOption,
	ComboBoxOptionText,
	Container,
	Divider,
	IconArrowRight,
	IconCalendar,
	IconPlus,
	IconTrash2,
	InputGroup,
	Input,
	Layer,
	Link,
	List,
	ListItem,
	Select,
	Text,
	TextArea,
	useTheme,
} from 'sancho';
import faker from 'faker';

const Sancho = (props) => {
	return (
		<Container css={{ marginTop: '3rem', marginBottom: '3rem' }}>
			<Action data={props.data} />
			<EditAction data={props.data} />
			<Person data={props.data} />
		</Container>
	);
};

export default Sancho;

const Action = (props) => {
	const duration =
		props.data.action.start_time.slice(11, 16) +
		'–' +
		props.data.action.end_time.slice(11, 16);

	const [entries, setEntries] = useState(
		new Array(100).fill(null).map(() => ({
			id: faker.random.uuid(),
			name: faker.name.firstName() + ' ' + faker.name.lastName(),
			image: faker.image.avatar(),
		}))
	);

	const [query, setQuery] = useState('');

	const filteredResults = !query
		? []
		: entries
				.filter(
					(entry) =>
						entry.name.toLowerCase().indexOf(query.toLowerCase()) >
						-1
				)
				.slice(0, 10);

	return (
		<>
			<Text variant="display2">
				Action: {props.data.action.activity.title}
			</Text>
			<List>
				<ListItem
					interactive={false}
					contentBefore={<IconArrowRight />}
					primary={props.data.action.info_text}
					wrap={true}
					contentAfter={false}
				/>
				<ListItem
					interactive={false}
					contentBefore={<IconArrowRight />}
					primary={props.data.action.start_time.slice(0, 10)}
					wrap={false}
					contentAfter={false}
				/>
				<ListItem
					interactive={false}
					contentBefore={<IconArrowRight />}
					primary={duration}
					wrap={false}
					contentAfter={false}
				/>
			</List>
			<Link>Edit action</Link>
			<Divider />
			<Container css={{ display: 'flex', alignItems: 'center' }}>
				<IconCalendar />
				<Text
					variant="display3"
					css={{ marginBottom: '0', marginLeft: '1rem' }}
				>
					Contact person
				</Text>
			</Container>
			<Layer elevation="sm">
				<Container
					css={{
						display: 'flex',
						alignItems: 'center',
						padding: '1rem',
						border: '1px solid black',
						margin: '1rem 0',
					}}
				>
					<Avatar
						size="md"
						name={
							(props.data.person.first_name,
							props.data.person.last_name)
						}
					/>
					<Text
						variant="h3"
						css={{ marginBottom: '0', marginLeft: '1rem' }}
					>
						{props.data.person.first_name}
						{props.data.person.last_name}
					</Text>
				</Container>
			</Layer>
			<Container css={{ display: 'flex', alignItems: 'center' }}>
				<IconCalendar />
				<Text
					variant="display3"
					css={{ marginBottom: '0', marginLeft: '1rem' }}
				>
					Booked participants
				</Text>
			</Container>
			<Container
				css={{
					margin: '1rem 0',
				}}
			>
				<ComboBox
					query={query}
					onQueryChange={(v) => setQuery(v)}
					onSelect={(v) => setQuery(v)}
				>
					<ComboBoxInput
						css={{ maxWidth: '250px' }}
						aria-label="Query users"
						placeholder="Search for users"
						autocomplete
					/>

					{query && filteredResults.length && (
						<ComboBoxList
							css={{
								maxHeight: '200px',
								zIndex: 10,
								overflow: 'scroll',
							}}
							aria-label="Query users"
						>
							{filteredResults.map((entry) => (
								<ComboBoxOption
									css={{ padding: 0 }}
									value={entry.name}
									key={entry.id}
								>
									<ListItem
										interactive={false}
										primary={
											<ComboBoxOptionText
												value={entry.name}
											/>
										}
										contentBefore={
											<Avatar
												size="sm"
												name={entry.name}
												src={entry.image}
											/>
										}
									/>
								</ComboBoxOption>
							))}
						</ComboBoxList>
					)}
				</ComboBox>
			</Container>
			{query && (
				<Layer elevation="sm">
					<Container
						css={{
							display: 'flex',
							alignItems: 'center',
							padding: '1rem',
							border: '1px solid black',
							margin: '1rem 0',
						}}
					>
						<Avatar size="md" name={query} />
						<Text
							variant="h3"
							css={{ marginBottom: '0', marginLeft: '1rem' }}
						>
							{query}
						</Text>
					</Container>
				</Layer>
			)}
		</>
	);
};

const EditAction = () => {
	return (
		<Container
			css={{
				marginTop: '5rem',
			}}
		>
			<Text variant="display2">Edit action</Text>
			<InputGroup error="This field is required" label="Campaign">
				<Select>
					<option>Campaign 1</option>
					<option>Campaign 2</option>
					<option>Campaign 3</option>
				</Select>
			</InputGroup>
			<Container
				css={{
					margin: '2rem 0',
				}}
			>
				<Text>No datepicker, timepicker, number input</Text>
			</Container>
			<InputGroup label="Title">
				<Input placeholder="Enter title" />
			</InputGroup>
			<InputGroup
				error="This field is required"
				label="Information at sign-up"
				helpText="Help text"
			>
				<TextArea placeholder="Enter information" />
			</InputGroup>
			<Container
				css={{
					display: 'flex',
					flexDirection: 'column',
					margin: '2rem 0',
				}}
			>
				<Container
					css={{
						margin: '2rem 0',
					}}
				>
					<Button
						intent="danger"
						iconBefore={<IconTrash2 />}
						variant="default"
					>
						Delete
					</Button>
				</Container>
				<Button intent="primary">Save</Button>
			</Container>
		</Container>
	);
};

const Person = (props) => {
	return (
		<Container
			css={{
				marginTop: '5rem',
			}}
		>
			<Text variant="display2">
				{props.data.person.first_name} {props.data.person.last_name}
			</Text>
			<Avatar
				size="lg"
				name={
					(props.data.person.first_name, props.data.person.last_name)
				}
			/>
			<List>
				<ListItem
					interactive={false}
					contentBefore={<IconArrowRight />}
					primary="Connected to Zetkin account"
					wrap={true}
					contentAfter={false}
				/>
				<ListItem
					interactive={false}
					contentBefore={<IconArrowRight />}
					primary={props.data.person.email}
					wrap={false}
					contentAfter={false}
				/>
				<ListItem
					interactive={false}
					contentBefore={<IconArrowRight />}
					primary={props.data.person.phone}
					wrap={false}
					contentAfter={false}
				/>
			</List>
			<Link>Edit personal data</Link>
			<Divider />
			<Text variant="display3" css={{ marginBottom: '0' }}>
				Tags
			</Text>
			<Container
				css={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Text
					css={{
						marginRight: '1rem',
						padding: '0.5rem',
					}}
				>
					Tag
				</Text>
				<Button iconBefore={<IconPlus />} variant="default">
					Add tag
				</Button>
			</Container>
		</Container>
	);
};
