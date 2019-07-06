import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './navigation/navigation';
import Window from './window/window';

import About from './pages/about';
import Works from './pages/works';
import Resume from './pages/resume';
import Site from './pages/site';
import Moretti from './pages/moretti';
import Contact from './pages/contact';

const pages = {
    about: <About/>,
    work: <Works/>,
    site: <Site/>,
    resume: <Resume/>,
    moretti: <Moretti/>,
    contact: <Contact/>
}

// Keeps track of the current page
export const PageContext = React.createContext();
class CurrentPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {page: "moretti"};  // Starting page. Should be home.
    }
    gotoPage = (pageID) => {
        return this.setState({page: pageID});
    }
    render(){
        return(
            <PageContext.Provider value={{page: this.state, goto: this.gotoPage}}>
                {this.props.children}
            </PageContext.Provider>
        );
    }
}


class Display extends React.Component {
    render(){
        return (
            <div id="page">
                <CurrentPage>
                    <PageContext.Consumer>
                        {context => this.getPage(context.page.page)}
                    </PageContext.Consumer>
                </CurrentPage>
            </div>
        )
    }
    getPage(page){
        if(page === "home"){  // Show the navigation star
            return (
                <div id="star">
                    <Navigation/>
                    <span id="starText"><h1>David Stearns</h1><p>Welcome to my website</p></span>
                </div>
            );
        }
        else {  // show the current page
            return (
                <div id="window">
                    <Window>
                        {pages[page]}
                    </Window>
                </div>);
        }
    }
}

const element = (
    <Display/>
);
ReactDOM.render(
    element,
    document.getElementById('root')
);
