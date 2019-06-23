import React, {Component} from 'react'
import { withAuthorization } from '../../../utilities/Session';
import firebase from 'firebase'

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
        let uid = firebase.auth().currentUser.uid
        this.props.firebase.user(uid).on('value', snapshot => {
            const userObject = snapshot.val()
            this.setState({
                loading: false,
                user: userObject
            })
            console.log('user', userObject.email)
        });
    }


    componentWillUnmount() {
        this.props.firebase.user().off();
    }

    render() {
        console.log('hello')
        return (
            <div>
                <h2>User: {this.state.user.username}</h2>
                <h2>Email: {this.state.user.email}</h2>
                <h2>Company: {this.state.user.company}</h2>
                <h2>Revenue: {this.state.user.revenue}</h2>
            </div>
        )
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserView)