import React, {useState} from 'react';
import { Avatar, Button, Cascader, Col, DatePicker, Input, Layout, Link, List, Row, Space, Tag, TextArea, TimePicker, Typography } from 'antd';
import 'antd/dist/antd.css';
import {QuestionCircleFilled, InfoCircleFilled} from '@ant-design/icons';

const AntDesign = props => {
    console.log(props.data);

    const { Title, Text, Link } = Typography;
    const { Header, Footer, Content } = Layout;

    return(
        <Layout>
            <h1>Ant Design</h1>
            <Content>
                <Person data={props.data}/>
                <EditPerson data={props.data}/>
                <Action data={props.data}/>
                <EditAction data={props.data}/>
            </Content>
        </Layout>
)};

export default AntDesign;

const Person = props => {

    const { Title, Text, Link } = Typography;

    return (
        <Row gutter={[0, 100]}>
            <Col flex="2rem"/>
            <Col flex="auto">
                <Title level={2}>
                    {props.data.person.first_name} {props.data.person.last_name}
                </Title>
                <Avatar shape="square" size={100}>
                    {props.data.person.first_name.charAt(0)}
                    {props.data.person.last_name.charAt(0)}
                </Avatar>
                <List>
                    <List.Item>
                        <List.Item.Meta 
                            avatar={<InfoCircleFilled/>}
                            title="Connected to Zetkin account"
                        />    
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta 
                            avatar={<InfoCircleFilled/>}
                            title={props.data.person.email}
                        />               
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta 
                            avatar={<InfoCircleFilled/>}
                            title={props.data.person.phone}
                        />    
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta 
                            avatar={<InfoCircleFilled/>}
                            title={props.data.person.street_address ? props.data.person.street_address : "-"}
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta 
                            avatar={<InfoCircleFilled/>}
                            title="Organizer notes"
                        />
                    </List.Item>
                    <List.Item>
                    <List.Item.Meta 
                            avatar={<InfoCircleFilled/>}
                            title="View activity timeline"
                        />
                        
                    </List.Item> 
                </List>
                <Link>Edit personal data</Link>
                <Title level={3}>Tags</Title>
                <Tag>Tag</Tag>
                <Button size="small">Add tag</Button>
            </Col>
            <Col flex="2rem"/>
        </Row>
)};

const EditPerson = props => {

    const { Title, Text, Link } = Typography;

    return(
        <Row gutter={[0, 100]} wrap={false}>
            <Col flex="2rem"/>
            <Col span={24} flex="auto">
                <Title level={2}>
                    {props.data.person.first_name} {props.data.person.last_name}
                </Title>
                <Space direction="vertical">
                    <Text>External ID</Text>
                    <Input placeholder="Placeholder" />
                    <Text>First name</Text>
                    <Input placeholder="Placeholder" />
                    <Text>Last name</Text>
                    <Input placeholder="Placeholder" />
                    <Text>Gender</Text>
                    <Cascader placeholder="Please select" />
                    <Button type="primary" block>Save</Button>
                </Space>
            </Col>
            <Col flex="2rem"/>
        </Row>
    )};

    

const Action = props => {
    const { Title, Text, Link } = Typography;

    const [selection, setSelection] = useState()
    const duration = props.data.action.start_time.slice(11, 16) + "–" +  props.data.action.end_time.slice(11, 16);
    const person = props.data.person.first_name + " " + props.data.person.last_name;
    const options = [
        {
            value: person,
            label: person,
        },
        {
            value: "kristoffer larberg",
            label: "Kristoffer Larberg",
        },
        {
            value: "niklas vanhaninen",
            label: "Niklas Vanhainen",
        },
      ];

      function onChange(value, selectedOptions) {
        setSelection(value);
      }

      function filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
      }

    return (
        <Row gutter={[0, 100]} wrap={false}>
            <Col flex="2rem"/>
            <Col flex="auto">
                <Row gutter={[0, 40]}>
                    <Col span={24}>
                        <Title level={2}>
                            Action: {props.data.action.activity.title}
                        </Title>
                        <List>
                            <List.Item>
                                <List.Item.Meta 
                                    avatar={<InfoCircleFilled/>}
                                    title={props.data.action.info_text}
                                />    
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta 
                                    avatar={<InfoCircleFilled/>}
                                    title={props.data.action.start_time.slice(0, 10)}
                                />               
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta 
                                    avatar={<InfoCircleFilled/>}
                                    title={duration}
                                />    
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta 
                                        avatar={<InfoCircleFilled/>}
                                        title={props.data.action.location.title}
                                />
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta 
                                        avatar={<InfoCircleFilled/>}
                                        title={props.data.action.activity.title}
                                />
                            </List.Item>
                        </List>
                        <Link>Edit section</Link>
                    </Col>
                </Row>
            <Row gutter={[0, 40]}>
                <Col span={12}>
                    <Space align="center">
                        <InfoCircleFilled/>
                        <Title level={3}>Sign-ups</Title>
                    </Space>
                </Col>
                <Col span={12}>
                    <QuestionCircleFilled style={{color: "grey"}} />
                    <Text type="secondary">Click in list to book</Text>
                </Col>
            </Row>
            <Row gutter={[0, 40]}>
                <Col span={24}>
                    <InfoCircleFilled style={{color: "grey"}} />
                    <Text type="secondary">No Pending sign-ups to be booked</Text>
                </Col>
            </Row>
            <Row gutter={[0, 40]}>
                <Col span={24}>
                    <Space direction="vertical">
                        <Space align="center">
                            <InfoCircleFilled/>
                            <Title level={3}>Contact person</Title>
                        </Space>
                        <Space>
                            <Avatar shape="square" size={50}>
                                {props.data.person.first_name.charAt(0)}
                                {props.data.person.last_name.charAt(0)}
                            </Avatar>
                            <Space direction="vertical">
                                <Title level={4}>
                                    {props.data.person.first_name} {props.data.person.last_name}
                                </Title>
                                <Text type="secondary">Drag another person here or select one to change</Text>
                            </Space>
                        </Space>
                    </Space>
                </Col>
            </Row>
            <Row gutter={[0, 40]}>
                <Col span={24}>
                    <Space direction="vertical">
                        <Space align="center">
                            <InfoCircleFilled/>
                            <Title level={3}>Booked participants</Title>
                        </Space>
                        <Cascader
                            options={options}
                            onChange={onChange}
                            placeholder="Please select"
                            showSearch={{ filter }}
                        />
                    </Space>
                </Col>
                {selection ? selection : null}
            </Row>
            </Col>
            <Col flex="2rem"/>
        </Row>
)};

const EditAction = props => {

    const { Title, Text, Link } = Typography;
    const { TextArea } = Input;

    return(
        <Row gutter={[0, 100]} wrap={false}>
        <Col flex="2rem"/>
        <Col span={24} flex="auto">
            <Title level={2}>
                Edit action
            </Title>
            <Space direction="vertical">
                <Text>Campaign</Text>
                <Cascader placeholder="Please select" />
                <Text>Date</Text>
                <DatePicker/>
                <Text>Start time</Text>
                <TimePicker/>
                <Text>End time</Text>
                <TimePicker/>
                <Text>Minimum number of participants</Text>
                <Input placeholder="Placeholder" />
                <Text>Information at sign-up</Text>
                <TextArea placeholder="Placeholder" autoSize/>
                <Button type="primary" danger>Delete</Button>
                <Button type="primary" block>Save</Button>
            </Space>
        </Col>
        <Col flex="2rem"/>
    </Row>
)};