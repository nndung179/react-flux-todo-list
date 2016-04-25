import 'array.prototype.findindex';
import uuid from 'node-uuid';
import React from 'react';
import Notes from  'components/note/Notes';

// Actions & Store
import NoteActions from 'actions/NoteActions';
import NoteStore from 'stores/NoteStore';


class App extends React.Component {

	constructor(props){
		super(props);

		this.state = NoteStore.getState();
	}

	componentDidMount(){
		NoteStore.listen(this.storedChange);
	}

	storedChange = (state) => {
		this.setState(state);
	}

	render() {
		const notes = this.state.notes;
		return (
			<div>
				<button onClick={this.handleAddNote}>+</button>
				<Notes notes={notes} 
					onEdit={this.editNote} 
					onDelete={this.deleteNote}
				/>
			</div>
		);
	}

	handleAddNote = () => {
		NoteActions.createNote({task: 'New Task'});
	}

	editNote = (noteId, task) => {
		NoteActions.editNote({noteId, task});
	}

	deleteNote = (noteId) => {
		NoteActions.deleteNote(noteId);
	}

}

export default App;
