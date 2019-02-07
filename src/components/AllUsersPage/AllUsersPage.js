import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllUsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
        };
    }

    componentDidMount() {
        // const config = {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true,
        // };

        axios({
            method: 'GET',
            url: '/api/allusers',
            // config: config
        }).then((response) => {
            this.setState({
                userArray: response.data,
            });
        }).catch((error) => {
            console.log('Error using route GET /api/allusers,', error);
        });
    }

    render() {
        return (
            <div>
                <h2>All Registered Users</h2>
                <p>Currently logged in as <b>{this.props.user.username}</b></p>
                <p>Clearance level: <b>{this.props.user.clearance_level}</b></p>
                {JSON.stringify(this.state.userArray)}
                {/* <ul>
                    {this.props.secrets.map(secret => (
                        <li>
                            Clearance: {secret.secrecy_level} | Content: {secret.content}
                        </li>
                    ))}
                </ul> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    secrets: state.secrets,
    user: state.user,
});

export default connect(mapStateToProps)(AllUsersPage);
