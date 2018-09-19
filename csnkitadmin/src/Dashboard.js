import React from 'react'
import {
    Card,
    CardHeader,
    CardText
} from 'material-ui/Card'

export default () => (
    <Card style={{ margin: '2em' }}>
        <CardHeader title='欢迎使用admin-on-rest后台系统' />
        <CardText>本系统使用admin-on-rest和loopback制作...</CardText>
    </Card>
)