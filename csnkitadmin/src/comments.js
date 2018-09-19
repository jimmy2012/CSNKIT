import React from 'react'
import {
    Responsive,
    SimpleList,

    List,
    Edit,
    Create,
    Datagrid,

    TextField,
    DateField,
    BooleanField,
    ReferenceField,

    SimpleForm,
    LongTextInput,
    SelectInput,
    DisabledInput,
    BooleanInput,
    ReferenceInput,

    EditButton
} from 'admin-on-rest';

export const CommentList = (props) => (
    <List title='评论管理' {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.comment}
                />
            }
            medium={
                <Datagrid>
                    <ReferenceField label="留言" source="messageId" reference="messages">
                        <TextField source="message" />
                    </ReferenceField>
                    <ReferenceField label="评论人" source="userId" reference="users">
                        <TextField source="user" />
                    </ReferenceField>
                    <TextField label="评论内容" source='comment' />
                    <BooleanField label="精彩评论" source='blink' />
                    <DateField label="评论时间" source="creatime" locales="cn" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
)

const CommentTitle = ({
    record
}) => {
    return <span>编辑评论</span>
}

export const CommentEdit = (props) => (
    <Edit title={<CommentTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <ReferenceInput label="留言" source="messageId" reference="messages">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput label="评论人" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <LongTextInput label="评论内容" source='comment' />
            <BooleanInput label="精彩评论" source='blink' />
        </SimpleForm>
    </Edit>
)

export const CommentCreate = (props) => (
    <Create title='创建新评论' {...props}>
        <SimpleForm>
            <ReferenceInput label="留言" source="messageId" reference="messages">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput label="评论人" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <LongTextInput label="评论内容" source='comment' />
            <BooleanInput label="精彩评论" source='blink' />
        </SimpleForm>
    </Create>
)