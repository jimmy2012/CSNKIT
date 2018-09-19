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
    ImageField,

    SimpleForm,
    TextInput,
    ImageInput,
    LongTextInput,
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

const CoverShowActions = ({
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

export const CoverShow = (props) => (
    <Show title='封面查看' actions={<CoverShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField label="标题" source='title' />
            <TextField label="风格描述" source='desc' />
            <ImageField label="图片" source="image.uri" />
            <DateField label="发布时间" source="creatime" locales="cn" />
        </SimpleShowLayout>
    </Show>
)

const CoverFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <TextInput label="标题" source="title" />
    </Filter>
)

export const CoverList = (props) => (
    <List title='封面管理' {...props} filters={<CoverFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `标题:${record.name}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField label="标题" source='title' />
                    <TextField label="风格描述" source='desc' />
                    <ImageField label="图片" source="image.uri" />
                    <DateField label="发布时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const CoverTitle = ({
    record
}) => {
    return <span>编辑封面{ record ? `${record.title}` : '' }</span>
}

export const CoverEdit = (props) => (
    <Edit title={<CoverTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <TextInput label="标题" source='title' />
            <TextInput label="风格描述" source='desc' />
            <ImageInput
                label="选择图片文件"
                source="image"
                accept="image/*"
                placeholder={<p>请拖动图片或点击选择</p>}
                multiple={false}
            >
                <ImageField source="uri" title="name" />
            </ImageInput>
        </SimpleForm>
    </Edit>
)

const CoverCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存并查看" redirect="show" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const CoverCreate = (props) => (
    <Create title='添加新封面' {...props}>
        <SimpleForm toolbar={<CoverCreateToolbar />}>
            <TextInput label="标题" source='title' />
            <LongTextInput label="风格描述" source='desc' />
            <ImageInput
                label="选择图片文件"
                source="image"
                accept="image/*"
                placeholder={<p>请拖动图片或点击选择</p>}
                multiple={false}
            >
                <ImageField source="uri" title="name" />
            </ImageInput>
        </SimpleForm>
    </Create>
)