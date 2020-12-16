import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	Avatar,
	Button,
	Container,
	Content,
	DatePicker,
	Divider,
	FlexboxGrid,
	Icon,
	IconButton,
	Input,
	InputNumber,
	InputPicker,
	List,
	SelectPicker,
	star,
	trash2,
	plus,
	Tag,
	TagGroup,
} from 'rsuite';

import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'

const people = [
	{
		label: 'Eugenia',
		value: 'Eugenia',
		role: 'Master',
	},
	{
		label: 'Kariane',
		value: 'Kariane',
		role: 'Master',
	},
	{
		label: 'Louisa',
		value: 'Louisa',
		role: 'Master',
	},
	{
		label: 'Marty',
		value: 'Marty',
		role: 'Master',
	},
	{
		label: 'Kenya',
		value: 'Kenya',
		role: 'Master',
	},
	{
		label: 'Hal',
		value: 'Hal',
		role: 'Developer',
	},
	{
		label: 'Julius',
		value: 'Julius',
		role: 'Developer',
	},
];

const ReactSuite = (props) => {
	return (
		<Container style={{ margin: '2rem', height: '100%' }}>
			<Content>
				<Action data={props.data} />
				<EditAction data={props.data} />
				<Person data={props.data} />
			</Content>
		</Container>
	);
};

export default ReactSuite;

const Action = (props) => {
	const duration =
		props.data.action.start_time.slice(11, 16) +
		'–' +
		props.data.action.end_time.slice(11, 16);
	const data = [
		props.data.action.info_text,
		props.data.action.start_time.slice(0, 10),
		duration,
	];
	const [person, setPerson] = useState(null);

	const handleChange = (value) => {
		setPerson(value);
	};

	return (
		<div>
			<h2>Action: {props.data.action.activity.title}</h2>
			<List bordered style={{ marginTop: '2rem' }}>
				{data.map((item, index) => (
					<List.Item key={index} index={index}>
						<Icon
							style={{
								marginRight: '1rem',
							}}
							icon="star"
						/>
						{item}
					</List.Item>
				))}
			</List>
			<Button appearance="link">Edit action</Button>
			<Divider />
			<FlexboxGrid align="middle">
				<Icon
					style={{
						marginRight: '1rem',
					}}
					icon="hand-o-right"
					size="lg"
				/>
				<h3>Contact person</h3>
			</FlexboxGrid>
			<FlexboxGrid
				align="middle"
				style={{
					margin: '1rem 0',
					border: '1px solid black',
					padding: '0.5rem',
				}}
			>
				<Avatar
					style={{ background: '#7B1FA2', marginRight: '1rem' }}
					size="lg"
				>
					{props.data.person.first_name.charAt(0)}
					{props.data.person.last_name.charAt(0)}
				</Avatar>
				{props.data.person.first_name} {props.data.person.last_name}
			</FlexboxGrid>
			<FlexboxGrid align="middle">
				<Icon
					style={{
						marginRight: '1rem',
					}}
					icon="hand-o-right"
					size="lg"
				/>
				<h3>Booked participants</h3>
			</FlexboxGrid>
			<InputPicker
				data={people}
				value={people.value}
				onChange={handleChange}
				style={{ width: 224 }}
			/>
			{person && (
				<FlexboxGrid
					align="middle"
					style={{
						margin: '1rem 0',
						border: '1px solid black',
						padding: '0.5rem',
					}}
				>
					<Avatar
						style={{
							background: '#7B1FA2',
							marginRight: '1rem',
						}}
						size="lg"
					>
						{person.charAt(0)}
					</Avatar>
					{person}
				</FlexboxGrid>
			)}
		</div>
	);
};

const EditAction = () => {
	const campaigns = [
		{
			label: 'Campaign 1',
			value: 'Campaign 1',
		},
		{
			label: 'Campaign 2',
			value: 'Campaign 2',
		},
		{
			label: 'Campaign 3',
			value: 'Campaign 3',
		},
	];
	return (
		<div>
			<h2 style={{ marginTop: '3rem' }}>Edit action</h2>
			<p>Campaign</p>
			<SelectPicker
				data={campaigns}
				searchable={false}
				style={{ width: 224 }}
			/>
			<p>Date</p>
			<DatePicker isoWeek oneTap style={{ width: 280 }} />
			<FlexboxGrid>
				<div>
					<p>Start time</p>
					<DatePicker format="HH:mm" ranges={[]} />
				</div>
				<div>
					<p>End time</p>
					<DatePicker format="HH:mm" ranges={[]} />
				</div>
			</FlexboxGrid>
			<p>Minimum numbers of participants</p>
			<InputNumber defaultValue={1} max={100} min={1} />
			<p>Title</p>
			<Input placeholder="Enter title" />
			<p>Information at sign-up</p>
			<Input
				componentClass="textarea"
				rows={5}
				placeholder="Enter information"
			/>
			<Button color="red" style={{ marginTop: '1rem' }}>
				<Icon icon="trash2" /> Delete
			</Button>
			<Button appearance="primary" block style={{ marginTop: '1rem' }}>
				Save
			</Button>
		</div>
	);
};

const Person = (props) => {
	const data = [
		'Connected to Zetkin account',
		props.data.person.email,
		props.data.person.phone,
	];
	const [typing, setTyping] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [tags, setTags] = useState(['javascript', 'css', 'react']);

	const handleButtonClick = () => {
		setTyping(true);
		input.focus();
	};

	const handleInputChange = (inputValue) => {
		setInputValue(inputValue);
	};

	const handleInputConfirm = () => {
		const nextTags = inputValue ? [...tags, inputValue] : tags;
		setTags(nextTags);
		setTyping(false);
		setInputValue('');
	};

	const handleTagRemove = (tag) => {
		const nextTags = tags.filter((item) => item !== tag);
		setTags(nextTags);
	};

	const renderInput = () => {
		if (typing) {
			return (
				<Input
					className="tag-input"
					inputRef={(ref) => {
						input = ref;
					}}
					size="xs"
					style={{ width: 70 }}
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputConfirm}
					onPressEnter={handleInputConfirm}
				/>
			);
		}
		return (
			<IconButton
				className="tag-add-btn"
				onClick={handleButtonClick}
				icon={<Icon icon="plus" />}
				appearance="ghost"
				size="xs"
			/>
		);
	};

	return (
		<div>
			<h2 style={{ marginTop: '3rem' }}>
				{props.data.person.first_name} {props.data.person.last_name}
			</h2>
			<Avatar
				style={{ background: '#7B1FA2', margin: '1rem 1rem 1rem 0' }}
				size="lg"
			>
				{props.data.person.first_name.charAt(0)}
				{props.data.person.last_name.charAt(0)}
			</Avatar>
			<List bordered>
				{data.map((item, index) => (
					<List.Item key={index} index={index}>
						<Icon
							style={{
								marginRight: '1rem',
							}}
							icon="star"
						/>
						{item}
					</List.Item>
				))}
			</List>
			<Button appearance="link">Edit personal data</Button>
			<Divider />
			<TagGroup>
				{tags.map((item, index) => (
					<Tag
						key={index}
						closable
						onClose={() => {
							handleTagRemove(item);
						}}
					>
						{item}
					</Tag>
				))}
				{renderInput()}
			</TagGroup>
		</div>
	);
};
