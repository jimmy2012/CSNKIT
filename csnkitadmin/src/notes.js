import React from 'react'
import {
    CardActions
} from 'material-ui/Card'
import {
    Responsive,
    SimpleList,
    TabbedShowLayout,
    Toolbar,
    Tab,

    List,
    Edit,
    Show,
    Create,
    Filter,
    Datagrid,

    DateField,
    ChipField,
    TextField,
    ImageField,
    NumberField,
    BooleanField,
    RichTextField,
    SingleFieldList,
    ReferenceField,
    ReferenceManyField,
    ReferenceArrayField,

    TabbedForm,
    TextInput,
    SelectInput,
    BooleanInput,
    DisabledInput,
    ReferenceInput,
    SelectArrayInput,
    ReferenceArrayInput,
    FormTab,

    ListButton,
    SaveButton,
    DeleteButton,
    RefreshButton,
    EditButton,
    ShowButton
} from 'admin-on-rest'
import RichTextInput from 'aor-rich-text-input'
import ApproveButton from './ApproveButton'

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
}

const NoteShowActions = ({
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

export const NoteShow = (props) => (
    <Show title='小札详情' actions={<NoteShowActions />} {...props}>
        <TabbedShowLayout toolbar={<NoteCreateToolbar />}>
            <Tab label="基本信息">
                <ReferenceArrayField label="标签" source="tags" reference="tags">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <TextField label="标题" source='title' />
                <ReferenceField label="作者" source="userId" reference="users">
                    <TextField source="user" />
                </ReferenceField>
                <RichTextField label="简介" source='summary' />
                <NumberField label="价格" source='price' options={{ style: 'currency', currency: 'RMB' }} />
                <DateField label="创作时间" source="creatime" locales="cn" />
                <BooleanField label="上架" source='onshelf' />
            </Tab>
            <Tab label="小札封面">
                <ReferenceField label="封面" source="coverId" reference="covers">
                    <ImageField label="图标" source="image.uri" />
                </ReferenceField>
            </Tab>
            <Tab label="主要章节" >
                <ReferenceManyField label="主要章节" reference="chapters" target="noteId">
                    <Datagrid>
                        <TextField label="标题" source="title" />
                        <RichTextField label="内容" source="text" />
                        <NumberField label="排序" source="sort" />
                        <DateField label="创作时间" source="creatime" locales="cn" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="关于本札" >
                <RichTextField label="详细介绍" source='desc' />
                <RichTextField label="学到什么" source='learnfrom' />
                <RichTextField label="适合人群" source='suitable' />
                <RichTextField label="购买须知" source='buyknow' />
            </Tab>
            <Tab label="名人推荐" >
                <ReferenceManyField label="名人推荐" reference="recommends" target="noteId">
                    <Datagrid>
                        <ReferenceField label="推荐人" source="userId" reference="users">
                            <TextField source="user" />
                        </ReferenceField>
                        <RichTextField label="内容" source="recommend" />
                        <DateField label="推荐时间" source="creatime" locales="cn" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="小札数据" >
                <TextField label="收藏数" source="collect" />
                <TextField label="售出数" source="saleout" />
            </Tab>
            <Tab label="更新记录" >

            </Tab>
        </TabbedShowLayout>
    </Show>
)

const NoteFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <TextInput label="小札标题" source="title" />
    </Filter>
)

export const NoteList = (props) => (
    <List title='小札管理' {...props} filters={<NoteFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `作者:${record.author}`}
                    tertiaryText={record => `价格:${record.price}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField label="小札标题" source='title' />
                    <TextField label="简要介绍" source='summary' />
                    <ReferenceField label="作者" source="userId" reference="users">
                        <TextField source="user" />
                    </ReferenceField>
                    <TextField label="价格" source='price' />
                    <BooleanField label="上架" source='onshelf' />
                    <NumberField label="收藏" source='collect' />
                    <NumberField label="售出" source='saleout' />
                    <DateField label="发布时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                    <ApproveButton />
                </Datagrid>
            }
        />
    </List>
)

const NoteTitle = ({
    record
}) => {
    return <span>编辑小札{ record ? `${record.title}` : '' }</span>
}

export const NoteEdit = (props) => (
    <Edit title={<NoteTitle />} {...props}>
        <TabbedForm>
            <FormTab label="基本信息">
                <DisabledInput label="编号" source='id' />
                <ReferenceArrayInput label="标签" source="tags" reference="tags">
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
                <TextInput label="标题" source='title' />
                <ReferenceInput label="作者" source="userId" reference="users">
                    <SelectInput optionText="user" />
                </ReferenceInput>
                <TextInput label="简介" source='summary' />
                <TextInput label="价格" source='price' options={{ style: 'currency', currency: 'RMB' }} />
                <BooleanInput label="上架" source='onshelf' />
            </FormTab>
            <FormTab label="小札封面">
                <ReferenceInput label="封面" source="coverId" reference="covers">
                    <SelectInput optionText="title" />
                </ReferenceInput>
            </FormTab>
            <FormTab label="主要章节" >
                <ReferenceManyField label="主要章节" reference="chapters" target="noteId">
                    <Datagrid>
                        <TextField label="标题" source="title" />
                        <RichTextField label="内容" source="text" />
                        <NumberField label="排序" source="sort" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
            <FormTab label="关于本札" >
                <RichTextInput label="详细介绍" source='desc' />
                <RichTextInput label="学到什么" source='learnfrom' />
                <RichTextInput label="适合人群" source='suitable' />
                <RichTextInput label="购买须知" source='buyknow' />
            </FormTab>
        </TabbedForm>
    </Edit>
)

const NoteCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存并查看" redirect="show" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const NoteCreate = (props) => (
    <Create title='创建新小札' {...props}>
        <TabbedForm toolbar={<NoteCreateToolbar />}>
            <FormTab label="基本信息">
                <ReferenceArrayInput label="标签" source="tags" reference="tags">
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
                <TextInput label="标题" source='title' />
                <ReferenceInput label="作者" source="userId" reference="users">
                    <SelectInput optionText="user" />
                </ReferenceInput>
                <TextInput label="简介" source='summary' />
                <TextInput label="价格" source='price' options={{ style: 'currency', currency: 'RMB' }} />
                <BooleanInput label="上架" source='onshelf' />
            </FormTab>
            <FormTab label="小札封面">
                <ReferenceInput label="封面" source="coverId" reference="covers">
                    <SelectInput optionText="title" />
                </ReferenceInput>
            </FormTab>
            <FormTab label="关于本札" >
                <RichTextInput label="详细介绍" source='desc' />
                <RichTextInput label="学到什么" source='learnfrom' />
                <RichTextInput label="适合人群" source='suitable' />
                <RichTextInput label="购买须知" source='buyknow' />
            </FormTab>
        </TabbedForm>
    </Create>
)