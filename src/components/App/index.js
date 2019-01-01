import React, {Fragment} from 'react';

import DragDrop from '../../containers/DragDrop';
import Constructor from '../../containers/Constructor';
import Playground from '../Playground/PlaygroundContainer';
import Code from '../../containers/Code';

import Icons from '../Icons';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Wrapper from '../Wrapper';

import './App.css';

const App = () => {
  return (
    <Fragment>
      <Icons/>

      <div className="App">
        <Header/>

        <Wrapper>
          <main className="App__inner">
            <div className="App__container App__container--controlsList">
              <div className="App__content App__content--sticky">
                <Sidebar/>
              </div>
            </div>

            <div className="App__container App__container--constructor">
              <Constructor/>
            </div>

            <div className="App__container App__container--playground">
              <div className="App__content App__content--playground App__content--sticky">
                <Playground/>
                <Code/>
              </div>
            </div>
          </main>
        </Wrapper>

        <Footer/>
      </div>
    </Fragment>
  );
};

export default App;
