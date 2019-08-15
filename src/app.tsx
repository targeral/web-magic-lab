import React, {FC, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';

const Context = React.createContext(0);

const APP: FC = () => {
    const [title] = useState<string>('Hello world');
    const [num, setNum] = useState<number>(0);
    return (<>
        <CssBaseline />
        <section>
            <AppBar style={{height: 20}}></AppBar>
            <h1>{title}</h1>
            <ul>
                <li><a href="#/">turn white</a></li>
                <li><a href="#/blue">turn blue</a></li>
                <li><a href="#/green">turn green</a></li>
            </ul>
                <Context.Consumer>
                    {context => {
                        console.log(context);
                        return (
                            <Context.Provider value={num}>
                                a
                            </Context.Provider>
                        );
                    }}
                </Context.Consumer>
            <button onClick={() => setNum(num + 1)}>+</button>
        </section>
    </>);
};

export default APP;