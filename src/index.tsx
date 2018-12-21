import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
});


const GET_ST_YEAR = gql`
  {
  findAllByLocation{
    id
    name
    address
    appliesTo
    }
  }

`;


const App = () => (
    <ApolloProvider client={client}>
        <Query query={GET_ST_YEAR}>

            {({ loading, error, data }) => {
                if (loading) return <div>loading </div>;
                if (error) return <div>{error} </div>;

                return (
                    data.findAllByLocation.map(({ id, name, address, appliesTo }) => (
                        <div key={id}>
                            <p>{`${id} ${name} by ${address} ${appliesTo}`}</p>
                        </div>
                    ))
                );


            }}

        </Query>
    </ApolloProvider>
);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
