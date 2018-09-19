import React from 'react'
import {
    CardActions
} from 'material-ui/Card'
import {
    Responsive,
    SimpleList,

    List,
    Edit,
    Show,
    Create,
    Filter,
    Datagrid,

    DateField,
    TextField,
    RichTextField,
    ReferenceField,

    TextInput,
    SelectInput,
    DisabledInput,
    ReferenceInput,

    SimpleForm,
    SimpleShowLayout,

    ListButton,
    DeleteButton,
    RefreshButton,
    EditButton,
    ShowButton
} from 'admin-on-rest'
import RichTextInput from 'aor-rich-text-input'

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
}

const ChapterShowActions = ({
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

export const ChapterShow = (props) => (
    <Show title='章节查看' actions={<ChapterShowActions />} {...props}>
        <SimpleShowLayout>
            <ReferenceField label="小札题目" source="noteId" reference="notes">
                <TextField source="title" />
            </ReferenceField>
            <TextField label="标题" source='title' />
            <RichTextField label="内容" source='text' />
            <TextField label="排序" source="sort" />
            <DateField label="发布时间" source="creatime" locales="cn" />
        </SimpleShowLayout>
    </Show>
)

const ChapterFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <TextInput label="章节标题" source="title" />
    </Filter>
)

export const ChapterList = (props) => (
    <List title='章节管理' {...props} filters={<ChapterFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.title}
                />
            }
            medium={
                <Datagrid>
                    <ReferenceField label="小札题目" source="noteId" reference="notes">
                        <TextField source="title" />
                    </ReferenceField>
                    <TextField label="标题" source='title' />
                    <TextField label="排序" source="sort" />
                    <DateField label="发布时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const ChapterTitle = ({
    record
}) => {
    return <span>编辑章节{ record ? `${record.title}` : '' }</span>
}

export const ChapterEdit = (props) => (
    <Edit title={<ChapterTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <ReferenceInput label="小札题目" source="noteId" reference="notes">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput label="标题" source='title' />
            <RichTextInput label="内容" source='text' />
            <TextInput label="排序" source='sort' />
        </SimpleForm>
    </Edit>
)

export const ChapterCreate = (props) => (
    <Create title='创建新章节' {...props}>
        <SimpleForm>
            <ReferenceInput label="小札题目" source="noteId" reference="notes">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput label="标题" source='title' />
            <RichTextInput label="内容" source='text' />
            <TextInput label="排序" source='sort' />
        </SimpleForm>
    </Create>
)