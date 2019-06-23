import React, {Component} from 'react'
import { withAuthorization } from '../../../utilities/Session';

class UserView extends Component {
    constructor(props) {
        super(props)
        this.state ={
            loading: false,
            user:{
                name: '',
                email: '',
                company: '',
                revenue: []
            }
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.firebase.user().on('value', snapshot => {
            this.setState({loading: false})
        });
    }


    componentWillUnmount() {
        this.props.firebase.user().off();
    }

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                {user.uid}
            </div>
        )
    }
}

export default withAuthorization(UserView)