import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Layout/Header"
import Home from "./Screens/Home";
import Study from "./Screens/Study";
import CreateDeck from "./Screens/CreateDeck";
import Deck from "./Screens/Deck";
import EditDeck from "./Screens/EditDeck";
import AddCard from "./Screens/AddCard";
import EditCard from "./Screens/EditCard";
import NoMatch from "./Screens/NoMatch";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  

  return (
    <div className="app-routes">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route path="/decks/:deckId">
          <Deck />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
