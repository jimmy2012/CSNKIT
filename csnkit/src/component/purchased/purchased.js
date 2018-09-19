import React from 'react'
import {
    connect
} from 'react-redux'
import {
    getNoteList,
    getMyList
} from '../../redux/note.redux'
import NoteCard from '../notecard/notecard'

@connect(
    state => state.note, {
        getNoteList,
        getMyList
    }
)
class Purchased extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getNoteList()
        this.props.getMyList()
    }

    render() {
        return <NoteCard sign='buy' noteList={this.props.noteList} boughtList={this.props.boughtList}></NoteCard>
    }
}

export default Purchased