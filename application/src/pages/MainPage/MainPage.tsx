import React from "react";
import AppBar from "@material-ui/core/AppBar";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";

import withHocs, { PropsStyles } from "./MainPageHoc";
import AppName from "components/AppName/AppName";
import AppTopButtons from "blocks/AppTopButtons/AppTopButtons";
import Recipes from "pages/Recipes/Recipes";
import AddRecipe from "pages/Recipe/AddRecipe";
import ViewRecipe from "pages/Recipe/ViewRecipe";
import EditRecipe from "pages/Recipe/EditRecipe";
import SnackbarApp from "blocks/SnackbarApp/SnackbarApp";
import BackdropApp from "blocks/BackdropApp/BackdropApp";

import { createStore, StoreProvider } from "stores/ui";
const uiStore = createStore();

const MainPage: React.FC<PropsStyles> = ({ classes }) => {
  return (
    <StoreProvider value={uiStore}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MenuBookIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Кулинарная книга
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <AppName />
            <AppTopButtons />
          </Container>
        </div>
        <Container maxWidth="md">
          <Switch>
            <Route path="/" exact={true}>
              <Recipes />
            </Route>
            <Route path="/add">
              <AddRecipe />
            </Route>
            <Route path="/view/:id">
              <ViewRecipe />
            </Route>
            <Route path="/edit/:id">
              <EditRecipe />
            </Route>
            <Route path="*">
              <div>404</div>
            </Route>
          </Switch>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Спасибо за внимание!
        </Typography>
      </footer>
      <SnackbarApp />
      <BackdropApp />
    </StoreProvider>
  );
};
export default withHocs(MainPage);
