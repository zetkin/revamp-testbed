import React, { useCallback, useState } from 'react';
import { Avatar } from '@react-md/avatar';
import { Button } from '@react-md/button';
import { Card, CardTitle, CardSubtitle, CardHeader } from '@react-md/card';
import { Chip } from '@react-md/chip';
import { Divider } from '@react-md/divider';
import { Select, TextArea, TextField } from '@react-md/form';
import { TextIconSpacing } from '@react-md/icon';
import { Configuration } from '@react-md/layout';
import { Link } from '@react-md/link';
import { Text, TextContainer } from '@react-md/typography';
import { List, SimpleListItem } from '@react-md/list';
import {
	AddSVGIcon,
	AdjustSVGIcon,
	DeleteSVGIcon,
	HomeSVGIcon,
} from '@react-md/material-icons';
import './index.scss';
import scssVariables from '@react-md/avatar/dist/scssVariables';
import styles from './WithOptionLeftAddon.module.scss';

const overrides = {
	// your configuration overrides
};

const ReactMD = (props) => {
	return (
		<Configuration {...overrides}>
			<Action data={props.data} />
			<EditAction data={props.data} />
			<Person data={props.data} />
			<EditPerson data={props.data} />
		</Configuration>
	);
};

export default ReactMD;

const names = [
	{
		first: 'Kristoffer',
		last: 'Larberg',
		abbreviation: 'K',
	},
	{
		first: 'Niklas',
		last: 'Vanhaninen',
		abbreviation: 'N',
	},
	{
		first: 'Richard',
		last: 'Olsson',
		abbreviation: 'R',
	},
];

function useSelect(defaultValue) {
	const [value, setValue] = useState(defaultValue);
	const handleChange = useCallback((nextValue) => {
		setValue(nextValue);
	}, []);
	return [value, handleChange];
}
const COLORS = Object.keys(scssVariables['rmd-avatar-colors']);
const options = names.map(({ first, last, abbreviation }, i) => ({
	leftAddon: (
		<Avatar color={COLORS[i % COLORS.length]}>{abbreviation}</Avatar>
	),
	leftAddonType: 'avatar',
	label: first + ' ' + last,
	value: first + ' ' + last,
	children: (
		<span key={i}>
			{first} {last}
		</span>
	),
}));

const Action = (props) => {
	const duration =
		props.data.action.start_time.slice(11, 16) +
		'–' +
		props.data.action.end_time.slice(11, 16);
	const [value, handleChange] = useSelect('');

	return (
		<div style={{ margin: '5rem 1rem' }}>
			<TextContainer>
				<Text type="headline-4">
					Action:
					{props.data.action.activity.title}
				</Text>
			</TextContainer>
			<List>
				<SimpleListItem leftAddon={<AdjustSVGIcon />}>
					{props.data.action.info_text}
				</SimpleListItem>
				<SimpleListItem leftAddon={<AdjustSVGIcon />}>
					{props.data.action.start_time.slice(0, 10)}
				</SimpleListItem>
				<SimpleListItem leftAddon={<AdjustSVGIcon />}>
					{duration}
				</SimpleListItem>
			</List>
			<Link>Edit action</Link>
			<Divider />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					margin: '2rem 0',
				}}
			>
				<div style={{ display: 'flex' }}>
					<HomeSVGIcon />
					<Text type="headline-6">Sign-ups</Text>
				</div>
				<TextIconSpacing icon={<HomeSVGIcon />}>
					Click in list to book
				</TextIconSpacing>
			</div>
			<div style={{ margin: '2rem 0' }}>
				<div style={{ display: 'flex', margin: '1rem 0' }}>
					<HomeSVGIcon />
					<Text type="headline-6">Contact person</Text>
				</div>
				<Card>
					<CardHeader
						beforeChildren={
							<Avatar>
								{props.data.person.first_name.charAt(0)}
							</Avatar>
						}
					>
						<CardTitle>
							{props.data.person.first_name}{' '}
							{props.data.person.last_name}
						</CardTitle>
						<CardSubtitle>
							Drag another person here or select one to change
						</CardSubtitle>
					</CardHeader>
				</Card>
			</div>
			<div style={{ margin: '2rem 0' }}>
				<div style={{ display: 'flex' }}>
					<HomeSVGIcon />
					<Text type="headline-6">Booked participants</Text>
				</div>
				<Select
					id="select-using-left-addon"
					label="Participant"
					placeholder="Participant"
					options={options}
					value={value}
					onChange={handleChange}
					disableLeftAddon={false}
					displayLabelClassName={styles.label}
				/>
				{value && (
					<div style={{ margin: '1rem 0' }}>
						<Card>
							<CardHeader
								beforeChildren={
									<Avatar>{value.charAt(0)}</Avatar>
								}
							>
								<CardTitle>{value}</CardTitle>
								<CardSubtitle>
									Drag another person here or select one to
									change
								</CardSubtitle>
							</CardHeader>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
};

const campaigns = [
	{
		campaign: 'One',
	},
	{
		campaign: 'Two',
	},
	{
		campaign: 'Three',
	},
];

const EditAction = () => {
	const [campaign, handleChange] = useSelect('');

	return (
		<div style={{ margin: '5rem 1rem' }}>
			<TextContainer>
				<Text type="headline-4">Edit action</Text>
			</TextContainer>
			<div style={{ margin: '1rem 0' }}>
				<Select
					id="select-using-keys"
					label="Campaign"
					placeholder="Campaign"
					labelKey="campaign"
					valueKey="campaign"
					options={campaigns}
					value={campaign}
					onChange={handleChange}
				/>
			</div>
			<div style={{ margin: '1rem 0' }}>
				<TextField
					id="text-field-type-date"
					type="date"
					placeholder="Date"
					label="Date"
				/>
			</div>
			<div style={{ margin: '1rem 0' }}>
				<TextField
					id="text-field-type-time"
					type="time"
					placeholder="Time"
					label="Time"
				/>
			</div>
			<div style={{ margin: '1rem 0' }}>
				<TextField
					id="text-field-type-number"
					type="number"
					placeholder="Minimum number of participants"
					label="Minimum number of participants"
				/>
			</div>
			<div style={{ margin: '1rem 0' }}>
				<TextArea
					id="configurable-textarea"
					rows={2}
					maxRows={10}
					resize="auto"
					animate={true}
					label="Information at sign-up"
				/>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ margin: '1rem 0' }}>
					<Button theme="warning" themeType="contained">
						<TextIconSpacing icon={<DeleteSVGIcon />}>
							Delete
						</TextIconSpacing>
					</Button>
				</div>
				<Button theme="primary" themeType="contained">
					Save
				</Button>
			</div>
		</div>
	);
};

