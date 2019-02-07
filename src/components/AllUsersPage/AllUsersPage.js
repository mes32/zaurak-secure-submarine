import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AllUsersPage.css';

class AllUsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
        };
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/allusers'
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
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>username</th>
                            <th>clearance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userArray.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.clearance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    secrets: state.secrets,
    user: state.user,
});

export default connect(mapStateToProps)(AllUsersPage);
