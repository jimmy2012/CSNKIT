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
    TextField,
    ImageField,
    NumberField,
    SelectField,
    BooleanField,
    RichTextField,
    ReferenceField,
    ReferenceManyField,

    TabbedForm,
    TextInput,
    ImageInput,
    SelectInput,
    BooleanInput,
    DisabledInput,
    LongTextInput,
    FormTab,

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

const UserShowActions = ({
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

export const UserShow = (props) => (
    <Show title='用户查看' actions={<UserShowActions />} {...props}>
        <TabbedShowLayout toolbar={<UserCreateToolbar />}>
            <Tab label="基本信息">
                <ImageField label="图像" source="avatar.uri" />
                <TextField label="用户名" source='user' />
                <TextField label="微信名" source='wxtoken' />
                <SelectField label="性别" source="gender" optionText="name" optionValue="id" choices={[
                    { id: 'male', name: '男性' },
                    { id: 'female', name: '女性' },
                ]} />
                <TextField label="姓名" source='realname' />
                <TextField label="手机" source='mobile' />
                <TextField label="邮箱" source='email' />
                <DateField label="注册时间" source="creatime" locales="cn" />
            </Tab>
            <Tab label="工作社交" >
                <TextField label="工作" source='job' />
                <TextField label="职务" source='position' />
                <TextField label="公司" source='company' />
            </Tab>
            <Tab label="作者相关" >
                <TextField label="描述" source='desc' />
                <TextField label="出版著作" source='publish' />
                <TextField label="提现卡银行" source='bank' />
                <TextField label="提现卡用户名" source='bankuser' />
                <TextField label="提现卡号" source='bankcard' />
            </Tab>
            <Tab label="用户著作">
                <ReferenceManyField label="所有发表" reference="notes" target="userId">
                    <Datagrid>
                        <TextField label="标题" source="title" />
                        <NumberField label="价格" source='price' options={{ style: 'currency', currency: 'RMB' }} />
                        <NumberField label="收藏" source='collect' />
                        <NumberField label="售出" source='saleout' />
                        <DateField label="发表时间" source="creatime" locales="cn" />
                        <BooleanField label="是否在售" source='onshelf' />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="用户交易">
                <ReferenceManyField label="所有交易" reference="txlogs" target="userId">
                    <Datagrid>
                        <ReferenceField label="交易用户" source="userId" reference="users">
                            <TextField source="user" />
                        </ReferenceField>
                        <NumberField label="交易金额" source='amount' options={{ style: 'currency', currency: 'RMB' }} />
                        <SelectField label="交易类型" source="type" optionText="name" optionValue="id" choices={[
                            { id: 'reward', name: '奖励优惠' },
                            { id: 'ratelog', name: '优惠码优惠' },
                            { id: 'no', name: '无优惠' },
                        ]} />
                        <BooleanField label="交易状态" source='state' />
                        <TextField label="支付编号" source='tradeno' />
                        <DateField label="交易时间" source="creatime" locales="cn" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="用户推荐">
                <ReferenceManyField label="所有推荐" reference="recommends" target="userId">
                    <Datagrid>
                        <ReferenceField label="推荐小札" source="noteId" reference="notes">
                            <TextField source="title" />
                        </ReferenceField>
                        <RichTextField label="推荐内容" source='recommend' />
                        <DateField label="推荐时间" source="creatime" locales="cn" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="类型激活" >
                <SelectField label="类型" source="type" optionText="name" optionValue="id" choices={[
                    { id: 'reader', name: '读者' },
                    { id: 'author', name: '作者' },
                ]} />
                <BooleanField label="激活" source='active' />
            </Tab>
        </TabbedShowLayout>
    </Show>
)

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="搜索" source="q" alwaysOn />
        <TextInput label="用户名" source="user" />
        <TextInput label="手机号码" source="mobile" />
    </Filter>
)

export const UserList = (props) => (
    <List {...props} title='用户管理' filters={<UserFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.mobile}
                    secondaryText={record => `姓名:${record.realname}`}
                    tertiaryText={record => record.type === 'reader' ? '读者' : '作者'}
                />
            }
            medium={
                <Datagrid>
                    <TextField label="用户名" source='user' />
                    {/* <ImageField label="头像" source="avatar" title="头像" /> */}
                    <SelectField label="性别" source="gender" choices={[
                        { id: 'male', name: '男性' },
                        { id: 'female', name: '女性' },
                    ]} />
                    <SelectField label="类型" source="type" choices={[
                        { id: 'reader', name: '读者' },
                        { id: 'author', name: '作者' },
                    ]} />
                    <TextField label="手机" source='mobile' />
                    <TextField label="姓名" source='realname' />
                    <NumberField label="余额" source='money' options={{ style: 'currency', currency: 'RMB' }} />
                    <NumberField label="积分" source='score' elStyle={{ color: 'red' }} />
                    <BooleanField label="激活" source='active' />
                    <DateField label="注册时间" source="creatime" locales="cn" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

const UserTitle = ({
    record
}) => {
    return <span>编辑用户{ record ? `${record.user}` : '' }</span>
}

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <TabbedForm>
            <FormTab label="基本信息">
                <DisabledInput label="编号" source='id' />
                <TextInput label="用户名" source='user' />
                <TextInput label="微信名" source='wxtoken' />
                <SelectInput label="性别" source="gender" choices={[
                    { id: 'male', name: '男性' },
                    { id: 'female', name: '女性' },
                ]} />
                <TextInput label="姓名" source='realname' />
                <TextInput label="手机" source='mobile' />
                <TextInput label="邮箱" source='email' />
            </FormTab>
            <FormTab label="工作社交" >
                <TextInput label="工作" source='job' />
                <TextInput label="职务" source='position' />
                <TextInput label="公司" source='company' />
            </FormTab>
            <FormTab label="作者相关" >
                <LongTextInput label="描述" source='desc' />
                <LongTextInput label="出版著作" source='publish' />
                <TextInput label="提现卡银行" source='bank' />
                <TextInput label="提现卡用户名" source='bankuser' />
                <TextInput label="提现卡号" source='bankcard' />
            </FormTab>
            <FormTab label="用户图像">
                <ImageInput
                    label="选择图像文件"
                    source="avatar"
                    accept="image/*"
                    placeholder={<p>请拖动图片或点击选择</p>}
                    multiple={false}
                >
                    <ImageField source="uri" title="name" />
                </ImageInput>
            </FormTab>
            <FormTab label="类型激活" >
                <BooleanInput label="激活" source='active' />
                <SelectInput label="类型" source="type" choices={[
                    { id: 'reader', name: '读者' },
                    { id: 'author', name: '作者' },
                ]} />
            </FormTab>
        </TabbedForm>
    </Edit>
)

const UserCreateToolbar = props => <Toolbar {...props} >
    <SaveButton label="保存并查看" redirect="show" submitOnEnter={true} />
    <SaveButton label="保存继续添加" redirect={false} submitOnEnter={false} raised={false} />
</Toolbar>

export const UserCreate = (props) => (
    <Create title='创建新用户' {...props}>
        <TabbedForm toolbar={<UserCreateToolbar />}>
            <FormTab label="基本信息">
                <TextInput label="用户名" source='user' />
                <TextInput label="微信名" source='wxtoken' />
                <SelectInput label="性别" source="gender" choices={[
                    { id: 'male', name: '男性' },
                    { id: 'female', name: '女性' },
                ]} />
                <TextInput label="姓名" source='realname' />
                <TextInput label="手机" source='mobile' />
                <TextInput label="邮箱" source='email' />
            </FormTab>
            <FormTab label="工作社交" >
                <TextInput label="工作" source='job' />
                <TextInput label="职务" source='position' />
                <TextInput label="公司" source='company' />
            </FormTab>
            <FormTab label="作者相关" >
                <LongTextInput label="描述" source='desc' />
                <LongTextInput label="出版著作" source='publish' />
                <TextInput label="提现卡银行" source='bank' />
                <TextInput label="提现卡用户名" source='bankuser' />
                <TextInput label="提现卡号" source='bankcard' />
            </FormTab>
            <FormTab label="用户图像">
                <ImageInput
                    label="选择图像文件"
                    source="avatar"
                    accept="image/*"
                    placeholder={<p>请拖动图片或点击选择</p>}
                    multiple={false}
                >
                    <ImageField source="uri" title="name" />
                </ImageInput>
            </FormTab>
            <FormTab label="类型激活" >
                <BooleanInput label="激活" source='active' />
                <SelectInput label="类型" source="type" choices={[
                    { id: 'reader', name: '读者' },
                    { id: 'author', name: '作者' },
                ]} />
            </FormTab>
        </TabbedForm>
    </Create>
)