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
    BooleanField,
    DateField,
    ReferenceField,
    ReferenceManyField,

    SimpleForm,
    TextInput,
    SelectInput,
    BooleanInput,
    DisabledInput,
    LongTextInput,
    ReferenceInput,

    EditButton,
    ListButton,
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

const MessageShowActions = ({
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

export const MessageShow = (props) => (
    <Show title='留言详情' actions={<MessageShowActions />} {...props}>
        <TabbedShowLayout toolbar={<MessageCreateToolbar />}>
            <Tab label="基本信息">
                <ReferenceField label="章节" source="chapterId" reference="chapters">
                    <TextField source="title" />
                </ReferenceField>
                <ReferenceField label="用户" source="userId" reference="users">
                    <TextField source="user" />
                </ReferenceField>
                <TextField label="留言内容" source='message' />
                <BooleanField label="审核" source='auth' />
                <DateField label="发布时间" source="creatime" locales="cn" />
            </Tab>
            <Tab label="所有评论" >
                <ReferenceManyField label="所有评论" reference="comments" target="messageId">
                    <Datagrid>
                        <ReferenceField label="评论人" source="userId" reference="users">
                            <TextField source="user" />
                        </ReferenceField>
                        <TextField label="评论内容" source="comment" />
                        <DateField label="评论时间" source="creatime" locales="cn" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)

const MessageFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <ReferenceInput label="章节" source="chapterId" reference="chapters">
            <SelectInput optionText="title" />
        </ReferenceInput>
        <ReferenceInput label="用户" source="userId" reference="users">
            <SelectInput optionText="user" />
        </ReferenceInput>
        <TextInput label="留言内容" source="title" />
    </Filter>
)

export const MessageList = (props) => (
    <List title='留言管理' {...props} filters={<MessageFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.message}
                />
            }
            medium={
                <Datagrid>
                    <ReferenceField label="章节" source="chapterId" reference="chapters">
                        <TextField source="title" />
                    </ReferenceField>
                    <ReferenceField label="用户" source="userId" reference="users">
                        <TextField source="user" />
                    </ReferenceField>
                    <TextField label="留言内容" source='message' />
                    <BooleanField label="审核" source='auth' />
                    <DateField label="发布时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const MessageTitle = ({
    record
}) => {
    return <span>编辑留言</span>
}

export const MessageEdit = (props) => (
    <Edit title={<MessageTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <ReferenceInput label="章节" source="chapterId" reference="chapters">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <ReferenceInput label="用户" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <LongTextInput label="留言内容" source='message' />
            <BooleanInput label="审核" source='auth' />
        </SimpleForm>
    </Edit>
)

const MessageCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存返回列表" redirect="list" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const MessageCreate = (props) => (
    <Create title='创建新留言' {...props}>
        <SimpleForm toolbar={<MessageCreateToolbar />}>
            <ReferenceInput label="章节" source="chapterId" reference="chapters">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <ReferenceInput label="用户" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <LongTextInput label="留言内容" source='message' />
            <BooleanInput label="审核" source='auth' />
        </SimpleForm>
    </Create>
)