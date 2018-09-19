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
    BooleanField,

    TabbedForm,
    TextInput,
    DateInput,
    ImageInput,
    BooleanInput,
    DisabledInput,
    FormTab,

    ListButton,
    SaveButton,
    DeleteButton,
    RefreshButton,
    EditButton,
    ShowButton
} from 'admin-on-rest';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
}

const BannerShowActions = ({
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

export const BannerShow = (props) => (
    <Show title='广告查看' actions={<BannerShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField label="区域" source='area' />
            <TextField label="名称" source='name' />
            <ImageField label="图片" source="image.uri" />
            <TextField label="链接地址" source='url' />
            <BooleanField label="展示" source='show' />
            <DateField label="起始时间" source="start" locales="cn" />
            <DateField label="结束时间" source="end" locales="cn" />
            <DateField label="发布时间" source="creatime" locales="cn" />
        </SimpleShowLayout>
    </Show>
)

const BannerFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <TextInput label="广告标题" source="title" />
    </Filter>
)

export const BannerList = (props) => (
    <List title='广告管理' {...props} filters={<BannerFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.area}
                    secondaryText={record => record.name}
                    tertiaryText={record => record.utl}
                />
            }
            medium={
                <Datagrid>
                    <TextField label="区域" source='area' />
                    <TextField label="名称" source='name' />
                    <ImageField label="图片" source="image.uri" />
                    {/* <TextField label="链接地址" source='url' /> */}
                    <BooleanField label="展示" source='show' />
                    <DateField label="起始时间" source="start" locales="cn" />
                    <DateField label="结束时间" source="end" locales="cn" />
                    {/* <DateField label="发布时间" source="creatime" locales="cn" /> */}
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const BannerTitle = ({
    record
}) => {
    return <span>编辑广告{ record ? `${record.name}` : '' }</span>
}

export const BannerEdit = (props) => (
    <Edit title={<BannerTitle />} {...props}>
        <TabbedForm>
            <FormTab label="基本信息">
                <DisabledInput source='id' />
                <TextInput label="区域" source='area' />
                <TextInput label="名称" source='name' />
                <TextInput label="链接地址" source='url' />
                <BooleanInput label="展示" source='show' />
            </FormTab>
            <FormTab label="上传图片">
                <ImageInput
                    label="选择图片文件"
                    source="image"
                    accept="image/*"
                    placeholder={<p>请拖动图片或点击选择</p>}
                    multiple={false}
                >
                    <ImageField source="uri" title="name" />
                </ImageInput>
            </FormTab>
            <FormTab label="有效起始" >
                <DateInput label="起始时间" source="start" locales="cn" />
                <DateInput label="结束时间" source="end" locales="cn" />
            </FormTab>
        </TabbedForm>
    </Edit>
)

const BannerCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存并查看" redirect="show" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const BannerCreate = (props) => (
    <Create title='创建新广告' {...props}>
        <TabbedForm toolbar={<BannerCreateToolbar />}>
            <FormTab label="基本信息">
                <TextInput label="区域" source='area' />
                <TextInput label="名称" source='name' />
                <TextInput label="链接地址" source='url' />
                <BooleanInput label="展示" source='show' />
            </FormTab>
            <FormTab label="上传图片">
                <ImageInput
                    label="选择图片文件"
                    source="image"
                    accept="image/*"
                    placeholder={<p>请拖动图片或点击选择</p>}
                    multiple={false}
                >
                    <ImageField source="uri" title="name" />
                </ImageInput>
            </FormTab>
            <FormTab label="有效起始" >
                <DateInput label="起始时间" source="start" locales="cn" />
                <DateInput label="结束时间" source="end" locales="cn" />
            </FormTab>
        </TabbedForm>
    </Create>
)