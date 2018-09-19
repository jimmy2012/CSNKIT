import React from 'react'
import {
    Card,
    CardHeader
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline'
import {
    translate
} from 'admin-on-rest'

export default translate(({
    style,
    translate
}) => (
    <Card style={style}>
        <CardHeader
            title={translate('欢迎使用鲤鱼商学平台后台管理系统')}
            subtitle={translate('在使用系统申请、填报IT资源之前，您需要先填写本单位相关信息。')}
            avatar={<Avatar backgroundColor="#FFEB3B" icon={<LightBulbIcon />} />}
        />
    </Card>
))