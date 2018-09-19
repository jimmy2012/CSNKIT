import React from 'react'
import PropTypes from 'prop-types'
import {
    connect
} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {
    showNotification as showNotificationAction
} from 'admin-on-rest'
import {
    push as pushAction
} from 'react-router-redux'

class ApproveButton extends React.Component {
    handleClick = () => {
        const {
            push,
            record,
            showNotification
        } = this.props
        console.error(record.id)
        console.error(record)
        const updatedRecord = { ...record,
            onshelf: true
        }
        console.error(updatedRecord)
        fetch(`http://localhost:3000/api/notes/${record.id}`, {
                method: 'PUT',
                body: updatedRecord
            })
            .then(() => {
                showNotification('小札审核通过')
                push('/notes')
            })
            .catch((e) => {
                console.error(e)
                showNotification('错误：审核失败', '警告')
            })
    }

    render() {
        return <FlatButton label="审核" onClick={this.handleClick} />
    }
}

ApproveButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
}

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction,
})(ApproveButton)