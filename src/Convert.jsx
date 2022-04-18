import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import reactToCSS from "./converter";
import { fixJsonStr } from "./utils";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import style from "react-syntax-highlighter/dist/esm/styles/prism/duotone-light";

SyntaxHighlighter.registerLanguage("json", json);

const code = `{ 
    button: {
      width: 164,
      height: 48,
    },
    buttonstyle: {
        width: 164,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      },
    buttontext: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "BarlowCondensed-Medium"
    }
}`;

@observer
class Convert extends Component {
    @observable input = code;
    @observable output = null;
    @observable showMessage = false;

    componentDidMount() {
        this.convert(false);
    }

    render() {
        return (
            <div>
                <div className={`message ${this.showMessage ? "active" : ""}`}>
                    COPIED TO CLIPBOARD!
                </div>
                <textarea
                    onChange={(e) => {
                        this.input = e.target.value;
                        this.convert();
                    }}
                    className={"input"}
                    defaultValue={this.input}
                />
                {this.output !== null ? (
                    <div className={"output"}>
                        <SyntaxHighlighter style={style} language={"javascript"}>
                            {this.output}
                        </SyntaxHighlighter>
                    </div>
                ) : null}
            </div>
        );
    }

    convert = (toCopy = true) => {
        let result = reactToCSS(JSON.parse(fixJsonStr(this.input)));
        this.output = result;
        if (toCopy) {
            try {
                window.navigator.clipboard.writeText(this.output);
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                }, 1800);
            } catch (e) {
                console.error(e);
            }
        }
    };
}

export default Convert;
