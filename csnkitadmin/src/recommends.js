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
    RichTextField,
    ReferenceField,

    SimpleForm,
    SelectInput,
    DisabledInput,
    ReferenceInput,

    EditButton
} from 'admin-on-rest'
import RichTextInput from 'aor-rich-text-input'

export const RecommendList = (props) => (
    <List title='推荐管理' {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.recommend}
                />
            }
            medium={
                <Datagrid>
                    <ReferenceField label="推荐小札" source="noteId" reference="notes">
                        <TextField source="title" />
                    </ReferenceField>
                    <ReferenceField label="推荐人" source="userId" reference="users">
                        <TextField source="user" />
                    </ReferenceField>
                    <RichTextField label="推荐内容" source='recommend' />
                    <DateField label="推荐时间" source="creatime" locales="cn" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
)

const RecommendTitle = ({
    record
}) => {
    return <span>编辑推荐</span>
}

export const RecommendEdit = (props) => (
    <Edit title={<RecommendTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <ReferenceInput label="推荐小札" source="noteId" reference="notes">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <ReferenceInput label="推荐人" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <RichTextInput label="推荐内容" source='recommend' />
        </SimpleForm>
    </Edit>
)

export const RecommendCreate = (props) => (
    <Create title='创建新推荐' {...props}>
        <SimpleForm>
            <ReferenceInput label="推荐小札" source="noteId" reference="notes">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <ReferenceInput label="推荐人" source="userId" reference="users">
                <SelectInput optionText="user" />
            </ReferenceInput>
            <RichTextInput label="推荐内容" source='recommend' />
        </SimpleForm>
    </Create>
)