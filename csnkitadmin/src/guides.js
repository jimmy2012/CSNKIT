import React from 'react'
import {
    CardActions
} from 'material-ui/Card'
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

    DateField,
    TextField,
    ChipField,
    ImageField,
    RichTextField,
    SingleFieldList,
    ReferenceArrayField,

    SimpleForm,
    TextInput,
    ImageInput,
    LongTextInput,
    DisabledInput,
    SelectArrayInput,
    ReferenceArrayInput,

    ListButton,
    SaveButton,
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

const GuideShowActions = ({
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

export const GuideShow = (props) => (
    <Show title='帮助查看' actions={<GuideShowActions />} {...props}>
        <SimpleShowLayout>
            <ReferenceArrayField label="标签" source="tags" reference="tags">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <TextField label="标题" source='title' />
            <ImageField label="图标" source="image.uri" />
            <TextField label="简介" source='summary' />
            <RichTextField label="详情" source='desc' />
            <DateField label="发布时间" source="creatime" locales="cn" />
        </SimpleShowLayout>
    </Show>
)

const GuideFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <TextInput label="帮助标题" source="title" />
    </Filter>
)

export const GuideList = (props) => (
    <List title='帮助管理' {...props} filters={<GuideFilter />}>
        <Responsive
            small={
                <SimpleList
                    secondaryText={record => record.title}
                    tertiaryText={record => record.creatime}
                />
            }
            medium={
                <Datagrid>
                    <TextField label="标题" source='title' />
                    <ImageField label="图标" source="image.uri" />
                    <TextField label="简介" source='summary' />
                    <DateField label="发布时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const GuideTitle = ({
    record
}) => {
    return <span>编辑帮助{ record ? `${record.title}` : '' }</span>
}

export const GuideEdit = (props) => (
    <Edit title={<GuideTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <ReferenceArrayInput label="标签" source="tags" reference="tags">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <TextInput label="标题" source='title' />
            <ImageInput
                label="选择图片文件"
                source="image"
                accept="image/*"
                placeholder={<p>请拖动图片或点击选择</p>}
                multiple={false}
            >
                <ImageField source="uri" title="name" />
            </ImageInput>
            <LongTextInput label="简介" source='summary' />
            <RichTextInput label="详情" source='desc' />
        </SimpleForm>
    </Edit>
)

const GuideCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存并查看" redirect="show" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const GuideCreate = (props) => (
    <Create title='创建新帮助' {...props}>
        <SimpleForm toolbar={<GuideCreateToolbar />}>
            <ReferenceArrayInput label="标签" source="tags" reference="tags">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <TextInput label="标题" source='title' />
            <ImageInput
                label="选择图片文件"
                source="image"
                accept="image/*"
                placeholder={<p>请拖动图片或点击选择</p>}
                multiple={false}
            >
                <ImageField source="uri" title="name" />
            </ImageInput>
            <LongTextInput label="简介" source='summary' />
            <RichTextInput label="详情" source='desc' />
        </SimpleForm>
    </Create>
)