const Person = (props) => {
	return (
		<div style={{ margin: '5rem 1rem' }}>
			<TextContainer>
				<Text type="headline-4">
					{props.data.person.first_name} {props.data.person.last_name}
				</Text>
			</TextContainer>
			<Avatar color="orange">
				{props.data.person.first_name.charAt(0)}
				{props.data.person.last_name.charAt(0)}
			</Avatar>
			<List>
				<SimpleListItem leftAddon={<AdjustSVGIcon />}>
					Connected to Zetkin account
				</SimpleListItem>
				<SimpleListItem leftAddon={<AdjustSVGIcon />}>
					{props.data.person.email}
				</SimpleListItem>
				<SimpleListItem leftAddon={<AdjustSVGIcon />}>
					{props.data.person.phone}
				</SimpleListItem>
			</List>
			<Link>Edit personal data</Link>
			<Divider />
			<div style={{ margin: '1rem 0' }}>
				<div style={{ display: 'flex' }}>
					<HomeSVGIcon />
					<Text type="headline-6">Tags</Text>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={{ marginRight: '1rem' }}>
						<Chip>Contributor</Chip>
					</div>
					<Button
						id="outlined-button-1"
						theme="primary"
						themeType="outline"
					>
						<TextIconSpacing icon={<AddSVGIcon />}>
							Add tag
						</TextIconSpacing>
					</Button>
				</div>
			</div>
		</div>
	);
};

const gender = [
	{
		alternative: 'Female',
	},
	{
		alternative: 'Male',
	},
	{
		alternative: 'Non-binary',
	},
];

const EditPerson = (props) => {
	const [alternative, handleChange] = useSelect('');

	return (
		<div style={{ margin: '5rem 1rem' }}>
			<TextContainer>
				<Text type="headline-4">
					{props.data.person.first_name} {props.data.person.last_name}
				</Text>
			</TextContainer>
			<div style={{ margin: '1rem 0' }}>
				<TextField
					id="configurable-text-field"
					placeholder="External ID"
					label="External ID"
				/>
			</div>
			<div style={{ margin: '1rem 0' }}>
				<Select
					id="select-using-keys"
					label="Gender"
					placeholder="Gender"
					labelKey="alternative"
					valueKey="alternative"
					options={gender}
					value={alternative}
					onChange={handleChange}
				/>
			</div>
			<Button theme="primary" themeType="contained">
				Save
			</Button>
		</div>
	);
};
