import React from 'react'
import {
    CardActions
} from 'material-ui/Card';
import {
    Responsive,
    SimpleList,
    SimpleShowLayout,
    Toolbar,

    List,
    Edit,
    Show,
    Create,
    Filter,
    Datagrid,

    TextField,
    DateField,

    SimpleForm,
    SelectInput,
    TextInput,
    DisabledInput,

    ListButton,
    SaveButton,
    DeleteButton,
    RefreshButton,
    EditButton,
    ShowButton
} from 'admin-on-rest'

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
}

const TagShowActions = ({
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

export const TagShow = (props) => (
    <Show title='标签查看' actions={<TagShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField label="类型" source='type' />
            <TextField label="标签名" source='name' />
            <DateField label="发布时间" source="creatime" locales="cn" />
        </SimpleShowLayout>
    </Show>
)

const TagFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <SelectInput label="类型" source="type" choices={[
            { id: '帮助类', name: '帮助类' },
            { id: '小札类', name: '小札类' },
        ]} />
        <TextInput label="标签名" source="name" />
    </Filter>
)

export const TagList = (props) => (
    <List title='标签管理' {...props} filters={<TagFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.type}
                    secondaryText={record => record.name}
                />
            }
            medium={
                <Datagrid>
                    <TextField label="类型" source='type' />
                    <TextField label="标签名" source='name' />
                    <DateField label="发布时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const TagTitle = ({
    record
}) => {
    return <span>编辑标签{ record ? `${record.name}` : '' }</span>
}

export const TagEdit = (props) => (
    <Edit title={<TagTitle />} {...props}>
        <SimpleForm redirect="show">
            <DisabledInput source='id' />
            <SelectInput label="类型" source="type" choices={[
                { id: '帮助类', name: '帮助类' },
                { id: '小札类', name: '小札类' },
            ]} />
            <TextInput label="标签名" source='name' />
        </SimpleForm>
    </Edit>
)

const TagCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存并查看" redirect="show" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const TagCreate = (props) => (
    <Create title='创建新标签' {...props}>
        <SimpleForm toolbar={<TagCreateToolbar />}>
            <SelectInput label="类型" source="type" choices={[
                { id: '帮助类', name: '帮助类' },
                { id: '小札类', name: '小札类' },
            ]} />
            <TextInput label="标签名" source='name' />
        </SimpleForm>
    </Create>
)