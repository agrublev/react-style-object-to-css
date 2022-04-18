import { hot } from "react-hot-loader";
import React from "react";
import "./App.less";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Convert from "./Convert";

@observer
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Convert />
            </div>
        );
    }
}

export default hot(module)(App);
