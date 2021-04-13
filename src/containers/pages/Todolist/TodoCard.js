import React, {Fragment} from 'react';

//Styling
import Button from '@material-ui/core/Button';
import './Todolist.scss'

const TodoCard = (props) => {

    return (
        <Fragment>
            <ul>
                <li>
                    <h1 className="title-card">{props.data.title}</h1>
                    <hr className="line-card"/>
                    <div className="btn-wrapper">
                        <Button 
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => props.edit(props.data.id)}>Edit</Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => props.delet(props.data.id)}>Delet</Button>
                    </div>
                </li>
            </ul>
        </Fragment>
    )
}

export default TodoCard;