import React from 'react'
import {
    CardActions
} from 'material-ui/Card'
import {
    Responsive,
    SimpleList,

    Tab,
    List,
    Edit,
    Show,
    Filter,
    Create,
    Toolbar,
    Datagrid,
    TabbedShowLayout,

    TextField,
    NumberField,
    BooleanField,
    DateField,
    SelectField,
    ReferenceField,

    SimpleForm,
    TextInput,
    SelectInput,
    BooleanInput,
    DisabledInput,
    ReferenceInput,

    ListButton,
    EditButton,
    SaveButton,
    ShowButton,
    DeleteButton,
    RefreshButton
} from 'admin-on-rest'

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
}

const TxlogShowActions = ({
    basePath,
    data
}) => (
    <CardActions style={cardActionStyle}>
        <EditButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} />
        <RefreshButton />
    </CardActions>
)

export const TxlogShow = (props) => (
    <Show title='交易详情' actions={<TxlogShowActions />} {...props}>
        <TabbedShowLayout toolbar={<TxlogCreateToolbar />}>
            <Tab label="交易信息">
                <TextField label="编号" source='txlogsn' />
                <ReferenceField label="小札" source="noteId" reference="notes">
                    <TextField source="title" />
                </ReferenceField>
                <ReferenceField label="用户" source="userId" reference="users">
                    <TextField source="user" />
                </ReferenceField>
                <NumberField label="金额" source='amount' options={{ style: 'currency', currency: 'RMB' }} />
                <SelectField label="交易类型" source="type" optionText="name" optionValue="id" choices={[
                    { id: 'reward', name: '奖励优惠' },
                    { id: 'ratelog', name: '优惠码优惠' },
                    { id: 'no', name: '无优惠' },
                ]} />
                <BooleanField label="状态" source='state' />
                <TextField label="支付编号" source='tradeno' />
                <DateField label="时间" source="creatime" locales="cn" />
            </Tab>
            <Tab label="优惠信息" >
                <TextField label="优惠码" source='ratelog' />
                <TextField label="奖励比率" source='reward' />
            </Tab>
        </TabbedShowLayout>
    </Show>
)

const TxlogFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <ReferenceInput label="小札" source="noteId" reference="notes">
            <SelectInput optionText="title" />
        </ReferenceInput>
        <ReferenceInput label="用户" source="userId" reference="users">
            <SelectInput optionText="user" />
        </ReferenceInput>
        <TextInput label="交易编号" source="txlogsn" />
        <SelectInput label="交易类型" source="type" choices={[
            { id: 'reward', name: '奖励优惠' },
            { id: 'ratelog', name: '优惠码优惠' },
            { id: 'no', name: '无优惠' },
        ]} />
        <BooleanInput label="状态" source='state' />
    </Filter>
)

export const TxlogList = (props) => (
    <List title='交易管理' {...props} filters={<TxlogFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `交易编号:${record.txlogsn}`}
                    secondaryText={record => `金额:${record.amount}`}
                    tertiaryText={record => `支付编号:${record.tradeno}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField label="编号" source='txlogsn' />
                    <ReferenceField label="小札" source="noteId" reference="notes">
                        <TextField source="title" />
                    </ReferenceField>
                    <ReferenceField label="用户" source="userId" reference="users">
                        <TextField source="user" />
                    </ReferenceField>
                    <NumberField label="金额" source='amount' options={{ style: 'currency', currency: 'RMB' }} />
                    <BooleanField label="状态" source='state' />
                    <DateField label="交易时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const TxlogTitle = ({
    record
}) => {
    return <span>编辑交易{ record ? `${record.txlogsn}` : '' }</span>
}

export const TxlogEdit = (props) => (
    <Edit title={<TxlogTitle />} {...props}>
        <SimpleForm>
            <DisabledInput label="编号" source='id' />
            <TextInput label="交易编号" source='txlogsn' />
            <ReferenceInput label="小札" source="noteId" reference="notes">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <ReferenceInput label="用户" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <TextInput label="优惠比率" source='ratelog' />
            <TextInput label="奖励比率" source='reward' />
            <TextInput label="金额" source='amount' options={{ style: 'currency', currency: 'RMB' }} />
            <SelectInput label="交易类型" source="type" choices={[
                { id: 'reward', name: '奖励优惠' },
                { id: 'ratelog', name: '优惠码优惠' },
                { id: 'no', name: '无优惠' },
            ]} />
            <BooleanInput label="状态" source='state' />
            <TextInput label="支付编号" source='tradeno' />
        </SimpleForm>
    </Edit>
)

const TxlogCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存并查看" redirect="show" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const TxlogCreate = (props) => (
    <Create title='创建新交易' {...props}>
        <SimpleForm toolbar={<TxlogCreateToolbar />}>
        <TextInput label="交易编号" source='txlogsn' />
            <ReferenceInput label="小札" source="noteId" reference="notes">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <ReferenceInput label="用户" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <TextInput label="优惠比率" source='ratelog' />
            <TextInput label="奖励比率" source='reward' />
            <TextInput label="金额" source='amount' options={{ style: 'currency', currency: 'RMB' }} />
            <SelectInput label="交易类型" source="type" choices={[
                { id: 'reward', name: '奖励优惠' },
                { id: 'ratelog', name: '优惠码优惠' },
                { id: 'no', name: '无优惠' },
            ]} />
            <BooleanInput label="状态" source='state' />
            <TextInput label="支付编号" source='tradeno' />
        </SimpleForm>
    </Create>
)