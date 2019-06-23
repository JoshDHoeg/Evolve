import React, {Component} from 'react'
import { withAuthorization } from '../../../utilities/Session';
import firebase from 'firebase'

class UserView extends Component {
    user;
    constructor(props) {
        super(props)
        this.state ={
            loading: false,
            user:{
                name: '',
                email: '',
                company: '',
                revenue: 0
            },
            revenue: 0
        }
        this.onChange=this.onChange.bind(this)
        this.onChangeUser=this.onChangeUser.bind(this)
    }

    onChange(event) {
        event.preventDefault()
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name] : event.target.value
            }
        })
    }

    onChangeUser(event) {
        let uid = firebase.auth().currentUser.uid
        this.props.firebase.user(uid).set({
            company: this.state.user.company,
            username: this.state.user.username,
            email: this.state.user.email,
            revenue: this.state.user.revenue 
        })
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
            console.log('user', this.state.user)
        });
    }


    componentWillUnmount() {
        this.props.firebase.user().off();
    }

    render() {
        console.log('hello', this.state.user.company)
        return (
            <div>
                <h2>User: {this.state.user.username}</h2>
                <h2>Email: {this.state.user.email}</h2>
                <h2>Company: {this.state.user.company}</h2>
                <h2>Revenue: {this.state.user.revenue}</h2>
                <form onClick={this.onChangeUser}>
                <input
                    type="text"
                    value={this.state.user.username}
                    onChange={this.onChange}
                    name='username'
                    />
                <input
                    type="text"
                    value={this.state.user.email}
                    onChange={this.onChange}
                    name='email'
                    />
                <input
                    type="text"
                    value={this.state.user.company}
                    onChange={this.onChange}
                    name='company'
                    />
                <input
                    type="text"
                    value={this.state.user.revenue}
                    onChange={this.onChange}
                    name='revenue'
                    />
                <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserView)